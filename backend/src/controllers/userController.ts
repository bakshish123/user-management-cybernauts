import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/userModel';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get user by id
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
  
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { username, age, hobbies }: CreateUserDTO = req.body;
  
    if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }
  
    try {
      const newUser = new User({ username, age, hobbies });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error); // Log the detailed error
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

// Update an existing user
export const updateUserById = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId;
  const updateData: UpdateUserDTO = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a user
export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId;

  try {
    const userDeleted = await User.findByIdAndDelete(userId);
    if (userDeleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
