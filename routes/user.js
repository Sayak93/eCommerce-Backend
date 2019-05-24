var express = require('express');
var router = express.Router();
var UserModel = require('../models/user')
var jwt = require('jsonwebtoken')

router.get('/', (req,res)=>{
    UserModel.findOne({email:req.headers.id})
    .exec()
    .then((data,err)=>{
        if(err){
            res.status(400).send({"message": "failed", "Error" : "User no found"})
        }
        else{
            token = req.headers.authorization;
            jwt.verify(token, data.password, function(err, decoded) {
                if(err){
                    res.status(400).send({"message": "failed", "Error" : "Authentication Failed"})
                }
                else{
                    UserModel.find().exec().then((data, err)=>{
                        if(err){
                            console.log(err);                            
                            res.status(400).send({"message": "failed", "Error" : err})
                        }
                        else{
                            res.status(200).send({"message":"ok", "data" : data})
                        }
                    })
                }
              });
        }
    })
})
router.post('/', (req,res)=>{
    UserModel.findOne({email:req.headers.id})
    .exec()
    .then((data,err)=>{
        if(err){
            res.status(400).send({"message": "failed", "Error" : "User no found"})
        }
        else{
            token = req.headers.authorization;
            jwt.verify(token, data.password, function(err, decoded) {
                if(err){
                    res.status(400).send({"message": "failed", "Error" : "Authentication Failed"})
                }
                else{
                    data = new UserModel(req.body)
                    data.save().then(data=>{
                        res.status(200).send({"message": "ok"})
                    }).catch(e => {
                        console.log(e)
                        res.status(400).send({"message": "failed"})
                    })
                }
              });
        }
    })
})
router.put('/', (req,res)=>{
    UserModel.findOne({email:req.headers.id})
    .exec()
    .then((data,err)=>{
        if(err){
            res.status(400).send({"message": "failed", "Error" : "User no found"})
        }
        else{
            token = req.headers.authorization;
            jwt.verify(token, data.password, function(err, decoded) {
                if(err){
                    res.status(400).send({"message": "failed", "Error" : "Authentication Failed"})
                }
                else{
                    UserModel.findOneAndUpdate({"_id":req.body._id},req.body,{upsert:true}).exec().then((data, err)=>{
                        if(err){
                            res.status(400).send({"message": "failed", "Error" : err})
                        }
                        else{
                            res.status(200).send({"message":"ok", "data" : data})
                        }
                    })
                }
            });
        }
    })
})
router.delete('/', (req,res)=>{
    UserModel.findOne({email:req.headers.id})
    .exec()
    .then((data,err)=>{
        if(err){
            res.status(400).send({"message": "failed", "Error" : "User no found"})
        }
        else{
            token = req.headers.authorization;
            jwt.verify(token, data.password, function(err, decoded) {
                if(err){
                    res.status(400).send({"message": "failed", "Error" : "Authentication Failed"})
                }
                else{
                    UserModel.findOneAndDelete({"_id":req.query._id}).exec().then((data, err)=>{
                        if(err){
                            console.log(err);                            
                            res.status(400).send({"message": "failed", "Error" : err})
                        }
                        else{
                            res.status(200).send({"message":"ok", "data" : data})
                        }
                    })
                }
            });
        }
    })
})


module.exports = router;