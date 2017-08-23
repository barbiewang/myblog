const mongoose = require('mongoose');
const config = require('../config/database');

const BlogSchema = mongoose.Schema({
    headline:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true,
        default:"Jane",
    },
    time:{
        type:String,
        require:true,
        default:(new Date()).toLocaleString()
    }
})

const Blog = module.exports = mongoose.model('Blog',BlogSchema);

module.exports.addBlog = function(blog,callback){
    blog.save(callback);
}

module.exports.getBlogByAuthor= function(author,callback){
    const query = {author:author};
    Blog.find(query,callback);
};
module.exports.getBlogByOtherAuthor= function(author,callback){
    const query = {author:{$ne:author}};
    Blog.find(query,callback);
};
module.exports.getBlogById = function(id,callback){
    Blog.findById(id,callback);
}