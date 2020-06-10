const express = require("express");

const fs = require('fs');
var shell = require('shelljs');
var uniqid = require('uniqid'); // use for testing

const path = require("path");
require("dotenv").config(); // add variables in .env file to process.env
const PORT = process.env.PORT || 3000;

// check NODE_ENV
console.log(`server: NODE_ENV ${process.env.NODE_ENV}`);
// if NODE_ENV is undefined, that gets printed out before things start
// crashing

const testData = {
  id1: "At the top",
  id2: "The second line",
  id3: "More padding",
  id4: "Even more padding"
}
console.log("Original test data " + testData);

let fileName = "t3_" + uniqid();
fs.writeFileSync(fileName, JSON.stringify(testData));

// add explicitly because new file
if (shell.exec('git add ' + fileName).code !== 0) {
  shell.echo('Error: Git add failed');
  shell.exit(1);
}

const dateStamp=new Date();
const dsString = dateStamp.getHours() + dateStamp.getMinutes() + dateStamp.getSeconds();
if (shell.exec(`git commit -m "Auto-commit ${dsString}"`).code !== 0) {
  shell.echo('Error: Git commit failed');
  shell.exit(1);
}

if (shell.exec('git push').code !== 0) {
  shell.echo('Error: Git push failed');
  shell.exit(1);
}

// git testing

// set up express
// const app = express();
// Define middleware here
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// static files (css)
// app.use(express.static("."));

// serve author html (default)
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname,"authorIndex.html"));
// });


// app.listen(PORT, () => {
//   console.log(`🌎 ==> API server listening on port ${PORT}`);
// });

console.log("Server ends here");
