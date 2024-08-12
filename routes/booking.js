const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// POST route for creating a booking
router.post('/', bookingController.createBooking);

// GET route for fetching booking details by booking ID
router.get('/:id', bookingController.getBookingDetails);

module.exports = router;
