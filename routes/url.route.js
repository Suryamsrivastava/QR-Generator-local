const express = require("express");
const {
  handleGenerateNewShortURL,
} = require("../controllers/url.controller");

const router = express.Router();

router.post("/url", handleGenerateNewShortURL);



module.exports = router;
