import { z } from 'zod';
import { isValidCPF } from '../utils/cpf';
import { isAdult } from '../utils/age';

const enderecoSchema = z.object({
    cep: z.string().min(8, 'CEP deve conter no mínimo 8 caracteres.'),
    logradouro: z.string().min(1, 'Logradouro é obrigatório.'),
    numero: z.string().min(1, 'Numero é obrigatorio.'),
    complemento: z.string().optional(),
    bairro: z.string().min(1, 'Bairro é obrigatório'),
    cidade: z.string().min(1, 'Cidade é obrigatoria.'),
    estado: z.string().length(2, 'Estado deve conter exatamente 2 letras.')
});

export const createClientSchema = z.object({
    nome: z.string().min(3, 'Nome deve ter no minimo 3 caractres.'),
    cpf: z.string().refine(isValidCPF,'O CPF informado é invalido.'),
    email: z.string().email('Formato de e-mail inválido.'),
    telefone: z.string().min(10, 'Telefone deve ter no mínimo 10 dígitos (com DDD).').max(15, 'Telefone excede o tamanho máximo'),
    dataNascimento: z.string().refine(isAdult, 'O cliente deve ter 18 anos ou mais, e a data não pode ser futura.'),
    ativo: z.boolean().optional(),
    endereco: enderecoSchema
});

export const updateClientSchema = createClientSchema.partial();