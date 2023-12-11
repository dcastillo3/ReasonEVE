const sequelize = require('./config');

// register models
require('./models');

module.exports = sequelize;