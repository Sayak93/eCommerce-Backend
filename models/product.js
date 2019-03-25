var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductModel= new Schema({
    imgLink : String,
    productName : String,
    productPrice : Number
})

ProductModel = mongoose.model('ProductModel',ProductModel);
module.exports=ProductModel;
