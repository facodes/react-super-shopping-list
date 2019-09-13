const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const User = require('../../models/User');

// @route POST api/login
// @desc  login with password and username
// @access  public
router.post('/' , async (req, res)=> {
  
  const { username,  password } = req.body;  // validating request data
  if ( !username || !password ){
    return res.status(400).json({msg:'Please complete all the fields'});
  }
  
  const user = await User.findOne({username}); // checking if user exist in db
  if (!user){
    return res.status(400).json({msg:'Username not exist or is not correct'});
  }else{

    const match = bcrypt.compareSync( password , user.password); // if password match
    if (!match){
      return res.status(400).json({msg:'Wrong Password'});
    }
    else{
      token = await jwt.sign({id: user._id}, process.env.jwtSecret); 
      return res.json({ token });
    }
  }
});

module.exports = router;
