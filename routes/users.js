
const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Request = require("../models/request")
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');
// var bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// router.use(bodyParser.json());
router.get("",function(req,res){
    res.send("hello users");
});

router.post("/register",function(req,res){
    const newUser = new User({
        username:req.body.username,
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    User.saveUser(newUser,function(err,user){
        if(err){
            res.json({state:false, msg:"Data not inserted"});
        }
        if(user){
            res.json({state:true, msg:"Data inserted"});
        }

    });
});

router.post("/login",function(req,res){
    const email = req.body.email;
    const password = req.body.password;

    User.findByEmail(email, function(err, user){
        if(err) throw err;
        if(!user){
            res.json({state:false,msg:"No user found"});
            return false;
        }
        User.passwordCheck(password,user.password, function(err,match){
            if(err) throw err;
            var user1 ={
                id:user._id,
                name:user.name,
                username:user.username,
                email:user.email

            }
            
            if(match){
                // res.json({state:true});
                const token = jwt.sign(user1, config.secret,{expiresIn:86400});
                res.json(
                    {
                        state:true,
                        //token:"JWT " + token,
                        token:token,
                        user:{
                            id:user._id,
                            name:user.name,
                            username:user.username,
                            email:user.email
                            
                        }
                        
                    }
                );
            }
        });   
    }); 
});

router.get('/profile', verifyToken, (req,res)=>{
    jwt.verify(req.token, config.secret, function(err, myData){
        if(err){
            res.json({status:"Access denied"});
        }else{
            res.json({
                status:"Access granted",
                data:myData
            });
        };
    });
});

function verifyToken(req, res, next){
    if(typeof(req.headers['authorization'])!= 'undefined' && req.headers['authorization']!= 'undefined'){
        var userToken = req.headers['authorization'];
        if(userToken !='undefined'){
            req.token = userToken;
            next();
        }else{
            res.json({msg:"Unauthorized Request.."});
        }

    }else{
        res.json({msg:"Unauthorized Request.."});
    }

};

router.post('/request',function(req,res){
    
    const newRequest = req.body;
    Request.addRequest(newRequest,function(err,newRequest){
        if(err){
            res.json({state:false, msg:"Somthing went wrong"});
        }
        if(newRequest){
            res.json({state:true, msg:"Successfully requested"});
        }
        
    });

});

router.get('/myrequest/:email',function(req,res){
    var email ='';
    email = req.params.email;
    Request.findRequestbyEmail(email,function(err,email){
        if(err){
            res.json(err);
        }
        if(email1){
            res.json(email);
        }
    })
});



// router.post('/profile', passport.authenticate('jwt', { session: false }), function(req, res) {
//         res.json({user:req.user});
//     }
// );

module.exports = router;