const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const ProductPricing = sequelize.define('product_pricing', {
    stripe_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true,
        }
    }
});

module.exports = ProductPricing;
