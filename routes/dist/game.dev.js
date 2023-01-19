"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("../middleware/auth.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get("/games", _auth["default"], function (req, res) {
  res.render("games", {
    isGames: true,
    user: req.user
  });
});
router.get("/games/bugvsdev/easy", _auth["default"], function (req, res) {
  res.render("games/buvsdeveasy", {
    isGames: true,
    user: req.user
  });
});
var _default = router;
exports["default"] = _default;