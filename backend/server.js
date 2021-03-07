import express from 'express'
import colors from 'colors'
import path from 'path'
import connectDB from "./config/db.js"
import dotenv from 'dotenv'
import cors from 'cors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import userRoutes from './routes/api/users.js';
import postRoutes from './routes/api/posts.js';
import authRoutes from './routes/api/auth.js';
import profileRoutes from './routes/api/profile.js';

dotenv.config();

// Connect DB
connectDB();

const app = express();


// Init Middleware
app.use(express.json({ extended: false }));

app.use(cors())

app.get("/", (req, res) => res.send("API Running"));


app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);



app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
