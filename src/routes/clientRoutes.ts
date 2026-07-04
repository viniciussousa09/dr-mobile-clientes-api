import { Router } from "express";
import { ClientController } from "../controllers/ClientController";

const router = Router();
const controller = new ClientController();

// Rotas
router.post('/', controller.create);
router.get('/', controller.list);
router.get('/:id', controller.getById);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;