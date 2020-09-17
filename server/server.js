const express = require("express");
const app = express();
const cors = require("cors");

const singlePlayer = require("./singlePlayer");
app.use(express.json());
app.use(cors());

// Single player server data

app.use("/", singlePlayer);

app.listen(3000, () => {
  console.log("server listening on port", 3000);
});
module.exports = app;
