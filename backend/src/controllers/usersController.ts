import { UserModel } from './../models/User.js';
import { Request, Response } from 'express';
import { generateId } from '../helpers/generateId.js';
import { generateJWT } from '../helpers/generateJWT.js';

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
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error('Invalid credentials');
    return res.status(403).json({ message: error.message });
  }
};

export const confirmUser = async (req: Request, res: Response) => {
  const { token } = req.params;
  const confirmedUser = await UserModel.findOne({ token });
  if (!confirmedUser) {
    const error = new Error('Invalid token');
    return res.status(400).json({ message: error.message });
  }

  try {
    confirmedUser.isConfirmed = true;
    confirmedUser.token = '';
    await confirmedUser.save();
    res.status(200).json(confirmedUser);
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) {
    const error = new Error('User does not exist');
    return res.status(400).json({ message: error.message });
  }

  try {
    existingUser.token = generateId();
    await existingUser.save();
    res.status(200).json({ message: 'Email sent with the instructions' });
  } catch (error) {
    console.log(error);
  }
};

export const checkToken = async (req: Request, res: Response) => {
  const { token } = req.params;

  const validToken = await UserModel.findOne({ token });

  if (validToken) {
    res.status(200).json({ message: 'Token is valid' });
  } else {
    const error = new Error('Invalid token');
    return res.status(400).json({ message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await UserModel.findOne({ token });

  if (user) {
    user.password = password;
    user.token = '';
    try {
      await user.save();
      res.status(200).json({ message: 'Password updated' });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error('Invalid token');
    return res.status(400).json({ message: error.message });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  const { user } = req;
  res.status(200).json(user);
};
