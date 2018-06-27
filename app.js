const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 3000;
const passport = require('passport');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

  
const config = require('./config/database');
const connection = mongoose.connect(config.database);

const user = require('./routes/users');

if(connection){
    console.log("DB connected");
}else{
    console.log("DB not connected");
}

app.use(express.static(path.join(__dirname,"public")));

app.use('/users',user);
app.listen(port,function(){
    console.log("Listen port " +port);
});

app.get("/",function(req,res){
    res.send("hello");
});

