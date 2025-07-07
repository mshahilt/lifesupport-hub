import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/user.routes';
import cloudinaryRoutes from './routes/cloudinary.routes';
import categoryRoutes from './routes/category.routes';
import liveRoutes from './routes/live.routes';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', authRoutes);
app.use('/api/cloudinary', cloudinaryRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/live', liveRoutes);
app.get('/health', (_req, res) => {
  res.status(200).json({ message: 'server is healthy'});
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;