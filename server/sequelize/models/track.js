const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Track = sequelize.define('track', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    }
});

module.exports = Track;
