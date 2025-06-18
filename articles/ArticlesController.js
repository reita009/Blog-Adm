const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugfy = require("slugify");

router.get("/admin/articles", (re, res) => {
  Article.findAll({
    include: [{ model: Category }],
  }).then((articles) => {
    res.render("admin/articles/index", {
      articles: articles,
    });
  });
});

router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", {
      categories: categories,
    });
  });
});

router.post("/articles/save", (req, res) => {
  let title = req.body.title;
  let body = req.body.body;
  let category = req.body.category;

  Article.create({
    title: title,
    slug: slugfy(title),
    body: body,
    categoryId: category,
  })
    .then(() => {
      console.log("Deu certo!");
      res.redirect("/admin/articles");
    })
    .catch((err) => {
      console.log("erro:" + err);
    });
});

router.post("/articles/delete", (req, res) => {
  let id = req.body.id;

  if (id != undefined) {
    if (!isNaN(id)) {
      Article.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        console.log("Artigo deletado com sucesso!");
        res.redirect("/admin/articles");
      });
    } else {
      res.redirect("/admin/articles");
    }
  } else {
    res.redirect("/admin/articles");
  }
});

module.exports = router;
