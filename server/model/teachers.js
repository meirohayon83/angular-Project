const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema for router teacher

const teacher = new Schema({


  name:String,
  lastName:String,
  topic:String,
  city:String,
  neighborhood:String,
  email:String,
  phone:String,
  time:String,
  description:String,
  days:String,
  image:String,
  activeToken:String,

  date:{
    type: String,
    default:new Date().toLocaleString().split(',')[0]
  }
})





module.exports = mongoose.model('teachers', teacher)