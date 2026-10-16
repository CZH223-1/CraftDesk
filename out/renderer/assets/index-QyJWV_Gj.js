function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$1 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$1(a) {
  if (null === a || "object" !== typeof a) return null;
  a = z$1 && a[z$1] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$1 = {};
function E$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E$1.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E$1.prototype;
function G$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = true;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$1(a, b, e) {
  var d, c = {}, k2 = null, h = null;
  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J.call(b, d) && !L$1.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g) c.children = e;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++) f2[m2] = arguments[m2 + 2];
    c.children = f2;
  }
  if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
  return { $$typeof: l$1, type: a, key: k2, ref: h, props: c, _owner: K$1.current };
}
function N$1(a, b) {
  return { $$typeof: l$1, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$1(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l$1;
}
function escape(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P$1 = /\/+/g;
function Q$1(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function R$1(a, b, e, d, c) {
  var k2 = typeof a;
  if ("undefined" === k2 || "boolean" === k2) a = null;
  var h = false;
  if (null === a) h = true;
  else switch (k2) {
    case "string":
    case "number":
      h = true;
      break;
    case "object":
      switch (a.$$typeof) {
        case l$1:
        case n$1:
          h = true;
      }
  }
  if (h) return h = a, c = c(h), a = "" === d ? "." + Q$1(h, 0) : d, I$1(c) ? (e = "", null != a && (e = a.replace(P$1, "$&/") + "/"), R$1(c, b, e, "", function(a2) {
    return a2;
  })) : null != c && (O$1(c) && (c = N$1(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I$1(a)) for (var g = 0; g < a.length; g++) {
    k2 = a[g];
    var f2 = d + Q$1(k2, g);
    h += R$1(k2, b, e, f2, c);
  }
  else if (f2 = A$1(a), "function" === typeof f2) for (a = f2.call(a), g = 0; !(k2 = a.next()).done; ) k2 = k2.value, f2 = d + Q$1(k2, g++), h += R$1(k2, b, e, f2, c);
  else if ("object" === k2) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$1(a, b, e) {
  if (null == a) return a;
  var d = [], c = 0;
  R$1(a, d, "", "", function(a2) {
    return b.call(e, a2, c++);
  });
  return d;
}
function T$1(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
    }, function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status) return a._result.default;
  throw a._result;
}
var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
function X$1() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$1, forEach: function(a, b, e) {
  S$1(a, function() {
    b.apply(this, arguments);
  }, e);
}, count: function(a) {
  var b = 0;
  S$1(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S$1(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$1(a)) throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$2;
react_production_min.Profiler = r;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q$1;
react_production_min.Suspense = w;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
react_production_min.act = X$1;
react_production_min.cloneElement = function(a, b, e) {
  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C$1({}, a.props), c = a.key, k2 = a.ref, h = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k2 = b.ref, h = K$1.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
    for (f2 in b) J.call(b, f2) && !L$1.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2) d.children = e;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++) g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l$1, type: a.type, key: c, ref: k2, props: d, _owner: h };
};
react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = M$1;
react_production_min.createFactory = function(a) {
  var b = M$1.bind(null, a);
  b.type = a;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: v$1, render: a };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a) {
  return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
};
react_production_min.memo = function(a, b) {
  return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
};
react_production_min.startTransition = function(a) {
  var b = V$1.transition;
  V$1.transition = {};
  try {
    a();
  } finally {
    V$1.transition = b;
  }
};
react_production_min.unstable_act = X$1;
react_production_min.useCallback = function(a, b) {
  return U$1.current.useCallback(a, b);
};
react_production_min.useContext = function(a) {
  return U$1.current.useContext(a);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a) {
  return U$1.current.useDeferredValue(a);
};
react_production_min.useEffect = function(a, b) {
  return U$1.current.useEffect(a, b);
};
react_production_min.useId = function() {
  return U$1.current.useId();
};
react_production_min.useImperativeHandle = function(a, b, e) {
  return U$1.current.useImperativeHandle(a, b, e);
};
react_production_min.useInsertionEffect = function(a, b) {
  return U$1.current.useInsertionEffect(a, b);
};
react_production_min.useLayoutEffect = function(a, b) {
  return U$1.current.useLayoutEffect(a, b);
};
react_production_min.useMemo = function(a, b) {
  return U$1.current.useMemo(a, b);
};
react_production_min.useReducer = function(a, b, e) {
  return U$1.current.useReducer(a, b, e);
};
react_production_min.useRef = function(a) {
  return U$1.current.useRef(a);
};
react_production_min.useState = function(a) {
  return U$1.current.useState(a);
};
react_production_min.useSyncExternalStore = function(a, b, e) {
  return U$1.current.useSyncExternalStore(a, b, e);
};
react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a) m$1.call(a, b) && !p$1.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a, b) {
    var c = a.length;
    a.push(b);
    a: for (; 0 < c; ) {
      var d = c - 1 >>> 1, e = a[d];
      if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
      else break a;
    }
  }
  function h(a) {
    return 0 === a.length ? null : a[0];
  }
  function k2(a) {
    if (0 === a.length) return null;
    var b = a[0], c = a.pop();
    if (c !== b) {
      a[0] = c;
      a: for (var d = 0, e = a.length, w2 = e >>> 1; d < w2; ) {
        var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
        if (0 > g(C2, c)) n2 < e && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
        else if (n2 < e && 0 > g(x2, c)) a[d] = x2, a[n2] = c, d = n2;
        else break a;
      }
    }
    return b;
  }
  function g(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return 0 !== c ? c : a.id - b.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a) {
    for (var b = h(t2); null !== b; ) {
      if (null === b.callback) k2(t2);
      else if (b.startTime <= a) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
      else break;
      b = h(t2);
    }
  }
  function H2(a) {
    B2 = false;
    G2(a);
    if (!A2) if (null !== h(r2)) A2 = true, I2(J2);
    else {
      var b = h(t2);
      null !== b && K2(H2, b.startTime - a);
    }
  }
  function J2(a, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c = y2;
    try {
      G2(b);
      for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
        var d = v2.callback;
        if ("function" === typeof d) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e = d(v2.expirationTime <= b);
          b = exports.unstable_now();
          "function" === typeof e ? v2.callback = e : v2 === h(r2) && k2(r2);
          G2(b);
        } else k2(r2);
        v2 = h(r2);
      }
      if (null !== v2) var w2 = true;
      else {
        var m2 = h(t2);
        null !== m2 && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a = exports.unstable_now();
      Q2 = a;
      var b = true;
      try {
        b = O2(true, a);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else N2 = false;
  }
  var S2;
  if ("function" === typeof F2) S2 = function() {
    F2(R2);
  };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else S2 = function() {
    D2(R2, 0);
  };
  function I2(a) {
    O2 = a;
    N2 || (N2 = true, S2());
  }
  function K2(a, b) {
    L2 = D2(function() {
      a(exports.unstable_now());
    }, b);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h(r2);
  };
  exports.unstable_next = function(a) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c = y2;
    y2 = b;
    try {
      return a();
    } finally {
      y2 = c;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c = y2;
    y2 = a;
    try {
      return b();
    } finally {
      y2 = c;
    }
  };
  exports.unstable_scheduleCallback = function(a, b, c) {
    var d = exports.unstable_now();
    "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
    switch (a) {
      case 1:
        var e = -1;
        break;
      case 2:
        e = 250;
        break;
      case 5:
        e = 1073741823;
        break;
      case 4:
        e = 1e4;
        break;
      default:
        e = 5e3;
    }
    e = c + e;
    a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
    c > d ? (a.sortIndex = c, f2(t2, a), null === h(r2) && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
    return a;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a) {
    var b = y2;
    return function() {
      var c = y2;
      y2 = b;
      try {
        return a.apply(this, arguments);
      } finally {
        y2 = c;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a, b) {
  ha(a, b);
  ha(a + "Capture", b);
}
function ha(a, b) {
  ea[a] = b;
  for (a = 0; a < b.length; a++) da.add(b[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a) {
  if (ja.call(ma, a)) return true;
  if (ja.call(la, a)) return false;
  if (ka.test(a)) return ma[a] = true;
  la[a] = true;
  return false;
}
function pa(a, b, c, d) {
  if (null !== c && 0 === c.type) return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d) return false;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function qa(a, b, c, d) {
  if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
  if (d) return false;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;
    case 4:
      return false === b;
    case 5:
      return isNaN(b);
    case 6:
      return isNaN(b) || 1 > b;
  }
  return false;
}
function v(a, b, c, d, e, f2, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z[a] = new v(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b = a[0];
  z[b] = new v(b, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z[a] = new v(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z[a] = new v(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z[a] = new v(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z[a] = new v(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b = a.replace(
    ra,
    sa
  );
  z[b] = new v(b, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
});
z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
});
function ta(a, b, c, d) {
  var e = z.hasOwnProperty(b) ? z[b] : null;
  if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a) return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A = Object.assign, La;
function Ma(a) {
  if (void 0 === La) try {
    throw Error();
  } catch (c) {
    var b = c.stack.trim().match(/\n( *(at )?)/);
    La = b && b[1] || "";
  }
  return "\n" + La + a;
}
var Na = false;
function Oa(a, b) {
  if (!a || Na) return "";
  Na = true;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b) if (b = function() {
      throw Error();
    }, Object.defineProperty(b.prototype, "props", { set: function() {
      throw Error();
    } }), "object" === typeof Reflect && Reflect.construct) {
      try {
        Reflect.construct(b, []);
      } catch (l2) {
        var d = l2;
      }
      Reflect.construct(a, [], b);
    } else {
      try {
        b.call();
      } catch (l2) {
        d = l2;
      }
      a.call(b.prototype);
    }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a();
    }
  } catch (l2) {
    if (l2 && d && "string" === typeof l2.stack) {
      for (var e = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e[g] !== f2[h]; ) h--;
      for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f2[h]) {
        if (1 !== g || 1 !== h) {
          do
            if (g--, h--, 0 > h || e[g] !== f2[h]) {
              var k2 = "\n" + e[g].replace(" at new ", " at ");
              a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
              return k2;
            }
          while (1 <= g && 0 <= h);
        }
        break;
      }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, false), a;
    case 11:
      return a = Oa(a.type.render, false), a;
    case 1:
      return a = Oa(a.type, true), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a) switch (a.$$typeof) {
    case Ca:
      return (a.displayName || "Context") + ".Consumer";
    case Ba:
      return (a._context.displayName || "Context") + ".Provider";
    case Da:
      var b = a.render;
      a = a.displayName;
      a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      return a;
    case Ga:
      return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
    case Ha:
      b = a._payload;
      a = a._init;
      try {
        return Qa(a(b));
      } catch (c) {
      }
  }
  return null;
}
function Ra(a) {
  var b = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b) return b.displayName || b.name || null;
      if ("string" === typeof b) return b;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get, f2 = c.set;
    Object.defineProperty(a, b, { configurable: true, get: function() {
      return e.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f2.call(this, a2);
    } });
    Object.defineProperty(a, b, { enumerable: c.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a) return false;
  var b = a._valueTracker;
  if (!b) return true;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), true) : false;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c = b.checked;
  return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
}
function Za(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
  c = Sa(null != b.value ? b.value : c);
  a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function ab(a, b) {
  b = b.checked;
  null != b && ta(a, "checked", b, false);
}
function bb(a, b) {
  ab(a, b);
  var c = Sa(b.value), d = b.type;
  if (null != c) if ("number" === d) {
    if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
  } else a.value !== "" + c && (a.value = "" + c);
  else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function db(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}
function cb(a, b, c) {
  if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
var eb = Array.isArray;
function fb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
    for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
  } else {
    c = "" + Sa(c);
    b = null;
    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = true;
        d && (a[e].defaultSelected = true);
        return;
      }
      null !== b || a[e].disabled || (b = a[e]);
    }
    null !== b && (b.selected = true);
  }
}
function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
  return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b) {
  var c = b.value;
  if (null == c) {
    c = b.children;
    b = b.defaultValue;
    if (null != c) {
      if (null != b) throw Error(p(92));
      if (eb(c)) {
        if (1 < c.length) throw Error(p(93));
        c = c[0];
      }
      b = c;
    }
    null == b && (b = "");
    c = b;
  }
  a._wrapperState = { initialValue: Sa(c) };
}
function ib(a, b) {
  var c = Sa(b.value), d = Sa(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var mb, nb = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b, c, d, e);
    });
  } : a;
}(function(a, b) {
  if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
    for (; b.firstChild; ) a.appendChild(b.firstChild);
  }
});
function ob(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a) {
  qb.forEach(function(b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b] = pb[a];
  });
});
function rb(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
}
function sb(a, b) {
  a = a.style;
  for (var c in b) if (b.hasOwnProperty(c)) {
    var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
    "float" === c && (c = "cssFloat");
    d ? a.setProperty(c, e) : a[c] = e;
  }
}
var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a, b) {
  if (b) {
    if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(p(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
    }
    if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
  }
}
function vb(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb) throw Error(p(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb() {
}
var Ib = false;
function Jb(a, b, c) {
  if (Ib) return a(b, c);
  Ib = true;
  try {
    return Gb(a, b, c);
  } finally {
    if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a, b) {
  var c = a.stateNode;
  if (null === c) return null;
  var d = Db(c);
  if (null === d) return null;
  c = d[b];
  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;
    default:
      a = false;
  }
  if (a) return null;
  if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
  return c;
}
var Lb = false;
if (ia) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", { get: function() {
    Lb = true;
  } });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a) {
  Lb = false;
}
function Nb(a, b, c, d, e, f2, g, h, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
  Ob = true;
  Pb = a;
} };
function Tb(a, b, c, d, e, f2, g, h, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b, c, d, e, f2, g, h, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else throw Error(p(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a) {
  var b = a, c = a;
  if (a.alternate) for (; b.return; ) b = b.return;
  else {
    a = b;
    do
      b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
    while (a);
  }
  return 3 === b.tag ? c : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b) return b.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a) throw Error(p(188));
}
function Yb(a) {
  var b = a.alternate;
  if (!b) {
    b = Vb(a);
    if (null === b) throw Error(p(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b; ; ) {
    var e = c.return;
    if (null === e) break;
    var f2 = e.alternate;
    if (null === f2) {
      d = e.return;
      if (null !== d) {
        c = d;
        continue;
      }
      break;
    }
    if (e.child === f2.child) {
      for (f2 = e.child; f2; ) {
        if (f2 === c) return Xb(e), a;
        if (f2 === d) return Xb(e), b;
        f2 = f2.sibling;
      }
      throw Error(p(188));
    }
    if (c.return !== d.return) c = e, d = f2;
    else {
      for (var g = false, h = e.child; h; ) {
        if (h === c) {
          g = true;
          c = e;
          d = f2;
          break;
        }
        if (h === d) {
          g = true;
          d = e;
          c = f2;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f2.child; h; ) {
          if (h === c) {
            g = true;
            c = f2;
            d = e;
            break;
          }
          if (h === d) {
            g = true;
            d = f2;
            c = e;
            break;
          }
          h = h.sibling;
        }
        if (!g) throw Error(p(189));
      }
    }
    if (c.alternate !== d) throw Error(p(190));
  }
  if (3 !== c.tag) throw Error(p(188));
  return c.stateNode.current === c ? a : b;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag) return a;
  for (a = a.child; null !== a; ) {
    var b = $b(a);
    if (null !== b) return b;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
  } catch (b) {
  }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b) {
  var c = a.pendingLanes;
  if (0 === c) return 0;
  var d = 0, e = a.suspendedLanes, f2 = a.pingedLanes, g = c & 268435455;
  if (0 !== g) {
    var h = g & ~e;
    0 !== h ? d = tc(h) : (f2 &= g, 0 !== f2 && (d = tc(f2)));
  } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f2 && (d = tc(f2));
  if (0 === d) return 0;
  if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f2 = b & -b, e >= f2 || 16 === e && 0 !== (f2 & 4194240))) return b;
  0 !== (d & 4) && (d |= c & 16);
  b = a.entangledLanes;
  if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
  return d;
}
function vc(a, b) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b) {
  for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
    var g = 31 - oc(f2), h = 1 << g, k2 = e[g];
    if (-1 === k2) {
      if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
    } else k2 <= b && (a.expiredLanes |= h);
    f2 &= ~h;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b = [], c = 0; 31 > c; c++) b.push(a);
  return b;
}
function Ac(a, b, c) {
  a.pendingLanes |= b;
  536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b = 31 - oc(b);
  a[b] = c;
}
function Bc(a, b) {
  var c = a.pendingLanes & ~b;
  a.pendingLanes = b;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b;
  a.mutableReadLanes &= b;
  a.entangledLanes &= b;
  b = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c; ) {
    var e = 31 - oc(c), f2 = 1 << e;
    b[e] = 0;
    d[e] = -1;
    a[e] = -1;
    c &= ~f2;
  }
}
function Cc(a, b) {
  var c = a.entangledLanes |= b;
  for (a = a.entanglements; c; ) {
    var d = 31 - oc(c), e = 1 << d;
    e & b | a[d] & b && (a[d] |= b);
    c &= ~e;
  }
}
var C = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a, b, c, d, e, f2) {
  if (null === a || a.nativeEvent !== f2) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e && -1 === b.indexOf(e) && b.push(e);
  return a;
}
function Uc(a, b, c, d, e) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a, b, c, d, e), true;
    case "dragenter":
      return Mc = Tc(Mc, a, b, c, d, e), true;
    case "mouseover":
      return Nc = Tc(Nc, a, b, c, d, e), true;
    case "pointerover":
      var f2 = e.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a, b, c, d, e));
      return true;
    case "gotpointercapture":
      return f2 = e.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b, c, d, e)), true;
  }
  return false;
}
function Vc(a) {
  var b = Wc(a.target);
  if (null !== b) {
    var c = Vb(b);
    if (null !== c) {
      if (b = c.tag, 13 === b) {
        if (b = Wb(c), null !== b) {
          a.blockedOn = b;
          Ic(a.priority, function() {
            Gc(c);
          });
          return;
        }
      } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn) return false;
  for (var b = a.targetContainers; 0 < b.length; ) {
    var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null === c) {
      c = a.nativeEvent;
      var d = new c.constructor(c.type, c);
      wb = d;
      c.target.dispatchEvent(d);
      wb = null;
    } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
    b.shift();
  }
  return true;
}
function Zc(a, b, c) {
  Xc(a) && c.delete(b);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b) {
  a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b(b2) {
    return ad(b2, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c = 1; c < Kc.length; c++) {
      var d = Kc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a, b, c, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function gd(a, b, c, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function fd(a, b, c, d) {
  if (dd) {
    var e = Yc(a, b, c, d);
    if (null === e) hd(a, b, d, id, c), Sc(a, d);
    else if (Uc(e, a, b, c, d)) d.stopPropagation();
    else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e; ) {
        var f2 = Cb(e);
        null !== f2 && Ec(f2);
        f2 = Yc(a, b, c, d);
        null === f2 && hd(a, b, d, id, c);
        if (f2 === e) break;
        e = f2;
      }
      null !== e && d.stopPropagation();
    } else hd(a, b, d, null, c);
  }
}
var id = null;
function Yc(a, b, c, d) {
  id = null;
  a = xb(d);
  a = Wc(a);
  if (null !== a) if (b = Vb(a), null === b) a = null;
  else if (c = b.tag, 13 === c) {
    a = Wb(b);
    if (null !== a) return a;
    a = null;
  } else if (3 === c) {
    if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
    a = null;
  } else b !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md) return md;
  var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
  for (a = 0; a < c && b[a] === e[a]; a++) ;
  var g = c - a;
  for (d = 1; d <= g && b[c - d] === e[f2 - d]; d++) ;
  return md = e.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b(b2, d, e, f2, g) {
    this._reactName = b2;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g;
    this.currentTarget = null;
    for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f2) : f2[c]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a) return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
}
function zd() {
  return Pd;
}
var Qd = A({}, ud, { key: function(a) {
  if (a.key) {
    var b = Md[a.key] || a.key;
    if ("Unidentified" !== b) return b;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie = false;
function je(a, b) {
  switch (a) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (32 !== b.which) return null;
      fe = true;
      return ee;
    case "textInput":
      return a = b.data, a === ee && fe ? null : a;
    default:
      return null;
  }
}
function ke(a, b) {
  if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
}
function ne(a, b, c, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
}
var pe = null, qe = null;
function re(a) {
  se(a, 0);
}
function te(a) {
  var b = ue(a);
  if (Wa(b)) return a;
}
function ve(a, b) {
  if ("change" === a) return b;
}
var we = false;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a) {
  if ("value" === a.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a, xb(a));
    Jb(re, b);
  }
}
function Ce(a, b, c) {
  "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
}
function De(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
}
function Ee(a, b) {
  if ("click" === a) return te(b);
}
function Fe(a, b) {
  if ("input" === a || "change" === a) return te(b);
}
function Ge(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a, b) {
  if (He(a, b)) return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
  var c = Object.keys(a), d = Object.keys(b);
  if (c.length !== d.length) return false;
  for (d = 0; d < c.length; d++) {
    var e = c[d];
    if (!ja.call(b, e) || !He(a[e], b[e])) return false;
  }
  return true;
}
function Je(a) {
  for (; a && a.firstChild; ) a = a.firstChild;
  return a;
}
function Ke(a, b) {
  var c = Je(a);
  a = 0;
  for (var d; c; ) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b) return { node: c, offset: b - a };
      a = d;
    }
    a: {
      for (; c; ) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Je(c);
  }
}
function Le(a, b) {
  return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
}
function Me() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = false;
    }
    if (c) a = b.contentWindow;
    else break;
    b = Xa(a.document);
  }
  return b;
}
function Ne(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
function Oe(a) {
  var b = Me(), c = a.focusedElem, d = a.selectionRange;
  if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
    if (null !== d && Ne(c)) {
      if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
      else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e = c.textContent.length, f2 = Math.min(d.start, e);
        d = void 0 === d.end ? f2 : Math.min(d.end, e);
        !a.extend && f2 > d && (e = d, d = f2, f2 = e);
        e = Ke(c, f2);
        var g = Ke(
          c,
          d
        );
        e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
      }
    }
    b = [];
    for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    "function" === typeof c.focus && c.focus();
    for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a, b, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
}
function Ve(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a) {
  if (Xe[a]) return Xe[a];
  if (!We[a]) return a;
  var b = We[a], c;
  for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
  return a;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b) {
  df.set(a, b);
  fa(b, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Ub(d, b, void 0, a);
  a.currentTarget = null;
}
function se(a, b) {
  b = 0 !== (b & 4);
  for (var c = 0; c < a.length; c++) {
    var d = a[c], e = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b) for (var g = d.length - 1; 0 <= g; g--) {
        var h = d[g], k2 = h.instance, l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f2 = k2;
      }
      else for (g = 0; g < d.length; g++) {
        h = d[g];
        k2 = h.instance;
        l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f2 = k2;
      }
    }
  }
  if (Qb) throw a = Rb, Qb = false, Rb = null, a;
}
function D(a, b) {
  var c = b[of];
  void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
  var d = a + "__bubble";
  c.has(d) || (pf(b, a, 2, false), c.add(d));
}
function qf(a, b, c) {
  var d = 0;
  b && (d |= 4);
  pf(c, a, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = true;
    da.forEach(function(b2) {
      "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
    });
    var b = 9 === a.nodeType ? a : a.ownerDocument;
    null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a, b, c, d) {
  switch (jd(b)) {
    case 1:
      var e = ed;
      break;
    case 4:
      e = gd;
      break;
    default:
      e = fd;
  }
  c = e.bind(null, b, c, a);
  e = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
  d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
}
function hd(a, b, c, d, e) {
  var f2 = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
    if (null === d) return;
    var g = d.tag;
    if (3 === g || 4 === g) {
      var h = d.stateNode.containerInfo;
      if (h === e || 8 === h.nodeType && h.parentNode === e) break;
      if (4 === g) for (g = d.return; null !== g; ) {
        var k2 = g.tag;
        if (3 === k2 || 4 === k2) {
          if (k2 = g.stateNode.containerInfo, k2 === e || 8 === k2.nodeType && k2.parentNode === e) return;
        }
        g = g.return;
      }
      for (; null !== h; ) {
        g = Wc(h);
        if (null === g) return;
        k2 = g.tag;
        if (5 === k2 || 6 === k2) {
          d = f2 = g;
          continue a;
        }
        h = h.parentNode;
      }
    }
    d = d.return;
  }
  Jb(function() {
    var d2 = f2, e2 = xb(c), g2 = [];
    a: {
      var h2 = df.get(a);
      if (void 0 !== h2) {
        var k3 = td, n2 = a;
        switch (a) {
          case "keypress":
            if (0 === od(c)) break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
        t2 = [];
        for (var w2 = d2, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2) break;
          w2 = w2.return;
        }
        0 < t2.length && (h2 = new k3(h2, n2, null, c, e2), g2.push({ event: h2, listeners: t2 }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h2 = "mouseover" === a || "pointerover" === a;
        k3 = "mouseout" === a || "pointerout" === a;
        if (h2 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf])) break a;
        if (k3 || h2) {
          h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k3) {
            if (n2 = c.relatedTarget || c.toElement, k3 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
          } else k3 = null, n2 = d2;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a || "pointerover" === a) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h2 : ue(k3);
            u2 = null == n2 ? h2 : ue(n2);
            h2 = new t2(F2, w2 + "leave", k3, c, e2);
            h2.target = J2;
            h2.relatedTarget = u2;
            F2 = null;
            Wc(e2) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2) b: {
              t2 = k3;
              x2 = n2;
              w2 = 0;
              for (u2 = t2; u2; u2 = vf(u2)) w2++;
              u2 = 0;
              for (F2 = x2; F2; F2 = vf(F2)) u2++;
              for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
              for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
              for (; w2--; ) {
                if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                t2 = vf(t2);
                x2 = vf(x2);
              }
              t2 = null;
            }
            else t2 = null;
            null !== k3 && wf(g2, h2, k3, t2, false);
            null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
          }
        }
      }
      a: {
        h2 = d2 ? ue(d2) : window;
        k3 = h2.nodeName && h2.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h2.type) var na = ve;
        else if (me(h2)) if (we) na = Fe;
        else {
          na = De;
          var xa = Ce;
        }
        else (k3 = h2.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
        if (na && (na = na(a, d2))) {
          ne(g2, na, c, e2);
          break a;
        }
        xa && xa(a, h2, d2);
        "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
      }
      xa = d2 ? ue(d2) : window;
      switch (a) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g2, c, e2);
          break;
        case "selectionchange":
          if (Pe) break;
        case "keydown":
        case "keyup":
          Ue(g2, c, e2);
      }
      var $a;
      if (ae) b: {
        switch (a) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      }
      else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
      if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
    }
    se(g2, b);
  });
}
function tf(a, b, c) {
  return { instance: a, listener: b, currentTarget: c };
}
function oe(a, b) {
  for (var c = b + "Capture", d = []; null !== a; ) {
    var e = a, f2 = e.stateNode;
    5 === e.tag && null !== f2 && (e = f2, f2 = Kb(a, c), null != f2 && d.unshift(tf(a, f2, e)), f2 = Kb(a, b), null != f2 && d.push(tf(a, f2, e)));
    a = a.return;
  }
  return d;
}
function vf(a) {
  if (null === a) return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b, c, d, e) {
  for (var f2 = b._reactName, g = []; null !== c && c !== d; ) {
    var h = c, k2 = h.alternate, l2 = h.stateNode;
    if (null !== k2 && k2 === d) break;
    5 === h.tag && null !== l2 && (h = l2, e ? (k2 = Kb(c, f2), null != k2 && g.unshift(tf(c, k2, h))) : e || (k2 = Kb(c, f2), null != k2 && g.push(tf(c, k2, h))));
    c = c.return;
  }
  0 !== g.length && a.push({ event: b, listeners: g });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b, c) {
  b = zf(b);
  if (zf(a) !== b && c) throw Error(p(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a, b) {
  return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
  return Hf.resolve(null).then(a).catch(If);
} : Ff;
function If(a) {
  setTimeout(function() {
    throw a;
  });
}
function Kf(a, b) {
  var c = b, d = 0;
  do {
    var e = c.nextSibling;
    a.removeChild(c);
    if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
      if (0 === d) {
        a.removeChild(e);
        bd(b);
        return;
      }
      d--;
    } else "$" !== c && "$?" !== c && "$!" !== c || d++;
    c = e;
  } while (c);
  bd(b);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b) break;
    if (8 === b) {
      b = a.data;
      if ("$" === b || "$!" === b || "$?" === b) break;
      if ("/$" === b) return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b = 0; a; ) {
    if (8 === a.nodeType) {
      var c = a.data;
      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b) return a;
        b--;
      } else "/$" === c && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b = a[Of];
  if (b) return b;
  for (var c = a.parentNode; c; ) {
    if (b = c[uf] || c[Of]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
        if (c = a[Of]) return c;
        a = Mf(a);
      }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(p(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a) {
  return { current: a };
}
function E(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a, b) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a, b) {
  var c = a.type.contextTypes;
  if (!c) return Vf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e = {}, f2;
  for (f2 in c) e[f2] = b[f2];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E(Wf);
  E(H);
}
function ag(a, b, c) {
  if (H.current !== Vf) throw Error(p(168));
  G(H, b);
  G(Wf, c);
}
function bg(a, b, c) {
  var d = a.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();
  for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
  return A({}, c, d);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G(H, a);
  G(Wf, Wf.current);
  return true;
}
function dg(a, b, c) {
  var d = a.stateNode;
  if (!d) throw Error(p(169));
  c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
  G(Wf, c);
}
var eg = null, fg = false, gg = false;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = true;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a = 0, b = C;
    try {
      var c = eg;
      for (C = 1; a < c.length; a++) {
        var d = c[a];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
    } finally {
      C = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b;
}
function ug(a, b, c) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d = rg;
  a = sg;
  var e = 32 - oc(d) - 1;
  d &= ~(1 << e);
  c += 1;
  var f2 = 32 - oc(b) + e;
  if (30 < f2) {
    var g = e - e % 5;
    f2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e -= g;
    rg = 1 << 32 - oc(b) + e | c << e | d;
    sg = f2 + a;
  } else rg = 1 << f2 | c << e | d, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a, b) {
  var c = Bg(5, null, null, 0);
  c.elementType = "DELETED";
  c.stateNode = b;
  c.return = a;
  b = a.deletions;
  null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
}
function Cg(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I) {
    var b = yg;
    if (b) {
      var c = b;
      if (!Cg(a, b)) {
        if (Dg(a)) throw Error(p(418));
        b = Lf(c.nextSibling);
        var d = xg;
        b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
      }
    } else {
      if (Dg(a)) throw Error(p(418));
      a.flags = a.flags & -4097 | 2;
      I = false;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg) return false;
  if (!I) return Fg(a), I = true, false;
  var b;
  (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a)) throw Hg(), Error(p(418));
    for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(p(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("/$" === c) {
            if (0 === b) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b--;
          } else "$" !== c && "$!" !== c && "$?" !== c || b++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a = yg; a; ) a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b, c) {
  a = c.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (1 !== c.tag) throw Error(p(309));
        var d = c.stateNode;
      }
      if (!d) throw Error(p(147, a));
      var e = d, f2 = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
      b = function(a2) {
        var b2 = e.refs;
        null === a2 ? delete b2[f2] : b2[f2] = a2;
      };
      b._stringRef = f2;
      return b;
    }
    if ("string" !== typeof a) throw Error(p(284));
    if (!c._owner) throw Error(p(290, a));
  }
  return a;
}
function Mg(a, b) {
  a = Object.prototype.toString.call(b);
  throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
}
function Ng(a) {
  var b = a._init;
  return b(a._payload);
}
function Og(a) {
  function b(b2, c2) {
    if (a) {
      var d2 = b2.deletions;
      null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
    }
  }
  function c(c2, d2) {
    if (!a) return null;
    for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b2) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
    return a2;
  }
  function e(a2, b2) {
    a2 = Pg(a2, b2);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f2(b2, c2, d2) {
    b2.index = d2;
    if (!a) return b2.flags |= 1048576, c2;
    d2 = b2.alternate;
    if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
    b2.flags |= 2;
    return c2;
  }
  function g(b2) {
    a && null === b2.alternate && (b2.flags |= 2);
    return b2;
  }
  function h(a2, b2, c2, d2) {
    if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function k2(a2, b2, c2, d2) {
    var f3 = c2.type;
    if (f3 === ya) return m2(a2, b2, c2.props.children, d2, c2.key);
    if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
    d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
    d2.ref = Lg(a2, b2, c2);
    d2.return = a2;
    return d2;
  }
  function l2(a2, b2, c2, d2) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2.children || []);
    b2.return = a2;
    return b2;
  }
  function m2(a2, b2, c2, d2, f3) {
    if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f3), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function q2(a2, b2, c2) {
    if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case va:
          return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
        case wa:
          return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
        case Ha:
          var d2 = b2._init;
          return q2(a2, d2(b2._payload), c2);
      }
      if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
      Mg(a2, b2);
    }
    return null;
  }
  function r2(a2, b2, c2, d2) {
    var e2 = null !== b2 ? b2.key : null;
    if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
    if ("object" === typeof c2 && null !== c2) {
      switch (c2.$$typeof) {
        case va:
          return c2.key === e2 ? k2(a2, b2, c2, d2) : null;
        case wa:
          return c2.key === e2 ? l2(a2, b2, c2, d2) : null;
        case Ha:
          return e2 = c2._init, r2(
            a2,
            b2,
            e2(c2._payload),
            d2
          );
      }
      if (eb(c2) || Ka(c2)) return null !== e2 ? null : m2(a2, b2, c2, d2, null);
      Mg(a2, c2);
    }
    return null;
  }
  function y2(a2, b2, c2, d2, e2) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k2(b2, a2, d2, e2);
        case wa:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e2);
        case Ha:
          var f3 = d2._init;
          return y2(a2, b2, c2, f3(d2._payload), e2);
      }
      if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m2(b2, a2, d2, e2, null);
      Mg(b2, d2);
    }
    return null;
  }
  function n2(e2, g2, h2, k3) {
    for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e2, u2, h2[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a && u2 && null === n3.alternate && b(e2, u2);
      g2 = f2(n3, g2, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h2.length) return c(e2, u2), I && tg(e2, w2), l3;
    if (null === u2) {
      for (; w2 < h2.length; w2++) u2 = q2(e2, h2[w2], k3), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I && tg(e2, w2);
      return l3;
    }
    for (u2 = d(e2, u2); w2 < h2.length; w2++) x2 = y2(u2, e2, w2, h2[w2], k3), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a && u2.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function t2(e2, g2, h2, k3) {
    var l3 = Ka(h2);
    if ("function" !== typeof l3) throw Error(p(150));
    h2 = l3.call(h2);
    if (null == h2) throw Error(p(151));
    for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e2, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a && m3 && null === t3.alternate && b(e2, m3);
      g2 = f2(t3, g2, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done) return c(
      e2,
      m3
    ), I && tg(e2, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h2.next()) n3 = q2(e2, n3.value, k3), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I && tg(e2, w2);
      return l3;
    }
    for (m3 = d(e2, m3); !n3.done; w2++, n3 = h2.next()) n3 = y2(m3, e2, w2, n3.value, k3), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a && m3.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function J2(a2, d2, f3, h2) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d2; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c(a2, l3.sibling);
                    d2 = e(l3, f3.props.children);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                  c(a2, l3.sibling);
                  d2 = e(l3, f3.props);
                  d2.ref = Lg(a2, l3, f3);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                }
                c(a2, l3);
                break;
              } else b(a2, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d2 = Tg(f3.props.children, a2.mode, h2, f3.key), d2.return = a2, a2 = d2) : (h2 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f3), h2.return = a2, a2 = h2);
          }
          return g(a2);
        case wa:
          a: {
            for (l3 = f3.key; null !== d2; ) {
              if (d2.key === l3) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                c(a2, d2.sibling);
                d2 = e(d2, f3.children || []);
                d2.return = a2;
                a2 = d2;
                break a;
              } else {
                c(a2, d2);
                break;
              }
              else b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = Sg(f3, a2.mode, h2);
            d2.return = a2;
            a2 = d2;
          }
          return g(a2);
        case Ha:
          return l3 = f3._init, J2(a2, d2, l3(f3._payload), h2);
      }
      if (eb(f3)) return n2(a2, d2, f3, h2);
      if (Ka(f3)) return t2(a2, d2, f3, h2);
      Mg(a2, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f3, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a) {
  var b = Wg.current;
  E(Wg);
  a._currentValue = b;
}
function bh(a, b, c) {
  for (; null !== a; ) {
    var d = a.alternate;
    (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a === c) break;
    a = a.return;
  }
}
function ch(a, b) {
  Xg = a;
  Zg = Yg = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
}
function eh(a) {
  var b = a._currentValue;
  if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
    if (null === Xg) throw Error(p(308));
    Yg = a;
    Xg.dependencies = { lanes: 0, firstContext: a };
  } else Yg = Yg.next = a;
  return b;
}
var fh = null;
function gh(a) {
  null === fh ? fh = [a] : fh.push(a);
}
function hh(a, b, c, d) {
  var e = b.interleaved;
  null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
  b.interleaved = c;
  return ih(a, d);
}
function ih(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  c = a;
  for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
  return 3 === c.tag ? c.stateNode : null;
}
var jh = false;
function kh(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function mh(a, b) {
  return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function nh(a, b, c) {
  var d = a.updateQueue;
  if (null === d) return null;
  d = d.shared;
  if (0 !== (K & 2)) {
    var e = d.pending;
    null === e ? b.next = b : (b.next = e.next, e.next = b);
    d.pending = b;
    return ih(a, c);
  }
  e = d.interleaved;
  null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
  d.interleaved = b;
  return ih(a, c);
}
function oh(a, b, c) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
function ph(a, b) {
  var c = a.updateQueue, d = a.alternate;
  if (null !== d && (d = d.updateQueue, c === d)) {
    var e = null, f2 = null;
    c = c.firstBaseUpdate;
    if (null !== c) {
      do {
        var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
        null === f2 ? e = f2 = g : f2 = f2.next = g;
        c = c.next;
      } while (null !== c);
      null === f2 ? e = f2 = b : f2 = f2.next = b;
    } else e = f2 = b;
    c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function qh(a, b, c, d) {
  var e = a.updateQueue;
  jh = false;
  var f2 = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
  if (null !== h) {
    e.shared.pending = null;
    var k2 = h, l2 = k2.next;
    k2.next = null;
    null === g ? f2 = l2 : g.next = l2;
    g = k2;
    var m2 = a.alternate;
    null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e.baseState;
    g = 0;
    m2 = l2 = k2 = null;
    h = f2;
    do {
      var r2 = h.lane, y2 = h.eventTime;
      if ((d & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n2 = a, t2 = h;
          r2 = b;
          y2 = c;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2) break a;
              q2 = A({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
      } else y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
      h = h.next;
      if (null === h) if (h = e.shared.pending, null === h) break;
      else r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e.baseState = k2;
    e.firstBaseUpdate = l2;
    e.lastBaseUpdate = m2;
    b = e.shared.interleaved;
    if (null !== b) {
      e = b;
      do
        g |= e.lane, e = e.next;
      while (e !== b);
    } else null === f2 && (e.shared.lanes = 0);
    rh |= g;
    a.lanes = g;
    a.memoizedState = q2;
  }
}
function sh(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a) for (b = 0; b < a.length; b++) {
    var d = a[b], e = d.callback;
    if (null !== e) {
      d.callback = null;
      d = c;
      if ("function" !== typeof e) throw Error(p(191, e));
      e.call(d);
    }
  }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a) {
  if (a === th) throw Error(p(174));
  return a;
}
function yh(a, b) {
  G(wh, b);
  G(vh, a);
  G(uh, th);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
  }
  E(uh);
  G(uh, b);
}
function zh() {
  E(uh);
  E(vh);
  E(wh);
}
function Ah(a) {
  xh(wh.current);
  var b = xh(uh.current);
  var c = lb(b, a.type);
  b !== c && (G(vh, a), G(uh, c));
}
function Bh(a) {
  vh.current === a && (E(uh), E(vh));
}
var L = Uf(0);
function Ch(a) {
  for (var b = a; null !== b; ) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a) break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a) return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P() {
  throw Error(p(321));
}
function Mh(a, b) {
  if (null === b) return false;
  for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
  return true;
}
function Nh(a, b, c, d, e, f2) {
  Hh = f2;
  M = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
  a = c(d, e);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2) throw Error(p(301));
      f2 += 1;
      O = N = null;
      b.updateQueue = null;
      Fh.current = Qh;
      a = c(d, e);
    } while (Jh);
  }
  Fh.current = Rh;
  b = null !== N && null !== N.next;
  Hh = 0;
  O = N = M = null;
  Ih = false;
  if (b) throw Error(p(300));
  return a;
}
function Sh() {
  var a = 0 !== Kh;
  Kh = 0;
  return a;
}
function Th() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O ? M.memoizedState = O = a : O = O.next = a;
  return O;
}
function Uh() {
  if (null === N) {
    var a = M.alternate;
    a = null !== a ? a.memoizedState : null;
  } else a = N.next;
  var b = null === O ? M.memoizedState : O.next;
  if (null !== b) O = b, N = a;
  else {
    if (null === a) throw Error(p(310));
    N = a;
    a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
    null === O ? M.memoizedState = O = a : O = O.next = a;
  }
  return O;
}
function Vh(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function Wh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = N, e = d.baseQueue, f2 = c.pending;
  if (null !== f2) {
    if (null !== e) {
      var g = e.next;
      e.next = f2.next;
      f2.next = g;
    }
    d.baseQueue = e = f2;
    c.pending = null;
  }
  if (null !== e) {
    f2 = e.next;
    d = d.baseState;
    var h = g = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h = k2 = q2, g = d) : k2 = k2.next = q2;
        M.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g = d : k2.next = h;
    He(d, b.memoizedState) || (dh = true);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k2;
    c.lastRenderedState = d;
  }
  a = c.interleaved;
  if (null !== a) {
    e = a;
    do
      f2 = e.lane, M.lanes |= f2, rh |= f2, e = e.next;
    while (e !== a);
  } else null === e && (c.lanes = 0);
  return [b.memoizedState, c.dispatch];
}
function Xh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch, e = c.pending, f2 = b.memoizedState;
  if (null !== e) {
    c.pending = null;
    var g = e = e.next;
    do
      f2 = a(f2, g.action), g = g.next;
    while (g !== e);
    He(f2, b.memoizedState) || (dh = true);
    b.memoizedState = f2;
    null === b.baseQueue && (b.baseState = f2);
    c.lastRenderedState = f2;
  }
  return [f2, d];
}
function Yh() {
}
function Zh(a, b) {
  var c = M, d = Uh(), e = b(), f2 = !He(d.memoizedState, e);
  f2 && (d.memoizedState = e, dh = true);
  d = d.queue;
  $h(ai.bind(null, c, d, a), [a]);
  if (d.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
    c.flags |= 2048;
    bi(9, ci.bind(null, c, d, e, b), void 0, null);
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(c, b, e);
  }
  return e;
}
function di(a, b, c) {
  a.flags |= 16384;
  a = { getSnapshot: b, value: c };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
}
function ci(a, b, c, d) {
  b.value = c;
  b.getSnapshot = d;
  ei(b) && fi(a);
}
function ai(a, b, c) {
  return c(function() {
    ei(b) && fi(a);
  });
}
function ei(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var c = b();
    return !He(a, c);
  } catch (d) {
    return true;
  }
}
function fi(a) {
  var b = ih(a, 1);
  null !== b && gi(b, a, 1, -1);
}
function hi(a) {
  var b = Th();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
  b.queue = a;
  a = a.dispatch = ii.bind(null, M, a);
  return [b.memoizedState, a];
}
function bi(a, b, c, d) {
  a = { tag: a, create: b, destroy: c, deps: d, next: null };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a, b, c, d) {
  var e = Th();
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
}
function li(a, b, c, d) {
  var e = Uh();
  d = void 0 === d ? null : d;
  var f2 = void 0;
  if (null !== N) {
    var g = N.memoizedState;
    f2 = g.destroy;
    if (null !== d && Mh(d, g.deps)) {
      e.memoizedState = bi(b, c, f2, d);
      return;
    }
  }
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, f2, d);
}
function mi(a, b) {
  return ki(8390656, 8, a, b);
}
function $h(a, b) {
  return li(2048, 8, a, b);
}
function ni(a, b) {
  return li(4, 2, a, b);
}
function oi(a, b) {
  return li(4, 4, a, b);
}
function pi(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function() {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
    b.current = null;
  };
}
function qi(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return li(4, 4, pi.bind(null, b, a), c);
}
function ri() {
}
function si(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  c.memoizedState = [a, b];
  return a;
}
function ti(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function ui(a, b, c) {
  if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
  He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
  return b;
}
function vi(a, b) {
  var c = C;
  C = 0 !== c && 4 > c ? c : 4;
  a(true);
  var d = Gh.transition;
  Gh.transition = {};
  try {
    a(false), b();
  } finally {
    C = c, Gh.transition = d;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a, b, c) {
  var d = yi(a);
  c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, c);
  else if (c = hh(a, b, c, d), null !== c) {
    var e = R();
    gi(c, a, d, e);
    Bi(c, b, d);
  }
}
function ii(a, b, c) {
  var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, e);
  else {
    var f2 = a.alternate;
    if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
      var g = b.lastRenderedState, h = f2(g, c);
      e.hasEagerState = true;
      e.eagerState = h;
      if (He(h, g)) {
        var k2 = b.interleaved;
        null === k2 ? (e.next = e, gh(b)) : (e.next = k2.next, k2.next = e);
        b.interleaved = e;
        return;
      }
    } catch (l2) {
    } finally {
    }
    c = hh(a, b, e, d);
    null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
  }
}
function zi(a) {
  var b = a.alternate;
  return a === M || null !== b && b === M;
}
function Ai(a, b) {
  Jh = Ih = true;
  var c = a.pending;
  null === c ? b.next = b : (b.next = c.next, c.next = b);
  a.pending = b;
}
function Bi(a, b, c) {
  if (0 !== (c & 4194240)) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
  Th().memoizedState = [a, void 0 === b ? null : b];
  return a;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b, a),
    c
  );
}, useLayoutEffect: function(a, b) {
  return ki(4194308, 4, a, b);
}, useInsertionEffect: function(a, b) {
  return ki(4, 2, a, b);
}, useMemo: function(a, b) {
  var c = Th();
  b = void 0 === b ? null : b;
  a = a();
  c.memoizedState = [a, b];
  return a;
}, useReducer: function(a, b, c) {
  var d = Th();
  b = void 0 !== c ? c(b) : b;
  d.memoizedState = d.baseState = b;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
  d.queue = a;
  a = a.dispatch = xi.bind(null, M, a);
  return [d.memoizedState, a];
}, useRef: function(a) {
  var b = Th();
  a = { current: a };
  return b.memoizedState = a;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
  return Th().memoizedState = a;
}, useTransition: function() {
  var a = hi(false), b = a[0];
  a = vi.bind(null, a[1]);
  Th().memoizedState = a;
  return [b, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b, c) {
  var d = M, e = Th();
  if (I) {
    if (void 0 === c) throw Error(p(407));
    c = c();
  } else {
    c = b();
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(d, b, c);
  }
  e.memoizedState = c;
  var f2 = { value: c, getSnapshot: b };
  e.queue = f2;
  mi(ai.bind(
    null,
    d,
    f2,
    a
  ), [a]);
  d.flags |= 2048;
  bi(9, ci.bind(null, d, f2, c, b), void 0, null);
  return c;
}, useId: function() {
  var a = Th(), b = Q.identifierPrefix;
  if (I) {
    var c = sg;
    var d = rg;
    c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
    b = ":" + b + "R" + c;
    c = Kh++;
    0 < c && (b += "H" + c.toString(32));
    b += ":";
  } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
  return a.memoizedState = b;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a) {
    var b = Uh();
    return ui(b, N.memoizedState, a);
  },
  useTransition: function() {
    var a = Wh(Vh)[0], b = Uh().memoizedState;
    return [a, b];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a) {
  var b = Uh();
  return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
}, useTransition: function() {
  var a = Xh(Vh)[0], b = Uh().memoizedState;
  return [a, b];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a, b) {
  if (a && a.defaultProps) {
    b = A({}, b);
    a = a.defaultProps;
    for (var c in a) void 0 === b[c] && (b[c] = a[c]);
    return b;
  }
  return b;
}
function Di(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : A({}, b, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}
var Ei = { isMounted: function(a) {
  return (a = a._reactInternals) ? Vb(a) === a : false;
}, enqueueSetState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f2 = mh(d, e);
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueReplaceState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f2 = mh(d, e);
  f2.tag = 1;
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueForceUpdate: function(a, b) {
  a = a._reactInternals;
  var c = R(), d = yi(a), e = mh(c, d);
  e.tag = 2;
  void 0 !== b && null !== b && (e.callback = b);
  b = nh(a, e, d);
  null !== b && (gi(b, a, d, c), oh(b, a, d));
} };
function Fi(a, b, c, d, e, f2, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f2) : true;
}
function Gi(a, b, c) {
  var d = false, e = Vf;
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
  b = new b(c, f2);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Ei;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function Hi(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
}
function Ii(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = {};
  kh(a);
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? e.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e.context = Yf(a, f2));
  e.state = a.memoizedState;
  f2 = b.getDerivedStateFromProps;
  "function" === typeof f2 && (Di(a, b, f2, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
  "function" === typeof e.componentDidMount && (a.flags |= 4194308);
}
function Ji(a, b) {
  try {
    var c = "", d = b;
    do
      c += Pa(d), d = d.return;
    while (d);
    var e = c;
  } catch (f2) {
    e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a, source: b, stack: e, digest: null };
}
function Ki(a, b, c) {
  return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
}
function Li(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function() {
      throw c;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  c.payload = { element: null };
  var d = b.value;
  c.callback = function() {
    Oi || (Oi = true, Pi = d);
    Li(a, b);
  };
  return c;
}
function Qi(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e = b.value;
    c.payload = function() {
      return d(e);
    };
    c.callback = function() {
      Li(a, b);
    };
  }
  var f2 = a.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
    Li(a, b);
    "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c2 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
  });
  return c;
}
function Si(a, b, c) {
  var d = a.pingCache;
  if (null === d) {
    d = a.pingCache = new Mi();
    var e = /* @__PURE__ */ new Set();
    d.set(b, e);
  } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
  e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
}
function Ui(a) {
  do {
    var b;
    if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
    if (b) return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Vi(a, b, c, d, e) {
  if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e;
  return a;
}
var Wi = ua.ReactCurrentOwner, dh = false;
function Xi(a, b, c, d) {
  b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
}
function Yi(a, b, c, d, e) {
  c = c.render;
  var f2 = b.ref;
  ch(b, e);
  d = Nh(a, b, c, d, f2, e);
  c = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && c && vg(b);
  b.flags |= 1;
  Xi(a, b, d, e);
  return b.child;
}
function $i(a, b, c, d, e) {
  if (null === a) {
    var f2 = c.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f2, bj(a, b, f2, d, e);
    a = Rg(c.type, null, d, b, b.mode, e);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  f2 = a.child;
  if (0 === (a.lanes & e)) {
    var g = f2.memoizedProps;
    c = c.compare;
    c = null !== c ? c : Ie;
    if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
  }
  b.flags |= 1;
  a = Pg(f2, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function bj(a, b, c, d, e) {
  if (null !== a) {
    var f2 = a.memoizedProps;
    if (Ie(f2, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f2, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
    else return b.lanes = a.lanes, Zi(a, b, e);
  }
  return cj(a, b, c, d, e);
}
function dj(a, b, c) {
  var d = b.pendingProps, e = d.children, f2 = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
  else {
    if (0 === (c & 1073741824)) return a = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
    b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
    d = null !== f2 ? f2.baseLanes : c;
    G(ej, fj);
    fj |= d;
  }
  else null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
  Xi(a, b, e, c);
  return b.child;
}
function gj(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
}
function cj(a, b, c, d, e) {
  var f2 = Zf(c) ? Xf : H.current;
  f2 = Yf(b, f2);
  ch(b, e);
  c = Nh(a, b, c, d, f2, e);
  d = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && d && vg(b);
  b.flags |= 1;
  Xi(a, b, c, e);
  return b.child;
}
function hj(a, b, c, d, e) {
  if (Zf(c)) {
    var f2 = true;
    cg(b);
  } else f2 = false;
  ch(b, e);
  if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
  else if (null === a) {
    var g = b.stateNode, h = b.memoizedProps;
    g.props = h;
    var k2 = g.context, l2 = c.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c) ? Xf : H.current, l2 = Yf(b, l2));
    var m2 = c.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k2 !== l2) && Hi(b, g, d, l2);
    jh = false;
    var r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    k2 = b.memoizedState;
    h !== d || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c, m2, d), k2 = b.memoizedState), (h = jh || Fi(b, c, h, d, r2, k2, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
  } else {
    g = b.stateNode;
    lh(a, b);
    h = b.memoizedProps;
    l2 = b.type === b.elementType ? h : Ci(b.type, h);
    g.props = l2;
    q2 = b.pendingProps;
    r2 = g.context;
    k2 = c.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c) ? Xf : H.current, k2 = Yf(b, k2));
    var y2 = c.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k2) && Hi(b, g, d, k2);
    jh = false;
    r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    var n2 = b.memoizedState;
    h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c, l2, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k2, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
  }
  return jj(a, b, c, d, f2, e);
}
function jj(a, b, c, d, e, f2) {
  gj(a, b);
  var g = 0 !== (b.flags & 128);
  if (!d && !g) return e && dg(b, c, false), Zi(a, b, f2);
  d = b.stateNode;
  Wi.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g ? (b.child = Ug(b, a.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a, b, h, f2);
  b.memoizedState = d.state;
  e && dg(b, c, true);
  return b.child;
}
function kj(a) {
  var b = a.stateNode;
  b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
  yh(a, b.containerInfo);
}
function lj(a, b, c, d, e) {
  Ig();
  Jg(e);
  b.flags |= 256;
  Xi(a, b, c, d);
  return b.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function oj(a, b, c) {
  var d = b.pendingProps, e = L.current, f2 = false, g = 0 !== (b.flags & 128), h;
  (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
  if (h) f2 = true, b.flags &= -129;
  else if (null === a || null !== a.memoizedState) e |= 1;
  G(L, e & 1);
  if (null === a) {
    Eg(b);
    a = b.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a = d.fallback;
    return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a = Tg(a, d, c, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
  }
  e = a.memoizedState;
  if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
  if (f2) {
    f2 = d.fallback;
    g = b.mode;
    e = a.child;
    h = e.sibling;
    var k2 = { mode: "hidden", children: d.children };
    0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = Pg(e, k2), d.subtreeFlags = e.subtreeFlags & 14680064);
    null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g, c, null), f2.flags |= 2);
    f2.return = b;
    d.return = b;
    d.sibling = f2;
    b.child = d;
    d = f2;
    f2 = b.child;
    g = a.child.memoizedState;
    g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
    f2.memoizedState = g;
    f2.childLanes = a.childLanes & ~c;
    b.memoizedState = mj;
    return d;
  }
  f2 = a.child;
  a = f2.sibling;
  d = Pg(f2, { mode: "visible", children: d.children });
  0 === (b.mode & 1) && (d.lanes = c);
  d.return = b;
  d.sibling = null;
  null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function qj(a, b) {
  b = pj({ mode: "visible", children: b }, a.mode, 0, null);
  b.return = a;
  return a.child = b;
}
function sj(a, b, c, d) {
  null !== d && Jg(d);
  Ug(b, a.child, null, c);
  a = qj(b, b.pendingProps.children);
  a.flags |= 2;
  b.memoizedState = null;
  return a;
}
function rj(a, b, c, d, e, f2, g) {
  if (c) {
    if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
    if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
    f2 = d.fallback;
    e = b.mode;
    d = pj({ mode: "visible", children: d.children }, e, 0, null);
    f2 = Tg(f2, e, g, null);
    f2.flags |= 2;
    d.return = b;
    f2.return = b;
    d.sibling = f2;
    b.child = d;
    0 !== (b.mode & 1) && Ug(b, a.child, null, g);
    b.child.memoizedState = nj(g);
    b.memoizedState = mj;
    return f2;
  }
  if (0 === (b.mode & 1)) return sj(a, b, g, null);
  if ("$!" === e.data) {
    d = e.nextSibling && e.nextSibling.dataset;
    if (d) var h = d.dgst;
    d = h;
    f2 = Error(p(419));
    d = Ki(f2, d, void 0);
    return sj(a, b, g, d);
  }
  h = 0 !== (g & a.childLanes);
  if (dh || h) {
    d = Q;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e = 2;
          break;
        case 16:
          e = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e = 32;
          break;
        case 536870912:
          e = 268435456;
          break;
        default:
          e = 0;
      }
      e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
      0 !== e && e !== f2.retryLane && (f2.retryLane = e, ih(a, e), gi(d, a, e, -1));
    }
    tj();
    d = Ki(Error(p(421)));
    return sj(a, b, g, d);
  }
  if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
  a = f2.treeContext;
  yg = Lf(e.nextSibling);
  xg = b;
  I = true;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
  b = qj(b, d.children);
  b.flags |= 4096;
  return b;
}
function vj(a, b, c) {
  a.lanes |= b;
  var d = a.alternate;
  null !== d && (d.lanes |= b);
  bh(a.return, b, c);
}
function wj(a, b, c, d, e) {
  var f2 = a.memoizedState;
  null === f2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e);
}
function xj(a, b, c) {
  var d = b.pendingProps, e = d.revealOrder, f2 = d.tail;
  Xi(a, b, d.children, c);
  d = L.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
  else {
    if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
      if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
      else if (19 === a.tag) vj(a, c, b);
      else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b) break a;
      for (; null === a.sibling; ) {
        if (null === a.return || a.return === b) break a;
        a = a.return;
      }
      a.sibling.return = a.return;
      a = a.sibling;
    }
    d &= 1;
  }
  G(L, d);
  if (0 === (b.mode & 1)) b.memoizedState = null;
  else switch (e) {
    case "forwards":
      c = b.child;
      for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
      c = e;
      null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
      wj(b, false, e, c, f2);
      break;
    case "backwards":
      c = null;
      e = b.child;
      for (b.child = null; null !== e; ) {
        a = e.alternate;
        if (null !== a && null === Ch(a)) {
          b.child = e;
          break;
        }
        a = e.sibling;
        e.sibling = c;
        c = e;
        e = a;
      }
      wj(b, true, c, null, f2);
      break;
    case "together":
      wj(b, false, null, null, void 0);
      break;
    default:
      b.memoizedState = null;
  }
  return b.child;
}
function ij(a, b) {
  0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
}
function Zi(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  rh |= b.lanes;
  if (0 === (c & b.childLanes)) return null;
  if (null !== a && b.child !== a.child) throw Error(p(153));
  if (null !== b.child) {
    a = b.child;
    c = Pg(a, a.pendingProps);
    b.child = c;
    for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
    c.sibling = null;
  }
  return b.child;
}
function yj(a, b, c) {
  switch (b.tag) {
    case 3:
      kj(b);
      Ig();
      break;
    case 5:
      Ah(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      yh(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e = b.memoizedProps.value;
      G(Wg, d._currentValue);
      d._currentValue = e;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
        if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
        G(L, L.current & 1);
        a = Zi(a, b, c);
        return null !== a ? a.sibling : null;
      }
      G(L, L.current & 1);
      break;
    case 19:
      d = 0 !== (c & b.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d) return xj(a, b, c);
        b.flags |= 128;
      }
      e = b.memoizedState;
      null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
      G(L, L.current);
      if (d) break;
      else return null;
    case 22:
    case 23:
      return b.lanes = 0, dj(a, b, c);
  }
  return Zi(a, b, c);
}
var zj, Aj, Bj, Cj;
zj = function(a, b) {
  for (var c = b.child; null !== c; ) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
    else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b) break;
    for (; null === c.sibling; ) {
      if (null === c.return || c.return === b) return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Aj = function() {
};
Bj = function(a, b, c, d) {
  var e = a.memoizedProps;
  if (e !== d) {
    a = b.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c) {
      case "input":
        e = Ya(a, e);
        d = Ya(a, d);
        f2 = [];
        break;
      case "select":
        e = A({}, e, { value: void 0 });
        d = A({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e = gb(a, e);
        d = gb(a, d);
        f2 = [];
        break;
      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
    }
    ub(c, d);
    var g;
    c = null;
    for (l2 in e) if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2]) if ("style" === l2) {
      var h = e[l2];
      for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
    } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k2 = d[l2];
      h = null != e ? e[l2] : void 0;
      if (d.hasOwnProperty(l2) && k2 !== h && (null != k2 || null != h)) if ("style" === l2) if (h) {
        for (g in h) !h.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
        for (g in k2) k2.hasOwnProperty(g) && h[g] !== k2[g] && (c || (c = {}), c[g] = k2[g]);
      } else c || (f2 || (f2 = []), f2.push(
        l2,
        c
      )), c = k2;
      else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, null != k2 && h !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D("scroll", a), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c && (f2 = f2 || []).push("style", c);
    var l2 = f2;
    if (b.updateQueue = l2) b.flags |= 4;
  }
};
Cj = function(a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Dj(a, b) {
  if (!I) switch (a.tailMode) {
    case "hidden":
      b = a.tail;
      for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
      null === c ? a.tail = null : c.sibling = null;
      break;
    case "collapsed":
      c = a.tail;
      for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
      null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
  }
}
function S(a) {
  var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
  if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
  else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c;
  return b;
}
function Ej(a, b, c) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b), null;
    case 1:
      return Zf(b.type) && $f(), S(b), null;
    case 3:
      d = b.stateNode;
      zh();
      E(Wf);
      E(H);
      Eh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a, b);
      S(b);
      return null;
    case 5:
      Bh(b);
      var e = xh(wh.current);
      c = b.type;
      if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (null === b.stateNode) throw Error(p(166));
          S(b);
          return null;
        }
        a = xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.type;
          var f2 = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f2;
          a = 0 !== (b.mode & 1);
          switch (c) {
            case "dialog":
              D("cancel", d);
              D("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", d);
              break;
            case "video":
            case "audio":
              for (e = 0; e < lf.length; e++) D(lf[e], d);
              break;
            case "source":
              D("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D(
                "error",
                d
              );
              D("load", d);
              break;
            case "details":
              D("toggle", d);
              break;
            case "input":
              Za(d, f2);
              D("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D("invalid", d);
              break;
            case "textarea":
              hb(d, f2), D("invalid", d);
          }
          ub(c, f2);
          e = null;
          for (var g in f2) if (f2.hasOwnProperty(g)) {
            var h = f2[g];
            "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
              d.textContent,
              h,
              a
            ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
          }
          switch (c) {
            case "input":
              Va(d);
              db(d, f2, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d.onclick = Bf);
          }
          d = e;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e.nodeType ? e : e.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
          a[Of] = b;
          a[Pf] = d;
          zj(a, b, false, false);
          b.stateNode = a;
          a: {
            g = vb(c, d);
            switch (c) {
              case "dialog":
                D("cancel", a);
                D("close", a);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", a);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D(lf[e], a);
                e = d;
                break;
              case "source":
                D("error", a);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  a
                );
                D("load", a);
                e = d;
                break;
              case "details":
                D("toggle", a);
                e = d;
                break;
              case "input":
                Za(a, d);
                e = Ya(a, d);
                D("invalid", a);
                break;
              case "option":
                e = d;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d.multiple };
                e = A({}, d, { value: void 0 });
                D("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e = gb(a, d);
                D("invalid", a);
                break;
              default:
                e = d;
            }
            ub(c, e);
            h = e;
            for (f2 in h) if (h.hasOwnProperty(f2)) {
              var k2 = h[f2];
              "style" === f2 ? sb(a, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c || "" !== k2) && ob(a, k2) : "number" === typeof k2 && ob(a, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D("scroll", a) : null != k2 && ta(a, f2, k2, g));
            }
            switch (c) {
              case "input":
                Va(a);
                db(a, d, false);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f2 = d.value;
                null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                  a,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e.onClick && (a.onclick = Bf);
            }
            switch (c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S(b);
      return null;
    case 6:
      if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
        c = xh(wh.current);
        xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.memoizedProps;
          d[Of] = b;
          if (f2 = d.nodeValue !== c) {
            if (a = xg, null !== a) switch (a.tag) {
              case 3:
                Af(d.nodeValue, c, 0 !== (a.mode & 1));
                break;
              case 5:
                true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
            }
          }
          f2 && (b.flags |= 4);
        } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S(b);
      return null;
    case 13:
      E(L);
      d = b.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
        else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a) {
            if (!f2) throw Error(p(318));
            f2 = b.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2) throw Error(p(317));
            f2[Of] = b;
          } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S(b);
          f2 = false;
        } else null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2) return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128)) return b.lanes = c, b;
      d = null !== d;
      d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
      null !== b.updateQueue && (b.flags |= 4);
      S(b);
      return null;
    case 4:
      return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
    case 10:
      return ah(b.type._context), S(b), null;
    case 17:
      return Zf(b.type) && $f(), S(b), null;
    case 19:
      E(L);
      f2 = b.memoizedState;
      if (null === f2) return S(b), null;
      d = 0 !== (b.flags & 128);
      g = f2.rendering;
      if (null === g) if (d) Dj(f2, false);
      else {
        if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
          g = Ch(a);
          if (null !== g) {
            b.flags |= 128;
            Dj(f2, false);
            d = g.updateQueue;
            null !== d && (b.updateQueue = d, b.flags |= 4);
            b.subtreeFlags = 0;
            d = c;
            for (c = b.child; null !== c; ) f2 = c, a = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a = g.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
            G(L, L.current & 1 | 2);
            return b.child;
          }
          a = a.sibling;
        }
        null !== f2.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
      }
      else {
        if (!d) if (a = Ch(g), null !== a) {
          if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I) return S(b), null;
        } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f2.last, null !== c ? c.sibling = g : b.child = g, f2.last = g);
      }
      if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
      S(b);
      return null;
    case 22:
    case 23:
      return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p(156, b.tag));
}
function Ij(a, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 3:
      return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
    case 5:
      return Bh(b), null;
    case 13:
      E(L);
      a = b.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b.alternate) throw Error(p(340));
        Ig();
      }
      a = b.flags;
      return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 19:
      return E(L), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Lj(a, b) {
  var c = a.ref;
  if (null !== c) if ("function" === typeof c) try {
    c(null);
  } catch (d) {
    W(a, b, d);
  }
  else c.current = null;
}
function Mj(a, b, c) {
  try {
    c();
  } catch (d) {
    W(a, b, d);
  }
}
var Nj = false;
function Oj(a, b) {
  Cf = dd;
  a = Me();
  if (Ne(a)) {
    if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
    else a: {
      c = (c = a.ownerDocument) && c.defaultView || window;
      var d = c.getSelection && c.getSelection();
      if (d && 0 !== d.rangeCount) {
        c = d.anchorNode;
        var e = d.anchorOffset, f2 = d.focusNode;
        d = d.focusOffset;
        try {
          c.nodeType, f2.nodeType;
        } catch (F2) {
          c = null;
          break a;
        }
        var g = 0, h = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
        b: for (; ; ) {
          for (var y2; ; ) {
            q2 !== c || 0 !== e && 3 !== q2.nodeType || (h = g + e);
            q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g + d);
            3 === q2.nodeType && (g += q2.nodeValue.length);
            if (null === (y2 = q2.firstChild)) break;
            r2 = q2;
            q2 = y2;
          }
          for (; ; ) {
            if (q2 === a) break b;
            r2 === c && ++l2 === e && (h = g);
            r2 === f2 && ++m2 === d && (k2 = g);
            if (null !== (y2 = q2.nextSibling)) break;
            q2 = r2;
            r2 = q2.parentNode;
          }
          q2 = y2;
        }
        c = -1 === h || -1 === k2 ? null : { start: h, end: k2 };
      } else c = null;
    }
    c = c || { start: 0, end: 0 };
  } else c = null;
  Df = { focusedElem: a, selectionRange: c };
  dd = false;
  for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
  else for (; null !== V; ) {
    b = V;
    try {
      var n2 = b.alternate;
      if (0 !== (b.flags & 1024)) switch (b.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n2) {
            var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
            x2.__reactInternalSnapshotBeforeUpdate = w2;
          }
          break;
        case 3:
          var u2 = b.stateNode.containerInfo;
          1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p(163));
      }
    } catch (F2) {
      W(b, b.return, F2);
    }
    a = b.sibling;
    if (null !== a) {
      a.return = b.return;
      V = a;
      break;
    }
    V = b.return;
  }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a, b, c) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e = d = d.next;
    do {
      if ((e.tag & a) === a) {
        var f2 = e.destroy;
        e.destroy = void 0;
        void 0 !== f2 && Mj(b, c, f2);
      }
      e = e.next;
    } while (e !== d);
  }
}
function Qj(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c = b = b.next;
    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }
      c = c.next;
    } while (c !== b);
  }
}
function Rj(a) {
  var b = a.ref;
  if (null !== b) {
    var c = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c;
        break;
      default:
        a = c;
    }
    "function" === typeof b ? b(a) : b.current = a;
  }
}
function Sj(a) {
  var b = a.alternate;
  null !== b && (a.alternate = null, Sj(b));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Tj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Uj(a) {
  a: for (; ; ) {
    for (; null === a.sibling; ) {
      if (null === a.return || Tj(a.return)) return null;
      a = a.return;
    }
    a.sibling.return = a.return;
    for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
      if (a.flags & 2) continue a;
      if (null === a.child || 4 === a.tag) continue a;
      else a.child.return = a, a = a.child;
    }
    if (!(a.flags & 2)) return a.stateNode;
  }
}
function Vj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
  else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
}
function Wj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
  else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
}
var X = null, Xj = false;
function Yj(a, b, c) {
  for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
}
function Zj(a, b, c) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c);
  } catch (h) {
  }
  switch (c.tag) {
    case 5:
      U || Lj(c, b);
    case 6:
      var d = X, e = Xj;
      X = null;
      Yj(a, b, c);
      X = d;
      Xj = e;
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
      break;
    case 18:
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
      break;
    case 4:
      d = X;
      e = Xj;
      X = c.stateNode.containerInfo;
      Xj = true;
      Yj(a, b, c);
      X = d;
      Xj = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e = d = d.next;
        do {
          var f2 = e, g = f2.destroy;
          f2 = f2.tag;
          void 0 !== g && (0 !== (f2 & 2) ? Mj(c, b, g) : 0 !== (f2 & 4) && Mj(c, b, g));
          e = e.next;
        } while (e !== d);
      }
      Yj(a, b, c);
      break;
    case 1:
      if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
        d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
      } catch (h) {
        W(c, b, h);
      }
      Yj(a, b, c);
      break;
    case 21:
      Yj(a, b, c);
      break;
    case 22:
      c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
      break;
    default:
      Yj(a, b, c);
  }
}
function ak(a) {
  var b = a.updateQueue;
  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Kj());
    b.forEach(function(b2) {
      var d = bk.bind(null, a, b2);
      c.has(b2) || (c.add(b2), b2.then(d, d));
    });
  }
}
function ck(a, b) {
  var c = b.deletions;
  if (null !== c) for (var d = 0; d < c.length; d++) {
    var e = c[d];
    try {
      var f2 = a, g = b, h = g;
      a: for (; null !== h; ) {
        switch (h.tag) {
          case 5:
            X = h.stateNode;
            Xj = false;
            break a;
          case 3:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
          case 4:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
        }
        h = h.return;
      }
      if (null === X) throw Error(p(160));
      Zj(f2, g, e);
      X = null;
      Xj = false;
      var k2 = e.alternate;
      null !== k2 && (k2.return = null);
      e.return = null;
    } catch (l2) {
      W(e, b, l2);
    }
  }
  if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
}
function dk(a, b) {
  var c = a.alternate, d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b, a);
      ek(a);
      if (d & 4) {
        try {
          Pj(3, a, a.return), Qj(3, a);
        } catch (t2) {
          W(a, a.return, t2);
        }
        try {
          Pj(5, a, a.return);
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 1:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      break;
    case 5:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      if (a.flags & 32) {
        var e = a.stateNode;
        try {
          ob(e, "");
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      if (d & 4 && (e = a.stateNode, null != e)) {
        var f2 = a.memoizedProps, g = null !== c ? c.memoizedProps : f2, h = a.type, k2 = a.updateQueue;
        a.updateQueue = null;
        if (null !== k2) try {
          "input" === h && "radio" === f2.type && null != f2.name && ab(e, f2);
          vb(h, g);
          var l2 = vb(h, f2);
          for (g = 0; g < k2.length; g += 2) {
            var m2 = k2[g], q2 = k2[g + 1];
            "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l2);
          }
          switch (h) {
            case "input":
              bb(e, f2);
              break;
            case "textarea":
              ib(e, f2);
              break;
            case "select":
              var r2 = e._wrapperState.wasMultiple;
              e._wrapperState.wasMultiple = !!f2.multiple;
              var y2 = f2.value;
              null != y2 ? fb(e, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                e,
                !!f2.multiple,
                f2.defaultValue,
                true
              ) : fb(e, !!f2.multiple, f2.multiple ? [] : "", false));
          }
          e[Pf] = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 6:
      ck(b, a);
      ek(a);
      if (d & 4) {
        if (null === a.stateNode) throw Error(p(162));
        e = a.stateNode;
        f2 = a.memoizedProps;
        try {
          e.nodeValue = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 3:
      ck(b, a);
      ek(a);
      if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
        bd(b.containerInfo);
      } catch (t2) {
        W(a, a.return, t2);
      }
      break;
    case 4:
      ck(b, a);
      ek(a);
      break;
    case 13:
      ck(b, a);
      ek(a);
      e = a.child;
      e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
      d & 4 && ak(a);
      break;
    case 22:
      m2 = null !== c && null !== c.memoizedState;
      a.mode & 1 ? (U = (l2 = U) || m2, ck(b, a), U = l2) : ck(b, a);
      ek(a);
      if (d & 8192) {
        l2 = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1)) for (V = a, m2 = a.child; null !== m2; ) {
          for (q2 = V = m2; null !== V; ) {
            r2 = V;
            y2 = r2.child;
            switch (r2.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pj(4, r2, r2.return);
                break;
              case 1:
                Lj(r2, r2.return);
                var n2 = r2.stateNode;
                if ("function" === typeof n2.componentWillUnmount) {
                  d = r2;
                  c = r2.return;
                  try {
                    b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                  } catch (t2) {
                    W(d, c, t2);
                  }
                }
                break;
              case 5:
                Lj(r2, r2.return);
                break;
              case 22:
                if (null !== r2.memoizedState) {
                  gk(q2);
                  continue;
                }
            }
            null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
          }
          m2 = m2.sibling;
        }
        a: for (m2 = null, q2 = a; ; ) {
          if (5 === q2.tag) {
            if (null === m2) {
              m2 = q2;
              try {
                e = q2.stateNode, l2 ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = rb("display", g));
              } catch (t2) {
                W(a, a.return, t2);
              }
            }
          } else if (6 === q2.tag) {
            if (null === m2) try {
              q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
            } catch (t2) {
              W(a, a.return, t2);
            }
          } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
            q2.child.return = q2;
            q2 = q2.child;
            continue;
          }
          if (q2 === a) break a;
          for (; null === q2.sibling; ) {
            if (null === q2.return || q2.return === a) break a;
            m2 === q2 && (m2 = null);
            q2 = q2.return;
          }
          m2 === q2 && (m2 = null);
          q2.sibling.return = q2.return;
          q2 = q2.sibling;
        }
      }
      break;
    case 19:
      ck(b, a);
      ek(a);
      d & 4 && ak(a);
      break;
    case 21:
      break;
    default:
      ck(
        b,
        a
      ), ek(a);
  }
}
function ek(a) {
  var b = a.flags;
  if (b & 2) {
    try {
      a: {
        for (var c = a.return; null !== c; ) {
          if (Tj(c)) {
            var d = c;
            break a;
          }
          c = c.return;
        }
        throw Error(p(160));
      }
      switch (d.tag) {
        case 5:
          var e = d.stateNode;
          d.flags & 32 && (ob(e, ""), d.flags &= -33);
          var f2 = Uj(a);
          Wj(a, f2, e);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h = Uj(a);
          Vj(a, h, g);
          break;
        default:
          throw Error(p(161));
      }
    } catch (k2) {
      W(a, a.return, k2);
    }
    a.flags &= -3;
  }
  b & 4096 && (a.flags &= -4097);
}
function hk(a, b, c) {
  V = a;
  ik(a);
}
function ik(a, b, c) {
  for (var d = 0 !== (a.mode & 1); null !== V; ) {
    var e = V, f2 = e.child;
    if (22 === e.tag && d) {
      var g = null !== e.memoizedState || Jj;
      if (!g) {
        var h = e.alternate, k2 = null !== h && null !== h.memoizedState || U;
        h = Jj;
        var l2 = U;
        Jj = g;
        if ((U = k2) && !l2) for (V = e; null !== V; ) g = V, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k2 ? (k2.return = g, V = k2) : jk(e);
        for (; null !== f2; ) V = f2, ik(f2), f2 = f2.sibling;
        V = e;
        Jj = h;
        U = l2;
      }
      kk(a);
    } else 0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V = f2) : kk(a);
  }
}
function kk(a) {
  for (; null !== V; ) {
    var b = V;
    if (0 !== (b.flags & 8772)) {
      var c = b.alternate;
      try {
        if (0 !== (b.flags & 8772)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            U || Qj(5, b);
            break;
          case 1:
            var d = b.stateNode;
            if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
            else {
              var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
              d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
            }
            var f2 = b.updateQueue;
            null !== f2 && sh(b, f2, d);
            break;
          case 3:
            var g = b.updateQueue;
            if (null !== g) {
              c = null;
              if (null !== b.child) switch (b.child.tag) {
                case 5:
                  c = b.child.stateNode;
                  break;
                case 1:
                  c = b.child.stateNode;
              }
              sh(b, g, c);
            }
            break;
          case 5:
            var h = b.stateNode;
            if (null === c && b.flags & 4) {
              c = h;
              var k2 = b.memoizedProps;
              switch (b.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k2.autoFocus && c.focus();
                  break;
                case "img":
                  k2.src && (c.src = k2.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b.memoizedState) {
              var l2 = b.alternate;
              if (null !== l2) {
                var m2 = l2.memoizedState;
                if (null !== m2) {
                  var q2 = m2.dehydrated;
                  null !== q2 && bd(q2);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p(163));
        }
        U || b.flags & 512 && Rj(b);
      } catch (r2) {
        W(b, b.return, r2);
      }
    }
    if (b === a) {
      V = null;
      break;
    }
    c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function gk(a) {
  for (; null !== V; ) {
    var b = V;
    if (b === a) {
      V = null;
      break;
    }
    var c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function jk(a) {
  for (; null !== V; ) {
    var b = V;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c = b.return;
          try {
            Qj(4, b);
          } catch (k2) {
            W(b, c, k2);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e = b.return;
            try {
              d.componentDidMount();
            } catch (k2) {
              W(b, e, k2);
            }
          }
          var f2 = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, f2, k2);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, g, k2);
          }
      }
    } catch (k2) {
      W(b, b.return, k2);
    }
    if (b === a) {
      V = null;
      break;
    }
    var h = b.sibling;
    if (null !== h) {
      h.return = b.return;
      V = h;
      break;
    }
    V = b.return;
  }
}
var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R() {
  return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
}
function yi(a) {
  if (0 === (a.mode & 1)) return 1;
  if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
  if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
  a = C;
  if (0 !== a) return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function gi(a, b, c, d) {
  if (50 < yk) throw yk = 0, zk = null, Error(p(185));
  Ac(a, c, d);
  if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
}
function Dk(a, b) {
  var c = a.callbackNode;
  wc(a, b);
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
  else if (b = d & -d, a.callbackPriority !== b) {
    null != c && bc(c);
    if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
      0 === (K & 6) && jg();
    }), c = null;
    else {
      switch (Dc(d)) {
        case 1:
          c = fc;
          break;
        case 4:
          c = gc;
          break;
        case 16:
          c = hc;
          break;
        case 536870912:
          c = jc;
          break;
        default:
          c = hc;
      }
      c = Fk(c, Gk.bind(null, a));
    }
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Gk(a, b) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K & 6)) throw Error(p(327));
  var c = a.callbackNode;
  if (Hk() && a.callbackNode !== c) return null;
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) return null;
  if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
  else {
    b = d;
    var e = K;
    K |= 2;
    var f2 = Jk();
    if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
    do
      try {
        Lk();
        break;
      } catch (h) {
        Mk(a, h);
      }
    while (1);
    $g();
    mk.current = f2;
    K = e;
    null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
  }
  if (0 !== b) {
    2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
    if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
    if (6 === b) Ck(a, d);
    else {
      e = a.current.alternate;
      if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f2 = xc(a), 0 !== f2 && (d = f2, b = Nk(a, f2))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
      a.finishedWork = e;
      a.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p(345));
        case 2:
          Pk(a, tk, uk);
          break;
        case 3:
          Ck(a, d);
          if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
            if (0 !== uc(a, 0)) break;
            e = a.suspendedLanes;
            if ((e & d) !== d) {
              R();
              a.pingedLanes |= a.suspendedLanes & e;
              break;
            }
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 4:
          Ck(a, d);
          if ((d & 4194240) === d) break;
          b = a.eventTimes;
          for (e = -1; 0 < d; ) {
            var g = 31 - oc(d);
            f2 = 1 << g;
            g = b[g];
            g > e && (e = g);
            d &= ~f2;
          }
          d = e;
          d = B() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 5:
          Pk(a, tk, uk);
          break;
        default:
          throw Error(p(329));
      }
    }
  }
  Dk(a, B());
  return a.callbackNode === c ? Gk.bind(null, a) : null;
}
function Nk(a, b) {
  var c = sk;
  a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
  a = Ik(a, b);
  2 !== a && (b = tk, tk = c, null !== b && Fj(b));
  return a;
}
function Fj(a) {
  null === tk ? tk = a : tk.push.apply(tk, a);
}
function Ok(a) {
  for (var b = a; ; ) {
    if (b.flags & 16384) {
      var c = b.updateQueue;
      if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
        var e = c[d], f2 = e.getSnapshot;
        e = e.value;
        try {
          if (!He(f2(), e)) return false;
        } catch (g) {
          return false;
        }
      }
    }
    c = b.child;
    if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
    else {
      if (b === a) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a) return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Ck(a, b) {
  b &= ~rk;
  b &= ~qk;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b; ) {
    var c = 31 - oc(b), d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Ek(a) {
  if (0 !== (K & 6)) throw Error(p(327));
  Hk();
  var b = uc(a, 0);
  if (0 === (b & 1)) return Dk(a, B()), null;
  var c = Ik(a, b);
  if (0 !== a.tag && 2 === c) {
    var d = xc(a);
    0 !== d && (b = d, c = Nk(a, d));
  }
  if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
  if (6 === c) throw Error(p(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Pk(a, tk, uk);
  Dk(a, B());
  return null;
}
function Qk(a, b) {
  var c = K;
  K |= 1;
  try {
    return a(b);
  } finally {
    K = c, 0 === K && (Gj = B() + 500, fg && jg());
  }
}
function Rk(a) {
  null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
  var b = K;
  K |= 1;
  var c = ok.transition, d = C;
  try {
    if (ok.transition = null, C = 1, a) return a();
  } finally {
    C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E(ej);
}
function Kk(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, Gf(c));
  if (null !== Y) for (c = Y.return; null !== c; ) {
    var d = c;
    wg(d);
    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && $f();
        break;
      case 3:
        zh();
        E(Wf);
        E(H);
        Eh();
        break;
      case 5:
        Bh(d);
        break;
      case 4:
        zh();
        break;
      case 13:
        E(L);
        break;
      case 19:
        E(L);
        break;
      case 10:
        ah(d.type._context);
        break;
      case 22:
      case 23:
        Hj();
    }
    c = c.return;
  }
  Q = a;
  Y = a = Pg(a.current, null);
  Z = fj = b;
  T = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
      c.interleaved = null;
      var e = d.next, f2 = c.pending;
      if (null !== f2) {
        var g = f2.next;
        f2.next = e;
        d.next = g;
      }
      c.pending = d;
    }
    fh = null;
  }
  return a;
}
function Mk(a, b) {
  do {
    var c = Y;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d = M.memoizedState; null !== d; ) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }
        Ih = false;
      }
      Hh = 0;
      O = N = M = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c || null === c.return) {
        T = 1;
        pk = b;
        Y = null;
        break;
      }
      a: {
        var f2 = a, g = c.return, h = c, k2 = b;
        b = Z;
        h.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g, h, f2, b);
            y2.mode & 1 && Si(f2, l2, b);
            b = y2;
            k2 = l2;
            var n2 = b.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b.updateQueue = t2;
            } else n2.add(k2);
            break a;
          } else {
            if (0 === (b & 1)) {
              Si(f2, l2, b);
              tj();
              break a;
            }
            k2 = Error(p(426));
          }
        } else if (I && h.mode & 1) {
          var J2 = Ui(g);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g, h, f2, b);
            Jg(Ji(k2, h));
            break a;
          }
        }
        f2 = k2 = Ji(k2, h);
        4 !== T && (T = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b &= -b;
              f2.lanes |= b;
              var x2 = Ni(f2, k2, b);
              ph(f2, x2);
              break a;
            case 1:
              h = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var F2 = Qi(f2, h, b);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c);
    } catch (na) {
      b = na;
      Y === c && null !== c && (Y = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a = mk.current;
  mk.current = Rh;
  return null === a ? Rh : a;
}
function tj() {
  if (0 === T || 3 === T || 2 === T) T = 4;
  null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
}
function Ik(a, b) {
  var c = K;
  K |= 2;
  var d = Jk();
  if (Q !== a || Z !== b) uk = null, Kk(a, b);
  do
    try {
      Tk();
      break;
    } catch (e) {
      Mk(a, e);
    }
  while (1);
  $g();
  K = c;
  mk.current = d;
  if (null !== Y) throw Error(p(261));
  Q = null;
  Z = 0;
  return T;
}
function Tk() {
  for (; null !== Y; ) Uk(Y);
}
function Lk() {
  for (; null !== Y && !cc(); ) Uk(Y);
}
function Uk(a) {
  var b = Vk(a.alternate, a, fj);
  a.memoizedProps = a.pendingProps;
  null === b ? Sk(a) : Y = b;
  nk.current = null;
}
function Sk(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if (0 === (b.flags & 32768)) {
      if (c = Ej(c, b, fj), null !== c) {
        Y = c;
        return;
      }
    } else {
      c = Ij(c, b);
      if (null !== c) {
        c.flags &= 32767;
        Y = c;
        return;
      }
      if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        T = 6;
        Y = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y = b;
      return;
    }
    Y = b = a;
  } while (null !== b);
  0 === T && (T = 5);
}
function Pk(a, b, c) {
  var d = C, e = ok.transition;
  try {
    ok.transition = null, C = 1, Wk(a, b, c, d);
  } finally {
    ok.transition = e, C = d;
  }
  return null;
}
function Wk(a, b, c, d) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K & 6)) throw Error(p(327));
  c = a.finishedWork;
  var e = a.finishedLanes;
  if (null === c) return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current) throw Error(p(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f2 = c.lanes | c.childLanes;
  Bc(a, f2);
  a === Q && (Y = Q = null, Z = 0);
  0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c.flags & 15990);
  if (0 !== (c.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g = C;
    C = 1;
    var h = K;
    K |= 4;
    nk.current = null;
    Oj(a, c);
    dk(c, a);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c;
    hk(c);
    dc();
    K = h;
    C = g;
    ok.transition = f2;
  } else a.current = c;
  vk && (vk = false, wk = a, xk = e);
  f2 = a.pendingLanes;
  0 === f2 && (Ri = null);
  mc(c.stateNode);
  Dk(a, B());
  if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
  if (Oi) throw Oi = false, a = Pi, Pi = null, a;
  0 !== (xk & 1) && 0 !== a.tag && Hk();
  f2 = a.pendingLanes;
  0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a = Dc(xk), b = ok.transition, c = C;
    try {
      ok.transition = null;
      C = 16 > a ? 16 : a;
      if (null === wk) var d = false;
      else {
        a = wk;
        wk = null;
        xk = 0;
        if (0 !== (K & 6)) throw Error(p(331));
        var e = K;
        K |= 4;
        for (V = a.current; null !== V; ) {
          var f2 = V, g = f2.child;
          if (0 !== (V.flags & 16)) {
            var h = f2.deletions;
            if (null !== h) {
              for (var k2 = 0; k2 < h.length; k2++) {
                var l2 = h[k2];
                for (V = l2; null !== V; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2) q2.return = m2, V = q2;
                  else for (; null !== V; ) {
                    m2 = V;
                    var r2 = m2.sibling, y2 = m2.return;
                    Sj(m2);
                    if (m2 === l2) {
                      V = null;
                      break;
                    }
                    if (null !== r2) {
                      r2.return = y2;
                      V = r2;
                      break;
                    }
                    V = y2;
                  }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V = g;
          else b: for (; null !== V; ) {
            f2 = V;
            if (0 !== (f2.flags & 2048)) switch (f2.tag) {
              case 0:
              case 11:
              case 15:
                Pj(9, f2, f2.return);
            }
            var x2 = f2.sibling;
            if (null !== x2) {
              x2.return = f2.return;
              V = x2;
              break b;
            }
            V = f2.return;
          }
        }
        var w2 = a.current;
        for (V = w2; null !== V; ) {
          g = V;
          var u2 = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V = u2;
          else b: for (g = w2; null !== V; ) {
            h = V;
            if (0 !== (h.flags & 2048)) try {
              switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  Qj(9, h);
              }
            } catch (na) {
              W(h, h.return, na);
            }
            if (h === g) {
              V = null;
              break b;
            }
            var F2 = h.sibling;
            if (null !== F2) {
              F2.return = h.return;
              V = F2;
              break b;
            }
            V = h.return;
          }
        }
        K = e;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a);
        } catch (na) {
        }
        d = true;
      }
      return d;
    } finally {
      C = c, ok.transition = b;
    }
  }
  return false;
}
function Xk(a, b, c) {
  b = Ji(c, b);
  b = Ni(a, b, 1);
  a = nh(a, b, 1);
  b = R();
  null !== a && (Ac(a, 1, b), Dk(a, b));
}
function W(a, b, c) {
  if (3 === a.tag) Xk(a, a, c);
  else for (; null !== b; ) {
    if (3 === b.tag) {
      Xk(b, a, c);
      break;
    } else if (1 === b.tag) {
      var d = b.stateNode;
      if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
        a = Ji(c, a);
        a = Qi(b, a, 1);
        b = nh(b, a, 1);
        a = R();
        null !== b && (Ac(b, 1, a), Dk(b, a));
        break;
      }
    }
    b = b.return;
  }
}
function Ti(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = R();
  a.pingedLanes |= a.suspendedLanes & c;
  Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
  Dk(a, b);
}
function Yk(a, b) {
  0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c = R();
  a = ih(a, b);
  null !== a && (Ac(a, b, c), Dk(a, c));
}
function uj(a) {
  var b = a.memoizedState, c = 0;
  null !== b && (c = b.retryLane);
  Yk(a, c);
}
function bk(a, b) {
  var c = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e = a.memoizedState;
      null !== e && (c = e.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p(314));
  }
  null !== d && d.delete(b);
  Yk(a, c);
}
var Vk;
Vk = function(a, b, c) {
  if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
  else {
    if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
    dh = 0 !== (a.flags & 131072) ? true : false;
  }
  else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      ij(a, b);
      a = b.pendingProps;
      var e = Yf(b, H.current);
      ch(b, c);
      e = Nh(null, b, d, a, e, c);
      var f2 = Sh();
      b.flags |= 1;
      "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f2, c)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e, c), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        ij(a, b);
        a = b.pendingProps;
        e = d._init;
        d = e(d._payload);
        b.type = d;
        e = b.tag = Zk(d);
        a = Ci(d, a);
        switch (e) {
          case 0:
            b = cj(null, b, d, a, c);
            break a;
          case 1:
            b = hj(null, b, d, a, c);
            break a;
          case 11:
            b = Yi(null, b, d, a, c);
            break a;
          case 14:
            b = $i(null, b, d, Ci(d.type, a), c);
            break a;
        }
        throw Error(p(
          306,
          d,
          ""
        ));
      }
      return b;
    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
    case 3:
      a: {
        kj(b);
        if (null === a) throw Error(p(387));
        d = b.pendingProps;
        f2 = b.memoizedState;
        e = f2.element;
        lh(a, b);
        qh(b, d, null, c);
        var g = b.memoizedState;
        d = g.element;
        if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
          e = Ji(Error(p(423)), b);
          b = lj(a, b, d, c, e);
          break a;
        } else if (d !== e) {
          e = Ji(Error(p(424)), b);
          b = lj(a, b, d, c, e);
          break a;
        } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
        else {
          Ig();
          if (d === e) {
            b = Zi(a, b, c);
            break a;
          }
          Xi(a, b, d, c);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
    case 6:
      return null === a && Eg(b), null;
    case 13:
      return oj(a, b, c);
    case 4:
      return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
    case 7:
      return Xi(a, b, b.pendingProps, c), b.child;
    case 8:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 12:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        f2 = b.memoizedProps;
        g = e.value;
        G(Wg, d._currentValue);
        d._currentValue = g;
        if (null !== f2) if (He(f2.value, g)) {
          if (f2.children === e.children && !Wf.current) {
            b = Zi(a, b, c);
            break a;
          }
        } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
          var h = f2.dependencies;
          if (null !== h) {
            g = f2.child;
            for (var k2 = h.firstContext; null !== k2; ) {
              if (k2.context === d) {
                if (1 === f2.tag) {
                  k2 = mh(-1, c & -c);
                  k2.tag = 2;
                  var l2 = f2.updateQueue;
                  if (null !== l2) {
                    l2 = l2.shared;
                    var m2 = l2.pending;
                    null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                    l2.pending = k2;
                  }
                }
                f2.lanes |= c;
                k2 = f2.alternate;
                null !== k2 && (k2.lanes |= c);
                bh(
                  f2.return,
                  c,
                  b
                );
                h.lanes |= c;
                break;
              }
              k2 = k2.next;
            }
          } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
          else if (18 === f2.tag) {
            g = f2.return;
            if (null === g) throw Error(p(341));
            g.lanes |= c;
            h = g.alternate;
            null !== h && (h.lanes |= c);
            bh(g, c, b);
            g = f2.sibling;
          } else g = f2.child;
          if (null !== g) g.return = f2;
          else for (g = f2; null !== g; ) {
            if (g === b) {
              g = null;
              break;
            }
            f2 = g.sibling;
            if (null !== f2) {
              f2.return = g.return;
              g = f2;
              break;
            }
            g = g.return;
          }
          f2 = g;
        }
        Xi(a, b, e.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
    case 14:
      return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
    case 15:
      return bj(a, b, b.type, b.pendingProps, c);
    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
    case 19:
      return xj(a, b, c);
    case 22:
      return dj(a, b, c);
  }
  throw Error(p(156, b.tag));
};
function Fk(a, b) {
  return ac(a, b);
}
function $k(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b, c, d) {
  return new $k(a, b, c, d);
}
function aj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function Zk(a) {
  if ("function" === typeof a) return aj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da) return 11;
    if (a === Ga) return 14;
  }
  return 2;
}
function Pg(a, b) {
  var c = a.alternate;
  null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
  c.flags = a.flags & 14680064;
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function Rg(a, b, c, d, e, f2) {
  var g = 2;
  d = a;
  if ("function" === typeof a) aj(a) && (g = 1);
  else if ("string" === typeof a) g = 5;
  else a: switch (a) {
    case ya:
      return Tg(c.children, e, f2, b);
    case za:
      g = 8;
      e |= 8;
      break;
    case Aa:
      return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f2, a;
    case Ea:
      return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f2, a;
    case Fa:
      return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f2, a;
    case Ia:
      return pj(c, e, f2, b);
    default:
      if ("object" === typeof a && null !== a) switch (a.$$typeof) {
        case Ba:
          g = 10;
          break a;
        case Ca:
          g = 9;
          break a;
        case Da:
          g = 11;
          break a;
        case Ga:
          g = 14;
          break a;
        case Ha:
          g = 16;
          d = null;
          break a;
      }
      throw Error(p(130, null == a ? a : typeof a, ""));
  }
  b = Bg(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.lanes = f2;
  return b;
}
function Tg(a, b, c, d) {
  a = Bg(7, a, d, b);
  a.lanes = c;
  return a;
}
function pj(a, b, c, d) {
  a = Bg(22, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  a.stateNode = { isHidden: false };
  return a;
}
function Qg(a, b, c) {
  a = Bg(6, a, null, b);
  a.lanes = c;
  return a;
}
function Sg(a, b, c) {
  b = Bg(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b;
}
function al(a, b, c, d, e) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a, b, c, d, e, f2, g, h, k2) {
  a = new al(a, b, c, h, k2);
  1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
  f2 = Bg(3, null, null, b);
  a.current = f2;
  f2.stateNode = a;
  f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a;
}
function cl(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
}
function dl(a) {
  if (!a) return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
    var b = a;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p(171));
  }
  if (1 === a.tag) {
    var c = a.type;
    if (Zf(c)) return bg(a, c, b);
  }
  return b;
}
function el(a, b, c, d, e, f2, g, h, k2) {
  a = bl(c, d, true, a, e, f2, g, h, k2);
  a.context = dl(null);
  c = a.current;
  d = R();
  e = yi(c);
  f2 = mh(d, e);
  f2.callback = void 0 !== b && null !== b ? b : null;
  nh(c, f2, e);
  a.current.lanes = e;
  Ac(a, e, d);
  Dk(a, d);
  return a;
}
function fl(a, b, c, d) {
  var e = b.current, f2 = R(), g = yi(e);
  c = dl(c);
  null === b.context ? b.context = c : b.pendingContext = c;
  b = mh(f2, g);
  b.payload = { element: a };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a = nh(e, b, g);
  null !== a && (gi(a, e, g, f2), oh(a, e, g));
  return g;
}
function gl(a) {
  a = a.current;
  if (!a.child) return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function hl(a, b) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b ? c : b;
  }
}
function il(a, b) {
  hl(a, b);
  (a = a.alternate) && hl(a, b);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a) {
  console.error(a);
};
function ll(a) {
  this._internalRoot = a;
}
ml.prototype.render = ll.prototype.render = function(a) {
  var b = this._internalRoot;
  if (null === b) throw Error(p(409));
  fl(a, b, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b = a.containerInfo;
    Rk(function() {
      fl(null, a, null, null);
    });
    b[uf] = null;
  }
};
function ml(a) {
  this._internalRoot = a;
}
ml.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b = Hc();
    a = { blockedOn: null, target: a, priority: b };
    for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
    Qc.splice(c, 0, a);
    0 === c && Vc(a);
  }
};
function nl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function pl() {
}
function ql(a, b, c, d, e) {
  if (e) {
    if ("function" === typeof d) {
      var f2 = d;
      d = function() {
        var a2 = gl(g);
        f2.call(a2);
      };
    }
    var g = el(b, d, a, 0, null, false, false, "", pl);
    a._reactRootContainer = g;
    a[uf] = g.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk();
    return g;
  }
  for (; e = a.lastChild; ) a.removeChild(e);
  if ("function" === typeof d) {
    var h = d;
    d = function() {
      var a2 = gl(k2);
      h.call(a2);
    };
  }
  var k2 = bl(a, 0, false, null, null, false, false, "", pl);
  a._reactRootContainer = k2;
  a[uf] = k2.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Rk(function() {
    fl(b, k2, c, d);
  });
  return k2;
}
function rl(a, b, c, d, e) {
  var f2 = c._reactRootContainer;
  if (f2) {
    var g = f2;
    if ("function" === typeof e) {
      var h = e;
      e = function() {
        var a2 = gl(g);
        h.call(a2);
      };
    }
    fl(b, g, a, e);
  } else g = ql(c, b, a, e, d);
  return gl(g);
}
Ec = function(a) {
  switch (a.tag) {
    case 3:
      var b = a.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c = tc(b.pendingLanes);
        0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b2 = ih(a, 1);
        if (null !== b2) {
          var c2 = R();
          gi(b2, a, 1, c2);
        }
      }), il(a, 1);
  }
};
Fc = function(a) {
  if (13 === a.tag) {
    var b = ih(a, 134217728);
    if (null !== b) {
      var c = R();
      gi(b, a, 134217728, c);
    }
    il(a, 134217728);
  }
};
Gc = function(a) {
  if (13 === a.tag) {
    var b = yi(a), c = ih(a, b);
    if (null !== c) {
      var d = R();
      gi(c, a, b, d);
    }
    il(a, b);
  }
};
Hc = function() {
  return C;
};
Ic = function(a, b) {
  var c = C;
  try {
    return C = a, b();
  } finally {
    C = c;
  }
};
yb = function(a, b, c) {
  switch (b) {
    case "input":
      bb(a, c);
      b = c.name;
      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode; ) c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e = Db(d);
            if (!e) throw Error(p(90));
            Wa(d);
            bb(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b = c.value, null != b && fb(a, !!c.multiple, b, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Zb(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    kc = vl.inject(ul), lc = vl;
  } catch (a) {
  }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
reactDom_production_min.createPortal = function(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b)) throw Error(p(200));
  return cl(a, b, null, c);
};
reactDom_production_min.createRoot = function(a, b) {
  if (!nl(a)) throw Error(p(299));
  var c = false, d = "", e = kl;
  null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
  b = bl(a, 1, false, null, null, c, false, d, e);
  a[uf] = b.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ll(b);
};
reactDom_production_min.findDOMNode = function(a) {
  if (null == a) return null;
  if (1 === a.nodeType) return a;
  var b = a._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a.render) throw Error(p(188));
    a = Object.keys(a).join(",");
    throw Error(p(268, a));
  }
  a = Zb(b);
  a = null === a ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a) {
  return Rk(a);
};
reactDom_production_min.hydrate = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, true, c);
};
reactDom_production_min.hydrateRoot = function(a, b, c) {
  if (!nl(a)) throw Error(p(405));
  var d = null != c && c.hydratedSources || null, e = false, f2 = "", g = kl;
  null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f2 = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
  b = el(b, null, a, 1, null != c ? c : null, e, false, f2, g);
  a[uf] = b.current;
  sf(a);
  if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
    c,
    e
  );
  return new ml(b);
};
reactDom_production_min.render = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, false, c);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!ol(a)) throw Error(p(40));
  return a._reactRootContainer ? (Rk(function() {
    rl(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
  if (!ol(c)) throw Error(p(200));
  if (null == a || void 0 === a._reactInternals) throw Error(p(38));
  return rl(a, b, c, false, d);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
var createRoot;
var m = reactDomExports;
{
  createRoot = m.createRoot;
  m.hydrateRoot;
}
const PATHS = {
  dashboard: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "3", width: "7.5", height: "8.5", rx: "1.6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "13.5", y: "3", width: "7.5", height: "5", rx: "1.6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "14.5", width: "7.5", height: "6.5", rx: "1.6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "13.5", y: "11", width: "7.5", height: "10", rx: "1.6" })
  ] }),
  terminal: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2.5", y: "4", width: "19", height: "16", rx: "2.4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 9.5l2.8 2.5L7 14.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12.5 15h4.5" })
  ] }),
  folder: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3 7.2a2 2 0 012-2h3.6l2 2.3H19a2 2 0 012 2v7.3a2 2 0 01-2 2H5a2 2 0 01-2-2z" }),
  image: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "4.5", width: "18", height: "15", rx: "2.2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "8.4", cy: "10", r: "1.7" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3.4 17.2l4.3-4a1.7 1.7 0 012.4 0l3.2 3.1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12.2 15.6l1.9-1.8a1.7 1.7 0 012.4 0l3.9 3.7" })
  ] }),
  "folder-open": /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3 7.2a2 2 0 012-2h3.6l2 2.3H19a2 2 0 012 2v1.2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3 8.5v9.3a2 2 0 002 2h12.6a2 2 0 001.9-1.4l2-6a1.4 1.4 0 00-1.3-1.9H6.2a2 2 0 00-1.9 1.4z" })
  ] }),
  users: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "9", cy: "8", r: "3.4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2.8 20a6.3 6.3 0 0112.4 0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16.2 5.2a3.2 3.2 0 010 5.9" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.6 14.3A6 6 0 0121.4 20" })
  ] }),
  puzzle: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10.2 3.5a1.8 1.8 0 013.6 0v1.1h3.1a1.6 1.6 0 011.6 1.6v3h1.1a1.8 1.8 0 010 3.6h-1.1v3a1.6 1.6 0 01-1.6 1.6h-3.1v1.1a1.8 1.8 0 01-3.6 0v-1.1h-3a1.6 1.6 0 01-1.6-1.6v-3.1H4.5a1.8 1.8 0 010-3.6h1.1v-3a1.6 1.6 0 011.6-1.6h3z" }),
  archive: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "4", width: "18", height: "4.2", rx: "1.4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4.6 8.2V19a1.6 1.6 0 001.6 1.6h11.6A1.6 1.6 0 0019.4 19V8.2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10 12.4h4" })
  ] }),
  help: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9.6 9.4a2.5 2.5 0 014.9.6c0 1.7-2.4 2-2.4 3.6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 17h.01" })
  ] }),
  settings: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "3.1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.4 14.5a1.6 1.6 0 00.3 1.8l.1.1a1.9 1.9 0 11-2.7 2.7l-.1-.1a1.6 1.6 0 00-1.8-.3 1.6 1.6 0 00-1 1.5v.2a1.9 1.9 0 11-3.8 0v-.1a1.6 1.6 0 00-1-1.5 1.6 1.6 0 00-1.8.3l-.1.1a1.9 1.9 0 11-2.7-2.7l.1-.1a1.6 1.6 0 00.3-1.8 1.6 1.6 0 00-1.5-1H2.4a1.9 1.9 0 110-3.8h.1a1.6 1.6 0 001.5-1 1.6 1.6 0 00-.3-1.8l-.1-.1a1.9 1.9 0 112.7-2.7l.1.1a1.6 1.6 0 001.8.3h.1a1.6 1.6 0 001-1.5V2.4a1.9 1.9 0 113.8 0v.1a1.6 1.6 0 001 1.5 1.6 1.6 0 001.8-.3l.1-.1a1.9 1.9 0 112.7 2.7l-.1.1a1.6 1.6 0 00-.3 1.8v.1a1.6 1.6 0 001.5 1h.2a1.9 1.9 0 110 3.8h-.1a1.6 1.6 0 00-1.5 1z" })
  ] }),
  plus: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 5v14" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 12h14" })
  ] }),
  x: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 6l12 12" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18 6L6 18" })
  ] }),
  search: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "11", cy: "11", r: "7" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16.2 16.2L21 21" })
  ] }),
  "chevron-down": /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 9.5l6 6 6-6" }),
  "chevron-up": /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 14.5l6-6 6 6" }),
  "chevron-right": /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9.5 6l6 6-6 6" }),
  "chevron-left": /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M14.5 6l-6 6 6 6" }),
  play: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 4.8v14.4a.9.9 0 001.37.77l11.4-7.2a.9.9 0 000-1.54l-11.4-7.2A.9.9 0 007 4.8z" }),
  stop: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "5.5", y: "5.5", width: "13", height: "13", rx: "2" }),
  restart: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.5 12a8.5 8.5 0 11-2.6-6.1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.8 4.4v5h-5" })
  ] }),
  trash: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 6.5h16" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9.5 6.5V4.8a1.3 1.3 0 011.3-1.3h2.4a1.3 1.3 0 011.3 1.3v1.7" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6.3 6.5l.9 12.2a1.8 1.8 0 001.8 1.7h6a1.8 1.8 0 001.8-1.7l.9-12.2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10.4 10.6v6M13.6 10.6v6" })
  ] }),
  edit: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 20h4.2l10.6-10.6a2.1 2.1 0 10-3-3L5.2 17z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M14.5 5.9l3.6 3.6" })
  ] }),
  save: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 4h11.2L20 7.8V19a1.6 1.6 0 01-1.6 1.6H5A1.6 1.6 0 013.4 19V5.6A1.6 1.6 0 015 4z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7.6 4v5.4h7.8V4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "7.6", y: "13", width: "8.8", height: "7.6", rx: "1" })
  ] }),
  refresh: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.5 12a8.5 8.5 0 11-2.6-6.1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.8 4.4v5h-5" })
  ] }),
  download: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 3.5v11" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7.5 10.2l4.5 4.5 4.5-4.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 19h16" })
  ] }),
  "folder-input": /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3 7.2a2 2 0 012-2h3.6l2 2.3H19a2 2 0 012 2v1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3 8.5v9.3a2 2 0 002 2h6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 14v6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M14.2 17.2L17 20l2.8-2.8" })
  ] }),
  external: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M14 4h6v6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 4l-8.5 8.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18.5 14.2V18a2 2 0 01-2 2H6a2 2 0 01-2-2V7.5a2 2 0 012-2h3.8" })
  ] }),
  panel: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2.4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15 4v16" })
  ] }),
  alert: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10.3 3.9L2.5 17.4A2 2 0 004.2 20.4h15.6a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 9.5v4.2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 17h.01" })
  ] }),
  check: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4.5 12.8l5 5L19.5 7" }),
  activity: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3 12h4l3-8 4 16 3-8h4" }),
  cpu: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "6.5", y: "6.5", width: "11", height: "11", rx: "2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "10", y: "10", width: "4", height: "4", rx: "0.8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10 3v3.5M14 3v3.5M10 17.5V21M14 17.5V21" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3 10h3.5M3 14h3.5M17.5 10H21M17.5 14H21" })
  ] }),
  clock: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "8.6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 7v5.3l3.4 2" })
  ] }),
  send: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 19.5V5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 11l6-6 6 6" })
  ] }),
  file: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 3h7.5L19 8.4V19a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13.2 3v5.6H19" })
  ] }),
  "file-text": /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 3h7.5L19 8.4V19a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13.2 3v5.6H19" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 13h7M8 16.6h5" })
  ] }),
  package: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.5 7.9v8.2a1.6 1.6 0 01-.85 1.42l-6.9 3.7a1.7 1.7 0 01-1.5 0l-6.9-3.7A1.6 1.6 0 013.5 16V8a1.6 1.6 0 01.85-1.42l6.9-3.7a1.7 1.7 0 011.5 0l6.9 3.7A1.6 1.6 0 0120.5 7.9z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3.9 7l8.1 4.4L20.1 7" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 20.5v-9.1" })
  ] }),
  shield: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 3l7.5 3v5.5c0 4.6-3.1 8.2-7.5 9.5-4.4-1.3-7.5-4.9-7.5-9.5V6z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9.2 12l2 2 3.6-4" })
  ] }),
  "user-plus": /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "9.5", cy: "8", r: "3.4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3.3 20a6.3 6.3 0 0112.4 0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18.5 8.5v5M16 11h5" })
  ] }),
  ban: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "8.6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5.9 18.1L18.1 5.9" })
  ] }),
  more: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "5.5", cy: "12", r: "1.4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "1.4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "18.5", cy: "12", r: "1.4" })
  ] }),
  minimize: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 12h14" }),
  maximize: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "5", y: "5", width: "14", height: "14", rx: "1.6" }),
  restore: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "4", y: "8", width: "12", height: "12", rx: "1.6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 8V5.6A1.6 1.6 0 019.6 4H18a2 2 0 012 2v8.4A1.6 1.6 0 0118.4 16H16" })
  ] }),
  globe: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "8.6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3.6 12h16.8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 3.4c2.2 2.4 3.3 5.4 3.3 8.6s-1.1 6.2-3.3 8.6c-2.2-2.4-3.3-5.4-3.3-8.6S9.8 5.8 12 3.4z" })
  ] }),
  sliders: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 20v-6M5 10V4M12 20v-9M12 7V4M19 20v-3M19 13V4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "5", cy: "12", r: "1.9" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "9", r: "1.9" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "19", cy: "15", r: "1.9" })
  ] }),
  list: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8.5 6.5h12M8.5 12h12M8.5 17.5h12" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "4", cy: "6.5", r: "1.1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "4", cy: "12", r: "1.1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "4", cy: "17.5", r: "1.1" })
  ] }),
  monitor: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2.8", y: "4", width: "18.4", height: "12.6", rx: "2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 20.5h6M12 16.6v3.9" })
  ] }),
  zap: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13.5 2.8L4.8 13.4h6.3l-.6 7.8 8.7-10.6h-6.3z" }),
  server: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "3.8", width: "18", height: "7", rx: "2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "13.2", width: "18", height: "7", rx: "2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 7.3h.01M7 16.7h.01" })
  ] }),
  box: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2.8l8.5 4.6v9.2L12 21.2 3.5 16.6V7.4z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3.9 7.1L12 11.7l8.1-4.6M12 21.2v-9.5" })
  ] }),
  network: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "9", y: "2.6", width: "6", height: "5", rx: "1.4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2.6", y: "16.4", width: "6", height: "5", rx: "1.4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "15.4", y: "16.4", width: "6", height: "5", rx: "1.4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 7.6v4.2M5.6 16.4v-2.2a1.6 1.6 0 011.6-1.6h9.6a1.6 1.6 0 011.6 1.6v2.2" })
  ] }),
  pickaxe: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6.2 5.4C9.6 3.6 14.4 3.6 17.8 5.4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4.6 7.6c1.6-1.6 3.9-2.6 6.3-2.9" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 9.5l9.8 9.8a1.6 1.6 0 01-2.3 2.3L6.7 11.8" })
  ] }),
  // 扳手：给 Forge / NeoForge 这类「装上去再拼出来」的服务端用
  wrench: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15.4 3.2a5.2 5.2 0 00-6.6 6.6l-5.3 5.3a2.2 2.2 0 003.1 3.1l5.3-5.3a5.2 5.2 0 006.6-6.6l-2.9 2.9-2.6-.7-.7-2.6z" }) })
};
function Icon({
  name,
  size = 18,
  className,
  style,
  strokeWidth = 1.7,
  fill
}) {
  const solid = name === "play" || name === "send" || name === "check" || !!fill;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: solid ? fill ?? "currentColor" : "none",
      stroke: solid ? "none" : "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      style: { flexShrink: 0, ...style },
      "aria-hidden": "true",
      children: PATHS[name]
    }
  );
}
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
const identity = (arg) => arg;
function useStore$1(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    React.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore$1(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
let toastSeq = 0;
const useStore = create((set, get) => ({
  ready: false,
  servers: [],
  settings: null,
  javaList: [],
  pythonList: [],
  stats: {},
  activeId: null,
  view: "console",
  panel: "files",
  panelOpen: true,
  listCollapsed: false,
  topology: null,
  logs: {},
  toasts: [],
  downloads: {},
  now: Date.now(),
  backgroundError: "",
  init: async () => {
    const [serversRes, settingsRes] = await Promise.all([
      window.api.servers.list(),
      window.api.settings.get()
    ]);
    const servers = serversRes.ok ? serversRes.data : [];
    const settings = settingsRes.ok ? settingsRes.data : null;
    set({
      servers,
      settings,
      javaList: settings?.javaList ?? [],
      pythonList: settings?.pythonList ?? [],
      ready: true,
      activeId: servers.length ? servers[0].id : null
    });
    if (servers.length) void get().loadLogs(servers[0].id);
    void get().loadTopology();
    void window.api.java.detect().then((res) => {
      if (res.ok) set({ javaList: res.data, settings: { ...get().settings, javaList: res.data } });
    });
    void get().refreshPython();
  },
  refreshPython: async (path) => {
    const res = await window.api.python.detect(path);
    if (!res.ok) return [];
    set((s) => ({
      pythonList: res.data,
      settings: s.settings ? {
        ...s.settings,
        pythonList: res.data,
        // 主进程在没有默认值时会把第一个填上，界面跟着显示，免得
        // 设置页写着「未设置」而实际用的是列表里那个
        pythonPath: s.settings.pythonPath || res.data[0]?.path || ""
      } : s.settings
    }));
    return res.data;
  },
  refresh: async () => {
    const res = await window.api.servers.list();
    if (!res.ok) return;
    const servers = res.data;
    set((s) => ({
      servers,
      // 当前选中的那台可能刚被删掉：换一台，别让主区域停在已经不存在的服务器上
      activeId: s.activeId && servers.some((x2) => x2.id === s.activeId) ? s.activeId : servers[0]?.id ?? null
    }));
    void get().loadTopology();
  },
  loadTopology: async () => {
    const res = await window.api.topology.get();
    if (res.ok) set({ topology: res.data });
  },
  applyRuntime: (id2, runtime) => {
    set((s) => ({
      servers: s.servers.map((sv) => sv.id === id2 ? { ...sv, runtime } : sv)
    }));
  },
  pushLogs: (id2, lines) => {
    set((s) => {
      const cur = s.logs[id2] ?? [];
      const next = cur.length ? [...cur, ...lines] : lines;
      const capped = next.length > 2e3 ? next.slice(next.length - 2e3) : next;
      return { logs: { ...s.logs, [id2]: capped } };
    });
  },
  loadLogs: async (id2) => {
    if (get().logs[id2]?.length) return;
    const res = await window.api.server.logs(id2);
    if (res.ok) set((s) => ({ logs: { ...s.logs, [id2]: res.data } }));
  },
  select: (id2) => {
    if (!id2) {
      set({ activeId: null });
      return;
    }
    set({ activeId: id2, panelOpen: true });
    void get().loadLogs(id2);
  },
  setView: (view) => set({ view }),
  setPanel: (panel) => set({ panel, panelOpen: true }),
  togglePanel: () => set((s) => ({ panelOpen: !s.panelOpen })),
  toggleList: () => set((s) => ({ listCollapsed: !s.listCollapsed })),
  toast: (text, type = "info") => {
    const id2 = ++toastSeq;
    set((s) => ({ toasts: [...s.toasts, { id: id2, text, type }] }));
    setTimeout(() => get().dismissToast(id2), type === "error" ? 6e3 : 3500);
  },
  dismissToast: (id2) => set((s) => ({ toasts: s.toasts.filter((t2) => t2.id !== id2) })),
  setDownload: (p2) => {
    if (!p2) return;
    set((s) => {
      const downloads = { ...s.downloads };
      if (p2.stage === "done" || p2.stage === "error") {
        delete downloads[p2.taskId];
      } else {
        downloads[p2.taskId] = p2;
      }
      return { downloads };
    });
  }
}));
function TitleBar() {
  const [maximized, setMaximized] = reactExports.useState(false);
  const servers = useStore((s) => s.servers);
  const activeId = useStore((s) => s.activeId);
  const active = servers.find((s) => s.id === activeId) ?? null;
  reactExports.useEffect(() => {
    void window.api.window.isMaximized().then((r2) => r2.ok && setMaximized(Boolean(r2.data)));
    return window.api.on.windowState(setMaximized);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "titlebar", onDoubleClick: () => void window.api.window.maximize(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app-logo", title: "CraftDesk", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "./logo.png", alt: "CraftDesk", width: 22, height: 22, draggable: false }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "app-name", children: "CraftDesk" }),
    active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "titlebar-sub", children: active.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "titlebar-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "win-btn", onClick: () => void window.api.window.minimize(), title: "最小化", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "minimize", size: 15 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "win-btn",
          onClick: () => void window.api.window.maximize(),
          title: maximized ? "还原" : "最大化",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: maximized ? "restore" : "maximize", size: 13 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "win-btn close", onClick: () => void window.api.window.close(), title: "关闭", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "x", size: 15 }) })
    ] })
  ] });
}
const ENTRIES = [
  { key: "dashboard", icon: "dashboard", label: "总览" },
  { key: "topology", icon: "network", label: "网络拓扑" },
  { key: "console", icon: "terminal", label: "控制台" },
  { key: "registry", icon: "download", label: "下载扩展" }
];
function IconRail({ onHelp }) {
  const view = useStore((s) => s.view);
  const setView = useStore((s) => s.setView);
  const togglePanel = useStore((s) => s.togglePanel);
  const activeId = useStore((s) => s.activeId);
  const runningCount = useStore((s) => s.servers.filter((x2) => x2.runtime.status !== "stopped").length);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rail", children: [
    ENTRIES.map((e) => {
      const needsServer = e.key === "console" || e.key === "registry";
      const disabled = needsServer && !activeId;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `rail-btn ${view === e.key ? "active" : ""}`,
          "data-tip": e.label,
          title: disabled ? "先在左侧选一个服务器" : e.label,
          style: disabled ? { opacity: 0.35 } : void 0,
          onClick: () => {
            if (disabled) return;
            setView(e.key);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: e.icon, size: 19 }),
            e.key === "dashboard" && runningCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge", children: runningCount })
          ]
        },
        e.key
      );
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rail-spacer" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rail-btn", "data-tip": "右侧面板", title: "展开/收起右侧面板", onClick: togglePanel, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "panel", size: 19 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rail-btn", "data-tip": "帮助", title: "帮助", onClick: onHelp, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "help", size: 19 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: `rail-btn ${view === "settings" ? "active" : ""}`,
        "data-tip": "设置",
        title: "设置",
        onClick: () => setView("settings"),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "settings", size: 19 })
      }
    )
  ] });
}
function formatBytes(bytes) {
  if (!bytes || bytes < 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}
function formatDuration(seconds) {
  if (!seconds || seconds < 0) return "—";
  const d = Math.floor(seconds / 86400);
  const h = Math.floor(seconds % 86400 / 3600);
  const m2 = Math.floor(seconds % 3600 / 60);
  const s = Math.floor(seconds % 60);
  if (d > 0) return `${d}天 ${h}小时`;
  if (h > 0) return `${h}小时 ${m2}分`;
  if (m2 > 0) return `${m2}分 ${s}秒`;
  return `${s}秒`;
}
function formatClock(ts) {
  const d = new Date(ts);
  const p2 = (n2) => String(n2).padStart(2, "0");
  return `${p2(d.getHours())}:${p2(d.getMinutes())}:${p2(d.getSeconds())}`;
}
function formatDateTime(ts) {
  if (!ts) return "—";
  const d = new Date(ts);
  const p2 = (n2) => String(n2).padStart(2, "0");
  return `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())} ${p2(d.getHours())}:${p2(d.getMinutes())}`;
}
function relativeTime(ts) {
  if (!ts) return "从未";
  const diff = Date.now() - ts;
  if (diff < 6e4) return "刚刚";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)} 分钟前`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)} 小时前`;
  if (diff < 30 * 864e5) return `${Math.floor(diff / 864e5)} 天前`;
  return formatDateTime(ts).slice(0, 10);
}
const KIND_LABELS = {
  vanilla: "原版",
  paper: "Paper",
  purpur: "Purpur",
  spigot: "Spigot",
  fabric: "Fabric",
  forge: "Forge",
  neoforge: "NeoForge",
  bukkit: "Bukkit",
  velocity: "Velocity",
  bungeecord: "BungeeCord",
  waterfall: "Waterfall",
  unknown: "未知"
};
const KIND_COLORS = {
  vanilla: "#6b7280",
  paper: "#f59e0b",
  purpur: "#a855f7",
  spigot: "#eab308",
  fabric: "#dbb69b",
  forge: "#60a5fa",
  neoforge: "#f97316",
  bukkit: "#84cc16",
  velocity: "#06b6d4",
  bungeecord: "#0891b2",
  waterfall: "#22d3ee",
  unknown: "#64748b"
};
function kindLabel(kind) {
  return KIND_LABELS[kind] ?? "未知";
}
function kindColor(kind) {
  return KIND_COLORS[kind] ?? "#64748b";
}
function serverInitials(name) {
  const clean = name.replace(/[^\p{L}\p{N}]/gu, "");
  if (!clean) return "MC";
  if (/[一-龥]/.test(clean)) return clean.slice(0, 2);
  const words = name.split(/[\s_-]+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return clean.slice(0, 2).toUpperCase();
}
function statusLabel(status) {
  switch (status) {
    case "external":
      return "外部启动";
    case "running":
      return "运行中";
    case "starting":
      return "启动中";
    case "stopping":
      return "停止中";
    case "crashed":
      return "已崩溃";
    default:
      return "已停止";
  }
}
const ICON_TEXT_SCHEME = "text:";
const ICON_FILE_SCHEME = "file:";
const ICON_TEXT_MAX = 2;
const ICON_NAME_MAX = 120;
function normalizeIconText(raw) {
  return Array.from(raw.trim()).slice(0, ICON_TEXT_MAX).join("");
}
function isSafeIconName(name) {
  if (!name || name.length > ICON_NAME_MAX) return false;
  if (name.includes("..")) return false;
  if (/[\\/:*?"<>|]/.test(name)) return false;
  return /^[A-Za-z0-9._-]+$/.test(name);
}
function parseIcon(icon) {
  const raw = (icon ?? "").trim();
  if (!raw) return { kind: "initials" };
  if (raw.startsWith(ICON_TEXT_SCHEME)) {
    const text = normalizeIconText(raw.slice(ICON_TEXT_SCHEME.length));
    return text ? { kind: "text", text } : { kind: "initials" };
  }
  if (raw.startsWith(ICON_FILE_SCHEME)) {
    const name = raw.slice(ICON_FILE_SCHEME.length).trim();
    return isSafeIconName(name) ? { kind: "image", name } : { kind: "initials" };
  }
  return { kind: "initials" };
}
function textIcon(text) {
  const t2 = normalizeIconText(text);
  return t2 ? `${ICON_TEXT_SCHEME}${t2}` : "";
}
function fileIcon(name) {
  return isSafeIconName(name) ? `${ICON_FILE_SCHEME}${name}` : "";
}
const ICON_EMOJIS = [
  "⛏️",
  "🪓",
  "⚔️",
  "🏹",
  "🛡️",
  "🔥",
  "❄️",
  "⚡",
  "💧",
  "🌲",
  "🍄",
  "🌵",
  "💎",
  "🪨",
  "🧱",
  "🏰",
  "🌋",
  "🗺️",
  "🧪",
  "⚙️",
  "🐷",
  "🐺",
  "🐔",
  "👑"
];
const ICON_COLORS = [
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#0ea5e9",
  "#3b82f6",
  "#6366f1",
  "#a855f7",
  "#ec4899",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#64748b"
];
const cache$1 = /* @__PURE__ */ new Map();
const inflight$1 = /* @__PURE__ */ new Map();
function loadIcon(name) {
  const hit = cache$1.get(name);
  if (hit !== void 0) return Promise.resolve(hit);
  const running = inflight$1.get(name);
  if (running) return running;
  const task = window.api.app.readIcon(name).then((res) => res.ok ? res.data.dataUrl : null).catch(() => null).then((url) => {
    cache$1.set(name, url);
    inflight$1.delete(name);
    return url;
  });
  inflight$1.set(name, task);
  return task;
}
function primeIcon(name, dataUrl) {
  cache$1.set(name, dataUrl);
}
function useIcon(name) {
  const [url, setUrl] = reactExports.useState(() => name ? cache$1.get(name) ?? null : null);
  reactExports.useEffect(() => {
    if (!name) {
      setUrl(null);
      return;
    }
    const hit = cache$1.get(name);
    if (hit !== void 0) {
      setUrl(hit);
      return;
    }
    let alive = true;
    void loadIcon(name).then((u2) => {
      if (alive) setUrl(u2);
    });
    return () => {
      alive = false;
    };
  }, [name]);
  return url;
}
function ServerAvatar({
  server,
  size = 26,
  className = ""
}) {
  const spec = parseIcon(server.icon);
  const imageUrl = useIcon(spec.kind === "image" ? spec.name : null);
  const base = { width: size, height: size };
  if (spec.kind === "image" && imageUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `server-icon ${className}`,
        style: {
          ...base,
          backgroundColor: "#111",
          backgroundImage: `url("${imageUrl}")`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }
      }
    );
  }
  const isText = spec.kind === "text";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `server-icon ${className}`,
      style: {
        ...base,
        background: server.color || kindColor(server.kind),
        // 表情比字母占的视觉空间小，得给大一档才不显得空
        fontSize: Math.round(size * (isText ? 0.56 : 0.42)),
        // 表情自带颜色，加粗和白色反而会把它压扁
        fontWeight: isText ? 400 : 700
      },
      children: isText ? spec.text : serverInitials(server.name)
    }
  );
}
const PROXY_KINDS$1 = ["velocity", "bungeecord", "waterfall"];
function isProxyKind(kind) {
  return PROXY_KINDS$1.includes(kind);
}
function ServerList({ onAdd }) {
  const servers = useStore((s) => s.servers);
  const topology = useStore((s) => s.topology);
  const activeId = useStore((s) => s.activeId);
  const select = useStore((s) => s.select);
  const setView = useStore((s) => s.setView);
  const view = useStore((s) => s.view);
  const toast = useStore((s) => s.toast);
  const refresh = useStore((s) => s.refresh);
  const [query, setQuery] = reactExports.useState("");
  const [collapsed, setCollapsed] = reactExports.useState(/* @__PURE__ */ new Set());
  const byId = reactExports.useMemo(() => new Map(servers.map((s) => [s.id, s])), [servers]);
  const matches = (s) => {
    const q2 = query.trim().toLowerCase();
    if (!q2) return true;
    return s.name.toLowerCase().includes(q2) || s.dir.toLowerCase().includes(q2) || s.mcVersion.toLowerCase().includes(q2) || kindLabel(s.kind).toLowerCase().includes(q2);
  };
  const toggle = async (s) => {
    const res = s.runtime.status === "stopped" || s.runtime.status === "crashed" ? await window.api.server.start(s.id) : await window.api.server.stop(s.id);
    if (!res.ok) toast(res.error ?? "操作失败", "error");
    else void refresh();
  };
  const toggleCollapse = (id2) => setCollapsed((prev) => {
    const next = new Set(prev);
    if (next.has(id2)) next.delete(id2);
    else next.add(id2);
    return next;
  });
  const rowProps = (s) => ({
    server: s,
    active: s.id === activeId,
    view,
    onSelect: () => select(s.id),
    onToggle: () => void toggle(s),
    onOpenView: (v2) => {
      select(s.id);
      setView(v2);
    }
  });
  const proxies = topology?.proxies ?? [];
  const standalone = (topology?.standalone ?? []).map((n2) => byId.get(n2.id)).filter((s) => Boolean(s));
  const hasTree = proxies.length > 0;
  const flat = servers.filter(matches);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "side", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "side-head", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "side-add", onClick: onAdd, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "plus", size: 17 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "添加服务器" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "side-search", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "search", size: 15 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: query,
          onChange: (e) => setQuery(e.target.value),
          placeholder: "搜索服务器",
          spellCheck: false
        }
      ),
      query && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-btn", style: { width: 20, height: 20 }, onClick: () => setQuery(""), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "x", size: 12 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "side-list", children: [
      servers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "side-empty", children: [
        "还没有任何服务器",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "点击上方「添加服务器」开始"
      ] }),
      !hasTree && servers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        flat.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "side-empty", children: "没有匹配的服务器" }),
        flat.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(ServerRow, { ...rowProps(s), depth: 0 }, s.id))
      ] }),
      hasTree && proxies.map((p2) => {
        const proxy = byId.get(p2.node.id);
        if (!proxy) return null;
        const isCollapsed = collapsed.has(proxy.id);
        const children = p2.backends;
        const q2 = query.trim().toLowerCase();
        const proxyHit = !q2 || matches(proxy);
        const shownChildren = q2 ? children.filter(
          (c) => proxyHit || c.name.toLowerCase().includes(q2) || c.address.includes(q2)
        ) : children;
        if (q2 && !proxyHit && shownChildren.length === 0) return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tree-branch", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ServerRow,
            {
              ...rowProps(proxy),
              depth: 0,
              tree: { collapsed: isCollapsed, count: children.length, onToggle: () => toggleCollapse(proxy.id) }
            }
          ),
          !isCollapsed && shownChildren.map((child) => {
            const edge = p2.edges.find((e) => e.backendId === child.id);
            const managed = child.managed ? byId.get(child.id) : void 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              BackendRow,
              {
                node: child,
                edge,
                server: managed,
                active: child.id === activeId,
                view,
                runningCount: shownChildren.filter((c) => c.running).length,
                onSelect: () => managed && select(managed.id),
                onToggle: () => managed && void toggle(managed),
                onOpenView: (v2) => {
                  if (!managed) return;
                  select(managed.id);
                  setView(v2);
                }
              },
              child.id
            );
          })
        ] }, proxy.id);
      }),
      hasTree && standalone.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group-label", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dot stopped" }),
          "独立服务器 · ",
          standalone.length
        ] }),
        standalone.filter(matches).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(ServerRow, { ...rowProps(s), depth: 0 }, s.id))
      ] }),
      servers.length > 0 && hasTree && proxies.length === 0 && standalone.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "side-empty", children: "没有匹配的服务器" })
    ] })
  ] });
}
function ServerRow({
  server,
  active,
  view,
  depth,
  tree,
  onSelect,
  onToggle,
  onOpenView
}) {
  const rt = server.runtime;
  const running = rt.status !== "stopped" && rt.status !== "crashed";
  const sub = rt.externalRunning ? [`在线 ${rt.onlineCount}/${rt.maxPlayers}`, rt.port != null ? `:${rt.port}` : null, "外部启动"].filter(Boolean).join(" · ") : running ? [
    rt.onlineCount > 0 ? `在线 ${rt.onlineCount}/${rt.maxPlayers}` : "已启动",
    rt.port != null ? `:${rt.port}` : null,
    rt.pid != null ? `PID ${rt.pid}` : null
  ].filter(Boolean).join(" · ") : [kindLabel(server.kind), server.mcVersion || null].filter(Boolean).join(" · ") || "未识别服务端类型";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: `server-item ${active ? "active" : ""}`,
        onClick: onSelect,
        style: { paddingLeft: 10 + depth * 16 },
        children: [
          tree && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              role: "button",
              tabIndex: 0,
              className: "tree-toggle",
              title: tree.collapsed ? `展开 ${tree.count} 个后端` : "收起后端",
              onClick: (e) => {
                e.stopPropagation();
                tree.onToggle();
              },
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  e.stopPropagation();
                  tree.onToggle();
                }
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: tree.collapsed ? "chevron-right" : "chevron-down", size: 13 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ServerAvatar, { server }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "server-main", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "server-name", children: [
              server.name,
              isProxyKind(server.kind) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag cyan", children: "入口" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `dot ${rt.status}` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "server-sub", children: sub })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "server-actions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              role: "button",
              tabIndex: 0,
              className: "icon-btn",
              style: { width: 24, height: 24 },
              title: running ? "停止服务器" : "启动服务器",
              onClick: (e) => {
                e.stopPropagation();
                onToggle();
              },
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  e.stopPropagation();
                  onToggle();
                }
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: running ? "stop" : "play", size: running ? 12 : 13 })
            }
          ) })
        ]
      }
    ),
    active && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { paddingLeft: 36 + depth * 16, paddingBottom: 4 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SubItem,
        {
          active: view === "console",
          icon: "terminal",
          label: running ? "控制台 · 实时日志" : "控制台",
          onClick: () => onOpenView("console")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SubItem,
        {
          active: view === "properties",
          icon: "sliders",
          label: isProxyKind(server.kind) ? "跨服配置" : "服务器属性",
          onClick: () => onOpenView("properties")
        }
      )
    ] })
  ] });
}
function BackendRow({
  node,
  edge,
  server,
  active,
  view,
  onSelect,
  onToggle,
  onOpenView
}) {
  const rt = server?.runtime;
  const running = rt ? rt.status !== "stopped" && rt.status !== "crashed" : false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tree-child", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: `backend-row ${active ? "active" : ""} ${node.managed ? "" : "external"}`,
        onClick: onSelect,
        disabled: !node.managed,
        title: node.managed ? server?.dir : `${node.address} · CraftDesk 未导入这个服务端`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `dot-line ${running ? "on" : ""}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "backend-name", children: [
            node.name,
            edge?.isTry && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag green", title: "try 列表里的默认入口", children: "默认" }),
            node.sharedPort && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag red", title: "有另一个服务器配了同一个端口，两者不能同时启动", children: "同端口" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "backend-meta", children: [
            node.running && node.onlinePlayers > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag orange", title: "本机在线人数", children: [
              node.onlinePlayers,
              node.maxPlayers > 0 && `/${node.maxPlayers}`
            ] }),
            node.port != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mono", children: [
              ":",
              node.port
            ] }),
            edge?.proxyMod ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `tag ${edge.secretOk === false ? "red" : "green"}`,
                title: `${edge.proxyMod}${edge.secretOk === false ? " · 密钥不一致" : ""}`,
                children: edge.secretOk === false ? "密钥不符" : "已转发"
              }
            ) : node.managed ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag red", title: "后端没装 FabricProxy / FabricProxy-Lite", children: "无转发" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: "未导入" })
          ] }),
          node.managed && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              role: "button",
              tabIndex: 0,
              className: "icon-btn",
              style: { width: 22, height: 22 },
              title: running ? "停止" : "启动",
              onClick: (e) => {
                e.stopPropagation();
                onToggle();
              },
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  e.stopPropagation();
                  onToggle();
                }
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: running ? "stop" : "play", size: running ? 10 : 11 })
            }
          )
        ]
      }
    ),
    active && node.managed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { paddingLeft: 34, paddingBottom: 4 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SubItem,
        {
          active: view === "console",
          icon: "terminal",
          label: "控制台",
          onClick: () => onOpenView("console")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SubItem,
        {
          active: view === "properties",
          icon: "sliders",
          label: "服务器属性",
          onClick: () => onOpenView("properties")
        }
      )
    ] })
  ] });
}
function SubItem({
  active,
  icon,
  label,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        width: "100%",
        padding: "6px 10px",
        borderRadius: 7,
        fontSize: 13,
        color: active ? "var(--text)" : "var(--text-muted)",
        background: active ? "var(--bg-active)" : "transparent",
        textAlign: "left"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: icon, size: 14 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: label })
      ]
    }
  );
}
function Modal({
  title,
  onClose,
  children,
  footer,
  size = "default"
}) {
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overlay", onMouseDown: (e) => e.target === e.currentTarget && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `modal ${size}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-btn", onClick: onClose, title: "关闭", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "x", size: 16 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-body", children }),
    footer && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-foot", children: footer })
  ] }) });
}
function Switch({
  checked,
  onChange,
  disabled
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      className: `switch ${checked ? "on" : ""}`,
      onClick: () => !disabled && onChange(!checked),
      style: disabled ? { opacity: 0.5, cursor: "not-allowed" } : void 0,
      "aria-pressed": checked
    }
  );
}
function Field({
  label,
  hint,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "field", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "field-label", children: [
      label,
      hint && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "field-key", children: hint })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "field-body", children })
  ] });
}
function Confirm({
  title,
  message,
  confirmText = "确定",
  danger,
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      title,
      size: "slim",
      onClose: onCancel,
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spacer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: onCancel, children: "取消" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `btn ${danger ? "danger" : "primary"}`, onClick: onConfirm, children: confirmText })
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13.5, lineHeight: 1.8, color: "var(--text-dim)" }, children: message })
    }
  );
}
function Spinner({ text }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "center-state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spin" }),
    text && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: text })
  ] });
}
function DeleteServerDialog({
  server,
  onClose,
  onDeleted
}) {
  const toast = useStore((s) => s.toast);
  const [mode, setMode] = reactExports.useState("link");
  const [typed, setTyped] = reactExports.useState("");
  const [size, setSize] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const running = server.runtime.status !== "stopped" && server.runtime.status !== "crashed";
  const nameOk = typed.trim() === server.name;
  const canSubmit = !busy && !running && (mode === "link" || nameOk);
  reactExports.useEffect(() => {
    void window.api.fs.dirSize(server.dir, "").then((res) => {
      if (res.ok) setSize({ bytes: res.data.bytes, partial: res.data.partial });
    });
  }, [server.dir]);
  const submit = async () => {
    setBusy(true);
    const res = await window.api.servers.delete(server.id, mode, typed.trim());
    setBusy(false);
    if (!res.ok) {
      toast(res.error ?? "删除失败", "error");
      return;
    }
    toast(
      mode === "files" ? `${server.name} 的目录已移入回收站` : `已从列表移除 ${server.name}`,
      "success"
    );
    onDeleted();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      title: mode === "files" ? `删除 ${server.name}` : `移除 ${server.name}`,
      onClose,
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spacer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: onClose, children: "取消" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `btn ${mode === "files" ? "danger" : "primary"}`,
            disabled: !canSubmit,
            onClick: () => void submit(),
            children: busy ? "处理中…" : mode === "files" ? "删除整个服务器" : "从列表移除"
          }
        )
      ] }),
      children: [
        running && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "notice warn", style: { marginBottom: 12 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 15 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "服务器正在运行，先停下来再删。跑着的进程占着 jar 和世界文件，删到一半更麻烦。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pick-list", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            PickCard,
            {
              active: mode === "link",
              icon: "panel",
              title: "只从列表移除",
              sub: "磁盘上一个字节都不动",
              onClick: () => setMode("link"),
              children: [
                "CraftDesk 忘掉这台服务器，目录 ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: server.dir }),
                " ",
                "原封不动。之后想管它，重新导入一次就行。"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            PickCard,
            {
              active: mode === "files",
              icon: "trash",
              title: "连服务器目录一起删除",
              sub: "走回收站，能反悔",
              danger: true,
              onClick: () => setMode("files"),
              children: [
                "整台服务器的文件都会被移入系统回收站：世界存档、插件、模组、配置、",
                /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "全部" }),
                "。",
                size && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  " ",
                  "这个目录有 ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
                    size.partial ? "≥ " : "",
                    formatBytes(size.bytes)
                  ] }),
                  "。"
                ] })
              ]
            }
          )
        ] }),
        mode === "files" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "notice danger", style: { marginTop: 12, display: "block" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "flex-start" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 15 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "这一步没有撤销按钮。" }),
            "回收站里的东西会被清空，清空之后就找不回来了。世界存档尤其没法重建。",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 10 }, children: [
              "确认就输入服务器名称 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: server.name }),
              "："
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input",
                style: { marginTop: 8 },
                autoFocus: true,
                value: typed,
                placeholder: server.name,
                spellCheck: false,
                onChange: (e) => setTyped(e.target.value)
              }
            ),
            typed.length > 0 && !nameOk && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 6, color: "var(--danger)" }, children: "名称不一致，还删不了" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { marginTop: 12, lineHeight: 1.8 }, children: "备份提示：删除之前可以先到右侧「备份」面板打一个整目录备份，比回收站可靠。" })
      ]
    }
  );
}
function PickCard({
  active,
  icon,
  title,
  sub,
  danger,
  children,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      className: `pick-card ${active ? "active" : ""}`,
      onClick,
      "aria-pressed": active,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "pick-icon",
            style: { background: danger ? "var(--danger-soft)" : "var(--bg-active)", color: danger ? "var(--danger)" : "var(--text-dim)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: icon, size: 16 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "pick-main", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "pick-title", children: [
            title,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `tag ${danger ? "red" : ""}`, children: sub })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pick-sub", children })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `pick-radio ${active ? "on" : ""}` })
      ]
    }
  );
}
function ServerIconDialog({
  server,
  onClose
}) {
  const toast = useStore((s) => s.toast);
  const refresh = useStore((s) => s.refresh);
  const spec = parseIcon(server.icon);
  const [text, setText] = reactExports.useState(spec.kind === "text" ? spec.text : "");
  const [busy, setBusy] = reactExports.useState(false);
  const patch = async (p2) => {
    const res = await window.api.servers.update(server.id, p2);
    if (!res.ok) {
      toast(res.error ?? "保存失败", "error");
      return;
    }
    await refresh();
  };
  const chooseText = (value) => {
    const clean = normalizeIconText(value);
    if (!clean) {
      toast("先打一个字或者选一个表情", "info");
      return;
    }
    setText(clean);
    void patch({ icon: textIcon(clean) });
  };
  const pickImage = async () => {
    const picked = await window.api.app.pickFile("选择服务器图标", "image");
    if (!picked.ok || !picked.data) return;
    setBusy(true);
    const res = await window.api.app.importIcon(server.id, picked.data);
    if (!res.ok) {
      setBusy(false);
      toast(res.error ?? "这张图片用不了", "error");
      return;
    }
    const read = await window.api.app.readIcon(res.data.name);
    if (read.ok) primeIcon(res.data.name, read.data.dataUrl);
    setBusy(false);
    await patch({ icon: fileIcon(res.data.name) });
    toast("图标已更新", "success");
  };
  const preview = { ...server, icon: server.icon };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { title: "服务器图标", onClose, size: "slim", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icon-picker", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icon-preview", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ServerAvatar, { server: preview, size: 64 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icon-preview-name", children: server.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", children: spec.kind === "image" ? "用的是你自己的图片" : spec.kind === "text" ? `用的是文字「${spec.text}」` : "用的是名字缩写" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icon-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icon-group-title", children: "文字 / 表情" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "emoji-grid", children: ICON_EMOJIS.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `emoji-btn ${spec.kind === "text" && spec.text === e ? "active" : ""}`,
          title: e,
          onClick: () => chooseText(e),
          children: e
        },
        e
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icon-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "input",
            style: { maxWidth: 120 },
            value: text,
            placeholder: "自己打",
            maxLength: ICON_TEXT_MAX * 2,
            onChange: (e) => setText(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") chooseText(text);
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm", onClick: () => chooseText(text), children: "用这个" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hint", children: [
          "最多 ",
          ICON_TEXT_MAX,
          " 个字符"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icon-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icon-group-title", children: "底色" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "swatch-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `swatch kind ${server.color ? "" : "active"}`,
            title: "跟随服务端类型",
            onClick: () => void patch({ color: "" }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "refresh", size: 13 })
          }
        ),
        ICON_COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `swatch ${server.color === c ? "active" : ""}`,
            style: { background: c },
            title: c,
            onClick: () => void patch({ color: c })
          },
          c
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", children: "选了图片之后底色就看不见了，图片本身铺满整个图标。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icon-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icon-group-title", children: "图片" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icon-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn sm", disabled: busy, onClick: () => void pickImage(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "image", size: 14 }),
          busy ? "处理中…" : "选择图片…"
        ] }),
        spec.kind === "image" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn sm ghost",
            onClick: () => void patch({ icon: "" }),
            title: "回到名字缩写",
            children: "移除"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", children: "png / jpg / webp / gif / bmp，32 MB 以内。图片会复制到 CraftDesk 的配置目录里，之后原图删掉、挪走都不影响。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icon-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: "btn sm",
        onClick: () => {
          setText("");
          void patch({ icon: "" });
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "refresh", size: 14 }),
          "恢复成名字缩写"
        ]
      }
    ) })
  ] }) });
}
function Menu({
  trigger,
  children,
  align = "left"
}) {
  const [open, setOpen] = reactExports.useState(false);
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, style: { position: "relative" }, children: [
    trigger(open, () => setOpen((v2) => !v2)),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "menu",
        style: align === "right" ? { right: 0 } : { left: 0 },
        onClick: () => setOpen(false),
        children: children(() => setOpen(false))
      }
    )
  ] });
}
function Toolbar({ onAdd }) {
  const active = useStore((s) => s.servers.find((x2) => x2.id === s.activeId) ?? null);
  const servers = useStore((s) => s.servers);
  const select = useStore((s) => s.select);
  const toast = useStore((s) => s.toast);
  const refresh = useStore((s) => s.refresh);
  const toggleList = useStore((s) => s.toggleList);
  const togglePanel = useStore((s) => s.togglePanel);
  const panelOpen = useStore((s) => s.panelOpen);
  const setView = useStore((s) => s.setView);
  const [busy, setBusy] = reactExports.useState(false);
  const [deleting, setDeleting] = reactExports.useState(false);
  const [iconOpen, setIconOpen] = reactExports.useState(false);
  const rt = active?.runtime;
  const running = rt ? rt.status === "running" || rt.status === "starting" : false;
  const doStart = async () => {
    if (!active) return;
    setBusy(true);
    const res = await window.api.server.start(active.id);
    setBusy(false);
    if (!res.ok) toast(res.error ?? "启动失败", "error");
    else toast(`正在启动 ${active.name}`, "success");
    void refresh();
  };
  const doStop = async (force = false) => {
    if (!active) return;
    setBusy(true);
    const res = await window.api.server.stop(active.id, force);
    setBusy(false);
    if (!res.ok) toast(res.error ?? "停止失败", "error");
    void refresh();
  };
  const doRestart = async () => {
    if (!active) return;
    setBusy(true);
    const res = await window.api.server.restart(active.id);
    setBusy(false);
    if (!res.ok) toast(res.error ?? "重启失败", "error");
    else toast(`${active.name} 已重启`, "success");
    void refresh();
  };
  if (!active) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toolbar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-btn", onClick: toggleList, title: "折叠/展开服务器列表", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "panel", size: 17 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toolbar-spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn primary", onClick: onAdd, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "plus", size: 15 }),
        "添加服务器"
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toolbar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-btn", onClick: toggleList, title: "折叠/展开服务器列表", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "panel", size: 17 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Menu,
      {
        trigger: (_open, toggle) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "chip chip-name", onClick: toggle, title: active.dir, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ServerAvatar, { server: active, size: 22 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip-text", children: active.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "chevron-down", size: 14 })
        ] }),
        children: (close) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "menu-label", children: "切换服务器" }),
          servers.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: `menu-item ${s.id === active.id ? "active" : ""}`,
              onClick: () => {
                select(s.id);
                close();
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ServerAvatar, { server: s, size: 20 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "menu-item-text", children: s.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `dot ${s.runtime.status}` })
              ]
            },
            s.id
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "menu-sep" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "menu-item",
              onClick: () => {
                onAdd();
                close();
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "plus", size: 15 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "menu-item-text", children: "添加新的服务器" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "menu-item",
              onClick: () => {
                setIconOpen(true);
                close();
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "image", size: 15 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "menu-item-text", children: "换服务器图标…" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "menu-item danger",
              onClick: () => {
                setDeleting(true);
                close();
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "trash", size: 15 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "menu-item-text", children: "移除或删除这台服务器…" })
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Menu,
      {
        trigger: (_open, toggle) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "chip chip-kind", onClick: toggle, title: "服务端类型与版本", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "package", size: 15, style: { color: kindColor(active.kind) } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "chip-text", children: [
            kindLabel(active.kind),
            active.mcVersion ? ` ${active.mcVersion}` : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "chevron-down", size: 14 })
        ] }),
        children: (close) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "menu-label", children: "服务端信息" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "menu-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "类型" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: kindLabel(active.kind) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "版本" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: active.mcVersion || "未识别" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "核心" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: active.jar || active.startScript || "未设置" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "内存" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
                active.memoryMin,
                " ~ ",
                active.memoryMax,
                " MB"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "menu-sep" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "menu-item",
              onClick: () => {
                setView("properties");
                close();
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "sliders", size: 15 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "menu-item-text", children: "编辑 server.properties" })
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: "chip chip-dir",
        title: `打开目录：${active.dir}`,
        onClick: () => void window.api.app.openFolder(active.dir),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "folder", size: 15 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip-text", children: active.dir.replace(/[\\/]+$/, "").split(/[\\/]/).pop() || active.dir })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toolbar-spacer" }),
    rt && rt.status !== "stopped" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-pill", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `dot ${rt.status}` }),
        statusLabel(rt.status)
      ] }),
      rt.onlineCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-pill", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "users", size: 13 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: rt.onlineCount }),
        "/",
        rt.maxPlayers
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: "icon-btn",
        onClick: togglePanel,
        title: panelOpen ? "收起右侧面板" : "展开右侧面板",
        style: { color: panelOpen ? "var(--text)" : void 0 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "panel", size: 17 })
      }
    ),
    running ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn", disabled: busy, onClick: () => void doRestart(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "restart", size: 14 }),
        "重启"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Menu,
        {
          align: "right",
          trigger: (_open, toggle) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn danger", disabled: busy, onClick: toggle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "stop", size: 12 }),
            "停止",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "chevron-down", size: 13 })
          ] }),
          children: (close) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                className: "menu-item",
                onClick: () => {
                  void doStop(false);
                  close();
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "stop", size: 15 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "menu-item-text", children: "优雅停止（保存世界）" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                className: "menu-item danger",
                onClick: () => {
                  void doStop(true);
                  close();
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "zap", size: 15 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "menu-item-text", children: "强制结束进程" })
                ]
              }
            )
          ] })
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn primary", disabled: busy, onClick: () => void doStart(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "play", size: 13 }),
      "启动"
    ] }),
    iconOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(ServerIconDialog, { server: active, onClose: () => setIconOpen(false) }),
    deleting && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteServerDialog,
      {
        server: active,
        onClose: () => setDeleting(false),
        onDeleted: () => {
          setDeleting(false);
          void refresh();
        }
      }
    )
  ] });
}
function Toasts() {
  const toasts = useStore((s) => s.toasts);
  const dismiss = useStore((s) => s.dismissToast);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toasts", children: toasts.map((t2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `toast ${t2.type}`,
      onClick: () => dismiss(t2.id),
      title: "点击关闭",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Icon,
          {
            name: t2.type === "error" ? "alert" : t2.type === "success" ? "check" : "activity",
            size: 15,
            style: {
              marginTop: 1,
              color: t2.type === "error" ? "var(--danger)" : t2.type === "success" ? "var(--accent)" : "var(--text-muted)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { flex: 1, lineHeight: 1.6 }, children: t2.text })
      ]
    },
    t2.id
  )) });
}
function requiredJavaMajor(mcVersion) {
  const legacy = mcVersion.match(/^1\.(\d+)(?:\.(\d+))?/);
  if (legacy) {
    const minor = Number(legacy[1]);
    const patch = legacy[2] ? Number(legacy[2]) : 0;
    if (minor >= 21) return 21;
    if (minor === 20) return patch >= 5 ? 21 : 17;
    if (minor >= 18) return 17;
    if (minor === 17) return 16;
    return 8;
  }
  const modern = mcVersion.match(/^(\d+)(?:\.(\d+))?/);
  if (modern) {
    const major = Number(modern[1]);
    if (major >= 26) return 25;
    if (major >= 21) return 21;
    if (major >= 18) return 17;
    if (major >= 17) return 16;
  }
  return 17;
}
function proxyJavaMajor(kind, version) {
  if (kind === "waterfall") return requiredJavaMajor(version);
  return 17;
}
function proxyJavaHintText(kind, version) {
  const major = proxyJavaMajor(kind, version);
  if (kind === "waterfall") return `Waterfall ${version} 建议使用 Java ${major}+`;
  return `代理端只需要 Java ${major}+（不吃版本号那一套）`;
}
function javaHintText(mcVersion) {
  const major = requiredJavaMajor(mcVersion);
  return `Minecraft ${mcVersion} 建议使用 Java ${major}${major === 8 ? "（或更高）" : "+"}`;
}
const KINDS = [
  { kind: "paper", icon: "zap", desc: "插件服首选" },
  { kind: "vanilla", icon: "box", desc: "官方原版" },
  { kind: "purpur", icon: "activity", desc: "性能更好" },
  { kind: "fabric", icon: "puzzle", desc: "轻量模组服" },
  { kind: "forge", icon: "wrench", desc: "模组服老牌" },
  { kind: "neoforge", icon: "wrench", desc: "Forge 分支" }
];
const INSTALLER_KINDS = ["forge", "neoforge"];
const PROXY_KINDS = [
  { kind: "velocity", icon: "zap", desc: "现代代理，性能好" },
  { kind: "waterfall", icon: "globe", desc: "Paper 维护的 BungeeCord" },
  { kind: "bungeecord", icon: "network", desc: "老牌代理，插件最多" }
];
function AddServerDialog({ onClose }) {
  const [mode, setMode] = reactExports.useState("choose");
  const titles = {
    choose: "添加服务器",
    import: "导入已有服务端",
    network: "导入跨服网络",
    create: "新建服务器",
    "create-proxy": "下载跨服网络"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal, { title: titles[mode], onClose, size: "wide", children: [
    mode === "choose" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "choice-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "choice", onClick: () => setMode("import"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ct", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "folder-input", size: 18, style: { color: "var(--accent)" } }),
          "导入已有服务端"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cd", children: "选择已经装好服务端的文件夹，CraftDesk 会自动识别核心类型、Minecraft 版本、端口和世界存档。适合以前手动开过服的情况。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "choice", onClick: () => setMode("create"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ct", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "download", size: 18, style: { color: "#60a5fa" } }),
          "下载并新建服务器"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cd", children: "选择 Minecraft 版本和服务端类型，自动下载核心、生成 eula.txt 与 server.properties，开箱即可启动。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "choice", onClick: () => setMode("network"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ct", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "network", size: 18, style: { color: "#06b6d4" } }),
          "导入跨服网络"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cd", children: "Velocity / BungeeCord 这类代理端：选中它的目录，CraftDesk 会读出配置里 的全部后端，在附近找到对应的目录，让你一次勾选要导入哪些。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "choice", onClick: () => setMode("create-proxy"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ct", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "globe", size: 18, style: { color: "#a78bfa" } }),
          "下载跨服网络"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cd", children: "下载 Velocity / Waterfall / BungeeCord，并生成它自己的配置 （velocity.toml、config.yml）。玩家连它，它再把人转发到后端服务器。" })
      ] })
    ] }),
    mode === "import" && /* @__PURE__ */ jsxRuntimeExports.jsx(ImportForm, { onBack: () => setMode("choose"), onClose }),
    mode === "network" && /* @__PURE__ */ jsxRuntimeExports.jsx(NetworkForm, { onBack: () => setMode("choose"), onClose }),
    mode === "create" && /* @__PURE__ */ jsxRuntimeExports.jsx(CreateForm, { group: "server", onBack: () => setMode("choose"), onClose }),
    mode === "create-proxy" && /* @__PURE__ */ jsxRuntimeExports.jsx(CreateForm, { group: "proxy", onBack: () => setMode("choose"), onClose })
  ] });
}
function ImportForm({ onBack, onClose }) {
  const toast = useStore((s) => s.toast);
  const refresh = useStore((s) => s.refresh);
  const select = useStore((s) => s.select);
  const javaList = useStore((s) => s.javaList);
  const settings = useStore((s) => s.settings);
  const [detected, setDetected] = reactExports.useState(null);
  const [scanning, setScanning] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [jar, setJar] = reactExports.useState("");
  const [script, setScript] = reactExports.useState("");
  const [mode, setMode] = reactExports.useState("jar");
  const [javaPath, setJavaPath] = reactExports.useState("");
  const [memory, setMemory] = reactExports.useState({ min: 1024, max: 4096 });
  const [saving, setSaving] = reactExports.useState(false);
  const pick = async () => {
    const res = await window.api.app.pickDirectory("选择包含服务端核心的文件夹");
    if (!res.ok || !res.data) return;
    setScanning(true);
    const det = await window.api.servers.detect(res.data);
    setScanning(false);
    if (!det.ok) {
      toast(det.error ?? "扫描失败", "error");
      return;
    }
    const d = det.data;
    setDetected(d);
    setName(d.name);
    setJar(d.suggestedJar);
    setScript(d.suggestedScript);
    setMode(d.suggestedScript && (!d.suggestedJar || d.preferScript) ? "script" : "jar");
    setMemory({
      min: settings?.defaultMemoryMin ?? 1024,
      max: settings?.defaultMemoryMax ?? 4096
    });
    if (!d.suggestedJar && !d.suggestedScript) {
      toast("这个目录里没有找到服务端核心，请确认选对了文件夹", "error");
    }
  };
  const submit = async () => {
    if (!detected) return;
    setSaving(true);
    const res = await window.api.servers.add(detected.dir, {
      name: name.trim() || detected.name,
      jar: mode === "jar" ? jar : "",
      startScript: mode === "script" ? script : "",
      kind: detected.kind,
      mcVersion: detected.mcVersion,
      javaPath,
      memoryMin: memory.min,
      memoryMax: memory.max
    });
    setSaving(false);
    if (res.ok) {
      toast(`${res.data.name} 已加入列表`, "success");
      await refresh();
      select(res.data.id);
      onClose();
    } else {
      toast(res.error ?? "添加失败", "error");
    }
  };
  if (!detected) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "center-state", style: { minHeight: 220 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "folder-input", size: 34, style: { color: "var(--text-faint)" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "选择一个已经装好服务端的文件夹" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { maxWidth: 460 }, children: "比如以前用启动器开过的服务器目录，里面应该有 server.jar 或者 start.bat。 CraftDesk 只读取目录内容，不会修改任何文件。" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn primary", onClick: () => void pick(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "folder-open", size: 15 }),
          "选择文件夹"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-foot", style: { padding: 0, borderTop: "none", marginTop: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn", onClick: onBack, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "chevron-left", size: 14 }),
        "返回"
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detect-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detect-icon", style: { background: kindColor(detected.kind) }, children: serverInitials(name || detected.name) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detect-main", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "detect-name", children: name || detected.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "detect-path", children: detected.dir }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detect-tags", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: kindLabel(detected.kind) }),
          detected.mcVersion && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag blue", children: [
            "Minecraft ",
            detected.mcVersion
          ] }),
          detected.port && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag", children: [
            "端口 ",
            detected.port
          ] }),
          detected.coreDir && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag purple", children: [
            "核心在 ",
            detected.coreDir,
            "/ 子目录"
          ] }),
          detected.isMcdr && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag purple", children: "MCDReforged 托管" }),
          detected.hasWorld && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag green", children: "已有世界存档" }),
          detected.eulaAccepted ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag green", children: "已同意 EULA" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag orange", children: "EULA 未同意" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: formatBytes(detected.sizeBytes) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm", onClick: () => void pick(), children: "换一个" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "显示名称", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: name, onChange: (e) => setName(e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "启动方式", hint: "脚本或直接启动 jar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "select", value: mode, onChange: (e) => setMode(e.target.value), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "jar", disabled: !detected.jars.length, children: "直接用 Java 启动 jar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "script", disabled: !detected.scripts.length, children: "运行启动脚本" })
    ] }) }),
    mode === "jar" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "服务端核心", hint: "相对服务器目录的路径", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "select", value: jar, onChange: (e) => setJar(e.target.value), children: [
      detected.jars.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: j, children: [
        j,
        j === detected.suggestedJar ? "（推荐）" : ""
      ] }, j)),
      !detected.jars.length && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "没有找到 jar 文件" })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "启动脚本", hint: "会把脚本交给 cmd 执行", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "select", value: script, onChange: (e) => setScript(e.target.value), children: [
      detected.scripts.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: s, children: [
        s,
        s === detected.suggestedScript ? "（推荐）" : ""
      ] }, s)),
      !detected.scripts.length && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "没有找到脚本" })
    ] }) }),
    detected.preferScript && mode === "script" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { marginBottom: 8 }, children: [
      "检测到这是一个套在外层的启动器（例如 MCDReforged）。用脚本启动会保留它的插件与指令功能； 直接启动 ",
      detected.coreDir,
      "/ 里的 jar 则会绕过它。",
      detected.isMcdr && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "注意：MCDR 模式下内存由它自己的 config.yml 决定，这里的设置不会生效。"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Java 运行环境", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "select", value: javaPath, onChange: (e) => setJavaPath(e.target.value), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "", children: [
        "使用全局默认（",
        settings?.javaPath || "未设置",
        "）"
      ] }),
      javaList.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: j.path, children: [
        "Java ",
        j.major,
        " · ",
        j.path
      ] }, j.path))
    ] }) }),
    detected.mcVersion && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { marginBottom: 8 }, children: javaHintText(detected.mcVersion) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "最小内存 / 最大内存", hint: "单位 MB", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          type: "number",
          step: 256,
          value: memory.min,
          onChange: (e) => setMemory((m2) => ({ ...m2, min: Number(e.target.value) }))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          type: "number",
          step: 256,
          value: memory.max,
          onChange: (e) => setMemory((m2) => ({ ...m2, max: Number(e.target.value) }))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-foot", style: { padding: 0, borderTop: "none", marginTop: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn", onClick: onBack, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "chevron-left", size: 14 }),
        "返回"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => setDetected(null), children: "重新选择" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn primary", disabled: saving, onClick: () => void submit(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "check", size: 15 }),
        saving ? "添加中…" : "确认添加"
      ] })
    ] })
  ] });
}
function NetworkForm({ onBack, onClose }) {
  const toast = useStore((s) => s.toast);
  const refresh = useStore((s) => s.refresh);
  const select = useStore((s) => s.select);
  const settings = useStore((s) => s.settings);
  const [plan, setPlan] = reactExports.useState(null);
  const [scanning, setScanning] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [memory, setMemory] = reactExports.useState({ min: 1024, max: 4096 });
  const [picked, setPicked] = reactExports.useState(/* @__PURE__ */ new Set());
  const [includeProxy, setIncludeProxy] = reactExports.useState(true);
  const [busy, setBusy] = reactExports.useState("");
  const [progress, setProgress] = reactExports.useState({ done: 0, total: 0 });
  reactExports.useEffect(() => {
    setMemory({
      min: settings?.defaultMemoryMin ?? 1024,
      max: settings?.defaultMemoryMax ?? 4096
    });
  }, [settings]);
  const pick = async () => {
    const res = await window.api.app.pickDirectory("选择代理端目录（含 velocity.toml 或 config.yml）");
    if (!res.ok || !res.data) return;
    setScanning(true);
    const scan = await window.api.servers.scanNetwork(res.data);
    setScanning(false);
    if (!scan.ok) {
      toast(scan.error ?? "扫描失败", "error");
      return;
    }
    const p2 = scan.data;
    setPlan(p2);
    setName(p2.proxy.name);
    setPicked(new Set(p2.backends.filter((b) => b.status === "found").map((b) => b.alias)));
  };
  const importable = plan?.backends.filter((b) => b.status === "found") ?? [];
  const allPicked = importable.length > 0 && importable.every((b) => picked.has(b.alias));
  const toggleAll = () => {
    setPicked(allPicked ? /* @__PURE__ */ new Set() : new Set(importable.map((b) => b.alias)));
  };
  const importNow = async () => {
    if (!plan) return;
    const targets = [
      ...includeProxy ? [{ dir: plan.proxy.dir, name: plan.proxy.name }] : [],
      ...plan.backends.filter((b) => b.status === "found" && b.dir && picked.has(b.alias)).map((b) => ({ dir: b.dir, name: b.detected?.name || b.alias }))
    ];
    if (!targets.length) {
      toast("没有勾选任何要导入的东西", "info");
      return;
    }
    setProgress({ done: 0, total: targets.length });
    const added = [];
    const failed = [];
    for (const [i, t2] of targets.entries()) {
      setBusy(`正在导入 ${t2.name}（${i + 1}/${targets.length}）`);
      const res = await window.api.servers.add(t2.dir, {
        memoryMin: memory.min,
        memoryMax: memory.max
      });
      if (res.ok) added.push(res.data.name);
      else failed.push(`${t2.name}：${res.error ?? "失败"}`);
      setProgress({ done: i + 1, total: targets.length });
    }
    setBusy("");
    await refresh();
    if (added.length) {
      const list = await window.api.servers.list();
      const proxy = list.ok ? list.data.find((s) => s.dir === plan.proxy.dir) : void 0;
      if (proxy) select(proxy.id);
      toast(`已导入 ${added.length} 个：${added.join("、")}`, "success");
    }
    if (failed.length) toast(`有 ${failed.length} 个没导成 —— ${failed[0]}`, "error");
    if (added.length && !failed.length) onClose();
  };
  if (!plan) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "center-state", style: { minHeight: 240 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "network", size: 34, style: { color: "var(--text-faint)" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "选择代理端所在的文件夹" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { maxWidth: 520, textAlign: "center" }, children: [
          "里面应该有 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "velocity.toml" }),
          "（Velocity）或 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "config.yml" }),
          "（BungeeCord / Waterfall）以及代理端的 jar。",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "CraftDesk 会读出配置里列的后端，并在它旁边的目录里找出对应的服务端 —— 只读，不动任何文件。"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn primary", disabled: scanning, onClick: () => void pick(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "folder-open", size: 15 }),
          scanning ? "正在扫描…" : "选择代理端目录"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-foot", style: { padding: 0, borderTop: "none", marginTop: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn", onClick: onBack, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "chevron-left", size: 14 }),
        "返回"
      ] }) })
    ] });
  }
  const foundCount = importable.length;
  const managedCount = plan.backends.filter((b) => b.status === "managed").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detect-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detect-icon", style: { background: kindColor(plan.proxy.kind) }, children: serverInitials(name || plan.proxy.name) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detect-main", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "detect-name", children: plan.proxy.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "detect-path", children: plan.proxy.dir }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detect-tags", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag cyan", children: kindLabel(plan.proxy.kind) }),
          plan.proxy.mcVersion && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: plan.proxy.mcVersion }),
          plan.proxyPort && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag", children: [
            "监听 ",
            plan.proxyPort
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag purple", children: [
            "配置里有 ",
            plan.backends.length,
            " 个后端"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm", onClick: () => void pick(), children: "换一个" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        "后端服务器",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hint", style: { marginLeft: 8, fontWeight: 400 }, children: [
          "可导入 ",
          foundCount,
          " · 已在列表 ",
          managedCount,
          " · 只有地址",
          " ",
          plan.backends.length - foundCount - managedCount
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { marginBottom: 8 }, children: [
        "在 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: plan.searchRoot }),
        " 附近扫了 ",
        plan.scanned,
        " 个目录。 打钩的会被加进 CraftDesk（代理端与后端的转发关系由拓扑视图自动连线）。"
      ] }),
      plan.backends.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "issue-bar", style: { margin: "0 0 12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 15 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "issue-text", children: [
          "这份配置里没有列出任何后端。先把后端加进 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "velocity.toml" }),
          " 的",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "[servers]" }),
          " 或 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "config.yml" }),
          " 的 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "servers:" }),
          "， 再回来导。"
        ] })
      ] }),
      plan.backends.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "flex-end", marginBottom: 6 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm", disabled: !foundCount, onClick: toggleAll, children: allPicked ? "全不选" : `全选可导入的 ${foundCount} 个` }) }),
      plan.backends.map((b) => {
        const canPick = b.status === "found";
        const checked = canPick && picked.has(b.alias);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `row ${canPick ? "" : "disabled"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              className: "net-check",
              checked,
              disabled: !canPick,
              onChange: () => setPicked((prev) => {
                const next = new Set(prev);
                if (next.has(b.alias)) next.delete(b.alias);
                else next.add(b.alias);
                return next;
              })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-main", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-title", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: "var(--mono)", fontSize: 12.5 }, children: b.alias }),
              b.detected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: kindLabel(b.detected.kind) }),
              b.detected?.mcVersion && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag blue", children: b.detected.mcVersion }),
              b.status === "managed" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag green", children: "已在列表" }),
              b.status === "found" && b.foundBy === "name" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag orange", children: "按名字猜的" }),
              b.status === "not-a-server" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag red", children: "不是服务端" }),
              b.status === "address-only" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: "只有地址" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-sub", title: b.dir ?? b.address, children: [
              b.address,
              b.dir && ` · ${b.displayDir}`
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-sub", style: { color: "var(--text-faint)" }, children: [
              b.note,
              b.status === "managed" && b.managedName ? `：${b.managedName}` : ""
            ] })
          ] })
        ] }, b.alias);
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "导入选项" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "把代理端也加进来", hint: "关掉就只导勾选的后端", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: includeProxy, onChange: setIncludeProxy }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "显示名称", hint: "只影响代理端在列表里的名字", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          value: name,
          disabled: !includeProxy,
          onChange: (e) => setName(e.target.value)
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "后端内存", hint: "后端是独立的服务端，各自跑在自己的内存里", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "input",
            type: "number",
            step: 256,
            value: memory.min,
            onChange: (e) => setMemory((m2) => ({ ...m2, min: Number(e.target.value) }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "input",
            type: "number",
            step: 256,
            value: memory.max,
            onChange: (e) => setMemory((m2) => ({ ...m2, max: Number(e.target.value) }))
          }
        )
      ] })
    ] }),
    busy && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 12 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            width: `${progress.total ? Math.round(progress.done / progress.total * 100) : 0}%`
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { marginTop: 8 }, children: busy })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-foot", style: { padding: 0, borderTop: "none" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn", onClick: onBack, disabled: Boolean(busy), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "chevron-left", size: 14 }),
        "返回"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "btn primary",
          disabled: Boolean(busy) || !includeProxy && picked.size === 0,
          onClick: () => void importNow(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "download", size: 15 }),
            "导入选中的 ",
            picked.size + (includeProxy ? 1 : 0),
            " 个"
          ]
        }
      )
    ] })
  ] });
}
function CreateForm({
  group,
  onBack,
  onClose
}) {
  const javaList = useStore((s) => s.javaList);
  const javaCheck = (mcVersion) => {
    const need = isProxyKind(kind) ? proxyJavaMajor(kind, mcVersion) : requiredJavaMajor(mcVersion);
    const usable = javaList.filter((j) => j.valid && j.major >= need).sort((a, b) => a.major - b.major);
    return { need, best: usable[0]?.major ?? 0, path: usable[0]?.path ?? "" };
  };
  const toast = useStore((s) => s.toast);
  const refresh = useStore((s) => s.refresh);
  const select = useStore((s) => s.select);
  const settings = useStore((s) => s.settings);
  const downloads = useStore((s) => s.downloads);
  const pythonList = useStore((s) => s.pythonList);
  const refreshPython = useStore((s) => s.refreshPython);
  const proxyGroup = group === "proxy";
  const kindList = proxyGroup ? PROXY_KINDS : KINDS;
  const [kind, setKind] = reactExports.useState(proxyGroup ? "velocity" : "paper");
  const [versions, setVersions] = reactExports.useState([]);
  const [version, setVersion] = reactExports.useState("");
  const [build, setBuild] = reactExports.useState("");
  const [loadingVersions, setLoadingVersions] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [parentDir, setParentDir] = reactExports.useState("");
  const [port, setPort] = reactExports.useState(25565);
  const [motd, setMotd] = reactExports.useState("A Minecraft Server");
  const [memory, setMemory] = reactExports.useState({ min: 1024, max: 4096 });
  const [eula, setEula] = reactExports.useState(true);
  const [installing, setInstalling] = reactExports.useState(false);
  const [wantMcdr, setWantMcdr] = reactExports.useState(false);
  const [pythonPath, setPythonPath] = reactExports.useState("");
  const [installingMcdr, setInstallingMcdr] = reactExports.useState(false);
  const task = Object.values(downloads)[0];
  const needsInstaller = INSTALLER_KINDS.includes(kind);
  const isProxy = isProxyKind(kind);
  reactExports.useEffect(() => {
    setMemory({
      min: settings?.defaultMemoryMin ?? 1024,
      max: settings?.defaultMemoryMax ?? 4096
    });
  }, [settings]);
  const python = pythonList.find((p2) => p2.path === pythonPath) ?? pythonList[0] ?? null;
  const mcdrOk = Boolean(python?.suitable && python?.mcdr);
  reactExports.useEffect(() => {
    if (!pythonPath && pythonList.length) setPythonPath(pythonList[0].path);
  }, [pythonList, pythonPath]);
  reactExports.useEffect(() => {
    let cancelled = false;
    setLoadingVersions(true);
    setVersions([]);
    void window.api.versions.list(kind).then((res) => {
      if (cancelled) return;
      setLoadingVersions(false);
      if (res.ok) {
        const list = res.data;
        setVersions(list);
        setVersion(list[0]?.id ?? "");
        setBuild(list[0]?.latestBuild ?? "");
      } else {
        toast(res.error ?? "获取版本列表失败", "error");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [kind]);
  const pickVersion = (id2) => {
    setVersion(id2);
    setBuild(versions.find((v2) => v2.id === id2)?.latestBuild ?? "");
  };
  const installMcdrNow = async () => {
    if (!python) return;
    setInstallingMcdr(true);
    const res = await window.api.python.installMcdr(python.path);
    setInstallingMcdr(false);
    if (res.ok) {
      await refreshPython();
      toast(`MCDReforged ${res.data?.mcdr ?? ""} 已就绪`, "success");
    } else {
      toast(res.error ?? "安装失败", "error");
    }
  };
  const pickDir = async () => {
    const res = await window.api.app.pickDirectory("选择安装位置（会在其中创建服务器文件夹）");
    if (res.ok && res.data) setParentDir(res.data);
  };
  const canSubmit = name.trim() && parentDir && version && (!needsInstaller || build.trim()) && (!wantMcdr || mcdrOk) && !installing;
  const submit = async () => {
    setInstalling(true);
    const res = await window.api.servers.create({
      name: name.trim(),
      dir: parentDir,
      kind,
      mcVersion: version,
      build: needsInstaller ? build.trim() : void 0,
      memoryMin: memory.min,
      memoryMax: memory.max,
      port,
      motd,
      acceptEula: isProxy ? true : eula,
      mcdr: wantMcdr,
      pythonPath: wantMcdr ? python?.path : void 0
    });
    setInstalling(false);
    if (res.ok) {
      toast(`${res.data.name} 创建完成`, "success");
      await refresh();
      select(res.data.id);
      onClose();
    } else {
      toast(res.error ?? "创建失败", "error");
    }
  };
  const installPath = parentDir && name ? `${parentDir}\\${name.trim()}` : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: proxyGroup ? "代理端类型" : "服务端类型" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "kind-grid", children: kindList.map((k2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `kind ${kind === k2.kind ? "active" : ""}`,
          onClick: () => setKind(k2.kind),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: k2.icon, size: 17 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 4 }, children: kindLabel(k2.kind) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kd", children: k2.desc })
          ]
        },
        k2.kind
      )) }),
      needsInstaller && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { marginTop: 8 }, children: [
        kindLabel(kind),
        " 官方只提供安装器：CraftDesk 会下载官方安装器并运行它， 让它自己联网拉齐运行库（第一次要下一两百 MB，进度会在下面实时显示）。 装完没有可 -jar 的核心，用的是安装器生成的参数文件。"
      ] }),
      proxyGroup && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { marginTop: 8, lineHeight: 1.9 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { style: { color: "var(--text-dim)" }, children: "代理端不是服务端" }),
        "：它不加载世界、不给玩家算方块， 只负责「玩家连这里 → 转发到后端服务器」，用来把好几台服拼成一个入口。",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "它没有 EULA，也不用 server.properties —— 端口和后端写在它自己的",
        kind === "velocity" ? " velocity.toml" : " config.yml",
        " 里，装完 CraftDesk 会按你下面填的端口先生成一份（Velocity 用的是核心里自带的官方模板）。",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "装好之后可以在「跨服配置」里加后端、在「网络拓扑」里看整张图； CraftDesk 会检查每个后端有没有真的接上代理端。"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "基本信息" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: isProxy ? `${kindLabel(kind)} 版本` : "Minecraft 版本", children: loadingVersions ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hint", children: "正在获取版本列表…" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "select", value: version, onChange: (e) => pickVersion(e.target.value), children: [
        versions.map((v2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: v2.id, children: [
          v2.id,
          v2.latestBuild ? ` · ${kindLabel(kind)} ${v2.latestBuild}` : ""
        ] }, v2.id)),
        versions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "没有可用版本" })
      ] }) }),
      needsInstaller && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: `${kindLabel(kind)} 构建号`,
          hint: kind === "forge" ? "默认是官方推荐版" : "默认是最新稳定版",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "input",
              value: build,
              spellCheck: false,
              placeholder: kind === "forge" ? "例如 47.2.0" : "例如 21.1.209",
              onChange: (e) => setBuild(e.target.value)
            }
          )
        }
      ),
      version && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "hint",
          style: { marginBottom: 8, color: javaCheck(version).best ? void 0 : "var(--warn)" },
          children: [
            isProxy ? proxyJavaHintText(kind, version) : javaHintText(version),
            (() => {
              const c = javaCheck(version);
              if (c.best) return `　已找到 Java ${c.best}，会自动用它启动。`;
              return `　注意：没有找到 Java ${c.need} 及以上，这个服务端装好后起不来。`;
            })()
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "服务器名称", hint: "同时作为文件夹名", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          value: name,
          placeholder: "例如：生存服",
          onChange: (e) => setName(e.target.value)
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "安装位置", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "input",
            value: parentDir,
            readOnly: true,
            placeholder: "选择一个文件夹",
            style: { color: parentDir ? "var(--text)" : "var(--text-faint)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm", onClick: () => void pickDir(), children: "浏览" })
      ] }),
      installPath && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { marginBottom: 8 }, children: [
        "将安装到：",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: installPath })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: isProxy ? "初始配置（写进代理端自己的配置）" : "初始配置" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: isProxy ? "监听端口" : "服务器端口", hint: isProxy ? "玩家连这个端口" : void 0, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          type: "number",
          min: 1,
          max: 65535,
          value: port,
          onChange: (e) => setPort(Number(e.target.value))
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "服务器描述（MOTD）", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: motd, onChange: (e) => setMotd(e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "最小内存 / 最大内存", hint: "单位 MB", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "input",
            type: "number",
            step: 256,
            value: memory.min,
            onChange: (e) => setMemory((m2) => ({ ...m2, min: Number(e.target.value) }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "input",
            type: "number",
            step: 256,
            value: memory.max,
            onChange: (e) => setMemory((m2) => ({ ...m2, max: Number(e.target.value) }))
          }
        )
      ] }),
      isProxy ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { lineHeight: 1.8 }, children: "代理端不需要同意 EULA（那是 Mojang 对「服务端」的要求）， 所以这里不会有那一步；它也不会生成 world、logs 之类的东西。" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "自动同意 EULA", hint: "不勾选的话首次启动需要手动同意", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: eula, onChange: setEula }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "外置辅助端" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "用 MCDReforged 托管",
          hint: "MCDR 是跑在服务端外面的一层，用 Python 插件扩展功能（玩家管理、指令、定时任务等）",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: wantMcdr, onChange: setWantMcdr })
        }
      ),
      wantMcdr && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Python 解释器", hint: "MCDR 需要 Python 3.8 及以上", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "select",
              value: python?.path ?? "",
              onChange: (e) => setPythonPath(e.target.value),
              children: [
                pythonList.map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p2.path, children: [
                  "Python ",
                  p2.version,
                  p2.mcdr ? ` · MCDR ${p2.mcdr}` : " · 未装 MCDR",
                  p2.suitable ? "" : "（版本过低）"
                ] }, p2.path)),
                !pythonList.length && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "没有找到 Python" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn sm", onClick: () => void refreshPython(), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "refresh", size: 14 }),
            "重新检测"
          ] })
        ] }),
        !pythonList.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { marginBottom: 8, color: "var(--warn)" }, children: "没找到 Python。MCDReforged 是个 Python 程序，先去 python.org 装一个 3.8 以上的版本（安装时记得勾上 Add Python to PATH），再回来点「重新检测」。" }),
        python && !python.suitable && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { marginBottom: 8, color: "var(--warn)" }, children: [
          "这个 Python 是 ",
          python.version,
          "，MCDReforged 要求 3.8 及以上，换一个再装。"
        ] }),
        python && python.suitable && !python.mcdr && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { marginBottom: 8, color: "var(--warn)" }, children: [
          "这个 Python 里还没有 mcdreforged（pip 包）。",
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "btn sm",
              style: { marginLeft: 8 },
              disabled: installingMcdr,
              onClick: () => void installMcdrNow(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "download", size: 14 }),
                installingMcdr ? "正在安装…" : "用 pip 装上"
              ]
            }
          )
        ] }),
        mcdrOk && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { marginBottom: 8 }, children: [
          "核心会装进 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "server/" }),
          " 子目录，MCDR 的配置（config.yml）和插件目录留在服务器根目录， CraftDesk 会按类型自动选好 handler（",
          isProxy ? `${kind}_handler` : kind === "forge" || kind === "neoforge" ? "forge_handler" : kind === "paper" || kind === "purpur" ? "bukkit14_handler" : "vanilla_handler",
          "）。 内存写在 MCDR 的 config.yml 里，改完记得重新生成。"
        ] })
      ] })
    ] }),
    task && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: `${task.percent}%` } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { marginTop: 8 }, children: [
        task.message,
        task.total > 0 && ` · ${formatBytes(task.received)} / ${formatBytes(task.total)}`
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-foot", style: { padding: 0, borderTop: "none" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn", onClick: onBack, disabled: installing, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "chevron-left", size: 14 }),
        "返回"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn primary", disabled: !canSubmit, onClick: () => void submit(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "download", size: 15 }),
        installing ? needsInstaller ? "安装中（要等一会儿）…" : "正在下载安装…" : "下载并创建"
      ] })
    ] })
  ] });
}
const QUICK_COMMANDS = [
  { cmd: "list", label: "list", tip: "查看在线玩家" },
  { cmd: "tps", label: "tps", tip: "查看服务器 TPS" },
  { cmd: "save-all", label: "save-all", tip: "立即保存世界" },
  { cmd: "time set day", label: "白天", tip: "把时间设为白天" },
  { cmd: "weather clear", label: "晴天", tip: "清除天气" },
  { cmd: "reload", label: "reload", tip: "重载插件配置" }
];
function ConsoleView({ server }) {
  const logs = useStore((s) => s.logs[server.id]);
  const stats = useStore((s) => s.stats[server.id]);
  const toast = useStore((s) => s.toast);
  const pushLogs = useStore((s) => s.pushLogs);
  const topology = useStore((s) => s.topology);
  const [input, setInput] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("");
  const [autoScroll, setAutoScroll] = reactExports.useState(true);
  const [tick, setTick] = reactExports.useState(0);
  const [showErrorsOnly, setShowErrorsOnly] = reactExports.useState(false);
  const scrollRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const rt = server.runtime;
  const running = rt.status !== "stopped" && rt.status !== "crashed";
  reactExports.useEffect(() => {
    if (!running) return;
    const t2 = setInterval(() => setTick((v2) => v2 + 1), 1e3);
    return () => clearInterval(t2);
  }, [running]);
  const uptime = reactExports.useMemo(() => {
    if (!rt.startedAt) return 0;
    return Math.floor((Date.now() - rt.startedAt) / 1e3);
  }, [rt.startedAt, tick]);
  const visible = reactExports.useMemo(() => {
    const list = logs ?? [];
    const q2 = filter.trim().toLowerCase();
    return list.filter((l2) => {
      if (showErrorsOnly && l2.level !== "error" && l2.level !== "warn") return false;
      if (!q2) return true;
      return l2.text.toLowerCase().includes(q2) || l2.raw.toLowerCase().includes(q2);
    });
  }, [logs, filter, showErrorsOnly]);
  reactExports.useLayoutEffect(() => {
    const el2 = scrollRef.current;
    if (!el2 || !autoScroll) return;
    el2.scrollTop = el2.scrollHeight;
  }, [visible.length, autoScroll, server.id]);
  const onScroll = () => {
    const el2 = scrollRef.current;
    if (!el2) return;
    const atBottom = el2.scrollHeight - el2.scrollTop - el2.clientHeight < 40;
    setAutoScroll(atBottom);
  };
  const send = async (cmd) => {
    const text = (cmd ?? input).trim();
    if (!text) return;
    if (!running) {
      toast("服务器未运行，无法发送指令", "error");
      return;
    }
    const res = await window.api.server.command(server.id, text);
    if (!res.ok) toast(res.error ?? "发送失败", "error");
    if (!cmd) setInput("");
  };
  const startBackends = async () => {
    const proxy = topology?.proxies.find((p2) => p2.node.id === server.id);
    const stopped = (proxy?.backends ?? []).filter((b) => b.managed && !b.running).map((b) => b.id);
    if (!stopped.length) {
      toast("没有找到可启动的后端", "info");
      return;
    }
    for (const bid of stopped) {
      const res = await window.api.server.start(bid);
      if (!res.ok) toast(res.error ?? "启动失败", "error");
    }
    void useStore.getState().refresh();
  };
  const acceptEula = async () => {
    const res = await window.api.server.acceptEula(server.id);
    if (res.ok) {
      toast("已同意 EULA，现在可以启动了", "success");
      pushLogs(server.id, [
        {
          t: Date.now(),
          level: "system",
          text: "已写入 eula=true，可以重新启动服务器",
          raw: "eula accepted"
        }
      ]);
    } else {
      toast(res.error ?? "写入失败", "error");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "console", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "console-toolbar", children: [
      running ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-pill", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `dot ${rt.status}` }),
          statusLabel(rt.status)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-pill", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "clock", size: 13 }),
          "运行 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: formatDuration(uptime) })
        ] }),
        stats && stats.mem > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-pill", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "cpu", size: 13 }),
          "内存 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: formatBytes(stats.mem) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-pill", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "users", size: 13 }),
          "在线 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: rt.onlineCount }),
          "/",
          rt.maxPlayers
        ] }),
        rt.tps != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-pill", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "activity", size: 13 }),
          "TPS ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: rt.tps.toFixed(1) })
        ] }),
        rt.port != null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "stat-pill",
            title: "点击复制端口号",
            style: { cursor: "pointer" },
            onClick: () => {
              void navigator.clipboard.writeText(String(rt.port));
              toast(`已复制端口 ${rt.port}`, "success");
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "globe", size: 13 }),
              "端口 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: rt.port })
            ]
          }
        ),
        rt.pid != null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "stat-pill",
            title: "点击复制进程号",
            style: { cursor: "pointer" },
            onClick: () => {
              void navigator.clipboard.writeText(String(rt.pid));
              toast(`已复制 PID ${rt.pid}`, "success");
            },
            children: [
              "PID ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: rt.pid })
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--text-faint)" }, children: rt.status === "crashed" ? `上次异常退出（退出码 ${rt.exitCode ?? "未知"}）` : "服务器未运行" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toolbar-spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `icon-btn ${showErrorsOnly ? "active" : ""}`,
          title: "只看警告与错误",
          onClick: () => setShowErrorsOnly((v2) => !v2),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 15 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-search", style: { margin: 0, height: 28, width: 180 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "search", size: 13 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: filter,
            onChange: (e) => setFilter(e.target.value),
            placeholder: "筛选日志",
            spellCheck: false,
            style: { fontSize: 12.5 }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "icon-btn",
          title: "滚动到底部",
          style: { color: autoScroll ? "var(--accent)" : void 0 },
          onClick: () => {
            setAutoScroll(true);
            const el2 = scrollRef.current;
            if (el2) el2.scrollTop = el2.scrollHeight;
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "chevron-down", size: 16 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "icon-btn",
          title: "清空当前显示",
          onClick: () => {
            void window.api.server.clearLogs(server.id);
            useStore.setState((s) => ({ logs: { ...s.logs, [server.id]: [] } }));
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "trash", size: 15 })
        }
      )
    ] }),
    rt.issue === "eula" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "issue-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 16 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "issue-text", children: "服务器需要你同意 Minecraft EULA 才能启动。同意后会在服务端目录写入 eula.txt。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm primary", onClick: () => void acceptEula(), children: "同意并写入" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "btn sm ghost",
          onClick: () => void window.api.app.openExternal("https://aka.ms/MinecraftEULA"),
          children: "查看条款"
        }
      )
    ] }),
    rt.issue === "port-in-use" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "issue-bar error", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 16 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "issue-text", children: "端口被占用，请到「服务器属性」里换一个 server-port。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "btn sm",
          onClick: () => useStore.getState().setView("properties"),
          children: "去修改"
        }
      )
    ] }),
    rt.issue === "java-missing" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "issue-bar error", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 16 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "issue-text", children: rt.issueDetail || "没有可用的 Java 运行环境。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm", onClick: () => useStore.getState().setView("settings"), children: "去设置" })
    ] }),
    rt.issue === "mcdr-running" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "issue-bar error", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 16 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "issue-text", children: rt.issueDetail }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm", onClick: () => void window.api.fs.reveal(server.dir, "logs"), children: "打开日志目录" })
    ] }),
    rt.issue === "backend-down" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "issue-bar error", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 16 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "issue-text", children: rt.issueDetail || "后端没有在运行。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm primary", onClick: () => void startBackends(), children: "启动后端" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm", onClick: () => useStore.getState().setView("topology"), children: "看拓扑" })
    ] }),
    (rt.issue === "crash" || rt.status === "crashed" && !rt.issue) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "issue-bar error", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 16 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "issue-text", children: rt.issueDetail || (rt.exitCode != null ? `服务器异常退出，退出码 ${rt.exitCode}` : "服务器异常退出") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm", onClick: () => void window.api.fs.reveal(server.dir, ""), children: "打开目录" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "console-scroll", ref: scrollRef, onScroll, children: [
      visible.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "console-empty", children: running ? "等待服务器输出…" : "还没有日志。启动服务器后这里会显示实时输出。" }),
      visible.map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(LogRow, { line, highlight: filter.trim() }, `${line.t}-${i}`))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quick-cmds", children: QUICK_COMMANDS.map((q2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: "quick-cmd",
        title: q2.tip,
        disabled: !running,
        style: !running ? { opacity: 0.4, cursor: "not-allowed" } : void 0,
        onClick: () => void send(q2.cmd),
        children: q2.label
      },
      q2.cmd
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "composer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `composer-box ${!running ? "disabled" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          ref: inputRef,
          className: "composer-input",
          placeholder: running ? "输入服务器指令，回车发送…" : "服务器未运行时无法发送指令",
          value: input,
          disabled: !running,
          rows: 1,
          spellCheck: false,
          onChange: (e) => setInput(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              void send();
            }
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "composer-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "composer-hint", children: running ? "提示：list 看在线玩家，tps 看性能，save-all 立即存档" : "先点右上角的「启动」按钮把服务器开起来" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "send-btn",
            disabled: !running || !input.trim(),
            onClick: () => void send(),
            title: "发送指令（回车）",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "send", size: 15, strokeWidth: 2.2 })
          }
        )
      ] })
    ] }) })
  ] });
}
function LogRow({ line, highlight }) {
  const text = line.player ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "log-player", children: [
      "<",
      line.player,
      ">"
    ] }),
    " ",
    line.text
  ] }) : line.text;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `log-line log-${line.level}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "log-time", children: formatClock(line.t) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "log-text", children: highlight ? /* @__PURE__ */ jsxRuntimeExports.jsx(Highlighted, { text: line.text, needle: highlight }) : text })
  ] });
}
function Highlighted({ text, needle }) {
  const lower = text.toLowerCase();
  const n2 = needle.toLowerCase();
  const parts = [];
  let i = 0;
  let key = 0;
  while (i < text.length) {
    const at = lower.indexOf(n2, i);
    if (at < 0 || !n2) {
      parts.push(/* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: text.slice(i) }, key++));
      break;
    }
    if (at > i) parts.push(/* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: text.slice(i, at) }, key++));
    parts.push(
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "log-hl", children: text.slice(at, at + n2.length) }, key++)
    );
    i = at + n2.length;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: parts });
}
function networkCounts(topo, live) {
  if (!topo) return { online: 0, max: 0 };
  const resolve = (n2) => {
    if (n2.managed && live) {
      const l2 = live(n2.id);
      if (l2) return l2;
    }
    return { running: n2.running, online: n2.onlinePlayers, max: n2.maxPlayers };
  };
  let online = 0;
  let max = 0;
  for (const p2 of topo.proxies) {
    const proxy = resolve(p2.node);
    if (proxy.running) {
      online += proxy.online;
      max = Math.max(max, proxy.max);
      continue;
    }
    for (const b of p2.backends) {
      const back = resolve(b);
      if (back.running) online += back.online;
    }
  }
  for (const n2 of topo.standalone) {
    const s = resolve(n2);
    if (!s.running) continue;
    online += s.online;
    max = Math.max(max, s.max);
  }
  return { online, max };
}
function DashboardView({
  onAdd,
  onOpenServer
}) {
  const servers = useStore((s) => s.servers);
  const stats = useStore((s) => s.stats);
  const topology = useStore((s) => s.topology);
  const activeId = useStore((s) => s.activeId);
  const toast = useStore((s) => s.toast);
  const refresh = useStore((s) => s.refresh);
  const [info, setInfo] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const [, setTick] = reactExports.useState(0);
  reactExports.useEffect(() => {
    void window.api.app.info().then((r2) => r2.ok && info === null && setInfo({ cpus: r2.data.cpus, totalMem: r2.data.totalMem }));
    const t2 = setInterval(() => setTick((v2) => v2 + 1), 1e3);
    return () => clearInterval(t2);
  }, []);
  const proxies = servers.filter((s) => isProxyKind(s.kind));
  const listable = servers.filter((s) => !isProxyKind(s.kind));
  const running = servers.filter((s) => s.runtime.status !== "stopped" && s.runtime.status !== "crashed");
  const crashed = servers.filter((s) => s.runtime.status === "crashed");
  const { online: onlineTotal, max: onlineMax } = networkCounts(topology, (id2) => {
    const s = servers.find((x2) => x2.id === id2);
    if (!s) return null;
    return {
      running: s.runtime.status !== "stopped" && s.runtime.status !== "crashed" || s.runtime.externalRunning,
      online: s.runtime.onlineCount,
      max: s.runtime.maxPlayers
    };
  });
  const memTotal = Object.values(stats).reduce((n2, s) => n2 + (s.mem || 0), 0);
  const uptimeTotal = servers.reduce((n2, s) => {
    const live = s.runtime.startedAt ? Math.floor((Date.now() - s.runtime.startedAt) / 1e3) : 0;
    return n2 + (s.totalUptime || 0) + live;
  }, 0);
  const sharedIds = reactExports.useMemo(() => {
    const ids = /* @__PURE__ */ new Set();
    for (const p2 of topology?.proxies ?? []) {
      for (const b of p2.backends) if (b.sharedPort && b.managed) ids.add(b.id);
    }
    for (const n2 of topology?.standalone ?? []) {
      if (n2.sharedPort && n2.managed) ids.add(n2.id);
    }
    return ids;
  }, [topology]);
  const startAll = async () => {
    setBusy(true);
    const stopped = servers.filter((s) => s.runtime.status === "stopped");
    for (const s of stopped) {
      const res = await window.api.server.start(s.id);
      if (!res.ok) toast(`${s.name}：${res.error}`, "error");
    }
    setBusy(false);
    void refresh();
  };
  const stopAll = async () => {
    setBusy(true);
    for (const s of running) await window.api.server.stop(s.id);
    setBusy(false);
    void refresh();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dash", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "quick-box", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "快捷操作" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quick-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "qb", disabled: busy || running.length === servers.length, onClick: () => void startAll(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "play", size: 13 }),
          "全部启动"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "qb", disabled: busy || running.length === 0, onClick: () => void stopAll(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "stop", size: 12 }),
          "全部停止"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "qb",
            disabled: busy,
            onClick: () => {
              void refresh();
              toast("已刷新服务器状态", "success");
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "refresh", size: 14 }),
              "刷新所有服务器"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "qb primary", onClick: onAdd, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "plus", size: 15 }),
          "添加新服务器"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quick-note", children: [
        listable.length,
        " 个服务器 · 运行中 ",
        running.length,
        " · 在线",
        " ",
        onlineMax > 0 ? `${onlineTotal} / ${onlineMax}` : onlineTotal,
        " · 内存",
        " ",
        memTotal > 0 ? formatBytes(memTotal) : "—",
        " · 累计运行 ",
        formatDuration(uptimeTotal),
        info && ` · 本机 ${info.cpus} 核 / ${formatBytes(info.totalMem)}`
      ] }),
      proxies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quick-note", style: { marginTop: 6 }, children: [
        "代理端（",
        proxies.map((p2) => p2.name).join("、"),
        "）不列在这里 —— 它是整张网络的入口， 在左侧列表里作为那一组的根、在",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link-btn", onClick: () => useStore.getState().setView("topology"), children: "网络拓扑" }),
        "里看。"
      ] })
    ] }),
    crashed.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "issue-bar error", style: { margin: "0 0 12px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 16 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "issue-text", children: [
        "有 ",
        crashed.length,
        " 个服务器上次异常退出，点开看看最后的日志。"
      ] })
    ] }),
    listable.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", style: { textAlign: "center", padding: 40, color: "var(--text-muted)" }, children: "还没有添加任何服务器。点「添加新服务器」导入已有的服务端目录，或者直接下载一个新的。" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "srv-list", children: listable.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ServerLine,
      {
        server: s,
        mem: stats[s.id]?.mem ?? 0,
        active: s.id === activeId,
        sharedPort: sharedIds.has(s.id),
        onOpen: (view) => onOpenServer(s.id, view)
      },
      s.id
    )) })
  ] });
}
function stateClass(status, external) {
  if (external) return "external";
  if (status === "running") return "running";
  if (status === "crashed") return "crashed";
  if (status === "starting" || status === "stopping") return "busy";
  return "";
}
function ServerLine({
  server,
  mem,
  active,
  sharedPort,
  onOpen
}) {
  const toast = useStore((s) => s.toast);
  const refresh = useStore((s) => s.refresh);
  const rt = server.runtime;
  const running = rt.status !== "stopped" && rt.status !== "crashed";
  const uptime = rt.startedAt ? Math.floor((Date.now() - rt.startedAt) / 1e3) : 0;
  const toggle = async () => {
    const res = running ? await window.api.server.stop(server.id) : await window.api.server.start(server.id);
    if (!res.ok) toast(res.error ?? "操作失败", "error");
    else void refresh();
  };
  const sub = rt.externalRunning ? [
    rt.port != null ? `:${rt.port}` : null,
    `${rt.onlineCount}/${rt.maxPlayers} 人在线`,
    "进程不是 CraftDesk 启的"
  ] : running ? [
    rt.port != null ? `:${rt.port}` : null,
    rt.onlineCount > 0 ? `${rt.onlineCount}/${rt.maxPlayers} 人在线` : "无人在线",
    rt.pid != null ? `PID ${rt.pid}` : null,
    mem > 0 ? formatBytes(mem) : null,
    `已运行 ${formatDuration(uptime)}`
  ] : [
    server.mcVersion,
    kindLabel(server.kind),
    server.lastStartedAt ? `上次启动 ${relativeTime(server.lastStartedAt)}` : "从未启动过"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `srv-row ${active ? "active" : ""}`,
      onClick: () => onOpen("console"),
      title: server.dir,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ServerAvatar, { server, size: 44, className: "srv-avatar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "srv-main", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "srv-name", children: [
            server.name,
            isProxyKind(server.kind) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag cyan", children: "入口" }),
            sharedPort && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag red", title: "有另一个服务器配了同一个端口，两者不能同时启动", children: "同端口" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "srv-sub", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `dot ${rt.status}` }),
            sub.filter(Boolean).join(" · ")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `srv-state ${stateClass(rt.status, rt.externalRunning)}`, children: rt.externalRunning ? "外部启动" : statusLabel(rt.status) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "srv-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: running ? "stop" : "play",
              disabled: rt.status === "starting" || rt.status === "stopping",
              title: rt.externalRunning ? "端口上已经有服务端在跑（不是 CraftDesk 启的），先关掉它再从这里启动" : running ? "停止服务器" : "启动服务器",
              onClick: (e) => {
                e.stopPropagation();
                void toggle();
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: running ? "stop" : "play", size: running ? 13 : 14 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              title: "启动配置：Java、内存、核心",
              onClick: (e) => {
                e.stopPropagation();
                onOpen("properties");
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "settings", size: 16 })
            }
          )
        ] })
      ]
    }
  );
}
function FileEditor({
  server,
  path,
  initial,
  truncated,
  onClose,
  onSaved
}) {
  const toast = useStore((s) => s.toast);
  const [content, setContent] = reactExports.useState(initial);
  const [dirty, setDirty] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const save = async () => {
    setSaving(true);
    const res = await window.api.fs.write(server.dir, path, content);
    setSaving(false);
    if (res.ok) {
      toast("已保存", "success");
      setDirty(false);
      onSaved?.();
    } else {
      toast(res.error ?? "保存失败", "error");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "sliders", size: 16, style: { color: "#60a5fa" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "etitle", title: path, children: path }),
      truncated && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag orange", children: "文件过大，只显示前 4 MB" }),
      dirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: "未保存" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toolbar-spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm", onClick: onClose, children: "关闭" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn primary sm", disabled: !dirty || saving, onClick: () => void save(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "save", size: 13 }),
        saving ? "保存中…" : "保存"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        value: content,
        spellCheck: false,
        onChange: (e) => {
          setContent(e.target.value);
          setDirty(true);
        },
        onKeyDown: (e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === "s") {
            e.preventDefault();
            void save();
          }
        }
      }
    )
  ] });
}
const TOP_FIELDS = {
  bind: { label: "监听地址与端口", hint: "形如 0.0.0.0:25566" },
  motd: { label: "服务器描述（MOTD）", hint: "支持 MiniMessage 格式" },
  "show-max-players": { label: "显示的最大人数", kind: "number", hint: "仅用于列表显示" },
  "online-mode": { label: "正版验证", kind: "bool" },
  "force-key-authentication": { label: "强制公钥验证", kind: "bool" },
  "prevent-client-proxy-connections": { label: "阻止客户端代理连接", kind: "bool" },
  "player-info-forwarding-mode": {
    label: "玩家信息转发模式",
    kind: "enum",
    hint: "用 FabricProxy-Lite 必须选 modern",
    options: [
      { value: "none", label: "none · 不转发" },
      { value: "legacy", label: "legacy · 旧版（1.12 及以下）" },
      { value: "bungeeguard", label: "bungeeguard · BungeeGuard 插件" },
      { value: "modern", label: "modern · 原生转发（1.13+）" }
    ]
  },
  "forwarding-secret-file": { label: "转发密钥文件", hint: "默认 forwarding.secret" },
  "announce-forge": { label: "向客户端宣告 Forge", kind: "bool" },
  "kick-existing-players": { label: "顶掉重复登录", kind: "bool" },
  "ping-passthrough": {
    label: "Ping 透传",
    kind: "enum",
    options: [
      { value: "disabled", label: "disabled · 不透传" },
      { value: "mods", label: "mods · 只透传模组列表" },
      { value: "description", label: "description · 透传描述" },
      { value: "all", label: "all · 全部透传" }
    ]
  },
  "enable-player-address-logging": { label: "记录玩家 IP", kind: "bool" },
  "sample-players-in-ping": { label: "Ping 时显示在线玩家", kind: "bool" },
  "enable-velocity-plugin-messaging": { label: "启用插件消息通道", kind: "bool" },
  bungeecord: { label: "兼容 BungeeCord 插件消息", kind: "bool" },
  "config-version": { label: "配置版本", hint: "不要改" }
};
const SECTION_LABELS = {
  "packet-limiter": "数据包限流",
  "forced-hosts": "强制主机名",
  "advanced": "高级网络选项",
  query: "Query 协议"
};
function VelocityView({ server }) {
  const toast = useStore((s) => s.toast);
  const select = useStore((s) => s.select);
  const setView = useStore((s) => s.setView);
  const [file, setFile] = reactExports.useState(null);
  const [checks, setChecks] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [checking, setChecking] = reactExports.useState(false);
  const [tab, setTab] = reactExports.useState("backends");
  const [draft, setDraft] = reactExports.useState({});
  const [saving, setSaving] = reactExports.useState(false);
  const [rawOpen, setRawOpen] = reactExports.useState(false);
  const reload = reactExports.useCallback(async () => {
    const res = await window.api.velocity.read(server.id);
    setLoading(false);
    if (!res.ok) {
      toast(res.error ?? "读取 velocity.toml 失败", "error");
      return;
    }
    setFile(res.data);
    setDraft({});
  }, [server.id, toast]);
  const check = reactExports.useCallback(async () => {
    setChecking(true);
    const res = await window.api.velocity.checkBackends(server.id);
    setChecking(false);
    if (res.ok) setChecks(res.data);
    else toast(res.error ?? "后端检查失败", "error");
  }, [server.id, toast]);
  reactExports.useEffect(() => {
    setLoading(true);
    void reload();
    void check();
  }, [reload, check]);
  const fields = reactExports.useMemo(() => file?.fields ?? [], [file]);
  const topFields = reactExports.useMemo(() => fields.filter((f2) => f2.section === ""), [fields]);
  const valueOf = (key) => draft[key] ?? topFields.find((f2) => f2.key === key)?.value ?? "";
  const patch = (key, value) => setDraft((d) => ({ ...d, [key]: value }));
  const saveTop = async () => {
    const updates = Object.entries(draft).map(([key, value]) => {
      const field = topFields.find((f2) => f2.key === key);
      return field ? { section: "", key, value, type: field.type } : null;
    }).filter((u2) => Boolean(u2));
    if (!updates.length) return;
    setSaving(true);
    const res = await window.api.velocity.write(server.id, updates);
    setSaving(false);
    if (res.ok) {
      toast("已保存，重启代理端后生效", "success");
      await reload();
    } else {
      toast(res.error ?? "保存失败", "error");
    }
  };
  const dirty = Object.keys(draft).length > 0;
  const summary = reactExports.useMemo(() => {
    let error = 0;
    let warn = 0;
    let ok2 = 0;
    let unknown = 0;
    for (const c of checks) {
      if (c.issues.some((i) => i.level === "error")) error++;
      else if (c.issues.some((i) => i.level === "warn")) warn++;
      else if (c.managedId) ok2++;
      else unknown++;
    }
    return { error, warn, ok: ok2, unknown, total: checks.length };
  }, [checks]);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "center-state", children: "正在读取 velocity.toml…" });
  if (!file?.exists) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "center-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 28 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "没有找到 velocity.toml" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { maxWidth: 420 }, children: "这个文件在代理端第一次启动后生成。确认服务器目录选对了、并且至少启动过一次。" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "console-toolbar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "seg", style: { margin: 0, width: 330 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: tab === "backends" ? "active" : "", onClick: () => setTab("backends"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "server", size: 13 }),
          "后端服务器",
          summary.error > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "seg-badge bad", children: summary.error })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: tab === "basic" ? "active" : "", onClick: () => setTab("basic"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "sliders", size: 13 }),
          "基础设置"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: tab === "advanced" ? "active" : "", onClick: () => setTab("advanced"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "settings", size: 13 }),
          "高级"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toolbar-spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-btn", title: "用文本编辑器打开原始文件", onClick: () => setRawOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "edit", size: 15 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-btn", title: "重新读取", onClick: () => void reload(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "refresh", size: 15 }) }),
      tab === "basic" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn primary sm", disabled: !dirty || saving, onClick: () => void saveTop(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "save", size: 13 }),
        saving ? "保存中…" : "保存"
      ] }),
      tab === "backends" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn sm", disabled: checking, onClick: () => void check(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "activity", size: 13 }),
        checking ? "检查中…" : "重新检查"
      ] })
    ] }),
    tab === "basic" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      BasicTab,
      {
        topFields,
        secret: file.secret,
        valueOf,
        patch,
        dirty
      }
    ),
    tab === "backends" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      BackendsTab,
      {
        server,
        file,
        checks,
        summary,
        onSaved: () => {
          void reload();
          void check();
        },
        onOpenBackend: (id2) => {
          select(id2);
          setView("console");
        }
      }
    ),
    tab === "advanced" && /* @__PURE__ */ jsxRuntimeExports.jsx(AdvancedTab, { fields, onSaved: () => void reload(), server }),
    rawOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      FileEditor,
      {
        server,
        path: "velocity.toml",
        initial: file.raw,
        onClose: () => setRawOpen(false),
        onSaved: () => {
          void reload();
          void check();
        }
      }
    )
  ] });
}
function BasicTab({
  topFields,
  secret,
  valueOf,
  patch,
  dirty
}) {
  const toast = useStore((s) => s.toast);
  const known = topFields.filter((f2) => TOP_FIELDS[f2.key]);
  const unknown = topFields.filter((f2) => !TOP_FIELDS[f2.key]);
  const renderField = (f2) => {
    const meta = TOP_FIELDS[f2.key] ?? { label: f2.key };
    const value = valueOf(f2.key);
    const kind = meta.kind ?? (f2.type === "boolean" ? "bool" : f2.type === "number" ? "number" : "text");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: meta.label, hint: f2.key, children: kind === "bool" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: value === "true", onChange: (v2) => patch(f2.key, String(v2)) }) : kind === "enum" && meta.options ? /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "select", value, onChange: (e) => patch(f2.key, e.target.value), children: [
      !meta.options.some((o) => o.value === value) && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value, children: value }),
      meta.options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value))
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        className: "input",
        type: kind === "number" ? "number" : "text",
        value,
        spellCheck: false,
        onChange: (e) => patch(f2.key, e.target.value)
      }
    ) }, f2.key);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dash", style: { padding: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "监听与展示" }),
      known.filter((f2) => ["bind", "motd", "show-max-players", "config-version"].includes(f2.key)).map(renderField)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "玩家验证与转发" }),
      known.filter(
        (f2) => [
          "online-mode",
          "force-key-authentication",
          "prevent-client-proxy-connections",
          "player-info-forwarding-mode",
          "forwarding-secret-file",
          "enable-player-address-logging"
        ].includes(f2.key)
      ).map(renderField),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "当前转发密钥", hint: secret ? "内容来自 forwarding.secret" : "读取不到", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "input",
            value: secret ?? "（未读取到）",
            readOnly: true,
            style: { fontFamily: "var(--mono)", color: secret ? "var(--text)" : "var(--text-faint)" }
          }
        ),
        secret && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn sm",
            onClick: () => {
              void navigator.clipboard.writeText(secret);
              toast("密钥已复制", "success");
            },
            children: "复制"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { paddingLeft: 224 }, children: "这个密钥必须和后端 FabricProxy-Lite 配置里的 secret 完全一致，否则玩家会被拒绝登录。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "其它" }),
      known.filter(
        (f2) => [
          "announce-forge",
          "ping-passthrough",
          "kick-existing-players",
          "sample-players-in-ping",
          "enable-velocity-plugin-messaging",
          "bungeecord"
        ].includes(f2.key)
      ).map(renderField)
    ] }),
    unknown.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "其它选项" }),
      unknown.map(renderField)
    ] }),
    dirty && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { paddingBottom: 20 }, children: "有未保存的修改。改完需要重启代理端才生效。" })
  ] }) });
}
function BackendsTab({
  server,
  file,
  checks,
  summary,
  onSaved,
  onOpenBackend
}) {
  const toast = useStore((s) => s.toast);
  const [rows, setRows] = reactExports.useState(() => file.servers.map((s) => ({ ...s })));
  const [tryList, setTryList] = reactExports.useState(file.tryList);
  const [saving, setSaving] = reactExports.useState(false);
  const [adding, setAdding] = reactExports.useState(false);
  const [newName, setNewName] = reactExports.useState("");
  const [newAddr, setNewAddr] = reactExports.useState("127.0.0.1:25565");
  const [removing, setRemoving] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setRows(file.servers.map((s) => ({ ...s })));
    setTryList(file.tryList);
  }, [file]);
  const checkByName = reactExports.useMemo(() => {
    const m2 = /* @__PURE__ */ new Map();
    for (const c of checks) m2.set(c.name, c);
    return m2;
  }, [checks]);
  const dirty = reactExports.useMemo(() => {
    const a = JSON.stringify(rows.map((r2) => [r2.name, r2.address]));
    const b = JSON.stringify(file.servers.map((r2) => [r2.name, r2.address]));
    return a !== b || JSON.stringify(tryList) !== JSON.stringify(file.tryList);
  }, [rows, file, tryList]);
  const save = async () => {
    for (const r2 of rows) {
      if (!r2.name.trim()) {
        toast("服务器名称不能为空", "error");
        return;
      }
      if (/[[\]]/.test(r2.name)) {
        toast(`名称 "${r2.name}" 含有方括号，Velocity 会解析出错，请换一个`, "error");
        return;
      }
      if (!/:\d+$/.test(r2.address.trim())) {
        toast(`"${r2.name}" 的地址要写成 ip:端口 的形式`, "error");
        return;
      }
    }
    setSaving(true);
    const res = await window.api.velocity.writeServers(
      server.id,
      rows.map((r2) => ({ name: r2.name.trim(), address: r2.address.trim() })),
      tryList.filter((t2) => rows.some((r2) => r2.name === t2))
    );
    setSaving(false);
    if (res.ok) {
      toast("已保存，重启代理端后生效", "success");
      onSaved();
    } else {
      toast(res.error ?? "保存失败", "error");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dash", style: { padding: "14px 18px 24px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-cards", style: { marginBottom: 14 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { value: String(summary.total), label: "后端服务器" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { value: String(summary.ok), label: "转发配置正常", tone: summary.ok > 0 ? "ok" : void 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { value: String(summary.error), label: "有错误", tone: summary.error > 0 ? "bad" : void 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { value: String(summary.warn), label: "有警告", tone: summary.warn > 0 ? "warn" : void 0 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { marginBottom: 14, lineHeight: 1.9 }, children: [
      "检查一个后端是否真的接上了代理端，要看两件事：",
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: " ①" }),
      " 它有没有写在下面这份 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "[servers]" }),
      " 列表里；",
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: " ②" }),
      " 它有没有装 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "FabricProxy" }),
      " 或 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "FabricProxy-Lite" }),
      "， 以及那个模组的 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "secret" }),
      " 是否和代理端的转发密钥一致、转发模式是否为 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "modern" }),
      "。 只做第 ① 步的话，玩家进服会拿不到真实 IP，UUID 也会错乱。"
    ] }),
    summary.unknown > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "issue-bar", style: { margin: "0 0 14px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 16 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "issue-text", children: [
        "有 ",
        summary.unknown,
        " 个后端没有导入 CraftDesk，无法检查它们有没有装转发模组。 把这些服务端也添加进来就能自动核对。"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-actions", style: { marginBottom: 12 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn sm", onClick: () => setAdding(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "plus", size: 14 }),
        "添加后端"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn primary sm", disabled: !dirty || saving, onClick: () => void save(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "save", size: 13 }),
        saving ? "保存中…" : "保存 [servers]"
      ] }),
      dirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hint", style: { alignSelf: "center" }, children: "有未保存的修改" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gap: 8 }, children: [
      rows.map((row, idx) => {
        const c = checkByName.get(row.name);
        const level = c?.issues.some((i) => i.level === "error") ? "error" : c?.issues.some((i) => i.level === "warn") ? "warn" : c?.managedId ? "ok" : "unknown";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `backend-card ${level}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "backend-head", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `dot ${level === "ok" ? "running" : level === "error" ? "crashed" : "stopped"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input backend-name",
                value: row.name,
                spellCheck: false,
                onChange: (e) => setRows((rs) => rs.map((r2, i) => i === idx ? { ...r2, name: e.target.value } : r2))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input backend-addr",
                value: row.address,
                spellCheck: false,
                onChange: (e) => setRows((rs) => rs.map((r2, i) => i === idx ? { ...r2, address: e.target.value } : r2))
              }
            ),
            tryList.includes(row.name) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag green", title: "玩家登录时优先尝试这个后端", children: [
              "try #",
              tryList.indexOf(row.name) + 1
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "btn sm ghost",
                title: "加入 try 列表",
                onClick: () => setTryList((t2) => [...t2, row.name]),
                children: "加入 try"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "icon-btn",
                style: { width: 26, height: 26 },
                title: "移除",
                onClick: () => setRemoving(row.name),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "trash", size: 13 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "backend-body", children: [
            c?.managedName ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag blue", title: "按端口在 CraftDesk 里匹配到的服务器", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "server", size: 11 }),
              c.managedName,
              c.managedRunning ? " · 运行中" : " · 已停止"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: "CraftDesk 未托管此端口" }),
            c?.proxyMod ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `tag ${c.secretOk === false ? "red" : "green"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "shield", size: 11 }),
              c.proxyMod,
              c.secretOk === true ? " · 密钥一致" : c.secretOk === false ? " · 密钥不符" : ""
            ] }) : c?.managedId ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag red", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 11 }),
              "没有装转发模组"
            ] }) : null,
            c?.backendOnlineMode != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag", children: [
              "后端 online-mode = ",
              String(c.backendOnlineMode)
            ] }),
            c?.hackOnlineMode != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag", children: [
              "hackOnlineMode = ",
              String(c.hackOnlineMode)
            ] }),
            c?.managedId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                className: "btn sm ghost",
                onClick: () => onOpenBackend(c.managedId),
                title: "切换到该服务器的控制台",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "terminal", size: 13 }),
                  "打开"
                ]
              }
            ),
            c?.managedDir && c.proxyConfigRel && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "btn sm ghost",
                title: c.proxyConfigPath ?? "",
                onClick: () => void window.api.fs.reveal(c.managedDir, c.proxyConfigRel),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "external", size: 13 })
              }
            )
          ] }),
          c?.issues.map((issue, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `backend-issue ${issue.level}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: issue.level === "error" ? "alert" : "activity", size: 13 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: issue.text })
          ] }, i))
        ] }, `${row.name}-${idx}`);
      }),
      rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", style: { padding: 30, textAlign: "center", color: "var(--text-muted)" }, children: "[servers] 里还没有任何后端，点「添加后端」加一个。" })
    ] }),
    tryList.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", style: { marginTop: 22, maxWidth: 640 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "尝试顺序（try）" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { marginBottom: 10 }, children: "玩家登录或从某个后端被踢出时，代理端按这个顺序找可用的后端。" }),
      tryList.map((t2, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { padding: "6px 10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: i + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row-main", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row-title", children: t2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn sm ghost icon-only",
              disabled: i === 0,
              title: "上移",
              onClick: () => setTryList((list) => {
                const next = [...list];
                [next[i - 1], next[i]] = [next[i], next[i - 1]];
                return next;
              }),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "chevron-up", size: 13 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn sm ghost icon-only",
              disabled: i === tryList.length - 1,
              title: "下移",
              onClick: () => setTryList((list) => {
                const next = [...list];
                [next[i + 1], next[i]] = [next[i], next[i + 1]];
                return next;
              }),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "chevron-down", size: 13 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn sm ghost icon-only",
              title: "移出顺序",
              onClick: () => setTryList((list) => list.filter((x2) => x2 !== t2)),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "x", size: 13 })
            }
          )
        ] })
      ] }, t2))
    ] }),
    adding && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Confirm,
      {
        title: "添加后端服务器",
        confirmText: "添加",
        message: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gap: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "名称", hint: "写进 [servers] 的键名，不能用方括号", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "input",
              autoFocus: true,
              value: newName,
              placeholder: "survival",
              onChange: (e) => setNewName(e.target.value)
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "地址", hint: "ip:端口", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "input",
              value: newAddr,
              onChange: (e) => setNewAddr(e.target.value)
            }
          ) })
        ] }),
        onCancel: () => setAdding(false),
        onConfirm: () => {
          const name = newName.trim();
          if (!name) {
            toast("请填写名称", "error");
            return;
          }
          if (rows.some((r2) => r2.name === name)) {
            toast(`名称 "${name}" 已存在`, "error");
            return;
          }
          setRows((rs) => [...rs, { name, address: newAddr.trim(), host: "", port: 0 }]);
          setAdding(false);
          setNewName("");
        }
      }
    ),
    removing && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Confirm,
      {
        title: "移除后端",
        danger: true,
        confirmText: "移除",
        message: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "把 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: removing }),
          " 从 [servers] 里删掉？",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "这不会动到那台服务器本身，只是代理端不再能转到它。"
        ] }),
        onCancel: () => setRemoving(null),
        onConfirm: () => {
          setRows((rs) => rs.filter((r2) => r2.name !== removing));
          setTryList((t2) => t2.filter((x2) => x2 !== removing));
          setRemoving(null);
        }
      }
    )
  ] });
}
function StatCard({
  value,
  label,
  tone
}) {
  const color = tone === "ok" ? "var(--accent)" : tone === "warn" ? "var(--warn)" : tone === "bad" ? "var(--danger)" : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", style: { padding: "10px 14px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sv", style: { fontSize: 19, color }, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sl", children: label })
  ] });
}
function AdvancedTab({
  fields,
  server,
  onSaved
}) {
  const toast = useStore((s) => s.toast);
  const [draft, setDraft] = reactExports.useState({});
  const [saving, setSaving] = reactExports.useState(false);
  const sections = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const f2 of fields) {
      if (!f2.section) continue;
      const list = map.get(f2.section) ?? [];
      list.push(f2);
      map.set(f2.section, list);
    }
    return [...map.entries()];
  }, [fields]);
  const keyOf = (f2) => `${f2.section}\0${f2.key}`;
  const save = async () => {
    const updates = Object.entries(draft).map(([k2, value]) => {
      const [section, key] = k2.split("\0");
      const field = fields.find((f2) => f2.section === section && f2.key === key);
      return field ? { section, key, value, type: field.type } : null;
    }).filter((u2) => Boolean(u2));
    if (!updates.length) return;
    setSaving(true);
    const res = await window.api.velocity.write(server.id, updates);
    setSaving(false);
    if (res.ok) {
      toast("已保存，重启代理端后生效", "success");
      setDraft({});
      onSaved();
    } else {
      toast(res.error ?? "保存失败", "error");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dash", style: { padding: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form", children: [
    sections.map(([section, list]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: SECTION_LABELS[section] ?? section }),
      list.map((f2) => {
        const key = keyOf(f2);
        const value = draft[key] ?? f2.value;
        const isBool = f2.type === "boolean";
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Field,
          {
            label: f2.key,
            hint: f2.comment ? f2.comment.split("\n")[0].slice(0, 42) : void 0,
            children: isBool ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: value === "true",
                onChange: (v2) => setDraft((d) => ({ ...d, [key]: String(v2) }))
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input",
                value,
                spellCheck: false,
                onChange: (e) => setDraft((d) => ({ ...d, [key]: e.target.value }))
              }
            )
          },
          key
        );
      })
    ] }, section)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 8, paddingBottom: 24 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: "btn primary",
        disabled: !Object.keys(draft).length || saving,
        onClick: () => void save(),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "save", size: 14 }),
          saving ? "保存中…" : "保存高级设置"
        ]
      }
    ) })
  ] }) });
}
const PROPERTY_LABELS = {
  motd: "服务器描述（MOTD）",
  "server-port": "服务器端口",
  "server-ip": "绑定 IP",
  "max-players": "最大玩家数",
  "online-mode": "正版验证",
  difficulty: "游戏难度",
  gamemode: "默认游戏模式",
  "force-gamemode": "强制游戏模式",
  "level-name": "世界名称",
  "level-seed": "世界种子",
  "level-type": "世界类型",
  "generator-settings": "自定义生成器设置",
  pvp: "允许玩家互相伤害",
  "white-list": "开启白名单",
  "enforce-whitelist": "强制白名单",
  "spawn-protection": "出生点保护半径",
  "view-distance": "视距（区块）",
  "simulation-distance": "模拟距离（区块）",
  "player-idle-timeout": "挂机踢出（分钟）",
  "allow-flight": "允许飞行",
  "allow-nether": "允许进入下界",
  hardcore: "极限模式",
  "enable-command-block": "启用命令方块",
  "enable-rcon": "启用 RCON",
  "rcon.port": "RCON 端口",
  "rcon.password": "RCON 密码",
  "query.port": "Query 端口",
  "enable-query": "启用 Query",
  "enable-status": "在列表显示在线状态",
  "generate-structures": "生成结构",
  "spawn-monsters": "生成怪物",
  "spawn-animals": "生成动物",
  "spawn-npcs": "生成村民",
  "spawn-protection.legacy": "出生点保护",
  "network-compression-threshold": "网络压缩阈值",
  "resource-pack": "资源包地址",
  "resource-pack-prompt": "资源包提示文字",
  "resource-pack-sha1": "资源包 SHA1",
  "require-resource-pack": "强制使用资源包",
  "max-world-size": "世界最大边界",
  "op-permission-level": "OP 权限等级",
  "function-permission-level": "函数权限等级",
  "max-tick-time": "单刻最大耗时（毫秒）",
  "sync-chunk-writes": "同步写入区块",
  "entity-broadcast-range-percentage": "实体广播范围百分比",
  "max-entity-collisions": "实体碰撞上限",
  "hide-online-players": "隐藏在线玩家列表",
  "broadcast-console-to-ops": "把控制台输出发给 OP",
  "broadcast-rcon-to-ops": "把 RCON 输出发给 OP",
  "log-ips": "记录玩家 IP",
  "prevent-proxy-connections": "阻止代理连接",
  "rate-limit": "数据包速率上限",
  "text-filtering-config": "文本过滤配置",
  "use-native-transport": "使用 Linux 原生传输",
  "debug": "调试模式",
  "bug-report-link": "问题反馈链接",
  "pause-when-empty-seconds": "空服时暂停秒数",
  "accepts-transfers": "接受跨服转移",
  "enforce-secure-profile": "强制安全聊天签名",
  "initial-enabled-packs": "初始启用数据包",
  "initial-disabled-packs": "初始禁用数据包"
};
const PROPERTY_ENUMS = {
  difficulty: [
    { value: "peaceful", label: "和平" },
    { value: "easy", label: "简单" },
    { value: "normal", label: "普通" },
    { value: "hard", label: "困难" }
  ],
  gamemode: [
    { value: "survival", label: "生存" },
    { value: "creative", label: "创造" },
    { value: "adventure", label: "冒险" },
    { value: "spectator", label: "旁观" }
  ],
  "level-type": [
    { value: "minecraft:normal", label: "默认" },
    { value: "minecraft:flat", label: "超平坦" },
    { value: "minecraft:large_biomes", label: "巨型生物群系" },
    { value: "minecraft:amplified", label: "放大化" },
    { value: "minecraft:single_biome_surface", label: "单一生物群系" }
  ],
  "op-permission-level": [
    { value: "1", label: "1 · 可绕过出生点保护" },
    { value: "2", label: "2 · 可用大部分指令" },
    { value: "3", label: "3 · 可封禁玩家" },
    { value: "4", label: "4 · 完全权限" }
  ],
  "function-permission-level": [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" }
  ]
};
function isBooleanKey(value) {
  return value === "true" || value === "false";
}
function propertyLabel(key) {
  return PROPERTY_LABELS[key] ?? key;
}
function PropertiesView({ server }) {
  const [tab, setTab] = reactExports.useState("launch");
  const [layout, setLayout] = reactExports.useState(null);
  const [tabPicked, setTabPicked] = reactExports.useState(false);
  reactExports.useEffect(() => {
    void window.api.layout.get(server.id).then((res) => {
      if (res.ok) setLayout(res.data);
    });
  }, [server.id]);
  reactExports.useEffect(() => {
    if (!layout || tabPicked) return;
    setTabPicked(true);
    if (layout.isProxy) setTab("props");
  }, [layout, tabPicked]);
  const isProxy = layout?.isProxy ?? false;
  const proxyFile = layout?.proxyConfigFile || "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "console-toolbar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "seg", style: { margin: 0, width: 380 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: tab === "launch" ? "active" : "", onClick: () => setTab("launch"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "sliders", size: 13 }),
        "启动配置"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: tab === "props" ? "active" : "", onClick: () => setTab("props"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "file-text", size: 13 }),
        isProxy ? proxyFile || "velocity.toml" : "server.properties"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dash", style: { padding: 0 }, children: tab === "launch" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LaunchForm, { server, layout }) : isProxy ? /* @__PURE__ */ jsxRuntimeExports.jsx(VelocityView, { server }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PropsForm, { server }) })
  ] });
}
function LaunchForm({
  server,
  layout
}) {
  const javaList = useStore((s) => s.javaList);
  const pythonList = useStore((s) => s.pythonList);
  const toast = useStore((s) => s.toast);
  const refresh = useStore((s) => s.refresh);
  const setPanel = useStore((s) => s.setPanel);
  const settings = useStore((s) => s.settings);
  layout?.isProxy ?? false;
  const [iconOpen, setIconOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    name: server.name,
    jar: server.jar,
    launchArgs: server.launchArgs,
    pythonPath: server.pythonPath,
    startScript: server.startScript,
    javaPath: server.javaPath,
    memoryMin: server.memoryMin,
    memoryMax: server.memoryMax,
    jvmArgs: server.jvmArgs,
    serverArgs: server.serverArgs,
    autoRestart: server.autoRestart,
    pluginsDir: server.pluginsDir,
    modsDir: server.modsDir,
    note: server.note
  });
  const [jars, setJars] = reactExports.useState([]);
  const [scripts, setScripts] = reactExports.useState([]);
  const [dirty, setDirty] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const [confirmRemove, setConfirmRemove] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setForm({
      name: server.name,
      jar: server.jar,
      launchArgs: server.launchArgs,
      pythonPath: server.pythonPath,
      startScript: server.startScript,
      javaPath: server.javaPath,
      memoryMin: server.memoryMin,
      memoryMax: server.memoryMax,
      jvmArgs: server.jvmArgs,
      serverArgs: server.serverArgs,
      autoRestart: server.autoRestart,
      pluginsDir: server.pluginsDir,
      modsDir: server.modsDir,
      note: server.note
    });
    setDirty(false);
  }, [server.id]);
  const scanFiles = reactExports.useCallback(async () => {
    const root = await window.api.fs.list(server.dir, "");
    if (!root.ok) return;
    const pick = (list, exts) => list.filter((f2) => !f2.isDir && exts.includes(f2.ext));
    let all = root.data;
    const sep = server.jar.lastIndexOf("/");
    const sub = sep > 0 ? server.jar.slice(0, sep) : "";
    if (sub) {
      const nested = await window.api.fs.list(server.dir, sub);
      if (nested.ok) all = [...all, ...nested.data];
    }
    setJars(pick(all, [".jar"]));
    setScripts(pick(all, [".bat", ".sh", ".cmd"]));
  }, [server.dir, server.jar]);
  reactExports.useEffect(() => {
    void scanFiles();
  }, [scanFiles]);
  const [scriptBusy, setScriptBusy] = reactExports.useState(false);
  const makeStartScript = async () => {
    setScriptBusy(true);
    const res = await window.api.server.writeStartScript(server.id);
    setScriptBusy(false);
    if (!res.ok) {
      toast(res.error ?? "生成失败", "error");
      return;
    }
    toast(`已生成 ${res.data.file}`, "success");
    await scanFiles();
  };
  const patch = (p2) => {
    setForm((f2) => ({ ...f2, ...p2 }));
    setDirty(true);
  };
  const save = async () => {
    setSaving(true);
    const res = await window.api.servers.update(server.id, {
      ...form,
      memoryMin: Number(form.memoryMin) || 0,
      memoryMax: Number(form.memoryMax) || 0
    });
    setSaving(false);
    if (res.ok) {
      toast("已保存", "success");
      setDirty(false);
      void refresh();
    } else {
      toast(res.error ?? "保存失败", "error");
    }
  };
  const pickJava = async () => {
    const res = await window.api.app.pickFile("选择 java.exe");
    if (!res.ok || !res.data) return;
    const probe = await window.api.java.probe(res.data);
    if (probe.ok) {
      useStore.setState((s) => ({
        javaList: [probe.data, ...s.javaList.filter((j) => j.path !== probe.data.path)]
      }));
      toast(`已选择 Java ${probe.data.version || ""}`, "success");
    }
    patch({ javaPath: res.data });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detect-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "detect-icon-btn",
          title: "点击更换服务器图标",
          onClick: () => setIconOpen(true),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ServerAvatar, { server, size: 44 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detect-icon-hint", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "image", size: 12 }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detect-main", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detect-name", children: [
          server.name,
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link-btn", onClick: () => setIconOpen(true), children: "换图标" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "detect-path", children: server.dir }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detect-tags", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: kindLabel(server.kind) }),
          server.mcVersion && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag blue", children: server.mcVersion }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: server.runtime.status === "stopped" ? "已停止" : "运行中" }),
          layout?.isMcdr && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag purple", children: "MCDReforged 托管" }),
          layout?.coreRel && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag", children: [
            "核心在 ",
            layout.coreRel,
            "/ 子目录"
          ] })
        ] })
      ] })
    ] }),
    layout?.isMcdr && (form.startScript || form.pythonPath) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "issue-bar", style: { margin: "0 0 16px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 16 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "issue-text", children: [
        "这个服务器由 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "MCDReforged" }),
        " 托管，实际启动命令写在 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "config.yml" }),
        " 的",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "start_command" }),
        " 里，下面的内存与 JVM 参数不会生效。",
        layout.mcdrMemory.max != null && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          " ",
          "当前实际内存为 ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
            layout.mcdrMemory.min ?? "?",
            " ~ ",
            layout.mcdrMemory.max,
            " MB"
          ] }),
          "。"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm primary", onClick: () => setPanel("configs"), children: "去改 config.yml" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "基本信息" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "显示名称", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          value: form.name,
          onChange: (e) => patch({ name: e.target.value })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "备注", hint: "只用于自己辨认，不会写进服务端", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          value: form.note,
          placeholder: "例如：和朋友一起玩的原版生存",
          onChange: (e) => patch({ note: e.target.value })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "服务器目录", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: server.dir, readOnly: true, style: { color: "var(--text-muted)" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn sm", onClick: () => void window.api.app.openFolder(server.dir), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "folder-open", size: 14 }),
          "打开"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "启动方式" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "用启动脚本", hint: "设置后优先执行脚本，忽略下面的 jar 与内存参数", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "select",
            value: form.startScript,
            onChange: (e) => patch({ startScript: e.target.value }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "不使用，直接用 Java 启动 jar" }),
              scripts.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.path, children: s.path }, s.path))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "btn sm",
            disabled: scriptBusy || Boolean(layout?.isMcdr),
            title: layout?.isMcdr ? "MCDReforged 托管的服务器，启动命令在它的 config.yml 里" : "按当前配置生成 start.bat",
            onClick: () => void makeStartScript(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "save", size: 14 }),
              scripts.some((s) => s.name === "start.bat" || s.name === "start.sh") ? "重新生成脚本" : "生成启动脚本"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { paddingLeft: 224, lineHeight: 1.8 }, children: [
        "生成的是 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "start.bat" }),
        "，双击就能在控制台窗口里跑起来，报错信息一眼能看到。",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "它只是「手里有份能直接跑的命令」，CraftDesk 仍然按上面的内存和参数启动 —— 换句话说，改完设置要重新生成一次脚本，它记的是生成那一刻的值。"
      ] }),
      form.launchArgs && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "启动参数文件", hint: "Forge / NeoForge 用它启动（java @文件）", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          value: form.launchArgs,
          readOnly: true,
          style: { color: "var(--text-muted)" }
        }
      ) }),
      (server.mcdr || layout?.isMcdr) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "MCDReforged 的 Python",
          hint: "设置后由 MCDR 启动，内存与 JVM 参数以它的 config.yml 为准",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "select",
              value: form.pythonPath,
              onChange: (e) => patch({ pythonPath: e.target.value }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "不用 MCDR（直接启动核心）" }),
                pythonList.map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p2.path, children: [
                  "Python ",
                  p2.version,
                  p2.mcdr ? ` · MCDR ${p2.mcdr}` : " · 未装 MCDR",
                  p2.suitable ? "" : "（版本过低）"
                ] }, p2.path)),
                form.pythonPath && !pythonList.some((p2) => p2.path === form.pythonPath) && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: form.pythonPath, children: form.pythonPath })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "服务端核心", hint: "相对服务器目录，可位于子目录", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "select",
            value: form.jar,
            disabled: Boolean(form.startScript),
            onChange: (e) => patch({ jar: e.target.value }),
            children: [
              !jars.some((j) => j.path === form.jar) && form.jar && /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: form.jar, children: [
                form.jar,
                "（未找到）"
              ] }),
              jars.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: j.path, children: j.path }, j.path)),
              jars.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "没有找到 jar 文件" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm", onClick: () => void window.api.app.openFolder(server.dir), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "refresh", size: 14 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Java 运行环境", hint: "留空则使用全局设置里的 Java", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "select",
            value: form.javaPath,
            onChange: (e) => patch({ javaPath: e.target.value }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "", children: [
                "使用全局默认（",
                settings?.javaPath || "未设置",
                "）"
              ] }),
              javaList.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: j.path, children: [
                "Java ",
                j.major || "?",
                " · ",
                j.version,
                " · ",
                j.path
              ] }, j.path))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm", onClick: () => void pickJava(), children: "浏览" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "性能与参数" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "最小内存", hint: "对应 -Xms，单位 MB", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "input",
            type: "number",
            min: 128,
            step: 256,
            value: form.memoryMin,
            onChange: (e) => patch({ memoryMin: Number(e.target.value) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hint", children: "MB" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "最大内存", hint: "对应 -Xmx，单位 MB", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "input",
            type: "number",
            min: 256,
            step: 256,
            value: form.memoryMax,
            onChange: (e) => patch({ memoryMax: Number(e.target.value) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hint", children: "MB" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "JVM 参数", hint: "垃圾回收等调优参数，空格分隔", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          className: "textarea",
          value: form.jvmArgs,
          placeholder: "-XX:+UseG1GC -XX:MaxGCPauseMillis=200",
          onChange: (e) => patch({ jvmArgs: e.target.value })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "程序参数", hint: "传给服务端本身的参数", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          value: form.serverArgs,
          placeholder: "nogui",
          onChange: (e) => patch({ serverArgs: e.target.value })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "异常退出后自动重启", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: form.autoRestart, onChange: (v2) => patch({ autoRestart: v2 }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "目录约定" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "插件目录", hint: "留空表示不使用", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          value: form.pluginsDir,
          placeholder: "plugins",
          onChange: (e) => patch({ pluginsDir: e.target.value })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "模组目录", hint: "Fabric / Forge 用", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          value: form.modsDir,
          placeholder: "mods",
          onChange: (e) => patch({ modsDir: e.target.value })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "危险操作" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "移除或删除", hint: "选「只移除」不会动文件", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn danger sm", onClick: () => setConfirmRemove(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "trash", size: 14 }),
        "移除 / 删除这个服务器"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { lineHeight: 1.8 }, children: "两种程度：只从 CraftDesk 的列表里移除（磁盘文件全部保留）， 或者连服务器目录一起删掉。后者需要输入服务器名称才会执行。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, paddingTop: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn primary", disabled: !dirty || saving, onClick: () => void save(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "save", size: 14 }),
        saving ? "保存中…" : "保存修改"
      ] }),
      dirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hint", style: { alignSelf: "center" }, children: "有未保存的修改" })
    ] }),
    confirmRemove && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteServerDialog,
      {
        server,
        onClose: () => setConfirmRemove(false),
        onDeleted: () => {
          setConfirmRemove(false);
          void refresh();
        }
      }
    ),
    iconOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(ServerIconDialog, { server, onClose: () => setIconOpen(false) })
  ] });
}
function PropsForm({ server }) {
  const toast = useStore((s) => s.toast);
  const [entries, setEntries] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [dirty, setDirty] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const [query, setQuery] = reactExports.useState("");
  reactExports.useEffect(() => {
    setLoading(true);
    void window.api.props.read(server.id).then((res) => {
      setEntries(res.ok ? res.data : []);
      setLoading(false);
      setDirty(false);
    });
  }, [server.id]);
  const filtered = reactExports.useMemo(() => {
    if (!entries) return [];
    const q2 = query.trim().toLowerCase();
    if (!q2) return entries;
    return entries.filter(
      (e) => e.key.toLowerCase().includes(q2) || e.value.toLowerCase().includes(q2) || propertyLabel(e.key).toLowerCase().includes(q2)
    );
  }, [entries, query]);
  const update = (key, value) => {
    setEntries((list) => list?.map((e) => e.key === key ? { ...e, value } : e) ?? null);
    setDirty(true);
  };
  const save = async () => {
    if (!entries) return;
    setSaving(true);
    const res = await window.api.props.write(server.id, entries);
    setSaving(false);
    if (res.ok) {
      toast(
        server.runtime.status === "stopped" ? "已保存，下次启动生效" : "已保存。部分选项需要重启服务器才生效",
        "success"
      );
      setDirty(false);
    } else {
      toast(res.error ?? "保存失败", "error");
    }
  };
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { text: "正在读取 server.properties…" });
  if (!entries || entries.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "center-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 26 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "服务器目录下还没有 server.properties" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { maxWidth: 420 }, children: "该文件在服务器第一次启动后会自动生成。可以先启动一次，再回来编辑。" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "console-toolbar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-search", style: { margin: 0, width: 240, height: 30 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "search", size: 14 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: "搜索配置项",
            spellCheck: false
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hint", children: [
        "共 ",
        entries.length,
        " 项",
        dirty && " ·  有未保存的修改"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toolbar-spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn primary sm", disabled: !dirty || saving, onClick: () => void save(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "save", size: 14 }),
        saving ? "保存中…" : "保存"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dash", style: { padding: "8px 0 24px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form", children: [
      filtered.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        PropertyRow,
        {
          entry: e,
          onChange: (v2) => update(e.key, v2)
        },
        e.key
      )),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-empty", children: "没有匹配的配置项" })
    ] }) })
  ] });
}
function PropertyRow({
  entry,
  onChange
}) {
  const label = propertyLabel(entry.key);
  const enums = PROPERTY_ENUMS[entry.key];
  const bool = isBooleanKey(entry.value);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label, hint: entry.key, children: bool ? /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: entry.value === "true", onChange: (v2) => onChange(String(v2)) }) : enums ? /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "select", value: entry.value, onChange: (e) => onChange(e.target.value), children: [
    !enums.some((o) => o.value === entry.value) && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: entry.value, children: entry.value }),
    enums.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value))
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      className: "input",
      value: entry.value,
      onChange: (e) => onChange(e.target.value),
      spellCheck: false
    }
  ) });
}
const cache = /* @__PURE__ */ new Map();
const inflight = /* @__PURE__ */ new Map();
function loadRemoteIcon(url) {
  const hit = cache.get(url);
  if (hit !== void 0) return Promise.resolve(hit);
  const running = inflight.get(url);
  if (running) return running;
  const task = window.api.app.fetchImage(url).then((res) => res.ok ? res.data.dataUrl : null).catch(() => null).then((dataUrl) => {
    cache.set(url, dataUrl);
    inflight.delete(url);
    return dataUrl;
  });
  inflight.set(url, task);
  return task;
}
function useRemoteIcon(url) {
  const [src, setSrc] = reactExports.useState(() => url ? cache.get(url) ?? null : null);
  reactExports.useEffect(() => {
    if (!url) {
      setSrc(null);
      return;
    }
    const hit = cache.get(url);
    if (hit !== void 0) {
      setSrc(hit);
      return;
    }
    let alive = true;
    void loadRemoteIcon(url).then((dataUrl) => {
      if (alive) setSrc(dataUrl);
    });
    return () => {
      alive = false;
    };
  }, [url]);
  return src;
}
function RemoteIcon({
  url,
  className = "mod-icon",
  fallback = "package"
}) {
  const src = useRemoteIcon(url);
  if (!src) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${className} placeholder`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: fallback, size: 16 }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className, src, alt: "", draggable: false });
}
function loaderForKind(kind) {
  switch (kind) {
    case "fabric":
      return "fabric";
    case "forge":
      return "forge";
    case "neoforge":
      return "neoforge";
    case "paper":
    case "purpur":
    case "spigot":
    case "bukkit":
      return "paper";
    case "velocity":
      return "velocity";
    case "waterfall":
      return "waterfall";
    case "bungeecord":
      return "bungeecord";
    default:
      return "";
  }
}
const SOURCES = [
  { key: "modrinth", label: "Modrinth", hint: "模组与插件通吃，API 最完整", kinds: ["mod", "plugin"] },
  { key: "hangar", label: "Hangar", hint: "Paper 官方插件站", kinds: ["plugin"] },
  {
    key: "spigot",
    label: "SpigotMC",
    hint: "老牌插件站",
    kinds: ["plugin"],
    note: "SpigotMC 的下载有 Cloudflare 保护。托管在 GitHub 等地方的资源能直接装，Spigot 自托管的只能点「主页」手动下载。"
  },
  {
    key: "curseforge",
    label: "CurseForge",
    hint: "模组为主",
    kinds: ["mod"],
    note: "CurseForge 官方 API 必须带 Key。到 console.curseforge.com 免费申请后填进「设置」即可。"
  }
];
function targetFor(kind, source, projectKind) {
  if (source === "mcdr") return "mcdr";
  const isProxy = isProxyKind(kind);
  if (projectKind === "plugin") return "plugin";
  if (kind === "vanilla" || kind === "unknown") return null;
  return isProxy ? null : "mod";
}
function RegistryView({ server }) {
  const [source, setSource] = reactExports.useState("modrinth");
  const [layout, setLayout] = reactExports.useState(null);
  const settings = useStore((s) => s.settings);
  reactExports.useEffect(() => {
    void window.api.layout.get(server.id).then((r2) => r2.ok && setLayout(r2.data));
  }, [server.id]);
  const meta = SOURCES.find((s) => s.key === source);
  const cfMissing = source === "curseforge" && !settings?.curseforgeApiKey;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "console-toolbar", style: { gap: 6 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "seg", style: { margin: 0, width: 460 }, children: [
        SOURCES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: source === s.key ? "active" : "",
            title: s.hint,
            onClick: () => setSource(s.key),
            children: s.label
          },
          s.key
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: source === "mcdr" ? "active" : "",
            title: "MCDReforged 的 Python 插件",
            onClick: () => setSource("mcdr"),
            children: "MCDR"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toolbar-spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hint", children: [
        "装到 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: server.name })
      ] })
    ] }),
    source === "mcdr" ? /* @__PURE__ */ jsxRuntimeExports.jsx(McdrTab, { server, layout }) : cfMissing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "center-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "shield", size: 28 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "CurseForge 需要 API Key" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { maxWidth: 460, lineHeight: 1.9 }, children: [
        "到 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "console.curseforge.com" }),
        " 免费申请一个 Key，填进「设置 → 下载源」， 回来就能搜了。CurseForge 官方 API 不接受匿名请求。"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", onClick: () => useStore.getState().setView("settings"), children: "去设置" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserTab, { server, layout, source, meta })
  ] });
}
function BrowserTab({
  server,
  layout,
  source,
  meta
}) {
  useStore((s) => s.toast);
  const isProxy = isProxyKind(server.kind);
  const [projectKind, setProjectKind] = reactExports.useState(meta.kinds[0]);
  const [query, setQuery] = reactExports.useState("");
  const [hits, setHits] = reactExports.useState([]);
  const [total, setTotal] = reactExports.useState(0);
  const [page, setPage] = reactExports.useState(0);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [useServerVersion, setUseServerVersion] = reactExports.useState(true);
  const [loader, setLoader] = reactExports.useState(() => loaderForKind(server.kind));
  const [picker, setPicker] = reactExports.useState(null);
  const PAGE = 20;
  reactExports.useEffect(() => {
    setProjectKind(meta.kinds[0]);
    setHits([]);
    setError("");
  }, [source, meta]);
  const search = reactExports.useCallback(
    async (offset, append) => {
      setLoading(true);
      setError("");
      const res = await window.api.registry.search(source, {
        query,
        kind: projectKind,
        // 代理端的 mcVersion 是它自己的版本号（3.4.0 / 构建号 2100），
        // 拿去当 game_version 过滤只会一个插件都搜不到
        gameVersion: useServerVersion && !isProxy ? server.mcVersion || void 0 : void 0,
        loader: loader || void 0,
        serverKind: server.kind,
        limit: PAGE,
        offset
      });
      setLoading(false);
      if (!res.ok) {
        setError(res.error ?? "搜索失败");
        if (!append) setHits([]);
        return;
      }
      setTotal(res.data.total);
      setHits((prev) => append ? [...prev, ...res.data.hits] : res.data.hits);
      setPage(offset / PAGE);
    },
    [source, query, projectKind, useServerVersion, isProxy, server.mcVersion, server.kind, loader]
  );
  const timer = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => void search(0, false), 350);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [search]);
  const target = targetFor(server.kind, source, projectKind);
  const destDir = source === "hangar" || source === "spigot" ? layout?.mcPluginsDir : target === "mod" ? layout?.modsDir : layout?.mcPluginsDir;
  const multipleKinds = meta.kinds.length > 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "console-toolbar", style: { borderBottom: "none", flexWrap: "wrap", gap: 8 }, children: [
      multipleKinds && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "seg", style: { margin: 0, width: 150 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: projectKind === "mod" ? "active" : "",
            onClick: () => setProjectKind("mod"),
            children: "模组"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: projectKind === "plugin" ? "active" : "",
            onClick: () => setProjectKind("plugin"),
            children: "插件"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-search", style: { margin: 0, width: 240, height: 30 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "search", size: 14 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: `搜索 ${meta.label}…`,
            spellCheck: false
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "check-line", title: "只显示支持该 MC 版本的扩展", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: useServerVersion,
            onChange: (e) => setUseServerVersion(e.target.checked)
          }
        ),
        "只看 ",
        server.mcVersion || "当前版本"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          className: "select",
          style: { width: 130, height: 30 },
          value: loader,
          onChange: (e) => setLoader(e.target.value),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "全部加载器" }),
            ["fabric", "forge", "neoforge", "quilt", "paper", "spigot", "velocity", "waterfall"].map(
              (l2) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: l2, children: l2 }, l2)
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toolbar-spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hint", children: total > 0 ? `共 ${total.toLocaleString()} 个` : "" })
    ] }),
    meta.note && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "issue-bar", style: { margin: "0 14px 10px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 16 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "issue-text", children: meta.note })
    ] }),
    !target && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "issue-bar", style: { margin: "0 14px 10px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 16 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "issue-text", children: server.kind === "vanilla" ? "原版服务端不支持模组或插件。想装模组请换成 Fabric / Forge，想装插件请换成 Paper / Purpur。" : "代理端只能装代理插件，这个源里对应类型的内容很少。" })
    ] }),
    destDir && target && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { padding: "0 16px 8px" }, children: [
      "将安装到 ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { children: [
        destDir,
        "/"
      ] }),
      server.runtime.status !== "stopped" && " · 服务器正在运行，装完需要重启才生效"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dash", style: { paddingTop: 0 }, children: [
      loading && hits.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-empty", children: "正在搜索…" }),
      !loading && error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "center-state", style: { minHeight: 160 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 24 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: error })
      ] }),
      !loading && !error && hits.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-empty", children: "没有找到匹配的内容" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dash-grid", children: hits.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            RemoteIcon,
            {
              url: h.iconUrl,
              fallback: source === "hangar" ? "puzzle" : "package"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "card-title", title: h.name, children: h.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-meta", children: [
          h.downloads > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag", children: [
            (h.downloads / 1e3).toFixed(0),
            "k 下载"
          ] }),
          h.authors.slice(0, 1).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: a }, a)),
          h.extra.map((x2) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag orange", children: x2 }, x2)),
          h.categories.slice(0, 2).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag blue", children: c }, c))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mod-desc", children: h.description || "（没有简介）" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-actions", style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "btn sm primary",
              disabled: !target || !h.installable,
              title: h.blockedReason ?? (target ? "选择版本后安装" : "这个服务器不支持该类型"),
              onClick: () => setPicker(h),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "download", size: 13 }),
                "安装"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "btn sm ghost",
              title: h.pageUrl,
              onClick: () => void window.api.app.openExternal(h.pageUrl),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "external", size: 13 }),
                "主页"
              ]
            }
          )
        ] }),
        h.blockedReason && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { marginTop: 8 }, children: h.blockedReason })
      ] }, `${h.source}-${h.id}`)) }),
      hits.length > 0 && hits.length < total && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "center", paddingBottom: 24 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", disabled: loading, onClick: () => void search((page + 1) * PAGE, true), children: loading ? "加载中…" : "加载更多" }) })
    ] }),
    picker && target && /* @__PURE__ */ jsxRuntimeExports.jsx(
      VersionPicker,
      {
        server,
        source,
        hit: picker,
        target,
        onClose: () => setPicker(null)
      }
    )
  ] });
}
function VersionPicker({
  server,
  source,
  hit,
  target,
  onClose
}) {
  const toast = useStore((s) => s.toast);
  const isProxy = isProxyKind(server.kind);
  const [versions, setVersions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState("");
  const [installing, setInstalling] = reactExports.useState(false);
  reactExports.useEffect(() => {
    void (async () => {
      const res = await window.api.registry.versions(source, hit.id, {
        gameVersion: isProxy ? void 0 : server.mcVersion || void 0,
        loader: loaderForKind(server.kind) || void 0,
        serverKind: server.kind
      });
      setLoading(false);
      if (!res.ok) {
        setError(res.error ?? "获取版本失败");
        return;
      }
      setVersions(res.data);
      setSelected(res.data[0]?.id ?? "");
    })();
  }, [source, hit.id, isProxy, server.mcVersion, server.kind]);
  const v2 = versions.find((x2) => x2.id === selected);
  const install = async () => {
    if (!v2) return;
    setInstalling(true);
    const res = await window.api.registry.install({
      serverId: server.id,
      target,
      url: v2.fileUrl,
      fileName: v2.fileName,
      label: hit.name,
      fileSize: v2.fileSize
    });
    setInstalling(false);
    if (res.ok) {
      toast(`${hit.name} 已装到 ${res.data.dir}/`, "success");
      onClose();
    } else {
      toast(res.error ?? "安装失败", "error");
    }
  };
  const CHANNEL_LABEL = {
    release: "正式版",
    beta: "Beta",
    alpha: "Alpha"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      title: `安装 ${hit.name}`,
      onClose,
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spacer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: onClose, children: "取消" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "btn primary",
            disabled: !v2 || installing,
            onClick: () => void install(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "download", size: 14 }),
              installing ? "下载中…" : "确认安装"
            ]
          }
        )
      ] }),
      children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "center-state", style: { minHeight: 140 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "正在查可用版本…" })
      ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "center-state", style: { minHeight: 140 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 24 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: error })
      ] }) : versions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "center-state", style: { minHeight: 140 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 24 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "没有适配的版本" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { maxWidth: 420 }, children: [
          "这个项目没有支持 ",
          server.mcVersion || "该版本",
          loaderForKind(server.kind) ? ` / ${loaderForKind(server.kind)}` : "",
          " 的发布。 可以在上方关掉「只看当前版本」再找找。"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { marginBottom: 10 }, children: [
          server.name,
          " · ",
          server.mcVersion || "版本未知",
          loaderForKind(server.kind) ? ` · ${loaderForKind(server.kind)}` : "",
          " · 共 ",
          versions.length,
          " 个可用版本"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gap: 6, maxHeight: 320, overflowY: "auto" }, children: versions.map((x2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: `version-row ${x2.id === selected ? "active" : ""}`,
            onClick: () => setSelected(x2.id),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `dot ${x2.channel === "release" ? "running" : "stopped"}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "vr-main", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "vr-title", children: [
                  x2.name,
                  x2.channel !== "release" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag orange", children: CHANNEL_LABEL[x2.channel] ?? x2.channel })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "vr-sub", children: [
                  x2.fileName,
                  x2.fileSize > 0 && ` · ${formatBytes(x2.fileSize)}`,
                  x2.downloads > 0 && ` · ${x2.downloads.toLocaleString()} 次下载`,
                  x2.publishedAt && ` · ${x2.publishedAt.slice(0, 10)}`
                ] })
              ] })
            ]
          },
          x2.id
        )) })
      ] })
    }
  );
}
function McdrTab({ server, layout }) {
  const toast = useStore((s) => s.toast);
  const [plugins, setPlugins] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [query, setQuery] = reactExports.useState("");
  const [label, setLabel] = reactExports.useState("");
  const [picker, setPicker] = reactExports.useState(null);
  const load = reactExports.useCallback(
    async (force = false) => {
      setLoading(true);
      const res = await window.api.registry.mcdrList(force);
      setLoading(false);
      if (res.ok) setPlugins(res.data);
      else toast(res.error ?? "读取 MCDReforged 插件目录失败", "error");
    },
    [toast]
  );
  reactExports.useEffect(() => {
    void load();
  }, [load]);
  const labels = reactExports.useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    for (const p2 of plugins) p2.labels.forEach((l2) => set.add(l2));
    return [...set].sort();
  }, [plugins]);
  const visible = reactExports.useMemo(() => {
    const q2 = query.trim().toLowerCase();
    return plugins.filter((p2) => {
      if (label && !p2.labels.includes(label)) return false;
      if (!q2) return true;
      return p2.name.toLowerCase().includes(q2) || p2.id.toLowerCase().includes(q2) || p2.description.toLowerCase().includes(q2) || p2.authors.some((a) => a.toLowerCase().includes(q2));
    }).sort((a, b) => (b.downloads ?? -1) - (a.downloads ?? -1));
  }, [plugins, query, label]);
  const destDir = layout?.mcdrPluginsDir;
  const canInstall = Boolean(destDir);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "console-toolbar", style: { borderBottom: "none", flexWrap: "wrap", gap: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-search", style: { margin: 0, width: 240, height: 30 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "search", size: 14 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: "搜索插件名、作者或功能",
            spellCheck: false
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          className: "select",
          style: { width: 130, height: 30 },
          value: label,
          onChange: (e) => setLabel(e.target.value),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "全部标签" }),
            labels.map((l2) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: l2, children: l2 }, l2))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-btn", title: "重新拉取目录", onClick: () => void load(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "refresh", size: 15 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toolbar-spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hint", children: [
        "共 ",
        plugins.length,
        " 个插件"
      ] })
    ] }),
    !canInstall && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "issue-bar", style: { margin: "0 14px 10px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 16 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "issue-text", children: "这个服务器不是 MCDReforged 托管的，装了 MCDR 插件也不会被加载。" })
    ] }),
    canInstall && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { padding: "0 16px 8px" }, children: [
      "将安装到 ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { children: [
        destDir,
        "/"
      ] }),
      " · 装完执行 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "!!MCDR reload plugin" }),
      " 或重启生效"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dash", style: { paddingTop: 0 }, children: [
      loading && plugins.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-empty", children: "正在拉取插件目录（约 1 MB）…" }),
      !loading && visible.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-empty", children: "没有找到匹配的插件" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dash-grid", children: visible.slice(0, 60).map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mod-icon placeholder purple", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "zap", size: 16 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "card-title", title: p2.name, children: p2.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-meta", children: [
          p2.version && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag", children: [
            "v",
            p2.version
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: p2.authors.slice(0, 2).join(", ") || "未知作者" }),
          p2.downloads != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag", children: [
            p2.downloads.toLocaleString(),
            " 次"
          ] }),
          p2.labels.slice(0, 2).map((l2) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag purple", children: l2 }, l2))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mod-desc", children: p2.description || "（目录里没有提供简介）" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-actions", style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn sm primary", disabled: !canInstall, onClick: () => setPicker(p2), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "download", size: 13 }),
            "安装"
          ] }),
          p2.repository && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "btn sm ghost",
              title: p2.repository,
              onClick: () => void window.api.app.openExternal(p2.repository),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "external", size: 13 }),
                "仓库"
              ]
            }
          )
        ] })
      ] }, p2.id)) }),
      visible.length > 60 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-empty", style: { padding: "10px 0 24px" }, children: "结果较多，只显示下载量前 60 个，用搜索或标签缩小范围" })
    ] }),
    picker && /* @__PURE__ */ jsxRuntimeExports.jsx(McdrPicker, { server, plugin: picker, onClose: () => setPicker(null) })
  ] });
}
function McdrPicker({
  server,
  plugin,
  onClose
}) {
  const toast = useStore((s) => s.toast);
  const [releases, setReleases] = reactExports.useState(plugin.releases);
  const [loading, setLoading] = reactExports.useState(plugin.releases.length === 0);
  const [selected, setSelected] = reactExports.useState(plugin.releases[0]?.url ?? "");
  const [installing, setInstalling] = reactExports.useState(false);
  const [fallbackError, setFallbackError] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (plugin.releases.length) return;
    void (async () => {
      const res = await window.api.registry.mcdrReleases(plugin.repository);
      setLoading(false);
      if (!res.ok) {
        setFallbackError(res.error ?? "查询失败");
        return;
      }
      setReleases(res.data);
      setSelected(res.data[0]?.url ?? "");
    })();
  }, [plugin]);
  const rel = releases.find((r2) => r2.url === selected);
  const install = async () => {
    if (!rel) return;
    setInstalling(true);
    const res = await window.api.registry.install({
      serverId: server.id,
      target: "mcdr",
      url: rel.url,
      fileName: rel.fileName,
      label: plugin.name
    });
    setInstalling(false);
    if (res.ok) {
      toast(`${plugin.name} 已装到 ${res.data.dir}/`, "success");
      onClose();
    } else {
      toast(res.error ?? "安装失败", "error");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      title: `安装 ${plugin.name}`,
      onClose,
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spacer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: onClose, children: "取消" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn primary", disabled: !rel || installing, onClick: () => void install(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "download", size: 14 }),
          installing ? "下载中…" : "确认安装"
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { marginBottom: 10 }, children: [
          plugin.authors.join(", "),
          plugin.labels.length ? ` · ${plugin.labels.join(" / ")}` : ""
        ] }),
        plugin.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13, color: "var(--text-dim)", lineHeight: 1.8, marginBottom: 12 }, children: plugin.description }),
        plugin.dependencies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "issue-bar", style: { margin: "0 0 12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 15 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "issue-text", children: [
            "这个插件依赖 ",
            plugin.dependencies.map((d) => d.id).join("、"),
            "。 没装的话插件不会正常工作。"
          ] })
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "center-state", style: { minHeight: 120 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "目录里没有版本信息，正在查询 GitHub Releases…" })
        ] }) : fallbackError ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "center-state", style: { minHeight: 120 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 24 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "拿不到可下载的版本" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { maxWidth: 400 }, children: [
            fallbackError,
            "。可以到仓库的 Releases 页面手动下载 .mcdr 放进 plugins/。"
          ] })
        ] }) : releases.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "center-state", style: { minHeight: 120 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "这个插件没有提供 .mcdr / .pyz 发布包" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", children: "需要到仓库自行构建或下载，再手动放进 plugins/。" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gap: 6, maxHeight: 300, overflowY: "auto" }, children: releases.map((r2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: `version-row ${r2.url === selected ? "active" : ""}`,
            onClick: () => setSelected(r2.url),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "package", size: 14, style: { color: "#a855f7" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "vr-main", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "vr-title", children: r2.fileName || r2.version }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "vr-sub", children: [
                  formatBytes(r2.size),
                  r2.downloads ? ` · ${r2.downloads} 次下载` : "",
                  r2.uploadedAt ? ` · ${r2.uploadedAt.slice(0, 10)}` : ""
                ] })
              ] })
            ]
          },
          r2.url
        )) })
      ]
    }
  );
}
const NODE_W = 168;
const NODE_H = 58;
const PROXY_W = 196;
const GAP_X = 20;
const GAP_Y = 46;
const ROW_GAP = 84;
const PER_ROW = 4;
function TopologyView({ onOpenServer }) {
  const topology = useStore((s) => s.topology);
  const loadTopology = useStore((s) => s.loadTopology);
  const servers = useStore((s) => s.servers);
  const stats = useStore((s) => s.stats);
  const activeId = useStore((s) => s.activeId);
  const select = useStore((s) => s.select);
  const containerRef = reactExports.useRef(null);
  const [width, setWidth] = reactExports.useState(900);
  reactExports.useEffect(() => {
    void loadTopology();
    const el2 = containerRef.current;
    if (!el2) return;
    const ro = new ResizeObserver(() => setWidth(el2.clientWidth - 48));
    ro.observe(el2);
    setWidth(el2.clientWidth - 48);
    return () => ro.disconnect();
  }, [loadTopology]);
  const sig = servers.map((s) => `${s.id}:${s.runtime.status}:${s.runtime.port}`).join("|");
  reactExports.useEffect(() => {
    void loadTopology();
  }, [sig, loadTopology]);
  const layout = reactExports.useMemo(
    () => topology ? computeLayout(topology, width) : null,
    [topology, width]
  );
  if (!topology || !layout) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "topo", ref: containerRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "center-state", style: { minHeight: 200 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "正在解析服务器关系…" })
    ] }) });
  }
  const hasAny = topology.proxies.length > 0 || topology.standalone.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "topo", ref: containerRef, children: [
    !hasAny && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "center-state", style: { minHeight: 200 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "server", size: 26 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "还没有服务器" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", children: "添加服务器后，这里会画出代理端和后端的从属关系。" })
    ] }),
    hasAny && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-cards", style: { marginBottom: 14 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", style: { padding: "10px 14px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sv", style: { fontSize: 19 }, children: topology.networkMax > 0 ? `${topology.networkOnline} / ${topology.networkMax}` : topology.networkOnline }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sl", children: [
            "网络在线人数",
            topology.proxies.length > 0 && topology.networkMax > 0 && "（上限取自代理端）"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", style: { padding: "10px 14px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sv", style: { fontSize: 19 }, children: topology.proxies.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sl", children: "代理端入口" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", style: { padding: "10px 14px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sv", style: { fontSize: 19 }, children: [
            topology.proxies.reduce((n2, p2) => n2 + p2.backends.filter((b) => b.managed).length, 0),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--text-muted)", fontSize: 14 }, children: [
              " / ",
              topology.proxies.reduce((n2, p2) => n2 + p2.backends.length, 0)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sl", children: "后端已导入 / 全部" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", style: { padding: "10px 14px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sv", style: { fontSize: 19 }, children: topology.standalone.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sl", children: "独立服务器" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "topo-legend", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "swatch", style: { borderColor: "#06b6d4" } }),
          "代理端（玩家入口）"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "swatch", style: { borderColor: "#22c55e" } }),
          "try 默认入口"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "swatch", style: { borderColor: "#3f3f46" } }),
          "普通后端"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "swatch", style: { borderColor: "#3f3f46", borderTopStyle: "dashed" } }),
          "未导入 CraftDesk"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "swatch", style: { borderColor: "#ef4444" } }),
          "同端口（互斥，不能同时启动）"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "topo-stage", style: { width: layout.width, height: layout.height }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "topo-edges", width: layout.width, height: layout.height, children: [
          layout.edges.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: e.d,
              fill: "none",
              stroke: e.color,
              strokeWidth: e.isTry ? 2 : 1.2,
              strokeDasharray: e.dashed ? "4 4" : void 0,
              opacity: e.dim ? 0.45 : 0.9
            },
            i
          )),
          layout.edges.filter(
            (e) => e.isTry && e.labelX != null && e.labelY != null
          ).map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "topo-edge-label", x: e.labelX, y: e.labelY, children: "默认入口" }, `l${i}`))
        ] }),
        layout.placed.map((p2) => {
          servers.find((x2) => x2.id === p2.node.id);
          const mem = stats[p2.node.id]?.mem ?? 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: [
                "topo-node",
                p2.isProxy ? "proxy" : "",
                p2.node.id === activeId ? "active" : "",
                p2.node.managed ? "" : "external"
              ].filter(Boolean).join(" "),
              style: { left: p2.x, top: p2.y, width: p2.w },
              title: p2.node.managed ? p2.node.address : `${p2.node.address}（未导入 CraftDesk）`,
              onClick: () => {
                if (!p2.node.managed) return;
                select(p2.node.id);
                onOpenServer(p2.node.id, "console");
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tn-head", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `dot ${p2.node.status}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tn-name", children: p2.node.name }),
                  p2.isProxy && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "globe", size: 13, style: { color: "#06b6d4" } })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tn-sub", children: [
                  p2.isProxy && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag cyan", children: "入口" }),
                  p2.node.kind && p2.node.managed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: kindLabel(p2.node.kind) }),
                  p2.node.port != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mono", children: [
                    ":",
                    p2.node.port
                  ] }),
                  !p2.node.managed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: "未导入" }),
                  p2.node.managed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `tag ${p2.node.running ? "green" : ""}`, children: statusLabel(p2.node.status) }),
                  !p2.isProxy && p2.hasForwardingMod && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `tag ${p2.forwardingOk === false ? "red" : "green"}`, children: p2.forwardingOk === false ? "密钥不符" : "已转发" }),
                  !p2.isProxy && p2.node.managed && !p2.hasForwardingMod && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag red", title: "后端没装 FabricProxy / FabricProxy-Lite", children: "无转发" }),
                  p2.node.managed && p2.node.running && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag orange", title: "本机在线人数", children: [
                    p2.node.onlinePlayers,
                    p2.node.maxPlayers > 0 && `/${p2.node.maxPlayers}`
                  ] }),
                  p2.node.sharedPort && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "tag red",
                      title: "有另一个服务器配了同一个端口，两者不能同时启动",
                      children: "同端口"
                    }
                  ),
                  mem > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    (mem / 1024 / 1024).toFixed(0),
                    " MB"
                  ] })
                ] })
              ]
            },
            p2.node.id
          );
        })
      ] }),
      topology.standalone.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { fontSize: 14, margin: "28px 0 6px", color: "var(--text-dim)" }, children: [
          "独立服务器 · ",
          topology.standalone.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { marginBottom: 12 }, children: "这些服务器没有出现在任何代理端的 [servers] 里，玩家连不上它们， 只能各自直连。" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 12 }, children: topology.standalone.map((n2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: `topo-node ${n2.id === activeId ? "active" : ""}`,
            style: { position: "relative", width: NODE_W },
            onClick: () => {
              select(n2.id);
              onOpenServer(n2.id, "console");
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tn-head", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `dot ${n2.status}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tn-name", children: n2.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tn-sub", children: [
                n2.kind && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: kindLabel(n2.kind) }),
                n2.port != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mono", children: [
                  ":",
                  n2.port
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `tag ${n2.running ? "green" : ""}`, children: statusLabel(n2.status) })
              ] })
            ]
          },
          n2.id
        )) })
      ] })
    ] })
  ] });
}
function computeLayout(topology, available) {
  const width = Math.max(520, available);
  const placed = [];
  const edges = [];
  let y2 = 0;
  for (const proxy of topology.proxies) {
    const px = (width - PROXY_W) / 2;
    placed.push({
      node: proxy.node,
      x: px,
      y: y2,
      w: PROXY_W,
      isProxy: true,
      isTry: false,
      forwardingOk: null,
      hasForwardingMod: true
    });
    const childY = y2 + PROXY_W * 0 + ROW_GAP;
    const n2 = proxy.backends.length;
    const cols = Math.max(1, Math.min(PER_ROW, Math.floor((width + GAP_X) / (NODE_W + GAP_X))));
    const rows = Math.ceil(n2 / cols);
    proxy.backends.forEach((b, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const inRow = Math.min(cols, n2 - row * cols);
      const rowW = inRow * NODE_W + (inRow - 1) * GAP_X;
      const startX = (width - rowW) / 2;
      const x2 = startX + col * (NODE_W + GAP_X);
      const cy = childY + row * (NODE_H + GAP_Y);
      const edge = proxy.edges.find((e) => e.backendId === b.id);
      const isTry = edge?.isTry ?? false;
      const hasFw = Boolean(edge?.proxyMod);
      const ok2 = edge?.secretOk ?? null;
      placed.push({
        node: b,
        x: x2,
        y: cy,
        w: NODE_W,
        isProxy: false,
        isTry,
        forwardingOk: ok2,
        hasForwardingMod: hasFw
      });
      const sx = px + PROXY_W / 2;
      const sy = y2 + NODE_H;
      const ex = x2 + NODE_W / 2;
      const ey = cy;
      const midY = sy + (ey - sy) * 0.55;
      edges.push({
        d: `M ${sx} ${sy} C ${sx} ${midY}, ${ex} ${midY}, ${ex} ${ey}`,
        color: isTry ? "#22c55e" : b.managed ? "#3f3f46" : "#2f2f2f",
        isTry,
        dashed: !b.managed,
        dim: !b.managed,
        // try 的边标一下「默认入口」，放在曲线中点上方
        labelX: isTry ? (sx + ex) / 2 + 6 : null,
        labelY: isTry ? (sy + ey) / 2 - 6 : null
      });
    });
    y2 = childY + rows * (NODE_H + GAP_Y);
  }
  return { width, height: Math.max(y2, 200), placed, edges };
}
const WIDTH_LIMITS = {
  side: { min: 240, max: 620 },
  panel: { min: 320, max: 900 }
};
const DEFAULT_UI = {
  sideWidth: 300,
  panelWidth: 360,
  backgroundOpacity: 1,
  surfaceOpacity: 0.86
};
function clampWidth(kind, px) {
  const { min, max } = WIDTH_LIMITS[kind];
  if (!Number.isFinite(px)) return kind === "side" ? DEFAULT_UI.sideWidth : DEFAULT_UI.panelWidth;
  return Math.round(Math.min(max, Math.max(min, px)));
}
const RAIL_W = 62;
const MIN_MAIN_W = 420;
function fitWidths(side, panel, viewport) {
  let nextSide = clampWidth("side", side);
  let nextPanel = clampWidth("panel", panel);
  if (!viewport || !Number.isFinite(viewport) || viewport <= 0) {
    return { side: nextSide, panel: nextPanel };
  }
  const budget = viewport - RAIL_W - MIN_MAIN_W;
  let over = nextSide + nextPanel - budget;
  if (over > 0) {
    const take = Math.min(over, nextPanel - WIDTH_LIMITS.panel.min);
    nextPanel -= take;
    over -= take;
  }
  if (over > 0) {
    const take = Math.min(over, nextSide - WIDTH_LIMITS.side.min);
    nextSide -= take;
    over -= take;
  }
  return { side: nextSide, panel: nextPanel };
}
function clampOpacity(v2, fallback) {
  if (!Number.isFinite(v2)) return fallback;
  return Math.min(1, Math.max(0, v2));
}
function uiStyle(settings, backgroundUrl, viewportWidth = null) {
  const fitted = fitWidths(
    clampWidth("side", settings?.sideWidth ?? DEFAULT_UI.sideWidth),
    clampWidth("panel", settings?.panelWidth ?? DEFAULT_UI.panelWidth),
    viewportWidth
  );
  const sideWidth = fitted.side;
  const panelWidth = fitted.panel;
  const path = settings?.backgroundImage?.trim() ?? "";
  const hasBackground = Boolean(path && backgroundUrl);
  const backgroundOpacity = clampOpacity(
    settings?.backgroundOpacity ?? DEFAULT_UI.backgroundOpacity,
    DEFAULT_UI.backgroundOpacity
  );
  const surfaceOpacity = clampOpacity(
    settings?.surfaceOpacity ?? DEFAULT_UI.surfaceOpacity,
    DEFAULT_UI.surfaceOpacity
  );
  return {
    vars: {
      "--side-w": `${sideWidth}px`,
      "--panel-w": `${panelWidth}px`,
      "--surface-alpha": String(surfaceOpacity)
    },
    hasBackground,
    background: hasBackground && backgroundUrl ? { image: backgroundUrl, opacity: backgroundOpacity } : null
  };
}
function SettingsView() {
  const settings = useStore((s) => s.settings);
  const javaList = useStore((s) => s.javaList);
  const toast = useStore((s) => s.toast);
  const servers = useStore((s) => s.servers);
  const refresh = useStore((s) => s.refresh);
  const pythonList = useStore((s) => s.pythonList);
  const backgroundError = useStore((s) => s.backgroundError);
  const refreshPython = useStore((s) => s.refreshPython);
  const [scanning, setScanning] = reactExports.useState(false);
  const [scanningPython, setScanningPython] = reactExports.useState(false);
  const [installingMcdr, setInstallingMcdr] = reactExports.useState(false);
  const [info, setInfo] = reactExports.useState(null);
  reactExports.useEffect(() => {
    void window.api.app.info().then((r2) => r2.ok && setInfo(r2.data));
  }, []);
  reactExports.useEffect(() => {
    if (!javaList.length) void scanJava();
  }, []);
  const scanJava = async () => {
    setScanning(true);
    const res = await window.api.java.detect();
    setScanning(false);
    if (res.ok) {
      toast(`找到 ${res.data.length} 个 Java 运行环境`, "success");
    } else {
      toast(res.error ?? "扫描失败", "error");
    }
  };
  const scanPython = async () => {
    setScanningPython(true);
    const list = await refreshPython();
    setScanningPython(false);
    if (!list.length) {
      toast("没有找到 Python，MCDReforged 需要它才能跑", "error");
      return;
    }
    const ready = list.filter((p2) => p2.suitable && p2.mcdr).length;
    toast(
      ready ? `找到 ${list.length} 个 Python，其中 ${ready} 个可以直接跑 MCDReforged` : `找到 ${list.length} 个 Python，但都还没装 mcdreforged`,
      ready ? "success" : "info"
    );
  };
  const pickPython = async () => {
    const res = await window.api.app.pickFile("选择 python.exe");
    if (!res.ok || !res.data) return;
    const list = await refreshPython(res.data);
    if (!list.length) {
      toast("这个文件不是能用的 python.exe", "error");
      return;
    }
    void patch({ pythonPath: res.data });
  };
  const installMcdrFor = async (path) => {
    setInstallingMcdr(true);
    toast("正在用 pip 安装 mcdreforged…", "info");
    const res = await window.api.python.installMcdr(path);
    setInstallingMcdr(false);
    if (res.ok) {
      await refreshPython();
      void patch({ pythonPath: path });
      toast(`MCDReforged ${res.data?.mcdr ?? ""} 已就绪`, "success");
    } else {
      toast(res.error ?? "安装失败", "error");
    }
  };
  const pickBackground = async () => {
    const res = await window.api.app.pickFile("选择背景图片", "image");
    if (!res.ok || !res.data) return;
    const probe = await window.api.app.readImage(res.data);
    if (!probe.ok) {
      toast(probe.error ?? "这张图片用不了", "error");
      return;
    }
    void patch({ backgroundImage: res.data });
    toast(`背景已换成 ${res.data.split(/[\/]/).pop()}`, "success");
  };
  const resetAppearance = () => {
    void patch({
      sideWidth: DEFAULT_UI.sideWidth,
      panelWidth: DEFAULT_UI.panelWidth,
      backgroundImage: "",
      backgroundOpacity: DEFAULT_UI.backgroundOpacity,
      surfaceOpacity: DEFAULT_UI.surfaceOpacity
    });
    toast("外观已恢复默认", "success");
  };
  const patch = async (p2) => {
    const res = await window.api.settings.patch(p2);
    if (res.ok) useStore.setState({ settings: res.data });
    else toast(res.error ?? "保存失败", "error");
  };
  if (!settings) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "center-state", children: "正在读取设置…" });
  const pickJava = async () => {
    const res = await window.api.app.pickFile("选择 java.exe");
    if (!res.ok || !res.data) return;
    const probe = await window.api.java.probe(res.data);
    if (probe.ok) {
      useStore.setState((s) => ({
        javaList: [probe.data, ...s.javaList.filter((j) => j.path !== probe.data.path)]
      }));
    }
    void patch({ javaPath: res.data });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dash", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "个性化" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "左侧列表宽度", hint: `${WIDTH_LIMITS.side.min} ~ ${WIDTH_LIMITS.side.max} px`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "range",
            type: "range",
            min: WIDTH_LIMITS.side.min,
            max: WIDTH_LIMITS.side.max,
            step: 2,
            value: clampWidth("side", settings.sideWidth),
            onChange: (e) => void patch({ sideWidth: clampWidth("side", Number(e.target.value)) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "input narrow",
            type: "number",
            min: WIDTH_LIMITS.side.min,
            max: WIDTH_LIMITS.side.max,
            value: clampWidth("side", settings.sideWidth),
            onChange: (e) => void patch({ sideWidth: clampWidth("side", Number(e.target.value)) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hint", children: "px" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Field,
        {
          label: "右侧面板宽度",
          hint: `${WIDTH_LIMITS.panel.min} ~ ${WIDTH_LIMITS.panel.max} px`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "range",
                type: "range",
                min: WIDTH_LIMITS.panel.min,
                max: WIDTH_LIMITS.panel.max,
                step: 2,
                value: clampWidth("panel", settings.panelWidth),
                onChange: (e) => void patch({ panelWidth: clampWidth("panel", Number(e.target.value)) })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input narrow",
                type: "number",
                min: WIDTH_LIMITS.panel.min,
                max: WIDTH_LIMITS.panel.max,
                value: clampWidth("panel", settings.panelWidth),
                onChange: (e) => void patch({ panelWidth: clampWidth("panel", Number(e.target.value)) })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hint", children: "px" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "背景图片", hint: "铺满窗口", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn sm", onClick: () => void pickBackground(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "image", size: 14 }),
          "选择图片"
        ] }),
        settings.backgroundImage && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hint ellipsis", title: settings.backgroundImage, children: settings.backgroundImage.split(/[\/]/).pop() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn sm ghost",
              onClick: () => void patch({ backgroundImage: "" }),
              children: "清除"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "背景不透明度", hint: "图的可见程度", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "range",
            type: "range",
            min: 0,
            max: 100,
            step: 1,
            disabled: !settings.backgroundImage,
            value: Math.round(settings.backgroundOpacity * 100),
            onChange: (e) => void patch({ backgroundOpacity: Number(e.target.value) / 100 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hint num-hint", children: [
          Math.round(settings.backgroundOpacity * 100),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "界面不透明度", hint: "越低越透", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "range",
            type: "range",
            min: 20,
            max: 100,
            step: 1,
            value: Math.round(settings.surfaceOpacity * 100),
            onChange: (e) => void patch({ surfaceOpacity: Number(e.target.value) / 100 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hint num-hint", children: [
          Math.round(settings.surfaceOpacity * 100),
          "%"
        ] })
      ] }),
      backgroundError && settings.backgroundImage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint form-note", style: { color: "var(--warn)", marginBottom: 4 }, children: [
        "这张背景图现在读不出来，已经按「没有背景」显示：",
        backgroundError
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint form-note", style: { marginBottom: 10 }, children: [
        "两侧宽度也可以直接把鼠标移到分界线上拖动，双击分界线恢复默认。",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "背景图支持 png / jpg / webp / gif / bmp，32 MB 以内，会按窗口比例铺满（居中裁切）。",
        settings.backgroundImage ? "" : " 没选背景图时，「界面不透明度」不会有变化。"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "恢复默认", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn sm", onClick: resetAppearance, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "refresh", size: 14 }),
        "恢复默认外观"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Java 运行环境" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "默认 Java", hint: "新建服务器时默认使用这个", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "select",
            value: settings.javaPath,
            onChange: (e) => void patch({ javaPath: e.target.value }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "未设置" }),
              javaList.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: j.path, children: [
                "Java ",
                j.major || "?",
                " · ",
                j.version,
                " · ",
                j.vendor
              ] }, j.path))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm", onClick: () => void pickJava(), children: "浏览" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn sm", disabled: scanning, onClick: () => void scanJava(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "refresh", size: 14 }),
          scanning ? "扫描中…" : "重新扫描"
        ] })
      ] }),
      javaList.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 8 }, children: javaList.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "server-icon",
            style: {
              background: j.major >= 17 ? "#22c55e" : "#f59e0b",
              width: 30,
              height: 30,
              fontSize: 11
            },
            children: j.major || "?"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-main", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-title", children: [
            "Java ",
            j.major,
            " · ",
            j.version,
            j.major >= 21 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag green", children: "支持 1.21" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row-sub", title: j.path, children: j.path })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row-actions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn sm ghost",
            onClick: () => toast(
              `1.20.5 及以上需要 Java ${requiredJavaMajor("1.21")}，1.17~1.20.4 需要 Java 17`,
              "info"
            ),
            children: "版本要求"
          }
        ) })
      ] }, j.path)) }),
      !javaList.length && !scanning && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { marginTop: 8 }, children: "没有找到 Java。请安装 JDK / JRE，或者手动指定 java.exe 的路径。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Python / MCDReforged" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "默认 Python", hint: "用 MCDReforged 托管服务器时默认使用这个", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "select",
            value: settings.pythonPath,
            onChange: (e) => void patch({ pythonPath: e.target.value }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "未设置" }),
              pythonList.map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p2.path, children: [
                "Python ",
                p2.version,
                p2.mcdr ? ` · MCDR ${p2.mcdr}` : ""
              ] }, p2.path))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm", onClick: () => void pickPython(), children: "浏览" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn sm", disabled: scanningPython, onClick: () => void scanPython(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "refresh", size: 14 }),
          scanningPython ? "检测中…" : "重新检测"
        ] })
      ] }),
      pythonList.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 8 }, children: pythonList.map((p2) => {
        const canRun = p2.suitable && Boolean(p2.mcdr);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "server-icon",
              style: {
                background: canRun ? "#22c55e" : p2.suitable ? "#f59e0b" : "#6b7280",
                width: 30,
                height: 30,
                fontSize: 11
              },
              children: [
                p2.major,
                ".",
                p2.minor
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-main", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-title", children: [
              "Python ",
              p2.version,
              p2.mcdr ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag green", children: [
                "MCDReforged ",
                p2.mcdr
              ] }) : p2.suitable ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag orange", children: "未装 mcdreforged" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: "版本过低" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row-sub", title: p2.path, children: p2.path })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row-actions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "btn sm ghost",
              disabled: !p2.suitable || installingMcdr,
              title: p2.suitable ? "pip install --upgrade mcdreforged" : "MCDReforged 需要 Python 3.8 及以上",
              onClick: () => void installMcdrFor(p2.path),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "download", size: 14 }),
                p2.mcdr ? "更新 MCDR" : "安装 MCDR"
              ]
            }
          ) })
        ] }, p2.path);
      }) }),
      !pythonList.length && !scanningPython && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { marginTop: 8 }, children: [
        "没有找到 Python。MCDReforged 是个 Python 程序，要装它得先有",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: " python.exe" }),
        "：去 python.org 装 3.8 以上的版本（勾上 Add to PATH）， 或者用 Microsoft Store 装，然后点「重新检测」。",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "只用原版 / Paper / Forge 这些服务端的话，不需要 Python。"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "新建服务器的默认值" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "默认最小内存", hint: "单位 MB", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          type: "number",
          min: 128,
          step: 256,
          value: settings.defaultMemoryMin,
          onChange: (e) => void patch({ defaultMemoryMin: Number(e.target.value) })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "默认最大内存", hint: "单位 MB", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          type: "number",
          min: 256,
          step: 256,
          value: settings.defaultMemoryMax,
          onChange: (e) => void patch({ defaultMemoryMax: Number(e.target.value) })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "默认 JVM 参数", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          className: "textarea",
          value: settings.defaultJvmArgs,
          onChange: (e) => void patch({ defaultJvmArgs: e.target.value })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "下载源" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "CurseForge API Key", hint: "留空则 CurseForge 源不可用", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "input",
            type: "password",
            value: settings.curseforgeApiKey,
            placeholder: "粘贴 CurseForge 的 API Key",
            spellCheck: false,
            onChange: (e) => void patch({ curseforgeApiKey: e.target.value })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "btn sm",
            onClick: () => void window.api.app.openExternal("https://console.curseforge.com/?#/api-keys"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "external", size: 14 }),
              "去申请"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint form-note", children: [
        "CurseForge 官方 API 不接受匿名请求，必须带 Key。免费申请，填进来即可在「下载扩展」里搜索。",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Modrinth 和 Hangar 不需要 Key，SpigotMC 用第三方 Spiget 接口。"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "行为" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "退出时自动停止所有服务器", hint: "避免留下后台 Java 进程", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Switch,
        {
          checked: settings.stopOnExit,
          onChange: (v2) => void patch({ stopOnExit: v2 })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "日志保留行数", hint: "主进程内存中保留的日志上限", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          type: "number",
          min: 500,
          max: 5e4,
          step: 500,
          value: settings.maxLogLines,
          onChange: (e) => void patch({ maxLogLines: Number(e.target.value) })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "数据" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "服务器总数", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hint", children: [
        servers.length,
        " 个"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "配置文件", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn sm", onClick: () => void window.api.app.revealUserData(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "folder-open", size: 14 }),
        "打开配置目录"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "刷新列表", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "btn sm",
          onClick: () => {
            void refresh();
            void useStore.getState().init();
            toast("已重新载入", "success");
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "refresh", size: 14 }),
            "重新载入"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "内存参考" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { lineHeight: 2 }, children: [
        "原版服务端 2~4 GB 通常够用；装了 50 个插件建议 6 GB 以上；",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "模组服按模组数量给，一般每个大型模组预留 100~200 MB。",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "建议最大内存不要超过物理内存的 70%，把余量留给系统和存档缓存。"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "运行环境" }),
      info && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { padding: "12px 14px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(EnvRow, { k: "CraftDesk 版本", v: info.version }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EnvRow, { k: "Electron / Chromium", v: `${info.electron} / ${info.chrome}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EnvRow, { k: "Node.js", v: info.node }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EnvRow, { k: "平台", v: info.platform }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EnvRow,
          {
            k: "本次启动",
            v: new Date(info.startedAt).toLocaleString("zh-CN", { hour12: false })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EnvRow,
          {
            k: "配置存放位置",
            v: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              info.portable && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag green", children: "便携模式" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: "var(--mono)", wordBreak: "break-all" }, children: info.userData }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { marginTop: 2 }, children: info.dataNote })
            ] }),
            mono: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { marginTop: 8 }, children: "「本次启动」早于你最后一次改动的话，说明跑的还是旧实例—— 关掉窗口重开即可。" })
    ] })
  ] }) });
}
function EnvRow({ k: k2, v: v2, mono }) {
  const row = {
    display: "flex",
    gap: 16,
    padding: "5px 0",
    fontSize: 12.5,
    borderBottom: "1px solid var(--border-soft)"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: row, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--text-muted)", width: 170, flexShrink: 0 }, children: k2 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        style: {
          color: "var(--text-dim)",
          fontFamily: mono ? "var(--mono)" : void 0,
          wordBreak: "break-all",
          flex: 1
        },
        children: v2
      }
    )
  ] });
}
function fileVisual(entry) {
  if (entry.isDir) {
    if (["plugins", "mods"].includes(entry.name)) return { icon: "puzzle", color: "#f59e0b" };
    if (entry.name === "world") return { icon: "globe", color: "#22c55e" };
    if (["logs", "crash-reports"].includes(entry.name)) return { icon: "file-text", color: "#f87171" };
    if (entry.name === "backups") return { icon: "archive", color: "#a855f7" };
    if (entry.name === "config") return { icon: "sliders", color: "#60a5fa" };
    return { icon: "folder", color: "#8a8a8a" };
  }
  if (entry.ext === ".jar") return { icon: "package", color: "#f59e0b" };
  if (entry.ext === ".log" || entry.ext === ".txt") return { icon: "file-text", color: "#9ca3af" };
  if (entry.ext === ".json" || entry.ext === ".yml" || entry.ext === ".yaml" || entry.ext === ".properties")
    return { icon: "sliders", color: "#60a5fa" };
  if (entry.ext === ".bat" || entry.ext === ".sh" || entry.ext === ".cmd")
    return { icon: "terminal", color: "#4ade80" };
  if ([".dat", ".mca", ".nbt"].includes(entry.ext)) return { icon: "box", color: "#a78bfa" };
  return { icon: "file", color: "#8a8a8a" };
}
function FilesPanel({ server }) {
  const toast = useStore((s) => s.toast);
  const [cwd, setCwd] = reactExports.useState("");
  const [entries, setEntries] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [query, setQuery] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState(null);
  const [confirmDelete, setConfirmDelete] = reactExports.useState(null);
  const [renaming, setRenaming] = reactExports.useState(null);
  const [renameValue, setRenameValue] = reactExports.useState("");
  const [editing, setEditing] = reactExports.useState(
    null
  );
  const sizeCache = reactExports.useRef(/* @__PURE__ */ new Map());
  const [, bumpSizes] = reactExports.useState(0);
  const load = async (rel) => {
    setLoading(true);
    const res = await window.api.fs.list(server.dir, rel);
    setLoading(false);
    if (!res.ok) {
      toast(res.error ?? "读取目录失败", "error");
      return;
    }
    setEntries(res.data);
    setCwd(rel);
    setSelected(null);
  };
  reactExports.useEffect(() => {
    setCwd("");
    sizeCache.current.clear();
    void load("");
  }, [server.id]);
  reactExports.useEffect(() => {
    const pending = entries.filter((e) => e.isDir && !sizeCache.current.has(e.path));
    if (!pending.length) return;
    let cancelled = false;
    let cursor = 0;
    const CONCURRENCY = 2;
    const worker = async () => {
      while (!cancelled && cursor < pending.length) {
        const entry = pending[cursor++];
        const res = await window.api.fs.dirSize(server.dir, entry.path);
        if (cancelled) return;
        sizeCache.current.set(
          entry.path,
          res.ok ? { bytes: res.data.bytes, partial: res.data.partial } : { bytes: 0, partial: false }
        );
        bumpSizes((v2) => v2 + 1);
      }
    };
    void Promise.all(
      Array.from({ length: Math.min(CONCURRENCY, pending.length) }, () => worker())
    );
    return () => {
      cancelled = true;
    };
  }, [entries, server.dir]);
  const total = reactExports.useMemo(() => {
    let bytes = 0;
    let incomplete = false;
    for (const e of entries) {
      if (e.isDir) {
        const s = sizeCache.current.get(e.path);
        if (s) bytes += s.bytes;
        else incomplete = true;
      } else {
        bytes += e.size;
      }
    }
    return { bytes, incomplete };
  }, [entries, sizeCache.current.size]);
  const filtered = reactExports.useMemo(() => {
    const q2 = query.trim().toLowerCase();
    if (!q2) return entries;
    return entries.filter((e) => e.name.toLowerCase().includes(q2));
  }, [entries, query]);
  const open = async (e) => {
    if (e.isDir) {
      await load(e.path);
      return;
    }
    if ([".jar", ".zip", ".gz", ".png", ".jpg", ".jpeg", ".ico", ".dat", ".mca"].includes(e.ext)) {
      void window.api.fs.open(server.dir, e.path);
      return;
    }
    const res = await window.api.fs.read(server.dir, e.path);
    if (!res.ok) {
      toast(res.error ?? "读取失败", "error");
      return;
    }
    if (res.data.binary) {
      toast("这是二进制文件，已经用系统默认程序打开", "info");
      void window.api.fs.open(server.dir, e.path);
      return;
    }
    setEditing({ path: e.path, content: res.data.content, truncated: res.data.truncated });
  };
  const segments = cwd ? cwd.split("/") : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-search", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "search", size: 14 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: query,
          onChange: (e) => setQuery(e.target.value),
          placeholder: "搜索文件",
          spellCheck: false
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "crumb", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void load(""), title: server.dir, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "server", size: 13 }) }),
      segments.map((seg, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "chevron-right", size: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void load(segments.slice(0, i + 1).join("/")), children: seg })
      ] }, i)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toolbar-spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "icon-btn",
          style: { width: 24, height: 24 },
          title: "在资源管理器中打开",
          onClick: () => void window.api.fs.reveal(server.dir, cwd),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "external", size: 13 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "icon-btn",
          style: { width: 24, height: 24 },
          title: "新建文件夹",
          onClick: async () => {
            const name = `新建文件夹`;
            let target = cwd ? `${cwd}/${name}` : name;
            let i = 1;
            while (entries.some((e) => e.name === target.split("/").pop())) {
              target = cwd ? `${cwd}/${name}${i}` : `${name}${i}`;
              i++;
            }
            const res = await window.api.fs.mkdir(server.dir, target);
            if (res.ok) void load(cwd);
            else toast(res.error ?? "创建失败", "error");
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "plus", size: 14 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "icon-btn",
          style: { width: 24, height: 24 },
          title: "重算目录大小",
          onClick: () => {
            sizeCache.current.clear();
            bumpSizes((v2) => v2 + 1);
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "refresh", size: 13 })
        }
      )
    ] }),
    entries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { padding: "0 12px 6px" }, children: [
      "合计 ",
      total.incomplete ? "≥ " : "",
      formatBytes(total.bytes),
      total.incomplete && "（正在统计子目录…）"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-scroll", children: [
      loading && entries.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-empty", children: "正在读取…" }),
      !loading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-empty", children: query ? "没有匹配的文件" : "这个目录是空的" }),
      cwd && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "file-row",
          onClick: () => void load(segments.slice(0, -1).join("/")),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "chevron-left", size: 15 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fname", children: "返回上一级" })
          ]
        }
      ),
      filtered.map((e) => {
        const v2 = fileVisual(e);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `file-row ${selected === e.path ? "selected" : ""} ${e.hidden ? "hidden-file" : ""}`,
            onClick: () => setSelected(e.path),
            onDoubleClick: () => void open(e),
            title: `${e.name}
${e.isDir ? "文件夹" : formatBytes(e.size)} · ${formatDateTime(e.mtime)}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: v2.icon, size: 16, style: { color: v2.color } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fname", children: e.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fsize", children: e.isDir ? (() => {
                const s = sizeCache.current.get(e.path);
                if (!s) return "…";
                return `${s.partial ? "≥ " : ""}${formatBytes(s.bytes)}`;
              })() : formatBytes(e.size) }),
              selected === e.path && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "row-actions", children: [
                !e.isDir && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    className: "icon-btn",
                    style: { width: 22, height: 22 },
                    title: "编辑",
                    onClick: (ev) => {
                      ev.stopPropagation();
                      void open(e);
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "edit", size: 13 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    className: "icon-btn",
                    style: { width: 22, height: 22 },
                    title: "重命名",
                    onClick: (ev) => {
                      ev.stopPropagation();
                      setRenaming(e);
                      setRenameValue(e.name);
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "file-text", size: 13 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    className: "icon-btn",
                    style: { width: 22, height: 22 },
                    title: "删除（移到回收站）",
                    onClick: (ev) => {
                      ev.stopPropagation();
                      setConfirmDelete(e);
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "trash", size: 13 })
                  }
                )
              ] })
            ]
          },
          e.path
        );
      })
    ] }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx(
      FileEditor,
      {
        server,
        path: editing.path,
        initial: editing.content,
        truncated: editing.truncated,
        onClose: () => setEditing(null),
        onSaved: () => void load(cwd)
      }
    ),
    confirmDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Confirm,
      {
        title: "删除文件",
        danger: true,
        confirmText: "移到回收站",
        message: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "确定要删除 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: confirmDelete.name }),
          " 吗？",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          confirmDelete.isDir && "整个文件夹连同里面的东西一起删。",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "默认移到系统回收站，可以恢复；回收站不可用时才会直接删除。"
        ] }),
        onCancel: () => setConfirmDelete(null),
        onConfirm: async () => {
          const target = confirmDelete;
          setConfirmDelete(null);
          const res = await window.api.fs.remove(server.dir, target.path);
          if (res.ok) {
            toast(
              res.data.how === "trash" ? "已移到回收站" : "已删除（回收站不可用，是永久删除）",
              res.data.how === "trash" ? "success" : "info"
            );
            void load(cwd);
          } else {
            toast(res.error ?? "删除失败", "error");
          }
        }
      }
    ),
    renaming && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Confirm,
      {
        title: "重命名",
        confirmText: "确定",
        message: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "input",
            autoFocus: true,
            value: renameValue,
            onChange: (ev) => setRenameValue(ev.target.value),
            onKeyDown: (ev) => ev.key === "Enter" && ev.currentTarget.blur()
          }
        ),
        onCancel: () => setRenaming(null),
        onConfirm: async () => {
          const target = renaming;
          setRenaming(null);
          if (!renameValue.trim() || renameValue === target.name) return;
          const res = await window.api.fs.rename(server.dir, target.path, renameValue.trim());
          if (res.ok) void load(cwd);
          else toast(res.error ?? "重命名失败", "error");
        }
      }
    )
  ] });
}
function PlayersPanel({ server }) {
  const toast = useStore((s) => s.toast);
  const [players, setPlayers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [query, setQuery] = reactExports.useState("");
  const [newName, setNewName] = reactExports.useState("");
  const onlineCount = server.runtime.onlineCount;
  const load = reactExports.useCallback(async () => {
    const res = await window.api.players.list(server.id);
    setLoading(false);
    if (res.ok) setPlayers(res.data);
    else toast(res.error ?? "读取玩家数据失败", "error");
  }, [server.id, toast]);
  reactExports.useEffect(() => {
    setLoading(true);
    void load();
  }, [load, onlineCount]);
  const act = async (kind, name, value) => {
    const api = window.api.players;
    const res = kind === "op" ? await api.setOp(server.id, name, value) : kind === "whitelist" ? await api.setWhitelist(server.id, name, value) : await api.setBanned(server.id, name, value);
    if (!res.ok) toast(res.error ?? "操作失败", "error");
    else void load();
  };
  const filtered = players.filter(
    (p2) => !query.trim() || p2.name.toLowerCase().includes(query.trim().toLowerCase())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-search", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "search", size: 14 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: query,
          onChange: (e) => setQuery(e.target.value),
          placeholder: "搜索玩家",
          spellCheck: false
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, padding: "0 12px 8px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          style: { height: 30, fontSize: 12.5 },
          value: newName,
          placeholder: "输入玩家名添加",
          spellCheck: false,
          onChange: (e) => setNewName(e.target.value),
          onKeyDown: async (e) => {
            if (e.key !== "Enter" || !newName.trim()) return;
            await act("whitelist", newName.trim(), true);
            setNewName("");
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "btn sm",
          disabled: !newName.trim(),
          title: "加入白名单",
          onClick: async () => {
            await act("whitelist", newName.trim(), true);
            setNewName("");
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "user-plus", size: 14 }),
            "加白名单"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-scroll", children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-empty", children: "正在读取…" }),
      !loading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-empty", children: query ? "没有匹配的玩家" : "还没有玩家记录。\n玩家进入服务器后会出现在这里。" }),
      filtered.map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "server-icon",
            style: {
              background: p2.online ? "#22c55e" : "#3f3f46",
              width: 30,
              height: 30,
              fontSize: 11
            },
            children: p2.name.slice(0, 2).toUpperCase()
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-main", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-title", children: [
            p2.name,
            p2.online && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag green", children: "在线" }),
            p2.op && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag orange", children: "OP" }),
            p2.whitelisted && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag blue", children: "白名单" }),
            p2.banned && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag red", children: "已封禁" })
          ] }),
          p2.uuid && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row-sub", children: p2.uuid })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `btn sm ghost ${p2.op ? "primary" : ""}`,
              title: p2.op ? "取消 OP" : "设为 OP",
              onClick: () => void act("op", p2.name, !p2.op),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "shield", size: 14 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn sm ghost",
              title: p2.whitelisted ? "移出白名单" : "加入白名单",
              style: p2.whitelisted ? { color: "var(--accent)" } : void 0,
              onClick: () => void act("whitelist", p2.name, !p2.whitelisted),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "check", size: 14 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn sm ghost",
              title: p2.banned ? "解除封禁" : "封禁",
              style: p2.banned ? { color: "var(--danger)" } : void 0,
              onClick: () => void act("ban", p2.name, !p2.banned),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "ban", size: 14 })
            }
          )
        ] })
      ] }, p2.name))
    ] })
  ] });
}
const RING1 = 170;
const RING2 = 320;
const DEFAULT_LIMIT = 150;
function pickCenter(items, focusPath) {
  if (!items.length) return null;
  if (focusPath) {
    const hit = items.find((i) => i.path === focusPath);
    if (hit) return hit;
  }
  return [...items].sort((a, b) => b.usedBy.length - a.usedBy.length)[0] ?? null;
}
function buildStarGraph(items, focusPath, limit = DEFAULT_LIMIT) {
  const total = items.length;
  const byPath = new Map(items.map((i) => [i.path, i]));
  const center = pickCenter(items, focusPath);
  if (!center) {
    return { nodes: [], links: [], total, hidden: 0, center: null };
  }
  const cap = Math.max(5, limit);
  const nodes = [];
  const links = [];
  const placed = /* @__PURE__ */ new Set();
  const degreeOf = (i) => i.requires.length + i.usedBy.length;
  const centerNode = {
    key: center.path,
    name: center.name,
    modId: center.id,
    role: "center",
    x: 0,
    y: 0,
    radius: 26,
    degree: degreeOf(center),
    ring: 0,
    enabled: center.enabled,
    missing: false,
    focusable: true
  };
  nodes.push(centerNode);
  placed.add(center.path);
  const byDegree = (path) => {
    const item = path ? byPath.get(path) : null;
    return item ? degreeOf(item) : 0;
  };
  const deps = center.requires.filter((e) => e.state !== "platform").sort((a, b) => byDegree(b.provider) - byDegree(a.provider));
  const dependents = [...center.usedBy].sort((a, b) => byDegree(b.path) - byDegree(a.path));
  const put = (key, name, modId, role, ring, angleDeg, distance, focusable, opts = {}) => {
    const rad = angleDeg * Math.PI / 180;
    const degree = opts.degree ?? 0;
    const node = {
      key,
      name,
      modId,
      role,
      x: Math.cos(rad) * distance,
      y: Math.sin(rad) * distance,
      // 连得越多画得越大：一眼能看出哪个是枢纽
      radius: role === "center" ? 26 : 6 + Math.min(12, degree * 0.8),
      degree,
      ring,
      enabled: opts.enabled ?? true,
      missing: opts.missing ?? false,
      focusable
    };
    nodes.push(node);
    placed.add(key);
    return node;
  };
  const spread = (n2, start, end) => {
    if (n2 <= 0) return [];
    if (n2 === 1) return [(start + end) / 2];
    const step = (end - start) / (n2 - 1);
    return Array.from({ length: n2 }, (_, i) => start + step * i);
  };
  const ringPositions = (count, baseRadius, arc) => {
    const perLane = 18;
    const lanes = Math.min(4, Math.max(1, Math.ceil(count / perLane)));
    const laneGap = 74;
    const [a0, a1] = arc;
    return Array.from({ length: count }, (_, i) => {
      const lane = lanes === 1 ? 0 : i % lanes;
      const indexInLane = Math.floor(i / lanes);
      const inLane = Math.ceil((count - lane) / lanes);
      const offset = lane * (6 / Math.max(1, lanes));
      const angles = spread(inLane, a0 + offset, a1 + offset);
      return {
        angle: angles[indexInLane] ?? (a0 + a1) / 2,
        distance: baseRadius + lane * laneGap
      };
    });
  };
  const depArc = [
    180 - Math.min(86, 46 + deps.length),
    180 + Math.min(86, 46 + deps.length)
  ];
  const depPos = ringPositions(deps.length, RING1, depArc);
  deps.forEach((edge, i) => {
    const target = edge.provider ? byPath.get(edge.provider) : null;
    const key = target ? target.path : `missing:${edge.id}`;
    if (placed.has(key)) return;
    const pos = depPos[i];
    const node = put(
      key,
      target?.name ?? edge.id,
      target?.id ?? edge.id,
      "dep",
      1,
      pos?.angle ?? 180,
      pos?.distance ?? RING1,
      Boolean(target),
      {
        enabled: target ? target.enabled : false,
        missing: !target,
        degree: target ? degreeOf(target) : 0
      }
    );
    links.push({ from: key, to: center.path, hard: edge.hard });
    return node;
  });
  const depArc2 = [
    -Math.min(86, 46 + dependents.length),
    Math.min(86, 46 + dependents.length)
  ];
  const depPos2 = ringPositions(dependents.length, RING1, depArc2);
  dependents.forEach((ref, i) => {
    const target = byPath.get(ref.path);
    if (!target || placed.has(target.path)) return;
    const pos = depPos2[i];
    put(
      target.path,
      target.name,
      target.id,
      "dependent",
      1,
      pos?.angle ?? 0,
      pos?.distance ?? RING1,
      true,
      { enabled: target.enabled, degree: degreeOf(target) }
    );
    links.push({ from: target.path, to: center.path, hard: !ref.soft });
  });
  if (nodes.length < cap) {
    const firstRing = nodes.filter((n2) => n2.role === "dep" || n2.role === "dependent");
    let parentIndex = 0;
    for (const parent of firstRing) {
      parentIndex++;
      if (nodes.length >= cap) break;
      const item = byPath.get(parent.key);
      if (!item) continue;
      const parentAngle = Math.atan2(parent.y, parent.x) * 180 / Math.PI;
      const neighbours = [];
      for (const e of item.requires) {
        if (e.state === "platform") continue;
        if (e.provider && byPath.has(e.provider)) {
          neighbours.push({ key: e.provider, missing: false, hard: e.hard });
        } else if (e.state === "missing") {
          neighbours.push({ key: `missing:${e.id}`, missing: true, hard: e.hard });
        }
      }
      for (const u2 of item.usedBy) {
        if (byPath.has(u2.path)) neighbours.push({ key: u2.path, missing: false, hard: !u2.soft });
      }
      const fresh = neighbours.filter((n2) => !placed.has(n2.key)).slice(0, 3);
      const angles = spread(fresh.length, parentAngle - 20, parentAngle + 20);
      const ringOffset = parentIndex % 2 * 58;
      fresh.forEach((n2, i) => {
        if (nodes.length >= cap) return;
        const target = byPath.get(n2.key);
        put(
          n2.key,
          target?.name ?? n2.key.replace(/^missing:/, ""),
          target?.id ?? n2.key.replace(/^missing:/, ""),
          n2.missing ? "dep" : "related",
          2,
          angles[i] ?? parentAngle,
          RING2 + ringOffset,
          Boolean(target),
          {
            enabled: target ? target.enabled : false,
            missing: n2.missing,
            degree: target ? degreeOf(target) : 0
          }
        );
        links.push({ from: parent.key, to: n2.key, hard: n2.hard });
      });
    }
  }
  const trim = (list, keep) => {
    for (const n2 of [...list].sort((a, b) => b.degree - a.degree)) {
      if (keep.size >= cap) break;
      keep.add(n2.key);
    }
  };
  let hidden = Math.max(0, total - nodes.length);
  if (nodes.length > cap) {
    const keep = /* @__PURE__ */ new Set([centerNode.key]);
    trim(
      nodes.filter((n2) => n2.role === "dep" || n2.role === "dependent"),
      keep
    );
    trim(
      nodes.filter((n2) => n2.role === "related"),
      keep
    );
    const dropped = new Set(nodes.filter((n2) => !keep.has(n2.key)).map((n2) => n2.key));
    hidden += dropped.size;
    return {
      nodes: nodes.filter((n2) => keep.has(n2.key)),
      links: links.filter((l2) => !dropped.has(l2.from) && !dropped.has(l2.to)),
      total,
      hidden,
      center: centerNode
    };
  }
  return { nodes, links, total, hidden, center: centerNode };
}
function graphBounds(graph) {
  let minX = 0;
  let maxX = 0;
  let minY = 0;
  let maxY = 0;
  for (const n2 of graph.nodes) {
    minX = Math.min(minX, n2.x - n2.radius);
    maxX = Math.max(maxX, n2.x + n2.radius);
    minY = Math.min(minY, n2.y - n2.radius);
    maxY = Math.max(maxY, n2.y + n2.radius);
  }
  return { minX, maxX, minY, maxY };
}
const ROLE_COLOR = {
  center: "#f43f5e",
  dep: "#ef4444",
  dependent: "#3b82f6",
  related: "#71717a"
};
const ROLE_LABEL = {
  center: "当前模组",
  dep: "前置模组",
  dependent: "拓展模组",
  related: "联动模组"
};
function ModGraph({
  items,
  focusPath,
  serverName,
  onClose,
  onPick
}) {
  const [focus, setFocus] = reactExports.useState(focusPath ?? null);
  const [limit, setLimit] = reactExports.useState(String(DEFAULT_LIMIT));
  const [hover, setHover] = reactExports.useState(null);
  const [onlyEnabled, setOnlyEnabled] = reactExports.useState(false);
  const [view, setView] = reactExports.useState({ x: 0, y: 0, k: 1 });
  const dragRef = reactExports.useRef(null);
  const limitNum = Math.max(5, Math.min(2e3, Number(limit) || DEFAULT_LIMIT));
  const graph = reactExports.useMemo(() => {
    const list = onlyEnabled ? items.filter((i) => i.enabled) : items;
    return buildStarGraph(list, focus, limitNum);
  }, [items, focus, limitNum, onlyEnabled]);
  const hovered = hover ? graph.nodes.find((n2) => n2.key === hover) ?? null : null;
  const linkedKeys = reactExports.useMemo(() => {
    if (!hovered) return null;
    const set = /* @__PURE__ */ new Set([hovered.key]);
    for (const l2 of graph.links) {
      if (l2.from === hovered.key) set.add(l2.to);
      if (l2.to === hovered.key) set.add(l2.from);
    }
    return set;
  }, [hovered, graph.links]);
  const byKey = reactExports.useMemo(() => new Map(graph.nodes.map((n2) => [n2.key, n2])), [graph.nodes]);
  const bounds = graphBounds(graph);
  const padding = 90;
  const width = Math.max(320, bounds.maxX - bounds.minX + padding * 2);
  const height = Math.max(320, bounds.maxY - bounds.minY + padding * 2);
  const onMouseDown = (e) => {
    dragRef.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
  };
  const onMouseMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    setView((v2) => ({ ...v2, x: d.vx + (e.clientX - d.x), y: d.vy + (e.clientY - d.y) }));
  };
  const endDrag = () => {
    dragRef.current = null;
  };
  const onWheel = (e) => {
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    setView((v2) => {
      const k2 = Math.max(0.15, Math.min(4, v2.k * factor));
      const scale = k2 / v2.k;
      return { k: k2, x: cx - (cx - v2.x) * scale, y: cy - (cy - v2.y) * scale };
    });
  };
  const reset = () => {
    setFocus(focusPath ?? null);
    setView({ x: 0, y: 0, k: 1 });
  };
  const centerName = graph.center?.name ?? "（没有可显示的模组）";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      title: `模组关系星图 · ${centerName}`,
      onClose,
      size: "full",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hint", children: [
          "点节点换中心 · 拖拽平移 · 滚轮缩放",
          onPick && " · 双击跳到该模组"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spacer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => setView({ x: 0, y: 0, k: 1 }), children: "复位视图" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", onClick: onClose, children: "关闭" })
      ] }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "graph-bar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn sm", onClick: reset, disabled: !focusPath, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "refresh", size: 14 }),
            "回到当前模组位置"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "graph-field", children: [
            "模组数量限制",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input",
                style: { width: 78 },
                value: limit,
                onChange: (e) => setLimit(e.target.value.replace(/[^\d]/g, ""))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hint", children: [
            "共 ",
            graph.total,
            " 个",
            graph.hidden > 0 && `（图上 ${graph.nodes.length} 个，省去 ${graph.hidden} 个）`
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "graph-field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                className: "net-check",
                checked: onlyEnabled,
                onChange: (e) => setOnlyEnabled(e.target.checked)
              }
            ),
            "只看已启用"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spacer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "graph-legend", children: ["dep", "dependent", "related"].map((role) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "graph-legend-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "graph-dot", style: { background: ROLE_COLOR[role] } }),
            ROLE_LABEL[role]
          ] }, role)) })
        ] }),
        graph.nodes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-empty", children: [
          serverName,
          " 里没有可显示的扩展。装几个模组再来看看。"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "graph-canvas", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              width: "100%",
              height: "100%",
              viewBox: `${bounds.minX - padding} ${bounds.minY - padding} ${width} ${height}`,
              onMouseDown,
              onMouseMove,
              onMouseUp: endDrag,
              onMouseLeave: () => {
                endDrag();
                setHover(null);
              },
              onWheel,
              style: { cursor: dragRef.current ? "grabbing" : "grab" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: `translate(${view.x} ${view.y}) scale(${view.k})`, children: [
                graph.links.map((l2, i) => {
                  const a = byKey.get(l2.from);
                  const b = byKey.get(l2.to);
                  if (!a || !b) return null;
                  const dim = linkedKeys && !(linkedKeys.has(l2.from) && linkedKeys.has(l2.to));
                  const active = hovered && (l2.from === hovered.key || l2.to === hovered.key);
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "line",
                    {
                      x1: a.x,
                      y1: a.y,
                      x2: b.x,
                      y2: b.y,
                      stroke: active ? "#e4e4e7" : l2.hard ? "#52525b" : "#3f3f46",
                      strokeWidth: active ? 1.6 : 1,
                      strokeDasharray: l2.hard ? void 0 : "3 3",
                      opacity: dim ? 0.18 : 1
                    },
                    `${l2.from}->${l2.to}-${i}`
                  );
                }),
                graph.nodes.map((n2) => {
                  const dim = linkedKeys && !linkedKeys.has(n2.key);
                  const isHover = hovered?.key === n2.key;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "g",
                    {
                      transform: `translate(${n2.x} ${n2.y})`,
                      opacity: dim ? 0.25 : 1,
                      style: { cursor: n2.focusable ? "pointer" : "default" },
                      onMouseEnter: () => setHover(n2.key),
                      onClick: () => n2.focusable && setFocus(n2.key),
                      onDoubleClick: () => n2.focusable && onPick?.(n2.key),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "circle",
                          {
                            r: n2.radius,
                            fill: ROLE_COLOR[n2.role],
                            fillOpacity: n2.role === "related" ? 0.85 : 1,
                            stroke: isHover ? "#fafafa" : n2.missing ? "#fca5a5" : "transparent",
                            strokeWidth: isHover ? 2 : 1.5,
                            strokeDasharray: n2.missing ? "3 2" : void 0
                          }
                        ),
                        !n2.enabled && /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { r: n2.radius + 3, fill: "none", stroke: "#f59e0b", strokeWidth: 1.4 }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "text",
                          {
                            x: n2.x >= 0 ? n2.radius + 6 : -(n2.radius + 6),
                            y: 4,
                            textAnchor: n2.x >= 0 ? "start" : "end",
                            fontSize: n2.role === "center" ? 15 : 12,
                            fill: isHover ? "#fafafa" : "var(--text-dim)",
                            style: { pointerEvents: "none" },
                            children: [
                              n2.name,
                              n2.role === "center" && n2.modId ? `（${n2.modId}）` : ""
                            ]
                          }
                        )
                      ]
                    },
                    n2.key
                  );
                })
              ] })
            }
          ),
          hovered && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "graph-tip", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: hovered.name }),
            hovered.modId && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hint", children: [
              " · ",
              hovered.modId
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hint", children: [
              ROLE_LABEL[hovered.role],
              hovered.missing && " · 没有安装",
              !hovered.enabled && !hovered.missing && " · 被禁用",
              hovered.degree > 0 && ` · 关系 ${hovered.degree}`
            ] })
          ] })
        ] })
      ]
    }
  );
}
const KIND_META = {
  mcdr: {
    label: "MCDR 插件",
    short: "MCDR",
    icon: "zap",
    color: "#a855f7",
    tip: "Python 插件，由 MCDReforged 加载，改完在控制台执行 !!MCDR reload plugin 生效"
  },
  proxy: {
    label: "代理插件",
    short: "代理",
    icon: "globe",
    color: "#06b6d4",
    tip: "Velocity / BungeeCord 插件，由代理端加载，和下游服务端的插件互相独立"
  },
  plugin: {
    label: "服务端插件",
    short: "插件",
    icon: "puzzle",
    color: "#f59e0b",
    tip: "Bukkit 系插件，由服务端本体加载，需要重启服务器生效"
  },
  mod: {
    label: "模组",
    short: "模组",
    icon: "package",
    color: "#3b82f6",
    tip: "Fabric / Forge 模组，由服务端本体加载，需要重启服务器生效"
  }
};
const STATE_TEXT = {
  ok: "已安装",
  disabled: "已装但被禁用",
  missing: "没有安装",
  platform: "平台自带"
};
function PluginsPanel({ server }) {
  const toast = useStore((s) => s.toast);
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [query, setQuery] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const [status, setStatus] = reactExports.useState("all");
  const [busy, setBusy] = reactExports.useState(null);
  const [removing, setRemoving] = reactExports.useState(null);
  const [detail, setDetail] = reactExports.useState(null);
  const [flash, setFlash] = reactExports.useState(null);
  const [onlyProblems, setOnlyProblems] = reactExports.useState(false);
  const [sideFilter, setSideFilter] = reactExports.useState("all");
  const [showAllUsedBy, setShowAllUsedBy] = reactExports.useState(false);
  const [graphFocus, setGraphFocus] = reactExports.useState(void 0);
  const load = reactExports.useCallback(async () => {
    const res = await window.api.plugins.list(server.id);
    setLoading(false);
    if (res.ok) setItems(res.data);
    else toast(res.error ?? "读取失败", "error");
  }, [server.id, toast]);
  reactExports.useEffect(() => {
    setLoading(true);
    setFilter("all");
    void load();
  }, [load]);
  const counts = reactExports.useMemo(() => {
    const c = { mcdr: 0, proxy: 0, plugin: 0, mod: 0 };
    for (const i of items) c[i.kind]++;
    return c;
  }, [items]);
  const duplicatedIds = reactExports.useMemo(() => {
    const seen = /* @__PURE__ */ new Map();
    for (const i of items) {
      if (i.kind !== "mcdr") continue;
      const key = (i.id || i.name).toLowerCase();
      seen.set(key, (seen.get(key) ?? 0) + 1);
    }
    return new Set([...seen.entries()].filter(([, n2]) => n2 > 1).map(([k2]) => k2));
  }, [items]);
  const statusCounts = reactExports.useMemo(() => {
    const on = items.filter((i) => i.enabled).length;
    return { on, off: items.length - on };
  }, [items]);
  const problems = reactExports.useMemo(() => {
    const hasIssue = (i) => i.broken || i.requires.some((e) => e.hard && (e.state === "missing" || e.state === "disabled"));
    const list = items.filter(hasIssue);
    const missingIds = /* @__PURE__ */ new Set();
    const disabledIds = /* @__PURE__ */ new Set();
    for (const i of items) {
      for (const e of i.requires) {
        if (!e.hard) continue;
        if (e.state === "missing") missingIds.add(e.id);
        if (e.state === "disabled") disabledIds.add(e.id);
      }
    }
    return {
      items: list,
      missing: [...missingIds],
      disabled: [...disabledIds],
      broken: items.filter((i) => i.broken)
    };
  }, [items]);
  const sideCounts = reactExports.useMemo(() => {
    const c = { client: 0, server: 0, both: 0, unknown: 0 };
    for (const i of items) c[i.side]++;
    return c;
  }, [items]);
  const visible = reactExports.useMemo(() => {
    const q2 = query.trim().toLowerCase();
    return items.filter((i) => {
      if (filter !== "all" && i.kind !== filter) return false;
      if (status === "on" && !i.enabled) return false;
      if (status === "off" && i.enabled) return false;
      if (sideFilter !== "all" && i.side !== sideFilter) return false;
      if (onlyProblems && !problems.items.includes(i)) return false;
      if (!q2) return true;
      return i.name.toLowerCase().includes(q2) || i.file.toLowerCase().includes(q2) || i.id.toLowerCase().includes(q2) || i.author.toLowerCase().includes(q2);
    });
  }, [items, filter, status, query, onlyProblems, problems, sideFilter]);
  const openDetail = (p2) => {
    setShowAllUsedBy(false);
    setDetail(p2);
  };
  const jumpTo = (path) => {
    setDetail(null);
    setQuery("");
    setOnlyProblems(false);
    setStatus("all");
    setFlash(path);
    setTimeout(() => {
      const el2 = document.querySelector(`[data-dep-path="${CSS.escape(path)}"]`);
      el2?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 60);
    setTimeout(() => setFlash((cur) => cur === path ? null : cur), 2e3);
  };
  const running = server.runtime.status !== "stopped" && server.runtime.status !== "crashed";
  const toggle = async (p2) => {
    if (running) {
      toast(
        p2.kind === "mcdr" ? "建议先停止服务器，或在控制台执行 !!MCDR reload plugin" : "请先停止服务器再启用/禁用，否则改动不会生效",
        "info"
      );
    }
    setBusy(p2.path);
    const res = await window.api.plugins.toggle(server.id, p2.path);
    setBusy(null);
    if (res.ok) void load();
    else toast(res.error ?? "操作失败", "error");
  };
  const remove = async (p2) => {
    setRemoving(null);
    setBusy(p2.path);
    const res = await window.api.plugins.remove(server.id, p2.path);
    setBusy(null);
    if (!res.ok) {
      toast(res.error ?? "删除失败", "error");
      return;
    }
    toast(
      res.data.how === "trash" ? `${p2.file} 已移到回收站` : `${p2.file} 已删除（回收站不可用，是永久删除）`,
      res.data.how === "trash" ? "success" : "info"
    );
    void load();
  };
  const openDir = (kind) => {
    const first = items.find((i) => i.kind === kind);
    if (!first) return;
    const dir = first.group;
    void window.api.fs.open(server.dir, dir);
  };
  const present = ["mcdr", "proxy", "plugin", "mod"].filter((k2) => counts[k2] > 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    !loading && (problems.missing.length > 0 || problems.broken.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "issue-bar error", style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 15 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "issue-text", children: [
        problems.missing.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
            problems.missing.length,
            " 项前置没有安装"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hint", children: [
            "（",
            problems.missing.slice(0, 3).join("、"),
            problems.missing.length > 3 ? " 等" : "",
            "）"
          ] })
        ] }),
        problems.missing.length > 0 && problems.broken.length > 0 && " · ",
        problems.broken.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
            problems.broken.length,
            " 个文件损坏"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hint", children: "（读不出元数据，建议重新下载）" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm", onClick: () => setOnlyProblems((v2) => !v2), children: onlyProblems ? "看全部" : "只看有问题的" })
    ] }),
    !loading && problems.missing.length === 0 && problems.broken.length === 0 && problems.disabled.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "issue-bar", style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 15 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "issue-text", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
          problems.disabled.length,
          " 项前置被禁用"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hint", children: [
          "（",
          problems.disabled.slice(0, 3).join("、"),
          "）"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn sm", onClick: () => setOnlyProblems((v2) => !v2), children: onlyProblems ? "看全部" : "只看有问题的" })
    ] }),
    !loading && sideCounts.client > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "issue-bar", style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 15 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "issue-text", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
          sideCounts.client,
          " 个模组只在客户端生效"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hint", children: "：服务端会加载它们，但不产生任何作用。如果是镜像服这种要把 mods 同步给客户端的目录，留着是正常的；否则可以考虑清理。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "btn sm",
          onClick: () => setSideFilter((v2) => v2 === "client" ? "all" : "client"),
          children: sideFilter === "client" ? "看全部" : "只看这些"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-search", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "search", size: 14 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: query,
          onChange: (e) => setQuery(e.target.value),
          placeholder: "搜索名称、作者或 id",
          spellCheck: false
        }
      )
    ] }),
    present.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chips", style: { padding: "0 12px 8px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `chip-btn ${filter === "all" ? "active" : ""}`,
          onClick: () => setFilter("all"),
          children: [
            "全部 ",
            items.length
          ]
        }
      ),
      present.map((k2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `chip-btn ${filter === k2 ? "active" : ""}`,
          title: KIND_META[k2].tip,
          onClick: () => setFilter(k2),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip-dot", style: { background: KIND_META[k2].color } }),
            KIND_META[k2].label,
            " ",
            counts[k2]
          ]
        },
        k2
      ))
    ] }),
    items.length > 0 && statusCounts.off > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chips", style: { padding: "0 12px 8px" }, children: [
      ["all", `全部状态`],
      ["on", `已启用 ${statusCounts.on}`],
      ["off", `已禁用 ${statusCounts.off}`]
    ].map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: `chip-btn ${status === key ? "active" : ""}`,
        onClick: () => setStatus(key),
        children: label
      },
      key
    )) }),
    items.length > 0 && (sideCounts.client > 0 || sideCounts.server > 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chips", style: { padding: "0 12px 8px" }, children: [
      ["all", `全部生效范围`],
      ["client", `仅客户端 ${sideCounts.client}`],
      ["server", `仅服务端 ${sideCounts.server}`]
    ].filter(([key]) => key === "all" || sideCounts[key] > 0).map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: `chip-btn ${sideFilter === key ? "active" : ""}`,
        title: key === "client" ? "这些模组在服务端不起作用" : key === "server" ? "这些只在服务端 / 代理端生效，客户端不需要" : "按「在哪一侧生效」筛选",
        onClick: () => setSideFilter(key),
        children: label
      },
      key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "flex",
          gap: 6,
          padding: "0 12px 8px",
          justifyContent: "flex-end"
        },
        children: [
          present.map((k2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "icon-btn",
              style: { width: 24, height: 24, color: KIND_META[k2].color },
              title: `打开${KIND_META[k2].label}目录`,
              onClick: () => openDir(k2),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "folder-open", size: 13 })
            },
            k2
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "icon-btn",
              style: { width: 24, height: 24, color: "#818cf8" },
              title: "关系星图：以某个模组为中心看它牵涉到的一切",
              onClick: () => setGraphFocus(null),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "network", size: 13 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "icon-btn",
              style: { width: 24, height: 24 },
              title: "刷新",
              onClick: () => void load(),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "refresh", size: 13 })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-scroll", children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-empty", children: "正在读取扩展元数据…" }),
      !loading && items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-empty", children: [
        "没有找到任何插件或模组。",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "把对应的文件放进目录，重启服务器即可生效：",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hint", children: [
          "MCDR 插件 → plugins/*.mcdr",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "代理插件 → plugins/*.jar",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "服务端插件 → 服务端目录 plugins/*.jar",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "模组 → 服务端目录 mods/*.jar"
        ] })
      ] }),
      !loading && items.length > 0 && visible.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-empty", children: "没有匹配的结果" }),
      visible.map((p2) => {
        const meta = KIND_META[p2.kind];
        const dup = p2.kind === "mcdr" && duplicatedIds.has((p2.id || p2.name).toLowerCase());
        const missing = p2.requires.filter((e) => e.hard && e.state === "missing");
        const disabledDeps = p2.requires.filter((e) => e.hard && e.state === "disabled");
        const shown = p2.requires.filter((e) => e.state !== "platform");
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `row ${p2.enabled ? "" : "disabled"} ${flash === p2.path ? "flash" : ""}`,
            "data-dep-path": p2.path,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "server-icon",
                  style: {
                    background: p2.enabled ? meta.color : "#3f3f46",
                    width: 30,
                    height: 30
                  },
                  title: meta.label,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: meta.icon, size: 15, strokeWidth: 2 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-main", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-title", title: p2.description || p2.name, children: [
                  p2.name,
                  p2.version && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: p2.version }),
                  !p2.enabled && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag red", children: "已禁用" }),
                  p2.broken && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag red", title: "这个文件的 zip 结构不完整（下载被截断），Java 也读不了，需要重新下载", children: "文件损坏" }),
                  p2.side === "client" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "tag cyan",
                      title: "模组自己声明只在客户端生效（fabric.mod.json 的 environment: client）——服务端加载了也不起作用",
                      children: "仅客户端"
                    }
                  ),
                  p2.side === "server" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", title: "只在服务端 / 代理端生效，客户端不需要它", children: "仅服务端" }),
                  dup && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "tag orange",
                      title: `存在同 id (${p2.id || p2.name}) 的另一个插件，MCDR 会拒绝加载其中一个`,
                      children: "重复"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-sub", title: p2.description || p2.file, children: [
                  p2.author ? `${p2.author} · ` : "",
                  formatBytes(p2.size)
                ] }),
                (shown.length > 0 || p2.usedBy.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dep-line", children: [
                  shown.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dep-label", children: "前置" }),
                  [...missing, ...disabledDeps, ...shown.filter((e) => e.state === "ok")].slice(0, 4).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `dep-chip ${e.state} ${e.provider ? "clickable" : ""}`,
                      title: `依赖 ${e.id}` + (e.range ? `（要求 ${e.range}）` : "") + ` · ${STATE_TEXT[e.state]}` + (e.providerName ? `：${e.providerName}` : "") + (e.provider ? "（点击跳过去）" : ""),
                      onClick: () => e.provider && jumpTo(e.provider),
                      children: [
                        e.state === "missing" ? "✗ " : e.state === "disabled" ? "! " : "",
                        e.id
                      ]
                    },
                    e.id
                  )),
                  shown.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "dep-chip clickable", onClick: () => openDetail(p2), children: [
                    "+",
                    shown.length - 4
                  ] }),
                  p2.usedBy.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      className: "dep-used",
                      title: `被这些扩展依赖：${p2.usedBy.map((u2) => u2.name).join("、")}`,
                      onClick: () => openDetail(p2),
                      children: [
                        "被 ",
                        p2.usedBy.length,
                        " 个依赖"
                      ]
                    }
                  ),
                  p2.requires.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "dep-used", onClick: () => openDetail(p2), children: "关系" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-actions", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    className: "btn sm ghost",
                    title: p2.enabled ? "禁用：改名成 .disabled，服务器不会加载它，但文件还在" : "启用：把 .disabled 后缀去掉",
                    disabled: busy === p2.path,
                    onClick: () => void toggle(p2),
                    children: p2.enabled ? "禁用" : "启用"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    className: "btn sm ghost",
                    title: "删除这个文件（移到回收站）",
                    disabled: busy === p2.path,
                    onClick: () => setRemoving(p2),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "trash", size: 14 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    className: "btn sm ghost",
                    title: "在资源管理器中显示",
                    onClick: () => void window.api.fs.reveal(server.dir, p2.path),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "external", size: 14 })
                  }
                )
              ] })
            ]
          },
          p2.path
        );
      })
    ] }),
    detail && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Modal,
      {
        title: `依赖关系 · ${detail.name}`,
        onClose: () => setDetail(null),
        size: "wide",
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "btn",
              onClick: () => {
                const path = detail.path;
                setDetail(null);
                setGraphFocus(path);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "network", size: 14 }),
                "在星图里看"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spacer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", onClick: () => setDetail(null), children: "关闭" })
        ] }),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { marginBottom: 12 }, children: [
            detail.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "id ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: detail.id }),
              detail.provides.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                " ",
                "· 另外还提供 ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: detail.provides.slice(0, 6).join(", ") }),
                detail.provides.length > 6 ? ` 等 ${detail.provides.length} 个` : ""
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: detail.file }),
            detail.group && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              " · 位置 ",
              detail.group,
              "/"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rel-block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
              "前置 · 需要 ",
              detail.requires.filter((e) => e.hard).length,
              " 项",
              detail.requires.some((e) => !e.hard) && ` · 可选 ${detail.requires.filter((e) => !e.hard).length} 项`
            ] }),
            detail.requires.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", children: "没有声明任何前置" }),
            [...detail.requires].sort((a, b) => {
              const rank = {
                missing: 0,
                disabled: 1,
                ok: 2,
                platform: 3
              };
              return rank[a.state] - rank[b.state];
            }).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `rel-item ${e.provider ? "clickable" : ""}`,
                onClick: () => e.provider && jumpTo(e.provider),
                title: e.provider ? "点击跳到这个扩展" : "",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rel-id", children: e.id }),
                  !e.hard && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: "可选" }),
                  e.range && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: e.range }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `rel-state ${e.state}`, children: [
                    STATE_TEXT[e.state],
                    e.providerName && e.state !== "missing" ? `：${e.providerName}` : ""
                  ] })
                ]
              },
              e.id
            ))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rel-block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
              "被依赖 · ",
              detail.usedBy.length,
              " 个"
            ] }),
            detail.usedBy.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", children: "没有其它扩展依赖它" }),
            (showAllUsedBy ? detail.usedBy : detail.usedBy.slice(0, 12)).map((u2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rel-item clickable",
                onClick: () => jumpTo(u2.path),
                title: "跳到这个扩展",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: u2.name }),
                  u2.soft && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: "可选" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rel-state platform", children: "→" })
                ]
              },
              u2.path
            )),
            !showAllUsedBy && detail.usedBy.length > 12 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn sm", onClick: () => setShowAllUsedBy(true), children: [
              "还有 ",
              detail.usedBy.length - 12,
              " 个，全部展开"
            ] })
          ] }),
          detail.breaks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rel-block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "声明不兼容" }),
            detail.breaks.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rel-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rel-id", children: b }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rel-state disabled", children: "装了会出问题" })
            ] }, b))
          ] }),
          detail.requires.some((e) => e.state === "missing") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "issue-bar error", style: { margin: "4px 0 0" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "alert", size: 15 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "issue-text", children: "缺少前置时，服务端会在加载阶段直接跳过这个扩展（日志里通常是 「requires xxx which is missing」）。可以在「下载扩展」里搜同名模组装上。" })
          ] })
        ]
      }
    ),
    graphFocus !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ModGraph,
      {
        items,
        focusPath: graphFocus,
        serverName: server.name,
        onClose: () => setGraphFocus(void 0),
        onPick: (path) => {
          setGraphFocus(void 0);
          jumpTo(path);
        }
      }
    ),
    removing && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Confirm,
      {
        title: `删除${KIND_META[removing.kind].label}`,
        danger: true,
        confirmText: "移到回收站",
        message: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "确定要删除 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: removing.name }),
          " 吗？",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hint", children: [
            removing.group,
            "/",
            removing.file,
            " · ",
            formatBytes(removing.size)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          removing.usedBy.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--warn)" }, children: [
              "有 ",
              removing.usedBy.length,
              " 个扩展依赖它：",
              removing.usedBy.slice(0, 5).map((u2) => u2.name).join("、"),
              removing.usedBy.length > 5 ? " 等" : "",
              "。删掉之后它们会加载失败。"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {})
          ] }),
          "文件会移到系统回收站。禁用还是删掉，建议先想清楚：",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "只是想让它不生效的话，用「禁用」就够了" }),
          "，文件留在原地，配置和存档引用都还在。",
          running && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--warn)" }, children: "服务器正在运行，这个文件正被占用，删除可能失败——先停服更稳妥。" })
          ] })
        ] }),
        onCancel: () => setRemoving(null),
        onConfirm: () => void remove(removing)
      }
    )
  ] });
}
const SOURCE_META = {
  mcdr: {
    label: "MCDR 配置",
    icon: "zap",
    color: "#a855f7",
    tip: "MCDReforged 及其 Python 插件的配置，位于服务器根目录的 config/",
    root: "config"
  },
  server: {
    label: "服务端配置",
    icon: "sliders",
    color: "#3b82f6",
    tip: "模组与服务端本体的配置，位于服务端目录的 config/",
    root: ""
  }
};
function extIcon(ext) {
  if (ext === ".json" || ext === ".json5") return "file-text";
  if (ext === ".yml" || ext === ".yaml" || ext === ".toml") return "sliders";
  return "file";
}
function ConfigsPanel({ server }) {
  const toast = useStore((s) => s.toast);
  const [files, setFiles] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [query, setQuery] = reactExports.useState("");
  const [source, setSource] = reactExports.useState("all");
  const [editing, setEditing] = reactExports.useState(
    null
  );
  const load = reactExports.useCallback(async () => {
    const res = await window.api.configs.list(server.id);
    setLoading(false);
    if (res.ok) setFiles(res.data);
    else toast(res.error ?? "读取配置目录失败", "error");
  }, [server.id, toast]);
  reactExports.useEffect(() => {
    setLoading(true);
    setSource("all");
    void load();
  }, [load]);
  const counts = reactExports.useMemo(
    () => ({
      mcdr: files.filter((f2) => f2.source === "mcdr").length,
      server: files.filter((f2) => f2.source === "server").length
    }),
    [files]
  );
  const visible = reactExports.useMemo(() => {
    const q2 = query.trim().toLowerCase();
    return files.filter((f2) => {
      if (source !== "all" && f2.source !== source) return false;
      if (!q2) return true;
      return f2.path.toLowerCase().includes(q2) || f2.group.toLowerCase().includes(q2);
    });
  }, [files, source, query]);
  const grouped = reactExports.useMemo(() => {
    const out = [];
    const index = /* @__PURE__ */ new Map();
    for (const f2 of visible) {
      const key = `${f2.source}::${f2.group}`;
      let bucket = index.get(key);
      if (!bucket) {
        bucket = { key, source: f2.source, group: f2.group, items: [] };
        index.set(key, bucket);
        out.push(bucket);
      }
      bucket.items.push(f2);
    }
    return out;
  }, [visible]);
  const open = async (f2) => {
    const res = await window.api.fs.read(server.dir, f2.path);
    if (!res.ok) {
      toast(res.error ?? "读取失败", "error");
      return;
    }
    if (res.data.binary) {
      toast("这是二进制文件，已经用系统默认程序打开", "info");
      void window.api.fs.open(server.dir, f2.path);
      return;
    }
    setEditing({ path: f2.path, content: res.data.content, truncated: res.data.truncated });
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-empty", children: "正在扫描配置目录…" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-search", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "search", size: 14 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: query,
          onChange: (e) => setQuery(e.target.value),
          placeholder: "搜索配置文件",
          spellCheck: false
        }
      )
    ] }),
    files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chips", style: { padding: "0 12px 8px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `chip-btn ${source === "all" ? "active" : ""}`,
          onClick: () => setSource("all"),
          children: [
            "全部 ",
            files.length
          ]
        }
      ),
      ["mcdr", "server"].filter((s) => counts[s] > 0).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `chip-btn ${source === s ? "active" : ""}`,
          title: SOURCE_META[s].tip,
          onClick: () => setSource(s),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip-dot", style: { background: SOURCE_META[s].color } }),
            SOURCE_META[s].label,
            " ",
            counts[s]
          ]
        },
        s
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-scroll", children: [
      files.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-empty", children: [
        "没有找到配置文件。",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hint", children: [
          "MCDR 插件配置在根目录的 config/",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "模组配置在服务端目录的 config/",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "服务器启动生成配置后这里就会显示。"
        ] })
      ] }),
      files.length > 0 && visible.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-empty", children: "没有匹配的配置文件" }),
      grouped.map((bucket) => {
        const meta = SOURCE_META[bucket.source];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: meta.icon, size: 12, style: { color: meta.color } }),
            bucket.group === "." ? `${meta.label} · 根目录` : bucket.group,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--text-faint)" }, children: [
              "(",
              bucket.items.length,
              ")"
            ] })
          ] }),
          bucket.items.map((f2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "file-row",
              onDoubleClick: () => void open(f2),
              title: `${f2.path}
${formatBytes(f2.size)} · ${formatDateTime(f2.mtime)}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: extIcon(f2.name.slice(f2.name.lastIndexOf("."))), size: 15, style: { color: meta.color } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fname", children: f2.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fsize", children: formatBytes(f2.size) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "row-actions", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      className: "icon-btn",
                      style: { width: 22, height: 22 },
                      title: "编辑",
                      onClick: (e) => {
                        e.stopPropagation();
                        void open(f2);
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "edit", size: 13 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      className: "icon-btn",
                      style: { width: 22, height: 22 },
                      title: "在资源管理器中显示",
                      onClick: (e) => {
                        e.stopPropagation();
                        void window.api.fs.reveal(server.dir, f2.path);
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "external", size: 13 })
                    }
                  )
                ] })
              ]
            },
            f2.path
          ))
        ] }, bucket.key);
      })
    ] }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx(
      FileEditor,
      {
        server,
        path: editing.path,
        initial: editing.content,
        truncated: editing.truncated,
        onClose: () => setEditing(null),
        onSaved: () => void load()
      }
    )
  ] });
}
function BackupsPanel({ server }) {
  const toast = useStore((s) => s.toast);
  const downloads = useStore((s) => s.downloads);
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [creating, setCreating] = reactExports.useState(false);
  const [label, setLabel] = reactExports.useState("");
  const [confirmRestore, setConfirmRestore] = reactExports.useState(null);
  const [confirmDelete, setConfirmDelete] = reactExports.useState(null);
  const task = Object.values(downloads).find((d) => d.taskId === `backup-${server.id}`);
  const running = server.runtime.status !== "stopped" && server.runtime.status !== "crashed";
  const load = reactExports.useCallback(async () => {
    const res = await window.api.backups.list(server.id);
    setLoading(false);
    if (res.ok) setItems(res.data);
    else toast(res.error ?? "读取备份失败", "error");
  }, [server.id, toast]);
  reactExports.useEffect(() => {
    setLoading(true);
    void load();
  }, [load]);
  const create2 = async () => {
    setCreating(true);
    const res = await window.api.backups.create(server.id, label);
    setCreating(false);
    if (res.ok) {
      toast("备份完成", "success");
      setLabel("");
      void load();
    } else {
      toast(res.error ?? "备份失败", "error");
    }
  };
  const totalSize = items.reduce((n2, b) => n2 + b.size, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "10px 12px 6px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "input",
            style: { height: 30, fontSize: 12.5 },
            value: label,
            placeholder: "备注（可留空）",
            spellCheck: false,
            onChange: (e) => setLabel(e.target.value)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn sm primary", disabled: creating, onClick: () => void create2(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "archive", size: 14 }),
          creating ? "备份中…" : "立即备份"
        ] })
      ] }),
      running && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { marginTop: 8, color: "#fcd34d" }, children: "服务器正在运行。运行中备份可能不一致，建议先停止或用 save-all 后再备份。" }),
      task && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: `${task.percent}%` } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint", style: { marginTop: 6 }, children: task.message })
      ] }),
      items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", style: { marginTop: 8 }, children: [
        "共 ",
        items.length,
        " 个备份，合计 ",
        formatBytes(totalSize)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-scroll", children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-empty", children: "正在读取…" }),
      !loading && items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-empty", children: [
        "还没有备份。",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "备份会把整个服务端目录复制一份到 backups 文件夹，用于出问题时快速回滚。"
      ] }),
      items.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "server-icon", style: { background: "#a855f7", width: 30, height: 30 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "archive", size: 15, strokeWidth: 2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-main", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row-title", title: b.name, children: b.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-sub", children: [
            formatDateTime(b.createdAt),
            " · ",
            formatBytes(b.size)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn sm ghost",
              title: "还原这个备份",
              onClick: () => setConfirmRestore(b),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "restart", size: 14 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn sm ghost",
              title: "删除备份",
              onClick: () => setConfirmDelete(b),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "trash", size: 14 })
            }
          )
        ] })
      ] }, b.path))
    ] }),
    confirmDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Confirm,
      {
        title: "删除备份",
        danger: true,
        confirmText: "删除",
        message: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "确定删除备份 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: confirmDelete.name }),
          "（",
          formatBytes(confirmDelete.size),
          "）吗？",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "该操作不可恢复。"
        ] }),
        onCancel: () => setConfirmDelete(null),
        onConfirm: async () => {
          const t2 = confirmDelete;
          setConfirmDelete(null);
          const res = await window.api.backups.remove(server.id, t2.path);
          if (res.ok) {
            toast("已删除", "success");
            void load();
          } else {
            toast(res.error ?? "删除失败", "error");
          }
        }
      }
    ),
    confirmRestore && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Confirm,
      {
        title: "还原备份",
        danger: true,
        confirmText: "确认还原",
        message: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "将要还原 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: confirmRestore.name }),
          "。",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "当前服务器目录里的内容会先被移动到",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: ".before-restore-*" }),
          " 目录作为兜底，然后备份内容会被复制回来。",
          running && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { style: { color: "var(--danger)" }, children: "服务器正在运行，请先停止再还原。" })
          ] })
        ] }),
        onCancel: () => setConfirmRestore(null),
        onConfirm: async () => {
          const t2 = confirmRestore;
          setConfirmRestore(null);
          const res = await window.api.backups.restore(server.id, t2.path);
          if (res.ok) {
            toast(`还原完成，原内容已保存到 ${res.data}`, "success");
            void load();
          } else {
            toast(res.error ?? "还原失败", "error");
          }
        }
      }
    )
  ] });
}
const TABS = [
  { key: "files", icon: "folder", label: "文件", title: "服务器文件" },
  { key: "players", icon: "users", label: "玩家", title: "玩家管理" },
  { key: "plugins", icon: "puzzle", label: "扩展", title: "MCDR 插件 / 服务端插件 / 模组" },
  { key: "configs", icon: "sliders", label: "配置", title: "MCDR 配置与模组配置" },
  { key: "backups", icon: "archive", label: "备份", title: "备份与还原" }
];
function RightPanel({ server }) {
  const panel = useStore((s) => s.panel);
  const setPanel = useStore((s) => s.setPanel);
  const togglePanel = useStore((s) => s.togglePanel);
  const online = server.runtime.onlineCount;
  const current = TABS.find((t2) => t2.key === panel) ?? TABS[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "panel-title", children: current.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "icon-btn",
          title: "在资源管理器中打开服务端目录",
          onClick: () => void window.api.fs.reveal(server.dir, server.coreDir),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "folder-open", size: 16 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-btn", title: "收起面板", onClick: togglePanel, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "panel", size: 16 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seg", children: TABS.map((t2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: panel === t2.key ? "active" : "",
        title: t2.title,
        onClick: () => setPanel(t2.key),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: t2.icon, size: 14 }),
          t2.key === "players" && online > 0 ? `${online}` : t2.label
        ]
      },
      t2.key
    )) }),
    panel === "files" && /* @__PURE__ */ jsxRuntimeExports.jsx(FilesPanel, { server }),
    panel === "players" && /* @__PURE__ */ jsxRuntimeExports.jsx(PlayersPanel, { server }),
    panel === "plugins" && /* @__PURE__ */ jsxRuntimeExports.jsx(PluginsPanel, { server }),
    panel === "configs" && /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigsPanel, { server }),
    panel === "backups" && /* @__PURE__ */ jsxRuntimeExports.jsx(BackupsPanel, { server })
  ] });
}
function App() {
  const ready = useStore((s) => s.ready);
  const servers = useStore((s) => s.servers);
  const activeId = useStore((s) => s.activeId);
  const view = useStore((s) => s.view);
  const panelOpen = useStore((s) => s.panelOpen);
  const listCollapsed = useStore((s) => s.listCollapsed);
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [helpOpen, setHelpOpen] = reactExports.useState(false);
  const booted = reactExports.useRef(false);
  const settings = useStore((s) => s.settings);
  const [dragWidth, setDragWidth] = reactExports.useState({});
  const [dragKind, setDragKind] = reactExports.useState(null);
  const [backgroundUrl, setBackgroundUrl] = reactExports.useState(null);
  const [viewport, setViewport] = reactExports.useState(() => window.innerWidth);
  reactExports.useEffect(() => {
    const onResize = () => setViewport(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const effectiveSettings = settings ? {
    ...settings,
    sideWidth: dragWidth.side ?? settings.sideWidth,
    panelWidth: dragWidth.panel ?? settings.panelWidth
  } : null;
  const ui2 = uiStyle(effectiveSettings, backgroundUrl, viewport);
  const shownWidth = (kind) => {
    const v2 = Number.parseInt(ui2.vars[kind === "side" ? "--side-w" : "--panel-w"], 10);
    if (Number.isFinite(v2)) return v2;
    return kind === "side" ? DEFAULT_UI.sideWidth : DEFAULT_UI.panelWidth;
  };
  reactExports.useEffect(() => {
    const path = settings?.backgroundImage?.trim();
    if (!path) {
      setBackgroundUrl(null);
      useStore.setState({ backgroundError: "" });
      return;
    }
    let cancelled = false;
    void window.api.app.readImage(path).then((res) => {
      if (cancelled) return;
      setBackgroundUrl(res.ok ? res.data.dataUrl : null);
      useStore.setState({ backgroundError: res.ok ? "" : res.error ?? "读取失败" });
    });
    return () => {
      cancelled = true;
    };
  }, [settings?.backgroundImage]);
  const startResize = (kind, e) => {
    e.preventDefault();
    const startX = e.clientX;
    const from = shownWidth(kind);
    const otherKind = kind === "side" ? "panel" : "side";
    const sign = kind === "side" ? 1 : -1;
    const targetWidth = (clientX) => {
      const want = clampWidth(kind, from + (clientX - startX) * sign);
      const other = shownWidth(otherKind);
      const fitted = fitWidths(
        kind === "side" ? want : other,
        kind === "side" ? other : want,
        viewport
      );
      return kind === "side" ? fitted.side : fitted.panel;
    };
    document.body.classList.add("resizing");
    setDragKind(kind);
    const onMove = (ev) => {
      const next = targetWidth(ev.clientX);
      setDragWidth((w2) => ({ ...w2, [kind]: next }));
    };
    const onUp = (ev) => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      document.body.classList.remove("resizing");
      setDragKind(null);
      const next = targetWidth(ev.clientX);
      setDragWidth((w2) => {
        const rest = { ...w2 };
        delete rest[kind];
        return rest;
      });
      void window.api.settings.patch(kind === "side" ? { sideWidth: next } : { panelWidth: next }).then((res) => {
        if (res.ok) useStore.setState({ settings: res.data });
      });
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };
  const resetWidth = (kind) => {
    void window.api.settings.patch(kind === "side" ? { sideWidth: DEFAULT_UI.sideWidth } : { panelWidth: DEFAULT_UI.panelWidth }).then((res) => {
      if (res.ok) useStore.setState({ settings: res.data });
    });
  };
  const active = servers.find((s) => s.id === activeId) ?? null;
  reactExports.useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    void useStore.getState().init();
  }, []);
  reactExports.useEffect(() => {
    const buffer = {};
    let raf = 0;
    const flush = () => {
      raf = 0;
      const push = useStore.getState().pushLogs;
      for (const id2 of Object.keys(buffer)) {
        const lines = buffer[id2];
        if (lines?.length) push(id2, lines);
        delete buffer[id2];
      }
    };
    const offLog = window.api.on.log((id2, line) => {
      (buffer[id2] ||= []).push(line);
      if (!raf) raf = requestAnimationFrame(flush);
    });
    const offStatus = window.api.on.status(
      (id2, runtime) => useStore.getState().applyRuntime(id2, runtime)
    );
    const offStats = window.api.on.stats((stats) => useStore.setState({ stats }));
    const offChanged = window.api.on.serversChanged(() => void useStore.getState().refresh());
    const offDownload = window.api.on.download((p2) => useStore.getState().setDownload(p2));
    return () => {
      offLog();
      offStatus();
      offStats();
      offChanged();
      offDownload();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      if (e.key === "n") {
        e.preventDefault();
        setAddOpen(true);
      } else if (e.key === "1") {
        e.preventDefault();
        useStore.getState().setView("dashboard");
      } else if (e.key === "2") {
        e.preventDefault();
        useStore.getState().setView("console");
      } else if (e.key === "b" || e.key === "\\") {
        e.preventDefault();
        useStore.getState().toggleList();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  if (!ready) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "center-state", style: { height: "100vh" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "CraftDesk 正在启动…" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `app ${ui2.hasBackground ? "has-bg" : ""}`, style: ui2.vars, children: [
    ui2.background && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "app-bg",
        style: { backgroundImage: `url("${ui2.background.image}")`, opacity: ui2.background.opacity }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TitleBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IconRail, { onHelp: () => setHelpOpen(true) }),
      !listCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ServerList, { onAdd: () => setAddOpen(true) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `resizer resizer-side ${dragKind === "side" ? "active" : ""}`,
            title: "拖动调整左侧宽度，双击恢复默认（也可以在设置 → 个性化 里精确设置）",
            onMouseDown: (e) => startResize("side", e),
            onDoubleClick: () => resetWidth("side")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "main", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toolbar, { onAdd: () => setAddOpen(true) }),
        view === "dashboard" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          DashboardView,
          {
            onAdd: () => setAddOpen(true),
            onOpenServer: (id2, v2) => {
              useStore.getState().select(id2);
              if (v2) useStore.getState().setView(v2);
            }
          }
        ) : view === "topology" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          TopologyView,
          {
            onOpenServer: (id2, v2) => {
              useStore.getState().select(id2);
              useStore.getState().setView(v2);
            }
          }
        ) : view === "settings" ? /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsView, {}) : !active ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { onAdd: () => setAddOpen(true) }) : view === "properties" ? /* @__PURE__ */ jsxRuntimeExports.jsx(PropertiesView, { server: active }) : view === "registry" ? /* @__PURE__ */ jsxRuntimeExports.jsx(RegistryView, { server: active }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ConsoleView, { server: active })
      ] }),
      active && panelOpen && view !== "dashboard" && view !== "topology" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `resizer resizer-panel ${dragKind === "panel" ? "active" : ""}`,
            title: "拖动调整右侧面板宽度，双击恢复默认（也可以在设置 → 个性化 里精确设置）",
            onMouseDown: (e) => startResize("panel", e),
            onDoubleClick: () => resetWidth("panel")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RightPanel, { server: active })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toasts, {}),
    addOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(AddServerDialog, { onClose: () => setAddOpen(false) }),
    helpOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(HelpDialog, { onClose: () => setHelpOpen(false) })
  ] });
}
function EmptyState({ onAdd }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-logo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "pickaxe", size: 34, style: { color: "var(--accent)" }, strokeWidth: 1.5 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "今天想做点什么？" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "从左边选一个服务器开始管理，或者添加一个新的。 CraftDesk 会帮你启动进程、盯着控制台输出、管理玩家和存档。" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-actions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn primary", onClick: onAdd, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: "plus", size: 15 }),
      "添加服务器"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quick-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quick-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "qc-title", children: "导入已有服务端" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "qc-desc", children: "选中之前的服务器文件夹，自动识别核心与配置" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quick-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "qc-title", children: "下载新建" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "qc-desc", children: "Paper / 原版 / Purpur / Fabric / Forge / NeoForge，选版本即可开服" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quick-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "qc-title", children: "实时控制台" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "qc-desc", children: "看日志、发指令、盯 TPS 和在线人数" })
      ] })
    ] })
  ] });
}
function HelpDialog({ onClose }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { title: "使用说明", onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { lineHeight: 2, fontSize: 13.5, color: "var(--text-dim)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { fontSize: 14, color: "var(--text)", marginBottom: 8 }, children: "快速上手" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { style: { paddingLeft: 20 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "点左上角的「添加服务器」，导入已有服务端目录，或者下载一个新的。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "确认 Java 路径和内存。没有 Java 的话去「设置」里扫描或手动指定 java.exe。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "点右上角「启动」。首次启动如果提示 EULA，在提示条上点一下同意即可。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "启动完成后，底部输入框可以直接发送服务器指令，比如 list、tps、whitelist add。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { fontSize: 14, color: "var(--text)", margin: "16px 0 8px" }, children: "快捷键" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gap: 6 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kbd", children: "Ctrl" }),
        " + ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kbd", children: "N" }),
        " 添加服务器"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kbd", children: "Ctrl" }),
        " + ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kbd", children: "1" }),
        " 总览"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kbd", children: "Ctrl" }),
        " + ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kbd", children: "2" }),
        " 控制台"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kbd", children: "Ctrl" }),
        " + ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kbd", children: "B" }),
        " 折叠服务器列表"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "编辑文件时 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kbd", children: "Ctrl" }),
        " + ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kbd", children: "S" }),
        " 保存"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { fontSize: 14, color: "var(--text)", margin: "16px 0 8px" }, children: "常见问题" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gap: 10 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { style: { color: "var(--text)" }, children: "启动后立刻退出？" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "多半是老版本 Java 跑新版本服务端，或者反过来。控制台会打出 UnsupportedClassVersionError，按提示换 Java 版本即可。"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { style: { color: "var(--text)" }, children: "提示端口被占用？" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "到「服务器属性」里把 server-port 换成别的值，或者把占用端口的程序关掉。"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { style: { color: "var(--text)" }, children: "控制台中文乱码？" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "CraftDesk 会自动尝试 UTF-8 和 GBK 两种解码。如果仍然乱码，可以在 JVM 参数里加 -Dfile.encoding=UTF-8。"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { fontSize: 14, color: "var(--text)", margin: "16px 0 8px" }, children: "关于" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "界面参考了现代桌面应用的深色三栏布局，左侧服务器列表、中间工作区、右侧文件与玩家面板， 所有面板都可以按需收起。" })
  ] }) });
}
const container = document.getElementById("root");
if (!container) throw new Error("找不到 #root 节点");
createRoot(container).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
