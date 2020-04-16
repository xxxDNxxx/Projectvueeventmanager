'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/event', function (req, res) {
    res.send('post.event - create event');
});

router.get('/event', function (req, res) {
    res.send('get.event - get all event');
});

router.get('/event/:id', function (req, res) {
    res.send('get.event - get event by id');
});

router.put('/event', function (req, res) {
    res.send('put.event - update event');
});

router.delete('/event', function (req, res) {
    res.send('delete.event - delete event');
});

exports.default = router;