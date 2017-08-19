const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database')

//register
router.post('/register',(req,res,next)=>{
     let newUser = new User({
         name:req.body.name,
         email:req.body.email,
         username:req.body.username,
         password:req.body.password
     });
     User.getUserByUsername(newUser.username,(err,user)=>{
        if(err) throw err;
        if(user){
            return res.json({success:false,msg:'用户名已存在，请尝试新的用户名'});
        }else{
            User.addUser(newUser,(err,user)=>{
                if(err){
                    res.json({success:false,msg:'fail to register'});
                    console.error(err);
                }else{
                    res.json({success:true,msg:'success to register'});
                    console.log(user);
                }
            });
        }
    });
})
router.post('/validate-username',(req,res,next)=>{
     User.getUserByUsername(req.body.username,(err,user)=>{
        if(err) throw err;
        if(user){
            return res.json({success:false,msg:'用户名已存在，请尝试新的用户名'});
        }else {
            res.json({success:true,msg:"用户名可用"})
        }
    })
})
//authenticate
router.post('/authenticate',(req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username,(err,user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success:false,msg:'用户名不存在'});
        }
        User.comparePassword(password,user.password,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user,config.secret,{
                    expiresIn:604800
                });
                res.json({
                    success:true,
                    token:'JWT '+token,
                    user:{
                        id:user._id,
                        name:user.name, 
                        username:user.username,
                        email:user.email,
                        password:user.password
                    }
                })
            }else{
                return res.json({success:false,msg:'密码错误'})
            }

    })

    })
})

//profile
router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
     res.json({
         user:req.user
     })
})

router.post('/update',(req,res,next)=>{
            User.updateUser(req.body._id, req.body.name, req.body.email, (error, result) => {
                if (error) {
                    console.error("update user error");
                    return res.json({success: false, msg:"update to databse failed!"});
                } else {
                    console.info("update success: " + result);
                    return res.json({success: true, user: result});
                }
            });

});
 router.post('/password',(req,res,next)=>{
     User.updatePassword(req.body._id, req.body.password, (error, result) => {
         if (error) {
             console.error("update password error");
            return res.json({success: false, msg:"update to databse failed!"});
         } else {
             User.getUserByUsername(req.body.username,(err,user)=>{
                 const token = jwt.sign(user,config.secret,{
                    expiresIn:604800
                });
                res.json({
                    success:true,
                    token:'JWT '+token,
                    user:{
                        id:user._id,
                        name:user.name, 
                        username:user.username,
                        email:user.email,
                        password:user.password
                    }
                })
             })
             
            }
    });

});

  
module.exports = router;