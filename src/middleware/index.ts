import jwt, { JwtPayload } from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';

// Define a custom interface to extend Request type
interface AuthenticatedRequest extends Request {
  email?: string; // Add the email property to the Request type
}

export const userMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const accessToken: string = req.headers.authorization.split(' ')[1];
  try {
    const decoded: JwtPayload | string = jwt.verify(accessToken, 'mysecretkey');
    if (typeof decoded === 'object' && 'email' in decoded) {
      req.email = (decoded as JwtPayload).email;
      return next();
    } else {
      throw new Error('Invalid token');
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Not Authorized!", message: error.message });
  }
};
