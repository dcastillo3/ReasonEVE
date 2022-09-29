const express = require('express');
const morgan = require('morgan');
// const bodyParser = require('body-parser');

const server = express();
const port = 8000;

// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(bodyParser.json());

server.use(morgan('dev'));

server.use('/api', require('./api'));

server.listen(port, function () {
    console.log('Server is running on port: ', port);
});