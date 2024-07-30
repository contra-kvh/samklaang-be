import { Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { logger } from '../../utils/logger';
import { addUser, verifyPassword } from '../../database/users';
import { LoginRequest, RegisterRequest } from '../../models/requests';


dotenv.config()
const SALT_ROUNDS: number = Number((process.env.SALT_ROUNDS || 10));


export const login = async (req: Request, res: Response) => {
  const loginRequest: LoginRequest = req.body;

  try {
    const user = await verifyPassword(loginRequest);

    if (user) {
      res.status(200).json(user);
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
    await addUser(params.email, params.name, params.designation, hashedPassword);
    res.status(201).send("User created successfully");
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
