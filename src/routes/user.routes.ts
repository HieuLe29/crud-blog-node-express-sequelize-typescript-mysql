import express from 'express';
import {register, login,createUser, getUsers, getUserById, updateUser, deleteUser} from '../controllers/user.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;
