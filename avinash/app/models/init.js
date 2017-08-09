var mongoose = require('mongoose');

function init(app){

    var url = "mongodb://localhost/userdb";    
  
    mongoose.connect(url, {
        useMongoClient: true
    });

    mongoose.connection.on('error', function(err) {
        console.log('Connection error: ' + err);
    });
};

module.exports = init;