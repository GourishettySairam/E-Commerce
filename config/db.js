const mongoose = require("mongoose");
const config = require("./keys");

const db = config.mongoURI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser : true,
            useUnifiedTopology: true
        });
        console.log("connected to database");
    } catch(error) {
        console.log("connection failed");
        // process.exit(1);
        console.log(error);
    }
};

module.exports = connectDB;