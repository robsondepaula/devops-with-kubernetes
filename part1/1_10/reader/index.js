const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();

const directory = path.join("/", "tmp", "log", "generator");
const filePath = path.join(directory, "generator.log");

const retrieveLog = async () =>
  new Promise((res) => {
    fs.readFile(filePath, (err, buffer) => {
      if (err) {
        console.log("ERROR: ", err);
      } else {
        res(buffer);
      }
    });
  });

app.get("/", async (request, response) => {
  const log = await retrieveLog();
  response.set('Content-Type', 'text/html');
  response.send(log);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
