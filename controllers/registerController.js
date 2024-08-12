const db = require('../server/db');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
    const data = req.body;

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
};
