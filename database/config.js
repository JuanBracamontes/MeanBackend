const mongoose = require('mongoose');
require('dotenv').config();

let connString = process.env.DB_CNN.toString();
mongoose.set("strictQuery", false);
const dbConnection = async() => {
    await mongoose.connect(connString);
    console.log('Database connected');
}

module.exports = {
    dbConnection
}