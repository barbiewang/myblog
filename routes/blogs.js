const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
// const User = require('../models/user');
const config = require('../config/database');
// const Comment = require('../models/comment');
const Blog = require('../models/blog')

router.post('/post-blog',(req,res,next)=>{
    let newBlog = new Blog({
        headline : req.body.headline,
        content:req.body.content,
        author:req.body.author,
        time:(new Date()).toLocaleString()
    });
    Blog.addBlog(newBlog,(err,blog)=>{
        if(err){
            res.json({success:false,msg:err});
            console.error(err);
        }else{
            res.json({success:true,msg:'success to post blog'});
            console.log(blog);
        }
    })
})

router.get('/blog-author',(req,res,next)=>{
    let author = req.query.author;
    Blog.getBlogByAuthor(author, (error, result )=> {
        res.json({blogs: result});
    })
    
})
router.get('/blog-author-notjane',(req,res,next)=>{
    let author = req.query.author;
    Blog.getBlogByOtherAuthor(author, (error, result )=> {
        res.json({blogs: result});
    })
    
})

// router.get('/blog/:id',(req,res,next)=>{
//     console.log(req.body);
//     let author = req.query.author;
//     Blog.getBlogByAuthor(author, (error, result )=> {
//         res.json({blogs: result});
//     })
// })
module.exports = router;