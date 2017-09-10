var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  "first_name" : String,
  "last_name" : String,
  "email" : String,
  "password" : String
});

userSchema.statics.findByFirstName = function(name, cb) {
  return this.find({ first_name: name }, cb);
};

userSchema.statics.findByLastName = function(name, cb) {
  return this.find({ last_name: name }, cb);
};

userSchema.statics.findByEmail = function(mailID, cb) {
  return this.find({ email: mailID }, cb);
};

userSchema.statics.findByFirstName = function(name, cb) {
  return this.find({ first_name: name }, cb);
};

var regUsers = mongoose.model('regUsers', userSchema, 'regUsers');

var saveUser = function(user, cb) {
  regUsers.findByEmail(user.email, function(err, userFromDB){
      if (userFromDB.length == 0) {
          var newUser = new regUsers({
            first_name : user.first_name,
            last_name : user.last_name,
            email : user.email,
            password : user.password
          });
          var retUsers = [newUser];
          newUser.save(function (err, user) {
            if (err) {
              return console.error(err);
            } else {
            }
            retUsers[0].newlyCreated = true;
            cb(retUsers);
          });
      } else {
        cb(userFromDB);
      }

  });
};

var checkUser = function(user_email, pwd, cb) {
  regUsers.findByEmail(user_email, function(err, userFromDB){

    var dummyUser = {
      first_name : "dummy",
      last_name : "dummy",
      email : "not registered",
      password : "dummy"
    };

    if ( 0 == userFromDB.length ) {
      cb([dummyUser]);
      return;
    } else if( userFromDB[0].password != pwd) {
      // given password did not match
      dummyUser.password = "wrong passwd";
      console.log('loginFailed: given passwd is '+ pwd  + " expected passwd is " + userFromDB[0].password)

      cb([dummyUser]);
      return;
    } 

    cb(userFromDB);
    return;
  });
}

var deleteUser = function(user, cb) {
  regUsers.findByFirstName(user.first_name, function(err, userFromDB){
    if (userFromDB.length == 0) {
      // did not find a user to delete.
    } else {
      userFromDB[0].remove();
    }

    listUsers(cb);
  });
};

var listUsers = function(cb) {
    regUsers.find({}, function(err, users) {
        cb(users);
    });
};

module.exports = {
    "listUsers" : listUsers,
    "saveUser" : saveUser,
    "checkUser": checkUser,
    "deleteUser": deleteUser
};

