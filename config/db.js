const mongoose = require('mongoose');

// Use only the environment variable for Mongo connection (Render / .env)
const db = process.env.MONGO_URI;

const connectDB = async () => {
  if (!db) {
    console.error('MONGO_URI environment variable is not set');
    process.exit(1);
  }

  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
