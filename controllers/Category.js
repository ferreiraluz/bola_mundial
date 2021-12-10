const { Router } = require("express");
const express = require("express");
const admin = require("../database/models/admin");
const router = express.Router();
const Category = require("../database/models/Category");
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");

router.get("/", (req, res)=>{
    
    Category.findAll().then((categories)=>{
        res.render("./categories/category-list", {categories: categories})
    })

});

router.get("/cadastro", adminAuth, (req, res)=>{
    res.render("./categories/new")
});

router.post("/new", adminAuth, (req, res)=>{
    const title = req.body.title;
    Category.create({
        title: title,
        slug: slugify(title)
    }).then(() => {
        res.redirect("/admin/categoria")
    })
});

router.post("/delete", (req, res)=>{
    const id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){

            Category.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/categoria")
            })

        }else{
            res.redirect("/admin/categoria")
        }
    }else{
        res.redirect("/admin/categoria")
    }
});

router.get("/edit/:id", adminAuth, (req, res)=>{
    const id = req.params.id;
    if(isNaN(id)){
        res.redirect("/admin/categoria")
    }

    Category.findByPk(id).then(category => {
        if(category != undefined){
            res.render("./categories/edit", {category: category})
        }else{
            res.redirect("/admin/categoria")
        }
    })})


router.post("/update", (req, res)=>{
    const id = req.body.id;
    const title = req.body.title;

    Category.update({title: title, slug: slugify(title)}, {
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/categoria")
    })

})



module.exports = router;