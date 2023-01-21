"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _email = require("../utils/email.js");

var _token = require("../utils/token.js");

var _hashing = require("../utils/hashing.js");

var _User = _interopRequireDefault(require("../models/User.js"));

var _Setting = _interopRequireDefault(require("../models/Setting.js"));

var _download = _interopRequireDefault(require("../utils/download.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = (0, _express.Router)(); // Import Models

// Vaqtinchalik variables
var getCode = 0;
var userData = "";
router.get("/logout", function (req, res) {
  res.clearCookie("token");
  res.redirect("/login");
});
router.get("/login", function (req, res) {
  req.cookies.token ? res.redirect("/") : "";
  res.render("login", {
    isLogin: true,
    loginError: req.flash("loginError"),
    userData: userData
  });
});
router.get("/register", function (req, res) {
  req.cookies.token ? res.redirect("/") : "";
  res.render("register", {
    isLogin: true,
    loginError: req.flash("loginError"),
    getCode: getCode,
    userData: userData
  });
});
router.post("/register", function _callee(req, res) {
  var _req$body, username, email, password, a, b, c, d, userCode, usernameExist, emailExist, user, setting, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, a = _req$body.a, b = _req$body.b, c = _req$body.c, d = _req$body.d;
          userCode = +(a + b + c + d);
          userData = {
            username: username,
            email: email,
            password: password,
            role: "user",
            money: 0,
            stars: 0,
            level: 1
          };

          if (!(!username || !email || !password)) {
            _context.next = 6;
            break;
          }

          req.flash("loginError", "All fields must be required");
          return _context.abrupt("return", res.redirect("/register"));

        case 6:
          if (!(password.length < 8)) {
            _context.next = 9;
            break;
          }

          req.flash("loginError", "Password must least 8 characters");
          return _context.abrupt("return", res.redirect("/register"));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            username: username
          }));

        case 11:
          usernameExist = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: email
          }));

        case 14:
          emailExist = _context.sent;

          if (!usernameExist) {
            _context.next = 18;
            break;
          }

          req.flash("loginError", "This username already use");
          return _context.abrupt("return", res.redirect("/register"));

        case 18:
          if (!emailExist) {
            _context.next = 21;
            break;
          }

          req.flash("loginError", "This email already exists");
          return _context.abrupt("return", res.redirect("/register"));

        case 21:
          if (getCode) {
            _context.next = 25;
            break;
          }

          getCode = (0, _email.randomCode)();
          (0, _email.sendCodeToGmail)(email, getCode, username);
          return _context.abrupt("return", res.redirect("/register"));

        case 25:
          if (!(userCode && getCode == userCode)) {
            _context.next = 38;
            break;
          }

          userData.password = (0, _hashing.hashing)(userData.password);
          _context.next = 29;
          return regeneratorRuntime.awrap(_User["default"].create(_objectSpread({
            stars: 0,
            money: 0
          }, userData, {
            gameCount: 0,
            winCount: 0
          })));

        case 29:
          user = _context.sent;
          _context.next = 32;
          return regeneratorRuntime.awrap(_Setting["default"].create({
            userId: user.id,
            fullName: "",
            gender: "",
            description: "",
            image: "default-user.png",
            mobilePhone: "",
            location: "Uzbekistan",
            telegramLink: "",
            instagramLink: "",
            facebookLink: "",
            websiteLink: ""
          }));

        case 32:
          setting = _context.sent;
          token = (0, _token.generateJWTtoken)(user._id);
          res.cookie("token", token, {
            httpOnly: true,
            secure: true
          });
          return _context.abrupt("return", res.redirect("/"));

        case 38:
          req.flash("loginError", "Code is invalid");
          return _context.abrupt("return", res.redirect("/register"));

        case 40:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post("/login", function _callee2(req, res) {
  var _req$body2, username, password, existUser, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
          userData = {
            username: username,
            password: password
          };

          if (!(!username || !password)) {
            _context2.next = 5;
            break;
          }

          req.flash("loginError", "All fields must be required");
          return _context2.abrupt("return", res.redirect("/login"));

        case 5:
          password = (0, _hashing.hashing)(password);
          _context2.next = 8;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            username: username
          }));

        case 8:
          existUser = _context2.sent;

          if (existUser) {
            _context2.next = 12;
            break;
          }

          req.flash("loginError", "User not found");
          return _context2.abrupt("return", res.redirect("/login"));

        case 12:
          if (!(existUser.password != password)) {
            _context2.next = 15;
            break;
          }

          req.flash("loginError", "Password is Wrong");
          return _context2.abrupt("return", res.redirect("/login"));

        case 15:
          token = (0, _token.generateJWTtoken)(existUser._id);
          res.cookie("token", token, {
            httpOnly: true,
            secure: true
          });
          return _context2.abrupt("return", res.redirect("/"));

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var _default = router;
exports["default"] = _default;