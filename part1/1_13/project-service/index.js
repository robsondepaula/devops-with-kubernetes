const path = require("path");
const fs = require("fs");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const directory = path.join("/", "data");

const app = express();
app.use(cors());

function getFileName() {
  const date = new Date();
  const fileName = `${date.getFullYear()}${
    date.getMonth() + 1
  }${date.getDate()}`;
  return fileName;
}

const fileAlreadyExists = async (filePath) => {
  return new Promise((res) => {
    fs.stat(filePath, (err, stats) => {
      if (err || !stats) {
        return res(false);
      }
      return res(true);
    });
  });
};

const retrieveFileIfNeed = async () => {
  const filePath = path.join(directory, `${getFileName()}.jpg`);
  if ((await fileAlreadyExists(filePath)) == false) {
    await new Promise((res) => fs.mkdir(directory, (err) => res()));
    const response = await axios.get("https://picsum.photos/200", {
      responseType: "stream",
    });
    await response.data.pipe(fs.createWriteStream(filePath));
  }

  return filePath;
};

app.get("/", async (request, response) => {
  const filePath = await retrieveFileIfNeed();
  response.sendFile(filePath);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});

// fetch once when spun up
retrieveFileIfNeed();
