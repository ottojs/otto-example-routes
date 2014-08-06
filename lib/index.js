
'use strict';

// Modules
var request    = require('otto-request');
var response   = require('otto-response');
var controller = require('otto-example-controller');

// Exports
module.exports = function (app) {

  app.get('/hello', [
    controller.say_hello,
    response.ok,
    response.end
  ]);

  app.get('/dynamic', [
    controller.say_dynamic('Inline!'),
    response.ok,
    response.end
  ]);

  app.get('/parameter-required', [
    request.parameter_required('query', 'saysomething'),
    controller.say_dynamic('Something!'),
    response.ok,
    response.end
  ]);

};
