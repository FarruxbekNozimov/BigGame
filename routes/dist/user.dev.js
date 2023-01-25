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
router.get("/", _auth["default"], function _callee(req, res) {
  var _res$render;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render("index", (_res$render = {
            isIndex: true,
            user: req.user
          }, _defineProperty(_res$render, "user", _objectSpread({}, req.user, {
            password: (0, _hashing.unhashing)(req.user.password)
          })), _defineProperty(_res$render, "userSetting", req.userSetting), _res$render));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/pay", _auth["default"], function _callee2(req, res) {
  var _res$render2;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.render("pay", (_res$render2 = {
            user: req.user
          }, _defineProperty(_res$render2, "user", _objectSpread({}, req.user, {
            password: (0, _hashing.unhashing)(req.user.password)
          })), _defineProperty(_res$render2, "userSetting", req.userSetting), _res$render2));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get("/profile", _auth["default"], function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.render("userSetting", {
            isProfile: true,
            user: _objectSpread({}, req.user, {
              password: (0, _hashing.unhashing)(req.user.password)
            }),
            userSetting: req.userSetting,
            settingError: req.flash("settingError")
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.post("/profile", function _callee4(req, res) {
  var _req$body, userImageURL, fullName, gender, mobilePhone, location, description, username, email, password, passwordCon, telegramLink, instagramLink, facebookLink, websiteLink, userImage, updateUser, updateSetting;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, userImageURL = _req$body.userImageURL, fullName = _req$body.fullName, gender = _req$body.gender, mobilePhone = _req$body.mobilePhone, location = _req$body.location, description = _req$body.description, username = _req$body.username, email = _req$body.email, password = _req$body.password, passwordCon = _req$body.passwordCon, telegramLink = _req$body.telegramLink, instagramLink = _req$body.instagramLink, facebookLink = _req$body.facebookLink, websiteLink = _req$body.websiteLink;

          if (!(password != passwordCon)) {
            _context4.next = 4;
            break;
          }

          req.flash("settingError", "Passwords do not match");
          return _context4.abrupt("return", res.redirect("/profile"));

        case 4:
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
          _context4.next = 9;
          return regeneratorRuntime.awrap(_User["default"].findOneAndUpdate(req.user._id, {
            username: username,
            email: email,
            password: password
          }, {
            upsert: true
          }));

        case 9:
          updateUser = _context4.sent;
          _context4.next = 12;
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

        case 12:
          updateSetting = _context4.sent;
          res.redirect("/profile");

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // router.get("/:username", authMiddleware, async (req, res) => {
// 	let user = await User.findOne({ username: req.params.username });
// 	res.render("profile", {
// 		isProfile: true,
// 		user: req.user,
// 	});
// });

var _default = router;
exports["default"] = _default;