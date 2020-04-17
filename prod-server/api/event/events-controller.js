'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = index;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.show = show;

var _userModel = require('../../model/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

var _eventModel = require('../../model/event-model');

var _eventModel2 = _interopRequireDefault(_eventModel);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
    // find all events
    _eventModel2.default.find({}, function (error, events) {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ events: events });
    }).populate('create_by', 'username', 'user');
}

function create(req, res) {
    // create event
    var id = 1;
    _userModel2.default.findOne({ _id: id }, function (error, user) {
        if (error && !user) {
            return res.status(500).json();
        }
        var event = new _eventModel2.default(req.body.Event);
        event.create_by = user._id;
        event.created_date = (0, _moment2.default)(event.created_date);

        event.save(function (error) {
            if (error) {
                return res.status(500).json();
            }
            return res.status(201).json();
        });
    });
}

function update(req, res) {
    // update a event
    var id = 1;

    _userModel2.default.findOne({ _id: id }, function (error, user) {
        if (error) {
            return res.status(500).json();
        }
        if (!user) {
            return res.status(404).json();
        }

        var event = req.body.event;
        event.create_by = user._id;
        event.created_date = (0, _moment2.default)(event.created_date);
        _eventModel2.default.findByIdAndUpdate({ _id: event._id }, task, function (error) {
            if (error) {
                return res.status(500).json();
            }
            return res.status(204).json();
        });
    });
}

function remove(req, res) {
    // delete a events
    var id = 1;
    _eventModel2.default.findOne({ _id: req.params.id }, function (error, event) {
        if (error) {
            return res.status(500).json();
        }
        if (!event) {
            return res.status(404).json();
        }
        if (event.create_by._id.toString() !== id) {
            return res.status(403).json({ message: 'Not allowed to delete another user\'s post' });
        }
        _eventModel2.default.deleteOne({ _id: req.params.id }, function (error) {
            if (error) {
                return res.status(500).json();
            }
            return res.status(204).json();
        });
    });
}

function show(req, res) {
    // get event by id
    _eventModel2.default.findOne({ _id: req.params.id }, function (error, event) {
        if (error) {
            return res.status(500).json();
        }
        if (!event) {
            return res.status(404).json();
        }
        return res.status(200).json({ event: event });
    });
}