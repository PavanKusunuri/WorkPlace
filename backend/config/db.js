const mongoose = require("mongoose");
const dotenv = require('dotenv');

console.log(process.env.MONGO_URI)
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log(`MONGODB connected: ${conn.connection.host}`.cyan.underline)
    } catch (err) {
        console.error(`Error: ${err.message}`);
        //Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
