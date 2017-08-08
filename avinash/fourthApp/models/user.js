var mongoose = require('mongoose');
var userType = require('./userType');


var userSchema = mongoose.Schema({
  "title" : String,  
  "first_name" : String,
  "last_name" : String
});

userSchema.statics.findByFirstName = function(name, cb) {
  return this.find({ first_name: name }, cb);
};

userSchema.statics.findByLasttName = function(name, cb) {
  return this.find({ last_name: name }, cb);
};

var TestUsers = mongoose.model('TestUsers', userSchema, 'TestUsers');

var saveUser = function(user, cb) {
  TestUsers.findByFirstName(user.first_name, function(err, userFromDB){
      if (userFromDB.length == 0) {
          var newUser = new TestUsers({
            first_name : user.first_name,
            last_name : user.last_name,
            title : user.title
          });
          var retUsers = [newUser];
          newUser.save(function (err, user) {
            if (err) return console.error(err);            
            cb(retUsers);
          });
      } else {
        cb(userFromDB);
      }

  });


};

var updateUser = function(searchUser, user, cb) {
  TestUsers.findByFirstName(searchUser, function(err, userFromDB){
    if (userFromDB.length == 0) {
      // did not find a user to update.
      cb([user]);
    } else {
      userFromDB[0].first_name = user.first_name;
      userFromDB[0].last_name = user.last_name;
      userFromDB[0].title = user.title;

      userFromDB[0].save();
      cb(userFromDB);
    }
  });
}

var deleteUser = function(user, cb) {
  TestUsers.findByFirstName(user.first_name, function(err, userFromDB){
    if (userFromDB.length == 0) {
      // did not find a user to delete.
    } else {
      userFromDB[0].remove();
    }

    listUsers(cb);
  });
};

var listUsers = function(cb) {
    TestUsers.find({}, function(err, users) {
        cb(users);
    });
};

module.exports = {
    "listUsers" : listUsers,
    "saveUser" : saveUser,
    "updateUser": updateUser,
    "deleteUser": deleteUser
};

