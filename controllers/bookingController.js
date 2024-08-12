const db = require('../server/db');

exports.createBooking = (req, res) => {
    const { hotelId, customerId, nights, people, checkin, checkout, payment } = req.body;

    if (!hotelId || !customerId || !nights || !people || !checkin || !checkout || !payment) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    const bookingQuery = `INSERT INTO bookings (hotelId, customerId, nights, people, checkin, checkout, payment) 
                          VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(bookingQuery, [hotelId, customerId, nights, people, checkin, checkout, payment], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Booking confirmed', bookingId: result.insertId });
    });
};

exports.getBookingDetails = (req, res) => {
    const bookingId = req.params.id;

    db.query('SELECT * FROM bookings WHERE id = ?', [bookingId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(result[0]);
    });
};
