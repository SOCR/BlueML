var assert = require('assert');
var sinon = require('sinon');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app.js')
var should = chai.should();
var FeatureList = require('../public/js/featureListSchema.js');
var TrainingSet = require('../public/js/trainingListSchema.js');

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

describe('API Network Layer', function(){
    describe('features', function() {
        it('should get features list', function() {
            var dbGet = sinon.fake.returns({name: 'test', data: {}});
            sinon.replace(FeatureList, 'get', dbGet);
            chai.request(server).get('/features').end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('data');
                done();
            });
        });

        it('should post empty features list', function() {
            // see api.js POST '/features'
            let fl = {name: 'empty', data: {}};
            var dbAdd = sinon.fake.returns({name: 'empty', data: {}});
            sinon.replace(FeatureList, 'add', dbAdd);
            stub.returns({name: 'empty', data: {}});
            chai.request(server).post('/features').send(fl).end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql('empty');
                res.body.should.have.property('data').eql({});
                done();
            });
        });
    });

    describe('training data', function() {
       it('should get a training dataset', function() {
           var dbGet = sinon.fake.returns({name: 'test', data: {}});
           sinon.replace(TrainingSet, 'get', dbGet);
           chai.request(server).get('/training/datasets').end(function(err, res) {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have.property('name');
               res.body.should.have.property('data');
               done();
           });
       });

       it('should post a training dataset', function() {
           let td = {name: 'empty', data: {}};
           var dbAdd = sinon.fake.returns({name: 'empty', data: {}});
           sinon.replace(TrainingSet, 'add', dbAdd);
           chai.request(server).post('/upload').send(td).end(function(err, res) {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have.property('name').eql('empty');
               res.body.should.have.property('data').eql({});
               done();
           });
       });
    });
});


// describe('Database Layer (MongoDB)', function() {
//    describe('features list getter', function() {
//
//    });
//
//    describe('features list add', function() {
//
//    });
//
//    describe('training set get', function() {
//
//    });
//
//    describe('training set add', function() {
//
//    });
// });


// network layer (API)
// features list get
// features list post
// training dataset get
// training dataset post

// database layer (MongoDB)
// features list get
// features list add
// training set get
// training set add
