const express = require("express");
require("dotenv").config();

const app = express();

const { Pingpong } = require("./models");

app.get("/", async (request, response) => {
  const pingPong = await Pingpong.findOne();

  let counter = pingPong.count + 1;

  await Pingpong.update({ count: counter }, { where: { id: pingPong.id } });

  response.json(`Ping / Pongs: ${counter}`);
});

const PORT = process.env.SVC_PORT;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
