import { ClientRepository } from "../repositories/ClientRepository";
import { AppError } from "../errors/AppError";
import { extractNumbers } from "../utils/normalize";

export class ClientService {
    private repository = new ClientRepository();

    async createClient(data: any) {
        // Normalização: CPF, CEP e telefone serão salvos apenas com números
        data.cpf = extractNumbers(data.cpf);
        data.telefone = extractNumbers(data.telefone);
        data.endereco.cep = extractNumbers(data.endereco.cep);

        // Duplicidade de CPF
        const cpfExists = await this.repository.findByCpf(data.cpf);
        if (cpfExists) {
            throw new AppError('Já existe um cliente cadastrado com este CPF.', 409, 'CPF_ALREADY_EXISTS');
        }

        // Duplicidade de E-mail
        const emailExists = await this.repository.findByEmail(data.email);
        if (emailExists) {
            throw new AppError('Já existe um cliente cadastrado com este e-mail.', 409, 'EMAIL_ALREADY_EXISTS');
        }

        return this.repository.create(data);
    }

    async getClients(query: any) {
        // Paginação
        const page = parseInt(query.page as string) || 1;
        const limit = parseInt(query.limit as string) || 10;
        const skip = (page - 1) * limit;

        // Configurando filtros
        const filter: any = {};
        if (query.ativo !== undefined) {
            filter.ativo = query.ativo === 'true';
        }
        if (query.nome) {
            // O $regex com $options 'i' garante a busca Case Insensitive
            filter.nome = { $regex: query.nome, $options: 'i' };
        }

        const { data, total } = await this.repository.findAllPaginated(filter, skip, limit);

        return {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data
        };
    }

    async getClientById(id: string) {
        const client = await this.repository.findById(id);
        if (!client) {
            throw new AppError('Cliente não encontrado.', 404, 'CLIENT_NOT_FOUND');
        }
        return client;
    }

    async updateClient(id: string, data: any) {
        // Bloquear alteração de CPF
        if (data.cpf) {
            throw new AppError('O CPF do cliente não pode ser alterado.', 400, 'CPF_INVALID_UPDATE');
        }

        // Garantindo que o cliente existe
        await this.getClientById(id);

        // só limpa se o usuário enviou esses campos no PATCH
        if (data.telefone) data.telefone = extractNumbers(data.telefone);
        if (data.endereco?.cep) data.endereco.cep = extractNumbers(data.endereco.cep);

        // Se estiver atualizando o e-mail, checa se já pertence a OUTRO cliente
        if (data.email) {
            const emailExists = await this.repository.findByEmail(data.email);
            if (emailExists && emailExists._id.toString() !== id) {
                throw new AppError('Este e-mail já está em uso por outro cliente.', 409, 'EMAIL_ALREADY_EXISTS');
            }
        }

        return this.repository.updateById(id, data);
    }

    async deleteClient(id: string) {
        // Valida se existe antes de deletar
        await this.getClientById(id);
        await this.repository.softDeleteById(id);
    }
}