const express = require('express');
const colors = require('colors');
const path = require('path');
const connectDB = require('./config/db');
const dotenv = require('dotenv')


dotenv.config();

// Connect DB
connectDB();

const app = express();

// // Init Middleware
// app.use(express.json({ extended: false }));


// Route Imports
const users = require('./routes/api/users.js')
const profile = require('./routes/api/profile.js')
const posts = require('./routes/api/posts.js')
const auth = require('./routes/api/auth.js')




// Init Middleware
app.use(express.json({ extended: false }));

// app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
