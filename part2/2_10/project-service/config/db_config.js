require("dotenv").config();

module.exports = {
  HOST: process.env.POSTGRES_HOST,
  PORT: process.env.POSTGRES_PORT,
  USER: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  DB: process.env.POSTGRES_DB,
  TABLE: process.env.POSTGRES_TABLE,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
};