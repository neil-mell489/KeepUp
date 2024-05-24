const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken")

const eventController = require('./eventController');
const userCtrl = require("./userController")


// LOGGING

if (!eventController || !userCtrl) {
    throw new Error('Controllers are not properly defined or imported.');
}

// ROUTES

// GET - Retrieve all events
router.get('/events/:id', eventController.getEvent); 

// POST - Create a new event
router.post('/events', eventController.createEvent); 

// PUT - Update an event by ID
router.put('/events/:id', eventController.updateEvent); 

// DELETE - Delete an event by ID
router.delete('/events/:id', eventController.deleteEvent); 

//  sign User Up
router.post("/auth/signup", userCtrl.signup)

//  log user in
router.post("/auth/login", userCtrl.login)

router.get("/user/:id", verifyToken, userCtrl.getUser)

module.exports = router;