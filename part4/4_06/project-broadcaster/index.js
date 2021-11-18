require("dotenv").config();
const { connect, JSONCodec } = require("nats");
const axios = require("axios");

const DISCORD_URL =
  "https://discord.com/api/webhooks/910901658744160277/RzQGjuW5_K5TCF_9ijwlPFI5qhaA4p4NOxg1ZPo7Wj0uO3JxU3h2_DxKSGEFBcwRoBVP";

let natsConnection;

const init = async () => {
  try {
    natsConnection = await connect({
      servers: [process.env.NATS_URL],
    });

    const jc = JSONCodec();

    natsConnection.subscribe("updates", {
      callback: (err, msg) => {
        if (err) {
          console.error(err.message);
        } else {
          const todo = jc.decode(msg.data);
          console.log(todo);
          const botMessage = `I am broadcasting a ${todo.operation} operation with content ${todo.content} and status done=${todo.done}.`;
          
          axios.post(DISCORD_URL, { content: botMessage });
        }
      },
    });

    console.log("Connected to NATS and subscribed to receive upates...");
  } catch (error) {
    console.log("Could not connect to NATS!");
    console.log(error);
  }
};

init();
