var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserModels= new Schema({
    name : String,
    email : String,
    password : String,
    role : String,
    imglink : String
})

UserModels = mongoose.model('UserModels',UserModels);
module.exports=UserModels
