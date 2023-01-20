"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var UserSchema = new _mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  money: {
    type: String,
    required: true
  },
  stars: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var User = (0, _mongoose.model)("User", UserSchema);
var _default = User;
exports["default"] = _default;