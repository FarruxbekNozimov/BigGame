"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("../middleware/auth.js"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get("/games", _auth["default"], function (req, res) {
  var games = JSON.parse(_fs["default"].readFileSync("./models/games.json"));
  res.render("games", {
    isGames: true,
    user: req.user,
    games: games
  });
});
router.get("/games/bugvsdev/", _auth["default"], function (req, res) {
  res.render("games/bugvsdev", {
    isGames: true,
    user: req.user
  });
});
router.get("/games/bugvsdev/junior", _auth["default"], function (req, res) {
  res.render("games/buvsdevEasy", {
    isGames: true,
    user: req.user
  });
});
router.get("/games/bugvsdev/middle", _auth["default"], function (req, res) {
  res.render("games/bugvsdevMiddle", {
    isGames: true,
    user: req.user
  });
});
router.get("/games/bugvsdev/senior", _auth["default"], function (req, res) {
  res.render("games/bugvsdevSenior", {
    isGames: true,
    user: req.user
  });
});
router.post("/games/bugvsdev/junior", _auth["default"], function (req, res) {
  var winner = req.body.winner;
  req.flash("winBoardDis", true);
  res.redirect("/games/bugvsdev/junior");
});
router.post("/games/bugvsdev/middle", _auth["default"], function (req, res) {
  var winner = req.body.winner;
  req.flash("winBoardDis", true);
  res.redirect("/games/bugvsdev/middle");
});
router.post("/games/bugvsdev/senior", _auth["default"], function (req, res) {
  var winner = req.body.winner;
  req.flash("winBoardDis", true);
  res.redirect("/games/bugvsdev/senior");
});
var _default = router;
exports["default"] = _default;