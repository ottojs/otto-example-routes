
'use strict';

// Modules
require('should');
var otto      = require('otto');
var supertest = require('supertest');

// Subject
var routes_example = require('../lib/index.js');

// Bind SuperTest
var app = otto.app();
routes_example(app);
otto.error_handler(app);
var request = supertest(app);

describe('Routes - Example', function () {

  describe('GET /hello', function () {
    it('should respond with body { says : "Hello!" }', function (done) {
      request.get('/hello')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect({ says : 'Hello!' })
        .end(done);
    });
  });

  describe('GET /dynamic', function () {
    it('should respond with body { says : "Inline!" }', function (done) {
      request.get('/dynamic')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect({ says : 'Inline!' })
        .end(done);
    });
  });

  describe('GET /parameter-required', function () {

    it('should fail when parameter query.saysomething is not provided', function (done) {
      request.get('/parameter-required')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect({
          error : {
            type    : 'client',
            name    : 'ErrorBadRequest',
            message : 'Parameter "saysomething" is required'
          }
        })
        .end(done);
    });

    it('should respond with body { says : "Something!" }', function (done) {
      request.get('/parameter-required?saysomething=true')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect({ says : 'Something!' })
        .end(done);
    });

  });

});
