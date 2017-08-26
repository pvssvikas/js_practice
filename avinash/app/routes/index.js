var express = require('express');
var router = express.Router();
var session = require('express-session')

require('../models/init')();

var userDB = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.loggedInUser) {
    res.redirect("/mainScreen");
  } else {
    res.render('index');
  }
});

router.get('/register',function(req,res){
    res.render('userReg');
});

router.get('/mainScreen', function(req, res){
  if (req.session.loggedInUser) {
      res.render('mainScreen',{
          "request" : req,
          "user_name": req.session.loggedInUser.first_name
      });

  } else {
    res.redirect("/");
  }
});

router.post('/mainScreen',function(req,res){
  var newUser = {
          "first_name" : req.body.first_name,
          "last_name" : req.body.last_name,
          "email" : req.body.email,
          "password" : req.body.password
          };
    console.log(newUser.first_name + " " + newUser.last_name);

    userDB.saveUser(newUser, function(userFromDB) {
        
        req.session.loggedInUser = userFromDB[0];

        res.render('mainScreen',{
          "request" : req,
          "user_name": userFromDB[0].first_name
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
