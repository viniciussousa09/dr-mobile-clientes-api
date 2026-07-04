import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import clientRoutes from './routes/clientRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(helmet()); 
app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
});

app.use('/clientes', clientRoutes);

app.use(errorHandler);

export default app;