const dbConfig = require("../config/db_config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    idle: dbConfig.pool.idle,
  },
});

const Pingpong = sequelize.define(
  dbConfig.TABLE,
  {
    count: {
      type: Sequelize.INTEGER,
    },
  },
  {
    freezeTableName: true, // avoid automatic plural of definitions
    timestamps: false, // no extra columns
  }
);

module.exports = { Pingpong };
