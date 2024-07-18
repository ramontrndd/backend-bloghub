import dotenv from 'dotenv';

dotenv.config();

function checkRole(req: any, res: any, next: any) {
  const user = res.locals.user;
  if (user.role === process.env.USER) {
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = { checkRole: checkRole };
