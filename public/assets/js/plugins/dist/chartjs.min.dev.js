"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _get2(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get2 = Reflect.get; } else { _get2 = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get2(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Chart.js v3.0.2
 * https://www.chartjs.org
 * (c) 2021 Chart.js Contributors
 * Released under the MIT License
 */
!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Chart = e();
}(void 0, function () {
  "use strict";

  var t = "undefined" == typeof window ? function (t) {
    return t();
  } : window.requestAnimationFrame;

  function e(e, i, n) {
    var o = n || function (t) {
      return Array.prototype.slice.call(t);
    };

    var s = !1,
        a = [];
    return function () {
      for (var _len = arguments.length, n = new Array(_len), _key = 0; _key < _len; _key++) {
        n[_key] = arguments[_key];
      }

      a = o(n), s || (s = !0, t.call(window, function () {
        s = !1, e.apply(i, a);
      }));
    };
  }

  function i(t, e) {
    var i;
    return function () {
      return e ? (clearTimeout(i), i = setTimeout(t, e)) : t(), e;
    };
  }

  var n = function n(t) {
    return "start" === t ? "left" : "end" === t ? "right" : "center";
  },
      o = function o(t, e, i) {
    return "start" === t ? e : "end" === t ? i : (e + i) / 2;
  },
      s = function s(t, e, i) {
    return "right" === t ? i : "center" === t ? (e + i) / 2 : e;
  };

  var a = new (
  /*#__PURE__*/
  function () {
    function _class() {
      _classCallCheck(this, _class);

      this._request = null, this._charts = new Map(), this._running = !1, this._lastDate = void 0;
    }

    _createClass(_class, [{
      key: "_notify",
      value: function _notify(t, e, i, n) {
        var o = e.listeners[n],
            s = e.duration;
        o.forEach(function (n) {
          return n({
            chart: t,
            numSteps: s,
            currentStep: Math.min(i - e.start, s)
          });
        });
      }
    }, {
      key: "_refresh",
      value: function _refresh() {
        var e = this;
        e._request || (e._running = !0, e._request = t.call(window, function () {
          e._update(), e._request = null, e._running && e._refresh();
        }));
      }
    }, {
      key: "_update",
      value: function _update() {
        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();
        var e = this;
        var i = 0;
        e._charts.forEach(function (n, o) {
          if (!n.running || !n.items.length) return;
          var s = n.items;
          var a,
              r = s.length - 1,
              l = !1;

          for (; r >= 0; --r) {
            a = s[r], a._active ? (a._total > n.duration && (n.duration = a._total), a.tick(t), l = !0) : (s[r] = s[s.length - 1], s.pop());
          }

          l && (o.draw(), e._notify(o, n, t, "progress")), s.length || (n.running = !1, e._notify(o, n, t, "complete")), i += s.length;
        }), e._lastDate = t, 0 === i && (e._running = !1);
      }
    }, {
      key: "_getAnims",
      value: function _getAnims(t) {
        var e = this._charts;
        var i = e.get(t);
        return i || (i = {
          running: !1,
          items: [],
          listeners: {
            complete: [],
            progress: []
          }
        }, e.set(t, i)), i;
      }
    }, {
      key: "listen",
      value: function listen(t, e, i) {
        this._getAnims(t).listeners[e].push(i);
      }
    }, {
      key: "add",
      value: function add(t, e) {
        var _this$_getAnims$items;

        e && e.length && (_this$_getAnims$items = this._getAnims(t).items).push.apply(_this$_getAnims$items, _toConsumableArray(e));
      }
    }, {
      key: "has",
      value: function has(t) {
        return this._getAnims(t).items.length > 0;
      }
    }, {
      key: "start",
      value: function start(t) {
        var e = this._charts.get(t);

        e && (e.running = !0, e.start = Date.now(), e.duration = e.items.reduce(function (t, e) {
          return Math.max(t, e._duration);
        }, 0), this._refresh());
      }
    }, {
      key: "running",
      value: function running(t) {
        if (!this._running) return !1;

        var e = this._charts.get(t);

        return !!(e && e.running && e.items.length);
      }
    }, {
      key: "stop",
      value: function stop(t) {
        var e = this._charts.get(t);

        if (!e || !e.items.length) return;
        var i = e.items;
        var n = i.length - 1;

        for (; n >= 0; --n) {
          i[n].cancel();
        }

        e.items = [], this._notify(t, e, Date.now(), "complete");
      }
    }, {
      key: "remove",
      value: function remove(t) {
        return this._charts["delete"](t);
      }
    }]);

    return _class;
  }())();
  /*!
   * @kurkle/color v0.1.9
   * https://github.com/kurkle/color#readme
   * (c) 2020 Jukka Kurkela
   * Released under the MIT License
   */

  var r = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15
  },
      l = "0123456789ABCDEF",
      c = function c(t) {
    return l[15 & t];
  },
      h = function h(t) {
    return l[(240 & t) >> 4] + l[15 & t];
  },
      d = function d(t) {
    return (240 & t) >> 4 == (15 & t);
  };

  function u(t) {
    var e = function (t) {
      return d(t.r) && d(t.g) && d(t.b) && d(t.a);
    }(t) ? c : h;
    return t ? "#" + e(t.r) + e(t.g) + e(t.b) + (t.a < 255 ? e(t.a) : "") : t;
  }

  function f(t) {
    return t + .5 | 0;
  }

  var g = function g(t, e, i) {
    return Math.max(Math.min(t, i), e);
  };

  function p(t) {
    return g(f(2.55 * t), 0, 255);
  }

  function m(t) {
    return g(f(255 * t), 0, 255);
  }

  function x(t) {
    return g(f(t / 2.55) / 100, 0, 1);
  }

  function b(t) {
    return g(f(100 * t), 0, 100);
  }

  var _ = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
  var y = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;

  function v(t, e, i) {
    var n = e * Math.min(i, 1 - i),
        o = function o(e) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (e + t / 30) % 12;
      return i - n * Math.max(Math.min(o - 3, 9 - o, 1), -1);
    };

    return [o(0), o(8), o(4)];
  }

  function M(t, e, i) {
    var n = function n(_n2) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (_n2 + t / 60) % 6;
      return i - i * e * Math.max(Math.min(o, 4 - o, 1), 0);
    };

    return [n(5), n(3), n(1)];
  }

  function w(t, e, i) {
    var n = v(t, 1, .5);
    var o;

    for (e + i > 1 && (o = 1 / (e + i), e *= o, i *= o), o = 0; o < 3; o++) {
      n[o] *= 1 - e - i, n[o] += e;
    }

    return n;
  }

  function k(t) {
    var e = t.r / 255,
        i = t.g / 255,
        n = t.b / 255,
        o = Math.max(e, i, n),
        s = Math.min(e, i, n),
        a = (o + s) / 2;
    var r, l, c;
    return o !== s && (c = o - s, l = a > .5 ? c / (2 - o - s) : c / (o + s), r = o === e ? (i - n) / c + (i < n ? 6 : 0) : o === i ? (n - e) / c + 2 : (e - i) / c + 4, r = 60 * r + .5), [0 | r, l || 0, a];
  }

  function S(t, e, i, n) {
    return (Array.isArray(e) ? t(e[0], e[1], e[2]) : t(e, i, n)).map(m);
  }

  function P(t, e, i) {
    return S(v, t, e, i);
  }

  function D(t) {
    return (t % 360 + 360) % 360;
  }

  function C(t) {
    var e = y.exec(t);
    var i,
        n = 255;
    if (!e) return;
    e[5] !== i && (n = e[6] ? p(+e[5]) : m(+e[5]));
    var o = D(+e[2]),
        s = +e[3] / 100,
        a = +e[4] / 100;
    return i = "hwb" === e[1] ? function (t, e, i) {
      return S(w, t, e, i);
    }(o, s, a) : "hsv" === e[1] ? function (t, e, i) {
      return S(M, t, e, i);
    }(o, s, a) : P(o, s, a), {
      r: i[0],
      g: i[1],
      b: i[2],
      a: n
    };
  }

  var A = {
    x: "dark",
    Z: "light",
    Y: "re",
    X: "blu",
    W: "gr",
    V: "medium",
    U: "slate",
    A: "ee",
    T: "ol",
    S: "or",
    B: "ra",
    C: "lateg",
    D: "ights",
    R: "in",
    Q: "turquois",
    E: "hi",
    P: "ro",
    O: "al",
    N: "le",
    M: "de",
    L: "yello",
    F: "en",
    K: "ch",
    G: "arks",
    H: "ea",
    I: "ightg",
    J: "wh"
  },
      O = {
    OiceXe: "f0f8ff",
    antiquewEte: "faebd7",
    aqua: "ffff",
    aquamarRe: "7fffd4",
    azuY: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "0",
    blanKedOmond: "ffebcd",
    Xe: "ff",
    XeviTet: "8a2be2",
    bPwn: "a52a2a",
    burlywood: "deb887",
    caMtXe: "5f9ea0",
    KartYuse: "7fff00",
    KocTate: "d2691e",
    cSO: "ff7f50",
    cSnflowerXe: "6495ed",
    cSnsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "ffff",
    xXe: "8b",
    xcyan: "8b8b",
    xgTMnPd: "b8860b",
    xWay: "a9a9a9",
    xgYF: "6400",
    xgYy: "a9a9a9",
    xkhaki: "bdb76b",
    xmagFta: "8b008b",
    xTivegYF: "556b2f",
    xSange: "ff8c00",
    xScEd: "9932cc",
    xYd: "8b0000",
    xsOmon: "e9967a",
    xsHgYF: "8fbc8f",
    xUXe: "483d8b",
    xUWay: "2f4f4f",
    xUgYy: "2f4f4f",
    xQe: "ced1",
    xviTet: "9400d3",
    dAppRk: "ff1493",
    dApskyXe: "bfff",
    dimWay: "696969",
    dimgYy: "696969",
    dodgerXe: "1e90ff",
    fiYbrick: "b22222",
    flSOwEte: "fffaf0",
    foYstWAn: "228b22",
    fuKsia: "ff00ff",
    gaRsbSo: "dcdcdc",
    ghostwEte: "f8f8ff",
    gTd: "ffd700",
    gTMnPd: "daa520",
    Way: "808080",
    gYF: "8000",
    gYFLw: "adff2f",
    gYy: "808080",
    honeyMw: "f0fff0",
    hotpRk: "ff69b4",
    RdianYd: "cd5c5c",
    Rdigo: "4b0082",
    ivSy: "fffff0",
    khaki: "f0e68c",
    lavFMr: "e6e6fa",
    lavFMrXsh: "fff0f5",
    lawngYF: "7cfc00",
    NmoncEffon: "fffacd",
    ZXe: "add8e6",
    ZcSO: "f08080",
    Zcyan: "e0ffff",
    ZgTMnPdLw: "fafad2",
    ZWay: "d3d3d3",
    ZgYF: "90ee90",
    ZgYy: "d3d3d3",
    ZpRk: "ffb6c1",
    ZsOmon: "ffa07a",
    ZsHgYF: "20b2aa",
    ZskyXe: "87cefa",
    ZUWay: "778899",
    ZUgYy: "778899",
    ZstAlXe: "b0c4de",
    ZLw: "ffffe0",
    lime: "ff00",
    limegYF: "32cd32",
    lRF: "faf0e6",
    magFta: "ff00ff",
    maPon: "800000",
    VaquamarRe: "66cdaa",
    VXe: "cd",
    VScEd: "ba55d3",
    VpurpN: "9370db",
    VsHgYF: "3cb371",
    VUXe: "7b68ee",
    VsprRggYF: "fa9a",
    VQe: "48d1cc",
    VviTetYd: "c71585",
    midnightXe: "191970",
    mRtcYam: "f5fffa",
    mistyPse: "ffe4e1",
    moccasR: "ffe4b5",
    navajowEte: "ffdead",
    navy: "80",
    Tdlace: "fdf5e6",
    Tive: "808000",
    TivedBb: "6b8e23",
    Sange: "ffa500",
    SangeYd: "ff4500",
    ScEd: "da70d6",
    pOegTMnPd: "eee8aa",
    pOegYF: "98fb98",
    pOeQe: "afeeee",
    pOeviTetYd: "db7093",
    papayawEp: "ffefd5",
    pHKpuff: "ffdab9",
    peru: "cd853f",
    pRk: "ffc0cb",
    plum: "dda0dd",
    powMrXe: "b0e0e6",
    purpN: "800080",
    YbeccapurpN: "663399",
    Yd: "ff0000",
    Psybrown: "bc8f8f",
    PyOXe: "4169e1",
    saddNbPwn: "8b4513",
    sOmon: "fa8072",
    sandybPwn: "f4a460",
    sHgYF: "2e8b57",
    sHshell: "fff5ee",
    siFna: "a0522d",
    silver: "c0c0c0",
    skyXe: "87ceeb",
    UXe: "6a5acd",
    UWay: "708090",
    UgYy: "708090",
    snow: "fffafa",
    sprRggYF: "ff7f",
    stAlXe: "4682b4",
    tan: "d2b48c",
    teO: "8080",
    tEstN: "d8bfd8",
    tomato: "ff6347",
    Qe: "40e0d0",
    viTet: "ee82ee",
    JHt: "f5deb3",
    wEte: "ffffff",
    wEtesmoke: "f5f5f5",
    Lw: "ffff00",
    LwgYF: "9acd32"
  };
  var T;

  function L(t) {
    T || (T = function () {
      var t = {},
          e = Object.keys(O),
          i = Object.keys(A);
      var n, o, s, a, r;

      for (n = 0; n < e.length; n++) {
        for (a = r = e[n], o = 0; o < i.length; o++) {
          s = i[o], r = r.replace(s, A[s]);
        }

        s = parseInt(O[a], 16), t[r] = [s >> 16 & 255, s >> 8 & 255, 255 & s];
      }

      return t;
    }(), T.transparent = [0, 0, 0, 0]);
    var e = T[t.toLowerCase()];
    return e && {
      r: e[0],
      g: e[1],
      b: e[2],
      a: 4 === e.length ? e[3] : 255
    };
  }

  function R(t, e, i) {
    if (t) {
      var _n3 = k(t);

      _n3[e] = Math.max(0, Math.min(_n3[e] + _n3[e] * i, 0 === e ? 360 : 1)), _n3 = P(_n3), t.r = _n3[0], t.g = _n3[1], t.b = _n3[2];
    }
  }

  function E(t, e) {
    return t ? Object.assign(e || {}, t) : t;
  }

  function I(t) {
    var e = {
      r: 0,
      g: 0,
      b: 0,
      a: 255
    };
    return Array.isArray(t) ? t.length >= 3 && (e = {
      r: t[0],
      g: t[1],
      b: t[2],
      a: 255
    }, t.length > 3 && (e.a = m(t[3]))) : (e = E(t, {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    })).a = m(e.a), e;
  }

  function F(t) {
    return "r" === t.charAt(0) ? function (t) {
      var e = _.exec(t);

      var i,
          n,
          o,
          s = 255;

      if (e) {
        if (e[7] !== i) {
          var _t2 = +e[7];

          s = 255 & (e[8] ? p(_t2) : 255 * _t2);
        }

        return i = +e[1], n = +e[3], o = +e[5], i = 255 & (e[2] ? p(i) : i), n = 255 & (e[4] ? p(n) : n), o = 255 & (e[6] ? p(o) : o), {
          r: i,
          g: n,
          b: o,
          a: s
        };
      }
    }(t) : C(t);
  }

  var z =
  /*#__PURE__*/
  function () {
    function z(t) {
      _classCallCheck(this, z);

      if (t instanceof z) return t;

      var e = _typeof(t);

      var i;
      var n, o, s;
      "object" === e ? i = I(t) : "string" === e && (s = (n = t).length, "#" === n[0] && (4 === s || 5 === s ? o = {
        r: 255 & 17 * r[n[1]],
        g: 255 & 17 * r[n[2]],
        b: 255 & 17 * r[n[3]],
        a: 5 === s ? 17 * r[n[4]] : 255
      } : 7 !== s && 9 !== s || (o = {
        r: r[n[1]] << 4 | r[n[2]],
        g: r[n[3]] << 4 | r[n[4]],
        b: r[n[5]] << 4 | r[n[6]],
        a: 9 === s ? r[n[7]] << 4 | r[n[8]] : 255
      })), i = o || L(t) || F(t)), this._rgb = i, this._valid = !!i;
    }

    _createClass(z, [{
      key: "rgbString",
      value: function rgbString() {
        return this._valid ? (t = this._rgb) && (t.a < 255 ? "rgba(".concat(t.r, ", ").concat(t.g, ", ").concat(t.b, ", ").concat(x(t.a), ")") : "rgb(".concat(t.r, ", ").concat(t.g, ", ").concat(t.b, ")")) : this._rgb;
        var t;
      }
    }, {
      key: "hexString",
      value: function hexString() {
        return this._valid ? u(this._rgb) : this._rgb;
      }
    }, {
      key: "hslString",
      value: function hslString() {
        return this._valid ? function (t) {
          if (!t) return;
          var e = k(t),
              i = e[0],
              n = b(e[1]),
              o = b(e[2]);
          return t.a < 255 ? "hsla(".concat(i, ", ").concat(n, "%, ").concat(o, "%, ").concat(x(t.a), ")") : "hsl(".concat(i, ", ").concat(n, "%, ").concat(o, "%)");
        }(this._rgb) : this._rgb;
      }
    }, {
      key: "mix",
      value: function mix(t, e) {
        var i = this;

        if (t) {
          var _n4 = i.rgb,
              _o2 = t.rgb;

          var _s2;

          var _a = e === _s2 ? .5 : e,
              _r = 2 * _a - 1,
              _l = _n4.a - _o2.a,
              _c = ((_r * _l == -1 ? _r : (_r + _l) / (1 + _r * _l)) + 1) / 2;

          _s2 = 1 - _c, _n4.r = 255 & _c * _n4.r + _s2 * _o2.r + .5, _n4.g = 255 & _c * _n4.g + _s2 * _o2.g + .5, _n4.b = 255 & _c * _n4.b + _s2 * _o2.b + .5, _n4.a = _a * _n4.a + (1 - _a) * _o2.a, i.rgb = _n4;
        }

        return i;
      }
    }, {
      key: "clone",
      value: function clone() {
        return new z(this.rgb);
      }
    }, {
      key: "alpha",
      value: function alpha(t) {
        return this._rgb.a = m(t), this;
      }
    }, {
      key: "clearer",
      value: function clearer(t) {
        return this._rgb.a *= 1 - t, this;
      }
    }, {
      key: "greyscale",
      value: function greyscale() {
        var t = this._rgb,
            e = f(.3 * t.r + .59 * t.g + .11 * t.b);
        return t.r = t.g = t.b = e, this;
      }
    }, {
      key: "opaquer",
      value: function opaquer(t) {
        return this._rgb.a *= 1 + t, this;
      }
    }, {
      key: "negate",
      value: function negate() {
        var t = this._rgb;
        return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
      }
    }, {
      key: "lighten",
      value: function lighten(t) {
        return R(this._rgb, 2, t), this;
      }
    }, {
      key: "darken",
      value: function darken(t) {
        return R(this._rgb, 2, -t), this;
      }
    }, {
      key: "saturate",
      value: function saturate(t) {
        return R(this._rgb, 1, t), this;
      }
    }, {
      key: "desaturate",
      value: function desaturate(t) {
        return R(this._rgb, 1, -t), this;
      }
    }, {
      key: "rotate",
      value: function rotate(t) {
        return function (t, e) {
          var i = k(t);
          i[0] = D(i[0] + e), i = P(i), t.r = i[0], t.g = i[1], t.b = i[2];
        }(this._rgb, t), this;
      }
    }, {
      key: "valid",
      get: function get() {
        return this._valid;
      }
    }, {
      key: "rgb",
      get: function get() {
        var t = E(this._rgb);
        return t && (t.a = x(t.a)), t;
      },
      set: function set(t) {
        this._rgb = I(t);
      }
    }]);

    return z;
  }();

  function V(t) {
    return new z(t);
  }

  var B = function B(t) {
    return t instanceof CanvasGradient || t instanceof CanvasPattern;
  };

  function W(t) {
    return B(t) ? t : V(t);
  }

  function H(t) {
    return B(t) ? t : V(t).saturate(.5).darken(.1).hexString();
  }

  function N() {}

  var j = function () {
    var t = 0;
    return function () {
      return t++;
    };
  }();

  function $(t) {
    return null == t;
  }

  function Y(t) {
    if (Array.isArray && Array.isArray(t)) return !0;
    var e = Object.prototype.toString.call(t);
    return "[object" === e.substr(0, 7) && "Array]" === e.substr(-6);
  }

  function U(t) {
    return null !== t && "[object Object]" === Object.prototype.toString.call(t);
  }

  var X = function X(t) {
    return ("number" == typeof t || t instanceof Number) && isFinite(+t);
  };

  function q(t, e) {
    return X(t) ? t : e;
  }

  function K(t, e) {
    return void 0 === t ? e : t;
  }

  var G = function G(t, e) {
    return "string" == typeof t && t.endsWith("%") ? parseFloat(t) / 100 : t / e;
  },
      Z = function Z(t, e) {
    return "string" == typeof t && t.endsWith("%") ? parseFloat(t) / 100 * e : +t;
  };

  function Q(t, e, i) {
    if (t && "function" == typeof t.call) return t.apply(i, e);
  }

  function J(t, e, i, n) {
    var o, s, a;
    if (Y(t)) {
      if (s = t.length, n) for (o = s - 1; o >= 0; o--) {
        e.call(i, t[o], o);
      } else for (o = 0; o < s; o++) {
        e.call(i, t[o], o);
      }
    } else if (U(t)) for (a = Object.keys(t), s = a.length, o = 0; o < s; o++) {
      e.call(i, t[a[o]], a[o]);
    }
  }

  function tt(t, e) {
    var i, n, o, s;
    if (!t || !e || t.length !== e.length) return !1;

    for (i = 0, n = t.length; i < n; ++i) {
      if (o = t[i], s = e[i], o.datasetIndex !== s.datasetIndex || o.index !== s.index) return !1;
    }

    return !0;
  }

  function et(t) {
    if (Y(t)) return t.map(et);

    if (U(t)) {
      var _e2 = Object.create(null),
          _i2 = Object.keys(t),
          _n5 = _i2.length;

      var _o3 = 0;

      for (; _o3 < _n5; ++_o3) {
        _e2[_i2[_o3]] = et(t[_i2[_o3]]);
      }

      return _e2;
    }

    return t;
  }

  function it(t) {
    return -1 === ["__proto__", "prototype", "constructor"].indexOf(t);
  }

  function nt(t, e, i, n) {
    if (!it(t)) return;
    var o = e[t],
        s = i[t];
    U(o) && U(s) ? ot(o, s, n) : e[t] = et(s);
  }

  function ot(t, e, i) {
    var n = Y(e) ? e : [e],
        o = n.length;
    if (!U(t)) return t;
    var s = (i = i || {}).merger || nt;

    for (var _a2 = 0; _a2 < o; ++_a2) {
      if (!U(e = n[_a2])) continue;

      var _o4 = Object.keys(e);

      for (var _n6 = 0, _a3 = _o4.length; _n6 < _a3; ++_n6) {
        s(_o4[_n6], t, e, i);
      }
    }

    return t;
  }

  function st(t, e) {
    return ot(t, e, {
      merger: at
    });
  }

  function at(t, e, i) {
    if (!it(t)) return;
    var n = e[t],
        o = i[t];
    U(n) && U(o) ? st(n, o) : Object.prototype.hasOwnProperty.call(e, t) || (e[t] = et(o));
  }

  function rt(t, e) {
    var i = t.indexOf(".", e);
    return -1 === i ? t.length : i;
  }

  function lt(t, e) {
    if ("" === e) return t;
    var i = 0,
        n = rt(e, i);

    for (; t && n > i;) {
      t = t[e.substr(i, n - i)], i = n + 1, n = rt(e, i);
    }

    return t;
  }

  function ct(t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
  }

  var ht = function ht(t) {
    return void 0 !== t;
  },
      dt = function dt(t) {
    return "function" == typeof t;
  },
      ut = Object.create(null),
      ft = Object.create(null);

  function gt(t, e) {
    if (!e) return t;
    var i = e.split(".");

    for (var _e3 = 0, _n7 = i.length; _e3 < _n7; ++_e3) {
      var _n8 = i[_e3];
      t = t[_n8] || (t[_n8] = Object.create(null));
    }

    return t;
  }

  function pt(t, e, i) {
    return "string" == typeof e ? ot(gt(t, e), i) : ot(gt(t, ""), e);
  }

  var mt = new (
  /*#__PURE__*/
  function () {
    function _class2(t) {
      _classCallCheck(this, _class2);

      this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = function (t) {
        return t.chart.platform.getDevicePixelRatio();
      }, this.elements = {}, this.events = ["mousemove", "mouseout", "click", "touchstart", "touchmove"], this.font = {
        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        size: 12,
        style: "normal",
        lineHeight: 1.2,
        weight: null
      }, this.hover = {}, this.hoverBackgroundColor = function (t, e) {
        return H(e.backgroundColor);
      }, this.hoverBorderColor = function (t, e) {
        return H(e.borderColor);
      }, this.hoverColor = function (t, e) {
        return H(e.color);
      }, this.indexAxis = "x", this.interaction = {
        mode: "nearest",
        intersect: !0
      }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.describe(t);
    }

    _createClass(_class2, [{
      key: "set",
      value: function set(t, e) {
        return pt(this, t, e);
      }
    }, {
      key: "get",
      value: function get(t) {
        return gt(this, t);
      }
    }, {
      key: "describe",
      value: function describe(t, e) {
        return pt(ft, t, e);
      }
    }, {
      key: "override",
      value: function override(t, e) {
        return pt(ut, t, e);
      }
    }, {
      key: "route",
      value: function route(t, e, i, n) {
        var _Object$definePropert;

        var o = gt(this, t),
            s = gt(this, i),
            a = "_" + e;
        Object.defineProperties(o, (_Object$definePropert = {}, _defineProperty(_Object$definePropert, a, {
          value: o[e],
          writable: !0
        }), _defineProperty(_Object$definePropert, e, {
          enumerable: !0,
          get: function get() {
            var t = this[a],
                e = s[n];
            return U(t) ? Object.assign({}, e, t) : K(t, e);
          },
          set: function set(t) {
            this[a] = t;
          }
        }), _Object$definePropert));
      }
    }]);

    return _class2;
  }())({
    _scriptable: function _scriptable(t) {
      return !t.startsWith("on");
    },
    _indexable: function _indexable(t) {
      return "events" !== t;
    },
    hover: {
      _fallback: "interaction"
    },
    interaction: {
      _scriptable: !1,
      _indexable: !1
    }
  });

  var xt = Math.PI,
      bt = 2 * xt,
      _t = bt + xt,
      yt = Number.POSITIVE_INFINITY,
      vt = xt / 180,
      Mt = xt / 2,
      wt = xt / 4,
      kt = 2 * xt / 3,
      St = Math.log10,
      Pt = Math.sign;

  function Dt(t) {
    var e = Math.pow(10, Math.floor(St(t))),
        i = t / e;
    return (i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * e;
  }

  function Ct(t) {
    var e = [],
        i = Math.sqrt(t);
    var n;

    for (n = 1; n < i; n++) {
      t % n == 0 && (e.push(n), e.push(t / n));
    }

    return i === (0 | i) && e.push(i), e.sort(function (t, e) {
      return t - e;
    }).pop(), e;
  }

  function At(t) {
    return !isNaN(parseFloat(t)) && isFinite(t);
  }

  function Ot(t, e, i) {
    return Math.abs(t - e) < i;
  }

  function Tt(t, e) {
    var i = Math.round(t);
    return i - e <= t && i + e >= t;
  }

  function Lt(t, e, i) {
    var n, o, s;

    for (n = 0, o = t.length; n < o; n++) {
      s = t[n][i], isNaN(s) || (e.min = Math.min(e.min, s), e.max = Math.max(e.max, s));
    }
  }

  function Rt(t) {
    return t * (xt / 180);
  }

  function Et(t) {
    return t * (180 / xt);
  }

  function It(t) {
    if (!X(t)) return;
    var e = 1,
        i = 0;

    for (; Math.round(t * e) / e !== t;) {
      e *= 10, i++;
    }

    return i;
  }

  function Ft(t, e) {
    var i = e.x - t.x,
        n = e.y - t.y,
        o = Math.sqrt(i * i + n * n);
    var s = Math.atan2(n, i);
    return s < -.5 * xt && (s += bt), {
      angle: s,
      distance: o
    };
  }

  function zt(t, e) {
    return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
  }

  function Vt(t, e) {
    return (t - e + _t) % bt - xt;
  }

  function Bt(t) {
    return (t % bt + bt) % bt;
  }

  function Wt(t, e, i) {
    var n = Bt(t),
        o = Bt(e),
        s = Bt(i),
        a = Bt(o - n),
        r = Bt(s - n),
        l = Bt(n - o),
        c = Bt(n - s);
    return n === o || n === s || a > r && l < c;
  }

  function Ht(t, e, i) {
    return Math.max(e, Math.min(i, t));
  }

  function Nt(t) {
    return Ht(t, -32768, 32767);
  }

  function jt(t) {
    return !t || $(t.size) || $(t.family) ? null : (t.style ? t.style + " " : "") + (t.weight ? t.weight + " " : "") + t.size + "px " + t.family;
  }

  function $t(t, e, i, n, o) {
    var s = e[o];
    return s || (s = e[o] = t.measureText(o).width, i.push(o)), s > n && (n = s), n;
  }

  function Yt(t, e, i, n) {
    var o = (n = n || {}).data = n.data || {},
        s = n.garbageCollect = n.garbageCollect || [];
    n.font !== e && (o = n.data = {}, s = n.garbageCollect = [], n.font = e), t.save(), t.font = e;
    var a = 0;
    var r = i.length;
    var l, c, h, d, u;

    for (l = 0; l < r; l++) {
      if (d = i[l], null != d && !0 !== Y(d)) a = $t(t, o, s, a, d);else if (Y(d)) for (c = 0, h = d.length; c < h; c++) {
        u = d[c], null == u || Y(u) || (a = $t(t, o, s, a, u));
      }
    }

    t.restore();
    var f = s.length / 2;

    if (f > i.length) {
      for (l = 0; l < f; l++) {
        delete o[s[l]];
      }

      s.splice(0, f);
    }

    return a;
  }

  function Ut(t, e, i) {
    var n = t.currentDevicePixelRatio,
        o = 0 !== i ? Math.max(i / 2, .5) : 0;
    return Math.round((e - o) * n) / n + o;
  }

  function Xt(t, e) {
    (e = e || t.getContext("2d")).save(), e.resetTransform(), e.clearRect(0, 0, t.width, t.height), e.restore();
  }

  function qt(t, e, i, n) {
    var o, s, a, r, l;
    var c = e.pointStyle,
        h = e.rotation,
        d = e.radius;
    var u = (h || 0) * vt;
    if (c && "object" == _typeof(c) && (o = c.toString(), "[object HTMLImageElement]" === o || "[object HTMLCanvasElement]" === o)) return t.save(), t.translate(i, n), t.rotate(u), t.drawImage(c, -c.width / 2, -c.height / 2, c.width, c.height), void t.restore();

    if (!(isNaN(d) || d <= 0)) {
      switch (t.beginPath(), c) {
        default:
          t.arc(i, n, d, 0, bt), t.closePath();
          break;

        case "triangle":
          t.moveTo(i + Math.sin(u) * d, n - Math.cos(u) * d), u += kt, t.lineTo(i + Math.sin(u) * d, n - Math.cos(u) * d), u += kt, t.lineTo(i + Math.sin(u) * d, n - Math.cos(u) * d), t.closePath();
          break;

        case "rectRounded":
          l = .516 * d, r = d - l, s = Math.cos(u + wt) * r, a = Math.sin(u + wt) * r, t.arc(i - s, n - a, l, u - xt, u - Mt), t.arc(i + a, n - s, l, u - Mt, u), t.arc(i + s, n + a, l, u, u + Mt), t.arc(i - a, n + s, l, u + Mt, u + xt), t.closePath();
          break;

        case "rect":
          if (!h) {
            r = Math.SQRT1_2 * d, t.rect(i - r, n - r, 2 * r, 2 * r);
            break;
          }

          u += wt;

        case "rectRot":
          s = Math.cos(u) * d, a = Math.sin(u) * d, t.moveTo(i - s, n - a), t.lineTo(i + a, n - s), t.lineTo(i + s, n + a), t.lineTo(i - a, n + s), t.closePath();
          break;

        case "crossRot":
          u += wt;

        case "cross":
          s = Math.cos(u) * d, a = Math.sin(u) * d, t.moveTo(i - s, n - a), t.lineTo(i + s, n + a), t.moveTo(i + a, n - s), t.lineTo(i - a, n + s);
          break;

        case "star":
          s = Math.cos(u) * d, a = Math.sin(u) * d, t.moveTo(i - s, n - a), t.lineTo(i + s, n + a), t.moveTo(i + a, n - s), t.lineTo(i - a, n + s), u += wt, s = Math.cos(u) * d, a = Math.sin(u) * d, t.moveTo(i - s, n - a), t.lineTo(i + s, n + a), t.moveTo(i + a, n - s), t.lineTo(i - a, n + s);
          break;

        case "line":
          s = Math.cos(u) * d, a = Math.sin(u) * d, t.moveTo(i - s, n - a), t.lineTo(i + s, n + a);
          break;

        case "dash":
          t.moveTo(i, n), t.lineTo(i + Math.cos(u) * d, n + Math.sin(u) * d);
      }

      t.fill(), e.borderWidth > 0 && t.stroke();
    }
  }

  function Kt(t, e, i) {
    return i = i || .5, t && t.x > e.left - i && t.x < e.right + i && t.y > e.top - i && t.y < e.bottom + i;
  }

  function Gt(t, e) {
    t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip();
  }

  function Zt(t) {
    t.restore();
  }

  function Qt(t, e, i, n, o) {
    if (!e) return t.lineTo(i.x, i.y);

    if ("middle" === o) {
      var _n9 = (e.x + i.x) / 2;

      t.lineTo(_n9, e.y), t.lineTo(_n9, i.y);
    } else "after" === o != !!n ? t.lineTo(e.x, i.y) : t.lineTo(i.x, e.y);

    t.lineTo(i.x, i.y);
  }

  function Jt(t, e, i, n) {
    if (!e) return t.lineTo(i.x, i.y);
    t.bezierCurveTo(n ? e.cp1x : e.cp2x, n ? e.cp1y : e.cp2y, n ? i.cp2x : i.cp1x, n ? i.cp2y : i.cp1y, i.x, i.y);
  }

  function te(t, e, i, n, o) {
    var s = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    var a = Y(e) ? e : [e],
        r = s.strokeWidth > 0 && "" !== s.strokeColor;
    var l, c;

    for (t.save(), s.translation && t.translate(s.translation[0], s.translation[1]), $(s.rotation) || t.rotate(s.rotation), t.font = o.string, s.color && (t.fillStyle = s.color), s.textAlign && (t.textAlign = s.textAlign), s.textBaseline && (t.textBaseline = s.textBaseline), l = 0; l < a.length; ++l) {
      if (c = a[l], r && (s.strokeColor && (t.strokeStyle = s.strokeColor), $(s.strokeWidth) || (t.lineWidth = s.strokeWidth), t.strokeText(c, i, n, s.maxWidth)), t.fillText(c, i, n, s.maxWidth), s.strikethrough || s.underline) {
        var _e4 = t.measureText(c),
            _o5 = i - _e4.actualBoundingBoxLeft,
            _a4 = i + _e4.actualBoundingBoxRight,
            _r2 = n - _e4.actualBoundingBoxAscent,
            _l2 = n + _e4.actualBoundingBoxDescent,
            _h = s.strikethrough ? (_r2 + _l2) / 2 : _l2;

        t.strokeStyle = t.fillStyle, t.beginPath(), t.lineWidth = s.decorationWidth || 2, t.moveTo(_o5, _h), t.lineTo(_a4, _h), t.stroke();
      }

      n += o.lineHeight;
    }

    t.restore();
  }

  function ee(t, e, i) {
    i = i || function (i) {
      return t[i] < e;
    };

    var n,
        o = t.length - 1,
        s = 0;

    for (; o - s > 1;) {
      n = s + o >> 1, i(n) ? s = n : o = n;
    }

    return {
      lo: s,
      hi: o
    };
  }

  var ie = function ie(t, e, i) {
    return ee(t, i, function (n) {
      return t[n][e] < i;
    });
  },
      ne = function ne(t, e, i) {
    return ee(t, i, function (n) {
      return t[n][e] >= i;
    });
  };

  function oe(t, e, i) {
    var n = 0,
        o = t.length;

    for (; n < o && t[n] < e;) {
      n++;
    }

    for (; o > n && t[o - 1] > i;) {
      o--;
    }

    return n > 0 || o < t.length ? t.slice(n, o) : t;
  }

  var se = ["push", "pop", "shift", "splice", "unshift"];

  function ae(t, e) {
    t._chartjs ? t._chartjs.listeners.push(e) : (Object.defineProperty(t, "_chartjs", {
      configurable: !0,
      enumerable: !1,
      value: {
        listeners: [e]
      }
    }), se.forEach(function (e) {
      var i = "_onData" + ct(e),
          n = t[e];
      Object.defineProperty(t, e, {
        configurable: !0,
        enumerable: !1,
        value: function value() {
          for (var _len2 = arguments.length, e = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            e[_key2] = arguments[_key2];
          }

          var o = n.apply(this, e);
          return t._chartjs.listeners.forEach(function (t) {
            "function" == typeof t[i] && t[i].apply(t, e);
          }), o;
        }
      });
    }));
  }

  function re(t, e) {
    var i = t._chartjs;
    if (!i) return;
    var n = i.listeners,
        o = n.indexOf(e);
    -1 !== o && n.splice(o, 1), n.length > 0 || (se.forEach(function (e) {
      delete t[e];
    }), delete t._chartjs);
  }

  function le(t) {
    var e = new Set();
    var i, n;

    for (i = 0, n = t.length; i < n; ++i) {
      e.add(t[i]);
    }

    if (e.size === n) return t;
    var o = [];
    return e.forEach(function (t) {
      o.push(t);
    }), o;
  }

  function ce(t) {
    var e = t.parentNode;
    return e && "[object ShadowRoot]" === e.toString() && (e = e.host), e;
  }

  function he(t, e, i) {
    var n;
    return "string" == typeof t ? (n = parseInt(t, 10), -1 !== t.indexOf("%") && (n = n / 100 * e.parentNode[i])) : n = t, n;
  }

  var de = function de(t) {
    return window.getComputedStyle(t, null);
  };

  function ue(t, e) {
    return de(t).getPropertyValue(e);
  }

  var fe = ["top", "right", "bottom", "left"];

  function ge(t, e, i) {
    var n = {};
    i = i ? "-" + i : "";

    for (var _o6 = 0; _o6 < 4; _o6++) {
      var _s3 = fe[_o6];
      n[_s3] = parseFloat(t[e + "-" + _s3 + i]) || 0;
    }

    return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
  }

  function pe(t, e) {
    var i = e.canvas,
        n = e.currentDevicePixelRatio,
        o = de(i),
        s = "border-box" === o.boxSizing,
        a = ge(o, "padding"),
        r = ge(o, "border", "width"),
        _ref = function (t, e) {
      var i = t["native"] || t,
          n = i.touches,
          o = n && n.length ? n[0] : i,
          s = o.offsetX,
          a = o.offsetY;
      var r,
          l,
          c = !1;
      if (function (t, e, i) {
        return (t > 0 || e > 0) && (!i || !i.shadowRoot);
      }(s, a, i.target)) r = s, l = a;else {
        var _t3 = e.getBoundingClientRect();

        r = o.clientX - _t3.left, l = o.clientY - _t3.top, c = !0;
      }
      return {
        x: r,
        y: l,
        box: c
      };
    }(t, i),
        l = _ref.x,
        c = _ref.y,
        h = _ref.box,
        d = a.left + (h && r.left),
        u = a.top + (h && r.top);

    var f = e.width,
        g = e.height;
    return s && (f -= a.width + r.width, g -= a.height + r.height), {
      x: Math.round((l - d) / f * i.width / n),
      y: Math.round((c - u) / g * i.height / n)
    };
  }

  var me = function me(t) {
    return Math.round(10 * t) / 10;
  };

  function xe(t, e, i, n) {
    var o = de(t),
        s = ge(o, "margin"),
        a = he(o.maxWidth, t, "clientWidth") || yt,
        r = he(o.maxHeight, t, "clientHeight") || yt,
        l = function (t, e, i) {
      var n, o;

      if (void 0 === e || void 0 === i) {
        var _s4 = ce(t);

        if (_s4) {
          var _t4 = _s4.getBoundingClientRect(),
              _a5 = de(_s4),
              _r3 = ge(_a5, "border", "width"),
              _l3 = ge(_a5, "padding");

          e = _t4.width - _l3.width - _r3.width, i = _t4.height - _l3.height - _r3.height, n = he(_a5.maxWidth, _s4, "clientWidth"), o = he(_a5.maxHeight, _s4, "clientHeight");
        } else e = t.clientWidth, i = t.clientHeight;
      }

      return {
        width: e,
        height: i,
        maxWidth: n || yt,
        maxHeight: o || yt
      };
    }(t, e, i);

    var c = l.width,
        h = l.height;

    if ("content-box" === o.boxSizing) {
      var _t5 = ge(o, "border", "width"),
          _e5 = ge(o, "padding");

      c -= _e5.width + _t5.width, h -= _e5.height + _t5.height;
    }

    return c = Math.max(0, c - s.width), h = Math.max(0, n ? Math.floor(c / n) : h - s.height), c = me(Math.min(c, a, l.maxWidth)), h = me(Math.min(h, r, l.maxHeight)), c && !h && (h = me(c / 2)), {
      width: c,
      height: h
    };
  }

  function be(t, e, i) {
    var n = t.currentDevicePixelRatio = e || 1,
        o = t.canvas,
        s = t.width,
        a = t.height;
    o.height = a * n, o.width = s * n, t.ctx.setTransform(n, 0, 0, n, 0, 0), o.style && (i || !o.style.height && !o.style.width) && (o.style.height = a + "px", o.style.width = s + "px");
  }

  var _e = function () {
    var t = !1;

    try {
      var _e6 = {
        get passive() {
          return t = !0, !1;
        }

      };
      window.addEventListener("test", null, _e6), window.removeEventListener("test", null, _e6);
    } catch (t) {}

    return t;
  }();

  function ye(t, e) {
    var i = ue(t, e),
        n = i && i.match(/^(\d+)(\.\d+)?px$/);
    return n ? +n[1] : void 0;
  }

  function ve(t, e) {
    return "native" in t ? {
      x: t.x,
      y: t.y
    } : pe(t, e);
  }

  function Me(t, e, i, n) {
    var o = t.controller,
        s = t.data,
        a = t._sorted,
        r = o._cachedMeta.iScale;

    if (r && e === r.axis && a && s.length) {
      var _t6 = r._reversePixels ? ne : ie;

      if (!n) return _t6(s, e, i);

      if (o._sharedOptions) {
        var _n10 = s[0],
            _o7 = "function" == typeof _n10.getRange && _n10.getRange(e);

        if (_o7) {
          var _n11 = _t6(s, e, i - _o7),
              _a6 = _t6(s, e, i + _o7);

          return {
            lo: _n11.lo,
            hi: _a6.hi
          };
        }
      }
    }

    return {
      lo: 0,
      hi: s.length - 1
    };
  }

  function we(t, e, i, n, o) {
    var s = t.getSortedVisibleDatasetMetas(),
        a = i[e];

    for (var _t7 = 0, _i3 = s.length; _t7 < _i3; ++_t7) {
      var _s$_t = s[_t7],
          _i4 = _s$_t.index,
          _r4 = _s$_t.data,
          _Me = Me(s[_t7], e, a, o),
          _l4 = _Me.lo,
          _c2 = _Me.hi;

      for (var _t8 = _l4; _t8 <= _c2; ++_t8) {
        var _e7 = _r4[_t8];
        _e7.skip || n(_e7, _i4, _t8);
      }
    }
  }

  function ke(t, e, i, n) {
    var o = [];
    if (!Kt(e, t.chartArea, t._minPadding)) return o;
    return we(t, i, e, function (t, i, s) {
      t.inRange(e.x, e.y, n) && o.push({
        element: t,
        datasetIndex: i,
        index: s
      });
    }, !0), o;
  }

  function Se(t, e, i, n, o) {
    var s = function (t) {
      var e = -1 !== t.indexOf("x"),
          i = -1 !== t.indexOf("y");
      return function (t, n) {
        var o = e ? Math.abs(t.x - n.x) : 0,
            s = i ? Math.abs(t.y - n.y) : 0;
        return Math.sqrt(Math.pow(o, 2) + Math.pow(s, 2));
      };
    }(i);

    var a = Number.POSITIVE_INFINITY,
        r = [];
    if (!Kt(e, t.chartArea, t._minPadding)) return r;
    return we(t, i, e, function (t, i, l) {
      if (n && !t.inRange(e.x, e.y, o)) return;
      var c = t.getCenterPoint(o),
          h = s(e, c);
      h < a ? (r = [{
        element: t,
        datasetIndex: i,
        index: l
      }], a = h) : h === a && r.push({
        element: t,
        datasetIndex: i,
        index: l
      });
    }), r;
  }

  function Pe(t, e, i, n) {
    var o = ve(e, t),
        s = [],
        a = i.axis,
        r = "x" === a ? "inXRange" : "inYRange";
    var l = !1;
    return function (t, e) {
      var i = t.getSortedVisibleDatasetMetas();
      var n, o, s;

      for (var _t9 = 0, _a7 = i.length; _t9 < _a7; ++_t9) {
        var _i$_t = i[_t9];
        n = _i$_t.index;
        o = _i$_t.data;

        for (var _t10 = 0, _i5 = o.length; _t10 < _i5; ++_t10) {
          s = o[_t10], s.skip || e(s, n, _t10);
        }
      }
    }(t, function (t, e, i) {
      t[r](o[a], n) && s.push({
        element: t,
        datasetIndex: e,
        index: i
      }), t.inRange(o.x, o.y, n) && (l = !0);
    }), i.intersect && !l ? [] : s;
  }

  var De = {
    modes: {
      index: function index(t, e, i, n) {
        var o = ve(e, t),
            s = i.axis || "x",
            a = i.intersect ? ke(t, o, s, n) : Se(t, o, s, !1, n),
            r = [];
        return a.length ? (t.getSortedVisibleDatasetMetas().forEach(function (t) {
          var e = a[0].index,
              i = t.data[e];
          i && !i.skip && r.push({
            element: i,
            datasetIndex: t.index,
            index: e
          });
        }), r) : [];
      },
      dataset: function dataset(t, e, i, n) {
        var o = ve(e, t),
            s = i.axis || "xy";
        var a = i.intersect ? ke(t, o, s, n) : Se(t, o, s, !1, n);

        if (a.length > 0) {
          var _e8 = a[0].datasetIndex,
              _i6 = t.getDatasetMeta(_e8).data;
          a = [];

          for (var _t11 = 0; _t11 < _i6.length; ++_t11) {
            a.push({
              element: _i6[_t11],
              datasetIndex: _e8,
              index: _t11
            });
          }
        }

        return a;
      },
      point: function point(t, e, i, n) {
        return ke(t, ve(e, t), i.axis || "xy", n);
      },
      nearest: function nearest(t, e, i, n) {
        return Se(t, ve(e, t), i.axis || "xy", i.intersect, n);
      },
      x: function x(t, e, i, n) {
        return i.axis = "x", Pe(t, e, i, n);
      },
      y: function y(t, e, i, n) {
        return i.axis = "y", Pe(t, e, i, n);
      }
    }
  };
  var Ce = new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);

  function Ae(t, e) {
    var i = ("" + t).match(Ce);
    if (!i || "normal" === i[1]) return 1.2 * e;

    switch (t = +i[2], i[3]) {
      case "px":
        return t;

      case "%":
        t /= 100;
    }

    return e * t;
  }

  function Oe(t, e) {
    var i = {},
        n = U(e),
        o = n ? Object.keys(e) : e,
        s = U(t) ? n ? function (i) {
      return K(t[i], t[e[i]]);
    } : function (e) {
      return t[e];
    } : function () {
      return t;
    };
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = o[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _t12 = _step.value;
        i[_t12] = +s(_t12) || 0;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return i;
  }

  function Te(t) {
    return Oe(t, {
      top: "y",
      right: "x",
      bottom: "y",
      left: "x"
    });
  }

  function Le(t) {
    return Oe(t, ["topLeft", "topRight", "bottomLeft", "bottomRight"]);
  }

  function Re(t) {
    var e = Te(t);
    return e.width = e.left + e.right, e.height = e.top + e.bottom, e;
  }

  function Ee(t, e) {
    t = t || {}, e = e || mt.font;
    var i = K(t.size, e.size);
    "string" == typeof i && (i = parseInt(i, 10));
    var n = {
      family: K(t.family, e.family),
      lineHeight: Ae(K(t.lineHeight, e.lineHeight), i),
      size: i,
      style: K(t.style, e.style),
      weight: K(t.weight, e.weight),
      string: ""
    };
    return n.string = jt(n), n;
  }

  function Ie(t, e, i, n) {
    var o,
        s,
        a,
        r = !0;

    for (o = 0, s = t.length; o < s; ++o) {
      if (a = t[o], void 0 !== a && (void 0 !== e && "function" == typeof a && (a = a(e), r = !1), void 0 !== i && Y(a) && (a = a[i % a.length], r = !1), void 0 !== a)) return n && !r && (n.cacheable = !1), a;
    }
  }

  function Fe(t, e) {
    var i = t.min,
        n = t.max;
    return {
      min: i - Math.abs(Z(e, i)),
      max: n + Z(e, n)
    };
  }

  var ze = ["left", "top", "right", "bottom"];

  function Ve(t, e) {
    return t.filter(function (t) {
      return t.pos === e;
    });
  }

  function Be(t, e) {
    return t.filter(function (t) {
      return -1 === ze.indexOf(t.pos) && t.box.axis === e;
    });
  }

  function We(t, e) {
    return t.sort(function (t, i) {
      var n = e ? i : t,
          o = e ? t : i;
      return n.weight === o.weight ? n.index - o.index : n.weight - o.weight;
    });
  }

  function He(t, e, i, n) {
    return Math.max(t[i], e[i]) + Math.max(t[n], e[n]);
  }

  function Ne(t, e) {
    t.top = Math.max(t.top, e.top), t.left = Math.max(t.left, e.left), t.bottom = Math.max(t.bottom, e.bottom), t.right = Math.max(t.right, e.right);
  }

  function je(t, e, i) {
    var n = i.box,
        o = t.maxPadding;
    if (U(i.pos)) return {
      same: !1,
      other: !1
    };
    i.size && (t[i.pos] -= i.size), i.size = i.horizontal ? n.height : n.width, t[i.pos] += i.size, n.getPadding && Ne(o, n.getPadding());
    var s = Math.max(0, e.outerWidth - He(o, t, "left", "right")),
        a = Math.max(0, e.outerHeight - He(o, t, "top", "bottom")),
        r = s !== t.w,
        l = a !== t.h;
    return t.w = s, t.h = a, i.horizontal ? {
      same: r,
      other: l
    } : {
      same: l,
      other: r
    };
  }

  function $e(t, e) {
    var i = e.maxPadding;

    function n(t) {
      var n = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
      return t.forEach(function (t) {
        n[t] = Math.max(e[t], i[t]);
      }), n;
    }

    return n(t ? ["left", "right"] : ["top", "bottom"]);
  }

  function Ye(t, e, i) {
    var n = [];
    var o, s, a, r, l, c;

    for (o = 0, s = t.length, l = 0; o < s; ++o) {
      a = t[o], r = a.box, r.update(a.width || e.w, a.height || e.h, $e(a.horizontal, e));

      var _je = je(e, i, a),
          _s5 = _je.same,
          _h2 = _je.other;

      l |= _s5 && n.length, c = c || _h2, r.fullSize || n.push(a);
    }

    return l && Ye(n, e, i) || c;
  }

  function Ue(t, e, i) {
    var n = i.padding;
    var o,
        s,
        a,
        r,
        l = e.x,
        c = e.y;

    for (o = 0, s = t.length; o < s; ++o) {
      a = t[o], r = a.box, a.horizontal ? (r.left = r.fullSize ? n.left : e.left, r.right = r.fullSize ? i.outerWidth - n.right : e.left + e.w, r.top = c, r.bottom = c + r.height, r.width = r.right - r.left, c = r.bottom) : (r.left = l, r.right = l + r.width, r.top = r.fullSize ? n.top : e.top, r.bottom = r.fullSize ? i.outerHeight - n.right : e.top + e.h, r.height = r.bottom - r.top, l = r.right);
    }

    e.x = l, e.y = c;
  }

  mt.set("layout", {
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
  var Xe = {
    addBox: function addBox(t, e) {
      t.boxes || (t.boxes = []), e.fullSize = e.fullSize || !1, e.position = e.position || "top", e.weight = e.weight || 0, e._layers = e._layers || function () {
        return [{
          z: 0,
          draw: function draw(t) {
            e.draw(t);
          }
        }];
      }, t.boxes.push(e);
    },
    removeBox: function removeBox(t, e) {
      var i = t.boxes ? t.boxes.indexOf(e) : -1;
      -1 !== i && t.boxes.splice(i, 1);
    },
    configure: function configure(t, e, i) {
      e.fullSize = i.fullSize, e.position = i.position, e.weight = i.weight;
    },
    update: function update(t, e, i, n) {
      if (!t) return;

      var o = Re(t.options.layout.padding),
          s = e - o.width,
          a = i - o.height,
          r = function (t) {
        var e = function (t) {
          var e = [];
          var i, n, o;

          for (i = 0, n = (t || []).length; i < n; ++i) {
            o = t[i], e.push({
              index: i,
              box: o,
              pos: o.position,
              horizontal: o.isHorizontal(),
              weight: o.weight
            });
          }

          return e;
        }(t),
            i = We(e.filter(function (t) {
          return t.box.fullSize;
        }), !0),
            n = We(Ve(e, "left"), !0),
            o = We(Ve(e, "right")),
            s = We(Ve(e, "top"), !0),
            a = We(Ve(e, "bottom")),
            r = Be(e, "x"),
            l = Be(e, "y");

        return {
          fullSize: i,
          leftAndTop: n.concat(s),
          rightAndBottom: o.concat(l).concat(a).concat(r),
          chartArea: Ve(e, "chartArea"),
          vertical: n.concat(o).concat(l),
          horizontal: s.concat(a).concat(r)
        };
      }(t.boxes),
          l = r.vertical,
          c = r.horizontal;

      J(t.boxes, function (t) {
        "function" == typeof t.beforeLayout && t.beforeLayout();
      });
      var h = l.reduce(function (t, e) {
        return e.box.options && !1 === e.box.options.display ? t : t + 1;
      }, 0) || 1,
          d = Object.freeze({
        outerWidth: e,
        outerHeight: i,
        padding: o,
        availableWidth: s,
        availableHeight: a,
        vBoxMaxWidth: s / 2 / h,
        hBoxMaxHeight: a / 2
      }),
          u = Object.assign({}, o);
      Ne(u, Re(n));
      var f = Object.assign({
        maxPadding: u,
        w: s,
        h: a,
        x: o.left,
        y: o.top
      }, o);
      !function (t, e) {
        var i, n, o;

        for (i = 0, n = t.length; i < n; ++i) {
          o = t[i], o.horizontal ? (o.width = o.box.fullSize && e.availableWidth, o.height = e.hBoxMaxHeight) : (o.width = e.vBoxMaxWidth, o.height = o.box.fullSize && e.availableHeight);
        }
      }(l.concat(c), d), Ye(r.fullSize, f, d), Ye(l, f, d), Ye(c, f, d) && Ye(l, f, d), function (t) {
        var e = t.maxPadding;

        function i(i) {
          var n = Math.max(e[i] - t[i], 0);
          return t[i] += n, n;
        }

        t.y += i("top"), t.x += i("left"), i("right"), i("bottom");
      }(f), Ue(r.leftAndTop, f, d), f.x += f.w, f.y += f.h, Ue(r.rightAndBottom, f, d), t.chartArea = {
        left: f.left,
        top: f.top,
        right: f.left + f.w,
        bottom: f.top + f.h,
        height: f.h,
        width: f.w
      }, J(r.chartArea, function (e) {
        var i = e.box;
        Object.assign(i, t.chartArea), i.update(f.w, f.h);
      });
    }
  };

  var qe =
  /*#__PURE__*/
  function () {
    function qe() {
      _classCallCheck(this, qe);
    }

    _createClass(qe, [{
      key: "acquireContext",
      value: function acquireContext(t, e) {}
    }, {
      key: "releaseContext",
      value: function releaseContext(t) {
        return !1;
      }
    }, {
      key: "addEventListener",
      value: function addEventListener(t, e, i) {}
    }, {
      key: "removeEventListener",
      value: function removeEventListener(t, e, i) {}
    }, {
      key: "getDevicePixelRatio",
      value: function getDevicePixelRatio() {
        return 1;
      }
    }, {
      key: "getMaximumSize",
      value: function getMaximumSize(t, e, i, n) {
        return e = Math.max(0, e || t.width), i = i || t.height, {
          width: e,
          height: Math.max(0, n ? Math.floor(e / n) : i)
        };
      }
    }, {
      key: "isAttached",
      value: function isAttached(t) {
        return !0;
      }
    }]);

    return qe;
  }();

  var Ke =
  /*#__PURE__*/
  function (_qe) {
    _inherits(Ke, _qe);

    function Ke() {
      _classCallCheck(this, Ke);

      return _possibleConstructorReturn(this, _getPrototypeOf(Ke).apply(this, arguments));
    }

    _createClass(Ke, [{
      key: "acquireContext",
      value: function acquireContext(t) {
        return t && t.getContext && t.getContext("2d") || null;
      }
    }]);

    return Ke;
  }(qe);

  var Ge = {
    touchstart: "mousedown",
    touchmove: "mousemove",
    touchend: "mouseup",
    pointerenter: "mouseenter",
    pointerdown: "mousedown",
    pointermove: "mousemove",
    pointerup: "mouseup",
    pointerleave: "mouseout",
    pointerout: "mouseout"
  },
      Ze = function Ze(t) {
    return null === t || "" === t;
  };

  var Qe = !!_e && {
    passive: !0
  };

  function Je(t, e, i) {
    t.canvas.removeEventListener(e, i, Qe);
  }

  function ti(t, e, i) {
    var n = t.canvas,
        o = n && ce(n) || n,
        s = new MutationObserver(function (t) {
      var e = ce(o);
      t.forEach(function (t) {
        for (var _n12 = 0; _n12 < t.addedNodes.length; _n12++) {
          var _s6 = t.addedNodes[_n12];
          _s6 !== o && _s6 !== e || i(t.target);
        }
      });
    });
    return s.observe(document, {
      childList: !0,
      subtree: !0
    }), s;
  }

  function ei(t, e, i) {
    var n = t.canvas,
        o = n && ce(n);
    if (!o) return;
    var s = new MutationObserver(function (t) {
      t.forEach(function (t) {
        for (var _e9 = 0; _e9 < t.removedNodes.length; _e9++) {
          if (t.removedNodes[_e9] === n) {
            i();
            break;
          }
        }
      });
    });
    return s.observe(o, {
      childList: !0
    }), s;
  }

  var ii = new Map();
  var ni = 0;

  function oi() {
    var t = window.devicePixelRatio;
    t !== ni && (ni = t, ii.forEach(function (e, i) {
      i.currentDevicePixelRatio !== t && e();
    }));
  }

  function si(t, i, n) {
    var o = t.canvas,
        s = o && ce(o);
    if (!s) return;
    var a = e(function (t, e) {
      var i = s.clientWidth;
      n(t, e), i < s.clientWidth && n();
    }, window),
        r = new ResizeObserver(function (t) {
      var e = t[0],
          i = e.contentRect.width,
          n = e.contentRect.height;
      0 === i && 0 === n || a(i, n);
    });
    return r.observe(s), function (t, e) {
      ii.size || window.addEventListener("resize", oi), ii.set(t, e);
    }(t, a), r;
  }

  function ai(t, e, i) {
    i && i.disconnect(), "resize" === e && function (t) {
      ii["delete"](t), ii.size || window.removeEventListener("resize", oi);
    }(t);
  }

  function ri(t, i, n) {
    var o = t.canvas,
        s = e(function (e) {
      null !== t.ctx && n(function (t, e) {
        var i = Ge[t.type] || t.type,
            _pe = pe(t, e),
            n = _pe.x,
            o = _pe.y;

        return {
          type: i,
          chart: e,
          "native": t,
          x: void 0 !== n ? n : null,
          y: void 0 !== o ? o : null
        };
      }(e, t));
    }, t, function (t) {
      var e = t[0];
      return [e, e.offsetX, e.offsetY];
    });
    return function (t, e, i) {
      t.addEventListener(e, i, Qe);
    }(o, i, s), s;
  }

  var li =
  /*#__PURE__*/
  function (_qe2) {
    _inherits(li, _qe2);

    function li() {
      _classCallCheck(this, li);

      return _possibleConstructorReturn(this, _getPrototypeOf(li).apply(this, arguments));
    }

    _createClass(li, [{
      key: "acquireContext",
      value: function acquireContext(t, e) {
        var i = t && t.getContext && t.getContext("2d");
        return i && i.canvas === t ? (function (t, e) {
          var i = t.style,
              n = t.getAttribute("height"),
              o = t.getAttribute("width");

          if (t.$chartjs = {
            initial: {
              height: n,
              width: o,
              style: {
                display: i.display,
                height: i.height,
                width: i.width
              }
            }
          }, i.display = i.display || "block", i.boxSizing = i.boxSizing || "border-box", Ze(o)) {
            var _e10 = ye(t, "width");

            void 0 !== _e10 && (t.width = _e10);
          }

          if (Ze(n)) if ("" === t.style.height) t.height = t.width / (e || 2);else {
            var _e11 = ye(t, "height");

            void 0 !== _e11 && (t.height = _e11);
          }
        }(t, e), i) : null;
      }
    }, {
      key: "releaseContext",
      value: function releaseContext(t) {
        var e = t.canvas;
        if (!e.$chartjs) return !1;
        var i = e.$chartjs.initial;
        ["height", "width"].forEach(function (t) {
          var n = i[t];
          $(n) ? e.removeAttribute(t) : e.setAttribute(t, n);
        });
        var n = i.style || {};
        return Object.keys(n).forEach(function (t) {
          e.style[t] = n[t];
        }), e.width = e.width, delete e.$chartjs, !0;
      }
    }, {
      key: "addEventListener",
      value: function addEventListener(t, e, i) {
        this.removeEventListener(t, e);
        var n = t.$proxies || (t.$proxies = {}),
            o = {
          attach: ti,
          detach: ei,
          resize: si
        }[e] || ri;
        n[e] = o(t, e, i);
      }
    }, {
      key: "removeEventListener",
      value: function removeEventListener(t, e) {
        var i = t.$proxies || (t.$proxies = {}),
            n = i[e];
        if (!n) return;
        (({
          attach: ai,
          detach: ai,
          resize: ai
        })[e] || Je)(t, e, n), i[e] = void 0;
      }
    }, {
      key: "getDevicePixelRatio",
      value: function getDevicePixelRatio() {
        return window.devicePixelRatio;
      }
    }, {
      key: "getMaximumSize",
      value: function getMaximumSize(t, e, i, n) {
        return xe(t, e, i, n);
      }
    }, {
      key: "isAttached",
      value: function isAttached(t) {
        var e = ce(t);
        return !(!e || !ce(e));
      }
    }]);

    return li;
  }(qe);

  var ci = Object.freeze({
    __proto__: null,
    BasePlatform: qe,
    BasicPlatform: Ke,
    DomPlatform: li
  });

  var hi = function hi(t) {
    return 0 === t || 1 === t;
  },
      di = function di(t, e, i) {
    return -Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * bt / i);
  },
      ui = function ui(t, e, i) {
    return Math.pow(2, -10 * t) * Math.sin((t - e) * bt / i) + 1;
  },
      fi = {
    linear: function linear(t) {
      return t;
    },
    easeInQuad: function easeInQuad(t) {
      return t * t;
    },
    easeOutQuad: function easeOutQuad(t) {
      return -t * (t - 2);
    },
    easeInOutQuad: function easeInOutQuad(t) {
      return (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);
    },
    easeInCubic: function easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic: function easeOutCubic(t) {
      return (t -= 1) * t * t + 1;
    },
    easeInOutCubic: function easeInOutCubic(t) {
      return (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);
    },
    easeInQuart: function easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart: function easeOutQuart(t) {
      return -((t -= 1) * t * t * t - 1);
    },
    easeInOutQuart: function easeInOutQuart(t) {
      return (t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);
    },
    easeInQuint: function easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint: function easeOutQuint(t) {
      return (t -= 1) * t * t * t * t + 1;
    },
    easeInOutQuint: function easeInOutQuint(t) {
      return (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);
    },
    easeInSine: function easeInSine(t) {
      return 1 - Math.cos(t * Mt);
    },
    easeOutSine: function easeOutSine(t) {
      return Math.sin(t * Mt);
    },
    easeInOutSine: function easeInOutSine(t) {
      return -.5 * (Math.cos(xt * t) - 1);
    },
    easeInExpo: function easeInExpo(t) {
      return 0 === t ? 0 : Math.pow(2, 10 * (t - 1));
    },
    easeOutExpo: function easeOutExpo(t) {
      return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
    },
    easeInOutExpo: function easeInOutExpo(t) {
      return hi(t) ? t : t < .5 ? .5 * Math.pow(2, 10 * (2 * t - 1)) : .5 * (2 - Math.pow(2, -10 * (2 * t - 1)));
    },
    easeInCirc: function easeInCirc(t) {
      return t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1);
    },
    easeOutCirc: function easeOutCirc(t) {
      return Math.sqrt(1 - (t -= 1) * t);
    },
    easeInOutCirc: function easeInOutCirc(t) {
      return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },
    easeInElastic: function easeInElastic(t) {
      return hi(t) ? t : di(t, .075, .3);
    },
    easeOutElastic: function easeOutElastic(t) {
      return hi(t) ? t : ui(t, .075, .3);
    },
    easeInOutElastic: function easeInOutElastic(t) {
      var e = .1125;
      return hi(t) ? t : t < .5 ? .5 * di(2 * t, e, .45) : .5 + .5 * ui(2 * t - 1, e, .45);
    },
    easeInBack: function easeInBack(t) {
      var e = 1.70158;
      return t * t * ((e + 1) * t - e);
    },
    easeOutBack: function easeOutBack(t) {
      var e = 1.70158;
      return (t -= 1) * t * ((e + 1) * t + e) + 1;
    },
    easeInOutBack: function easeInOutBack(t) {
      var e = 1.70158;
      return (t /= .5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2);
    },
    easeInBounce: function easeInBounce(t) {
      return 1 - fi.easeOutBounce(1 - t);
    },
    easeOutBounce: function easeOutBounce(t) {
      var e = 7.5625,
          i = 2.75;
      return t < 1 / i ? e * t * t : t < 2 / i ? e * (t -= 1.5 / i) * t + .75 : t < 2.5 / i ? e * (t -= 2.25 / i) * t + .9375 : e * (t -= 2.625 / i) * t + .984375;
    },
    easeInOutBounce: function easeInOutBounce(t) {
      return t < .5 ? .5 * fi.easeInBounce(2 * t) : .5 * fi.easeOutBounce(2 * t - 1) + .5;
    }
  },
      gi = "transparent",
      pi = {
    "boolean": function boolean(t, e, i) {
      return i > .5 ? e : t;
    },
    color: function color(t, e, i) {
      var n = W(t || gi),
          o = n.valid && W(e || gi);
      return o && o.valid ? o.mix(n, i).hexString() : e;
    },
    number: function number(t, e, i) {
      return t + (e - t) * i;
    }
  };

  var mi =
  /*#__PURE__*/
  function () {
    function mi(t, e, i, n) {
      _classCallCheck(this, mi);

      var o = e[i];
      n = Ie([t.to, n, o, t.from]);
      var s = Ie([t.from, o, n]);
      this._active = !0, this._fn = t.fn || pi[t.type || _typeof(s)], this._easing = fi[t.easing] || fi.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = e, this._prop = i, this._from = s, this._to = n, this._promises = void 0;
    }

    _createClass(mi, [{
      key: "active",
      value: function active() {
        return this._active;
      }
    }, {
      key: "update",
      value: function update(t, e, i) {
        var n = this;

        if (n._active) {
          n._notify(!1);

          var _o8 = n._target[n._prop],
              _s7 = i - n._start,
              _a8 = n._duration - _s7;

          n._start = i, n._duration = Math.floor(Math.max(_a8, t.duration)), n._total += _s7, n._loop = !!t.loop, n._to = Ie([t.to, e, _o8, t.from]), n._from = Ie([t.from, _o8, e]);
        }
      }
    }, {
      key: "cancel",
      value: function cancel() {
        var t = this;
        t._active && (t.tick(Date.now()), t._active = !1, t._notify(!1));
      }
    }, {
      key: "tick",
      value: function tick(t) {
        var e = this,
            i = t - e._start,
            n = e._duration,
            o = e._prop,
            s = e._from,
            a = e._loop,
            r = e._to;
        var l;
        if (e._active = s !== r && (a || i < n), !e._active) return e._target[o] = r, void e._notify(!0);
        i < 0 ? e._target[o] = s : (l = i / n % 2, l = a && l > 1 ? 2 - l : l, l = e._easing(Math.min(1, Math.max(0, l))), e._target[o] = e._fn(s, r, l));
      }
    }, {
      key: "wait",
      value: function wait() {
        var t = this._promises || (this._promises = []);
        return new Promise(function (e, i) {
          t.push({
            res: e,
            rej: i
          });
        });
      }
    }, {
      key: "_notify",
      value: function _notify(t) {
        var e = t ? "res" : "rej",
            i = this._promises || [];

        for (var _t13 = 0; _t13 < i.length; _t13++) {
          i[_t13][e]();
        }
      }
    }]);

    return mi;
  }();

  mt.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  });
  var xi = Object.keys(mt.animation);
  mt.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: function _scriptable(t) {
      return "onProgress" !== t && "onComplete" !== t && "fn" !== t;
    }
  }), mt.set("animations", {
    colors: {
      type: "color",
      properties: ["color", "borderColor", "backgroundColor"]
    },
    numbers: {
      type: "number",
      properties: ["x", "y", "borderWidth", "radius", "tension"]
    }
  }), mt.describe("animations", {
    _fallback: "animation"
  }), mt.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: function fn(t) {
            return 0 | t;
          }
        }
      }
    }
  });

  var bi =
  /*#__PURE__*/
  function () {
    function bi(t, e) {
      _classCallCheck(this, bi);

      this._chart = t, this._properties = new Map(), this.configure(e);
    }

    _createClass(bi, [{
      key: "configure",
      value: function configure(t) {
        if (!U(t)) return;
        var e = this._properties;
        Object.getOwnPropertyNames(t).forEach(function (i) {
          var n = t[i];
          if (!U(n)) return;
          var o = {};
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = xi[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _t14 = _step2.value;
              o[_t14] = n[_t14];
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          (Y(n.properties) && n.properties || [i]).forEach(function (t) {
            t !== i && e.has(t) || e.set(t, o);
          });
        });
      }
    }, {
      key: "_animateOptions",
      value: function _animateOptions(t, e) {
        var i = e.options,
            n = function (t, e) {
          if (!e) return;
          var i = t.options;
          if (!i) return void (t.options = e);
          i.$shared && (t.options = i = Object.assign({}, i, {
            $shared: !1,
            $animations: {}
          }));
          return i;
        }(t, i);

        if (!n) return [];

        var o = this._createAnimations(n, i);

        return i.$shared && function (t, e) {
          var i = [],
              n = Object.keys(e);

          for (var _e12 = 0; _e12 < n.length; _e12++) {
            var _o9 = t[n[_e12]];
            _o9 && _o9.active() && i.push(_o9.wait());
          }

          return Promise.all(i);
        }(t.options.$animations, i).then(function () {
          t.options = i;
        }, function () {}), o;
      }
    }, {
      key: "_createAnimations",
      value: function _createAnimations(t, e) {
        var i = this._properties,
            n = [],
            o = t.$animations || (t.$animations = {}),
            s = Object.keys(e),
            a = Date.now();
        var r;

        for (r = s.length - 1; r >= 0; --r) {
          var _l5 = s[r];
          if ("$" === _l5.charAt(0)) continue;

          if ("options" === _l5) {
            n.push.apply(n, _toConsumableArray(this._animateOptions(t, e)));
            continue;
          }

          var _c3 = e[_l5];
          var _h3 = o[_l5];

          var _d = i.get(_l5);

          if (_h3) {
            if (_d && _h3.active()) {
              _h3.update(_d, _c3, a);

              continue;
            }

            _h3.cancel();
          }

          _d && _d.duration ? (o[_l5] = _h3 = new mi(_d, t, _l5, _c3), n.push(_h3)) : t[_l5] = _c3;
        }

        return n;
      }
    }, {
      key: "update",
      value: function update(t, e) {
        if (0 === this._properties.size) return void Object.assign(t, e);

        var i = this._createAnimations(t, e);

        return i.length ? (a.add(this._chart, i), !0) : void 0;
      }
    }]);

    return bi;
  }();

  function _i(t, e) {
    var i = t && t.options || {},
        n = i.reverse,
        o = void 0 === i.min ? e : 0,
        s = void 0 === i.max ? e : 0;
    return {
      start: n ? s : o,
      end: n ? o : s
    };
  }

  function yi(t, e) {
    var i = [],
        n = t._getSortedDatasetMetas(e);

    var o, s;

    for (o = 0, s = n.length; o < s; ++o) {
      i.push(n[o].index);
    }

    return i;
  }

  function vi(t, e, i, n) {
    var o = t.keys,
        s = "single" === n.mode;
    var a, r, l, c;

    if (null !== e) {
      for (a = 0, r = o.length; a < r; ++a) {
        if (l = +o[a], l === i) {
          if (n.all) continue;
          break;
        }

        c = t.values[l], X(c) && (s || 0 === e || Pt(e) === Pt(c)) && (e += c);
      }

      return e;
    }
  }

  function Mi(t, e) {
    var i = t && t.options.stacked;
    return i || void 0 === i && void 0 !== e.stack;
  }

  function wi(t, e, i) {
    var n = t[e] || (t[e] = {});
    return n[i] || (n[i] = {});
  }

  function ki(t, e) {
    var i = t.chart,
        n = t._cachedMeta,
        o = i._stacks || (i._stacks = {}),
        s = n.iScale,
        a = n.vScale,
        r = n.index,
        l = s.axis,
        c = a.axis,
        h = function (t, e, i) {
      return t.id + "." + e.id + "." + i.stack + "." + i.type;
    }(s, a, n),
        d = e.length;

    var u;

    for (var _t15 = 0; _t15 < d; ++_t15) {
      var _i7 = e[_t15],
          _n13 = _i7[l],
          _s8 = _i7[c];
      u = (_i7._stacks || (_i7._stacks = {}))[c] = wi(o, h, _n13), u[r] = _s8;
    }
  }

  function Si(t, e) {
    var i = t.scales;
    return Object.keys(i).filter(function (t) {
      return i[t].axis === e;
    }).shift();
  }

  function Pi(t, e) {
    e = e || t._parsed;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = e[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _i8 = _step3.value;
        var _e13 = _i8._stacks;
        if (!_e13 || void 0 === _e13[t.vScale.id] || void 0 === _e13[t.vScale.id][t.index]) return;
        delete _e13[t.vScale.id][t.index];
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }

  var Di = function Di(t) {
    return "reset" === t || "none" === t;
  },
      Ci = function Ci(t, e) {
    return e ? t : Object.assign({}, t);
  };

  var Ai =
  /*#__PURE__*/
  function () {
    function Ai(t, e) {
      _classCallCheck(this, Ai);

      this.chart = t, this._ctx = t.ctx, this.index = e, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.$context = void 0, this.initialize();
    }

    _createClass(Ai, [{
      key: "initialize",
      value: function initialize() {
        var t = this,
            e = t._cachedMeta;
        t.configure(), t.linkScales(), e._stacked = Mi(e.vScale, e), t.addElements();
      }
    }, {
      key: "updateIndex",
      value: function updateIndex(t) {
        this.index = t;
      }
    }, {
      key: "linkScales",
      value: function linkScales() {
        var t = this,
            e = t.chart,
            i = t._cachedMeta,
            n = t.getDataset(),
            o = function o(t, e, i, n) {
          return "x" === t ? e : "r" === t ? n : i;
        },
            s = i.xAxisID = K(n.xAxisID, Si(e, "x")),
            a = i.yAxisID = K(n.yAxisID, Si(e, "y")),
            r = i.rAxisID = K(n.rAxisID, Si(e, "r")),
            l = i.indexAxis,
            c = i.iAxisID = o(l, s, a, r),
            h = i.vAxisID = o(l, a, s, r);

        i.xScale = t.getScaleForId(s), i.yScale = t.getScaleForId(a), i.rScale = t.getScaleForId(r), i.iScale = t.getScaleForId(c), i.vScale = t.getScaleForId(h);
      }
    }, {
      key: "getDataset",
      value: function getDataset() {
        return this.chart.data.datasets[this.index];
      }
    }, {
      key: "getMeta",
      value: function getMeta() {
        return this.chart.getDatasetMeta(this.index);
      }
    }, {
      key: "getScaleForId",
      value: function getScaleForId(t) {
        return this.chart.scales[t];
      }
    }, {
      key: "_getOtherScale",
      value: function _getOtherScale(t) {
        var e = this._cachedMeta;
        return t === e.iScale ? e.vScale : e.iScale;
      }
    }, {
      key: "reset",
      value: function reset() {
        this._update("reset");
      }
    }, {
      key: "_destroy",
      value: function _destroy() {
        var t = this._cachedMeta;
        this._data && re(this._data, this), t._stacked && Pi(t);
      }
    }, {
      key: "_dataCheck",
      value: function _dataCheck() {
        var t = this,
            e = t.getDataset(),
            i = e.data || (e.data = []);
        U(i) ? t._data = function (t) {
          var e = Object.keys(t),
              i = new Array(e.length);
          var n, o, s;

          for (n = 0, o = e.length; n < o; ++n) {
            s = e[n], i[n] = {
              x: s,
              y: t[s]
            };
          }

          return i;
        }(i) : t._data !== i && (t._data && (re(t._data, t), Pi(t._cachedMeta)), i && Object.isExtensible(i) && ae(i, t), t._data = i);
      }
    }, {
      key: "addElements",
      value: function addElements() {
        var t = this,
            e = t._cachedMeta;
        t._dataCheck(), t.datasetElementType && (e.dataset = new t.datasetElementType());
      }
    }, {
      key: "buildOrUpdateElements",
      value: function buildOrUpdateElements(t) {
        var e = this,
            i = e._cachedMeta,
            n = e.getDataset();
        var o = !1;
        e._dataCheck(), i._stacked = Mi(i.vScale, i), i.stack !== n.stack && (o = !0, Pi(i), i.stack = n.stack), e._resyncElements(t), o && ki(e, i._parsed);
      }
    }, {
      key: "configure",
      value: function configure() {
        var t = this,
            e = t.chart.config,
            i = e.datasetScopeKeys(t._type),
            n = e.getOptionScopes(t.getDataset(), i, !0);
        t.options = e.createResolver(n, t.getContext()), t._parsing = t.options.parsing;
      }
    }, {
      key: "parse",
      value: function parse(t, e) {
        var i = this,
            n = i._cachedMeta,
            o = i._data,
            s = n.iScale,
            a = n._stacked,
            r = s.axis;
        var l,
            c,
            h,
            d = 0 === t && e === o.length || n._sorted,
            u = t > 0 && n._parsed[t - 1];
        if (!1 === i._parsing) n._parsed = o, n._sorted = !0;else {
          h = Y(o[t]) ? i.parseArrayData(n, o, t, e) : U(o[t]) ? i.parseObjectData(n, o, t, e) : i.parsePrimitiveData(n, o, t, e);

          var _s9 = function _s9() {
            return null === c[r] || u && c[r] < u[r];
          };

          for (l = 0; l < e; ++l) {
            n._parsed[l + t] = c = h[l], d && (_s9() && (d = !1), u = c);
          }

          n._sorted = d;
        }
        a && ki(i, h);
      }
    }, {
      key: "parsePrimitiveData",
      value: function parsePrimitiveData(t, e, i, n) {
        var o = t.iScale,
            s = t.vScale,
            a = o.axis,
            r = s.axis,
            l = o.getLabels(),
            c = o === s,
            h = new Array(n);
        var d, u, f;

        for (d = 0, u = n; d < u; ++d) {
          var _h$d;

          f = d + i, h[d] = (_h$d = {}, _defineProperty(_h$d, a, c || o.parse(l[f], f)), _defineProperty(_h$d, r, s.parse(e[f], f)), _h$d);
        }

        return h;
      }
    }, {
      key: "parseArrayData",
      value: function parseArrayData(t, e, i, n) {
        var o = t.xScale,
            s = t.yScale,
            a = new Array(n);
        var r, l, c, h;

        for (r = 0, l = n; r < l; ++r) {
          c = r + i, h = e[c], a[r] = {
            x: o.parse(h[0], c),
            y: s.parse(h[1], c)
          };
        }

        return a;
      }
    }, {
      key: "parseObjectData",
      value: function parseObjectData(t, e, i, n) {
        var o = t.xScale,
            s = t.yScale,
            _this$_parsing = this._parsing,
            _this$_parsing$xAxisK = _this$_parsing.xAxisKey,
            a = _this$_parsing$xAxisK === void 0 ? "x" : _this$_parsing$xAxisK,
            _this$_parsing$yAxisK = _this$_parsing.yAxisKey,
            r = _this$_parsing$yAxisK === void 0 ? "y" : _this$_parsing$yAxisK,
            l = new Array(n);
        var c, h, d, u;

        for (c = 0, h = n; c < h; ++c) {
          d = c + i, u = e[d], l[c] = {
            x: o.parse(lt(u, a), d),
            y: s.parse(lt(u, r), d)
          };
        }

        return l;
      }
    }, {
      key: "getParsed",
      value: function getParsed(t) {
        return this._cachedMeta._parsed[t];
      }
    }, {
      key: "getDataElement",
      value: function getDataElement(t) {
        return this._cachedMeta.data[t];
      }
    }, {
      key: "applyStack",
      value: function applyStack(t, e, i) {
        var n = this.chart,
            o = this._cachedMeta,
            s = e[t.axis];
        return vi({
          keys: yi(n, !0),
          values: e._stacks[t.axis]
        }, s, o.index, {
          mode: i
        });
      }
    }, {
      key: "updateRangeFromParsed",
      value: function updateRangeFromParsed(t, e, i, n) {
        var o = i[e.axis];
        var s = null === o ? NaN : o;
        var a = n && i._stacks[e.axis];
        n && a && (n.values = a, t.min = Math.min(t.min, s), t.max = Math.max(t.max, s), s = vi(n, o, this._cachedMeta.index, {
          all: !0
        })), t.min = Math.min(t.min, s), t.max = Math.max(t.max, s);
      }
    }, {
      key: "getMinMax",
      value: function getMinMax(t, e) {
        var i = this,
            n = i._cachedMeta,
            o = n._parsed,
            s = n._sorted && t === n.iScale,
            a = o.length,
            r = i._getOtherScale(t),
            l = e && n._stacked && {
          keys: yi(i.chart, !0),
          values: null
        },
            c = {
          min: Number.POSITIVE_INFINITY,
          max: Number.NEGATIVE_INFINITY
        },
            _ref2 = function (t) {
          var _t$getUserBounds = t.getUserBounds(),
              e = _t$getUserBounds.min,
              i = _t$getUserBounds.max,
              n = _t$getUserBounds.minDefined,
              o = _t$getUserBounds.maxDefined;

          return {
            min: n ? e : Number.NEGATIVE_INFINITY,
            max: o ? i : Number.POSITIVE_INFINITY
          };
        }(r),
            h = _ref2.min,
            d = _ref2.max;

        var u, f, g, p;

        function m() {
          return g = o[u], f = g[t.axis], p = g[r.axis], !X(f) || h > p || d < p;
        }

        for (u = 0; u < a && (m() || (i.updateRangeFromParsed(c, t, g, l), !s)); ++u) {
          ;
        }

        if (s) for (u = a - 1; u >= 0; --u) {
          if (!m()) {
            i.updateRangeFromParsed(c, t, g, l);
            break;
          }
        }
        return c;
      }
    }, {
      key: "getAllParsedValues",
      value: function getAllParsedValues(t) {
        var e = this._cachedMeta._parsed,
            i = [];
        var n, o, s;

        for (n = 0, o = e.length; n < o; ++n) {
          s = e[n][t.axis], X(s) && i.push(s);
        }

        return i;
      }
    }, {
      key: "getMaxOverflow",
      value: function getMaxOverflow() {
        return !1;
      }
    }, {
      key: "getLabelAndValue",
      value: function getLabelAndValue(t) {
        var e = this._cachedMeta,
            i = e.iScale,
            n = e.vScale,
            o = this.getParsed(t);
        return {
          label: i ? "" + i.getLabelForValue(o[i.axis]) : "",
          value: n ? "" + n.getLabelForValue(o[n.axis]) : ""
        };
      }
    }, {
      key: "_update",
      value: function _update(t) {
        var e = this,
            i = e._cachedMeta;
        e.configure(), e._cachedDataOpts = {}, e.update(t || "default"), i._clip = function (t) {
          var e, i, n, o;
          return U(t) ? (e = t.top, i = t.right, n = t.bottom, o = t.left) : e = i = n = o = t, {
            top: e,
            right: i,
            bottom: n,
            left: o
          };
        }(K(e.options.clip, function (t, e, i) {
          if (!1 === i) return !1;

          var n = _i(t, i),
              o = _i(e, i);

          return {
            top: o.end,
            right: n.end,
            bottom: o.start,
            left: n.start
          };
        }(i.xScale, i.yScale, e.getMaxOverflow())));
      }
    }, {
      key: "update",
      value: function update(t) {}
    }, {
      key: "draw",
      value: function draw() {
        var t = this,
            e = t._ctx,
            i = t.chart,
            n = t._cachedMeta,
            o = n.data || [],
            s = i.chartArea,
            a = [],
            r = t._drawStart || 0,
            l = t._drawCount || o.length - r;
        var c;

        for (n.dataset && n.dataset.draw(e, s, r, l), c = r; c < r + l; ++c) {
          var _t16 = o[c];
          _t16.active ? a.push(_t16) : _t16.draw(e, s);
        }

        for (c = 0; c < a.length; ++c) {
          a[c].draw(e, s);
        }
      }
    }, {
      key: "getStyle",
      value: function getStyle(t, e) {
        var i = e ? "active" : "default";
        return void 0 === t && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(i) : this.resolveDataElementOptions(t || 0, i);
      }
    }, {
      key: "getContext",
      value: function getContext(t, e, i) {
        var n = this,
            o = n.getDataset();
        var s;

        if (t >= 0 && t < n._cachedMeta.data.length) {
          var _e14 = n._cachedMeta.data[t];
          s = _e14.$context || (_e14.$context = function (t, e, i) {
            return Object.assign(Object.create(t), {
              active: !1,
              dataIndex: e,
              parsed: void 0,
              raw: void 0,
              element: i,
              index: e,
              mode: "default",
              type: "data"
            });
          }(n.getContext(), t, _e14)), s.parsed = n.getParsed(t), s.raw = o.data[t];
        } else s = n.$context || (n.$context = function (t, e) {
          return Object.assign(Object.create(t), {
            active: !1,
            dataset: void 0,
            datasetIndex: e,
            index: e,
            mode: "default",
            type: "dataset"
          });
        }(n.chart.getContext(), n.index)), s.dataset = o;

        return s.active = !!e, s.mode = i, s;
      }
    }, {
      key: "resolveDatasetElementOptions",
      value: function resolveDatasetElementOptions(t) {
        return this._resolveElementOptions(this.datasetElementType.id, t);
      }
    }, {
      key: "resolveDataElementOptions",
      value: function resolveDataElementOptions(t, e) {
        return this._resolveElementOptions(this.dataElementType.id, e, t);
      }
    }, {
      key: "_resolveElementOptions",
      value: function _resolveElementOptions(t) {
        var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "default";
        var i = arguments.length > 2 ? arguments[2] : undefined;
        var n = this,
            o = "active" === e,
            s = n._cachedDataOpts,
            a = t + "-" + e,
            r = s[a],
            l = n.enableOptionSharing && ht(i);
        if (r) return Ci(r, l);
        var c = n.chart.config,
            h = c.datasetElementScopeKeys(n._type, t),
            d = o ? [t + "Hover", "hover", t, ""] : [t, ""],
            u = c.getOptionScopes(n.getDataset(), h),
            f = Object.keys(mt.elements[t]),
            g = c.resolveNamedOptions(u, f, function () {
          return n.getContext(i, o);
        }, d);
        return g.$shared && (g.$shared = l, s[a] = Object.freeze(Ci(g, l))), g;
      }
    }, {
      key: "_resolveAnimations",
      value: function _resolveAnimations(t, e, i) {
        var n = this,
            o = n.chart,
            s = n._cachedDataOpts,
            a = "animation-" + e,
            r = s[a];
        if (r) return r;
        var l;

        if (!1 !== o.options.animation) {
          var _o10 = n.chart.config,
              _s10 = _o10.datasetAnimationScopeKeys(n._type, e),
              _a9 = _o10.getOptionScopes(n.getDataset(), _s10);

          l = _o10.createResolver(_a9, n.getContext(t, i, e));
        }

        var c = new bi(o, l && l.animations);
        return l && l._cacheable && (s[a] = Object.freeze(c)), c;
      }
    }, {
      key: "getSharedOptions",
      value: function getSharedOptions(t) {
        if (t.$shared) return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
      }
    }, {
      key: "includeOptions",
      value: function includeOptions(t, e) {
        return !e || Di(t) || this.chart._animationsDisabled;
      }
    }, {
      key: "updateElement",
      value: function updateElement(t, e, i, n) {
        Di(n) ? Object.assign(t, i) : this._resolveAnimations(e, n).update(t, i);
      }
    }, {
      key: "updateSharedOptions",
      value: function updateSharedOptions(t, e, i) {
        t && !Di(e) && this._resolveAnimations(void 0, e).update(t, i);
      }
    }, {
      key: "_setStyle",
      value: function _setStyle(t, e, i, n) {
        t.active = n;
        var o = this.getStyle(e, n);

        this._resolveAnimations(e, i, n).update(t, {
          options: !n && this.getSharedOptions(o) || o
        });
      }
    }, {
      key: "removeHoverStyle",
      value: function removeHoverStyle(t, e, i) {
        this._setStyle(t, i, "active", !1);
      }
    }, {
      key: "setHoverStyle",
      value: function setHoverStyle(t, e, i) {
        this._setStyle(t, i, "active", !0);
      }
    }, {
      key: "_removeDatasetHoverStyle",
      value: function _removeDatasetHoverStyle() {
        var t = this._cachedMeta.dataset;
        t && this._setStyle(t, void 0, "active", !1);
      }
    }, {
      key: "_setDatasetHoverStyle",
      value: function _setDatasetHoverStyle() {
        var t = this._cachedMeta.dataset;
        t && this._setStyle(t, void 0, "active", !0);
      }
    }, {
      key: "_resyncElements",
      value: function _resyncElements(t) {
        var e = this,
            i = e._cachedMeta.data.length,
            n = e._data.length;
        n > i ? e._insertElements(i, n - i, t) : n < i && e._removeElements(n, i - n);
        var o = Math.min(n, i);
        o && e.parse(0, o);
      }
    }, {
      key: "_insertElements",
      value: function _insertElements(t, e) {
        var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
        var n = this,
            o = n._cachedMeta,
            s = o.data,
            a = t + e;
        var r;

        var l = function l(t) {
          for (t.length += e, r = t.length - 1; r >= a; r--) {
            t[r] = t[r - e];
          }
        };

        for (l(s), r = t; r < a; ++r) {
          s[r] = new n.dataElementType();
        }

        n._parsing && l(o._parsed), n.parse(t, e), i && n.updateElements(s, t, e, "reset");
      }
    }, {
      key: "updateElements",
      value: function updateElements(t, e, i, n) {}
    }, {
      key: "_removeElements",
      value: function _removeElements(t, e) {
        var i = this._cachedMeta;

        if (this._parsing) {
          var _n14 = i._parsed.splice(t, e);

          i._stacked && Pi(i, _n14);
        }

        i.data.splice(t, e);
      }
    }, {
      key: "_onDataPush",
      value: function _onDataPush() {
        var t = arguments.length;

        this._insertElements(this.getDataset().data.length - t, t);
      }
    }, {
      key: "_onDataPop",
      value: function _onDataPop() {
        this._removeElements(this._cachedMeta.data.length - 1, 1);
      }
    }, {
      key: "_onDataShift",
      value: function _onDataShift() {
        this._removeElements(0, 1);
      }
    }, {
      key: "_onDataSplice",
      value: function _onDataSplice(t, e) {
        this._removeElements(t, e), this._insertElements(t, arguments.length - 2);
      }
    }, {
      key: "_onDataUnshift",
      value: function _onDataUnshift() {
        this._insertElements(0, arguments.length);
      }
    }]);

    return Ai;
  }();

  Ai.defaults = {}, Ai.prototype.datasetElementType = null, Ai.prototype.dataElementType = null;

  var Oi =
  /*#__PURE__*/
  function () {
    function Oi() {
      _classCallCheck(this, Oi);

      this.x = void 0, this.y = void 0, this.active = !1, this.options = void 0, this.$animations = void 0;
    }

    _createClass(Oi, [{
      key: "tooltipPosition",
      value: function tooltipPosition(t) {
        var _this$getProps = this.getProps(["x", "y"], t),
            e = _this$getProps.x,
            i = _this$getProps.y;

        return {
          x: e,
          y: i
        };
      }
    }, {
      key: "hasValue",
      value: function hasValue() {
        return At(this.x) && At(this.y);
      }
    }, {
      key: "getProps",
      value: function getProps(t, e) {
        var i = this,
            n = this.$animations;
        if (!e || !n) return i;
        var o = {};
        return t.forEach(function (t) {
          o[t] = n[t] && n[t].active() ? n[t]._to : i[t];
        }), o;
      }
    }]);

    return Oi;
  }();

  Oi.defaults = {}, Oi.defaultRoutes = void 0;
  var Ti = new Map();

  function Li(t, e, i) {
    return function (t, e) {
      e = e || {};
      var i = t + JSON.stringify(e);
      var n = Ti.get(i);
      return n || (n = new Intl.NumberFormat(t, e), Ti.set(i, n)), n;
    }(e, i).format(t);
  }

  var Ri = {
    values: function values(t) {
      return Y(t) ? t : "" + t;
    },
    numeric: function numeric(t, e, i) {
      if (0 === t) return "0";
      var n = this.chart.options.locale;
      var o,
          s = t;

      if (i.length > 1) {
        var _e15 = Math.max(Math.abs(i[0].value), Math.abs(i[i.length - 1].value));

        (_e15 < 1e-4 || _e15 > 1e15) && (o = "scientific"), s = function (t, e) {
          var i = e.length > 3 ? e[2].value - e[1].value : e[1].value - e[0].value;
          Math.abs(i) > 1 && t !== Math.floor(t) && (i = t - Math.floor(t));
          return i;
        }(t, i);
      }

      var a = St(Math.abs(s)),
          r = Math.max(Math.min(-1 * Math.floor(a), 20), 0),
          l = {
        notation: o,
        minimumFractionDigits: r,
        maximumFractionDigits: r
      };
      return Object.assign(l, this.options.ticks.format), Li(t, n, l);
    },
    logarithmic: function logarithmic(t, e, i) {
      if (0 === t) return "0";
      var n = t / Math.pow(10, Math.floor(St(t)));
      return 1 === n || 2 === n || 5 === n ? Ri.numeric.call(this, t, e, i) : "";
    }
  };
  var Ei = {
    formatters: Ri
  };

  function Ii(t, e) {
    var i = t.options.ticks,
        n = i.maxTicksLimit || function (t) {
      var e = t.options.offset,
          i = t._tickSize(),
          n = t._length / i + (e ? 0 : 1),
          o = t._maxLength / i;

      return Math.floor(Math.min(n, o));
    }(t),
        o = i.major.enabled ? function (t) {
      var e = [];
      var i, n;

      for (i = 0, n = t.length; i < n; i++) {
        t[i].major && e.push(i);
      }

      return e;
    }(e) : [],
        s = o.length,
        a = o[0],
        r = o[s - 1],
        l = [];

    if (s > n) return function (t, e, i, n) {
      var o,
          s = 0,
          a = i[0];

      for (n = Math.ceil(n), o = 0; o < t.length; o++) {
        o === a && (e.push(t[o]), s++, a = i[s * n]);
      }
    }(e, l, o, s / n), l;

    var c = function (t, e, i) {
      var n = function (t) {
        var e = t.length;
        var i, n;
        if (e < 2) return !1;

        for (n = t[0], i = 1; i < e; ++i) {
          if (t[i] - t[i - 1] !== n) return !1;
        }

        return n;
      }(t),
          o = e.length / i;

      if (!n) return Math.max(o, 1);
      var s = Ct(n);

      for (var _t17 = 0, _e16 = s.length - 1; _t17 < _e16; _t17++) {
        var _e17 = s[_t17];
        if (_e17 > o) return _e17;
      }

      return Math.max(o, 1);
    }(o, e, n);

    if (s > 0) {
      var _t18, _i9;

      var _n15 = s > 1 ? Math.round((r - a) / (s - 1)) : null;

      for (Fi(e, l, c, $(_n15) ? 0 : a - _n15, a), _t18 = 0, _i9 = s - 1; _t18 < _i9; _t18++) {
        Fi(e, l, c, o[_t18], o[_t18 + 1]);
      }

      return Fi(e, l, c, r, $(_n15) ? e.length : r + _n15), l;
    }

    return Fi(e, l, c), l;
  }

  function Fi(t, e, i, n, o) {
    var s = K(n, 0),
        a = Math.min(K(o, t.length), t.length);
    var r,
        l,
        c,
        h = 0;

    for (i = Math.ceil(i), o && (r = o - n, i = r / Math.floor(r / i)), c = s; c < 0;) {
      h++, c = Math.round(s + h * i);
    }

    for (l = Math.max(s, 0); l < a; l++) {
      l === c && (e.push(t[l]), h++, c = Math.round(s + h * i));
    }
  }

  mt.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawBorder: !0,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: function tickWidth(t, e) {
        return e.lineWidth;
      },
      tickColor: function tickColor(t, e) {
        return e.color;
      },
      offset: !1,
      borderDash: [],
      borderDashOffset: 0,
      borderColor: function borderColor(t, e) {
        return e.color;
      },
      borderWidth: function borderWidth(t, e) {
        return e.lineWidth;
      }
    },
    title: {
      display: !1,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Ei.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near"
    }
  }), mt.route("scale.ticks", "color", "", "color"), mt.route("scale.grid", "color", "", "borderColor"), mt.route("scale.title", "color", "", "color"), mt.describe("scale", {
    _fallback: !1,
    _scriptable: function _scriptable(t) {
      return !t.startsWith("before") && !t.startsWith("after") && "callback" !== t && "parser" !== t;
    },
    _indexable: function _indexable(t) {
      return "borderDash" !== t && "tickBorderDash" !== t;
    }
  }), mt.describe("scales", {
    _fallback: "scale"
  });

  var zi = function zi(t, e, i) {
    return "top" === e || "left" === e ? t[e] + i : t[e] - i;
  };

  function Vi(t, e) {
    var i = [],
        n = t.length / e,
        o = t.length;
    var s = 0;

    for (; s < o; s += n) {
      i.push(t[Math.floor(s)]);
    }

    return i;
  }

  function Bi(t, e, i) {
    var n = t.ticks.length,
        o = Math.min(e, n - 1),
        s = t._startPixel,
        a = t._endPixel,
        r = 1e-6;
    var l,
        c = t.getPixelForTick(o);
    if (!(i && (l = 1 === n ? Math.max(c - s, a - c) : 0 === e ? (t.getPixelForTick(1) - c) / 2 : (c - t.getPixelForTick(o - 1)) / 2, c += o < e ? l : -l, c < s - r || c > a + r))) return c;
  }

  function Wi(t) {
    return t.drawTicks ? t.tickLength : 0;
  }

  function Hi(t, e) {
    if (!t.display) return 0;
    var i = Ee(t.font, e),
        n = Re(t.padding);
    return (Y(t.text) ? t.text.length : 1) * i.lineHeight + n.height;
  }

  function Ni(t, e, i) {
    var o = n(t);
    return (i && "right" !== e || !i && "right" === e) && (o = function (t) {
      return "left" === t ? "right" : "right" === t ? "left" : t;
    }(o)), o;
  }

  var ji =
  /*#__PURE__*/
  function (_Oi) {
    _inherits(ji, _Oi);

    function ji(t) {
      var _this;

      _classCallCheck(this, ji);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ji).call(this)), _this.id = t.id, _this.type = t.type, _this.options = void 0, _this.ctx = t.ctx, _this.chart = t.chart, _this.top = void 0, _this.bottom = void 0, _this.left = void 0, _this.right = void 0, _this.width = void 0, _this.height = void 0, _this._margins = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }, _this.maxWidth = void 0, _this.maxHeight = void 0, _this.paddingTop = void 0, _this.paddingBottom = void 0, _this.paddingLeft = void 0, _this.paddingRight = void 0, _this.axis = void 0, _this.labelRotation = void 0, _this.min = void 0, _this.max = void 0, _this.ticks = [], _this._gridLineItems = null, _this._labelItems = null, _this._labelSizes = null, _this._length = 0, _this._maxLength = 0, _this._longestTextCache = {}, _this._startPixel = void 0, _this._endPixel = void 0, _this._reversePixels = !1, _this._userMax = void 0, _this._userMin = void 0, _this._suggestedMax = void 0, _this._suggestedMin = void 0, _this._ticksLength = 0, _this._borderValue = 0, _this._cache = {}, _this._dataLimitsCached = !1, _this.$context = void 0;
      return _this;
    }

    _createClass(ji, [{
      key: "init",
      value: function init(t) {
        var e = this;
        e.options = t, e.axis = t.axis, e._userMin = e.parse(t.min), e._userMax = e.parse(t.max), e._suggestedMin = e.parse(t.suggestedMin), e._suggestedMax = e.parse(t.suggestedMax);
      }
    }, {
      key: "parse",
      value: function parse(t, e) {
        return t;
      }
    }, {
      key: "getUserBounds",
      value: function getUserBounds() {
        var t = this._userMin,
            e = this._userMax,
            i = this._suggestedMin,
            n = this._suggestedMax;
        return t = q(t, Number.POSITIVE_INFINITY), e = q(e, Number.NEGATIVE_INFINITY), i = q(i, Number.POSITIVE_INFINITY), n = q(n, Number.NEGATIVE_INFINITY), {
          min: q(t, i),
          max: q(e, n),
          minDefined: X(t),
          maxDefined: X(e)
        };
      }
    }, {
      key: "getMinMax",
      value: function getMinMax(t) {
        var e = this;

        var i,
            _e$getUserBounds = e.getUserBounds(),
            n = _e$getUserBounds.min,
            o = _e$getUserBounds.max,
            s = _e$getUserBounds.minDefined,
            a = _e$getUserBounds.maxDefined;

        if (s && a) return {
          min: n,
          max: o
        };
        var r = e.getMatchingVisibleMetas();

        for (var _l6 = 0, _c4 = r.length; _l6 < _c4; ++_l6) {
          i = r[_l6].controller.getMinMax(e, t), s || (n = Math.min(n, i.min)), a || (o = Math.max(o, i.max));
        }

        return {
          min: q(n, q(o, n)),
          max: q(o, q(n, o))
        };
      }
    }, {
      key: "getPadding",
      value: function getPadding() {
        var t = this;
        return {
          left: t.paddingLeft || 0,
          top: t.paddingTop || 0,
          right: t.paddingRight || 0,
          bottom: t.paddingBottom || 0
        };
      }
    }, {
      key: "getTicks",
      value: function getTicks() {
        return this.ticks;
      }
    }, {
      key: "getLabels",
      value: function getLabels() {
        var t = this.chart.data;
        return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
      }
    }, {
      key: "beforeLayout",
      value: function beforeLayout() {
        this._cache = {}, this._dataLimitsCached = !1;
      }
    }, {
      key: "beforeUpdate",
      value: function beforeUpdate() {
        Q(this.options.beforeUpdate, [this]);
      }
    }, {
      key: "update",
      value: function update(t, e, i) {
        var n = this,
            o = n.options.ticks,
            s = o.sampleSize;
        n.beforeUpdate(), n.maxWidth = t, n.maxHeight = e, n._margins = i = Object.assign({
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }, i), n.ticks = null, n._labelSizes = null, n._gridLineItems = null, n._labelItems = null, n.beforeSetDimensions(), n.setDimensions(), n.afterSetDimensions(), n._maxLength = n.isHorizontal() ? n.width + i.left + i.right : n.height + i.top + i.bottom, n._dataLimitsCached || (n.beforeDataLimits(), n.determineDataLimits(), n.afterDataLimits(), n._dataLimitsCached = !0), n.beforeBuildTicks(), n.ticks = n.buildTicks() || [], n.afterBuildTicks();
        var a = s < n.ticks.length;
        n._convertTicksToLabels(a ? Vi(n.ticks, s) : n.ticks), n.configure(), n.beforeCalculateLabelRotation(), n.calculateLabelRotation(), n.afterCalculateLabelRotation(), o.display && (o.autoSkip || "auto" === o.source) && (n.ticks = Ii(n, n.ticks), n._labelSizes = null), a && n._convertTicksToLabels(n.ticks), n.beforeFit(), n.fit(), n.afterFit(), n.afterUpdate();
      }
    }, {
      key: "configure",
      value: function configure() {
        var t = this;
        var e,
            i,
            n = t.options.reverse;
        t.isHorizontal() ? (e = t.left, i = t.right) : (e = t.top, i = t.bottom, n = !n), t._startPixel = e, t._endPixel = i, t._reversePixels = n, t._length = i - e, t._alignToPixels = t.options.alignToPixels;
      }
    }, {
      key: "afterUpdate",
      value: function afterUpdate() {
        Q(this.options.afterUpdate, [this]);
      }
    }, {
      key: "beforeSetDimensions",
      value: function beforeSetDimensions() {
        Q(this.options.beforeSetDimensions, [this]);
      }
    }, {
      key: "setDimensions",
      value: function setDimensions() {
        var t = this;
        t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0;
      }
    }, {
      key: "afterSetDimensions",
      value: function afterSetDimensions() {
        Q(this.options.afterSetDimensions, [this]);
      }
    }, {
      key: "_callHooks",
      value: function _callHooks(t) {
        var e = this;
        e.chart.notifyPlugins(t, e.getContext()), Q(e.options[t], [e]);
      }
    }, {
      key: "beforeDataLimits",
      value: function beforeDataLimits() {
        this._callHooks("beforeDataLimits");
      }
    }, {
      key: "determineDataLimits",
      value: function determineDataLimits() {}
    }, {
      key: "afterDataLimits",
      value: function afterDataLimits() {
        this._callHooks("afterDataLimits");
      }
    }, {
      key: "beforeBuildTicks",
      value: function beforeBuildTicks() {
        this._callHooks("beforeBuildTicks");
      }
    }, {
      key: "buildTicks",
      value: function buildTicks() {
        return [];
      }
    }, {
      key: "afterBuildTicks",
      value: function afterBuildTicks() {
        this._callHooks("afterBuildTicks");
      }
    }, {
      key: "beforeTickToLabelConversion",
      value: function beforeTickToLabelConversion() {
        Q(this.options.beforeTickToLabelConversion, [this]);
      }
    }, {
      key: "generateTickLabels",
      value: function generateTickLabels(t) {
        var e = this,
            i = e.options.ticks;
        var n, o, s;

        for (n = 0, o = t.length; n < o; n++) {
          s = t[n], s.label = Q(i.callback, [s.value, n, t], e);
        }
      }
    }, {
      key: "afterTickToLabelConversion",
      value: function afterTickToLabelConversion() {
        Q(this.options.afterTickToLabelConversion, [this]);
      }
    }, {
      key: "beforeCalculateLabelRotation",
      value: function beforeCalculateLabelRotation() {
        Q(this.options.beforeCalculateLabelRotation, [this]);
      }
    }, {
      key: "calculateLabelRotation",
      value: function calculateLabelRotation() {
        var t = this,
            e = t.options,
            i = e.ticks,
            n = t.ticks.length,
            o = i.minRotation || 0,
            s = i.maxRotation;
        var a,
            r,
            l,
            c = o;
        if (!t._isVisible() || !i.display || o >= s || n <= 1 || !t.isHorizontal()) return void (t.labelRotation = o);

        var h = t._getLabelSizes(),
            d = h.widest.width,
            u = h.highest.height,
            f = Ht(t.chart.width - d, 0, t.maxWidth);

        a = e.offset ? t.maxWidth / n : f / (n - 1), d + 6 > a && (a = f / (n - (e.offset ? .5 : 1)), r = t.maxHeight - Wi(e.grid) - i.padding - Hi(e.title, t.chart.options.font), l = Math.sqrt(d * d + u * u), c = Et(Math.min(Math.asin(Math.min((h.highest.height + 6) / a, 1)), Math.asin(Math.min(r / l, 1)) - Math.asin(u / l))), c = Math.max(o, Math.min(s, c))), t.labelRotation = c;
      }
    }, {
      key: "afterCalculateLabelRotation",
      value: function afterCalculateLabelRotation() {
        Q(this.options.afterCalculateLabelRotation, [this]);
      }
    }, {
      key: "beforeFit",
      value: function beforeFit() {
        Q(this.options.beforeFit, [this]);
      }
    }, {
      key: "fit",
      value: function fit() {
        var t = this,
            e = {
          width: 0,
          height: 0
        },
            i = t.chart,
            _t$options = t.options,
            n = _t$options.ticks,
            o = _t$options.title,
            s = _t$options.grid,
            a = t._isVisible(),
            r = t.isHorizontal();

        if (a) {
          var _a10 = Hi(o, i.options.font);

          if (r ? (e.width = t.maxWidth, e.height = Wi(s) + _a10) : (e.height = t.maxHeight, e.width = Wi(s) + _a10), n.display && t.ticks.length) {
            var _t$_getLabelSizes = t._getLabelSizes(),
                _i10 = _t$_getLabelSizes.first,
                _o11 = _t$_getLabelSizes.last,
                _s11 = _t$_getLabelSizes.widest,
                _a11 = _t$_getLabelSizes.highest,
                _l7 = 2 * n.padding,
                _c5 = Rt(t.labelRotation),
                _h4 = Math.cos(_c5),
                _d2 = Math.sin(_c5);

            if (r) {
              var _i11 = _d2 * _s11.width + _h4 * _a11.height;

              e.height = Math.min(t.maxHeight, e.height + _i11 + _l7);
            } else {
              var _i12 = n.mirror ? 0 : _h4 * _s11.width + _d2 * _a11.height;

              e.width = Math.min(t.maxWidth, e.width + _i12 + _l7);
            }

            t._calculatePadding(_i10, _o11, _d2, _h4);
          }
        }

        t._handleMargins(), r ? (t.width = t._length = i.width - t._margins.left - t._margins.right, t.height = e.height) : (t.width = e.width, t.height = t._length = i.height - t._margins.top - t._margins.bottom);
      }
    }, {
      key: "_calculatePadding",
      value: function _calculatePadding(t, e, i, n) {
        var o = this,
            _o$options = o.options,
            _o$options$ticks = _o$options.ticks,
            s = _o$options$ticks.align,
            a = _o$options$ticks.padding,
            r = _o$options.position,
            l = 0 !== o.labelRotation,
            c = "top" !== r && "x" === o.axis;

        if (o.isHorizontal()) {
          var _r5 = o.getPixelForTick(0) - o.left,
              _h5 = o.right - o.getPixelForTick(o.ticks.length - 1);

          var _d3 = 0,
              _u = 0;
          l ? c ? (_d3 = n * t.width, _u = i * e.height) : (_d3 = i * t.height, _u = n * e.width) : "start" === s ? _u = e.width : "end" === s ? _d3 = t.width : (_d3 = t.width / 2, _u = e.width / 2), o.paddingLeft = Math.max((_d3 - _r5 + a) * o.width / (o.width - _r5), 0), o.paddingRight = Math.max((_u - _h5 + a) * o.width / (o.width - _h5), 0);
        } else {
          var _i13 = e.height / 2,
              _n16 = t.height / 2;

          "start" === s ? (_i13 = 0, _n16 = t.height) : "end" === s && (_i13 = e.height, _n16 = 0), o.paddingTop = _i13 + a, o.paddingBottom = _n16 + a;
        }
      }
    }, {
      key: "_handleMargins",
      value: function _handleMargins() {
        var t = this;
        t._margins && (t._margins.left = Math.max(t.paddingLeft, t._margins.left), t._margins.top = Math.max(t.paddingTop, t._margins.top), t._margins.right = Math.max(t.paddingRight, t._margins.right), t._margins.bottom = Math.max(t.paddingBottom, t._margins.bottom));
      }
    }, {
      key: "afterFit",
      value: function afterFit() {
        Q(this.options.afterFit, [this]);
      }
    }, {
      key: "isHorizontal",
      value: function isHorizontal() {
        var _this$options = this.options,
            t = _this$options.axis,
            e = _this$options.position;
        return "top" === e || "bottom" === e || "x" === t;
      }
    }, {
      key: "isFullSize",
      value: function isFullSize() {
        return this.options.fullSize;
      }
    }, {
      key: "_convertTicksToLabels",
      value: function _convertTicksToLabels(t) {
        var e = this;
        e.beforeTickToLabelConversion(), e.generateTickLabels(t), e.afterTickToLabelConversion();
      }
    }, {
      key: "_getLabelSizes",
      value: function _getLabelSizes() {
        var t = this;
        var e = t._labelSizes;

        if (!e) {
          var _i14 = t.options.ticks.sampleSize;
          var _n17 = t.ticks;
          _i14 < _n17.length && (_n17 = Vi(_n17, _i14)), t._labelSizes = e = t._computeLabelSizes(_n17, _n17.length);
        }

        return e;
      }
    }, {
      key: "_computeLabelSizes",
      value: function _computeLabelSizes(t, e) {
        var i = this.ctx,
            n = this._longestTextCache,
            o = [],
            s = [];
        var a,
            r,
            l,
            c,
            h,
            d,
            u,
            f,
            g,
            p,
            m,
            x = 0,
            b = 0;

        for (a = 0; a < e; ++a) {
          if (c = t[a].label, h = this._resolveTickFontOptions(a), i.font = d = h.string, u = n[d] = n[d] || {
            data: {},
            gc: []
          }, f = h.lineHeight, g = p = 0, $(c) || Y(c)) {
            if (Y(c)) for (r = 0, l = c.length; r < l; ++r) {
              m = c[r], $(m) || Y(m) || (g = $t(i, u.data, u.gc, g, m), p += f);
            }
          } else g = $t(i, u.data, u.gc, g, c), p = f;

          o.push(g), s.push(p), x = Math.max(g, x), b = Math.max(p, b);
        }

        !function (t, e) {
          J(t, function (t) {
            var i = t.gc,
                n = i.length / 2;
            var o;

            if (n > e) {
              for (o = 0; o < n; ++o) {
                delete t.data[i[o]];
              }

              i.splice(0, n);
            }
          });
        }(n, e);

        var _ = o.indexOf(x),
            y = s.indexOf(b),
            v = function v(t) {
          return {
            width: o[t] || 0,
            height: s[t] || 0
          };
        };

        return {
          first: v(0),
          last: v(e - 1),
          widest: v(_),
          highest: v(y)
        };
      }
    }, {
      key: "getLabelForValue",
      value: function getLabelForValue(t) {
        return t;
      }
    }, {
      key: "getPixelForValue",
      value: function getPixelForValue(t, e) {
        return NaN;
      }
    }, {
      key: "getValueForPixel",
      value: function getValueForPixel(t) {}
    }, {
      key: "getPixelForTick",
      value: function getPixelForTick(t) {
        var e = this.ticks;
        return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
      }
    }, {
      key: "getPixelForDecimal",
      value: function getPixelForDecimal(t) {
        var e = this;
        e._reversePixels && (t = 1 - t);
        var i = e._startPixel + t * e._length;
        return Nt(e._alignToPixels ? Ut(e.chart, i, 0) : i);
      }
    }, {
      key: "getDecimalForPixel",
      value: function getDecimalForPixel(t) {
        var e = (t - this._startPixel) / this._length;
        return this._reversePixels ? 1 - e : e;
      }
    }, {
      key: "getBasePixel",
      value: function getBasePixel() {
        return this.getPixelForValue(this.getBaseValue());
      }
    }, {
      key: "getBaseValue",
      value: function getBaseValue() {
        var t = this.min,
            e = this.max;
        return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
      }
    }, {
      key: "getContext",
      value: function getContext(t) {
        var e = this,
            i = e.ticks || [];

        if (t >= 0 && t < i.length) {
          var _n18 = i[t];
          return _n18.$context || (_n18.$context = function (t, e, i) {
            return Object.assign(Object.create(t), {
              tick: i,
              index: e,
              type: "tick"
            });
          }(e.getContext(), t, _n18));
        }

        return e.$context || (e.$context = (n = e.chart.getContext(), o = e, Object.assign(Object.create(n), {
          scale: o,
          type: "scale"
        })));
        var n, o;
      }
    }, {
      key: "_tickSize",
      value: function _tickSize() {
        var t = this,
            e = t.options.ticks,
            i = Rt(t.labelRotation),
            n = Math.abs(Math.cos(i)),
            o = Math.abs(Math.sin(i)),
            s = t._getLabelSizes(),
            a = e.autoSkipPadding || 0,
            r = s ? s.widest.width + a : 0,
            l = s ? s.highest.height + a : 0;

        return t.isHorizontal() ? l * n > r * o ? r / n : l / o : l * o < r * n ? l / n : r / o;
      }
    }, {
      key: "_isVisible",
      value: function _isVisible() {
        var t = this.options.display;
        return "auto" !== t ? !!t : this.getMatchingVisibleMetas().length > 0;
      }
    }, {
      key: "_computeGridLineItems",
      value: function _computeGridLineItems(t) {
        var e = this,
            i = e.axis,
            n = e.chart,
            o = e.options,
            s = o.grid,
            a = o.position,
            r = s.offset,
            l = e.isHorizontal(),
            c = e.ticks.length + (r ? 1 : 0),
            h = Wi(s),
            d = [],
            u = s.setContext(e.getContext(0)),
            f = u.drawBorder ? u.borderWidth : 0,
            g = f / 2,
            p = function p(t) {
          return Ut(n, t, f);
        };

        var m, x, b, _, y, v, M, w, k, S, P, D;

        if ("top" === a) m = p(e.bottom), v = e.bottom - h, w = m - g, S = p(t.top) + g, D = t.bottom;else if ("bottom" === a) m = p(e.top), S = t.top, D = p(t.bottom) - g, v = m + g, w = e.top + h;else if ("left" === a) m = p(e.right), y = e.right - h, M = m - g, k = p(t.left) + g, P = t.right;else if ("right" === a) m = p(e.left), k = t.left, P = p(t.right) - g, y = m + g, M = e.left + h;else if ("x" === i) {
          if ("center" === a) m = p((t.top + t.bottom) / 2 + .5);else if (U(a)) {
            var _t19 = Object.keys(a)[0],
                _i15 = a[_t19];
            m = p(e.chart.scales[_t19].getPixelForValue(_i15));
          }
          S = t.top, D = t.bottom, v = m + g, w = v + h;
        } else if ("y" === i) {
          if ("center" === a) m = p((t.left + t.right) / 2);else if (U(a)) {
            var _t20 = Object.keys(a)[0],
                _i16 = a[_t20];
            m = p(e.chart.scales[_t20].getPixelForValue(_i16));
          }
          y = m - g, M = y - h, k = t.left, P = t.right;
        }

        for (x = 0; x < c; ++x) {
          var _t21 = s.setContext(e.getContext(x)),
              _i17 = _t21.lineWidth,
              _o12 = _t21.color,
              _a12 = s.borderDash || [],
              _c6 = _t21.borderDashOffset,
              _h6 = _t21.tickWidth,
              _u2 = _t21.tickColor,
              _f = _t21.tickBorderDash || [],
              _g = _t21.tickBorderDashOffset;

          b = Bi(e, x, r), void 0 !== b && (_ = Ut(n, b, _i17), l ? y = M = k = P = _ : v = w = S = D = _, d.push({
            tx1: y,
            ty1: v,
            tx2: M,
            ty2: w,
            x1: k,
            y1: S,
            x2: P,
            y2: D,
            width: _i17,
            color: _o12,
            borderDash: _a12,
            borderDashOffset: _c6,
            tickWidth: _h6,
            tickColor: _u2,
            tickBorderDash: _f,
            tickBorderDashOffset: _g
          }));
        }

        return e._ticksLength = c, e._borderValue = m, d;
      }
    }, {
      key: "_computeLabelItems",
      value: function _computeLabelItems(t) {
        var e = this,
            i = e.axis,
            n = e.options,
            o = n.position,
            s = n.ticks,
            a = e.isHorizontal(),
            r = e.ticks,
            l = s.align,
            c = s.crossAlign,
            h = s.padding,
            d = Wi(n.grid),
            u = d + h,
            f = -Rt(e.labelRotation),
            g = [];

        var p,
            m,
            x,
            b,
            _,
            y,
            v,
            M,
            w,
            k,
            S,
            P,
            D = "middle";

        if ("top" === o) y = e.bottom - u, v = e._getXAxisLabelAlignment();else if ("bottom" === o) y = e.top + u, v = e._getXAxisLabelAlignment();else if ("left" === o) {
          var _t22 = this._getYAxisLabelAlignment(d);

          v = _t22.textAlign, _ = _t22.x;
        } else if ("right" === o) {
          var _t23 = this._getYAxisLabelAlignment(d);

          v = _t23.textAlign, _ = _t23.x;
        } else if ("x" === i) {
          if ("center" === o) y = (t.top + t.bottom) / 2 + u;else if (U(o)) {
            var _t24 = Object.keys(o)[0],
                _i18 = o[_t24];
            y = e.chart.scales[_t24].getPixelForValue(_i18) + u;
          }
          v = e._getXAxisLabelAlignment();
        } else if ("y" === i) {
          if ("center" === o) _ = (t.left + t.right) / 2 - u;else if (U(o)) {
            var _t25 = Object.keys(o)[0],
                _i19 = o[_t25];
            _ = e.chart.scales[_t25].getPixelForValue(_i19);
          }
          v = this._getYAxisLabelAlignment(d).textAlign;
        }
        "y" === i && ("start" === l ? D = "top" : "end" === l && (D = "bottom"));

        var C = e._getLabelSizes();

        for (p = 0, m = r.length; p < m; ++p) {
          x = r[p], b = x.label;

          var _t26 = s.setContext(e.getContext(p));

          M = e.getPixelForTick(p) + s.labelOffset, w = e._resolveTickFontOptions(p), k = w.lineHeight, S = Y(b) ? b.length : 1;

          var _i20 = S / 2,
              _n19 = _t26.color,
              _l8 = _t26.textStrokeColor,
              _h7 = _t26.textStrokeWidth;

          a ? (_ = M, P = "top" === o ? "near" === c || 0 !== f ? -S * k + k / 2 : "center" === c ? -C.highest.height / 2 - _i20 * k + k : -C.highest.height + k / 2 : "near" === c || 0 !== f ? k / 2 : "center" === c ? C.highest.height / 2 - _i20 * k : C.highest.height - S * k) : (y = M, P = (1 - S) * k / 2), g.push({
            rotation: f,
            label: b,
            font: w,
            color: _n19,
            strokeColor: _l8,
            strokeWidth: _h7,
            textOffset: P,
            textAlign: v,
            textBaseline: D,
            translation: [_, y]
          });
        }

        return g;
      }
    }, {
      key: "_getXAxisLabelAlignment",
      value: function _getXAxisLabelAlignment() {
        var _this$options2 = this.options,
            t = _this$options2.position,
            e = _this$options2.ticks;
        if (-Rt(this.labelRotation)) return "top" === t ? "left" : "right";
        var i = "center";
        return "start" === e.align ? i = "left" : "end" === e.align && (i = "right"), i;
      }
    }, {
      key: "_getYAxisLabelAlignment",
      value: function _getYAxisLabelAlignment(t) {
        var e = this,
            _e$options = e.options,
            i = _e$options.position,
            _e$options$ticks = _e$options.ticks,
            n = _e$options$ticks.crossAlign,
            o = _e$options$ticks.mirror,
            s = _e$options$ticks.padding,
            a = t + s,
            r = e._getLabelSizes().widest.width;

        var l, c;
        return "left" === i ? o ? (l = "left", c = e.right - s) : (c = e.right - a, "near" === n ? l = "right" : "center" === n ? (l = "center", c -= r / 2) : (l = "left", c = e.left)) : "right" === i ? o ? (l = "right", c = e.left + s) : (c = e.left + a, "near" === n ? l = "left" : "center" === n ? (l = "center", c += r / 2) : (l = "right", c = e.right)) : l = "right", {
          textAlign: l,
          x: c
        };
      }
    }, {
      key: "_computeLabelArea",
      value: function _computeLabelArea() {
        var t = this;
        if (t.options.ticks.mirror) return;
        var e = t.chart,
            i = t.options.position;
        return "left" === i || "right" === i ? {
          top: 0,
          left: t.left,
          bottom: e.height,
          right: t.right
        } : "top" === i || "bottom" === i ? {
          top: t.top,
          left: 0,
          bottom: t.bottom,
          right: e.width
        } : void 0;
      }
    }, {
      key: "drawBackground",
      value: function drawBackground() {
        var t = this.ctx,
            e = this.options.backgroundColor,
            i = this.left,
            n = this.top,
            o = this.width,
            s = this.height;
        e && (t.save(), t.fillStyle = e, t.fillRect(i, n, o, s), t.restore());
      }
    }, {
      key: "getLineWidthForValue",
      value: function getLineWidthForValue(t) {
        var e = this,
            i = e.options.grid;
        if (!e._isVisible() || !i.display) return 0;
        var n = e.ticks.findIndex(function (e) {
          return e.value === t;
        });

        if (n >= 0) {
          return i.setContext(e.getContext(n)).lineWidth;
        }

        return 0;
      }
    }, {
      key: "drawGrid",
      value: function drawGrid(t) {
        var e = this,
            i = e.options.grid,
            n = e.ctx,
            o = e.chart,
            s = i.setContext(e.getContext(0)),
            a = i.drawBorder ? s.borderWidth : 0,
            r = e._gridLineItems || (e._gridLineItems = e._computeGridLineItems(t));

        var l, c;

        var h = function h(t, e, i) {
          i.width && i.color && (n.save(), n.lineWidth = i.width, n.strokeStyle = i.color, n.setLineDash(i.borderDash || []), n.lineDashOffset = i.borderDashOffset, n.beginPath(), n.moveTo(t.x, t.y), n.lineTo(e.x, e.y), n.stroke(), n.restore());
        };

        if (i.display) for (l = 0, c = r.length; l < c; ++l) {
          var _t27 = r[l];
          i.drawOnChartArea && h({
            x: _t27.x1,
            y: _t27.y1
          }, {
            x: _t27.x2,
            y: _t27.y2
          }, _t27), i.drawTicks && h({
            x: _t27.tx1,
            y: _t27.ty1
          }, {
            x: _t27.tx2,
            y: _t27.ty2
          }, {
            color: _t27.tickColor,
            width: _t27.tickWidth,
            borderDash: _t27.tickBorderDash,
            borderDashOffset: _t27.tickBorderDashOffset
          });
        }

        if (a) {
          var _t28 = i.setContext(e.getContext(e._ticksLength - 1)),
              _n20 = _t28.lineWidth,
              _s12 = e._borderValue;

          var _r6, _l9, _c7, _d4;

          e.isHorizontal() ? (_r6 = Ut(o, e.left, a) - a / 2, _l9 = Ut(o, e.right, _n20) + _n20 / 2, _c7 = _d4 = _s12) : (_c7 = Ut(o, e.top, a) - a / 2, _d4 = Ut(o, e.bottom, _n20) + _n20 / 2, _r6 = _l9 = _s12), h({
            x: _r6,
            y: _c7
          }, {
            x: _l9,
            y: _d4
          }, {
            width: a,
            color: _t28.borderColor
          });
        }
      }
    }, {
      key: "drawLabels",
      value: function drawLabels(t) {
        var e = this;
        if (!e.options.ticks.display) return;

        var i = e.ctx,
            n = e._computeLabelArea();

        n && Gt(i, n);

        var o = e._labelItems || (e._labelItems = e._computeLabelItems(t));

        var s, a;

        for (s = 0, a = o.length; s < a; ++s) {
          var _t29 = o[s],
              _e18 = _t29.font;
          te(i, _t29.label, 0, _t29.textOffset, _e18, _t29);
        }

        n && Zt(i);
      }
    }, {
      key: "drawTitle",
      value: function drawTitle() {
        var t = this.ctx,
            _this$options3 = this.options,
            e = _this$options3.position,
            i = _this$options3.title,
            n = _this$options3.reverse;
        if (!i.display) return;
        var s = Ee(i.font),
            a = Re(i.padding),
            r = i.align;
        var l = s.lineHeight / 2;
        "bottom" === e ? (l += a.bottom, Y(i.text) && (l += s.lineHeight * (i.text.length - 1))) : l += a.top;

        var _ref3 = function (t, e, i, n) {
          var s = t.top,
              a = t.left,
              r = t.bottom,
              l = t.right;
          var c,
              h,
              d,
              u = 0;
          return t.isHorizontal() ? (h = o(n, a, l), d = zi(t, i, e), c = l - a) : (h = zi(t, i, e), d = o(n, r, s), u = "left" === i ? -Mt : Mt), {
            titleX: h,
            titleY: d,
            maxWidth: c,
            rotation: u
          };
        }(this, l, e, r),
            c = _ref3.titleX,
            h = _ref3.titleY,
            d = _ref3.maxWidth,
            u = _ref3.rotation;

        te(t, i.text, 0, 0, s, {
          color: i.color,
          maxWidth: d,
          rotation: u,
          textAlign: Ni(r, e, n),
          textBaseline: "middle",
          translation: [c, h]
        });
      }
    }, {
      key: "draw",
      value: function draw(t) {
        var e = this;
        e._isVisible() && (e.drawBackground(), e.drawGrid(t), e.drawTitle(), e.drawLabels(t));
      }
    }, {
      key: "_layers",
      value: function _layers() {
        var t = this,
            e = t.options,
            i = e.ticks && e.ticks.z || 0,
            n = e.grid && e.grid.z || 0;
        return t._isVisible() && i !== n && t.draw === ji.prototype.draw ? [{
          z: n,
          draw: function draw(e) {
            t.drawBackground(), t.drawGrid(e), t.drawTitle();
          }
        }, {
          z: i,
          draw: function draw(e) {
            t.drawLabels(e);
          }
        }] : [{
          z: i,
          draw: function draw(e) {
            t.draw(e);
          }
        }];
      }
    }, {
      key: "getMatchingVisibleMetas",
      value: function getMatchingVisibleMetas(t) {
        var e = this,
            i = e.chart.getSortedVisibleDatasetMetas(),
            n = e.axis + "AxisID",
            o = [];
        var s, a;

        for (s = 0, a = i.length; s < a; ++s) {
          var _a13 = i[s];
          _a13[n] !== e.id || t && _a13.type !== t || o.push(_a13);
        }

        return o;
      }
    }, {
      key: "_resolveTickFontOptions",
      value: function _resolveTickFontOptions(t) {
        return Ee(this.options.ticks.setContext(this.getContext(t)).font);
      }
    }]);

    return ji;
  }(Oi);

  function $i(t) {
    var _o13;

    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [""];
    var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : t;
    var n = arguments.length > 3 ? arguments[3] : undefined;
    ht(n) || (n = en("_fallback", t));
    var o = (_o13 = {}, _defineProperty(_o13, Symbol.toStringTag, "Object"), _defineProperty(_o13, "_cacheable", !0), _defineProperty(_o13, "_scopes", t), _defineProperty(_o13, "_rootScopes", i), _defineProperty(_o13, "_fallback", n), _defineProperty(_o13, "override", function override(o) {
      return $i([o].concat(_toConsumableArray(t)), e, i, n);
    }), _o13);
    return new Proxy(o, {
      deleteProperty: function deleteProperty(e, i) {
        return delete e[i], delete e._keys, delete t[0][i], !0;
      },
      get: function get(i, n) {
        return Ki(i, n, function () {
          return function (t, e, i, n) {
            var o;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = e[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var _s13 = _step4.value;
                if (o = en(Xi(_s13, t), i), ht(o)) return qi(t, o) ? Ji(i, n, t, o) : o;
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                  _iterator4["return"]();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          }(n, e, t, i);
        });
      },
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(t, e) {
        return Reflect.getOwnPropertyDescriptor(t._scopes[0], e);
      },
      getPrototypeOf: function getPrototypeOf() {
        return Reflect.getPrototypeOf(t[0]);
      },
      has: function has(t, e) {
        return nn(t).includes(e);
      },
      ownKeys: function ownKeys(t) {
        return nn(t);
      },
      set: function set(e, i, n) {
        return t[0][i] = n, delete e[i], delete e._keys, !0;
      }
    });
  }

  function Yi(t, e, i, n) {
    var o = {
      _cacheable: !1,
      _proxy: t,
      _context: e,
      _subProxy: i,
      _stack: new Set(),
      _descriptors: Ui(t, n),
      setContext: function setContext(e) {
        return Yi(t, e, i, n);
      },
      override: function override(o) {
        return Yi(t.override(o), e, i, n);
      }
    };
    return new Proxy(o, {
      deleteProperty: function deleteProperty(e, i) {
        return delete e[i], delete t[i], !0;
      },
      get: function get(t, e, i) {
        return Ki(t, e, function () {
          return function (t, e, i) {
            var n = t._proxy,
                o = t._context,
                s = t._subProxy,
                a = t._descriptors;
            var r = n[e];
            dt(r) && a.isScriptable(e) && (r = function (t, e, i, n) {
              var o = i._proxy,
                  s = i._context,
                  a = i._subProxy,
                  r = i._stack;
              if (r.has(t)) throw new Error("Recursion detected: " + _toConsumableArray(r).join("->") + "->" + t);
              r.add(t), e = e(s, a || n), r["delete"](t), U(e) && (e = Ji(o._scopes, o, t, e));
              return e;
            }(e, r, t, i));
            Y(r) && r.length && (r = function (t, e, i, n) {
              var o = i._proxy,
                  s = i._context,
                  a = i._subProxy,
                  r = i._descriptors;
              if (ht(s.index) && n(t)) e = e[s.index % e.length];else if (U(e[0])) {
                var _i21 = e,
                    _n21 = o._scopes.filter(function (t) {
                  return t !== _i21;
                });

                e = [];
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                  for (var _iterator5 = _i21[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var _l10 = _step5.value;

                    var _i22 = Ji(_n21, o, t, _l10);

                    e.push(Yi(_i22, s, a && a[t], r));
                  }
                } catch (err) {
                  _didIteratorError5 = true;
                  _iteratorError5 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                      _iterator5["return"]();
                    }
                  } finally {
                    if (_didIteratorError5) {
                      throw _iteratorError5;
                    }
                  }
                }
              }
              return e;
            }(e, r, t, a.isIndexable));
            qi(e, r) && (r = Yi(r, o, s && s[e], a));
            return r;
          }(t, e, i);
        });
      },
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(e, i) {
        return e._descriptors.allKeys ? Reflect.has(t, i) ? {
          enumerable: !0,
          configurable: !0
        } : void 0 : Reflect.getOwnPropertyDescriptor(t, i);
      },
      getPrototypeOf: function getPrototypeOf() {
        return Reflect.getPrototypeOf(t);
      },
      has: function has(e, i) {
        return Reflect.has(t, i);
      },
      ownKeys: function ownKeys() {
        return Reflect.ownKeys(t);
      },
      set: function set(e, i, n) {
        return t[i] = n, delete e[i], !0;
      }
    });
  }

  function Ui(t) {
    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      scriptable: !0,
      indexable: !0
    };
    var _t$_scriptable = t._scriptable,
        i = _t$_scriptable === void 0 ? e.scriptable : _t$_scriptable,
        _t$_indexable = t._indexable,
        n = _t$_indexable === void 0 ? e.indexable : _t$_indexable,
        _t$_allKeys = t._allKeys,
        o = _t$_allKeys === void 0 ? e.allKeys : _t$_allKeys;
    return {
      allKeys: o,
      scriptable: i,
      indexable: n,
      isScriptable: dt(i) ? i : function () {
        return i;
      },
      isIndexable: dt(n) ? n : function () {
        return n;
      }
    };
  }

  var Xi = function Xi(t, e) {
    return t ? t + ct(e) : e;
  },
      qi = function qi(t, e) {
    return U(e) && "adapters" !== t;
  };

  function Ki(t, e, i) {
    var n = t[e];
    return ht(n) || (n = i(), ht(n) && (t[e] = n)), n;
  }

  function Gi(t, e, i) {
    return dt(t) ? t(e, i) : t;
  }

  var Zi = function Zi(t, e) {
    return !0 === t ? e : "string" == typeof t ? lt(e, t) : void 0;
  };

  function Qi(t, e, i, n) {
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = e[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var _o14 = _step6.value;

        var _e19 = Zi(i, _o14);

        if (_e19) {
          t.add(_e19);

          var _o15 = Gi(_e19._fallback, i, _e19);

          if (ht(_o15) && _o15 !== i && _o15 !== n) return _o15;
        } else if (!1 === _e19 && ht(n) && i !== n) return null;
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
          _iterator6["return"]();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }

    return !1;
  }

  function Ji(t, e, i, n) {
    var o = e._rootScopes,
        s = Gi(e._fallback, i, n),
        a = [].concat(_toConsumableArray(t), _toConsumableArray(o)),
        r = new Set(),
        l = t[0];
    U(l) && !(i in l) && r.add(l[i] = {}), r.add(n);
    var c = tn(r, a, i, s || i);
    return null !== c && (!ht(s) || s === i || (c = tn(r, a, s, c), null !== c)) && $i(_toConsumableArray(r), [""], o, s);
  }

  function tn(t, e, i, n) {
    for (; i;) {
      i = Qi(t, e, i, n);
    }

    return i;
  }

  function en(t, e) {
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = e[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var _i23 = _step7.value;
        if (!_i23) continue;
        var _e20 = _i23[t];
        if (ht(_e20)) return _e20;
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
          _iterator7["return"]();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }
  }

  function nn(t) {
    var e = t._keys;
    return e || (e = t._keys = function (t) {
      var e = new Set();
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = t[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var _i24 = _step8.value;
          var _iteratorNormalCompletion9 = true;
          var _didIteratorError9 = false;
          var _iteratorError9 = undefined;

          try {
            for (var _iterator9 = Object.keys(_i24).filter(function (t) {
              return !t.startsWith("_");
            })[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
              var _t30 = _step9.value;
              e.add(_t30);
            }
          } catch (err) {
            _didIteratorError9 = true;
            _iteratorError9 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
                _iterator9["return"]();
              }
            } finally {
              if (_didIteratorError9) {
                throw _iteratorError9;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
            _iterator8["return"]();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      return _toConsumableArray(e);
    }(t._scopes)), e;
  }

  var on = Number.EPSILON || 1e-14,
      sn = function sn(t, e) {
    return e < t.length && !t[e].skip && t[e];
  };

  function an(t, e, i, n) {
    var o = t.skip ? e : t,
        s = e,
        a = i.skip ? e : i,
        r = zt(s, o),
        l = zt(a, s);
    var c = r / (r + l),
        h = l / (r + l);
    c = isNaN(c) ? 0 : c, h = isNaN(h) ? 0 : h;
    var d = n * c,
        u = n * h;
    return {
      previous: {
        x: s.x - d * (a.x - o.x),
        y: s.y - d * (a.y - o.y)
      },
      next: {
        x: s.x + u * (a.x - o.x),
        y: s.y + u * (a.y - o.y)
      }
    };
  }

  function rn(t) {
    var e = t.length,
        i = Array(e).fill(0),
        n = Array(e);
    var o,
        s,
        a,
        r = sn(t, 0);

    for (o = 0; o < e; ++o) {
      if (s = a, a = r, r = sn(t, o + 1), a) {
        if (r) {
          var _t31 = r.x - a.x;

          i[o] = 0 !== _t31 ? (r.y - a.y) / _t31 : 0;
        }

        n[o] = s ? r ? Pt(i[o - 1]) !== Pt(i[o]) ? 0 : (i[o - 1] + i[o]) / 2 : i[o - 1] : i[o];
      }
    }

    !function (t, e, i) {
      var n = t.length;
      var o,
          s,
          a,
          r,
          l,
          c = sn(t, 0);

      for (var _h8 = 0; _h8 < n - 1; ++_h8) {
        l = c, c = sn(t, _h8 + 1), l && c && (Ot(e[_h8], 0, on) ? i[_h8] = i[_h8 + 1] = 0 : (o = i[_h8] / e[_h8], s = i[_h8 + 1] / e[_h8], r = Math.pow(o, 2) + Math.pow(s, 2), r <= 9 || (a = 3 / Math.sqrt(r), i[_h8] = o * a * e[_h8], i[_h8 + 1] = s * a * e[_h8])));
      }
    }(t, i, n), function (t, e) {
      var i = t.length;
      var n,
          o,
          s,
          a = sn(t, 0);

      for (var _r7 = 0; _r7 < i; ++_r7) {
        if (o = s, s = a, a = sn(t, _r7 + 1), !s) continue;
        var _s14 = s,
            _i25 = _s14.x,
            _l11 = _s14.y;
        o && (n = (_i25 - o.x) / 3, s.cp1x = _i25 - n, s.cp1y = _l11 - n * e[_r7]), a && (n = (a.x - _i25) / 3, s.cp2x = _i25 + n, s.cp2y = _l11 + n * e[_r7]);
      }
    }(t, n);
  }

  function ln(t, e, i) {
    return Math.max(Math.min(t, i), e);
  }

  function cn(t, e, i, n) {
    var o, s, a, r;
    if (e.spanGaps && (t = t.filter(function (t) {
      return !t.skip;
    })), "monotone" === e.cubicInterpolationMode) rn(t);else {
      var _i26 = n ? t[t.length - 1] : t[0];

      for (o = 0, s = t.length; o < s; ++o) {
        a = t[o], r = an(_i26, a, t[Math.min(o + 1, s - (n ? 0 : 1)) % s], e.tension), a.cp1x = r.previous.x, a.cp1y = r.previous.y, a.cp2x = r.next.x, a.cp2y = r.next.y, _i26 = a;
      }
    }
    e.capBezierPoints && function (t, e) {
      var i,
          n,
          o,
          s,
          a,
          r = Kt(t[0], e);

      for (i = 0, n = t.length; i < n; ++i) {
        a = s, s = r, r = i < n - 1 && Kt(t[i + 1], e), s && (o = t[i], a && (o.cp1x = ln(o.cp1x, e.left, e.right), o.cp1y = ln(o.cp1y, e.top, e.bottom)), r && (o.cp2x = ln(o.cp2x, e.left, e.right), o.cp2y = ln(o.cp2y, e.top, e.bottom)));
      }
    }(t, i);
  }

  function hn(t, e, i, n) {
    return {
      x: t.x + i * (e.x - t.x),
      y: t.y + i * (e.y - t.y)
    };
  }

  function dn(t, e, i, n) {
    return {
      x: t.x + i * (e.x - t.x),
      y: "middle" === n ? i < .5 ? t.y : e.y : "after" === n ? i < 1 ? t.y : e.y : i > 0 ? e.y : t.y
    };
  }

  function un(t, e, i, n) {
    var o = {
      x: t.cp2x,
      y: t.cp2y
    },
        s = {
      x: e.cp1x,
      y: e.cp1y
    },
        a = hn(t, o, i),
        r = hn(o, s, i),
        l = hn(s, e, i),
        c = hn(a, r, i),
        h = hn(r, l, i);
    return hn(c, h, i);
  }

  function fn(t, e, i) {
    return t ? function (t, e) {
      return {
        x: function x(i) {
          return t + t + e - i;
        },
        setWidth: function setWidth(t) {
          e = t;
        },
        textAlign: function textAlign(t) {
          return "center" === t ? t : "right" === t ? "left" : "right";
        },
        xPlus: function xPlus(t, e) {
          return t - e;
        },
        leftForLtr: function leftForLtr(t, e) {
          return t - e;
        }
      };
    }(e, i) : {
      x: function x(t) {
        return t;
      },
      setWidth: function setWidth(t) {},
      textAlign: function textAlign(t) {
        return t;
      },
      xPlus: function xPlus(t, e) {
        return t + e;
      },
      leftForLtr: function leftForLtr(t, e) {
        return t;
      }
    };
  }

  function gn(t, e) {
    var i, n;
    "ltr" !== e && "rtl" !== e || (i = t.canvas.style, n = [i.getPropertyValue("direction"), i.getPropertyPriority("direction")], i.setProperty("direction", e, "important"), t.prevTextDirection = n);
  }

  function pn(t, e) {
    void 0 !== e && (delete t.prevTextDirection, t.canvas.style.setProperty("direction", e[0], e[1]));
  }

  function mn(t) {
    return "angle" === t ? {
      between: Wt,
      compare: Vt,
      normalize: Bt
    } : {
      between: function between(t, e, i) {
        return t >= e && t <= i;
      },
      compare: function compare(t, e) {
        return t - e;
      },
      normalize: function normalize(t) {
        return t;
      }
    };
  }

  function xn(t, e, i, n) {
    return {
      start: t % n,
      end: e % n,
      loop: i && (e - t + 1) % n == 0
    };
  }

  function bn(t, e, i) {
    if (!i) return [t];

    var n = i.property,
        o = i.start,
        s = i.end,
        a = e.length,
        _mn = mn(n),
        r = _mn.compare,
        l = _mn.between,
        c = _mn.normalize,
        _ref4 = function (t, e, i) {
      var n = i.property,
          o = i.start,
          s = i.end,
          _mn2 = mn(n),
          a = _mn2.between,
          r = _mn2.normalize,
          l = e.length;

      var c,
          h,
          d = t.start,
          u = t.end,
          f = t.loop;

      if (f) {
        for (d += l, u += l, c = 0, h = l; c < h && a(r(e[d % l][n]), o, s); ++c) {
          d--, u--;
        }

        d %= l, u %= l;
      }

      return u < d && (u += l), {
        start: d,
        end: u,
        loop: f
      };
    }(t, e, i),
        h = _ref4.start,
        d = _ref4.end,
        u = _ref4.loop,
        f = [];

    var g,
        p,
        m,
        x = !1,
        b = null;

    var _ = function _() {
      return x || l(o, m, g) && 0 !== r(o, m);
    },
        y = function y() {
      return !x || 0 === r(s, g) || l(s, m, g);
    };

    for (var _t32 = h, _i27 = h; _t32 <= d; ++_t32) {
      p = e[_t32 % a], p.skip || (g = c(p[n]), x = l(g, o, s), null === b && _() && (b = 0 === r(g, o) ? _t32 : _i27), null !== b && y() && (f.push(xn(b, _t32, u, a)), b = null), _i27 = _t32, m = g);
    }

    return null !== b && f.push(xn(b, d, u, a)), f;
  }

  function _n(t, e) {
    var i = [],
        n = t.segments;

    for (var _o16 = 0; _o16 < n.length; _o16++) {
      var _s15 = bn(n[_o16], t.points, e);

      _s15.length && i.push.apply(i, _toConsumableArray(_s15));
    }

    return i;
  }

  function yn(t) {
    var e = t.points,
        i = t.options.spanGaps,
        n = e.length;
    if (!n) return [];

    var o = !!t._loop,
        _ref5 = function (t, e, i, n) {
      var o = 0,
          s = e - 1;
      if (i && !n) for (; o < e && !t[o].skip;) {
        o++;
      }

      for (; o < e && t[o].skip;) {
        o++;
      }

      for (o %= e, i && (s += o); s > o && t[s % e].skip;) {
        s--;
      }

      return s %= e, {
        start: o,
        end: s
      };
    }(e, n, o, i),
        s = _ref5.start,
        a = _ref5.end;

    if (!0 === i) return [{
      start: s,
      end: a,
      loop: o
    }];
    return function (t, e, i, n) {
      var o = t.length,
          s = [];
      var a,
          r = e,
          l = t[e];

      for (a = e + 1; a <= i; ++a) {
        var _i28 = t[a % o];
        _i28.skip || _i28.stop ? l.skip || (n = !1, s.push({
          start: e % o,
          end: (a - 1) % o,
          loop: n
        }), e = r = _i28.stop ? a : null) : (r = a, l.skip && (e = a)), l = _i28;
      }

      return null !== r && s.push({
        start: e % o,
        end: r % o,
        loop: n
      }), s;
    }(e, s, a < s ? a + n : a, !!t._fullLoop && 0 === s && a === n - 1);
  }

  var vn = Object.freeze({
    __proto__: null,
    easingEffects: fi,
    color: W,
    getHoverColor: H,
    noop: N,
    uid: j,
    isNullOrUndef: $,
    isArray: Y,
    isObject: U,
    isFinite: X,
    finiteOrDefault: q,
    valueOrDefault: K,
    toPercentage: G,
    toDimension: Z,
    callback: Q,
    each: J,
    _elementsEqual: tt,
    clone: et,
    _merger: nt,
    merge: ot,
    mergeIf: st,
    _mergerIf: at,
    _deprecated: function _deprecated(t, e, i, n) {
      void 0 !== e && console.warn(t + ': "' + i + '" is deprecated. Please use "' + n + '" instead');
    },
    resolveObjectKey: lt,
    _capitalize: ct,
    defined: ht,
    isFunction: dt,
    toFontString: jt,
    _measureText: $t,
    _longestText: Yt,
    _alignPixel: Ut,
    clearCanvas: Xt,
    drawPoint: qt,
    _isPointInArea: Kt,
    clipArea: Gt,
    unclipArea: Zt,
    _steppedLineTo: Qt,
    _bezierCurveTo: Jt,
    renderText: te,
    _lookup: ee,
    _lookupByKey: ie,
    _rlookupByKey: ne,
    _filterBetween: oe,
    listenArrayEvents: ae,
    unlistenArrayEvents: re,
    _arrayUnique: le,
    _createResolver: $i,
    _attachContext: Yi,
    _descriptors: Ui,
    splineCurve: an,
    splineCurveMonotone: rn,
    _updateBezierControlPoints: cn,
    _getParentNode: ce,
    getStyle: ue,
    getRelativePosition: pe,
    getMaximumSize: xe,
    retinaScale: be,
    supportsEventListenerOptions: _e,
    readUsedSize: ye,
    fontString: function fontString(t, e, i) {
      return e + " " + t + "px " + i;
    },
    requestAnimFrame: t,
    throttled: e,
    debounce: i,
    _toLeftRightCenter: n,
    _alignStartEnd: o,
    _textX: s,
    _pointInLine: hn,
    _steppedInterpolation: dn,
    _bezierInterpolation: un,
    formatNumber: Li,
    toLineHeight: Ae,
    toTRBL: Te,
    toTRBLCorners: Le,
    toPadding: Re,
    toFont: Ee,
    resolve: Ie,
    _addGrace: Fe,
    PI: xt,
    TAU: bt,
    PITAU: _t,
    INFINITY: yt,
    RAD_PER_DEG: vt,
    HALF_PI: Mt,
    QUARTER_PI: wt,
    TWO_THIRDS_PI: kt,
    log10: St,
    sign: Pt,
    niceNum: Dt,
    _factorize: Ct,
    isNumber: At,
    almostEquals: Ot,
    almostWhole: Tt,
    _setMinAndMaxByKey: Lt,
    toRadians: Rt,
    toDegrees: Et,
    _decimalPlaces: It,
    getAngleFromPoint: Ft,
    distanceBetweenPoints: zt,
    _angleDiff: Vt,
    _normalizeAngle: Bt,
    _angleBetween: Wt,
    _limitValue: Ht,
    _int16Range: Nt,
    getRtlAdapter: fn,
    overrideTextDirection: gn,
    restoreTextDirection: pn,
    _boundSegment: bn,
    _boundSegments: _n,
    _computeSegments: yn
  });

  var Mn =
  /*#__PURE__*/
  function () {
    function Mn(t, e, i) {
      _classCallCheck(this, Mn);

      this.type = t, this.scope = e, this.override = i, this.items = Object.create(null);
    }

    _createClass(Mn, [{
      key: "isForType",
      value: function isForType(t) {
        return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
      }
    }, {
      key: "register",
      value: function register(t) {
        var e = this,
            i = Object.getPrototypeOf(t);
        var n;
        (function (t) {
          return "id" in t && "defaults" in t;
        })(i) && (n = e.register(i));
        var o = e.items,
            s = t.id,
            a = e.scope + "." + s;
        if (!s) throw new Error("class does not have id: " + t);
        return s in o || (o[s] = t, function (t, e, i) {
          var n = ot(Object.create(null), [i ? mt.get(i) : {}, mt.get(e), t.defaults]);
          mt.set(e, n), t.defaultRoutes && function (t, e) {
            Object.keys(e).forEach(function (i) {
              var n = i.split("."),
                  o = n.pop(),
                  s = [t].concat(n).join("."),
                  a = e[i].split("."),
                  r = a.pop(),
                  l = a.join(".");
              mt.route(s, o, l, r);
            });
          }(e, t.defaultRoutes);
          t.descriptors && mt.describe(e, t.descriptors);
        }(t, a, n), e.override && mt.override(t.id, t.overrides)), a;
      }
    }, {
      key: "get",
      value: function get(t) {
        return this.items[t];
      }
    }, {
      key: "unregister",
      value: function unregister(t) {
        var e = this.items,
            i = t.id,
            n = this.scope;
        i in e && delete e[i], n && i in mt[n] && (delete mt[n][i], this.override && delete ut[i]);
      }
    }]);

    return Mn;
  }();

  var wn = new (
  /*#__PURE__*/
  function () {
    function _class3() {
      _classCallCheck(this, _class3);

      this.controllers = new Mn(Ai, "datasets", !0), this.elements = new Mn(Oi, "elements"), this.plugins = new Mn(Object, "plugins"), this.scales = new Mn(ji, "scales"), this._typedRegistries = [this.controllers, this.scales, this.elements];
    }

    _createClass(_class3, [{
      key: "add",
      value: function add() {
        for (var _len3 = arguments.length, t = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          t[_key3] = arguments[_key3];
        }

        this._each("register", t);
      }
    }, {
      key: "remove",
      value: function remove() {
        for (var _len4 = arguments.length, t = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          t[_key4] = arguments[_key4];
        }

        this._each("unregister", t);
      }
    }, {
      key: "addControllers",
      value: function addControllers() {
        for (var _len5 = arguments.length, t = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          t[_key5] = arguments[_key5];
        }

        this._each("register", t, this.controllers);
      }
    }, {
      key: "addElements",
      value: function addElements() {
        for (var _len6 = arguments.length, t = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          t[_key6] = arguments[_key6];
        }

        this._each("register", t, this.elements);
      }
    }, {
      key: "addPlugins",
      value: function addPlugins() {
        for (var _len7 = arguments.length, t = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          t[_key7] = arguments[_key7];
        }

        this._each("register", t, this.plugins);
      }
    }, {
      key: "addScales",
      value: function addScales() {
        for (var _len8 = arguments.length, t = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
          t[_key8] = arguments[_key8];
        }

        this._each("register", t, this.scales);
      }
    }, {
      key: "getController",
      value: function getController(t) {
        return this._get(t, this.controllers, "controller");
      }
    }, {
      key: "getElement",
      value: function getElement(t) {
        return this._get(t, this.elements, "element");
      }
    }, {
      key: "getPlugin",
      value: function getPlugin(t) {
        return this._get(t, this.plugins, "plugin");
      }
    }, {
      key: "getScale",
      value: function getScale(t) {
        return this._get(t, this.scales, "scale");
      }
    }, {
      key: "removeControllers",
      value: function removeControllers() {
        for (var _len9 = arguments.length, t = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
          t[_key9] = arguments[_key9];
        }

        this._each("unregister", t, this.controllers);
      }
    }, {
      key: "removeElements",
      value: function removeElements() {
        for (var _len10 = arguments.length, t = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
          t[_key10] = arguments[_key10];
        }

        this._each("unregister", t, this.elements);
      }
    }, {
      key: "removePlugins",
      value: function removePlugins() {
        for (var _len11 = arguments.length, t = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
          t[_key11] = arguments[_key11];
        }

        this._each("unregister", t, this.plugins);
      }
    }, {
      key: "removeScales",
      value: function removeScales() {
        for (var _len12 = arguments.length, t = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
          t[_key12] = arguments[_key12];
        }

        this._each("unregister", t, this.scales);
      }
    }, {
      key: "_each",
      value: function _each(t, e, i) {
        var n = this;

        _toConsumableArray(e).forEach(function (e) {
          var o = i || n._getRegistryForType(e);

          i || o.isForType(e) || o === n.plugins && e.id ? n._exec(t, o, e) : J(e, function (e) {
            var o = i || n._getRegistryForType(e);

            n._exec(t, o, e);
          });
        });
      }
    }, {
      key: "_exec",
      value: function _exec(t, e, i) {
        var n = ct(t);
        Q(i["before" + n], [], i), e[t](i), Q(i["after" + n], [], i);
      }
    }, {
      key: "_getRegistryForType",
      value: function _getRegistryForType(t) {
        for (var _e21 = 0; _e21 < this._typedRegistries.length; _e21++) {
          var _i29 = this._typedRegistries[_e21];
          if (_i29.isForType(t)) return _i29;
        }

        return this.plugins;
      }
    }, {
      key: "_get",
      value: function _get(t, e, i) {
        var n = e.get(t);
        if (void 0 === n) throw new Error('"' + t + '" is not a registered ' + i + ".");
        return n;
      }
    }]);

    return _class3;
  }())();

  var kn =
  /*#__PURE__*/
  function () {
    function kn() {
      _classCallCheck(this, kn);

      this._init = [];
    }

    _createClass(kn, [{
      key: "notify",
      value: function notify(t, e, i) {
        var n = this;
        "beforeInit" === e && (n._init = n._createDescriptors(t, !0), n._notify(n._init, t, "install"));

        var o = n._descriptors(t),
            s = n._notify(o, t, e, i);

        return "destroy" === e && (n._notify(o, t, "stop"), n._notify(n._init, t, "uninstall")), s;
      }
    }, {
      key: "_notify",
      value: function _notify(t, e, i, n) {
        n = n || {};
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = t[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var _o17 = _step10.value;
            var _t33 = _o17.plugin;
            if (!1 === Q(_t33[i], [e, n, _o17.options], _t33) && n.cancelable) return !1;
          }
        } catch (err) {
          _didIteratorError10 = true;
          _iteratorError10 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
              _iterator10["return"]();
            }
          } finally {
            if (_didIteratorError10) {
              throw _iteratorError10;
            }
          }
        }

        return !0;
      }
    }, {
      key: "invalidate",
      value: function invalidate() {
        $(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
      }
    }, {
      key: "_descriptors",
      value: function _descriptors(t) {
        if (this._cache) return this._cache;

        var e = this._cache = this._createDescriptors(t);

        return this._notifyStateChanges(t), e;
      }
    }, {
      key: "_createDescriptors",
      value: function _createDescriptors(t, e) {
        var i = t && t.config,
            n = K(i.options && i.options.plugins, {}),
            o = function (t) {
          var e = [],
              i = Object.keys(wn.plugins.items);

          for (var _t34 = 0; _t34 < i.length; _t34++) {
            e.push(wn.getPlugin(i[_t34]));
          }

          var n = t.plugins || [];

          for (var _t35 = 0; _t35 < n.length; _t35++) {
            var _i30 = n[_t35];
            -1 === e.indexOf(_i30) && e.push(_i30);
          }

          return e;
        }(i);

        return !1 !== n || e ? function (t, e, i, n) {
          var o = [],
              s = t.getContext();

          for (var _a14 = 0; _a14 < e.length; _a14++) {
            var _r8 = e[_a14],
                _l12 = Sn(i[_r8.id], n);

            null !== _l12 && o.push({
              plugin: _r8,
              options: Pn(t.config, _r8, _l12, s)
            });
          }

          return o;
        }(t, o, n, e) : [];
      }
    }, {
      key: "_notifyStateChanges",
      value: function _notifyStateChanges(t) {
        var e = this._oldCache || [],
            i = this._cache,
            n = function n(t, e) {
          return t.filter(function (t) {
            return !e.some(function (e) {
              return t.plugin.id === e.plugin.id;
            });
          });
        };

        this._notify(n(e, i), t, "stop"), this._notify(n(i, e), t, "start");
      }
    }]);

    return kn;
  }();

  function Sn(t, e) {
    return e || !1 !== t ? !0 === t ? {} : t : null;
  }

  function Pn(t, e, i, n) {
    var o = t.pluginScopeKeys(e),
        s = t.getOptionScopes(i, o);
    return t.createResolver(s, n, [""], {
      scriptable: !1,
      indexable: !1,
      allKeys: !0
    });
  }

  function Dn(t, e) {
    var i = mt.datasets[t] || {};
    return ((e.datasets || {})[t] || {}).indexAxis || e.indexAxis || i.indexAxis || "x";
  }

  function Cn(t, e) {
    return "x" === t || "y" === t ? t : e.axis || ("top" === (i = e.position) || "bottom" === i ? "x" : "left" === i || "right" === i ? "y" : void 0) || t.charAt(0).toLowerCase();
    var i;
  }

  function An(t) {
    var e = t.options || (t.options = {});
    e.plugins = K(e.plugins, {}), e.scales = function (t, e) {
      var i = ut[t.type] || {
        scales: {}
      },
          n = e.scales || {},
          o = Dn(t.type, e),
          s = Object.create(null),
          a = Object.create(null);
      return Object.keys(n).forEach(function (t) {
        var e = n[t],
            r = Cn(t, e),
            l = function (t, e) {
          return t === e ? "_index_" : "_value_";
        }(r, o),
            c = i.scales || {};

        s[r] = s[r] || t, a[t] = st(Object.create(null), [{
          axis: r
        }, e, c[r], c[l]]);
      }), t.data.datasets.forEach(function (i) {
        var o = i.type || t.type,
            r = i.indexAxis || Dn(o, e),
            l = (ut[o] || {}).scales || {};
        Object.keys(l).forEach(function (t) {
          var e = function (t, e) {
            var i = t;
            return "_index_" === t ? i = e : "_value_" === t && (i = "x" === e ? "y" : "x"), i;
          }(t, r),
              o = i[e + "AxisID"] || s[e] || e;

          a[o] = a[o] || Object.create(null), st(a[o], [{
            axis: e
          }, n[o], l[t]]);
        });
      }), Object.keys(a).forEach(function (t) {
        var e = a[t];
        st(e, [mt.scales[e.type], mt.scale]);
      }), a;
    }(t, e);
  }

  var On = new Map(),
      Tn = new Set();

  function Ln(t, e) {
    var i = On.get(t);
    return i || (i = e(), On.set(t, i), Tn.add(i)), i;
  }

  var Rn = function Rn(t, e, i) {
    var n = lt(e, i);
    void 0 !== n && t.add(n);
  };

  var En =
  /*#__PURE__*/
  function () {
    function En(t) {
      _classCallCheck(this, En);

      this._config = function (t) {
        var e = (t = t || {}).data = t.data || {
          datasets: [],
          labels: []
        };
        return e.datasets = e.datasets || [], e.labels = e.labels || [], An(t), t;
      }(t), this._scopeCache = new Map(), this._resolverCache = new Map();
    }

    _createClass(En, [{
      key: "update",
      value: function update() {
        var t = this._config;
        this.clearCache(), An(t);
      }
    }, {
      key: "clearCache",
      value: function clearCache() {
        this._scopeCache.clear(), this._resolverCache.clear();
      }
    }, {
      key: "datasetScopeKeys",
      value: function datasetScopeKeys(t) {
        return Ln(t, function () {
          return [["datasets." + t, ""]];
        });
      }
    }, {
      key: "datasetAnimationScopeKeys",
      value: function datasetAnimationScopeKeys(t, e) {
        return Ln("".concat(t, ".transition.").concat(e), function () {
          return [["datasets.".concat(t, ".transitions.").concat(e), "transitions." + e], ["datasets." + t, ""]];
        });
      }
    }, {
      key: "datasetElementScopeKeys",
      value: function datasetElementScopeKeys(t, e) {
        return Ln("".concat(t, "-").concat(e), function () {
          return [["datasets.".concat(t, ".elements.").concat(e), "datasets." + t, "elements." + e, ""]];
        });
      }
    }, {
      key: "pluginScopeKeys",
      value: function pluginScopeKeys(t) {
        var e = t.id;
        return Ln("".concat(this.type, "-plugin-").concat(e), function () {
          return [["plugins." + e].concat(_toConsumableArray(t.additionalOptionScopes || []))];
        });
      }
    }, {
      key: "_cachedScopes",
      value: function _cachedScopes(t, e) {
        var i = this._scopeCache;
        var n = i.get(t);
        return n && !e || (n = new Map(), i.set(t, n)), n;
      }
    }, {
      key: "getOptionScopes",
      value: function getOptionScopes(t, e, i) {
        var n = this.options,
            o = this.type,
            s = this._cachedScopes(t, i),
            a = s.get(e);

        if (a) return a;
        var r = new Set();
        e.forEach(function (e) {
          t && (r.add(t), e.forEach(function (e) {
            return Rn(r, t, e);
          })), e.forEach(function (t) {
            return Rn(r, n, t);
          }), e.forEach(function (t) {
            return Rn(r, ut[o] || {}, t);
          }), e.forEach(function (t) {
            return Rn(r, mt, t);
          }), e.forEach(function (t) {
            return Rn(r, ft, t);
          });
        });

        var l = _toConsumableArray(r);

        return Tn.has(e) && s.set(e, l), l;
      }
    }, {
      key: "chartOptionScopes",
      value: function chartOptionScopes() {
        var t = this.options,
            e = this.type;
        return [t, ut[e] || {}, mt.datasets[e] || {}, {
          type: e
        }, mt, ft];
      }
    }, {
      key: "resolveNamedOptions",
      value: function resolveNamedOptions(t, e, i) {
        var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [""];

        var o = {
          $shared: !0
        },
            _In = In(this._resolverCache, t, n),
            s = _In.resolver,
            a = _In.subPrefixes;

        var r = s;

        if (function (t, e) {
          var _Ui = Ui(t),
              i = _Ui.isScriptable,
              n = _Ui.isIndexable;

          var _iteratorNormalCompletion11 = true;
          var _didIteratorError11 = false;
          var _iteratorError11 = undefined;

          try {
            for (var _iterator11 = e[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
              var _o18 = _step11.value;
              if (i(_o18) && dt(t[_o18]) || n(_o18) && Y(t[_o18])) return !0;
            }
          } catch (err) {
            _didIteratorError11 = true;
            _iteratorError11 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
                _iterator11["return"]();
              }
            } finally {
              if (_didIteratorError11) {
                throw _iteratorError11;
              }
            }
          }

          return !1;
        }(s, e)) {
          o.$shared = !1;
          r = Yi(s, i = dt(i) ? i() : i, this.createResolver(t, i, a));
        }

        var _iteratorNormalCompletion12 = true;
        var _didIteratorError12 = false;
        var _iteratorError12 = undefined;

        try {
          for (var _iterator12 = e[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            var _t36 = _step12.value;
            o[_t36] = r[_t36];
          }
        } catch (err) {
          _didIteratorError12 = true;
          _iteratorError12 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
              _iterator12["return"]();
            }
          } finally {
            if (_didIteratorError12) {
              throw _iteratorError12;
            }
          }
        }

        return o;
      }
    }, {
      key: "createResolver",
      value: function createResolver(t, e) {
        var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [""];
        var n = arguments.length > 3 ? arguments[3] : undefined;

        var _In2 = In(this._resolverCache, t, i),
            o = _In2.resolver;

        return U(e) ? Yi(o, e, void 0, n) : o;
      }
    }, {
      key: "type",
      get: function get() {
        return this._config.type;
      },
      set: function set(t) {
        this._config.type = t;
      }
    }, {
      key: "data",
      get: function get() {
        return this._config.data;
      },
      set: function set(t) {
        this._config.data = t;
      }
    }, {
      key: "options",
      get: function get() {
        return this._config.options;
      },
      set: function set(t) {
        this._config.options = t;
      }
    }, {
      key: "plugins",
      get: function get() {
        return this._config.plugins;
      }
    }]);

    return En;
  }();

  function In(t, e, i) {
    var n = t.get(e);
    n || (n = new Map(), t.set(e, n));
    var o = i.join();
    var s = n.get(o);

    if (!s) {
      s = {
        resolver: $i(e, i),
        subPrefixes: i.filter(function (t) {
          return !t.toLowerCase().includes("hover");
        })
      }, n.set(o, s);
    }

    return s;
  }

  var Fn = ["top", "bottom", "left", "right", "chartArea"];

  function zn(t, e) {
    return "top" === t || "bottom" === t || -1 === Fn.indexOf(t) && "x" === e;
  }

  function Vn(t, e) {
    return function (i, n) {
      return i[t] === n[t] ? i[e] - n[e] : i[t] - n[t];
    };
  }

  function Bn(t) {
    var e = t.chart,
        i = e.options.animation;
    e.notifyPlugins("afterRender"), Q(i && i.onComplete, [t], e);
  }

  function Wn(t) {
    var e = t.chart,
        i = e.options.animation;
    Q(i && i.onProgress, [t], e);
  }

  function Hn() {
    return "undefined" != typeof window && "undefined" != typeof document;
  }

  function Nn(t) {
    return Hn() && "string" == typeof t ? t = document.getElementById(t) : t && t.length && (t = t[0]), t && t.canvas && (t = t.canvas), t;
  }

  var jn = {},
      $n = function $n(t) {
    var e = Nn(t);
    return Object.values(jn).filter(function (t) {
      return t.canvas === e;
    }).pop();
  };

  var Yn =
  /*#__PURE__*/
  function () {
    function Yn(t, e) {
      var _this2 = this;

      _classCallCheck(this, Yn);

      var n = this;
      this.config = e = new En(e);
      var o = Nn(t),
          s = $n(o);
      if (s) throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas can be reused.");
      var r = e.createResolver(e.chartOptionScopes(), n.getContext());
      this.platform = n._initializePlatform(o, e);
      var l = n.platform.acquireContext(o, r.aspectRatio),
          c = l && l.canvas,
          h = c && c.height,
          d = c && c.width;
      this.id = j(), this.ctx = l, this.canvas = c, this.width = d, this.height = h, this._options = r, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._sortedMetasets = [], this.scales = {}, this.scale = void 0, this._plugins = new kn(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = i(function () {
        return _this2.update("resize");
      }, r.resizeDelay || 0), jn[n.id] = n, l && c ? (a.listen(n, "complete", Bn), a.listen(n, "progress", Wn), n._initialize(), n.attached && n.update()) : console.error("Failed to create chart: can't acquire context from the given item");
    }

    _createClass(Yn, [{
      key: "_initialize",
      value: function _initialize() {
        var t = this;
        return t.notifyPlugins("beforeInit"), t.options.responsive ? t.resize() : be(t, t.options.devicePixelRatio), t.bindEvents(), t.notifyPlugins("afterInit"), t;
      }
    }, {
      key: "_initializePlatform",
      value: function _initializePlatform(t, e) {
        return e.platform ? new e.platform() : !Hn() || "undefined" != typeof OffscreenCanvas && t instanceof OffscreenCanvas ? new Ke() : new li();
      }
    }, {
      key: "clear",
      value: function clear() {
        return Xt(this.canvas, this.ctx), this;
      }
    }, {
      key: "stop",
      value: function stop() {
        return a.stop(this), this;
      }
    }, {
      key: "resize",
      value: function resize(t, e) {
        a.running(this) ? this._resizeBeforeDraw = {
          width: t,
          height: e
        } : this._resize(t, e);
      }
    }, {
      key: "_resize",
      value: function _resize(t, e) {
        var i = this,
            n = i.options,
            o = i.canvas,
            s = n.maintainAspectRatio && i.aspectRatio,
            a = i.platform.getMaximumSize(o, t, e, s),
            r = i.currentDevicePixelRatio,
            l = n.devicePixelRatio || i.platform.getDevicePixelRatio();
        i.width === a.width && i.height === a.height && r === l || (i.width = a.width, i.height = a.height, i._aspectRatio = i.aspectRatio, be(i, l, !0), i.notifyPlugins("resize", {
          size: a
        }), Q(n.onResize, [i, a], i), i.attached && i._doResize() && i.render());
      }
    }, {
      key: "ensureScalesHaveIDs",
      value: function ensureScalesHaveIDs() {
        J(this.options.scales || {}, function (t, e) {
          t.id = e;
        });
      }
    }, {
      key: "buildOrUpdateScales",
      value: function buildOrUpdateScales() {
        var t = this,
            e = t.options,
            i = e.scales,
            n = t.scales,
            o = Object.keys(n).reduce(function (t, e) {
          return t[e] = !1, t;
        }, {});
        var s = [];
        i && (s = s.concat(Object.keys(i).map(function (t) {
          var e = i[t],
              n = Cn(t, e),
              o = "r" === n,
              s = "x" === n;
          return {
            options: e,
            dposition: o ? "chartArea" : s ? "bottom" : "left",
            dtype: o ? "radialLinear" : s ? "category" : "linear"
          };
        }))), J(s, function (i) {
          var s = i.options,
              a = s.id,
              r = Cn(a, s),
              l = K(s.type, i.dtype);
          void 0 !== s.position && zn(s.position, r) === zn(i.dposition) || (s.position = i.dposition), o[a] = !0;
          var c = null;
          if (a in n && n[a].type === l) c = n[a];else {
            c = new (wn.getScale(l))({
              id: a,
              type: l,
              ctx: t.ctx,
              chart: t
            }), n[c.id] = c;
          }
          c.init(s, e);
        }), J(o, function (t, e) {
          t || delete n[e];
        }), J(n, function (e) {
          Xe.configure(t, e, e.options), Xe.addBox(t, e);
        });
      }
    }, {
      key: "_updateMetasetIndex",
      value: function _updateMetasetIndex(t, e) {
        var i = this._metasets,
            n = t.index;
        n !== e && (i[n] = i[e], i[e] = t, t.index = e);
      }
    }, {
      key: "_updateMetasets",
      value: function _updateMetasets() {
        var t = this,
            e = t._metasets,
            i = t.data.datasets.length,
            n = e.length;

        if (n > i) {
          for (var _e22 = i; _e22 < n; ++_e22) {
            t._destroyDatasetMeta(_e22);
          }

          e.splice(i, n - i);
        }

        t._sortedMetasets = e.slice(0).sort(Vn("order", "index"));
      }
    }, {
      key: "_removeUnreferencedMetasets",
      value: function _removeUnreferencedMetasets() {
        var t = this,
            e = t._metasets,
            i = t.data.datasets;
        e.length > i.length && delete t._stacks, e.forEach(function (e, n) {
          0 === i.filter(function (t) {
            return t === e._dataset;
          }).length && t._destroyDatasetMeta(n);
        });
      }
    }, {
      key: "buildOrUpdateControllers",
      value: function buildOrUpdateControllers() {
        var t = this,
            e = [],
            i = t.data.datasets;
        var n, o;

        for (t._removeUnreferencedMetasets(), n = 0, o = i.length; n < o; n++) {
          var _o19 = i[n];

          var _s16 = t.getDatasetMeta(n);

          var _a15 = _o19.type || t.config.type;

          if (_s16.type && _s16.type !== _a15 && (t._destroyDatasetMeta(n), _s16 = t.getDatasetMeta(n)), _s16.type = _a15, _s16.indexAxis = _o19.indexAxis || Dn(_a15, t.options), _s16.order = _o19.order || 0, t._updateMetasetIndex(_s16, n), _s16.label = "" + _o19.label, _s16.visible = t.isDatasetVisible(n), _s16.controller) _s16.controller.updateIndex(n), _s16.controller.linkScales();else {
            var _i31 = wn.getController(_a15),
                _mt$datasets$_a = mt.datasets[_a15],
                _o20 = _mt$datasets$_a.datasetElementType,
                _r9 = _mt$datasets$_a.dataElementType;

            Object.assign(_i31.prototype, {
              dataElementType: wn.getElement(_r9),
              datasetElementType: _o20 && wn.getElement(_o20)
            }), _s16.controller = new _i31(t, n), e.push(_s16.controller);
          }
        }

        return t._updateMetasets(), e;
      }
    }, {
      key: "_resetElements",
      value: function _resetElements() {
        var t = this;
        J(t.data.datasets, function (e, i) {
          t.getDatasetMeta(i).controller.reset();
        }, t);
      }
    }, {
      key: "reset",
      value: function reset() {
        this._resetElements(), this.notifyPlugins("reset");
      }
    }, {
      key: "update",
      value: function update(t) {
        var e = this,
            i = e.config;
        i.update(), e._options = i.createResolver(i.chartOptionScopes(), e.getContext()), J(e.scales, function (t) {
          Xe.removeBox(e, t);
        });
        var n = e._animationsDisabled = !e.options.animation;
        if (e.ensureScalesHaveIDs(), e.buildOrUpdateScales(), e._plugins.invalidate(), !1 === e.notifyPlugins("beforeUpdate", {
          mode: t,
          cancelable: !0
        })) return;
        var o = e.buildOrUpdateControllers();
        e.notifyPlugins("beforeElementsUpdate");
        var s = 0;

        for (var _t37 = 0, _i32 = e.data.datasets.length; _t37 < _i32; _t37++) {
          var _e$getDatasetMeta = e.getDatasetMeta(_t37),
              _i33 = _e$getDatasetMeta.controller,
              _a16 = !n && -1 === o.indexOf(_i33);

          _i33.buildOrUpdateElements(_a16), s = Math.max(+_i33.getMaxOverflow(), s);
        }

        e._minPadding = s, e._updateLayout(s), n || J(o, function (t) {
          t.reset();
        }), e._updateDatasets(t), e.notifyPlugins("afterUpdate", {
          mode: t
        }), e._layers.sort(Vn("z", "_idx")), e._lastEvent && e._eventHandler(e._lastEvent, !0), e.render();
      }
    }, {
      key: "_updateLayout",
      value: function _updateLayout(t) {
        var e = this;
        if (!1 === e.notifyPlugins("beforeLayout", {
          cancelable: !0
        })) return;
        Xe.update(e, e.width, e.height, t);
        var i = e.chartArea,
            n = i.width <= 0 || i.height <= 0;
        e._layers = [], J(e.boxes, function (t) {
          var _e$_layers;

          n && "chartArea" === t.position || (t.configure && t.configure(), (_e$_layers = e._layers).push.apply(_e$_layers, _toConsumableArray(t._layers())));
        }, e), e._layers.forEach(function (t, e) {
          t._idx = e;
        }), e.notifyPlugins("afterLayout");
      }
    }, {
      key: "_updateDatasets",
      value: function _updateDatasets(t) {
        var e = this,
            i = "function" == typeof t;

        if (!1 !== e.notifyPlugins("beforeDatasetsUpdate", {
          mode: t,
          cancelable: !0
        })) {
          for (var _n22 = 0, _o21 = e.data.datasets.length; _n22 < _o21; ++_n22) {
            e._updateDataset(_n22, i ? t({
              datasetIndex: _n22
            }) : t);
          }

          e.notifyPlugins("afterDatasetsUpdate", {
            mode: t
          });
        }
      }
    }, {
      key: "_updateDataset",
      value: function _updateDataset(t, e) {
        var i = this,
            n = i.getDatasetMeta(t),
            o = {
          meta: n,
          index: t,
          mode: e,
          cancelable: !0
        };
        !1 !== i.notifyPlugins("beforeDatasetUpdate", o) && (n.controller._update(e), o.cancelable = !1, i.notifyPlugins("afterDatasetUpdate", o));
      }
    }, {
      key: "render",
      value: function render() {
        var t = this;
        !1 !== t.notifyPlugins("beforeRender", {
          cancelable: !0
        }) && (a.has(t) ? t.attached && !a.running(t) && a.start(t) : (t.draw(), Bn({
          chart: t
        })));
      }
    }, {
      key: "draw",
      value: function draw() {
        var t = this;
        var e;

        if (t._resizeBeforeDraw) {
          var _t$_resizeBeforeDraw = t._resizeBeforeDraw,
              _e23 = _t$_resizeBeforeDraw.width,
              _i34 = _t$_resizeBeforeDraw.height;
          t._resize(_e23, _i34), t._resizeBeforeDraw = null;
        }

        if (t.clear(), t.width <= 0 || t.height <= 0) return;
        if (!1 === t.notifyPlugins("beforeDraw", {
          cancelable: !0
        })) return;
        var i = t._layers;

        for (e = 0; e < i.length && i[e].z <= 0; ++e) {
          i[e].draw(t.chartArea);
        }

        for (t._drawDatasets(); e < i.length; ++e) {
          i[e].draw(t.chartArea);
        }

        t.notifyPlugins("afterDraw");
      }
    }, {
      key: "_getSortedDatasetMetas",
      value: function _getSortedDatasetMetas(t) {
        var e = this._sortedMetasets,
            i = [];
        var n, o;

        for (n = 0, o = e.length; n < o; ++n) {
          var _o22 = e[n];
          t && !_o22.visible || i.push(_o22);
        }

        return i;
      }
    }, {
      key: "getSortedVisibleDatasetMetas",
      value: function getSortedVisibleDatasetMetas() {
        return this._getSortedDatasetMetas(!0);
      }
    }, {
      key: "_drawDatasets",
      value: function _drawDatasets() {
        var t = this;
        if (!1 === t.notifyPlugins("beforeDatasetsDraw", {
          cancelable: !0
        })) return;
        var e = t.getSortedVisibleDatasetMetas();

        for (var _i35 = e.length - 1; _i35 >= 0; --_i35) {
          t._drawDataset(e[_i35]);
        }

        t.notifyPlugins("afterDatasetsDraw");
      }
    }, {
      key: "_drawDataset",
      value: function _drawDataset(t) {
        var e = this,
            i = e.ctx,
            n = t._clip,
            o = e.chartArea,
            s = {
          meta: t,
          index: t.index,
          cancelable: !0
        };
        !1 !== e.notifyPlugins("beforeDatasetDraw", s) && (Gt(i, {
          left: !1 === n.left ? 0 : o.left - n.left,
          right: !1 === n.right ? e.width : o.right + n.right,
          top: !1 === n.top ? 0 : o.top - n.top,
          bottom: !1 === n.bottom ? e.height : o.bottom + n.bottom
        }), t.controller.draw(), Zt(i), s.cancelable = !1, e.notifyPlugins("afterDatasetDraw", s));
      }
    }, {
      key: "getElementsAtEventForMode",
      value: function getElementsAtEventForMode(t, e, i, n) {
        var o = De.modes[e];
        return "function" == typeof o ? o(this, t, i, n) : [];
      }
    }, {
      key: "getDatasetMeta",
      value: function getDatasetMeta(t) {
        var e = this.data.datasets[t],
            i = this._metasets;
        var n = i.filter(function (t) {
          return t && t._dataset === e;
        }).pop();
        return n || (n = i[t] = {
          type: null,
          data: [],
          dataset: null,
          controller: null,
          hidden: null,
          xAxisID: null,
          yAxisID: null,
          order: e && e.order || 0,
          index: t,
          _dataset: e,
          _parsed: [],
          _sorted: !1
        }), n;
      }
    }, {
      key: "getContext",
      value: function getContext() {
        return this.$context || (this.$context = {
          chart: this,
          type: "chart"
        });
      }
    }, {
      key: "getVisibleDatasetCount",
      value: function getVisibleDatasetCount() {
        return this.getSortedVisibleDatasetMetas().length;
      }
    }, {
      key: "isDatasetVisible",
      value: function isDatasetVisible(t) {
        var e = this.data.datasets[t];
        if (!e) return !1;
        var i = this.getDatasetMeta(t);
        return "boolean" == typeof i.hidden ? !i.hidden : !e.hidden;
      }
    }, {
      key: "setDatasetVisibility",
      value: function setDatasetVisibility(t, e) {
        this.getDatasetMeta(t).hidden = !e;
      }
    }, {
      key: "toggleDataVisibility",
      value: function toggleDataVisibility(t) {
        this._hiddenIndices[t] = !this._hiddenIndices[t];
      }
    }, {
      key: "getDataVisibility",
      value: function getDataVisibility(t) {
        return !this._hiddenIndices[t];
      }
    }, {
      key: "_updateDatasetVisibility",
      value: function _updateDatasetVisibility(t, e) {
        var i = this,
            n = e ? "show" : "hide",
            o = i.getDatasetMeta(t),
            s = o.controller._resolveAnimations(void 0, n);

        i.setDatasetVisibility(t, e), s.update(o, {
          visible: e
        }), i.update(function (e) {
          return e.datasetIndex === t ? n : void 0;
        });
      }
    }, {
      key: "hide",
      value: function hide(t) {
        this._updateDatasetVisibility(t, !1);
      }
    }, {
      key: "show",
      value: function show(t) {
        this._updateDatasetVisibility(t, !0);
      }
    }, {
      key: "_destroyDatasetMeta",
      value: function _destroyDatasetMeta(t) {
        var e = this,
            i = e._metasets && e._metasets[t];
        i && i.controller && (i.controller._destroy(), delete e._metasets[t]);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var t = this,
            e = t.canvas,
            i = t.ctx;
        var n, o;

        for (t.stop(), a.remove(t), n = 0, o = t.data.datasets.length; n < o; ++n) {
          t._destroyDatasetMeta(n);
        }

        t.config.clearCache(), e && (t.unbindEvents(), Xt(e, i), t.platform.releaseContext(i), t.canvas = null, t.ctx = null), t.notifyPlugins("destroy"), delete jn[t.id];
      }
    }, {
      key: "toBase64Image",
      value: function toBase64Image() {
        var _this$canvas;

        return (_this$canvas = this.canvas).toDataURL.apply(_this$canvas, arguments);
      }
    }, {
      key: "bindEvents",
      value: function bindEvents() {
        var t = this,
            e = t._listeners,
            i = t.platform,
            n = function n(_n23, o) {
          i.addEventListener(t, _n23, o), e[_n23] = o;
        },
            o = function o(n, _o23) {
          e[n] && (i.removeEventListener(t, n, _o23), delete e[n]);
        };

        var s = function s(e, i, n) {
          e.offsetX = i, e.offsetY = n, t._eventHandler(e);
        };

        if (J(t.options.events, function (t) {
          return n(t, s);
        }), t.options.responsive) {
          var _e24;

          s = function s(e, i) {
            t.canvas && t.resize(e, i);
          };

          var _a17 = function _a17() {
            o("attach", _a17), t.attached = !0, t.resize(), n("resize", s), n("detach", _e24);
          };

          _e24 = function _e24() {
            t.attached = !1, o("resize", s), n("attach", _a17);
          }, i.isAttached(t.canvas) ? _a17() : _e24();
        } else t.attached = !0;
      }
    }, {
      key: "unbindEvents",
      value: function unbindEvents() {
        var t = this,
            e = t._listeners;
        e && (delete t._listeners, J(e, function (e, i) {
          t.platform.removeEventListener(t, i, e);
        }));
      }
    }, {
      key: "updateHoverStyle",
      value: function updateHoverStyle(t, e, i) {
        var n = i ? "set" : "remove";
        var o, s, a, r;

        for ("dataset" === e && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + n + "DatasetHoverStyle"]()), a = 0, r = t.length; a < r; ++a) {
          s = t[a];

          var _e25 = s && this.getDatasetMeta(s.datasetIndex).controller;

          _e25 && _e25[n + "HoverStyle"](s.element, s.datasetIndex, s.index);
        }
      }
    }, {
      key: "getActiveElements",
      value: function getActiveElements() {
        return this._active || [];
      }
    }, {
      key: "setActiveElements",
      value: function setActiveElements(t) {
        var e = this,
            i = e._active || [],
            n = t.map(function (_ref6) {
          var t = _ref6.datasetIndex,
              i = _ref6.index;
          var n = e.getDatasetMeta(t);
          if (!n) throw new Error("No dataset found at index " + t);
          return {
            datasetIndex: t,
            element: n.data[i],
            index: i
          };
        });
        !tt(n, i) && (e._active = n, e._updateHoverStyles(n, i));
      }
    }, {
      key: "notifyPlugins",
      value: function notifyPlugins(t, e) {
        return this._plugins.notify(this, t, e);
      }
    }, {
      key: "_updateHoverStyles",
      value: function _updateHoverStyles(t, e, i) {
        var n = this,
            o = n.options.hover,
            s = function s(t, e) {
          return t.filter(function (t) {
            return !e.some(function (e) {
              return t.datasetIndex === e.datasetIndex && t.index === e.index;
            });
          });
        },
            a = s(e, t),
            r = i ? t : s(t, e);

        a.length && n.updateHoverStyle(a, o.mode, !1), r.length && o.mode && n.updateHoverStyle(r, o.mode, !0);
      }
    }, {
      key: "_eventHandler",
      value: function _eventHandler(t, e) {
        var i = this,
            n = {
          event: t,
          replay: e,
          cancelable: !0
        };
        if (!1 === i.notifyPlugins("beforeEvent", n)) return;

        var o = i._handleEvent(t, e);

        return n.cancelable = !1, i.notifyPlugins("afterEvent", n), (o || n.changed) && i.render(), i;
      }
    }, {
      key: "_handleEvent",
      value: function _handleEvent(t, e) {
        var i = this,
            _i$_active = i._active,
            n = _i$_active === void 0 ? [] : _i$_active,
            o = i.options,
            s = o.hover,
            a = e;
        var r = [],
            l = !1,
            c = null;
        return "mouseout" !== t.type && (r = i.getElementsAtEventForMode(t, s.mode, s, a), c = "click" === t.type ? i._lastEvent : t), i._lastEvent = null, Q(o.onHover, [t, r, i], i), "mouseup" !== t.type && "click" !== t.type && "contextmenu" !== t.type || Kt(t, i.chartArea, i._minPadding) && Q(o.onClick, [t, r, i], i), l = !tt(r, n), (l || e) && (i._active = r, i._updateHoverStyles(r, n, e)), i._lastEvent = c, l;
      }
    }, {
      key: "aspectRatio",
      get: function get() {
        var _this$options4 = this.options,
            t = _this$options4.aspectRatio,
            e = _this$options4.maintainAspectRatio,
            i = this.width,
            n = this.height,
            o = this._aspectRatio;
        return $(t) ? e && o ? o : n ? i / n : null : t;
      }
    }, {
      key: "data",
      get: function get() {
        return this.config.data;
      },
      set: function set(t) {
        this.config.data = t;
      }
    }, {
      key: "options",
      get: function get() {
        return this._options;
      },
      set: function set(t) {
        this.config.options = t;
      }
    }]);

    return Yn;
  }();

  var Un = function Un() {
    return J(Yn.instances, function (t) {
      return t._plugins.invalidate();
    });
  },
      Xn = !0;

  function qn() {
    throw new Error("This method is not implemented: either no adapter can be found or an incomplete integration was provided.");
  }

  Object.defineProperties(Yn, {
    defaults: {
      enumerable: Xn,
      value: mt
    },
    instances: {
      enumerable: Xn,
      value: jn
    },
    overrides: {
      enumerable: Xn,
      value: ut
    },
    registry: {
      enumerable: Xn,
      value: wn
    },
    version: {
      enumerable: Xn,
      value: "3.0.2"
    },
    getChart: {
      enumerable: Xn,
      value: $n
    },
    register: {
      enumerable: Xn,
      value: function value() {
        wn.add.apply(wn, arguments), Un();
      }
    },
    unregister: {
      enumerable: Xn,
      value: function value() {
        wn.remove.apply(wn, arguments), Un();
      }
    }
  });

  var Kn =
  /*#__PURE__*/
  function () {
    function Kn(t) {
      _classCallCheck(this, Kn);

      this.options = t || {};
    }

    _createClass(Kn, [{
      key: "formats",
      value: function formats() {
        return qn();
      }
    }, {
      key: "parse",
      value: function parse(t, e) {
        return qn();
      }
    }, {
      key: "format",
      value: function format(t, e) {
        return qn();
      }
    }, {
      key: "add",
      value: function add(t, e, i) {
        return qn();
      }
    }, {
      key: "diff",
      value: function diff(t, e, i) {
        return qn();
      }
    }, {
      key: "startOf",
      value: function startOf(t, e, i) {
        return qn();
      }
    }, {
      key: "endOf",
      value: function endOf(t, e) {
        return qn();
      }
    }]);

    return Kn;
  }();

  Kn.override = function (t) {
    Object.assign(Kn.prototype, t);
  };

  var Gn = {
    _date: Kn
  };

  function Zn(t) {
    var e = function (t) {
      if (!t._cache.$bar) {
        var _e26 = t.getMatchingVisibleMetas("bar");

        var _i36 = [];

        for (var _n24 = 0, _o24 = _e26.length; _n24 < _o24; _n24++) {
          _i36 = _i36.concat(_e26[_n24].controller.getAllParsedValues(t));
        }

        t._cache.$bar = le(_i36.sort(function (t, e) {
          return t - e;
        }));
      }

      return t._cache.$bar;
    }(t);

    var i,
        n,
        o,
        s,
        a = t._length;

    var r = function r() {
      a = Math.min(a, i && Math.abs(o - s) || a), s = o;
    };

    for (i = 0, n = e.length; i < n; ++i) {
      o = t.getPixelForValue(e[i]), r();
    }

    for (i = 0, n = t.ticks.length; i < n; ++i) {
      o = t.getPixelForTick(i), r();
    }

    return a;
  }

  function Qn(t, e, i, n) {
    return Y(t) ? function (t, e, i, n) {
      var o = i.parse(t[0], n),
          s = i.parse(t[1], n),
          a = Math.min(o, s),
          r = Math.max(o, s);
      var l = a,
          c = r;
      Math.abs(a) > Math.abs(r) && (l = r, c = a), e[i.axis] = c, e._custom = {
        barStart: l,
        barEnd: c,
        start: o,
        end: s,
        min: a,
        max: r
      };
    }(t, e, i, n) : e[i.axis] = i.parse(t, n), e;
  }

  function Jn(t, e, i, n) {
    var o = t.iScale,
        s = t.vScale,
        a = o.getLabels(),
        r = o === s,
        l = [];
    var c, h, d, u;

    for (c = i, h = i + n; c < h; ++c) {
      u = e[c], d = {}, d[o.axis] = r || o.parse(a[c], c), l.push(Qn(u, d, s, c));
    }

    return l;
  }

  function to(t) {
    return t && void 0 !== t.barStart && void 0 !== t.barEnd;
  }

  var eo =
  /*#__PURE__*/
  function (_Ai) {
    _inherits(eo, _Ai);

    function eo() {
      _classCallCheck(this, eo);

      return _possibleConstructorReturn(this, _getPrototypeOf(eo).apply(this, arguments));
    }

    _createClass(eo, [{
      key: "parsePrimitiveData",
      value: function parsePrimitiveData(t, e, i, n) {
        return Jn(t, e, i, n);
      }
    }, {
      key: "parseArrayData",
      value: function parseArrayData(t, e, i, n) {
        return Jn(t, e, i, n);
      }
    }, {
      key: "parseObjectData",
      value: function parseObjectData(t, e, i, n) {
        var o = t.iScale,
            s = t.vScale,
            _this$_parsing2 = this._parsing,
            _this$_parsing2$xAxis = _this$_parsing2.xAxisKey,
            a = _this$_parsing2$xAxis === void 0 ? "x" : _this$_parsing2$xAxis,
            _this$_parsing2$yAxis = _this$_parsing2.yAxisKey,
            r = _this$_parsing2$yAxis === void 0 ? "y" : _this$_parsing2$yAxis,
            l = "x" === o.axis ? a : r,
            c = "x" === s.axis ? a : r,
            h = [];
        var d, u, f, g;

        for (d = i, u = i + n; d < u; ++d) {
          g = e[d], f = {}, f[o.axis] = o.parse(lt(g, l), d), h.push(Qn(lt(g, c), f, s, d));
        }

        return h;
      }
    }, {
      key: "updateRangeFromParsed",
      value: function updateRangeFromParsed(t, e, i, n) {
        _get2(_getPrototypeOf(eo.prototype), "updateRangeFromParsed", this).call(this, t, e, i, n);

        var o = i._custom;
        o && e === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max));
      }
    }, {
      key: "getLabelAndValue",
      value: function getLabelAndValue(t) {
        var e = this._cachedMeta,
            i = e.iScale,
            n = e.vScale,
            o = this.getParsed(t),
            s = o._custom,
            a = to(s) ? "[" + s.start + ", " + s.end + "]" : "" + n.getLabelForValue(o[n.axis]);
        return {
          label: "" + i.getLabelForValue(o[i.axis]),
          value: a
        };
      }
    }, {
      key: "initialize",
      value: function initialize() {
        var t = this;
        t.enableOptionSharing = !0, _get2(_getPrototypeOf(eo.prototype), "initialize", this).call(this);
        t._cachedMeta.stack = t.getDataset().stack;
      }
    }, {
      key: "update",
      value: function update(t) {
        var e = this._cachedMeta;
        this.updateElements(e.data, 0, e.data.length, t);
      }
    }, {
      key: "updateElements",
      value: function updateElements(t, e, i, n) {
        var o = this,
            s = "reset" === n,
            a = o._cachedMeta.vScale,
            r = a.getBasePixel(),
            l = a.isHorizontal(),
            c = o._getRuler(),
            h = o.resolveDataElementOptions(e, n),
            d = o.getSharedOptions(h),
            u = o.includeOptions(n, d);

        o.updateSharedOptions(d, n, h);

        for (var _a18 = e; _a18 < e + i; _a18++) {
          var _e27 = s ? {
            base: r,
            head: r
          } : o._calculateBarValuePixels(_a18),
              _i37 = o._calculateBarIndexPixels(_a18, c),
              _h9 = {
            horizontal: l,
            base: _e27.base,
            x: l ? _e27.head : _i37.center,
            y: l ? _i37.center : _e27.head,
            height: l ? _i37.size : void 0,
            width: l ? void 0 : _i37.size
          };

          u && (_h9.options = d || o.resolveDataElementOptions(_a18, n)), o.updateElement(t[_a18], _a18, _h9, n);
        }
      }
    }, {
      key: "_getStacks",
      value: function _getStacks(t, e) {
        var i = this._cachedMeta.iScale,
            n = i.getMatchingVisibleMetas(this._type),
            o = i.options.stacked,
            s = n.length,
            a = [];
        var r, l;

        for (r = 0; r < s; ++r) {
          if (l = n[r], void 0 !== e) {
            var _t38 = l.controller.getParsed(e)[l.controller._cachedMeta.vScale.axis];

            if ($(_t38) || isNaN(_t38)) continue;
          }

          if ((!1 === o || -1 === a.indexOf(l.stack) || void 0 === o && void 0 === l.stack) && a.push(l.stack), l.index === t) break;
        }

        return a.length || a.push(void 0), a;
      }
    }, {
      key: "_getStackCount",
      value: function _getStackCount(t) {
        return this._getStacks(void 0, t).length;
      }
    }, {
      key: "_getStackIndex",
      value: function _getStackIndex(t, e) {
        var i = this._getStacks(t),
            n = void 0 !== e ? i.indexOf(e) : -1;

        return -1 === n ? i.length - 1 : n;
      }
    }, {
      key: "_getRuler",
      value: function _getRuler() {
        var t = this,
            e = t.options,
            i = t._cachedMeta,
            n = i.iScale,
            o = [];
        var s, a;

        for (s = 0, a = i.data.length; s < a; ++s) {
          o.push(n.getPixelForValue(t.getParsed(s)[n.axis], s));
        }

        var r = e.barThickness;
        return {
          min: r || Zn(n),
          pixels: o,
          start: n._startPixel,
          end: n._endPixel,
          stackCount: t._getStackCount(),
          scale: n,
          grouped: e.grouped,
          ratio: r ? 1 : e.categoryPercentage * e.barPercentage
        };
      }
    }, {
      key: "_calculateBarValuePixels",
      value: function _calculateBarValuePixels(t) {
        var e = this,
            _e$_cachedMeta = e._cachedMeta,
            i = _e$_cachedMeta.vScale,
            n = _e$_cachedMeta._stacked,
            _e$options2 = e.options,
            o = _e$options2.base,
            s = _e$options2.minBarLength,
            a = e.getParsed(t),
            r = a._custom,
            l = to(r);
        var c,
            h,
            d = a[i.axis],
            u = 0,
            f = n ? e.applyStack(i, a, n) : d;
        f !== d && (u = f - d, f = d), l && (d = r.barStart, f = r.barEnd - r.barStart, 0 !== d && Pt(d) !== Pt(r.barEnd) && (u = 0), u += d);
        var g = $(o) || l ? u : o;
        var p = i.getPixelForValue(g);
        c = this.chart.getDataVisibility(t) ? i.getPixelForValue(u + f) : p, h = c - p, void 0 !== s && Math.abs(h) < s && (h = h < 0 ? -s : s, 0 === d && (p -= h / 2), c = p + h);
        var m = o || 0;

        if (p === i.getPixelForValue(m)) {
          var _t39 = i.getLineWidthForValue(m) / 2;

          h > 0 ? (p += _t39, h -= _t39) : h < 0 && (p -= _t39, h += _t39);
        }

        return {
          size: h,
          base: p,
          head: c,
          center: c + h / 2
        };
      }
    }, {
      key: "_calculateBarIndexPixels",
      value: function _calculateBarIndexPixels(t, e) {
        var i = this,
            n = e.scale,
            o = i.options,
            s = K(o.maxBarThickness, 1 / 0);
        var a, r;

        if (e.grouped) {
          var _n25 = o.skipNull ? i._getStackCount(t) : e.stackCount,
              _l13 = "flex" === o.barThickness ? function (t, e, i, n) {
            var o = e.pixels,
                s = o[t];
            var a = t > 0 ? o[t - 1] : null,
                r = t < o.length - 1 ? o[t + 1] : null;
            var l = i.categoryPercentage;
            null === a && (a = s - (null === r ? e.end - e.start : r - s)), null === r && (r = s + s - a);
            var c = s - (s - Math.min(a, r)) / 2 * l;
            return {
              chunk: Math.abs(r - a) / 2 * l / n,
              ratio: i.barPercentage,
              start: c
            };
          }(t, e, o, _n25) : function (t, e, i, n) {
            var o = i.barThickness;
            var s, a;
            return $(o) ? (s = e.min * i.categoryPercentage, a = i.barPercentage) : (s = o * n, a = 1), {
              chunk: s / n,
              ratio: a,
              start: e.pixels[t] - s / 2
            };
          }(t, e, o, _n25),
              _c8 = i._getStackIndex(i.index, i._cachedMeta.stack);

          a = _l13.start + _l13.chunk * _c8 + _l13.chunk / 2, r = Math.min(s, _l13.chunk * _l13.ratio);
        } else a = n.getPixelForValue(i.getParsed(t)[n.axis], t), r = Math.min(s, e.min * e.ratio);

        return {
          base: a - r / 2,
          head: a + r / 2,
          center: a,
          size: r
        };
      }
    }, {
      key: "draw",
      value: function draw() {
        var t = this,
            e = t.chart,
            i = t._cachedMeta,
            n = i.vScale,
            o = i.data,
            s = o.length;
        var a = 0;

        for (Gt(e.ctx, e.chartArea); a < s; ++a) {
          null !== t.getParsed(a)[n.axis] && o[a].draw(t._ctx);
        }

        Zt(e.ctx);
      }
    }]);

    return eo;
  }(Ai);

  eo.id = "bar", eo.defaults = {
    datasetElementType: !1,
    dataElementType: "bar",
    categoryPercentage: .8,
    barPercentage: .9,
    grouped: !0,
    animations: {
      numbers: {
        type: "number",
        properties: ["x", "y", "base", "width", "height"]
      }
    }
  }, eo.overrides = {
    interaction: {
      mode: "index"
    },
    scales: {
      _index_: {
        type: "category",
        offset: !0,
        grid: {
          offset: !0
        }
      },
      _value_: {
        type: "linear",
        beginAtZero: !0
      }
    }
  };

  var io =
  /*#__PURE__*/
  function (_Ai2) {
    _inherits(io, _Ai2);

    function io() {
      _classCallCheck(this, io);

      return _possibleConstructorReturn(this, _getPrototypeOf(io).apply(this, arguments));
    }

    _createClass(io, [{
      key: "initialize",
      value: function initialize() {
        this.enableOptionSharing = !0, _get2(_getPrototypeOf(io.prototype), "initialize", this).call(this);
      }
    }, {
      key: "parseObjectData",
      value: function parseObjectData(t, e, i, n) {
        var o = t.xScale,
            s = t.yScale,
            _this$_parsing3 = this._parsing,
            _this$_parsing3$xAxis = _this$_parsing3.xAxisKey,
            a = _this$_parsing3$xAxis === void 0 ? "x" : _this$_parsing3$xAxis,
            _this$_parsing3$yAxis = _this$_parsing3.yAxisKey,
            r = _this$_parsing3$yAxis === void 0 ? "y" : _this$_parsing3$yAxis,
            l = [];
        var c, h, d;

        for (c = i, h = i + n; c < h; ++c) {
          d = e[c], l.push({
            x: o.parse(lt(d, a), c),
            y: s.parse(lt(d, r), c),
            _custom: d && d.r && +d.r
          });
        }

        return l;
      }
    }, {
      key: "getMaxOverflow",
      value: function getMaxOverflow() {
        var _this$_cachedMeta = this._cachedMeta,
            t = _this$_cachedMeta.data,
            e = _this$_cachedMeta._parsed;
        var i = 0;

        for (var _n26 = t.length - 1; _n26 >= 0; --_n26) {
          i = Math.max(i, t[_n26].size() / 2, e[_n26]._custom);
        }

        return i > 0 && i;
      }
    }, {
      key: "getLabelAndValue",
      value: function getLabelAndValue(t) {
        var e = this._cachedMeta,
            i = e.xScale,
            n = e.yScale,
            o = this.getParsed(t),
            s = i.getLabelForValue(o.x),
            a = n.getLabelForValue(o.y),
            r = o._custom;
        return {
          label: e.label,
          value: "(" + s + ", " + a + (r ? ", " + r : "") + ")"
        };
      }
    }, {
      key: "update",
      value: function update(t) {
        var e = this._cachedMeta.data;
        this.updateElements(e, 0, e.length, t);
      }
    }, {
      key: "updateElements",
      value: function updateElements(t, e, i, n) {
        var o = this,
            s = "reset" === n,
            _o$_cachedMeta = o._cachedMeta,
            a = _o$_cachedMeta.xScale,
            r = _o$_cachedMeta.yScale,
            l = o.resolveDataElementOptions(e, n),
            c = o.getSharedOptions(l),
            h = o.includeOptions(n, c);

        for (var _l14 = e; _l14 < e + i; _l14++) {
          var _e28 = t[_l14],
              _i38 = !s && o.getParsed(_l14),
              _c9 = s ? a.getPixelForDecimal(.5) : a.getPixelForValue(_i38.x),
              _d5 = s ? r.getBasePixel() : r.getPixelForValue(_i38.y),
              _u3 = {
            x: _c9,
            y: _d5,
            skip: isNaN(_c9) || isNaN(_d5)
          };

          h && (_u3.options = o.resolveDataElementOptions(_l14, n), s && (_u3.options.radius = 0)), o.updateElement(_e28, _l14, _u3, n);
        }

        o.updateSharedOptions(c, n, l);
      }
    }, {
      key: "resolveDataElementOptions",
      value: function resolveDataElementOptions(t, e) {
        var i = this.getParsed(t);

        var n = _get2(_getPrototypeOf(io.prototype), "resolveDataElementOptions", this).call(this, t, e);

        n.$shared && (n = Object.assign({}, n, {
          $shared: !1
        }));
        var o = n.radius;
        return "active" !== e && (n.radius = 0), n.radius += K(i && i._custom, o), n;
      }
    }]);

    return io;
  }(Ai);

  io.id = "bubble", io.defaults = {
    datasetElementType: !1,
    dataElementType: "point",
    animations: {
      numbers: {
        type: "number",
        properties: ["x", "y", "borderWidth", "radius"]
      }
    }
  }, io.overrides = {
    scales: {
      x: {
        type: "linear"
      },
      y: {
        type: "linear"
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function title() {
            return "";
          }
        }
      }
    }
  };

  var no =
  /*#__PURE__*/
  function (_Ai3) {
    _inherits(no, _Ai3);

    function no(t, e) {
      var _this3;

      _classCallCheck(this, no);

      _this3 = _possibleConstructorReturn(this, _getPrototypeOf(no).call(this, t, e)), _this3.enableOptionSharing = !0, _this3.innerRadius = void 0, _this3.outerRadius = void 0, _this3.offsetX = void 0, _this3.offsetY = void 0;
      return _this3;
    }

    _createClass(no, [{
      key: "linkScales",
      value: function linkScales() {}
    }, {
      key: "parse",
      value: function parse(t, e) {
        var i = this.getDataset().data,
            n = this._cachedMeta;
        var o, s;

        for (o = t, s = t + e; o < s; ++o) {
          n._parsed[o] = +i[o];
        }
      }
    }, {
      key: "_getRotation",
      value: function _getRotation() {
        return Rt(this.options.rotation - 90);
      }
    }, {
      key: "_getCircumference",
      value: function _getCircumference() {
        return Rt(this.options.circumference);
      }
    }, {
      key: "_getRotationExtents",
      value: function _getRotationExtents() {
        var t = bt,
            e = -bt;
        var i = this;

        for (var _n27 = 0; _n27 < i.chart.data.datasets.length; ++_n27) {
          if (i.chart.isDatasetVisible(_n27)) {
            var _o25 = i.chart.getDatasetMeta(_n27).controller,
                _s17 = _o25._getRotation(),
                _a19 = _o25._getCircumference();

            t = Math.min(t, _s17), e = Math.max(e, _s17 + _a19);
          }
        }

        return {
          rotation: t,
          circumference: e - t
        };
      }
    }, {
      key: "update",
      value: function update(t) {
        var e = this,
            i = e.chart,
            n = i.chartArea,
            o = e._cachedMeta,
            s = o.data,
            a = e.getMaxBorderWidth() + e.getMaxOffset(s),
            r = Math.max((Math.min(n.width, n.height) - a) / 2, 0),
            l = Math.min(G(e.options.cutout, r), 1),
            c = e._getRingWeight(e.index),
            _e$_getRotationExtent = e._getRotationExtents(),
            h = _e$_getRotationExtent.circumference,
            d = _e$_getRotationExtent.rotation,
            _ref7 = function (t, e, i) {
          var n = 1,
              o = 1,
              s = 0,
              a = 0;

          if (e < bt) {
            var _r10 = t,
                _l15 = _r10 + e,
                _c10 = Math.cos(_r10),
                _h10 = Math.sin(_r10),
                _d6 = Math.cos(_l15),
                _u4 = Math.sin(_l15),
                _f2 = function _f2(t, e, n) {
              return Wt(t, _r10, _l15) ? 1 : Math.max(e, e * i, n, n * i);
            },
                _g2 = function _g2(t, e, n) {
              return Wt(t, _r10, _l15) ? -1 : Math.min(e, e * i, n, n * i);
            },
                _p = _f2(0, _c10, _d6),
                _m = _f2(Mt, _h10, _u4),
                _x = _g2(xt, _c10, _d6),
                _b = _g2(xt + Mt, _h10, _u4);

            n = (_p - _x) / 2, o = (_m - _b) / 2, s = -(_p + _x) / 2, a = -(_m + _b) / 2;
          }

          return {
            ratioX: n,
            ratioY: o,
            offsetX: s,
            offsetY: a
          };
        }(d, h, l),
            u = _ref7.ratioX,
            f = _ref7.ratioY,
            g = _ref7.offsetX,
            p = _ref7.offsetY,
            m = (n.width - a) / u,
            x = (n.height - a) / f,
            b = Math.max(Math.min(m, x) / 2, 0),
            _ = Z(e.options.radius, b),
            y = (_ - Math.max(_ * l, 0)) / e._getVisibleDatasetWeightTotal();

        e.offsetX = g * _, e.offsetY = p * _, o.total = e.calculateTotal(), e.outerRadius = _ - y * e._getRingWeightOffset(e.index), e.innerRadius = Math.max(e.outerRadius - y * c, 0), e.updateElements(s, 0, s.length, t);
      }
    }, {
      key: "_circumference",
      value: function _circumference(t, e) {
        var i = this,
            n = i.options,
            o = i._cachedMeta,
            s = i._getCircumference();

        return e && n.animation.animateRotate || !this.chart.getDataVisibility(t) || null === o._parsed[t] ? 0 : i.calculateCircumference(o._parsed[t] * s / bt);
      }
    }, {
      key: "updateElements",
      value: function updateElements(t, e, i, n) {
        var o = this,
            s = "reset" === n,
            a = o.chart,
            r = a.chartArea,
            l = a.options.animation,
            c = (r.left + r.right) / 2,
            h = (r.top + r.bottom) / 2,
            d = s && l.animateScale,
            u = d ? 0 : o.innerRadius,
            f = d ? 0 : o.outerRadius,
            g = o.resolveDataElementOptions(e, n),
            p = o.getSharedOptions(g),
            m = o.includeOptions(n, p);

        var x,
            b = o._getRotation();

        for (x = 0; x < e; ++x) {
          b += o._circumference(x, s);
        }

        for (x = e; x < e + i; ++x) {
          var _e29 = o._circumference(x, s),
              _i39 = t[x],
              _a20 = {
            x: c + o.offsetX,
            y: h + o.offsetY,
            startAngle: b,
            endAngle: b + _e29,
            circumference: _e29,
            outerRadius: f,
            innerRadius: u
          };

          m && (_a20.options = p || o.resolveDataElementOptions(x, n)), b += _e29, o.updateElement(_i39, x, _a20, n);
        }

        o.updateSharedOptions(p, n, g);
      }
    }, {
      key: "calculateTotal",
      value: function calculateTotal() {
        var t = this._cachedMeta,
            e = t.data;
        var i,
            n = 0;

        for (i = 0; i < e.length; i++) {
          var _e30 = t._parsed[i];
          null !== _e30 && !isNaN(_e30) && this.chart.getDataVisibility(i) && (n += Math.abs(_e30));
        }

        return n;
      }
    }, {
      key: "calculateCircumference",
      value: function calculateCircumference(t) {
        var e = this._cachedMeta.total;
        return e > 0 && !isNaN(t) ? bt * (Math.abs(t) / e) : 0;
      }
    }, {
      key: "getLabelAndValue",
      value: function getLabelAndValue(t) {
        var e = this._cachedMeta,
            i = this.chart,
            n = i.data.labels || [],
            o = Li(e._parsed[t], i.options.locale);
        return {
          label: n[t] || "",
          value: o
        };
      }
    }, {
      key: "getMaxBorderWidth",
      value: function getMaxBorderWidth(t) {
        var e = this;
        var i = 0;
        var n = e.chart;
        var o, s, a, r, l;
        if (!t) for (o = 0, s = n.data.datasets.length; o < s; ++o) {
          if (n.isDatasetVisible(o)) {
            a = n.getDatasetMeta(o), t = a.data, r = a.controller, r !== e && r.configure();
            break;
          }
        }
        if (!t) return 0;

        for (o = 0, s = t.length; o < s; ++o) {
          l = r.resolveDataElementOptions(o), "inner" !== l.borderAlign && (i = Math.max(i, l.borderWidth || 0, l.hoverBorderWidth || 0));
        }

        return i;
      }
    }, {
      key: "getMaxOffset",
      value: function getMaxOffset(t) {
        var e = 0;

        for (var _i40 = 0, _n28 = t.length; _i40 < _n28; ++_i40) {
          var _t40 = this.resolveDataElementOptions(_i40);

          e = Math.max(e, _t40.offset || 0, _t40.hoverOffset || 0);
        }

        return e;
      }
    }, {
      key: "_getRingWeightOffset",
      value: function _getRingWeightOffset(t) {
        var e = 0;

        for (var _i41 = 0; _i41 < t; ++_i41) {
          this.chart.isDatasetVisible(_i41) && (e += this._getRingWeight(_i41));
        }

        return e;
      }
    }, {
      key: "_getRingWeight",
      value: function _getRingWeight(t) {
        return Math.max(K(this.chart.data.datasets[t].weight, 1), 0);
      }
    }, {
      key: "_getVisibleDatasetWeightTotal",
      value: function _getVisibleDatasetWeightTotal() {
        return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
      }
    }]);

    return no;
  }(Ai);

  no.id = "doughnut", no.defaults = {
    datasetElementType: !1,
    dataElementType: "arc",
    animation: {
      animateRotate: !0,
      animateScale: !1
    },
    animations: {
      numbers: {
        type: "number",
        properties: ["circumference", "endAngle", "innerRadius", "outerRadius", "startAngle", "x", "y", "offset", "borderWidth"]
      }
    },
    cutout: "50%",
    rotation: 0,
    circumference: 360,
    radius: "100%",
    indexAxis: "r"
  }, no.overrides = {
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          generateLabels: function generateLabels(t) {
            var e = t.data;
            return e.labels.length && e.datasets.length ? e.labels.map(function (e, i) {
              var n = t.getDatasetMeta(0).controller.getStyle(i);
              return {
                text: e,
                fillStyle: n.backgroundColor,
                strokeStyle: n.borderColor,
                lineWidth: n.borderWidth,
                hidden: !t.getDataVisibility(i),
                index: i
              };
            }) : [];
          }
        },
        onClick: function onClick(t, e, i) {
          i.chart.toggleDataVisibility(e.index), i.chart.update();
        }
      },
      tooltip: {
        callbacks: {
          title: function title() {
            return "";
          },
          label: function label(t) {
            var e = t.label;
            var i = ": " + t.formattedValue;
            return Y(e) ? (e = e.slice(), e[0] += i) : e += i, e;
          }
        }
      }
    }
  };

  var oo =
  /*#__PURE__*/
  function (_Ai4) {
    _inherits(oo, _Ai4);

    function oo() {
      _classCallCheck(this, oo);

      return _possibleConstructorReturn(this, _getPrototypeOf(oo).apply(this, arguments));
    }

    _createClass(oo, [{
      key: "initialize",
      value: function initialize() {
        this.enableOptionSharing = !0, _get2(_getPrototypeOf(oo.prototype), "initialize", this).call(this);
      }
    }, {
      key: "update",
      value: function update(t) {
        var e = this,
            i = e._cachedMeta,
            n = i.dataset,
            _i$data = i.data,
            o = _i$data === void 0 ? [] : _i$data,
            s = i._dataset,
            a = e.chart._animationsDisabled;

        var _ref8 = function (t, e, i) {
          var n = e.length;
          var o = 0,
              s = n;

          if (t._sorted) {
            var _a21 = t.iScale,
                _r11 = t._parsed,
                _l16 = _a21.axis,
                _a21$getUserBounds = _a21.getUserBounds(),
                _c11 = _a21$getUserBounds.min,
                _h11 = _a21$getUserBounds.max,
                _d7 = _a21$getUserBounds.minDefined,
                _u5 = _a21$getUserBounds.maxDefined;

            _d7 && (o = Ht(Math.min(ie(_r11, _a21.axis, _c11).lo, i ? n : ie(e, _l16, _a21.getPixelForValue(_c11)).lo), 0, n - 1)), s = _u5 ? Ht(Math.max(ie(_r11, _a21.axis, _h11).hi + 1, i ? 0 : ie(e, _l16, _a21.getPixelForValue(_h11)).hi + 1), o, n) - o : n - o;
          }

          return {
            start: o,
            count: s
          };
        }(i, o, a),
            r = _ref8.start,
            l = _ref8.count;

        if (e._drawStart = r, e._drawCount = l, function (t) {
          var e = t.xScale,
              i = t.yScale,
              n = t._scaleRanges,
              o = {
            xmin: e.min,
            xmax: e.max,
            ymin: i.min,
            ymax: i.max
          };
          if (!n) return t._scaleRanges = o, !0;
          var s = n.xmin !== e.min || n.xmax !== e.max || n.ymin !== i.min || n.ymax !== i.max;
          return Object.assign(n, o), s;
        }(i) && (r = 0, l = o.length), n._decimated = !!s._decimated, n.points = o, "resize" !== t) {
          var _i42 = e.resolveDatasetElementOptions(t);

          e.options.showLine || (_i42.borderWidth = 0), e.updateElement(n, void 0, {
            animated: !a,
            options: _i42
          }, t);
        }

        e.updateElements(o, r, l, t);
      }
    }, {
      key: "updateElements",
      value: function updateElements(t, e, i, n) {
        var o = this,
            s = "reset" === n,
            _o$_cachedMeta2 = o._cachedMeta,
            a = _o$_cachedMeta2.xScale,
            r = _o$_cachedMeta2.yScale,
            l = _o$_cachedMeta2._stacked,
            c = o.resolveDataElementOptions(e, n),
            h = o.getSharedOptions(c),
            d = o.includeOptions(n, h),
            u = o.options.spanGaps,
            f = At(u) ? u : Number.POSITIVE_INFINITY,
            g = o.chart._animationsDisabled || s || "none" === n;
        var p = e > 0 && o.getParsed(e - 1);

        for (var _c12 = e; _c12 < e + i; ++_c12) {
          var _e31 = t[_c12],
              _i43 = o.getParsed(_c12),
              _u6 = g ? _e31 : {},
              _m2 = _u6.x = a.getPixelForValue(_i43.x, _c12),
              _x2 = _u6.y = s ? r.getBasePixel() : r.getPixelForValue(l ? o.applyStack(r, _i43, l) : _i43.y, _c12);

          _u6.skip = isNaN(_m2) || isNaN(_x2), _u6.stop = _c12 > 0 && _i43.x - p.x > f, d && (_u6.options = h || o.resolveDataElementOptions(_c12, n)), g || o.updateElement(_e31, _c12, _u6, n), p = _i43;
        }

        o.updateSharedOptions(h, n, c);
      }
    }, {
      key: "getMaxOverflow",
      value: function getMaxOverflow() {
        var t = this,
            e = t._cachedMeta,
            i = e.dataset,
            n = i.options && i.options.borderWidth || 0,
            o = e.data || [];
        if (!o.length) return n;
        var s = o[0].size(t.resolveDataElementOptions(0)),
            a = o[o.length - 1].size(t.resolveDataElementOptions(o.length - 1));
        return Math.max(n, s, a) / 2;
      }
    }, {
      key: "draw",
      value: function draw() {
        this._cachedMeta.dataset.updateControlPoints(this.chart.chartArea), _get2(_getPrototypeOf(oo.prototype), "draw", this).call(this);
      }
    }]);

    return oo;
  }(Ai);

  oo.id = "line", oo.defaults = {
    datasetElementType: "line",
    dataElementType: "point",
    showLine: !0,
    spanGaps: !1
  }, oo.overrides = {
    scales: {
      _index_: {
        type: "category"
      },
      _value_: {
        type: "linear"
      }
    }
  };

  var so =
  /*#__PURE__*/
  function (_Ai5) {
    _inherits(so, _Ai5);

    function so(t, e) {
      var _this4;

      _classCallCheck(this, so);

      _this4 = _possibleConstructorReturn(this, _getPrototypeOf(so).call(this, t, e)), _this4.innerRadius = void 0, _this4.outerRadius = void 0;
      return _this4;
    }

    _createClass(so, [{
      key: "update",
      value: function update(t) {
        var e = this._cachedMeta.data;
        this._updateRadius(), this.updateElements(e, 0, e.length, t);
      }
    }, {
      key: "_updateRadius",
      value: function _updateRadius() {
        var t = this,
            e = t.chart,
            i = e.chartArea,
            n = e.options,
            o = Math.min(i.right - i.left, i.bottom - i.top),
            s = Math.max(o / 2, 0),
            a = (s - Math.max(n.cutoutPercentage ? s / 100 * n.cutoutPercentage : 1, 0)) / e.getVisibleDatasetCount();
        t.outerRadius = s - a * t.index, t.innerRadius = t.outerRadius - a;
      }
    }, {
      key: "updateElements",
      value: function updateElements(t, e, i, n) {
        var o = this,
            s = "reset" === n,
            a = o.chart,
            r = o.getDataset(),
            l = a.options.animation,
            c = o._cachedMeta.rScale,
            h = c.xCenter,
            d = c.yCenter,
            u = c.getIndexAngle(0) - .5 * xt;
        var f,
            g = u;
        var p = 360 / o.countVisibleElements();

        for (f = 0; f < e; ++f) {
          g += o._computeAngle(f, n, p);
        }

        for (f = e; f < e + i; f++) {
          var _e32 = t[f];

          var _i44 = g,
              _m3 = g + o._computeAngle(f, n, p),
              _x3 = a.getDataVisibility(f) ? c.getDistanceFromCenterForValue(r.data[f]) : 0;

          g = _m3, s && (l.animateScale && (_x3 = 0), l.animateRotate && (_i44 = _m3 = u));
          var _b2 = {
            x: h,
            y: d,
            innerRadius: 0,
            outerRadius: _x3,
            startAngle: _i44,
            endAngle: _m3,
            options: o.resolveDataElementOptions(f, n)
          };
          o.updateElement(_e32, f, _b2, n);
        }
      }
    }, {
      key: "countVisibleElements",
      value: function countVisibleElements() {
        var _this5 = this;

        var t = this.getDataset(),
            e = this._cachedMeta;
        var i = 0;
        return e.data.forEach(function (e, n) {
          !isNaN(t.data[n]) && _this5.chart.getDataVisibility(n) && i++;
        }), i;
      }
    }, {
      key: "_computeAngle",
      value: function _computeAngle(t, e, i) {
        return this.chart.getDataVisibility(t) ? Rt(this.resolveDataElementOptions(t, e).angle || i) : 0;
      }
    }]);

    return so;
  }(Ai);

  so.id = "polarArea", so.defaults = {
    dataElementType: "arc",
    animation: {
      animateRotate: !0,
      animateScale: !0
    },
    animations: {
      numbers: {
        type: "number",
        properties: ["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius"]
      }
    },
    indexAxis: "r",
    startAngle: 0
  }, so.overrides = {
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          generateLabels: function generateLabels(t) {
            var e = t.data;
            return e.labels.length && e.datasets.length ? e.labels.map(function (e, i) {
              var n = t.getDatasetMeta(0).controller.getStyle(i);
              return {
                text: e,
                fillStyle: n.backgroundColor,
                strokeStyle: n.borderColor,
                lineWidth: n.borderWidth,
                hidden: !t.getDataVisibility(i),
                index: i
              };
            }) : [];
          }
        },
        onClick: function onClick(t, e, i) {
          i.chart.toggleDataVisibility(e.index), i.chart.update();
        }
      },
      tooltip: {
        callbacks: {
          title: function title() {
            return "";
          },
          label: function label(t) {
            return t.chart.data.labels[t.dataIndex] + ": " + t.formattedValue;
          }
        }
      }
    },
    scales: {
      r: {
        type: "radialLinear",
        angleLines: {
          display: !1
        },
        beginAtZero: !0,
        grid: {
          circular: !0
        },
        pointLabels: {
          display: !1
        },
        startAngle: 0
      }
    }
  };

  var ao =
  /*#__PURE__*/
  function (_no) {
    _inherits(ao, _no);

    function ao() {
      _classCallCheck(this, ao);

      return _possibleConstructorReturn(this, _getPrototypeOf(ao).apply(this, arguments));
    }

    return ao;
  }(no);

  ao.id = "pie", ao.defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };

  var ro =
  /*#__PURE__*/
  function (_Ai6) {
    _inherits(ro, _Ai6);

    function ro() {
      _classCallCheck(this, ro);

      return _possibleConstructorReturn(this, _getPrototypeOf(ro).apply(this, arguments));
    }

    _createClass(ro, [{
      key: "getLabelAndValue",
      value: function getLabelAndValue(t) {
        var e = this._cachedMeta.vScale,
            i = this.getParsed(t);
        return {
          label: e.getLabels()[t],
          value: "" + e.getLabelForValue(i[e.axis])
        };
      }
    }, {
      key: "update",
      value: function update(t) {
        var e = this,
            i = e._cachedMeta,
            n = i.dataset,
            o = i.data || [],
            s = i.iScale.getLabels();

        if (n.points = o, "resize" !== t) {
          var _i45 = e.resolveDatasetElementOptions(t);

          e.options.showLine || (_i45.borderWidth = 0);
          var _a22 = {
            _loop: !0,
            _fullLoop: s.length === o.length,
            options: _i45
          };
          e.updateElement(n, void 0, _a22, t);
        }

        e.updateElements(o, 0, o.length, t);
      }
    }, {
      key: "updateElements",
      value: function updateElements(t, e, i, n) {
        var o = this,
            s = o.getDataset(),
            a = o._cachedMeta.rScale,
            r = "reset" === n;

        for (var _l17 = e; _l17 < e + i; _l17++) {
          var _e33 = t[_l17],
              _i46 = o.resolveDataElementOptions(_l17, n),
              _c13 = a.getPointPositionForValue(_l17, s.data[_l17]),
              _h12 = r ? a.xCenter : _c13.x,
              _d8 = r ? a.yCenter : _c13.y,
              _u7 = {
            x: _h12,
            y: _d8,
            angle: _c13.angle,
            skip: isNaN(_h12) || isNaN(_d8),
            options: _i46
          };

          o.updateElement(_e33, _l17, _u7, n);
        }
      }
    }]);

    return ro;
  }(Ai);

  ro.id = "radar", ro.defaults = {
    datasetElementType: "line",
    dataElementType: "point",
    indexAxis: "r",
    showLine: !0,
    elements: {
      line: {
        fill: "start"
      }
    }
  }, ro.overrides = {
    aspectRatio: 1,
    scales: {
      r: {
        type: "radialLinear"
      }
    }
  };

  var lo =
  /*#__PURE__*/
  function (_oo) {
    _inherits(lo, _oo);

    function lo() {
      _classCallCheck(this, lo);

      return _possibleConstructorReturn(this, _getPrototypeOf(lo).apply(this, arguments));
    }

    return lo;
  }(oo);

  lo.id = "scatter", lo.defaults = {
    showLine: !1,
    fill: !1
  }, lo.overrides = {
    interaction: {
      mode: "point"
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function title() {
            return "";
          },
          label: function label(t) {
            return "(" + t.label + ", " + t.formattedValue + ")";
          }
        }
      }
    },
    scales: {
      x: {
        type: "linear"
      },
      y: {
        type: "linear"
      }
    }
  };
  var co = Object.freeze({
    __proto__: null,
    BarController: eo,
    BubbleController: io,
    DoughnutController: no,
    LineController: oo,
    PolarAreaController: so,
    PieController: ao,
    RadarController: ro,
    ScatterController: lo
  });

  function ho(t, e) {
    var i = e.startAngle,
        n = e.endAngle,
        o = e.pixelMargin,
        s = e.x,
        a = e.y,
        r = e.outerRadius,
        l = e.innerRadius;
    var c = o / r;
    t.beginPath(), t.arc(s, a, r, i - c, n + c), l > o ? (c = o / l, t.arc(s, a, l, n + c, i - c, !0)) : t.arc(s, a, o, n + Mt, i - Mt), t.closePath(), t.clip();
  }

  function uo(t, e) {
    var i = e.x,
        n = e.y,
        o = e.startAngle,
        s = e.endAngle,
        a = e.pixelMargin,
        r = Math.max(e.outerRadius - a, 0),
        l = e.innerRadius + a;
    t.beginPath(), t.arc(i, n, r, o, s), t.arc(i, n, l, s, o, !0), t.closePath();
  }

  function fo(t, e) {
    var i = e.x,
        n = e.y,
        o = e.startAngle,
        s = e.endAngle,
        a = e.pixelMargin,
        r = e.options,
        l = e.outerRadius,
        c = e.innerRadius + a,
        h = "inner" === r.borderAlign;
    r.borderWidth && (h ? (t.lineWidth = 2 * r.borderWidth, t.lineJoin = "round") : (t.lineWidth = r.borderWidth, t.lineJoin = "bevel"), e.fullCircles && function (t, e, i) {
      var n = e.x,
          o = e.y,
          s = e.startAngle,
          a = e.endAngle,
          r = e.pixelMargin,
          l = Math.max(e.outerRadius - r, 0),
          c = e.innerRadius + r;
      var h;

      for (i && (e.endAngle = e.startAngle + bt, ho(t, e), e.endAngle = a, e.endAngle === e.startAngle && (e.endAngle += bt, e.fullCircles--)), t.beginPath(), t.arc(n, o, c, s + bt, s, !0), h = 0; h < e.fullCircles; ++h) {
        t.stroke();
      }

      for (t.beginPath(), t.arc(n, o, l, s, s + bt), h = 0; h < e.fullCircles; ++h) {
        t.stroke();
      }
    }(t, e, h), h && ho(t, e), t.beginPath(), t.arc(i, n, l, o, s), t.arc(i, n, c, s, o, !0), t.closePath(), t.stroke());
  }

  var go =
  /*#__PURE__*/
  function (_Oi2) {
    _inherits(go, _Oi2);

    function go(t) {
      var _this6;

      _classCallCheck(this, go);

      _this6 = _possibleConstructorReturn(this, _getPrototypeOf(go).call(this)), _this6.options = void 0, _this6.circumference = void 0, _this6.startAngle = void 0, _this6.endAngle = void 0, _this6.innerRadius = void 0, _this6.outerRadius = void 0, _this6.pixelMargin = 0, _this6.fullCircles = 0, t && Object.assign(_assertThisInitialized(_this6), t);
      return _this6;
    }

    _createClass(go, [{
      key: "inRange",
      value: function inRange(t, e, i) {
        var n = this.getProps(["x", "y"], i),
            _Ft = Ft(n, {
          x: t,
          y: e
        }),
            o = _Ft.angle,
            s = _Ft.distance,
            _this$getProps2 = this.getProps(["startAngle", "endAngle", "innerRadius", "outerRadius", "circumference"], i),
            a = _this$getProps2.startAngle,
            r = _this$getProps2.endAngle,
            l = _this$getProps2.innerRadius,
            c = _this$getProps2.outerRadius,
            h = _this$getProps2.circumference;

        return (h >= bt || Wt(o, a, r)) && s >= l && s <= c;
      }
    }, {
      key: "getCenterPoint",
      value: function getCenterPoint(t) {
        var _this$getProps3 = this.getProps(["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius"], t),
            e = _this$getProps3.x,
            i = _this$getProps3.y,
            n = _this$getProps3.startAngle,
            o = _this$getProps3.endAngle,
            s = _this$getProps3.innerRadius,
            a = _this$getProps3.outerRadius,
            r = (n + o) / 2,
            l = (s + a) / 2;

        return {
          x: e + Math.cos(r) * l,
          y: i + Math.sin(r) * l
        };
      }
    }, {
      key: "tooltipPosition",
      value: function tooltipPosition(t) {
        return this.getCenterPoint(t);
      }
    }, {
      key: "draw",
      value: function draw(t) {
        var e = this,
            i = e.options,
            n = i.offset || 0;

        if (e.pixelMargin = "inner" === i.borderAlign ? .33 : 0, e.fullCircles = Math.floor(e.circumference / bt), !(0 === e.circumference || e.innerRadius < 0 || e.outerRadius < 0)) {
          if (t.save(), n && e.circumference < bt) {
            var _i47 = (e.startAngle + e.endAngle) / 2;

            t.translate(Math.cos(_i47) * n, Math.sin(_i47) * n);
          }

          t.fillStyle = i.backgroundColor, t.strokeStyle = i.borderColor, function (t, e) {
            if (e.fullCircles) {
              e.endAngle = e.startAngle + bt, uo(t, e);

              for (var _i48 = 0; _i48 < e.fullCircles; ++_i48) {
                t.fill();
              }
            }

            isNaN(e.circumference) || (e.endAngle = e.startAngle + e.circumference % bt), uo(t, e), t.fill();
          }(t, e), fo(t, e), t.restore();
        }
      }
    }]);

    return go;
  }(Oi);

  function po(t, e, i) {
    t.lineTo(i.x, i.y);
  }

  function mo(t, e, i) {
    i = i || {};
    var n = t.length,
        o = Math.max(i.start || 0, e.start),
        s = Math.min(i.end || n - 1, e.end);
    return {
      count: n,
      start: o,
      loop: e.loop,
      ilen: s < o ? n + s - o : s - o
    };
  }

  function xo(t, e, i, n) {
    var o = e.points,
        s = e.options,
        _mo = mo(o, i, n),
        a = _mo.count,
        r = _mo.start,
        l = _mo.loop,
        c = _mo.ilen,
        h = function (t) {
      return t.stepped ? Qt : t.tension ? Jt : po;
    }(s);

    var d,
        u,
        f,
        _ref9 = n || {},
        _ref9$move = _ref9.move,
        g = _ref9$move === void 0 ? !0 : _ref9$move,
        p = _ref9.reverse;

    for (d = 0; d <= c; ++d) {
      u = o[(r + (p ? c - d : d)) % a], u.skip || (g ? (t.moveTo(u.x, u.y), g = !1) : h(t, f, u, p, s.stepped), f = u);
    }

    return l && (u = o[(r + (p ? c : 0)) % a], h(t, f, u, p, s.stepped)), !!l;
  }

  function bo(t, e, i, n) {
    var o = e.points,
        _mo2 = mo(o, i, n),
        s = _mo2.count,
        a = _mo2.start,
        r = _mo2.ilen,
        _ref10 = n || {},
        _ref10$move = _ref10.move,
        l = _ref10$move === void 0 ? !0 : _ref10$move,
        c = _ref10.reverse;

    var h,
        d,
        u,
        f,
        g,
        p,
        m = 0,
        x = 0;

    var b = function b(t) {
      return (a + (c ? r - t : t)) % s;
    },
        _ = function _() {
      f !== g && (t.lineTo(m, g), t.lineTo(m, f), t.lineTo(m, p));
    };

    for (l && (d = o[b(0)], t.moveTo(d.x, d.y)), h = 0; h <= r; ++h) {
      if (d = o[b(h)], d.skip) continue;

      var _e34 = d.x,
          _i49 = d.y,
          _n29 = 0 | _e34;

      _n29 === u ? (_i49 < f ? f = _i49 : _i49 > g && (g = _i49), m = (x * m + _e34) / ++x) : (_(), t.lineTo(_e34, _i49), u = _n29, x = 0, f = g = _i49), p = _i49;
    }

    _();
  }

  function _o(t) {
    var e = t.options,
        i = e.borderDash && e.borderDash.length;
    return !(t._decimated || t._loop || e.tension || e.stepped || i) ? bo : xo;
  }

  go.id = "arc", go.defaults = {
    borderAlign: "center",
    borderColor: "#fff",
    borderWidth: 2,
    offset: 0,
    angle: void 0
  }, go.defaultRoutes = {
    backgroundColor: "backgroundColor"
  };
  var yo = "function" == typeof Path2D ? function (t, e, i, n) {
    var o = e._path;
    o || (o = e._path = new Path2D(), e.path(o, i, n) && o.closePath()), t.stroke(o);
  } : function (t, e, i, n) {
    t.beginPath(), e.path(t, i, n) && t.closePath(), t.stroke();
  };

  var vo =
  /*#__PURE__*/
  function (_Oi3) {
    _inherits(vo, _Oi3);

    function vo(t) {
      var _this7;

      _classCallCheck(this, vo);

      _this7 = _possibleConstructorReturn(this, _getPrototypeOf(vo).call(this)), _this7.animated = !0, _this7.options = void 0, _this7._loop = void 0, _this7._fullLoop = void 0, _this7._path = void 0, _this7._points = void 0, _this7._segments = void 0, _this7._decimated = !1, _this7._pointsUpdated = !1, t && Object.assign(_assertThisInitialized(_this7), t);
      return _this7;
    }

    _createClass(vo, [{
      key: "updateControlPoints",
      value: function updateControlPoints(t) {
        var e = this,
            i = e.options;

        if (i.tension && !i.stepped && !e._pointsUpdated) {
          var _n30 = i.spanGaps ? e._loop : e._fullLoop;

          cn(e._points, i, t, _n30), e._pointsUpdated = !0;
        }
      }
    }, {
      key: "first",
      value: function first() {
        var t = this.segments,
            e = this.points;
        return t.length && e[t[0].start];
      }
    }, {
      key: "last",
      value: function last() {
        var t = this.segments,
            e = this.points,
            i = t.length;
        return i && e[t[i - 1].end];
      }
    }, {
      key: "interpolate",
      value: function interpolate(t, e) {
        var i = this,
            n = i.options,
            o = t[e],
            s = i.points,
            a = _n(i, {
          property: e,
          start: o,
          end: o
        });

        if (!a.length) return;

        var r = [],
            l = function (t) {
          return t.stepped ? dn : t.tension ? un : hn;
        }(n);

        var c, h;

        for (c = 0, h = a.length; c < h; ++c) {
          var _a$c = a[c],
              _i50 = _a$c.start,
              _h13 = _a$c.end,
              _d9 = s[_i50],
              _u8 = s[_h13];

          if (_d9 === _u8) {
            r.push(_d9);
            continue;
          }

          var _f3 = l(_d9, _u8, Math.abs((o - _d9[e]) / (_u8[e] - _d9[e])), n.stepped);

          _f3[e] = t[e], r.push(_f3);
        }

        return 1 === r.length ? r[0] : r;
      }
    }, {
      key: "pathSegment",
      value: function pathSegment(t, e, i) {
        return _o(this)(t, this, e, i);
      }
    }, {
      key: "path",
      value: function path(t, e, i) {
        var n = this,
            o = n.segments,
            s = o.length,
            a = _o(n);

        var r = n._loop;
        e = e || 0, i = i || n.points.length - e;

        for (var _l18 = 0; _l18 < s; ++_l18) {
          r &= a(t, n, o[_l18], {
            start: e,
            end: e + i - 1
          });
        }

        return !!r;
      }
    }, {
      key: "draw",
      value: function draw(t, e, i, n) {
        var o = this,
            s = o.options || {};
        (o.points || []).length && s.borderWidth && (t.save(), function (t, e) {
          t.lineCap = e.borderCapStyle, t.setLineDash(e.borderDash), t.lineDashOffset = e.borderDashOffset, t.lineJoin = e.borderJoinStyle, t.lineWidth = e.borderWidth, t.strokeStyle = e.borderColor;
        }(t, s), yo(t, o, i, n), t.restore(), o.animated && (o._pointsUpdated = !1, o._path = void 0));
      }
    }, {
      key: "points",
      set: function set(t) {
        var e = this;
        e._points = t, delete e._segments, delete e._path, e._pointsUpdated = !1;
      },
      get: function get() {
        return this._points;
      }
    }, {
      key: "segments",
      get: function get() {
        return this._segments || (this._segments = yn(this));
      }
    }]);

    return vo;
  }(Oi);

  function Mo(t, e, i, n) {
    var o = t.options,
        _t$getProps = t.getProps([i], n),
        s = _t$getProps[i];

    return Math.abs(e - s) < o.radius + o.hitRadius;
  }

  vo.id = "line", vo.defaults = {
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: "miter",
    borderWidth: 3,
    capBezierPoints: !0,
    cubicInterpolationMode: "default",
    fill: !1,
    spanGaps: !1,
    stepped: !1,
    tension: 0
  }, vo.defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
  }, vo.descriptors = {
    _scriptable: !0,
    _indexable: function _indexable(t) {
      return "borderDash" !== t && "fill" !== t;
    }
  };

  var wo =
  /*#__PURE__*/
  function (_Oi4) {
    _inherits(wo, _Oi4);

    function wo(t) {
      var _this8;

      _classCallCheck(this, wo);

      _this8 = _possibleConstructorReturn(this, _getPrototypeOf(wo).call(this)), _this8.options = void 0, _this8.skip = void 0, _this8.stop = void 0, t && Object.assign(_assertThisInitialized(_this8), t);
      return _this8;
    }

    _createClass(wo, [{
      key: "inRange",
      value: function inRange(t, e, i) {
        var n = this.options,
            _this$getProps4 = this.getProps(["x", "y"], i),
            o = _this$getProps4.x,
            s = _this$getProps4.y;

        return Math.pow(t - o, 2) + Math.pow(e - s, 2) < Math.pow(n.hitRadius + n.radius, 2);
      }
    }, {
      key: "inXRange",
      value: function inXRange(t, e) {
        return Mo(this, t, "x", e);
      }
    }, {
      key: "inYRange",
      value: function inYRange(t, e) {
        return Mo(this, t, "y", e);
      }
    }, {
      key: "getCenterPoint",
      value: function getCenterPoint(t) {
        var _this$getProps5 = this.getProps(["x", "y"], t),
            e = _this$getProps5.x,
            i = _this$getProps5.y;

        return {
          x: e,
          y: i
        };
      }
    }, {
      key: "size",
      value: function size(t) {
        var e = (t = t || this.options || {}).radius || 0;
        e = Math.max(e, e && t.hoverRadius || 0);
        return 2 * (e + (e && t.borderWidth || 0));
      }
    }, {
      key: "draw",
      value: function draw(t) {
        var e = this,
            i = e.options;
        e.skip || i.radius < .1 || (t.strokeStyle = i.borderColor, t.lineWidth = i.borderWidth, t.fillStyle = i.backgroundColor, qt(t, i, e.x, e.y));
      }
    }, {
      key: "getRange",
      value: function getRange() {
        var t = this.options || {};
        return t.radius + t.hitRadius;
      }
    }]);

    return wo;
  }(Oi);

  function ko(t, e) {
    var _t$getProps2 = t.getProps(["x", "y", "base", "width", "height"], e),
        i = _t$getProps2.x,
        n = _t$getProps2.y,
        o = _t$getProps2.base,
        s = _t$getProps2.width,
        a = _t$getProps2.height;

    var r, l, c, h, d;
    return t.horizontal ? (d = a / 2, r = Math.min(i, o), l = Math.max(i, o), c = n - d, h = n + d) : (d = s / 2, r = i - d, l = i + d, c = Math.min(n, o), h = Math.max(n, o)), {
      left: r,
      top: c,
      right: l,
      bottom: h
    };
  }

  function So(t) {
    var e = t.options.borderSkipped;
    var i = {};
    return e ? (e = t.horizontal ? Po(e, "left", "right", t.base > t.x) : Po(e, "bottom", "top", t.base < t.y), i[e] = !0, i) : i;
  }

  function Po(t, e, i, n) {
    var o, s, a;
    return n ? (a = i, t = Do(t = (o = t) === (s = e) ? a : o === a ? s : o, i, e)) : t = Do(t, e, i), t;
  }

  function Do(t, e, i) {
    return "start" === t ? e : "end" === t ? i : t;
  }

  function Co(t, e, i, n) {
    return t ? 0 : Math.max(Math.min(e, n), i);
  }

  function Ao(t) {
    var e = ko(t),
        i = e.right - e.left,
        n = e.bottom - e.top,
        o = function (t, e, i) {
      var n = t.options.borderWidth,
          o = So(t),
          s = Te(n);
      return {
        t: Co(o.top, s.top, 0, i),
        r: Co(o.right, s.right, 0, e),
        b: Co(o.bottom, s.bottom, 0, i),
        l: Co(o.left, s.left, 0, e)
      };
    }(t, i / 2, n / 2),
        s = function (t, e, i) {
      var n = Le(t.options.borderRadius),
          o = Math.min(e, i),
          s = So(t);
      return {
        topLeft: Co(s.top || s.left, n.topLeft, 0, o),
        topRight: Co(s.top || s.right, n.topRight, 0, o),
        bottomLeft: Co(s.bottom || s.left, n.bottomLeft, 0, o),
        bottomRight: Co(s.bottom || s.right, n.bottomRight, 0, o)
      };
    }(t, i / 2, n / 2);

    return {
      outer: {
        x: e.left,
        y: e.top,
        w: i,
        h: n,
        radius: s
      },
      inner: {
        x: e.left + o.l,
        y: e.top + o.t,
        w: i - o.l - o.r,
        h: n - o.t - o.b,
        radius: {
          topLeft: Math.max(0, s.topLeft - Math.max(o.t, o.l)),
          topRight: Math.max(0, s.topRight - Math.max(o.t, o.r)),
          bottomLeft: Math.max(0, s.bottomLeft - Math.max(o.b, o.l)),
          bottomRight: Math.max(0, s.bottomRight - Math.max(o.b, o.r))
        }
      }
    };
  }

  function Oo(t, e, i, n) {
    var o = null === e,
        s = null === i,
        a = t && !(o && s) && ko(t, n);
    return a && (o || e >= a.left && e <= a.right) && (s || i >= a.top && i <= a.bottom);
  }

  function To(t, e) {
    var i = e.x,
        n = e.y,
        o = e.w,
        s = e.h,
        a = e.radius;
    t.arc(i + a.topLeft, n + a.topLeft, a.topLeft, -Mt, xt, !0), t.lineTo(i, n + s - a.bottomLeft), t.arc(i + a.bottomLeft, n + s - a.bottomLeft, a.bottomLeft, xt, Mt, !0), t.lineTo(i + o - a.bottomRight, n + s), t.arc(i + o - a.bottomRight, n + s - a.bottomRight, a.bottomRight, Mt, 0, !0), t.lineTo(i + o, n + a.topRight), t.arc(i + o - a.topRight, n + a.topRight, a.topRight, 0, -Mt, !0), t.lineTo(i + a.topLeft, n);
  }

  function Lo(t, e) {
    t.rect(e.x, e.y, e.w, e.h);
  }

  wo.id = "point", wo.defaults = {
    borderWidth: 1,
    hitRadius: 1,
    hoverBorderWidth: 1,
    hoverRadius: 4,
    pointStyle: "circle",
    radius: 3,
    rotation: 0
  }, wo.defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
  };

  var Ro =
  /*#__PURE__*/
  function (_Oi5) {
    _inherits(Ro, _Oi5);

    function Ro(t) {
      var _this9;

      _classCallCheck(this, Ro);

      _this9 = _possibleConstructorReturn(this, _getPrototypeOf(Ro).call(this)), _this9.options = void 0, _this9.horizontal = void 0, _this9.base = void 0, _this9.width = void 0, _this9.height = void 0, t && Object.assign(_assertThisInitialized(_this9), t);
      return _this9;
    }

    _createClass(Ro, [{
      key: "draw",
      value: function draw(t) {
        var e = this.options,
            _Ao = Ao(this),
            i = _Ao.inner,
            n = _Ao.outer,
            o = (s = n.radius).topLeft || s.topRight || s.bottomLeft || s.bottomRight ? To : Lo;

        var s;
        t.save(), n.w === i.w && n.h === i.h || (t.beginPath(), o(t, n), t.clip(), o(t, i), t.fillStyle = e.borderColor, t.fill("evenodd")), t.beginPath(), o(t, i), t.fillStyle = e.backgroundColor, t.fill(), t.restore();
      }
    }, {
      key: "inRange",
      value: function inRange(t, e, i) {
        return Oo(this, t, e, i);
      }
    }, {
      key: "inXRange",
      value: function inXRange(t, e) {
        return Oo(this, t, null, e);
      }
    }, {
      key: "inYRange",
      value: function inYRange(t, e) {
        return Oo(this, null, t, e);
      }
    }, {
      key: "getCenterPoint",
      value: function getCenterPoint(t) {
        var _this$getProps6 = this.getProps(["x", "y", "base", "horizontal"], t),
            e = _this$getProps6.x,
            i = _this$getProps6.y,
            n = _this$getProps6.base,
            o = _this$getProps6.horizontal;

        return {
          x: o ? (e + n) / 2 : e,
          y: o ? i : (i + n) / 2
        };
      }
    }, {
      key: "getRange",
      value: function getRange(t) {
        return "x" === t ? this.width / 2 : this.height / 2;
      }
    }]);

    return Ro;
  }(Oi);

  Ro.id = "bar", Ro.defaults = {
    borderSkipped: "start",
    borderWidth: 0,
    borderRadius: 0,
    pointStyle: void 0
  }, Ro.defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
  };
  var Eo = Object.freeze({
    __proto__: null,
    ArcElement: go,
    LineElement: vo,
    PointElement: wo,
    BarElement: Ro
  });

  function Io(t) {
    t.data.datasets.forEach(function (t) {
      if (t._decimated) {
        var _e35 = t._data;
        delete t._decimated, delete t._data, Object.defineProperty(t, "data", {
          value: _e35
        });
      }
    });
  }

  var Fo = {
    id: "decimation",
    defaults: {
      algorithm: "min-max",
      enabled: !1
    },
    beforeElementsUpdate: function beforeElementsUpdate(t, e, i) {
      if (!i.enabled) return void Io(t);
      var n = t.width;
      t.data.datasets.forEach(function (e, o) {
        var s = e._data,
            a = e.indexAxis,
            r = t.getDatasetMeta(o),
            l = s || e.data;
        if ("y" === Ie([a, t.options.indexAxis])) return;
        if ("line" !== r.type) return;
        var c = t.scales[r.xAxisID];
        if ("linear" !== c.type && "time" !== c.type) return;
        if (t.options.parsing) return;
        if (l.length <= 4 * n) return;
        var h;

        switch ($(s) && (e._data = l, delete e.data, Object.defineProperty(e, "data", {
          configurable: !0,
          enumerable: !0,
          get: function get() {
            return this._decimated;
          },
          set: function set(t) {
            this._data = t;
          }
        })), i.algorithm) {
          case "lttb":
            h = function (t, e, i) {
              var n = i.samples || e,
                  o = [],
                  s = (t.length - 2) / (n - 2);
              var a,
                  r,
                  l,
                  c,
                  h,
                  d = 0,
                  u = 0;

              for (o[d++] = t[u], a = 0; a < n - 2; a++) {
                var _e36 = void 0,
                    _i51 = 0,
                    _n31 = 0;

                var _f4 = Math.floor((a + 1) * s) + 1,
                    _g3 = Math.min(Math.floor((a + 2) * s) + 1, t.length),
                    _p2 = _g3 - _f4;

                for (_e36 = _f4; _e36 < _g3; _e36++) {
                  _i51 = t[_e36].x, _n31 = t[_e36].y;
                }

                _i51 /= _p2, _n31 /= _p2;

                var _m4 = Math.floor(a * s) + 1,
                    _x4 = Math.floor((a + 1) * s) + 1,
                    _t$u = t[u],
                    _b3 = _t$u.x,
                    _2 = _t$u.y;

                for (l = c = -1, _e36 = _m4; _e36 < _x4; _e36++) {
                  c = .5 * Math.abs((_b3 - _i51) * (t[_e36].y - _2) - (_b3 - t[_e36].x) * (_n31 - _2)), c > l && (l = c, r = t[_e36], h = _e36);
                }

                o[d++] = r, u = h;
              }

              return o[d++] = t[t.length - 1], o;
            }(l, n, i);

            break;

          case "min-max":
            h = function (t, e) {
              var i,
                  n,
                  o,
                  s,
                  a,
                  r,
                  l,
                  c,
                  h,
                  d,
                  u = 0,
                  f = 0;
              var g = [],
                  p = t[0].x,
                  m = t[t.length - 1].x - p;

              for (i = 0; i < t.length; ++i) {
                n = t[i], o = (n.x - p) / m * e, s = n.y;

                var _x5 = 0 | o;

                if (_x5 === a) s < h ? (h = s, r = i) : s > d && (d = s, l = i), u = (f * u + n.x) / ++f;else {
                  var _e37 = i - 1;

                  if (!$(r) && !$(l)) {
                    var _i52 = Math.min(r, l),
                        _n32 = Math.max(r, l);

                    _i52 !== c && _i52 !== _e37 && g.push(_objectSpread({}, t[_i52], {
                      x: u
                    })), _n32 !== c && _n32 !== _e37 && g.push(_objectSpread({}, t[_n32], {
                      x: u
                    }));
                  }

                  i > 0 && _e37 !== c && g.push(t[_e37]), g.push(n), a = _x5, f = 0, h = d = s, r = l = c = i;
                }
              }

              return g;
            }(l, n);

            break;

          default:
            throw new Error("Unsupported decimation algorithm '".concat(i.algorithm, "'"));
        }

        e._decimated = h;
      });
    },
    destroy: function destroy(t) {
      Io(t);
    }
  };

  function zo(t, e, i) {
    var n = function (t) {
      var e = t.options,
          i = e.fill;
      var n = K(i && i.target, i);
      return void 0 === n && (n = !!e.backgroundColor), !1 !== n && null !== n && (!0 === n ? "origin" : n);
    }(t);

    if (U(n)) return !isNaN(n.value) && n;
    var o = parseFloat(n);
    return X(o) && Math.floor(o) === o ? ("-" !== n[0] && "+" !== n[0] || (o = e + o), !(o === e || o < 0 || o >= i) && o) : ["origin", "start", "end", "stack"].indexOf(n) >= 0 && n;
  }

  var Vo =
  /*#__PURE__*/
  function () {
    function Vo(t) {
      _classCallCheck(this, Vo);

      this.x = t.x, this.y = t.y, this.radius = t.radius;
    }

    _createClass(Vo, [{
      key: "pathSegment",
      value: function pathSegment(t, e, i) {
        var n = this.x,
            o = this.y,
            s = this.radius;
        return e = e || {
          start: 0,
          end: bt
        }, t.arc(n, o, s, e.end, e.start, !0), !i.bounds;
      }
    }, {
      key: "interpolate",
      value: function interpolate(t) {
        var e = this.x,
            i = this.y,
            n = this.radius,
            o = t.angle;
        return {
          x: e + Math.cos(o) * n,
          y: i + Math.sin(o) * n,
          angle: o
        };
      }
    }]);

    return Vo;
  }();

  function Bo(t) {
    return (t.scale || {}).getPointPositionForValue ? function (t) {
      var e = t.scale,
          i = t.fill,
          n = e.options,
          o = e.getLabels().length,
          s = [],
          a = n.reverse ? e.max : e.min,
          r = n.reverse ? e.min : e.max;
      var l, c, h;
      if (h = "start" === i ? a : "end" === i ? r : U(i) ? i.value : e.getBaseValue(), n.grid.circular) return c = e.getPointPositionForValue(0, a), new Vo({
        x: c.x,
        y: c.y,
        radius: e.getDistanceFromCenterForValue(h)
      });

      for (l = 0; l < o; ++l) {
        s.push(e.getPointPositionForValue(l, h));
      }

      return s;
    }(t) : function (t) {
      var _t$scale = t.scale,
          e = _t$scale === void 0 ? {} : _t$scale,
          i = t.fill;
      var n,
          o = null;
      return "start" === i ? o = e.bottom : "end" === i ? o = e.top : U(i) ? o = e.getPixelForValue(i.value) : e.getBasePixel && (o = e.getBasePixel()), X(o) ? (n = e.isHorizontal(), {
        x: n ? o : null,
        y: n ? null : o
      }) : null;
    }(t);
  }

  function Wo(t) {
    var e = t.chart,
        i = t.scale,
        n = t.index,
        o = t.line,
        s = [],
        a = o.segments,
        r = o.points,
        l = function (t, e) {
      var i = [],
          n = t.getSortedVisibleDatasetMetas();

      for (var _t41 = 0; _t41 < n.length; _t41++) {
        var _o26 = n[_t41];
        if (_o26.index === e) break;
        Ho(_o26) && i.unshift(_o26.dataset);
      }

      return i;
    }(e, n);

    l.push($o({
      x: null,
      y: i.bottom
    }, o));

    for (var _t42 = 0; _t42 < a.length; _t42++) {
      var _e38 = a[_t42];

      for (var _t43 = _e38.start; _t43 <= _e38.end; _t43++) {
        No(s, r[_t43], l);
      }
    }

    return new vo({
      points: s,
      options: {}
    });
  }

  var Ho = function Ho(t) {
    return "line" === t.type && !t.hidden;
  };

  function No(t, e, i) {
    var n = [];

    for (var _o27 = 0; _o27 < i.length; _o27++) {
      var _s18 = i[_o27],
          _jo = jo(_s18, e, "x"),
          _a23 = _jo.first,
          _r12 = _jo.last,
          _l19 = _jo.point;

      if (!(!_l19 || _a23 && _r12)) if (_a23) n.unshift(_l19);else if (t.push(_l19), !_r12) break;
    }

    t.push.apply(t, n);
  }

  function jo(t, e, i) {
    var n = t.interpolate(e, i);
    if (!n) return {};
    var o = n[i],
        s = t.segments,
        a = t.points;
    var r = !1,
        l = !1;

    for (var _t44 = 0; _t44 < s.length; _t44++) {
      var _e39 = s[_t44],
          _n33 = a[_e39.start][i],
          _c14 = a[_e39.end][i];

      if (o >= _n33 && o <= _c14) {
        r = o === _n33, l = o === _c14;
        break;
      }
    }

    return {
      first: r,
      last: l,
      point: n
    };
  }

  function $o(t, e) {
    var i = [],
        n = !1;
    return Y(t) ? (n = !0, i = t) : i = function (t, e) {
      var _ref11 = t || {},
          _ref11$x = _ref11.x,
          i = _ref11$x === void 0 ? null : _ref11$x,
          _ref11$y = _ref11.y,
          n = _ref11$y === void 0 ? null : _ref11$y,
          o = e.points,
          s = [];

      return e.segments.forEach(function (t) {
        var e = o[t.start],
            a = o[t.end];
        null !== n ? (s.push({
          x: e.x,
          y: n
        }), s.push({
          x: a.x,
          y: n
        })) : null !== i && (s.push({
          x: i,
          y: e.y
        }), s.push({
          x: i,
          y: a.y
        }));
      }), s;
    }(t, e), i.length ? new vo({
      points: i,
      options: {
        tension: 0
      },
      _loop: n,
      _fullLoop: n
    }) : null;
  }

  function Yo(t, e, i) {
    var n = t[e].fill;
    var o = [e];
    var s;
    if (!i) return n;

    for (; !1 !== n && -1 === o.indexOf(n);) {
      if (!X(n)) return n;
      if (s = t[n], !s) return !1;
      if (s.visible) return n;
      o.push(n), n = s.fill;
    }

    return !1;
  }

  function Uo(t, e, i) {
    t.beginPath(), e.path(t), t.lineTo(e.last().x, i), t.lineTo(e.first().x, i), t.closePath(), t.clip();
  }

  function Xo(t, e, i, n) {
    if (n) return;
    var o = e[t],
        s = i[t];
    return "angle" === t && (o = Bt(o), s = Bt(s)), {
      property: t,
      start: o,
      end: s
    };
  }

  function qo(t, e, i, n) {
    return t && e ? n(t[i], e[i]) : t ? t[i] : e ? e[i] : 0;
  }

  function Ko(t, e, i) {
    var _e$chart$chartArea = e.chart.chartArea,
        n = _e$chart$chartArea.top,
        o = _e$chart$chartArea.bottom,
        _ref12 = i || {},
        s = _ref12.property,
        a = _ref12.start,
        r = _ref12.end;

    "x" === s && (t.beginPath(), t.rect(a, n, r - a, o - n), t.clip());
  }

  function Go(t, e, i, n) {
    var o = e.interpolate(i, n);
    o && t.lineTo(o.x, o.y);
  }

  function Zo(t, e) {
    var i = e.line,
        n = e.target,
        o = e.property,
        s = e.color,
        a = e.scale,
        r = function (t, e, i) {
      var n = t.segments,
          o = t.points,
          s = e.points,
          a = [];

      for (var _t45 = 0; _t45 < n.length; _t45++) {
        var _r13 = n[_t45],
            _l20 = Xo(i, o[_r13.start], o[_r13.end], _r13.loop);

        if (!e.segments) {
          a.push({
            source: _r13,
            target: _l20,
            start: o[_r13.start],
            end: o[_r13.end]
          });
          continue;
        }

        var _c15 = _n(e, _l20);

        for (var _t46 = 0; _t46 < _c15.length; ++_t46) {
          var _e40 = _c15[_t46],
              _n34 = Xo(i, s[_e40.start], s[_e40.end], _e40.loop),
              _h14 = bn(_r13, o, _n34);

          for (var _t47 = 0; _t47 < _h14.length; _t47++) {
            a.push({
              source: _h14[_t47],
              target: _e40,
              start: _defineProperty({}, i, qo(_l20, _n34, "start", Math.max)),
              end: _defineProperty({}, i, qo(_l20, _n34, "end", Math.min))
            });
          }
        }
      }

      return a;
    }(i, n, o);

    t.fillStyle = s;

    for (var _e41 = 0, _s19 = r.length; _e41 < _s19; ++_e41) {
      var _r$_e = r[_e41],
          _s20 = _r$_e.source,
          _l21 = _r$_e.target,
          _c16 = _r$_e.start,
          _h15 = _r$_e.end;
      t.save(), Ko(t, a, Xo(o, _c16, _h15)), t.beginPath();

      var _d10 = !!i.pathSegment(t, _s20);

      _d10 ? t.closePath() : Go(t, n, _h15, o);

      var _u9 = !!n.pathSegment(t, _l21, {
        move: _d10,
        reverse: !0
      }),
          _f5 = _d10 && _u9;

      _f5 || Go(t, n, _c16, o), t.closePath(), t.fill(_f5 ? "evenodd" : "nonzero"), t.restore();
    }
  }

  var Qo = {
    id: "filler",
    afterDatasetsUpdate: function afterDatasetsUpdate(t, e, i) {
      var n = (t.data.datasets || []).length,
          o = i.propagate,
          s = [];
      var a, r, l, c;

      for (r = 0; r < n; ++r) {
        a = t.getDatasetMeta(r), l = a.dataset, c = null, l && l.options && l instanceof vo && (c = {
          visible: t.isDatasetVisible(r),
          index: r,
          fill: zo(l, r, n),
          chart: t,
          scale: a.vScale,
          line: l
        }), a.$filler = c, s.push(c);
      }

      for (r = 0; r < n; ++r) {
        c = s[r], c && !1 !== c.fill && (c.fill = Yo(s, r, o));
      }
    },
    beforeDatasetsDraw: function beforeDatasetsDraw(t) {
      var e = t.getSortedVisibleDatasetMetas(),
          i = t.chartArea;
      var n, o;

      for (n = e.length - 1; n >= 0; --n) {
        o = e[n].$filler, o && o.line.updateControlPoints(i);
      }
    },
    beforeDatasetDraw: function beforeDatasetDraw(t, e) {
      var i = t.chartArea,
          n = t.ctx,
          o = e.meta.$filler;
      if (!o || !1 === o.fill) return;

      var s = function (t) {
        var e = t.chart,
            i = t.fill,
            n = t.line;
        if (X(i)) return function (t, e) {
          var i = t.getDatasetMeta(e);
          return i && t.isDatasetVisible(e) ? i.dataset : null;
        }(e, i);
        if ("stack" === i) return Wo(t);
        var o = Bo(t);
        return o instanceof Vo ? o : $o(o, n);
      }(o),
          a = o.line,
          r = o.scale,
          l = a.options,
          c = l.fill,
          h = l.backgroundColor,
          _ref13 = c || {},
          _ref13$above = _ref13.above,
          d = _ref13$above === void 0 ? h : _ref13$above,
          _ref13$below = _ref13.below,
          u = _ref13$below === void 0 ? h : _ref13$below;

      s && a.points.length && (Gt(n, i), function (t, e) {
        var i = e.line,
            n = e.target,
            o = e.above,
            s = e.below,
            a = e.area,
            r = e.scale,
            l = i._loop ? "angle" : "x";
        t.save(), "x" === l && s !== o && (Uo(t, n, a.top), Zo(t, {
          line: i,
          target: n,
          color: o,
          scale: r,
          property: l
        }), t.restore(), t.save(), Uo(t, n, a.bottom)), Zo(t, {
          line: i,
          target: n,
          color: s,
          scale: r,
          property: l
        }), t.restore();
      }(n, {
        line: a,
        target: s,
        above: d,
        below: u,
        area: i,
        scale: r
      }), Zt(n));
    },
    defaults: {
      propagate: !0
    }
  };

  var Jo = function Jo(t, e) {
    var _t$boxHeight = t.boxHeight,
        i = _t$boxHeight === void 0 ? e : _t$boxHeight,
        _t$boxWidth = t.boxWidth,
        n = _t$boxWidth === void 0 ? e : _t$boxWidth;
    return t.usePointStyle && (i = Math.min(i, e), n = Math.min(n, e)), {
      boxWidth: n,
      boxHeight: i,
      itemHeight: Math.max(e, i)
    };
  };

  var ts =
  /*#__PURE__*/
  function (_Oi6) {
    _inherits(ts, _Oi6);

    function ts(t) {
      var _this10;

      _classCallCheck(this, ts);

      _this10 = _possibleConstructorReturn(this, _getPrototypeOf(ts).call(this)), _this10._added = !1, _this10.legendHitBoxes = [], _this10._hoveredItem = null, _this10.doughnutMode = !1, _this10.chart = t.chart, _this10.options = t.options, _this10.ctx = t.ctx, _this10.legendItems = void 0, _this10.columnSizes = void 0, _this10.lineWidths = void 0, _this10.maxHeight = void 0, _this10.maxWidth = void 0, _this10.top = void 0, _this10.bottom = void 0, _this10.left = void 0, _this10.right = void 0, _this10.height = void 0, _this10.width = void 0, _this10._margins = void 0, _this10.position = void 0, _this10.weight = void 0, _this10.fullSize = void 0;
      return _this10;
    }

    _createClass(ts, [{
      key: "update",
      value: function update(t, e, i) {
        var n = this;
        n.maxWidth = t, n.maxHeight = e, n._margins = i, n.setDimensions(), n.buildLabels(), n.fit();
      }
    }, {
      key: "setDimensions",
      value: function setDimensions() {
        var t = this;
        t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height);
      }
    }, {
      key: "buildLabels",
      value: function buildLabels() {
        var t = this,
            e = t.options.labels || {};
        var i = Q(e.generateLabels, [t.chart], t) || [];
        e.filter && (i = i.filter(function (i) {
          return e.filter(i, t.chart.data);
        })), e.sort && (i = i.sort(function (i, n) {
          return e.sort(i, n, t.chart.data);
        })), t.options.reverse && i.reverse(), t.legendItems = i;
      }
    }, {
      key: "fit",
      value: function fit() {
        var t = this,
            e = t.options,
            i = t.ctx;
        if (!e.display) return void (t.width = t.height = 0);

        var n = e.labels,
            o = Ee(n.font),
            s = o.size,
            a = t._computeTitleHeight(),
            _Jo = Jo(n, s),
            r = _Jo.boxWidth,
            l = _Jo.itemHeight;

        var c, h;
        i.font = o.string, t.isHorizontal() ? (c = t.maxWidth, h = t._fitRows(a, s, r, l) + 10) : (h = t.maxHeight, c = t._fitCols(a, s, r, l) + 10), t.width = Math.min(c, e.maxWidth || t.maxWidth), t.height = Math.min(h, e.maxHeight || t.maxHeight);
      }
    }, {
      key: "_fitRows",
      value: function _fitRows(t, e, i, n) {
        var o = this,
            s = o.ctx,
            a = o.maxWidth,
            r = o.options.labels.padding,
            l = o.legendHitBoxes = [],
            c = o.lineWidths = [0],
            h = n + r;
        var d = t;
        s.textAlign = "left", s.textBaseline = "middle";
        var u = -1,
            f = -h;
        return o.legendItems.forEach(function (t, o) {
          var g = i + e / 2 + s.measureText(t.text).width;
          (0 === o || c[c.length - 1] + g + 2 * r > a) && (d += h, c[c.length - (o > 0 ? 0 : 1)] = 0, f += h, u++), l[o] = {
            left: 0,
            top: f,
            row: u,
            width: g,
            height: n
          }, c[c.length - 1] += g + r;
        }), d;
      }
    }, {
      key: "_fitCols",
      value: function _fitCols(t, e, i, n) {
        var o = this,
            s = o.ctx,
            a = o.maxHeight,
            r = o.options.labels.padding,
            l = o.legendHitBoxes = [],
            c = o.columnSizes = [],
            h = a - t;
        var d = r,
            u = 0,
            f = 0,
            g = 0,
            p = 0,
            m = 0;
        return o.legendItems.forEach(function (t, o) {
          var a = i + e / 2 + s.measureText(t.text).width;
          o > 0 && f + e + 2 * r > h && (d += u + r, c.push({
            width: u,
            height: f
          }), g += u + r, m++, p = 0, u = f = 0), u = Math.max(u, a), f += e + r, l[o] = {
            left: g,
            top: p,
            col: m,
            width: a,
            height: n
          }, p += n + r;
        }), d += u, c.push({
          width: u,
          height: f
        }), d;
      }
    }, {
      key: "adjustHitBoxes",
      value: function adjustHitBoxes() {
        var t = this;
        if (!t.options.display) return;

        var e = t._computeTitleHeight(),
            i = t.legendHitBoxes,
            _t$options2 = t.options,
            n = _t$options2.align,
            s = _t$options2.labels.padding;

        if (this.isHorizontal()) {
          var _a24 = 0,
              _r14 = o(n, t.left + s, t.right - t.lineWidths[_a24]);

          var _iteratorNormalCompletion13 = true;
          var _didIteratorError13 = false;
          var _iteratorError13 = undefined;

          try {
            for (var _iterator13 = i[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
              var _l22 = _step13.value;
              _a24 !== _l22.row && (_a24 = _l22.row, _r14 = o(n, t.left + s, t.right - t.lineWidths[_a24])), _l22.top += t.top + e + s, _l22.left = _r14, _r14 += _l22.width + s;
            }
          } catch (err) {
            _didIteratorError13 = true;
            _iteratorError13 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
                _iterator13["return"]();
              }
            } finally {
              if (_didIteratorError13) {
                throw _iteratorError13;
              }
            }
          }
        } else {
          var _a25 = 0,
              _r15 = o(n, t.top + e + s, t.bottom - t.columnSizes[_a25].height);

          var _iteratorNormalCompletion14 = true;
          var _didIteratorError14 = false;
          var _iteratorError14 = undefined;

          try {
            for (var _iterator14 = i[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
              var _l23 = _step14.value;
              _l23.col !== _a25 && (_a25 = _l23.col, _r15 = o(n, t.top + e + s, t.bottom - t.columnSizes[_a25].height)), _l23.top = _r15, _l23.left += t.left + s, _r15 += _l23.height + s;
            }
          } catch (err) {
            _didIteratorError14 = true;
            _iteratorError14 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
                _iterator14["return"]();
              }
            } finally {
              if (_didIteratorError14) {
                throw _iteratorError14;
              }
            }
          }
        }
      }
    }, {
      key: "isHorizontal",
      value: function isHorizontal() {
        return "top" === this.options.position || "bottom" === this.options.position;
      }
    }, {
      key: "draw",
      value: function draw() {
        var t = this;

        if (t.options.display) {
          var _e42 = t.ctx;
          Gt(_e42, t), t._draw(), Zt(_e42);
        }
      }
    }, {
      key: "_draw",
      value: function _draw() {
        var t = this,
            e = t.options,
            i = t.columnSizes,
            n = t.lineWidths,
            a = t.ctx,
            r = e.align,
            l = e.labels,
            c = mt.color,
            h = fn(e.rtl, t.left, t.width),
            d = Ee(l.font),
            u = l.color,
            f = l.padding,
            g = d.size,
            p = g / 2;
        var m;
        t.drawTitle(), a.textAlign = h.textAlign("left"), a.textBaseline = "middle", a.lineWidth = .5, a.strokeStyle = u, a.fillStyle = u, a.font = d.string;

        var _Jo2 = Jo(l, g),
            x = _Jo2.boxWidth,
            b = _Jo2.boxHeight,
            _ = _Jo2.itemHeight,
            y = t.isHorizontal(),
            v = this._computeTitleHeight();

        m = y ? {
          x: o(r, t.left + f, t.right - n[0]),
          y: t.top + f + v,
          line: 0
        } : {
          x: t.left + f,
          y: o(r, t.top + v + f, t.bottom - i[0].height),
          line: 0
        }, gn(t.ctx, e.textDirection);
        var M = _ + f;
        t.legendItems.forEach(function (e, u) {
          var w = a.measureText(e.text).width,
              k = h.textAlign(e.textAlign || (e.textAlign = l.textAlign)),
              S = x + g / 2 + w;
          var P = m.x,
              D = m.y;
          h.setWidth(t.width), y ? u > 0 && P + S + f > t.right && (D = m.y += M, m.line++, P = m.x = o(r, t.left + f, t.right - n[m.line])) : u > 0 && D + M > t.bottom && (P = m.x = P + i[m.line].width + f, m.line++, D = m.y = o(r, t.top + v + f, t.bottom - i[m.line].height));
          !function (t, e, i) {
            if (isNaN(x) || x <= 0 || isNaN(b) || b < 0) return;
            a.save();
            var n = K(i.lineWidth, 1);

            if (a.fillStyle = K(i.fillStyle, c), a.lineCap = K(i.lineCap, "butt"), a.lineDashOffset = K(i.lineDashOffset, 0), a.lineJoin = K(i.lineJoin, "miter"), a.lineWidth = n, a.strokeStyle = K(i.strokeStyle, c), a.setLineDash(K(i.lineDash, [])), l.usePointStyle) {
              var _o28 = {
                radius: x * Math.SQRT2 / 2,
                pointStyle: i.pointStyle,
                rotation: i.rotation,
                borderWidth: n
              },
                  _s21 = h.xPlus(t, x / 2);

              qt(a, _o28, _s21, e + p);
            } else {
              var _i53 = e + Math.max((g - b) / 2, 0);

              a.fillRect(h.leftForLtr(t, x), _i53, x, b), 0 !== n && a.strokeRect(h.leftForLtr(t, x), _i53, x, b);
            }

            a.restore();
          }(h.x(P), D, e), P = s(k, P + x + p, t.right), function (t, e, i) {
            te(a, i.text, t, e + _ / 2, d, {
              strikethrough: i.hidden,
              textAlign: i.textAlign
            });
          }(h.x(P), D, e), y ? m.x += S + f : m.y += M;
        }), pn(t.ctx, e.textDirection);
      }
    }, {
      key: "drawTitle",
      value: function drawTitle() {
        var t = this,
            e = t.options,
            i = e.title,
            s = Ee(i.font),
            a = Re(i.padding);
        if (!i.display) return;
        var r = fn(e.rtl, t.left, t.width),
            l = t.ctx,
            c = i.position,
            h = s.size / 2,
            d = a.top + h;
        var u,
            f = t.left,
            g = t.width;
        if (this.isHorizontal()) g = Math.max.apply(Math, _toConsumableArray(t.lineWidths)), u = t.top + d, f = o(e.align, f, t.right - g);else {
          var _i54 = t.columnSizes.reduce(function (t, e) {
            return Math.max(t, e.height);
          }, 0);

          u = d + o(e.align, t.top, t.bottom - _i54 - e.labels.padding - t._computeTitleHeight());
        }
        var p = o(c, f, f + g);
        l.textAlign = r.textAlign(n(c)), l.textBaseline = "middle", l.strokeStyle = i.color, l.fillStyle = i.color, l.font = s.string, te(l, i.text, p, u, s);
      }
    }, {
      key: "_computeTitleHeight",
      value: function _computeTitleHeight() {
        var t = this.options.title,
            e = Ee(t.font),
            i = Re(t.padding);
        return t.display ? e.lineHeight + i.height : 0;
      }
    }, {
      key: "_getLegendItemAt",
      value: function _getLegendItemAt(t, e) {
        var i = this;
        var n, o, s;
        if (t >= i.left && t <= i.right && e >= i.top && e <= i.bottom) for (s = i.legendHitBoxes, n = 0; n < s.length; ++n) {
          if (o = s[n], t >= o.left && t <= o.left + o.width && e >= o.top && e <= o.top + o.height) return i.legendItems[n];
        }
        return null;
      }
    }, {
      key: "handleEvent",
      value: function handleEvent(t) {
        var e = this,
            i = e.options;
        if (!function (t, e) {
          if ("mousemove" === t && (e.onHover || e.onLeave)) return !0;
          if (e.onClick && ("click" === t || "mouseup" === t)) return !0;
          return !1;
        }(t.type, i)) return;

        var n = e._getLegendItemAt(t.x, t.y);

        if ("mousemove" === t.type) {
          var _a26 = e._hoveredItem,
              _r16 = (s = n, null !== (o = _a26) && null !== s && o.datasetIndex === s.datasetIndex && o.index === s.index);

          _a26 && !_r16 && Q(i.onLeave, [t, _a26, e], e), e._hoveredItem = n, n && !_r16 && Q(i.onHover, [t, n, e], e);
        } else n && Q(i.onClick, [t, n, e], e);

        var o, s;
      }
    }]);

    return ts;
  }(Oi);

  var es = {
    id: "legend",
    _element: ts,
    start: function start(t, e, i) {
      var n = t.legend = new ts({
        ctx: t.ctx,
        options: i,
        chart: t
      });
      Xe.configure(t, n, i), Xe.addBox(t, n);
    },
    stop: function stop(t) {
      Xe.removeBox(t, t.legend), delete t.legend;
    },
    beforeUpdate: function beforeUpdate(t, e, i) {
      var n = t.legend;
      Xe.configure(t, n, i), n.options = i;
    },
    afterUpdate: function afterUpdate(t) {
      var e = t.legend;
      e.buildLabels(), e.adjustHitBoxes();
    },
    afterEvent: function afterEvent(t, e) {
      e.replay || t.legend.handleEvent(e.event);
    },
    defaults: {
      display: !0,
      position: "top",
      align: "center",
      fullSize: !0,
      reverse: !1,
      weight: 1e3,
      onClick: function onClick(t, e, i) {
        var n = e.datasetIndex,
            o = i.chart;
        o.isDatasetVisible(n) ? (o.hide(n), e.hidden = !0) : (o.show(n), e.hidden = !1);
      },
      onHover: null,
      onLeave: null,
      labels: {
        color: function color(t) {
          return t.chart.options.color;
        },
        boxWidth: 40,
        padding: 10,
        generateLabels: function generateLabels(t) {
          var e = t.data.datasets,
              _t$legend$options$lab = t.legend.options.labels,
              i = _t$legend$options$lab.usePointStyle,
              n = _t$legend$options$lab.pointStyle,
              o = _t$legend$options$lab.textAlign;
          return t._getSortedDatasetMetas().map(function (t) {
            var s = t.controller.getStyle(i ? 0 : void 0),
                a = Re(s.borderWidth);
            return {
              text: e[t.index].label,
              fillStyle: s.backgroundColor,
              hidden: !t.visible,
              lineCap: s.borderCapStyle,
              lineDash: s.borderDash,
              lineDashOffset: s.borderDashOffset,
              lineJoin: s.borderJoinStyle,
              lineWidth: (a.width + a.height) / 4,
              strokeStyle: s.borderColor,
              pointStyle: n || s.pointStyle,
              rotation: s.rotation,
              textAlign: o || s.textAlign,
              datasetIndex: t.index
            };
          }, this);
        }
      },
      title: {
        color: function color(t) {
          return t.chart.options.color;
        },
        display: !1,
        position: "center",
        text: ""
      }
    },
    descriptors: {
      _scriptable: function _scriptable(t) {
        return !t.startsWith("on");
      },
      labels: {
        _scriptable: function _scriptable(t) {
          return !["generateLabels", "filter", "sort"].includes(t);
        }
      }
    }
  };

  var is =
  /*#__PURE__*/
  function (_Oi7) {
    _inherits(is, _Oi7);

    function is(t) {
      var _this11;

      _classCallCheck(this, is);

      _this11 = _possibleConstructorReturn(this, _getPrototypeOf(is).call(this)), _this11.chart = t.chart, _this11.options = t.options, _this11.ctx = t.ctx, _this11._padding = void 0, _this11.top = void 0, _this11.bottom = void 0, _this11.left = void 0, _this11.right = void 0, _this11.width = void 0, _this11.height = void 0, _this11.position = void 0, _this11.weight = void 0, _this11.fullSize = void 0;
      return _this11;
    }

    _createClass(is, [{
      key: "update",
      value: function update(t, e) {
        var i = this,
            n = i.options;
        if (i.left = 0, i.top = 0, !n.display) return void (i.width = i.height = i.right = i.bottom = 0);
        i.width = i.right = t, i.height = i.bottom = e;
        var o = Y(n.text) ? n.text.length : 1;
        i._padding = Re(n.padding);

        var s = o * Ee(n.font).lineHeight + i._padding.height;

        i.isHorizontal() ? i.height = s : i.width = s;
      }
    }, {
      key: "isHorizontal",
      value: function isHorizontal() {
        var t = this.options.position;
        return "top" === t || "bottom" === t;
      }
    }, {
      key: "_drawArgs",
      value: function _drawArgs(t) {
        var e = this.top,
            i = this.left,
            n = this.bottom,
            s = this.right,
            a = this.options,
            r = a.align;
        var l,
            c,
            h,
            d = 0;
        return this.isHorizontal() ? (c = o(r, i, s), h = e + t, l = s - i) : ("left" === a.position ? (c = i + t, h = o(r, n, e), d = -.5 * xt) : (c = s - t, h = o(r, e, n), d = .5 * xt), l = n - e), {
          titleX: c,
          titleY: h,
          maxWidth: l,
          rotation: d
        };
      }
    }, {
      key: "draw",
      value: function draw() {
        var t = this,
            e = t.ctx,
            i = t.options;
        if (!i.display) return;

        var o = Ee(i.font),
            s = o.lineHeight / 2 + t._padding.top,
            _t$_drawArgs = t._drawArgs(s),
            a = _t$_drawArgs.titleX,
            r = _t$_drawArgs.titleY,
            l = _t$_drawArgs.maxWidth,
            c = _t$_drawArgs.rotation;

        te(e, i.text, 0, 0, o, {
          color: i.color,
          maxWidth: l,
          rotation: c,
          textAlign: n(i.align),
          textBaseline: "middle",
          translation: [a, r]
        });
      }
    }]);

    return is;
  }(Oi);

  var ns = {
    id: "title",
    _element: is,
    start: function start(t, e, i) {
      !function (t, e) {
        var i = new is({
          ctx: t.ctx,
          options: e,
          chart: t
        });
        Xe.configure(t, i, e), Xe.addBox(t, i), t.titleBlock = i;
      }(t, i);
    },
    stop: function stop(t) {
      var e = t.titleBlock;
      Xe.removeBox(t, e), delete t.titleBlock;
    },
    beforeUpdate: function beforeUpdate(t, e, i) {
      var n = t.titleBlock;
      Xe.configure(t, n, i), n.options = i;
    },
    defaults: {
      align: "center",
      display: !1,
      font: {
        style: "bold"
      },
      fullSize: !0,
      padding: 10,
      position: "top",
      text: "",
      weight: 2e3
    },
    defaultRoutes: {
      color: "color"
    },
    descriptors: {
      _scriptable: !0,
      _indexable: !1
    }
  };
  var os = {
    average: function average(t) {
      if (!t.length) return !1;
      var e,
          i,
          n = 0,
          o = 0,
          s = 0;

      for (e = 0, i = t.length; e < i; ++e) {
        var _i55 = t[e].element;

        if (_i55 && _i55.hasValue()) {
          var _t48 = _i55.tooltipPosition();

          n += _t48.x, o += _t48.y, ++s;
        }
      }

      return {
        x: n / s,
        y: o / s
      };
    },
    nearest: function nearest(t, e) {
      var i,
          n,
          o,
          s = e.x,
          a = e.y,
          r = Number.POSITIVE_INFINITY;

      for (i = 0, n = t.length; i < n; ++i) {
        var _n35 = t[i].element;

        if (_n35 && _n35.hasValue()) {
          var _t49 = zt(e, _n35.getCenterPoint());

          _t49 < r && (r = _t49, o = _n35);
        }
      }

      if (o) {
        var _t50 = o.tooltipPosition();

        s = _t50.x, a = _t50.y;
      }

      return {
        x: s,
        y: a
      };
    }
  };

  function ss(t, e) {
    return e && (Y(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t;
  }

  function as(t) {
    return ("string" == typeof t || t instanceof String) && t.indexOf("\n") > -1 ? t.split("\n") : t;
  }

  function rs(t, e) {
    var i = e.element,
        n = e.datasetIndex,
        o = e.index,
        s = t.getDatasetMeta(n).controller,
        _s$getLabelAndValue = s.getLabelAndValue(o),
        a = _s$getLabelAndValue.label,
        r = _s$getLabelAndValue.value;

    return {
      chart: t,
      label: a,
      parsed: s.getParsed(o),
      raw: t.data.datasets[n].data[o],
      formattedValue: r,
      dataset: s.getDataset(),
      dataIndex: o,
      datasetIndex: n,
      element: i
    };
  }

  function ls(t, e) {
    var i = t._chart.ctx,
        n = t.body,
        o = t.footer,
        s = t.title,
        a = e.boxWidth,
        r = e.boxHeight,
        l = Ee(e.bodyFont),
        c = Ee(e.titleFont),
        h = Ee(e.footerFont),
        d = s.length,
        u = o.length,
        f = n.length,
        g = Re(e.padding);
    var p = g.height,
        m = 0,
        x = n.reduce(function (t, e) {
      return t + e.before.length + e.lines.length + e.after.length;
    }, 0);

    if (x += t.beforeBody.length + t.afterBody.length, d && (p += d * c.lineHeight + (d - 1) * e.titleSpacing + e.titleMarginBottom), x) {
      p += f * (e.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight) + (x - f) * l.lineHeight + (x - 1) * e.bodySpacing;
    }

    u && (p += e.footerMarginTop + u * h.lineHeight + (u - 1) * e.footerSpacing);
    var b = 0;

    var _ = function _(t) {
      m = Math.max(m, i.measureText(t).width + b);
    };

    return i.save(), i.font = c.string, J(t.title, _), i.font = l.string, J(t.beforeBody.concat(t.afterBody), _), b = e.displayColors ? a + 2 : 0, J(n, function (t) {
      J(t.before, _), J(t.lines, _), J(t.after, _);
    }), b = 0, i.font = h.string, J(t.footer, _), i.restore(), m += g.width, {
      width: m,
      height: p
    };
  }

  function cs(t, e, i, n) {
    var o = i.x,
        s = i.width,
        a = t.width,
        _t$chartArea = t.chartArea,
        r = _t$chartArea.left,
        l = _t$chartArea.right;
    var c = "center";
    return "center" === n ? c = o <= (r + l) / 2 ? "left" : "right" : o <= s / 2 ? c = "left" : o >= a - s / 2 && (c = "right"), function (t, e, i, n) {
      var o = n.x,
          s = n.width,
          a = i.caretSize + i.caretPadding;
      return "left" === t && o + s + a > e.width || "right" === t && o - s - a < 0 || void 0;
    }(c, t, e, i) && (c = "center"), c;
  }

  function hs(t, e, i) {
    var n = e.yAlign || function (t, e) {
      var i = e.y,
          n = e.height;
      return i < n / 2 ? "top" : i > t.height - n / 2 ? "bottom" : "center";
    }(t, i);

    return {
      xAlign: e.xAlign || cs(t, e, i, n),
      yAlign: n
    };
  }

  function ds(t, e, i, n) {
    var o = t.caretSize,
        s = t.caretPadding,
        a = t.cornerRadius,
        r = i.xAlign,
        l = i.yAlign,
        c = o + s,
        h = a + s;

    var d = function (t, e) {
      var i = t.x,
          n = t.width;
      return "right" === e ? i -= n : "center" === e && (i -= n / 2), i;
    }(e, r);

    var u = function (t, e, i) {
      var n = t.y,
          o = t.height;
      return "top" === e ? n += i : n -= "bottom" === e ? o + i : o / 2, n;
    }(e, l, c);

    return "center" === l ? "left" === r ? d += c : "right" === r && (d -= c) : "left" === r ? d -= h : "right" === r && (d += h), {
      x: Ht(d, 0, n.width - e.width),
      y: Ht(u, 0, n.height - e.height)
    };
  }

  function us(t, e, i) {
    var n = Re(i.padding);
    return "center" === e ? t.x + t.width / 2 : "right" === e ? t.x + t.width - n.right : t.x + n.left;
  }

  function fs(t) {
    return ss([], as(t));
  }

  function gs(t, e) {
    var i = e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks;
    return i ? t.override(i) : t;
  }

  var ps =
  /*#__PURE__*/
  function (_Oi8) {
    _inherits(ps, _Oi8);

    function ps(t) {
      var _this12;

      _classCallCheck(this, ps);

      _this12 = _possibleConstructorReturn(this, _getPrototypeOf(ps).call(this)), _this12.opacity = 0, _this12._active = [], _this12._chart = t._chart, _this12._eventPosition = void 0, _this12._size = void 0, _this12._cachedAnimations = void 0, _this12._tooltipItems = [], _this12.$animations = void 0, _this12.$context = void 0, _this12.options = t.options, _this12.dataPoints = void 0, _this12.title = void 0, _this12.beforeBody = void 0, _this12.body = void 0, _this12.afterBody = void 0, _this12.footer = void 0, _this12.xAlign = void 0, _this12.yAlign = void 0, _this12.x = void 0, _this12.y = void 0, _this12.height = void 0, _this12.width = void 0, _this12.caretX = void 0, _this12.caretY = void 0, _this12.labelColors = void 0, _this12.labelPointStyles = void 0, _this12.labelTextColors = void 0;
      return _this12;
    }

    _createClass(ps, [{
      key: "initialize",
      value: function initialize(t) {
        this.options = t, this._cachedAnimations = void 0, this.$context = void 0;
      }
    }, {
      key: "_resolveAnimations",
      value: function _resolveAnimations() {
        var t = this,
            e = t._cachedAnimations;
        if (e) return e;
        var i = t._chart,
            n = t.options.setContext(t.getContext()),
            o = n.enabled && i.options.animation && n.animations,
            s = new bi(t._chart, o);
        return o._cacheable && (t._cachedAnimations = Object.freeze(s)), s;
      }
    }, {
      key: "getContext",
      value: function getContext() {
        var t = this;
        return t.$context || (t.$context = (e = t._chart.getContext(), i = t, n = t._tooltipItems, Object.assign(Object.create(e), {
          tooltip: i,
          tooltipItems: n,
          type: "tooltip"
        })));
        var e, i, n;
      }
    }, {
      key: "getTitle",
      value: function getTitle(t, e) {
        var i = this,
            n = e.callbacks,
            o = n.beforeTitle.apply(i, [t]),
            s = n.title.apply(i, [t]),
            a = n.afterTitle.apply(i, [t]);
        var r = [];
        return r = ss(r, as(o)), r = ss(r, as(s)), r = ss(r, as(a)), r;
      }
    }, {
      key: "getBeforeBody",
      value: function getBeforeBody(t, e) {
        return fs(e.callbacks.beforeBody.apply(this, [t]));
      }
    }, {
      key: "getBody",
      value: function getBody(t, e) {
        var i = this,
            n = e.callbacks,
            o = [];
        return J(t, function (t) {
          var e = {
            before: [],
            lines: [],
            after: []
          },
              s = gs(n, t);
          ss(e.before, as(s.beforeLabel.call(i, t))), ss(e.lines, s.label.call(i, t)), ss(e.after, as(s.afterLabel.call(i, t))), o.push(e);
        }), o;
      }
    }, {
      key: "getAfterBody",
      value: function getAfterBody(t, e) {
        return fs(e.callbacks.afterBody.apply(this, [t]));
      }
    }, {
      key: "getFooter",
      value: function getFooter(t, e) {
        var i = this,
            n = e.callbacks,
            o = n.beforeFooter.apply(i, [t]),
            s = n.footer.apply(i, [t]),
            a = n.afterFooter.apply(i, [t]);
        var r = [];
        return r = ss(r, as(o)), r = ss(r, as(s)), r = ss(r, as(a)), r;
      }
    }, {
      key: "_createItems",
      value: function _createItems(t) {
        var e = this,
            i = e._active,
            n = e._chart.data,
            o = [],
            s = [],
            a = [];
        var r,
            l,
            c = [];

        for (r = 0, l = i.length; r < l; ++r) {
          c.push(rs(e._chart, i[r]));
        }

        return t.filter && (c = c.filter(function (e, i, o) {
          return t.filter(e, i, o, n);
        })), t.itemSort && (c = c.sort(function (e, i) {
          return t.itemSort(e, i, n);
        })), J(c, function (i) {
          var n = gs(t.callbacks, i);
          o.push(n.labelColor.call(e, i)), s.push(n.labelPointStyle.call(e, i)), a.push(n.labelTextColor.call(e, i));
        }), e.labelColors = o, e.labelPointStyles = s, e.labelTextColors = a, e.dataPoints = c, c;
      }
    }, {
      key: "update",
      value: function update(t, e) {
        var i = this,
            n = i.options.setContext(i.getContext()),
            o = i._active;
        var s,
            a = [];

        if (o.length) {
          var _t51 = os[n.position].call(i, o, i._eventPosition);

          a = i._createItems(n), i.title = i.getTitle(a, n), i.beforeBody = i.getBeforeBody(a, n), i.body = i.getBody(a, n), i.afterBody = i.getAfterBody(a, n), i.footer = i.getFooter(a, n);

          var _e43 = i._size = ls(i, n),
              _r17 = Object.assign({}, _t51, _e43),
              _l24 = hs(i._chart, n, _r17),
              _c17 = ds(n, _r17, _l24, i._chart);

          i.xAlign = _l24.xAlign, i.yAlign = _l24.yAlign, s = {
            opacity: 1,
            x: _c17.x,
            y: _c17.y,
            width: _e43.width,
            height: _e43.height,
            caretX: _t51.x,
            caretY: _t51.y
          };
        } else 0 !== i.opacity && (s = {
          opacity: 0
        });

        i._tooltipItems = a, i.$context = void 0, s && i._resolveAnimations().update(i, s), t && n.external && n.external.call(i, {
          chart: i._chart,
          tooltip: i,
          replay: e
        });
      }
    }, {
      key: "drawCaret",
      value: function drawCaret(t, e, i, n) {
        var o = this.getCaretPosition(t, i, n);
        e.lineTo(o.x1, o.y1), e.lineTo(o.x2, o.y2), e.lineTo(o.x3, o.y3);
      }
    }, {
      key: "getCaretPosition",
      value: function getCaretPosition(t, e, i) {
        var n = this.xAlign,
            o = this.yAlign,
            s = i.cornerRadius,
            a = i.caretSize,
            r = t.x,
            l = t.y,
            c = e.width,
            h = e.height;
        var d, u, f, g, p, m;
        return "center" === o ? (p = l + h / 2, "left" === n ? (d = r, u = d - a, g = p + a, m = p - a) : (d = r + c, u = d + a, g = p - a, m = p + a), f = d) : (u = "left" === n ? r + s + a : "right" === n ? r + c - s - a : this.caretX, "top" === o ? (g = l, p = g - a, d = u - a, f = u + a) : (g = l + h, p = g + a, d = u + a, f = u - a), m = g), {
          x1: d,
          x2: u,
          x3: f,
          y1: g,
          y2: p,
          y3: m
        };
      }
    }, {
      key: "drawTitle",
      value: function drawTitle(t, e, i) {
        var n = this,
            o = n.title,
            s = o.length;
        var a, r, l;

        if (s) {
          var _c18 = fn(i.rtl, n.x, n.width);

          for (t.x = us(n, i.titleAlign, i), e.textAlign = _c18.textAlign(i.titleAlign), e.textBaseline = "middle", a = Ee(i.titleFont), r = i.titleSpacing, e.fillStyle = i.titleColor, e.font = a.string, l = 0; l < s; ++l) {
            e.fillText(o[l], _c18.x(t.x), t.y + a.lineHeight / 2), t.y += a.lineHeight + r, l + 1 === s && (t.y += i.titleMarginBottom - r);
          }
        }
      }
    }, {
      key: "_drawColorBox",
      value: function _drawColorBox(t, e, i, n, o) {
        var s = this,
            a = s.labelColors[i],
            r = s.labelPointStyles[i],
            l = o.boxHeight,
            c = o.boxWidth,
            h = Ee(o.bodyFont),
            d = us(s, "left", o),
            u = n.x(d),
            f = l < h.lineHeight ? (h.lineHeight - l) / 2 : 0,
            g = e.y + f;

        if (o.usePointStyle) {
          var _e44 = {
            radius: Math.min(c, l) / 2,
            pointStyle: r.pointStyle,
            rotation: r.rotation,
            borderWidth: 1
          },
              _i56 = n.leftForLtr(u, c) + c / 2,
              _s22 = g + l / 2;

          t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, qt(t, _e44, _i56, _s22), t.strokeStyle = a.borderColor, t.fillStyle = a.backgroundColor, qt(t, _e44, _i56, _s22);
        } else t.fillStyle = o.multiKeyBackground, t.fillRect(n.leftForLtr(u, c), g, c, l), t.lineWidth = 1, t.strokeStyle = a.borderColor, t.strokeRect(n.leftForLtr(u, c), g, c, l), t.fillStyle = a.backgroundColor, t.fillRect(n.leftForLtr(n.xPlus(u, 1), c - 2), g + 1, c - 2, l - 2);

        t.fillStyle = s.labelTextColors[i];
      }
    }, {
      key: "drawBody",
      value: function drawBody(t, e, i) {
        var n = this,
            o = n.body,
            s = i.bodySpacing,
            a = i.bodyAlign,
            r = i.displayColors,
            l = i.boxHeight,
            c = i.boxWidth,
            h = Ee(i.bodyFont);
        var d = h.lineHeight,
            u = 0;

        var f = fn(i.rtl, n.x, n.width),
            g = function g(i) {
          e.fillText(i, f.x(t.x + u), t.y + d / 2), t.y += d + s;
        },
            p = f.textAlign(a);

        var m, x, b, _, y, v, M;

        for (e.textAlign = a, e.textBaseline = "middle", e.font = h.string, t.x = us(n, p, i), e.fillStyle = i.bodyColor, J(n.beforeBody, g), u = r && "right" !== p ? "center" === a ? c / 2 + 1 : c + 2 : 0, _ = 0, v = o.length; _ < v; ++_) {
          for (m = o[_], x = n.labelTextColors[_], e.fillStyle = x, J(m.before, g), b = m.lines, r && b.length && (n._drawColorBox(e, t, _, f, i), d = Math.max(h.lineHeight, l)), y = 0, M = b.length; y < M; ++y) {
            g(b[y]), d = h.lineHeight;
          }

          J(m.after, g);
        }

        u = 0, d = h.lineHeight, J(n.afterBody, g), t.y -= s;
      }
    }, {
      key: "drawFooter",
      value: function drawFooter(t, e, i) {
        var n = this,
            o = n.footer,
            s = o.length;
        var a, r;

        if (s) {
          var _l25 = fn(i.rtl, n.x, n.width);

          for (t.x = us(n, i.footerAlign, i), t.y += i.footerMarginTop, e.textAlign = _l25.textAlign(i.footerAlign), e.textBaseline = "middle", a = Ee(i.footerFont), e.fillStyle = i.footerColor, e.font = a.string, r = 0; r < s; ++r) {
            e.fillText(o[r], _l25.x(t.x), t.y + a.lineHeight / 2), t.y += a.lineHeight + i.footerSpacing;
          }
        }
      }
    }, {
      key: "drawBackground",
      value: function drawBackground(t, e, i, n) {
        var o = this.xAlign,
            s = this.yAlign,
            a = t.x,
            r = t.y,
            l = i.width,
            c = i.height,
            h = n.cornerRadius;
        e.fillStyle = n.backgroundColor, e.strokeStyle = n.borderColor, e.lineWidth = n.borderWidth, e.beginPath(), e.moveTo(a + h, r), "top" === s && this.drawCaret(t, e, i, n), e.lineTo(a + l - h, r), e.quadraticCurveTo(a + l, r, a + l, r + h), "center" === s && "right" === o && this.drawCaret(t, e, i, n), e.lineTo(a + l, r + c - h), e.quadraticCurveTo(a + l, r + c, a + l - h, r + c), "bottom" === s && this.drawCaret(t, e, i, n), e.lineTo(a + h, r + c), e.quadraticCurveTo(a, r + c, a, r + c - h), "center" === s && "left" === o && this.drawCaret(t, e, i, n), e.lineTo(a, r + h), e.quadraticCurveTo(a, r, a + h, r), e.closePath(), e.fill(), n.borderWidth > 0 && e.stroke();
      }
    }, {
      key: "_updateAnimationTarget",
      value: function _updateAnimationTarget(t) {
        var e = this,
            i = e._chart,
            n = e.$animations,
            o = n && n.x,
            s = n && n.y;

        if (o || s) {
          var _n36 = os[t.position].call(e, e._active, e._eventPosition);

          if (!_n36) return;

          var _a27 = e._size = ls(e, t),
              _r18 = Object.assign({}, _n36, e._size),
              _l26 = hs(i, t, _r18),
              _c19 = ds(t, _r18, _l26, i);

          o._to === _c19.x && s._to === _c19.y || (e.xAlign = _l26.xAlign, e.yAlign = _l26.yAlign, e.width = _a27.width, e.height = _a27.height, e.caretX = _n36.x, e.caretY = _n36.y, e._resolveAnimations().update(e, _c19));
        }
      }
    }, {
      key: "draw",
      value: function draw(t) {
        var e = this,
            i = e.options.setContext(e.getContext());
        var n = e.opacity;
        if (!n) return;

        e._updateAnimationTarget(i);

        var o = {
          width: e.width,
          height: e.height
        },
            s = {
          x: e.x,
          y: e.y
        };
        n = Math.abs(n) < .001 ? 0 : n;
        var a = Re(i.padding),
            r = e.title.length || e.beforeBody.length || e.body.length || e.afterBody.length || e.footer.length;
        i.enabled && r && (t.save(), t.globalAlpha = n, e.drawBackground(s, t, o, i), gn(t, i.textDirection), s.y += a.top, e.drawTitle(s, t, i), e.drawBody(s, t, i), e.drawFooter(s, t, i), pn(t, i.textDirection), t.restore());
      }
    }, {
      key: "getActiveElements",
      value: function getActiveElements() {
        return this._active || [];
      }
    }, {
      key: "setActiveElements",
      value: function setActiveElements(t, e) {
        var i = this,
            n = i._active,
            o = t.map(function (_ref14) {
          var t = _ref14.datasetIndex,
              e = _ref14.index;

          var n = i._chart.getDatasetMeta(t);

          if (!n) throw new Error("Cannot find a dataset at index " + t);
          return {
            datasetIndex: t,
            element: n.data[e],
            index: e
          };
        }),
            s = !tt(n, o),
            a = i._positionChanged(o, e);

        (s || a) && (i._active = o, i._eventPosition = e, i.update(!0));
      }
    }, {
      key: "handleEvent",
      value: function handleEvent(t, e) {
        var i = this,
            n = i.options,
            o = i._active || [];
        var s = !1,
            a = [];
        "mouseout" !== t.type && (a = i._chart.getElementsAtEventForMode(t, n.mode, n, e), n.reverse && a.reverse());

        var r = i._positionChanged(a, t);

        return s = e || !tt(a, o) || r, s && (i._active = a, (n.enabled || n.external) && (i._eventPosition = {
          x: t.x,
          y: t.y
        }, i.update(!0, e))), s;
      }
    }, {
      key: "_positionChanged",
      value: function _positionChanged(t, e) {
        var i = this,
            n = os[i.options.position].call(i, t, e);
        return i.caretX !== n.x || i.caretY !== n.y;
      }
    }]);

    return ps;
  }(Oi);

  ps.positioners = os;
  var ms = {
    id: "tooltip",
    _element: ps,
    positioners: os,
    afterInit: function afterInit(t, e, i) {
      i && (t.tooltip = new ps({
        _chart: t,
        options: i
      }));
    },
    beforeUpdate: function beforeUpdate(t, e, i) {
      t.tooltip && t.tooltip.initialize(i);
    },
    reset: function reset(t, e, i) {
      t.tooltip && t.tooltip.initialize(i);
    },
    afterDraw: function afterDraw(t) {
      var e = t.tooltip,
          i = {
        tooltip: e
      };
      !1 !== t.notifyPlugins("beforeTooltipDraw", i) && (e && e.draw(t.ctx), t.notifyPlugins("afterTooltipDraw", i));
    },
    afterEvent: function afterEvent(t, e) {
      if (t.tooltip) {
        var _i57 = e.replay;
        t.tooltip.handleEvent(e.event, _i57) && (e.changed = !0);
      }
    },
    defaults: {
      enabled: !0,
      external: null,
      position: "average",
      backgroundColor: "rgba(0,0,0,0.8)",
      titleColor: "#fff",
      titleFont: {
        style: "bold"
      },
      titleSpacing: 2,
      titleMarginBottom: 6,
      titleAlign: "left",
      bodyColor: "#fff",
      bodySpacing: 2,
      bodyFont: {},
      bodyAlign: "left",
      footerColor: "#fff",
      footerSpacing: 2,
      footerMarginTop: 6,
      footerFont: {
        style: "bold"
      },
      footerAlign: "left",
      padding: 6,
      caretPadding: 2,
      caretSize: 5,
      cornerRadius: 6,
      boxHeight: function boxHeight(t, e) {
        return e.bodyFont.size;
      },
      boxWidth: function boxWidth(t, e) {
        return e.bodyFont.size;
      },
      multiKeyBackground: "#fff",
      displayColors: !0,
      borderColor: "rgba(0,0,0,0)",
      borderWidth: 0,
      animation: {
        duration: 400,
        easing: "easeOutQuart"
      },
      animations: {
        numbers: {
          type: "number",
          properties: ["x", "y", "width", "height", "caretX", "caretY"]
        },
        opacity: {
          easing: "linear",
          duration: 200
        }
      },
      callbacks: {
        beforeTitle: N,
        title: function title(t) {
          if (t.length > 0) {
            var _e45 = t[0],
                _i58 = _e45.chart.data.labels,
                _n37 = _i58 ? _i58.length : 0;

            if (this && this.options && "dataset" === this.options.mode) return _e45.dataset.label || "";
            if (_e45.label) return _e45.label;
            if (_n37 > 0 && _e45.dataIndex < _n37) return _i58[_e45.dataIndex];
          }

          return "";
        },
        afterTitle: N,
        beforeBody: N,
        beforeLabel: N,
        label: function label(t) {
          if (this && this.options && "dataset" === this.options.mode) return t.label + ": " + t.formattedValue || t.formattedValue;
          var e = t.dataset.label || "";
          e && (e += ": ");
          var i = t.formattedValue;
          return $(i) || (e += i), e;
        },
        labelColor: function labelColor(t) {
          var e = t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);
          return {
            borderColor: e.borderColor,
            backgroundColor: e.backgroundColor
          };
        },
        labelTextColor: function labelTextColor() {
          return this.options.bodyColor;
        },
        labelPointStyle: function labelPointStyle(t) {
          var e = t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);
          return {
            pointStyle: e.pointStyle,
            rotation: e.rotation
          };
        },
        afterLabel: N,
        afterBody: N,
        beforeFooter: N,
        footer: N,
        afterFooter: N
      }
    },
    defaultRoutes: {
      bodyFont: "font",
      footerFont: "font",
      titleFont: "font"
    },
    descriptors: {
      _scriptable: function _scriptable(t) {
        return "filter" !== t && "itemSort" !== t && "external" !== t;
      },
      _indexable: !1,
      callbacks: {
        _scriptable: !1,
        _indexable: !1
      },
      animation: {
        _fallback: !1
      },
      animations: {
        _fallback: "animation"
      }
    },
    additionalOptionScopes: ["interaction"]
  },
      xs = Object.freeze({
    __proto__: null,
    Decimation: Fo,
    Filler: Qo,
    Legend: es,
    Title: ns,
    Tooltip: ms
  });

  function bs(t, e, i) {
    var n = t.indexOf(e);
    if (-1 === n) return function (t, e, i) {
      return "string" == typeof e ? t.push(e) - 1 : isNaN(e) ? null : i;
    }(t, e, i);
    return n !== t.lastIndexOf(e) ? i : n;
  }

  var _s =
  /*#__PURE__*/
  function (_ji) {
    _inherits(_s, _ji);

    function _s(t) {
      var _this13;

      _classCallCheck(this, _s);

      _this13 = _possibleConstructorReturn(this, _getPrototypeOf(_s).call(this, t)), _this13._startValue = void 0, _this13._valueRange = 0;
      return _this13;
    }

    _createClass(_s, [{
      key: "parse",
      value: function parse(t, e) {
        if ($(t)) return null;
        var i = this.getLabels();
        return function (t, e) {
          return null === t ? null : Ht(Math.round(t), 0, e);
        }(e = isFinite(e) && i[e] === t ? e : bs(i, t, K(e, t)), i.length - 1);
      }
    }, {
      key: "determineDataLimits",
      value: function determineDataLimits() {
        var t = this,
            _t$getUserBounds2 = t.getUserBounds(),
            e = _t$getUserBounds2.minDefined,
            i = _t$getUserBounds2.maxDefined;

        var _t$getMinMax = t.getMinMax(!0),
            n = _t$getMinMax.min,
            o = _t$getMinMax.max;

        "ticks" === t.options.bounds && (e || (n = 0), i || (o = t.getLabels().length - 1)), t.min = n, t.max = o;
      }
    }, {
      key: "buildTicks",
      value: function buildTicks() {
        var t = this,
            e = t.min,
            i = t.max,
            n = t.options.offset,
            o = [];
        var s = t.getLabels();
        s = 0 === e && i === s.length - 1 ? s : s.slice(e, i + 1), t._valueRange = Math.max(s.length - (n ? 0 : 1), 1), t._startValue = t.min - (n ? .5 : 0);

        for (var _t52 = e; _t52 <= i; _t52++) {
          o.push({
            value: _t52
          });
        }

        return o;
      }
    }, {
      key: "getLabelForValue",
      value: function getLabelForValue(t) {
        var e = this.getLabels();
        return t >= 0 && t < e.length ? e[t] : t;
      }
    }, {
      key: "configure",
      value: function configure() {
        var t = this;
        _get2(_getPrototypeOf(_s.prototype), "configure", this).call(this), t.isHorizontal() || (t._reversePixels = !t._reversePixels);
      }
    }, {
      key: "getPixelForValue",
      value: function getPixelForValue(t) {
        var e = this;
        return "number" != typeof t && (t = e.parse(t)), null === t ? NaN : e.getPixelForDecimal((t - e._startValue) / e._valueRange);
      }
    }, {
      key: "getPixelForTick",
      value: function getPixelForTick(t) {
        var e = this.ticks;
        return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
      }
    }, {
      key: "getValueForPixel",
      value: function getValueForPixel(t) {
        var e = this;
        return Math.round(e._startValue + e.getDecimalForPixel(t) * e._valueRange);
      }
    }, {
      key: "getBasePixel",
      value: function getBasePixel() {
        return this.bottom;
      }
    }]);

    return _s;
  }(ji);

  _s.id = "category", _s.defaults = {
    ticks: {
      callback: _s.prototype.getLabelForValue
    }
  };

  var ys =
  /*#__PURE__*/
  function (_ji2) {
    _inherits(ys, _ji2);

    function ys(t) {
      var _this14;

      _classCallCheck(this, ys);

      _this14 = _possibleConstructorReturn(this, _getPrototypeOf(ys).call(this, t)), _this14.start = void 0, _this14.end = void 0, _this14._startValue = void 0, _this14._endValue = void 0, _this14._valueRange = 0;
      return _this14;
    }

    _createClass(ys, [{
      key: "parse",
      value: function parse(t, e) {
        return $(t) || ("number" == typeof t || t instanceof Number) && !isFinite(+t) ? null : +t;
      }
    }, {
      key: "handleTickRangeOptions",
      value: function handleTickRangeOptions() {
        var t = this,
            _t$options3 = t.options,
            e = _t$options3.beginAtZero,
            i = _t$options3.stacked,
            _t$getUserBounds3 = t.getUserBounds(),
            n = _t$getUserBounds3.minDefined,
            o = _t$getUserBounds3.maxDefined;

        var s = t.min,
            a = t.max;

        var r = function r(t) {
          return s = n ? s : t;
        },
            l = function l(t) {
          return a = o ? a : t;
        };

        if (e || i) {
          var _t53 = Pt(s),
              _e46 = Pt(a);

          _t53 < 0 && _e46 < 0 ? l(0) : _t53 > 0 && _e46 > 0 && r(0);
        }

        s === a && (l(a + 1), e || r(s - 1)), t.min = s, t.max = a;
      }
    }, {
      key: "getTickLimit",
      value: function getTickLimit() {
        var t = this,
            e = t.options.ticks;
        var i,
            n = e.maxTicksLimit,
            o = e.stepSize;
        return o ? i = Math.ceil(t.max / o) - Math.floor(t.min / o) + 1 : (i = t.computeTickLimit(), n = n || 11), n && (i = Math.min(n, i)), i;
      }
    }, {
      key: "computeTickLimit",
      value: function computeTickLimit() {
        return Number.POSITIVE_INFINITY;
      }
    }, {
      key: "buildTicks",
      value: function buildTicks() {
        var t = this,
            e = t.options,
            i = e.ticks;
        var n = t.getTickLimit();
        n = Math.max(2, n);

        var o = function (t, e) {
          var i = [],
              n = t.step,
              o = t.min,
              s = t.max,
              a = t.precision,
              r = t.count,
              l = t.maxTicks,
              c = n || 1,
              h = l - 1,
              d = e.min,
              u = e.max,
              f = !$(o),
              g = !$(s),
              p = !$(r);

          var m,
              x,
              b,
              _,
              y = Dt((u - d) / h / c) * c;

          if (y < 1e-14 && !f && !g) return [{
            value: d
          }, {
            value: u
          }];
          _ = Math.ceil(u / y) - Math.floor(d / y), _ > h && (y = Dt(_ * y / h / c) * c), $(a) || (m = Math.pow(10, a), y = Math.ceil(y * m) / m), x = Math.floor(d / y) * y, b = Math.ceil(u / y) * y, f && g && n && Tt((s - o) / n, y / 1e3) ? (_ = Math.min((s - o) / y, l), y = (s - o) / _, x = o, b = s) : p ? (x = f ? o : x, b = g ? s : b, _ = r - 1, y = (b - x) / _) : (_ = (b - x) / y, _ = Ot(_, Math.round(_), y / 1e3) ? Math.round(_) : Math.ceil(_)), m = Math.pow(10, $(a) ? It(y) : a), x = Math.round(x * m) / m, b = Math.round(b * m) / m;
          var v = 0;

          for (f && (i.push({
            value: o
          }), x <= o && v++, Ot(Math.round((x + v * y) * m) / m, o, y / 10) && v++); v < _; ++v) {
            i.push({
              value: Math.round((x + v * y) * m) / m
            });
          }

          return g ? Ot(i[i.length - 1].value, s, y / 10) ? i[i.length - 1].value = s : i.push({
            value: s
          }) : i.push({
            value: b
          }), i;
        }({
          maxTicks: n,
          min: e.min,
          max: e.max,
          precision: i.precision,
          step: i.stepSize,
          count: i.count
        }, Fe(t, e.grace));

        return "ticks" === e.bounds && Lt(o, t, "value"), e.reverse ? (o.reverse(), t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max), o;
      }
    }, {
      key: "configure",
      value: function configure() {
        var t = this,
            e = t.ticks;
        var i = t.min,
            n = t.max;

        if (_get2(_getPrototypeOf(ys.prototype), "configure", this).call(this), t.options.offset && e.length) {
          var _t54 = (n - i) / Math.max(e.length - 1, 1) / 2;

          i -= _t54, n += _t54;
        }

        t._startValue = i, t._endValue = n, t._valueRange = n - i;
      }
    }, {
      key: "getLabelForValue",
      value: function getLabelForValue(t) {
        return Li(t, this.chart.options.locale);
      }
    }]);

    return ys;
  }(ji);

  var vs =
  /*#__PURE__*/
  function (_ys) {
    _inherits(vs, _ys);

    function vs() {
      _classCallCheck(this, vs);

      return _possibleConstructorReturn(this, _getPrototypeOf(vs).apply(this, arguments));
    }

    _createClass(vs, [{
      key: "determineDataLimits",
      value: function determineDataLimits() {
        var t = this,
            _t$getMinMax2 = t.getMinMax(!0),
            e = _t$getMinMax2.min,
            i = _t$getMinMax2.max;

        t.min = X(e) ? e : 0, t.max = X(i) ? i : 1, t.handleTickRangeOptions();
      }
    }, {
      key: "computeTickLimit",
      value: function computeTickLimit() {
        var t = this;
        if (t.isHorizontal()) return Math.ceil(t.width / 40);

        var e = t._resolveTickFontOptions(0);

        return Math.ceil(t.height / e.lineHeight);
      }
    }, {
      key: "getPixelForValue",
      value: function getPixelForValue(t) {
        return null === t ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
      }
    }, {
      key: "getValueForPixel",
      value: function getValueForPixel(t) {
        return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
      }
    }]);

    return vs;
  }(ys);

  function Ms(t) {
    return 1 === t / Math.pow(10, Math.floor(St(t)));
  }

  vs.id = "linear", vs.defaults = {
    ticks: {
      callback: Ei.formatters.numeric
    }
  };

  var ws =
  /*#__PURE__*/
  function (_ji3) {
    _inherits(ws, _ji3);

    function ws(t) {
      var _this15;

      _classCallCheck(this, ws);

      _this15 = _possibleConstructorReturn(this, _getPrototypeOf(ws).call(this, t)), _this15.start = void 0, _this15.end = void 0, _this15._startValue = void 0, _this15._valueRange = 0;
      return _this15;
    }

    _createClass(ws, [{
      key: "parse",
      value: function parse(t, e) {
        var i = ys.prototype.parse.apply(this, [t, e]);
        if (0 !== i) return X(i) && i > 0 ? i : null;
        this._zero = !0;
      }
    }, {
      key: "determineDataLimits",
      value: function determineDataLimits() {
        var t = this,
            _t$getMinMax3 = t.getMinMax(!0),
            e = _t$getMinMax3.min,
            i = _t$getMinMax3.max;

        t.min = X(e) ? Math.max(0, e) : null, t.max = X(i) ? Math.max(0, i) : null, t.options.beginAtZero && (t._zero = !0), t.handleTickRangeOptions();
      }
    }, {
      key: "handleTickRangeOptions",
      value: function handleTickRangeOptions() {
        var t = this,
            _t$getUserBounds4 = t.getUserBounds(),
            e = _t$getUserBounds4.minDefined,
            i = _t$getUserBounds4.maxDefined;

        var n = t.min,
            o = t.max;

        var s = function s(t) {
          return n = e ? n : t;
        },
            a = function a(t) {
          return o = i ? o : t;
        },
            r = function r(t, e) {
          return Math.pow(10, Math.floor(St(t)) + e);
        };

        n === o && (n <= 0 ? (s(1), a(10)) : (s(r(n, -1)), a(r(o, 1)))), n <= 0 && s(r(o, -1)), o <= 0 && a(r(n, 1)), t._zero && t.min !== t._suggestedMin && n === r(t.min, 0) && s(r(n, -1)), t.min = n, t.max = o;
      }
    }, {
      key: "buildTicks",
      value: function buildTicks() {
        var t = this,
            e = t.options,
            i = function (t, e) {
          var i = Math.floor(St(e.max)),
              n = Math.ceil(e.max / Math.pow(10, i)),
              o = [];
          var s = q(t.min, Math.pow(10, Math.floor(St(e.min)))),
              a = Math.floor(St(s)),
              r = Math.floor(s / Math.pow(10, a)),
              l = a < 0 ? Math.pow(10, Math.abs(a)) : 1;

          do {
            o.push({
              value: s,
              major: Ms(s)
            }), ++r, 10 === r && (r = 1, ++a, l = a >= 0 ? 1 : l), s = Math.round(r * Math.pow(10, a) * l) / l;
          } while (a < i || a === i && r < n);

          var c = q(t.max, s);
          return o.push({
            value: c,
            major: Ms(s)
          }), o;
        }({
          min: t._userMin,
          max: t._userMax
        }, t);

        return "ticks" === e.bounds && Lt(i, t, "value"), e.reverse ? (i.reverse(), t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max), i;
      }
    }, {
      key: "getLabelForValue",
      value: function getLabelForValue(t) {
        return void 0 === t ? "0" : Li(t, this.chart.options.locale);
      }
    }, {
      key: "configure",
      value: function configure() {
        var t = this,
            e = t.min;
        _get2(_getPrototypeOf(ws.prototype), "configure", this).call(this), t._startValue = St(e), t._valueRange = St(t.max) - St(e);
      }
    }, {
      key: "getPixelForValue",
      value: function getPixelForValue(t) {
        var e = this;
        return void 0 !== t && 0 !== t || (t = e.min), null === t || isNaN(t) ? NaN : e.getPixelForDecimal(t === e.min ? 0 : (St(t) - e._startValue) / e._valueRange);
      }
    }, {
      key: "getValueForPixel",
      value: function getValueForPixel(t) {
        var e = this,
            i = e.getDecimalForPixel(t);
        return Math.pow(10, e._startValue + i * e._valueRange);
      }
    }]);

    return ws;
  }(ji);

  function ks(t) {
    var e = t.ticks;

    if (e.display && t.display) {
      var _t55 = Re(e.backdropPadding);

      return K(e.font && e.font.size, mt.font.size) + _t55.height;
    }

    return 0;
  }

  function Ss(t, e, i, n, o) {
    return t === n || t === o ? {
      start: e - i / 2,
      end: e + i / 2
    } : t < n || t > o ? {
      start: e - i,
      end: e
    } : {
      start: e,
      end: e + i
    };
  }

  function Ps(t) {
    return 0 === t || 180 === t ? "center" : t < 180 ? "left" : "right";
  }

  function Ds(t, e, i) {
    90 === t || 270 === t ? i.y -= e.h / 2 : (t > 270 || t < 90) && (i.y -= e.h);
  }

  function Cs(t, e, i, n) {
    var o = t.ctx;
    if (i) o.arc(t.xCenter, t.yCenter, e, 0, bt);else {
      var _i59 = t.getPointPosition(0, e);

      o.moveTo(_i59.x, _i59.y);

      for (var _s23 = 1; _s23 < n; _s23++) {
        _i59 = t.getPointPosition(_s23, e), o.lineTo(_i59.x, _i59.y);
      }
    }
  }

  function As(t) {
    return At(t) ? t : 0;
  }

  ws.id = "logarithmic", ws.defaults = {
    ticks: {
      callback: Ei.formatters.logarithmic,
      major: {
        enabled: !0
      }
    }
  };

  var Os =
  /*#__PURE__*/
  function (_ys2) {
    _inherits(Os, _ys2);

    function Os(t) {
      var _this16;

      _classCallCheck(this, Os);

      _this16 = _possibleConstructorReturn(this, _getPrototypeOf(Os).call(this, t)), _this16.xCenter = void 0, _this16.yCenter = void 0, _this16.drawingArea = void 0, _this16._pointLabels = [], _this16._pointLabelItems = [];
      return _this16;
    }

    _createClass(Os, [{
      key: "setDimensions",
      value: function setDimensions() {
        var t = this;
        t.width = t.maxWidth, t.height = t.maxHeight, t.paddingTop = ks(t.options) / 2, t.xCenter = Math.floor(t.width / 2), t.yCenter = Math.floor((t.height - t.paddingTop) / 2), t.drawingArea = Math.min(t.height - t.paddingTop, t.width) / 2;
      }
    }, {
      key: "determineDataLimits",
      value: function determineDataLimits() {
        var t = this,
            _t$getMinMax4 = t.getMinMax(!1),
            e = _t$getMinMax4.min,
            i = _t$getMinMax4.max;

        t.min = X(e) && !isNaN(e) ? e : 0, t.max = X(i) && !isNaN(i) ? i : 0, t.handleTickRangeOptions();
      }
    }, {
      key: "computeTickLimit",
      value: function computeTickLimit() {
        return Math.ceil(this.drawingArea / ks(this.options));
      }
    }, {
      key: "generateTickLabels",
      value: function generateTickLabels(t) {
        var e = this;
        ys.prototype.generateTickLabels.call(e, t), e._pointLabels = e.getLabels().map(function (t, i) {
          var n = Q(e.options.pointLabels.callback, [t, i], e);
          return n || 0 === n ? n : "";
        });
      }
    }, {
      key: "fit",
      value: function fit() {
        var t = this,
            e = t.options;
        e.display && e.pointLabels.display ? function (t) {
          var e = {
            l: 0,
            r: t.width,
            t: 0,
            b: t.height - t.paddingTop
          },
              i = {};
          var n, o, s;
          var a = [],
              r = [],
              l = t.getLabels().length;

          for (n = 0; n < l; n++) {
            var _l27 = t.options.pointLabels.setContext(t.getContext(n));

            r[n] = _l27.padding, s = t.getPointPosition(n, t.drawingArea + r[n]);

            var _u10 = Ee(_l27.font);

            t.ctx.font = _u10.string, c = t.ctx, h = _u10.lineHeight, o = Y(d = t._pointLabels[n]) ? {
              w: Yt(c, c.font, d),
              h: d.length * h
            } : {
              w: c.measureText(d).width,
              h: h
            }, a[n] = o;

            var _f6 = t.getIndexAngle(n),
                _g4 = Et(_f6),
                _p3 = Ss(_g4, s.x, o.w, 0, 180),
                _m5 = Ss(_g4, s.y, o.h, 90, 270);

            _p3.start < e.l && (e.l = _p3.start, i.l = _f6), _p3.end > e.r && (e.r = _p3.end, i.r = _f6), _m5.start < e.t && (e.t = _m5.start, i.t = _f6), _m5.end > e.b && (e.b = _m5.end, i.b = _f6);
          }

          var c, h, d;
          t._setReductions(t.drawingArea, e, i), t._pointLabelItems = [];
          var u = t.options,
              f = ks(u),
              g = t.getDistanceFromCenterForValue(u.ticks.reverse ? t.min : t.max);

          for (n = 0; n < l; n++) {
            var _e47 = 0 === n ? f / 2 : 0,
                _i60 = t.getPointPosition(n, g + _e47 + r[n]),
                _o29 = Et(t.getIndexAngle(n)),
                _s24 = a[n];

            Ds(_o29, _s24, _i60);

            var _l28 = Ps(_o29);

            var _c20 = void 0;

            _c20 = "left" === _l28 ? _i60.x : "center" === _l28 ? _i60.x - _s24.w / 2 : _i60.x - _s24.w;

            var _h16 = _c20 + _s24.w;

            t._pointLabelItems[n] = {
              x: _i60.x,
              y: _i60.y,
              textAlign: _l28,
              left: _c20,
              top: _i60.y,
              right: _h16,
              bottom: _i60.y + _s24.h
            };
          }
        }(t) : t.setCenterPoint(0, 0, 0, 0);
      }
    }, {
      key: "_setReductions",
      value: function _setReductions(t, e, i) {
        var n = this;
        var o = e.l / Math.sin(i.l),
            s = Math.max(e.r - n.width, 0) / Math.sin(i.r),
            a = -e.t / Math.cos(i.t),
            r = -Math.max(e.b - (n.height - n.paddingTop), 0) / Math.cos(i.b);
        o = As(o), s = As(s), a = As(a), r = As(r), n.drawingArea = Math.max(t / 2, Math.min(Math.floor(t - (o + s) / 2), Math.floor(t - (a + r) / 2))), n.setCenterPoint(o, s, a, r);
      }
    }, {
      key: "setCenterPoint",
      value: function setCenterPoint(t, e, i, n) {
        var o = this,
            s = o.width - e - o.drawingArea,
            a = t + o.drawingArea,
            r = i + o.drawingArea,
            l = o.height - o.paddingTop - n - o.drawingArea;
        o.xCenter = Math.floor((a + s) / 2 + o.left), o.yCenter = Math.floor((r + l) / 2 + o.top + o.paddingTop);
      }
    }, {
      key: "getIndexAngle",
      value: function getIndexAngle(t) {
        return Bt(t * (bt / this.getLabels().length) + Rt(this.options.startAngle || 0));
      }
    }, {
      key: "getDistanceFromCenterForValue",
      value: function getDistanceFromCenterForValue(t) {
        var e = this;
        if ($(t)) return NaN;
        var i = e.drawingArea / (e.max - e.min);
        return e.options.reverse ? (e.max - t) * i : (t - e.min) * i;
      }
    }, {
      key: "getValueForDistanceFromCenter",
      value: function getValueForDistanceFromCenter(t) {
        if ($(t)) return NaN;
        var e = this,
            i = t / (e.drawingArea / (e.max - e.min));
        return e.options.reverse ? e.max - i : e.min + i;
      }
    }, {
      key: "getPointPosition",
      value: function getPointPosition(t, e) {
        var i = this,
            n = i.getIndexAngle(t) - Mt;
        return {
          x: Math.cos(n) * e + i.xCenter,
          y: Math.sin(n) * e + i.yCenter,
          angle: n
        };
      }
    }, {
      key: "getPointPositionForValue",
      value: function getPointPositionForValue(t, e) {
        return this.getPointPosition(t, this.getDistanceFromCenterForValue(e));
      }
    }, {
      key: "getBasePosition",
      value: function getBasePosition(t) {
        return this.getPointPositionForValue(t || 0, this.getBaseValue());
      }
    }, {
      key: "getPointLabelPosition",
      value: function getPointLabelPosition(t) {
        var _this$_pointLabelItem = this._pointLabelItems[t],
            e = _this$_pointLabelItem.left,
            i = _this$_pointLabelItem.top,
            n = _this$_pointLabelItem.right,
            o = _this$_pointLabelItem.bottom;
        return {
          left: e,
          top: i,
          right: n,
          bottom: o
        };
      }
    }, {
      key: "drawBackground",
      value: function drawBackground() {
        var t = this,
            _t$options4 = t.options,
            e = _t$options4.backgroundColor,
            i = _t$options4.grid.circular;

        if (e) {
          var _n38 = t.ctx;
          _n38.save(), _n38.beginPath(), Cs(t, t.getDistanceFromCenterForValue(t._endValue), i, t.getLabels().length), _n38.closePath(), _n38.fillStyle = e, _n38.fill(), _n38.restore();
        }
      }
    }, {
      key: "drawGrid",
      value: function drawGrid() {
        var t = this,
            e = t.ctx,
            i = t.options,
            n = i.angleLines,
            o = i.grid,
            s = t.getLabels().length;
        var a, r, l;

        if (i.pointLabels.display && function (t, e) {
          var i = t.ctx,
              n = t.options.pointLabels;

          for (var _o30 = e - 1; _o30 >= 0; _o30--) {
            var _e48 = n.setContext(t.getContext(_o30)),
                _s25 = Ee(_e48.font),
                _t$_pointLabelItems$_ = t._pointLabelItems[_o30],
                _a28 = _t$_pointLabelItems$_.x,
                _r19 = _t$_pointLabelItems$_.y,
                _l29 = _t$_pointLabelItems$_.textAlign,
                _c21 = _t$_pointLabelItems$_.left,
                _h17 = _t$_pointLabelItems$_.top,
                _d11 = _t$_pointLabelItems$_.right,
                _u11 = _t$_pointLabelItems$_.bottom,
                _f7 = _e48.backdropColor;

            if (!$(_f7)) {
              var _t56 = Re(_e48.backdropPadding);

              i.fillStyle = _f7, i.fillRect(_c21 - _t56.left, _h17 - _t56.top, _d11 - _c21 + _t56.width, _u11 - _h17 + _t56.height);
            }

            te(i, t._pointLabels[_o30], _a28, _r19 + _s25.lineHeight / 2, _s25, {
              color: _e48.color,
              textAlign: _l29,
              textBaseline: "middle"
            });
          }
        }(t, s), o.display && t.ticks.forEach(function (e, i) {
          if (0 !== i) {
            r = t.getDistanceFromCenterForValue(e.value);

            var _n39 = o.setContext(t.getContext(i - 1));

            !function (t, e, i, n) {
              var o = t.ctx,
                  s = e.circular,
                  a = e.color,
                  r = e.lineWidth;
              !s && !n || !a || !r || i < 0 || (o.save(), o.strokeStyle = a, o.lineWidth = r, o.setLineDash(e.borderDash), o.lineDashOffset = e.borderDashOffset, o.beginPath(), Cs(t, i, s, n), o.closePath(), o.stroke(), o.restore());
            }(t, _n39, r, s);
          }
        }), n.display) {
          for (e.save(), a = t.getLabels().length - 1; a >= 0; a--) {
            var _o31 = n.setContext(t.getContext(a)),
                _s26 = _o31.color,
                _c22 = _o31.lineWidth;

            _c22 && _s26 && (e.lineWidth = _c22, e.strokeStyle = _s26, e.setLineDash(_o31.borderDash), e.lineDashOffset = _o31.borderDashOffset, r = t.getDistanceFromCenterForValue(i.ticks.reverse ? t.min : t.max), l = t.getPointPosition(a, r), e.beginPath(), e.moveTo(t.xCenter, t.yCenter), e.lineTo(l.x, l.y), e.stroke());
          }

          e.restore();
        }
      }
    }, {
      key: "drawLabels",
      value: function drawLabels() {
        var t = this,
            e = t.ctx,
            i = t.options,
            n = i.ticks;
        if (!n.display) return;
        var o = t.getIndexAngle(0);
        var s, a;
        e.save(), e.translate(t.xCenter, t.yCenter), e.rotate(o), e.textAlign = "center", e.textBaseline = "middle", t.ticks.forEach(function (o, r) {
          if (0 === r && !i.reverse) return;
          var l = n.setContext(t.getContext(r)),
              c = Ee(l.font);

          if (s = t.getDistanceFromCenterForValue(t.ticks[r].value), l.showLabelBackdrop) {
            a = e.measureText(o.label).width, e.fillStyle = l.backdropColor;

            var _t57 = Re(l.backdropPadding);

            e.fillRect(-a / 2 - _t57.left, -s - c.size / 2 - _t57.top, a + _t57.width, c.size + _t57.height);
          }

          te(e, o.label, 0, -s, c, {
            color: l.color
          });
        }), e.restore();
      }
    }, {
      key: "drawTitle",
      value: function drawTitle() {}
    }]);

    return Os;
  }(ys);

  Os.id = "radialLinear", Os.defaults = {
    display: !0,
    animate: !0,
    position: "chartArea",
    angleLines: {
      display: !0,
      lineWidth: 1,
      borderDash: [],
      borderDashOffset: 0
    },
    grid: {
      circular: !1
    },
    startAngle: 0,
    ticks: {
      showLabelBackdrop: !0,
      backdropColor: "rgba(255,255,255,0.75)",
      backdropPadding: 2,
      callback: Ei.formatters.numeric
    },
    pointLabels: {
      backdropColor: void 0,
      backdropPadding: 2,
      display: !0,
      font: {
        size: 10
      },
      callback: function callback(t) {
        return t;
      },
      padding: 5
    }
  }, Os.defaultRoutes = {
    "angleLines.color": "borderColor",
    "pointLabels.color": "color",
    "ticks.color": "color"
  }, Os.descriptors = {
    angleLines: {
      _fallback: "grid"
    }
  };
  var Ts = {
    millisecond: {
      common: !0,
      size: 1,
      steps: 1e3
    },
    second: {
      common: !0,
      size: 1e3,
      steps: 60
    },
    minute: {
      common: !0,
      size: 6e4,
      steps: 60
    },
    hour: {
      common: !0,
      size: 36e5,
      steps: 24
    },
    day: {
      common: !0,
      size: 864e5,
      steps: 30
    },
    week: {
      common: !1,
      size: 6048e5,
      steps: 4
    },
    month: {
      common: !0,
      size: 2628e6,
      steps: 12
    },
    quarter: {
      common: !1,
      size: 7884e6,
      steps: 4
    },
    year: {
      common: !0,
      size: 3154e7
    }
  },
      Ls = Object.keys(Ts);

  function Rs(t, e) {
    return t - e;
  }

  function Es(t, e) {
    if ($(e)) return null;
    var i = t._adapter,
        n = t.options.time,
        o = n.parser,
        s = n.round,
        a = n.isoWeekday;
    var r = e;
    return "function" == typeof o && (r = o(r)), X(r) || (r = "string" == typeof o ? i.parse(r, o) : i.parse(r)), null === r ? null : (s && (r = "week" !== s || !At(a) && !0 !== a ? i.startOf(r, s) : i.startOf(r, "isoWeek", a)), +r);
  }

  function Is(t, e, i, n) {
    var o = Ls.length;

    for (var _s27 = Ls.indexOf(t); _s27 < o - 1; ++_s27) {
      var _t58 = Ts[Ls[_s27]],
          _o32 = _t58.steps ? _t58.steps : Number.MAX_SAFE_INTEGER;

      if (_t58.common && Math.ceil((i - e) / (_o32 * _t58.size)) <= n) return Ls[_s27];
    }

    return Ls[o - 1];
  }

  function Fs(t, e, i) {
    if (i) {
      if (i.length) {
        var _ee = ee(i, e),
            _n40 = _ee.lo,
            _o33 = _ee.hi;

        t[i[_n40] >= e ? i[_n40] : i[_o33]] = !0;
      }
    } else t[e] = !0;
  }

  function zs(t, e, i) {
    var n = [],
        o = {},
        s = e.length;
    var a, r;

    for (a = 0; a < s; ++a) {
      r = e[a], o[r] = a, n.push({
        value: r,
        major: !1
      });
    }

    return 0 !== s && i ? function (t, e, i, n) {
      var o = t._adapter,
          s = +o.startOf(e[0].value, n),
          a = e[e.length - 1].value;
      var r, l;

      for (r = s; r <= a; r = +o.add(r, 1, n)) {
        l = i[r], l >= 0 && (e[l].major = !0);
      }

      return e;
    }(t, n, o, i) : n;
  }

  var Vs =
  /*#__PURE__*/
  function (_ji4) {
    _inherits(Vs, _ji4);

    function Vs(t) {
      var _this17;

      _classCallCheck(this, Vs);

      _this17 = _possibleConstructorReturn(this, _getPrototypeOf(Vs).call(this, t)), _this17._cache = {
        data: [],
        labels: [],
        all: []
      }, _this17._unit = "day", _this17._majorUnit = void 0, _this17._offsets = {}, _this17._normalized = !1;
      return _this17;
    }

    _createClass(Vs, [{
      key: "init",
      value: function init(t, e) {
        var i = t.time || (t.time = {}),
            n = this._adapter = new Gn._date(t.adapters.date);
        st(i.displayFormats, n.formats()), _get2(_getPrototypeOf(Vs.prototype), "init", this).call(this, t), this._normalized = e.normalized;
      }
    }, {
      key: "parse",
      value: function parse(t, e) {
        return void 0 === t ? null : Es(this, t);
      }
    }, {
      key: "beforeLayout",
      value: function beforeLayout() {
        _get2(_getPrototypeOf(Vs.prototype), "beforeLayout", this).call(this), this._cache = {
          data: [],
          labels: [],
          all: []
        };
      }
    }, {
      key: "determineDataLimits",
      value: function determineDataLimits() {
        var t = this,
            e = t.options,
            i = t._adapter,
            n = e.time.unit || "day";

        var _t$getUserBounds5 = t.getUserBounds(),
            o = _t$getUserBounds5.min,
            s = _t$getUserBounds5.max,
            a = _t$getUserBounds5.minDefined,
            r = _t$getUserBounds5.maxDefined;

        function l(t) {
          a || isNaN(t.min) || (o = Math.min(o, t.min)), r || isNaN(t.max) || (s = Math.max(s, t.max));
        }

        a && r || (l(t._getLabelBounds()), "ticks" === e.bounds && "labels" === e.ticks.source || l(t.getMinMax(!1))), o = X(o) && !isNaN(o) ? o : +i.startOf(Date.now(), n), s = X(s) && !isNaN(s) ? s : +i.endOf(Date.now(), n) + 1, t.min = Math.min(o, s - 1), t.max = Math.max(o + 1, s);
      }
    }, {
      key: "_getLabelBounds",
      value: function _getLabelBounds() {
        var t = this.getLabelTimestamps();
        var e = Number.POSITIVE_INFINITY,
            i = Number.NEGATIVE_INFINITY;
        return t.length && (e = t[0], i = t[t.length - 1]), {
          min: e,
          max: i
        };
      }
    }, {
      key: "buildTicks",
      value: function buildTicks() {
        var t = this,
            e = t.options,
            i = e.time,
            n = e.ticks,
            o = "labels" === n.source ? t.getLabelTimestamps() : t._generate();
        "ticks" === e.bounds && o.length && (t.min = t._userMin || o[0], t.max = t._userMax || o[o.length - 1]);
        var s = t.min,
            a = oe(o, s, t.max);
        return t._unit = i.unit || (n.autoSkip ? Is(i.minUnit, t.min, t.max, t._getLabelCapacity(s)) : function (t, e, i, n, o) {
          for (var _s28 = Ls.length - 1; _s28 >= Ls.indexOf(i); _s28--) {
            var _i61 = Ls[_s28];
            if (Ts[_i61].common && t._adapter.diff(o, n, _i61) >= e - 1) return _i61;
          }

          return Ls[i ? Ls.indexOf(i) : 0];
        }(t, a.length, i.minUnit, t.min, t.max)), t._majorUnit = n.major.enabled && "year" !== t._unit ? function (t) {
          for (var _e49 = Ls.indexOf(t) + 1, _i62 = Ls.length; _e49 < _i62; ++_e49) {
            if (Ts[Ls[_e49]].common) return Ls[_e49];
          }
        }(t._unit) : void 0, t.initOffsets(o), e.reverse && a.reverse(), zs(t, a, t._majorUnit);
      }
    }, {
      key: "initOffsets",
      value: function initOffsets(t) {
        var e = this;
        var i,
            n,
            o = 0,
            s = 0;
        e.options.offset && t.length && (i = e.getDecimalForValue(t[0]), o = 1 === t.length ? 1 - i : (e.getDecimalForValue(t[1]) - i) / 2, n = e.getDecimalForValue(t[t.length - 1]), s = 1 === t.length ? n : (n - e.getDecimalForValue(t[t.length - 2])) / 2);
        var a = t.length < 3 ? .5 : .25;
        o = Ht(o, 0, a), s = Ht(s, 0, a), e._offsets = {
          start: o,
          end: s,
          factor: 1 / (o + 1 + s)
        };
      }
    }, {
      key: "_generate",
      value: function _generate() {
        var t = this,
            e = t._adapter,
            i = t.min,
            n = t.max,
            o = t.options,
            s = o.time,
            a = s.unit || Is(s.minUnit, i, n, t._getLabelCapacity(i)),
            r = K(s.stepSize, 1),
            l = "week" === a && s.isoWeekday,
            c = At(l) || !0 === l,
            h = {};
        var d,
            u,
            f = i;
        if (c && (f = +e.startOf(f, "isoWeek", l)), f = +e.startOf(f, c ? "day" : a), e.diff(n, i, a) > 1e5 * r) throw new Error(i + " and " + n + " are too far apart with stepSize of " + r + " " + a);
        var g = "data" === o.ticks.source && t.getDataTimestamps();

        for (d = f, u = 0; d < n; d = +e.add(d, r, a), u++) {
          Fs(h, d, g);
        }

        return d !== n && "ticks" !== o.bounds && 1 !== u || Fs(h, d, g), Object.keys(h).sort(function (t, e) {
          return t - e;
        }).map(function (t) {
          return +t;
        });
      }
    }, {
      key: "getLabelForValue",
      value: function getLabelForValue(t) {
        var e = this._adapter,
            i = this.options.time;
        return i.tooltipFormat ? e.format(t, i.tooltipFormat) : e.format(t, i.displayFormats.datetime);
      }
    }, {
      key: "_tickFormatFunction",
      value: function _tickFormatFunction(t, e, i, n) {
        var o = this,
            s = o.options,
            a = s.time.displayFormats,
            r = o._unit,
            l = o._majorUnit,
            c = r && a[r],
            h = l && a[l],
            d = i[e],
            u = l && h && d && d.major,
            f = o._adapter.format(t, n || (u ? h : c)),
            g = s.ticks.callback;

        return g ? g(f, e, i) : f;
      }
    }, {
      key: "generateTickLabels",
      value: function generateTickLabels(t) {
        var e, i, n;

        for (e = 0, i = t.length; e < i; ++e) {
          n = t[e], n.label = this._tickFormatFunction(n.value, e, t);
        }
      }
    }, {
      key: "getDecimalForValue",
      value: function getDecimalForValue(t) {
        var e = this;
        return null === t ? NaN : (t - e.min) / (e.max - e.min);
      }
    }, {
      key: "getPixelForValue",
      value: function getPixelForValue(t) {
        var e = this,
            i = e._offsets,
            n = e.getDecimalForValue(t);
        return e.getPixelForDecimal((i.start + n) * i.factor);
      }
    }, {
      key: "getValueForPixel",
      value: function getValueForPixel(t) {
        var e = this,
            i = e._offsets,
            n = e.getDecimalForPixel(t) / i.factor - i.end;
        return e.min + n * (e.max - e.min);
      }
    }, {
      key: "_getLabelSize",
      value: function _getLabelSize(t) {
        var e = this,
            i = e.options.ticks,
            n = e.ctx.measureText(t).width,
            o = Rt(e.isHorizontal() ? i.maxRotation : i.minRotation),
            s = Math.cos(o),
            a = Math.sin(o),
            r = e._resolveTickFontOptions(0).size;

        return {
          w: n * s + r * a,
          h: n * a + r * s
        };
      }
    }, {
      key: "_getLabelCapacity",
      value: function _getLabelCapacity(t) {
        var e = this,
            i = e.options.time,
            n = i.displayFormats,
            o = n[i.unit] || n.millisecond,
            s = e._tickFormatFunction(t, 0, zs(e, [t], e._majorUnit), o),
            a = e._getLabelSize(s),
            r = Math.floor(e.isHorizontal() ? e.width / a.w : e.height / a.h) - 1;

        return r > 0 ? r : 1;
      }
    }, {
      key: "getDataTimestamps",
      value: function getDataTimestamps() {
        var t = this;
        var e,
            i,
            n = t._cache.data || [];
        if (n.length) return n;
        var o = t.getMatchingVisibleMetas();
        if (t._normalized && o.length) return t._cache.data = o[0].controller.getAllParsedValues(t);

        for (e = 0, i = o.length; e < i; ++e) {
          n = n.concat(o[e].controller.getAllParsedValues(t));
        }

        return t._cache.data = t.normalize(n);
      }
    }, {
      key: "getLabelTimestamps",
      value: function getLabelTimestamps() {
        var t = this,
            e = t._cache.labels || [];
        var i, n;
        if (e.length) return e;
        var o = t.getLabels();

        for (i = 0, n = o.length; i < n; ++i) {
          e.push(Es(t, o[i]));
        }

        return t._cache.labels = t._normalized ? e : t.normalize(e);
      }
    }, {
      key: "normalize",
      value: function normalize(t) {
        return le(t.sort(Rs));
      }
    }]);

    return Vs;
  }(ji);

  function Bs(t, e, i) {
    var n, o, s, a;
    if (i) n = Math.floor(e), o = Math.ceil(e), s = t[n], a = t[o];else {
      var _i63 = ee(t, e);

      s = _i63.lo, a = _i63.hi, n = t[s], o = t[a];
    }
    var r = o - n;
    return r ? s + (a - s) * (e - n) / r : s;
  }

  Vs.id = "time", Vs.defaults = {
    bounds: "data",
    adapters: {},
    time: {
      parser: !1,
      unit: !1,
      round: !1,
      isoWeekday: !1,
      minUnit: "millisecond",
      displayFormats: {}
    },
    ticks: {
      source: "auto",
      major: {
        enabled: !1
      }
    }
  };

  var Ws =
  /*#__PURE__*/
  function (_Vs) {
    _inherits(Ws, _Vs);

    function Ws(t) {
      var _this18;

      _classCallCheck(this, Ws);

      _this18 = _possibleConstructorReturn(this, _getPrototypeOf(Ws).call(this, t)), _this18._table = [], _this18._maxIndex = void 0;
      return _this18;
    }

    _createClass(Ws, [{
      key: "initOffsets",
      value: function initOffsets() {
        var t = this,
            e = t._getTimestampsForTable();

        t._table = t.buildLookupTable(e), t._maxIndex = t._table.length - 1, _get2(_getPrototypeOf(Ws.prototype), "initOffsets", this).call(this, e);
      }
    }, {
      key: "buildLookupTable",
      value: function buildLookupTable(t) {
        var e = this.min,
            i = this.max;
        if (!t.length) return [{
          time: e,
          pos: 0
        }, {
          time: i,
          pos: 1
        }];
        var n = [e];
        var o, s, a;

        for (o = 0, s = t.length; o < s; ++o) {
          a = t[o], a > e && a < i && n.push(a);
        }

        return n.push(i), n;
      }
    }, {
      key: "_getTimestampsForTable",
      value: function _getTimestampsForTable() {
        var t = this;
        var e = t._cache.all || [];
        if (e.length) return e;
        var i = t.getDataTimestamps(),
            n = t.getLabelTimestamps();
        return e = i.length && n.length ? t.normalize(i.concat(n)) : i.length ? i : n, e = t._cache.all = e, e;
      }
    }, {
      key: "getPixelForValue",
      value: function getPixelForValue(t, e) {
        var i = this,
            n = i._offsets,
            o = i._normalized && i._maxIndex > 0 && !$(e) ? e / i._maxIndex : i.getDecimalForValue(t);
        return i.getPixelForDecimal((n.start + o) * n.factor);
      }
    }, {
      key: "getDecimalForValue",
      value: function getDecimalForValue(t) {
        return Bs(this._table, t) / this._maxIndex;
      }
    }, {
      key: "getValueForPixel",
      value: function getValueForPixel(t) {
        var e = this,
            i = e._offsets,
            n = e.getDecimalForPixel(t) / i.factor - i.end;
        return Bs(e._table, n * this._maxIndex, !0);
      }
    }]);

    return Ws;
  }(Vs);

  Ws.id = "timeseries", Ws.defaults = Vs.defaults;
  var Hs = Object.freeze({
    __proto__: null,
    CategoryScale: _s,
    LinearScale: vs,
    LogarithmicScale: ws,
    RadialLinearScale: Os,
    TimeScale: Vs,
    TimeSeriesScale: Ws
  });
  return Yn.register(co, Hs, Eo, xs), Yn.helpers = _objectSpread({}, vn), Yn._adapters = Gn, Yn.Animation = mi, Yn.Animations = bi, Yn.animator = a, Yn.controllers = wn.controllers.items, Yn.DatasetController = Ai, Yn.Element = Oi, Yn.elements = Eo, Yn.Interaction = De, Yn.layouts = Xe, Yn.platforms = ci, Yn.Scale = ji, Yn.Ticks = Ei, Object.assign(Yn, co, Hs, Eo, xs, ci), Yn.Chart = Yn, "undefined" != typeof window && (window.Chart = Yn), Yn;
});