const mongoose = require('mongoose');

const conn = mongoose.connect('mongodb://localhost:27017/3_connection_jwt',{useNewUrlParser : true },()=>console.log('mongo connected'));

module.exports = conn;
