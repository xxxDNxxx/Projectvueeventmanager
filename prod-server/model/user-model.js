'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _stringUtil = require('../utillities/string-util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose2.default.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String
});
userSchema.set('timestamps', true);
userSchema.virtual('fullname').get(function () {
    var firstname = _stringUtil.StringUtil.capitalize(this.firstname.toLowerCase());
    var lastname = _stringUtil.StringUtil.capitalize(this.lastname.toLowerCase());
    return firstname + ' ' + lastname;
});
userSchema.pre('save', function (next) {
    this.username = this.username.toLowerCase();
    this.firstname = this.firstname.toLowerCase();
    this.lastname = this.lastname.toLowerCase();
    next();
});

exports.default = _mongoose2.default.model('user', userSchema);