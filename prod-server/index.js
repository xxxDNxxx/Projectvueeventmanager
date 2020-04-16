'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();


(0, _routes.registerRoutes)(app);

app.get('/', function (req, res) {
  return res.send("hello");
});
app.listen(3000, function () {
  return console.log("listen on 3000");
});