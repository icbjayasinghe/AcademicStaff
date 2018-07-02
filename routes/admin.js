const express = require('express');
const router = express.Router();
const Request = require("../models/request");
// const config = require('../config/database');

router.get('/allrequest',function(req,res){
    // var email ='';
    // email = req.params.email;
    Request.findPendingRequest(function(err,email1){
        if(err){
            res.json(err);
        }
        if(email1){
            res.json(email1);
        }
    })
});
module.exports = router;