import path from 'path'
import dotenv from 'dotenv'
import colors from 'colors'
import express from "express"
import connectDB from "./config/db.js"

// Route Imports
import users from './routes/api/users.js'
import profile from './routes/api/profile.js'
import posts from './routes/api/posts.js'
import auth from './routes/api/auth.js'

dotenv.config()

// Connect DB
connectDB();

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
