const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
const connection = require("./database/connection");
const slugify = require("slugify");

const AdminUser = require("./database/models/admin");
const Admin = require("./controllers/Admin");
const Email = require("./database/models/email");
const Articles = require("./database/models/Articles");
const ArticlesController = require("./controllers/Articles")
const Category = require("./database/models/Category");
const CategoryController = require("./controllers/Category");
const Posts = require("./database/models/Posts");
const PostsController = require("./controllers/Posts");
const Router = require("./controllers/Router")
const bcrypt = require("bcryptjs");


const session = require("express-session");

app.use(session({
    secret: "oasjfowirwoidiahodisxodos9udosueiouer", 
    cookie: {maxAge: 3000000}
}));

if(connection){
    console.log("sequelize is running too!");
}else{
    console.log("idk");
}

app.set('view engine', 'ejs');
app.use(express.static('public')); // allow static files

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use("/admin", Admin);
app.use("/admin/categoria", CategoryController);
app.use("/admin/artigo", ArticlesController);
app.use("/admin/posts", PostsController);
app.use("/", Router);

app.listen(port, ()=>{
    console.log("server is running");
})