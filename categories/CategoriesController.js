const express = require("express");
const router = express.Router();

router.get("/categories", (re, res) => {
  res.send("Rota categoria");
});

module.exports = router;
