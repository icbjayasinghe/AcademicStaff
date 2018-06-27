

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const jwt = require('jsonwebtoken');

const userSchema = new schema({
    username:{type:String, required:true},
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
});

const User = module.exports = mongoose.model("User",userSchema);

module.exports.saveUser = function(newUser,callback){
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            // Store hash in your password DB.

            if(err) throw err;
            newUser.save(callback);
        });
    });

};

module.exports.findByEmail = function(email, callback){
    const quary = {email:email};
    User.findOne(quary,callback);
}

module.exports.passwordCheck = function(plainpassword,hash, callback){
    bcrypt.compare(plainpassword, hash, function(err, res) {
        if(err) throw err;
        if(res){
            callback(null,res);
        }
    });
}

module.exports.findUserbyId =function(id,callback){
    User.findOne(id,callback);  
};