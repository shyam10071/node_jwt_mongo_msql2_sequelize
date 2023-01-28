const { Sequelize, DataTypes } = require("sequelize");


const sequelize = new Sequelize(
  '3_connection_jwt_sequalize',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);


sequelize.authenticate().then(() => {
  console.log('Connection with sequelize has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});



module.exports = sequelize
