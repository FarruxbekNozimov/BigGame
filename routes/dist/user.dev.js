"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("../middleware/auth.js"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _User = _interopRequireDefault(require("../models/User.js"));

var _Setting = _interopRequireDefault(require("../models/Setting.js"));

var _download = _interopRequireDefault(require("../utils/download.js"));

var _hashing = require("../utils/hashing.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = (0, _express.Router)();
router.get("/", _auth["default"], function (req, res) {
  res.render("index", {
    isIndex: true,
    user: req.user
  });
});
router.get("/pay", _auth["default"], function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render("pay", {
            isIndex: true,
            user: req.user
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/profile", _auth["default"], function _callee2(req, res) {
  var user, userSetting;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_User["default"].findById(req.user._id));

        case 2:
          user = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(_Setting["default"].findOne({
            userId: user._id
          }));

        case 5:
          userSetting = _context2.sent;
          res.render("userSetting", {
            isProfile: true,
            user: _objectSpread({}, req.user, {
              password: (0, _hashing.unhashing)(req.user.password)
            }),
            userSetting: userSetting,
            settingError: req.flash("settingError")
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post("/profile", function _callee3(req, res) {
  var _req$body, userImageURL, fullName, gender, mobilePhone, location, description, username, email, password, passwordCon, telegramLink, instagramLink, facebookLink, websiteLink, userImage, updateUser, updateSetting;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(req.body);
          _req$body = req.body, userImageURL = _req$body.userImageURL, fullName = _req$body.fullName, gender = _req$body.gender, mobilePhone = _req$body.mobilePhone, location = _req$body.location, description = _req$body.description, username = _req$body.username, email = _req$body.email, password = _req$body.password, passwordCon = _req$body.passwordCon, telegramLink = _req$body.telegramLink, instagramLink = _req$body.instagramLink, facebookLink = _req$body.facebookLink, websiteLink = _req$body.websiteLink;

          if (!(password != passwordCon)) {
            _context3.next = 5;
            break;
          }

          req.flash("settingError", "Passwords do not match");
          return _context3.abrupt("return", res.redirect("/profile"));

        case 5:
          // IMAGE DOWNLOADER
          userImage = req.files ? req.files["userImage"] : null;

          try {
            if (userImage) {
              _fs["default"].writeFile(_path["default"].resolve("./public/img/user", req.user._id + ".png"), userImage.data, "binary", function (err) {
                if (err) console.log(err);else console.log("Saved");
              });
            } else if (userImageURL.includes("https://")) {
              (0, _download["default"])(userImageURL, "./public/img/user/" + req.user._id + ".png", function () {
                return console.log("Saved");
              });
            }
          } catch (error) {
            console.log("File error : ", error);
          } // UPDATE ALL


          password = (0, _hashing.hashing)(password);
          _context3.next = 10;
          return regeneratorRuntime.awrap(_User["default"].findOneAndUpdate(req.user._id, {
            username: username,
            email: email,
            password: password
          }, {
            upsert: true
          }));

        case 10:
          updateUser = _context3.sent;
          _context3.next = 13;
          return regeneratorRuntime.awrap(_Setting["default"].findOneAndUpdate({
            userId: req.user._id
          }, {
            fullName: fullName,
            gender: gender,
            description: description,
            image: req.user._id + ".png",
            mobilePhone: mobilePhone,
            location: location,
            telegramLink: telegramLink,
            instagramLink: instagramLink,
            facebookLink: facebookLink,
            websiteLink: websiteLink
          }, {
            upsert: true
          }));

        case 13:
          updateSetting = _context3.sent;
          res.redirect("/profile");

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.get("/:username", _auth["default"], function _callee4(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            username: req.params.username
          }));

        case 2:
          user = _context4.sent;
          res.render("profile", {
            isProfile: true,
            user: req.user
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
var _default = router;
exports["default"] = _default;