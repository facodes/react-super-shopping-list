const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemModel =  require('./Item');
const { ItemSchema } = ItemModel

const ShoppingListSchema = new Schema ({
  name:{
    type:String,
    required:true,
  },
  items:{
    type:[ItemSchema],
    required:true,
  },
  budget:{
    type: Number,
    default: null
  },
  created_at:{
    type:Date,
    default: Date.now,
  }
});

const ShoppingList = mongoose.model('shopping-list', ShoppingListSchema);
module.exports = {ShoppingList, ShoppingListSchema}