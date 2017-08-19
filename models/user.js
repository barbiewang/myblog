const mongoose = require('mongoose');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const User = module.exports = mongoose.model('User',UserSchema);


module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
};
module.exports.getUserByUsername= function(username,callback){
    const query = {username:username}
    User.findOne(query,callback);
};
module.exports.addUser = function(newUser,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}
module.exports.updateUser = function(userId, name, email,callback){
    User.update({_id : userId}, {name: name, email: email},  (error, result) => {
        callback(error, result);
    });
    
}
module.exports.updatePassword= function(userId, password,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,(err,hash)=>{
            if(err) throw err;
            password = hash;
            User.update({_id : userId}, {password:password},  (error, result) => {
                 callback(error, result);
            });
        })
       
    })
    
    
}
module.exports.comparePassword = function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
        if(err) throw err;
        callback(null,isMatch);
    })
}

