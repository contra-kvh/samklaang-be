import { Request, Response } from 'express';
import { decryptMessage, encryptMessage } from '@/utils/crypto';

export const encryptHandler = async (req: Request, res: Response) => {
  try {
    const token = await encryptMessage(req.body);
    res.status(200).send({token: token});
  } catch (err){
    if(err instanceof Error)
      res.status(500).send({message: err.message})
  }
}

// TODO: Remove
export const decryptHandler = async (req: Request, res: Response) => {
  try {
    const payload = await decryptMessage(req.body.token);
    res.status(200).send(payload);
  } catch (err) {
    if (err instanceof Error)
      res.status(500).send({message: err.message})
  }
}
