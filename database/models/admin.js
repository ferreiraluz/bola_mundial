const Sequelize = require("sequelize");
const connection = require("../connection");

const admin = connection.define("admin", {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = admin;