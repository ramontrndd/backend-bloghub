import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

export function checkRole(req: Request, res: Response, next: NextFunction) {
 const user = res.locals.users;
  if (user === process.env.USER) {
    res.status(403).json({ message: 'You do not have permission to access this resource' });
  } else {
    next();
  }

}

module.exports = { checkRole: checkRole };
