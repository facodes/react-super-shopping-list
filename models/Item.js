const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Item Schema
const ItemSchema = new Schema({
  name:{
    type:String,
    required:true,
  },
  done:{
    type:Boolean,
    default:false,
  },
  created_at:{
    type:Date,
    default:Date.now,
  },

});

const Item = mongoose.model('item', ItemSchema);
module.exports = {Item , ItemSchema};