'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var waiterSchema = new _mongoose2.default.Schema({

    username: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'users'
    },
    event: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'events'
    },
    type: String,
    date: String

});

exports.default = _mongoose2.default.model('waiters', waiterSchema);