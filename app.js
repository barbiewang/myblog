const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const app = express();
const port = 3000;
const config = require('./config/database');
const users = require('./routes/users');

//start server
app.listen(port,()=>{
    console.log('server started on port '+ port);
})
//cors middleware
app.use(cors());

//bodyparser middleware
app.use(bodyParser.json());

//connect mongo
//mongoose.Promise = global.Promise
mongoose.connect(config.database, { useMongoClient: true });
mongoose.connection.on('connected',()=>{
    console.log('connected to mongoose ' + config.database);
});
mongoose.connection.on('error',(err)=>{
    console.log('database error ' + err);
});

//use router

app.use('/users',users)

//set static folder
app.use(express.static(path.join(__dirname,'public')));

//index route
app.get('/',(req,res)=>{
   res.send('invaid endpoint')
})

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
