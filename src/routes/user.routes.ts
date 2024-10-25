import express from 'express';
import {register, login, getUsers, getUserById, updateUser, deleteUser, getBlogsByUserId, searchUsersByNameAndEmail} from '../controllers/user.controller';
import { authenticate } from '../middleware/AuthMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers);
router.get('/:id/show', getUserById);
router.put('/user', authenticate, updateUser);
router.delete('/:id', deleteUser);
router.get('/findBlogByUserId/:id', getBlogsByUserId);
router.get('/searchUsers', searchUsersByNameAndEmail);

export default router;
