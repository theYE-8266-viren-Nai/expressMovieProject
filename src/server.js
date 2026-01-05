import express from 'express';
import { config } from 'dotenv';
import { connectDB, disconnectDB } from './config/db.js';
import authMiddleware from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';
// Import Routes
import movieRoutes from './routes/movieRoutes.js';
import authRoutes from './routes/authRoutes.js';
import watchList from './routes/watchListRoutes.js';

config();
connectDB();

const app = express();

// Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

// Public routes (NO middleware)
app.use("/auth", authRoutes);

// Apply auth middleware to all routes below this point
app.use(authMiddleware);

// Protected routes (WITH middleware)
app.get("/hello", (req, res) => {
    res.json({ message: "Hello World" });
});
app.use("/movies", movieRoutes);
app.use("/addToWatchList", watchList);

const PORT = 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});