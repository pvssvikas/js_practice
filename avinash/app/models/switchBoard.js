var mongoose = require('mongoose');

var switchBoardIndex = mongoose.Schema({
  "name" : String
});

var switchBoard = mongoose.Schema({
  "name" : String,
  "appliances" :{ type : Array , "default" : [] }
});

switchBoard.statics.findByName = function(sbname, cb) {
  return this.find({ name: sbname }, cb);
};

var sBoard = mongoose.model('switchBoard', switchBoard, 'switchBoard');
var sBoardIndex = mongoose.model('switchBoardIndex', switchBoardIndex, 'switchBoardIndex');

var saveSwitchBoard = function(sb, cb) {
    sBoard.findByName(sb.name, function(err, sbFromDB){
        if (sbFromDB.length == 0) {
            var newSB = new sBoard({
                "name" : sb.name,
                "appliances" : sb.appliances
            });
            var sbIndexObj = new sBoardIndex({
                "name" : sb.name
            });

            newSB.save(function (err, savedBoard){
                if (err) {
                 return cb(err);
                }
                var retBoard = [savedBoard];
                
                sbIndexObj.save();
                cb(retBoard);
            });
        } else {
            cb(sbFromDB);
        }
    });
};

// the callback mthod is expected to have following syntax
// cb(err, obj[]);

var getAllSwitchBoards = function(cb) {
    return sBoardIndex.find(cb);
};

var getSwitchBoard = function(sbName, cb) {
    sBoard.findByName(sbName, function(err, sbFromDB){
        cb(sbFromDB);
    });
};

module.exports = {
    "saveSwitchBoard" : saveSwitchBoard,
    "getAllSwitchBoards": getAllSwitchBoards,
    "getSwitchBoard": getSwitchBoard
};