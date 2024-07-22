import express from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkRole } from '../middlewares/checkRole'

const router = express.Router(); // Create a new router

router.get('/getUsers', authenticateToken, UserController.getAllUsers);
router.post('/createUser', UserController.createUser);
router.post('/login', UserController.login);
router.patch('/updateUser',  authenticateToken, checkRole, UserController.updateUser);

export default router;
