import { promises } from "node:dns";
import Client, { IClient }  from "../models/Client";

export class ClientRepository {

    async create(data: Partial<IClient>) {
        return Client.create(data);
    }

    // Busca um cliente pelo CPF, mas IGNORA os "deletados"
    async findByCpf(cpf: string) {
        return Client.findOne({ cpf, deleteAt: null });
    }

    async findByEmail(email: string) {
        return Client.findOne({ email, deletedAt: null });
    }

    async findById(id: string) {
        return Client.findOne({ _id: id, deletedAt: null });
    }

    // Método de listagem (paginação e filtros)
    async findAllPaginated(filter: any, skip: number, limit: number) {
        //Garanntindo que não traga clientes deletados  
        const finalFilter = { ...filter, deletedAt: null };

    //Promisse.all para rodar as duas consultas no banco ao mesmo tempo
        const [data, total] = await Promise.all([
            Client.find(finalFilter).skip(skip).limit(limit).select('-__v'),
            Client.countDocuments(finalFilter)
        ]);
        
        return { data, total };
    }

    async updateById(id: string, data: Partial<IClient>) {
        return Client.findOneAndUpdate({ _id: id, deletedAt: null }, data, { new: true });
    }

    // Exclusão lógica
    async softDeleteById(id: string) {
        return Client.findOneAndUpdate(
            { _id: id, deletedAt: null },
            { ativo: false, deletedAt: new Date() },
            { new: true }
        );
    }
}