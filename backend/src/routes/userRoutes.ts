import { Router as createRouter } from 'express';
import { loginUser, registerUser } from '../controllers/usersController.js';
export const userRouter = createRouter();

userRouter.get('/');
userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);
