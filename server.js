const express = require("express");

const path = require("path");
require("dotenv").config(); // add variables in .env file to process.env
const PORT = process.env.PORT || 3000;

// check NODE_ENV
console.log(`server: NODE_ENV ${process.env.NODE_ENV}`);
// if NODE_ENV is undefined, that gets printed out before things start
// crashing


// set up express
const app = express();
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static files (css)
app.use(express.static("."));

// serve author html (default)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname,"authorIndex.html"));
});


app.listen(PORT, () => {
  console.log(`🌎 ==> API server listening on port ${PORT}`);
});
