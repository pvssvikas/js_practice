var express = require('express');
var router = express.Router();
var expressValidator=require('express-validator');
var userDB = require('../models/user');
var results = '';


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', request: req });
});

router.get('/go_del',function(req,res){
  res.render('del',{ title: 'Express', request: req  });
});

router.get('/go_add',function(req,res){
  res.render('index',{ title: 'Express', request: req  });
});

router.get('/go_update',function(req,res){
  res.render('update',{ title: 'Express', request: req  });
});


router.get('/go_list',function(req,res){
  //TODO: -- need to call DB related call
    userDB.listUsers(function(users){
          console.log(users);
          res.render('user', {"results":users});
    });
});

// method to add the user
router.post('/adduser',function(req,res){
var newUser = {
          "title":'Express',
          "first_name" : req.body.first_name,
          "last_name" : req.body.last_name,
          };
    console.log('about to save new user');    
  userDB.saveUser(newUser, function(userFromDB) {
    console.log('got back from DB');
        res.render('user',{
                "user":'user',
                "results":userFromDB,
                "title": 'Express',
                "request": req 
        }); 
  });
});

//method to delete a user from registered users
router.post('/del_user',function(req,res){
  var deleteUser = {
          "title":'Express',
          "first_name" : req.body.first_name,
          "last_name" : req.body.last_name,
      };
  
  userDB.deleteUser(deleteUser, function(userList){
        res.render('user',{
                "user":'user',
                "results":userList,
                "title": 'Express',
                "request": req 
        }); 
  });

  }); // end of post method

//method to update a user from registered user
router.post('/user_update',function(req,res){
var updateUser = {
          "title":'Express',
          "first_name" : req.body.up_first_name,
          "last_name" : req.body.up_last_name,
      };

  userDB.updateUser(req.body.first_name, updateUser, function(userList){
        res.render('user',{
                "user":'user',
                "results":userList,
                "title": 'Express',
                "request": req 
        }); 
});
}); // end of Post

module.exports = router;