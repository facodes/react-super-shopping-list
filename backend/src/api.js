const express = require('express');
const serverless = require('serverless-http');	
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');


const app = express();

// middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connecting to mongo
mongoose
  .connect(process.env.MONGO_CONNECTION, {useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true})
  .then(()=> console.log('MongoDB Connected'))
  .catch((err)=> console.log(err));

const netlifyRoot = '/.netlify/functions';

// routes
app.use (`/api/signin` , require('./routes/api/signin'));
app.use (`/api/login` , require('./routes/api/login'));
app.use (`/api/user` , require('./routes/api/user'));


// Basic get rout
const router = express.Router(); 

app.get('/', (req, res) => {
	res.send("Super shopping list API see https://github.com/felixlopz/react-super-shopping-list for more info");
});

// app.use (`${netlifyRoot}/api/`,  router )

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
})


