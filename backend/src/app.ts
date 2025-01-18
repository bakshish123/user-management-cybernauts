import express, { Request, Response, NextFunction } from 'express';
import userRoutes from './routes/userRoutes';
import connectDB from './database/db';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Use CORS middleware
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Handle non-existing endpoints
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
