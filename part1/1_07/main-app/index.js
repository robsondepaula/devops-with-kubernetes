const { v4: uuidv4 } = require("uuid");
const express = require("express");

const randomString = uuidv4();
const intervalSeconds = 5;
const app = express();

app.get("/", async (request, response) => {
  const date = new Date;
  const log = `${date.toISOString()} : ${randomString}`

  response.set('Content-Type', 'text/html');
  response.send(log);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});