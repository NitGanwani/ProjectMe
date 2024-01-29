import { Router as createRouter } from 'express';
import { registerUser } from '../controllers/usersController.js';
export const userRouter = createRouter();

userRouter.get('/');
userRouter.post('/', registerUser);
