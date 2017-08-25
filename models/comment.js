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
        type:String,
        require:true,
        default:(new Date()).toLocaleString()
    },
    blogid:{
        type:String,
        required:true
    }
})

const Comment = module.exports = mongoose.model('Comment',CommentSchema);

module.exports.addComment = function(comment,callback){
    comment.save(callback);
}

module.exports.getCommentByBlogId = function(blogid,callback){
    const query = {blogid:blogid};
    Comment.find(query,callback);
};
