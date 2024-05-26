const express = require('express');
const router = express.Router();
const contactController = require('./contactController');
const userCtrl = require("./userController");
const { verifyToken } = require("../middlewares/verifyToken");

// Contact Routes
router.get('/contacts/:id', verifyToken, contactController.getContacts);
router.post('/contacts', verifyToken, contactController.createContact); 
router.put('/contacts/:id', verifyToken, contactController.updateContact);
router.delete('/contacts/:id', verifyToken, contactController.deleteContact);


// User Routes
router.post("/auth/signup", userCtrl.signup);
router.post("/auth/confirm", userCtrl.confirm);
router.post("/auth/login", userCtrl.login);
router.get("/user/:id", verifyToken, userCtrl.getUser);

module.exports = router;
