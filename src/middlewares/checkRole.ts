import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

export function checkRole(req: Request, res: Response, next: NextFunction) {
 const user = res.locals.user;
  if (user.role === 'user') {
    res.status(403).json({ message: 'You do not have permission to access this resource' });
  } else if (user.role === 'admin'){
    next();
  }

}

module.exports = { checkRole: checkRole };
