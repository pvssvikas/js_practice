var express = require('express');
var router = express.Router();
var session = require('express-session');

require('../models/init')();

var userDB = require('../models/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.loggedInUser) {
    res.redirect("/mainScreen");
  } else {
    res.render('login');
  }
});

router.get('/userReg',function(req,res){
    res.render('userReg');
});

router.get('/mainScreen', function(req, res){
  if (req.session.loggedInUser) {
      res.render('mainScreen',{
          "request" : req,
          "user_name": req.session.loggedInUser.email
      });

  } else {
    res.redirect("/");
  }
});

router.post('/mainScreen',function(req,res){
  var check = req.body.login;
  if(check == 'Register'){
    var newUser = {
          "first_name" : req.body.firstName,
          "last_name" : req.body.lastName,
          "email" : req.body.email,
          "password" : req.body.password
          };

    userDB.saveUser(newUser, function(userFromDB) {
        
        req.session.loggedInUser = userFromDB[0];

        res.render('mainScreen',{
          "request" : req,
          "user_name": userFromDB[0].email
        });
    });
  }
  if(check == 'sign-in'){
    userDB.checkUser(req.body.email, req.body.password, function(userFromDB){

      if (userFromDB[0].email == req.body.email) {
        req.session.loggedInUser = userFromDB[0];
        res.render('mainScreen',{
          "user_name" : userFromDB[0].email
        });
      } else {
        if (userFromDB[0].password == "wrong passwd") {
          res.redirect("/?msg=check_user_detail");
        } else {
          res.redirect("/?msg=not_registered");
        }
      }
    })
  }
  
  
});

router.get('/defineHome',function(req,res){
   
  res.render('defineHome');
});

router.post('/defineHome',function(req,res){
  //var data = JSON.parse(req.body.retData);//error occuring

  //  var selAppliances = data.appliances;
  res.redirect('defineHome')
  });

router.get('/defineSB',function(req,res){
  res.render('defineSB',{
    'index' : 'expres'
  });
});

router.get('/logout',function(req,res){
  req.session.destroy();

  res.redirect('/');
});

module.exports = router;
