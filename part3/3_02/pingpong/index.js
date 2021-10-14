const express = require("express");
require("dotenv").config();

const app = express();

const { Pingpong } = require("./models");

let dbReady = false;

const syncDb = async () => {
  await Pingpong.sync();

  console.log("Model synchronized successfully, DB can now be used.");

  dbReady = true;
};

app.get("/pingpong", async (request, response) => {
  if (!dbReady) {
    response.status(503);
  } else {
    const pingPong = await Pingpong.findOne();

    let counter;
    if (pingPong) {
      counter = pingPong.count + 1;

      await Pingpong.update({ count: counter }, { where: { id: pingPong.id } });
    } else {
      counter = 1;
      await Pingpong.create({ count: counter });
    }
    response.json(`Ping / Pongs: ${counter}`);
  }
});

syncDb();

const PORT = process.env.SVC_PORT;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
