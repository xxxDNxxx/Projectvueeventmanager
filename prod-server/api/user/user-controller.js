'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = index;
function index(req, res) {
    return res.status(500).json({ message: 'hello world' });
}