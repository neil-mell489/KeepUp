require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes
const eventRoutes = require('./controllers/routes.js'); 
app.use('/api', eventRoutes);


// Error Handling Middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Error.');
});

// Default Route
app.get('/', (req, res) => {
  res.send('This is working');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
