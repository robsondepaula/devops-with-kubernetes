const { v4: uuidv4 } = require("uuid");
const express = require("express");
const axios = require("axios");
require('dotenv').config();

const app = express();

const reqUrl = `${process.env.SVC_BASE_URL}:${process.env.SVC_PORT}`;

app.get("/", async (request, response) => {
  let log = "failed to retrieve data";
  try {
    const response = await axios.get(reqUrl);
    log = response.data;
  } catch (err) {
    console.log(err);
  } finally {
    const date = new Date();
    response.set("Content-Type", "text/html");
    response.send(`${date.toISOString()} : ${randomString}\n${log}`);
  }
});

const randomString = uuidv4();
const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
