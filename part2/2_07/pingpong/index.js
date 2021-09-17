const express = require("express");
require('dotenv').config();

const app = express();

app.get("/", (request, response) => {
  response.json(`Ping / Pongs: ${counter++}`);
});

let counter = 0;
const PORT = process.env.SVC_PORT;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
