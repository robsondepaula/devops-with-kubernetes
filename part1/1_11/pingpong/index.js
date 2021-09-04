const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const directory = path.join("/", "tmp", "log");
const filePath = path.join(directory, "pingpong.log");

const logToFile = async (contents) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFile(filePath, contents, (err) => {
    if (err) {
      console.log("ERROR: ", err);
    }
  });
};

app.get("/", (request, response) => {
  const fileContents = `Ping / Pongs: ${counter++}`;
  logToFile(fileContents);
  response.json(fileContents);
});

let counter = 0;
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
