var express = require('express');
var router = express.Router();
var Mongo = require('mongodb')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/userdb";
var results = ''
var expressValidator=require('express-validator');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/go_del',function(req,res){
  res.render('del',{ title: 'Express' });
});

router.get('/go_add',function(req,res){
  res.render('index',{ title: 'Express' });
})

router.get('/go_list',function(req,res){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection('Users', function (err, collection) {
         collection.find().toArray(function(err, items) {
            if(err) throw err; 
            res.render('user',{
                user:'user',
                results:items,
                title: 'Express'
        }); 
      });             
    });
  });
});

router.get('/go_update',function(req,res){
  res.render('update',{ title: 'Express' });
});

// method to add the user
router.post('/adduser',function(req,res){
  req.checkBody("first_name","First name required").notEmpty();
  req.checkBody('last_name','Last name required').notEmpty();

  var errors = req.validationErrors();

  if(errors){
    res.render('index',
                { title: 'Express',
                  errors:errors });
  }
  else{  
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var newUser = {
          title:'Express',
          first_name : req.body.first_name,
          last_name : req.body.last_name,
          }
        // insert method
      db.collection("Users").insertOne(newUser, function(err, res) {
        if (err) throw err;
        console.log("1 record inserted");
        });
      db.collection('Users', function (err, collection) {
          collection.find().toArray(function(err, items) {
              if(err) throw err; 
              res.render('user',{
                  user:'user',
                  results:items,
                  title: 'Express'
          }); 
        });             
      });
    });
  }
});

router.post('/del_user',function(req,res){
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
    db.collection('Users', function (err, collection) {        
       collection.remove({first_name:req.body.first_name,last_name:req.body.last_name},function(err, result) {
           if(err) throw err;    
           console.log('Document Removed Successfully');
           console.log(req.body.first_name);
        });
    });
      db.collection('Users', function (err, collection) {
         collection.find().toArray(function(err, items) {
            if(err) throw err; 
            res.render('user',{
                user:'user',
                results:items,
                title: 'Express'
        }); 
      });             
    });
    });
  });

router.post('/user_update',function(req,res){
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
    db.collection('Users', function (err, collection) {        
      collection.update({first_name: req.body.first_name,last_name:req.body.last_name}, 
                        { $set: { first_name: req.body.up_first_name, last_name: req.body.up_last_name} },function(err, result){
                              if(err) throw err;    
                              console.log('Document Updated Successfully');
                              console.log('First name');
                              console.log(req.body.first_name);
                              console.log('updated first name');
                              console.log(req.body.up_first_name);
                              console.log('updated last name');
                              console.log(req.body.up_last_name);
                          });
                        });
    db.collection('Users', function (err, collection) {
        collection.find().toArray(function(err, items) {
          if(err) throw err; 
          res.render('user',{
              user:'user',
              results:items,
              title: 'Express'
        }); 
      });             
    });
  });
});
module.exports = router;