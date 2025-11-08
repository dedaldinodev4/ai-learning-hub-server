import jwt from 'jsonwebtoken';
import { config } from '../config';
import { IUser } from "../types/auth";

export const generateToken = (payload: IUser) =>
  jwt.sign(payload, config.JWT_SECRET, { expiresIn: '7d' });

export const verifyToken = (token: string) => jwt.verify(token, config.JWT_SECRET);