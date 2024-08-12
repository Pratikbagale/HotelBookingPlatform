const express = require('express');
const router = express.Router();

// Import all other routes
const loginRoutes = require('./login');
const registerRoutes = require('./register');
const hotelRoutes = require('./hotel');
const bookingRoutes = require('./booking');

// Use the imported routes
router.use('/loginApi', loginRoutes);
router.use('/registerApi', registerRoutes);
router.use('/hotels', hotelRoutes);
router.use('/bookings', bookingRoutes);

module.exports = router;
