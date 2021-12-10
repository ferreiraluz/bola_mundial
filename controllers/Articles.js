const { Router } = require("express");
const express = require("express");
const admin = require("../database/models/admin");
const router = express.Router();
const Category = require("../database/models/Category");
const Articles = require("../database/models/Articles")
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");

router.get("/cadastro", adminAuth, (req, res)=>{
    Category.findAll().then(categories =>{
        res.render("./articles/new", {categories: categories})
    })
});

router.post("/new", (req, res)=>{
    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.category;

    Articles.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(()=>{
        res.redirect("/admin/artigo")
    })
});

router.get("/", adminAuth, (req, res)=>{
    Articles.findAll({
        include: [{
            model: Category
        }]
    }).then(articles => {
        res.render("./articles/article", {articles: articles})
    })
});

router.post("/delete", (req, res)=>{
    const id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){

            Articles.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/artigo")
            })

        }else{
            res.redirect("/admin/artigo")
        }
    }else{
        res.redirect("/admin/artigo")
    }
});

router.get("/lista", adminAuth, (req, res)=>{
    Articles.findAll().then(articles =>{
        res.render("./articles/list-article", {articles: articles, categories: categories})
    })
});

router.get("/revisao/:slug", adminAuth, (req, res)=>{
    const slug = req.params.slug;
    Articles.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            res.render("./articles/revision", {article: article, categories: categories})
        }else{
            res.redirect("/")
        }
    })
});

router.get("/edit/:id", (req, res)=>{
    const id = req.params.id
    Articles.findByPk(id).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories=>{
                res.render("./articles/edit", {categories: categories, article: article})
            });
           
        }else{
            res.redirect("/");
        }
    })
});

router.post("/update", (req, res)=>{
    const id = req.body.id;
    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.category;
    const img = req.body.img;
    const description = req.body.description;

    Articles.update({
        title: title,
        body: body,
        category: category,
        img: img,
        description: description,
        slug: slugify(title)
    }, {
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/artigo")
    })
})


module.exports = router;