const { v4: uuidv4 } = require("uuid");

const randomString = uuidv4();
const intervalSeconds = 5;

const output = setInterval(() => {
  const date = new Date;
  console.log(`${date.toISOString()} : ${randomString}`);
}, intervalSeconds * 1000);
