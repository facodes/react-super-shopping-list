var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');


var app = express();

// middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connecting to mongo
mongoose
  .connect(process.env.MONGO_CONNECTION, {useNewUrlParser: true , useCreateIndex: true})
  .then(()=> console.log('MongoDB Connected'))
  .catch((err)=> console.log(err));

// routes
app.use ('/api/items' , require('./routes/api/items'));
app.use ('/api/signin' , require('./routes/api/signin'));
app.use ('/api/login' , require('./routes/api/login'));
app.use ('/api/user' , require('./routes/api/user'));

if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*' , (req, res) => {
    res.sendFile(path.resolve(__dirname,'client', 'build' , 'index.html'))
  })
}

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
  console.log('server running on port ' + port);
  
})

