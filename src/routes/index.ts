import express from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkRole } from '../middlewares/checkRole'
import { CategoryController } from '../controllers/categoryController';
import { Articles } from '../controllers/articleController';


const router = express.Router(); // Create a new router

router.get('/getUsers', authenticateToken, UserController.getAllUsers);
router.post('/createUser', UserController.createUser);
router.post('/login', UserController.login);
router.patch('/updateUserStatus',  authenticateToken, checkRole, UserController.updateUserStatus);
router.patch('/updateUserRole', authenticateToken, checkRole, UserController.updateUserRole);
router.get('/checkToken', authenticateToken, UserController.checkToken);


router.post('/newCategory', authenticateToken, CategoryController.createNewCategory);
router.get('/getCategory', authenticateToken, CategoryController.getCategory);
router.patch('/updateCategory', authenticateToken, CategoryController.updateCategory);


router.post('/newArticle', authenticateToken, Articles.createNewArticle);
router.get('/getAllArticles', authenticateToken, Articles.getAllArticles);
router.post('/updateArticle',  authenticateToken, Articles.updateArticle);


export default router;
