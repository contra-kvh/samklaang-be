import {Request, Response, NextFunction} from 'express';
import { decryptToken } from '../util/crypto.js';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  var token = req.headers['authorization'];
  if(!token){
    return res.status(401).json({message: 'authorization token missing on a auth-only route'})
  }
  console.log(`auth header: ${token}`)
  token = token.split(' ')[1]
  try {
    const payload = JSON.parse(decryptToken(token!)!) as {uuid: string}
    res.locals.user = payload
  } catch (e){
    res.status(401).json({message: 'bad auth headers'})
  }

  res.setHeader('x-url', req.path)
  next()
}
