//require sequalize and dotenv file
const Sequelize = require('sequelize');
require('dotenv').config();
// for dotenv reasons/layout
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  //how to connect to db
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3301,
  }
);

module.exports = sequelize;