const path = require("path");
const fs = require("fs");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const { connect } = require("nats");

const directory = path.join("/", "tmp");
const filePath = path.join(directory, `todays-image.jpg`);

const app = express();
app.use(cors());
app.use(express.json());

const { Todos } = require("./models");
let initReady = false;

let natsConnection;

const fileAlreadyExists = async () => {
  return new Promise((res) => {
    fs.stat(filePath, (err, stats) => {
      if (err || !stats) {
        return res(false);
      }
      return res(true);
    });
  });
};

const upToDateImage = async () => {
  if ((await fileAlreadyExists(filePath)) == false) {
    await new Promise((res) => fs.mkdir(directory, (err) => res()));

    return false;
  }

  const fileStat = fs.statSync(filePath);
  const createdDate = fileStat.birthtime;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  if (
    createdDate.getFullYear() != currentYear ||
    createdDate.getMonth() != currentMonth ||
    createdDate.getDate() != currentDay
  ) {
    return false;
  }

  return true;
};

const retrieveFileIfNeed = async () => {
  if ((await upToDateImage(filePath)) == false) {
    const response = await axios.get("https://picsum.photos/200", {
      responseType: "stream",
    });
    await response.data.pipe(fs.createWriteStream(filePath));
  }
};

const init = async () => {
  await Todos.sync();

  console.log("Model synchronized successfully, DB can now be used.");

  initReady = true;
};

const sendMessageToNATS = async (todo, created) => {
  try {
    natsConnection = await connect({
      servers: [process.env.NATS_URL],
    });

    console.log("Connected to NATS.");

    console.log(
      `Publish message with Todo having content as '${
        todo.content
      }' and 'done=${todo.done}' for ${
        created ? "create" : "update"
      } operation.`
    );
  } catch (error) {
    console.log("Could not connect to NATS!");
  }
};

app.get("/healthz", (request, response) => {
  response.status(200).send("Up");
});

app.get("/image", async (request, response) => {
  await retrieveFileIfNeed();
  response.sendFile(filePath);
});

app.get("/todos", async (request, response) => {
  if (!initReady) {
    response.status(503).send("Not ready");
  } else {
    const todos = await Todos.findAll();

    response.json(todos);
  }
});

app.post("/todos", async (request, response) => {
  if (!initReady) {
    response.status(503).send("Not ready");
  } else {
    const body = request.body;

    if (!body.content) {
      return response.status(400).json({
        error: "content missing",
      });
    }

    const todo = await Todos.create({
      content: body.content,
    });

    await sendMessageToNATS(todo, true);

    response.json(todo);
  }
});

app.put("/todos", async (request, response) => {
  if (!initReady) {
    response.status(503).send("Not ready");
  } else {
    const body = request.body;

    if (!body.id) {
      return response.status(400).json({
        error: "id missing",
      });
    }

    if (!body.done) {
      return response.status(400).json({
        error: "done missing",
      });
    }

    await Todos.update({ done: body.done }, { where: { id: body.id } });

    const todo = await Todos.findOne({ where: { id: body.id } });

    await sendMessageToNATS(todo, false);

    response.json(todo);
  }
});

const PORT = process.env.SVC_PORT;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});

init();

// fetch once when spun up
retrieveFileIfNeed();
