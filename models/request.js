var mongoose = require('mongoose');

// leave request
var requestSchema =  mongoose.Schema({
    email:{type:String, required:true},
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
