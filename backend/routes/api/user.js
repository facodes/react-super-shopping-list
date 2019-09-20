const express = require('express');
const router = express.Router();
const auth = require ('../../middlewares/auth');

// Models
const User = require('../../models/User');
const { ShoppingList } = require('../../models/ShoppingList');
const { Item } = require('../../models/Item');


// @route   GET api/user/
// @desc    Get user data
// @access  Private
router.get('/', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

/**
  * CRUD SHOPPING LISTS *
**/

// @route  POST api/user/shopping
// @desc   Add a new shopping list
// @access Private
router.post('/shopping', auth, (req,res) => {
  User.findById(req.user.id)
    .then( user => {
      const newShoppingList = new ShoppingList({
        name: req.body.name,
        budget: req.body.budget
      }) 
      user.shoppingLists.push(newShoppingList)
      user.save()
        .then(user => {
          res.json({ shoppingLists:user.shoppingLists })
        })
    })
    .catch((err) => res.json({error:err}))
});


// @route  GET api/user/shopping
// @desc   Get shopping Lists
// @access Private
router.get('/shopping' , auth, (req,res) => {
  User.findById(req.user.id)
    .then( user => {
        res.json({shoppingLists:user.shoppingLists})  
    })
})

// @route PATCH api/user/shopping
// @desc Update a specified shopping list
// @acces private
router.patch('/shopping/:id' , auth, (req, res)=>{
  User.findById(req.user.id)
    .then(user => {
      const shoppingList = user.shoppingLists.id(req.params.id);
      shoppingList.name = req.body.name  || shoppingList.name;
      shoppingList.budget = req.body.budget || shoppingList.budget;
      user.save().then(user => res.json({shoppingLists:user.shoppingLists}));
    })
})

// @route  DELETE api/user/shopping
// @desc   Delete a shopping list
// @access Private
router.delete('/shopping', auth, (req, res) => {
  User.findById(req.user.id)
    .then( user => {
      user.shoppingLists.remove(req.body.id);
      user.save().then(user => res.json({shoppingLists:user.shoppingLists}));
    })
});

/**
  * CRUD ITEMS *
**/

// @route  POST api/user/:shoppinglistid/item 
// @desc   Add a new item in a given shopping list
// @access Private
router.post('/:id/item', auth, (req,res) => {
  User.findById(req.user.id)
    .then( user => {
      const newItem = new Item ({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
      })
      const shoppingList = user.shoppingLists.id(req.params.id);
      if(!shoppingList){
        res.status(404).json({msg:"no shopping list found"})
      }else{
        shoppingList.items.push(newItem);
        user.save().then(() => res.json({items: shoppingList.items})) 
      }
    })
});

// @route  GET api/user/:shoppinglistid/item 
// @desc   Get all the items from a given shopping list
// @access Private
router.get('/:id/item', auth, (req,res) => {
  User.findById(req.user.id)
    .then( user => {
      const shoppingList = user.shoppingLists.id(req.params.id);
      if (!shoppingList){
        res.status(404).json({msg:"no shopping list found"});
      }else{
        res.json({items: shoppingList.items});
      }
    })
});

// @route PATCH api/user/:shoppinglistId/:itemId
// @desc Update a specified shopping list
// @acces private
router.patch('/:shoppinglistId/:itemId' , auth, (req, res)=>{
  User.findById(req.user.id)
    .then(user => {
      const shoppingList = user.shoppingLists.id(req.params.shoppinglistId);
      const item = shoppingList.items.id(req.params.itemId);
      item.name = req.body.name  || item.name;
      item.price = req.body.price || item.price;
      item.quantity = req.body.quantity || item.quantity;
      user.save().then(() => res.json({items: shoppingList.items})) 
    })
})

// @route  DELETE api/user/:shoppinglistId/:itemId
// @desc   Delete an item from a given shopping list
// @access Private
router.delete('/:shoppinglistId/:itemId', auth, (req,res) => {  
  User.findById(req.user.id)
    .then( user => {
      const shoppingList = user.shoppingLists.id(req.params.shoppinglistId);
      if (!shoppingList){
        res.status(404).json({msg:"no shopping list found"})
      }else{
        shoppingList.items.remove(req.params.itemId);
        user.save().then(() => res.json({items: shoppingList.items})) 
      }
    })
});


// @route  POST api/user/:shoppinglistId/:itemId/done
// @desc   set status of a item done
// @access Private
router.post('/:shoppinglistId/:itemId/done', auth, (req,res) => {
  User.findById(req.user.id)
    .then( user => {
      const shoppingList = user.shoppingLists.id(req.params.shoppinglistId);
      if (!shoppingList){
        res.status(404).json({msg:"no shopping list found"})
      }else{
        const item = shoppingList.items.id(req.params.itemId);
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
