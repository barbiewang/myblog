const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Comment = require('../models/comment');

router.get('/comment/:id',(req,res,next)=>{
    let id = req.params.id;
    Comment.getCommentByBlogId(id,(error,result)=>{
         res.json({comments:result})
    })
})
router.post('/comment',(req,res,next)=>{
    let newComment = new Comment({
        text : req.body.text,
        username:req.body.username,
        time:(new Date()).toLocaleString(),
        blogid:req.body.blogid
    });
    Comment.addComment(newComment,(err,result)=>{
        if (err) {
            res.json({success:false,msg:'fail to comment'});
            console.error(err);
        } else {
            res.json({success:true,msg:'success to comment'});
            console.log(result);
        }
    })
})

module.exports = router;