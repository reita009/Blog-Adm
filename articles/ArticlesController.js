const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");

router.get("/articles", (re, res) => {
  res.send("Rota Artigo!!!!");
});

router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", {
      categories: categories,
    });
  });
});

module.exports = router;
