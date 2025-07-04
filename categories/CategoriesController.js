const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");
const { where } = require("sequelize");

router.get("/admin/categories/new", (re, res) => {
  res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) => {
  let title = req.body.title;

  if (title != undefined) {
    Category.create({
      title: title,
      slug: slugify(title),
    }).then(() => {
      res.redirect("/admin/categories");
    });
  } else {
    res.redirect("/admin/categories/new");
  }
});

router.get("/admin/categories", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/categories/index", { categories: categories });
  });
});

router.post("/categories/delete", (req, res) => {
  let id = req.body.id;

  if (id != undefined) {
    if (!isNaN(id)) {
      Category.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        console.log("Categoria deletada com sucesso!");
        res.redirect("/admin/categories");
      });
    } else {
      res.redirect("/admin/categories");
    }
  } else {
    res.redirect("/admin/categories");
  }
});

router.get("/admin/categories/edit/:id", (req, res) => {
  let id = req.params.id;

  if (isNaN(id)) {
    res.redirect("/admin/categories");
  } else {
    Category.findByPk(id)
      .then((category) => {
        if (category != undefined) {
          res.render("admin/categories/edit", { category: category });
        } else {
          res.redirect("/admin/categories");
        }
      })
      .catch((erro) => {
        console.log("aconteceu um error" + erro);
        res.redirect("/admin/categories");
      });
  }
});

router.post("/categories/update", (req, res) => {
  let id = req.body.id;
  let title = req.body.title;

  Category.update(
    { title: title, slug: slugify(title) },
    {
      where: { id: id },
    }
  ).then(() => {
    res.redirect("/admin/categories");
  });
});

module.exports = router;
