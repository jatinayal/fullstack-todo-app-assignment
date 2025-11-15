import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 
import authRoutes from './routes/auth.routes';
import todoRoutes from './routes/todo.routes';
import connectDB from './config/DB';

const app = express();
dotenv.config();
app.use(cors({
  origin: true,          
  credentials: true      
}));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

const startServer = async () => {
  try {
    await connectDB();
    console.log("Connected to DB");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
