var mongoose = require("mongoose")
var bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    username:{type:String},
    email:{type:String,require:true},
    password:{type:String,required:true}
})

const User = module.exports = mongoose.model('User',UserSchema);


module.exports.getUserById = function(id,callback){
    User.findById(id,callback)
}

module.exports.getUserByUsername = function(username,callback){
    User.findOne({username:username},callback)
}

module.exports.addUser=function(newUser, callback){
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        // Store hash in your password DB.
        if(err) throw err;
        newUser.password = hash; 
        newUser.save(callback);
    });
});
}

module.exports.comparePassword = function (candidatepassword, hash, callback) {
    bcrypt.compare(candidatepassword,hash,(err, isMatch)=>{
        if(err) throw err;
        callback(null,isMatch)
    })
}