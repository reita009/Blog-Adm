const express = require("express");
const router = express.Router();

router.get("/admin/categories/new", (re, res) => {
  res.render("admin/categories/new");
});

module.exports = router;
