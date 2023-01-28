
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../../db/sequelize_db')

const User = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
  
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false
  
    },
    address:{
      type:DataTypes.TEXT,
      allowNull: false
  
    }
  });
  
  sequelize.sync().then(() => {
    console.log('User table created with sequalize successfully!');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });


  module.exports.User = User;
  