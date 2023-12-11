const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const ProductType = sequelize.define('product_type', {
    product_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
});

module.exports = ProductType;
