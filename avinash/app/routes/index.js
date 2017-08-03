var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register',function(req,res){
  res.render('userReg');
});

router.get('/main',function(req,res){
  res.render('main');
});

router.get('/defineHome',function(req,res){
  //res.render('index', { title: 'Express' });
  res.render('defineHome');
});

router.get('/signin',function(req,res){
  res.render('index');
});

router.get('/defineSB',function(req,res){
  res.render('defineSB');
});

module.exports = router;
