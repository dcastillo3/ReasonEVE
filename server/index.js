const express = require('express');
const morgan = require('morgan');

//Import environment variables
require('dotenv').config();

const server = express();
const port = 8000;

//Logging middleware
server.use(morgan('dev'));

server.use('/api', require('./api'));

server.listen(port, function () {
    console.log(`Server is running on port: ${port}`);
});