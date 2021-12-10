const { Router } = require("express");
const express = require("express");
const admin = require("../database/models/admin");
const router = express.Router();
const AdminUser = require("../database/models/admin");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");
const Category = require("../database/models/Category");

/* router.get("/create", adminAuth, (req, res)=>{
    res.render("createUser")
});

*/

router.get("/home", adminAuth, (req, res)=>{
    res.render("home-admin")
})

router.get("/login", (req, res)=>{
    res.render("login")
});

router.get("/home-admin", adminAuth, (req, res)=>{
    res.render("home-admin")
});

router.post("/createUser", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    AdminUser.create({
        username: username,
        password: hash
    })
});

router.post("/authenticate", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    AdminUser.findOne({where: {username: username}}).then(user =>{
        if(user!=undefined){
            const correct = bcrypt.compareSync(password, user.password);
        
            if(correct){
                req.session.user = {
                    id: user.id,
                    username: user.username
                }
                res.redirect("/admin/home");
            }else{
                res.redirect("/")
            }
        }
    })
});




module.exports = router;