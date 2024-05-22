
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

const app = express();

// Middleware stuff
app.use(express.json());
app.use(cors());


const authRoutes = require('./routes/auth'); // Ensure this file exists
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect()
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));


app.get('/', (req, res) => {
  res.send('API is running');
});




const server = app.listen(PORT, () => {
  console.log(`Server running on port ${server.address().port}`);
});


