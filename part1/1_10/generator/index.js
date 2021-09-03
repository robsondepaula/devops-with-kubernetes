const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const randomString = uuidv4();
const intervalSeconds = 5;

setInterval(() => {
  const date = new Date();
  const fileContents = `${date.toISOString()} : ${randomString}`;

  logToFile(fileContents);
}, intervalSeconds * 1000);

const directory = path.join("/", "tmp", "log", "generator");
const filePath = path.join(directory, "generator.log");

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
