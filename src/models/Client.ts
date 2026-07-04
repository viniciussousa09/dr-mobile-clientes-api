import mongoose, { Schema, Document, mongo } from "mongoose";
import { maxLength, minLength, required, uppercase } from "zod/mini";

// Criando a interface para TS
export interface IClient extends Document {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    dataNascimento: Date;
    ativo: boolean;
    endereco: {
        cep: string;
        logradouro: string;
        numero: string;
        complemento?: string;
        bairro: string;
        cidade: string;
        estado: string;
    };
}

// Crinado o Schema
const ClientSchema: Schema = new Schema(
    {
        nome: {
            type: String,
            required: true,
            trim: true
        },
        cpf: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        telefone: {
            type: String,
            required: true,
        },
        dataNascimento: {
            type: String,
            required: true
        },
        ativo: {
            type: Boolean,
            default: true
        },
        endereco: {
            cep: { type: String, required: true },
            logradouro: { type: String, required: true },
            numero: { type: String, required: true },
            complemento: { type: String },
            bairro: { type: String, required: true },
            cidade: { type: String, required: true },
            estado: {
                type: String,
                required: true,
                uppercase: true,
                minLength: 2,
                maxLength: 2
            }
        },
        deleteAt: { type: Date, default: null }   
    },
    { timestamps: true }
);

// Exportando o modelo já tipado
export default mongoose.model<IClient>('Client', ClientSchema);