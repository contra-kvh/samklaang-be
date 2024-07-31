import { Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { logger } from '@/utils/logger';
import { addUser, verifyPassword } from '@/database/users';
import { LoginRequest, RegisterRequest } from '@/models/requests';
import { getUserToken } from '@/utils/auth';


dotenv.config()
const SALT_ROUNDS: number = Number((process.env.SALT_ROUNDS || 10));

export const login = async (req: Request, res: Response) => {
  const loginRequest: LoginRequest = req.body;

  try {
    const user = await verifyPassword(loginRequest);

    if (user) {
      const token = await getUserToken(user);
      res.status(200).json({token: token});
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (err) {
    if (err instanceof Error)
      console.error("Error during login:", err.message);
    res.status(500).send('Server error');
  }
};

export const register = async (req: Request, res: Response) => {
  const params = req.body as RegisterRequest
  logger.debug(`req:\n${JSON.stringify(params)}`);

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(params.password, salt);
    params.password = hashedPassword
    const resp = await addUser(params);
    const token = await getUserToken(resp);
    res.status(201).json({token: token});
  } catch (err: any) {
    if (err instanceof Error) {
      logger.error(`Error during registration: ${err.message}`);
      res.status(500).send(err.message);
    } else {
      logger.error("Unknown error during registration");
      res.status(500).send("An unknown error occurred");
    }
  }
};
