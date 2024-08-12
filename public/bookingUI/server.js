const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mwQg67XN',
    database: 'HotelBooking'
});

// Connect to MySQL  
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// API to handle bookings
app.post('/api/bookings', (req, res) => {
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
});

// API to get customer and hotel details
app.get('/api/details', (req, res) => {
    const customerIdQuery = 'SELECT id, name FROM Customers LIMIT 1'; // Adjust query to your needs
    const hotelIdQuery = 'SELECT id, name FROM hotels LIMIT 1'; // Adjust query to your needs

    db.query(customerIdQuery, (err, customerResult) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        db.query(hotelIdQuery, (err, hotelResult) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            res.status(200).json({
                customerId: customerResult[0].id,
                customerName: customerResult[0].name,
                hotelId: hotelResult[0].id,
                hotelName: hotelResult[0].name
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
