const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.POSTGRESQL_DATABASE,
    process.env.POSTGRESQL_USERNAME,
    process.env.POSTGRESQL_PASSWORD,
    {
        host: process.env.POSTGRESQL_ENDPOINT,
        dialect: process.env.POSTGRESQL_TYPE,
        port: process.env.POSTGRESQL_PORT,
        define: {
            underscored: true
        }
    }
);

module.exports = sequelize;
