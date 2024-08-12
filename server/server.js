const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Import database connection
const db = require('../server/db');

// Use the routes defined in the routes directory
const routes = require('../routes');
app.use(routes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//lsof -i :3000
//kill -9 pid 