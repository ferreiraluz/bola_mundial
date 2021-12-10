const Sequelize = require("sequelize");
const connection = require("../connection");
const Category = require("./Category");

const Articles = connection.define("articles", {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Category.hasMany(Articles)
Articles.belongsTo(Category)

module.exports = Articles;