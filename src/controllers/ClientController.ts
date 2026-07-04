import { Request, Response, NextFunction } from "express";
import { ClientService } from "../services/ClientService";
import { createClientSchema, updateClientSchema } from "../validators/clientValidator";

export class ClientController {
    private service = new ClientService();

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // valida a requisição
            const validatedData = createClientSchema.parse(req.body);

            const client = await this.service.createClient(validatedData);

            res.status(201).json(client);
        } catch (error) {
            next(error);
        }
    };

    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.getClients(req.query);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request <{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const client = await this.service.getClientById(req.params.id);
            res.status(200).json(client);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request <{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const validatedData = updateClientSchema.parse(req.body);

            const client = await this.service.updateClient(req.params.id, validatedData);
            res.status(200).json(client);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request <{ id: string }>, res: Response, next: NextFunction) => {
        try {
            await this.service.deleteClient(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}