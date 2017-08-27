const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Comment = require('../models/comment');

router.get('/comment/:id', (req, res, next) => {
    let id = req.params.id;
    Comment.getCommentByBlogId(id, (error, result) => {
        console.log(result);
        let comments = [];
        let kv = {};
        for (var i = 0; i < result.length; i++) {
            let comment = result[i];
            if (comment.rootid == undefined) {
                let commentGroup = [];
                kv[comment._id] = commentGroup;
                comments.push(commentGroup);
                commentGroup.push(comment);
            } else {
                let commentGroup = kv[comment.rootid];
                commentGroup.push(comment);
            }
        }
        // for (var i = 0; i < result.length; i ++) {
        //     let rootComment = result[i];
        //     if (rootComment.rootid == undefined) {
        //         let commentGroup = [];
        //         commentGroup.push(rootComment);
        //         for (var j = 0; j < result.length; j ++) {
        //             let comment = result[j];
        //             console.log("rootid", comment.rootid, " id" , rootComment._id);
        //             if (comment.rootid == rootComment._id) {
        //                 commentGroup.push(comment);
        //             }
        //         }
        //         comments.push(commentGroup);
        //     }
        // }
        console.log("DEBUG");
        console.log(comments);
        // for(let i = 0;i<)
        res.json({ comments: comments })
    })
})
router.post('/comment', (req, res, next) => {
    let newComment = new Comment({
        text: req.body.text,
        username: req.body.username,
        time: (new Date()).toLocaleString(),
        blogid: req.body.blogid,
        replyid: req.body.replyid,
        rootid: req.body.rootid,
        replyusername:req.body.replyusername
    });
    Comment.addComment(newComment, (err, result) => {
        if (err) {
            res.json({ success: false, msg: 'fail to comment' });
            console.error(err);
        } else {
            res.json({ success: true, msg: 'success to comment' });
            console.log(result);
        }
    })
})
router.delete('/comment-delete/:id', (req, res, next) => {
    let id = req.params.id;
    Comment.remove({ _id: id }, (err, result) => {
        res.json({ comment: result });
    });
})

module.exports = router;