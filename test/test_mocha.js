var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app.js')
var should = chai.should();

chai.use(chaiHttp);

describe('Demo', function() {
    it('should return 404 Path Not Found', function (done) {
        chai.request(server).get('/test_mocha').end(function (err, res) {
            res.should.have.status(404);
            done();
        });
    });
});

/*describe('Demo', function() {
    it('should list All Datasets', function (done) {
        chai.request(server).get('/test_mocha').end(function (err, res) {
            res.should.have.status(404);
            done();
        });
    });
});*/

describe('Array', function() {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    })
});
