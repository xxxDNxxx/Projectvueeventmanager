'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = index;
exports.remove = remove;

var _userModel = require('../../model/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
    _userModel2.default.find({}, function (error, users) {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ users: users });
    });
}

function remove(req, res) {
    Event.fineOne({ _id: req.params.id }, function (error, users) {
        if (error) {
            return res.status(500).json();
        }
        if (!event) {
            return res.status(404).json();
        }
        Event.deleteOne({ _id: req.params.id }, function (error) {
            if (error) {
                return res.status(500).json();
            }
            return res.status(204).json();
        });
    });
}