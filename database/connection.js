const Sequelize = require("sequelize");
const connection = new Sequelize("flamengo", "root", "1504", {
    dialect: "mysql",
    host: "localhost",
    timezone: "-03:00"
});

module.exports = connection;