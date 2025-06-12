const express = require("express");
const router = express.Router();

router.get("/articles", (re, res) => {
  res.send("Rota Artigo!!!!");
});

router.get("/admin/articles/new", (req, res) => {
  res.render("admin/articles/new");
});

module.exports = router;
