"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _callee;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User.js"));

var _Setting = _interopRequireDefault(require("../models/Setting.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _callee(req, res, next) {
  var token, decode, user, setting;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = req.cookies.token;

          if (token) {
            _context.next = 4;
            break;
          }

          next();
          return _context.abrupt("return");

        case 4:
          decode = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
          _context.next = 7;
          return regeneratorRuntime.awrap(_User["default"].findById(decode.userId).lean());

        case 7:
          user = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(_Setting["default"].findOne({
            userId: decode.userId
          }));

        case 10:
          setting = _context.sent;
          req.user = user;
          req.userSetting = setting;
          req.userId = user ? user._id : null;
          next();

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
}