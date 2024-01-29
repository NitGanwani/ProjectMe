import { UserModel } from './../models/User.js';
import { Request, Response } from 'express';
import { generateId } from '../helpers/generateId.js';

export const registerUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    const error = new Error('User already exists');
    return res.status(400).json({ message: error.message });
  }

  try {
    const user = new UserModel(req.body);
    user.token = generateId();
    const registeredUser = await user.save();
    res.status(201).json(registeredUser);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    const error = new Error('User does not exist');
    return res.status(404).json({ message: error.message });
  }

  if (!user.isConfirmed) {
    const error = new Error('Account not confirmed');
    return res.status(403).json({ message: error.message });
  }

  if (await user.comparePassword(password)) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    const error = new Error('Invalid credentials');
    return res.status(403).json({ message: error.message });
  }
};
