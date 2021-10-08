const path = require("path");
const fs = require("fs");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const directory = process.env.IMG_STORAGE || path.join("/", "tmp");
const filePath = path.join(directory, `todays-image.jpg`);

const app = express();
app.use(cors());
app.use(express.json());

let todos = [
  {
    id: 1,
    content: "TODO 1",
  },
  {
    id: 2,
    content: "TODO 2",
  },
];

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

app.get("/", async (request, response) => {
  await retrieveFileIfNeed();
  response.sendFile(filePath);
});

app.get("/todos", async (request, response) => {
  response.json(todos);
});

const generateId = () => {
  const maxId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) : 0;
  return maxId + 1;
};

app.post("/todos", async (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const todo = {
    content: body.content,
    id: generateId(),
  };

  todos = todos.concat(todo);

  response.json(todo);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});

// fetch once when spun up
retrieveFileIfNeed();
