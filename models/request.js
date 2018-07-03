var mongoose = require('mongoose');

// leave request
var requestSchema =  mongoose.Schema({
    email:{type:String, required:true},
    status:{type:String, required:true},
    leaveCat:{type:String, required:true},
    sdate:{type:String, required:true},
    edate:{type:String, required:true},
    reason:{type:String, required:true},
    address:{type:String, required:true},
    mobile:{type:String, required:true}
}); 
var Request = module.exports = mongoose.model("requests",requestSchema);
module.exports.addRequest = function(request,callback){
    Request.create(request,callback);
}

module.exports.findRequestbyEmail = function(email, callback){
    const quary = {email:email, status:"pending"};
    Request.find(quary,callback);
}

module.exports.findPendingRequest = function(callback,limit){
    const quary = {status:"pending"};
    Request.find(quary,callback).limit(limit);
}

module.exports.deleteMyRequest = function(id,callback){
    const quary = {_id:id};
    Request.deleteOne(quary,callback);
}
module.exports.updateMyRequest = function(id, request,callback){
    const quary = {_id:id};
    const update = {$set:{
        sdate:request.sdate,
        edate:request.edate,
        reason:request.reason,
        address:request.address,
        mobile:request.mobile
    }}
    Request.findOneAndUpdate(quary, update,{new: true},callback);
}