const db = require('../server/db');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
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
};
