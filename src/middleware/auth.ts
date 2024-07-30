import {Request, Response, NextFunction} from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  console.log(`auth header: ${req.headers.authorization}`)
  res.setHeader('x-url', req.path)
  next()
}
