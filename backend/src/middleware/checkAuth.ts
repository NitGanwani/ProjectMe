import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../models/User.js';
import { User } from '../entities/user.js';

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    // eslint-disable-next-line no-unused-vars
    interface Request {
      user: User;
    }
  }
}

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JwtPayload;
      console.log(decodedToken);
      req.user = await UserModel.findById(decodedToken.id).select(
        '-password -isConfirmed -token -createdAt -updatedAt -__v'
      );
      return next();
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!token) {
    const error = new Error('Not authorized');
    return res.status(401).json({ message: error.message });
  }

  next();
};
