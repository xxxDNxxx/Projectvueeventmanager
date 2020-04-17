'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes');

var _env = require('./config/env');

var _db = require('./config/db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

(0, _env.setEnvironment)(app);
(0, _db.connectToDB)();
(0, _routes.registerRoutes)(app);

app.get('/', function (req, res) {
    if (process.env.NODE_ENV !== 'production') {
        return res.send('Running server in Development mode.');
    } else {
        return res.sendFile('index.html', { root: __dirname + '/../dist/' });
    }
});
app.listen(3000, function () {
    console.log('app listen on port 3000' + process.env.NODE_ENV + 'mode.');
});