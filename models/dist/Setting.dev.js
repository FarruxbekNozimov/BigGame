"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var SettingSchema = new _mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String
  },
  gender: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  mobilePhone: {
    type: String
  },
  location: {
    type: String
  },
  telegramLink: {
    type: String
  },
  instagramLink: {
    type: String
  },
  facebookLink: {
    type: String
  },
  websiteLink: {
    type: String
  }
}, {
  timestamps: true
});
var Setting = (0, _mongoose.model)("Setting", SettingSchema);
var _default = Setting;
exports["default"] = _default;