"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateJWTtoken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generateJWTtoken = function generateJWTtoken(userId) {
  var accessToken = _jsonwebtoken["default"].sign({
    userId: userId
  }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });

  return accessToken;
};

exports.generateJWTtoken = generateJWTtoken;