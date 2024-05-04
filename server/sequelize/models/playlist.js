const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Playlist = sequelize.define('playlist', {
    order: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

module.exports = Playlist;
