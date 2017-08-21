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
        required:true
    },
    time:{
        type:Date,
        require:true
    }
})

const Blog = module.exports = mongoose.model('Blog',BlogSchema);

module.exports.addBlog = function(blog,callback){
    blog.save(callback);
}

module.exports.getBlogById= function(id,callback){
    Blog.findById(id, callback);
};
