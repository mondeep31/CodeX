import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import roomRouter from './routes/roomRoutes';
import { tokenRouter } from './routes/tokenRoutes';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

//room routes
app.use('/api/rooms', roomRouter)
//token routes
app.use('/api/token', tokenRouter);

export default app;