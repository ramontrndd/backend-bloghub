import express from 'express';
import { UserController } from '../controllers/userController';


const router = express.Router();  // Create a new router

router.get('/getUsers', UserController.getAllUsers);
router.post("/createUser", UserController.createUser);

export default router;