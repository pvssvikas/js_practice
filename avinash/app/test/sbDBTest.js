require('../models/init')();
var expect = require('chai').expect;
var sbDB = require('../models/switchBoard.js');

describe('SwitchBoard', function() {
    describe('#allowed operations', function() {
        it('should save without error', function(done) {
            var sbObj = {
                name : 'sb1',
                appliances : [ "fan", "light" ]
            }
            sbDB.saveSwitchBoard(sbObj, function(sbFromDB){
                expect(sbFromDB).to.not.equal(null);
                done();
            });
        });

        it("should get the saved sb's", function(done){
            sbDB.getAllSwitchBoards(function(err, sbs){
                expect(sbs).to.have.lengthOf(2);
                done();
            });
        });

        it("should get a specifc sb", function(done){
            sbDB.getSwitchBoard('sb1', function(sb){
                expect(sb).to.not.equal(null);
                expect(sb[0].appliances).to.have.lengthOf(2);
                done();
            });
        });
    });

});