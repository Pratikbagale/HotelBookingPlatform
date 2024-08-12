const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

// GET route for fetching hotel details by ID
router.get('/:id', hotelController.getHotelDetails);

// GET route for fetching all hotels
router.get('/', hotelController.getAllHotels);

module.exports = router;
