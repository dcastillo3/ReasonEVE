//Import environment variables
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const sequelize = require('./sequelize');
const { serviceLog } = require('./utils/utils');
const { services } = require('./utils/consts');

const connectToDatabase = async () => {
    try {
        await sequelize.sync({ force: false });

        serviceLog(services.sequelize, 'Database synchronized');
    } catch (err) {
        console.error('Error synchronizing database:', err);
    };
};

const bootApp = async () => {
    //Connect to database
    await connectToDatabase();
    
    const server = express();
    const port = process.env.EXPRESS_PORT;
    
    //Logging middleware
    server.use(morgan('dev'));
    
    server.use('/api', require('./api'));
    
    server.listen(port, () => {
        serviceLog(services.express, `Server is running on port: ${port}`);
    });
};

bootApp();