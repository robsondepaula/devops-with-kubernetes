const express = require("express");

const app = express();

app.get("/", (request, response) => {
  response.json(`Ping / Pongs: ${counter++}`);
});

let counter = 0;
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
