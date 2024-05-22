const mongoose = require('mongoose');
require('dotenv').config();

const { MONGODB_URI } = process.env;


module.exports = connectDB;
