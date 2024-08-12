const express = require("express");
const mysql = require("mysql");
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For password hashing
const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mwQg67XN',
    database: 'HotelBooking'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Register API
app.post('/register', async (req, res) => {
    const { firstname, lastname, emailid, phoneno, password } = req.body;

    try {
        // Check if the email is already registered
        connection.query('SELECT * FROM Customer WHERE emailid = ?', [emailid], async (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send({ error: 'Internal server error' });
            }
            if (results.length > 0) {
                return res.status(400).send({ message: 'Customer already registered' });
            }

            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the new customer
            const customerData = { firstname, lastname, emailid, phoneno, password: hashedPassword };
            connection.query('INSERT INTO Customer SET ?', customerData, (error, result) => {
                if (error) {
                    console.error('Error inserting data:', error);
                    return res.status(500).send({ error: 'An error occurred while inserting data.' });
                }
                res.send({ message: 'Registration successful', result });
            });
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

// Fetch all registered customers
app.get('/customers', (req, res) => {
    connection.query('SELECT id, firstname, lastname, emailid, phoneno FROM Customer', (error, results) => {
        if (error) {
            console.error('Error retrieving customers:', error);
            return res.status(500).send({ error: 'An error occurred while retrieving customers.' });
        }
        res.send(results);
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
