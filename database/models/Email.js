const Sequelize = require("sequelize");
const connection = require("../connection");

const email = connection.define("email", {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = email;