const mongoose = require('mongoose');

const post_schema = new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
},{timestamps:true})

module.exports = mongoose.model('post',post_schema);