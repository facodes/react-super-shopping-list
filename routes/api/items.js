const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');
// middlewares
const auth = require('../../middlewares/auth');

// @route GET api/items
// @desc Get all items
// @access  private
router.get('/' , auth, (req, res)=>{
  Item.find()
    .sort({date:-1})
    .then(items=> res.json(items));
});


// @route POST api/items
// @desc  create a new item
// @access  private
router.post('/' , (req, res)=>{
  const newItem = new Item( {
    name:req.body.name
  })

  newItem.save()
    .then(item => res.json(item));

});

// @route DELTE api/items
// @desc Delete An item
// @access  private
router.delete('/:id' , (req, res)=>{
  Item.findById(req.params.id)
    .then( item => {
      item.remove()
        .then(() => res.json({success:true}));
    })
    .catch(err => res.status(404).json({success:false}));
});

module.exports = router;