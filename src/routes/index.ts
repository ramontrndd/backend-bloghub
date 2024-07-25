import express from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkRole } from '../middlewares/checkRole'

const router = express.Router(); // Create a new router

router.get('/getUsers', authenticateToken, UserController.getAllUsers);
router.post('/createUser', UserController.createUser);
router.post('/login', UserController.login);
router.patch('/updateUserStatus',  authenticateToken, checkRole, UserController.updateUserStatus);
router.patch('/updateUserRole', authenticateToken, checkRole, UserController.updateUserRole);

export default router;
