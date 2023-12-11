const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Product = sequelize.define('product', {
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
});

module.exports = Product;
