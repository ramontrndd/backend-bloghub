import express from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router(); // Create a new router

router.get('/getUsers', authenticateToken, UserController.getAllUsers);
router.post('/createUser', UserController.createUser);
router.post('/login', UserController.login);

export default router;
