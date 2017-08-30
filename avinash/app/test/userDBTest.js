require('../models/init')();
var expect = require('chai').expect;
var userDB = require('../models/user.js');


describe('User', function() {
  describe('#allowed operations', function() {
    it('should save without error', function(done) {
        var userObj = {
            title : 'Mr.',
            first_name : 'testUser4',
            last_name : 'testUser4'
        };
        userDB.saveUser(userObj, function(userFromDB) {
            expect(userFromDB).to.not.equal(null);
            // trying to save multiple copies of the same user
            userObj.first_name = 'testUser1';
            userDB.saveUser(userObj, function(userFromDB) {
                expect(userFromDB).to.not.equal(null);
                
            userObj.first_name = 'testUser2';
            userDB.saveUser(userObj, function(userFromDB) {
                expect(userFromDB).to.not.equal(null);
                    
                    // expecting to find only one entry in DB
                    expect(userFromDB).to.have.lengthOf(2);
                    done();
                });
            });
        });
    });

    it('should login without error', function(done) {

        userDB.checkUser('jitendraavinash96@gmail.com', '123', function(userFromDB) {
            expect(userFromDB).to.not.equal(null);
            // trying to save multiple copies of the same user
            // expecting to find only one entry in DB
                expect(userFromDB).to.have.lengthOf(1);
                done();
        });
    });

    it('should delete without error', function(done) {
            var userObj = {
                title : 'Ms.',
                first_name : 'testUser4',
                last_name : 'testUser-4'
            };
            userDB.listUsers(function(users){
                var userCntBeforeDeletion = users.length;
                
                userDB.deleteUser(userObj, function(userFromDB) {
                    expect(userFromDB).to.have.lengthOf( (userCntBeforeDeletion - 1) );
                    done();
                });
            });
    });
    
    it('should list without error', function(done) {
        userDB.listUsers(function (users) {
            expect(users.length).to.not.equal(0);
            done();
        });
    });
  }); // end of user test case description
});


describe('User', function() {
  describe('#check()', function() {

  });
});

describe('User', function() {
  describe('#delete()', function() {
  });
});

describe('User', function() {
  describe('#list()', function() {
  });
});



