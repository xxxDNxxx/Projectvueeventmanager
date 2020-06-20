'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventSchema = new _mongoose2.default.Schema({
    title: String,
    body: String,
    dueDate: { type: Date, default: Date.now },
    author: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'users' },
    eventKey: String,
    attendees: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'waiter'
    }]

});

exports.default = _mongoose2.default.model('events', eventSchema);