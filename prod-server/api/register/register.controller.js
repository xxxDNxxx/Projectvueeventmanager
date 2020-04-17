'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = index;

var _stringUtil = require('../../utillities/string-util');

function index(req, res) {
    var validation = validateIndex(req.body);
    if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
    }

    var user = {
        username: req.body.username.toLowerCase(),
        password: req.body.password
    };
    console.log(user);
    return res.status(201).json();
}

function validateIndex(body) {
    var errors = '';
    if (_stringUtil.StringUtil.isEmpty(body.username)) {
        errors += 'Username is required';
    }
    if (_stringUtil.StringUtil.isEmpty(body.password)) {
        errors += 'Password is required';
    }

    return {
        isValid: _stringUtil.StringUtil.isEmpty(errors),
        message: errors
    };
}