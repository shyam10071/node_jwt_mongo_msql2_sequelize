
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../../db/sequelize_db')
const Post = sequelize.define("posts", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false

    },
});

sequelize.sync().then(() => {
    console.log('Post table created with sequalize successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});


module.exports.Post = Post;
