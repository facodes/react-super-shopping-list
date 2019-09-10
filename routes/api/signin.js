const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/User');


// @route POST api/signin
// @desc  create a new user
// @access  public
router.post('/' , async (req, res)=> {
  
  // validate
  const { username, name, password } = req.body;  
  if ( !name || !username || !password ){
    return res.status(400).json({msg:'Please complete all the fields'});
  }

  const isRegistred = await User.findOne ({username}); // checking if user is already register
  if (!isRegistred){

    // creating newUser with hashed password and mongoose model
    const salt = bcrypt.genSaltSync(10); // salt for hashing password
    const newUser = new User ({
      name,
      username,
      password:bcrypt.hashSync( password,  salt),
    });

    // saving user to database and generating JWT with user id
    newUser.save()
      .then (() => { return res.status(200).json({ msg:'success'})

    });
    
  }else{
    return res.status(400).json({ msg: 'User already exists' });
  }

});

module.exports = router;
