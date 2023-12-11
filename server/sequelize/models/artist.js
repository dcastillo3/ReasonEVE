const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Artist = sequelize.define('artist', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type: DataTypes.TEXT,
    },
});

module.exports = Artist;
