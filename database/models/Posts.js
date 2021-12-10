const Sequelize = require("sequelize");
const connection = require("../connection");
const Category = require("./Category");

const Posts = connection.define("Posts", {
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
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    img: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    keywords: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});



Category.hasMany(Posts)
Posts.belongsTo(Category);




module.exports = Posts;