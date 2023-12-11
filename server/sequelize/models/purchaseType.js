const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const PurchaseType = sequelize.define('purchase_type', {
    purchase_type: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

module.exports = PurchaseType;