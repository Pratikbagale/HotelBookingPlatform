const express = require("express");
const mysql = require("mysql");
const path = require('path');
const cors = require('cors');

const app = express();

// Initialize middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mwQg67XN',
    database: 'HotelBooking'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MYSQL database');
});

// Login API
app.post('/login', (req, res) => {
    const { emailid, password } = req.body;

    if (!emailid || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    connection.query('SELECT * FROM Customer WHERE emailid = ?', [emailid], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while querying the database' });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = results[0];
        const storedPassword = user.password;

        if (password === storedPassword) {
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});


// Server listening
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
