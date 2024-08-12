const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

// POST route for registering a new user
router.post('/', registerController.register);

module.exports = router;
