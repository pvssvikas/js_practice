var express = require('express');
var router = express.Router();
var Mongo = require('mongodb')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/projectdb";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register',function(req,res){
    res.render('userReg');
});

router.post('/mainScreen',function(req,res){
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var newUser = {
          first_name : req.body.first_name,
          last_name : req.body.last_name,
          email : req.body.email,
          password : req.body.password
          }
        // insert method
      db.collection("users").insertOne(newUser, function(err, res) {
        if (err) throw err;
        console.log("1 record inserted");
        console.log(req.body.first_name);
        });
        res.render('mainScreen',{
                user_name: req.body.first_name 
        }); 
      });             
    });

router.get('/defineHome',function(req,res){
  //res.render('index', { title: 'Express' });
  res.render('defineHome');
});

router.post('/signin',function(req,res){
  res.render('mainScreen');
});

router.get('/defineSB',function(req,res){
  res.render('defineSB');
});



module.exports = router;
