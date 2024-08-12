const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const port = 3000; // Use a single port for simplicity

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

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

// Register API
app.post('/register', (req, res) => {
    const data = req.body;

    // Hash the password before saving
    bcrypt.hash(data.password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: 'Error hashing password' });
        }

        data.password = hashedPassword;

        db.query('INSERT INTO Customer SET ?', data, (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'An error occurred while inserting data.' });
            }
            res.status(200).json({ message: 'Registration successful', result });
        });
    });
});

// Login API
app.post('/login', (req, res) => {
    const { emailid, password } = req.body;

    if (!emailid || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    db.query('SELECT * FROM Customer WHERE emailid = ?', [emailid], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while querying the database' });
        }
        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result[0];
        const storedPassword = user.password;

        bcrypt.compare(password, storedPassword, (err, isMatch) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'An error occurred while verifying the password' });
            }
            if (isMatch) {
                return res.status(200).json({ message: 'Login successful' });
            } else {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
        });
    });
});
 
// Booking API
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

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
