const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const contactController = require('./contactController');
const userCtrl = require("./userController");

// Contact Routes
router.get('/contacts/:id', contactController.getContacts);
router.post('/contacts', contactController.createContact);
router.put('/contacts/:id', contactController.updateContact);
router.delete('/contacts/:id', contactController.deleteContact);

// User Routes
router.post("/auth/signup", userCtrl.signup);
router.post("/auth/login", userCtrl.login);
router.get("/user/:id", verifyToken, userCtrl.getUser);

module.exports = router;
