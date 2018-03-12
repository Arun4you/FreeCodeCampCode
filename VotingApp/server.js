var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app=express();
var morgan = require('morgan');
var mainRouter = require("./routes/mainRouter")
var usersRouter = require("./routes/usersRouter")
var mongoose = require("mongoose")
var passport = require('passport')
var cors = require('cors');
var jwt = require('jsonwebtoken')

app.use(morgan('dev'));
require('dotenv').config({
  silent: true
});

mongoose.connect(process.env.DB,()=>{
  console.log("DB connected")
})

//app.set('views', path.join(__dirname,'client')); 
app.set('view engine', 'ejs'); 
app.engine('html', require('ejs').renderFile); 
app.use(express.static(path.join(__dirname, 'client'))); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.use('/', mainRouter);
app.use('/users',usersRouter);

app.listen(process.env.PORT, function(err) {
  if (err) throw err;
  console.log("Server is Running on port " + process.env.PORT);
});
