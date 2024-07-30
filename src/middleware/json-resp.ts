import { NextFunction, Request, Response } from "express"

export const ensureJsonResponse = (req: Request, res: Response, next: NextFunction) => {
  const _send = res.send;

  res.send = function (body?: any): Response {
    if (typeof body === 'string') {
      try {
        JSON.parse(body);
        console.log("Body is already a JSON string.");
      } catch {
        console.log("Original body type:", typeof body);
        body = { message: body }; // Convert to JSON
      }
    } else if (body && typeof body === 'object') {
      console.log("Body type:", typeof body);
    }

    return _send.call(this, body);
  };

  next();
};

