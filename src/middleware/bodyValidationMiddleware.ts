import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateRequestBody = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parseResult = schema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.format() });
    }
    // Store parsed data on request object
    req.body = parseResult.data;
    next();
  };
};
