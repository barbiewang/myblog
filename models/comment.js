const mongoose = require('mongoose');
const config = require('../config/database');


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
    const query = {username:username}
    Comment.findOne(query,callback);
};
