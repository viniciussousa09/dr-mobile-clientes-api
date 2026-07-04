import mongoose from "mongoose";    

export const connectDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error('A variável MONGODB_URI não foi definida no arquivo .env.');
        }

        await mongoose.connect(uri);
        console.log('MongoDB atlas conectado com sucesso!');
    } catch (error) {
        console.error('Erro fatal ao conectar ao MongoDB:', error);
        process.exit(1);
    }
};