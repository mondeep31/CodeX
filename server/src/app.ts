import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import roomRouter from './routes/roomRoutes';


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

//room routes
app.use('/api/rooms', roomRouter)

export default app;