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
        time:req.body.time,
        like:1
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

router.get('/blog/:id',(req,res,next)=>{  
    let id = req.params.id;
    console.log(123,id);
    Blog.getBlogById(id, (error, result )=> {
        res.json({blog: result});
    })
})
router.delete('/blog-delete/:id',(req,res,next)=>{
    let id = req.params.id;
    Blog.remove({_id:id},(err,result)=>{
        res.json({blog:result});
    });
})
router.get('/blog-edit/:id',(req,res,next)=>{
    let id = req.params.id;
    Blog.getBlogById(id,(err,result)=>{
        res.json({blog:result});
    })
})
router.post('/blog-update/:id',(req,res,next)=>{
    let id = req.params.id;
    let blog = req.body;
    console.log(id,blog);
    Blog.update({_id:id},
        {headline:blog.headline,author:blog.author,time:blog.time,content:blog.content,like:blog.like},
        (err,result)=>{
        res.json({blog:result});
    });
})
router.post('/blog-addlike/:id',(req,res,next)=>{
    let id = req.params.id;
    Blog.addLike(id, (error, result )=> {
        res.json({blog: result})
    })
})
router.post('/blog-cancellike/:id',(req,res,next)=>{
    let id = req.params.id;
    Blog.cancelLike(id, (error, result )=> {
        res.json({blog: result})
    })
})
module.exports = router;