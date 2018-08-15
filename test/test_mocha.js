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
    describe('indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    })
});

describe('API', function(){
    describe('features', function() {
        it('should get features list', function() {
            chai.request(server).get('/features').end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                done();
            });
        });

        it('should post empty features list', function() {
            let fl = {name: 'empty', data: {}};
            chai.request(server).post('/features').send(fl).end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql('empty');
                done();
            });
        });
    });

    describe('training data', function() {
       it('should get a training dataset', function() {
           chai.request(server).get('/training/datasets').end(function(err, res) {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.should.have.property('list');
               done();
           });
       });

       it('should post a training dataset', function() {
           let td = {};
           chai.request(server).post('/upload').send()
       });
    });
});