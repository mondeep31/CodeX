import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { CORS_CONFIG } from './config';
import roomRouter from './routes/roomRoutes';
import executionRouter from './routes/executionRoutes';

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(cors(CORS_CONFIG));

//room routes
app.use('/api/rooms', roomRouter)
app.use("/api/execution", executionRouter)

export default app;