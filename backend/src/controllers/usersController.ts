import User from '../models/User.js';
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error('User already exists');
    return res.status(400).json({ message: error.message });
  }

  try {
    const user = new User(req.body);
    const registeredUser = await user.save();
    res.status(201).json(registeredUser);
  } catch (error) {
    console.log(error);
  }
};
