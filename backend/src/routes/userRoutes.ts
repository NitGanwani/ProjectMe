import { Router as createRouter } from 'express';
import {
  checkToken,
  confirmUser,
  forgotPassword,
  getUserProfile,
  loginUser,
  registerUser,
  resetPassword,
} from '../controllers/usersController.js';
import { checkAuth } from '../middleware/checkAuth.js';
export const userRouter = createRouter();

userRouter.get('/');
userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/confirm/:token', confirmUser);
userRouter.post('/forgot-password', forgotPassword);
userRouter.route('/forgot-password/:token').get(checkToken).post(resetPassword);

userRouter.get('/profile', checkAuth, getUserProfile);
