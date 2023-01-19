"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var _expressHandlebars = require("express-handlebars");

var _mongoose = _interopRequireDefault(require("mongoose"));

var dotenv = _interopRequireWildcard(require("dotenv"));

var _connectFlash = _interopRequireDefault(require("connect-flash"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _hbsHelpers = _interopRequireDefault(require("./utils/hbsHelpers.js"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _var = _interopRequireDefault(require("./middleware/var.js"));

var _user = _interopRequireDefault(require("./middleware/user.js"));

var _auth = _interopRequireDefault(require("./routes/auth.js"));

var _user2 = _interopRequireDefault(require("./routes/user.js"));

var _game = _interopRequireDefault(require("./routes/game.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// MIDLEWARES
// Routes
dotenv.config();
var app = (0, _express["default"])(); // Middleware

var hbs = (0, _expressHandlebars.create)({
  defaultLayout: "main",
  extname: "hbs",
  helpers: _hbsHelpers["default"],
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(_express["default"].urlencoded({
  extented: true
}));
app.use((0, _expressFileupload["default"])());
app.use(_express["default"]["static"]("public"));
app.use(_express["default"].urlencoded({
  extented: true
}));
app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());
app.use((0, _expressSession["default"])({
  secret: "FarruxDEV",
  reserve: false,
  saveUninitialized: false
}));
app.use((0, _connectFlash["default"])()); // Use Middleware

app.use(_var["default"]);
app.use(_user["default"]);
app.use(_auth["default"]);
app.use(_game["default"]);
app.use(_user2["default"]);
var PORT = process.env.PORT || 7700;

var startApp = function startApp() {
  try {
    _mongoose["default"].set("strictQuery", false);

    _mongoose["default"].connect(process.env.MONGO_URL, {
      useNewUrlParser: true
    }, function () {
      return console.log("Mongo DB connected");
    });

    var _PORT = process.env.PORT || 7700;

    app.listen(_PORT, function () {
      return console.log("Server is running ".concat(_PORT));
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();