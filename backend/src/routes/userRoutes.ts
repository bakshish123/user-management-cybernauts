import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} from '../controllers/userController';

const router = Router();

// Route to get all users
router.get('/users', getAllUsers);

// Route to get a single user by ID
router.get('/users/:userId', getUserById);

// Route to create a new user
router.post('/users', createUser);

// Route to update an existing user by ID
router.put('/users/:userId', updateUserById);

// Route to delete a user by ID
router.delete('/users/:userId', deleteUserById);

export default router;
