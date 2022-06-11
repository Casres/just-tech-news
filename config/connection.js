// imports the sequelize constructor from the JavaScript Library
const Sequelize = require('sequelize');

// gets the dotenv npm, file for this is in the .env file in the root folder
require('dotenv').config();

// creates a connection to the database, 
// and passes in your MySQL username and password information
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize; 

// REMEMBER, sequelize is a middle man for 
// JavaScript and ANY SQL dialect, which in this case is MySQL  