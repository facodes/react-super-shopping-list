const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoppingListModel = require('./ShoppingList');
const { ShoppingListSchema } = ShoppingListModel;

// Create User Schema
const UserSchema = new Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
  },
  shoppingLists:[ShoppingListSchema],

  register_date:{
    type:Date,
    default:Date.now,
  },
  

});

const User = mongoose.model('user', UserSchema);
module.exports = User;