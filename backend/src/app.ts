import express from 'express';
import { userRouter } from './routes/userRoutes.js';
import morgan from 'morgan';

export const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/users', userRouter);
