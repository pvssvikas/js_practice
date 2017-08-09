var express = require('express');
var router = express.Router();
var Mongo = require('mongodb')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/userdb";
var userDB = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register',function(req,res){
    res.render('userReg');
});

router.post('/mainScreen',function(req,res){
  var newUser = {
          "first_name" : req.body.first_name,
          "last_name" : req.body.last_name,
          "email" : req.body.email,
          "password" : req.body.password
          };
    res.render('defineHome');
    userDB.saveUser(newUser, function(userFromDB) {
        res.render('mainScreen',{
          "request" : req,
          "user_name": newUser.first_name
        });
    });
});

router.get('/defineHome',function(req,res){
  //res.render('index', { title: 'Express' });
  res.render('defineHome');
});

router.post('/signin',function(req,res){
  var query = { email : req.body.email}
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("users").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result.email);
    db.close();
  });
});
  res.render('mainScreen');
});

router.get('/defineSB',function(req,res){
  res.render('defineSB');
});

module.exports = router;
