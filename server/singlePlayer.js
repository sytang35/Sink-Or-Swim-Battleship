const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(express.json());

// Single player server data
let easy;
let medium;
let hard;

router.post("/easy", (req, res) => {
  //console.log(req.params);
  res.status(201).json(req);
});
module.exports = router;
