const express = require('express');
const router = express.Router();
const auth = require ('../../middlewares/auth');

// Models
const User = require('../../models/User');
const { ShoppingList } = require('../../models/ShoppingList');
const { Item } = require('../../models/Item');


// @route   GET api/user/auth
// @desc    Get user data
// @access  Private
router.get('/auth', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

// CRUD shopping List

// @route  GET api/user/shopping
// @desc   Get shopping Lists
// @access Private
router.get('/shopping' , auth, (req,res) => {
  User.findById(req.user.id)
    .then( user => {
        user.shopping_lists = sortByDate(user.shopping_lists);
        res.json({shopping_lists:user.shopping_lists})  
    })
})

// @route  POST api/user/shopping
// @desc   Add a new shopping list
// @access Private
router.post('/shopping', auth, (req,res) => {
  User.findById(req.user.id)
    .then( user => {
      const newShoppingList = new ShoppingList({
        name:req.body.name
      }) 
      user.shopping_lists.push(newShoppingList)
      user.shopping_lists = sortByDate(user.shopping_lists);
      user.save()
        .then(user => {
          res.json({ shopping_lists:user.shopping_lists })
        })
    })
});


// @route  DELETE api/user/shopping
// @desc   Delete a shopping list
// @access Private
router.delete('/shopping' ,auth, (req, res) => {
  User.findById(req.user.id)
    .then( user => {
      user.shopping_lists.remove(req.body.id);
      user.shopping_lists = sortByDate(user.shopping_lists);
      user.save().then(user => res.json({shopping_lists:user.shopping_lists}));
    })
});

// CRUD item routes

// @route  POST api/user/item 
// @desc   Add a new item in a given shopping list
// @access Private
router.post('/item', auth, (req,res) => {
  User.findById(req.user.id)
    .then( user => {
      const newItem = new Item ({
        name: req.body.name
      })
      const shoppingList = user.shopping_lists.id(req.body.id);
      if(!shoppingList){
        res.status(404).json({msg:"no shopping list found"})
      }else{
        shoppingList.items.push(newItem);
        shoppingList.items =  sortByDate (shoppingList.items);
        user.save().then(() => res.json({items: shoppingList.items})) 
      }
    })
});

// @route  DELETE api/user/item 
// @desc   Delete an item from a given shopping list
// @access Private
router.delete('/item', auth, (req,res) => {  
  User.findById(req.user.id)
    .then( user => {
      const shoppingList = user.shopping_lists.id(req.body.shoppingListID);
      if (!shoppingList){
        res.status(404).json({msg:"no shopping list found"})
      }else{
        shoppingList.items.remove(req.body.itemID);
        shoppingList.items =  sortByDate (shoppingList.items);
        user.save().then(() => res.json({items: shoppingList.items})) 
      }
    })
});

// @route  GET api/user/item 
// @desc   Get all the items from a given shopping list
// @access Private
router.get('/item', auth, (req,res) => {
  User.findById(req.user.id)
    .then( user => {
      const shoppingList = user.shopping_lists.id(req.body.id);
      if (!shoppingList){
        res.status(404).json({msg:"no shopping list found"});
      }else{
        res.json({items: shoppingList.items});
      }
    })
});

// @route  POST api/user/item/done 
// @desc   set status of a item done
// @access Private
router.post('/item/done', auth, (req,res) => {
  User.findById(req.user.id)
    .then( user => {
      const shoppingList = user.shopping_lists.id(req.body.shoppingListID);
      if (!shoppingList){
        res.status(404).json({msg:"no shopping list found"})
      }else{
        const item = shoppingList.items.id(req.body.itemID);
        item.done = !item.done;
        user.save().then( res.json(shoppingList.items));
      }
    })
});

function sortByDate(array){
  return array.sort((obj1, obj2) => {
    return new Date(obj2.created_at) - new Date(obj1.created_at);
  })
}

module.exports = router;
