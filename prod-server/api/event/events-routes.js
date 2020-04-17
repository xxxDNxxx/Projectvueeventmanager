'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _eventsController = require('./events-controller');

var controller = _interopRequireWildcard(_eventsController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.post('/event', controller.create);

router.get('/event', controller.index);

router.get('/event/:id', controller.show);

router.put('/event', controller.update);

router.delete('/event', controller.remove);

exports.default = router;