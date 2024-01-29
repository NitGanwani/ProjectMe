import jwt from 'jsonwebtoken';

export const generateJWT = (id: string) => {
  const secret: string = process.env.JWT_SECRET!;
  jwt.sign({ id }, secret, { expiresIn: '30d' });
};
