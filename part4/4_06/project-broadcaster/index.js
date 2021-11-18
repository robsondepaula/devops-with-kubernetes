require("dotenv").config();
const { connect, JSONCodec } = require("nats");
const axios = require("axios");

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
          
          axios.post(process.env.DISCORD_URL, { content: botMessage });
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
