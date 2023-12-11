const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const MediaFile = sequelize.define('media_file', {
    preview: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    cover_art: {
        type: DataTypes.TEXT,
    },
});

module.exports = MediaFile;
