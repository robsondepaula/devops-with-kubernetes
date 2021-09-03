const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();

const directory = path.join("/", "tmp", "log");
const filePath = path.join(directory, "pingpong.log");

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
  const date = new Date;
  response.set('Content-Type', 'text/html');
  response.send(`${date.toISOString()} : ${randomString}\n${log}`);
});

const randomString = uuidv4();
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
