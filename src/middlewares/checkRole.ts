import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

export function checkRole(req: Request, res: Response, next: NextFunction) {
 const user = res.locals.user;
  if (user === process.env.USER) {
    res.sendStatus(401);
  } else {
    next();
  }
}

module.exports = { checkRole: checkRole };
