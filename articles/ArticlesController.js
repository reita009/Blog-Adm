const express = require("express");
const router = express.Router();

router.get("/articles", (re, res) => {
  res.send("Rota Artigo!!!!");
});

module.exports = router;
