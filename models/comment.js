const mongoose = require('mongoose');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

const CommentSchema = mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    time:{
        type:Date,
        require:true
    }
})

const Comment = module.exports = mongoose.model('Comment',CommentSchema);

module.exports.addComment = function(comment,callback){
    comment.save(callback);
}

module.exports.getCommentByUsername = function(username,callback){
    console.log("here i am");
    Comment.find({username : username}, callback);
};
