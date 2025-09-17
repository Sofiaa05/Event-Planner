const mongoose = require("mongoose"); 

const db = async () => { //asynchronous function
    try{
        await mongoose.connect(process.env.MONGO_URI); //defined in .env file
        console.log("MongoDB connected successfully");
    }catch(error){
        console.log("MongoDB connection failed", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = db;