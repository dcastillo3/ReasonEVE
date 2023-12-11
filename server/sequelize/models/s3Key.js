const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const S3Key = sequelize.define('s3_key', {
    s3_key: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

module.exports = S3Key;
