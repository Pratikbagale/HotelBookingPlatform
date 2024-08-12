const db = require('../server/db');

exports.getHotelDetails = (req, res) => {
    const hotelId = req.params.id;

    db.query('SELECT * FROM hotels WHERE id = ?', [hotelId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(result[0]);
    });
};

exports.getAllHotels = (req, res) => {
    db.query('SELECT * FROM hotels', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(result);
    });
};
