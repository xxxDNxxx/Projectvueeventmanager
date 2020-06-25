'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = index;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.show = show;
exports.updateAttend = updateAttend;
exports.updateVerify = updateVerify;

var _userModel = require('../../model/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

var _eventModel = require('../../model/event-model');

var _eventModel2 = _interopRequireDefault(_eventModel);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _waiterModel = require('../../model/waiter-model');

var _waiterModel2 = _interopRequireDefault(_waiterModel);

var _authService = require('../../services/auth-service');

var auth = _interopRequireWildcard(_authService);

var _randomstring = require('randomstring');

var _randomstring2 = _interopRequireDefault(_randomstring);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
    // find all events
    _eventModel2.default.find({}, function (error, events) {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ events: events });
    }).populate('author', 'username', 'users');
}

function create(req, res) {
    // create event
    var id = auth.getUserId(req);
    _userModel2.default.findOne({ _id: id }, function (error, user) {
        if (error && !user) {
            return res.status(500).json();
        }
        var event = new _eventModel2.default(req.body.event);
        event.author = user._id;
        event.dueDate = (0, _moment2.default)(event.dueDate);
        event.eventKey = _randomstring2.default.generate(5);

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
    var id = auth.getUserId(req);

    _userModel2.default.findOne({ _id: id }, function (error, user) {
        if (error) {
            return res.status(500).json();
        }
        if (!user) {
            return res.status(404).json();
        }

        var event = new _eventModel2.default(req.body.event);
        event.author = user._id;
        event.dueDate = (0, _moment2.default)(event.dueDate);
        _eventModel2.default.findByIdAndUpdate({ _id: event._id }, event, function (error) {
            if (error) {
                return res.status(500).json();
            }
            return res.status(204).json();
        });
    });
}

function remove(req, res) {
    // delete a events
    var id = auth.getUserId(req);
    _eventModel2.default.findOne({ _id: req.params.id }, function (error, event) {
        if (error) {
            return res.status(500).json();
        }
        if (!event) {
            return res.status(404).json();
        }
        if (event.author._id.toString() !== id) {
            return res.status(403).json({ message: 'Not allowed to delete another user\'s event' });
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
    _eventModel2.default.findOne({ _id: req.params.id })
    // .populate('author')
    .populate({
        path: 'attendees',
        model: 'waiters',
        populate: { path: 'username', model: 'users' }

    }).exec(function (error, event) {
        if (error) {
            return res.status(500).json();
        }
        if (!event) {
            return res.status(404).json();
        }

        // console.log(event.attendees[0].username.username)
        var array = [];
        for (var i = 0; i < event.attendees.length; i++) {
            array.push({
                id: event.attendees[i]._id,
                userid: event.attendees[i].username._id,
                username: event.attendees[i].username.username,
                firstname: event.attendees[i].username.firstname,
                lastname: event.attendees[i].username.lastname,
                type: event.attendees[i].type,
                verify: event.attendees[i].username.verified
            });
        }
        return res.status(200).json({ users: array, event: event });
    });
}

function updateAttend(req, res) {
    var id = req.body.id;
    _waiterModel2.default.findByIdAndUpdate(id, { type: "attended" }, { new: true }, function (error, waiters) {
        if (error) {
            return res.status(500).json();
        }
        return res.status(204).json({ waiters: waiters });
    });
}

function updateVerify(req, res) {
    var id = req.body.userid;

    _userModel2.default.findByIdAndUpdate(id, { verified: true }, { new: true }).exec(function (error, users) {
        if (error) {
            return res.status(500).json();
        }

        return res.status(204).json({ users: users });
    });
}