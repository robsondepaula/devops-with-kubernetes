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

const Todos = sequelize.define(
  dbConfig.TABLE,
  {
    content: {
      type: Sequelize.STRING(140),
    },
  },
  {
    freezeTableName: true, // avoid automatic plural of definitions
    timestamps: false, // no extra columns
    tableName: dbConfig.TABLE,
  }
);

module.exports = { Todos };
