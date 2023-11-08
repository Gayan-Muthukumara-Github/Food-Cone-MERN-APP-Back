const mongoose = require('mongoose')

const { Schema } = mongoose;

const ReviewsSchema = new Schema({
    message:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    jobrole:{
        type:String,
        required:true,
        unique:true
    },
    city:{
        type:String,
        required:true
    },

  });

  module.exports = mongoose.model('reviews',ReviewsSchema)