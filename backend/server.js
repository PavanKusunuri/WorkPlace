import express from "express"
import connectDB from "./config/db.js"

// Route Imports
import users from './routes/api/users.js'
import profile from './routes/api/profile.js'
import posts from './routes/api/posts.js'
import auth from './routes/api/auth.js'

const app = express();

// Connect DB
connectDB();

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
