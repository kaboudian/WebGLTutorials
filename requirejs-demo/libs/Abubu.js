
/**
  * Abubu.js JavaScript WebGL2.0 Computational Library
  * http://abubujs.org
  *
  * Copyright (c) 2019 Abubujs.org Team

  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  * 
  * The above copyright notice and this permission notice shall be included in all
  * copies or substantial portions of the Software.
  * 
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  * SOFTWARE.
  *
  **/




eval(`/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	/* typeof define === 'function' && define.amd ? define(['exports'], factory) : */
	(factory((global.dat = {})));
}(this, (function (exports) { 'use strict';

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);

  return css;
}

function colorToString (color, forceCSSHex) {
  var colorFormat = color.__state.conversionName.toString();
  var r = Math.round(color.r);
  var g = Math.round(color.g);
  var b = Math.round(color.b);
  var a = color.a;
  var h = Math.round(color.h);
  var s = color.s.toFixed(1);
  var v = color.v.toFixed(1);
  if (forceCSSHex || colorFormat === 'THREE_CHAR_HEX' || colorFormat === 'SIX_CHAR_HEX') {
    var str = color.hex.toString(16);
    while (str.length < 6) {
      str = '0' + str;
    }
    return '#' + str;
  } else if (colorFormat === 'CSS_RGB') {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (colorFormat === 'CSS_RGBA') {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  } else if (colorFormat === 'HEX') {
    return '0x' + color.hex.toString(16);
  } else if (colorFormat === 'RGB_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ']';
  } else if (colorFormat === 'RGBA_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ',' + a + ']';
  } else if (colorFormat === 'RGB_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + '}';
  } else if (colorFormat === 'RGBA_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + ',a:' + a + '}';
  } else if (colorFormat === 'HSV_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + '}';
  } else if (colorFormat === 'HSVA_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + ',a:' + a + '}';
  }
  return 'unknown format';
}

var ARR_EACH = Array.prototype.forEach;
var ARR_SLICE = Array.prototype.slice;
var Common = {
  BREAK: {},
  extend: function extend(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (!this.isUndefined(obj[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  defaults: function defaults(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (this.isUndefined(target[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  compose: function compose() {
    var toCall = ARR_SLICE.call(arguments);
    return function () {
      var args = ARR_SLICE.call(arguments);
      for (var i = toCall.length - 1; i >= 0; i--) {
        args = [toCall[i].apply(this, args)];
      }
      return args[0];
    };
  },
  each: function each(obj, itr, scope) {
    if (!obj) {
      return;
    }
    if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) {
      obj.forEach(itr, scope);
    } else if (obj.length === obj.length + 0) {
      var key = void 0;
      var l = void 0;
      for (key = 0, l = obj.length; key < l; key++) {
        if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) {
          return;
        }
      }
    } else {
      for (var _key in obj) {
        if (itr.call(scope, obj[_key], _key) === this.BREAK) {
          return;
        }
      }
    }
  },
  defer: function defer(fnc) {
    setTimeout(fnc, 0);
  },
  debounce: function debounce(func, threshold, callImmediately) {
    var timeout = void 0;
    return function () {
      var obj = this;
      var args = arguments;
      function delayed() {
        timeout = null;
        if (!callImmediately) func.apply(obj, args);
      }
      var callNow = callImmediately || !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(delayed, threshold);
      if (callNow) {
        func.apply(obj, args);
      }
    };
  },
  toArray: function toArray(obj) {
    if (obj.toArray) return obj.toArray();
    return ARR_SLICE.call(obj);
  },
  isUndefined: function isUndefined(obj) {
    return obj === undefined;
  },
  isNull: function isNull(obj) {
    return obj === null;
  },
  isNaN: function (_isNaN) {
    function isNaN(_x) {
      return _isNaN.apply(this, arguments);
    }
    isNaN.toString = function () {
      return _isNaN.toString();
    };
    return isNaN;
  }(function (obj) {
    return isNaN(obj);
  }),
  isArray: Array.isArray || function (obj) {
    return obj.constructor === Array;
  },
  isObject: function isObject(obj) {
    return obj === Object(obj);
  },
  isNumber: function isNumber(obj) {
    return obj === obj + 0;
  },
  isString: function isString(obj) {
    return obj === obj + '';
  },
  isBoolean: function isBoolean(obj) {
    return obj === false || obj === true;
  },
  isFunction: function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  }
};

var INTERPRETATIONS = [
{
  litmus: Common.isString,
  conversions: {
    THREE_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
        if (test === null) {
          return false;
        }
        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString() + test[1].toString() + test[2].toString() + test[2].toString() + test[3].toString() + test[3].toString(), 0)
        };
      },
      write: colorToString
    },
    SIX_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9]{6})$/i);
        if (test === null) {
          return false;
        }
        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString(), 0)
        };
      },
      write: colorToString
    },
    CSS_RGB: {
      read: function read(original) {
        var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (test === null) {
          return false;
        }
        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3])
        };
      },
      write: colorToString
    },
    CSS_RGBA: {
      read: function read(original) {
        var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (test === null) {
          return false;
        }
        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3]),
          a: parseFloat(test[4])
        };
      },
      write: colorToString
    }
  }
},
{
  litmus: Common.isNumber,
  conversions: {
    HEX: {
      read: function read(original) {
        return {
          space: 'HEX',
          hex: original,
          conversionName: 'HEX'
        };
      },
      write: function write(color) {
        return color.hex;
      }
    }
  }
},
{
  litmus: Common.isArray,
  conversions: {
    RGB_ARRAY: {
      read: function read(original) {
        if (original.length !== 3) {
          return false;
        }
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b];
      }
    },
    RGBA_ARRAY: {
      read: function read(original) {
        if (original.length !== 4) return false;
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2],
          a: original[3]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b, color.a];
      }
    }
  }
},
{
  litmus: Common.isObject,
  conversions: {
    RGBA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b) && Common.isNumber(original.a)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b,
            a: original.a
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b,
          a: color.a
        };
      }
    },
    RGB_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b
        };
      }
    },
    HSVA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v) && Common.isNumber(original.a)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v,
            a: original.a
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v,
          a: color.a
        };
      }
    },
    HSV_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v
        };
      }
    }
  }
}];
var result = void 0;
var toReturn = void 0;
var interpret = function interpret() {
  toReturn = false;
  var original = arguments.length > 1 ? Common.toArray(arguments) : arguments[0];
  Common.each(INTERPRETATIONS, function (family) {
    if (family.litmus(original)) {
      Common.each(family.conversions, function (conversion, conversionName) {
        result = conversion.read(original);
        if (toReturn === false && result !== false) {
          toReturn = result;
          result.conversionName = conversionName;
          result.conversion = conversion;
          return Common.BREAK;
        }
      });
      return Common.BREAK;
    }
  });
  return toReturn;
};

var tmpComponent = void 0;
var ColorMath = {
  hsv_to_rgb: function hsv_to_rgb(h, s, v) {
    var hi = Math.floor(h / 60) % 6;
    var f = h / 60 - Math.floor(h / 60);
    var p = v * (1.0 - s);
    var q = v * (1.0 - f * s);
    var t = v * (1.0 - (1.0 - f) * s);
    var c = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][hi];
    return {
      r: c[0] * 255,
      g: c[1] * 255,
      b: c[2] * 255
    };
  },
  rgb_to_hsv: function rgb_to_hsv(r, g, b) {
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var delta = max - min;
    var h = void 0;
    var s = void 0;
    if (max !== 0) {
      s = delta / max;
    } else {
      return {
        h: NaN,
        s: 0,
        v: 0
      };
    }
    if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else {
      h = 4 + (r - g) / delta;
    }
    h /= 6;
    if (h < 0) {
      h += 1;
    }
    return {
      h: h * 360,
      s: s,
      v: max / 255
    };
  },
  rgb_to_hex: function rgb_to_hex(r, g, b) {
    var hex = this.hex_with_component(0, 2, r);
    hex = this.hex_with_component(hex, 1, g);
    hex = this.hex_with_component(hex, 0, b);
    return hex;
  },
  component_from_hex: function component_from_hex(hex, componentIndex) {
    return hex >> componentIndex * 8 & 0xFF;
  },
  hex_with_component: function hex_with_component(hex, componentIndex, value) {
    return value << (tmpComponent = componentIndex * 8) | hex & ~(0xFF << tmpComponent);
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Color = function () {
  function Color() {
    classCallCheck(this, Color);
    this.__state = interpret.apply(this, arguments);
    if (this.__state === false) {
      throw new Error('Failed to interpret color arguments');
    }
    this.__state.a = this.__state.a || 1;
  }
  createClass(Color, [{
    key: 'toString',
    value: function toString() {
      return colorToString(this);
    }
  }, {
    key: 'toHexString',
    value: function toHexString() {
      return colorToString(this, true);
    }
  }, {
    key: 'toOriginal',
    value: function toOriginal() {
      return this.__state.conversion.write(this);
    }
  }]);
  return Color;
}();
function defineRGBComponent(target, component, componentHexIndex) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'RGB') {
        return this.__state[component];
      }
      Color.recalculateRGB(this, component, componentHexIndex);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'RGB') {
        Color.recalculateRGB(this, component, componentHexIndex);
        this.__state.space = 'RGB';
      }
      this.__state[component] = v;
    }
  });
}
function defineHSVComponent(target, component) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'HSV') {
        return this.__state[component];
      }
      Color.recalculateHSV(this);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'HSV') {
        Color.recalculateHSV(this);
        this.__state.space = 'HSV';
      }
      this.__state[component] = v;
    }
  });
}
Color.recalculateRGB = function (color, component, componentHexIndex) {
  if (color.__state.space === 'HEX') {
    color.__state[component] = ColorMath.component_from_hex(color.__state.hex, componentHexIndex);
  } else if (color.__state.space === 'HSV') {
    Common.extend(color.__state, ColorMath.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
  } else {
    throw new Error('Corrupted color state');
  }
};
Color.recalculateHSV = function (color) {
  var result = ColorMath.rgb_to_hsv(color.r, color.g, color.b);
  Common.extend(color.__state, {
    s: result.s,
    v: result.v
  });
  if (!Common.isNaN(result.h)) {
    color.__state.h = result.h;
  } else if (Common.isUndefined(color.__state.h)) {
    color.__state.h = 0;
  }
};
Color.COMPONENTS = ['r', 'g', 'b', 'h', 's', 'v', 'hex', 'a'];
defineRGBComponent(Color.prototype, 'r', 2);
defineRGBComponent(Color.prototype, 'g', 1);
defineRGBComponent(Color.prototype, 'b', 0);
defineHSVComponent(Color.prototype, 'h');
defineHSVComponent(Color.prototype, 's');
defineHSVComponent(Color.prototype, 'v');
Object.defineProperty(Color.prototype, 'a', {
  get: function get$$1() {
    return this.__state.a;
  },
  set: function set$$1(v) {
    this.__state.a = v;
  }
});
Object.defineProperty(Color.prototype, 'hex', {
  get: function get$$1() {
    if (!this.__state.space !== 'HEX') {
      this.__state.hex = ColorMath.rgb_to_hex(this.r, this.g, this.b);
    }
    return this.__state.hex;
  },
  set: function set$$1(v) {
    this.__state.space = 'HEX';
    this.__state.hex = v;
  }
});

var Controller = function () {
  function Controller(object, property) {
    classCallCheck(this, Controller);
    this.initialValue = object[property];
    this.domElement = document.createElement('div');
    this.object = object;
    this.property = property;
    this.__onChange = undefined;
    this.__onFinishChange = undefined;
  }
  createClass(Controller, [{
    key: 'onChange',
    value: function onChange(fnc) {
      this.__onChange = fnc;
      return this;
    }
  }, {
    key: 'onFinishChange',
    value: function onFinishChange(fnc) {
      this.__onFinishChange = fnc;
      return this;
    }
  }, {
    key: 'setValue',
    value: function setValue(newValue) {
      this.object[this.property] = newValue;
      if (this.__onChange) {
        this.__onChange.call(this, newValue);
      }
      this.updateDisplay();
      return this;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.object[this.property];
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      return this;
    }
  }, {
    key: 'isModified',
    value: function isModified() {
      return this.initialValue !== this.getValue();
    }
  }]);
  return Controller;
}();

var EVENT_MAP = {
  HTMLEvents: ['change'],
  MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'],
  KeyboardEvents: ['keydown']
};
var EVENT_MAP_INV = {};
Common.each(EVENT_MAP, function (v, k) {
  Common.each(v, function (e) {
    EVENT_MAP_INV[e] = k;
  });
});
var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;
function cssValueToPixels(val) {
  if (val === '0' || Common.isUndefined(val)) {
    return 0;
  }
  var match = val.match(CSS_VALUE_PIXELS);
  if (!Common.isNull(match)) {
    return parseFloat(match[1]);
  }
  return 0;
}
var dom = {
  makeSelectable: function makeSelectable(elem, selectable) {
    if (elem === undefined || elem.style === undefined) return;
    elem.onselectstart = selectable ? function () {
      return false;
    } : function () {};
    elem.style.MozUserSelect = selectable ? 'auto' : 'none';
    elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
    elem.unselectable = selectable ? 'on' : 'off';
  },
  makeFullscreen: function makeFullscreen(elem, hor, vert) {
    var vertical = vert;
    var horizontal = hor;
    if (Common.isUndefined(horizontal)) {
      horizontal = true;
    }
    if (Common.isUndefined(vertical)) {
      vertical = true;
    }
    elem.style.position = 'absolute';
    if (horizontal) {
      elem.style.left = 0;
      elem.style.right = 0;
    }
    if (vertical) {
      elem.style.top = 0;
      elem.style.bottom = 0;
    }
  },
  fakeEvent: function fakeEvent(elem, eventType, pars, aux) {
    var params = pars || {};
    var className = EVENT_MAP_INV[eventType];
    if (!className) {
      throw new Error('Event type ' + eventType + ' not supported.');
    }
    var evt = document.createEvent(className);
    switch (className) {
      case 'MouseEvents':
        {
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false, params.cancelable || true, window, params.clickCount || 1, 0,
          0,
          clientX,
          clientY,
          false, false, false, false, 0, null);
          break;
        }
      case 'KeyboardEvents':
        {
          var init = evt.initKeyboardEvent || evt.initKeyEvent;
          Common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false, params.cancelable, window, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.keyCode, params.charCode);
          break;
        }
      default:
        {
          evt.initEvent(eventType, params.bubbles || false, params.cancelable || true);
          break;
        }
    }
    Common.defaults(evt, aux);
    elem.dispatchEvent(evt);
  },
  bind: function bind(elem, event, func, newBool) {
    var bool = newBool || false;
    if (elem.addEventListener) {
      elem.addEventListener(event, func, bool);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + event, func);
    }
    return dom;
  },
  unbind: function unbind(elem, event, func, newBool) {
    var bool = newBool || false;
    if (elem.removeEventListener) {
      elem.removeEventListener(event, func, bool);
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + event, func);
    }
    return dom;
  },
  addClass: function addClass(elem, className) {
    if (elem.className === undefined) {
      elem.className = className;
    } else if (elem.className !== className) {
      var classes = elem.className.split(/ +/);
      if (classes.indexOf(className) === -1) {
        classes.push(className);
        elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
      }
    }
    return dom;
  },
  removeClass: function removeClass(elem, className) {
    if (className) {
      if (elem.className === className) {
        elem.removeAttribute('class');
      } else {
        var classes = elem.className.split(/ +/);
        var index = classes.indexOf(className);
        if (index !== -1) {
          classes.splice(index, 1);
          elem.className = classes.join(' ');
        }
      }
    } else {
      elem.className = undefined;
    }
    return dom;
  },
  hasClass: function hasClass(elem, className) {
    return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
  },
  getWidth: function getWidth(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-left-width']) + cssValueToPixels(style['border-right-width']) + cssValueToPixels(style['padding-left']) + cssValueToPixels(style['padding-right']) + cssValueToPixels(style.width);
  },
  getHeight: function getHeight(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-top-width']) + cssValueToPixels(style['border-bottom-width']) + cssValueToPixels(style['padding-top']) + cssValueToPixels(style['padding-bottom']) + cssValueToPixels(style.height);
  },
  getOffset: function getOffset(el) {
    var elem = el;
    var offset = { left: 0, top: 0 };
    if (elem.offsetParent) {
      do {
        offset.left += elem.offsetLeft;
        offset.top += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }
    return offset;
  },
  isActive: function isActive(elem) {
    return elem === document.activeElement && (elem.type || elem.href);
  }
};

var BooleanController = function (_Controller) {
  inherits(BooleanController, _Controller);
  function BooleanController(object, property) {
    classCallCheck(this, BooleanController);
    var _this2 = possibleConstructorReturn(this, (BooleanController.__proto__ || Object.getPrototypeOf(BooleanController)).call(this, object, property));
    var _this = _this2;
    _this2.__prev = _this2.getValue();
    _this2.__checkbox = document.createElement('input');
    _this2.__checkbox.setAttribute('type', 'checkbox');
    function onChange() {
      _this.setValue(!_this.__prev);
    }
    dom.bind(_this2.__checkbox, 'change', onChange, false);
    _this2.domElement.appendChild(_this2.__checkbox);
    _this2.updateDisplay();
    return _this2;
  }
  createClass(BooleanController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'setValue', this).call(this, v);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
      this.__prev = this.getValue();
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (this.getValue() === true) {
        this.__checkbox.setAttribute('checked', 'checked');
        this.__checkbox.checked = true;
        this.__prev = true;
      } else {
        this.__checkbox.checked = false;
        this.__prev = false;
      }
      return get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return BooleanController;
}(Controller);

var OptionController = function (_Controller) {
  inherits(OptionController, _Controller);
  function OptionController(object, property, opts) {
    classCallCheck(this, OptionController);
    var _this2 = possibleConstructorReturn(this, (OptionController.__proto__ || Object.getPrototypeOf(OptionController)).call(this, object, property));
    var options = opts;
    var _this = _this2;
    _this2.__select = document.createElement('select');
    if (Common.isArray(options)) {
      var map = {};
      Common.each(options, function (element) {
        map[element] = element;
      });
      options = map;
    }
    Common.each(options, function (value, key) {
      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);
      _this.__select.appendChild(opt);
    });
    _this2.updateDisplay();
    dom.bind(_this2.__select, 'change', function () {
      var desiredValue = this.options[this.selectedIndex].value;
      _this.setValue(desiredValue);
    });
    _this2.domElement.appendChild(_this2.__select);
    return _this2;
  }
  createClass(OptionController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'setValue', this).call(this, v);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (dom.isActive(this.__select)) return this;
      this.__select.value = this.getValue();
      return get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return OptionController;
}(Controller);

var StringController = function (_Controller) {
  inherits(StringController, _Controller);
  function StringController(object, property) {
    classCallCheck(this, StringController);
    var _this2 = possibleConstructorReturn(this, (StringController.__proto__ || Object.getPrototypeOf(StringController)).call(this, object, property));
    var _this = _this2;
    function onChange() {
      _this.setValue(_this.__input.value);
    }
    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    _this2.__input = document.createElement('input');
    _this2.__input.setAttribute('type', 'text');
    dom.bind(_this2.__input, 'keyup', onChange);
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });
    _this2.updateDisplay();
    _this2.domElement.appendChild(_this2.__input);
    return _this2;
  }
  createClass(StringController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (!dom.isActive(this.__input)) {
        this.__input.value = this.getValue();
      }
      return get(StringController.prototype.__proto__ || Object.getPrototypeOf(StringController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return StringController;
}(Controller);

function numDecimals(x) {
  var _x = x.toString();
  if (_x.indexOf('.') > -1) {
    return _x.length - _x.indexOf('.') - 1;
  }
  return 0;
}
var NumberController = function (_Controller) {
  inherits(NumberController, _Controller);
  function NumberController(object, property, params) {
    classCallCheck(this, NumberController);
    var _this = possibleConstructorReturn(this, (NumberController.__proto__ || Object.getPrototypeOf(NumberController)).call(this, object, property));
    var _params = params || {};
    _this.__min = _params.min;
    _this.__max = _params.max;
    _this.__step = _params.step;
    if (Common.isUndefined(_this.__step)) {
      if (_this.initialValue === 0) {
        _this.__impliedStep = 1;
      } else {
        _this.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(_this.initialValue)) / Math.LN10)) / 10;
      }
    } else {
      _this.__impliedStep = _this.__step;
    }
    _this.__precision = numDecimals(_this.__impliedStep);
    return _this;
  }
  createClass(NumberController, [{
    key: 'setValue',
    value: function setValue(v) {
      var _v = v;
      if (this.__min !== undefined && _v < this.__min) {
        _v = this.__min;
      } else if (this.__max !== undefined && _v > this.__max) {
        _v = this.__max;
      }
      if (this.__step !== undefined && _v % this.__step !== 0) {
        _v = Math.round(_v / this.__step) * this.__step;
      }
      return get(NumberController.prototype.__proto__ || Object.getPrototypeOf(NumberController.prototype), 'setValue', this).call(this, _v);
    }
  }, {
    key: 'min',
    value: function min(minValue) {
      this.__min = minValue;
      return this;
    }
  }, {
    key: 'max',
    value: function max(maxValue) {
      this.__max = maxValue;
      return this;
    }
  }, {
    key: 'step',
    value: function step(stepValue) {
      this.__step = stepValue;
      this.__impliedStep = stepValue;
      this.__precision = numDecimals(stepValue);
      return this;
    }
  }]);
  return NumberController;
}(Controller);

function roundToDecimal(value, decimals) {
  var tenTo = Math.pow(10, decimals);
  return Math.round(value * tenTo) / tenTo;
}
var NumberControllerBox = function (_NumberController) {
  inherits(NumberControllerBox, _NumberController);
  function NumberControllerBox(object, property, params) {
    classCallCheck(this, NumberControllerBox);
    var _this2 = possibleConstructorReturn(this, (NumberControllerBox.__proto__ || Object.getPrototypeOf(NumberControllerBox)).call(this, object, property, params));
    _this2.__truncationSuspended = false;
    var _this = _this2;
    var prevY = void 0;
    function onChange() {
      var attempted = parseFloat(_this.__input.value);
      if (!Common.isNaN(attempted)) {
        _this.setValue(attempted);
      }
    }
    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    function onBlur() {
      onFinish();
    }
    function onMouseDrag(e) {
      var diff = prevY - e.clientY;
      _this.setValue(_this.getValue() + diff * _this.__impliedStep);
      prevY = e.clientY;
    }
    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      onFinish();
    }
    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prevY = e.clientY;
    }
    _this2.__input = document.createElement('input');
    _this2.__input.setAttribute('type', 'text');
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'mousedown', onMouseDown);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
        onFinish();
      }
    });
    _this2.updateDisplay();
    _this2.domElement.appendChild(_this2.__input);
    return _this2;
  }
  createClass(NumberControllerBox, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
      return get(NumberControllerBox.prototype.__proto__ || Object.getPrototypeOf(NumberControllerBox.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerBox;
}(NumberController);

function map(v, i1, i2, o1, o2) {
  return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
}
var NumberControllerSlider = function (_NumberController) {
  inherits(NumberControllerSlider, _NumberController);
  function NumberControllerSlider(object, property, min, max, step) {
    classCallCheck(this, NumberControllerSlider);
    var _this2 = possibleConstructorReturn(this, (NumberControllerSlider.__proto__ || Object.getPrototypeOf(NumberControllerSlider)).call(this, object, property, { min: min, max: max, step: step }));
    var _this = _this2;
    _this2.__background = document.createElement('div');
    _this2.__foreground = document.createElement('div');
    dom.bind(_this2.__background, 'mousedown', onMouseDown);
    dom.bind(_this2.__background, 'touchstart', onTouchStart);
    dom.addClass(_this2.__background, 'slider');
    dom.addClass(_this2.__foreground, 'slider-fg');
    function onMouseDown(e) {
      document.activeElement.blur();
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      onMouseDrag(e);
    }
    function onMouseDrag(e) {
      e.preventDefault();
      var bgRect = _this.__background.getBoundingClientRect();
      _this.setValue(map(e.clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
      return false;
    }
    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    function onTouchStart(e) {
      if (e.touches.length !== 1) {
        return;
      }
      dom.bind(window, 'touchmove', onTouchMove);
      dom.bind(window, 'touchend', onTouchEnd);
      onTouchMove(e);
    }
    function onTouchMove(e) {
      var clientX = e.touches[0].clientX;
      var bgRect = _this.__background.getBoundingClientRect();
      _this.setValue(map(clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
    }
    function onTouchEnd() {
      dom.unbind(window, 'touchmove', onTouchMove);
      dom.unbind(window, 'touchend', onTouchEnd);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    _this2.updateDisplay();
    _this2.__background.appendChild(_this2.__foreground);
    _this2.domElement.appendChild(_this2.__background);
    return _this2;
  }
  createClass(NumberControllerSlider, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var pct = (this.getValue() - this.__min) / (this.__max - this.__min);
      this.__foreground.style.width = pct * 100 + '%';
      return get(NumberControllerSlider.prototype.__proto__ || Object.getPrototypeOf(NumberControllerSlider.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerSlider;
}(NumberController);

var FunctionController = function (_Controller) {
  inherits(FunctionController, _Controller);
  function FunctionController(object, property, text) {
    classCallCheck(this, FunctionController);
    var _this2 = possibleConstructorReturn(this, (FunctionController.__proto__ || Object.getPrototypeOf(FunctionController)).call(this, object, property));
    var _this = _this2;
    _this2.__button = document.createElement('div');
    _this2.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(_this2.__button, 'click', function (e) {
      e.preventDefault();
      _this.fire();
      return false;
    });
    dom.addClass(_this2.__button, 'button');
    _this2.domElement.appendChild(_this2.__button);
    return _this2;
  }
  createClass(FunctionController, [{
    key: 'fire',
    value: function fire() {
      if (this.__onChange) {
        this.__onChange.call(this);
      }
      this.getValue().call(this.object);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
    }
  }]);
  return FunctionController;
}(Controller);

var ColorController = function (_Controller) {
  inherits(ColorController, _Controller);
  function ColorController(object, property) {
    classCallCheck(this, ColorController);
    var _this2 = possibleConstructorReturn(this, (ColorController.__proto__ || Object.getPrototypeOf(ColorController)).call(this, object, property));
    _this2.__color = new Color(_this2.getValue());
    _this2.__temp = new Color(0);
    var _this = _this2;
    _this2.domElement = document.createElement('div');
    dom.makeSelectable(_this2.domElement, false);
    _this2.__selector = document.createElement('div');
    _this2.__selector.className = 'selector';
    _this2.__saturation_field = document.createElement('div');
    _this2.__saturation_field.className = 'saturation-field';
    _this2.__field_knob = document.createElement('div');
    _this2.__field_knob.className = 'field-knob';
    _this2.__field_knob_border = '2px solid ';
    _this2.__hue_knob = document.createElement('div');
    _this2.__hue_knob.className = 'hue-knob';
    _this2.__hue_field = document.createElement('div');
    _this2.__hue_field.className = 'hue-field';
    _this2.__input = document.createElement('input');
    _this2.__input.type = 'text';
    _this2.__input_textShadow = '0 1px 1px ';
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        onBlur.call(this);
      }
    });
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__selector, 'mousedown', function ()        {
      dom.addClass(this, 'drag').bind(window, 'mouseup', function ()        {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    dom.bind(_this2.__selector, 'touchstart', function ()        {
      dom.addClass(this, 'drag').bind(window, 'touchend', function ()        {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    var valueField = document.createElement('div');
    Common.extend(_this2.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });
    Common.extend(_this2.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: _this2.__field_knob_border + (_this2.__color.v < 0.5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    Common.extend(_this2.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });
    Common.extend(_this2.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });
    Common.extend(valueField.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    linearGradient(valueField, 'top', 'rgba(0,0,0,0)', '#000');
    Common.extend(_this2.__hue_field.style, {
      width: '15px',
      height: '100px',
      border: '1px solid #555',
      cursor: 'ns-resize',
      position: 'absolute',
      top: '3px',
      right: '3px'
    });
    hueGradient(_this2.__hue_field);
    Common.extend(_this2.__input.style, {
      outline: 'none',
      textAlign: 'center',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: _this2.__input_textShadow + 'rgba(0,0,0,0.7)'
    });
    dom.bind(_this2.__saturation_field, 'mousedown', fieldDown);
    dom.bind(_this2.__saturation_field, 'touchstart', fieldDown);
    dom.bind(_this2.__field_knob, 'mousedown', fieldDown);
    dom.bind(_this2.__field_knob, 'touchstart', fieldDown);
    dom.bind(_this2.__hue_field, 'mousedown', fieldDownH);
    dom.bind(_this2.__hue_field, 'touchstart', fieldDownH);
    function fieldDown(e) {
      setSV(e);
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'touchmove', setSV);
      dom.bind(window, 'mouseup', fieldUpSV);
      dom.bind(window, 'touchend', fieldUpSV);
    }
    function fieldDownH(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'touchmove', setH);
      dom.bind(window, 'mouseup', fieldUpH);
      dom.bind(window, 'touchend', fieldUpH);
    }
    function fieldUpSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'touchmove', setSV);
      dom.unbind(window, 'mouseup', fieldUpSV);
      dom.unbind(window, 'touchend', fieldUpSV);
      onFinish();
    }
    function fieldUpH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'touchmove', setH);
      dom.unbind(window, 'mouseup', fieldUpH);
      dom.unbind(window, 'touchend', fieldUpH);
      onFinish();
    }
    function onBlur() {
      var i = interpret(this.value);
      if (i !== false) {
        _this.__color.__state = i;
        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }
    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.__color.toOriginal());
      }
    }
    _this2.__saturation_field.appendChild(valueField);
    _this2.__selector.appendChild(_this2.__field_knob);
    _this2.__selector.appendChild(_this2.__saturation_field);
    _this2.__selector.appendChild(_this2.__hue_field);
    _this2.__hue_field.appendChild(_this2.__hue_knob);
    _this2.domElement.appendChild(_this2.__input);
    _this2.domElement.appendChild(_this2.__selector);
    _this2.updateDisplay();
    function setSV(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }
      var fieldRect = _this.__saturation_field.getBoundingClientRect();
      var _ref = e.touches && e.touches[0] || e,
          clientX = _ref.clientX,
          clientY = _ref.clientY;
      var s = (clientX - fieldRect.left) / (fieldRect.right - fieldRect.left);
      var v = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
      if (v > 1) {
        v = 1;
      } else if (v < 0) {
        v = 0;
      }
      if (s > 1) {
        s = 1;
      } else if (s < 0) {
        s = 0;
      }
      _this.__color.v = v;
      _this.__color.s = s;
      _this.setValue(_this.__color.toOriginal());
      return false;
    }
    function setH(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }
      var fieldRect = _this.__hue_field.getBoundingClientRect();
      var _ref2 = e.touches && e.touches[0] || e,
          clientY = _ref2.clientY;
      var h = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
      if (h > 1) {
        h = 1;
      } else if (h < 0) {
        h = 0;
      }
      _this.__color.h = h * 360;
      _this.setValue(_this.__color.toOriginal());
      return false;
    }
    return _this2;
  }
  createClass(ColorController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var i = interpret(this.getValue());
      if (i !== false) {
        var mismatch = false;
        Common.each(Color.COMPONENTS, function (component) {
          if (!Common.isUndefined(i[component]) && !Common.isUndefined(this.__color.__state[component]) && i[component] !== this.__color.__state[component]) {
            mismatch = true;
            return {};
          }
        }, this);
        if (mismatch) {
          Common.extend(this.__color.__state, i);
        }
      }
      Common.extend(this.__temp.__state, this.__color.__state);
      this.__temp.a = 1;
      var flip = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0;
      var _flip = 255 - flip;
      Common.extend(this.__field_knob.style, {
        marginLeft: 100 * this.__color.s - 7 + 'px',
        marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
        backgroundColor: this.__temp.toHexString(),
        border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip + ')'
      });
      this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px';
      this.__temp.s = 1;
      this.__temp.v = 1;
      linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toHexString());
      this.__input.value = this.__color.toString();
      Common.extend(this.__input.style, {
        backgroundColor: this.__color.toHexString(),
        color: 'rgb(' + flip + ',' + flip + ',' + flip + ')',
        textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip + ',.7)'
      });
    }
  }]);
  return ColorController;
}(Controller);
var vendors = ['-moz-', '-o-', '-webkit-', '-ms-', ''];
function linearGradient(elem, x, a, b) {
  elem.style.background = '';
  Common.each(vendors, function (vendor) {
    elem.style.cssText += 'background: ' + vendor + 'linear-gradient(' + x + ', ' + a + ' 0%, ' + b + ' 100%); ';
  });
}
function hueGradient(elem) {
  elem.style.background = '';
  elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
  elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
}

var css = {
  load: function load(url, indoc) {
    var doc = indoc || document;
    var link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    doc.getElementsByTagName('head')[0].appendChild(link);
  },
  inject: function inject(cssContent, indoc) {
    var doc = indoc || document;
    var injected = document.createElement('style');
    injected.type = 'text/css';
    injected.innerHTML = cssContent;
    var head = doc.getElementsByTagName('head')[0];
    try {
      head.appendChild(injected);
    } catch (e) {
    }
  }
};

var saveDialogContents = '<div id=\"dg-save\" class=\"dg dialogue\">Here\\\'s the new load parameter for your <code>GUI</code>\\\'s constructor:<textarea id=\"dg-new-constructor\"></textarea><div id=\"dg-save-locally\"><input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save    values to <code>localStorage</code> on exit.<div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will override those passed to <code>dat.GUI</code>\\\'s constructor. This makes it     easier to work incrementally, but <code>localStorage</code> is fragile, and your friends may not see the same values you do.    </div> </div></div>';

var ControllerFactory = function ControllerFactory(object, property) {
  var initialValue = object[property];
  if (Common.isArray(arguments[2]) || Common.isObject(arguments[2])) {
    return new OptionController(object, property, arguments[2]);
  }
  if (Common.isNumber(initialValue)) {
    if (Common.isNumber(arguments[2]) && Common.isNumber(arguments[3])) {
      if (Common.isNumber(arguments[4])) {
        return new NumberControllerSlider(object, property, arguments[2], arguments[3], arguments[4]);
      }
      return new NumberControllerSlider(object, property, arguments[2], arguments[3]);
    }
    if (Common.isNumber(arguments[4])) {
      return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3], step: arguments[4] });
    }
    return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });
  }
  if (Common.isString(initialValue)) {
    return new StringController(object, property);
  }
  if (Common.isFunction(initialValue)) {
    return new FunctionController(object, property, '');
  }
  if (Common.isBoolean(initialValue)) {
    return new BooleanController(object, property);
  }
  return null;
};

function requestAnimationFrame(callback) {
  setTimeout(callback, 1000 / 60);
}
var requestAnimationFrame$1 = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimationFrame;

var CenteredDiv = function () {
  function CenteredDiv() {
    classCallCheck(this, CenteredDiv);
    this.backgroundElement = document.createElement('div');
    Common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear',
      transition: 'opacity 0.2s linear'
    });
    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';
    this.domElement = document.createElement('div');
    Common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
      transition: 'transform 0.2s ease-out, opacity 0.2s linear'
    });
    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);
    var _this = this;
    dom.bind(this.backgroundElement, 'click', function () {
      _this.hide();
    });
  }
  createClass(CenteredDiv, [{
    key: 'show',
    value: function show() {
      var _this = this;
      this.backgroundElement.style.display = 'block';
      this.domElement.style.display = 'block';
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
      this.layout();
      Common.defer(function () {
        _this.backgroundElement.style.opacity = 1;
        _this.domElement.style.opacity = 1;
        _this.domElement.style.webkitTransform = 'scale(1)';
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this = this;
      var hide = function hide() {
        _this.domElement.style.display = 'none';
        _this.backgroundElement.style.display = 'none';
        dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
        dom.unbind(_this.domElement, 'transitionend', hide);
        dom.unbind(_this.domElement, 'oTransitionEnd', hide);
      };
      dom.bind(this.domElement, 'webkitTransitionEnd', hide);
      dom.bind(this.domElement, 'transitionend', hide);
      dom.bind(this.domElement, 'oTransitionEnd', hide);
      this.backgroundElement.style.opacity = 0;
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
    }
  }, {
    key: 'layout',
    value: function layout() {
      this.domElement.style.left = window.innerWidth / 2 - dom.getWidth(this.domElement) / 2 + 'px';
      this.domElement.style.top = window.innerHeight / 2 - dom.getHeight(this.domElement) / 2 + 'px';
    }
  }]);
  return CenteredDiv;
}();

var styleSheet = ___$insertStyle(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:"+
        "0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}");

css.inject(styleSheet);
var CSS_NAMESPACE = 'dg';
var HIDE_KEY_CODE = 72;
var CLOSE_BUTTON_HEIGHT = 20;
var DEFAULT_DEFAULT_PRESET_NAME = 'Default';
var SUPPORTS_LOCAL_STORAGE = function () {
  try {
    return !!window.localStorage;
  } catch (e) {
    return false;
  }
}();
var SAVE_DIALOGUE = void 0;
var autoPlaceVirgin = true;
var autoPlaceContainer = void 0;
var hide = false;
var hideableGuis = [];
var GUI = function GUI(pars) {
  var _this = this;
  var params = pars || {};
  this.domElement = document.createElement('div');
  this.__ul = document.createElement('ul');
  this.domElement.appendChild(this.__ul);
  dom.addClass(this.domElement, CSS_NAMESPACE);
  this.__folders = {};
  this.__controllers = [];
  this.__rememberedObjects = [];
  this.__rememberedObjectIndecesToControllers = [];
  this.__listening = [];
  params = Common.defaults(params, {
    closeOnTop: false,
    autoPlace: true,
    width: GUI.DEFAULT_WIDTH
  });
  params = Common.defaults(params, {
    resizable: params.autoPlace,
    hideable: params.autoPlace
  });
  if (!Common.isUndefined(params.load)) {
    if (params.preset) {
      params.load.preset = params.preset;
    }
  } else {
    params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };
  }
  if (Common.isUndefined(params.parent) && params.hideable) {
    hideableGuis.push(this);
  }
  params.resizable = Common.isUndefined(params.parent) && params.resizable;
  if (params.autoPlace && Common.isUndefined(params.scrollable)) {
    params.scrollable = true;
  }
  var useLocalStorage = SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';
  var saveToLocalStorage = void 0;
  var titleRow = void 0;
  Object.defineProperties(this,
  {
    parent: {
      get: function get$$1() {
        return params.parent;
      }
    },
    scrollable: {
      get: function get$$1() {
        return params.scrollable;
      }
    },
    autoPlace: {
      get: function get$$1() {
        return params.autoPlace;
      }
    },
    closeOnTop: {
      get: function get$$1() {
        return params.closeOnTop;
      }
    },
    preset: {
      get: function get$$1() {
        if (_this.parent) {
          return _this.getRoot().preset;
        }
        return params.load.preset;
      },
      set: function set$$1(v) {
        if (_this.parent) {
          _this.getRoot().preset = v;
        } else {
          params.load.preset = v;
        }
        setPresetSelectIndex(this);
        _this.revert();
      }
    },
    width: {
      get: function get$$1() {
        return params.width;
      },
      set: function set$$1(v) {
        params.width = v;
        setWidth(_this, v);
      }
    },
    name: {
      get: function get$$1() {
        return params.name;
      },
      set: function set$$1(v) {
        params.name = v;
        if (titleRow) {
          titleRow.innerHTML = params.name;
        }
      }
    },
    closed: {
      get: function get$$1() {
        return params.closed;
      },
      set: function set$$1(v) {
        params.closed = v;
        if (params.closed) {
          dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
        } else {
          dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
        }
        this.onResize();
        if (_this.__closeButton) {
          _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
        }
      }
    },
    load: {
      get: function get$$1() {
        return params.load;
      }
    },
    useLocalStorage: {
      get: function get$$1() {
        return useLocalStorage;
      },
      set: function set$$1(bool) {
        if (SUPPORTS_LOCAL_STORAGE) {
          useLocalStorage = bool;
          if (bool) {
            dom.bind(window, 'unload', saveToLocalStorage);
          } else {
            dom.unbind(window, 'unload', saveToLocalStorage);
          }
          localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
        }
      }
    }
  });
  if (Common.isUndefined(params.parent)) {
    this.closed = params.closed || false;
    dom.addClass(this.domElement, GUI.CLASS_MAIN);
    dom.makeSelectable(this.domElement, false);
    if (SUPPORTS_LOCAL_STORAGE) {
      if (useLocalStorage) {
        _this.useLocalStorage = true;
        var savedGui = localStorage.getItem(getLocalStorageHash(this, 'gui'));
        if (savedGui) {
          params.load = JSON.parse(savedGui);
        }
      }
    }
    this.__closeButton = document.createElement('div');
    this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
    dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
    if (params.closeOnTop) {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_TOP);
      this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0]);
    } else {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BOTTOM);
      this.domElement.appendChild(this.__closeButton);
    }
    dom.bind(this.__closeButton, 'click', function () {
      _this.closed = !_this.closed;
    });
  } else {
    if (params.closed === undefined) {
      params.closed = true;
    }
    var titleRowName = document.createTextNode(params.name);
    dom.addClass(titleRowName, 'controller-name');
    titleRow = addRow(_this, titleRowName);
    var onClickTitle = function onClickTitle(e) {
      e.preventDefault();
      _this.closed = !_this.closed;
      return false;
    };
    dom.addClass(this.__ul, GUI.CLASS_CLOSED);
    dom.addClass(titleRow, 'title');
    dom.bind(titleRow, 'click', onClickTitle);
    if (!params.closed) {
      this.closed = false;
    }
  }
  if (params.autoPlace) {
    if (Common.isUndefined(params.parent)) {
      if (autoPlaceVirgin) {
        autoPlaceContainer = document.createElement('div');
        dom.addClass(autoPlaceContainer, CSS_NAMESPACE);
        dom.addClass(autoPlaceContainer, GUI.CLASS_AUTO_PLACE_CONTAINER);
        document.body.appendChild(autoPlaceContainer);
        autoPlaceVirgin = false;
      }
      autoPlaceContainer.appendChild(this.domElement);
      dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);
    }
    if (!this.parent) {
      setWidth(_this, params.width);
    }
  }
  this.__resizeHandler = function () {
    _this.onResizeDebounced();
  };
  dom.bind(window, 'resize', this.__resizeHandler);
  dom.bind(this.__ul, 'webkitTransitionEnd', this.__resizeHandler);
  dom.bind(this.__ul, 'transitionend', this.__resizeHandler);
  dom.bind(this.__ul, 'oTransitionEnd', this.__resizeHandler);
  this.onResize();
  if (params.resizable) {
    addResizeHandle(this);
  }
  saveToLocalStorage = function saveToLocalStorage() {
    if (SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(_this, 'isLocal')) === 'true') {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }
  };
  this.saveToLocalStorageIfPossible = saveToLocalStorage;
  function resetWidth() {
    var root = _this.getRoot();
    root.width += 1;
    Common.defer(function () {
      root.width -= 1;
    });
  }
  if (!params.parent) {
    resetWidth();
  }
};
GUI.toggleHide = function () {
  hide = !hide;
  Common.each(hideableGuis, function (gui) {
    gui.domElement.style.display = hide ? 'none' : '';
  });
};
GUI.CLASS_AUTO_PLACE = 'a';
GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
GUI.CLASS_MAIN = 'main';
GUI.CLASS_CONTROLLER_ROW = 'cr';
GUI.CLASS_TOO_TALL = 'taller-than-window';
GUI.CLASS_CLOSED = 'closed';
GUI.CLASS_CLOSE_BUTTON = 'close-button';
GUI.CLASS_CLOSE_TOP = 'close-top';
GUI.CLASS_CLOSE_BOTTOM = 'close-bottom';
GUI.CLASS_DRAG = 'drag';
GUI.DEFAULT_WIDTH = 245;
GUI.TEXT_CLOSED = 'Close Controls';
GUI.TEXT_OPEN = 'Open Controls';
GUI._keydownHandler = function (e) {
  if (document.activeElement.type !== 'text' && (e.which === HIDE_KEY_CODE || e.keyCode === HIDE_KEY_CODE)) {
    GUI.toggleHide();
  }
};
dom.bind(window, 'keydown', GUI._keydownHandler, false);
Common.extend(GUI.prototype,
{
  add: function add(object, property) {
    return _add(this, object, property, {
      factoryArgs: Array.prototype.slice.call(arguments, 2)
    });
  },
  addColor: function addColor(object, property) {
    return _add(this, object, property, {
      color: true
    });
  },
  remove: function remove(controller) {
    this.__ul.removeChild(controller.__li);
    this.__controllers.splice(this.__controllers.indexOf(controller), 1);
    var _this = this;
    Common.defer(function () {
      _this.onResize();
    });
  },
  destroy: function destroy() {
    if (this.parent) {
      throw new Error('Only the root GUI should be removed with .destroy(). ' + 'For subfolders, use gui.removeFolder(folder) instead.');
    }
    if (this.autoPlace) {
      autoPlaceContainer.removeChild(this.domElement);
    }
    var _this = this;
    Common.each(this.__folders, function (subfolder) {
      _this.removeFolder(subfolder);
    });
    dom.unbind(window, 'keydown', GUI._keydownHandler, false);
    removeListeners(this);
  },
  addFolder: function addFolder(name) {
    if (this.__folders[name] !== undefined) {
      throw new Error('You already have a folder in this GUI by the' + ' name "' + name + '"');
    }
    var newGuiParams = { name: name, parent: this };
    newGuiParams.autoPlace = this.autoPlace;
    if (this.load &&
    this.load.folders &&
    this.load.folders[name]) {
      newGuiParams.closed = this.load.folders[name].closed;
      newGuiParams.load = this.load.folders[name];
    }
    var gui = new GUI(newGuiParams);
    this.__folders[name] = gui;
    var li = addRow(this, gui.domElement);
    dom.addClass(li, 'folder');
    return gui;
  },
  removeFolder: function removeFolder(folder) {
    this.__ul.removeChild(folder.domElement.parentElement);
    delete this.__folders[folder.name];
    if (this.load &&
    this.load.folders &&
    this.load.folders[folder.name]) {
      delete this.load.folders[folder.name];
    }
    removeListeners(folder);
    var _this = this;
    Common.each(folder.__folders, function (subfolder) {
      folder.removeFolder(subfolder);
    });
    Common.defer(function () {
      _this.onResize();
    });
  },
  open: function open() {
    this.closed = false;
  },
  close: function close() {
    this.closed = true;
  },
  hide: function hide() {
    this.domElement.style.display = 'none';
  },
  show: function show() {
    this.domElement.style.display = '';
  },
  onResize: function onResize() {
    var root = this.getRoot();
    if (root.scrollable) {
      var top = dom.getOffset(root.__ul).top;
      var h = 0;
      Common.each(root.__ul.childNodes, function (node) {
        if (!(root.autoPlace && node === root.__save_row)) {
          h += dom.getHeight(node);
        }
      });
      if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
        dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
      } else {
        dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = 'auto';
      }
    }
    if (root.__resize_handle) {
      Common.defer(function () {
        root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
      });
    }
    if (root.__closeButton) {
      root.__closeButton.style.width = root.width + 'px';
    }
  },
  onResizeDebounced: Common.debounce(function () {
    this.onResize();
  }, 50),
  remember: function remember() {
    if (Common.isUndefined(SAVE_DIALOGUE)) {
      SAVE_DIALOGUE = new CenteredDiv();
      SAVE_DIALOGUE.domElement.innerHTML = saveDialogContents;
    }
    if (this.parent) {
      throw new Error('You can only call remember on a top level GUI.');
    }
    var _this = this;
    Common.each(Array.prototype.slice.call(arguments), function (object) {
      if (_this.__rememberedObjects.length === 0) {
        addSaveMenu(_this);
      }
      if (_this.__rememberedObjects.indexOf(object) === -1) {
        _this.__rememberedObjects.push(object);
      }
    });
    if (this.autoPlace) {
      setWidth(this, this.width);
    }
  },
  getRoot: function getRoot() {
    var gui = this;
    while (gui.parent) {
      gui = gui.parent;
    }
    return gui;
  },
  getSaveObject: function getSaveObject() {
    var toReturn = this.load;
    toReturn.closed = this.closed;
    if (this.__rememberedObjects.length > 0) {
      toReturn.preset = this.preset;
      if (!toReturn.remembered) {
        toReturn.remembered = {};
      }
      toReturn.remembered[this.preset] = getCurrentPreset(this);
    }
    toReturn.folders = {};
    Common.each(this.__folders, function (element, key) {
      toReturn.folders[key] = element.getSaveObject();
    });
    return toReturn;
  },
  save: function save() {
    if (!this.load.remembered) {
      this.load.remembered = {};
    }
    this.load.remembered[this.preset] = getCurrentPreset(this);
    markPresetModified(this, false);
    this.saveToLocalStorageIfPossible();
  },
  saveAs: function saveAs(presetName) {
    if (!this.load.remembered) {
      this.load.remembered = {};
      this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
    }
    this.load.remembered[presetName] = getCurrentPreset(this);
    this.preset = presetName;
    addPresetOption(this, presetName, true);
    this.saveToLocalStorageIfPossible();
  },
  revert: function revert(gui) {
    Common.each(this.__controllers, function (controller) {
      if (!this.getRoot().load.remembered) {
        controller.setValue(controller.initialValue);
      } else {
        recallSavedValue(gui || this.getRoot(), controller);
      }
      if (controller.__onFinishChange) {
        controller.__onFinishChange.call(controller, controller.getValue());
      }
    }, this);
    Common.each(this.__folders, function (folder) {
      folder.revert(folder);
    });
    if (!gui) {
      markPresetModified(this.getRoot(), false);
    }
  },
  listen: function listen(controller) {
    var init = this.__listening.length === 0;
    this.__listening.push(controller);
    if (init) {
      updateDisplays(this.__listening);
    }
  },
  updateDisplay: function updateDisplay() {
    Common.each(this.__controllers, function (controller) {
      controller.updateDisplay();
    });
    Common.each(this.__folders, function (folder) {
      folder.updateDisplay();
    });
  }
});
function addRow(gui, newDom, liBefore) {
  var li = document.createElement('li');
  if (newDom) {
    li.appendChild(newDom);
  }
  if (liBefore) {
    gui.__ul.insertBefore(li, liBefore);
  } else {
    gui.__ul.appendChild(li);
  }
  gui.onResize();
  return li;
}
function removeListeners(gui) {
  dom.unbind(window, 'resize', gui.__resizeHandler);
  if (gui.saveToLocalStorageIfPossible) {
    dom.unbind(window, 'unload', gui.saveToLocalStorageIfPossible);
  }
}
function markPresetModified(gui, modified) {
  var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
  if (modified) {
    opt.innerHTML = opt.value + '*';
  } else {
    opt.innerHTML = opt.value;
  }
}
function augmentController(gui, li, controller) {
  controller.__li = li;
  controller.__gui = gui;
  Common.extend(controller,                                   {
    options: function options(_options) {
      if (arguments.length > 1) {
        var nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: nextSibling,
          factoryArgs: [Common.toArray(arguments)]
        });
      }
      if (Common.isArray(_options) || Common.isObject(_options)) {
        var _nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: _nextSibling,
          factoryArgs: [_options]
        });
      }
    },
    name: function name(_name) {
      controller.__li.firstElementChild.firstElementChild.innerHTML = _name;
      return controller;
    },
    listen: function listen() {
      controller.__gui.listen(controller);
      return controller;
    },
    remove: function remove() {
      controller.__gui.remove(controller);
      return controller;
    }
  });
  if (controller instanceof NumberControllerSlider) {
    var box = new NumberControllerBox(controller.object, controller.property, { min: controller.__min, max: controller.__max, step: controller.__step });
    Common.each(['updateDisplay', 'onChange', 'onFinishChange', 'step', 'min', 'max'], function (method) {
      var pc = controller[method];
      var pb = box[method];
      controller[method] = box[method] = function () {
        var args = Array.prototype.slice.call(arguments);
        pb.apply(box, args);
        return pc.apply(controller, args);
      };
    });
    dom.addClass(li, 'has-slider');
    controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
  } else if (controller instanceof NumberControllerBox) {
    var r = function r(returned) {
      if (Common.isNumber(controller.__min) && Common.isNumber(controller.__max)) {
        var oldName = controller.__li.firstElementChild.firstElementChild.innerHTML;
        var wasListening = controller.__gui.__listening.indexOf(controller) > -1;
        controller.remove();
        var newController = _add(gui, controller.object, controller.property, {
          before: controller.__li.nextElementSibling,
          factoryArgs: [controller.__min, controller.__max, controller.__step]
        });
        newController.name(oldName);
        if (wasListening) newController.listen();
        return newController;
      }
      return returned;
    };
    controller.min = Common.compose(r, controller.min);
    controller.max = Common.compose(r, controller.max);
  } else if (controller instanceof BooleanController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__checkbox, 'click');
    });
    dom.bind(controller.__checkbox, 'click', function (e) {
      e.stopPropagation();
    });
  } else if (controller instanceof FunctionController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__button, 'click');
    });
    dom.bind(li, 'mouseover', function () {
      dom.addClass(controller.__button, 'hover');
    });
    dom.bind(li, 'mouseout', function () {
      dom.removeClass(controller.__button, 'hover');
    });
  } else if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
    controller.updateDisplay = Common.compose(function (val) {
      li.style.borderLeftColor = controller.__color.toString();
      return val;
    }, controller.updateDisplay);
    controller.updateDisplay();
  }
  controller.setValue = Common.compose(function (val) {
    if (gui.getRoot().__preset_select && controller.isModified()) {
      markPresetModified(gui.getRoot(), true);
    }
    return val;
  }, controller.setValue);
}
function recallSavedValue(gui, controller) {
  var root = gui.getRoot();
  var matchedIndex = root.__rememberedObjects.indexOf(controller.object);
  if (matchedIndex !== -1) {
    var controllerMap = root.__rememberedObjectIndecesToControllers[matchedIndex];
    if (controllerMap === undefined) {
      controllerMap = {};
      root.__rememberedObjectIndecesToControllers[matchedIndex] = controllerMap;
    }
    controllerMap[controller.property] = controller;
    if (root.load && root.load.remembered) {
      var presetMap = root.load.remembered;
      var preset = void 0;
      if (presetMap[gui.preset]) {
        preset = presetMap[gui.preset];
      } else if (presetMap[DEFAULT_DEFAULT_PRESET_NAME]) {
        preset = presetMap[DEFAULT_DEFAULT_PRESET_NAME];
      } else {
        return;
      }
      if (preset[matchedIndex] && preset[matchedIndex][controller.property] !== undefined) {
        var value = preset[matchedIndex][controller.property];
        controller.initialValue = value;
        controller.setValue(value);
      }
    }
  }
}
function _add(gui, object, property, params) {
  if (object[property] === undefined) {
    throw new Error('Object "' + object + '" has no property "' + property + '"');
  }
  var controller = void 0;
  if (params.color) {
    controller = new ColorController(object, property);
  } else {
    var factoryArgs = [object, property].concat(params.factoryArgs);
    controller = ControllerFactory.apply(gui, factoryArgs);
  }
  if (params.before instanceof Controller) {
    params.before = params.before.__li;
  }
  recallSavedValue(gui, controller);
  dom.addClass(controller.domElement, 'c');
  var name = document.createElement('span');
  dom.addClass(name, 'property-name');
  name.innerHTML = controller.property;
  var container = document.createElement('div');
  container.appendChild(name);
  container.appendChild(controller.domElement);
  var li = addRow(gui, container, params.before);
  dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
  if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
  } else {
    dom.addClass(li, _typeof(controller.getValue()));
  }
  augmentController(gui, li, controller);
  gui.__controllers.push(controller);
  return controller;
}
function getLocalStorageHash(gui, key) {
  return document.location.href + '.' + key;
}
function addPresetOption(gui, name, setSelected) {
  var opt = document.createElement('option');
  opt.innerHTML = name;
  opt.value = name;
  gui.__preset_select.appendChild(opt);
  if (setSelected) {
    gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
  }
}
function showHideExplain(gui, explain) {
  explain.style.display = gui.useLocalStorage ? 'block' : 'none';
}
function addSaveMenu(gui) {
  var div = gui.__save_row = document.createElement('li');
  dom.addClass(gui.domElement, 'has-save');
  gui.__ul.insertBefore(div, gui.__ul.firstChild);
  dom.addClass(div, 'save-row');
  var gears = document.createElement('span');
  gears.innerHTML = '&nbsp;';
  dom.addClass(gears, 'button gears');
  var button = document.createElement('span');
  button.innerHTML = 'Save';
  dom.addClass(button, 'button');
  dom.addClass(button, 'save');
  var button2 = document.createElement('span');
  button2.innerHTML = 'New';
  dom.addClass(button2, 'button');
  dom.addClass(button2, 'save-as');
  var button3 = document.createElement('span');
  button3.innerHTML = 'Revert';
  dom.addClass(button3, 'button');
  dom.addClass(button3, 'revert');
  var select = gui.__preset_select = document.createElement('select');
  if (gui.load && gui.load.remembered) {
    Common.each(gui.load.remembered, function (value, key) {
      addPresetOption(gui, key, key === gui.preset);
    });
  } else {
    addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
  }
  dom.bind(select, 'change', function () {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
    }
    gui.preset = this.value;
  });
  div.appendChild(select);
  div.appendChild(gears);
  div.appendChild(button);
  div.appendChild(button2);
  div.appendChild(button3);
  if (SUPPORTS_LOCAL_STORAGE) {
    var explain = document.getElementById('dg-local-explain');
    var localStorageCheckBox = document.getElementById('dg-local-storage');
    var saveLocally = document.getElementById('dg-save-locally');
    saveLocally.style.display = 'block';
    if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
      localStorageCheckBox.setAttribute('checked', 'checked');
    }
    showHideExplain(gui, explain);
    dom.bind(localStorageCheckBox, 'change', function () {
      gui.useLocalStorage = !gui.useLocalStorage;
      showHideExplain(gui, explain);
    });
  }
  var newConstructorTextArea = document.getElementById('dg-new-constructor');
  dom.bind(newConstructorTextArea, 'keydown', function (e) {
    if (e.metaKey && (e.which === 67 || e.keyCode === 67)) {
      SAVE_DIALOGUE.hide();
    }
  });
  dom.bind(gears, 'click', function () {
    newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
    SAVE_DIALOGUE.show();
    newConstructorTextArea.focus();
    newConstructorTextArea.select();
  });
  dom.bind(button, 'click', function () {
    gui.save();
  });
  dom.bind(button2, 'click', function () {
    var presetName = prompt('Enter a new preset name.');
    if (presetName) {
      gui.saveAs(presetName);
    }
  });
  dom.bind(button3, 'click', function () {
    gui.revert();
  });
}
function addResizeHandle(gui) {
  var pmouseX = void 0;
  gui.__resize_handle = document.createElement('div');
  Common.extend(gui.__resize_handle.style, {
    width: '6px',
    marginLeft: '-3px',
    height: '200px',
    cursor: 'ew-resize',
    position: 'absolute'
  });
  function drag(e) {
    e.preventDefault();
    gui.width += pmouseX - e.clientX;
    gui.onResize();
    pmouseX = e.clientX;
    return false;
  }
  function dragStop() {
    dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.unbind(window, 'mousemove', drag);
    dom.unbind(window, 'mouseup', dragStop);
  }
  function dragStart(e) {
    e.preventDefault();
    pmouseX = e.clientX;
    dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.bind(window, 'mousemove', drag);
    dom.bind(window, 'mouseup', dragStop);
    return false;
  }
  dom.bind(gui.__resize_handle, 'mousedown', dragStart);
  dom.bind(gui.__closeButton, 'mousedown', dragStart);
  gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
}
function setWidth(gui, w) {
  gui.domElement.style.width = w + 'px';
  if (gui.__save_row && gui.autoPlace) {
    gui.__save_row.style.width = w + 'px';
  }
  if (gui.__closeButton) {
    gui.__closeButton.style.width = w + 'px';
  }
}
function getCurrentPreset(gui, useInitialValues) {
  var toReturn = {};
  Common.each(gui.__rememberedObjects, function (val, index) {
    var savedValues = {};
    var controllerMap = gui.__rememberedObjectIndecesToControllers[index];
    Common.each(controllerMap, function (controller, property) {
      savedValues[property] = useInitialValues ? controller.initialValue : controller.getValue();
    });
    toReturn[index] = savedValues;
  });
  return toReturn;
}
function setPresetSelectIndex(gui) {
  for (var index = 0; index < gui.__preset_select.length; index++) {
    if (gui.__preset_select[index].value === gui.preset) {
      gui.__preset_select.selectedIndex = index;
    }
  }
}
function updateDisplays(controllerArray) {
  if (controllerArray.length !== 0) {
    requestAnimationFrame$1.call(window, function () {
      updateDisplays(controllerArray);
    });
  }
  Common.each(controllerArray, function (c) {
    c.updateDisplay();
  });
}

var color = {
  Color: Color,
  math: ColorMath,
  interpret: interpret
};
var controllers = {
  Controller: Controller,
  BooleanController: BooleanController,
  OptionController: OptionController,
  StringController: StringController,
  NumberController: NumberController,
  NumberControllerBox: NumberControllerBox,
  NumberControllerSlider: NumberControllerSlider,
  FunctionController: FunctionController,
  ColorController: ColorController
};
var dom$1 = { dom: dom };
var gui = { GUI: GUI };
var GUI$1 = GUI;
var index = {
  color: color,
  controllers: controllers,
  dom: dom$1,
  gui: gui,
  GUI: GUI$1
};

exports.color = color;
exports.controllers = controllers;
exports.dom = dom$1;
exports.gui = gui;
exports.GUI = GUI$1;
exports['default'] = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=dat.gui.js.map`);

eval(`/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.4.0
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	/* else  if(typeof define === 'function' && define.amd)
		define([], factory); */
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMatrixArrayType = setMatrixArrayType;
exports.toRadian = toRadian;
exports.equals = equals;
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * Common utilities
 * @module glMatrix
 */

// Configuration Constants
var EPSILON = exports.EPSILON = 0.000001;
var ARRAY_TYPE = exports.ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
var RANDOM = exports.RANDOM = Math.random;

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
function setMatrixArrayType(type) {
  exports.ARRAY_TYPE = ARRAY_TYPE = type;
}

var degree = Math.PI / 180;

/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
function toRadian(a) {
  return a * degree;
}

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
function equals(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sub = exports.mul = undefined;
exports.create = create;
exports.fromMat4 = fromMat4;
exports.clone = clone;
exports.copy = copy;
exports.fromValues = fromValues;
exports.set = set;
exports.identity = identity;
exports.transpose = transpose;
exports.invert = invert;
exports.adjoint = adjoint;
exports.determinant = determinant;
exports.multiply = multiply;
exports.translate = translate;
exports.rotate = rotate;
exports.scale = scale;
exports.fromTranslation = fromTranslation;
exports.fromRotation = fromRotation;
exports.fromScaling = fromScaling;
exports.fromMat2d = fromMat2d;
exports.fromQuat = fromQuat;
exports.normalFromMat4 = normalFromMat4;
exports.projection = projection;
exports.str = str;
exports.frob = frob;
exports.add = add;
exports.subtract = subtract;
exports.multiplyScalar = multiplyScalar;
exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
exports.exactEquals = exactEquals;
exports.equals = equals;

var _common = __webpack_require__(0);

var glMatrix = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(9);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */
function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  var out = new glMatrix.ARRAY_TYPE(9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}

/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */
function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }

  return out;
}

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20;

  // Calculate the determinant
  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;
  return out;
}

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  var b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  var b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  var b20 = b[6],
      b21 = b[7],
      b22 = b[8];

  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;

  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;

  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
function translate(out, a, v) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      x = v[0],
      y = v[1];

  out[0] = a00;
  out[1] = a01;
  out[2] = a02;

  out[3] = a10;
  out[4] = a11;
  out[5] = a12;

  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
function rotate(out, a, rad) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      s = Math.sin(rad),
      c = Math.cos(rad);

  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;

  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;

  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
function scale(out, a, v) {
  var x = v[0],
      y = v[1];

  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];

  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];

  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
function fromRotation(out, rad) {
  var s = Math.sin(rad),
      c = Math.cos(rad);

  out[0] = c;
  out[1] = s;
  out[2] = 0;

  out[3] = -s;
  out[4] = c;
  out[5] = 0;

  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;

  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;

  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;

  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;

  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;

  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;

  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;

  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;

  return out;
}

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
function normalFromMat4(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

  return out;
}

/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */
function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ')';
}

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2));
}

/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}

/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7],
      a8 = a[8];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7],
      b8 = b[8];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8));
}

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
var mul = exports.mul = multiply;

/**
 * Alias for {@link mat3.subtract}
 * @function
 */
var sub = exports.sub = subtract;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEach = exports.sqrLen = exports.len = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = undefined;
exports.create = create;
exports.clone = clone;
exports.length = length;
exports.fromValues = fromValues;
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.ceil = ceil;
exports.floor = floor;
exports.min = min;
exports.max = max;
exports.round = round;
exports.scale = scale;
exports.scaleAndAdd = scaleAndAdd;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.hermite = hermite;
exports.bezier = bezier;
exports.random = random;
exports.transformMat4 = transformMat4;
exports.transformMat3 = transformMat3;
exports.transformQuat = transformQuat;
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.rotateZ = rotateZ;
exports.angle = angle;
exports.str = str;
exports.exactEquals = exactEquals;
exports.equals = equals;

var _common = __webpack_require__(0);

var glMatrix = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(3);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
function fromValues(x, y, z) {
  var out = new glMatrix.ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}

/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}

/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}

/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;
  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
  }
  return out;
}

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];

  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}

/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);

  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

  return out;
}

/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;

  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

  return out;
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
function random(out, scale) {
  scale = scale || 1.0;

  var r = glMatrix.RANDOM() * 2.0 * Math.PI;
  var z = glMatrix.RANDOM() * 2.0 - 1.0;
  var zScale = Math.sqrt(1.0 - z * z) * scale;

  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
function transformQuat(out, a, q) {
  // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

  var x = a[0],
      y = a[1],
      z = a[2];
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];

  // calculate quat * vec
  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z;

  // calculate result * inverse quat
  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  return out;
}

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateX(out, a, b, c) {
  var p = [],
      r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0];
  r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
  r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateY(out, a, b, c) {
  var p = [],
      r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateZ(out, a, b, c) {
  var p = [],
      r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
  r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
  r[2] = p[2];

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
function angle(a, b) {
  var tempA = fromValues(a[0], a[1], a[2]);
  var tempB = fromValues(b[0], b[1], b[2]);

  normalize(tempA, tempA);
  normalize(tempB, tempB);

  var cosine = dot(tempA, tempB);

  if (cosine > 1.0) {
    return 0;
  } else if (cosine < -1.0) {
    return Math.PI;
  } else {
    return Math.acos(cosine);
  }
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
}

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
}

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
var sub = exports.sub = subtract;

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
var mul = exports.mul = multiply;

/**
 * Alias for {@link vec3.divide}
 * @function
 */
var div = exports.div = divide;

/**
 * Alias for {@link vec3.distance}
 * @function
 */
var dist = exports.dist = distance;

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
var sqrDist = exports.sqrDist = squaredDistance;

/**
 * Alias for {@link vec3.length}
 * @function
 */
var len = exports.len = length;

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
var sqrLen = exports.sqrLen = squaredLength;

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
var forEach = exports.forEach = function () {
  var vec = create();

  return function (a, stride, offset, count, fn, arg) {
    var i = void 0,
        l = void 0;
    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];
    }

    return a;
  };
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEach = exports.sqrLen = exports.len = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = undefined;
exports.create = create;
exports.clone = clone;
exports.fromValues = fromValues;
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.ceil = ceil;
exports.floor = floor;
exports.min = min;
exports.max = max;
exports.round = round;
exports.scale = scale;
exports.scaleAndAdd = scaleAndAdd;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.length = length;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.lerp = lerp;
exports.random = random;
exports.transformMat4 = transformMat4;
exports.transformQuat = transformQuat;
exports.str = str;
exports.exactEquals = exactEquals;
exports.equals = equals;

var _common = __webpack_require__(0);

var glMatrix = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(4);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  return out;
}

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
function fromValues(x, y, z, w) {
  var out = new glMatrix.ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
function set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}

/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to ceil
 * @returns {vec4} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}

/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to floor
 * @returns {vec4} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}

/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to round
 * @returns {vec4} out
 */
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w);
}

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w);
}

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
}

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
  }
  return out;
}

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
function random(out, vectorScale) {
  vectorScale = vectorScale || 1.0;

  //TODO: This is a pretty awful way of doing this. Find something better.
  out[0] = glMatrix.RANDOM();
  out[1] = glMatrix.RANDOM();
  out[2] = glMatrix.RANDOM();
  out[3] = glMatrix.RANDOM();
  normalize(out, out);
  scale(out, out, vectorScale);
  return out;
}

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
function transformQuat(out, a, q) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];

  // calculate quat * vec
  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z;

  // calculate result * inverse quat
  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
var sub = exports.sub = subtract;

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
var mul = exports.mul = multiply;

/**
 * Alias for {@link vec4.divide}
 * @function
 */
var div = exports.div = divide;

/**
 * Alias for {@link vec4.distance}
 * @function
 */
var dist = exports.dist = distance;

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
var sqrDist = exports.sqrDist = squaredDistance;

/**
 * Alias for {@link vec4.length}
 * @function
 */
var len = exports.len = length;

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
var sqrLen = exports.sqrLen = squaredLength;

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
var forEach = exports.forEach = function () {
  var vec = create();

  return function (a, stride, offset, count, fn, arg) {
    var i = void 0,
        l = void 0;
    if (!stride) {
      stride = 4;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];a[i + 3] = vec[3];
    }

    return a;
  };
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vec4 = exports.vec3 = exports.vec2 = exports.quat = exports.mat4 = exports.mat3 = exports.mat2d = exports.mat2 = exports.glMatrix = undefined;

var _common = __webpack_require__(0);

var glMatrix = _interopRequireWildcard(_common);

var _mat = __webpack_require__(5);

var mat2 = _interopRequireWildcard(_mat);

var _mat2d = __webpack_require__(6);

var mat2d = _interopRequireWildcard(_mat2d);

var _mat2 = __webpack_require__(1);

var mat3 = _interopRequireWildcard(_mat2);

var _mat3 = __webpack_require__(7);

var mat4 = _interopRequireWildcard(_mat3);

var _quat = __webpack_require__(8);

var quat = _interopRequireWildcard(_quat);

var _vec = __webpack_require__(9);

var vec2 = _interopRequireWildcard(_vec);

var _vec2 = __webpack_require__(2);

var vec3 = _interopRequireWildcard(_vec2);

var _vec3 = __webpack_require__(3);

var vec4 = _interopRequireWildcard(_vec3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.glMatrix = glMatrix;
exports.mat2 = mat2;
exports.mat2d = mat2d;
exports.mat3 = mat3;
exports.mat4 = mat4;
exports.quat = quat;
exports.vec2 = vec2;
exports.vec3 = vec3;
exports.vec4 = vec4; /**
                      * @fileoverview gl-matrix - High performance matrix and vector operations
                      * @author Brandon Jones
                      * @author Colin MacKenzie IV
                      * @version 2.4.0
                      */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */
// END HEADER

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sub = exports.mul = undefined;
exports.create = create;
exports.clone = clone;
exports.copy = copy;
exports.identity = identity;
exports.fromValues = fromValues;
exports.set = set;
exports.transpose = transpose;
exports.invert = invert;
exports.adjoint = adjoint;
exports.determinant = determinant;
exports.multiply = multiply;
exports.rotate = rotate;
exports.scale = scale;
exports.fromRotation = fromRotation;
exports.fromScaling = fromScaling;
exports.str = str;
exports.frob = frob;
exports.LDU = LDU;
exports.add = add;
exports.subtract = subtract;
exports.exactEquals = exactEquals;
exports.equals = equals;
exports.multiplyScalar = multiplyScalar;
exports.multiplyScalarAndAdd = multiplyScalarAndAdd;

var _common = __webpack_require__(0);

var glMatrix = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 2x2 Matrix
 * @module mat2
 */

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(4);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Create a new mat2 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out A new 2x2 matrix
 */
function fromValues(m00, m01, m10, m11) {
  var out = new glMatrix.ARRAY_TYPE(4);
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}

/**
 * Set the components of a mat2 to the given values
 *
 * @param {mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out
 */
function set(out, m00, m01, m10, m11) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache
  // some values
  if (out === a) {
    var a1 = a[1];
    out[1] = a[2];
    out[2] = a1;
  } else {
    out[0] = a[0];
    out[1] = a[2];
    out[2] = a[1];
    out[3] = a[3];
  }

  return out;
}

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];

  // Calculate the determinant
  var det = a0 * a3 - a2 * a1;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = a3 * det;
  out[1] = -a1 * det;
  out[2] = -a2 * det;
  out[3] = a0 * det;

  return out;
}

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function adjoint(out, a) {
  // Caching this value is nessecary if out == a
  var a0 = a[0];
  out[0] = a[3];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a0;

  return out;
}

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  return a[0] * a[3] - a[2] * a[1];
}

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
function multiply(out, a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  return out;
}

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
function rotate(out, a, rad) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  return out;
}

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
function scale(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
function fromRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  return out;
}

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2));
}

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix
 * @param {mat2} D the diagonal matrix
 * @param {mat2} U the upper triangular matrix
 * @param {mat2} a the input matrix to factorize
 */

function LDU(L, D, U, a) {
  L[2] = a[2] / a[0];
  U[0] = a[0];
  U[1] = a[1];
  U[3] = a[3] - L[2] * U[1];
  return [L, D, U];
}

/**
 * Adds two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}

/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2} out the receiving vector
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
var mul = exports.mul = multiply;

/**
 * Alias for {@link mat2.subtract}
 * @function
 */
var sub = exports.sub = subtract;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sub = exports.mul = undefined;
exports.create = create;
exports.clone = clone;
exports.copy = copy;
exports.identity = identity;
exports.fromValues = fromValues;
exports.set = set;
exports.invert = invert;
exports.determinant = determinant;
exports.multiply = multiply;
exports.rotate = rotate;
exports.scale = scale;
exports.translate = translate;
exports.fromRotation = fromRotation;
exports.fromScaling = fromScaling;
exports.fromTranslation = fromTranslation;
exports.str = str;
exports.frob = frob;
exports.add = add;
exports.subtract = subtract;
exports.multiplyScalar = multiplyScalar;
exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
exports.exactEquals = exactEquals;
exports.equals = equals;

var _common = __webpack_require__(0);

var glMatrix = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 2x3 Matrix
 * @module mat2d
 *
 * @description
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(6);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  return out;
}

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(6);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  return out;
}

/**
 * Create a new mat2d with the given values
 *
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} A new mat2d
 */
function fromValues(a, b, c, d, tx, ty) {
  var out = new glMatrix.ARRAY_TYPE(6);
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}

/**
 * Set the components of a mat2d to the given values
 *
 * @param {mat2d} out the receiving matrix
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} out
 */
function set(out, a, b, c, d, tx, ty) {
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
function invert(out, a) {
  var aa = a[0],
      ab = a[1],
      ac = a[2],
      ad = a[3];
  var atx = a[4],
      aty = a[5];

  var det = aa * ad - ab * ac;
  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = ad * det;
  out[1] = -ab * det;
  out[2] = -ac * det;
  out[3] = aa * det;
  out[4] = (ac * aty - ad * atx) * det;
  out[5] = (ab * atx - aa * aty) * det;
  return out;
}

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  return a[0] * a[3] - a[1] * a[2];
}

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
function multiply(out, a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  out[4] = a0 * b4 + a2 * b5 + a4;
  out[5] = a1 * b4 + a3 * b5 + a5;
  return out;
}

/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
function rotate(out, a, rad) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  out[4] = a4;
  out[5] = a5;
  return out;
}

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
function scale(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  out[4] = a4;
  out[5] = a5;
  return out;
}

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
function translate(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0;
  out[1] = a1;
  out[2] = a2;
  out[3] = a3;
  out[4] = a0 * v0 + a2 * v1 + a4;
  out[5] = a1 * v0 + a3 * v1 + a5;
  return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
function fromRotation(out, rad) {
  var s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  out[4] = 0;
  out[5] = 0;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2d} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  out[4] = 0;
  out[5] = 0;
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat2d} out
 */
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = v[0];
  out[5] = v[1];
  return out;
}

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ')';
}

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1);
}

/**
 * Adds two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2d} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  return out;
}

/**
 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2d} out the receiving vector
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2d} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5));
}

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
var mul = exports.mul = multiply;

/**
 * Alias for {@link mat2d.subtract}
 * @function
 */
var sub = exports.sub = subtract;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sub = exports.mul = undefined;
exports.create = create;
exports.clone = clone;
exports.copy = copy;
exports.fromValues = fromValues;
exports.set = set;
exports.identity = identity;
exports.transpose = transpose;
exports.invert = invert;
exports.adjoint = adjoint;
exports.determinant = determinant;
exports.multiply = multiply;
exports.translate = translate;
exports.scale = scale;
exports.rotate = rotate;
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.rotateZ = rotateZ;
exports.fromTranslation = fromTranslation;
exports.fromScaling = fromScaling;
exports.fromRotation = fromRotation;
exports.fromXRotation = fromXRotation;
exports.fromYRotation = fromYRotation;
exports.fromZRotation = fromZRotation;
exports.fromRotationTranslation = fromRotationTranslation;
exports.getTranslation = getTranslation;
exports.getScaling = getScaling;
exports.getRotation = getRotation;
exports.fromRotationTranslationScale = fromRotationTranslationScale;
exports.fromRotationTranslationScaleOrigin = fromRotationTranslationScaleOrigin;
exports.fromQuat = fromQuat;
exports.frustum = frustum;
exports.perspective = perspective;
exports.perspectiveFromFieldOfView = perspectiveFromFieldOfView;
exports.ortho = ortho;
exports.lookAt = lookAt;
exports.targetTo = targetTo;
exports.str = str;
exports.frob = frob;
exports.add = add;
exports.subtract = subtract;
exports.multiplyScalar = multiplyScalar;
exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
exports.exactEquals = exactEquals;
exports.equals = equals;

var _common = __webpack_require__(0);

var glMatrix = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 4x4 Matrix
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(16);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */
function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new glMatrix.ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}

/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */
function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];

    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

  return out;
}

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}

/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

  // Cache only the current line of the second matrix
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[4];b1 = b[5];b2 = b[6];b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[8];b1 = b[9];b2 = b[10];b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[12];b1 = b[13];b2 = b[14];b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
function translate(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  var a00 = void 0,
      a01 = void 0,
      a02 = void 0,
      a03 = void 0;
  var a10 = void 0,
      a11 = void 0,
      a12 = void 0,
      a13 = void 0;
  var a20 = void 0,
      a21 = void 0,
      a22 = void 0,
      a23 = void 0;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
    a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
    a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

    out[0] = a00;out[1] = a01;out[2] = a02;out[3] = a03;
    out[4] = a10;out[5] = a11;out[6] = a12;out[7] = a13;
    out[8] = a20;out[9] = a21;out[10] = a22;out[11] = a23;

    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
function scale(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];

  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function rotate(out, a, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.sqrt(x * x + y * y + z * z);
  var s = void 0,
      c = void 0,
      t = void 0;
  var a00 = void 0,
      a01 = void 0,
      a02 = void 0,
      a03 = void 0;
  var a10 = void 0,
      a11 = void 0,
      a12 = void 0,
      a13 = void 0;
  var a20 = void 0,
      a21 = void 0,
      a22 = void 0,
      a23 = void 0;
  var b00 = void 0,
      b01 = void 0,
      b02 = void 0;
  var b10 = void 0,
      b11 = void 0,
      b12 = void 0;
  var b20 = void 0,
      b21 = void 0,
      b22 = void 0;

  if (Math.abs(len) < glMatrix.EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;

  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;

  a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
  a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
  a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

  // Construct the elements of the rotation matrix
  b00 = x * x * t + c;b01 = y * x * t + z * s;b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;b11 = y * y * t + c;b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;b21 = y * z * t - x * s;b22 = z * z * t + c;

  // Perform rotation-specific matrix multiplication
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  return out;
}

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function fromRotation(out, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.sqrt(x * x + y * y + z * z);
  var s = void 0,
      c = void 0,
      t = void 0;

  if (Math.abs(len) < glMatrix.EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;

  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;

  // Perform rotation-specific matrix multiplication
  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromRotationTranslation(out, q, v) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;

  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;

  return out;
}

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];

  return out;
}

/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];

  out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
  out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
  out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);

  return out;
}

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */
function getRotation(out, mat) {
  // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
  var trace = mat[0] + mat[5] + mat[10];
  var S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (mat[6] - mat[9]) / S;
    out[1] = (mat[8] - mat[2]) / S;
    out[2] = (mat[1] - mat[4]) / S;
  } else if (mat[0] > mat[5] & mat[0] > mat[10]) {
    S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
    out[3] = (mat[6] - mat[9]) / S;
    out[0] = 0.25 * S;
    out[1] = (mat[1] + mat[4]) / S;
    out[2] = (mat[8] + mat[2]) / S;
  } else if (mat[5] > mat[10]) {
    S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
    out[3] = (mat[8] - mat[2]) / S;
    out[0] = (mat[1] + mat[4]) / S;
    out[1] = 0.25 * S;
    out[2] = (mat[6] + mat[9]) / S;
  } else {
    S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
    out[3] = (mat[1] - mat[4]) / S;
    out[0] = (mat[8] + mat[2]) / S;
    out[1] = (mat[6] + mat[9]) / S;
    out[2] = 0.25 * S;
  }

  return out;
}

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */
function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];

  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;

  return out;
}

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */
function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;

  var sx = s[0];
  var sy = s[1];
  var sz = s[2];

  var ox = o[0];
  var oy = o[1];
  var oz = o[2];

  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
  out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
  out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
  out[15] = 1;

  return out;
}

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */
function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;

  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;

  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;

  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;

  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;

  return out;
}

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspective(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2);
  var nf = 1 / (near - far);
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = 2 * far * near * nf;
  out[15] = 0;
  return out;
}

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
  var xScale = 2.0 / (leftTan + rightTan);
  var yScale = 2.0 / (upTan + downTan);

  out[0] = xScale;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = yScale;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[14] = far * near / (near - far);
  out[15] = 0.0;
  return out;
}

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function ortho(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function lookAt(out, eye, center, up) {
  var x0 = void 0,
      x1 = void 0,
      x2 = void 0,
      y0 = void 0,
      y1 = void 0,
      y2 = void 0,
      z0 = void 0,
      z1 = void 0,
      z2 = void 0,
      len = void 0;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];

  if (Math.abs(eyex - centerx) < glMatrix.EPSILON && Math.abs(eyey - centery) < glMatrix.EPSILON && Math.abs(eyez - centerz) < glMatrix.EPSILON) {
    return mat4.identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;

  len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;

  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;

  len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;

  return out;
}

/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function targetTo(out, eye, target, up) {
  var eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];

  var z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];

  var len = z0 * z0 + z1 * z1 + z2 * z2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  var x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;

  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
}

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2));
}

/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}

/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  out[9] = a[9] + b[9] * scale;
  out[10] = a[10] + b[10] * scale;
  out[11] = a[11] + b[11] * scale;
  out[12] = a[12] + b[12] * scale;
  out[13] = a[13] + b[13] * scale;
  out[14] = a[14] + b[14] * scale;
  out[15] = a[15] + b[15] * scale;
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var a8 = a[8],
      a9 = a[9],
      a10 = a[10],
      a11 = a[11];
  var a12 = a[12],
      a13 = a[13],
      a14 = a[14],
      a15 = a[15];

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  var b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  var b8 = b[8],
      b9 = b[9],
      b10 = b[10],
      b11 = b[11];
  var b12 = b[12],
      b13 = b[13],
      b14 = b[14],
      b15 = b[15];

  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
}

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
var mul = exports.mul = multiply;

/**
 * Alias for {@link mat4.subtract}
 * @function
 */
var sub = exports.sub = subtract;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAxes = exports.sqlerp = exports.rotationTo = exports.equals = exports.exactEquals = exports.normalize = exports.sqrLen = exports.squaredLength = exports.len = exports.length = exports.lerp = exports.dot = exports.scale = exports.mul = exports.add = exports.set = exports.copy = exports.fromValues = exports.clone = undefined;
exports.create = create;
exports.identity = identity;
exports.setAxisAngle = setAxisAngle;
exports.getAxisAngle = getAxisAngle;
exports.multiply = multiply;
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.rotateZ = rotateZ;
exports.calculateW = calculateW;
exports.slerp = slerp;
exports.invert = invert;
exports.conjugate = conjugate;
exports.fromMat3 = fromMat3;
exports.fromEuler = fromEuler;
exports.str = str;

var _common = __webpack_require__(0);

var glMatrix = _interopRequireWildcard(_common);

var _mat = __webpack_require__(1);

var mat3 = _interopRequireWildcard(_mat);

var _vec = __webpack_require__(2);

var vec3 = _interopRequireWildcard(_vec);

var _vec2 = __webpack_require__(3);

var vec4 = _interopRequireWildcard(_vec2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Quaternion
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

function create() {
  var out = new glMatrix.ARRAY_TYPE(4);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}

/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {quat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */
function getAxisAngle(out_axis, q) {
  var rad = Math.acos(q[3]) * 2.0;
  var s = Math.sin(rad / 2.0);
  if (s != 0.0) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    // If s is zero, return any axis (no rotation - axis does not matter)
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }
  return rad;
}

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
function multiply(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];

  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateX(out, a, rad) {
  rad *= 0.5;

  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = Math.sin(rad),
      bw = Math.cos(rad);

  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateY(out, a, rad) {
  rad *= 0.5;

  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var by = Math.sin(rad),
      bw = Math.cos(rad);

  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateZ(out, a, rad) {
  rad *= 0.5;

  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bz = Math.sin(rad),
      bw = Math.cos(rad);

  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
function calculateW(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2];

  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
  return out;
}

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];

  var omega = void 0,
      cosom = void 0,
      sinom = void 0,
      scale0 = void 0,
      scale1 = void 0;

  // calc cosine
  cosom = ax * bx + ay * by + az * bz + aw * bw;
  // adjust signs (if necessary)
  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  }
  // calculate coefficients
  if (1.0 - cosom > 0.000001) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  }
  // calculate final values
  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;

  return out;
}

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot ? 1.0 / dot : 0;

  // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot = void 0;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w
    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)
    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;

    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}

/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {x} Angle to rotate around X axis in degrees.
 * @param {y} Angle to rotate around Y axis in degrees.
 * @param {z} Angle to rotate around Z axis in degrees.
 * @returns {quat} out
 * @function
 */
function fromEuler(out, x, y, z) {
  var halfToRad = 0.5 * Math.PI / 180.0;
  x *= halfToRad;
  y *= halfToRad;
  z *= halfToRad;

  var sx = Math.sin(x);
  var cx = Math.cos(x);
  var sy = Math.sin(y);
  var cy = Math.cos(y);
  var sz = Math.sin(z);
  var cz = Math.cos(z);

  out[0] = sx * cy * cz - cx * sy * sz;
  out[1] = cx * sy * cz + sx * cy * sz;
  out[2] = cx * cy * sz - sx * sy * cz;
  out[3] = cx * cy * cz + sx * sy * sz;

  return out;
}

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
var clone = exports.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
var fromValues = exports.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
var copy = exports.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
var set = exports.set = vec4.set;

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
var add = exports.add = vec4.add;

/**
 * Alias for {@link quat.multiply}
 * @function
 */
var mul = exports.mul = multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
var scale = exports.scale = vec4.scale;

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
var dot = exports.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
var lerp = exports.lerp = vec4.lerp;

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 */
var length = exports.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
var len = exports.len = length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
var squaredLength = exports.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
var sqrLen = exports.sqrLen = squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
var normalize = exports.normalize = vec4.normalize;

/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat} a The first quaternion.
 * @param {quat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
var exactEquals = exports.exactEquals = vec4.exactEquals;

/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {quat} a The first vector.
 * @param {quat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
var equals = exports.equals = vec4.equals;

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
var rotationTo = exports.rotationTo = function () {
  var tmpvec3 = vec3.create();
  var xUnitVec3 = vec3.fromValues(1, 0, 0);
  var yUnitVec3 = vec3.fromValues(0, 1, 0);

  return function (out, a, b) {
    var dot = vec3.dot(a, b);
    if (dot < -0.999999) {
      vec3.cross(tmpvec3, xUnitVec3, a);
      if (vec3.len(tmpvec3) < 0.000001) vec3.cross(tmpvec3, yUnitVec3, a);
      vec3.normalize(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      vec3.cross(tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot;
      return normalize(out, out);
    }
  };
}();

/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount
 * @returns {quat} out
 */
var sqlerp = exports.sqlerp = function () {
  var temp1 = create();
  var temp2 = create();

  return function (out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));

    return out;
  };
}();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
var setAxes = exports.setAxes = function () {
  var matr = mat3.create();

  return function (out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];

    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];

    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];

    return normalize(out, fromMat3(out, matr));
  };
}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEach = exports.sqrLen = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = exports.len = undefined;
exports.create = create;
exports.clone = clone;
exports.fromValues = fromValues;
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.ceil = ceil;
exports.floor = floor;
exports.min = min;
exports.max = max;
exports.round = round;
exports.scale = scale;
exports.scaleAndAdd = scaleAndAdd;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.length = length;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.random = random;
exports.transformMat2 = transformMat2;
exports.transformMat2d = transformMat2d;
exports.transformMat3 = transformMat3;
exports.transformMat4 = transformMat4;
exports.str = str;
exports.exactEquals = exactEquals;
exports.equals = equals;

var _common = __webpack_require__(0);

var glMatrix = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(2);
  out[0] = 0;
  out[1] = 0;
  return out;
}

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
function fromValues(x, y) {
  var out = new glMatrix.ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
};

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
};

/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
};

/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
};

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
};

/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.sqrt(x * x + y * y);
};

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return x * x + y * y;
};

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
  var x = a[0],
      y = a[1];
  return Math.sqrt(x * x + y * y);
};

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
  var x = a[0],
      y = a[1];
  return x * x + y * y;
};

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
};

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
function normalize(out, a) {
  var x = a[0],
      y = a[1];
  var len = x * x + y * y;
  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    out[0] = a[0] * len;
    out[1] = a[1] * len;
  }
  return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
function lerp(out, a, b, t) {
  var ax = a[0],
      ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
function random(out, scale) {
  scale = scale || 1.0;
  var r = glMatrix.RANDOM() * 2.0 * Math.PI;
  out[0] = Math.cos(r) * scale;
  out[1] = Math.sin(r) * scale;
  return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2d(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat4(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'vec2(' + a[0] + ', ' + a[1] + ')';
}

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1];
  var b0 = b[0],
      b1 = b[1];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1));
}

/**
 * Alias for {@link vec2.length}
 * @function
 */
var len = exports.len = length;

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
var sub = exports.sub = subtract;

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
var mul = exports.mul = multiply;

/**
 * Alias for {@link vec2.divide}
 * @function
 */
var div = exports.div = divide;

/**
 * Alias for {@link vec2.distance}
 * @function
 */
var dist = exports.dist = distance;

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
var sqrDist = exports.sqrDist = squaredDistance;

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
var sqrLen = exports.sqrLen = squaredLength;

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
var forEach = exports.forEach = function () {
  var vec = create();

  return function (a, stride, offset, count, fn, arg) {
    var i = void 0,
        l = void 0;
    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];a[i + 1] = vec[1];
    }

    return a;
  };
}();

/***/ })
/******/ ]);
});`);

var Abubu = new function(){

var DefaultVertexShader = { value : `#version 300 es
/*========================================================================
 * vertShader   :  Default Vertex Shader
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Thu 03 Aug 2017 05:07:21 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *========================================================================
 */
precision highp float; precision highp int;

/*========================================================================
 * Interface variables
 *========================================================================
 */
in  vec3 position;

out vec2 pixPos ;
out vec2 pixelPosition ;
out vec2 cc ;

out vec3 pixCrd ;

/*=========================================================================
 * Main body of the vertex shader
 *=========================================================================
 */
void main()
{   
    cc = position.xy ;
    pixPos = position.xy ;
    pixelPosition = pixPos ;
    pixCrd = position.xyz ;
    gl_Position = vec4(position.xy*2.-vec2(1.),0.,1.0);
}` } ;



var bgndShader = { value : `#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * bgndShader   :   COLOR BACGROUNDS
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Thu 03 Aug 2017 05:05:01 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float; precision highp int;

/*-------------------------------------------------------------------------
 * Varying variables
 *-------------------------------------------------------------------------
 */
in vec2        pixPos ;
uniform sampler2D   bgrnd ;
uniform vec3        color ;
out vec4 FragColor ;

/*=========================================================================
 * Main body
 *=========================================================================
 */
void main()
{    
    vec4    crvc = texture(bgrnd, pixPos ) ;

    FragColor = mix(vec4(color,1.0),crvc, crvc.a ) ;
}` } ;



var dispBackgroundPhasShader = { value : `#version 300 es
/*========================================================================
 * dispBackgroundPhasShader 
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Thu 03 Aug 2017 05:05:23 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *========================================================================
 */
precision highp float; precision highp int;

/*========================================================================
 * Interface Variables
 *========================================================================
 */
uniform float       minValue ;
uniform float       maxValue ;
uniform vec3        tiptColor ;
uniform float       tiptThickness ;     
uniform vec4        minColor, maxColor ;
uniform bool        enableMaxColor, enableMinColor ;

uniform sampler2D   phas ;
uniform sampler2D   background ;
uniform sampler2D   map ;
uniform sampler2D   tipt ;
uniform sampler2D   clrm ;
uniform sampler2D   prob ;
uniform vec4        channelMultiplier ;
uniform vec3        phaseColor ;
in  vec2            pixPos ;
out vec4            FragColor ;

/*=========================================================================
 * Hyperbolic Tangent
 *=========================================================================
 */
float Tanh(float x){
    if ( x<-3.0){
        return -1.0 ;
    } else if (x>3.0){
        return 1.0 ;
    } else {
        return x*(27.0 + x*x)/(27.0+9.0*x*x) ;
    }
}

/*=========================================================================
 * Main body of Display Fragment Shader 
 *=========================================================================
 */
void main()
{
    float   isTipt ;
    float   r, gamma;
    vec4    t = texture(map,pixPos);
    vec4    phase = texture( phas, pixPos ) ;
    
    vec2 size   = vec2(textureSize(map,0)) ;
    vec2 ii = vec2(1.,0.)/size ;
    vec2 jj = vec2(0.,1.)/size ;

    
    isTipt = texture(tipt, pixPos).a ;
    
    isTipt = max(isTipt, texture(tipt, pixPos+ii            ).a ) ;
    isTipt = max(isTipt, texture(tipt, pixPos+ii+jj         ).a ) ;
    isTipt = max(isTipt, texture(tipt, pixPos+jj            ).a ) ;
    isTipt = max(isTipt, texture(tipt, pixPos-ii            ).a ) ;
    isTipt = max(isTipt, texture(tipt, pixPos-ii-jj         ).a ) ;
    isTipt = max(isTipt, texture(tipt, pixPos-jj            ).a ) ;
    isTipt = max(isTipt, texture(tipt, pixPos+ii-jj         ).a ) ;
    isTipt = max(isTipt, texture(tipt, pixPos-ii+jj         ).a ) ;

    r = dot(t, channelMultiplier) ;
    r = (r-minValue)/(maxValue-minValue) ;

    vec4 pixColor   = texture(  clrm, vec2(r,0.5)   ) ;
    vec4 probColor  = texture(  prob, pixPos        )  ;

    if ( enableMinColor ) if (r < 0.) pixColor = minColor ;
    if ( enableMaxColor ) if (r >1.) pixColor = maxColor ;

    if ( phase.r > .98 ){
        FragColor    = mix(mix(pixColor, vec4(tiptColor,1.0),isTipt), probColor, probColor.a) ;
    }else{
        FragColor    = vec4(phaseColor,1.) ;
        r = 0.0 ;
    }

    vec4 backgroundColor = texture(background, pixPos ) ;
    FragColor = mix(backgroundColor,FragColor, r) ;
}` } ;



var dispPhasShader = { value : `#version 300 es
/*========================================================================
 * dispPhasShader 
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Thu 03 Aug 2017 05:05:23 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *========================================================================
 */
precision highp float; precision highp int;

/*========================================================================
 * Interface Variables
 *========================================================================
 */
uniform float       minValue ;
uniform float       maxValue ;
uniform vec3        tiptColor ;
uniform float       tiptThickness ;     
uniform vec4        minColor, maxColor ;
uniform bool        enableMaxColor, enableMinColor ;

uniform sampler2D   phas ;
uniform sampler2D   map ;
uniform sampler2D   tipt ;
uniform sampler2D   clrm ;
uniform sampler2D   prob ;
uniform vec4        channelMultiplier ;
uniform vec3        phaseColor ;
in  vec2            pixPos ;
out vec4            FragColor ;

/*=========================================================================
 * Hyperbolic Tangent
 *=========================================================================
 */
float Tanh(float x){
    if ( x<-3.0){
        return -1.0 ;
    } else if (x>3.0){
        return 1.0 ;
    } else {
        return x*(27.0 + x*x)/(27.0+9.0*x*x) ;
    }
}

/*=========================================================================
 * Main body of Display Fragment Shader 
 *=========================================================================
 */
void main()
{
    float   isTipt ;
    float   r, gamma;
    vec4    t = texture(map,pixPos);
    vec4    phase = texture( phas, pixPos ) ;
    
    vec2 size   = vec2(textureSize(map,0)) ;
    vec2 ii = vec2(1.,0.)/size ;
    vec2 jj = vec2(0.,1.)/size ;

    
    isTipt = texture(tipt, pixPos).a ;
    
    isTipt = max(isTipt, texture(tipt, pixPos+ii            ).a ) ;
    isTipt = max(isTipt, texture(tipt, pixPos+ii+jj         ).a ) ;
    isTipt = max(isTipt, texture(tipt, pixPos+jj            ).a ) ;
    isTipt = max(isTipt, texture(tipt, pixPos-ii            ).a ) ;
    isTipt = max(isTipt, texture(tipt, pixPos-ii-jj         ).a ) ;
    isTipt = max(isTipt, texture(tipt, pixPos-jj            ).a ) ;
    isTipt = max(isTipt, texture(tipt, pixPos+ii-jj         ).a ) ;
    isTipt = max(isTipt, texture(tipt, pixPos-ii+jj         ).a ) ;

    r = dot(t, channelMultiplier) ;
    r = (r-minValue)/(maxValue-minValue) ;

    vec4 pixColor   = texture(  clrm, vec2(r,0.5)   ) ;
    vec4 probColor  = texture(  prob, pixPos        )  ;

    if ( enableMinColor ) if (r < 0.) pixColor = minColor ;
    if ( enableMaxColor ) if (r >1.) pixColor = maxColor ;

    if ( phase.r > .98 ){
        FragColor    = mix(mix(pixColor, vec4(tiptColor,1.0),isTipt), probColor, probColor.a) ;
    }else{
        FragColor    = vec4(phaseColor,1.) ;
    }
}` } ;



var dispShader = { value : `#version 300 es
/*========================================================================
 * dispShader 
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Thu 03 Aug 2017 05:05:29 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *========================================================================
 */
precision highp float; precision highp int;

/*========================================================================
 * Interface Variables
 *========================================================================
 */
uniform float       minValue ;
uniform float       maxValue ;
uniform vec3        tiptColor ;
uniform vec4        minColor, maxColor ;
uniform bool        enableMaxColor, enableMinColor ;
uniform float       tiptThickness ;                                                      
uniform sampler2D   map ;
uniform sampler2D   tipt ;
uniform sampler2D   clrm ;
uniform sampler2D   prob ;
uniform vec4        channelMultiplier ;

in  vec2            pixPos ;
out vec4            FragColor ;

/*=========================================================================
 * Hyperbolic Tangent
 *=========================================================================
 */
float Tanh(float x){
    if ( x<-3.0){
        return -1.0 ;
    } else if (x>3.0){
        return 1.0 ;
    } else {
        return x*(27.0 + x*x)/(27.0+9.0*x*x) ;
    }
}

/*=========================================================================
 * Main body of Display Fragment Shader 
 *=========================================================================
 */
void main()
{
    float   isTipt ;
    float   r, gamma;
    vec4    t = texture(map,pixPos);
    
    vec2 size   = vec2(textureSize(map,0)) ;
    vec2 ii = vec2(1.,0.)/size ;
    vec2 jj = vec2(0.,1.)/size ;
    
    isTipt = texture(tipt, pixPos).a ;
    for(float i=-0.5*tiptThickness ; i<(tiptThickness*0.5) ; i++){
        for(float j=-0.5*tiptThickness ; j<(tiptThickness*0.5) ; j++){
            isTipt = max(isTipt, texture(tipt, pixPos + ii*i).a) ;
            isTipt = max(isTipt, texture(tipt, pixPos + jj*j).a) ;
            isTipt = max(isTipt, texture(tipt, pixPos + ii*i + jj*j).a) ;
        }
    }

    r = dot(t, channelMultiplier) ;
    r = (r-minValue)/(maxValue-minValue) ;


    vec4 pixColor   = texture(  clrm, vec2(r,0.5)   ) ;

    if ( enableMinColor ) if (r < 0.) pixColor = minColor ;
    if ( enableMaxColor ) if (r >1.) pixColor = maxColor ;

    vec4 probColor  = texture(  prob, pixPos        )  ;
    FragColor    = mix(mix(pixColor, vec4(tiptColor,1.0),isTipt), probColor, probColor.a) ;
}` } ;



var filamentShader = { value : `#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * filamentShader:  calculating  the filament
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Fri 15 Jun 2018 16:54:56 (EDT) 
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float;
precision highp int ;

/*------------------------------------------------------------------------
 * Interface variables
 *------------------------------------------------------------------------
 */
in vec2     pixPos ;

uniform sampler2D   inFtrgt, inStrgt ;
uniform sampler2D   crdtMap ;

uniform float       filamentThickness ;

uniform vec3        domainResolution ;
uniform float       mx, my ;
uniform float       filamentThreshold ;
uniform float       filamentBorder ;

layout (location = 0 ) out vec4 outTrgt ;

/*========================================================================
 * Texture3D
 *========================================================================
 */
vec4 Texture3D( sampler2D S, vec3 texCoord )
{
    vec4    vColor1, vColor2 ;
    float   x, y ;
    float   wd = mx*my - 1.0 ;

    float zSliceNo  = floor( texCoord.z*mx*my) ;

    x = texCoord.x / mx ;
    y = texCoord.y / my ;

    x += (mod(zSliceNo,mx)/mx) ;
    y += floor((wd-zSliceNo)/ mx )/my ;

    vColor1 = texture( S,  vec2(x,y) ) ;

    zSliceNo = ceil( texCoord.z*mx*my   ) ;

    x = texCoord.x / mx ;
    y = texCoord.y / my ;

    x += (mod(zSliceNo,mx)/mx) ;
    y += floor((wd-zSliceNo)/ mx )/my ;
    vColor2 = texture( S,  vec2(x,y) ) ;

    return mix(
        vColor2,
        vColor1,
        zSliceNo/(mx*my)-texCoord.z
    ) ;
}

/*========================================================================
 * isFilament
 *========================================================================
 */
bool isFilament( sampler2D S1, sampler2D S2, vec3 pos, vec3 ii ){
    float s1 = 0. ;
    float s2 = 0. ;

    float f,v,d ;
    vec3 cc ;
    for (float i=0. ; i < 2. ; i++){
        for (float j=0. ; j<2. ;j++){
            for(float k=0. ; k<2. ; k++){
                cc=  pos + vec3(i,j,k)*ii ;
                v = Texture3D( S1, cc).r ;
                f = v - filamentThreshold ;
                d = v - Texture3D( S2, cc).r ;
                s1 += step(0.,f) ;
                s2 += step(0.,d) ;
            }
        }
    }

    bool b1 = ((s1>0.5) && (s1<7.5)) ;
    bool b2 = ((s2>0.5) && (s2<7.5)) ;

    return (b1 && b2) ;
}

/*========================================================================
 * main body of the filament shader
 *========================================================================
 */
void main(){ 
    bool s = false ;
    vec3 ii = vec3(1.)/domainResolution ;
    vec3 pos = texture( crdtMap, pixPos ).rgb ;

    float upperVal = 1.-filamentBorder ;
    float lowerVal = filamentBorder ;

    
    if (    pos.x<lowerVal ||   pos.x>upperVal || pos.y<lowerVal ||   
            pos.y>upperVal ||   pos.z<lowerVal || pos.z>upperVal    ){
        outTrgt = vec4(0.) ;
        return ;
    }

    for (float i=-filamentThickness ; i < 1. ; i++)
      for (float j=-filamentThickness ; j < 1. ; j++)
        for (float k=-filamentThickness ; k < 1. ; k++)
          s = s || isFilament( inFtrgt, inStrgt, pos+vec3(i,j,k)*ii, ii) ;

    outTrgt = (s) ? vec4(1.):vec4(0.) ;
}` } ;



var histShader = { value : `#version 300 es
/*========================================================================
 * histShader
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Thu 03 Aug 2017 05:05:40 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *========================================================================
 */
precision highp float; precision highp int;

/*========================================================================
 * Interface Variables
 *========================================================================
 */
uniform vec2        probePosition ;
uniform sampler2D   surf ;
uniform sampler2D   curv ;
uniform float       shift ;
uniform vec4        channel ;

in      vec2        pixPos ;
layout (location = 0 ) out     vec4        FragColor ;
/*=========================================================================
 * Main body 
 *=========================================================================
 */
void main()
{
    float r ;
    vec4 probVal  = texture(surf , probePosition  ) ;
    vec4 pixlVal  = texture(curv , vec2(pixPos.x+shift, pixPos.y )) ;

    vec4 fragColor ;
    fragColor.a     = pixPos.x  ;
    fragColor.rgb   = pixlVal.rgb ;
    r =    dot( probVal,channel) ;
    
    if (pixPos.x >= (1. - shift)){
        fragColor.rgb = vec3(r,r,r) ;
    }

    FragColor = fragColor;
}` } ;



var ipltShader = { value : `#version 300 es
/*========================================================================
 * ipltShader   : Fragmet Shader for Initializing Plots
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Thu 03 Aug 2017 05:05:50 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *========================================================================
 */
precision highp float; precision highp int;

/*========================================================================
 * Interface Variables
 *========================================================================
 */
in      vec2    pixPos ;
uniform float   restValue ;

layout (location = 0 ) out  vec4    FragColor1 ;
layout (location = 1 ) out  vec4    FragColor2 ;

/*=========================================================================
 * Main body of ipltShader
 *=========================================================================
 */
void main()
{
    float r = restValue ;
    FragColor1 = vec4(r,r,r,1.0) ;
    FragColor2 = vec4(r,r,r,1.0) ;
}` } ;



var lfgmShader = { value : `#version 300 es
/*========================================================================
 * lfgmShader   :  Fragmet Shader for Creating Plots
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Thu 03 Aug 2017 05:06:02 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *========================================================================
 */
precision highp float; precision highp int;

/*========================================================================
 * Interface Variables
 *========================================================================
 */
in      vec2        pixPos ;
uniform vec3        color ;
uniform float       visible ;
out     vec4        FragColor ;

/*=========================================================================
 * Main body
 *=========================================================================
 */
void main()
{
    FragColor = vec4(color,1.0);
}` } ;



var lpvtShader = { value : `#version 300 es
/*========================================================================
 * lpvtShader   : Shader for Creating Plots
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Thu 03 Aug 2017 05:06:21 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *========================================================================
 */
precision highp float; precision highp int;

/*-------------------------------------------------------------------------
 * Varying variables must be defined here
 *-------------------------------------------------------------------------
 */
out     vec2        pixPos ;
uniform sampler2D   map ;
uniform vec2        xrange ;
uniform vec2        yrange ;
uniform vec4        channelMultiplier ;

in      vec4        position;

/*=========================================================================
 * Main body of the vertex shader
 *=========================================================================
 */
void main()
{
    pixPos = position.xy ;   /* uv.x, uv.y is always in [0,1.0] */
    vec4 mapVal = texture(map, position.xy ) ;
    vec2 pos ;
    float   yval    = dot(mapVal, channelMultiplier) ;
    float   xval ;
    yval            = (yval-yrange.x)/(yrange.y - yrange.x) ;
    xval            = position.x*(xrange.y-xrange.x)+xrange.x ;
    gl_Position     = vec4(xval*2.-1., yval*2.-1.,0., 1.0) ;
    return ;
}` } ;



var lvtxShader = { value : `#version 300 es
/*========================================================================
 * lvtxShader   : Shader for Creating Plots
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Thu 03 Aug 2017 05:06:21 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *========================================================================
 */
precision highp float; precision highp int;

/*-------------------------------------------------------------------------
 * Varying variables must be defined here
 *-------------------------------------------------------------------------
 */
out     vec2        pixPos ;
uniform sampler2D   map ;
uniform float       minValue ;
uniform float       maxValue ;
in      vec4        position;

/*=========================================================================
 * Main body of the vertex shader
 *=========================================================================
 */
void main()
{
    float  amp = maxValue-minValue ;
    pixPos = position.xy ;   /* uv.x, uv.y is always in [0,1.0] */
    vec4 point = texture(map, position.xy ) ;
    vec2 pos ;
    pos.x  = point.a ;
    pos.y  = (point.r-minValue)/amp ;
    //pos.x = position.x ;
    gl_Position = vec4(pos.x*2.-1., pos.y*2.-1.,0., 1.0) ;
}` } ;



var sctwShader = { value : `#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * sctwShader   :  scales the time window
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Thu 03 Aug 2017 02:07:45 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float; precision highp int;

in vec2     pixPos ;

uniform sampler2D   map ;
uniform float       oldWindow ;
uniform float       newWindow ;

layout (location =0 ) out vec4 FragColor ;

void main(){
    float   scale = newWindow/oldWindow ;
    float   x   = pixPos.x-(1.- 1./scale) ;
    x *= scale ;
    
    FragColor = texture( map, vec2(x,0.5)) ;
    return ;
}` } ;



var tiptInitShader = { value : `#version 300 es

/*========================================================================
 * tiptInitShader
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Thu 03 Aug 2017 05:06:52 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *========================================================================
 */
precision highp float; precision highp int;

/*========================================================================
 * Interface Variables
 *========================================================================
 */
in      vec2    pixPos ;
layout (location=0) out     vec4    ftipt ;
layout (location=1) out     vec4    stipt ;
/*=========================================================================
 * main
 *=========================================================================
 */
void main(){
    ftipt = vec4(0.,0.,0.,0.) ;
    stipt = vec4(0.,0.,0.,0.) ;
    return ;
}` } ;



var tiptShader = { value : `#version 300 es
/*========================================================================
 * tiptShader 
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Thu 03 Aug 2017 05:07:07 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *========================================================================
 */
precision highp float; precision highp int;

/*========================================================================
 * Interface Variables
 *========================================================================
 */
in      vec2 pixPos ;
uniform sampler2D  vPrv;
uniform sampler2D  vCur;
uniform sampler2D  tips ;
uniform float Uth ;
uniform vec4 channel ;

uniform bool path ;

out     vec4    ftipt ;

/*=========================================================================
 * main
 *=========================================================================
 */
void main(){
    if (!path){
        ftipt = vec4( 0., 0., 0., 0.) ;
        return ;
    }

    vec4 tip = texture( tips, pixPos ) ;
    vec2 size = vec2( textureSize(vPrv,0)) ;
    vec2 ii = vec2(1.,0.)/size  ;
    vec2 jj = vec2(0.,1.)/size  ;

    float v0 = dot(texture( vCur, pixPos ),channel) ;
    float vx = dot(texture( vCur, pixPos + ii),channel) ;
    float vy = dot(texture( vCur, pixPos + jj),channel) ;
    float vxy= dot(texture( vCur, pixPos + ii+ jj),channel) ;

    float f0 = v0 - Uth ;
    float fx = vx - Uth ;
    float fy = vy - Uth ;
    float fxy= vxy - Uth ;

    float s = step(0., f0) + step(0., fx) + step(0., fy) +
        step(0., fxy ) ;
    bool bv = (s>.5) && ( s<3.5 ) ;

    float d0    = v0   -   dot(texture( vPrv, pixPos          ),channel) ; 
    float dx    = vx   -   dot(texture( vPrv, pixPos + ii     ),channel);
    float dy    = vy   -   dot(texture( vPrv, pixPos + jj     ),channel) ;
    float dxy   = vxy  -   dot(texture( vPrv, pixPos + ii + jj),channel) ;

    s = step(0., d0) + step(0., dx) + step(0., dy) + step(0.,dxy) ;
    bool bdv = (s>.25) && ( s<3.5 ) ;

    if( !( (tip.r > .5) || (bv && bdv) ) ){
        ftipt = tip ;
        return;
    }

    fx -= f0;  fy -= f0;  dx -= d0;  dy -= d0;
    float det1 = 1./(fx*dy - fy*dx);
    float x = -(f0*dy - d0*fy)*det1; // intersection coordinates
    float y = -(fx*d0 - dx*f0)*det1;
    if  ( (x > 0.) && (x < 1.) && (y > 0.) && (y < 1.) ){
        tip = vec4(1.,1.,1.,1.) ;
    }

    ftipt = tip ;
    return ;
}` } ;



var tstpShader = { value : `#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * tstpShader   :   time step shader
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Wed 26 Sep 2018 18:42:01 (EDT)
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float;

uniform float       timeWindow, dt;
uniform sampler2D   inTtex ;

layout (location = 0 ) out vec4 outTtex ;

void main(){
    float t = texture( inTtex, vec2(0.5)).r ;
    t += dt ;
    if ( t>timeWindow ){
        t = 0. ;
    }
    outTtex = vec4(t) ;

    return ;
}` } ;



var tvsxShader = { value : `#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * tvsxShader   :   create a time vs x graph
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Wed 26 Sep 2018 18:05:11 (EDT)
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float;
precision highp int ;

in vec2             pixPos ;

uniform sampler2D   inText, inTvsx , ttex ;
uniform vec4        rgba0 ;
uniform float       timeWindow ;
uniform float       yLevel ;
layout  (location = 0) out vec4 outTvsx ;
uniform bool        refresh ;

void main(){
    outTvsx = texture( inTvsx , pixPos ) ;
    float   t       = texture( ttex, vec2(0.5) ).r/timeWindow ;
    float   dt      = 1./vec2(textureSize( inTvsx, 0 )).x ;
    
    if (abs(t-pixPos.y)<= dt ){
        outTvsx = texture(inText, vec2(pixPos.x,yLevel)) ;
    }
    if (t<dt && refresh){
        outTvsx = rgba0 ;
    }
    return ;
}` } ;



var vertShader = { value : `#version 300 es
/*========================================================================
 * vertShader   :  Default Vertex Shader
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Thu 03 Aug 2017 05:07:21 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *========================================================================
 */
precision highp float; precision highp int;

/*========================================================================
 * Interface variables
 *========================================================================
 */
in  vec3 position;

out vec2 pixPos ;
out vec3 pixCrd ;

/*=========================================================================
 * Main body of the vertex shader
 *=========================================================================
 */
void main()
{   
    pixPos = position.xy ;
    pixCrd = position.xyz ;
    gl_Position = vec4(position.x*2.-1., position.y*2.-1.,0.,1.0);
}` } ;



var vrc1FShader = { value : `#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * vrc1FShader  :   First Pass of Volume Ray Casting
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Sat 12 Aug 2017 06:24:26 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float; precision highp int;

/*------------------------------------------------------------------------
 * Interface Vars.
 *------------------------------------------------------------------------
 */
in vec3 worldSpaceCoords;

out vec4 back_face_Crds ;
/*========================================================================
 * Main
 *========================================================================
 */
void main()
{
    // Sets the fragment color as the fragment coordinates.
    back_face_Crds = vec4(   worldSpaceCoords, 1.0   ) ;
}` } ;



var vrc1VShader = { value : `#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * vrc1VShader  :   1st Pass Vertex Shader of Volume-Ray-Casting
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Sat 12 Aug 2017 06:24:44 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float; precision highp int;


/*------------------------------------------------------------------------
 * Interface vars.
 *------------------------------------------------------------------------
 */
in  vec3        position ;
out vec3        worldSpaceCoords;


uniform mat4 viewMatrix ;
uniform mat4 modelMatrix ;
uniform mat4 projectionMatrix ;

/*========================================================================
 * Main
 *========================================================================
 */
void main()
{
    //Set the world space coordinates of the back faces vertices as output.
    worldSpaceCoords = position ; 
    gl_Position = projectionMatrix*viewMatrix*modelMatrix*vec4( position, 1.0 );
}` } ;



var vrc2FShader = { value : `#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * vrc2FShader  :   2nd Pass Fragment Shader for Volume-Ray-Casting
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Wed 28 Nov 2018 12:16:39 (EST) 
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float; precision highp int;

/*------------------------------------------------------------------------
 * Interface vars.
 *------------------------------------------------------------------------
 */
in      vec3        worldSpaceCoords;
in      vec4        projectedCoords;
uniform sampler2D   backfaceCrdTxt;
uniform sampler2D   phaseTxt ;
uniform sampler2D   target ;
uniform sampler2D   compMap ;
uniform sampler2D   lightTxt ;
uniform sampler2D   clrm ;
uniform bool        rayCast ;
uniform bool        usePhaseField , useCompMap ;
uniform bool        drawFilament, showXCut, showYCut, showZCut ;
uniform sampler2D   flmt ;
uniform float       xLevel, yLevel, zLevel ;
uniform vec4        filamentColor ;
uniform float       minValue, maxValue, threshold ;
uniform vec4        channelMultiplier ;

uniform int         noSteps ;
uniform float       alphaCorrection ;

uniform float       mx, my ;
uniform float       lightShift ;
uniform float       structural_alpha ;

out     vec4        FragColor ;

/*========================================================================
 * Acts like a texture3D using Z slices and trilinear filtering
 *========================================================================
 */
/*------------------------------------------------------------------------
 * Texture3D
 *------------------------------------------------------------------------
 */
vec4 Texture3D( sampler2D S, vec3 texCoord )
{
    vec4    vColor1, vColor2 ;
    float x, y ;
    float wd = mx*my - 1.0 ;

    float zSliceNo  = floor( texCoord.z*mx*my) ;

    x = texCoord.x / mx ;
    y = texCoord.y / my ;

    x += (mod(zSliceNo,mx)/mx) ;
    y += floor((wd-zSliceNo)/ mx )/my ;

    vColor1 = texture( S,  vec2(x,y) ) ;

    zSliceNo = ceil( texCoord.z*mx*my) ;

    x = texCoord.x / mx ;
    y = texCoord.y / my ;

    x += (mod(zSliceNo,mx)/mx) ;
    y += floor((wd-zSliceNo)/ mx )/my ;
    vColor2 = texture( S,  vec2(x,y) ) ;

    return mix(
        vColor2,
        vColor1,
        zSliceNo/(mx*my)-texCoord.z
    ) ;
}

/*------------------------------------------------------------------------
 * CompTexture3D
 *------------------------------------------------------------------------
 */
vec4 CompTexture3D( sampler2D S, vec3 texCoord )
{
    vec4    vColor1, vColor2 ;
    float   x, y ;
    float   wd = mx*my - 1.0 ;

    float zSliceNo  = floor( texCoord.z*mx*my) ;

    x = texCoord.x / mx ;
    y = texCoord.y / my ;

    x += (mod(zSliceNo,mx)/mx) ;
    y += floor((wd-zSliceNo)/ mx )/my ;

    vColor1 = texture(
        S,
        texture(compMap, vec2(x,y)).xy
    ) ;

    zSliceNo = ceil( texCoord.z*mx*my) ;

    x = texCoord.x / mx ;
    y = texCoord.y / my ;

    x += (mod(zSliceNo,mx)/mx) ;
    y += floor((wd-zSliceNo)/ mx )/my ;

    vColor2 = texture(
        S,
        texture(compMap, vec2(x,y)).xy
    ) ;

    return mix(
        vColor2,
        vColor1,
        zSliceNo/(mx*my)-texCoord.z
    ) ;
}


const float SQRT3 = sqrt(1.) ;

/*========================================================================
 * noPhaseField
 *========================================================================
 */
vec4 noPhaseField(){
    // getting the projected coordiante of the texture on the screen
    vec2 texc = ((projectedCoords.xy/projectedCoords.w) + vec2(1.))*0.5 ;

    // getting position on the back face of the cube
    vec3    backCrd = texture( backfaceCrdTxt, texc).xyz ;

    // coordinate of the front face
    vec3    frontCrd = worldSpaceCoords ;

    // direction vector from front to back
    vec3    ray     = backCrd - frontCrd ;
    float   rayLength   = length(ray) ;

    // marching vectors for ray casting
    float   marchLength = rayLength / float(noSteps) ;
    vec3    marchRay    = normalize(ray)*marchLength ;

    vec3    currentCrd  = frontCrd ;

    // Accumulated values during ray casting march
    vec4    accumulatedColor    = vec4(0.);
    float   accumulatedAlpha    = 0. ;
    float   accumulatedLength   = 0. ;

    // Sampled Values
    vec4    sampledTarget ;
    float   sampledValue ;
    float   scaledValue ;
    vec4    sampledColor ;
    float   sampledAlpha ;
    float   sampledLight ;

    // Ray marching loop
    for(int i=0 ; i < noSteps; i++){
        sampledTarget   = Texture3D( target ,   currentCrd ) ;
        sampledValue    = dot(sampledTarget, channelMultiplier ) ;
        scaledValue     = (sampledValue-minValue)
                        / (maxValue - minValue) ;
        sampledLight = Texture3D( lightTxt , currentCrd ).r ;
        if (sampledValue > threshold){
            sampledColor = texture( clrm, vec2(scaledValue, 0.5)) ;
            sampledAlpha = alphaCorrection;
            sampledColor = sampledColor*sampledLight;
        }else{
            sampledAlpha = 0. ;
        }
        sampledAlpha = scaledValue*alphaCorrection ;

        accumulatedColor    += (1.-accumulatedAlpha)
                            *   sampledColor
                            *   sampledAlpha ;
        accumulatedAlpha += sampledAlpha ;
        accumulatedColor.a = accumulatedAlpha ;

        currentCrd += marchRay ;
        accumulatedLength += marchLength ;

        if ( accumulatedAlpha >= 1.0 || accumulatedLength> rayLength){
            accumulatedAlpha = 1.0 ;
            break ;
        }
    }
    return accumulatedColor ;
}

/*========================================================================
 * noRayCast
 *========================================================================
 */
vec4 noRayCast(){
    // getting the projected coordiante of the texture on the screen
    vec2 texc = ((projectedCoords.xy/projectedCoords.w) + vec2(1.))*0.5 ;

    // getting position on the back face of the cube
    vec3    backCrd = texture( backfaceCrdTxt, texc).xyz ;

    // coordinate of the front face
    vec3    frontCrd = worldSpaceCoords ;

    // direction vector from front to back
    vec3    ray     = backCrd - frontCrd ;
    float   rayLength   = length(ray) ;

    // marching vectors for ray casting
    float   marchLength = rayLength / float(noSteps) ;
    vec3    marchRay    = normalize(ray)*marchLength ;

    vec3    currentCrd  = frontCrd ;

    // Accumulated values during ray casting march
    vec4    accumulatedColor    = vec4(0.);
    float   accumulatedAlpha    = 0. ;
    float   accumulatedLength   = 0. ;

    // Sampled Values
    vec4    sampledTarget ;
    float   sampledValue ;
    float   scaledValue ;
    vec4    sampledColor ;
    float   sampledAlpha ;
    float   sampledLight ;
    bool colored = false ;

     // Ray marching loop
    for(int i=0 ; i < noSteps; i++){
        sampledTarget   = Texture3D(    target ,   currentCrd ) ;
        sampledValue    = dot( sampledTarget, channelMultiplier ) ;
        scaledValue     = (sampledValue-minValue)
                        / (maxValue - minValue) ;
        sampledLight = Texture3D( lightTxt , currentCrd ).r ;

        sampledColor = texture ( clrm , vec2(scaledValue, 0.5 )) ;
        
        if (    currentCrd.x < (xLevel+0.005) &&
                currentCrd.x > (xLevel-0.005) &&
                showXCut ){
            accumulatedColor.rgb = sampledColor.rgb + vec3(0.2);
            accumulatedAlpha = 1.0 ;
            colored = true ;
            break ;
        }

        if (    currentCrd.y < (yLevel+0.005) &&
                currentCrd.y > (yLevel-0.005) &&
                showYCut ){
            accumulatedColor.rgb = sampledColor.rgb + vec3(0.1);
            accumulatedAlpha = 1.0 ;
            colored = true ;
            break ;
        }

        if (    currentCrd.z < (zLevel+0.005) &&
                currentCrd.z > (zLevel-0.005) &&
                showZCut ){
            accumulatedColor.rgb = sampledColor.rgb + vec3(0.3);
            accumulatedAlpha = 1.0 ;
            colored = true ;
            break ;
        }
        
        if(drawFilament){        
            sampledValue = Texture3D( flmt, currentCrd ).r ;
            sampledAlpha = 0.0 ;
            if (sampledValue >0.5){
                sampledColor.rgb = filamentColor.rgb*sampledLight ;
                sampledAlpha = alphaCorrection ;
                colored = true ;
            }else{
                sampledAlpha = 0. ;
            }

            accumulatedColor    += (1.-accumulatedAlpha)
                *   sampledColor
                *   sampledAlpha ;
            accumulatedAlpha += sampledAlpha ;
            accumulatedColor.a = accumulatedAlpha ;
        }
        currentCrd += marchRay ;
        accumulatedLength += marchLength ;

        if ( accumulatedAlpha >= 1.0 || accumulatedLength> rayLength){
            accumulatedAlpha = 1.0 ;
            break ;
        }
    }

    if (colored){
        accumulatedAlpha = min(accumulatedAlpha, 1.) ;
        accumulatedColor.a = accumulatedAlpha ;
        return accumulatedColor ;
    }else{
        return vec4(0.) ;
    }
}
/*========================================================================
 * withPhaseField
 *========================================================================
 */
vec4 withPhaseField(){
    // getting the projected coordiante of the texture on the screen
    vec2    texc = (
                (projectedCoords.xy/projectedCoords.w)
                + vec2(1.)
            )*0.5 ;

    // getting position on the back face of the cube
    vec3    backCrd = texture( backfaceCrdTxt, texc).xyz ;

    // coordinate of the front face
    vec3    frontCrd = worldSpaceCoords ;

    // direction vector from front to back
    vec3    ray     = backCrd - frontCrd ;
    float   rayLength   = length(ray) ;

    // marching vectors for ray casting
    float   marchLength = rayLength / float(noSteps) ;
    vec3    marchRay    = normalize(ray)*marchLength ;

    vec3    currentCrd  = frontCrd ;

    // Accumulated values during ray casting march
    vec4    accumulatedColor    = vec4(0.);
    float   accumulatedAlpha    = 0. ;
    float   accumulatedLength   = 0. ;

    // Sampled Values
    vec4    sampledTarget ;
    float   sampledPhase ;
    float   sampledValue ;
    float   scaledValue ;
    vec4    sampledColor ;
    float   sampledAlpha ;
    float   sampledLight ;
    float   phaserAlpha ;
    // Ray marching loop
    for(int i=0 ; i < noSteps; i++){
        sampledTarget   = Texture3D( target ,   currentCrd ) ;
        sampledPhase    = Texture3D( phaseTxt, currentCrd).r ;
        sampledValue    = dot(sampledTarget, channelMultiplier ) ;
        scaledValue     = (sampledValue-minValue)
                        / (maxValue - minValue) ;
        sampledLight = Texture3D( lightTxt , currentCrd ).r ;
        if (sampledPhase > 0.6){
            if (sampledValue > threshold){
                sampledColor = texture( clrm, vec2(scaledValue, 0.5)) ;
                sampledColor = sampledColor*
                    (1.5+lightShift+sampledLight)/(2.5+lightShift);
                phaserAlpha = 1.0 ;
            }else{
                sampledColor.rgb = vec3(0.)+vec3(sampledLight) ;
                phaserAlpha = structural_alpha ;
            }
            sampledAlpha = sampledPhase*alphaCorrection*phaserAlpha ;
        }else{
            sampledColor.rgb = vec3(0.)+vec3(sampledLight) ;
            sampledAlpha = 0. ;
        }

        accumulatedColor    += (1.-accumulatedAlpha)
                            *   sampledColor
                            *   sampledAlpha ;
        accumulatedAlpha += sampledAlpha ;
        accumulatedColor.a = accumulatedAlpha ;

        currentCrd += marchRay ;
        accumulatedLength += marchLength ;

        if ( accumulatedAlpha >= 1.0 || accumulatedLength> rayLength){
            accumulatedAlpha = 1.0 ;
            break ;
        }
    }
    return accumulatedColor ;
}

/*========================================================================
 * withCompressedPhaseField
 *========================================================================
 */
vec4 withCompressedPhaseField(){
    // getting the projected coordiante of the texture on the screen
    vec2    texc = (
                (projectedCoords.xy/projectedCoords.w)
                + vec2(1.)
            )*0.5 ;

    // getting position on the back face of the cube
    vec3    backCrd = texture( backfaceCrdTxt, texc).xyz ;

    // coordinate of the front face
    vec3    frontCrd = worldSpaceCoords ;

    // direction vector from front to back
    vec3    ray     = backCrd - frontCrd ;
    float   rayLength   = length(ray) ;

    // marching vectors for ray casting
    float   marchLength = rayLength / float(noSteps) ;
    vec3    marchRay    = normalize(ray)*marchLength ;

    vec3    currentCrd  = frontCrd ;

    // Accumulated values during ray casting march
    vec4    accumulatedColor    = vec4(0.);
    float   accumulatedAlpha    = 0. ;
    float   accumulatedLength   = 0. ;

    // Sampled Values
    vec4    sampledTarget ;
    float   sampledPhase ;
    float   sampledValue ;
    float   scaledValue ;
    vec4    sampledColor ;
    float   sampledAlpha ;
    float   sampledLight ;
    float   phaserAlpha ;
    // Ray marching loop
    for(int i=0 ; i < noSteps; i++){
        sampledTarget   = CompTexture3D( target ,   currentCrd ) ;
        sampledPhase    = Texture3D( phaseTxt, currentCrd).r ;
        sampledValue    = dot(sampledTarget, channelMultiplier ) ;
        scaledValue     = (sampledValue-minValue)
                        / (maxValue - minValue) ;

        
        sampledLight = Texture3D( lightTxt , currentCrd ).r ;
        if (sampledPhase > 0.98){
            if (sampledValue > threshold){
                sampledColor = texture( clrm, vec2(scaledValue, 0.5)) ;
                sampledColor = sampledColor*
                    (1.+lightShift+sampledLight)/(2.+lightShift);
                phaserAlpha = 1.0 ;
            }else{
                sampledColor.rgb = vec3(0.)+vec3(sampledLight) ;
                phaserAlpha = structural_alpha ;
            }
            sampledAlpha = sampledPhase*alphaCorrection*phaserAlpha ;
        }else{
            sampledColor.rgb = vec3(0.)+vec3(sampledLight) ;
            sampledAlpha = 0. ;
        }

        accumulatedColor    += (1.-accumulatedAlpha)
                            *   sampledColor
                            *   sampledAlpha ;
        accumulatedAlpha += sampledAlpha ;
        accumulatedColor.a = accumulatedAlpha ;

        currentCrd += marchRay ;
        accumulatedLength += marchLength ;

        if ( accumulatedAlpha >= 1.0 || accumulatedLength> rayLength){
            accumulatedAlpha = 1.0 ;
            break ;
        }
    }
    return accumulatedColor ;
}

/*========================================================================
 * Main body of pass2Shader
 *========================================================================
 */
void main( void ) {
    if ( usePhaseField ){
        if ( useCompMap ){
            FragColor = withCompressedPhaseField() ;
        }else{
            FragColor = withPhaseField() ;
        }
    }else{
        if (rayCast ){
            FragColor = noPhaseField() ;
        }else{
            FragColor = noRayCast() ;
        }
    }
}` } ;



var vrc2VShader = { value : `#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * vrc2VShader  :   2nd Pass Vertex Shader for Volume-Ray-Casting
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Sat 12 Aug 2017 06:25:12 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float; precision highp int;

/*------------------------------------------------------------------------
 * Interface vars.
 *------------------------------------------------------------------------
 */
in      vec3        position ;

out     vec3        worldSpaceCoords ;
out     vec4        projectedCoords ;

uniform mat4        viewMatrix ;
uniform mat4        modelMatrix ;
uniform mat4        projectionMatrix ;

/*========================================================================
 * Main
 *========================================================================
 */
void main()
{
    worldSpaceCoords    =   position ; 
    
    projectedCoords     =   projectionMatrix 
                        *   viewMatrix
                        *   modelMatrix 
                        *   vec4( position, 1.0 ) ;

    gl_Position = projectedCoords ;
}` } ;



var vrcClickCrdShader = { value : `#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * vrcClickCrdShader   :   shades the click coordinate
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Thu 24 Aug 2017 11:49:46 AM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float; precision highp int;

/*========================================================================
 * interface variables
 *========================================================================
 */
uniform sampler2D   projectedCrds ;
uniform vec2        clickPosition ;
layout (location=0) out vec4 clickCoordinates ;

/*========================================================================
 * main body
 *========================================================================
 */
void main(){
    clickCoordinates = texture( projectedCrds , clickPosition ) ;
}` } ;



var vrcClickVoxelCrdShader = { value : `#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * vrcClickVoxelCrdShader.frag 
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Thu 03 May 2018 04:09:17 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float; precision highp int;

/*------------------------------------------------------------------------
 * interface variables 
 *------------------------------------------------------------------------
 */
in      vec2        pixPos ;
uniform float       mx, my ;
uniform sampler2D   clickCoordinates ;
uniform bool        useCompMap ;
uniform sampler2D   compMap ;

/*------------------------------------------------------------------------
 * output variable
 *------------------------------------------------------------------------
 */
layout (location = 0) out vec4 voxelPos ;

/*========================================================================
 * main
 *========================================================================
 */
void main(){
    vec4    pos = vec4(1.) ;
    vec3    crd = texture( clickCoordinates, vec2(0.5)).xyz ;
    float   RN, CN, SN ; /* row, column, and slice numbers */
    SN = floor(crd.z*mx*my) ;
    RN = floor(SN/mx) ;
    CN = SN-RN*mx ;
    pos.x = crd.x/mx + CN/mx ;
    pos.y = crd.y/my + (my-1.-RN)/my ;

    if (useCompMap){
        voxelPos = texture( compMap, pos.xy) ;
    }else{
        voxelPos = pos ;
    }
    return ;
}` } ;



var vrcCrdShader = { value : `#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * vrcCrdShader :   calculates the coordinate of each point in 3d
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Mon 14 Aug 2017 10:35:08 AM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float; precision highp int;

/*------------------------------------------------------------------------
 * Interface Vars.
 *------------------------------------------------------------------------
 */
in      vec2        pixPos ;
uniform float       mx, my ;

/*------------------------------------------------------------------------
 * Output
 *------------------------------------------------------------------------
 */
layout (location = 0 ) out vec4  crd ;

/*========================================================================
 * main body 
 *========================================================================
 */
void main(){
    crd = vec4(1.0) ;

    crd.x = (pixPos.x - floor(pixPos.x * mx)/mx ) * mx ;
    crd.y = (pixPos.y - floor(pixPos.y * my)/my ) * my ;

    float sliceNo = floor(pixPos.x * mx) 
                +   ( ( my-1.0) - floor(pixPos.y * my) )*mx ;
    crd.z = sliceNo/(mx*my) ;
}` } ;



var vrcFrmShader = { value : `#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * vrcFrmShader :   colors an object to a particular color
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Thu 14 Jun 2018 15:08:10 (EDT)
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float;
precision highp int ;

/*------------------------------------------------------------------------
 * Interface variables
 *------------------------------------------------------------------------
 */
uniform vec4    frameColor ;

/*------------------------------------------------------------------------
 * output of the shader
 *------------------------------------------------------------------------
 */
out vec4    FragColor ;

/*========================================================================
 * main body of shader
 *========================================================================
 */
void main(){
    FragColor = frameColor ;
    return ;
}` } ;



var vrcLgtShader = { value : `#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * vrcLgtShader :   shading the light on the structure
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Mon 14 Aug 2017 11:01:43 AM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float; precision highp int;

/*------------------------------------------------------------------------
 * interface vars.
 *------------------------------------------------------------------------
 */
const   int         MAX_NO = 100 ;
in      vec2        pixPos ;

uniform sampler2D   phaseTxt ;
uniform sampler2D   crdtTxt ;
uniform sampler2D   target  ;
uniform bool        usePhaseField ;

uniform float       mx, my ;

uniform vec3        dfls[ MAX_NO ] ;        /* directional flood lights */
uniform int         noDfls ;                /* number of D.F.L's        */
uniform vec3        ptls[ MAX_NO ] ;        /* point lights             */
uniform int         noPtls ;                /* number of P.L's          */

uniform float       threshold , minValue, maxValue;
uniform vec4        channelMultiplier ;
uniform float       alphaCorrection ;
uniform float       structural_alpha ;

uniform float       lightShift ;
/*------------------------------------------------------------------------
 * output
 *------------------------------------------------------------------------
 */
layout (location = 0) out vec4 light ;

/*=========================================================================
 * Acts like a texture3D using Z slices and trilinear filtering
 *=========================================================================
 */
vec4 Texture3D( sampler2D S, vec3 texCoord )
{
    vec4    vColor ;
    float x, y ;
    float wd = mx*my - 1.0 ;

    float zSliceNo  = floor( texCoord.z*mx*my) ;

    x = texCoord.x / mx ;
    y = texCoord.y / my ;

    x += (mod(zSliceNo,mx)/mx) ;
    y += floor((wd-zSliceNo)/ mx )/my ;

    vColor = texture( S,  vec2(x,y) ) ;
    return vColor ;
}

/*========================================================================
 * floodLightCast
 *========================================================================
 */
vec4 floodLightIntensity( vec3 DFL, vec3 pp, sampler2D S ){
    vec4    tc ;
    float   tv ;
    float   aa ;
    float   a ;
    float   tr ;
    vec3 ld = DFL ;
    ld = ld/length(ld) ;

    vec3 dl = ld/200. ;
    vec3 lcp = pp + ld  ;
    aa = 0. ;
    for( int i=0; i < 100 ; i++){
        tc = Texture3D( S, lcp ) ;
        tv = dot( tc , channelMultiplier ) ;
        if (tv >threshold ){
            a = (tv-minValue)/
                (maxValue-minValue) ;
            aa += a * alphaCorrection  ;
        }
        lcp -= dl ;
        if ( aa >= 1.0 ){
            aa = 1.0 ;
            break ;
        }
    }
    return vec4(1.-aa) ;
}

/*========================================================================
 * pointLightIntensity
 *========================================================================
 */ 
vec4 pointLightIntensity( vec3 PTL, vec3 pp, sampler2D S){
    vec4    tc ;
    float   tv ;
    float   aa ;
    float   a ;
    float   tr ;
    vec3 ld = PTL-pp ;
    ld = ld/length(ld) ;

    vec3 dl = ld/120. ;
    vec3 lcp = pp ;
    aa = 0. ;
    tr = alphaCorrection ;
    for( int i=0; i < 120 ; i++){
        tc = Texture3D( S, lcp ) ;
        tv = dot( tc , channelMultiplier ) ;
        if ( tv > threshold ){
            a = (tv-minValue)/
                (maxValue-minValue) ;
        
            aa += a * tr ;
        }
        lcp += dl ;
        if ( aa >= 1.0 ){
            aa = 1.0 ;
            break ;
        }
    }
    return vec4(1.-aa) ;
}


/*========================================================================
 * floodLightCast
 *========================================================================
 */
vec4 floodLightIntensityBasedOnPhase( vec3 DFL, vec3 pp, sampler2D S ){
    vec4    tc ;
    float   tv ;
    float   aa ;
    float   a ;
    float   tr ;
    vec3 ld = DFL ;
    ld = ld/length(ld) ;

    vec3 dl = ld/20. ;
    vec3 lcp = pp + ld  ;
    aa = 0. ;
    for( int i=0; i < 100 ; i++){
        tv = Texture3D( S, lcp ).r ;
        if (tv > 0. ){
            aa += tv * alphaCorrection * structural_alpha ;
            lcp -= dl ;
        }
        if ( aa >= 1.0 ){
            aa = 1.0 ;
            break ;
        }
    }
    return vec4(1.-aa) ;
}

/*========================================================================
 * pointLightIntensityBasedOnPhase
 *========================================================================
 */ 
vec4 pointLightIntensityBasedOnPhase( vec3 PTL, vec3 pp, sampler2D S){
    vec4    tc ; 
    float   aa ;
    float   tr ;
    vec3 ld = PTL-pp ;
    ld = ld/length(ld) ;

    vec3 dl = ld/120. ;
    vec3 lcp = pp ;
    aa = 0. ;
    tr = alphaCorrection * structural_alpha ;
    for( int i=0; i < 120 ; i++){
        tc = Texture3D( S, lcp ) ;
        aa += tc.r * tr ;
        lcp += dl ;
        if ( aa >= 1.0 ){
            aa = 1.0 ;
            break ;
        }
    }
    return vec4(1.-aa) ;
}

/*========================================================================
 * main body
 *========================================================================
 */
void main(){
    light = vec4(0.) ;
    vec3 crd = texture( crdtTxt, pixPos ).rgb ;

    if ( usePhaseField){
        for (int i=0 ; i < noDfls; i++){
            light += floodLightIntensityBasedOnPhase
                ( dfls[i], crd, phaseTxt ) ;
        }
        for (int i=0 ; i < noPtls; i++){
            light += pointLightIntensityBasedOnPhase
                ( ptls[i], crd, phaseTxt ) ;
        }
    }else{
        for (int i=0 ; i < noDfls; i++){
            light += floodLightIntensity( dfls[i], crd, target ) ;
        }
        for (int i=0 ; i < noPtls; i++){
            light += pointLightIntensity
                ( ptls[i], crd, target ) ;
        }

    }

    light = light/float(noDfls + noPtls);

    light = (light+lightShift)/(1.+lightShift) ;
}` } ;



var vrcPCShader = { value : `#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * vrcPCShader  :   Volume-Ray-Casting Projected Coordinate Shader
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Sat 12 Aug 2017 06:25:30 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float; precision highp int;

/*------------------------------------------------------------------------
 * Interface vars.
 *------------------------------------------------------------------------
 */
in      vec3        worldSpaceCoords;
in      vec4        projectedCoords;
uniform sampler2D   backfaceCrdTxt;

uniform sampler2D   phaseTxt ;
uniform sampler2D   target ;
uniform bool        usePhaseField ;

uniform float       minValue, maxValue, threshold ;
uniform vec4        channelMultiplier ;
uniform float       clickPenetration ;

uniform int         noSteps ;
uniform float       mx, my ;

out vec4 FragColor ;

/*========================================================================
 * Acts like a texture3D using Z slices and trilinear filtering
 *========================================================================
 */
/*------------------------------------------------------------------------
 * Texture3D
 *------------------------------------------------------------------------
 */
vec4 Texture3D( sampler2D S, vec3 texCoord )
{
    vec4    vColor1, vColor2 ;
    float x, y ;
    float wd = mx*my - 1.0 ;

    float zSliceNo  = floor( texCoord.z*mx*my) ;

    x = texCoord.x / mx ;
    y = texCoord.y / my ;

    x += (mod(zSliceNo,mx)/mx) ;
    y += floor((wd-zSliceNo)/ mx )/my ;

    vColor1 = texture( S,  vec2(x,y) ) ;

    zSliceNo = ceil( texCoord.z*mx*my) ;

    x = texCoord.x / mx ;
    y = texCoord.y / my ;

    x += (mod(zSliceNo,mx)/mx) ;
    y += floor((wd-zSliceNo)/ mx )/my ;
    vColor2 = texture( S,  vec2(x,y) ) ;

    return mix(
        vColor2,
        vColor1,
        zSliceNo/(mx*my)-texCoord.z
    ) ;
}

const float SQRT3 = sqrt(1.) ;

/*========================================================================
 * noPhaseField
 *========================================================================
 */
vec4 noPhaseField(){
    // getting the projected coordiante of the texture on the screen
    vec2 texc = ((projectedCoords.xy/projectedCoords.w) + vec2(1.))*0.5 ;

    // getting position on the back face of the cube
    vec3    backCrd = texture( backfaceCrdTxt, texc).xyz ;

    // coordinate of the front face
    vec3    frontCrd = worldSpaceCoords ;

    // direction vector from front to back
    vec3    ray     = backCrd - frontCrd ;
    float   rayLength   = length(ray) ;

    // marching vectors for ray casting
    float   marchLength = rayLength / float(noSteps) ;
    vec3    marchRay    = normalize(ray)*marchLength ;

    vec3    currentCrd  = frontCrd ;

    // Accumulated values during ray casting march
    vec4    accumulatedColor    = vec4(0.);
    
    accumulatedColor.rgb = frontCrd ;
    accumulatedColor.a = 1. ;
    return accumulatedColor ;
}

/*========================================================================
 * withPhaseField
 *========================================================================
 */
vec4 withPhaseField(){
    // getting the projected coordiante of the texture on the screen
    vec2    texc = (
                (projectedCoords.xy/projectedCoords.w)
                + vec2(1.)
            )*0.5 ;

    // getting position on the back face of the cube
    vec3    backCrd = texture( backfaceCrdTxt, texc).xyz ;

    // coordinate of the front face
    vec3    frontCrd = worldSpaceCoords ;

    // direction vector from front to back
    vec3    ray     = backCrd - frontCrd ;
    float   rayLength   = length(ray) ;

    // marching vectors for ray casting
    float   marchLength = rayLength / float(noSteps) ;
    vec3    marchRay    = normalize(ray)*marchLength ;

    vec3    currentCrd  = frontCrd ;

    // Accumulated values during ray casting march
    vec4    accumulatedColor    = vec4(0.);
    float   accumulatedAlpha    = 0. ;
    float   accumulatedLength   = 0. ;

    // Sampled Values
    float   sampledPhase ;
    vec4    sampledColor ;
    float   sampledAlpha ;

    // Ray marching loop
    for(int i=0 ; i < noSteps; i++){
        sampledPhase    = Texture3D( phaseTxt, currentCrd).r ;
        if (sampledPhase > 0.99){
            sampledColor.rgb = currentCrd + marchRay*clickPenetration;
            sampledAlpha = 2.0 ;
        }else{
            sampledColor.rgb = vec3(0.)  ;
            sampledAlpha = 0. ;
        }

        accumulatedColor    +=  sampledColor ;
        accumulatedAlpha    += sampledAlpha ;

        currentCrd += marchRay ;
        accumulatedLength += marchLength ;

        if ( accumulatedAlpha >= 1.0 || accumulatedLength> SQRT3){
            accumulatedAlpha = 1.0 ;
            break ;
        }
    }
    accumulatedColor.a = accumulatedAlpha ;
    return accumulatedColor ;
}

/*========================================================================
 * Main body of pass2Shader
 *========================================================================
 */
void main( void ) {
    if ( usePhaseField ){
        FragColor = withPhaseField() ;
    }else{
        FragColor = noPhaseField() ;
    }
}` } ;



var wA2bShader = { value : `#version 300 es

/*========================================================================
 * wA2bShader   :  BUFFER SWAP FRAGMENT SHADER  
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Thu 03 Aug 2017 05:07:29 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *========================================================================
 */
precision highp float; precision highp int;

/*========================================================================
 * Interface Variables
 *========================================================================
 */
uniform sampler2D   map ;
in      vec2        pixPos ;
layout (location = 0 ) out     vec4        FragColor ;
/*=========================================================================
 * Main body of Buffer Swap Shader 
 *=========================================================================
 */
void main()
{
    FragColor = texture(map,pixPos) ;
}` } ;




function getColormapList(){
	 return [
		"brilliant",
		"chaoslab",
		"oygb",
		"brilliant2",
		"hotbrightbands",
		"rainbowHotSpring",

		/* mat inspired */
		"autumn",
		"copper",
		"hsv",
		"pink",
		"white",
		"blue",
		"flag",
		"jet",
		"prism",
		"winter",
		"bone",
		"gray",
		"jet_white",
		"red",
		"colorcube",
		"green",
		"lines",
		"spring",
		"cool",
		"hot",
		"parula",
		"summer",

		/* tica inspired */
		"alpineColors",
		"darkTerrain",
		"pigeonTones",
		"aquamarine",
		"deepSeaColors",
		"plumColors",
		"armyColors",
		"fallColors",
		"rainbow",
		"atlanticColors",
		"fruitPunchColors",
		"redBlueTones",
		"auroraColors",
		"fuchsiaTones",
		"roseColors",
		"avacadoColors",
		"fuitPunch",
		"rustTones",
		"beachColors",
		"grayTones",
		"sandyTerrain",
		"blueGreenYellow",
		"greenBrownTerrain",
		"siennaTones",
		"brassTones",
		"greenPinkTones",
		"solarColors",
		"brightBands",
		"islandColors",
		"southwestColors",
		"brownCyanTones",
		"lakeColors",
		"starryNightColors",
		"candyColors",
		"lightTemperatureMap",
		"sunsetColors",
		"cherryTones",
		"lightTerrain",
		"temperatureMap",
		"cmykColors",
		"mintColors",
		"thermometerColors",
		"coffeeTones",
		"neonColors",
		"valentineTones",
		"darkBands",
		"pastel",
		"watermelonColors",
		"darkRainbow",
		"pearlColors",
	 ] ;
 }

function getColormaps(){
	 var colormaps ={};

	 /* processing brilliant colormap */ 
	 var map = {}; 
	 map.name = "brilliant" ;
	 map.width= 548 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 44,177,253,255,44,179,253,255,44,181,253,255,43,183,253,255,43,184,253,255,42,186,253,255,42,188,254,255,41,190,253,255,41,192,253,255,41,195,253,255,41,197,253,255,41,197,253,255,41,198,253,255,40,199,254,255,40,200,253,255,39,202,253,255,39,202,253,255,38,203,253,255,38,202,253,255,37,204,253,255,38,203,253,255,36,205,253,255,36,204,254,255,35,206,253,255,35,206,254,255,35,207,254,255,34,208,254,255,34,209,254,255,33,210,253,255,33,211,254,255,32,212,253,255,32,213,253,255,32,213,254,255,30,214,253,255,30,216,254,255,29,218,254,255,29,221,254,255,29,222,253,255,29,224,253,255,30,226,253,255,30,228,254,255,30,229,254,255,30,230,255,255,31,231,254,255,31,232,254,255,31,234,254,255,31,235,253,255,32,236,253,255,32,237,253,255,33,238,253,255,33,238,253,255,33,239,253,255,34,240,254,255,35,240,253,255,34,241,254,255,35,244,254,255,35,244,254,255,36,246,255,255,36,247,254,255,36,247,254,255,37,248,254,255,37,249,254,255,37,249,253,255,37,249,253,255,38,250,253,255,38,250,254,255,39,251,254,255,38,251,255,255,38,251,254,255,38,252,254,255,39,253,254,255,40,254,255,255,40,255,255,255,41,255,255,255,41,255,255,255,41,255,255,255,41,255,255,255,42,254,255,255,42,254,255,255,42,254,255,255,42,254,255,255,42,254,255,255,42,254,255,255,42,254,255,255,42,254,255,255,42,254,255,255,42,254,255,255,44,254,253,255,44,254,253,255,42,255,253,255,42,255,253,255,42,255,253,255,42,255,253,255,44,254,253,255,44,254,253,255,46,254,254,255,44,254,253,255,43,254,252,255,40,255,251,255,34,255,246,255,16,255,232,255,13,255,230,255,14,254,229,255,14,255,228,255,14,255,226,255,14,254,225,255,14,255,224,255,14,255,223,255,14,255,222,255,14,254,220,255,14,254,216,255,15,255,217,255,15,255,213,255,14,255,212,255,14,255,210,255,15,255,208,255,15,255,206,255,15,255,204,255,15,255,203,255,16,254,200,255,16,255,199,255,16,255,199,255,16,255,198,255,15,254,197,255,15,255,197,255,16,254,197,255,16,255,196,255,16,255,195,255,15,255,193,255,15,255,191,255,16,255,189,255,15,255,187,255,16,254,186,255,16,254,185,255,16,254,184,255,16,254,183,255,16,254,183,255,16,254,182,255,16,254,182,255,16,254,181,255,15,254,181,255,15,254,181,255,15,254,181,255,15,254,180,255,15,254,179,255,15,253,179,255,16,254,178,255,15,254,176,255,16,254,176,255,16,253,171,255,17,250,165,255,17,241,147,255,21,228,120,255,23,214,93,255,25,204,77,255,27,197,66,255,28,194,59,255,28,191,56,255,29,190,54,255,29,189,52,255,29,188,51,255,30,187,50,255,30,187,50,255,31,187,49,255,31,188,49,255,32,186,49,255,32,188,48,255,33,186,47,255,33,186,47,255,34,184,45,255,34,184,44,255,35,183,43,255,35,181,41,255,36,182,42,255,36,180,39,255,37,179,39,255,37,179,38,255,37,179,39,255,37,179,38,255,38,178,37,255,38,178,37,255,38,177,36,255,38,176,35,255,39,175,34,255,39,175,33,255,40,174,32,255,40,174,31,255,40,174,31,255,40,173,31,255,40,173,30,255,40,173,30,255,40,173,29,255,40,174,30,255,40,174,29,255,39,174,29,255,39,174,28,255,38,174,28,255,38,174,27,255,38,174,27,255,38,174,27,255,38,173,27,255,37,172,26,255,36,172,24,255,36,173,24,255,35,173,24,255,36,174,23,255,35,174,23,255,35,175,23,255,35,175,22,255,35,176,23,255,35,176,22,255,34,177,23,255,34,177,23,255,34,177,22,255,33,177,22,255,33,178,22,255,33,178,23,255,33,179,23,255,32,181,24,255,32,183,25,255,32,185,27,255,31,188,28,255,30,191,30,255,30,194,30,255,31,194,30,255,31,197,31,255,31,196,30,255,32,198,32,255,32,197,32,255,33,201,33,255,33,200,32,255,33,207,36,255,33,207,36,255,33,210,39,255,34,212,40,255,35,217,41,255,37,220,41,255,42,228,43,255,48,233,44,255,52,239,46,255,56,243,47,255,58,245,47,255,58,245,47,255,60,247,48,255,61,248,47,255,62,248,47,255,63,248,46,255,65,249,46,255,72,249,43,255,83,251,40,255,97,252,35,255,114,254,30,255,126,254,27,255,134,255,22,255,139,255,22,255,139,255,22,255,138,255,22,255,139,254,21,255,138,254,21,255,139,254,21,255,139,255,20,255,140,255,20,255,140,254,19,255,141,255,19,255,141,255,18,255,142,255,18,255,142,255,17,255,143,255,17,255,143,255,17,255,144,255,16,255,144,255,17,255,145,255,17,255,145,255,17,255,146,255,16,255,146,255,16,255,148,255,17,255,148,255,17,255,150,255,18,255,151,255,17,255,153,255,18,255,153,255,18,255,154,255,17,255,155,255,17,255,155,255,17,255,157,255,16,255,158,255,16,255,162,255,16,255,165,255,17,255,166,255,17,255,167,254,17,255,170,255,16,255,172,255,17,255,173,255,16,255,173,255,16,255,175,255,16,255,176,255,16,255,178,255,15,255,180,255,15,255,184,255,15,255,185,255,16,255,187,255,14,255,188,255,15,255,192,255,16,255,192,255,16,255,195,255,17,255,195,255,15,255,196,255,13,255,197,255,13,255,200,255,14,255,200,255,14,255,202,255,15,255,204,254,15,255,206,255,15,255,207,254,15,255,209,254,15,255,210,255,17,255,211,254,18,255,214,255,20,255,215,255,21,255,217,255,26,255,218,254,27,255,223,254,61,255,225,255,61,255,226,253,60,255,228,254,61,255,229,255,62,255,229,255,60,255,231,254,60,255,233,255,59,255,235,255,60,255,237,254,60,255,240,255,62,255,241,254,60,255,243,253,60,255,246,253,59,255,247,253,59,255,248,254,60,255,251,254,61,255,252,254,59,255,253,255,60,255,254,254,60,255,254,254,60,255,254,254,58,255,254,254,58,255,254,254,58,255,254,254,58,255,254,254,58,255,255,255,59,255,255,255,58,255,255,255,58,255,255,254,57,255,255,254,57,255,255,254,57,255,255,254,57,255,255,254,57,255,254,255,57,255,254,255,55,255,254,255,57,255,254,255,55,255,254,255,55,255,254,255,53,255,254,255,55,255,254,255,53,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,253,255,47,255,253,255,45,255,253,255,45,255,253,255,45,255,253,255,45,255,251,247,28,255,254,248,30,255,251,245,27,255,255,246,29,255,253,242,26,255,254,240,27,255,255,240,27,255,255,239,27,255,255,238,26,255,255,235,27,255,255,235,27,255,255,232,28,255,254,231,27,255,253,230,26,255,252,229,25,255,254,226,28,255,254,225,27,255,255,223,26,255,254,222,25,255,255,221,26,255,254,220,25,255,255,218,26,255,254,217,25,255,253,214,25,255,254,213,25,255,254,210,25,255,255,209,25,255,255,207,26,255,255,206,25,255,254,205,24,255,253,204,23,255,252,201,22,255,253,200,22,255,255,199,24,255,254,198,23,255,254,197,22,255,253,196,21,255,254,194,22,255,255,193,22,255,253,189,21,255,254,187,20,255,254,185,20,255,254,185,20,255,255,183,21,255,255,181,20,255,254,180,19,255,254,178,17,255,254,175,20,255,254,173,19,255,255,171,20,255,254,170,19,255,254,168,18,255,253,167,17,255,255,165,19,255,255,164,18,255,255,163,18,255,255,162,17,255,255,161,17,255,255,161,16,255,255,160,17,255,255,160,17,255,254,160,17,255,255,160,17,255,255,160,17,255,254,160,17,255,254,159,17,255,254,159,18,255,254,159,18,255,254,158,19,255,254,158,19,255,254,158,19,255,254,158,20,255,254,156,20,255,253,156,21,255,253,154,21,255,253,154,22,255,253,152,21,255,252,152,21,255,254,150,22,255,253,150,21,255,254,148,21,255,253,148,20,255,253,147,20,255,254,147,19,255,254,146,19,255,255,148,19,255,254,146,18,255,254,147,18,255,254,145,17,255,254,146,17,255,255,145,18,255,255,146,17,255,254,145,17,255,255,145,17,255,254,144,17,255,254,144,17,255,253,143,17,255,254,143,17,255,254,143,16,255,254,142,17,255,255,141,17,255,255,141,17,255,255,140,17,255,255,139,17,255,255,138,16,255,254,136,16,255,254,134,15,255,253,132,15,255,254,131,14,255,254,129,14,255,255,128,15,255,255,126,14,255,254,125,14,255,254,123,14,255,255,121,14,255,254,119,14,255,254,116,14,255,253,116,13,255,255,111,13,255,254,109,12,255,255,107,13,255,]) ;
	 map.image = imageFromArray(map.data, 548,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.brilliant = map ;
	 var map = undefined; 

	 /* processing chaoslab colormap */ 
	 var map = {}; 
	 map.name = "chaoslab" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 0,3,7,255,0,3,7,255,0,3,7,255,0,3,7,255,0,3,7,255,0,3,7,255,0,3,7,255,0,3,7,255,0,3,7,255,0,3,7,255,0,3,7,255,0,3,7,255,0,3,7,255,0,3,7,255,0,3,7,255,0,50,100,255,0,52,100,255,0,55,100,255,0,58,100,255,0,60,100,255,0,63,100,255,0,66,100,255,0,68,100,255,0,71,100,255,0,74,100,255,0,77,100,255,0,79,100,255,0,82,100,255,0,85,100,255,0,87,100,255,0,90,100,255,0,93,100,255,0,95,100,255,0,98,100,255,0,101,100,255,0,104,100,255,0,106,100,255,0,109,100,255,0,112,100,255,0,114,100,255,0,117,100,255,0,120,100,255,0,122,100,255,0,125,100,255,0,128,100,255,0,130,100,255,0,132,100,255,0,135,100,255,0,138,100,255,0,140,100,255,0,143,100,255,0,146,100,255,0,139,100,255,0,139,98,255,0,139,95,255,0,139,92,255,0,139,89,255,0,139,87,255,0,139,84,255,0,139,81,255,0,139,78,255,0,139,76,255,0,139,73,255,0,139,70,255,0,139,67,255,0,139,64,255,0,139,62,255,0,139,59,255,0,139,56,255,0,139,53,255,0,139,51,255,0,139,48,255,0,139,45,255,0,139,42,255,0,139,40,255,0,139,37,255,0,139,34,255,0,139,31,255,0,139,28,255,0,139,26,255,0,139,23,255,0,139,20,255,0,139,17,255,0,139,15,255,0,139,12,255,0,139,9,255,0,139,6,255,0,139,4,255,0,139,1,255,0,139,0,255,6,137,0,255,13,135,0,255,19,133,0,255,26,131,0,255,32,128,0,255,39,127,0,255,46,125,0,255,52,123,0,255,59,120,0,255,65,118,0,255,72,116,0,255,78,114,0,255,85,112,0,255,92,109,0,255,98,107,0,255,105,105,0,255,111,103,0,255,118,100,0,255,120,100,0,255,124,95,0,255,128,89,0,255,132,84,0,255,136,78,0,255,141,73,0,255,145,67,0,255,149,62,0,255,154,56,0,255,158,51,0,255,163,45,0,255,167,40,0,255,171,34,0,255,176,29,0,255,180,23,0,255,185,18,0,255,189,12,0,255,193,7,0,255,198,1,0,255,199,0,0,255,199,2,0,255,199,4,0,255,199,6,0,255,199,8,0,255,199,10,0,255,199,12,0,255,199,14,0,255,199,16,0,255,199,18,0,255,199,20,0,255,199,22,0,255,199,24,0,255,199,26,0,255,199,28,0,255,199,30,0,255,199,32,0,255,199,34,0,255,199,36,0,255,216,74,0,255,216,76,0,255,217,78,0,255,217,80,0,255,218,82,0,255,218,84,0,255,219,86,0,255,219,88,0,255,219,90,0,255,220,92,0,255,220,94,0,255,221,96,0,255,221,98,0,255,222,100,0,255,222,102,0,255,222,104,0,255,223,106,0,255,223,108,0,255,224,110,0,255,224,112,0,255,225,114,0,255,225,116,0,255,226,118,0,255,226,120,0,255,226,122,0,255,227,124,0,255,227,126,0,255,228,128,0,255,228,129,0,255,229,131,0,255,229,133,0,255,230,135,0,255,230,137,0,255,230,139,0,255,231,141,0,255,231,143,0,255,232,145,0,255,246,214,0,255,246,216,0,255,247,218,0,255,247,220,0,255,247,221,0,255,248,223,0,255,248,225,0,255,249,227,0,255,249,229,0,255,250,231,0,255,250,233,0,255,250,235,0,255,251,237,0,255,251,238,0,255,252,240,0,255,252,242,0,255,252,244,0,255,253,246,0,255,253,248,0,255,254,250,0,255,254,252,0,255,255,253,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.chaoslab = map ;
	 var map = undefined; 

	 /* processing oygb colormap */ 
	 var map = {}; 
	 map.name = "oygb" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 41,85,253,255,41,88,253,255,41,91,253,255,41,94,253,255,41,97,253,255,41,100,253,255,41,103,253,255,41,106,253,255,41,109,253,255,41,112,253,255,41,115,253,255,41,117,253,255,41,121,253,255,41,123,253,255,41,126,253,255,41,129,253,255,41,132,253,255,41,134,253,255,41,138,253,255,41,140,253,255,41,143,253,255,41,147,253,255,41,150,253,255,41,153,253,255,41,155,253,255,41,158,253,255,41,161,253,255,41,164,253,255,41,167,253,255,41,170,253,255,41,173,253,255,41,176,253,255,41,179,253,255,41,181,253,255,41,184,253,255,41,187,253,255,41,190,253,255,41,193,253,255,41,195,253,255,41,198,253,255,41,202,253,255,41,204,253,255,41,207,253,255,41,210,253,255,41,213,253,255,41,216,253,255,41,219,253,255,41,221,253,255,41,225,253,255,41,227,253,255,41,231,253,255,41,233,253,255,40,236,246,255,38,237,234,255,35,238,221,255,33,238,208,255,32,240,195,255,29,241,182,255,27,242,169,255,25,242,156,255,23,244,143,255,21,245,130,255,19,246,117,255,17,247,104,255,15,248,91,255,10,255,0,255,12,255,0,255,16,255,0,255,17,255,0,255,21,255,0,255,23,255,0,255,25,255,0,255,28,255,0,255,30,255,0,255,34,255,0,255,36,255,0,255,38,255,0,255,41,255,0,255,44,255,0,255,46,255,0,255,48,255,0,255,51,255,0,255,53,255,0,255,56,255,0,255,59,255,0,255,62,255,0,255,64,255,0,255,67,255,0,255,69,255,0,255,71,255,0,255,74,255,0,255,76,255,0,255,80,255,0,255,82,255,0,255,84,255,0,255,87,255,0,255,90,255,0,255,92,255,0,255,95,255,0,255,97,255,0,255,99,255,0,255,102,255,0,255,105,255,0,255,108,255,0,255,110,255,0,255,113,255,0,255,115,255,0,255,117,255,0,255,121,255,0,255,123,255,0,255,125,255,0,255,128,255,0,255,130,255,0,255,133,255,0,255,135,255,0,255,138,255,0,255,141,255,0,255,143,255,0,255,146,255,0,255,148,255,0,255,151,255,0,255,154,255,0,255,156,255,0,255,158,255,0,255,162,255,0,255,164,255,0,255,166,255,0,255,169,255,0,255,171,255,0,255,174,255,0,255,177,255,0,255,179,255,0,255,181,255,0,255,184,255,0,255,187,255,0,255,189,255,0,255,192,255,0,255,194,255,0,255,197,255,0,255,200,255,0,255,202,255,0,255,205,255,0,255,207,255,0,255,210,255,0,255,212,255,0,255,215,255,0,255,218,255,0,255,220,255,0,255,222,255,0,255,225,255,0,255,227,255,0,255,230,255,0,255,233,255,0,255,236,255,0,255,238,255,0,255,240,255,0,255,243,255,0,255,246,255,0,255,248,255,0,255,251,255,0,255,253,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,252,0,255,255,248,0,255,255,245,0,255,255,242,1,255,254,239,1,255,254,236,1,255,255,232,1,255,255,229,2,255,255,227,2,255,254,223,2,255,255,220,2,255,255,217,2,255,255,214,2,255,255,211,3,255,254,208,3,255,255,205,3,255,255,201,3,255,254,198,4,255,255,195,4,255,255,192,4,255,255,189,4,255,254,186,5,255,255,182,5,255,255,179,5,255,254,176,6,255,255,173,5,255,254,170,6,255,254,166,6,255,254,163,6,255,255,160,6,255,254,157,6,255,254,154,7,255,254,151,7,255,254,147,7,255,254,144,7,255,254,141,8,255,254,138,8,255,254,135,8,255,254,131,9,255,254,128,9,255,254,126,9,255,254,122,9,255,254,119,9,255,254,116,9,255,254,112,9,255,254,109,10,255,254,106,10,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.oygb = map ;
	 var map = undefined; 

	 /* processing brilliant2 colormap */ 
	 var map = {}; 
	 map.name = "brilliant2" ;
	 map.width= 548 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 44,177,253,255,44,179,253,255,44,181,253,255,43,183,253,255,43,184,253,255,42,186,253,255,42,188,254,255,41,190,253,255,41,192,253,255,41,195,253,255,41,197,253,255,41,197,253,255,41,198,253,255,40,199,254,255,40,200,253,255,39,202,253,255,39,202,253,255,38,203,253,255,38,202,253,255,37,204,253,255,38,203,253,255,36,205,253,255,36,204,254,255,35,206,253,255,35,206,254,255,35,207,254,255,34,208,254,255,34,209,254,255,33,210,253,255,33,211,254,255,32,212,253,255,32,213,253,255,32,213,254,255,30,214,253,255,30,216,254,255,29,218,254,255,29,221,254,255,29,222,253,255,29,224,253,255,30,226,253,255,30,228,254,255,30,229,254,255,30,230,255,255,31,231,254,255,31,232,254,255,31,234,254,255,31,235,253,255,32,236,253,255,32,237,253,255,33,238,253,255,33,238,253,255,33,239,253,255,34,240,254,255,35,240,253,255,34,241,254,255,35,244,254,255,35,244,254,255,36,246,255,255,36,247,254,255,36,247,254,255,37,248,254,255,37,249,254,255,37,249,253,255,37,249,253,255,38,250,253,255,38,250,254,255,39,251,254,255,38,251,255,255,38,251,254,255,38,252,254,255,39,253,254,255,40,254,255,255,40,255,255,255,41,255,255,255,41,255,255,255,41,255,255,255,41,255,255,255,42,254,255,255,42,254,255,255,42,254,255,255,42,254,255,255,42,254,255,255,42,254,255,255,42,254,255,255,42,254,255,255,42,254,255,255,42,254,255,255,44,254,253,255,44,254,253,255,42,255,253,255,42,255,253,255,42,255,253,255,42,255,253,255,44,254,253,255,44,254,253,255,46,254,254,255,44,254,253,255,43,254,252,255,40,255,251,255,34,255,246,255,16,255,232,255,13,255,230,255,14,254,229,255,14,255,228,255,14,255,226,255,14,254,225,255,14,255,224,255,14,255,223,255,14,255,222,255,14,254,220,255,14,254,216,255,15,255,217,255,15,255,213,255,14,255,212,255,14,255,210,255,15,255,208,255,15,255,206,255,15,255,204,255,15,255,203,255,16,254,200,255,16,255,199,255,16,255,199,255,16,255,198,255,15,254,197,255,15,255,197,255,16,254,197,255,16,255,196,255,16,255,195,255,15,255,193,255,15,255,191,255,16,255,189,255,15,255,187,255,16,254,186,255,16,254,185,255,16,254,184,255,16,254,183,255,16,254,183,255,16,254,182,255,16,254,182,255,16,254,181,255,15,254,181,255,15,254,181,255,15,254,181,255,15,254,180,255,15,254,179,255,15,253,179,255,16,254,178,255,15,254,176,255,16,254,176,255,16,253,171,255,17,250,165,255,17,241,147,255,21,228,120,255,23,214,93,255,25,204,77,255,27,197,66,255,28,194,59,255,28,191,56,255,29,190,54,255,29,189,52,255,29,188,51,255,30,187,50,255,30,187,50,255,31,187,49,255,31,188,49,255,32,186,49,255,32,188,48,255,33,186,47,255,33,186,47,255,34,184,45,255,34,184,44,255,35,183,43,255,35,181,41,255,36,182,42,255,36,180,39,255,37,179,39,255,37,179,38,255,37,179,39,255,37,179,38,255,38,178,37,255,38,178,37,255,38,177,36,255,38,176,35,255,39,175,34,255,39,175,33,255,40,174,32,255,40,174,31,255,40,174,31,255,40,173,31,255,40,173,30,255,40,173,30,255,40,173,29,255,40,174,30,255,40,174,29,255,39,174,29,255,39,174,28,255,38,174,28,255,38,174,27,255,38,174,27,255,38,174,27,255,38,173,27,255,37,172,26,255,36,172,24,255,36,173,24,255,35,173,24,255,36,174,23,255,35,174,23,255,35,175,23,255,35,175,22,255,35,176,23,255,35,176,22,255,34,177,23,255,34,177,23,255,34,177,22,255,33,177,22,255,33,178,22,255,33,178,23,255,33,179,23,255,32,181,24,255,32,183,25,255,32,185,27,255,31,188,28,255,30,191,30,255,30,194,30,255,31,194,30,255,31,197,31,255,31,196,30,255,32,198,32,255,32,197,32,255,33,201,33,255,33,200,32,255,33,207,36,255,33,207,36,255,33,210,39,255,34,212,40,255,35,217,41,255,37,220,41,255,42,228,43,255,48,233,44,255,52,239,46,255,56,243,47,255,58,245,47,255,58,245,47,255,60,247,48,255,61,248,47,255,62,248,47,255,63,248,46,255,65,249,46,255,72,249,43,255,83,251,40,255,97,252,35,255,114,254,30,255,126,254,27,255,134,255,22,255,139,255,22,255,139,255,22,255,138,255,22,255,139,254,21,255,138,254,21,255,139,254,21,255,139,255,20,255,140,255,20,255,140,254,19,255,141,255,19,255,141,255,18,255,142,255,18,255,142,255,17,255,143,255,17,255,143,255,17,255,144,255,16,255,144,255,17,255,145,255,17,255,145,255,17,255,146,255,16,255,146,255,16,255,148,255,17,255,148,255,17,255,150,255,18,255,151,255,17,255,153,255,18,255,153,255,18,255,154,255,17,255,155,255,17,255,155,255,17,255,157,255,16,255,158,255,16,255,162,255,16,255,165,255,17,255,166,255,17,255,167,254,17,255,170,255,16,255,172,255,17,255,173,255,16,255,173,255,16,255,175,255,16,255,176,255,16,255,178,255,15,255,180,255,15,255,184,255,15,255,185,255,16,255,187,255,14,255,188,255,15,255,192,255,16,255,192,255,16,255,195,255,17,255,195,255,15,255,196,255,13,255,197,255,13,255,200,255,14,255,200,255,14,255,202,255,15,255,204,254,15,255,206,255,15,255,207,254,15,255,209,254,15,255,210,255,17,255,211,254,18,255,214,255,20,255,215,255,21,255,217,255,26,255,218,254,27,255,223,254,61,255,225,255,61,255,226,253,60,255,228,254,61,255,229,255,62,255,229,255,60,255,231,254,60,255,233,255,59,255,235,255,60,255,237,254,60,255,240,255,62,255,241,254,60,255,243,253,60,255,246,253,59,255,247,253,59,255,248,254,60,255,251,254,61,255,252,254,59,255,253,255,60,255,254,254,60,255,254,254,60,255,254,254,58,255,254,254,58,255,254,254,58,255,254,254,58,255,254,254,58,255,255,255,59,255,255,255,58,255,255,255,58,255,255,254,57,255,255,254,57,255,255,254,57,255,255,254,57,255,255,254,57,255,254,255,57,255,254,255,55,255,254,255,57,255,254,255,55,255,254,255,55,255,254,255,53,255,254,255,55,255,254,255,53,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,255,255,43,255,253,255,47,255,253,255,45,255,253,255,45,255,253,255,45,255,253,255,45,255,251,247,28,255,254,248,30,255,251,245,27,255,255,246,29,255,253,242,26,255,254,240,27,255,255,240,27,255,255,239,27,255,255,238,26,255,255,235,27,255,255,235,27,255,255,232,28,255,254,231,27,255,253,230,26,255,252,229,25,255,254,226,28,255,254,225,27,255,255,223,26,255,254,222,25,255,255,221,26,255,254,220,25,255,255,218,26,255,254,217,25,255,253,214,25,255,254,213,25,255,254,210,25,255,255,209,25,255,255,207,26,255,255,206,25,255,254,205,24,255,253,204,23,255,252,201,22,255,253,200,22,255,255,199,24,255,254,198,23,255,254,197,22,255,253,196,21,255,254,194,22,255,255,193,22,255,253,189,21,255,254,187,20,255,254,185,20,255,254,185,20,255,255,183,21,255,255,181,20,255,254,180,19,255,254,178,17,255,254,175,20,255,254,173,19,255,255,171,20,255,254,170,19,255,254,168,18,255,253,167,17,255,255,165,19,255,255,164,18,255,255,163,18,255,255,162,17,255,255,161,17,255,255,161,16,255,255,160,17,255,255,160,17,255,254,160,17,255,255,160,17,255,255,160,17,255,254,160,17,255,254,159,17,255,254,159,18,255,254,159,18,255,254,158,19,255,254,158,19,255,254,158,19,255,254,158,20,255,254,156,20,255,253,156,21,255,253,154,21,255,253,154,22,255,253,152,21,255,252,152,21,255,254,150,22,255,253,150,21,255,254,148,21,255,253,148,20,255,253,147,20,255,254,147,19,255,254,146,19,255,255,148,19,255,254,146,18,255,254,147,18,255,254,145,17,255,254,146,17,255,255,145,18,255,255,146,17,255,254,145,17,255,255,145,17,255,254,144,17,255,254,144,17,255,253,143,17,255,254,143,17,255,254,143,16,255,254,142,17,255,255,141,17,255,255,141,17,255,255,140,17,255,255,139,17,255,255,138,16,255,254,136,16,255,254,134,15,255,253,132,15,255,254,131,14,255,254,129,14,255,255,128,15,255,255,126,14,255,254,125,14,255,254,123,14,255,255,121,14,255,254,119,14,255,254,116,14,255,253,116,13,255,255,111,13,255,254,109,12,255,255,107,13,255,]) ;
	 map.image = imageFromArray(map.data, 548,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.brilliant2 = map ;
	 var map = undefined; 

	 /* processing hotbrightbands colormap */ 
	 var map = {}; 
	 map.name = "hotbrightbands" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 106,83,255,255,106,83,255,255,106,83,255,255,112,89,255,255,112,89,255,255,118,96,255,255,118,96,255,255,118,96,255,255,125,103,255,255,125,103,255,255,131,110,255,255,131,110,255,255,131,110,255,255,137,117,255,255,137,117,255,255,137,117,255,255,143,123,255,255,143,123,255,255,149,130,255,255,149,130,255,255,149,130,255,255,155,137,255,255,155,137,255,255,161,144,255,255,161,144,255,255,161,144,255,255,167,150,255,255,167,150,255,255,167,150,255,255,173,157,255,255,173,157,255,255,179,164,255,255,179,164,255,255,179,164,255,255,185,171,255,255,185,171,255,255,191,178,255,255,191,178,255,255,191,178,255,255,197,184,255,255,197,184,255,255,204,191,255,255,178,190,255,255,148,188,255,255,119,187,255,255,88,185,255,255,59,184,255,255,42,186,255,255,42,186,255,255,50,190,255,255,50,190,255,255,50,190,255,255,58,193,255,255,58,193,255,255,67,197,255,255,67,197,255,255,67,197,255,255,75,200,255,255,75,200,255,255,83,204,255,255,83,204,255,255,83,204,255,255,92,207,255,255,92,207,255,255,92,207,255,255,100,211,255,255,100,211,255,255,108,214,255,255,108,214,255,255,108,214,255,255,117,218,255,255,117,218,255,255,125,222,255,255,125,222,255,255,125,222,255,255,133,225,255,255,133,225,255,255,141,229,255,255,141,229,255,255,141,229,255,255,150,232,255,255,150,232,255,255,150,232,255,255,158,236,255,255,158,236,255,255,166,239,255,255,156,240,233,255,146,241,211,255,136,242,188,255,126,243,166,255,115,244,143,255,106,245,121,255,95,246,98,255,85,247,75,255,74,249,52,255,83,250,50,255,83,250,50,255,83,250,50,255,90,250,57,255,90,250,57,255,90,250,57,255,98,251,64,255,98,251,64,255,106,251,71,255,106,251,71,255,106,251,71,255,113,252,78,255,113,252,78,255,121,252,85,255,121,252,85,255,121,252,85,255,129,253,92,255,129,253,92,255,136,253,99,255,136,253,99,255,136,253,99,255,144,254,106,255,144,254,106,255,144,254,106,255,152,254,113,255,152,254,113,255,159,255,120,255,159,255,120,255,159,255,120,255,167,255,127,255,167,255,127,255,175,255,134,255,175,255,134,255,175,255,134,255,182,255,140,255,195,253,123,255,209,250,105,255,224,246,87,255,237,244,69,255,249,242,59,255,249,242,59,255,249,242,59,255,250,242,66,255,250,242,66,255,250,243,72,255,250,243,72,255,250,243,72,255,250,243,78,255,250,243,78,255,251,244,84,255,251,244,84,255,251,244,84,255,251,245,90,255,251,245,90,255,252,245,96,255,252,245,96,255,252,245,96,255,252,246,102,255,252,246,102,255,252,246,102,255,252,246,109,255,252,246,109,255,253,247,115,255,253,247,115,255,253,247,115,255,253,248,121,255,253,248,121,255,254,248,127,255,254,248,127,255,254,248,127,255,254,249,133,255,254,249,133,255,254,249,133,255,255,249,139,255,255,249,139,255,255,250,146,255,255,250,146,255,255,250,146,255,255,248,149,255,255,217,112,255,255,189,76,255,255,159,39,255,255,132,6,255,255,136,14,255,255,136,14,255,255,139,21,255,255,139,21,255,255,139,21,255,255,143,29,255,255,143,29,255,255,143,29,255,255,147,37,255,255,147,37,255,255,151,44,255,255,151,44,255,255,151,44,255,255,155,52,255,255,155,52,255,255,158,59,255,255,158,59,255,255,158,59,255,255,162,67,255,255,162,67,255,255,166,75,255,255,166,75,255,255,166,75,255,255,170,82,255,255,170,82,255,255,170,82,255,255,174,90,255,255,174,90,255,255,177,97,255,255,177,97,255,255,177,97,255,255,181,105,255,255,181,105,255,255,185,113,255,255,185,113,255,255,185,113,255,255,189,120,255,255,189,120,255,255,192,128,255,255,192,128,255,255,192,128,255,255,192,128,255,248,148,108,255,242,104,86,255,235,60,66,255,230,27,50,255,232,35,60,255,232,35,60,255,234,43,69,255,234,43,69,255,234,43,69,255,235,52,78,255,235,52,78,255,237,60,87,255,237,60,87,255,237,60,87,255,239,68,97,255,239,68,97,255,240,77,106,255,240,77,106,255,240,77,106,255,242,85,115,255,242,85,115,255,242,85,115,255,244,94,124,255,244,94,124,255,245,102,133,255,245,102,133,255,245,102,133,255,247,110,143,255,247,110,143,255,248,119,152,255,248,119,152,255,248,119,152,255,250,127,161,255,250,127,161,255,252,136,170,255,252,136,170,255,252,136,170,255,253,144,180,255,253,144,180,255,253,144,180,255,255,152,189,255,255,152,189,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.hotbrightbands = map ;
	 var map = undefined; 

	 /* processing rainbowHotSpring colormap */ 
	 var map = {}; 
	 map.name = "rainbowHotSpring" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 9,26,141,255,10,30,143,255,11,34,145,255,13,37,148,255,13,40,150,255,14,44,153,255,16,47,156,255,16,50,158,255,18,54,160,255,19,57,162,255,19,60,165,255,21,64,167,255,22,67,170,255,23,70,172,255,24,74,174,255,25,77,177,255,26,80,180,255,27,84,182,255,28,88,185,255,29,90,187,255,30,94,190,255,31,97,192,255,33,101,194,255,33,104,197,255,34,108,199,255,36,111,202,255,37,114,205,255,38,118,207,255,38,121,209,255,39,124,212,255,41,128,214,255,42,130,216,255,43,134,219,255,43,138,221,255,44,141,224,255,46,144,227,255,46,148,228,255,48,151,231,255,49,155,234,255,50,158,236,255,51,161,238,255,52,164,241,255,53,168,243,255,54,172,245,255,55,175,248,255,56,177,250,255,56,177,250,255,56,177,250,255,56,177,250,255,56,177,250,255,56,177,250,255,56,177,250,255,56,177,250,255,56,177,250,255,59,178,242,255,61,178,239,255,61,178,236,255,63,178,233,255,64,179,230,255,65,178,228,255,67,179,225,255,68,179,221,255,69,179,219,255,70,179,215,255,71,180,213,255,73,180,210,255,73,180,207,255,75,180,204,255,76,181,201,255,77,181,198,255,79,181,195,255,80,182,193,255,80,182,189,255,82,182,186,255,83,182,184,255,84,182,181,255,86,183,178,255,87,182,175,255,88,183,172,255,89,184,169,255,91,183,166,255,91,184,163,255,92,183,160,255,94,184,158,255,95,184,155,255,97,185,152,255,98,185,149,255,99,185,146,255,100,185,143,255,101,185,140,255,102,185,137,255,103,186,134,255,105,186,131,255,106,186,128,255,107,186,125,255,108,187,123,255,110,187,119,255,111,187,117,255,112,187,113,255,114,188,111,255,114,188,107,255,115,188,105,255,117,189,102,255,117,188,99,255,119,189,96,255,120,189,93,255,122,189,90,255,123,190,87,255,124,190,85,255,125,190,82,255,126,190,79,255,127,190,75,255,128,191,73,255,130,190,70,255,131,191,67,255,132,191,64,255,133,191,61,255,135,191,58,255,135,192,55,255,137,192,53,255,138,192,50,255,139,193,47,255,141,193,44,255,142,193,40,255,145,194,43,255,149,197,47,255,153,199,50,255,156,200,54,255,160,201,57,255,162,204,61,255,166,205,64,255,169,207,68,255,174,209,72,255,177,210,75,255,181,212,78,255,184,214,83,255,188,215,85,255,191,217,89,255,195,219,92,255,198,222,96,255,201,223,99,255,205,224,103,255,208,226,107,255,212,228,111,255,216,230,114,255,219,232,118,255,223,233,121,255,227,236,124,255,230,237,128,255,233,239,132,255,237,241,135,255,240,242,139,255,244,244,142,255,248,246,146,255,248,244,145,255,248,243,143,255,247,242,142,255,248,240,141,255,247,238,139,255,247,237,138,255,248,236,137,255,247,234,136,255,247,232,134,255,247,231,133,255,246,229,131,255,246,227,130,255,246,226,129,255,246,225,128,255,246,223,125,255,246,221,124,255,246,220,123,255,246,219,121,255,246,217,121,255,246,215,119,255,246,213,117,255,245,213,116,255,245,211,115,255,245,209,114,255,244,207,112,255,244,206,111,255,245,204,110,255,244,203,108,255,245,201,106,255,245,199,105,255,244,199,104,255,244,196,103,255,243,195,101,255,244,194,100,255,244,191,98,255,244,190,97,255,243,188,96,255,243,187,94,255,243,186,93,255,243,184,92,255,243,183,90,255,243,181,89,255,243,179,88,255,242,178,86,255,243,176,85,255,242,175,84,255,243,173,82,255,242,171,81,255,242,169,80,255,242,169,78,255,241,167,77,255,241,166,75,255,241,163,74,255,241,162,73,255,241,161,72,255,241,159,70,255,241,158,68,255,240,156,67,255,241,154,65,255,241,153,64,255,240,151,63,255,240,150,62,255,240,148,61,255,240,147,59,255,240,145,57,255,240,143,56,255,239,141,55,255,240,140,53,255,240,138,52,255,239,137,51,255,239,135,49,255,239,134,48,255,239,133,47,255,239,131,46,255,238,130,44,255,238,128,42,255,239,126,42,255,238,124,40,255,238,124,39,255,238,122,37,255,238,120,36,255,238,119,34,255,238,117,33,255,237,115,31,255,237,114,30,255,237,113,29,255,237,111,27,255,237,109,26,255,237,108,24,255,237,106,24,255,237,104,22,255,237,103,21,255,236,101,19,255,236,100,18,255,236,98,17,255,236,97,15,255,236,95,13,255,236,93,13,255,235,92,11,255,235,90,9,255,235,89,8,255,235,87,7,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.rainbowHotSpring = map ;
	 var map = undefined; 

		/* mat inspired */

	 /* processing autumn colormap */ 
	 var map = {}; 
	 map.name = "autumn" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 252,1,1,255,252,1,1,255,252,0,1,255,252,2,1,255,252,4,1,255,252,4,1,255,252,4,1,255,252,6,1,255,252,8,1,255,252,8,1,255,252,8,1,255,252,9,1,255,252,12,1,255,252,12,1,255,252,12,1,255,252,13,1,255,252,16,1,255,252,16,1,255,252,16,1,255,252,18,1,255,252,20,1,255,252,20,1,255,252,20,1,255,252,22,1,255,252,24,1,255,252,24,1,255,252,24,1,255,252,25,1,255,252,28,1,255,252,28,1,255,252,28,1,255,252,29,1,255,252,32,1,255,252,32,1,255,252,32,1,255,252,33,1,255,252,36,1,255,252,36,1,255,252,36,1,255,252,38,1,255,252,40,1,255,252,40,1,255,252,40,1,255,252,42,1,255,252,45,1,255,252,45,1,255,252,45,1,255,252,46,1,255,252,49,1,255,252,49,1,255,252,49,1,255,252,50,1,255,252,53,1,255,252,53,1,255,252,53,1,255,252,53,1,255,252,56,1,255,252,57,1,255,252,57,1,255,252,58,1,255,252,61,1,255,252,61,1,255,252,61,1,255,252,62,1,255,252,65,1,255,252,65,1,255,252,65,1,255,252,66,1,255,252,68,1,255,252,69,1,255,252,69,1,255,252,69,1,255,252,72,1,255,252,73,1,255,252,73,1,255,252,73,1,255,252,76,1,255,252,77,1,255,252,76,1,255,252,78,1,255,252,81,1,255,252,80,1,255,252,80,1,255,252,82,1,255,252,84,1,255,252,84,1,255,252,84,1,255,252,85,1,255,252,88,1,255,252,88,1,255,252,88,1,255,252,89,1,255,252,92,1,255,252,92,1,255,252,92,1,255,252,92,1,255,252,95,1,255,252,96,1,255,252,96,1,255,252,98,1,255,252,100,1,255,252,100,1,255,252,100,1,255,252,101,1,255,252,104,1,255,252,104,1,255,252,104,1,255,252,105,1,255,252,108,1,255,252,108,1,255,252,108,1,255,252,108,1,255,252,111,1,255,252,112,1,255,252,112,1,255,252,114,1,255,252,116,1,255,252,116,1,255,252,116,1,255,252,117,1,255,252,120,1,255,252,120,1,255,252,120,1,255,252,121,1,255,252,124,1,255,252,124,1,255,252,124,1,255,252,124,1,255,252,128,1,255,252,129,1,255,252,129,1,255,252,129,1,255,252,132,1,255,252,133,1,255,252,133,1,255,252,134,1,255,252,137,1,255,252,137,1,255,252,137,1,255,252,138,1,255,252,141,1,255,252,141,1,255,252,141,1,255,252,141,1,255,252,144,1,255,252,145,1,255,252,145,1,255,252,145,1,255,252,148,1,255,252,149,1,255,252,149,1,255,252,149,1,255,252,152,1,255,252,153,1,255,252,152,1,255,252,154,1,255,252,156,1,255,252,156,1,255,252,156,1,255,252,157,1,255,252,160,1,255,252,160,1,255,252,160,1,255,252,161,1,255,252,164,1,255,252,164,1,255,252,164,1,255,252,165,1,255,252,168,1,255,252,168,1,255,252,168,1,255,252,168,1,255,252,171,1,255,252,172,1,255,252,172,1,255,252,173,1,255,252,176,1,255,252,176,1,255,252,176,1,255,252,177,1,255,252,180,1,255,252,180,1,255,252,180,1,255,252,180,1,255,252,184,1,255,252,184,1,255,252,184,1,255,252,184,1,255,252,187,1,255,252,188,1,255,252,188,1,255,252,188,1,255,252,191,1,255,252,192,1,255,252,192,1,255,252,193,1,255,252,196,1,255,252,196,1,255,252,196,1,255,252,196,1,255,252,199,1,255,252,200,1,255,252,200,1,255,252,200,1,255,252,203,1,255,252,204,1,255,252,204,1,255,252,204,1,255,252,207,1,255,252,208,1,255,252,208,1,255,252,208,1,255,252,211,1,255,252,213,1,255,252,213,1,255,252,213,1,255,252,216,1,255,252,217,1,255,252,217,1,255,252,217,1,255,252,220,1,255,252,221,1,255,252,221,1,255,252,221,1,255,252,224,1,255,252,225,1,255,252,225,1,255,252,225,1,255,252,227,1,255,252,229,1,255,252,229,1,255,252,228,1,255,252,231,1,255,252,232,1,255,252,232,1,255,252,233,1,255,252,236,1,255,252,236,1,255,252,236,1,255,252,237,1,255,252,240,1,255,252,240,1,255,252,240,1,255,252,240,1,255,252,243,1,255,252,244,1,255,252,244,1,255,252,244,1,255,252,247,1,255,252,248,1,255,252,248,1,255,252,248,1,255,252,250,1,255,252,252,1,255,252,252,0,255,238,238,3,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.autumn = map ;
	 var map = undefined; 

	 /* processing copper colormap */ 
	 var map = {}; 
	 map.name = "copper" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 18,19,18,255,0,1,0,255,1,2,1,255,1,2,1,255,5,4,2,255,5,4,2,255,5,4,2,255,5,4,2,255,9,7,4,255,10,7,4,255,10,7,4,255,10,7,4,255,13,9,6,255,15,10,6,255,15,10,6,255,15,10,6,255,18,12,7,255,20,14,8,255,20,14,8,255,21,15,9,255,25,17,10,255,25,17,10,255,25,17,10,255,25,17,10,255,29,20,12,255,30,20,12,255,30,20,12,255,30,20,12,255,34,22,14,255,35,23,14,255,35,23,14,255,35,23,14,255,38,25,16,255,40,26,16,255,40,26,16,255,40,26,16,255,43,28,17,255,46,29,18,255,46,29,18,255,46,29,18,255,50,33,20,255,51,33,20,255,51,33,20,255,51,33,20,255,55,35,22,255,56,36,22,255,56,36,22,255,56,36,22,255,59,38,24,255,61,39,24,255,61,39,24,255,61,39,24,255,64,41,25,255,66,42,26,255,66,42,26,255,65,42,26,255,68,43,27,255,71,45,28,255,71,45,28,255,71,45,28,255,75,48,30,255,76,48,30,255,75,48,30,255,76,48,30,255,79,51,32,255,81,52,32,255,80,52,32,255,80,52,32,255,84,54,33,255,85,55,34,255,85,55,34,255,85,55,34,255,88,57,35,255,90,58,36,255,90,58,36,255,90,58,36,255,93,59,37,255,95,61,38,255,95,61,38,255,96,61,38,255,100,63,40,255,100,64,40,255,100,64,40,255,100,64,40,255,104,66,42,255,105,67,42,255,105,67,42,255,105,67,42,255,109,69,43,255,110,71,44,255,110,71,44,255,110,71,44,255,113,72,45,255,115,74,46,255,115,74,46,255,115,74,46,255,117,75,47,255,120,77,48,255,120,76,48,255,120,77,48,255,124,79,50,255,125,80,50,255,125,79,50,255,125,80,50,255,130,82,51,255,131,82,52,255,131,82,52,255,131,82,52,255,134,84,53,255,136,85,54,255,136,85,54,255,136,85,54,255,139,88,55,255,141,89,56,255,141,89,56,255,141,90,56,255,145,92,58,255,146,92,58,255,146,92,58,255,146,92,58,255,150,95,59,255,151,95,60,255,151,95,60,255,151,95,60,255,154,98,61,255,156,98,62,255,155,98,62,255,155,98,62,255,159,100,63,255,160,101,64,255,160,101,64,255,160,101,64,255,163,103,65,255,165,104,66,255,165,104,66,255,166,105,66,255,170,108,67,255,170,108,68,255,170,108,68,255,171,108,68,255,175,111,69,255,175,111,70,255,175,111,70,255,175,111,70,255,179,113,71,255,180,114,72,255,180,114,72,255,180,114,72,255,183,116,74,255,185,117,75,255,185,117,74,255,185,117,74,255,188,119,76,255,190,120,77,255,190,120,76,255,191,120,77,255,195,123,78,255,195,123,78,255,195,123,78,255,195,123,79,255,199,125,80,255,200,126,81,255,200,126,80,255,200,126,81,255,204,129,82,255,205,130,82,255,205,130,82,255,205,130,82,255,208,132,84,255,210,133,84,255,210,133,84,255,210,133,84,255,213,134,86,255,216,136,86,255,216,136,86,255,216,136,87,255,220,138,88,255,221,139,88,255,221,139,88,255,221,139,88,255,225,141,90,255,226,142,90,255,226,142,90,255,226,142,90,255,229,144,92,255,231,145,92,255,231,145,92,255,230,145,92,255,234,147,94,255,236,149,94,255,235,149,94,255,235,148,94,255,238,150,95,255,240,152,96,255,240,152,96,255,241,152,97,255,245,154,98,255,245,154,98,255,245,154,98,255,246,155,98,255,249,157,100,255,250,157,100,255,250,157,100,255,250,157,100,255,252,160,102,255,252,160,102,255,252,160,102,255,252,160,102,255,252,162,103,255,252,163,104,255,252,163,104,255,252,163,104,255,252,166,105,255,252,167,106,255,252,167,106,255,252,168,106,255,252,170,108,255,252,170,108,255,252,170,108,255,252,170,108,255,252,173,110,255,252,173,110,255,252,173,110,255,252,173,110,255,252,175,112,255,252,176,112,255,252,176,112,255,252,176,112,255,252,178,113,255,252,179,114,255,252,179,114,255,252,179,114,255,252,181,115,255,252,182,116,255,252,182,116,255,252,183,116,255,252,186,118,255,252,186,118,255,252,186,118,255,252,186,118,255,252,189,120,255,252,189,120,255,252,189,120,255,252,189,120,255,252,191,121,255,252,192,122,255,252,192,122,255,252,192,122,255,252,194,123,255,252,195,124,255,252,195,124,255,252,195,124,255,252,197,125,255,252,198,126,255,252,198,126,255,238,187,120,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.copper = map ;
	 var map = undefined; 

	 /* processing hsv colormap */ 
	 var map = {}; 
	 map.name = "hsv" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 252,1,1,255,252,1,1,255,252,0,1,255,252,11,1,255,252,25,1,255,252,24,1,255,252,24,1,255,252,32,1,255,252,48,1,255,252,48,1,255,252,47,1,255,252,54,1,255,252,71,1,255,252,72,1,255,252,71,1,255,252,75,1,255,252,94,1,255,252,95,1,255,252,95,1,255,252,108,1,255,252,119,1,255,252,119,1,255,252,118,1,255,252,128,1,255,252,142,1,255,252,142,1,255,252,141,1,255,252,149,1,255,252,165,1,255,252,165,1,255,252,165,1,255,252,170,1,255,252,188,1,255,252,189,1,255,252,189,1,255,252,192,1,255,252,211,1,255,252,213,1,255,252,212,1,255,252,224,1,255,252,237,1,255,252,236,1,255,252,236,1,255,249,242,1,255,244,252,1,255,244,252,1,255,245,252,1,255,238,252,1,255,221,252,1,255,221,252,1,255,221,252,1,255,217,252,1,255,198,252,1,255,197,252,1,255,197,252,1,255,195,252,1,255,176,252,1,255,173,252,1,255,174,252,1,255,163,252,1,255,149,252,1,255,150,252,1,255,150,252,1,255,142,252,1,255,127,252,1,255,127,252,1,255,127,252,1,255,122,252,1,255,104,252,1,255,103,252,1,255,103,252,1,255,100,252,1,255,81,252,1,255,79,252,1,255,80,252,1,255,78,252,1,255,60,252,1,255,56,252,1,255,56,252,1,255,47,252,1,255,32,252,1,255,32,252,1,255,33,252,1,255,26,252,1,255,9,252,1,255,8,252,1,255,9,252,0,255,7,252,3,255,1,252,16,255,1,252,16,255,1,252,16,255,1,252,19,255,1,252,37,255,1,252,40,255,1,252,40,255,1,252,41,255,1,252,59,255,1,252,64,255,1,252,63,255,1,252,71,255,1,252,88,255,1,252,87,255,1,252,87,255,1,252,93,255,1,252,111,255,1,252,111,255,1,252,111,255,1,252,114,255,1,252,132,255,1,252,134,255,1,252,134,255,1,252,135,255,1,252,154,255,1,252,158,255,1,252,157,255,1,252,167,255,1,252,181,255,1,252,181,255,1,252,181,255,1,252,188,255,1,252,205,255,1,252,205,255,1,252,205,255,1,252,209,255,1,252,228,255,1,252,229,255,1,252,228,255,1,252,231,255,1,252,250,255,1,252,252,255,1,252,252,255,1,251,252,255,1,233,252,255,1,228,252,255,1,229,252,255,1,220,252,255,1,205,252,255,1,205,252,255,1,205,252,255,1,199,252,255,1,182,252,255,1,181,252,255,1,181,252,255,1,178,252,255,1,159,252,255,1,157,252,255,1,158,252,255,1,156,252,255,1,137,252,255,1,134,252,255,1,134,252,255,1,133,252,255,1,116,252,255,1,111,252,255,1,112,252,255,1,104,252,255,1,87,252,255,1,87,252,255,1,88,252,255,1,83,252,255,1,64,252,255,1,64,252,255,1,64,252,255,1,61,252,255,1,42,252,255,1,40,252,255,1,40,252,255,1,39,252,255,1,20,252,255,1,16,252,255,1,16,252,255,1,16,252,255,6,5,252,255,9,0,252,255,8,1,252,255,14,1,252,255,32,1,252,255,32,1,252,255,32,1,252,255,36,1,252,255,54,1,252,255,56,1,252,255,56,1,252,255,58,1,252,255,77,1,252,255,80,1,252,255,79,1,252,255,80,1,252,255,98,1,252,255,104,1,252,255,103,1,252,255,103,1,252,255,119,1,252,255,127,1,252,255,127,1,252,255,132,1,252,255,149,1,252,255,150,1,252,255,149,1,252,255,153,1,252,255,171,1,252,255,173,1,252,255,173,1,252,255,175,1,252,255,193,1,252,255,197,1,252,255,197,1,252,255,197,1,252,255,215,1,252,255,221,1,252,255,221,1,252,255,220,1,252,255,236,1,252,255,245,1,252,255,244,1,252,255,246,1,249,255,252,1,237,255,252,1,236,255,252,1,237,255,252,1,234,255,252,1,215,255,252,1,213,255,252,1,213,255,252,1,212,255,252,1,194,255,252,1,189,255,252,1,189,255,252,1,189,255,252,1,172,255,252,1,165,255,252,1,165,255,252,1,166,255,252,1,151,255,252,1,141,255,252,1,142,255,252,1,139,255,252,1,121,255,252,1,119,255,252,1,119,255,252,1,117,255,252,1,99,255,252,1,95,255,252,1,95,255,252,1,95,255,252,1,77,255,252,1,71,255,252,1,72,255,252,1,72,255,252,1,56,255,252,1,47,255,252,1,48,255,252,1,48,255,252,1,35,255,252,1,24,255,252,0,24,255,238,3,25,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.hsv = map ;
	 var map = undefined; 

	 /* processing pink colormap */ 
	 var map = {}; 
	 map.name = "pink" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 34,18,18,255,30,0,0,255,30,0,0,255,31,2,2,255,46,22,22,255,50,26,26,255,50,26,26,255,50,26,26,255,60,34,34,255,64,37,37,255,64,37,37,255,64,37,37,255,71,42,42,255,75,45,45,255,74,45,45,255,74,45,45,255,80,48,48,255,85,52,52,255,84,52,52,255,85,52,52,255,92,58,58,255,93,59,59,255,93,59,59,255,94,59,59,255,100,63,63,255,101,64,64,255,101,64,64,255,101,64,64,255,107,67,67,255,109,69,69,255,109,69,69,255,109,69,69,255,113,72,72,255,116,74,74,255,116,73,73,255,116,73,73,255,119,76,76,255,122,79,79,255,122,78,78,255,123,79,79,255,128,82,82,255,129,82,82,255,129,82,82,255,129,83,83,255,134,86,86,255,135,86,86,255,135,86,86,255,135,86,86,255,138,89,89,255,140,90,90,255,140,90,90,255,140,90,90,255,143,93,93,255,146,94,94,255,146,94,94,255,145,94,94,255,148,96,96,255,151,97,97,255,151,97,97,255,151,98,98,255,155,101,101,255,155,101,101,255,155,101,101,255,156,101,101,255,159,104,104,255,160,104,104,255,160,104,104,255,160,104,104,255,164,106,106,255,165,107,107,255,165,107,107,255,165,107,107,255,168,109,109,255,170,110,110,255,170,110,110,255,170,110,110,255,172,111,111,255,174,113,113,255,174,113,113,255,175,113,113,255,179,116,116,255,179,116,116,255,179,116,116,255,179,116,116,255,182,118,118,255,183,119,119,255,183,119,119,255,183,119,119,255,186,121,121,255,187,122,122,255,187,122,122,255,187,122,122,255,190,124,124,255,192,125,125,255,192,125,125,255,192,125,125,255,192,128,126,255,193,131,128,255,193,131,128,255,193,131,128,255,195,136,130,255,195,137,130,255,195,137,130,255,195,137,130,255,197,141,132,255,197,143,133,255,197,143,133,255,197,143,133,255,198,146,134,255,199,148,135,255,199,148,135,255,199,147,135,255,199,150,136,255,200,153,138,255,200,152,138,255,200,153,138,255,202,157,140,255,202,157,140,255,202,157,140,255,202,158,140,255,204,162,142,255,204,162,143,255,204,162,143,255,204,162,143,255,205,166,144,255,205,167,145,255,205,167,145,255,205,167,145,255,206,171,146,255,207,172,147,255,207,172,147,255,207,172,147,255,208,175,148,255,209,176,150,255,209,176,150,255,209,177,150,255,210,181,151,255,210,181,152,255,210,181,152,255,210,181,152,255,211,184,153,255,212,185,153,255,212,185,153,255,212,185,153,255,213,188,155,255,214,189,155,255,214,189,155,255,214,189,155,255,214,192,157,255,215,193,159,255,215,193,158,255,215,193,158,255,216,195,160,255,217,197,160,255,217,197,160,255,217,197,161,255,218,201,162,255,218,201,162,255,218,201,162,255,218,201,162,255,219,204,164,255,220,205,164,255,220,205,164,255,220,205,164,255,220,208,166,255,221,209,166,255,221,209,166,255,221,209,166,255,222,211,168,255,223,213,168,255,223,213,168,255,223,213,168,255,223,214,169,255,224,216,170,255,223,216,170,255,224,216,170,255,225,219,172,255,226,220,172,255,226,220,172,255,226,220,172,255,226,222,174,255,227,223,174,255,227,223,174,255,227,223,174,255,228,226,176,255,229,227,176,255,229,227,176,255,229,226,176,255,229,229,177,255,230,230,178,255,230,230,178,255,229,229,178,255,231,231,181,255,231,231,183,255,231,231,183,255,232,232,184,255,232,232,189,255,232,232,189,255,232,232,189,255,233,233,189,255,234,234,193,255,234,234,194,255,234,234,194,255,234,234,194,255,235,235,198,255,235,235,199,255,235,235,199,255,235,235,199,255,237,237,202,255,237,237,204,255,237,237,204,255,237,237,204,255,238,238,207,255,238,238,209,255,238,238,209,255,239,239,209,255,240,240,213,255,240,240,214,255,240,240,214,255,240,240,214,255,241,241,218,255,241,241,219,255,241,241,219,255,241,241,219,255,242,242,222,255,242,242,223,255,242,242,223,255,242,242,223,255,244,244,226,255,244,244,228,255,244,244,228,255,244,244,227,255,245,245,230,255,245,245,231,255,245,245,231,255,246,246,232,255,247,247,235,255,247,247,235,255,247,247,235,255,247,247,236,255,248,248,239,255,248,248,240,255,248,248,240,255,248,248,240,255,249,249,243,255,249,249,244,255,249,249,244,255,249,249,244,255,250,250,247,255,251,251,248,255,251,251,248,255,251,251,248,255,252,252,250,255,252,252,252,255,252,252,252,255,238,238,238,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.pink = map ;
	 var map = undefined; 

	 /* processing white colormap */ 
	 var map = {}; 
	 map.name = "white" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 73,73,73,255,212,212,212,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,208,208,208,255,210,210,210,255,200,200,200,255,62,62,62,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.white = map ;
	 var map = undefined; 

	 /* processing blue colormap */ 
	 var map = {}; 
	 map.name = "blue" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 0,0,0,255,0,0,1,255,0,0,2,255,0,0,3,255,0,0,4,255,0,0,5,255,0,0,6,255,0,0,7,255,0,0,8,255,0,0,9,255,0,0,10,255,0,0,11,255,0,0,12,255,0,0,13,255,0,0,14,255,0,0,15,255,0,0,16,255,0,0,17,255,0,0,18,255,0,0,19,255,0,0,20,255,0,0,21,255,0,0,22,255,0,0,23,255,0,0,24,255,0,0,25,255,0,0,26,255,0,0,27,255,0,0,28,255,0,0,29,255,0,0,30,255,0,0,31,255,0,0,32,255,0,0,33,255,0,0,34,255,0,0,35,255,0,0,36,255,0,0,37,255,0,0,38,255,0,0,39,255,0,0,40,255,0,0,41,255,0,0,42,255,0,0,43,255,0,0,44,255,0,0,45,255,0,0,46,255,0,0,47,255,0,0,48,255,0,0,49,255,0,0,50,255,0,0,51,255,0,0,52,255,0,0,53,255,0,0,54,255,0,0,55,255,0,0,56,255,0,0,57,255,0,0,58,255,0,0,59,255,0,0,60,255,0,0,61,255,0,0,62,255,0,0,63,255,0,0,64,255,0,0,65,255,0,0,66,255,0,0,67,255,0,0,68,255,0,0,69,255,0,0,70,255,0,0,71,255,0,0,72,255,0,0,73,255,0,0,74,255,0,0,75,255,0,0,76,255,0,0,77,255,0,0,78,255,0,0,79,255,0,0,80,255,0,0,81,255,0,0,82,255,0,0,83,255,0,0,84,255,0,0,85,255,0,0,86,255,0,0,87,255,0,0,88,255,0,0,89,255,0,0,90,255,0,0,91,255,0,0,92,255,0,0,93,255,0,0,94,255,0,0,95,255,0,0,96,255,0,0,97,255,0,0,98,255,0,0,99,255,0,0,100,255,0,0,101,255,0,0,102,255,0,0,103,255,0,0,104,255,0,0,105,255,0,0,106,255,0,0,107,255,0,0,108,255,0,0,109,255,0,0,110,255,0,0,111,255,0,0,112,255,0,0,113,255,0,0,114,255,0,0,115,255,0,0,116,255,0,0,117,255,0,0,118,255,0,0,119,255,0,0,120,255,0,0,121,255,0,0,122,255,0,0,123,255,0,0,124,255,0,0,125,255,0,0,126,255,0,0,127,255,0,0,128,255,0,0,129,255,0,0,130,255,0,0,131,255,0,0,132,255,0,0,133,255,0,0,134,255,0,0,135,255,0,0,136,255,0,0,137,255,0,0,138,255,0,0,139,255,0,0,140,255,0,0,141,255,0,0,142,255,0,0,143,255,0,0,144,255,0,0,145,255,0,0,146,255,0,0,147,255,0,0,148,255,0,0,149,255,0,0,150,255,0,0,151,255,0,0,152,255,0,0,153,255,0,0,154,255,0,0,155,255,0,0,156,255,0,0,157,255,0,0,158,255,0,0,159,255,0,0,160,255,0,0,161,255,0,0,162,255,0,0,163,255,0,0,164,255,0,0,165,255,0,0,166,255,0,0,167,255,0,0,168,255,0,0,169,255,0,0,170,255,0,0,171,255,0,0,172,255,0,0,173,255,0,0,174,255,0,0,175,255,0,0,176,255,0,0,177,255,0,0,178,255,0,0,179,255,0,0,180,255,0,0,181,255,0,0,182,255,0,0,183,255,0,0,184,255,0,0,185,255,0,0,186,255,0,0,187,255,0,0,188,255,0,0,189,255,0,0,190,255,0,0,191,255,0,0,192,255,0,0,193,255,0,0,194,255,0,0,195,255,0,0,196,255,0,0,197,255,0,0,198,255,0,0,199,255,0,0,200,255,0,0,201,255,0,0,202,255,0,0,203,255,0,0,204,255,0,0,205,255,0,0,206,255,0,0,207,255,0,0,208,255,0,0,209,255,0,0,210,255,0,0,211,255,0,0,212,255,0,0,213,255,0,0,214,255,0,0,215,255,0,0,216,255,0,0,217,255,0,0,218,255,0,0,219,255,0,0,220,255,0,0,221,255,0,0,222,255,0,0,223,255,0,0,224,255,0,0,225,255,0,0,226,255,0,0,227,255,0,0,228,255,0,0,229,255,0,0,230,255,0,0,231,255,0,0,232,255,0,0,233,255,0,0,234,255,0,0,235,255,0,0,236,255,0,0,237,255,0,0,238,255,0,0,239,255,0,0,240,255,0,0,241,255,0,0,242,255,0,0,243,255,0,0,244,255,0,0,245,255,0,0,246,255,0,0,247,255,0,0,248,255,0,0,249,255,0,0,250,255,0,0,251,255,0,0,252,255,0,0,253,255,0,0,254,255,0,0,255,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.blue = map ;
	 var map = undefined; 

	 /* processing flag colormap */ 
	 var map = {}; 
	 map.name = "flag" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 252,2,1,255,252,2,1,255,252,1,0,255,252,118,117,255,252,255,255,255,252,253,252,255,255,255,252,255,166,167,252,255,0,1,252,255,1,2,252,255,1,2,255,255,1,2,192,255,1,2,5,255,1,2,1,255,0,2,1,255,38,2,1,255,236,2,1,255,253,2,1,255,252,1,0,255,252,136,135,255,252,255,255,255,252,253,252,255,255,255,252,255,149,150,252,255,0,1,252,255,1,2,252,255,1,2,255,255,1,2,178,255,1,2,1,255,1,2,1,255,0,2,1,255,50,2,1,255,244,2,1,255,252,2,1,255,252,1,0,255,252,30,29,255,252,230,229,255,252,255,254,255,255,255,252,255,131,132,252,255,0,1,252,255,1,2,252,255,1,2,255,255,1,2,162,255,1,2,0,255,1,2,1,255,0,2,1,255,64,2,1,255,249,2,1,255,252,2,1,255,252,1,0,255,252,42,41,255,252,239,238,255,252,254,253,255,253,254,252,255,231,232,252,255,32,33,252,255,0,1,252,255,1,2,255,255,1,2,145,255,1,2,0,255,1,2,1,255,0,2,1,255,79,2,1,255,253,2,1,255,252,2,1,255,252,1,0,255,252,55,54,255,252,246,245,255,252,253,252,255,254,255,252,255,221,222,252,255,21,22,252,255,0,1,252,255,1,2,253,255,1,2,238,255,1,2,41,255,1,2,0,255,0,2,1,255,95,2,1,255,255,2,1,255,252,2,1,255,252,1,0,255,252,69,68,255,252,251,250,255,252,253,252,255,255,255,252,255,209,210,252,255,13,14,252,255,0,1,252,255,1,2,254,255,1,2,229,255,1,2,29,255,1,2,0,255,0,2,1,255,9,2,1,255,202,2,1,255,255,2,1,255,252,1,0,255,252,84,83,255,252,255,254,255,252,253,252,255,255,255,252,255,196,197,252,255,6,7,252,255,0,1,252,255,1,2,255,255,1,2,218,255,1,2,19,255,1,2,0,255,0,2,1,255,17,2,1,255,215,2,1,255,255,2,1,255,252,1,0,255,252,100,99,255,252,255,255,255,252,253,252,255,255,255,252,255,181,182,252,255,1,2,252,255,1,2,252,255,1,2,255,255,1,2,206,255,1,2,11,255,1,2,0,255,0,2,1,255,27,2,1,255,226,2,1,255,254,2,1,255,252,1,0,255,252,12,11,255,252,207,206,255,252,255,255,255,255,255,252,255,166,167,252,255,0,1,252,255,1,2,252,255,1,2,255,255,1,2,192,255,1,2,5,255,1,2,1,255,0,2,1,255,38,2,1,255,236,2,1,255,253,2,1,255,252,1,0,255,252,20,19,255,252,219,218,255,252,255,255,255,252,253,252,255,247,248,252,255,57,58,252,255,0,1,252,255,1,2,255,255,1,2,178,255,1,2,1,255,1,2,1,255,0,2,1,255,50,2,1,255,244,2,1,255,252,2,1,255,252,1,0,255,252,30,29,255,252,230,229,255,252,255,254,255,253,254,252,255,240,241,252,255,44,45,252,255,0,1,252,255,1,2,252,255,1,2,250,255,1,2,68,255,1,2,0,255,0,2,1,255,64,2,1,255,249,2,1,255,252,2,1,255,252,1,0,255,252,42,41,255,252,239,238,255,252,254,253,255,253,254,252,255,231,232,252,255,32,33,252,255,0,1,252,255,1,2,252,255,1,2,245,255,1,2,54,255,1,2,0,255,1,2,1,255,0,2,1,255,174,2,1,255,255,2,1,255,252,1,0,255,252,55,54,255,252,246,245,255,252,253,252,255,254,255,252,255,221,222,252,255,21,22,252,255,0,1,252,255,1,2,253,255,1,2,238,255,1,2,41,255,1,2,0,255,1,2,1,255,3,2,1,255,189,2,1,255,255,2,1,255,252,2,1,255,252,1,0,255,252,163,162,255,252,255,255,255,255,255,252,255,209,210,252,255,13,14,252,255,0,1,252,255,1,2,254,255,1,2,229,255,1,2,29,255,1,2,0,255,0,2,1,255,9,2,1,255,202,2,1,255,255,2,1,255,252,2,1,255,252,2,1,255,252,179,178,255,252,255,255,255,252,253,252,255,255,255,252,255,103,104,252,255,0,1,252,255,1,2,255,255,1,2,218,255,1,2,19,255,1,2,0,255,0,2,1,255,17,2,1,255,215,2,1,255,255,2,1,255,252,2,1,255,252,6,5,255,252,193,192,255,252,255,255,255,252,253,252,255,254,255,252,255,87,88,252,255,0,1,252,255,1,2,252,255,1,2,255,255,1,2,117,255,1,2,0,255,0,1,0,255,3,4,3,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.flag = map ;
	 var map = undefined; 

	 /* processing jet colormap */ 
	 var map = {}; 
	 map.name = "jet" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 1,1,142,255,1,1,142,255,1,1,141,255,1,1,149,255,1,1,158,255,1,1,157,255,1,1,157,255,1,1,163,255,1,1,173,255,1,1,173,255,1,1,173,255,1,1,177,255,1,1,189,255,1,1,189,255,1,1,189,255,1,1,191,255,1,1,204,255,1,1,205,255,1,1,205,255,1,1,213,255,1,1,221,255,1,1,221,255,1,1,220,255,1,1,227,255,1,1,237,255,1,1,236,255,1,1,236,255,1,1,241,255,1,1,252,255,1,1,252,255,1,0,252,255,1,4,252,255,1,16,252,255,1,16,252,255,1,16,252,255,1,18,252,255,1,31,252,255,1,32,252,255,1,32,252,255,1,40,252,255,1,48,252,255,1,48,252,255,1,48,252,255,1,54,252,255,1,64,252,255,1,64,252,255,1,63,252,255,1,68,252,255,1,79,252,255,1,79,252,255,1,79,252,255,1,82,252,255,1,94,252,255,1,95,252,255,1,95,252,255,1,97,252,255,1,109,252,255,1,111,252,255,1,111,252,255,1,118,252,255,1,127,252,255,1,127,252,255,1,127,252,255,1,131,252,255,1,142,252,255,1,142,252,255,1,141,252,255,1,145,252,255,1,157,252,255,1,157,252,255,1,157,252,255,1,159,252,255,1,172,252,255,1,173,252,255,1,173,252,255,1,174,252,255,1,186,252,255,1,189,252,255,1,189,252,255,1,195,252,255,1,205,252,255,1,205,252,255,1,205,252,255,1,209,252,255,1,220,252,255,1,221,252,255,1,220,252,255,1,223,252,255,1,236,252,255,1,236,252,255,1,236,252,255,1,238,252,255,1,250,252,255,1,252,252,255,1,252,252,255,1,252,252,255,13,252,240,255,17,252,236,255,16,252,237,255,21,252,231,255,32,252,221,255,32,252,221,255,32,252,221,255,36,252,217,255,48,252,205,255,48,252,205,255,48,252,205,255,50,252,203,255,63,252,190,255,64,252,189,255,64,252,189,255,65,252,188,255,77,252,176,255,80,252,173,255,79,252,174,255,86,252,167,255,95,252,157,255,95,252,157,255,95,252,158,255,100,252,153,255,111,252,142,255,111,252,142,255,111,252,142,255,114,252,139,255,126,252,127,255,127,252,127,255,127,252,127,255,128,252,125,255,140,252,113,255,142,252,111,255,142,252,111,255,142,252,110,255,155,252,98,255,158,252,95,255,157,252,96,255,163,252,90,255,173,252,79,255,173,252,79,255,173,252,80,255,177,252,76,255,189,252,64,255,189,252,64,255,189,252,64,255,191,252,61,255,204,252,49,255,205,252,48,255,205,252,48,255,206,252,47,255,218,252,34,255,221,252,32,255,221,252,32,255,221,252,32,255,233,252,20,255,237,252,16,255,236,252,17,255,241,252,12,255,252,252,1,255,252,252,1,255,252,252,1,255,252,249,1,255,252,237,1,255,252,236,1,255,252,237,1,255,252,235,1,255,252,222,1,255,252,221,1,255,252,221,1,255,252,220,1,255,252,208,1,255,252,205,1,255,252,205,1,255,252,205,1,255,252,193,1,255,252,189,1,255,252,189,1,255,252,185,1,255,252,173,1,255,252,173,1,255,252,173,1,255,252,171,1,255,252,158,1,255,252,157,1,255,252,158,1,255,252,156,1,255,252,144,1,255,252,142,1,255,252,142,1,255,252,141,1,255,252,130,1,255,252,127,1,255,252,127,1,255,252,127,1,255,252,116,1,255,252,111,1,255,252,111,1,255,252,108,1,255,252,96,1,255,252,95,1,255,252,95,1,255,252,93,1,255,252,81,1,255,252,79,1,255,252,80,1,255,252,79,1,255,252,66,1,255,252,64,1,255,252,64,1,255,252,64,1,255,252,52,1,255,252,48,1,255,252,48,1,255,252,48,1,255,252,38,1,255,252,32,1,255,252,32,1,255,252,29,1,255,252,17,1,255,252,16,1,255,252,16,1,255,252,15,1,255,252,2,1,255,252,0,1,255,252,1,1,255,252,1,1,255,240,1,1,255,236,1,1,255,236,1,1,255,236,1,1,255,225,1,1,255,220,1,1,255,221,1,1,255,221,1,1,255,211,1,1,255,204,1,1,255,205,1,1,255,203,1,1,255,190,1,1,255,189,1,1,255,189,1,1,255,188,1,1,255,176,1,1,255,173,1,1,255,173,1,1,255,173,1,1,255,161,1,1,255,157,1,1,255,157,1,1,255,158,1,1,255,147,1,1,255,141,1,1,255,142,1,1,255,142,1,1,255,134,1,1,255,127,1,1,255,127,0,0,255,121,3,3,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.jet = map ;
	 var map = undefined; 

	 /* processing prism colormap */ 
	 var map = {}; 
	 map.name = "prism" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 252,1,1,255,252,1,1,255,252,0,1,255,252,59,1,255,252,129,1,255,252,127,1,255,252,124,1,255,252,170,1,255,252,253,1,255,252,252,1,255,255,252,1,255,192,252,1,255,5,252,1,255,1,252,1,255,1,255,0,255,1,215,38,255,1,17,236,255,1,0,253,255,0,1,252,255,90,1,252,255,172,1,252,255,168,1,252,255,166,1,255,255,203,1,149,255,253,1,0,255,252,1,1,255,252,0,1,255,252,38,1,255,252,127,1,255,252,127,1,255,252,125,1,255,252,152,1,255,252,248,1,255,252,252,1,255,254,252,1,255,223,252,1,255,24,252,1,255,0,252,1,255,1,255,0,255,1,131,121,255,1,0,255,255,1,1,252,255,0,1,252,255,61,1,252,255,170,1,252,255,168,1,252,255,167,1,255,255,189,1,189,255,251,1,3,255,252,1,1,255,252,0,1,255,252,21,1,255,252,120,1,255,252,127,1,255,252,126,1,255,252,137,1,255,252,236,1,255,252,253,1,255,255,252,1,255,145,252,1,255,0,252,1,255,1,252,1,255,1,255,0,255,1,174,79,255,1,0,253,255,1,1,252,255,0,1,252,255,36,1,252,255,164,1,252,255,168,1,252,255,168,1,254,255,179,1,221,255,245,1,21,255,253,1,0,255,252,0,1,255,252,8,1,255,252,107,1,255,252,128,1,255,252,124,1,255,252,174,1,255,252,254,1,255,252,252,1,255,255,252,1,255,185,252,1,255,2,252,1,255,1,252,1,255,1,255,0,255,1,209,44,255,1,13,240,255,1,0,253,255,0,1,252,255,16,1,252,255,149,1,252,255,169,1,252,255,168,1,252,255,171,1,244,255,236,1,50,255,253,1,0,255,252,0,1,255,252,42,1,255,252,128,1,255,252,127,1,255,252,125,1,255,252,155,1,255,252,250,1,255,252,252,1,255,255,252,1,255,218,252,1,255,19,252,1,255,0,252,1,255,1,253,0,255,1,236,17,255,1,38,215,255,1,0,255,255,0,1,252,255,66,1,252,255,170,1,252,255,168,1,252,255,167,1,255,255,192,1,181,255,252,1,1,255,252,1,1,255,252,0,1,255,252,24,1,255,252,122,1,255,252,127,1,255,252,126,1,255,252,140,1,255,252,239,1,255,252,253,1,255,252,252,1,255,242,252,1,255,47,252,1,255,0,252,1,255,1,255,0,255,1,166,87,255,1,0,254,255,1,1,252,255,0,1,252,255,40,1,252,255,166,1,252,255,168,1,252,255,167,1,255,255,181,1,215,255,247,1,17,255,252,1,0,255,252,0,1,255,252,10,1,255,252,110,1,255,252,128,1,255,252,127,1,255,252,130,1,255,252,224,1,255,252,254,1,255,255,252,1,255,178,252,1,255,1,252,1,255,1,252,1,255,1,255,0,255,1,202,50,255,1,9,244,255,1,0,252,255,0,1,252,255,20,1,252,255,153,1,252,255,169,1,252,255,168,1,253,255,172,1,240,255,238,1,44,255,253,1,0,255,252,1,1,255,252,1,1,255,252,93,1,255,252,129,1,255,252,125,1,255,252,158,1,255,252,251,1,255,252,252,1,255,255,252,1,255,212,252,1,255,15,252,1,255,0,252,1,255,1,253,0,255,1,231,21,255,1,32,221,255,1,0,254,255,0,1,252,255,5,1,252,255,133,1,252,255,171,1,252,255,168,1,252,255,168,1,253,255,226,1,79,255,254,1,0,255,252,0,1,255,252,27,1,255,252,123,1,255,252,127,1,255,252,126,1,255,252,143,1,255,252,242,1,255,252,253,1,255,253,252,1,255,238,252,1,255,41,252,1,255,0,252,1,255,1,252,1,255,1,249,3,255,1,64,189,255,1,0,255,255,1,1,252,255,0,1,252,255,108,1,252,255,172,1,252,255,167,1,255,255,183,1,209,255,248,1,13,255,252,1,0,255,252,0,1,255,252,12,1,255,252,112,1,255,252,128,1,255,252,127,1,255,252,131,1,255,252,227,1,255,252,254,1,255,252,252,1,255,252,252,1,255,75,252,1,255,0,252,1,255,1,252,1,255,1,255,0,255,1,103,149,255,1,0,255,255,0,1,252,255,23,1,252,255,156,1,252,255,169,1,252,255,168,1,253,255,174,1,236,255,240,1,38,255,253,1,0,255,252,1,1,255,252,3,1,255,252,97,1,255,252,129,1,255,252,127,1,255,252,126,1,255,252,209,1,255,252,255,1,255,252,252,1,255,255,252,1,255,117,252,1,255,0,252,1,255,0,252,0,255,3,238,3,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.prism = map ;
	 var map = undefined; 

	 /* processing winter colormap */ 
	 var map = {}; 
	 map.name = "winter" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 1,1,252,255,1,1,252,255,1,0,252,255,1,2,251,255,1,4,250,255,1,4,250,255,1,4,250,255,1,6,250,255,1,8,248,255,1,8,248,255,1,8,248,255,1,9,248,255,1,12,246,255,1,12,246,255,1,12,246,255,1,13,246,255,1,16,244,255,1,16,244,255,1,16,244,255,1,18,243,255,1,20,242,255,1,20,242,255,1,20,242,255,1,22,241,255,1,24,240,255,1,24,240,255,1,24,240,255,1,25,240,255,1,28,238,255,1,28,238,255,1,28,238,255,1,29,238,255,1,32,236,255,1,32,236,255,1,32,236,255,1,33,236,255,1,36,235,255,1,36,234,255,1,36,234,255,1,38,233,255,1,40,232,255,1,40,232,255,1,40,232,255,1,42,232,255,1,45,230,255,1,45,231,255,1,45,231,255,1,46,230,255,1,49,229,255,1,49,229,255,1,49,229,255,1,50,228,255,1,53,227,255,1,53,227,255,1,53,227,255,1,53,226,255,1,56,225,255,1,57,224,255,1,57,225,255,1,58,224,255,1,61,223,255,1,61,223,255,1,61,223,255,1,62,222,255,1,65,221,255,1,65,221,255,1,65,221,255,1,66,220,255,1,68,219,255,1,69,219,255,1,69,219,255,1,69,218,255,1,72,217,255,1,73,217,255,1,73,217,255,1,73,217,255,1,76,215,255,1,77,215,255,1,76,215,255,1,78,214,255,1,81,213,255,1,80,213,255,1,80,213,255,1,82,212,255,1,84,211,255,1,84,211,255,1,84,211,255,1,85,210,255,1,88,208,255,1,88,208,255,1,88,208,255,1,89,208,255,1,92,206,255,1,92,206,255,1,92,206,255,1,92,206,255,1,95,204,255,1,96,204,255,1,96,204,255,1,98,203,255,1,100,202,255,1,100,202,255,1,100,202,255,1,101,201,255,1,104,200,255,1,104,200,255,1,104,200,255,1,105,200,255,1,108,198,255,1,108,198,255,1,108,198,255,1,108,198,255,1,111,196,255,1,112,196,255,1,112,196,255,1,114,195,255,1,116,194,255,1,116,194,255,1,116,194,255,1,117,193,255,1,120,192,255,1,120,192,255,1,120,192,255,1,121,192,255,1,124,190,255,1,124,190,255,1,124,190,255,1,124,190,255,1,128,188,255,1,129,188,255,1,129,188,255,1,129,188,255,1,132,186,255,1,133,186,255,1,133,186,255,1,134,185,255,1,137,184,255,1,137,184,255,1,137,184,255,1,138,184,255,1,141,182,255,1,141,182,255,1,141,182,255,1,141,182,255,1,144,180,255,1,145,180,255,1,145,180,255,1,145,180,255,1,148,178,255,1,149,178,255,1,149,178,255,1,149,178,255,1,152,177,255,1,153,176,255,1,152,176,255,1,154,176,255,1,156,174,255,1,156,174,255,1,156,174,255,1,157,174,255,1,160,172,255,1,160,172,255,1,160,172,255,1,161,172,255,1,164,170,255,1,164,170,255,1,164,170,255,1,165,170,255,1,168,169,255,1,168,168,255,1,168,168,255,1,168,168,255,1,171,167,255,1,172,166,255,1,172,166,255,1,173,166,255,1,176,164,255,1,176,164,255,1,176,164,255,1,177,164,255,1,180,162,255,1,180,162,255,1,180,162,255,1,180,162,255,1,184,161,255,1,184,160,255,1,184,160,255,1,184,160,255,1,187,159,255,1,188,158,255,1,188,158,255,1,188,158,255,1,191,157,255,1,192,156,255,1,192,156,255,1,193,156,255,1,196,154,255,1,196,154,255,1,196,154,255,1,196,154,255,1,199,153,255,1,200,152,255,1,200,152,255,1,200,152,255,1,203,151,255,1,204,151,255,1,204,151,255,1,204,151,255,1,207,149,255,1,208,149,255,1,208,149,255,1,208,149,255,1,211,147,255,1,213,147,255,1,213,147,255,1,213,146,255,1,216,145,255,1,217,145,255,1,217,145,255,1,217,144,255,1,220,143,255,1,221,143,255,1,221,143,255,1,221,143,255,1,224,141,255,1,225,141,255,1,225,141,255,1,225,141,255,1,227,139,255,1,229,139,255,1,229,139,255,1,228,139,255,1,231,137,255,1,232,137,255,1,232,137,255,1,233,136,255,1,236,135,255,1,236,135,255,1,236,135,255,1,237,135,255,1,240,133,255,1,240,133,255,1,240,133,255,1,240,133,255,1,243,131,255,1,244,131,255,1,244,131,255,1,244,131,255,1,247,129,255,1,248,129,255,1,248,129,255,1,248,129,255,1,250,128,255,1,252,127,255,0,252,127,255,3,238,121,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.winter = map ;
	 var map = undefined; 

	 /* processing bone colormap */ 
	 var map = {}; 
	 map.name = "bone" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 18,19,18,255,0,1,1,255,1,2,2,255,1,2,2,255,4,5,6,255,4,5,6,255,4,5,6,255,4,5,6,255,7,8,10,255,7,8,11,255,7,8,11,255,7,8,11,255,10,11,14,255,11,12,16,255,11,12,16,255,11,12,16,255,13,14,19,255,14,15,21,255,14,15,21,255,15,16,22,255,18,19,26,255,18,19,26,255,18,19,26,255,18,19,26,255,21,22,30,255,21,22,31,255,21,22,31,255,21,22,31,255,24,25,34,255,25,26,35,255,25,26,35,255,25,26,35,255,27,28,38,255,28,29,40,255,28,29,40,255,28,29,40,255,30,31,43,255,32,33,45,255,32,33,45,255,32,33,45,255,35,36,49,255,35,36,50,255,35,36,50,255,35,36,50,255,38,39,54,255,39,40,55,255,39,40,55,255,39,40,55,255,42,43,58,255,43,44,60,255,43,44,60,255,43,44,60,255,45,46,63,255,46,47,65,255,46,47,65,255,46,47,65,255,48,49,67,255,50,51,70,255,50,51,70,255,50,51,70,255,52,53,73,255,53,54,74,255,53,54,73,255,53,54,74,255,56,57,77,255,57,58,79,255,57,58,78,255,57,58,78,255,59,60,82,255,60,61,83,255,60,61,83,255,60,61,83,255,62,63,86,255,64,65,88,255,64,65,88,255,64,65,88,255,65,66,91,255,67,68,93,255,67,68,93,255,67,68,94,255,70,71,98,255,71,72,98,255,71,72,98,255,71,72,98,255,73,74,102,255,74,75,103,255,73,74,103,255,73,74,103,255,76,77,106,255,78,79,107,255,77,78,107,255,77,78,107,255,79,80,110,255,81,82,112,255,80,81,112,255,80,81,112,255,82,84,114,255,84,86,116,255,84,86,116,255,85,87,116,255,88,91,119,255,88,91,119,255,88,91,119,255,88,91,119,255,91,95,122,255,91,96,123,255,91,96,123,255,91,96,123,255,94,100,126,255,95,101,127,255,95,101,127,255,95,101,127,255,97,104,129,255,98,106,130,255,98,106,130,255,99,107,130,255,102,111,133,255,102,111,134,255,102,111,134,255,102,111,134,255,105,115,136,255,105,116,137,255,105,116,137,255,105,116,137,255,108,119,140,255,109,120,141,255,109,120,141,255,109,120,141,255,111,123,143,255,112,125,144,255,112,125,144,255,112,125,144,255,114,128,146,255,116,130,148,255,116,130,148,255,116,130,148,255,119,134,150,255,119,135,151,255,119,135,151,255,119,135,151,255,122,139,154,255,123,140,154,255,123,140,154,255,123,140,155,255,126,144,157,255,127,145,157,255,127,145,157,255,127,145,157,255,129,148,160,255,130,150,161,255,130,150,161,255,130,149,161,255,132,152,163,255,134,155,164,255,134,154,164,255,134,155,165,255,136,158,168,255,137,158,168,255,137,158,168,255,137,159,168,255,140,163,172,255,141,163,172,255,141,163,172,255,141,163,172,255,143,167,175,255,144,168,175,255,144,168,175,255,144,168,175,255,146,172,178,255,148,173,179,255,148,173,179,255,147,173,179,255,149,176,181,255,151,178,182,255,151,178,182,255,151,179,183,255,154,183,186,255,154,183,186,255,154,183,186,255,155,183,186,255,157,187,189,255,157,188,189,255,157,188,189,255,158,188,189,255,160,191,192,255,161,192,193,255,161,192,193,255,161,192,193,255,163,195,195,255,164,197,196,255,164,197,196,255,164,197,196,255,168,199,198,255,170,201,200,255,170,201,200,255,171,201,200,255,176,204,203,255,176,204,203,255,176,204,203,255,176,204,203,255,180,207,206,255,181,208,207,255,181,208,207,255,181,208,207,255,186,211,210,255,187,212,211,255,187,212,211,255,187,212,211,255,190,214,213,255,192,215,214,255,192,215,214,255,192,215,214,255,195,217,216,255,198,219,218,255,198,219,218,255,198,219,218,255,202,221,220,255,203,222,221,255,203,222,221,255,203,222,221,255,208,225,224,255,209,226,225,255,209,226,225,255,209,226,225,255,212,228,227,255,214,229,228,255,214,229,228,255,214,228,227,255,218,231,230,255,220,232,231,255,220,232,231,255,220,232,231,255,222,234,233,255,225,235,234,255,224,235,234,255,225,236,235,255,230,239,238,255,231,239,238,255,231,239,238,255,231,240,239,255,235,242,241,255,235,242,241,255,235,242,241,255,235,242,241,255,240,245,244,255,241,246,245,255,241,246,245,255,241,246,245,255,245,248,247,255,246,249,248,255,246,249,248,255,246,249,248,255,249,251,250,255,252,253,252,255,252,253,252,255,238,239,238,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.bone = map ;
	 var map = undefined; 

	 /* processing gray colormap */ 
	 var map = {}; 
	 map.name = "gray" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 2,2,2,255,0,0,0,255,0,0,0,255,0,0,0,255,0,0,0,255,0,0,0,255,0,0,0,255,0,0,0,255,1,1,1,255,1,1,1,255,1,1,1,255,1,1,1,255,1,1,1,255,1,1,1,255,1,1,1,255,1,1,1,255,1,1,1,255,1,1,1,255,1,1,1,255,1,1,1,255,2,2,2,255,2,2,2,255,2,2,2,255,2,2,2,255,2,2,2,255,2,2,2,255,2,2,2,255,2,2,2,255,3,3,3,255,3,3,3,255,3,3,3,255,3,3,3,255,3,3,3,255,4,4,4,255,4,4,4,255,4,4,4,255,4,4,4,255,4,4,4,255,4,4,4,255,4,4,4,255,5,5,5,255,5,5,5,255,5,5,5,255,5,5,5,255,6,6,6,255,7,7,7,255,7,7,7,255,7,7,7,255,8,8,8,255,8,8,8,255,8,8,8,255,8,8,8,255,8,8,8,255,9,9,9,255,9,9,9,255,9,9,9,255,10,10,10,255,10,10,10,255,10,10,10,255,10,10,10,255,12,12,12,255,12,12,12,255,12,12,12,255,12,12,12,255,13,13,13,255,13,13,13,255,13,13,13,255,13,13,13,255,14,14,14,255,15,15,15,255,15,15,15,255,15,15,15,255,16,16,16,255,17,17,17,255,17,17,17,255,17,17,17,255,18,18,18,255,19,19,19,255,18,18,18,255,19,19,19,255,20,20,20,255,21,21,21,255,20,20,20,255,21,21,21,255,23,23,23,255,23,23,23,255,23,23,23,255,23,23,23,255,24,24,24,255,25,25,25,255,25,25,25,255,25,25,25,255,27,27,27,255,27,27,27,255,27,27,27,255,27,27,27,255,29,29,29,255,30,30,30,255,30,30,30,255,30,30,30,255,32,32,32,255,32,32,32,255,32,32,32,255,32,32,32,255,35,35,35,255,35,35,35,255,35,35,35,255,35,35,35,255,37,37,37,255,38,38,38,255,38,38,38,255,38,38,38,255,40,40,40,255,41,41,41,255,41,41,41,255,42,42,42,255,45,45,45,255,45,45,45,255,45,45,45,255,45,45,45,255,47,47,47,255,48,48,48,255,48,48,48,255,48,48,48,255,51,51,51,255,51,51,51,255,51,51,51,255,51,51,51,255,54,54,54,255,56,56,56,255,56,56,56,255,56,56,56,255,58,58,58,255,60,60,60,255,60,60,60,255,60,60,60,255,63,63,63,255,64,64,64,255,64,64,64,255,64,64,64,255,67,67,67,255,68,68,68,255,68,68,68,255,68,68,68,255,71,71,71,255,72,72,72,255,72,72,72,255,72,72,72,255,74,74,74,255,77,77,77,255,77,77,77,255,76,76,76,255,79,79,79,255,81,81,81,255,80,80,80,255,81,81,81,255,85,85,85,255,85,85,85,255,85,85,85,255,86,86,86,255,90,90,90,255,90,90,90,255,90,90,90,255,90,90,90,255,93,93,93,255,95,95,95,255,95,95,95,255,95,95,95,255,99,99,99,255,100,100,100,255,100,100,100,255,100,100,100,255,104,104,104,255,105,105,105,255,105,105,105,255,107,107,107,255,111,111,111,255,111,111,111,255,111,111,111,255,111,111,111,255,116,116,116,255,116,116,116,255,116,116,116,255,116,116,116,255,121,121,121,255,122,122,122,255,122,122,122,255,122,122,122,255,127,127,127,255,128,128,128,255,128,128,128,255,128,128,128,255,131,131,131,255,134,134,134,255,134,134,134,255,134,134,134,255,141,141,141,255,141,141,141,255,141,141,141,255,141,141,141,255,146,146,146,255,147,147,147,255,147,147,147,255,147,147,147,255,152,152,152,255,154,154,154,255,154,154,154,255,154,154,154,255,157,157,157,255,161,161,161,255,161,161,161,255,161,161,161,255,164,164,164,255,170,170,170,255,170,170,170,255,170,170,170,255,175,175,175,255,177,177,177,255,177,177,177,255,177,177,177,255,183,183,183,255,184,184,184,255,184,184,184,255,184,184,184,255,190,190,190,255,192,192,192,255,192,192,192,255,190,190,190,255,196,196,196,255,200,200,200,255,200,200,200,255,198,198,198,255,204,204,204,255,206,206,206,255,206,206,206,255,208,208,208,255,214,214,214,255,214,214,214,255,214,214,214,255,216,216,216,255,222,222,222,255,222,222,222,255,222,222,222,255,222,222,222,255,229,229,229,255,231,231,231,255,231,231,231,255,231,231,231,255,237,237,237,255,239,239,239,255,239,239,239,255,239,239,239,255,244,244,244,255,248,248,248,255,248,248,248,255,218,218,218,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.gray = map ;
	 var map = undefined; 

	 /* processing jet_white colormap */ 
	 var map = {}; 
	 map.name = "jet_white" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 1,1,142,255,1,1,142,255,1,1,141,255,1,1,149,255,1,1,158,255,1,1,157,255,1,1,157,255,1,1,163,255,1,1,173,255,1,1,173,255,1,1,173,255,1,1,177,255,1,1,189,255,1,1,189,255,1,1,189,255,1,1,191,255,1,1,204,255,1,1,205,255,1,1,205,255,1,1,213,255,1,1,221,255,1,1,221,255,1,1,220,255,1,1,227,255,1,1,237,255,1,1,236,255,1,1,236,255,1,1,241,255,1,1,252,255,1,1,252,255,1,0,252,255,1,4,252,255,1,16,252,255,1,16,252,255,1,16,252,255,1,18,252,255,1,31,252,255,1,32,252,255,1,32,252,255,1,40,252,255,1,48,252,255,1,48,252,255,1,48,252,255,1,54,252,255,1,64,252,255,1,64,252,255,1,63,252,255,1,68,252,255,1,79,252,255,1,79,252,255,1,79,252,255,1,82,252,255,1,94,252,255,1,95,252,255,1,95,252,255,1,97,252,255,1,109,252,255,1,111,252,255,1,111,252,255,1,118,252,255,1,127,252,255,1,127,252,255,1,127,252,255,1,131,252,255,1,142,252,255,1,142,252,255,1,141,252,255,1,145,252,255,1,157,252,255,1,157,252,255,1,157,252,255,1,159,252,255,1,172,252,255,1,173,252,255,1,173,252,255,1,174,252,255,1,186,252,255,1,189,252,255,1,189,252,255,1,195,252,255,1,205,252,255,1,205,252,255,1,205,252,255,1,209,252,255,1,220,252,255,1,221,252,255,1,220,252,255,1,223,252,255,1,236,252,255,1,236,252,255,1,236,252,255,1,238,252,255,1,250,252,255,1,252,252,255,1,252,252,255,1,252,252,255,13,252,240,255,17,252,236,255,16,252,237,255,21,252,231,255,32,252,221,255,32,252,221,255,32,252,221,255,36,252,217,255,48,252,205,255,48,252,205,255,48,252,205,255,50,252,203,255,63,252,190,255,64,252,189,255,64,252,189,255,65,252,188,255,77,252,176,255,80,252,173,255,79,252,174,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,205,252,48,255,205,252,48,255,206,252,47,255,218,252,34,255,221,252,32,255,221,252,32,255,221,252,32,255,233,252,20,255,237,252,16,255,236,252,17,255,241,252,12,255,252,252,1,255,252,252,1,255,252,252,1,255,252,249,1,255,252,237,1,255,252,236,1,255,252,237,1,255,252,235,1,255,252,222,1,255,252,221,1,255,252,221,1,255,252,220,1,255,252,208,1,255,252,205,1,255,252,205,1,255,252,205,1,255,252,193,1,255,252,189,1,255,252,189,1,255,252,185,1,255,252,173,1,255,252,173,1,255,252,173,1,255,252,171,1,255,252,158,1,255,252,157,1,255,252,158,1,255,252,156,1,255,252,144,1,255,252,142,1,255,252,142,1,255,252,141,1,255,252,130,1,255,252,127,1,255,252,127,1,255,252,127,1,255,252,116,1,255,252,111,1,255,252,111,1,255,252,108,1,255,252,96,1,255,252,95,1,255,252,95,1,255,252,93,1,255,252,81,1,255,252,79,1,255,252,80,1,255,252,79,1,255,252,66,1,255,252,64,1,255,252,64,1,255,252,64,1,255,252,52,1,255,252,48,1,255,252,48,1,255,252,48,1,255,252,38,1,255,252,32,1,255,252,32,1,255,252,29,1,255,252,17,1,255,252,16,1,255,252,16,1,255,252,15,1,255,252,2,1,255,252,0,1,255,252,1,1,255,252,1,1,255,240,1,1,255,236,1,1,255,236,1,1,255,236,1,1,255,225,1,1,255,220,1,1,255,221,1,1,255,221,1,1,255,211,1,1,255,204,1,1,255,205,1,1,255,203,1,1,255,190,1,1,255,189,1,1,255,189,1,1,255,188,1,1,255,176,1,1,255,173,1,1,255,173,1,1,255,173,1,1,255,161,1,1,255,157,1,1,255,157,1,1,255,158,1,1,255,147,1,1,255,141,1,1,255,142,1,1,255,142,1,1,255,134,1,1,255,127,1,1,255,127,0,0,255,121,3,3,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.jet_white = map ;
	 var map = undefined; 

	 /* processing red colormap */ 
	 var map = {}; 
	 map.name = "red" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 0,0,0,255,1,0,0,255,2,0,0,255,3,0,0,255,4,0,0,255,5,0,0,255,6,0,0,255,7,0,0,255,8,0,0,255,9,0,0,255,10,0,0,255,11,0,0,255,12,0,0,255,13,0,0,255,14,0,0,255,15,0,0,255,16,0,0,255,17,0,0,255,18,0,0,255,19,0,0,255,20,0,0,255,21,0,0,255,22,0,0,255,23,0,0,255,24,0,0,255,25,0,0,255,26,0,0,255,27,0,0,255,28,0,0,255,29,0,0,255,30,0,0,255,31,0,0,255,32,0,0,255,33,0,0,255,34,0,0,255,35,0,0,255,36,0,0,255,37,0,0,255,38,0,0,255,39,0,0,255,40,0,0,255,41,0,0,255,42,0,0,255,43,0,0,255,44,0,0,255,45,0,0,255,46,0,0,255,47,0,0,255,48,0,0,255,49,0,0,255,50,0,0,255,51,0,0,255,52,0,0,255,53,0,0,255,54,0,0,255,55,0,0,255,56,0,0,255,57,0,0,255,58,0,0,255,59,0,0,255,60,0,0,255,61,0,0,255,62,0,0,255,63,0,0,255,64,0,0,255,65,0,0,255,66,0,0,255,67,0,0,255,68,0,0,255,69,0,0,255,70,0,0,255,71,0,0,255,72,0,0,255,73,0,0,255,74,0,0,255,75,0,0,255,76,0,0,255,77,0,0,255,78,0,0,255,79,0,0,255,80,0,0,255,81,0,0,255,82,0,0,255,83,0,0,255,84,0,0,255,85,0,0,255,86,0,0,255,87,0,0,255,88,0,0,255,89,0,0,255,90,0,0,255,91,0,0,255,92,0,0,255,93,0,0,255,94,0,0,255,95,0,0,255,96,0,0,255,97,0,0,255,98,0,0,255,99,0,0,255,100,0,0,255,101,0,0,255,102,0,0,255,103,0,0,255,104,0,0,255,105,0,0,255,106,0,0,255,107,0,0,255,108,0,0,255,109,0,0,255,110,0,0,255,111,0,0,255,112,0,0,255,113,0,0,255,114,0,0,255,115,0,0,255,116,0,0,255,117,0,0,255,118,0,0,255,119,0,0,255,120,0,0,255,121,0,0,255,122,0,0,255,123,0,0,255,124,0,0,255,125,0,0,255,126,0,0,255,127,0,0,255,128,0,0,255,129,0,0,255,130,0,0,255,131,0,0,255,132,0,0,255,133,0,0,255,134,0,0,255,135,0,0,255,136,0,0,255,137,0,0,255,138,0,0,255,139,0,0,255,140,0,0,255,141,0,0,255,142,0,0,255,143,0,0,255,144,0,0,255,145,0,0,255,146,0,0,255,147,0,0,255,148,0,0,255,149,0,0,255,150,0,0,255,151,0,0,255,152,0,0,255,153,0,0,255,154,0,0,255,155,0,0,255,156,0,0,255,157,0,0,255,158,0,0,255,159,0,0,255,160,0,0,255,161,0,0,255,162,0,0,255,163,0,0,255,164,0,0,255,165,0,0,255,166,0,0,255,167,0,0,255,168,0,0,255,169,0,0,255,170,0,0,255,171,0,0,255,172,0,0,255,173,0,0,255,174,0,0,255,175,0,0,255,176,0,0,255,177,0,0,255,178,0,0,255,179,0,0,255,180,0,0,255,181,0,0,255,182,0,0,255,183,0,0,255,184,0,0,255,185,0,0,255,186,0,0,255,187,0,0,255,188,0,0,255,189,0,0,255,190,0,0,255,191,0,0,255,192,0,0,255,193,0,0,255,194,0,0,255,195,0,0,255,196,0,0,255,197,0,0,255,198,0,0,255,199,0,0,255,200,0,0,255,201,0,0,255,202,0,0,255,203,0,0,255,204,0,0,255,205,0,0,255,206,0,0,255,207,0,0,255,208,0,0,255,209,0,0,255,210,0,0,255,211,0,0,255,212,0,0,255,213,0,0,255,214,0,0,255,215,0,0,255,216,0,0,255,217,0,0,255,218,0,0,255,219,0,0,255,220,0,0,255,221,0,0,255,222,0,0,255,223,0,0,255,224,0,0,255,225,0,0,255,226,0,0,255,227,0,0,255,228,0,0,255,229,0,0,255,230,0,0,255,231,0,0,255,232,0,0,255,233,0,0,255,234,0,0,255,235,0,0,255,236,0,0,255,237,0,0,255,238,0,0,255,239,0,0,255,240,0,0,255,241,0,0,255,242,0,0,255,243,0,0,255,244,0,0,255,245,0,0,255,246,0,0,255,247,0,0,255,248,0,0,255,249,0,0,255,250,0,0,255,251,0,0,255,252,0,0,255,253,0,0,255,254,0,0,255,255,0,0,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.red = map ;
	 var map = undefined; 

	 /* processing colorcube colormap */ 
	 var map = {}; 
	 map.name = "colorcube" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 84,84,1,255,84,84,1,255,84,83,1,255,84,122,1,255,84,170,1,255,84,168,1,255,84,166,1,255,84,196,1,255,84,253,1,255,84,252,1,255,83,255,1,255,103,216,1,255,166,88,1,255,168,84,1,255,168,84,1,255,168,95,1,255,168,161,1,255,168,169,1,255,168,167,1,255,168,209,1,255,168,254,1,255,168,252,1,255,166,255,1,255,198,192,1,255,253,83,1,255,252,84,1,255,252,83,1,255,252,105,1,255,252,167,1,255,252,168,1,255,252,167,1,255,252,181,1,255,252,247,1,255,252,252,1,255,253,253,0,255,235,241,9,255,36,108,109,255,0,83,128,255,1,83,127,255,1,117,127,255,1,169,127,255,1,168,127,255,1,167,127,255,1,191,127,255,1,252,127,255,1,252,127,255,0,255,127,255,15,209,127,255,80,12,127,255,85,0,127,255,84,0,127,255,84,8,127,255,84,74,127,255,84,85,127,255,84,84,127,255,84,87,127,255,84,151,127,255,84,170,127,255,84,167,127,255,84,194,127,255,84,252,127,255,84,252,127,255,83,255,127,255,101,202,127,255,165,9,127,255,168,0,127,255,168,0,127,255,168,10,127,255,168,76,127,255,168,85,127,255,168,84,127,255,168,88,127,255,168,153,127,255,168,169,127,255,168,168,127,255,168,168,127,255,168,228,127,255,168,254,127,255,167,255,127,255,187,196,127,255,250,6,127,255,252,0,127,255,252,0,127,255,252,12,127,255,252,78,127,255,252,85,127,255,252,84,127,255,252,89,127,255,252,155,127,255,252,169,127,255,252,168,127,255,252,169,127,255,252,230,127,255,252,254,127,255,252,252,127,255,255,254,125,255,95,147,205,255,0,81,255,255,1,83,252,255,1,97,252,255,1,163,252,255,1,168,252,255,1,168,252,255,1,174,252,255,1,241,252,255,1,253,252,255,1,252,252,255,2,248,252,255,65,59,252,255,86,0,252,255,84,1,252,255,84,0,252,255,84,56,252,255,84,86,252,255,84,83,252,255,84,99,252,255,84,165,252,255,84,168,252,255,84,168,252,255,84,176,252,255,84,243,252,255,84,253,252,255,84,252,252,255,87,245,252,255,151,52,252,255,169,0,252,255,168,1,252,255,168,0,252,255,168,58,252,255,168,86,252,255,168,84,252,255,168,83,252,255,168,132,252,255,168,170,252,255,168,168,252,255,168,178,252,255,168,244,252,255,168,253,252,255,168,253,252,255,172,241,252,255,237,46,252,255,253,0,252,255,252,1,252,255,252,1,252,255,252,61,252,255,252,86,252,255,252,84,252,255,252,83,252,255,252,135,252,255,252,170,252,255,252,168,252,255,255,172,255,255,155,90,135,255,39,0,0,255,43,1,1,255,45,1,1,255,78,1,1,255,85,1,1,255,84,1,1,255,85,1,1,255,116,1,1,255,128,1,1,255,127,1,1,255,126,1,1,255,153,1,1,255,169,1,1,255,168,1,1,255,167,1,1,255,190,1,1,255,212,1,1,255,211,1,1,255,210,1,1,255,226,1,1,255,253,1,1,255,252,1,1,255,247,1,1,255,57,33,1,255,0,44,1,255,1,43,1,255,1,43,1,255,1,70,1,255,1,85,1,255,1,84,1,255,1,84,1,255,1,107,1,255,1,128,1,255,1,127,1,255,1,126,1,255,1,144,1,255,1,169,1,255,1,168,1,255,1,167,1,255,1,180,1,255,1,211,1,255,1,211,1,255,1,211,1,255,1,240,1,255,1,253,1,255,1,252,1,255,1,255,0,255,1,108,25,255,1,0,44,255,1,1,43,255,1,1,42,255,1,1,61,255,1,1,85,255,1,1,84,255,1,1,83,255,1,1,98,255,1,1,127,255,1,1,127,255,1,1,126,255,1,1,135,255,1,1,167,255,1,1,168,255,1,1,168,255,1,1,194,255,1,1,212,255,1,1,211,255,1,1,210,255,1,1,230,255,1,1,253,255,1,1,252,255,1,1,255,255,1,1,165,255,1,1,0,255,1,1,1,255,0,0,0,255,9,9,9,255,35,35,35,255,36,36,36,255,36,36,36,255,41,41,41,255,70,70,70,255,73,73,73,255,72,72,72,255,91,91,91,255,109,109,109,255,108,108,108,255,107,107,107,255,122,122,122,255,145,145,145,255,145,145,145,255,144,144,144,255,154,154,154,255,180,180,180,255,180,180,180,255,180,180,180,255,186,186,186,255,215,215,215,255,217,217,217,255,216,216,216,255,219,219,219,255,248,248,248,255,253,253,253,255,252,252,252,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.colorcube = map ;
	 var map = undefined; 

	 /* processing green colormap */ 
	 var map = {}; 
	 map.name = "green" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 0,0,0,255,0,1,0,255,0,2,0,255,0,3,0,255,0,4,0,255,0,5,0,255,0,6,0,255,0,7,0,255,0,8,0,255,0,9,0,255,0,10,0,255,0,11,0,255,0,12,0,255,0,13,0,255,0,14,0,255,0,15,0,255,0,16,0,255,0,17,0,255,0,18,0,255,0,19,0,255,0,20,0,255,0,21,0,255,0,22,0,255,0,23,0,255,0,24,0,255,0,25,0,255,0,26,0,255,0,27,0,255,0,28,0,255,0,29,0,255,0,30,0,255,0,31,0,255,0,32,0,255,0,33,0,255,0,34,0,255,0,35,0,255,0,36,0,255,0,37,0,255,0,38,0,255,0,39,0,255,0,40,0,255,0,41,0,255,0,42,0,255,0,43,0,255,0,44,0,255,0,45,0,255,0,46,0,255,0,47,0,255,0,48,0,255,0,49,0,255,0,50,0,255,0,51,0,255,0,52,0,255,0,53,0,255,0,54,0,255,0,55,0,255,0,56,0,255,0,57,0,255,0,58,0,255,0,59,0,255,0,60,0,255,0,61,0,255,0,62,0,255,0,63,0,255,0,64,0,255,0,65,0,255,0,66,0,255,0,67,0,255,0,68,0,255,0,69,0,255,0,70,0,255,0,71,0,255,0,72,0,255,0,73,0,255,0,74,0,255,0,75,0,255,0,76,0,255,0,77,0,255,0,78,0,255,0,79,0,255,0,80,0,255,0,81,0,255,0,82,0,255,0,83,0,255,0,84,0,255,0,85,0,255,0,86,0,255,0,87,0,255,0,88,0,255,0,89,0,255,0,90,0,255,0,91,0,255,0,92,0,255,0,93,0,255,0,94,0,255,0,95,0,255,0,96,0,255,0,97,0,255,0,98,0,255,0,99,0,255,0,100,0,255,0,101,0,255,0,102,0,255,0,103,0,255,0,104,0,255,0,105,0,255,0,106,0,255,0,107,0,255,0,108,0,255,0,109,0,255,0,110,0,255,0,111,0,255,0,112,0,255,0,113,0,255,0,114,0,255,0,115,0,255,0,116,0,255,0,117,0,255,0,118,0,255,0,119,0,255,0,120,0,255,0,121,0,255,0,122,0,255,0,123,0,255,0,124,0,255,0,125,0,255,0,126,0,255,0,127,0,255,0,128,0,255,0,129,0,255,0,130,0,255,0,131,0,255,0,132,0,255,0,133,0,255,0,134,0,255,0,135,0,255,0,136,0,255,0,137,0,255,0,138,0,255,0,139,0,255,0,140,0,255,0,141,0,255,0,142,0,255,0,143,0,255,0,144,0,255,0,145,0,255,0,146,0,255,0,147,0,255,0,148,0,255,0,149,0,255,0,150,0,255,0,151,0,255,0,152,0,255,0,153,0,255,0,154,0,255,0,155,0,255,0,156,0,255,0,157,0,255,0,158,0,255,0,159,0,255,0,160,0,255,0,161,0,255,0,162,0,255,0,163,0,255,0,164,0,255,0,165,0,255,0,166,0,255,0,167,0,255,0,168,0,255,0,169,0,255,0,170,0,255,0,171,0,255,0,172,0,255,0,173,0,255,0,174,0,255,0,175,0,255,0,176,0,255,0,177,0,255,0,178,0,255,0,179,0,255,0,180,0,255,0,181,0,255,0,182,0,255,0,183,0,255,0,184,0,255,0,185,0,255,0,186,0,255,0,187,0,255,0,188,0,255,0,189,0,255,0,190,0,255,0,191,0,255,0,192,0,255,0,193,0,255,0,194,0,255,0,195,0,255,0,196,0,255,0,197,0,255,0,198,0,255,0,199,0,255,0,200,0,255,0,201,0,255,0,202,0,255,0,203,0,255,0,204,0,255,0,205,0,255,0,206,0,255,0,207,0,255,0,208,0,255,0,209,0,255,0,210,0,255,0,211,0,255,0,212,0,255,0,213,0,255,0,214,0,255,0,215,0,255,0,216,0,255,0,217,0,255,0,218,0,255,0,219,0,255,0,220,0,255,0,221,0,255,0,222,0,255,0,223,0,255,0,224,0,255,0,225,0,255,0,226,0,255,0,227,0,255,0,228,0,255,0,229,0,255,0,230,0,255,0,231,0,255,0,232,0,255,0,233,0,255,0,234,0,255,0,235,0,255,0,236,0,255,0,237,0,255,0,238,0,255,0,239,0,255,0,240,0,255,0,241,0,255,0,242,0,255,0,243,0,255,0,244,0,255,0,245,0,255,0,246,0,255,0,247,0,255,0,248,0,255,0,249,0,255,0,250,0,255,0,251,0,255,0,252,0,255,0,253,0,255,0,254,0,255,0,255,0,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.green = map ;
	 var map = undefined; 

	 /* processing lines colormap */ 
	 var map = {}; 
	 map.name = "lines" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 1,113,187,255,1,113,187,255,0,114,190,255,99,99,112,255,219,82,22,255,215,82,25,255,214,80,25,255,221,114,28,255,235,176,32,255,234,175,32,255,236,177,30,255,208,145,58,255,127,49,139,255,125,47,141,255,125,46,142,255,124,65,127,255,118,162,54,255,118,171,48,255,119,170,44,255,96,180,148,255,76,188,239,255,76,188,235,255,75,192,239,255,111,119,158,255,162,18,44,255,160,20,47,255,164,18,44,255,113,48,88,255,1,113,187,255,1,113,187,255,0,113,189,255,43,107,155,255,208,83,31,255,215,82,25,255,215,82,25,255,217,93,26,255,233,167,31,255,235,176,32,255,237,178,30,255,182,114,84,255,123,44,143,255,125,47,141,255,125,44,143,255,122,91,107,255,118,171,47,255,118,170,48,255,119,170,45,255,108,175,95,255,77,188,233,255,76,188,235,255,76,190,238,255,90,161,205,255,156,30,57,255,161,20,46,255,161,20,46,255,147,28,59,255,21,101,169,255,0,114,188,255,0,114,190,255,92,100,118,255,218,82,23,255,215,82,25,255,214,80,25,255,221,111,27,255,234,175,32,255,234,175,32,255,236,177,30,255,211,148,55,255,128,50,138,255,125,47,141,255,125,46,141,255,124,62,129,255,119,160,56,255,118,171,47,255,118,170,47,255,116,171,58,255,83,185,205,255,76,188,238,255,75,192,239,255,108,125,165,255,161,18,45,255,160,20,47,255,163,18,44,255,118,45,84,255,2,112,186,255,1,113,187,255,0,113,189,255,38,108,159,255,204,84,33,255,215,82,25,255,215,82,25,255,217,91,26,255,232,165,31,255,235,176,32,255,234,175,32,255,231,171,36,255,147,72,119,255,123,45,142,255,125,44,143,255,123,87,110,255,118,171,47,255,118,170,48,255,119,170,45,255,109,174,90,255,77,188,231,255,76,188,235,255,76,190,237,255,88,165,210,255,154,33,61,255,161,20,46,255,161,20,46,255,150,26,56,255,24,99,166,255,0,114,188,255,0,114,191,255,84,101,124,255,218,82,23,255,215,82,25,255,214,81,25,255,220,108,27,255,234,175,32,255,234,175,32,255,236,177,31,255,214,151,52,255,129,52,136,255,125,47,141,255,125,46,141,255,124,60,131,255,119,157,58,255,118,171,47,255,118,170,48,255,116,171,55,255,84,185,201,255,76,188,238,255,75,192,239,255,105,131,171,255,161,19,45,255,160,20,47,255,163,19,44,255,122,42,80,255,3,111,185,255,1,113,187,255,0,113,189,255,32,108,163,255,201,84,36,255,215,82,25,255,215,82,25,255,216,89,26,255,232,163,31,255,235,176,32,255,234,175,32,255,232,173,34,255,149,76,116,255,123,45,142,255,125,44,143,255,123,83,113,255,118,170,48,255,118,170,48,255,119,170,45,255,110,174,85,255,78,187,229,255,76,188,236,255,76,189,237,255,86,169,214,255,153,36,65,255,161,19,46,255,161,20,47,255,153,25,54,255,28,97,163,255,0,114,189,255,1,113,187,255,2,113,186,255,158,91,68,255,219,82,22,255,214,81,25,255,220,106,27,255,234,174,32,255,234,175,32,255,236,177,31,255,217,155,50,255,131,54,135,255,125,47,141,255,125,46,141,255,124,57,133,255,119,155,60,255,118,171,47,255,118,170,48,255,117,171,53,255,85,184,196,255,76,188,238,255,76,188,235,255,76,188,236,255,134,72,106,255,162,17,43,255,163,19,45,255,127,40,76,255,5,110,183,255,0,113,187,255,0,113,188,255,27,109,167,255,197,85,39,255,216,82,24,255,215,82,25,255,216,88,26,255,231,160,31,255,235,176,32,255,234,175,32,255,233,174,33,255,152,79,113,255,123,45,143,255,125,47,141,255,125,46,142,255,120,126,81,255,118,173,46,255,118,170,46,255,111,173,80,255,78,187,226,255,76,188,236,255,76,189,236,255,84,172,218,255,151,39,69,255,161,19,46,255,160,20,47,255,155,23,52,255,32,95,159,255,0,114,189,255,1,113,187,255,1,113,187,255,151,91,73,255,219,82,22,255,215,82,25,255,214,81,25,255,226,137,29,255,235,177,32,255,235,176,31,255,219,158,47,255,133,56,133,255,124,46,141,255,125,47,141,255,124,55,135,255,119,152,62,255,118,172,47,255,118,170,48,255,117,171,51,255,86,184,191,255,76,188,239,255,76,188,235,255,76,189,237,255,132,78,112,255,162,17,43,255,160,20,47,255,163,19,44,255,74,70,122,255,0,115,190,255,0,113,187,255,3,108,177,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.lines = map ;
	 var map = undefined; 

	 /* processing spring colormap */ 
	 var map = {}; 
	 map.name = "spring" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 252,1,252,255,252,1,252,255,252,0,252,255,252,2,250,255,252,4,248,255,252,4,248,255,252,4,248,255,252,6,247,255,252,8,244,255,252,8,244,255,252,8,244,255,252,9,243,255,252,12,240,255,252,12,240,255,252,12,240,255,252,13,240,255,252,16,237,255,252,16,236,255,252,16,236,255,252,18,234,255,252,20,232,255,252,20,232,255,252,20,232,255,252,22,231,255,252,24,228,255,252,24,229,255,252,24,229,255,252,25,227,255,252,28,225,255,252,28,225,255,252,28,225,255,252,29,224,255,252,32,221,255,252,32,221,255,252,32,221,255,252,33,220,255,252,36,217,255,252,36,217,255,252,36,217,255,252,38,215,255,252,40,213,255,252,40,213,255,252,40,213,255,252,42,211,255,252,45,208,255,252,45,208,255,252,45,208,255,252,46,207,255,252,49,204,255,252,49,204,255,252,49,204,255,252,50,203,255,252,53,200,255,252,53,200,255,252,53,200,255,252,53,199,255,252,56,196,255,252,57,196,255,252,57,196,255,252,58,194,255,252,61,192,255,252,61,192,255,252,61,192,255,252,62,191,255,252,65,188,255,252,65,188,255,252,65,188,255,252,66,187,255,252,68,184,255,252,69,184,255,252,69,184,255,252,69,184,255,252,72,180,255,252,73,180,255,252,73,180,255,252,73,180,255,252,76,177,255,252,77,176,255,252,76,176,255,252,78,175,255,252,81,172,255,252,80,172,255,252,80,172,255,252,82,171,255,252,84,168,255,252,84,168,255,252,84,168,255,252,85,168,255,252,88,165,255,252,88,164,255,252,88,164,255,252,89,164,255,252,92,161,255,252,92,160,255,252,92,160,255,252,92,160,255,252,95,157,255,252,96,156,255,252,96,157,255,252,98,155,255,252,100,152,255,252,100,152,255,252,100,153,255,252,101,152,255,252,104,149,255,252,104,149,255,252,104,149,255,252,105,148,255,252,108,145,255,252,108,145,255,252,108,145,255,252,108,144,255,252,111,141,255,252,112,141,255,252,112,141,255,252,114,139,255,252,116,137,255,252,116,137,255,252,116,137,255,252,117,136,255,252,120,133,255,252,120,133,255,252,120,133,255,252,121,132,255,252,124,129,255,252,124,129,255,252,124,129,255,252,124,128,255,252,128,124,255,252,129,124,255,252,129,124,255,252,129,124,255,252,132,121,255,252,133,120,255,252,133,120,255,252,134,119,255,252,137,116,255,252,137,116,255,252,137,116,255,252,138,115,255,252,141,112,255,252,141,112,255,252,141,112,255,252,141,111,255,252,144,108,255,252,145,108,255,252,145,108,255,252,145,108,255,252,148,105,255,252,149,104,255,252,149,104,255,252,149,104,255,252,152,101,255,252,153,100,255,252,152,100,255,252,154,99,255,252,156,96,255,252,156,96,255,252,156,96,255,252,157,95,255,252,160,92,255,252,160,92,255,252,160,92,255,252,161,92,255,252,164,89,255,252,164,88,255,252,164,88,255,252,165,88,255,252,168,85,255,252,168,84,255,252,168,84,255,252,168,84,255,252,171,82,255,252,172,80,255,252,172,81,255,252,173,79,255,252,176,77,255,252,176,76,255,252,176,77,255,252,177,76,255,252,180,73,255,252,180,73,255,252,180,73,255,252,180,72,255,252,184,69,255,252,184,69,255,252,184,69,255,252,184,68,255,252,187,66,255,252,188,65,255,252,188,65,255,252,188,65,255,252,191,62,255,252,192,61,255,252,192,61,255,252,193,60,255,252,196,57,255,252,196,57,255,252,196,57,255,252,196,56,255,252,199,53,255,252,200,53,255,252,200,53,255,252,200,53,255,252,203,50,255,252,204,49,255,252,204,49,255,252,204,49,255,252,207,46,255,252,208,45,255,252,208,45,255,252,208,45,255,252,211,42,255,252,213,40,255,252,213,40,255,252,213,39,255,252,216,36,255,252,217,36,255,252,217,36,255,252,217,36,255,252,220,33,255,252,221,32,255,252,221,32,255,252,221,32,255,252,224,29,255,252,225,28,255,252,225,28,255,252,225,28,255,252,227,25,255,252,229,24,255,252,229,24,255,252,228,24,255,252,231,22,255,252,232,20,255,252,232,20,255,252,233,20,255,252,236,17,255,252,236,16,255,252,236,16,255,252,237,16,255,252,240,13,255,252,240,12,255,252,240,12,255,252,240,12,255,252,243,9,255,252,244,8,255,252,244,8,255,252,244,8,255,252,247,6,255,252,248,4,255,252,248,4,255,252,248,4,255,252,250,2,255,252,252,0,255,252,252,0,255,238,238,3,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.spring = map ;
	 var map = undefined; 

	 /* processing cool colormap */ 
	 var map = {}; 
	 map.name = "cool" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 1,252,252,255,1,252,252,255,0,252,252,255,2,250,252,255,4,248,252,255,4,248,252,255,4,248,252,255,6,247,252,255,8,244,252,255,8,244,252,255,8,244,252,255,9,243,252,255,12,240,252,255,12,240,252,255,12,240,252,255,13,240,252,255,16,237,252,255,16,236,252,255,16,236,252,255,18,234,252,255,20,232,252,255,20,232,252,255,20,232,252,255,22,231,252,255,24,228,252,255,24,229,252,255,24,229,252,255,25,227,252,255,28,225,252,255,28,225,252,255,28,225,252,255,29,224,252,255,32,221,252,255,32,221,252,255,32,221,252,255,33,220,252,255,36,217,252,255,36,217,252,255,36,217,252,255,38,215,252,255,40,213,252,255,40,213,252,255,40,213,252,255,42,211,252,255,45,208,252,255,45,208,252,255,45,208,252,255,46,207,252,255,49,204,252,255,49,204,252,255,49,204,252,255,50,203,252,255,53,200,252,255,53,200,252,255,53,200,252,255,53,199,252,255,56,196,252,255,57,196,252,255,57,196,252,255,58,194,252,255,61,192,252,255,61,192,252,255,61,192,252,255,62,191,252,255,65,188,252,255,65,188,252,255,65,188,252,255,66,187,252,255,68,184,252,255,69,184,252,255,69,184,252,255,69,184,252,255,72,180,252,255,73,180,252,255,73,180,252,255,73,180,252,255,76,177,252,255,77,176,252,255,76,176,252,255,78,175,252,255,81,172,252,255,80,172,252,255,80,172,252,255,82,171,252,255,84,168,252,255,84,168,252,255,84,168,252,255,85,168,252,255,88,165,252,255,88,164,252,255,88,164,252,255,89,164,252,255,92,161,252,255,92,160,252,255,92,160,252,255,92,160,252,255,95,157,252,255,96,156,252,255,96,157,252,255,98,155,252,255,100,152,252,255,100,152,252,255,100,153,252,255,101,152,252,255,104,149,252,255,104,149,252,255,104,149,252,255,105,148,252,255,108,145,252,255,108,145,252,255,108,145,252,255,108,144,252,255,111,141,252,255,112,141,252,255,112,141,252,255,114,139,252,255,116,137,252,255,116,137,252,255,116,137,252,255,117,136,252,255,120,133,252,255,120,133,252,255,120,133,252,255,121,132,252,255,124,129,252,255,124,129,252,255,124,129,252,255,124,128,252,255,128,124,252,255,129,124,252,255,129,124,252,255,129,124,252,255,132,121,252,255,133,120,252,255,133,120,252,255,134,119,252,255,137,116,252,255,137,116,252,255,137,116,252,255,138,115,252,255,141,112,252,255,141,112,252,255,141,112,252,255,141,111,252,255,144,108,252,255,145,108,252,255,145,108,252,255,145,108,252,255,148,105,252,255,149,104,252,255,149,104,252,255,149,104,252,255,152,101,252,255,153,100,252,255,152,100,252,255,154,99,252,255,156,96,252,255,156,96,252,255,156,96,252,255,157,95,252,255,160,92,252,255,160,92,252,255,160,92,252,255,161,92,252,255,164,89,252,255,164,88,252,255,164,88,252,255,165,88,252,255,168,85,252,255,168,84,252,255,168,84,252,255,168,84,252,255,171,82,252,255,172,80,252,255,172,81,252,255,173,79,252,255,176,77,252,255,176,76,252,255,176,77,252,255,177,76,252,255,180,73,252,255,180,73,252,255,180,73,252,255,180,72,252,255,184,69,252,255,184,69,252,255,184,69,252,255,184,68,252,255,187,66,252,255,188,65,252,255,188,65,252,255,188,65,252,255,191,62,252,255,192,61,252,255,192,61,252,255,193,60,252,255,196,57,252,255,196,57,252,255,196,57,252,255,196,56,252,255,199,53,252,255,200,53,252,255,200,53,252,255,200,53,252,255,203,50,252,255,204,49,252,255,204,49,252,255,204,49,252,255,207,46,252,255,208,45,252,255,208,45,252,255,208,45,252,255,211,42,252,255,213,40,252,255,213,40,252,255,213,39,252,255,216,36,252,255,217,36,252,255,217,36,252,255,217,36,252,255,220,33,252,255,221,32,252,255,221,32,252,255,221,32,252,255,224,29,252,255,225,28,252,255,225,28,252,255,225,28,252,255,227,25,252,255,229,24,252,255,229,24,252,255,228,24,252,255,231,22,252,255,232,20,252,255,232,20,252,255,233,20,252,255,236,17,252,255,236,16,252,255,236,16,252,255,237,16,252,255,240,13,252,255,240,12,252,255,240,12,252,255,240,12,252,255,243,9,252,255,244,8,252,255,244,8,252,255,244,8,252,255,247,6,252,255,248,4,252,255,248,4,252,255,248,4,252,255,250,2,252,255,252,0,252,255,252,0,252,255,238,3,238,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.cool = map ;
	 var map = undefined; 

	 /* processing hot colormap */ 
	 var map = {}; 
	 map.name = "hot" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 24,18,18,255,11,0,0,255,11,1,1,255,12,1,1,255,19,1,1,255,21,1,1,255,21,1,1,255,21,1,1,255,29,1,1,255,32,1,1,255,32,1,1,255,32,1,1,255,39,1,1,255,43,1,1,255,43,1,1,255,43,1,1,255,48,1,1,255,53,1,1,255,53,1,1,255,54,1,1,255,62,1,1,255,64,1,1,255,64,1,1,255,64,1,1,255,72,1,1,255,74,1,1,255,73,1,1,255,74,1,1,255,81,1,1,255,85,1,1,255,84,1,1,255,84,1,1,255,91,1,1,255,96,1,1,255,95,1,1,255,95,1,1,255,100,1,1,255,105,1,1,255,105,1,1,255,106,1,1,255,115,1,1,255,116,1,1,255,116,1,1,255,116,1,1,255,125,1,1,255,127,1,1,255,127,1,1,255,127,1,1,255,134,1,1,255,137,1,1,255,137,1,1,255,137,1,1,255,143,1,1,255,148,1,1,255,148,1,1,255,147,1,1,255,153,1,1,255,158,1,1,255,157,1,1,255,158,1,1,255,167,1,1,255,168,1,1,255,168,1,1,255,169,1,1,255,177,1,1,255,179,1,1,255,179,1,1,255,179,1,1,255,186,1,1,255,189,1,1,255,189,1,1,255,189,1,1,255,196,1,1,255,200,1,1,255,200,1,1,255,200,1,1,255,205,1,1,255,211,1,1,255,211,1,1,255,212,1,1,255,219,1,1,255,221,1,1,255,221,1,1,255,221,1,1,255,229,1,1,255,232,1,1,255,231,1,1,255,231,1,1,255,238,1,1,255,242,1,1,255,241,1,1,255,241,1,1,255,248,1,1,255,252,1,1,255,252,1,1,255,252,0,1,255,252,6,1,255,252,12,1,255,252,11,1,255,252,12,1,255,252,20,1,255,252,21,1,255,252,21,1,255,252,22,1,255,252,30,1,255,252,32,1,255,252,32,1,255,252,32,1,255,252,40,1,255,252,43,1,255,252,43,1,255,252,43,1,255,252,49,1,255,252,53,1,255,252,53,1,255,252,54,1,255,252,63,1,255,252,64,1,255,252,64,1,255,252,64,1,255,252,72,1,255,252,74,1,255,252,73,1,255,252,74,1,255,252,82,1,255,252,85,1,255,252,84,1,255,252,84,1,255,252,92,1,255,252,95,1,255,252,95,1,255,252,95,1,255,252,101,1,255,252,105,1,255,252,105,1,255,252,107,1,255,252,115,1,255,252,116,1,255,252,116,1,255,252,117,1,255,252,125,1,255,252,127,1,255,252,127,1,255,252,127,1,255,252,134,1,255,252,137,1,255,252,137,1,255,252,137,1,255,252,144,1,255,252,148,1,255,252,148,1,255,252,147,1,255,252,153,1,255,252,158,1,255,252,157,1,255,252,159,1,255,252,167,1,255,252,168,1,255,252,168,1,255,252,169,1,255,252,178,1,255,252,179,1,255,252,179,1,255,252,179,1,255,252,187,1,255,252,189,1,255,252,189,1,255,252,189,1,255,252,196,1,255,252,200,1,255,252,200,1,255,252,200,1,255,252,206,1,255,252,211,1,255,252,211,1,255,252,212,1,255,252,220,1,255,252,221,1,255,252,221,1,255,252,221,1,255,252,230,1,255,252,232,1,255,252,231,1,255,252,232,1,255,252,239,1,255,252,241,1,255,252,241,1,255,252,241,1,255,252,249,1,255,252,252,1,255,252,252,1,255,252,252,0,255,252,252,9,255,252,252,17,255,252,252,16,255,252,252,18,255,252,252,31,255,252,252,32,255,252,252,32,255,252,252,33,255,252,252,45,255,252,252,48,255,252,252,48,255,252,252,48,255,252,252,60,255,252,252,64,255,252,252,64,255,252,252,64,255,252,252,74,255,252,252,80,255,252,252,79,255,252,252,79,255,252,252,88,255,252,252,96,255,252,252,95,255,252,252,97,255,252,252,110,255,252,252,111,255,252,252,111,255,252,252,112,255,252,252,124,255,252,252,127,255,252,252,127,255,252,252,127,255,252,252,138,255,252,252,142,255,252,252,142,255,252,252,142,255,252,252,152,255,252,252,158,255,252,252,157,255,252,252,157,255,252,252,166,255,252,252,174,255,252,252,173,255,252,252,175,255,252,252,187,255,252,252,189,255,252,252,189,255,252,252,190,255,252,252,202,255,252,252,205,255,252,252,205,255,252,252,205,255,252,252,217,255,252,252,221,255,252,252,221,255,252,252,220,255,252,252,231,255,252,252,237,255,252,252,236,255,252,252,236,255,252,252,245,255,252,252,253,255,252,252,252,255,238,238,238,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.hot = map ;
	 var map = undefined; 

	 /* processing parula colormap */ 
	 var map = {}; 
	 map.name = "parula" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 53,42,134,255,53,42,134,255,53,42,134,255,53,45,139,255,54,48,146,255,54,48,146,255,54,48,145,255,54,50,150,255,54,55,159,255,54,55,158,255,54,55,158,255,54,56,161,255,53,61,171,255,53,61,171,255,53,61,171,255,52,62,173,255,50,66,183,255,50,67,184,255,50,66,184,255,47,70,191,255,44,74,197,255,44,73,197,255,44,73,197,255,39,77,202,255,32,83,210,255,32,82,210,255,32,82,210,255,27,85,212,255,15,91,219,255,15,91,219,255,15,91,219,255,13,93,219,255,4,98,222,255,3,98,223,255,3,98,223,255,3,99,223,255,3,103,223,255,2,103,223,255,2,103,223,255,3,106,222,255,4,108,222,255,4,108,222,255,4,108,222,255,6,110,221,255,8,112,220,255,8,112,220,255,8,112,220,255,10,113,219,255,13,116,218,255,13,116,218,255,13,116,218,255,14,117,217,255,16,120,216,255,16,120,216,255,16,120,216,255,16,120,215,255,18,123,214,255,18,124,214,255,18,124,214,255,19,126,213,255,20,128,212,255,20,128,212,255,20,128,212,255,20,129,211,255,20,132,210,255,20,132,210,255,20,132,210,255,20,133,210,255,19,136,209,255,19,136,209,255,19,136,209,255,19,136,209,255,17,140,208,255,16,141,208,255,16,141,208,255,16,141,208,255,13,145,208,255,12,146,208,255,12,145,208,255,11,147,207,255,9,151,207,255,9,151,207,255,9,150,207,255,9,152,206,255,7,154,205,255,7,154,205,255,7,154,205,255,7,155,204,255,6,158,203,255,6,158,203,255,6,158,203,255,6,159,203,255,6,162,200,255,6,162,200,255,6,162,200,255,6,162,200,255,6,165,197,255,6,165,196,255,6,165,196,255,7,166,195,255,7,167,192,255,7,167,192,255,7,167,192,255,8,168,191,255,10,170,188,255,10,170,188,255,10,170,188,255,11,171,187,255,15,172,183,255,15,172,183,255,15,172,183,255,16,172,183,255,20,175,179,255,21,175,178,255,21,175,178,255,24,176,176,255,29,177,173,255,29,177,173,255,29,177,173,255,31,178,172,255,37,179,167,255,37,179,167,255,37,179,167,255,39,180,166,255,46,181,163,255,46,181,162,255,46,181,162,255,47,181,162,255,55,183,157,255,56,183,156,255,56,183,156,255,56,183,156,255,64,185,152,255,66,185,150,255,65,185,151,255,69,185,148,255,77,186,145,255,76,186,145,255,76,186,145,255,79,186,143,255,88,187,139,255,88,187,139,255,88,187,139,255,90,187,138,255,99,188,133,255,100,188,133,255,100,188,133,255,101,188,132,255,110,189,128,255,112,189,127,255,112,189,127,255,112,189,127,255,120,189,123,255,123,189,122,255,123,189,122,255,126,189,121,255,134,189,118,255,134,189,118,255,134,189,118,255,136,189,117,255,144,189,114,255,145,189,114,255,144,189,114,255,146,189,114,255,154,189,110,255,154,189,110,255,154,189,110,255,155,189,110,255,162,188,107,255,163,188,106,255,163,188,106,255,163,188,106,255,170,188,103,255,172,188,102,255,172,188,102,255,174,188,101,255,181,187,99,255,181,187,99,255,181,187,99,255,183,187,99,255,190,186,95,255,190,186,95,255,190,186,95,255,191,186,95,255,197,186,93,255,198,186,92,255,198,186,92,255,198,186,92,255,205,185,89,255,207,185,88,255,207,185,88,255,207,185,88,255,212,184,86,255,215,184,85,255,215,184,85,255,216,184,85,255,222,183,81,255,223,183,81,255,223,183,81,255,224,183,81,255,230,183,78,255,231,183,77,255,230,183,77,255,231,183,77,255,237,183,74,255,238,183,73,255,238,183,73,255,238,183,73,255,244,185,69,255,245,185,67,255,245,185,68,255,245,185,68,255,248,187,63,255,250,188,61,255,250,188,61,255,251,189,60,255,252,193,55,255,252,193,55,255,252,193,55,255,252,193,54,255,251,197,50,255,251,198,50,255,251,198,50,255,251,198,50,255,250,203,47,255,249,204,46,255,249,204,46,255,249,204,46,255,248,207,43,255,247,209,42,255,247,209,42,255,247,209,42,255,245,212,40,255,244,214,38,255,244,214,38,255,244,215,37,255,242,219,33,255,242,220,33,255,242,220,33,255,242,220,33,255,242,225,30,255,242,226,29,255,242,226,29,255,242,226,29,255,242,231,25,255,242,233,24,255,242,232,24,255,242,232,24,255,243,238,21,255,243,240,19,255,243,240,19,255,243,240,19,255,245,245,17,255,246,248,14,255,247,248,14,255,232,234,16,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.parula = map ;
	 var map = undefined; 

	 /* processing summer colormap */ 
	 var map = {}; 
	 map.name = "summer" ;
	 map.width= 256 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 1,127,101,255,1,127,101,255,0,127,101,255,2,128,101,255,4,129,101,255,4,129,101,255,4,129,101,255,6,129,101,255,8,131,101,255,8,131,101,255,8,131,101,255,9,131,101,255,12,133,101,255,12,133,101,255,12,133,101,255,13,133,101,255,16,135,101,255,16,135,101,255,16,135,101,255,18,136,101,255,20,137,101,255,20,137,101,255,20,137,101,255,22,137,101,255,24,139,101,255,24,139,101,255,24,139,101,255,25,139,101,255,28,141,101,255,28,141,101,255,28,141,101,255,29,141,101,255,32,143,101,255,32,143,101,255,32,143,101,255,33,143,101,255,36,144,101,255,36,145,101,255,36,145,101,255,38,146,101,255,40,147,101,255,40,147,101,255,40,147,101,255,42,147,101,255,45,149,101,255,45,149,101,255,45,149,101,255,46,149,101,255,49,151,101,255,49,151,101,255,49,151,101,255,50,151,101,255,53,152,101,255,53,152,101,255,53,152,101,255,53,153,101,255,56,154,101,255,57,154,101,255,57,154,101,255,58,155,101,255,61,156,101,255,61,156,101,255,61,156,101,255,62,157,101,255,65,158,101,255,65,158,101,255,65,158,101,255,66,159,101,255,68,160,101,255,69,160,101,255,69,160,101,255,69,161,101,255,72,162,101,255,73,162,101,255,73,162,101,255,73,162,101,255,76,164,101,255,77,164,101,255,76,164,101,255,78,165,101,255,81,166,101,255,80,166,101,255,80,166,101,255,82,167,101,255,84,168,101,255,84,168,101,255,84,168,101,255,85,169,101,255,88,170,101,255,88,170,101,255,88,170,101,255,89,170,101,255,92,172,101,255,92,172,101,255,92,172,101,255,92,172,101,255,95,174,101,255,96,174,101,255,96,174,101,255,98,175,101,255,100,176,101,255,100,176,101,255,100,176,101,255,101,177,101,255,104,178,101,255,104,178,101,255,104,178,101,255,105,178,101,255,108,180,101,255,108,180,101,255,108,180,101,255,108,180,101,255,111,182,101,255,112,182,101,255,112,182,101,255,114,183,101,255,116,184,101,255,116,184,101,255,116,184,101,255,117,185,101,255,120,186,101,255,120,186,101,255,120,186,101,255,121,186,101,255,124,188,101,255,124,188,101,255,124,188,101,255,124,188,101,255,128,190,101,255,129,190,101,255,129,190,101,255,129,190,101,255,132,192,101,255,133,192,101,255,133,192,101,255,134,193,101,255,137,194,101,255,137,194,101,255,137,194,101,255,138,194,101,255,141,196,101,255,141,196,101,255,141,196,101,255,141,196,101,255,144,198,101,255,145,198,101,255,145,198,101,255,145,198,101,255,148,200,101,255,149,200,101,255,149,200,101,255,149,200,101,255,152,201,101,255,153,202,101,255,152,202,101,255,154,202,101,255,156,204,101,255,156,204,101,255,156,204,101,255,157,204,101,255,160,206,101,255,160,206,101,255,160,206,101,255,161,206,101,255,164,208,101,255,164,208,101,255,164,208,101,255,165,208,101,255,168,209,101,255,168,210,101,255,168,210,101,255,168,210,101,255,171,212,101,255,172,213,101,255,172,213,101,255,173,213,101,255,176,215,101,255,176,215,101,255,176,215,101,255,177,215,101,255,180,217,101,255,180,217,101,255,180,217,101,255,180,217,101,255,184,218,101,255,184,219,101,255,184,219,101,255,184,219,101,255,187,220,101,255,188,221,101,255,188,221,101,255,188,221,101,255,191,222,101,255,192,223,101,255,192,223,101,255,193,223,101,255,196,224,101,255,196,225,101,255,196,224,101,255,196,225,101,255,199,226,101,255,200,227,101,255,200,227,101,255,200,227,101,255,203,228,101,255,204,229,101,255,204,229,101,255,204,229,101,255,207,230,101,255,208,231,101,255,208,231,101,255,208,230,101,255,211,232,101,255,213,232,101,255,213,232,101,255,213,233,101,255,216,234,101,255,217,234,101,255,217,234,101,255,217,235,101,255,220,236,101,255,221,236,101,255,221,236,101,255,221,236,101,255,224,238,101,255,225,238,101,255,225,238,101,255,225,238,101,255,227,240,101,255,229,240,101,255,229,240,101,255,228,240,101,255,231,241,101,255,232,242,101,255,232,242,101,255,233,243,101,255,236,244,101,255,236,244,101,255,236,244,101,255,237,244,101,255,240,246,101,255,240,246,101,255,240,246,101,255,240,246,101,255,243,248,101,255,244,248,101,255,244,248,101,255,244,248,101,255,247,250,101,255,248,250,101,255,248,250,101,255,248,250,101,255,250,251,101,255,252,252,101,255,252,252,101,255,238,238,97,255,]) ;
	 map.image = imageFromArray(map.data, 256,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.summer = map ;
	 var map = undefined; 

		/* tica inspired */

	 /* processing alpineColors colormap */ 
	 var map = {}; 
	 map.name = "alpineColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 71,91,123,255,71,91,123,255,71,91,123,255,71,93,123,255,71,93,123,255,72,94,123,255,72,94,123,255,72,94,123,255,72,96,122,255,72,96,122,255,72,96,122,255,73,97,122,255,73,97,122,255,74,102,121,255,73,97,122,255,72,96,122,255,76,104,120,255,72,96,122,255,74,102,121,255,74,102,121,255,74,102,121,255,76,104,120,255,74,102,121,255,76,104,120,255,76,104,120,255,76,104,120,255,76,106,120,255,76,106,120,255,77,107,120,255,77,107,120,255,77,107,120,255,77,109,119,255,77,109,119,255,78,110,118,255,78,110,118,255,77,109,119,255,77,109,119,255,79,112,115,255,79,112,115,255,79,112,115,255,79,112,115,255,80,113,113,255,80,113,113,255,80,113,113,255,80,113,111,255,80,113,111,255,80,113,111,255,82,115,107,255,80,113,111,255,82,115,107,255,82,115,107,255,82,115,107,255,83,117,103,255,82,115,107,255,83,117,103,255,83,117,103,255,83,117,103,255,84,118,102,255,84,118,102,255,84,119,100,255,84,119,100,255,84,118,102,255,85,120,98,255,85,120,98,255,85,120,98,255,87,121,95,255,85,120,98,255,87,121,95,255,87,121,95,255,87,121,95,255,88,122,95,255,88,122,95,255,88,122,95,255,91,124,94,255,88,122,95,255,91,124,94,255,91,124,94,255,92,125,93,255,92,125,93,255,92,125,93,255,96,128,92,255,92,125,93,255,96,128,92,255,96,128,92,255,96,128,92,255,97,128,91,255,96,128,92,255,96,128,92,255,97,128,91,255,97,128,91,255,98,129,91,255,98,129,91,255,98,129,91,255,101,131,90,255,98,129,91,255,101,131,90,255,101,131,90,255,101,131,90,255,104,133,92,255,101,131,90,255,104,133,92,255,104,133,92,255,104,133,92,255,108,135,95,255,108,135,95,255,108,135,95,255,108,135,95,255,108,135,95,255,108,135,95,255,112,137,98,255,108,135,95,255,112,137,98,255,112,137,98,255,114,138,100,255,114,138,100,255,114,138,100,255,116,139,101,255,116,139,101,255,118,140,103,255,118,140,103,255,118,140,103,255,120,141,104,255,120,141,104,255,120,141,104,255,124,143,107,255,124,143,107,255,124,143,107,255,124,143,107,255,124,143,107,255,126,145,109,255,126,145,109,255,129,146,111,255,129,146,111,255,129,146,111,255,131,147,113,255,131,147,113,255,133,148,116,255,133,148,116,255,133,148,116,255,136,150,118,255,136,150,118,255,136,150,118,255,138,151,120,255,138,151,120,255,140,152,122,255,140,152,122,255,140,152,122,255,143,154,125,255,143,154,125,255,145,155,127,255,145,155,127,255,145,155,127,255,147,156,129,255,147,156,129,255,150,158,131,255,150,158,131,255,150,158,131,255,152,159,134,255,152,159,134,255,152,159,134,255,155,160,136,255,155,160,136,255,157,162,138,255,157,162,138,255,157,162,138,255,160,164,141,255,160,164,141,255,162,166,143,255,162,166,143,255,162,166,143,255,165,168,146,255,165,168,146,255,167,170,148,255,167,170,148,255,167,170,148,255,170,172,151,255,170,172,151,255,170,172,151,255,172,175,153,255,172,175,153,255,175,177,155,255,175,177,155,255,175,177,155,255,177,179,158,255,177,179,158,255,180,181,160,255,180,181,160,255,180,181,160,255,183,183,163,255,183,183,163,255,185,185,165,255,185,185,165,255,185,185,165,255,188,187,168,255,188,187,168,255,188,187,168,255,190,190,170,255,190,190,170,255,193,192,173,255,193,192,173,255,193,192,173,255,196,195,175,255,196,195,175,255,199,198,178,255,199,198,178,255,199,198,178,255,201,200,181,255,201,200,181,255,201,200,181,255,204,203,183,255,204,203,183,255,207,206,186,255,207,206,186,255,207,206,186,255,209,209,189,255,209,209,189,255,212,211,191,255,212,211,191,255,212,211,191,255,215,214,194,255,215,214,194,255,217,217,196,255,217,217,196,255,217,217,196,255,220,219,199,255,220,219,199,255,220,219,199,255,223,222,202,255,223,222,202,255,226,225,204,255,226,225,204,255,226,225,204,255,228,228,207,255,228,228,207,255,231,230,210,255,231,230,210,255,231,230,210,255,234,233,212,255,234,233,212,255,236,236,215,255,236,236,215,255,236,236,215,255,239,239,218,255,239,239,218,255,239,239,218,255,242,242,220,255,242,242,220,255,245,245,223,255,245,245,223,255,245,245,223,255,247,247,226,255,247,247,226,255,250,250,228,255,250,250,228,255,250,250,228,255,253,253,231,255,253,253,231,255,255,255,234,255,255,255,234,255,255,255,234,255,255,255,234,255,255,255,234,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.alpineColors = map ;
	 var map = undefined; 

	 /* processing darkTerrain colormap */ 
	 var map = {}; 
	 map.name = "darkTerrain" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 0,18,119,255,0,18,119,255,0,18,119,255,5,24,120,255,5,24,120,255,10,30,120,255,10,30,120,255,10,30,120,255,16,36,121,255,16,36,121,255,21,42,121,255,21,42,121,255,21,42,121,255,26,48,122,255,26,48,122,255,32,54,122,255,32,54,122,255,32,54,122,255,37,60,123,255,37,60,123,255,37,60,123,255,42,66,123,255,42,66,123,255,47,70,124,255,47,70,124,255,47,70,124,255,51,75,124,255,51,75,124,255,55,80,124,255,55,80,124,255,55,80,124,255,59,85,125,255,59,85,125,255,64,89,125,255,64,89,125,255,64,89,125,255,68,94,125,255,68,94,125,255,68,94,125,255,72,99,126,255,72,99,126,255,75,102,126,255,75,102,126,255,75,102,126,255,78,104,125,255,78,104,125,255,80,105,124,255,80,105,124,255,80,105,124,255,84,109,123,255,80,105,124,255,86,111,123,255,84,109,123,255,86,111,123,255,86,111,123,255,86,111,123,255,86,111,123,255,88,113,122,255,88,113,122,255,91,115,122,255,91,115,122,255,91,115,122,255,92,116,121,255,92,116,121,255,94,117,120,255,94,117,120,255,94,117,120,255,96,118,119,255,96,118,119,255,96,118,119,255,96,118,119,255,100,120,117,255,100,120,117,255,100,120,117,255,100,120,117,255,101,121,116,255,101,121,116,255,103,122,115,255,103,122,115,255,103,122,115,255,105,123,114,255,105,123,114,255,106,124,113,255,106,124,113,255,106,124,113,255,107,124,111,255,107,124,111,255,107,124,111,255,109,124,110,255,109,124,110,255,109,124,110,255,111,125,107,255,109,124,110,255,111,125,107,255,111,125,107,255,113,125,105,255,113,125,105,255,113,125,105,255,114,125,104,255,113,125,105,255,115,125,102,255,115,125,102,255,115,125,102,255,115,124,101,255,115,124,101,255,115,124,101,255,116,123,99,255,116,123,99,255,117,122,97,255,117,122,97,255,116,123,99,255,117,122,95,255,117,122,95,255,118,121,93,255,118,121,93,255,118,121,93,255,118,121,93,255,118,120,91,255,118,120,91,255,118,120,91,255,119,118,88,255,119,118,88,255,119,118,88,255,119,118,88,255,119,116,85,255,119,116,85,255,119,115,83,255,119,115,83,255,119,116,85,255,119,112,79,255,119,115,83,255,119,112,79,255,119,112,79,255,119,112,79,255,119,112,79,255,119,112,79,255,119,109,75,255,119,109,75,255,119,109,75,255,119,107,73,255,119,107,73,255,119,107,73,255,119,106,71,255,119,106,71,255,120,104,69,255,120,104,69,255,120,104,69,255,120,104,69,255,120,104,69,255,120,101,66,255,120,101,66,255,120,101,66,255,120,100,64,255,120,100,64,255,120,98,62,255,120,98,62,255,120,98,62,255,120,98,62,255,120,98,62,255,120,98,62,255,120,96,59,255,120,96,59,255,120,96,59,255,120,96,59,255,120,96,59,255,120,96,59,255,123,93,56,255,120,96,59,255,123,93,56,255,121,95,58,255,123,93,56,255,123,93,56,255,123,93,56,255,123,93,56,255,123,93,56,255,123,93,56,255,123,93,56,255,123,93,56,255,123,93,55,255,124,94,56,255,123,93,56,255,127,96,59,255,123,93,56,255,127,96,59,255,123,93,56,255,127,96,59,255,127,96,59,255,127,96,59,255,129,97,61,255,129,97,61,255,130,99,63,255,130,99,63,255,129,97,61,255,132,100,64,255,132,100,64,255,132,100,64,255,133,101,66,255,133,101,66,255,135,103,67,255,135,103,67,255,135,103,67,255,138,107,73,255,138,107,73,255,142,111,78,255,142,111,78,255,142,111,78,255,145,115,83,255,145,115,83,255,145,115,83,255,149,120,88,255,149,120,88,255,152,124,94,255,152,124,94,255,152,124,94,255,156,128,99,255,156,128,99,255,159,133,104,255,159,133,104,255,159,133,104,255,164,138,111,255,164,138,111,255,170,146,120,255,170,146,120,255,170,146,120,255,176,154,130,255,176,154,130,255,176,154,130,255,182,161,139,255,182,161,139,255,188,169,148,255,188,169,148,255,188,169,148,255,194,177,158,255,194,177,158,255,200,184,167,255,200,184,167,255,200,184,167,255,206,192,177,255,206,192,177,255,212,200,186,255,212,200,186,255,212,200,186,255,218,208,196,255,218,208,196,255,218,208,196,255,224,216,206,255,224,216,206,255,231,224,216,255,231,224,216,255,231,224,216,255,237,232,226,255,237,232,226,255,243,240,236,255,243,240,236,255,243,240,236,255,249,248,246,255,249,248,246,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.darkTerrain = map ;
	 var map = undefined; 

	 /* processing pigeonTones colormap */ 
	 var map = {}; 
	 map.name = "pigeonTones" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 50,45,55,255,50,45,55,255,50,45,55,255,51,47,58,255,51,47,58,255,53,50,60,255,53,50,60,255,53,50,60,255,55,52,62,255,55,52,62,255,56,54,64,255,56,54,64,255,56,54,64,255,60,58,68,255,56,54,64,255,60,58,68,255,60,58,68,255,60,58,68,255,61,61,70,255,61,61,70,255,61,61,70,255,63,63,73,255,63,63,73,255,65,65,75,255,65,65,75,255,65,65,75,255,66,67,77,255,66,67,77,255,68,69,79,255,68,69,79,255,68,69,79,255,70,72,81,255,70,72,81,255,71,74,83,255,71,74,83,255,71,74,83,255,73,76,85,255,73,76,85,255,73,76,85,255,74,78,87,255,74,78,87,255,76,79,88,255,76,79,88,255,76,79,88,255,77,81,90,255,77,81,90,255,79,84,92,255,79,84,92,255,79,84,92,255,79,84,92,255,79,84,92,255,80,86,94,255,80,86,94,255,80,86,94,255,82,88,95,255,82,88,95,255,80,86,94,255,83,89,97,255,83,89,97,255,84,91,98,255,84,91,98,255,84,91,98,255,85,93,99,255,85,93,99,255,86,95,101,255,86,95,101,255,86,95,101,255,86,95,101,255,89,98,103,255,86,95,101,255,89,98,103,255,89,98,103,255,90,100,105,255,90,100,105,255,90,100,105,255,91,101,106,255,91,101,106,255,92,102,107,255,92,102,107,255,92,102,107,255,94,104,108,255,94,104,108,255,95,105,109,255,95,105,109,255,95,105,109,255,96,107,110,255,96,107,110,255,96,107,110,255,99,109,112,255,99,109,112,255,99,109,112,255,99,109,112,255,99,109,112,255,101,112,114,255,101,112,114,255,101,112,114,255,101,112,114,255,101,112,114,255,104,115,116,255,101,112,114,255,104,115,116,255,104,115,116,255,104,115,116,255,104,115,116,255,107,118,118,255,104,115,116,255,107,118,118,255,107,118,118,255,108,119,119,255,108,119,119,255,108,119,119,255,109,121,120,255,109,121,120,255,111,122,121,255,111,122,121,255,111,122,121,255,114,124,123,255,114,124,123,255,116,126,125,255,116,126,125,255,116,126,125,255,118,128,126,255,118,128,126,255,118,128,126,255,120,130,128,255,120,130,128,255,122,132,129,255,122,132,129,255,122,132,129,255,125,133,131,255,125,133,131,255,127,135,132,255,127,135,132,255,127,135,132,255,129,137,134,255,129,137,134,255,131,139,136,255,131,139,136,255,131,139,136,255,133,141,137,255,133,141,137,255,133,141,137,255,136,142,139,255,136,142,139,255,138,144,140,255,138,144,140,255,138,144,140,255,140,146,142,255,140,146,142,255,143,149,145,255,143,149,145,255,143,149,145,255,147,151,147,255,147,151,147,255,150,154,150,255,150,154,150,255,150,154,150,255,153,157,153,255,153,157,153,255,153,157,153,255,157,160,156,255,157,160,156,255,160,163,158,255,160,163,158,255,160,163,158,255,163,165,161,255,163,165,161,255,167,168,164,255,167,168,164,255,167,168,164,255,170,171,167,255,170,171,167,255,174,174,170,255,174,174,170,255,174,174,170,255,177,176,172,255,177,176,172,255,177,176,172,255,180,179,175,255,180,179,175,255,184,182,178,255,184,182,178,255,184,182,178,255,187,185,181,255,187,185,181,255,191,188,184,255,191,188,184,255,191,188,184,255,194,191,187,255,194,191,187,255,198,194,191,255,198,194,191,255,198,194,191,255,201,197,194,255,201,197,194,255,201,197,194,255,205,201,198,255,205,201,198,255,209,204,201,255,209,204,201,255,209,204,201,255,212,207,205,255,212,207,205,255,216,211,208,255,216,211,208,255,216,211,208,255,220,214,212,255,220,214,212,255,220,214,212,255,223,217,215,255,223,217,215,255,227,220,219,255,227,220,219,255,227,220,219,255,231,224,222,255,231,224,222,255,234,227,226,255,234,227,226,255,234,227,226,255,238,230,229,255,238,230,229,255,241,233,232,255,241,233,232,255,241,233,232,255,243,236,235,255,243,236,235,255,241,233,232,255,245,240,239,255,241,233,232,255,245,240,239,255,245,240,239,255,245,240,239,255,245,240,239,255,245,240,239,255,246,241,240,255,246,241,240,255,246,241,240,255,248,245,244,255,246,241,240,255,249,246,245,255,249,246,245,255,249,246,245,255,249,246,245,255,249,246,245,255,249,246,245,255,250,248,247,255,250,248,247,255,250,248,247,255,255,255,255,255,250,248,247,255,252,251,250,255,252,251,250,255,252,251,250,255,255,255,255,255,252,251,250,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.pigeonTones = map ;
	 var map = undefined; 

	 /* processing aquamarine colormap */ 
	 var map = {}; 
	 map.name = "aquamarine" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 174,189,217,255,174,189,217,255,174,189,217,255,174,189,217,255,177,191,218,255,177,191,218,255,177,191,218,255,177,191,218,255,178,192,218,255,178,192,218,255,180,194,219,255,180,194,219,255,180,194,219,255,183,196,220,255,180,194,219,255,183,196,220,255,183,196,220,255,183,196,220,255,184,197,220,255,184,197,220,255,184,197,220,255,184,197,220,255,184,197,220,255,188,201,221,255,188,201,221,255,188,201,221,255,188,201,221,255,188,201,221,255,190,202,222,255,193,205,223,255,188,201,221,255,191,203,222,255,191,203,222,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,194,206,223,255,191,206,219,255,194,206,223,255,191,206,220,255,191,206,220,255,191,206,219,255,191,206,219,255,191,206,219,255,191,206,219,255,191,206,219,255,191,206,219,255,191,206,219,255,191,206,219,255,191,206,219,255,191,206,219,255,191,206,219,255,191,206,219,255,191,206,219,255,189,206,217,255,188,205,217,255,191,206,219,255,186,205,216,255,191,206,219,255,186,205,216,255,186,205,216,255,186,205,216,255,185,204,215,255,185,204,215,255,183,203,214,255,183,203,214,255,183,203,214,255,183,203,214,255,183,203,214,255,183,203,214,255,179,201,211,255,183,203,214,255,179,201,211,255,179,201,211,255,179,201,211,255,177,200,211,255,177,200,211,255,177,200,211,255,177,200,211,255,177,200,211,255,174,199,209,255,174,199,209,255,174,199,209,255,174,199,209,255,174,199,209,255,171,197,207,255,171,197,207,255,171,197,207,255,170,196,206,255,170,196,206,255,170,196,206,255,167,195,204,255,170,196,206,255,167,195,204,255,167,195,204,255,167,195,204,255,167,195,204,255,167,195,204,255,163,193,203,255,163,193,203,255,161,192,202,255,161,192,202,255,161,192,202,255,161,192,202,255,161,192,202,255,161,192,202,255,158,190,200,255,158,190,200,255,156,189,199,255,156,189,199,255,156,189,199,255,154,188,198,255,154,188,198,255,154,188,198,255,154,188,198,255,154,188,198,255,151,186,197,255,151,186,197,255,151,186,197,255,151,186,197,255,151,186,197,255,147,184,195,255,147,184,195,255,147,184,195,255,147,184,195,255,147,184,195,255,147,184,195,255,142,181,192,255,147,184,195,255,142,181,192,255,142,181,192,255,141,180,192,255,141,180,192,255,141,180,192,255,139,179,192,255,139,179,192,255,138,178,191,255,138,178,191,255,138,178,191,255,138,178,191,255,138,178,191,255,138,178,191,255,135,176,190,255,138,178,191,255,135,176,190,255,135,176,190,255,135,176,190,255,135,176,190,255,132,175,189,255,135,176,190,255,131,174,189,255,135,176,190,255,131,174,189,255,131,174,189,255,131,174,189,255,131,174,189,255,131,174,189,255,131,174,189,255,131,174,189,255,131,174,189,255,127,172,187,255,127,172,187,255,127,172,187,255,127,172,187,255,127,172,187,255,127,172,187,255,125,170,186,255,127,172,187,255,125,170,186,255,127,172,187,255,127,172,187,255,125,170,188,255,125,170,186,255,127,172,187,255,127,172,187,255,125,170,188,255,125,170,188,255,125,170,188,255,125,170,188,255,125,170,188,255,127,170,191,255,125,170,188,255,127,170,191,255,125,170,188,255,127,170,191,255,125,170,188,255,127,170,191,255,125,170,188,255,127,170,192,255,126,170,191,255,126,170,191,255,126,170,191,255,126,170,191,255,126,170,191,255,126,170,191,255,126,170,191,255,127,170,191,255,127,170,191,255,127,170,192,255,127,170,192,255,127,170,192,255,127,170,192,255,126,170,191,255,130,172,195,255,127,170,192,255,130,172,195,255,130,172,195,255,135,174,198,255,127,170,192,255,135,174,198,255,135,174,198,255,135,174,198,255,135,174,198,255,135,174,198,255,137,176,200,255,137,176,200,255,140,177,201,255,140,177,201,255,140,177,201,255,144,180,205,255,140,177,201,255,144,180,205,255,144,180,205,255,144,180,205,255,147,181,206,255,147,181,206,255,147,181,206,255,149,182,208,255,149,182,208,255,152,183,210,255,152,183,210,255,152,183,210,255,154,185,212,255,154,185,212,255,156,186,213,255,156,186,213,255,156,186,213,255,159,187,215,255,159,187,215,255,161,188,217,255,161,188,217,255,161,188,217,255,161,188,217,255,159,187,215,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.aquamarine = map ;
	 var map = undefined; 

	 /* processing deepSeaColors colormap */ 
	 var map = {}; 
	 map.name = "deepSeaColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 42,1,77,255,42,1,77,255,42,1,77,255,44,1,80,255,44,1,80,255,45,2,83,255,45,2,83,255,45,2,83,255,47,2,86,255,47,2,86,255,47,2,86,255,50,4,92,255,47,2,86,255,50,4,92,255,51,4,95,255,51,4,95,255,51,4,95,255,51,4,95,255,52,5,98,255,52,5,98,255,52,5,98,255,54,5,101,255,54,5,101,255,55,6,104,255,55,6,104,255,55,6,104,255,57,7,107,255,57,7,107,255,58,7,111,255,58,7,111,255,58,7,111,255,59,8,114,255,59,8,114,255,61,9,117,255,61,9,117,255,61,9,117,255,62,9,120,255,62,9,120,255,62,9,120,255,64,10,123,255,64,10,123,255,65,10,126,255,65,10,126,255,65,10,126,255,66,11,129,255,66,11,129,255,68,12,132,255,68,12,132,255,68,12,132,255,69,12,135,255,69,12,135,255,71,13,138,255,71,13,138,255,71,13,138,255,72,14,141,255,72,14,141,255,72,14,141,255,74,14,144,255,74,14,144,255,75,15,147,255,75,15,147,255,75,15,147,255,76,15,151,255,76,15,151,255,78,16,154,255,78,16,154,255,78,16,154,255,77,19,156,255,77,19,156,255,77,19,156,255,76,22,158,255,76,22,158,255,76,24,161,255,76,24,161,255,76,24,161,255,75,27,163,255,75,27,163,255,74,30,165,255,74,30,165,255,74,30,165,255,73,32,168,255,73,32,168,255,73,35,170,255,73,35,170,255,73,35,170,255,72,38,173,255,72,38,173,255,72,38,173,255,71,41,175,255,71,41,175,255,71,43,177,255,71,43,177,255,71,43,177,255,70,46,180,255,70,46,180,255,69,49,182,255,69,49,182,255,69,49,182,255,68,52,184,255,68,52,184,255,68,54,187,255,68,54,187,255,68,54,187,255,66,60,191,255,68,54,187,255,66,60,191,255,66,60,191,255,66,60,191,255,66,63,194,255,65,65,196,255,66,60,191,255,65,65,196,255,65,65,196,255,64,68,199,255,64,68,199,255,64,68,199,255,63,71,201,255,63,71,201,255,63,73,203,255,63,73,203,255,63,73,203,255,62,76,206,255,62,76,206,255,62,76,206,255,61,79,208,255,61,79,208,255,60,82,210,255,60,82,210,255,60,82,210,255,60,84,213,255,60,84,213,255,60,88,214,255,60,88,214,255,60,88,214,255,61,91,216,255,61,91,216,255,61,95,217,255,61,95,217,255,61,95,217,255,62,98,219,255,62,98,219,255,62,98,219,255,62,101,220,255,62,101,220,255,63,105,221,255,63,105,221,255,63,105,221,255,63,108,223,255,63,105,221,255,64,112,224,255,64,112,224,255,64,112,224,255,64,115,226,255,64,115,226,255,65,119,227,255,65,119,227,255,65,119,227,255,65,122,229,255,65,122,229,255,65,122,229,255,66,125,230,255,66,125,230,255,66,129,231,255,66,129,231,255,66,129,231,255,66,132,233,255,66,132,233,255,67,136,234,255,67,136,234,255,67,136,234,255,67,139,236,255,67,139,236,255,68,143,237,255,68,143,237,255,68,143,237,255,68,146,239,255,68,146,239,255,68,146,239,255,69,149,240,255,69,149,240,255,69,153,241,255,69,153,241,255,69,153,241,255,70,156,243,255,69,153,241,255,71,163,246,255,70,156,243,255,71,163,246,255,71,163,246,255,71,163,246,255,71,167,247,255,71,167,247,255,71,167,247,255,72,170,249,255,72,170,249,255,72,170,249,255,77,173,249,255,77,173,249,255,82,175,249,255,82,175,249,255,82,175,249,255,87,178,249,255,87,178,249,255,92,181,250,255,92,181,250,255,92,181,250,255,97,183,250,255,97,183,250,255,97,183,250,255,102,186,250,255,102,186,250,255,107,189,250,255,107,189,250,255,107,189,250,255,112,191,251,255,112,191,251,255,117,194,251,255,117,194,251,255,117,194,251,255,122,197,251,255,122,197,251,255,127,200,251,255,127,200,251,255,127,200,251,255,132,202,252,255,132,202,252,255,132,202,252,255,137,205,252,255,137,205,252,255,142,208,252,255,142,208,252,255,142,208,252,255,147,210,253,255,147,210,253,255,152,213,253,255,152,213,253,255,152,213,253,255,157,216,253,255,157,216,253,255,162,218,253,255,162,218,253,255,162,218,253,255,167,221,254,255,167,221,254,255,167,221,254,255,172,224,254,255,172,224,254,255,177,226,254,255,177,226,254,255,177,226,254,255,182,229,254,255,182,229,254,255,187,232,255,255,187,232,255,255,187,232,255,255,192,235,255,255,192,235,255,255,197,237,255,255,197,237,255,255,197,237,255,255,197,237,255,255,197,237,255,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.deepSeaColors = map ;
	 var map = undefined; 

	 /* processing plumColors colormap */ 
	 var map = {}; 
	 map.name = "plumColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 0,1,0,255,0,1,0,255,0,1,0,255,5,2,1,255,5,2,1,255,10,3,2,255,10,3,2,255,10,3,2,255,15,4,3,255,15,4,3,255,20,5,4,255,20,5,4,255,20,5,4,255,25,6,6,255,25,6,6,255,30,8,7,255,30,8,7,255,30,8,7,255,35,9,8,255,35,9,8,255,35,9,8,255,40,10,9,255,40,10,9,255,45,11,10,255,45,11,10,255,45,11,10,255,50,12,12,255,50,12,12,255,55,13,13,255,55,13,13,255,55,13,13,255,61,15,14,255,61,15,14,255,66,16,15,255,66,16,15,255,66,16,15,255,71,17,16,255,71,17,16,255,71,17,16,255,74,18,18,255,74,18,18,255,77,19,20,255,77,19,20,255,77,19,20,255,79,20,23,255,79,20,23,255,82,22,25,255,82,22,25,255,82,22,25,255,84,23,27,255,84,23,27,255,87,24,29,255,87,24,29,255,87,24,29,255,89,25,31,255,89,25,31,255,89,25,31,255,92,26,34,255,92,26,34,255,94,27,36,255,94,27,36,255,94,27,36,255,97,28,38,255,97,28,38,255,99,30,40,255,99,30,40,255,99,30,40,255,102,31,42,255,102,31,42,255,102,31,42,255,104,32,45,255,104,32,45,255,107,33,47,255,107,33,47,255,107,33,47,255,109,34,49,255,109,34,49,255,110,36,52,255,110,36,52,255,110,36,52,255,111,37,54,255,111,37,54,255,112,38,57,255,112,38,57,255,112,38,57,255,113,40,59,255,113,40,59,255,113,40,59,255,114,41,62,255,114,41,62,255,114,41,62,255,116,44,67,255,114,41,62,255,116,44,67,255,116,44,67,255,117,45,70,255,117,45,70,255,117,45,70,255,118,46,72,255,118,46,72,255,119,48,75,255,119,48,75,255,119,48,75,255,119,48,75,255,120,50,80,255,120,50,80,255,120,50,80,255,120,50,80,255,120,50,80,255,122,53,85,255,122,53,85,255,121,52,83,255,123,55,87,255,123,55,87,255,123,55,87,255,123,55,87,255,123,57,90,255,123,57,90,255,123,58,92,255,123,58,92,255,123,58,92,255,124,60,94,255,124,60,94,255,124,60,94,255,124,62,97,255,124,62,97,255,125,64,99,255,125,64,99,255,124,62,97,255,126,69,106,255,125,64,99,255,126,69,106,255,126,69,106,255,126,69,106,255,126,69,106,255,126,69,106,255,126,71,108,255,126,71,108,255,126,71,108,255,127,73,111,255,127,73,111,255,127,73,111,255,127,74,113,255,127,74,113,255,127,76,115,255,127,76,115,255,127,74,113,255,128,80,119,255,128,80,119,255,128,80,119,255,128,80,119,255,128,80,119,255,129,83,121,255,129,83,121,255,130,85,122,255,130,85,122,255,130,85,122,255,131,88,124,255,131,88,124,255,131,88,124,255,131,90,125,255,131,90,125,255,132,93,127,255,132,93,127,255,132,93,127,255,133,95,128,255,133,95,128,255,134,98,130,255,134,98,130,255,134,98,130,255,135,100,131,255,135,100,131,255,135,103,133,255,135,103,133,255,135,103,133,255,136,105,134,255,136,105,134,255,136,105,134,255,137,108,136,255,137,108,136,255,138,110,137,255,138,110,137,255,138,110,137,255,138,113,138,255,138,113,138,255,140,116,139,255,140,116,139,255,140,116,139,255,142,119,139,255,142,119,139,255,144,122,139,255,144,122,139,255,144,122,139,255,146,126,139,255,146,126,139,255,146,126,139,255,149,129,139,255,149,129,139,255,151,133,139,255,151,133,139,255,151,133,139,255,153,136,139,255,153,136,139,255,155,140,139,255,155,140,139,255,155,140,139,255,157,143,139,255,157,143,139,255,157,143,139,255,159,146,139,255,159,146,139,255,161,150,139,255,161,150,139,255,161,150,139,255,164,153,139,255,164,153,139,255,166,157,139,255,166,157,139,255,166,157,139,255,168,160,139,255,168,160,139,255,171,164,139,255,171,164,139,255,171,164,139,255,175,169,137,255,175,169,137,255,175,169,137,255,180,173,135,255,180,173,135,255,184,178,133,255,184,178,133,255,184,178,133,255,189,182,130,255,189,182,130,255,193,187,128,255,193,187,128,255,193,187,128,255,198,192,126,255,198,192,126,255,202,196,124,255,202,196,124,255,202,196,124,255,207,201,122,255,207,201,122,255,207,201,122,255,211,205,120,255,211,205,120,255,216,210,118,255,216,210,118,255,216,210,118,255,220,215,116,255,220,215,116,255,225,219,114,255,225,219,114,255,225,219,114,255,229,224,112,255,229,224,112,255,234,229,110,255,234,229,110,255,234,229,110,255,234,229,110,255,234,229,110,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.plumColors = map ;
	 var map = undefined; 

	 /* processing armyColors colormap */ 
	 var map = {}; 
	 map.name = "armyColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 116,152,129,255,116,152,129,255,116,152,129,255,116,152,129,255,116,152,129,255,117,152,126,255,117,152,126,255,117,152,126,255,117,152,126,255,117,152,126,255,117,152,126,255,117,152,123,255,117,152,126,255,117,152,123,255,117,152,123,255,117,152,123,255,117,152,119,255,117,152,123,255,117,152,123,255,117,152,119,255,117,152,123,255,117,152,119,255,117,152,119,255,117,152,119,255,117,152,115,255,117,152,119,255,117,152,115,255,117,152,119,255,117,152,115,255,117,152,115,255,117,152,115,255,117,152,115,255,117,152,115,255,117,152,115,255,118,152,112,255,117,152,115,255,118,152,112,255,117,152,115,255,118,152,112,255,117,152,115,255,121,152,111,255,117,152,115,255,121,152,111,255,117,152,115,255,121,152,111,255,121,152,111,255,121,152,111,255,121,152,111,255,121,152,111,255,124,152,110,255,121,152,111,255,124,152,110,255,121,152,111,255,121,152,111,255,124,152,110,255,124,152,110,255,124,152,110,255,124,152,110,255,124,152,110,255,124,152,110,255,124,152,110,255,124,152,110,255,128,152,109,255,124,152,110,255,128,152,109,255,124,152,110,255,128,152,109,255,128,152,109,255,124,152,110,255,128,152,109,255,128,152,109,255,128,152,109,255,128,152,109,255,128,152,109,255,128,152,109,255,132,152,109,255,132,152,109,255,132,152,109,255,132,152,109,255,132,152,109,255,132,152,109,255,132,152,109,255,136,152,109,255,132,152,109,255,136,152,109,255,132,152,109,255,136,152,109,255,132,152,109,255,136,152,109,255,136,152,109,255,136,152,109,255,136,152,109,255,136,152,109,255,136,152,109,255,139,152,108,255,139,152,108,255,139,152,108,255,139,152,108,255,141,152,108,255,141,152,108,255,141,152,108,255,143,151,108,255,143,151,108,255,140,152,108,255,140,152,108,255,140,152,108,255,140,152,108,255,144,150,108,255,143,151,108,255,143,151,108,255,144,150,108,255,144,150,108,255,144,150,108,255,144,150,108,255,144,150,108,255,144,150,108,255,144,150,108,255,144,150,108,255,148,148,108,255,144,150,108,255,148,148,108,255,144,150,108,255,148,148,108,255,144,150,108,255,147,148,108,255,147,148,108,255,148,148,108,255,148,148,108,255,148,148,108,255,148,148,108,255,148,148,108,255,148,148,108,255,151,144,110,255,150,146,109,255,148,148,108,255,150,146,109,255,148,148,108,255,151,144,110,255,148,148,108,255,150,146,109,255,150,146,109,255,148,148,108,255,151,144,110,255,151,144,110,255,148,148,108,255,152,143,110,255,148,148,108,255,152,143,110,255,151,144,110,255,151,144,110,255,151,144,110,255,151,144,110,255,151,144,110,255,151,144,110,255,152,143,110,255,152,143,110,255,152,143,110,255,152,143,110,255,152,143,110,255,152,143,110,255,152,143,110,255,152,143,110,255,154,143,112,255,152,143,110,255,154,143,112,255,154,143,112,255,154,143,112,255,154,143,112,255,155,145,115,255,154,143,112,255,156,145,116,255,154,143,112,255,155,145,115,255,155,145,115,255,155,145,115,255,156,145,116,255,156,145,116,255,156,145,116,255,159,148,119,255,156,145,116,255,159,148,119,255,159,148,119,255,159,148,119,255,156,145,116,255,159,148,119,255,159,148,119,255,159,148,119,255,159,148,119,255,159,149,120,255,159,149,120,255,162,152,124,255,159,149,120,255,159,149,120,255,159,149,120,255,162,152,124,255,162,152,124,255,162,152,124,255,162,152,124,255,163,154,126,255,163,154,126,255,163,154,126,255,165,157,128,255,165,157,128,255,166,159,130,255,166,159,130,255,165,157,128,255,168,161,131,255,168,161,131,255,168,161,131,255,169,164,133,255,169,164,133,255,171,166,135,255,171,166,135,255,171,166,135,255,172,168,137,255,172,168,137,255,174,170,139,255,174,170,139,255,174,170,139,255,175,173,141,255,175,173,141,255,177,175,143,255,177,175,143,255,177,175,143,255,178,177,145,255,178,177,145,255,178,177,145,255,180,179,146,255,180,179,146,255,181,180,148,255,181,180,148,255,181,180,148,255,182,182,150,255,182,182,150,255,183,183,152,255,183,183,152,255,183,183,152,255,185,184,153,255,185,184,153,255,186,186,155,255,186,186,155,255,186,186,155,255,187,187,157,255,187,187,157,255,187,187,157,255,188,188,159,255,188,188,159,255,190,189,160,255,190,189,160,255,190,189,160,255,192,192,164,255,192,192,164,255,192,192,164,255,192,192,164,255,192,192,164,255,195,194,167,255,195,194,167,255,195,194,167,255,195,194,167,255,195,194,167,255,195,194,167,255,195,194,167,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.armyColors = map ;
	 var map = undefined; 

	 /* processing fallColors colormap */ 
	 var map = {}; 
	 map.name = "fallColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 66,102,101,255,66,102,101,255,66,102,101,255,67,102,99,255,67,102,99,255,69,102,97,255,69,102,97,255,69,102,97,255,69,102,97,255,69,102,97,255,72,102,94,255,72,102,94,255,72,102,94,255,75,102,91,255,72,102,94,255,75,102,91,255,75,102,91,255,75,102,91,255,76,102,89,255,76,102,89,255,76,102,89,255,78,102,87,255,78,102,87,255,78,102,87,255,81,102,84,255,78,102,87,255,81,102,84,255,81,102,84,255,82,102,82,255,82,102,82,255,82,102,82,255,84,102,81,255,84,102,81,255,85,102,79,255,85,102,79,255,85,102,79,255,89,102,74,255,85,102,79,255,85,102,79,255,88,102,76,255,88,102,76,255,89,102,74,255,89,102,74,255,89,102,74,255,91,101,73,255,91,101,73,255,92,100,72,255,92,100,72,255,92,100,72,255,94,99,71,255,94,99,71,255,94,99,71,255,96,97,69,255,94,99,71,255,96,97,69,255,96,97,69,255,96,97,69,255,98,96,69,255,98,96,69,255,99,95,68,255,99,95,68,255,99,95,68,255,100,94,67,255,100,94,67,255,103,92,66,255,103,92,66,255,103,92,66,255,103,92,66,255,103,92,66,255,103,92,66,255,103,92,66,255,103,92,66,255,107,88,63,255,107,88,63,255,103,92,66,255,107,88,63,255,107,88,63,255,108,87,63,255,108,87,63,255,108,87,63,255,111,85,61,255,111,85,61,255,111,85,61,255,111,85,61,255,111,85,61,255,112,84,60,255,112,84,60,255,112,84,60,255,112,84,60,255,116,84,60,255,116,84,60,255,116,84,60,255,116,84,60,255,119,84,59,255,119,84,59,255,121,84,59,255,121,84,59,255,123,84,59,255,123,84,59,255,123,84,59,255,125,84,59,255,125,84,59,255,127,84,58,255,129,84,58,255,123,84,59,255,127,84,58,255,131,84,58,255,127,84,58,255,131,84,58,255,131,84,58,255,131,84,58,255,135,85,57,255,131,84,58,255,135,85,57,255,135,85,57,255,135,85,57,255,142,85,57,255,135,85,57,255,142,85,57,255,135,85,57,255,142,85,57,255,142,85,57,255,142,85,57,255,142,85,57,255,144,85,56,255,144,85,56,255,144,85,56,255,148,85,56,255,148,85,56,255,148,85,56,255,148,85,56,255,151,87,56,255,151,87,56,255,151,87,56,255,154,89,56,255,154,89,56,255,157,91,56,255,157,91,56,255,157,91,56,255,160,93,56,255,160,93,56,255,160,93,56,255,168,99,56,255,160,93,56,255,168,99,56,255,160,93,56,255,168,99,56,255,168,99,56,255,168,99,56,255,171,101,56,255,171,101,56,255,171,101,56,255,174,103,56,255,174,103,56,255,177,105,56,255,177,105,56,255,177,105,56,255,179,107,56,255,179,107,56,255,179,107,56,255,182,109,56,255,182,109,56,255,185,111,56,255,185,111,56,255,185,111,56,255,188,113,56,255,188,113,56,255,191,115,56,255,191,115,56,255,191,115,56,255,194,117,56,255,194,117,56,255,196,120,56,255,196,120,56,255,196,120,56,255,199,123,56,255,199,123,56,255,199,123,56,255,202,126,56,255,202,126,56,255,204,129,56,255,204,129,56,255,204,129,56,255,207,132,57,255,204,129,56,255,212,139,57,255,207,132,57,255,212,139,57,255,212,139,57,255,212,139,57,255,214,142,57,255,214,142,57,255,214,142,57,255,217,145,57,255,217,145,57,255,217,145,57,255,220,148,58,255,220,148,58,255,222,151,58,255,222,151,58,255,222,151,58,255,225,154,58,255,225,154,58,255,227,158,58,255,227,158,58,255,227,158,58,255,230,161,58,255,230,161,58,255,230,161,58,255,233,164,58,255,233,164,58,255,235,167,59,255,235,167,59,255,235,167,59,255,238,170,59,255,238,170,59,255,239,173,59,255,239,173,59,255,239,173,59,255,239,175,60,255,239,175,60,255,240,176,60,255,240,176,60,255,240,176,60,255,240,178,60,255,240,178,60,255,240,178,60,255,241,180,61,255,241,180,61,255,241,184,62,255,241,180,61,255,241,184,62,255,241,184,62,255,241,184,62,255,241,184,62,255,243,190,63,255,241,184,62,255,243,190,63,255,243,190,63,255,243,190,63,255,243,190,63,255,243,190,63,255,243,192,64,255,243,192,64,255,243,192,64,255,243,194,64,255,243,194,64,255,244,196,65,255,244,196,65,255,244,196,65,255,244,198,65,255,244,198,65,255,245,200,66,255,245,200,66,255,245,200,66,255,245,200,66,255,246,204,66,255,246,204,66,255,246,204,66,255,246,204,66,255,246,204,66,255,246,204,66,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.fallColors = map ;
	 var map = undefined; 

	 /* processing rainbow colormap */ 
	 var map = {}; 
	 map.name = "rainbow" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 120,28,134,255,120,28,134,255,120,28,134,255,114,29,140,255,114,29,140,255,107,29,146,255,107,29,146,255,107,29,146,255,100,29,151,255,100,29,151,255,94,30,157,255,94,30,157,255,94,30,157,255,87,30,163,255,87,30,163,255,81,31,168,255,81,31,168,255,81,31,168,255,77,34,173,255,77,34,173,255,77,34,173,255,75,38,177,255,75,38,177,255,72,43,181,255,72,43,181,255,72,43,181,255,70,47,186,255,70,47,186,255,67,52,190,255,67,52,190,255,67,52,190,255,65,56,194,255,65,56,194,255,64,61,197,255,64,61,197,255,64,61,197,255,63,67,199,255,63,67,199,255,63,67,199,255,63,72,201,255,63,72,201,255,63,78,203,255,63,78,203,255,63,78,203,255,62,83,205,255,62,83,205,255,62,89,207,255,62,89,207,255,62,89,207,255,62,94,208,255,62,94,208,255,63,99,208,255,63,99,208,255,63,99,208,255,64,105,207,255,64,105,207,255,64,105,207,255,65,110,207,255,65,110,207,255,66,115,206,255,66,115,206,255,66,115,206,255,67,120,205,255,67,120,205,255,68,125,205,255,68,125,205,255,68,125,205,255,69,129,202,255,69,129,202,255,69,129,202,255,71,133,200,255,71,133,200,255,73,137,197,255,73,137,197,255,73,137,197,255,74,141,195,255,74,141,195,255,76,145,192,255,76,145,192,255,76,145,192,255,77,149,189,255,77,149,189,255,79,153,186,255,79,153,186,255,79,153,186,255,82,155,182,255,82,155,182,255,82,155,182,255,84,158,178,255,84,158,178,255,86,161,174,255,86,161,174,255,86,161,174,255,88,164,171,255,88,164,171,255,91,167,167,255,91,167,167,255,91,167,167,255,93,169,163,255,93,169,163,255,96,171,158,255,96,171,158,255,96,171,158,255,99,173,154,255,99,173,154,255,99,173,154,255,102,175,150,255,102,175,150,255,105,177,145,255,105,177,145,255,105,177,145,255,107,179,141,255,107,179,141,255,110,180,137,255,110,180,137,255,110,180,137,255,114,182,133,255,114,182,133,255,117,183,129,255,117,183,129,255,117,183,129,255,121,184,125,255,121,184,125,255,121,184,125,255,124,185,120,255,124,185,120,255,128,186,116,255,128,186,116,255,128,186,116,255,131,187,112,255,131,187,112,255,135,188,109,255,135,188,109,255,135,188,109,255,139,188,106,255,139,188,106,255,143,189,102,255,143,189,102,255,143,189,102,255,146,190,99,255,146,190,99,255,146,190,99,255,150,190,96,255,150,190,96,255,154,191,92,255,154,191,92,255,154,191,92,255,158,191,89,255,158,191,89,255,162,191,87,255,162,191,87,255,162,191,87,255,166,191,85,255,166,191,85,255,170,191,82,255,170,191,82,255,170,191,82,255,174,191,80,255,174,191,80,255,174,191,80,255,178,191,77,255,178,191,77,255,182,190,75,255,182,190,75,255,182,190,75,255,185,189,74,255,185,189,74,255,189,188,72,255,189,188,72,255,189,188,72,255,193,188,71,255,193,188,71,255,196,187,69,255,196,187,69,255,196,187,69,255,200,186,67,255,200,186,67,255,200,186,67,255,204,185,66,255,204,185,66,255,206,183,65,255,206,183,65,255,206,183,65,255,209,180,64,255,209,180,64,255,212,178,63,255,212,178,63,255,212,178,63,255,215,176,62,255,215,176,62,255,218,174,61,255,218,174,61,255,218,174,61,255,221,172,60,255,221,172,60,255,221,172,60,255,222,169,59,255,222,169,59,255,224,165,58,255,224,165,58,255,224,165,58,255,225,161,58,255,225,161,58,255,227,158,57,255,227,158,57,255,227,158,57,255,228,154,56,255,228,154,56,255,228,154,56,255,230,151,55,255,230,151,55,255,230,146,54,255,230,146,54,255,230,146,54,255,230,140,53,255,230,140,53,255,230,135,52,255,230,135,52,255,230,135,52,255,230,130,51,255,230,130,51,255,231,125,50,255,231,125,50,255,231,125,50,255,231,119,49,255,231,119,49,255,231,119,49,255,230,113,48,255,230,113,48,255,229,107,47,255,229,107,47,255,229,107,47,255,228,100,45,255,228,100,45,255,227,94,44,255,227,94,44,255,227,94,44,255,226,87,43,255,226,87,43,255,225,80,42,255,225,80,42,255,225,80,42,255,224,74,40,255,224,74,40,255,224,74,40,255,223,67,39,255,223,67,39,255,222,61,38,255,222,61,38,255,222,61,38,255,222,54,37,255,222,54,37,255,221,47,36,255,221,47,36,255,221,47,36,255,220,41,34,255,220,41,34,255,219,34,33,255,219,34,33,255,219,34,33,255,219,34,33,255,219,34,33,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.rainbow = map ;
	 var map = undefined; 

	 /* processing atlanticColors colormap */ 
	 var map = {}; 
	 map.name = "atlanticColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 33,41,41,255,33,41,41,255,33,41,41,255,35,44,44,255,35,44,44,255,37,46,46,255,37,46,46,255,37,46,46,255,39,48,48,255,39,48,48,255,40,51,51,255,40,51,51,255,40,51,51,255,42,53,53,255,42,53,53,255,44,56,55,255,44,56,55,255,44,56,55,255,46,58,58,255,46,58,58,255,46,58,58,255,47,60,60,255,47,60,60,255,49,63,62,255,49,63,62,255,49,63,62,255,51,65,65,255,51,65,65,255,53,67,67,255,53,67,67,255,53,67,67,255,55,70,69,255,55,70,69,255,56,72,72,255,56,72,72,255,56,72,72,255,58,74,74,255,58,74,74,255,58,74,74,255,61,78,78,255,61,78,78,255,64,82,82,255,64,82,82,255,64,82,82,255,66,86,86,255,66,86,86,255,69,90,90,255,69,90,90,255,69,90,90,255,72,94,94,255,72,94,94,255,75,98,98,255,75,98,98,255,75,98,98,255,78,102,103,255,78,102,103,255,78,102,103,255,81,106,107,255,81,106,107,255,84,110,111,255,84,110,111,255,84,110,111,255,87,114,115,255,87,114,115,255,90,118,119,255,90,118,119,255,90,118,119,255,93,122,123,255,93,122,123,255,93,122,123,255,95,126,127,255,95,126,127,255,98,130,132,255,98,130,132,255,98,130,132,255,101,133,135,255,101,133,135,255,102,136,138,255,102,136,138,255,102,136,138,255,104,139,141,255,104,139,141,255,106,141,144,255,106,141,144,255,106,141,144,255,107,144,147,255,107,144,147,255,107,144,147,255,109,147,151,255,109,147,151,255,111,149,154,255,111,149,154,255,111,149,154,255,112,152,157,255,112,152,157,255,114,154,160,255,114,154,160,255,114,154,160,255,116,157,163,255,116,157,163,255,117,160,166,255,117,160,166,255,117,160,166,255,119,162,169,255,119,162,169,255,119,162,169,255,120,165,172,255,120,165,172,255,120,165,172,255,124,171,179,255,120,165,172,255,124,171,179,255,124,171,179,255,124,171,179,255,124,171,179,255,124,171,179,255,125,172,181,255,125,172,181,255,126,173,182,255,126,173,182,255,126,173,182,255,126,174,184,255,126,174,184,255,126,174,184,255,128,176,187,255,128,176,187,255,128,176,187,255,128,176,187,255,128,176,187,255,128,177,189,255,128,177,189,255,131,180,193,255,128,177,189,255,128,177,189,255,130,179,192,255,130,179,192,255,131,180,193,255,131,180,193,255,131,180,193,255,131,181,195,255,131,181,195,255,131,181,195,255,132,182,197,255,132,182,197,255,132,182,197,255,134,184,200,255,132,182,197,255,133,184,200,255,133,184,200,255,135,184,201,255,133,184,200,255,135,184,201,255,135,184,201,255,135,184,201,255,138,185,204,255,135,184,201,255,135,184,201,255,136,185,202,255,136,185,202,255,136,185,202,255,138,185,204,255,136,185,202,255,138,185,204,255,138,185,204,255,138,185,204,255,140,185,205,255,138,185,204,255,140,185,205,255,140,185,205,255,140,185,205,255,143,185,208,255,140,185,205,255,143,185,208,255,140,185,205,255,140,185,205,255,143,185,208,255,144,185,209,255,140,185,205,255,143,185,208,255,143,185,208,255,143,185,208,255,143,185,208,255,143,185,208,255,144,185,209,255,144,185,209,255,145,185,209,255,145,185,209,255,145,185,209,255,147,183,209,255,145,185,209,255,147,183,209,255,145,185,209,255,147,183,209,255,147,183,209,255,147,183,209,255,147,183,209,255,147,183,209,255,147,183,209,255,147,183,209,255,147,183,209,255,147,183,209,255,153,179,207,255,147,183,209,255,153,179,207,255,147,183,209,255,153,179,207,255,151,180,207,255,151,180,207,255,151,180,207,255,152,179,207,255,152,179,207,255,153,179,207,255,153,179,207,255,153,179,207,255,153,179,207,255,152,179,207,255,152,179,207,255,155,177,206,255,155,177,206,255,155,177,206,255,155,177,206,255,155,175,205,255,155,175,205,255,155,175,205,255,153,172,202,255,153,172,202,255,153,172,202,255,150,168,198,255,150,168,198,255,148,165,195,255,148,165,195,255,148,165,195,255,146,162,192,255,146,162,192,255,143,158,189,255,143,158,189,255,143,158,189,255,141,155,185,255,141,155,185,255,139,152,182,255,139,152,182,255,139,152,182,255,136,148,179,255,136,148,179,255,136,148,179,255,134,145,175,255,134,145,175,255,132,142,172,255,132,142,172,255,132,142,172,255,129,138,169,255,129,138,169,255,127,135,166,255,127,135,166,255,127,135,166,255,125,131,162,255,125,131,162,255,122,128,159,255,122,128,159,255,122,128,159,255,122,128,159,255,122,128,159,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.atlanticColors = map ;
	 var map = undefined; 

	 /* processing fruitPunchColors colormap */ 
	 var map = {}; 
	 map.name = "fruitPunchColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 255,128,0,255,255,128,0,255,255,128,0,255,255,130,0,255,255,130,0,255,255,132,0,255,255,132,0,255,255,132,0,255,255,132,0,255,255,136,0,255,255,136,0,255,255,136,0,255,255,136,0,255,255,136,0,255,254,140,0,255,254,140,0,255,254,140,0,255,254,140,0,255,254,140,0,255,254,144,0,255,254,140,0,255,254,144,0,255,254,144,0,255,253,151,0,255,254,144,0,255,253,151,0,255,254,144,0,255,253,151,0,255,253,151,0,255,254,144,0,255,253,151,0,255,253,151,0,255,253,151,0,255,253,153,0,255,253,153,0,255,253,153,0,255,253,153,0,255,252,157,1,255,252,157,1,255,252,157,1,255,252,157,1,255,250,158,1,255,250,158,1,255,250,158,1,255,247,160,3,255,250,158,1,255,247,160,3,255,247,160,3,255,247,160,3,255,245,161,3,255,245,161,3,255,243,162,4,255,243,162,4,255,243,162,4,255,240,165,5,255,243,162,4,255,243,162,4,255,240,165,5,255,240,165,5,255,239,166,6,255,239,166,6,255,240,165,5,255,235,168,7,255,239,166,6,255,235,168,7,255,235,168,7,255,235,168,7,255,234,169,8,255,234,169,8,255,234,169,8,255,229,172,10,255,234,169,8,255,230,171,9,255,230,171,9,255,230,171,9,255,229,172,10,255,229,172,10,255,227,172,13,255,227,172,13,255,227,172,13,255,226,172,15,255,226,172,15,255,226,172,15,255,222,171,19,255,226,172,15,255,222,171,19,255,222,171,19,255,222,171,19,255,221,171,22,255,219,171,24,255,219,171,24,255,219,171,24,255,219,171,24,255,218,170,26,255,218,170,26,255,216,170,28,255,216,170,28,255,216,170,28,255,214,170,31,255,214,170,31,255,213,170,33,255,213,170,33,255,213,170,33,255,211,170,35,255,211,170,35,255,211,170,35,255,210,169,37,255,210,169,37,255,208,169,39,255,208,169,39,255,208,169,39,255,207,169,42,255,207,169,42,255,206,167,46,255,206,167,46,255,206,167,46,255,205,166,49,255,205,166,49,255,204,164,53,255,204,164,53,255,204,164,53,255,204,163,57,255,204,163,57,255,204,163,57,255,203,161,60,255,203,161,60,255,202,159,64,255,202,159,64,255,202,159,64,255,202,158,68,255,202,158,68,255,201,156,72,255,201,156,72,255,201,156,72,255,200,155,75,255,200,155,75,255,199,153,79,255,199,153,79,255,199,153,79,255,199,152,83,255,199,152,83,255,199,152,83,255,198,150,86,255,198,150,86,255,197,149,90,255,197,149,90,255,197,149,90,255,197,147,94,255,197,147,94,255,197,145,98,255,197,145,98,255,197,145,98,255,197,142,102,255,197,142,102,255,198,140,106,255,198,140,106,255,198,140,106,255,198,138,110,255,198,138,110,255,198,138,110,255,199,136,114,255,199,136,114,255,199,133,118,255,199,133,118,255,199,133,118,255,200,131,122,255,200,131,122,255,200,129,126,255,200,129,126,255,200,129,126,255,201,126,130,255,201,126,130,255,201,124,134,255,201,124,134,255,201,124,134,255,202,122,138,255,202,122,138,255,202,122,138,255,202,119,142,255,202,119,142,255,203,117,146,255,203,117,146,255,203,117,146,255,203,115,150,255,203,115,150,255,204,113,153,255,204,113,153,255,204,113,153,255,206,111,155,255,206,111,155,255,207,109,157,255,207,109,157,255,207,109,157,255,208,107,159,255,208,107,159,255,208,107,159,255,210,105,161,255,210,105,161,255,211,104,164,255,211,104,164,255,211,104,164,255,213,102,166,255,213,102,166,255,214,100,168,255,214,100,168,255,214,100,168,255,215,98,170,255,215,98,170,255,215,98,170,255,217,96,172,255,215,98,170,255,217,96,172,255,221,91,178,255,217,96,172,255,220,92,176,255,220,92,176,255,221,91,178,255,221,91,178,255,221,91,178,255,222,89,180,255,222,89,180,255,224,88,181,255,224,88,181,255,224,88,181,255,225,88,178,255,225,88,178,255,225,88,178,255,227,88,175,255,227,88,175,255,228,89,172,255,228,89,172,255,228,89,172,255,230,89,169,255,230,89,169,255,231,89,166,255,231,89,166,255,231,89,166,255,233,90,163,255,233,90,163,255,236,91,157,255,233,90,163,255,233,90,163,255,236,91,157,255,236,91,157,255,236,91,157,255,237,91,154,255,237,91,154,255,239,91,151,255,239,91,151,255,239,91,151,255,240,92,147,255,240,92,147,255,242,92,144,255,242,92,144,255,242,92,144,255,243,93,141,255,243,93,141,255,245,93,138,255,245,93,138,255,245,93,138,255,245,93,138,255,245,93,138,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.fruitPunchColors = map ;
	 var map = undefined; 

	 /* processing redBlueTones colormap */ 
	 var map = {}; 
	 map.name = "redBlueTones" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 115,41,55,255,115,41,55,255,115,41,55,255,119,44,57,255,119,44,57,255,122,46,59,255,122,46,59,255,122,46,59,255,126,49,61,255,126,49,61,255,130,52,63,255,130,52,63,255,130,52,63,255,134,54,65,255,134,54,65,255,138,57,67,255,138,57,67,255,138,57,67,255,142,60,69,255,142,60,69,255,142,60,69,255,145,62,71,255,145,62,71,255,149,65,73,255,149,65,73,255,149,65,73,255,153,68,75,255,153,68,75,255,156,72,78,255,156,72,78,255,156,72,78,255,159,77,80,255,159,77,80,255,162,81,83,255,162,81,83,255,162,81,83,255,165,85,86,255,165,85,86,255,165,85,86,255,169,90,88,255,169,90,88,255,172,94,91,255,172,94,91,255,172,94,91,255,175,99,94,255,175,99,94,255,178,103,97,255,178,103,97,255,178,103,97,255,181,107,99,255,181,107,99,255,184,112,102,255,184,112,102,255,184,112,102,255,187,116,105,255,187,116,105,255,187,116,105,255,189,121,107,255,189,121,107,255,191,126,110,255,191,126,110,255,191,126,110,255,194,130,113,255,194,130,113,255,196,135,116,255,196,135,116,255,196,135,116,255,198,140,118,255,198,140,118,255,198,140,118,255,201,145,121,255,201,145,121,255,203,149,124,255,203,149,124,255,203,149,124,255,205,154,127,255,205,154,127,255,208,159,129,255,208,159,129,255,208,159,129,255,209,162,132,255,209,162,132,255,210,166,135,255,210,166,135,255,210,166,135,255,212,170,138,255,212,170,138,255,212,170,138,255,213,174,141,255,213,174,141,255,214,178,144,255,214,178,144,255,214,178,144,255,216,182,147,255,216,182,147,255,217,185,150,255,217,185,150,255,217,185,150,255,218,189,153,255,218,189,153,255,220,193,156,255,220,193,156,255,220,193,156,255,221,197,159,255,221,197,159,255,221,197,159,255,221,199,162,255,221,199,162,255,221,201,165,255,221,201,165,255,221,201,165,255,220,203,168,255,220,203,168,255,220,205,171,255,220,205,171,255,220,205,171,255,220,207,173,255,220,207,173,255,220,209,176,255,220,209,176,255,220,209,176,255,220,211,179,255,220,211,179,255,220,211,179,255,219,214,182,255,219,214,182,255,219,216,185,255,219,216,185,255,219,216,185,255,219,218,188,255,219,218,188,255,219,218,188,255,215,218,192,255,219,218,188,255,215,218,192,255,215,218,192,255,212,218,194,255,212,218,194,255,212,218,194,255,210,218,195,255,210,218,195,255,210,218,195,255,208,218,197,255,208,218,197,255,206,218,199,255,206,218,199,255,206,218,199,255,204,218,201,255,204,218,201,255,201,218,203,255,201,218,203,255,201,218,203,255,199,218,205,255,199,218,205,255,197,218,207,255,197,218,207,255,197,218,207,255,193,216,208,255,193,216,208,255,193,216,208,255,189,214,208,255,189,214,208,255,185,212,209,255,185,212,209,255,185,212,209,255,182,211,209,255,182,211,209,255,178,209,210,255,178,209,210,255,178,209,210,255,174,207,210,255,174,207,210,255,170,206,211,255,170,206,211,255,170,206,211,255,166,204,211,255,166,204,211,255,166,204,211,255,162,202,212,255,162,202,212,255,158,200,212,255,158,200,212,255,158,200,212,255,153,198,211,255,153,198,211,255,149,195,210,255,149,195,210,255,149,195,210,255,144,192,209,255,144,192,209,255,139,189,208,255,139,189,208,255,139,189,208,255,134,186,207,255,134,186,207,255,134,186,207,255,130,184,207,255,130,184,207,255,125,181,206,255,125,181,206,255,125,181,206,255,120,178,205,255,120,178,205,255,115,175,204,255,115,175,204,255,115,175,204,255,111,172,203,255,111,172,203,255,111,172,203,255,106,168,201,255,106,168,201,255,101,165,199,255,101,165,199,255,101,165,199,255,97,161,196,255,97,161,196,255,92,157,194,255,92,157,194,255,92,157,194,255,88,153,192,255,88,153,192,255,83,150,190,255,83,150,190,255,83,150,190,255,79,146,188,255,79,146,188,255,79,146,188,255,74,142,186,255,74,142,186,255,70,138,184,255,70,138,184,255,70,138,184,255,65,134,182,255,65,134,182,255,62,129,178,255,62,129,178,255,62,129,178,255,59,124,173,255,59,124,173,255,56,118,169,255,56,118,169,255,56,118,169,255,53,113,165,255,53,113,165,255,53,113,165,255,50,107,161,255,50,107,161,255,47,102,157,255,47,102,157,255,47,102,157,255,44,97,153,255,44,97,153,255,41,91,149,255,41,91,149,255,41,91,149,255,38,86,145,255,38,86,145,255,35,80,140,255,35,80,140,255,35,80,140,255,35,80,140,255,35,80,140,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.redBlueTones = map ;
	 var map = undefined; 

	 /* processing auroraColors colormap */ 
	 var map = {}; 
	 map.name = "auroraColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 66,67,66,255,66,67,66,255,66,67,66,255,64,66,69,255,64,66,69,255,62,64,73,255,62,64,73,255,62,64,73,255,60,63,76,255,60,63,76,255,58,62,79,255,58,62,79,255,58,62,79,255,57,61,83,255,57,61,83,255,55,60,86,255,55,60,86,255,55,60,86,255,53,58,89,255,53,58,89,255,53,58,89,255,52,57,92,255,52,57,92,255,52,57,92,255,56,56,95,255,52,57,92,255,56,56,95,255,54,56,94,255,56,56,95,255,56,56,95,255,56,56,95,255,57,55,96,255,57,55,96,255,58,55,97,255,58,55,97,255,58,55,97,255,60,53,99,255,58,55,97,255,60,53,99,255,60,53,99,255,60,53,99,255,62,54,99,255,62,54,99,255,60,53,99,255,67,55,98,255,67,55,98,255,65,54,99,255,70,56,98,255,65,54,99,255,70,56,98,255,67,55,98,255,78,58,97,255,70,56,98,255,70,56,98,255,75,57,97,255,75,57,97,255,75,57,97,255,78,58,97,255,78,58,97,255,80,58,97,255,80,58,97,255,80,58,97,255,83,60,96,255,83,60,96,255,86,62,96,255,86,62,96,255,88,64,95,255,88,64,95,255,88,64,95,255,88,64,95,255,91,66,94,255,91,66,94,255,94,68,94,255,94,68,94,255,94,68,94,255,97,70,93,255,97,70,93,255,100,72,93,255,100,72,93,255,100,72,93,255,102,74,92,255,102,74,92,255,105,77,92,255,105,77,92,255,105,77,92,255,107,80,92,255,107,80,92,255,107,80,92,255,109,83,92,255,109,83,92,255,112,86,91,255,112,86,91,255,112,86,91,255,114,89,91,255,114,89,91,255,117,92,91,255,117,92,91,255,117,92,91,255,119,95,91,255,119,95,91,255,121,98,91,255,121,98,91,255,121,98,91,255,123,101,92,255,123,101,92,255,123,101,92,255,124,105,92,255,124,105,92,255,126,108,93,255,126,108,93,255,124,105,92,255,129,115,94,255,126,108,93,255,129,115,94,255,129,115,94,255,129,115,94,255,131,118,95,255,131,118,95,255,133,121,96,255,133,121,96,255,133,121,96,255,134,124,97,255,134,124,97,255,134,124,97,255,135,127,99,255,135,127,99,255,136,130,101,255,136,130,101,255,136,130,101,255,137,134,103,255,137,134,103,255,138,137,105,255,138,137,105,255,138,137,105,255,139,140,106,255,139,140,106,255,140,143,108,255,140,143,108,255,140,143,108,255,141,146,110,255,141,146,110,255,141,146,110,255,141,148,113,255,141,148,113,255,142,150,116,255,142,150,116,255,142,150,116,255,143,152,119,255,143,152,119,255,144,156,125,255,144,156,125,255,143,152,119,255,144,156,125,255,144,156,125,255,144,158,128,255,144,158,128,255,144,158,128,255,145,160,130,255,145,160,130,255,144,158,128,255,146,162,137,255,146,162,137,255,146,162,137,255,146,162,137,255,146,162,137,255,146,162,141,255,146,162,141,255,147,163,145,255,147,163,145,255,147,163,145,255,147,163,149,255,147,163,149,255,148,164,153,255,148,164,153,255,148,164,153,255,148,164,156,255,148,164,156,255,148,164,156,255,149,165,160,255,149,165,160,255,150,164,164,255,150,164,164,255,150,164,164,255,150,163,168,255,150,163,168,255,151,161,172,255,151,161,172,255,151,161,172,255,152,160,177,255,152,160,177,255,153,159,181,255,153,159,181,255,153,159,181,255,154,157,185,255,154,157,185,255,154,157,185,255,155,156,189,255,155,156,189,255,156,154,193,255,156,154,193,255,156,154,193,255,157,151,197,255,157,151,197,255,159,148,201,255,159,148,201,255,159,148,201,255,161,145,205,255,161,145,205,255,161,145,205,255,162,142,209,255,162,142,209,255,164,139,212,255,164,139,212,255,164,139,212,255,165,136,216,255,165,136,216,255,167,133,220,255,167,133,220,255,167,133,220,255,169,130,223,255,169,130,223,255,172,126,226,255,172,126,226,255,172,126,226,255,175,122,229,255,175,122,229,255,175,122,229,255,177,118,231,255,177,118,231,255,180,114,234,255,180,114,234,255,180,114,234,255,183,110,236,255,183,110,236,255,186,105,239,255,186,105,239,255,186,105,239,255,188,101,241,255,188,101,241,255,192,98,242,255,192,98,242,255,192,98,242,255,196,94,242,255,196,94,242,255,196,94,242,255,200,90,243,255,200,90,243,255,204,86,243,255,204,86,243,255,204,86,243,255,208,82,243,255,208,82,243,255,212,79,243,255,212,79,243,255,212,79,243,255,216,75,243,255,216,75,243,255,220,71,243,255,220,71,243,255,220,71,243,255,220,71,243,255,220,71,243,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.auroraColors = map ;
	 var map = undefined; 

	 /* processing fuchsiaTones colormap */ 
	 var map = {}; 
	 map.name = "fuchsiaTones" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 25,26,25,255,25,26,25,255,25,26,25,255,28,28,28,255,28,28,28,255,32,29,31,255,32,29,31,255,32,29,31,255,35,31,34,255,35,31,34,255,38,32,37,255,38,32,37,255,38,32,37,255,42,34,40,255,42,34,40,255,45,35,43,255,45,35,43,255,45,35,43,255,48,37,46,255,48,37,46,255,48,37,46,255,51,38,49,255,51,38,49,255,55,40,52,255,55,40,52,255,55,40,52,255,58,41,55,255,58,41,55,255,61,43,58,255,61,43,58,255,61,43,58,255,65,44,61,255,65,44,61,255,68,46,64,255,68,46,64,255,68,46,64,255,71,47,67,255,71,47,67,255,71,47,67,255,74,49,70,255,74,49,70,255,78,50,73,255,78,50,73,255,78,50,73,255,81,52,76,255,81,52,76,255,84,53,79,255,84,53,79,255,84,53,79,255,88,55,82,255,88,55,82,255,91,56,85,255,91,56,85,255,91,56,85,255,94,58,88,255,94,58,88,255,94,58,88,255,97,59,90,255,97,59,90,255,100,61,93,255,100,61,93,255,100,61,93,255,103,63,96,255,103,63,96,255,106,64,98,255,106,64,98,255,106,64,98,255,108,66,101,255,108,66,101,255,108,66,101,255,111,67,104,255,111,67,104,255,114,69,107,255,114,69,107,255,114,69,107,255,117,71,109,255,117,71,109,255,120,72,112,255,120,72,112,255,120,72,112,255,123,74,115,255,123,74,115,255,126,75,117,255,126,75,117,255,126,75,117,255,129,77,120,255,129,77,120,255,129,77,120,255,132,79,123,255,132,79,123,255,135,80,125,255,135,80,125,255,135,80,125,255,138,82,128,255,138,82,128,255,141,84,131,255,141,84,131,255,141,84,131,255,144,85,133,255,144,85,133,255,147,87,136,255,147,87,136,255,147,87,136,255,150,88,139,255,150,88,139,255,150,88,139,255,152,91,141,255,152,91,141,255,155,94,144,255,155,94,144,255,155,94,144,255,157,97,146,255,157,97,146,255,160,100,149,255,160,100,149,255,160,100,149,255,162,103,151,255,162,103,151,255,165,105,154,255,165,105,154,255,165,105,154,255,167,108,157,255,167,108,157,255,167,108,157,255,170,111,159,255,170,111,159,255,172,114,162,255,172,114,162,255,172,114,162,255,175,117,164,255,175,117,164,255,177,119,167,255,177,119,167,255,177,119,167,255,180,122,169,255,180,122,169,255,182,125,172,255,182,125,172,255,182,125,172,255,185,128,174,255,185,128,174,255,185,128,174,255,187,131,177,255,187,131,177,255,190,134,180,255,190,134,180,255,190,134,180,255,193,136,182,255,193,136,182,255,195,139,185,255,195,139,185,255,195,139,185,255,198,142,187,255,198,142,187,255,200,145,190,255,200,145,190,255,200,145,190,255,202,148,192,255,202,148,192,255,202,148,192,255,204,151,194,255,204,151,194,255,205,155,196,255,205,155,196,255,205,155,196,255,207,158,198,255,207,158,198,255,209,161,200,255,209,161,200,255,209,161,200,255,211,165,202,255,211,165,202,255,213,168,204,255,213,168,204,255,213,168,204,255,214,171,207,255,214,171,207,255,214,171,207,255,216,175,209,255,216,175,209,255,218,178,211,255,218,178,211,255,218,178,211,255,220,181,213,255,220,181,213,255,222,185,215,255,222,185,215,255,222,185,215,255,223,188,217,255,223,188,217,255,225,191,219,255,225,191,219,255,225,191,219,255,227,195,221,255,227,195,221,255,227,195,221,255,229,198,223,255,229,198,223,255,230,201,225,255,230,201,225,255,230,201,225,255,232,205,227,255,232,205,227,255,234,208,230,255,234,208,230,255,234,208,230,255,236,211,232,255,236,211,232,255,236,211,232,255,236,213,232,255,236,213,232,255,236,213,232,255,238,216,234,255,236,213,232,255,239,218,235,255,236,213,232,255,238,217,235,255,238,217,235,255,238,217,235,255,239,218,235,255,238,217,235,255,239,220,236,255,239,220,236,255,239,220,236,255,240,221,237,255,240,221,237,255,240,221,237,255,240,221,237,255,242,225,239,255,240,221,237,255,242,227,240,255,240,221,237,255,242,227,240,255,241,224,238,255,242,227,240,255,242,227,240,255,242,227,240,255,244,231,242,255,242,227,240,255,243,229,241,255,243,229,241,255,243,229,241,255,244,231,242,255,244,231,242,255,244,231,242,255,245,234,244,255,244,231,242,255,245,234,244,255,245,234,244,255,245,234,244,255,246,235,244,255,245,234,244,255,246,236,245,255,246,236,245,255,246,236,245,255,246,236,245,255,248,239,247,255,248,239,247,255,248,239,247,255,248,239,247,255,248,239,247,255,248,239,247,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.fuchsiaTones = map ;
	 var map = undefined; 

	 /* processing roseColors colormap */ 
	 var map = {}; 
	 map.name = "roseColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 38,79,22,255,38,79,22,255,38,79,22,255,41,80,24,255,41,80,24,255,44,81,26,255,44,81,26,255,44,81,26,255,47,82,28,255,47,82,28,255,51,83,29,255,51,83,29,255,51,83,29,255,54,84,31,255,54,84,31,255,57,85,33,255,57,85,33,255,57,85,33,255,60,86,35,255,60,86,35,255,60,86,35,255,63,87,36,255,63,87,36,255,66,88,38,255,66,88,38,255,66,88,38,255,69,90,40,255,69,90,40,255,72,91,42,255,72,91,42,255,72,91,42,255,75,92,43,255,75,92,43,255,78,93,45,255,78,93,45,255,78,93,45,255,81,94,47,255,81,94,47,255,81,94,47,255,84,95,49,255,84,95,49,255,87,96,50,255,87,96,50,255,87,96,50,255,91,97,52,255,91,97,52,255,91,97,52,255,97,99,56,255,91,97,52,255,97,99,56,255,97,99,56,255,100,100,57,255,100,100,57,255,100,100,57,255,104,102,59,255,104,102,59,255,104,102,59,255,107,104,61,255,107,104,61,255,111,105,63,255,111,105,63,255,111,105,63,255,115,107,65,255,115,107,65,255,119,109,66,255,119,109,66,255,119,109,66,255,123,111,68,255,123,111,68,255,123,111,68,255,127,113,70,255,127,113,70,255,130,115,72,255,130,115,72,255,130,115,72,255,134,117,74,255,134,117,74,255,138,119,76,255,138,119,76,255,138,119,76,255,142,121,77,255,142,121,77,255,146,123,79,255,146,123,79,255,146,123,79,255,150,124,81,255,150,124,81,255,150,124,81,255,153,126,83,255,153,126,83,255,157,128,85,255,157,128,85,255,157,128,85,255,161,130,86,255,161,130,86,255,165,132,88,255,165,132,88,255,165,132,88,255,169,134,90,255,169,134,90,255,173,136,92,255,173,136,92,255,173,136,92,255,176,138,94,255,176,138,94,255,176,138,94,255,176,138,94,255,176,138,94,255,181,138,94,255,181,138,94,255,181,138,94,255,181,138,94,255,181,138,94,255,183,138,94,255,183,138,94,255,181,138,94,255,184,138,95,255,186,138,95,255,186,138,95,255,186,138,95,255,186,138,95,255,188,138,95,255,188,138,95,255,188,138,95,255,188,138,95,255,191,138,95,255,191,138,95,255,191,138,95,255,191,138,95,255,194,138,96,255,194,138,96,255,194,138,96,255,194,138,96,255,194,138,96,255,196,137,96,255,196,137,96,255,199,137,96,255,196,137,96,255,199,137,96,255,199,137,96,255,199,137,96,255,199,137,96,255,204,137,97,255,199,137,96,255,204,137,97,255,199,137,96,255,204,137,97,255,204,137,97,255,204,137,97,255,207,137,97,255,204,137,97,255,207,137,97,255,207,137,97,255,207,137,97,255,209,137,97,255,209,137,97,255,207,137,97,255,208,135,96,255,208,135,96,255,208,135,96,255,207,133,94,255,207,133,94,255,206,130,93,255,206,130,93,255,206,130,93,255,205,128,91,255,205,128,91,255,205,128,91,255,204,123,88,255,205,128,91,255,204,123,88,255,204,123,88,255,203,121,86,255,203,121,86,255,203,121,86,255,202,118,85,255,202,118,85,255,202,118,85,255,201,116,83,255,201,116,83,255,201,116,83,255,201,116,83,255,201,116,83,255,199,111,80,255,199,111,80,255,199,109,78,255,199,109,78,255,199,109,78,255,198,107,77,255,198,107,77,255,197,104,75,255,197,104,75,255,197,104,75,255,197,104,75,255,197,104,75,255,197,104,75,255,195,99,72,255,195,99,72,255,194,97,70,255,194,97,70,255,194,97,70,255,194,95,69,255,194,95,69,255,193,92,67,255,193,92,67,255,193,92,67,255,193,92,67,255,193,92,67,255,193,92,67,255,191,87,64,255,191,87,64,255,191,85,62,255,191,85,62,255,191,85,62,255,190,82,60,255,190,82,60,255,189,79,58,255,189,79,58,255,189,79,58,255,189,76,56,255,189,76,56,255,188,74,54,255,188,74,54,255,188,74,54,255,187,71,53,255,187,71,53,255,187,71,53,255,186,68,51,255,186,68,51,255,186,65,49,255,186,65,49,255,186,68,51,255,185,63,47,255,185,63,47,255,184,60,45,255,184,60,45,255,184,60,45,255,184,57,43,255,184,57,43,255,183,54,41,255,183,54,41,255,183,54,41,255,182,52,39,255,182,52,39,255,182,52,39,255,181,46,36,255,182,52,39,255,181,46,36,255,181,46,36,255,181,46,36,255,180,43,34,255,180,43,34,255,180,43,34,255,180,41,32,255,180,43,34,255,179,38,30,255,179,38,30,255,178,35,28,255,178,35,28,255,178,35,28,255,178,35,28,255,178,35,28,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.roseColors = map ;
	 var map = undefined; 

	 /* processing avacadoColors colormap */ 
	 var map = {}; 
	 map.name = "avacadoColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 0,1,0,255,0,1,0,255,0,1,0,255,0,5,0,255,0,5,0,255,0,10,1,255,0,10,1,255,0,10,1,255,0,14,2,255,0,14,2,255,0,19,3,255,0,19,3,255,0,19,3,255,0,23,3,255,0,23,3,255,0,28,4,255,0,28,4,255,0,28,4,255,0,32,5,255,0,32,5,255,0,32,5,255,0,37,6,255,0,37,6,255,0,41,6,255,0,41,6,255,0,41,6,255,0,46,7,255,0,46,7,255,0,50,8,255,0,50,8,255,0,50,8,255,0,55,9,255,0,55,9,255,0,59,9,255,0,59,9,255,0,59,9,255,0,64,10,255,0,64,10,255,0,64,10,255,0,69,11,255,0,69,11,255,0,73,12,255,0,73,12,255,0,73,12,255,0,78,13,255,0,78,13,255,0,82,13,255,0,82,13,255,0,82,13,255,0,87,14,255,0,87,14,255,0,91,15,255,0,91,15,255,0,91,15,255,0,96,16,255,0,96,16,255,0,96,16,255,0,100,16,255,0,100,16,255,0,105,17,255,0,105,17,255,0,105,17,255,0,109,18,255,0,109,18,255,0,114,19,255,0,114,19,255,0,114,19,255,2,116,19,255,2,116,19,255,2,116,19,255,5,119,19,255,5,119,19,255,8,121,20,255,8,121,20,255,8,121,20,255,11,124,20,255,11,124,20,255,14,126,20,255,14,126,20,255,14,126,20,255,17,129,21,255,17,129,21,255,20,131,21,255,20,131,21,255,20,131,21,255,23,134,21,255,23,134,21,255,23,134,21,255,26,136,22,255,26,136,22,255,29,139,22,255,29,139,22,255,29,139,22,255,32,141,22,255,32,141,22,255,35,144,23,255,35,144,23,255,35,144,23,255,38,146,23,255,38,146,23,255,41,149,24,255,41,149,24,255,41,149,24,255,44,151,24,255,44,151,24,255,44,151,24,255,47,154,24,255,47,154,24,255,50,156,25,255,50,156,25,255,50,156,25,255,53,159,25,255,53,159,25,255,56,161,25,255,56,161,25,255,56,161,25,255,59,163,26,255,59,163,26,255,62,166,26,255,62,166,26,255,62,166,26,255,65,168,26,255,65,168,26,255,65,168,26,255,68,171,27,255,68,171,27,255,71,173,27,255,71,173,27,255,71,173,27,255,74,176,27,255,74,176,27,255,78,177,28,255,78,177,28,255,78,177,28,255,82,179,28,255,82,179,28,255,86,180,28,255,86,180,28,255,86,180,28,255,90,182,29,255,90,182,29,255,90,182,29,255,94,183,29,255,94,183,29,255,98,185,30,255,98,185,30,255,98,185,30,255,102,186,30,255,102,186,30,255,106,188,30,255,106,188,30,255,106,188,30,255,110,189,31,255,110,189,31,255,114,191,31,255,114,191,31,255,114,191,31,255,118,192,32,255,118,192,32,255,118,192,32,255,122,194,32,255,122,194,32,255,126,195,32,255,126,195,32,255,126,195,32,255,130,197,33,255,130,197,33,255,134,198,33,255,134,198,33,255,134,198,33,255,138,200,33,255,138,200,33,255,142,201,34,255,142,201,34,255,142,201,34,255,146,203,34,255,146,203,34,255,146,203,34,255,150,204,35,255,150,204,35,255,154,206,35,255,154,206,35,255,154,206,35,255,158,207,35,255,158,207,35,255,162,209,36,255,162,209,36,255,162,209,36,255,167,210,36,255,167,210,36,255,171,212,36,255,171,212,36,255,171,212,36,255,175,213,37,255,175,213,37,255,175,213,37,255,178,215,38,255,178,215,38,255,181,216,39,255,181,216,39,255,181,216,39,255,184,218,39,255,184,218,39,255,188,219,40,255,188,219,40,255,188,219,40,255,191,221,41,255,191,221,41,255,191,221,41,255,194,223,42,255,194,223,42,255,197,224,43,255,197,224,43,255,197,224,43,255,200,226,44,255,200,226,44,255,204,227,45,255,204,227,45,255,204,227,45,255,207,229,45,255,207,229,45,255,210,230,46,255,210,230,46,255,210,230,46,255,213,232,47,255,213,232,47,255,213,232,47,255,217,234,48,255,217,234,48,255,220,235,49,255,220,235,49,255,220,235,49,255,223,237,50,255,223,237,50,255,226,238,51,255,226,238,51,255,226,238,51,255,230,240,52,255,230,240,52,255,233,241,52,255,233,241,52,255,233,241,52,255,236,243,53,255,236,243,53,255,236,243,53,255,239,245,54,255,239,245,54,255,243,246,55,255,243,246,55,255,243,246,55,255,246,248,56,255,246,248,56,255,249,249,57,255,249,249,57,255,249,249,57,255,252,251,58,255,252,251,58,255,255,252,58,255,255,252,58,255,255,252,58,255,255,252,58,255,252,251,58,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.avacadoColors = map ;
	 var map = undefined; 

	 /* processing fuitPunch colormap */ 
	 var map = {}; 
	 map.name = "fuitPunch" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 255,128,0,255,255,128,0,255,255,128,0,255,255,130,0,255,255,130,0,255,255,132,0,255,255,132,0,255,255,132,0,255,255,132,0,255,255,136,0,255,255,136,0,255,255,136,0,255,255,136,0,255,255,136,0,255,254,140,0,255,254,140,0,255,254,140,0,255,254,140,0,255,254,140,0,255,254,144,0,255,254,140,0,255,254,144,0,255,254,144,0,255,253,151,0,255,254,144,0,255,253,151,0,255,254,144,0,255,253,151,0,255,253,151,0,255,254,144,0,255,253,151,0,255,253,151,0,255,253,151,0,255,253,153,0,255,253,153,0,255,253,153,0,255,253,153,0,255,252,157,1,255,252,157,1,255,252,157,1,255,252,157,1,255,250,158,1,255,250,158,1,255,250,158,1,255,247,160,3,255,250,158,1,255,247,160,3,255,247,160,3,255,247,160,3,255,245,161,3,255,245,161,3,255,243,162,4,255,243,162,4,255,243,162,4,255,240,165,5,255,243,162,4,255,243,162,4,255,240,165,5,255,240,165,5,255,239,166,6,255,239,166,6,255,240,165,5,255,235,168,7,255,239,166,6,255,235,168,7,255,235,168,7,255,235,168,7,255,234,169,8,255,234,169,8,255,234,169,8,255,229,172,10,255,234,169,8,255,230,171,9,255,230,171,9,255,230,171,9,255,229,172,10,255,229,172,10,255,227,172,13,255,227,172,13,255,227,172,13,255,226,172,15,255,226,172,15,255,226,172,15,255,222,171,19,255,226,172,15,255,222,171,19,255,222,171,19,255,222,171,19,255,221,171,22,255,219,171,24,255,219,171,24,255,219,171,24,255,219,171,24,255,218,170,26,255,218,170,26,255,216,170,28,255,216,170,28,255,216,170,28,255,214,170,31,255,214,170,31,255,213,170,33,255,213,170,33,255,213,170,33,255,211,170,35,255,211,170,35,255,211,170,35,255,210,169,37,255,210,169,37,255,208,169,39,255,208,169,39,255,208,169,39,255,207,169,42,255,207,169,42,255,206,167,46,255,206,167,46,255,206,167,46,255,205,166,49,255,205,166,49,255,204,164,53,255,204,164,53,255,204,164,53,255,204,163,57,255,204,163,57,255,204,163,57,255,203,161,60,255,203,161,60,255,202,159,64,255,202,159,64,255,202,159,64,255,202,158,68,255,202,158,68,255,201,156,72,255,201,156,72,255,201,156,72,255,200,155,75,255,200,155,75,255,199,153,79,255,199,153,79,255,199,153,79,255,199,152,83,255,199,152,83,255,199,152,83,255,198,150,86,255,198,150,86,255,197,149,90,255,197,149,90,255,197,149,90,255,197,147,94,255,197,147,94,255,197,145,98,255,197,145,98,255,197,145,98,255,197,142,102,255,197,142,102,255,198,140,106,255,198,140,106,255,198,140,106,255,198,138,110,255,198,138,110,255,198,138,110,255,199,136,114,255,199,136,114,255,199,133,118,255,199,133,118,255,199,133,118,255,200,131,122,255,200,131,122,255,200,129,126,255,200,129,126,255,200,129,126,255,201,126,130,255,201,126,130,255,201,124,134,255,201,124,134,255,201,124,134,255,202,122,138,255,202,122,138,255,202,122,138,255,202,119,142,255,202,119,142,255,203,117,146,255,203,117,146,255,203,117,146,255,203,115,150,255,203,115,150,255,204,113,153,255,204,113,153,255,204,113,153,255,206,111,155,255,206,111,155,255,207,109,157,255,207,109,157,255,207,109,157,255,208,107,159,255,208,107,159,255,208,107,159,255,210,105,161,255,210,105,161,255,211,104,164,255,211,104,164,255,211,104,164,255,213,102,166,255,213,102,166,255,214,100,168,255,214,100,168,255,214,100,168,255,215,98,170,255,215,98,170,255,215,98,170,255,217,96,172,255,215,98,170,255,217,96,172,255,221,91,178,255,217,96,172,255,220,92,176,255,220,92,176,255,221,91,178,255,221,91,178,255,221,91,178,255,222,89,180,255,222,89,180,255,224,88,181,255,224,88,181,255,224,88,181,255,225,88,178,255,225,88,178,255,225,88,178,255,227,88,175,255,227,88,175,255,228,89,172,255,228,89,172,255,228,89,172,255,230,89,169,255,230,89,169,255,231,89,166,255,231,89,166,255,231,89,166,255,233,90,163,255,233,90,163,255,236,91,157,255,233,90,163,255,233,90,163,255,236,91,157,255,236,91,157,255,236,91,157,255,237,91,154,255,237,91,154,255,239,91,151,255,239,91,151,255,239,91,151,255,240,92,147,255,240,92,147,255,242,92,144,255,242,92,144,255,242,92,144,255,243,93,141,255,243,93,141,255,245,93,138,255,245,93,138,255,245,93,138,255,245,93,138,255,245,93,138,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.fuitPunch = map ;
	 var map = undefined; 

	 /* processing rustTones colormap */ 
	 var map = {}; 
	 map.name = "rustTones" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 0,2,48,255,0,2,48,255,0,2,48,255,3,4,48,255,0,2,48,255,7,6,47,255,7,6,47,255,7,6,47,255,11,7,47,255,11,7,47,255,15,9,46,255,15,9,46,255,15,9,46,255,19,11,45,255,19,11,45,255,23,13,45,255,23,13,45,255,23,13,45,255,27,15,44,255,27,15,44,255,27,15,44,255,31,17,43,255,31,17,43,255,35,19,43,255,35,19,43,255,35,19,43,255,39,20,42,255,39,20,42,255,43,22,42,255,43,22,42,255,43,22,42,255,47,24,41,255,47,24,41,255,51,26,40,255,51,26,40,255,51,26,40,255,55,28,40,255,55,28,40,255,55,28,40,255,59,30,39,255,59,30,39,255,63,32,39,255,63,32,39,255,63,32,39,255,67,33,38,255,67,33,38,255,71,35,37,255,71,35,37,255,71,35,37,255,75,37,37,255,75,37,37,255,79,39,36,255,79,39,36,255,79,39,36,255,83,41,35,255,83,41,35,255,83,41,35,255,87,43,35,255,87,43,35,255,91,45,34,255,91,45,34,255,91,45,34,255,95,46,34,255,95,46,34,255,99,48,33,255,99,48,33,255,99,48,33,255,103,50,32,255,103,50,32,255,103,50,32,255,107,52,32,255,107,52,32,255,111,54,31,255,111,54,31,255,111,54,31,255,115,56,30,255,115,56,30,255,119,58,30,255,119,58,30,255,119,58,30,255,123,59,29,255,123,59,29,255,127,61,29,255,127,61,29,255,127,61,29,255,131,63,28,255,131,63,28,255,131,63,28,255,135,65,27,255,135,65,27,255,139,67,27,255,139,67,27,255,139,67,27,255,143,69,26,255,143,69,26,255,147,71,26,255,147,71,26,255,147,71,26,255,151,73,25,255,151,73,25,255,155,74,24,255,155,74,24,255,155,74,24,255,159,76,24,255,159,76,24,255,159,76,24,255,163,78,23,255,163,78,23,255,167,80,22,255,167,80,22,255,167,80,22,255,171,82,22,255,171,82,22,255,175,84,21,255,175,84,21,255,175,84,21,255,179,86,21,255,179,86,21,255,183,87,20,255,183,87,20,255,183,87,20,255,187,89,19,255,187,89,19,255,187,89,19,255,191,91,19,255,191,91,19,255,195,93,18,255,195,93,18,255,195,93,18,255,199,95,17,255,199,95,17,255,200,95,17,255,200,95,17,255,200,95,17,255,203,97,17,255,200,95,17,255,203,97,17,255,203,97,17,255,203,97,17,255,203,97,17,255,203,97,17,255,203,97,17,255,204,98,17,255,204,98,17,255,203,97,17,255,211,101,16,255,203,97,17,255,203,97,17,255,208,99,16,255,208,99,16,255,208,99,16,255,208,99,16,255,208,99,16,255,211,101,16,255,208,99,16,255,212,101,15,255,208,99,16,255,211,101,16,255,211,101,16,255,211,101,16,255,212,101,15,255,212,101,15,255,216,103,15,255,212,101,15,255,212,101,15,255,216,103,15,255,216,103,15,255,216,103,15,255,216,103,15,255,216,103,15,255,219,104,14,255,215,102,15,255,219,104,14,255,219,104,14,255,219,104,14,255,220,105,14,255,220,105,14,255,219,104,14,255,220,105,14,255,220,105,14,255,220,105,14,255,223,106,14,255,220,105,14,255,223,106,14,255,220,105,14,255,227,108,13,255,223,106,14,255,227,108,13,255,223,106,14,255,227,108,13,255,227,108,13,255,227,108,13,255,227,108,13,255,228,109,13,255,228,109,13,255,227,108,13,255,228,109,13,255,228,109,13,255,228,109,13,255,228,109,13,255,228,109,13,255,233,111,12,255,228,109,13,255,233,111,12,255,233,111,12,255,233,111,12,255,233,111,12,255,233,111,12,255,233,111,12,255,236,112,12,255,233,111,12,255,236,112,12,255,237,113,11,255,233,111,12,255,236,112,12,255,236,112,12,255,237,113,11,255,237,113,11,255,237,113,11,255,237,113,11,255,237,113,11,255,240,114,11,255,240,114,11,255,240,114,11,255,240,114,11,255,243,116,11,255,240,114,11,255,243,116,11,255,243,116,11,255,243,116,11,255,243,116,11,255,243,116,11,255,244,116,10,255,244,116,10,255,244,116,10,255,248,118,10,255,244,116,10,255,248,118,10,255,244,116,10,255,249,118,10,255,249,118,10,255,249,118,10,255,249,118,10,255,249,118,10,255,249,118,10,255,252,120,9,255,249,118,10,255,251,119,9,255,251,119,9,255,249,118,10,255,252,120,9,255,255,121,9,255,251,119,9,255,255,121,9,255,251,119,9,255,255,121,9,255,255,121,9,255,255,121,9,255,255,121,9,255,255,121,9,255,255,121,9,255,255,121,9,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.rustTones = map ;
	 var map = undefined; 

	 /* processing beachColors colormap */ 
	 var map = {}; 
	 map.name = "beachColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 218,129,66,255,218,129,66,255,218,129,66,255,218,132,67,255,218,132,67,255,219,136,67,255,219,136,67,255,219,136,67,255,219,136,67,255,219,136,67,255,220,141,68,255,219,136,67,255,220,141,68,255,220,141,68,255,220,141,68,255,221,143,69,255,221,143,69,255,221,143,69,255,222,147,69,255,220,141,68,255,222,147,69,255,222,147,69,255,222,147,69,255,222,149,70,255,222,149,70,255,222,149,70,255,223,152,70,255,223,152,70,255,223,156,71,255,223,156,71,255,223,156,71,255,223,156,71,255,223,156,71,255,224,161,72,255,223,156,71,255,224,161,72,255,224,161,72,255,224,161,72,255,224,161,72,255,225,164,73,255,225,164,73,255,225,164,73,255,225,164,73,255,225,164,73,255,225,164,73,255,226,168,73,255,226,168,73,255,226,168,73,255,226,168,73,255,227,172,74,255,227,172,74,255,227,172,74,255,227,172,74,255,227,172,74,255,228,176,75,255,227,172,74,255,228,176,75,255,228,176,75,255,228,176,75,255,229,181,76,255,228,176,75,255,228,176,75,255,229,179,76,255,229,179,76,255,229,181,76,255,229,181,76,255,229,181,76,255,229,181,76,255,230,187,77,255,229,181,76,255,230,187,77,255,230,187,77,255,230,187,77,255,230,187,77,255,230,187,77,255,230,189,79,255,230,187,77,255,230,189,79,255,230,189,79,255,230,189,79,255,229,190,81,255,229,190,81,255,229,191,82,255,229,191,82,255,229,190,81,255,228,191,84,255,228,191,84,255,228,191,84,255,228,192,85,255,228,191,84,255,227,193,87,255,227,193,87,255,227,193,87,255,227,194,88,255,227,194,88,255,226,195,91,255,226,195,91,255,226,195,91,255,226,195,91,255,226,195,91,255,226,195,91,255,224,198,96,255,226,195,91,255,225,197,94,255,225,197,94,255,225,197,94,255,224,198,96,255,224,198,96,255,223,199,99,255,223,199,99,255,223,199,99,255,223,199,99,255,223,199,99,255,222,199,102,255,222,199,102,255,222,199,102,255,221,199,105,255,221,199,105,255,219,198,108,255,219,198,108,255,219,198,108,255,218,198,111,255,218,198,111,255,218,198,111,255,217,198,114,255,217,198,114,255,215,198,117,255,215,198,117,255,215,198,117,255,214,197,120,255,214,197,120,255,213,197,123,255,213,197,123,255,213,197,123,255,211,197,126,255,211,197,126,255,210,197,129,255,210,197,129,255,210,197,129,255,208,196,131,255,208,196,131,255,208,196,131,255,207,196,134,255,207,196,134,255,206,196,137,255,206,196,137,255,206,196,137,255,204,196,140,255,204,196,140,255,203,195,144,255,203,195,144,255,203,195,144,255,202,194,148,255,202,194,148,255,200,194,152,255,200,194,152,255,200,194,152,255,199,193,156,255,199,193,156,255,199,193,156,255,198,193,160,255,198,193,160,255,196,192,163,255,196,192,163,255,196,192,163,255,195,192,167,255,195,192,167,255,193,191,171,255,193,191,171,255,193,191,171,255,192,191,175,255,192,191,175,255,191,190,179,255,191,190,179,255,191,190,179,255,189,190,183,255,189,190,183,255,189,190,183,255,188,189,187,255,188,189,187,255,187,189,191,255,187,189,191,255,187,189,191,255,185,188,194,255,185,188,194,255,185,188,198,255,185,188,198,255,185,188,198,255,185,189,202,255,185,189,202,255,186,190,205,255,186,190,205,255,186,190,205,255,186,190,208,255,186,190,208,255,186,190,208,255,186,191,212,255,186,191,212,255,187,192,215,255,187,192,215,255,187,192,215,255,187,192,219,255,187,192,219,255,187,193,222,255,187,193,222,255,187,193,222,255,188,194,225,255,188,194,225,255,188,194,225,255,188,194,229,255,188,194,229,255,188,195,232,255,188,195,232,255,188,195,232,255,189,196,236,255,189,196,236,255,189,196,239,255,189,196,239,255,189,196,239,255,189,197,243,255,189,197,243,255,191,199,245,255,191,199,245,255,191,199,245,255,195,203,246,255,195,203,246,255,195,203,246,255,200,207,247,255,200,207,247,255,205,211,247,255,205,211,247,255,205,211,247,255,209,215,248,255,209,215,248,255,214,219,249,255,214,219,249,255,214,219,249,255,219,223,250,255,219,223,250,255,223,228,250,255,223,228,250,255,223,228,250,255,228,232,251,255,228,232,251,255,228,232,251,255,232,236,252,255,232,236,252,255,237,240,253,255,237,240,253,255,237,240,253,255,242,244,253,255,242,244,253,255,246,248,254,255,246,248,254,255,246,248,254,255,251,252,255,255,251,252,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.beachColors = map ;
	 var map = undefined; 

	 /* processing grayTones colormap */ 
	 var map = {}; 
	 map.name = "grayTones" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 25,26,25,255,25,26,25,255,25,26,25,255,27,28,27,255,27,28,27,255,27,28,27,255,30,32,32,255,27,28,27,255,30,32,32,255,30,32,32,255,32,34,34,255,32,34,34,255,32,34,34,255,33,36,36,255,33,36,36,255,35,37,38,255,35,37,38,255,35,37,38,255,36,39,40,255,36,39,40,255,36,39,40,255,38,41,42,255,38,41,42,255,40,43,45,255,40,43,45,255,40,43,45,255,41,45,47,255,41,45,47,255,43,47,49,255,43,47,49,255,43,47,49,255,44,49,51,255,44,49,51,255,46,51,53,255,46,51,53,255,46,51,53,255,48,52,55,255,48,52,55,255,48,52,55,255,49,54,57,255,49,54,57,255,51,56,60,255,51,56,60,255,51,56,60,255,52,58,62,255,52,58,62,255,54,60,64,255,54,60,64,255,54,60,64,255,56,62,66,255,56,62,66,255,57,64,68,255,57,64,68,255,57,64,68,255,59,65,70,255,59,65,70,255,59,65,70,255,60,67,71,255,60,67,71,255,61,68,73,255,61,68,73,255,61,68,73,255,63,70,75,255,63,70,75,255,64,71,76,255,64,71,76,255,64,71,76,255,66,73,78,255,66,73,78,255,66,73,78,255,67,75,79,255,67,75,79,255,68,76,81,255,68,76,81,255,68,76,81,255,71,79,84,255,68,76,81,255,71,79,84,255,71,79,84,255,71,79,84,255,72,81,86,255,72,81,86,255,74,82,87,255,74,82,87,255,74,82,87,255,75,84,89,255,75,84,89,255,75,84,89,255,77,85,90,255,77,85,90,255,78,87,92,255,78,87,92,255,78,87,92,255,81,90,95,255,78,87,92,255,81,90,95,255,81,90,95,255,81,90,95,255,82,92,97,255,82,92,97,255,84,93,98,255,84,93,98,255,84,93,98,255,85,95,100,255,85,95,100,255,85,95,100,255,87,97,102,255,87,97,102,255,90,99,104,255,90,99,104,255,90,99,104,255,92,101,106,255,92,101,106,255,94,104,108,255,94,104,108,255,94,104,108,255,97,106,110,255,97,106,110,255,99,108,112,255,99,108,112,255,99,108,112,255,101,110,114,255,101,110,114,255,101,110,114,255,104,112,116,255,104,112,116,255,106,115,118,255,106,115,118,255,106,115,118,255,108,117,120,255,108,117,120,255,111,119,122,255,111,119,122,255,111,119,122,255,113,121,124,255,115,124,126,255,115,124,126,255,115,124,126,255,115,124,126,255,118,126,128,255,118,126,128,255,118,126,128,255,120,128,130,255,120,128,130,255,122,130,132,255,122,130,132,255,122,130,132,255,125,132,134,255,125,132,134,255,127,135,136,255,127,135,136,255,127,135,136,255,129,137,138,255,129,137,138,255,132,139,140,255,132,139,140,255,132,139,140,255,135,142,142,255,135,142,142,255,135,142,142,255,138,145,145,255,138,145,145,255,141,147,147,255,141,147,147,255,141,147,147,255,144,150,150,255,144,150,150,255,147,153,152,255,147,153,152,255,147,153,152,255,150,156,154,255,150,156,154,255,153,158,157,255,153,158,157,255,153,158,157,255,156,161,159,255,156,161,159,255,156,161,159,255,159,164,162,255,159,164,162,255,162,167,164,255,162,167,164,255,162,167,164,255,165,170,167,255,165,170,167,255,168,172,169,255,168,172,169,255,168,172,169,255,171,175,171,255,171,175,171,255,174,178,174,255,174,178,174,255,174,178,174,255,177,181,176,255,177,181,176,255,177,181,176,255,180,183,179,255,180,183,179,255,183,186,181,255,183,186,181,255,183,186,181,255,186,189,184,255,186,189,184,255,189,192,186,255,189,192,186,255,189,192,186,255,192,194,188,255,192,194,188,255,192,194,188,255,195,197,190,255,195,197,190,255,197,199,192,255,197,199,192,255,197,199,192,255,199,201,194,255,199,201,194,255,201,203,196,255,201,203,196,255,201,203,196,255,203,205,198,255,203,205,198,255,205,207,199,255,205,207,199,255,205,207,199,255,207,209,201,255,207,209,201,255,207,209,201,255,209,211,203,255,209,211,203,255,211,213,205,255,211,213,205,255,211,213,205,255,213,215,207,255,213,215,207,255,216,217,209,255,216,217,209,255,216,217,209,255,220,222,212,255,218,220,211,255,220,222,212,255,220,222,212,255,220,222,212,255,220,222,212,255,226,228,218,255,220,222,212,255,226,228,218,255,226,228,218,255,226,228,218,255,226,228,218,255,226,228,218,255,228,230,220,255,228,230,220,255,230,232,222,255,230,232,222,255,230,232,222,255,232,234,223,255,232,234,223,255,234,236,225,255,234,236,225,255,234,236,225,255,234,236,225,255,232,234,223,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.grayTones = map ;
	 var map = undefined; 

	 /* processing sandyTerrain colormap */ 
	 var map = {}; 
	 map.name = "sandyTerrain" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 168,81,53,255,168,81,53,255,168,81,53,255,170,84,53,255,170,84,53,255,172,86,54,255,172,86,54,255,172,86,54,255,175,88,55,255,175,88,55,255,177,90,56,255,177,90,56,255,177,90,56,255,179,92,57,255,179,92,57,255,179,92,57,255,185,99,59,255,179,92,57,255,183,97,58,255,183,97,58,255,183,97,58,255,185,99,59,255,185,99,59,255,187,101,60,255,187,101,60,255,187,101,60,255,189,103,61,255,189,103,61,255,192,107,62,255,192,107,62,255,192,107,62,255,194,111,62,255,194,111,62,255,196,114,63,255,196,114,63,255,196,114,63,255,198,118,64,255,198,118,64,255,198,118,64,255,200,122,65,255,200,122,65,255,202,125,65,255,202,125,65,255,202,125,65,255,204,129,66,255,204,129,66,255,206,133,67,255,206,133,67,255,206,133,67,255,208,136,68,255,208,136,68,255,211,140,68,255,211,140,68,255,211,140,68,255,212,144,69,255,212,144,69,255,212,144,69,255,214,147,70,255,214,147,70,255,216,151,70,255,216,151,70,255,216,151,70,255,218,155,71,255,218,155,71,255,220,159,71,255,220,159,71,255,220,159,71,255,221,163,72,255,221,163,72,255,221,163,72,255,223,166,73,255,223,166,73,255,225,170,73,255,225,170,73,255,225,170,73,255,227,174,74,255,227,174,74,255,229,178,74,255,229,178,74,255,229,178,74,255,229,179,75,255,229,179,75,255,230,181,75,255,230,181,75,255,230,181,75,255,230,181,75,255,232,185,75,255,232,185,75,255,232,185,75,255,232,185,75,255,233,187,76,255,233,187,76,255,233,187,76,255,234,190,76,255,233,187,76,255,234,190,76,255,234,190,76,255,234,190,76,255,236,194,77,255,234,190,76,255,236,194,77,255,236,194,77,255,236,194,77,255,238,198,77,255,236,194,77,255,238,198,77,255,236,194,77,255,237,197,77,255,237,197,77,255,237,197,77,255,237,197,77,255,237,197,77,255,237,197,77,255,237,197,77,255,237,197,77,255,237,197,77,255,237,197,77,255,237,197,77,255,237,197,77,255,237,197,77,255,237,197,77,255,238,199,78,255,238,199,78,255,238,199,78,255,238,199,78,255,238,199,78,255,238,199,78,255,238,199,78,255,238,199,78,255,238,199,78,255,238,199,78,255,238,199,78,255,238,199,78,255,237,197,77,255,237,197,77,255,237,197,77,255,238,199,78,255,237,197,77,255,238,199,78,255,235,197,77,255,238,199,78,255,237,197,77,255,237,197,77,255,237,197,77,255,235,197,77,255,235,197,77,255,235,197,77,255,235,197,77,255,235,197,77,255,235,197,77,255,235,197,77,255,235,192,77,255,235,197,77,255,235,197,77,255,235,197,77,255,235,197,77,255,235,197,77,255,231,194,75,255,231,194,75,255,231,194,75,255,226,191,74,255,231,194,75,255,226,191,74,255,226,191,74,255,226,191,74,255,223,189,73,255,223,189,73,255,221,188,72,255,221,188,72,255,221,188,72,255,218,186,71,255,218,186,71,255,218,186,71,255,216,185,70,255,218,186,71,255,213,183,70,255,213,183,70,255,213,183,70,255,211,181,69,255,211,181,69,255,208,180,68,255,208,180,68,255,208,180,68,255,203,177,67,255,203,177,67,255,198,173,65,255,198,173,65,255,198,173,65,255,193,170,64,255,193,170,64,255,188,167,62,255,188,167,62,255,188,167,62,255,183,163,61,255,183,163,61,255,183,163,61,255,178,160,60,255,178,160,60,255,173,157,58,255,173,157,58,255,173,157,58,255,167,153,57,255,167,153,57,255,162,150,55,255,162,150,55,255,162,150,55,255,157,147,54,255,157,147,54,255,157,147,54,255,153,144,53,255,153,144,53,255,148,141,53,255,148,141,53,255,148,141,53,255,143,138,52,255,143,138,52,255,139,135,52,255,139,135,52,255,139,135,52,255,134,132,51,255,134,132,51,255,130,129,50,255,130,129,50,255,130,129,50,255,125,126,50,255,125,126,50,255,125,126,50,255,121,123,49,255,121,123,49,255,116,120,49,255,116,120,49,255,116,120,49,255,111,117,48,255,111,117,48,255,108,114,48,255,108,114,48,255,108,114,48,255,104,112,48,255,104,112,48,255,100,110,48,255,100,110,48,255,100,110,48,255,96,107,48,255,96,107,48,255,96,107,48,255,93,105,48,255,93,105,48,255,89,102,48,255,89,102,48,255,89,102,48,255,85,100,48,255,85,100,48,255,81,97,48,255,81,97,48,255,81,97,48,255,78,95,48,255,78,95,48,255,74,92,48,255,74,92,48,255,74,92,48,255,74,92,48,255,74,92,48,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.sandyTerrain = map ;
	 var map = undefined; 

	 /* processing blueGreenYellow colormap */ 
	 var map = {}; 
	 map.name = "blueGreenYellow" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 31,3,101,255,31,3,101,255,31,3,101,255,30,7,103,255,30,7,103,255,30,11,105,255,30,11,105,255,30,11,105,255,29,15,107,255,29,15,107,255,28,19,108,255,28,19,108,255,28,19,108,255,28,24,110,255,28,24,110,255,27,28,112,255,27,28,112,255,27,28,112,255,27,32,113,255,27,32,113,255,27,32,113,255,26,36,115,255,26,36,115,255,25,40,117,255,25,40,117,255,25,40,117,255,25,44,119,255,25,44,119,255,24,49,120,255,24,49,120,255,24,49,120,255,24,53,122,255,24,53,122,255,23,57,124,255,23,57,124,255,23,57,124,255,23,61,126,255,23,61,126,255,23,61,126,255,22,65,127,255,22,65,127,255,21,69,129,255,21,69,129,255,21,69,129,255,21,73,130,255,21,73,130,255,21,77,131,255,21,77,131,255,21,77,131,255,21,80,131,255,21,80,131,255,22,83,132,255,22,83,132,255,22,83,132,255,22,87,133,255,22,87,133,255,22,87,133,255,22,90,133,255,22,90,133,255,22,93,134,255,22,93,134,255,22,93,134,255,23,97,134,255,23,97,134,255,23,100,135,255,23,100,135,255,23,100,135,255,23,103,136,255,23,103,136,255,23,103,136,255,23,107,136,255,23,107,136,255,23,110,137,255,23,110,137,255,23,110,137,255,24,113,137,255,24,113,137,255,24,117,138,255,24,117,138,255,24,117,138,255,24,120,138,255,24,117,138,255,24,127,140,255,24,120,138,255,24,127,140,255,24,127,140,255,24,127,140,255,24,127,140,255,27,132,139,255,24,127,140,255,27,132,139,255,27,132,139,255,27,132,139,255,28,134,139,255,28,134,139,255,29,137,139,255,29,137,139,255,29,137,139,255,29,137,139,255,31,141,138,255,31,141,138,255,31,141,138,255,31,141,138,255,32,144,138,255,32,144,138,255,32,144,138,255,34,146,138,255,34,146,138,255,35,149,137,255,35,149,137,255,35,149,137,255,36,151,137,255,36,151,137,255,37,153,137,255,37,153,137,255,37,153,137,255,38,156,136,255,38,156,136,255,40,158,136,255,40,158,136,255,40,158,136,255,41,160,136,255,41,160,136,255,41,160,136,255,42,163,135,255,42,163,135,255,43,165,135,255,43,165,135,255,43,165,135,255,44,167,135,255,44,167,135,255,47,169,134,255,47,169,134,255,47,169,134,255,49,171,133,255,49,171,133,255,52,173,132,255,52,173,132,255,52,173,132,255,54,174,131,255,54,174,131,255,54,174,131,255,56,176,131,255,56,176,131,255,59,178,130,255,59,178,130,255,59,178,130,255,61,179,129,255,61,179,129,255,63,181,128,255,63,181,128,255,63,181,128,255,66,183,127,255,66,183,127,255,68,184,127,255,68,184,127,255,68,184,127,255,70,186,126,255,70,186,126,255,70,186,126,255,73,188,125,255,73,188,125,255,75,189,124,255,75,189,124,255,75,189,124,255,78,191,123,255,78,191,123,255,80,193,122,255,80,193,122,255,80,193,122,255,80,193,122,255,85,196,121,255,85,196,121,255,85,196,121,255,85,196,121,255,89,197,120,255,89,197,120,255,89,197,120,255,93,198,119,255,93,198,119,255,96,200,118,255,96,200,118,255,96,200,118,255,100,201,117,255,100,201,117,255,104,202,116,255,104,202,116,255,104,202,116,255,107,203,115,255,107,203,115,255,111,204,114,255,111,204,114,255,111,204,114,255,115,206,112,255,115,206,112,255,115,206,112,255,119,207,111,255,119,207,111,255,122,208,110,255,122,208,110,255,122,208,110,255,126,209,109,255,126,209,109,255,130,210,108,255,130,210,108,255,130,210,108,255,133,212,107,255,133,212,107,255,133,212,107,255,137,213,106,255,137,213,106,255,141,214,105,255,141,214,105,255,141,214,105,255,145,215,104,255,145,215,104,255,149,216,103,255,149,216,103,255,149,216,103,255,155,217,103,255,155,217,103,255,160,218,102,255,160,218,102,255,160,218,102,255,165,219,101,255,165,219,101,255,165,219,101,255,170,220,100,255,170,220,100,255,176,221,99,255,176,221,99,255,176,221,99,255,181,221,98,255,181,221,98,255,186,222,97,255,186,222,97,255,186,222,97,255,192,223,96,255,192,223,96,255,197,224,95,255,197,224,95,255,197,224,95,255,202,225,95,255,202,225,95,255,202,225,95,255,207,226,94,255,207,226,94,255,213,227,93,255,213,227,93,255,213,227,93,255,218,228,92,255,218,228,92,255,223,229,91,255,223,229,91,255,223,229,91,255,228,229,90,255,228,229,90,255,234,230,89,255,234,230,89,255,234,230,89,255,234,230,89,255,234,230,89,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.blueGreenYellow = map ;
	 var map = undefined; 

	 /* processing greenBrownTerrain colormap */ 
	 var map = {}; 
	 map.name = "greenBrownTerrain" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 0,1,0,255,0,1,0,255,0,1,0,255,3,6,5,255,3,6,5,255,7,11,11,255,7,11,11,255,7,11,11,255,11,16,17,255,11,16,17,255,15,22,23,255,15,22,23,255,15,22,23,255,18,27,29,255,18,27,29,255,22,32,35,255,22,32,35,255,22,32,35,255,26,37,41,255,26,37,41,255,26,37,41,255,30,43,46,255,30,43,46,255,34,48,50,255,34,48,50,255,34,48,50,255,38,53,54,255,38,53,54,255,43,59,59,255,43,59,59,255,43,59,59,255,47,64,63,255,47,64,63,255,51,70,67,255,51,70,67,255,51,70,67,255,56,75,71,255,56,75,71,255,56,75,71,255,60,80,75,255,60,80,75,255,65,85,78,255,65,85,78,255,65,85,78,255,69,90,80,255,69,90,80,255,73,95,83,255,73,95,83,255,73,95,83,255,78,99,85,255,78,99,85,255,82,104,88,255,82,104,88,255,82,104,88,255,86,109,90,255,86,109,90,255,86,109,90,255,91,113,93,255,91,113,93,255,95,118,95,255,95,118,95,255,95,118,95,255,99,121,96,255,99,121,96,255,103,125,97,255,103,125,97,255,103,125,97,255,107,128,98,255,107,128,98,255,107,128,98,255,111,132,99,255,111,132,99,255,115,135,100,255,115,135,100,255,115,135,100,255,119,139,102,255,119,139,102,255,123,142,103,255,123,142,103,255,123,142,103,255,127,145,103,255,127,145,103,255,130,147,104,255,130,147,104,255,130,147,104,255,134,150,104,255,134,150,104,255,134,150,104,255,137,152,104,255,137,152,104,255,140,154,104,255,140,154,104,255,140,154,104,255,144,156,104,255,144,156,104,255,147,158,104,255,147,158,104,255,147,158,104,255,150,160,104,255,150,160,104,255,153,162,104,255,153,162,104,255,153,162,104,255,156,162,103,255,156,162,103,255,158,163,103,255,158,163,103,255,158,163,103,255,161,164,102,255,161,164,102,255,161,164,102,255,163,165,102,255,163,165,102,255,166,166,101,255,166,166,101,255,166,166,101,255,168,167,101,255,168,167,101,255,168,167,101,255,172,167,99,255,168,167,101,255,172,167,99,255,174,167,99,255,174,167,99,255,174,167,99,255,174,167,99,255,176,167,98,255,176,167,98,255,177,167,97,255,177,167,97,255,177,167,97,255,177,167,97,255,177,167,97,255,181,167,96,255,182,167,95,255,182,167,95,255,182,167,95,255,182,167,95,255,182,167,95,255,185,166,94,255,185,166,94,255,185,166,94,255,185,166,94,255,184,166,94,255,186,165,93,255,186,165,93,255,186,165,93,255,186,164,93,255,186,164,93,255,186,164,93,255,188,163,92,255,186,164,93,255,188,163,92,255,188,163,92,255,189,162,91,255,189,162,91,255,189,162,91,255,191,161,91,255,189,162,91,255,191,161,91,255,191,161,91,255,191,161,91,255,191,160,91,255,191,160,91,255,191,160,91,255,191,160,91,255,191,160,91,255,192,159,92,255,192,159,92,255,192,159,92,255,192,159,92,255,192,159,92,255,193,156,92,255,192,159,92,255,194,156,94,255,191,160,91,255,194,156,94,255,192,159,92,255,193,156,92,255,193,156,92,255,194,156,95,255,194,156,95,255,194,156,95,255,194,156,95,255,194,156,95,255,194,156,95,255,194,156,95,255,195,156,100,255,194,156,95,255,195,156,100,255,195,156,100,255,195,156,100,255,195,156,100,255,195,156,100,255,195,156,103,255,195,156,100,255,195,156,103,255,195,156,103,255,196,157,104,255,196,157,104,255,196,157,104,255,197,158,108,255,197,158,108,255,197,160,111,255,197,158,108,255,198,161,115,255,197,160,111,255,199,163,118,255,197,160,111,255,199,163,118,255,199,163,118,255,200,165,121,255,200,165,121,255,200,165,121,255,201,166,125,255,201,166,125,255,202,168,128,255,202,168,128,255,202,168,128,255,203,170,133,255,203,170,133,255,205,174,139,255,205,174,139,255,205,174,139,255,207,178,145,255,207,178,145,255,207,178,145,255,210,182,151,255,210,182,151,255,212,186,158,255,212,186,158,255,212,186,158,255,214,190,164,255,214,190,164,255,216,194,170,255,216,194,170,255,216,194,170,255,219,198,176,255,219,198,176,255,222,205,185,255,222,205,185,255,222,205,185,255,227,212,195,255,227,212,195,255,227,212,195,255,232,220,205,255,232,220,205,255,237,227,215,255,237,227,215,255,237,227,215,255,241,234,225,255,241,234,225,255,246,242,235,255,246,242,235,255,246,242,235,255,251,249,245,255,251,249,245,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.greenBrownTerrain = map ;
	 var map = undefined; 

	 /* processing siennaTones colormap */ 
	 var map = {}; 
	 map.name = "siennaTones" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 119,45,17,255,119,45,17,255,119,45,17,255,122,47,18,255,122,47,18,255,126,49,18,255,126,49,18,255,126,49,18,255,129,51,18,255,129,51,18,255,132,52,18,255,132,52,18,255,132,52,18,255,136,54,19,255,136,54,19,255,139,56,19,255,139,56,19,255,139,56,19,255,143,58,19,255,143,58,19,255,143,58,19,255,146,60,20,255,146,60,20,255,149,62,20,255,149,62,20,255,149,62,20,255,153,64,20,255,153,64,20,255,156,66,20,255,156,66,20,255,156,66,20,255,159,68,21,255,159,68,21,255,163,70,21,255,166,71,21,255,159,68,21,255,166,71,21,255,166,71,21,255,166,71,21,255,169,73,22,255,169,73,22,255,173,75,22,255,173,75,22,255,173,75,22,255,176,77,22,255,176,77,22,255,179,79,23,255,179,79,23,255,179,79,23,255,183,81,23,255,183,81,23,255,189,85,23,255,189,85,23,255,183,81,23,255,189,85,23,255,189,85,23,255,189,85,23,255,193,87,24,255,193,87,24,255,196,89,24,255,196,89,24,255,196,89,24,255,199,90,24,255,199,90,24,255,203,92,25,255,203,92,25,255,203,92,25,255,203,92,25,255,207,100,31,255,203,92,25,255,204,95,27,255,207,100,31,255,207,100,31,255,207,100,31,255,207,100,31,255,208,102,34,255,208,102,34,255,209,104,36,255,209,104,36,255,209,104,36,255,210,107,38,255,210,107,38,255,212,109,41,255,212,109,41,255,212,109,41,255,213,111,43,255,213,111,43,255,213,111,43,255,214,114,45,255,214,114,45,255,215,116,47,255,215,116,47,255,215,116,47,255,216,119,50,255,216,119,50,255,218,121,52,255,218,121,52,255,218,121,52,255,220,126,57,255,219,123,54,255,220,126,57,255,220,126,57,255,220,126,57,255,221,128,59,255,221,128,59,255,221,128,59,255,223,131,61,255,223,131,61,255,224,133,63,255,224,133,63,255,224,133,63,255,225,135,66,255,225,135,66,255,226,138,68,255,226,138,68,255,226,138,68,255,228,140,70,255,228,140,70,255,229,142,72,255,229,142,72,255,229,142,72,255,230,145,75,255,230,145,75,255,230,145,75,255,231,147,77,255,231,147,77,255,233,150,79,255,233,150,79,255,233,150,79,255,234,152,82,255,234,152,82,255,234,154,85,255,234,154,85,255,234,154,85,255,234,156,87,255,234,156,87,255,234,160,93,255,234,160,93,255,234,156,87,255,234,160,93,255,234,160,93,255,234,160,93,255,234,162,96,255,234,162,96,255,234,164,99,255,234,164,99,255,234,164,99,255,234,166,102,255,234,166,102,255,235,168,105,255,235,168,105,255,235,168,105,255,235,170,108,255,235,170,108,255,235,173,111,255,235,173,111,255,235,173,111,255,235,175,113,255,235,175,113,255,235,175,113,255,235,177,116,255,235,177,116,255,235,179,119,255,235,179,119,255,235,179,119,255,235,181,122,255,235,181,122,255,235,183,125,255,235,183,125,255,235,183,125,255,235,185,128,255,235,185,128,255,235,187,131,255,235,187,131,255,235,187,131,255,235,189,134,255,235,189,134,255,235,189,134,255,235,191,137,255,235,191,137,255,236,193,139,255,236,193,139,255,236,193,139,255,236,195,142,255,236,195,142,255,236,197,145,255,236,197,145,255,236,197,145,255,236,199,148,255,236,199,148,255,236,201,151,255,236,201,151,255,236,201,151,255,236,203,154,255,236,203,154,255,236,203,154,255,236,204,156,255,236,204,156,255,236,205,158,255,236,205,158,255,236,205,158,255,236,206,160,255,236,206,160,255,235,207,162,255,235,207,162,255,235,207,162,255,235,208,165,255,235,208,165,255,235,208,165,255,235,209,167,255,235,209,167,255,235,209,169,255,235,209,169,255,235,209,169,255,235,210,171,255,235,210,171,255,235,210,171,255,235,210,171,255,235,210,171,255,235,214,179,255,235,210,171,255,235,214,179,255,235,214,179,255,235,214,179,255,235,214,179,255,235,214,179,255,235,214,179,255,234,215,182,255,234,215,182,255,234,216,184,255,234,216,184,255,234,216,184,255,234,217,186,255,234,217,186,255,234,218,188,255,234,218,188,255,234,218,188,255,234,218,188,255,234,218,188,255,234,220,194,255,234,218,188,255,234,220,194,255,234,220,194,255,234,220,194,255,234,220,194,255,234,221,196,255,234,221,196,255,234,222,199,255,234,222,199,255,234,222,199,255,233,224,203,255,234,222,199,255,233,224,203,255,233,224,203,255,233,224,203,255,233,225,205,255,233,225,205,255,233,226,207,255,233,226,207,255,233,226,207,255,233,226,207,255,233,225,205,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.siennaTones = map ;
	 var map = undefined; 

	 /* processing brassTones colormap */ 
	 var map = {}; 
	 map.name = "brassTones" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 36,40,12,255,36,40,12,255,36,40,12,255,41,44,14,255,41,44,14,255,45,47,15,255,45,47,15,255,45,47,15,255,50,51,17,255,50,51,17,255,54,55,19,255,54,55,19,255,54,55,19,255,59,58,21,255,59,58,21,255,63,62,23,255,63,62,23,255,63,62,23,255,68,66,25,255,68,66,25,255,68,66,25,255,72,69,27,255,72,69,27,255,77,73,29,255,77,73,29,255,77,73,29,255,81,77,31,255,81,77,31,255,86,81,33,255,86,81,33,255,86,81,33,255,91,84,35,255,91,84,35,255,96,89,37,255,96,89,37,255,96,89,37,255,102,94,40,255,102,94,40,255,102,94,40,255,108,99,43,255,108,99,43,255,114,105,45,255,114,105,45,255,114,105,45,255,120,110,48,255,120,110,48,255,126,115,51,255,126,115,51,255,126,115,51,255,132,121,54,255,132,121,54,255,138,126,56,255,138,126,56,255,138,126,56,255,144,131,59,255,144,131,59,255,144,131,59,255,150,136,62,255,150,136,62,255,156,142,65,255,156,142,65,255,156,142,65,255,162,147,67,255,162,147,67,255,168,152,70,255,168,152,70,255,168,152,70,255,174,158,73,255,174,158,73,255,174,158,73,255,179,163,76,255,179,163,76,255,185,168,79,255,185,168,79,255,185,168,79,255,191,174,82,255,191,174,82,255,197,179,85,255,197,179,85,255,197,179,85,255,203,185,87,255,203,185,87,255,209,190,90,255,209,190,90,255,209,190,90,255,215,195,93,255,215,195,93,255,215,195,93,255,221,201,96,255,221,201,96,255,227,206,99,255,227,206,99,255,227,206,99,255,233,211,102,255,233,211,102,255,239,217,105,255,239,217,105,255,239,217,105,255,241,219,106,255,241,219,106,255,239,217,105,255,239,217,105,255,239,217,105,255,237,216,105,255,237,216,105,255,237,216,105,255,237,216,105,255,237,216,105,255,234,213,103,255,234,213,103,255,234,213,103,255,232,211,103,255,232,211,103,255,230,210,102,255,230,210,102,255,230,210,102,255,229,208,101,255,229,208,101,255,227,206,101,255,227,206,101,255,227,206,101,255,227,206,101,255,227,206,101,255,227,206,101,255,224,203,99,255,224,204,100,255,222,202,99,255,222,202,99,255,222,202,99,255,220,200,98,255,220,200,98,255,222,202,99,255,222,202,99,255,222,202,99,255,222,202,99,255,222,202,99,255,222,202,99,255,222,202,99,255,222,202,99,255,222,202,99,255,222,202,99,255,222,202,99,255,222,202,99,255,222,202,99,255,222,202,99,255,222,202,99,255,222,202,99,255,222,202,99,255,222,202,99,255,224,204,100,255,222,202,99,255,224,204,100,255,222,202,99,255,224,204,100,255,224,204,100,255,224,204,100,255,224,204,100,255,224,204,100,255,224,204,100,255,224,204,100,255,224,204,100,255,227,206,101,255,222,202,99,255,224,204,100,255,222,202,99,255,221,201,99,255,220,200,98,255,217,198,97,255,217,198,97,255,217,198,97,255,214,195,95,255,214,195,95,255,211,193,94,255,211,193,94,255,211,193,94,255,209,190,93,255,209,190,93,255,209,190,93,255,206,188,91,255,206,188,91,255,203,185,90,255,203,185,90,255,203,185,90,255,200,182,89,255,200,182,89,255,197,180,87,255,197,180,87,255,197,180,87,255,194,177,86,255,194,177,86,255,191,175,85,255,191,175,85,255,191,175,85,255,189,172,83,255,189,172,83,255,189,172,83,255,183,167,81,255,183,167,81,255,178,163,78,255,178,163,78,255,178,163,78,255,173,158,76,255,173,158,76,255,168,154,73,255,168,154,73,255,168,154,73,255,163,149,71,255,163,149,71,255,163,149,71,255,157,144,68,255,157,144,68,255,152,140,66,255,152,140,66,255,152,140,66,255,147,135,63,255,147,135,63,255,142,130,61,255,142,130,61,255,142,130,61,255,137,126,58,255,137,126,58,255,131,121,56,255,131,121,56,255,131,121,56,255,126,116,53,255,126,116,53,255,126,116,53,255,120,111,51,255,120,111,51,255,114,105,47,255,114,105,47,255,114,105,47,255,108,100,44,255,108,100,44,255,101,94,41,255,101,94,41,255,102,94,40,255,95,88,38,255,95,88,38,255,89,83,35,255,89,83,35,255,91,84,35,255,83,77,32,255,83,77,32,255,83,77,32,255,76,71,29,255,76,71,29,255,70,66,26,255,70,66,26,255,70,66,26,255,64,60,23,255,64,60,23,255,57,54,19,255,57,54,19,255,57,54,19,255,51,49,16,255,51,49,16,255,45,43,13,255,45,43,13,255,45,43,13,255,45,43,13,255,45,43,13,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.brassTones = map ;
	 var map = undefined; 

	 /* processing greenPinkTones colormap */ 
	 var map = {}; 
	 map.name = "greenPinkTones" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 0,63,5,255,0,63,5,255,0,63,5,255,0,71,6,255,0,71,6,255,0,79,7,255,0,79,7,255,0,79,7,255,0,87,8,255,0,87,8,255,0,95,9,255,0,95,9,255,0,95,9,255,0,103,9,255,0,103,9,255,0,111,10,255,0,111,10,255,0,111,10,255,0,120,11,255,0,120,11,255,0,120,11,255,0,128,12,255,0,128,12,255,0,137,13,255,0,137,13,255,0,137,13,255,1,146,14,255,1,146,14,255,1,155,15,255,1,155,15,255,1,155,15,255,1,163,16,255,1,163,16,255,1,172,17,255,1,172,17,255,1,172,17,255,3,180,19,255,3,180,19,255,3,180,19,255,6,187,21,255,6,187,21,255,8,194,24,255,8,194,24,255,8,194,24,255,11,201,26,255,11,201,26,255,13,208,29,255,13,208,29,255,13,208,29,255,16,215,31,255,16,215,31,255,18,222,33,255,18,222,33,255,18,222,33,255,25,225,39,255,25,225,39,255,25,225,39,255,32,228,44,255,32,228,44,255,38,231,49,255,38,231,49,255,38,231,49,255,45,235,55,255,45,235,55,255,52,238,60,255,52,238,60,255,52,238,60,255,58,241,65,255,58,241,65,255,58,241,65,255,66,243,71,255,66,243,71,255,74,244,79,255,74,244,79,255,74,244,79,255,83,245,87,255,83,245,87,255,91,246,94,255,91,246,94,255,91,246,94,255,99,247,102,255,99,247,102,255,108,248,110,255,108,248,110,255,108,248,110,255,116,249,117,255,116,249,117,255,116,249,117,255,125,249,125,255,125,249,125,255,134,250,134,255,134,250,134,255,134,250,134,255,142,250,143,255,142,250,143,255,151,250,151,255,151,250,151,255,151,250,151,255,160,250,160,255,160,250,160,255,168,250,168,255,168,250,168,255,168,250,168,255,177,251,177,255,177,251,177,255,177,251,177,255,184,250,184,255,184,250,184,255,191,249,191,255,191,249,191,255,191,249,191,255,198,247,198,255,198,247,198,255,205,246,205,255,205,246,205,255,205,246,205,255,212,245,212,255,212,245,212,255,219,244,219,255,219,244,219,255,219,244,219,255,225,242,225,255,225,242,225,255,225,242,225,255,229,239,229,255,229,239,229,255,232,235,232,255,232,235,232,255,232,235,232,255,236,231,236,255,236,231,236,255,240,227,239,255,240,227,239,255,240,227,239,255,243,224,243,255,243,224,243,255,247,220,247,255,247,220,247,255,247,220,247,255,249,214,248,255,249,214,248,255,249,214,248,255,250,207,249,255,250,207,249,255,251,201,250,255,251,201,250,255,251,201,250,255,252,194,251,255,252,194,251,255,253,187,252,255,253,187,252,255,253,187,252,255,254,181,253,255,254,181,253,255,255,174,254,255,255,174,254,255,255,174,254,255,254,166,254,255,254,166,254,255,254,166,254,255,254,158,253,255,254,158,253,255,254,150,253,255,254,150,253,255,254,150,253,255,254,142,253,255,254,142,253,255,254,134,253,255,254,134,253,255,254,134,253,255,254,127,253,255,254,127,253,255,254,119,252,255,254,119,252,255,254,119,252,255,253,113,251,255,253,113,251,255,253,113,251,255,252,106,250,255,252,106,250,255,250,100,249,255,250,100,249,255,250,100,249,255,249,93,248,255,249,93,248,255,248,87,247,255,248,87,247,255,248,87,247,255,247,80,246,255,247,80,246,255,245,75,244,255,245,75,244,255,245,75,244,255,241,72,240,255,241,72,240,255,241,72,240,255,237,68,237,255,237,68,237,255,234,64,233,255,234,64,233,255,234,64,233,255,230,60,230,255,230,60,230,255,227,57,226,255,227,57,226,255,227,57,226,255,223,53,223,255,223,53,223,255,223,53,223,255,216,51,216,255,216,51,216,255,209,48,208,255,209,48,208,255,209,48,208,255,201,46,201,255,201,46,201,255,194,44,194,255,194,44,194,255,194,44,194,255,186,42,186,255,186,42,186,255,179,40,179,255,179,40,179,255,179,40,179,255,171,37,171,255,171,37,171,255,171,37,171,255,163,35,163,255,163,35,163,255,154,34,154,255,154,34,154,255,154,34,154,255,145,32,145,255,145,32,145,255,137,30,136,255,137,30,136,255,137,30,136,255,128,28,128,255,128,28,128,255,119,26,119,255,119,26,119,255,119,26,119,255,111,24,110,255,111,24,110,255,111,24,110,255,103,22,102,255,103,22,102,255,95,21,94,255,95,21,94,255,95,21,94,255,86,19,86,255,86,19,86,255,78,17,78,255,78,17,78,255,78,17,78,255,70,15,69,255,70,15,69,255,62,14,61,255,62,14,61,255,62,14,61,255,62,14,61,255,62,14,61,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.greenPinkTones = map ;
	 var map = undefined; 

	 /* processing solarColors colormap */ 
	 var map = {}; 
	 map.name = "solarColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 119,1,4,255,119,1,4,255,119,1,4,255,123,2,3,255,123,2,3,255,127,3,3,255,127,3,3,255,127,3,3,255,130,4,3,255,130,4,3,255,134,6,3,255,134,6,3,255,134,6,3,255,138,7,3,255,138,7,3,255,141,8,3,255,141,8,3,255,141,8,3,255,145,9,3,255,145,9,3,255,145,9,3,255,148,11,3,255,148,11,3,255,152,12,2,255,152,12,2,255,152,12,2,255,156,13,2,255,156,13,2,255,159,14,2,255,159,14,2,255,159,14,2,255,159,14,2,255,167,17,2,255,167,17,2,255,167,17,2,255,167,17,2,255,170,18,2,255,170,18,2,255,170,18,2,255,174,19,2,255,174,19,2,255,177,21,2,255,177,21,2,255,177,21,2,255,181,22,1,255,181,22,1,255,185,23,1,255,185,23,1,255,185,23,1,255,188,24,1,255,188,24,1,255,192,26,1,255,192,26,1,255,192,26,1,255,195,27,1,255,195,27,1,255,195,27,1,255,199,28,1,255,199,28,1,255,203,29,1,255,203,29,1,255,203,29,1,255,211,34,1,255,203,29,1,255,210,32,1,255,210,32,1,255,210,32,1,255,211,34,1,255,211,34,1,255,211,34,1,255,213,37,1,255,213,37,1,255,215,40,1,255,215,40,1,255,213,37,1,255,218,45,2,255,218,45,2,255,218,45,2,255,219,47,2,255,219,47,2,255,219,47,2,255,219,47,2,255,221,50,3,255,221,50,3,255,221,50,3,255,222,53,3,255,222,53,3,255,222,53,3,255,224,55,3,255,224,55,3,255,225,58,3,255,225,58,3,255,225,58,3,255,227,60,4,255,227,60,4,255,228,63,4,255,228,63,4,255,228,63,4,255,230,66,4,255,230,66,4,255,231,68,5,255,231,68,5,255,231,68,5,255,233,71,5,255,233,71,5,255,233,71,5,255,234,73,5,255,234,73,5,255,236,76,5,255,236,76,5,255,236,76,5,255,237,79,6,255,237,79,6,255,239,81,6,255,239,81,6,255,239,81,6,255,240,84,6,255,240,84,6,255,242,86,7,255,242,86,7,255,242,86,7,255,243,89,7,255,243,89,7,255,243,89,7,255,245,92,7,255,245,92,7,255,246,94,7,255,246,94,7,255,246,94,7,255,248,97,8,255,248,97,8,255,248,100,8,255,248,100,8,255,248,97,8,255,249,108,10,255,248,100,8,255,249,108,10,255,248,100,8,255,249,108,10,255,249,108,10,255,249,108,10,255,249,108,10,255,249,111,10,255,249,111,10,255,250,113,11,255,250,113,11,255,250,113,11,255,250,116,11,255,250,116,11,255,250,119,12,255,250,119,12,255,250,119,12,255,251,122,12,255,251,122,12,255,251,125,13,255,251,125,13,255,251,125,13,255,251,125,13,255,251,130,14,255,251,125,13,255,251,130,14,255,251,130,14,255,252,133,14,255,252,133,14,255,252,133,14,255,252,136,15,255,252,136,15,255,252,136,15,255,253,141,16,255,252,136,15,255,253,141,16,255,253,141,16,255,253,144,16,255,253,144,16,255,253,144,16,255,254,149,17,255,253,144,16,255,254,149,17,255,254,149,17,255,254,149,17,255,254,152,18,255,254,152,18,255,254,152,18,255,255,158,19,255,254,152,18,255,255,158,19,255,255,158,19,255,255,158,19,255,255,161,19,255,255,161,19,255,255,163,20,255,255,163,20,255,255,163,20,255,255,166,20,255,255,166,20,255,255,166,20,255,255,168,21,255,255,168,21,255,255,173,22,255,255,168,21,255,255,168,21,255,255,173,22,255,255,168,21,255,255,173,22,255,255,173,22,255,255,173,22,255,255,173,22,255,255,179,23,255,255,173,22,255,255,179,23,255,255,179,23,255,255,179,23,255,255,179,23,255,255,179,23,255,255,180,24,255,255,180,24,255,255,182,24,255,255,182,24,255,255,182,24,255,255,184,25,255,255,184,25,255,255,189,26,255,255,184,25,255,255,184,25,255,255,189,26,255,255,184,25,255,255,189,26,255,255,189,26,255,255,189,26,255,255,191,27,255,255,191,27,255,255,189,26,255,255,194,28,255,255,194,28,255,255,194,28,255,255,194,28,255,255,194,28,255,255,196,28,255,255,194,28,255,255,200,29,255,255,200,29,255,255,200,29,255,255,200,29,255,255,200,29,255,255,200,29,255,255,200,29,255,255,200,29,255,255,205,31,255,255,200,29,255,255,205,31,255,255,205,31,255,255,205,31,255,255,210,32,255,255,205,31,255,255,205,31,255,255,210,32,255,255,210,32,255,255,210,32,255,255,210,32,255,255,210,32,255,255,210,32,255,255,210,32,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.solarColors = map ;
	 var map = undefined; 

	 /* processing brightBands colormap */ 
	 var map = {}; 
	 map.name = "brightBands" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 230,27,50,255,230,27,50,255,230,27,50,255,232,35,60,255,232,35,60,255,234,43,69,255,234,43,69,255,234,43,69,255,235,52,78,255,235,52,78,255,237,60,87,255,237,60,87,255,237,60,87,255,239,68,97,255,239,68,97,255,240,77,106,255,240,77,106,255,240,77,106,255,242,85,115,255,242,85,115,255,242,85,115,255,244,94,124,255,244,94,124,255,245,102,133,255,245,102,133,255,245,102,133,255,247,110,143,255,247,110,143,255,248,119,152,255,248,119,152,255,248,119,152,255,250,127,161,255,250,127,161,255,252,136,170,255,252,136,170,255,252,136,170,255,253,144,180,255,253,144,180,255,253,144,180,255,255,152,189,255,255,152,189,255,106,83,255,255,106,83,255,255,106,83,255,255,112,89,255,255,112,89,255,255,118,96,255,255,118,96,255,255,118,96,255,255,125,103,255,255,125,103,255,255,131,110,255,255,131,110,255,255,131,110,255,255,137,117,255,255,137,117,255,255,137,117,255,255,143,123,255,255,143,123,255,255,149,130,255,255,149,130,255,255,149,130,255,255,155,137,255,255,155,137,255,255,161,144,255,255,161,144,255,255,161,144,255,255,167,150,255,255,167,150,255,255,167,150,255,255,173,157,255,255,173,157,255,255,179,164,255,255,179,164,255,255,179,164,255,255,185,171,255,255,185,171,255,255,191,178,255,255,191,178,255,255,191,178,255,255,197,184,255,255,197,184,255,255,204,191,255,255,204,191,255,255,204,191,255,255,33,183,255,255,33,183,255,255,33,183,255,255,42,186,255,255,42,186,255,255,50,190,255,255,50,190,255,255,50,190,255,255,58,193,255,255,58,193,255,255,67,197,255,255,67,197,255,255,67,197,255,255,75,200,255,255,75,200,255,255,83,204,255,255,83,204,255,255,83,204,255,255,92,207,255,255,92,207,255,255,92,207,255,255,100,211,255,255,100,211,255,255,108,214,255,255,108,214,255,255,108,214,255,255,117,218,255,255,117,218,255,255,125,222,255,255,125,222,255,255,125,222,255,255,133,225,255,255,133,225,255,255,141,229,255,255,141,229,255,255,141,229,255,255,150,232,255,255,150,232,255,255,150,232,255,255,158,236,255,255,158,236,255,255,166,239,255,255,166,239,255,255,166,239,255,255,60,248,29,255,60,248,29,255,67,249,36,255,67,249,36,255,67,249,36,255,75,249,43,255,75,249,43,255,83,250,50,255,83,250,50,255,83,250,50,255,90,250,57,255,90,250,57,255,90,250,57,255,98,251,64,255,98,251,64,255,106,251,71,255,106,251,71,255,106,251,71,255,113,252,78,255,113,252,78,255,121,252,85,255,121,252,85,255,121,252,85,255,129,253,92,255,129,253,92,255,136,253,99,255,136,253,99,255,136,253,99,255,144,254,106,255,144,254,106,255,144,254,106,255,152,254,113,255,152,254,113,255,159,255,120,255,159,255,120,255,159,255,120,255,167,255,127,255,167,255,127,255,175,255,134,255,175,255,134,255,175,255,134,255,182,255,140,255,182,255,140,255,249,241,53,255,249,241,53,255,249,241,53,255,249,242,59,255,249,242,59,255,249,242,59,255,250,242,66,255,250,242,66,255,250,243,72,255,250,243,72,255,250,243,72,255,250,243,78,255,250,243,78,255,251,244,84,255,251,244,84,255,251,244,84,255,251,245,90,255,251,245,90,255,252,245,96,255,252,245,96,255,252,245,96,255,252,246,102,255,252,246,102,255,252,246,102,255,252,246,109,255,252,246,109,255,253,247,115,255,253,247,115,255,253,247,115,255,253,248,121,255,253,248,121,255,254,248,127,255,254,248,127,255,254,248,127,255,254,249,133,255,254,249,133,255,254,249,133,255,255,249,139,255,255,249,139,255,255,250,146,255,255,250,146,255,255,250,146,255,255,250,152,255,255,250,152,255,255,132,6,255,255,132,6,255,255,132,6,255,255,136,14,255,255,136,14,255,255,139,21,255,255,139,21,255,255,139,21,255,255,143,29,255,255,143,29,255,255,143,29,255,255,147,37,255,255,147,37,255,255,151,44,255,255,151,44,255,255,151,44,255,255,155,52,255,255,155,52,255,255,158,59,255,255,158,59,255,255,158,59,255,255,162,67,255,255,162,67,255,255,166,75,255,255,166,75,255,255,166,75,255,255,170,82,255,255,170,82,255,255,170,82,255,255,174,90,255,255,174,90,255,255,177,97,255,255,177,97,255,255,177,97,255,255,181,105,255,255,181,105,255,255,185,113,255,255,185,113,255,255,185,113,255,255,189,120,255,255,189,120,255,255,192,128,255,255,192,128,255,255,192,128,255,255,192,128,255,255,192,128,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.brightBands = map ;
	 var map = undefined; 

	 /* processing islandColors colormap */ 
	 var map = {}; 
	 map.name = "islandColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 195,94,53,255,195,94,53,255,195,94,53,255,190,99,62,255,190,99,62,255,184,105,70,255,184,105,70,255,184,105,70,255,179,110,78,255,179,110,78,255,174,116,87,255,174,116,87,255,174,116,87,255,169,121,95,255,169,121,95,255,163,126,104,255,163,126,104,255,163,126,104,255,158,132,112,255,158,132,112,255,158,132,112,255,153,137,120,255,153,137,120,255,148,143,129,255,148,143,129,255,148,143,129,255,142,148,137,255,142,148,137,255,137,154,146,255,137,154,146,255,137,154,146,255,136,157,150,255,136,157,150,255,136,160,154,255,136,160,154,255,136,160,154,255,136,163,159,255,136,163,159,255,136,163,159,255,136,167,163,255,136,167,163,255,136,170,167,255,136,170,167,255,136,170,167,255,136,173,171,255,136,173,171,255,136,176,176,255,136,176,176,255,136,176,176,255,135,179,180,255,135,179,180,255,135,183,184,255,135,183,184,255,135,183,184,255,135,186,188,255,135,186,188,255,135,186,188,255,135,189,193,255,135,189,193,255,137,191,195,255,137,191,195,255,137,191,195,255,139,193,197,255,139,193,197,255,141,196,200,255,141,196,200,255,141,196,200,255,144,198,202,255,144,198,202,255,144,198,202,255,146,200,204,255,146,200,204,255,148,202,206,255,148,202,206,255,148,202,206,255,151,204,209,255,151,204,209,255,153,206,211,255,153,206,211,255,153,206,211,255,155,208,213,255,155,208,213,255,158,211,215,255,158,211,215,255,158,211,215,255,160,213,217,255,160,213,217,255,160,213,217,255,163,214,219,255,163,214,219,255,165,216,220,255,165,216,220,255,165,216,220,255,163,214,219,255,171,219,222,255,171,219,222,255,171,219,222,255,171,219,222,255,174,220,223,255,174,220,223,255,177,222,223,255,177,222,223,255,177,222,223,255,180,223,224,255,180,223,224,255,180,223,224,255,183,225,225,255,183,225,225,255,186,226,226,255,186,226,226,255,186,226,226,255,188,228,227,255,188,228,227,255,191,229,228,255,191,229,228,255,191,229,228,255,194,230,228,255,194,230,228,255,196,231,228,255,196,231,228,255,196,231,228,255,198,232,227,255,198,232,227,255,198,232,227,255,200,233,227,255,200,233,227,255,202,234,227,255,202,234,227,255,202,234,227,255,205,234,226,255,205,234,226,255,207,235,226,255,207,235,226,255,207,235,226,255,209,236,226,255,209,236,226,255,211,237,225,255,211,237,225,255,213,238,225,255,213,238,225,255,213,238,225,255,216,239,224,255,217,239,223,255,216,239,224,255,217,239,223,255,217,239,223,255,217,239,223,255,219,239,220,255,219,239,220,255,219,239,220,255,219,239,220,255,219,239,220,255,219,239,220,255,219,239,220,255,221,239,214,255,219,239,218,255,219,239,218,255,222,239,212,255,219,239,218,255,222,239,212,255,222,239,212,255,221,239,214,255,222,239,210,255,222,239,210,255,222,239,210,255,223,239,209,255,223,239,209,255,224,239,207,255,224,239,207,255,223,239,209,255,225,239,205,255,225,239,203,255,225,239,203,255,225,239,203,255,225,239,203,255,224,238,199,255,224,238,199,255,224,238,199,255,223,237,196,255,223,237,196,255,222,236,193,255,222,236,193,255,222,236,193,255,221,236,190,255,221,236,190,255,221,235,187,255,221,235,187,255,221,235,187,255,220,234,183,255,220,234,183,255,219,233,180,255,219,233,180,255,219,233,180,255,218,232,177,255,218,232,177,255,218,232,177,255,217,232,174,255,217,232,174,255,216,231,171,255,216,231,171,255,216,231,171,255,215,230,167,255,215,230,167,255,213,229,163,255,213,229,163,255,213,229,163,255,211,227,159,255,211,227,159,255,211,227,159,255,209,226,155,255,209,226,155,255,207,225,151,255,207,225,151,255,207,225,151,255,204,223,147,255,204,223,147,255,202,222,143,255,202,222,143,255,202,222,143,255,200,221,139,255,200,221,139,255,198,219,135,255,198,219,135,255,198,219,135,255,196,218,131,255,196,218,131,255,196,218,131,255,194,217,127,255,194,217,127,255,192,215,123,255,192,215,123,255,192,215,123,255,190,214,119,255,190,214,119,255,188,213,115,255,188,213,115,255,188,213,115,255,186,212,111,255,186,212,111,255,183,210,107,255,183,210,107,255,183,210,107,255,181,209,103,255,181,209,103,255,181,209,103,255,179,208,99,255,179,208,99,255,177,206,95,255,177,206,95,255,177,206,95,255,175,205,91,255,175,205,91,255,173,204,87,255,173,204,87,255,173,204,87,255,171,203,83,255,171,203,83,255,169,201,79,255,169,201,79,255,169,201,79,255,169,201,79,255,169,201,79,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.islandColors = map ;
	 var map = undefined; 

	 /* processing southwestColors colormap */ 
	 var map = {}; 
	 map.name = "southwestColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 101,80,52,255,101,80,52,255,101,80,52,255,106,79,50,255,106,79,50,255,111,79,49,255,111,79,49,255,111,79,49,255,116,78,48,255,116,78,48,255,121,77,47,255,121,77,47,255,121,77,47,255,126,77,45,255,126,77,45,255,131,76,44,255,131,76,44,255,131,76,44,255,136,75,43,255,136,75,43,255,136,75,43,255,141,75,42,255,141,75,42,255,146,74,40,255,146,74,40,255,146,74,40,255,151,73,39,255,151,73,39,255,156,73,38,255,156,73,38,255,156,73,38,255,156,73,38,255,156,73,38,255,160,79,38,255,156,73,38,255,160,79,38,255,160,79,38,255,160,79,38,255,160,79,38,255,162,81,39,255,162,81,39,255,163,84,39,255,163,84,39,255,163,84,39,255,165,86,39,255,165,86,39,255,166,88,39,255,166,88,39,255,166,88,39,255,167,90,39,255,166,88,39,255,170,95,40,255,169,93,40,255,170,95,40,255,170,95,40,255,170,95,40,255,170,95,40,255,172,97,40,255,172,97,40,255,173,100,43,255,173,100,43,255,173,100,43,255,174,104,47,255,174,104,47,255,175,108,50,255,175,108,50,255,175,108,50,255,177,111,54,255,177,111,54,255,177,111,54,255,178,115,57,255,178,115,57,255,179,119,61,255,179,119,61,255,179,119,61,255,180,122,65,255,180,122,65,255,181,126,68,255,181,126,68,255,181,126,68,255,183,130,72,255,183,130,72,255,184,133,76,255,184,133,76,255,184,133,76,255,185,137,79,255,185,137,79,255,185,137,79,255,187,140,82,255,187,140,82,255,188,144,85,255,188,144,85,255,188,144,85,255,189,147,88,255,189,147,88,255,191,150,90,255,191,150,90,255,191,150,90,255,192,153,93,255,192,153,93,255,194,156,96,255,194,156,96,255,194,156,96,255,195,160,98,255,195,160,98,255,195,160,98,255,197,163,101,255,197,163,101,255,198,166,104,255,198,166,104,255,198,166,104,255,200,169,106,255,200,169,106,255,201,172,109,255,201,172,109,255,201,172,109,255,203,175,110,255,203,175,110,255,204,177,110,255,204,177,110,255,204,177,110,255,205,180,110,255,205,180,110,255,205,180,110,255,208,184,109,255,205,180,110,255,208,184,109,255,208,184,109,255,208,184,109,255,208,184,109,255,208,184,109,255,210,189,109,255,210,189,109,255,210,189,109,255,214,196,108,255,210,189,109,255,214,196,108,255,211,191,108,255,214,196,108,255,214,196,108,255,214,196,108,255,214,196,108,255,215,198,107,255,215,198,107,255,216,199,107,255,216,199,107,255,216,199,107,255,215,201,105,255,215,198,107,255,215,201,105,255,215,201,105,255,215,201,105,255,215,202,103,255,215,202,103,255,215,202,103,255,214,205,99,255,215,201,105,255,214,205,99,255,215,202,103,255,215,202,103,255,214,205,99,255,215,202,103,255,214,205,99,255,214,205,99,255,214,205,99,255,214,205,99,255,213,207,97,255,213,207,97,255,213,207,97,255,213,207,96,255,213,207,96,255,213,207,96,255,212,208,94,255,212,208,94,255,212,208,94,255,209,206,92,255,209,206,92,255,209,206,92,255,207,205,90,255,207,205,90,255,204,204,87,255,204,204,87,255,204,204,87,255,202,202,85,255,202,202,85,255,199,201,83,255,199,201,83,255,199,201,83,255,197,200,81,255,197,200,81,255,194,199,78,255,194,199,78,255,194,199,78,255,194,199,78,255,189,196,74,255,194,199,78,255,189,196,74,255,189,196,74,255,187,195,71,255,187,195,71,255,187,195,71,255,184,193,71,255,187,195,71,255,180,192,75,255,180,192,75,255,180,192,75,255,177,190,79,255,177,190,79,255,177,190,79,255,173,188,83,255,173,188,83,255,169,187,88,255,169,187,88,255,169,187,88,255,165,185,92,255,165,185,92,255,161,183,96,255,161,183,96,255,161,183,96,255,157,182,101,255,157,182,101,255,154,180,105,255,154,180,105,255,154,180,105,255,150,178,109,255,150,178,109,255,150,178,109,255,146,176,113,255,146,176,113,255,142,175,118,255,142,175,118,255,142,175,118,255,137,173,127,255,137,173,127,255,133,171,136,255,133,171,136,255,133,171,136,255,128,169,145,255,128,169,145,255,123,167,155,255,123,167,155,255,123,167,155,255,118,165,164,255,118,165,164,255,118,165,164,255,113,163,173,255,113,163,173,255,109,161,182,255,109,161,182,255,109,161,182,255,104,159,191,255,104,159,191,255,99,157,200,255,99,157,200,255,99,157,200,255,94,155,209,255,94,155,209,255,89,153,218,255,89,153,218,255,89,153,218,255,89,153,218,255,89,153,218,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.southwestColors = map ;
	 var map = undefined; 

	 /* processing brownCyanTones colormap */ 
	 var map = {}; 
	 map.name = "brownCyanTones" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 89,52,21,255,89,52,21,255,89,52,21,255,93,56,26,255,93,56,26,255,97,61,30,255,97,61,30,255,97,61,30,255,102,65,34,255,102,65,34,255,106,70,38,255,106,70,38,255,106,70,38,255,110,74,42,255,110,74,42,255,115,79,47,255,115,79,47,255,115,79,47,255,119,83,51,255,119,83,51,255,119,83,51,255,123,88,55,255,123,88,55,255,128,92,59,255,128,92,59,255,128,92,59,255,132,97,64,255,132,97,64,255,136,101,68,255,136,101,68,255,136,101,68,255,141,106,72,255,141,106,72,255,145,110,76,255,145,110,76,255,145,110,76,255,148,114,81,255,148,114,81,255,148,114,81,255,152,118,85,255,152,118,85,255,155,122,90,255,155,122,90,255,155,122,90,255,159,126,95,255,159,126,95,255,162,130,99,255,162,130,99,255,162,130,99,255,166,134,104,255,166,134,104,255,169,138,108,255,169,138,108,255,169,138,108,255,172,142,113,255,172,142,113,255,172,142,113,255,176,146,117,255,176,146,117,255,179,150,122,255,179,150,122,255,179,150,122,255,183,154,126,255,183,154,126,255,186,158,131,255,186,158,131,255,186,158,131,255,188,161,134,255,188,161,134,255,188,161,134,255,190,164,138,255,190,164,138,255,192,167,142,255,192,167,142,255,192,167,142,255,194,170,146,255,194,170,146,255,196,173,150,255,196,173,150,255,196,173,150,255,198,176,154,255,198,176,154,255,200,179,157,255,200,179,157,255,200,179,157,255,202,182,161,255,202,182,161,255,202,182,161,255,203,185,165,255,203,185,165,255,205,188,169,255,205,188,169,255,205,188,169,255,207,191,173,255,207,191,173,255,209,194,176,255,209,194,176,255,209,194,176,255,210,197,180,255,210,197,180,255,211,200,183,255,211,200,183,255,211,200,183,255,211,202,187,255,211,202,187,255,211,202,187,255,211,204,190,255,211,204,190,255,211,204,190,255,212,209,196,255,211,204,190,255,212,209,196,255,212,209,196,255,212,212,200,255,212,212,200,255,212,212,200,255,212,214,203,255,212,214,203,255,212,217,206,255,212,217,206,255,212,217,206,255,213,219,210,255,213,219,210,255,213,219,210,255,213,222,213,255,213,222,213,255,213,224,216,255,213,224,216,255,213,224,216,255,214,227,219,255,214,227,219,255,212,228,221,255,212,228,221,255,212,228,221,255,211,229,223,255,211,229,223,255,209,230,225,255,209,230,225,255,209,230,225,255,207,231,227,255,207,231,227,255,207,231,227,255,206,232,229,255,206,232,229,255,204,233,231,255,204,233,231,255,204,233,231,255,203,235,233,255,203,235,233,255,201,236,235,255,201,236,235,255,201,236,235,255,200,237,237,255,200,237,237,255,198,238,238,255,198,238,238,255,198,238,238,255,197,239,240,255,197,239,240,255,197,239,240,255,195,240,242,255,195,240,242,255,193,241,243,255,193,241,243,255,193,241,243,255,191,241,244,255,191,241,244,255,188,240,244,255,188,240,244,255,188,240,244,255,186,240,245,255,186,240,245,255,183,240,245,255,183,240,245,255,183,240,245,255,183,240,245,255,183,240,245,255,183,240,245,255,178,239,246,255,178,239,246,255,178,239,246,255,173,239,247,255,178,239,246,255,173,239,247,255,173,239,247,255,171,238,247,255,171,238,247,255,171,238,247,255,166,238,248,255,171,238,247,255,166,238,248,255,166,238,248,255,166,238,248,255,163,237,248,255,163,237,248,255,163,237,248,255,160,236,248,255,160,236,248,255,158,235,247,255,158,235,247,255,158,235,247,255,155,233,246,255,155,233,246,255,152,232,245,255,152,232,245,255,152,232,245,255,149,230,245,255,149,230,245,255,149,230,245,255,147,229,244,255,147,229,244,255,144,227,243,255,144,227,243,255,144,227,243,255,141,226,243,255,141,226,243,255,138,224,242,255,138,224,242,255,138,224,242,255,133,221,241,255,138,224,242,255,133,221,241,255,133,221,241,255,133,221,241,255,130,220,240,255,130,220,240,255,130,220,240,255,127,217,238,255,127,217,238,255,124,213,235,255,124,213,235,255,124,213,235,255,120,209,231,255,120,209,231,255,117,204,228,255,117,204,228,255,117,204,228,255,114,200,224,255,114,200,224,255,110,196,221,255,110,196,221,255,110,196,221,255,107,192,218,255,107,192,218,255,107,192,218,255,104,188,214,255,104,188,214,255,101,184,211,255,101,184,211,255,101,184,211,255,97,180,207,255,97,180,207,255,94,175,204,255,94,175,204,255,94,175,204,255,91,171,201,255,91,171,201,255,87,167,197,255,87,167,197,255,87,167,197,255,87,167,197,255,87,167,197,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.brownCyanTones = map ;
	 var map = undefined; 

	 /* processing lakeColors colormap */ 
	 var map = {}; 
	 map.name = "lakeColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 75,15,135,255,75,15,135,255,75,15,135,255,77,19,138,255,77,19,138,255,79,22,141,255,79,22,141,255,79,22,141,255,81,26,144,255,81,26,144,255,83,30,147,255,83,30,147,255,83,30,147,255,85,33,150,255,85,33,150,255,87,37,153,255,87,37,153,255,87,37,153,255,89,40,155,255,89,40,155,255,89,40,155,255,91,44,158,255,91,44,158,255,93,48,161,255,93,48,161,255,93,48,161,255,95,51,164,255,95,51,164,255,97,55,167,255,97,55,167,255,97,55,167,255,100,59,170,255,100,59,170,255,102,62,173,255,102,62,173,255,102,62,173,255,104,66,176,255,104,66,176,255,104,66,176,255,106,69,179,255,106,69,179,255,108,73,182,255,108,73,182,255,108,73,182,255,110,77,185,255,110,77,185,255,112,80,188,255,112,80,188,255,112,80,188,255,114,84,190,255,114,84,190,255,116,87,193,255,116,87,193,255,116,87,193,255,118,91,196,255,118,91,196,255,118,91,196,255,120,95,199,255,120,95,199,255,122,98,202,255,122,98,202,255,122,98,202,255,124,102,205,255,124,102,205,255,127,105,208,255,127,105,208,255,127,105,208,255,129,109,211,255,129,109,211,255,129,109,211,255,131,113,214,255,131,113,214,255,133,116,217,255,133,116,217,255,133,116,217,255,135,120,220,255,135,120,220,255,137,124,223,255,137,124,223,255,137,124,223,255,139,127,226,255,139,127,226,255,141,131,228,255,141,131,228,255,141,131,228,255,143,134,231,255,143,134,231,255,143,134,231,255,145,137,232,255,145,137,232,255,146,140,232,255,146,140,232,255,146,140,232,255,148,142,232,255,148,142,232,255,149,145,232,255,149,145,232,255,149,145,232,255,151,147,232,255,151,147,232,255,152,149,233,255,152,149,233,255,152,149,233,255,154,152,233,255,154,152,233,255,154,152,233,255,156,154,233,255,156,154,233,255,157,157,233,255,157,157,233,255,157,157,233,255,159,159,233,255,159,159,233,255,160,162,233,255,160,162,233,255,160,162,233,255,162,164,233,255,162,164,233,255,162,164,233,255,166,172,233,255,162,164,233,255,166,172,233,255,163,167,233,255,166,172,233,255,166,172,233,255,166,172,233,255,168,174,233,255,168,174,233,255,168,174,233,255,169,176,233,255,169,176,233,255,169,176,233,255,172,181,233,255,172,181,233,255,172,181,233,255,172,181,233,255,174,184,233,255,174,184,233,255,174,184,233,255,175,186,233,255,175,186,233,255,174,184,233,255,178,191,233,255,178,191,233,255,178,191,233,255,178,191,233,255,178,191,233,255,180,194,233,255,180,194,233,255,181,196,233,255,181,196,233,255,181,196,233,255,183,199,233,255,181,196,233,255,185,201,233,255,188,206,233,255,183,199,233,255,188,206,233,255,188,206,233,255,183,199,233,255,188,206,233,255,188,206,233,255,189,208,233,255,189,208,233,255,188,206,233,255,192,213,233,255,189,208,233,255,192,213,233,255,192,213,233,255,192,213,233,255,195,217,233,255,192,213,233,255,195,217,233,255,195,217,233,255,195,217,233,255,197,218,233,255,197,218,233,255,197,218,233,255,197,218,233,255,197,218,233,255,199,219,231,255,199,219,231,255,199,219,231,255,201,219,231,255,201,219,231,255,203,220,230,255,203,220,230,255,203,220,230,255,203,220,230,255,203,220,230,255,205,221,229,255,205,221,229,255,205,221,229,255,208,222,228,255,205,221,229,255,205,221,229,255,208,222,228,255,208,222,228,255,209,222,227,255,209,222,227,255,209,222,227,255,210,223,227,255,209,222,227,255,212,223,226,255,212,223,226,255,212,223,226,255,212,223,226,255,212,223,226,255,212,223,226,255,214,224,225,255,214,224,225,255,217,225,223,255,214,224,225,255,217,225,223,255,217,225,223,255,217,225,223,255,214,224,225,255,220,226,222,255,214,224,225,255,220,226,222,255,220,226,222,255,223,227,221,255,220,226,222,255,223,227,221,255,223,227,221,255,223,227,221,255,223,227,221,255,223,227,221,255,223,227,221,255,227,228,219,255,227,228,219,255,227,228,219,255,227,228,219,255,227,228,219,255,228,228,219,255,228,228,219,255,228,228,219,255,229,229,218,255,229,229,218,255,231,229,217,255,231,229,217,255,231,229,217,255,232,230,217,255,232,230,217,255,231,229,217,255,231,229,217,255,236,231,215,255,236,231,215,255,235,231,215,255,235,231,215,255,236,231,215,255,236,231,215,255,239,232,214,255,239,232,214,255,239,232,214,255,239,232,214,255,239,232,214,255,240,233,213,255,240,233,213,255,240,233,213,255,240,233,213,255,240,233,213,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.lakeColors = map ;
	 var map = undefined; 

	 /* processing starryNightColors colormap */ 
	 var map = {}; 
	 map.name = "starryNightColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 22,38,52,255,22,38,52,255,22,38,52,255,24,41,54,255,24,41,54,255,25,43,57,255,25,43,57,255,25,43,57,255,27,46,59,255,27,46,59,255,29,49,62,255,29,49,62,255,29,49,62,255,31,52,64,255,31,52,64,255,33,55,67,255,33,55,67,255,33,55,67,255,35,58,69,255,35,58,69,255,35,58,69,255,37,61,72,255,37,61,72,255,39,63,74,255,39,63,74,255,39,63,74,255,41,66,77,255,41,66,77,255,43,69,79,255,43,69,79,255,43,69,79,255,44,72,82,255,44,72,82,255,46,75,84,255,46,75,84,255,46,75,84,255,48,77,87,255,48,77,87,255,48,77,87,255,50,80,89,255,50,80,89,255,51,82,92,255,51,82,92,255,51,82,92,255,53,85,94,255,53,85,94,255,55,87,96,255,55,87,96,255,55,87,96,255,56,90,99,255,56,90,99,255,58,92,101,255,58,92,101,255,58,92,101,255,60,95,104,255,60,95,104,255,60,95,104,255,61,97,106,255,61,97,106,255,63,100,109,255,63,100,109,255,63,100,109,255,65,102,111,255,65,102,111,255,66,105,114,255,66,105,114,255,66,105,114,255,69,108,116,255,69,108,116,255,69,108,116,255,72,111,118,255,72,111,118,255,75,114,121,255,75,114,121,255,75,114,121,255,78,117,123,255,78,117,123,255,81,120,126,255,81,120,126,255,81,120,126,255,84,123,128,255,84,123,128,255,87,126,130,255,87,126,130,255,87,126,130,255,90,129,133,255,90,129,133,255,90,129,133,255,93,132,135,255,93,132,135,255,96,135,138,255,96,135,138,255,96,135,138,255,99,138,140,255,99,138,140,255,102,142,142,255,102,142,142,255,102,142,142,255,105,145,144,255,105,145,144,255,109,147,146,255,109,147,146,255,109,147,146,255,112,150,147,255,112,150,147,255,112,150,147,255,116,153,149,255,116,153,149,255,119,156,150,255,119,156,150,255,119,156,150,255,123,159,152,255,123,159,152,255,126,162,153,255,126,162,153,255,126,162,153,255,130,164,155,255,130,164,155,255,133,167,156,255,133,167,156,255,133,167,156,255,137,170,158,255,137,170,158,255,137,170,158,255,140,173,159,255,140,173,159,255,143,176,161,255,143,176,161,255,143,176,161,255,147,179,162,255,147,179,162,255,150,181,163,255,150,181,163,255,150,181,163,255,154,183,163,255,154,183,163,255,157,186,163,255,157,186,163,255,157,186,163,255,161,188,163,255,161,188,163,255,161,188,163,255,164,190,164,255,164,190,164,255,168,193,164,255,168,193,164,255,168,193,164,255,171,195,164,255,168,193,164,255,175,198,165,255,175,198,165,255,175,198,165,255,178,200,165,255,178,200,165,255,182,202,165,255,182,202,165,255,182,202,165,255,185,205,166,255,185,205,166,255,185,205,166,255,189,207,166,255,189,207,166,255,192,209,166,255,192,209,166,255,192,209,166,255,192,209,166,255,197,211,163,255,197,211,163,255,197,211,163,255,197,211,163,255,201,213,161,255,197,211,163,255,201,213,161,255,201,213,161,255,201,213,161,255,204,214,160,255,204,214,160,255,204,214,160,255,206,215,159,255,206,215,159,255,209,216,158,255,209,216,158,255,209,216,158,255,211,217,157,255,211,217,157,255,214,218,156,255,214,218,156,255,214,218,156,255,216,219,155,255,216,219,155,255,219,220,154,255,219,220,154,255,219,220,154,255,221,221,152,255,221,221,152,255,221,221,152,255,223,221,150,255,223,221,150,255,224,221,148,255,224,221,148,255,224,221,148,255,226,221,146,255,226,221,146,255,227,221,144,255,227,221,144,255,227,221,144,255,229,221,142,255,229,221,142,255,229,221,142,255,231,220,140,255,231,220,140,255,232,220,138,255,232,220,138,255,232,220,138,255,234,220,136,255,234,220,136,255,235,220,134,255,235,220,134,255,235,220,134,255,238,220,130,255,235,220,134,255,238,220,130,255,238,220,130,255,238,220,130,255,240,220,127,255,240,220,127,255,240,220,127,255,241,219,125,255,241,219,125,255,241,218,123,255,241,218,123,255,241,218,123,255,242,217,120,255,241,218,123,255,242,216,117,255,242,216,117,255,242,216,117,255,242,215,115,255,242,215,115,255,243,214,112,255,243,214,112,255,243,214,112,255,243,213,110,255,243,213,110,255,243,213,110,255,243,212,107,255,243,212,107,255,243,212,104,255,243,212,104,255,243,212,107,255,244,211,102,255,244,211,102,255,244,210,99,255,244,210,99,255,244,210,99,255,244,210,99,255,244,210,99,255,245,208,94,255,245,208,94,255,245,208,94,255,245,208,94,255,245,208,94,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.starryNightColors = map ;
	 var map = undefined; 

	 /* processing candyColors colormap */ 
	 var map = {}; 
	 map.name = "candyColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 103,53,87,255,103,53,87,255,103,53,87,255,107,53,88,255,107,53,88,255,110,53,88,255,110,53,88,255,110,53,88,255,114,54,88,255,114,54,88,255,118,54,88,255,118,54,88,255,118,54,88,255,121,54,89,255,121,54,89,255,125,54,89,255,125,54,89,255,125,54,89,255,128,55,89,255,128,55,89,255,128,55,89,255,132,55,89,255,132,55,89,255,136,55,90,255,136,55,90,255,136,55,90,255,139,56,90,255,136,55,90,255,146,56,90,255,139,56,90,255,146,56,90,255,146,56,90,255,146,56,90,255,150,57,91,255,150,57,91,255,150,57,91,255,153,58,92,255,153,58,92,255,153,58,92,255,156,59,93,255,156,59,93,255,159,60,94,255,159,60,94,255,159,60,94,255,163,61,95,255,163,61,95,255,166,62,96,255,166,62,96,255,166,62,96,255,169,63,97,255,169,63,97,255,172,64,99,255,172,64,99,255,172,64,99,255,176,65,100,255,176,65,100,255,176,65,100,255,179,66,101,255,179,66,101,255,182,67,102,255,182,67,102,255,182,67,102,255,182,67,102,255,189,69,104,255,189,69,104,255,189,69,104,255,189,69,104,255,190,71,106,255,190,71,106,255,190,71,106,255,192,74,109,255,192,74,109,255,194,76,111,255,194,76,111,255,194,76,111,255,196,79,114,255,196,79,114,255,198,82,116,255,198,82,116,255,198,82,116,255,200,84,118,255,200,84,118,255,202,87,121,255,202,87,121,255,202,87,121,255,204,89,123,255,204,89,123,255,204,89,123,255,205,92,126,255,205,92,126,255,207,95,128,255,207,95,128,255,207,95,128,255,209,97,130,255,209,97,130,255,211,100,133,255,211,100,133,255,211,100,133,255,212,102,135,255,212,102,135,255,212,105,138,255,212,105,138,255,212,105,138,255,212,108,141,255,212,108,141,255,212,108,141,255,212,111,144,255,212,111,144,255,212,114,147,255,212,114,147,255,212,114,147,255,212,117,149,255,212,117,149,255,212,120,152,255,212,120,152,255,212,120,152,255,212,123,155,255,212,123,155,255,212,125,158,255,212,125,158,255,212,125,158,255,212,128,161,255,212,128,161,255,212,128,161,255,212,131,164,255,212,131,164,255,212,134,166,255,212,134,166,255,212,134,166,255,212,137,169,255,212,137,169,255,211,139,172,255,211,139,172,255,211,139,172,255,210,141,174,255,210,141,174,255,208,144,176,255,208,144,176,255,208,144,176,255,207,146,179,255,207,146,179,255,207,146,179,255,206,148,181,255,206,148,181,255,204,150,183,255,204,150,183,255,204,150,183,255,203,152,186,255,203,152,186,255,202,155,188,255,202,155,188,255,202,155,188,255,200,157,190,255,200,157,190,255,199,159,193,255,199,159,193,255,199,159,193,255,198,161,195,255,198,161,195,255,198,161,195,255,196,163,198,255,196,163,198,255,195,165,200,255,195,165,200,255,195,165,200,255,195,165,200,255,192,169,203,255,192,169,203,255,192,169,203,255,192,169,203,255,191,171,205,255,191,171,205,255,189,173,206,255,189,173,206,255,189,173,206,255,188,174,208,255,188,174,208,255,188,174,208,255,186,176,210,255,186,176,210,255,185,178,211,255,185,178,211,255,185,178,211,255,183,180,213,255,183,180,213,255,182,182,215,255,182,182,215,255,182,182,215,255,181,184,216,255,181,184,216,255,179,185,218,255,179,185,218,255,179,185,218,255,178,187,220,255,178,187,220,255,178,187,220,255,177,189,221,255,177,189,221,255,176,196,224,255,177,189,221,255,176,196,224,255,177,189,221,255,176,196,224,255,176,196,224,255,176,196,224,255,176,196,224,255,175,198,225,255,175,198,225,255,175,198,225,255,175,200,226,255,175,200,226,255,174,204,228,255,175,200,226,255,174,204,228,255,174,204,228,255,174,204,228,255,173,208,230,255,174,204,228,255,173,208,230,255,173,208,230,255,173,208,230,255,173,208,230,255,172,212,232,255,173,208,230,255,172,212,232,255,172,212,232,255,172,212,232,255,171,217,230,255,172,212,232,255,171,215,231,255,171,215,231,255,171,215,231,255,171,215,231,255,171,215,231,255,171,216,230,255,171,216,230,255,171,216,230,255,171,217,230,255,171,217,230,255,171,217,230,255,170,220,228,255,171,217,230,255,170,220,228,255,170,220,228,255,170,220,228,255,170,220,228,255,170,220,228,255,170,220,228,255,170,220,228,255,170,220,228,255,169,221,227,255,169,221,227,255,169,221,227,255,169,223,226,255,169,223,226,255,169,223,226,255,169,221,227,255,168,224,225,255,168,224,225,255,168,224,225,255,168,224,225,255,168,224,225,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.candyColors = map ;
	 var map = undefined; 

	 /* processing lightTemperatureMap colormap */ 
	 var map = {}; 
	 map.name = "lightTemperatureMap" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 42,73,239,255,42,73,239,255,42,73,239,255,46,79,239,255,46,79,239,255,51,86,240,255,51,86,240,255,51,86,240,255,55,93,240,255,55,93,240,255,60,100,240,255,60,100,240,255,60,100,240,255,64,106,241,255,64,106,241,255,69,113,241,255,69,113,241,255,69,113,241,255,73,120,241,255,73,120,241,255,73,120,241,255,77,127,241,255,77,127,241,255,82,133,242,255,82,133,242,255,82,133,242,255,86,140,242,255,86,140,242,255,91,147,242,255,91,147,242,255,91,147,242,255,95,152,243,255,95,152,243,255,99,157,243,255,99,157,243,255,99,157,243,255,104,161,244,255,104,161,244,255,104,161,244,255,108,166,244,255,108,166,244,255,112,171,244,255,112,171,244,255,112,171,244,255,117,176,245,255,117,176,245,255,121,181,245,255,121,181,245,255,121,181,245,255,125,186,246,255,125,186,246,255,130,190,246,255,130,190,246,255,130,190,246,255,134,195,246,255,134,195,246,255,134,195,246,255,138,200,247,255,138,200,247,255,142,204,247,255,142,204,247,255,142,204,247,255,146,207,248,255,146,207,248,255,150,210,248,255,150,210,248,255,150,210,248,255,154,213,248,255,154,213,248,255,154,213,248,255,158,217,249,255,158,217,249,255,162,220,249,255,162,220,249,255,162,220,249,255,166,223,249,255,166,223,249,255,169,226,250,255,169,226,250,255,169,226,250,255,173,230,250,255,173,230,250,255,177,233,250,255,177,233,250,255,177,233,250,255,181,236,251,255,181,236,251,255,181,236,251,255,185,238,251,255,185,238,251,255,188,240,251,255,188,240,251,255,188,240,251,255,192,242,251,255,192,242,251,255,195,243,252,255,195,243,252,255,195,243,252,255,199,245,252,255,199,245,252,255,202,246,252,255,202,246,252,255,202,246,252,255,206,248,252,255,206,248,252,255,206,248,252,255,209,250,253,255,209,250,253,255,213,251,253,255,213,251,253,255,213,251,253,255,216,253,253,255,216,253,253,255,220,255,253,255,220,255,253,255,220,255,253,255,223,255,251,255,223,255,251,255,226,255,248,255,226,255,248,255,226,255,248,255,229,255,244,255,229,255,244,255,229,255,244,255,232,255,240,255,232,255,240,255,235,255,236,255,235,255,236,255,235,255,236,255,238,255,232,255,238,255,232,255,241,255,228,255,241,255,228,255,241,255,228,255,244,255,225,255,244,255,225,255,247,255,221,255,247,255,221,255,247,255,221,255,250,255,217,255,250,255,217,255,250,255,217,255,253,255,213,255,253,255,213,255,255,255,209,255,255,255,209,255,255,255,209,255,254,254,205,255,254,254,205,255,254,252,201,255,254,252,201,255,254,252,201,255,254,251,197,255,254,251,197,255,253,250,193,255,253,250,193,255,253,250,193,255,253,249,189,255,253,249,189,255,253,249,189,255,252,248,186,255,252,248,186,255,252,247,182,255,252,247,182,255,252,247,182,255,252,246,178,255,252,246,178,255,251,244,174,255,251,244,174,255,251,244,174,255,251,243,170,255,251,243,170,255,251,242,166,255,251,242,166,255,251,242,166,255,250,239,162,255,250,239,162,255,250,239,162,255,249,236,158,255,249,236,158,255,248,233,154,255,248,233,154,255,248,233,154,255,247,230,150,255,247,230,150,255,246,227,146,255,246,227,146,255,246,227,146,255,245,224,142,255,245,224,142,255,244,221,138,255,244,221,138,255,244,221,138,255,243,218,134,255,243,218,134,255,243,218,134,255,243,215,129,255,243,215,129,255,242,212,125,255,242,212,125,255,242,212,125,255,241,209,121,255,241,209,121,255,240,205,118,255,240,205,118,255,240,205,118,255,239,200,114,255,239,200,114,255,239,200,114,255,237,196,110,255,237,196,110,255,236,191,106,255,236,191,106,255,236,191,106,255,235,186,102,255,235,186,102,255,234,182,98,255,234,182,98,255,234,182,98,255,233,177,94,255,233,177,94,255,232,173,90,255,232,173,90,255,232,173,90,255,231,168,86,255,231,168,86,255,231,168,86,255,230,164,82,255,230,164,82,255,228,159,79,255,228,159,79,255,228,159,79,255,227,153,76,255,227,153,76,255,226,148,73,255,226,148,73,255,226,148,73,255,225,142,70,255,225,142,70,255,224,136,68,255,224,136,68,255,224,136,68,255,223,130,65,255,223,130,65,255,223,130,65,255,222,124,62,255,222,124,62,255,220,118,59,255,220,118,59,255,220,118,59,255,219,113,57,255,219,113,57,255,218,107,54,255,218,107,54,255,218,107,54,255,217,101,51,255,217,101,51,255,216,95,48,255,216,95,48,255,216,95,48,255,216,95,48,255,216,95,48,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.lightTemperatureMap = map ;
	 var map = undefined; 

	 /* processing sunsetColors colormap */ 
	 var map = {}; 
	 map.name = "sunsetColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 0,1,0,255,0,1,0,255,0,1,0,255,5,3,7,255,5,3,7,255,11,5,15,255,11,5,15,255,11,5,15,255,17,7,23,255,17,7,23,255,22,9,31,255,22,9,31,255,22,9,31,255,28,11,38,255,28,11,38,255,34,13,46,255,34,13,46,255,34,13,46,255,40,15,54,255,40,15,54,255,40,15,54,255,45,17,62,255,45,17,62,255,51,19,70,255,51,19,70,255,51,19,70,255,57,21,77,255,57,21,77,255,62,23,85,255,62,23,85,255,62,23,85,255,68,26,93,255,68,26,93,255,74,28,101,255,74,28,101,255,74,28,101,255,80,30,108,255,80,30,108,255,80,30,108,255,85,32,116,255,85,32,116,255,91,34,124,255,91,34,124,255,91,34,124,255,97,36,128,255,97,36,128,255,103,38,124,255,103,38,124,255,103,38,124,255,110,40,121,255,110,40,121,255,116,42,117,255,116,42,117,255,116,42,117,255,123,44,113,255,123,44,113,255,123,44,113,255,129,45,110,255,129,45,110,255,135,47,106,255,135,47,106,255,135,47,106,255,142,49,103,255,142,49,103,255,148,51,99,255,148,51,99,255,148,51,99,255,154,53,95,255,154,53,95,255,154,53,95,255,161,55,92,255,161,55,92,255,167,57,88,255,167,57,88,255,167,57,88,255,174,59,85,255,174,59,85,255,180,61,81,255,180,61,81,255,180,61,81,255,186,63,77,255,186,63,77,255,193,64,74,255,193,64,74,255,193,64,74,255,199,66,70,255,199,66,70,255,199,66,70,255,203,69,67,255,203,69,67,255,206,72,63,255,206,72,63,255,206,72,63,255,209,75,60,255,209,75,60,255,212,78,56,255,212,78,56,255,212,78,56,255,215,81,53,255,215,81,53,255,218,84,50,255,218,84,50,255,218,84,50,255,221,87,46,255,221,87,46,255,221,87,46,255,224,90,43,255,224,90,43,255,227,93,40,255,227,93,40,255,227,93,40,255,230,95,36,255,230,95,36,255,233,98,33,255,233,98,33,255,233,98,33,255,236,101,29,255,236,101,29,255,238,104,26,255,238,104,26,255,238,104,26,255,241,107,23,255,241,107,23,255,241,107,23,255,244,110,19,255,244,110,19,255,247,113,16,255,247,113,16,255,247,113,16,255,250,116,13,255,250,116,13,255,251,120,14,255,251,120,14,255,251,120,14,255,251,123,15,255,251,123,15,255,251,127,16,255,251,127,16,255,251,127,16,255,251,130,17,255,251,130,17,255,251,130,17,255,252,134,19,255,252,134,19,255,252,137,20,255,252,137,20,255,252,137,20,255,252,141,21,255,252,141,21,255,253,144,22,255,253,144,22,255,253,144,22,255,253,148,23,255,253,148,23,255,253,152,25,255,253,152,25,255,253,152,25,255,254,155,26,255,254,155,26,255,254,155,26,255,254,159,27,255,254,159,27,255,254,162,28,255,254,162,28,255,254,162,28,255,255,166,29,255,255,166,29,255,255,169,31,255,255,169,31,255,255,169,31,255,255,173,32,255,255,173,32,255,255,176,35,255,255,176,35,255,255,176,35,255,255,179,40,255,255,179,40,255,255,179,40,255,255,182,46,255,255,182,46,255,255,185,51,255,255,185,51,255,255,185,51,255,255,189,57,255,255,189,57,255,255,192,62,255,255,192,62,255,255,192,62,255,255,195,68,255,255,195,68,255,255,198,73,255,255,198,73,255,255,198,73,255,255,201,79,255,255,201,79,255,255,201,79,255,255,204,85,255,255,204,85,255,255,207,90,255,255,207,90,255,255,207,90,255,255,210,96,255,255,210,96,255,255,213,101,255,255,213,101,255,255,213,101,255,255,216,107,255,255,216,107,255,255,216,107,255,255,219,112,255,255,219,112,255,255,222,118,255,255,222,118,255,255,222,118,255,255,225,123,255,255,225,123,255,255,228,130,255,255,228,130,255,255,228,130,255,255,229,138,255,255,229,138,255,255,231,146,255,255,231,146,255,255,231,146,255,255,233,154,255,255,233,154,255,255,233,154,255,255,235,162,255,255,235,162,255,255,237,170,255,255,237,170,255,255,237,170,255,255,238,177,255,255,238,177,255,255,240,185,255,255,240,185,255,255,240,185,255,255,242,193,255,255,242,193,255,255,244,201,255,255,244,201,255,255,244,201,255,255,246,209,255,255,246,209,255,255,246,209,255,255,247,216,255,255,247,216,255,255,249,224,255,255,249,224,255,255,249,224,255,255,251,232,255,255,251,232,255,255,253,240,255,255,253,240,255,255,253,240,255,255,255,248,255,255,255,248,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.sunsetColors = map ;
	 var map = undefined; 

	 /* processing cherryTones colormap */ 
	 var map = {}; 
	 map.name = "cherryTones" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 55,56,55,255,55,56,55,255,55,56,55,255,61,55,54,255,61,55,54,255,67,54,53,255,67,54,53,255,67,54,53,255,73,53,52,255,73,53,52,255,80,51,50,255,80,51,50,255,80,51,50,255,86,50,49,255,86,50,49,255,92,49,48,255,92,49,48,255,92,49,48,255,98,48,47,255,98,48,47,255,98,48,47,255,105,47,46,255,105,47,46,255,111,46,45,255,111,46,45,255,111,46,45,255,117,45,44,255,117,45,44,255,123,44,43,255,123,44,43,255,123,44,43,255,130,43,42,255,130,43,42,255,136,42,41,255,136,42,41,255,136,42,41,255,142,41,40,255,142,41,40,255,142,41,40,255,146,41,40,255,146,41,40,255,149,41,40,255,149,41,40,255,149,41,40,255,153,42,41,255,153,42,41,255,156,42,41,255,156,42,41,255,156,42,41,255,159,42,42,255,156,42,41,255,163,43,42,255,163,43,42,255,163,43,42,255,166,43,42,255,166,43,42,255,166,43,42,255,169,44,43,255,169,44,43,255,169,44,43,255,176,44,44,255,176,44,44,255,176,44,44,255,176,44,44,255,179,45,44,255,179,45,44,255,179,45,44,255,182,45,45,255,182,45,45,255,182,45,45,255,186,46,45,255,186,46,45,255,189,46,45,255,189,46,45,255,189,46,45,255,192,47,46,255,192,47,46,255,193,48,48,255,193,48,48,255,193,48,48,255,195,50,49,255,195,50,49,255,196,51,51,255,196,51,51,255,196,51,51,255,198,53,53,255,198,53,53,255,198,53,53,255,199,55,54,255,199,55,54,255,201,56,56,255,201,56,56,255,201,56,56,255,203,58,57,255,203,58,57,255,204,59,59,255,204,59,59,255,204,59,59,255,206,61,61,255,206,61,61,255,207,62,62,255,207,62,62,255,206,61,61,255,209,64,64,255,209,64,64,255,209,64,64,255,211,65,65,255,211,65,65,255,212,67,67,255,212,67,67,255,212,67,67,255,214,69,69,255,214,69,69,255,214,71,71,255,214,71,71,255,214,69,69,255,214,71,71,255,216,76,76,255,216,76,76,255,216,76,76,255,216,76,76,255,217,78,78,255,217,78,78,255,217,78,78,255,218,80,81,255,218,80,81,255,218,83,83,255,218,83,83,255,218,83,83,255,219,85,86,255,219,85,86,255,220,88,88,255,220,88,88,255,220,88,88,255,221,90,90,255,221,90,90,255,222,92,93,255,222,92,93,255,222,92,93,255,222,95,95,255,222,95,95,255,222,95,95,255,223,97,98,255,223,97,98,255,224,100,100,255,224,100,100,255,224,100,100,255,225,102,103,255,225,102,103,255,225,105,106,255,225,105,106,255,225,105,106,255,226,108,109,255,226,108,109,255,226,111,112,255,226,111,112,255,226,111,112,255,227,114,115,255,227,114,115,255,227,114,115,255,228,117,118,255,228,117,118,255,228,120,121,255,228,120,121,255,228,120,121,255,229,123,124,255,229,123,124,255,229,126,127,255,229,126,127,255,229,126,127,255,230,129,130,255,230,129,130,255,230,132,133,255,230,132,133,255,230,132,133,255,231,135,136,255,231,135,136,255,231,135,136,255,232,138,140,255,232,138,140,255,232,141,143,255,232,141,143,255,232,141,143,255,233,145,146,255,233,145,146,255,233,148,149,255,233,148,149,255,233,148,149,255,234,151,153,255,234,151,153,255,235,155,156,255,235,155,156,255,235,155,156,255,235,159,160,255,235,159,160,255,235,159,160,255,236,162,163,255,236,162,163,255,237,166,167,255,237,166,167,255,237,166,167,255,237,169,171,255,237,169,171,255,238,173,174,255,238,173,174,255,238,173,174,255,239,177,178,255,239,177,178,255,239,177,178,255,239,180,181,255,239,180,181,255,240,184,185,255,240,184,185,255,240,184,185,255,241,187,188,255,241,187,188,255,241,191,192,255,241,191,192,255,241,191,192,255,242,195,196,255,242,195,196,255,243,198,199,255,243,198,199,255,243,198,199,255,244,202,203,255,244,202,203,255,244,202,203,255,245,207,207,255,245,207,207,255,246,211,211,255,246,211,211,255,246,211,211,255,246,215,215,255,246,215,215,255,247,219,219,255,247,219,219,255,247,219,219,255,248,223,223,255,248,223,223,255,249,227,227,255,249,227,227,255,249,227,227,255,250,232,231,255,250,232,231,255,250,232,231,255,251,236,235,255,251,236,235,255,252,240,239,255,252,240,239,255,252,240,239,255,253,244,243,255,253,244,243,255,254,248,247,255,254,248,247,255,254,248,247,255,255,252,251,255,255,252,251,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.cherryTones = map ;
	 var map = undefined; 

	 /* processing lightTerrain colormap */ 
	 var map = {}; 
	 map.name = "lightTerrain" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 140,198,217,255,140,198,217,255,140,198,217,255,139,196,212,255,139,196,212,255,139,193,207,255,139,193,207,255,139,193,207,255,138,190,203,255,138,190,203,255,137,188,198,255,137,188,198,255,137,188,198,255,136,185,193,255,136,185,193,255,136,182,189,255,136,182,189,255,136,182,189,255,135,180,184,255,135,180,184,255,135,180,184,255,134,177,179,255,134,177,179,255,133,175,174,255,133,175,174,255,133,175,174,255,134,173,171,255,134,173,171,255,134,172,168,255,134,172,168,255,134,172,168,255,134,170,165,255,134,170,165,255,135,169,162,255,135,169,162,255,135,169,162,255,135,168,159,255,135,168,159,255,135,168,159,255,136,165,153,255,135,168,159,255,136,165,153,255,136,165,153,255,136,165,153,255,136,164,150,255,136,164,150,255,136,163,147,255,136,163,147,255,136,163,147,255,136,163,147,255,136,163,147,255,138,162,143,255,138,162,143,255,138,162,143,255,140,162,142,255,140,162,142,255,140,162,142,255,143,161,137,255,140,162,142,255,142,162,138,255,142,162,138,255,142,162,138,255,143,161,137,255,143,161,137,255,144,161,135,255,144,161,135,255,144,161,135,255,144,161,135,255,144,161,135,255,144,161,135,255,144,161,135,255,148,161,131,255,148,161,131,255,148,161,131,255,148,161,131,255,148,161,131,255,151,163,131,255,151,163,131,255,151,163,131,255,153,164,131,255,153,164,131,255,153,164,131,255,155,164,130,255,155,164,130,255,155,164,130,255,156,165,130,255,156,165,130,255,156,165,130,255,159,167,129,255,156,165,130,255,159,167,129,255,159,167,129,255,159,167,129,255,163,168,129,255,159,167,129,255,163,168,129,255,163,168,129,255,163,168,129,255,165,170,130,255,165,170,130,255,168,172,131,255,165,170,130,255,168,172,131,255,168,172,131,255,168,172,131,255,168,172,131,255,170,174,132,255,170,174,132,255,172,175,132,255,172,175,132,255,172,175,132,255,175,177,134,255,175,177,134,255,175,177,134,255,175,177,134,255,175,177,134,255,179,180,135,255,179,180,135,255,179,180,135,255,179,180,135,255,179,180,135,255,181,182,137,255,181,182,137,255,181,182,137,255,181,182,137,255,181,182,137,255,184,185,139,255,184,185,139,255,184,185,139,255,186,186,141,255,186,186,141,255,188,188,142,255,188,188,142,255,188,188,142,255,189,189,143,255,189,189,143,255,191,191,144,255,191,191,144,255,191,191,144,255,193,192,146,255,193,192,146,255,193,192,146,255,194,193,147,255,194,193,147,255,196,195,149,255,196,195,149,255,196,195,149,255,197,196,150,255,196,195,149,255,199,198,152,255,199,198,152,255,199,198,152,255,200,199,154,255,200,199,154,255,202,201,156,255,202,201,156,255,202,201,156,255,202,201,156,255,205,204,159,255,202,201,156,255,205,204,159,255,205,204,159,255,206,205,161,255,206,205,161,255,206,205,161,255,208,206,162,255,208,206,162,255,209,208,164,255,209,208,164,255,209,208,164,255,210,209,166,255,210,209,166,255,211,210,168,255,211,210,168,255,211,210,168,255,212,211,170,255,212,211,170,255,212,211,170,255,213,213,172,255,213,213,172,255,215,214,174,255,215,214,174,255,213,213,172,255,217,216,178,255,217,216,178,255,217,216,178,255,217,216,178,255,217,216,178,255,218,217,180,255,218,217,180,255,219,218,182,255,219,218,182,255,218,217,180,255,220,220,186,255,218,217,180,255,220,220,186,255,220,220,186,255,220,220,186,255,221,221,188,255,221,221,188,255,221,221,188,255,223,222,192,255,221,221,188,255,223,223,194,255,223,222,192,255,223,223,194,255,223,223,194,255,223,223,194,255,223,223,194,255,224,224,196,255,224,224,196,255,225,225,198,255,225,225,198,255,225,225,198,255,225,225,200,255,225,225,200,255,225,225,200,255,227,227,206,255,225,225,200,255,226,226,204,255,226,226,204,255,227,227,206,255,227,227,206,255,226,226,204,255,227,228,209,255,227,228,209,255,227,228,209,255,227,228,209,255,227,228,209,255,228,228,211,255,228,228,211,255,228,228,211,255,228,229,213,255,228,229,213,255,229,229,215,255,229,229,215,255,229,229,215,255,229,230,218,255,229,230,218,255,229,230,218,255,229,230,220,255,229,229,215,255,229,230,220,255,229,230,220,255,229,230,220,255,229,230,223,255,229,230,223,255,229,230,223,255,229,230,223,255,229,230,223,255,229,230,223,255,229,230,223,255,230,231,228,255,230,231,228,255,230,231,228,255,230,231,228,255,230,231,228,255,230,231,230,255,230,231,230,255,230,231,230,255,230,231,230,255,230,231,228,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.lightTerrain = map ;
	 var map = undefined; 

	 /* processing temperatureMap colormap */ 
	 var map = {}; 
	 map.name = "temperatureMap" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 45,79,238,255,45,79,238,255,45,79,238,255,49,83,239,255,49,83,239,255,53,87,239,255,53,87,239,255,53,87,239,255,57,91,239,255,57,91,239,255,61,95,239,255,61,95,239,255,61,95,239,255,65,100,240,255,65,100,240,255,69,104,240,255,69,104,240,255,69,104,240,255,73,108,240,255,73,108,240,255,73,108,240,255,77,112,240,255,77,112,240,255,81,116,241,255,81,116,241,255,81,116,241,255,86,120,241,255,86,120,241,255,90,124,241,255,90,124,241,255,90,124,241,255,95,128,241,255,95,128,241,255,99,132,242,255,99,132,242,255,99,132,242,255,104,135,242,255,104,135,242,255,104,135,242,255,108,139,242,255,108,139,242,255,113,143,243,255,113,143,243,255,113,143,243,255,117,147,243,255,117,147,243,255,123,152,243,255,123,152,243,255,123,152,243,255,129,157,244,255,129,157,244,255,135,161,244,255,135,161,244,255,135,161,244,255,141,166,245,255,141,166,245,255,141,166,245,255,147,171,245,255,147,171,245,255,152,176,246,255,152,176,246,255,152,176,246,255,158,180,246,255,158,180,246,255,164,185,247,255,164,185,247,255,164,185,247,255,169,189,247,255,169,189,247,255,169,189,247,255,175,193,248,255,175,193,248,255,180,198,248,255,180,198,248,255,180,198,248,255,186,202,249,255,186,202,249,255,191,206,249,255,191,206,249,255,191,206,249,255,197,211,250,255,197,211,250,255,202,215,250,255,202,215,250,255,202,215,250,255,208,219,251,255,208,219,251,255,208,219,251,255,212,222,251,255,212,222,251,255,215,225,252,255,215,225,252,255,215,225,252,255,219,228,252,255,219,228,252,255,222,231,252,255,222,231,252,255,222,231,252,255,226,234,253,255,226,234,253,255,230,237,253,255,230,237,253,255,230,237,253,255,233,239,253,255,233,239,253,255,233,239,253,255,237,242,254,255,237,242,254,255,240,244,253,255,240,244,253,255,240,244,253,255,241,246,251,255,241,246,251,255,243,247,248,255,243,247,248,255,243,247,248,255,244,248,245,255,244,248,245,255,245,249,243,255,245,249,243,255,245,249,243,255,247,250,240,255,247,250,240,255,247,250,240,255,248,251,238,255,248,251,238,255,250,252,235,255,250,252,235,255,250,252,235,255,251,253,233,255,251,253,233,255,252,253,227,255,252,253,227,255,252,253,227,255,252,254,222,255,252,254,222,255,252,254,216,255,252,254,216,255,252,254,216,255,253,254,210,255,253,254,210,255,253,254,210,255,253,254,205,255,253,254,205,255,253,254,199,255,253,254,199,255,253,254,199,255,254,254,193,255,254,254,193,255,254,254,188,255,254,254,188,255,254,254,188,255,254,254,180,255,254,254,180,255,254,254,170,255,254,254,170,255,254,254,170,255,254,254,161,255,254,254,161,255,254,254,161,255,254,254,152,255,254,254,152,255,254,254,142,255,254,254,142,255,254,254,142,255,254,253,133,255,254,253,133,255,254,253,124,255,254,253,124,255,254,253,124,255,254,253,115,255,254,253,115,255,253,252,107,255,253,252,107,255,253,252,107,255,252,248,103,255,252,248,103,255,252,248,103,255,251,244,98,255,251,244,98,255,250,240,94,255,250,240,94,255,250,240,94,255,249,237,89,255,249,237,89,255,248,233,85,255,248,233,85,255,248,233,85,255,246,229,81,255,246,229,81,255,245,225,76,255,245,225,76,255,245,225,76,255,244,221,72,255,244,221,72,255,244,221,72,255,243,215,71,255,243,215,71,255,241,209,69,255,241,209,69,255,241,209,69,255,239,203,68,255,239,203,68,255,238,196,67,255,238,196,67,255,238,196,67,255,236,190,66,255,236,190,66,255,236,190,66,255,235,184,64,255,235,184,64,255,233,177,63,255,233,177,63,255,233,177,63,255,232,171,62,255,232,171,62,255,230,165,61,255,230,165,61,255,230,165,61,255,229,158,59,255,229,158,59,255,227,152,58,255,227,152,58,255,227,152,58,255,226,146,57,255,226,146,57,255,226,146,57,255,224,139,56,255,224,139,56,255,223,133,55,255,223,133,55,255,223,133,55,255,222,126,54,255,222,126,54,255,220,120,52,255,220,120,52,255,220,120,52,255,219,112,51,255,219,112,51,255,218,103,50,255,218,103,50,255,218,103,50,255,216,93,49,255,216,93,49,255,216,93,49,255,215,83,48,255,215,83,48,255,214,74,46,255,214,74,46,255,214,74,46,255,213,64,45,255,213,64,45,255,211,54,44,255,211,54,44,255,211,54,44,255,210,45,43,255,210,45,43,255,209,35,42,255,209,35,42,255,209,35,42,255,209,35,42,255,209,35,42,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.temperatureMap = map ;
	 var map = undefined; 

	 /* processing cmykColors colormap */ 
	 var map = {}; 
	 map.name = "cmykColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 76,175,230,255,76,175,230,255,76,175,230,255,80,177,232,255,80,177,232,255,83,180,233,255,83,180,233,255,83,180,233,255,86,182,234,255,86,182,234,255,86,182,234,255,96,189,238,255,86,182,234,255,96,189,238,255,96,189,238,255,96,189,238,255,96,189,238,255,96,189,238,255,100,190,238,255,100,190,238,255,100,190,238,255,104,186,235,255,104,186,235,255,108,182,232,255,108,182,232,255,108,182,232,255,112,178,230,255,112,178,230,255,117,175,227,255,117,175,227,255,117,175,227,255,121,171,224,255,121,171,224,255,125,167,222,255,125,167,222,255,125,167,222,255,129,163,219,255,129,163,219,255,129,163,219,255,133,158,216,255,133,158,216,255,138,153,212,255,138,153,212,255,138,153,212,255,142,148,209,255,142,148,209,255,146,143,206,255,146,143,206,255,146,143,206,255,150,138,202,255,150,138,202,255,154,133,199,255,154,133,199,255,154,133,199,255,158,130,196,255,158,130,196,255,158,130,196,255,161,126,194,255,161,126,194,255,165,123,191,255,165,123,191,255,165,123,191,255,169,120,188,255,169,120,188,255,172,117,185,255,172,117,185,255,172,117,185,255,176,113,182,255,176,113,182,255,176,113,182,255,180,111,180,255,180,111,180,255,183,110,177,255,183,110,177,255,183,110,177,255,186,110,175,255,186,110,175,255,189,109,172,255,189,109,172,255,189,109,172,255,192,109,170,255,192,109,170,255,195,108,168,255,195,108,168,255,195,108,168,255,198,108,165,255,198,108,165,255,198,108,165,255,200,109,163,255,200,109,163,255,203,111,161,255,203,111,161,255,203,111,161,255,205,113,159,255,205,113,159,255,208,115,157,255,208,115,157,255,208,115,157,255,210,117,155,255,210,117,155,255,213,119,152,255,213,119,152,255,213,119,152,255,215,121,150,255,215,121,150,255,215,121,150,255,217,125,148,255,217,125,148,255,219,129,146,255,219,129,146,255,219,129,146,255,221,133,145,255,221,133,145,255,223,137,143,255,223,137,143,255,223,137,143,255,225,141,141,255,225,141,141,255,227,145,139,255,227,145,139,255,227,145,139,255,229,149,137,255,229,149,137,255,229,149,137,255,230,153,135,255,230,153,135,255,231,158,134,255,231,158,134,255,231,158,134,255,233,162,132,255,233,162,132,255,234,166,131,255,234,166,131,255,234,166,131,255,235,171,130,255,235,171,130,255,237,175,128,255,237,175,128,255,237,175,128,255,238,179,127,255,238,179,127,255,238,179,127,255,238,183,126,255,238,183,126,255,239,187,126,255,239,187,126,255,239,187,126,255,240,191,125,255,240,191,125,255,240,195,124,255,240,195,124,255,240,195,124,255,241,199,124,255,241,199,124,255,242,203,123,255,242,203,123,255,242,203,123,255,241,205,123,255,241,205,123,255,241,205,123,255,241,207,124,255,241,207,124,255,240,209,124,255,240,209,124,255,240,209,124,255,240,212,125,255,240,212,125,255,240,212,125,255,239,216,126,255,240,212,125,255,239,216,126,255,239,216,126,255,239,218,126,255,239,218,126,255,239,218,126,255,237,218,128,255,237,218,128,255,237,218,128,255,235,218,129,255,237,218,128,255,232,218,132,255,235,218,129,255,235,218,129,255,232,218,132,255,232,218,132,255,231,218,133,255,231,218,133,255,231,218,133,255,229,218,135,255,229,218,135,255,226,216,136,255,226,216,136,255,226,216,136,255,223,214,137,255,223,214,137,255,223,214,137,255,219,211,139,255,219,211,139,255,216,209,140,255,216,209,140,255,216,209,140,255,213,207,142,255,213,207,142,255,209,204,143,255,209,204,143,255,209,204,143,255,206,202,145,255,206,202,145,255,206,202,145,255,200,196,144,255,200,196,144,255,195,191,144,255,195,191,144,255,195,191,144,255,189,186,144,255,189,186,144,255,184,181,143,255,184,181,143,255,184,181,143,255,178,176,143,255,178,176,143,255,173,171,143,255,173,171,143,255,173,171,143,255,166,164,141,255,166,164,141,255,166,164,141,255,158,156,137,255,158,156,137,255,150,148,132,255,150,148,132,255,150,148,132,255,141,140,127,255,141,140,127,255,133,132,123,255,133,132,123,255,133,132,123,255,124,124,118,255,124,124,118,255,116,115,114,255,116,115,114,255,116,115,114,255,105,105,104,255,105,105,104,255,105,105,104,255,93,92,92,255,93,92,92,255,81,80,80,255,81,80,80,255,81,80,80,255,70,68,68,255,70,68,68,255,58,56,56,255,58,56,56,255,58,56,56,255,46,44,44,255,46,44,44,255,34,32,32,255,34,32,32,255,34,32,32,255,34,32,32,255,34,32,32,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.cmykColors = map ;
	 var map = undefined; 

	 /* processing mintColors colormap */ 
	 var map = {}; 
	 map.name = "mintColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 119,250,163,255,119,250,163,255,119,250,163,255,121,250,164,255,121,250,164,255,123,250,166,255,123,250,166,255,125,250,167,255,125,250,167,255,125,250,167,255,128,250,169,255,128,250,169,255,128,250,169,255,130,249,170,255,130,249,170,255,132,249,172,255,132,249,172,255,132,249,172,255,135,249,173,255,135,249,173,255,132,249,172,255,139,249,176,255,135,249,173,255,139,249,176,255,139,249,176,255,139,249,176,255,142,248,178,255,142,248,178,255,144,248,179,255,144,248,179,255,144,248,179,255,146,248,181,255,146,248,181,255,148,248,182,255,148,248,182,255,148,248,182,255,151,248,183,255,151,248,183,255,151,248,183,255,153,247,185,255,153,247,185,255,155,247,186,255,155,247,186,255,155,247,186,255,158,247,188,255,158,247,188,255,160,247,189,255,160,247,189,255,160,247,189,255,162,247,191,255,162,247,191,255,164,246,192,255,164,246,192,255,164,246,192,255,164,246,192,255,170,245,195,255,164,246,192,255,170,245,195,255,170,245,195,255,170,245,195,255,170,245,195,255,170,245,195,255,171,244,196,255,171,244,196,255,173,244,197,255,173,244,197,255,173,244,197,255,175,243,198,255,175,243,198,255,175,243,198,255,178,242,200,255,175,243,198,255,178,242,200,255,178,242,200,255,178,242,200,255,180,242,201,255,180,242,201,255,185,240,204,255,180,242,201,255,180,242,201,255,185,240,204,255,185,240,204,255,185,240,204,255,185,240,204,255,185,240,204,255,187,239,205,255,187,239,205,255,187,239,205,255,190,238,207,255,187,239,205,255,190,238,207,255,190,238,207,255,190,238,207,255,192,238,207,255,192,238,207,255,192,238,207,255,197,236,210,255,192,238,207,255,196,237,209,255,197,236,210,255,197,236,210,255,197,236,210,255,197,236,210,255,199,236,211,255,199,236,211,255,199,236,211,255,199,236,211,255,202,234,212,255,202,234,212,255,202,234,212,255,202,234,212,255,203,233,212,255,203,233,212,255,204,232,213,255,204,232,213,255,204,232,213,255,204,232,213,255,204,232,213,255,210,228,215,255,206,230,214,255,207,229,214,255,207,229,214,255,207,229,214,255,207,229,214,255,209,229,214,255,209,229,214,255,210,228,215,255,210,228,215,255,210,228,215,255,211,227,215,255,211,227,215,255,212,226,216,255,212,226,216,255,212,226,216,255,212,226,216,255,212,226,216,255,214,224,216,255,214,224,216,255,214,224,216,255,216,223,217,255,216,223,217,255,216,223,217,255,216,223,217,255,216,223,217,255,219,221,218,255,219,221,218,255,219,221,218,255,219,221,218,255,219,221,218,255,220,220,218,255,220,220,218,255,220,220,218,255,220,220,218,255,223,218,219,255,223,218,219,255,223,218,219,255,223,218,219,255,223,218,219,255,223,218,219,255,223,218,219,255,224,215,219,255,224,215,219,255,224,215,219,255,224,215,219,255,224,215,219,255,225,212,218,255,224,215,219,255,225,212,218,255,225,212,218,255,225,212,218,255,227,209,218,255,225,212,218,255,227,209,218,255,227,209,218,255,227,209,218,255,227,208,218,255,227,208,218,255,227,208,218,255,227,208,218,255,228,205,218,255,228,205,218,255,228,205,218,255,227,208,218,255,229,204,217,255,229,204,217,255,230,203,217,255,230,203,217,255,229,204,217,255,231,200,217,255,229,204,217,255,231,200,217,255,231,200,217,255,231,200,217,255,231,200,217,255,231,200,217,255,231,200,217,255,232,198,217,255,232,198,217,255,232,196,216,255,232,196,216,255,232,196,216,255,232,198,217,255,234,194,216,255,234,194,216,255,234,194,216,255,234,193,216,255,234,193,216,255,234,193,216,255,234,193,216,255,234,191,215,255,234,191,215,255,234,191,215,255,234,187,214,255,234,191,215,255,234,187,214,255,234,187,214,255,234,187,214,255,234,187,214,255,234,187,214,255,234,184,212,255,234,184,212,255,234,184,212,255,234,184,212,255,234,184,212,255,234,181,211,255,234,181,211,255,234,181,211,255,234,179,210,255,234,179,210,255,234,179,210,255,234,176,209,255,234,179,210,255,234,176,209,255,234,176,209,255,234,176,209,255,234,176,209,255,234,176,209,255,234,172,207,255,234,172,207,255,234,172,207,255,234,172,207,255,234,172,207,255,234,172,207,255,234,167,205,255,234,172,207,255,234,167,205,255,234,167,205,255,234,167,205,255,234,167,205,255,234,167,205,255,233,164,204,255,233,164,204,255,233,162,203,255,233,162,203,255,233,162,203,255,233,162,203,255,233,162,203,255,233,159,201,255,233,159,201,255,233,159,201,255,233,159,201,255,233,159,201,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.mintColors = map ;
	 var map = undefined; 

	 /* processing thermometerColors colormap */ 
	 var map = {}; 
	 map.name = "thermometerColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 41,31,203,255,41,31,203,255,41,31,203,255,44,37,205,255,44,37,205,255,46,42,208,255,46,42,208,255,46,42,208,255,49,48,211,255,49,48,211,255,52,53,214,255,52,53,214,255,52,53,214,255,54,58,217,255,54,58,217,255,57,64,219,255,57,64,219,255,57,64,219,255,59,69,222,255,59,69,222,255,59,69,222,255,62,75,225,255,62,75,225,255,64,80,228,255,64,80,228,255,64,80,228,255,68,87,229,255,68,87,229,255,73,93,231,255,73,93,231,255,73,93,231,255,77,100,232,255,77,100,232,255,81,106,233,255,81,106,233,255,81,106,233,255,86,113,234,255,86,113,234,255,86,113,234,255,90,119,236,255,90,119,236,255,94,125,237,255,94,125,237,255,94,125,237,255,99,132,238,255,99,132,238,255,103,138,239,255,103,138,239,255,103,138,239,255,108,144,240,255,108,144,240,255,112,149,240,255,112,149,240,255,112,149,240,255,117,155,241,255,117,155,241,255,117,155,241,255,122,160,241,255,122,160,241,255,126,165,241,255,126,165,241,255,126,165,241,255,131,171,242,255,131,171,242,255,136,176,242,255,136,176,242,255,136,176,242,255,140,181,242,255,140,181,242,255,140,181,242,255,145,187,243,255,145,187,243,255,149,191,242,255,149,191,242,255,149,191,242,255,153,194,242,255,153,194,242,255,157,198,241,255,157,198,241,255,157,198,241,255,162,201,241,255,162,201,241,255,166,204,240,255,166,204,240,255,166,204,240,255,170,208,239,255,170,208,239,255,170,208,239,255,174,211,239,255,174,211,239,255,178,215,238,255,178,215,238,255,178,215,238,255,182,218,237,255,182,218,237,255,186,220,236,255,186,220,236,255,186,220,236,255,189,222,234,255,189,222,234,255,192,223,233,255,192,223,233,255,192,223,233,255,195,224,231,255,195,224,231,255,195,224,231,255,198,226,229,255,198,226,229,255,201,227,228,255,201,227,228,255,201,227,228,255,205,228,226,255,205,228,226,255,208,230,224,255,208,230,224,255,208,230,224,255,211,231,223,255,211,231,223,255,213,231,220,255,213,231,220,255,213,231,220,255,215,231,218,255,215,231,218,255,215,231,218,255,217,230,215,255,217,230,215,255,219,229,212,255,219,229,212,255,219,229,212,255,220,229,210,255,220,229,210,255,222,228,207,255,222,228,207,255,222,228,207,255,224,227,204,255,224,227,204,255,226,227,201,255,226,227,201,255,226,227,201,255,228,226,199,255,228,226,199,255,228,226,199,255,229,225,196,255,228,226,199,255,229,222,192,255,229,222,192,255,229,222,192,255,229,220,189,255,229,220,189,255,230,217,186,255,230,217,186,255,230,217,186,255,230,214,182,255,230,214,182,255,231,212,179,255,231,212,179,255,231,212,179,255,231,212,179,255,231,207,172,255,231,212,179,255,231,207,172,255,231,207,172,255,232,204,169,255,232,204,169,255,232,204,169,255,232,201,165,255,232,201,165,255,231,197,162,255,231,197,162,255,231,197,162,255,230,193,158,255,230,193,158,255,229,188,154,255,229,188,154,255,229,188,154,255,228,184,151,255,228,184,151,255,228,184,151,255,227,180,147,255,227,180,147,255,226,176,143,255,226,176,143,255,226,176,143,255,225,171,140,255,225,171,140,255,224,167,136,255,224,167,136,255,224,167,136,255,223,163,132,255,223,163,132,255,221,157,129,255,221,157,129,255,221,157,129,255,219,152,125,255,219,152,125,255,219,152,125,255,216,146,121,255,216,146,121,255,214,141,118,255,214,141,118,255,214,141,118,255,212,135,114,255,212,135,114,255,210,130,110,255,210,130,110,255,210,130,110,255,208,125,107,255,208,125,107,255,208,125,107,255,206,119,103,255,206,119,103,255,203,114,99,255,203,114,99,255,203,114,99,255,200,108,96,255,200,108,96,255,197,102,92,255,197,102,92,255,197,102,92,255,194,96,89,255,194,96,89,255,191,91,85,255,191,91,85,255,191,91,85,255,188,85,82,255,188,85,82,255,188,85,82,255,184,79,78,255,184,79,78,255,181,74,75,255,181,74,75,255,181,74,75,255,178,68,71,255,178,68,71,255,175,62,68,255,175,62,68,255,175,62,68,255,170,58,65,255,170,58,65,255,166,53,62,255,166,53,62,255,166,53,62,255,162,49,59,255,162,49,59,255,162,49,59,255,158,44,56,255,158,44,56,255,153,40,54,255,153,40,54,255,153,40,54,255,149,36,51,255,149,36,51,255,145,31,48,255,145,31,48,255,145,31,48,255,140,27,45,255,140,27,45,255,136,22,42,255,136,22,42,255,136,22,42,255,136,22,42,255,136,22,42,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.thermometerColors = map ;
	 var map = undefined; 

	 /* processing coffeeTones colormap */ 
	 var map = {}; 
	 map.name = "coffeeTones" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 104,85,71,255,104,85,71,255,104,85,71,255,106,87,72,255,106,87,72,255,109,90,73,255,109,90,73,255,109,90,73,255,112,92,75,255,112,92,75,255,114,94,76,255,114,94,76,255,114,94,76,255,117,96,77,255,117,96,77,255,120,98,79,255,120,98,79,255,120,98,79,255,122,101,80,255,122,101,80,255,122,101,80,255,125,103,81,255,125,103,81,255,128,105,82,255,128,105,82,255,128,105,82,255,130,107,84,255,130,107,84,255,133,109,85,255,133,109,85,255,133,109,85,255,136,112,86,255,136,112,86,255,138,114,88,255,138,114,88,255,138,114,88,255,141,116,89,255,141,116,89,255,141,116,89,255,144,118,90,255,144,118,90,255,147,120,92,255,147,120,92,255,147,120,92,255,149,123,93,255,149,123,93,255,152,125,94,255,152,125,94,255,152,125,94,255,155,127,96,255,155,127,96,255,157,129,97,255,157,129,97,255,157,129,97,255,159,130,96,255,159,130,96,255,157,129,97,255,161,131,95,255,161,131,95,255,161,131,95,255,161,131,95,255,161,131,95,255,163,132,94,255,163,132,94,255,164,133,93,255,164,133,93,255,164,133,93,255,164,133,93,255,168,135,91,255,164,133,93,255,167,134,92,255,167,134,92,255,168,135,91,255,168,135,91,255,168,135,91,255,172,137,89,255,171,136,90,255,171,136,90,255,171,136,90,255,171,136,90,255,172,137,89,255,172,137,89,255,172,137,89,255,172,137,89,255,178,140,86,255,172,137,89,255,178,140,86,255,172,137,89,255,174,138,88,255,178,140,86,255,178,140,86,255,178,140,86,255,178,140,86,255,179,141,85,255,179,141,85,255,179,141,85,255,183,143,83,255,178,140,86,255,183,143,83,255,179,141,85,255,183,143,83,255,183,143,83,255,183,143,83,255,185,144,82,255,185,144,82,255,185,144,82,255,186,145,83,255,186,145,83,255,187,146,84,255,187,146,84,255,187,146,84,255,188,147,84,255,188,147,84,255,189,149,85,255,189,149,85,255,189,149,85,255,189,149,85,255,189,149,85,255,192,151,86,255,192,151,86,255,192,151,86,255,193,152,87,255,193,152,87,255,192,151,86,255,194,154,87,255,194,154,87,255,195,155,88,255,195,155,88,255,195,155,88,255,196,156,88,255,196,156,88,255,197,157,89,255,197,157,89,255,197,157,89,255,201,161,91,255,197,157,89,255,200,160,90,255,200,160,90,255,200,160,90,255,201,161,91,255,201,161,91,255,201,161,91,255,203,164,92,255,201,161,91,255,203,164,92,255,203,164,92,255,203,164,92,255,204,165,93,255,204,165,93,255,207,167,94,255,207,167,94,255,207,167,94,255,207,167,94,255,207,167,94,255,208,169,94,255,208,169,94,255,208,169,94,255,209,171,97,255,209,171,97,255,209,171,97,255,210,173,101,255,210,173,101,255,212,175,104,255,212,175,104,255,212,175,104,255,213,177,107,255,213,177,107,255,214,180,110,255,214,180,110,255,214,180,110,255,215,182,113,255,215,182,113,255,217,184,116,255,217,184,116,255,217,184,116,255,218,186,120,255,218,186,120,255,218,186,120,255,219,189,123,255,219,189,123,255,220,191,126,255,220,191,126,255,220,191,126,255,222,193,129,255,222,193,129,255,223,195,132,255,223,195,132,255,223,195,132,255,224,198,136,255,224,198,136,255,225,200,139,255,225,200,139,255,225,200,139,255,227,202,142,255,227,202,142,255,227,202,142,255,227,202,142,255,229,206,148,255,229,206,148,255,229,206,148,255,229,206,148,255,230,209,151,255,230,209,151,255,232,211,155,255,232,211,155,255,232,211,155,255,233,213,158,255,233,213,158,255,233,213,158,255,234,215,163,255,234,215,163,255,235,217,167,255,235,217,167,255,235,217,167,255,235,220,172,255,235,220,172,255,236,222,177,255,236,222,177,255,236,222,177,255,237,224,182,255,237,224,182,255,238,226,187,255,238,226,187,255,238,226,187,255,239,228,192,255,239,228,192,255,239,228,192,255,240,230,197,255,240,230,197,255,240,233,202,255,240,233,202,255,240,233,202,255,241,235,207,255,241,235,207,255,242,237,211,255,242,237,211,255,242,237,211,255,243,239,216,255,243,239,216,255,244,241,221,255,244,241,221,255,244,241,221,255,244,243,226,255,244,243,226,255,244,243,226,255,245,246,231,255,245,246,231,255,246,248,236,255,246,248,236,255,246,248,236,255,247,250,241,255,247,250,241,255,248,252,246,255,248,252,246,255,248,252,246,255,249,254,250,255,249,254,250,255,249,255,255,255,249,255,255,255,249,255,255,255,249,255,255,255,249,255,255,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.coffeeTones = map ;
	 var map = undefined; 

	 /* processing neonColors colormap */ 
	 var map = {}; 
	 map.name = "neonColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 184,237,76,255,184,237,76,255,184,237,76,255,184,233,76,255,184,233,76,255,185,229,75,255,185,229,75,255,185,229,75,255,185,226,75,255,185,226,75,255,186,222,75,255,186,222,75,255,186,222,75,255,186,218,75,255,186,218,75,255,187,214,75,255,187,214,75,255,187,214,75,255,187,210,75,255,187,210,75,255,187,210,75,255,188,207,75,255,188,207,75,255,188,203,74,255,188,203,74,255,188,203,74,255,189,199,74,255,189,199,74,255,189,195,74,255,189,195,74,255,189,195,74,255,190,191,74,255,190,191,74,255,190,188,74,255,190,188,74,255,190,188,74,255,191,184,74,255,191,184,74,255,191,184,74,255,191,180,74,255,191,180,74,255,192,176,73,255,192,176,73,255,192,176,73,255,192,176,73,255,192,176,73,255,193,169,73,255,193,169,73,255,193,169,73,255,193,165,73,255,193,165,73,255,194,161,73,255,194,161,73,255,194,161,73,255,194,157,73,255,194,157,73,255,194,157,73,255,195,154,73,255,195,154,73,255,195,150,72,255,195,150,72,255,195,150,72,255,196,146,72,255,196,146,72,255,196,142,72,255,196,142,72,255,196,142,72,255,197,138,72,255,197,138,72,255,197,138,72,255,197,135,72,255,197,135,72,255,198,131,72,255,198,131,72,255,198,131,72,255,198,127,72,255,198,127,72,255,199,123,71,255,199,123,71,255,199,123,71,255,199,119,71,255,199,119,71,255,200,116,71,255,200,116,71,255,200,116,71,255,200,112,71,255,200,112,71,255,200,112,71,255,202,106,70,255,200,112,71,255,202,106,70,255,202,106,70,255,202,106,70,255,203,104,69,255,203,104,69,255,204,101,69,255,204,101,69,255,204,101,69,255,205,99,68,255,205,99,68,255,206,96,67,255,206,96,67,255,206,96,67,255,207,93,67,255,207,93,67,255,207,93,67,255,207,91,66,255,207,91,66,255,208,88,65,255,208,88,65,255,208,88,65,255,208,88,65,255,208,88,65,255,210,83,64,255,210,83,64,255,210,83,64,255,212,82,64,255,210,83,64,255,212,82,64,255,212,82,64,255,212,82,64,255,212,82,64,255,215,82,67,255,212,82,64,255,215,82,67,255,215,82,67,255,215,82,67,255,215,82,67,255,215,82,67,255,215,82,67,255,215,82,67,255,217,81,68,255,217,81,68,255,215,82,67,255,215,82,67,255,215,82,67,255,215,82,67,255,219,81,70,255,215,82,67,255,219,81,70,255,219,81,70,255,219,81,70,255,219,81,70,255,219,81,70,255,219,81,71,255,219,81,71,255,219,81,71,255,219,82,76,255,219,82,74,255,219,82,76,255,219,82,76,255,219,82,76,255,219,82,79,255,219,82,79,255,219,82,79,255,219,84,86,255,219,82,79,255,219,83,84,255,219,83,84,255,219,83,84,255,219,84,86,255,219,84,86,255,219,84,89,255,219,84,89,255,219,84,89,255,219,84,91,255,219,84,91,255,219,85,94,255,219,85,94,255,219,85,94,255,219,85,96,255,219,85,96,255,219,85,99,255,219,85,99,255,219,85,99,255,219,84,102,255,219,84,102,255,219,84,102,255,218,83,105,255,218,83,105,255,218,82,108,255,218,82,108,255,218,82,108,255,217,81,111,255,217,81,111,255,217,80,114,255,217,80,114,255,217,80,114,255,217,79,117,255,217,79,117,255,216,78,120,255,216,78,120,255,216,78,120,255,216,78,123,255,216,78,123,255,216,78,123,255,215,77,126,255,215,77,126,255,215,76,129,255,215,76,129,255,215,76,129,255,215,75,132,255,215,75,132,255,214,74,135,255,214,74,135,255,214,74,135,255,214,73,138,255,214,73,138,255,213,72,140,255,213,72,140,255,213,72,140,255,213,71,143,255,213,71,143,255,213,71,143,255,212,69,149,255,213,71,143,255,212,69,149,255,212,69,149,255,212,69,149,255,212,68,152,255,212,68,152,255,211,67,155,255,211,67,155,255,211,67,155,255,211,66,158,255,211,66,158,255,211,66,158,255,211,65,161,255,211,65,161,255,210,64,164,255,210,64,164,255,210,64,164,255,210,63,167,255,210,63,167,255,209,61,173,255,209,61,173,255,210,63,167,255,209,61,173,255,209,61,173,255,209,61,176,255,209,61,176,255,209,61,176,255,208,60,179,255,208,60,179,255,208,60,179,255,208,59,182,255,208,59,182,255,207,58,185,255,207,58,185,255,207,58,185,255,207,57,188,255,207,57,188,255,207,56,191,255,207,56,191,255,207,56,191,255,206,55,194,255,206,55,194,255,206,54,197,255,206,54,197,255,206,54,197,255,206,54,197,255,206,54,197,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.neonColors = map ;
	 var map = undefined; 

	 /* processing valentineTones colormap */ 
	 var map = {}; 
	 map.name = "valentineTones" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 132,29,50,255,132,29,50,255,132,29,50,255,135,30,52,255,135,30,52,255,135,30,52,255,135,30,52,255,135,30,52,255,139,32,55,255,136,31,53,255,136,31,53,255,139,32,55,255,139,32,55,255,139,32,55,255,139,32,55,255,140,33,56,255,140,33,56,255,140,33,56,255,140,33,56,255,143,35,58,255,140,33,56,255,140,33,56,255,143,35,58,255,143,35,58,255,143,35,58,255,143,35,58,255,146,36,60,255,143,35,58,255,146,36,60,255,146,36,60,255,146,36,60,255,147,37,61,255,147,37,61,255,148,38,62,255,148,38,62,255,148,38,62,255,151,39,64,255,151,39,64,255,151,39,64,255,151,39,64,255,151,39,64,255,155,41,66,255,148,38,62,255,155,41,66,255,151,39,64,255,155,41,66,255,155,41,66,255,155,41,66,255,155,41,66,255,157,42,68,255,155,41,66,255,157,42,68,255,157,42,68,255,157,42,68,255,158,44,69,255,158,44,69,255,158,44,69,255,159,45,71,255,159,45,71,255,161,47,72,255,161,47,72,255,161,47,72,255,162,48,74,255,162,48,74,255,163,50,75,255,163,50,75,255,163,50,75,255,164,51,77,255,164,51,77,255,164,51,77,255,165,53,78,255,165,53,78,255,166,54,80,255,166,54,80,255,166,54,80,255,167,56,81,255,167,56,81,255,168,57,83,255,168,57,83,255,168,57,83,255,170,59,84,255,170,59,84,255,171,60,86,255,171,60,86,255,171,60,86,255,172,62,87,255,172,62,87,255,172,62,87,255,172,62,87,255,172,62,87,255,174,65,90,255,174,65,90,255,174,65,90,255,176,68,93,255,174,65,90,255,176,68,93,255,176,68,93,255,176,68,93,255,178,69,94,255,178,69,94,255,179,71,96,255,179,71,96,255,179,71,96,255,180,72,97,255,180,72,97,255,180,72,97,255,181,75,100,255,181,75,100,255,183,77,102,255,183,77,102,255,183,77,102,255,184,79,104,255,184,79,104,255,186,82,106,255,186,82,106,255,186,82,106,255,187,84,108,255,187,84,108,255,188,86,110,255,188,86,110,255,188,86,110,255,190,88,113,255,190,88,113,255,190,88,113,255,191,91,115,255,191,91,115,255,193,93,117,255,193,93,117,255,193,93,117,255,194,95,119,255,194,95,119,255,195,98,121,255,195,98,121,255,195,98,121,255,197,100,124,255,197,100,124,255,198,102,126,255,198,102,126,255,198,102,126,255,200,105,128,255,200,105,128,255,200,105,128,255,200,105,128,255,203,109,132,255,203,109,132,255,203,109,132,255,203,109,132,255,204,112,135,255,204,112,135,255,205,114,137,255,205,114,137,255,205,114,137,255,207,116,139,255,207,116,139,255,210,121,144,255,207,116,139,255,207,116,139,255,211,124,146,255,210,121,144,255,211,124,146,255,211,124,146,255,211,124,146,255,213,126,149,255,213,126,149,255,213,126,149,255,214,129,151,255,214,129,151,255,215,132,154,255,215,132,154,255,215,132,154,255,217,134,156,255,217,134,156,255,218,137,158,255,218,137,158,255,218,137,158,255,220,140,161,255,220,140,161,255,220,140,161,255,221,142,163,255,221,142,163,255,222,145,166,255,222,145,166,255,222,145,166,255,224,148,168,255,224,148,168,255,225,150,171,255,225,150,171,255,225,150,171,255,227,153,173,255,227,153,173,255,228,156,176,255,228,156,176,255,228,156,176,255,229,158,178,255,229,158,178,255,229,158,178,255,231,161,181,255,231,161,181,255,232,164,183,255,232,164,183,255,232,164,183,255,234,166,185,255,234,166,185,255,235,169,188,255,235,169,188,255,235,169,188,255,237,172,190,255,237,172,190,255,237,172,190,255,237,174,192,255,237,174,192,255,237,176,194,255,237,176,194,255,237,176,194,255,238,178,195,255,238,178,195,255,238,180,197,255,238,180,197,255,238,180,197,255,240,187,202,255,238,180,197,255,239,185,200,255,239,185,200,255,239,185,200,255,240,187,202,255,240,187,202,255,240,187,202,255,240,189,203,255,240,189,203,255,241,191,205,255,241,191,205,255,241,191,205,255,241,193,207,255,241,193,207,255,241,195,208,255,241,195,208,255,241,195,208,255,242,198,210,255,242,198,210,255,242,200,212,255,242,200,212,255,242,200,212,255,243,202,213,255,243,202,213,255,243,202,213,255,243,204,215,255,243,204,215,255,244,206,217,255,244,206,217,255,244,206,217,255,244,208,218,255,244,208,218,255,245,211,220,255,245,211,220,255,245,211,220,255,245,213,222,255,245,213,222,255,245,215,223,255,245,215,223,255,245,215,223,255,245,215,223,255,245,213,222,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.valentineTones = map ;
	 var map = undefined; 

	 /* processing darkBands colormap */ 
	 var map = {}; 
	 map.name = "darkBands" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 175,225,244,255,175,225,244,255,175,225,244,255,167,219,239,255,167,219,239,255,160,213,235,255,160,213,235,255,160,213,235,255,152,207,230,255,152,207,230,255,145,202,226,255,145,202,226,255,145,202,226,255,138,196,221,255,138,196,221,255,130,190,217,255,130,190,217,255,130,190,217,255,123,184,212,255,123,184,212,255,123,184,212,255,115,178,208,255,115,178,208,255,108,173,203,255,108,173,203,255,108,173,203,255,101,167,198,255,101,167,198,255,93,161,194,255,93,161,194,255,93,161,194,255,86,155,189,255,86,155,189,255,78,150,185,255,78,150,185,255,78,150,185,255,71,144,180,255,71,144,180,255,71,144,180,255,64,138,176,255,64,138,176,255,178,210,144,255,178,210,144,255,178,210,144,255,172,206,139,255,172,206,139,255,166,201,135,255,166,201,135,255,166,201,135,255,160,197,130,255,160,197,130,255,154,192,126,255,154,192,126,255,154,192,126,255,147,187,121,255,147,187,121,255,147,187,121,255,141,183,116,255,141,183,116,255,135,178,112,255,135,178,112,255,135,178,112,255,129,174,107,255,129,174,107,255,122,169,102,255,122,169,102,255,122,169,102,255,116,165,98,255,116,165,98,255,116,165,98,255,110,160,93,255,110,160,93,255,104,156,88,255,104,156,88,255,104,156,88,255,98,151,84,255,98,151,84,255,91,146,79,255,91,146,79,255,91,146,79,255,85,142,74,255,85,142,74,255,79,137,70,255,79,137,70,255,79,137,70,255,211,149,179,255,211,149,179,255,211,149,179,255,208,144,173,255,208,144,173,255,205,138,166,255,205,138,166,255,205,138,166,255,202,132,160,255,202,132,160,255,199,126,153,255,199,126,153,255,199,126,153,255,196,120,147,255,196,120,147,255,193,115,140,255,193,115,140,255,193,115,140,255,190,109,134,255,190,109,134,255,190,109,134,255,187,103,127,255,187,103,127,255,184,97,121,255,184,97,121,255,184,97,121,255,181,92,114,255,181,92,114,255,179,86,108,255,179,86,108,255,179,86,108,255,176,80,101,255,176,80,101,255,173,74,95,255,173,74,95,255,173,74,95,255,170,68,88,255,170,68,88,255,170,68,88,255,167,63,82,255,167,63,82,255,164,57,75,255,164,57,75,255,164,57,75,255,221,181,139,255,221,181,139,255,218,177,134,255,218,177,134,255,218,177,134,255,216,172,129,255,216,172,129,255,213,168,125,255,213,168,125,255,213,168,125,255,210,163,120,255,210,163,120,255,210,163,120,255,207,159,115,255,207,159,115,255,204,154,110,255,204,154,110,255,204,154,110,255,202,150,106,255,202,150,106,255,199,146,101,255,199,146,101,255,199,146,101,255,196,141,96,255,196,141,96,255,193,137,92,255,193,137,92,255,193,137,92,255,190,132,87,255,190,132,87,255,190,132,87,255,188,128,82,255,188,128,82,255,185,123,77,255,185,123,77,255,185,123,77,255,182,119,73,255,182,119,73,255,179,115,68,255,179,115,68,255,179,115,68,255,177,110,63,255,177,110,63,255,188,191,221,255,188,191,221,255,188,191,221,255,181,184,216,255,181,184,216,255,181,184,216,255,174,177,211,255,174,177,211,255,167,170,205,255,167,170,205,255,167,170,205,255,160,163,200,255,160,163,200,255,153,156,195,255,153,156,195,255,153,156,195,255,146,149,190,255,146,149,190,255,140,143,184,255,140,143,184,255,140,143,184,255,133,136,179,255,133,136,179,255,133,136,179,255,126,129,174,255,126,129,174,255,119,122,169,255,119,122,169,255,119,122,169,255,112,115,163,255,112,115,163,255,105,108,158,255,105,108,158,255,105,108,158,255,98,102,153,255,98,102,153,255,98,102,153,255,91,95,148,255,91,95,148,255,84,88,142,255,84,88,142,255,84,88,142,255,77,81,137,255,77,81,137,255,249,244,164,255,249,244,164,255,249,244,164,255,247,242,160,255,247,242,160,255,246,240,156,255,246,240,156,255,246,240,156,255,244,238,152,255,244,238,152,255,244,238,152,255,243,236,147,255,243,236,147,255,241,233,143,255,241,233,143,255,241,233,143,255,240,231,139,255,240,231,139,255,239,229,134,255,239,229,134,255,239,229,134,255,237,227,130,255,237,227,130,255,236,225,126,255,236,225,126,255,236,225,126,255,234,223,121,255,234,223,121,255,234,223,121,255,233,221,117,255,233,221,117,255,231,219,113,255,231,219,113,255,231,219,113,255,230,217,108,255,230,217,108,255,228,215,104,255,228,215,104,255,228,215,104,255,227,213,100,255,227,213,100,255,225,211,96,255,225,211,96,255,225,211,96,255,225,211,96,255,225,211,96,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.darkBands = map ;
	 var map = undefined; 

	 /* processing pastel colormap */ 
	 var map = {}; 
	 map.name = "pastel" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 195,121,240,255,195,121,240,255,195,121,240,255,196,124,241,255,196,124,241,255,197,127,241,255,197,127,241,255,197,127,241,255,199,131,241,255,199,131,241,255,200,134,242,255,200,134,242,255,200,134,242,255,201,137,242,255,201,137,242,255,203,140,242,255,203,140,242,255,203,140,242,255,204,144,243,255,204,144,243,255,204,144,243,255,205,147,243,255,205,147,243,255,207,150,244,255,207,150,244,255,207,150,244,255,208,152,239,255,208,152,239,255,210,154,234,255,210,154,234,255,210,154,234,255,211,155,229,255,211,155,229,255,213,157,224,255,213,157,224,255,213,157,224,255,215,159,218,255,215,159,218,255,215,159,218,255,216,161,213,255,216,161,213,255,218,162,208,255,218,162,208,255,218,162,208,255,219,164,203,255,219,164,203,255,221,166,198,255,221,166,198,255,221,166,198,255,222,167,194,255,222,167,194,255,224,169,191,255,224,169,191,255,224,169,191,255,225,170,187,255,225,170,187,255,225,170,187,255,226,172,184,255,226,172,184,255,227,173,180,255,227,173,180,255,227,173,180,255,228,175,177,255,228,175,177,255,230,176,173,255,230,176,173,255,230,176,173,255,231,178,170,255,231,178,170,255,231,178,170,255,232,179,166,255,232,179,166,255,233,181,164,255,233,181,164,255,233,181,164,255,234,183,163,255,234,183,163,255,234,185,162,255,234,185,162,255,234,185,162,255,236,188,159,255,234,185,162,255,236,188,159,255,236,188,159,255,236,188,159,255,237,190,157,255,237,190,157,255,237,190,157,255,238,192,156,255,238,192,156,255,238,194,155,255,238,194,155,255,238,194,155,255,240,198,153,255,238,194,155,255,240,198,153,255,240,198,153,255,240,198,153,255,240,200,152,255,240,200,152,255,240,200,152,255,241,204,152,255,240,200,152,255,241,204,152,255,241,204,152,255,241,204,152,255,242,206,151,255,242,206,151,255,242,209,151,255,242,209,151,255,242,209,151,255,244,215,150,255,242,209,151,255,244,215,150,255,242,209,151,255,244,215,150,255,244,215,150,255,244,215,150,255,244,217,150,255,244,217,150,255,244,217,150,255,244,217,150,255,244,221,150,255,244,221,150,255,244,221,150,255,244,221,150,255,245,223,151,255,245,223,151,255,245,223,151,255,245,227,151,255,245,227,151,255,245,227,151,255,245,227,151,255,245,227,151,255,245,229,151,255,245,229,151,255,245,229,151,255,245,229,151,255,245,229,151,255,246,235,152,255,245,229,151,255,246,235,152,255,246,235,152,255,246,235,152,255,246,235,152,255,245,237,154,255,246,235,152,255,245,237,154,255,245,237,154,255,244,239,157,255,245,237,154,255,244,239,157,255,244,239,157,255,244,239,157,255,244,240,158,255,244,240,158,255,244,239,157,255,243,242,159,255,243,242,159,255,243,242,159,255,243,243,160,255,243,242,159,255,242,244,163,255,243,243,160,255,242,244,163,255,242,244,163,255,242,244,163,255,242,244,163,255,237,244,171,255,242,244,163,255,238,244,168,255,237,244,171,255,237,244,171,255,237,244,171,255,237,244,171,255,235,243,173,255,235,243,173,255,235,243,173,255,234,243,176,255,234,243,176,255,232,243,178,255,232,243,178,255,232,243,178,255,230,243,181,255,230,243,181,255,229,242,184,255,229,242,184,255,229,242,184,255,227,242,186,255,227,242,186,255,223,240,190,255,223,240,190,255,223,240,190,255,220,239,194,255,220,239,194,255,220,239,194,255,217,237,197,255,217,237,197,255,213,235,201,255,213,235,201,255,213,235,201,255,210,234,205,255,210,234,205,255,206,232,208,255,206,232,208,255,206,232,208,255,203,231,212,255,203,231,212,255,203,231,212,255,200,229,216,255,200,229,216,255,196,227,219,255,196,227,219,255,196,227,219,255,191,225,222,255,191,225,222,255,186,222,225,255,186,222,225,255,186,222,225,255,181,220,228,255,181,220,228,255,176,218,230,255,176,218,230,255,176,218,230,255,171,215,233,255,171,215,233,255,171,215,233,255,166,213,236,255,166,213,236,255,161,210,239,255,161,210,239,255,161,210,239,255,156,208,242,255,156,208,242,255,151,205,244,255,151,205,244,255,151,205,244,255,147,203,243,255,147,203,243,255,142,200,242,255,142,200,242,255,142,200,242,255,137,198,242,255,137,198,242,255,137,198,242,255,133,195,241,255,133,195,241,255,128,193,240,255,128,193,240,255,128,193,240,255,124,190,239,255,124,190,239,255,119,187,238,255,119,187,238,255,119,187,238,255,115,185,238,255,115,185,238,255,110,182,237,255,110,182,237,255,110,182,237,255,110,182,237,255,110,182,237,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.pastel = map ;
	 var map = undefined; 

	 /* processing watermelonColors colormap */ 
	 var map = {}; 
	 map.name = "watermelonColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 25,26,25,255,25,26,25,255,25,26,25,255,28,31,27,255,28,31,27,255,32,36,29,255,32,36,29,255,32,36,29,255,35,41,31,255,35,41,31,255,38,46,33,255,38,46,33,255,38,46,33,255,42,50,35,255,42,50,35,255,45,55,37,255,45,55,37,255,45,55,37,255,48,60,39,255,48,60,39,255,48,60,39,255,52,65,41,255,52,65,41,255,55,70,44,255,55,70,44,255,55,70,44,255,59,75,46,255,59,75,46,255,62,80,48,255,62,80,48,255,62,80,48,255,65,85,50,255,65,85,50,255,69,89,52,255,69,89,52,255,69,89,52,255,72,94,54,255,72,94,54,255,72,94,54,255,75,98,56,255,75,98,56,255,77,102,58,255,77,102,58,255,77,102,58,255,80,106,60,255,80,106,60,255,82,110,63,255,82,110,63,255,82,110,63,255,85,114,65,255,85,114,65,255,88,118,67,255,88,118,67,255,88,118,67,255,90,121,69,255,90,121,69,255,90,121,69,255,93,125,71,255,93,125,71,255,95,129,74,255,95,129,74,255,95,129,74,255,98,133,76,255,98,133,76,255,101,137,78,255,101,137,78,255,101,137,78,255,103,140,80,255,103,140,80,255,103,140,80,255,106,144,82,255,106,144,82,255,108,148,85,255,108,148,85,255,108,148,85,255,111,152,87,255,111,152,87,255,113,154,90,255,113,154,90,255,113,154,90,255,116,157,93,255,116,157,93,255,119,160,95,255,119,160,95,255,119,160,95,255,124,166,101,255,119,160,95,255,124,166,101,255,124,166,101,255,124,166,101,255,126,169,104,255,126,169,104,255,126,169,104,255,129,172,107,255,129,172,107,255,131,175,109,255,131,175,109,255,131,175,109,255,134,178,112,255,134,178,112,255,137,181,115,255,137,181,115,255,137,181,115,255,139,184,118,255,139,184,118,255,139,184,118,255,142,187,121,255,142,187,121,255,144,190,123,255,144,190,123,255,144,190,123,255,147,193,126,255,147,193,126,255,150,195,129,255,150,195,129,255,150,195,129,255,152,196,132,255,152,196,132,255,155,198,135,255,155,198,135,255,155,198,135,255,158,200,138,255,158,200,138,255,158,200,138,255,161,202,141,255,161,202,141,255,163,204,144,255,163,204,144,255,163,204,144,255,166,206,147,255,166,206,147,255,169,208,150,255,169,208,150,255,169,208,150,255,172,210,153,255,172,210,153,255,174,211,156,255,174,211,156,255,174,211,156,255,177,213,159,255,177,213,159,255,177,213,159,255,180,215,162,255,180,215,162,255,183,217,165,255,183,217,165,255,183,217,165,255,185,219,168,255,185,219,168,255,188,219,170,255,188,219,170,255,188,219,170,255,191,220,172,255,191,220,172,255,193,220,174,255,193,220,174,255,193,220,174,255,196,220,177,255,196,220,177,255,196,220,177,255,198,220,179,255,198,220,179,255,201,220,181,255,201,220,181,255,201,220,181,255,203,220,183,255,203,220,183,255,206,221,185,255,206,221,185,255,206,221,185,255,208,221,187,255,208,221,187,255,211,221,189,255,211,221,189,255,211,221,189,255,214,221,191,255,214,221,191,255,214,221,191,255,216,221,193,255,216,221,193,255,219,222,195,255,219,222,195,255,219,222,195,255,221,222,197,255,221,222,197,255,223,220,197,255,223,220,197,255,223,220,197,255,225,218,196,255,225,218,196,255,226,215,196,255,226,215,196,255,226,215,196,255,227,213,195,255,227,213,195,255,227,213,195,255,229,210,194,255,229,210,194,255,230,208,193,255,230,208,193,255,230,208,193,255,232,205,192,255,232,205,192,255,233,203,191,255,233,203,191,255,233,203,191,255,235,200,190,255,235,200,190,255,235,200,190,255,236,198,189,255,236,198,189,255,237,195,189,255,237,195,189,255,237,195,189,255,239,193,188,255,239,193,188,255,240,191,187,255,240,191,187,255,240,191,187,255,242,188,186,255,242,188,186,255,242,184,183,255,242,184,183,255,242,184,183,255,241,178,177,255,241,178,177,255,241,178,177,255,240,171,170,255,240,171,170,255,239,165,164,255,239,165,164,255,239,165,164,255,238,158,157,255,238,158,157,255,236,152,151,255,236,152,151,255,236,152,151,255,235,145,144,255,235,145,144,255,234,138,138,255,234,138,138,255,234,138,138,255,233,132,131,255,233,132,131,255,233,132,131,255,232,125,124,255,232,125,124,255,230,119,118,255,230,119,118,255,230,119,118,255,229,112,111,255,229,112,111,255,228,106,105,255,228,106,105,255,228,106,105,255,227,99,98,255,227,99,98,255,226,93,92,255,226,93,92,255,226,93,92,255,226,93,92,255,226,93,92,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.watermelonColors = map ;
	 var map = undefined; 

	 /* processing darkRainbow colormap */ 
	 var map = {}; 
	 map.name = "darkRainbow" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 60,88,147,255,60,88,147,255,60,88,147,255,60,88,147,255,60,88,147,255,60,88,147,255,65,91,138,255,60,88,147,255,60,88,147,255,62,88,145,255,62,88,145,255,62,88,145,255,62,88,145,255,62,88,145,255,62,88,145,255,63,88,144,255,63,88,144,255,63,88,144,255,63,88,144,255,63,88,144,255,63,88,144,255,64,89,143,255,64,89,143,255,64,89,143,255,63,88,144,255,63,88,144,255,65,91,138,255,65,91,138,255,65,91,138,255,65,91,138,255,65,91,138,255,65,93,134,255,65,93,134,255,65,95,129,255,65,95,129,255,65,95,129,255,66,97,125,255,66,97,125,255,66,97,125,255,66,99,120,255,66,99,120,255,66,101,116,255,66,101,116,255,66,101,116,255,66,103,111,255,66,103,111,255,67,105,107,255,67,105,107,255,67,105,107,255,67,107,102,255,67,107,102,255,67,109,98,255,67,109,98,255,67,109,98,255,68,110,95,255,68,110,95,255,68,110,95,255,69,112,92,255,69,112,92,255,69,113,89,255,69,113,89,255,69,113,89,255,70,114,86,255,70,114,86,255,71,116,84,255,71,116,84,255,71,116,84,255,71,117,81,255,71,117,81,255,71,117,81,255,72,118,78,255,72,118,78,255,73,120,75,255,73,120,75,255,73,120,75,255,73,121,72,255,73,121,72,255,74,123,69,255,74,123,69,255,74,123,69,255,77,125,68,255,77,125,68,255,81,127,67,255,81,127,67,255,81,127,67,255,84,129,67,255,84,129,67,255,84,129,67,255,87,131,66,255,87,131,66,255,90,133,65,255,90,133,65,255,90,133,65,255,93,135,64,255,93,135,64,255,97,137,64,255,97,137,64,255,97,137,64,255,100,139,63,255,100,139,63,255,103,141,62,255,103,141,62,255,103,141,62,255,106,143,61,255,106,143,61,255,106,143,61,255,111,146,62,255,111,146,62,255,117,149,63,255,117,149,63,255,117,149,63,255,122,152,63,255,122,152,63,255,127,155,64,255,127,155,64,255,127,155,64,255,133,158,64,255,133,158,64,255,138,161,65,255,138,161,65,255,138,161,65,255,143,164,65,255,143,164,65,255,143,164,65,255,149,167,66,255,149,167,66,255,154,170,67,255,154,170,67,255,154,170,67,255,159,173,67,255,159,173,67,255,164,175,68,255,164,175,68,255,164,175,68,255,169,178,69,255,169,178,69,255,174,180,70,255,174,180,70,255,174,180,70,255,179,182,71,255,179,182,71,255,179,182,71,255,184,185,72,255,184,185,72,255,188,187,73,255,188,187,73,255,188,187,73,255,193,190,74,255,193,190,74,255,198,192,75,255,198,192,75,255,198,192,75,255,203,194,76,255,203,194,76,255,208,197,77,255,208,197,77,255,208,197,77,255,209,196,78,255,209,196,78,255,209,196,78,255,211,195,78,255,211,195,78,255,211,195,78,255,214,193,80,255,214,193,80,255,213,194,79,255,213,194,79,255,213,194,79,255,219,190,81,255,213,194,79,255,216,192,80,255,219,190,81,255,219,190,81,255,219,190,81,255,219,190,81,255,219,190,81,255,223,189,83,255,219,190,81,255,223,189,83,255,223,189,83,255,224,188,83,255,224,188,83,255,224,188,83,255,223,182,83,255,223,182,83,255,221,177,82,255,221,177,82,255,221,177,82,255,219,171,81,255,219,171,81,255,218,166,81,255,218,166,81,255,218,166,81,255,216,160,80,255,216,160,80,255,216,160,80,255,214,155,80,255,214,155,80,255,213,150,79,255,213,150,79,255,213,150,79,255,211,144,78,255,211,144,78,255,209,139,78,255,209,139,78,255,209,139,78,255,208,133,77,255,208,133,77,255,208,133,77,255,205,126,75,255,205,126,75,255,203,119,73,255,203,119,73,255,203,119,73,255,201,112,72,255,201,112,72,255,199,105,70,255,199,105,70,255,199,105,70,255,197,98,68,255,197,98,68,255,195,90,66,255,195,90,66,255,195,90,66,255,193,83,64,255,193,83,64,255,193,83,64,255,191,76,62,255,191,76,62,255,188,69,60,255,188,69,60,255,188,69,60,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,186,62,59,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.darkRainbow = map ;
	 var map = undefined; 

	 /* processing pearlColors colormap */ 
	 var map = {}; 
	 map.name = "pearlColors" ;
	 map.width= 262 ;
	 map.height= 1 ;
	 map.data= new Uint8ClampedArray([ 231,215,198,255,231,215,198,255,231,215,198,255,232,216,200,255,232,216,200,255,232,218,202,255,232,218,202,255,232,218,202,255,233,219,204,255,233,219,204,255,233,221,206,255,233,221,206,255,233,221,206,255,234,222,208,255,234,222,208,255,234,224,209,255,234,224,209,255,234,222,208,255,236,228,215,255,234,224,209,255,235,227,213,255,235,227,213,255,235,227,213,255,236,228,215,255,236,228,215,255,236,228,215,255,236,230,217,255,236,230,217,255,237,231,219,255,237,231,219,255,237,231,219,255,237,233,221,255,237,233,221,255,237,233,221,255,237,233,221,255,237,233,221,255,234,232,220,255,234,232,220,255,234,232,220,255,232,230,218,255,232,230,218,255,230,229,217,255,230,229,217,255,230,229,217,255,228,228,216,255,228,228,216,255,226,226,214,255,226,226,214,255,226,226,214,255,224,225,213,255,226,226,214,255,222,224,212,255,222,224,212,255,222,224,212,255,220,223,210,255,220,223,210,255,220,223,210,255,218,221,209,255,218,221,209,255,216,220,208,255,216,220,208,255,216,220,208,255,213,219,206,255,213,219,206,255,211,218,205,255,211,218,205,255,211,218,205,255,209,215,203,255,209,215,203,255,209,215,203,255,206,213,202,255,206,213,202,255,204,211,200,255,204,211,200,255,204,211,200,255,201,209,198,255,201,209,198,255,199,207,196,255,199,207,196,255,199,207,196,255,196,205,195,255,196,205,195,255,194,203,193,255,194,203,193,255,194,203,193,255,191,201,191,255,191,201,191,255,191,201,191,255,189,199,189,255,189,199,189,255,186,197,188,255,186,197,188,255,186,197,188,255,184,195,186,255,184,195,186,255,181,192,184,255,181,192,184,255,181,192,184,255,179,191,183,255,179,191,183,255,179,191,183,255,176,187,181,255,179,191,183,255,176,187,181,255,176,187,181,255,176,187,181,255,174,185,180,255,174,185,180,255,172,184,180,255,172,184,180,255,172,184,180,255,171,182,179,255,171,182,179,255,169,180,178,255,169,180,178,255,169,180,178,255,167,179,177,255,167,179,177,255,167,179,177,255,164,175,176,255,167,179,177,255,164,175,176,255,164,175,176,255,164,175,176,255,162,173,175,255,162,173,175,255,160,172,174,255,160,172,174,255,160,172,174,255,159,170,174,255,159,170,174,255,159,170,174,255,159,170,174,255,159,170,174,255,158,169,175,255,158,169,175,255,158,168,176,255,158,168,176,255,158,168,176,255,158,168,176,255,158,168,176,255,158,168,176,255,158,168,176,255,157,166,178,255,157,166,178,255,157,166,178,255,157,166,178,255,156,164,180,255,158,168,176,255,156,164,179,255,156,164,179,255,156,164,179,255,156,164,180,255,156,164,180,255,155,163,180,255,155,163,180,255,155,163,180,255,155,163,180,255,155,162,183,255,155,163,180,255,155,162,183,255,155,162,183,255,155,162,183,255,155,162,183,255,155,162,183,255,156,162,185,255,156,162,185,255,158,163,187,255,158,163,187,255,159,163,189,255,159,163,189,255,159,163,189,255,160,164,191,255,160,164,191,255,160,164,191,255,160,164,191,255,163,165,195,255,160,164,191,255,163,165,195,255,163,165,195,255,164,166,197,255,164,166,197,255,164,166,197,255,165,166,199,255,164,166,197,255,168,167,202,255,168,167,202,255,165,166,199,255,168,167,202,255,168,167,202,255,169,168,204,255,169,168,204,255,169,168,204,255,169,168,204,255,173,170,208,255,169,168,204,255,173,170,208,255,175,171,211,255,175,171,211,255,175,171,211,255,175,171,211,255,178,173,213,255,178,173,213,255,180,174,215,255,180,174,215,255,180,174,215,255,183,176,218,255,183,176,218,255,183,176,218,255,186,177,220,255,186,177,220,255,188,179,222,255,188,179,222,255,188,179,222,255,191,180,225,255,191,180,225,255,193,182,227,255,193,182,227,255,193,182,227,255,196,183,229,255,196,183,229,255,198,185,232,255,198,185,232,255,198,185,232,255,201,187,234,255,201,187,234,255,201,187,234,255,204,188,236,255,204,188,236,255,207,190,237,255,207,190,237,255,207,190,237,255,210,191,238,255,210,191,238,255,214,193,240,255,214,193,240,255,214,193,240,255,217,195,241,255,217,195,241,255,220,197,242,255,220,197,242,255,220,197,242,255,223,198,243,255,223,198,243,255,223,198,243,255,227,200,245,255,227,200,245,255,230,202,246,255,230,202,246,255,230,202,246,255,233,203,247,255,233,203,247,255,237,205,248,255,237,205,248,255,237,205,248,255,240,207,250,255,240,207,250,255,243,208,251,255,243,208,251,255,243,208,251,255,243,208,251,255,243,208,251,255,]) ;
	 map.image = imageFromArray(map.data, 262,1) ;
	 map.texture = new Float32Texture( map.width, map.height, { data : f32FromUint8(map.data) } ) ;
	 colormaps.pearlColors = map ;
	 var map = undefined; 


	/* returning the colormaps; */ 
	 return colormaps ;
};


var version = 'v6.4.07' ;
var updateTime = 'Wed 16 Sep 2020 16:53:51 (EDT)';

/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * Abubu.js     :   library for computational work
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

/*========================================================================
 * version and update info
 *========================================================================
 */
var infoLine =''; for(var i=0;i<35;i++) infoLine+='*' ;

var glsl_version = '300 es' ;

var log         = console.log ;
var warn        = console.warn ;

/*========================================================================
 * glMatrix variable import
 *========================================================================
 */
this.glMatrix    = glMatrix ;
this.mat2        = mat2 ;
this.mat2d       = mat2d ;
this.mat3        = mat3 ;
this.mat4        = mat4 ;
this.quat        = quat ;
this.vec2        = vec2 ;
this.vec3        = vec3 ;
this.vec4        = vec4 ;

/*========================================================================
 * readOption
 *========================================================================
 */
function readOption(option, defaultValue, warning){
    if (option != undefined){
        return option ;
    }else{
        if (warning != undefined ){
            warn(warning) ;
            log('Warning was issued by "'+
                arguments.callee.caller.name+'"') ;
        }
        return defaultValue ;
    }
}

var readOptions = readOption ;

/*========================================================================
 * toUpperCase
 *========================================================================
 */
function toUpperCase(str){
    if ( str != undefined ){
        return str.toUpperCase() ;
    }else{
        return undefined ;
    }
}

/*========================================================================
 * readGlOption
 *========================================================================
 */
function readGlOption(str, defaultValue, warning ){
    if (str != undefined ){
        return gl[str.toUpperCase()] ;
    }else{
        if (warning != undefined ){
            warn(warning) ;
            log('Warning was issued by "'+
                arguments.callee.caller.name+'"') ;
        }
        return defaultValue ;
    }
}

/*========================================================================
 * get a string and return the appropriate gl option
 *========================================================================
 */ 
function GL(str){
    if (str == undefined){
        warn( 'No gl string was provided' ) ;
        log('Warning was issued by "'+
                arguments.callee.caller.name+'"') ;
        return null ;
    }else{
        return gl[str.toUpperCase()] ;
    }
}

var floatToHex = function (f) { 
    var ff = Math.min(Math.floor(f*255),255) ;
    var ff = Math.max(ff,0) ;

  var hex = Number(ff).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

var fullColorHex = function(c) {   
  var red = floatToHex(c[0]);
  var green = floatToHex(c[1]);
  var blue = floatToHex(c[2]);
  return red+green+blue;
};


/*========================================================================
 * OrbitalCameraControl
 *========================================================================
 */
function OrbitalCameraControl ( mViewMatrix,
                                mRadius = 5,
                                mListenerTarget = window,
                                opts={}) {
    const ANGLE_LIMIT = (Math.PI/2 - 0.01);
    const getCursorPos = function (e) {
        if(e.touches) {
            return {
                x:e.touches[0].pageX,
                y:e.touches[0].pageY
            };
        } else {
            return {
                x:e.clientX,
                y:e.clientY
            };
        }
    };

    this.up = vec3.fromValues(0,1,0) ;

    this._mtxTarget = mViewMatrix;
    this._radius = mRadius;
    this._targetRadius = mRadius;
    this._listenerTarget = mListenerTarget;
    this._isDown = false;
    this._rotation = mat4.create();
    this.center = vec3.create();

    this.easing = .5;
    this.senstivity = 1.0;
    this.senstivityRotation = .5;

    this._isLocked = false;
    this._isZoomLocked = false;
    this._rx = 0.0;
    this._trx = 0;
    this._ry = 0.0;
    this._try = 0;

    this._prevx = readOption( opts.prevx, 0 ) ;
    this._prevy = readOption( opts.prevy, 0 ) ;
    this.up     = readOption( opts.up, vec3.fromValues(0,1,0)) ;

    this._quat = quat.create();
    this._vec = vec3.create();
    this._mtx = mat4.create();


    this._mouseDown = {
        x:0,
        y:0
    };

    this._mouse = {
	x:0,
	y:0
    };



    this._init = function() {
        this._listenerTarget.addEventListener('mousedown',
                (e) => this._onDown(e));
        this._listenerTarget.addEventListener('mouseup',
                () => this._onUp());
        this._listenerTarget.addEventListener('mousemove',
                (e) => this._onMove(e));

        this._listenerTarget.addEventListener('touchstart',
                (e) => this._onDown(e));
        this._listenerTarget.addEventListener('touchend',
                () => this._onUp());
        this._listenerTarget.addEventListener('touchmove',
                (e) => this._onMove(e));

        this._listenerTarget.addEventListener('mousewheel',
                (e) => this._onWheel(e));
        this._listenerTarget.addEventListener('DOMMouseScroll',
                (e) => this._onWheel(e));
    }

    this._init();

    this.lock = function(mValue) {
        this._isLocked = mValue;
    }


    this.lockZoom = function(mValue) {
        this._isZoomLocked = mValue;
    }


    this._onWheel = function(e) {
        if ( e.ctrlKey || e.shiftKey || e.metaKey || (e.which ==3)){
            return ;
        }
        if(this._isZoomLocked) {
            return;
        }

        const w = e.wheelDelta;
        const d = e.detail;
        let value = 0;
        if (d) {
            if (w) {
                value = w / d / 40 * d > 0 ? 1 : -1;
            } else {
                value = -d / 3;
            }
        } else {
            value = w / 120;
        }

        this._targetRadius += (-value * 2 * this.senstivity);
        if(this._targetRadius < 0.01) {
            this._targetRadius = 0.01;
        }
    }

    this._onDown = function(e) {
        if ( e.ctrlKey || e.shiftKey || e.metaKey || (e.which ==3)){
            return ;
        }
        if(this._isLocked) {	return;	}
        this._isDown = true;

        this._mouseDown = getCursorPos(e);
        this._mouse = getCursorPos(e);

        this._prevx = this._trx = this._rx;
        this._prevy = this._try = this._ry;
    }

    this._onMove = function(e) {
        if (  e.ctrlKey || e.shiftKey || e.metaKey || (e.which ==3) ){
            return ;
        }
        if(this._isLocked) {	return;	}
        if(!this._isDown)	{	return;	}
        this._mouse = getCursorPos(e);
    }

    this._onUp = function() {
        if(this._isLocked) {	return;	}
        this._isDown = false;
    }

/*-------------------------------------------------------------------------
 * update the mViewMatrix
 *-------------------------------------------------------------------------
 */
    this.update = function() {
        const dx = this._mouse.x - this._mouseDown.x;
        const dy = this._mouse.y - this._mouseDown.y;

        const senstivity = 0.02 * this.senstivityRotation;
        this._try = this._prevy - dx * senstivity;
        this._trx = this._prevx - dy * senstivity;

        this._trx = Math.max(this._trx,-ANGLE_LIMIT) ;
        this._trx = Math.min(this._trx, ANGLE_LIMIT) ;

        this._rx += (this._trx - this._rx) * this.easing ;
        this._ry += (this._try - this._ry) * this.easing ;
        this._radius += (this._targetRadius - this._radius) * this.easing;

        quat.identity(this._quat);
        quat.rotateY(this._quat, this._quat, this._ry);
        quat.rotateX(this._quat, this._quat, this._rx);

        vec3.set(this._vec, 0, 0, this._radius);
        vec3.transformQuat(this._vec, this._vec, this._quat);

        mat4.identity(this._mtx);
        mat4.lookAt(this._mtx, this._vec, this.center, this.up);

        if(this._mtxTarget) {
            mat4.copy(this._mtxTarget, this._mtx);
        }
    }
}

/*========================================================================
 * sourceDisp   :   used for displaying source with line numbers for
 *                  debugging purposes
 *========================================================================
 */
function sourceDisp(source){
    var lines = source.split('\n') ;

    for(var i=0; i<lines.length; i++){
        var j=  i+1 ;
        console.log(j.toString()+'\t',lines[i]);
    }
}

/*========================================================================
 * defined
 *========================================================================
 */
function defined(v){
    if (v != undefined ){
        return true ;
    }else{
        return false ;
    }
}

/*========================================================================
 * Create a computeGl context
 *========================================================================
 */
class ComputeGL{
    constructor(options={}){
        log(infoLine) ;
        log('Abubu ', version );
        log('Updated on',updateTime) ;
        log('Developed by Abouzar Kaboudian!') ;
        log('For support email: abouzar.kaboudian@physics.gatech.edu');
        log(infoLine) ;
        this.canvas = document.createElement('canvas') ;
        this.width = 512 ;
        this.height = 512 ;
        this.extensions = {} ;
        this.dispCanvas = undefined ;

        this.width  = readOption(options.width, 512 ) ;
        this.height = readOption(options.height, 512 ) ;
        this.dispCanvas = readOption(options.canvas, this.canvas ) ;

        this.canvas.width = this.width ;
        this.canvas.height = this.height ;

        this.gl = this.canvas.getContext("webgl2") ;
        if (!this.gl){
            return null;
        }
        var gl = this.gl ;

        this.supportedExtensions = this.gl.getSupportedExtensions() ;
        gl.getExtension('EXT_color_buffer_float') ;
        gl.getExtension('OES_texture_float_linear') ;
        for(var i=0 ; i < this.supportedExtensions.length; i++ ){
                var ext = this.supportedExtensions[i] ;
                this.extensions[ext] = this.gl.getExtension(ext) ;
        }
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
}

var cgl = new ComputeGL();
if (cgl.gl){
    console.log("WebGL 2.0 context successfully initialized!") ;
}else{
    window.alert("Your browser does not support WebGL 2.0 :-(\n"+
            "Please, open the page in a supported browser such as Google "
            + "Chrome or Mozilla FireFox" ) ;
}
var gl  = cgl.gl ;
gl.lastClickTime = -1e10 ;

/*========================================================================
 * Shader class 
 *========================================================================
 */ 
class Shader{
    constructor(inType, inSource){
        this._type  = inType ;
        this._source= inSource ;
        this._shader= gl.createShader(this.type) ;
        this.oldSuccess = false ;
        this.compile() ;
    }
/*------------------------------------------------------------------------
 * end of constructor
 *------------------------------------------------------------------------
 */

    set type(nt){
        this._type = nt ;
        this._shader= gl.createShader(this.type) ;
        this.compile() ;
    }

    get type(){
        if (this._type == 'vertexShader'){
                return gl.VERTEX_SHADER ;
        }else{
                return gl.FRAGMENT_SHADER ;
        }
    }

    get source(){
        var src ;
        if ( typeof(this._source) == 'string' ){
            src = this._source ;
        }else if ( typeof(this._source) == 'object') {
            src = this._source.value ;
        }

        if ((this._source == undefined || this._source == null)  
                && this.type == gl.VERTEX_SHADER){
            src = DefaultVertexShader.value ;
        }
        /* Add version to the shader source if 
           there is no version determined in the shader source  */ 
        if ( src.split('\n')[0].split(' ')[0] != '#version' ){
            src = '#version '+ glsl_version + '\n' + source ;
        }
        return src ;
    }   

    set source(ns){
        this.oldSource = this.source ;
        this._source = ns ;
        this.compile() ;
    }

    get shader(){
        return this._shader ;
    }

    get pointer(){
        return this.shader ;
    }

    get glPointer(){
        return this.program ;
    }

    compile(){
        try{
            // = gl.createShader(this.type) ; 
             
            gl.shaderSource(this.shader, this.source) ;
            gl.compileShader(this.shader) ;
        

            this.success = 
                gl.getShaderParameter(this.shader, gl.COMPILE_STATUS);
            this.shaderInfoLog = gl.getShaderInfoLog(this.shader) ;
            if (this.shaderInfoLog.length > 0. ){
                sourceDisp(this.source) ;
                log(this.shaderInfoLog);  // eslint-disable-line
            }
            if (this.success) {
                this.oldSuccess = true ;
                return this ;
            }else{
                throw 'Shader failed to compile! '+
                    'Trying last available compilable source!' ;
            }
        
        }catch(e){
            console.log(e) ;
            if (this.oldSuccess){
                console.log('Successful compilation available...') ;
                this.source = this.oldSource ;
            }else{
                console.error('No successful compilation is available') ;
            }
        }

        gl.deleteShader(this.shader);
        return undefined;
    }

    deleteMe(){
        gl.deleteShader(this.shader) ;
    }
}

/*========================================================================
 * Program class 
 *========================================================================
 */
class Program{
    constructor( vertexShader, fragmentShader ){
        this._program       = gl.createProgram() ;
        this._vertexShader  = vertexShader ; 
        this._fragmentShader= fragmentShader ;
        this.success = false ;

        this.attach() ;
        this.link() ;
        return this ;
    }
/*------------------------------------------------------------------------
 * end of constructor
 *------------------------------------------------------------------------
 */
    get program(){
        return this._program ;
    }

    get pointer(){
        return this.program ;
    }

    get glPointer(){
        return this.program ;
    }

    get vertexShader(){
        return this._vertexShader  ;
    }

    get fragmentShader(){
        return this._fragmentShader ;
    }
    
    attach(){
        gl.attachShader(this.program, this.vertexShader.shader) ;
        gl.attachShader(this.program, this.fragmentShader.shader) ;
    }

    link(){
        gl.linkProgram(this.program) ;
        this.success 
            = gl.getProgramParameter(this.program, gl.LINK_STATUS); 
        if (this.success){
            return ;
        }else{
            log(gl.getProgramInfoLog(this.program)) ;
            return ;
        }
    }

    deleteMe(){
        gl.deleteProgram(this._program) ;
    }
}

/*========================================================================
 * createShader
 *========================================================================
 */
function createShader(type, source) {
    var shader  = gl.createShader(type);
    var src     = source ;

    /* Add version to the shader source if 
       there is no version determined in the shader source  */ 
    if ( src.split('\n')[0].split(' ')[0] != '#version' ){
        src = '#version '+ glsl_version + '\n' + source ;
    }

    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    var shaderInfoLog = gl.getShaderInfoLog(shader) ;
    if (shaderInfoLog.length > 0. ){
        sourceDisp(source) ;
        log(shaderInfoLog);  // eslint-disable-line
    }
    if (success) {
        return shader;
    }

    gl.deleteShader(shader);
    return undefined;
}

/*========================================================================
 * createProgram
 *========================================================================
 */
function createProgram(vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    log(gl.getProgramInfoLog(program));  // eslint-disable-line
    gl.deleteProgram(program);
    return undefined;
}


/*========================================================================
 *  Texture     :   
 *  w           :   width of render target
 *  h           :   height of render target 
 *  options :
 *      - internalFormat
 *      - format
 *      - type
 * 
 *      - data
 *      - wrapS 
 *      - wrapT
 *      - minFilter
 *      - magFilter
 *========================================================================
 */
class Texture{
    constructor( w, h, iformat, format, type, options={} ){

        this.gl         = cgl.gl ;
        this.texture    = gl.createTexture() ;
        this._width      = w ;
        this._height     = h ;

        this._internalFormat = readOption( iformat, 'rgba32f' ,
                'No internal format provided, assuming RBGA32F' ) ;
        this._format = readOption( format , 'rgba',
            'No format was provided, assuming "rgba"' ) ;
        this._type   = readOption( type, 'float',
            'No type was provided, assuming "float"') ;

        this._wrapS    = readOption( options.wrapS, 'clamp_to_edge') ;
        this._wrapT    = readOption( options.wrapT, 'clamp_to_edge') ;

        this._minFilter = readOption( options.minFilter , 'nearest' ) ;
        this._magFilter = readOption( options.magFilter , 'nearest' ) ;
        this._data      = readOption(   options.data ,
                                        null                ) ;

/*------------------------------------------------------------------------
 * bind and set texture
 *------------------------------------------------------------------------
 */

        this.initialize() ;

        this._pairable = readOption( options.pair, false ) ;
        this._pairable = readOption( options.pairable , this._pairable ) ;
        this._reader = null ;

        if (this.pairable){
            this._reader = new TextureReader(this) ;
        }
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*------------------------------------------------------------------------
 * initialize the texture 
 *------------------------------------------------------------------------
 */

    initialize(){
        gl.bindTexture(     gl.TEXTURE_2D, this.texture     ) ;

        gl.texParameteri(   gl.TEXTURE_2D,
                            gl.TEXTURE_WRAP_S,
                            GL(this.wrapS)                  ) ;

        gl.texParameteri(   gl.TEXTURE_2D,
                            gl.TEXTURE_WRAP_T,
                            GL(this.wrapT)                  ) ;

        gl.texParameteri(   gl.TEXTURE_2D,
                            gl.TEXTURE_MIN_FILTER,
                            GL(this.minFilter)              ) ;

        gl.texParameteri(   gl.TEXTURE_2D,
                            gl.TEXTURE_MAG_FILTER,
                            GL(this.magFilter)              ) ;

        gl.texImage2D(      gl.TEXTURE_2D, 0 ,
                            GL(this.internalFormat),
                            this.width, this.height, 0,
                            GL(this.format),
                            GL(this.type),
                            this.data                       ) ;

        gl.bindTexture(     gl.TEXTURE_2D, null             ) ;

        return ;
    }
/*------------------------------------------------------------------------
 * getters and setters 
 *------------------------------------------------------------------------
 */

// width and height ......................................................
    resize(width,height){
        this._width = readOption(width,this.width) ;
        this._height = readOption(height,this.height) ;
        gl.bindTexture(gl.TEXTURE_2D, this.texture) ;
        gl.texImage2D(  gl.TEXTURE_2D, 0 , 
                        GL(this.internalFormat),
                        this.width, this.height, 0, 
                        GL(this.format), GL(this.type), null ) ;
        gl.bindTexture(     gl.TEXTURE_2D, null             ) ;
    }

    get width(){
        return this._width ;
    }
    set width(w){
        this.resize(w,this.height) ;
    }

    get height(){
        return this._height ;
    }

    set height(h){
        this.resize(this.width,h) ;
    }

// internalFormat ........................................................
    get internalFormat(){
        return this._internalFormat ;
    }
    set internalFormat(nif){
        this._internalFormat = readOption(nif, this.internalFormat ) ;
        gl.bindTexture(     gl.TEXTURE_2D, this.texture     ) ;
        gl.texImage2D(  gl.TEXTURE_2D, 0 , 
                        GL(this.internalFormat),
                        this.width, this.height, 0, 
                        GL(this.format), GL(this.type), null ) ;
        gl.bindTexture(     gl.TEXTURE_2D, null             ) ;
        return ;
    }

// format ................................................................
    get format(){
        return this._format ;
    }
    set format(nf){
        this._format = nf ;
        gl.bindTexture(     gl.TEXTURE_2D, this.texture     ) ;
        gl.texImage2D(  gl.TEXTURE_2D, 0 , 
                        GL(this.internalFormat),
                        this.width, this.height, 0, 
                        GL(this.format), GL(this.type), null ) ;
        gl.bindTexture(     gl.TEXTURE_2D, null             ) ;
        return ;
    }

// type ..................................................................
    get type(){
        return this._type ;
    }
    set type(nt){
        this._type = readOption(nt, this.type) ;
        gl.bindTexture(     gl.TEXTURE_2D, this.texture     ) ;
        gl.texImage2D(  gl.TEXTURE_2D, 0 , 
                        GL(this.internalFormat),
                        this.width, this.height, 0, 
                        GL(this.format), GL(this.type), null ) ;
        gl.bindTexture(     gl.TEXTURE_2D, null             ) ;
        return ;
    }

// wrapS .................................................................
    get wrapS(){
        return this._wrapS ;
    }
    set wrapS(ws){
        this._wrapS = readOption( ws, this.wrapS ) ;
        gl.bindTexture(     gl.TEXTURE_2D, this.texture     ) ;
        gl.texParameteri(   gl.TEXTURE_2D,
                            gl.TEXTURE_WRAP_S,
                            GL(this.wrapS)                  ) ;
        gl.bindTexture(     gl.TEXTURE_2D, null             ) ;
        return ;
    }
    setWrapS(ws){
        this.wrapS = ws ;
        return ;
    }

// wrapT .................................................................
    get wrapT(){
        return this._wrapT ;
    }
    set wrapT(wt){
        this._wrapT = readOption(wt, this.wrapT) ;
        gl.bindTexture(     gl.TEXTURE_2D, this.texture     ) ;
        gl.texParameteri(   gl.TEXTURE_2D,
                            gl.TEXTURE_WRAP_T,
                            GL(this.wrapT)                  ) ;
        gl.bindTexture(     gl.TEXTURE_2D, null             ) ;
        return ;
    }

    setWrapT(wt){
        this.wrapT = wt ;
        return ;
    }

// minFilter .............................................................
    get minFilter(){
        return this._minFilter ;
    }
    set minFilter(nf){
        this._minFilter = readOption(nf , this.minFilter ) ;
        gl.bindTexture(     gl.TEXTURE_2D, this.texture     ) ;
        gl.texParameteri(   gl.TEXTURE_2D,
                            gl.TEXTURE_MIN_FILTER,
                            GL(this.minFilter)              ) ;
        gl.bindTexture(     gl.TEXTURE_2D, null             ) ;
    }
    setMinFilter(minFilter){
        this.minFilter = readOption(minFilter, this.minFilter ) ;
        return this.minFilter ;
    }

// magFilter .............................................................
    get magFilter(){
        return this._magFilter ;
    }
    
    set magFilter(nf){
        this._magFilter = readOption(nf, this.magFilter ) ;
        gl.bindTexture(     gl.TEXTURE_2D, this.texture     ) ;
        gl.texParameteri(   gl.TEXTURE_2D,
                            gl.TEXTURE_MAG_FILTER,
                            GL(this.magFilter)              ) ;
        gl.bindTexture(     gl.TEXTURE_2D, null             ) ;
    }

    setMagFilter(magFilter){
        this.magFilter = readOption(magFilter, this.magFilter ) ;
        return this.magFilter ; 
    }

// data ..................................................................
    get data(){
        return this._data ;
    }

    set data(new_data){
        this._data = new_data ;
        this.updateData(new_data) ;
    }

    updateData( newData ){
        gl.bindTexture(gl.TEXTURE_2D, this.texture) ;

        this._data = readOption( newData, this.data ) ;
        gl.texImage2D( gl.TEXTURE_2D, 0 , GL(this.internalFormat),
                    this.width, this.height, 0, 
                    GL(this.format), GL(this.type) ,
                    this.data    ) ;
        gl.bindTexture(gl.TEXTURE_2D, null) ;
    }

    update( nd ){
        this.data = readOption(nd, this.data ) ;
    }

// pairability ...........................................................
    get pairable(){
        return this._pairable ;
    }

    set pairable(p){
        if ((!this.pairable) && p ){
            this.reader = new TextureReader(this) ;
        }
        this._pairable = p ;
    }
    
            
    get reader(){
        return this._reader ;
    }

    set reader(nr){
        this._reader = nr ;
    }

    get value(){
        if (!this.pairable){
            this.pairable = true ;
        }
        return this.reader.value ;
    }

    valueOf(){
        return this.value ;
    }

    read(){
        return this.value ;
    }
}

/*========================================================================
 * Uint32Texture    : 32 bit unsigned integer texture
 *========================================================================
 */ 
class Uint32Texture extends Texture{
    constructor(w,h,options={}){
        super( w,h, 'rgba32ui','rgba_integer', 'unsigned_int' , options) ;
    }
}

/*========================================================================
 * IntegerTexture   : 32 bit integer texture
 *========================================================================
 */
class Int32Texture extends Texture{
    constructor(w,h, options={}){
        super(w,h,'rgba32i','rgba_integer','int',options) ;
    }
}
/*========================================================================
 * Float32RTexture 
 *========================================================================
 */
class Float32RTexture extends Texture{
    constructor(w,h,options={}){
        super(w,h,'r32f','red','float',options) ;

    }
}

/*========================================================================
 * FloatTexture     : 32 bit float texture
 *========================================================================
 */
class Float32Texture extends Texture{
    constructor(w,h,options={}){
        super(w,h,'rgba32f','rgba','float',options) ;
    }
   
    resize( width, height ){
        var target = {} ;
        target.texture = this.texture ;
        target.width   = this.width ;
        target.height  = this.height ;
        this.temp = new Float32Texture( this.width, this.height) ;
        copyTexture(target, this.temp ) ;

        this.width = width ;
        this.height = height ;
        gl.bindTexture(gl.TEXTURE_2D, this.texture) ;
        gl.texImage2D(  gl.TEXTURE_2D, 0 , gl.RGBA32F,
                        this.width,
                        this.height, 0, gl.RGBA, gl.FLOAT, null ) ;
        copyTexture(this.temp, target ) ;
    }
}

var FloatRenderTarget = Float32Texture ;

/*========================================================================
 * ImageTexture
 *========================================================================
 */
class ImageTexture extends Float32Texture{
    constructor(Img, options={}){
        if ( Img.used ){
            log( 'Image is used once and cannot be re-used in '
                +'the library. '
                +'Consider using the data from previous import, or '
                +'re-importing the image as a different resource!'  ) ;
            return null ;
        }

        Img.used = true ;
        options.data = Img ;
        gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true) ;
        super(Img.width, Img.height, options) ; 
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

    set width(w){
        console.log("Cannot change size!") ;
    }
    get width(){
        return this._width ;
    }
    set height(h){
        console.log("Cannot change height") ;
    }
    get height(){
        return this._height ;
    }
}
/*========================================================================
 * CanvasTexture( canvas )
 *========================================================================
 */
class CanvasTexture extends Float32Texture{
    constructor(canvas, options={}){
        options.data = canvas ;
        gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true) ;
        super(canvas.width, canvas.height, options) ; 
        this.canvas = canvas ;
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
    update(){
        gl.bindTexture(gl.TEXTURE_2D, this.texture) ;
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true) ;
        gl.texImage2D(  gl.TEXTURE_2D, 0 , gl.RGBA32F,
                        this.width, this.height, 0, gl.RGBA, gl.FLOAT,
                        this.canvas ) ;
        gl.bindTexture(gl.TEXTURE_2D, null) ;
    }

    get width(){
        return this.canvas.width ;
    }
    get height(){
        return this.canvas.height ;
    }

    set width(w){
        this.canvas.width = w ;
    }
    set height(h){
        this.canvas.height = h ;
    }
    resize(w,h){
        this.width = w ;
        this.height = h ;
        this.update() ;
    }
}
        

/*========================================================================
 * CanvasTexture( canvas )
 *========================================================================
 */
class LegacyCanvasTexture{
    constructor(canvas){
        this.canvas = canvas ;
        this.cgl    = cgl ;
        this.width  = canvas.width ;
        this.height = canvas.height ;

        this.texture = gl.createTexture() ;
        gl.bindTexture(gl.TEXTURE_2D, this.texture) ;
        gl.texParameteri(gl.TEXTURE_2D, 
                gl.TEXTURE_WRAP_S, 
                gl.CLAMP_TO_EDGE );
        gl.texParameteri(gl.TEXTURE_2D, 
                gl.TEXTURE_WRAP_T, 
                gl.CLAMP_TO_EDGE );
        gl.texParameteri(gl.TEXTURE_2D, 
                gl.TEXTURE_MIN_FILTER, 
                gl.NEAREST   );
        gl.texParameteri(gl.TEXTURE_2D, 
                gl.TEXTURE_MAG_FILTER, 
                gl.NEAREST   );
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true) ;
        gl.texImage2D( gl.TEXTURE_2D, 0 , gl.RGBA32F,
                        this.width, this.height, 0, gl.RGBA, gl.FLOAT,
                        this.canvas ) ;

        gl.bindTexture(gl.TEXTURE_2D, null) ;
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*------------------------------------------------------------------------
 * update
 *------------------------------------------------------------------------
 */
    update(){
        this.width = this.canvas.width ;
        this.height = this.canvas.height ;
        gl.bindTexture(gl.TEXTURE_2D, this.texture) ;
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true) ;
        gl.texImage2D(  gl.TEXTURE_2D, 0 , gl.RGBA32F,
                        this.width, this.height, 0, gl.RGBA, gl.FLOAT,
                        this.canvas ) ;
        gl.bindTexture(gl.TEXTURE_2D, null) ;
    }
}

/*========================================================================
 * TableTexture
 *========================================================================
 */

class TableTexture extends Float32Texture{
    constructor( t, w, h=1, options={} ){
        options.data = t ;
        options.minFilter = 
            readOptions(options.minFilter, 'linear' ) ;
        options.magFilter =  
            readOptions(options.magFilter, 'linear' ) ;
        options.wrapS = 
            readOptions(options.wrapS , 'clamp_to_edge') ;
        options.wrapT = 
            readOptions(options.wrapT , 'clamp_to_edge') ;

        super(w,h,options) ;
    }
    update(nt){
        this.data = readOption(nt, this.data) ;
    }
    get table(){
        return this.data ;
    }
    set table(nt){
        this.update(nt) ;
    }
}

/*========================================================================
 * TableTexture
 *========================================================================
 */
class LegacyTableTexture{
    constructor( t, w, h=1, options ={} ){
        this.cgl = cgl ;
        this.width = w ;
        this.height = h ;
        this.size = this.width*this.height ;
        this.originalTable = t ;
        this.table = new Float32Array(t) ;

        this.minFilter  = readGlOption(options.minFilter, 
                gl.LINEAR         ) ;
        this.magFilter  = readGlOption(options.magFilter, 
                gl.LINEAR         ) ;
        this.wrapS      = readGlOption(options.wrapS    , 
                gl.CLAMP_TO_EDGE  ) ;
        this.wrapT      = readGlOption(options.wrapT    , 
                gl.CLAMP_TO_EDGE  ) ;

/*------------------------------------------------------------------------
 * Creating the texture
 *------------------------------------------------------------------------
 */
        this.texture = gl.createTexture() ;

        gl.bindTexture(     gl.TEXTURE_2D,
                            this.texture            ) ;

        gl.texParameteri(   gl.TEXTURE_2D,
                            gl.TEXTURE_WRAP_S,
                            this.wrapS              ) ;

        gl.texParameteri(   gl.TEXTURE_2D,
                            gl.TEXTURE_WRAP_T,
                            this.wrapT              ) ;

        gl.texParameteri(   gl.TEXTURE_2D,
                            gl.TEXTURE_MIN_FILTER,
                            this.minFilter          ) ;

        gl.texParameteri(   gl.TEXTURE_2D,
                            gl.TEXTURE_MAG_FILTER,
                            this.magFilter          );

        gl.texImage2D(      gl.TEXTURE_2D,
                            0 ,
                            gl.RGBA32F,
                            this.width,
                            this.height,
                            0,
                            gl.RGBA,
                            gl.FLOAT,
                            this.table              ) ;

        gl.bindTexture(     gl.TEXTURE_2D,
                            null                    ) ;
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*------------------------------------------------------------------------
 * setWrapS
 *------------------------------------------------------------------------
 */
    setWrapS(wrapS){
        this.wrapS = readGlOption(wrapS, this.wrapS ) ;
        gl.bindTexture(     gl.TEXTURE_2D, this.texture ) ;
        gl.texParameteri(   gl.TEXTURE_2D,
                            gl.TEXTURE_WRAP_S,
                            this.wrapS                  ) ;
        gl.bindTexture(     gl.TEXTURE_2D, null         ) ;
    }

/*------------------------------------------------------------------------
 * setWrapT
 *------------------------------------------------------------------------
 */
    setWrapT(wrapT){
        this.wrapT = readGlOption(wrapT, this.wrapT ) ;
        gl.bindTexture(     gl.TEXTURE_2D, this.texture ) ;
        gl.texParameteri(   gl.TEXTURE_2D,
                            gl.TEXTURE_WRAP_T,
                            this.wrapT                  ) ;
        gl.bindTexture(     gl.TEXTURE_2D, null         ) ;
        return ;
    }

/*------------------------------------------------------------------------
 * setMinFilter
 *------------------------------------------------------------------------
 */
    setMinFilter(minFilter){
        this.minFilter = readOption(minFilter, this.minFilter ) ;
        gl.bindTexture(     gl.TEXTURE_2D, this.texture ) ;
        gl.texParameteri(   gl.TEXTURE_2D,
                            gl.TEXTURE_MIN_FILTER,
                            this.minFilter              ) ;
        gl.bindTexture(     gl.TEXTURE_2D, null         ) ;

    }

/*------------------------------------------------------------------------
 * setMagFilter
 *------------------------------------------------------------------------
 */
    setMagFilter(magFilter){
        this.magFilter = readOption(magFilter, this.magFilter ) ;
        gl.bindTexture(     gl.TEXTURE_2D, this.texture ) ;
        gl.texParameteri(   gl.TEXTURE_2D,
                            gl.TEXTURE_MAG_FILTER,
                            this.magFilter              ) ;
        gl.bindTexture(     gl.TEXTURE_2D, null         ) ;

    }

/*------------------------------------------------------------------------
 * updating the table
 *------------------------------------------------------------------------
 */
    update(utab){
        if (utab != undefined){
            this.originalTable = utab ;
            this.table = new Float32Array(utab) ;
        }else{
            this.table = new Float32Array(this.originalTable) ;
        }
        gl.bindTexture(gl.TEXTURE_2D, this.texture) ;

        gl.texImage2D( gl.TEXTURE_2D, 0 , gl.RGBA32F,
        this.width, this.height, 0, gl.RGBA, gl.FLOAT, this.table ) ;
        gl.bindTexture(gl.TEXTURE_2D, null) ;
    }
}

/*========================================================================
 * Copy
 *========================================================================
 */
function Copy(srcTarget, destTarget){
    return new Solver( {
            vertexShader : DefaultVertexShader.value ,
            fragmentShader: wA2bShader.value ,
            uniforms : {
                map : {
                    type        : 's' ,
                    value       : srcTarget ,
                    minFilter   : 'linear',
                    magFilter   : 'linear' ,
                } ,
            } ,
            renderTargets : {
                FragColor : {
                    location    : 0 ,
                    target      : destTarget
                } ,
            }
    } ) ;
}

/*========================================================================
 * CompressedData
 *========================================================================
 */ 
class RgbaCompressedData{
    constructor( data, options={}){

        if (data == undefined){
            log( 'You need to provide data source for compression!') ;
            return null ;
        }

        this.data       = new Float32Array(data) ;
        this.width      = readOption( options.width,    data.length/4   ) ;
        this.height     = readOption( options.height,   1               ) ;
        if ( (this.width == (data.length/4)) && height != 1 ){
            this.width = (data.length/this.height)/4 ;
        }

        this.threshold  = readOption(   options.threshold, 0            ) ;
        this.threshold  = readOption(   options.compressionThreshold,
                                        this.threshold                  ) ;
        
        this.compressionThresholdChannel
                        = readOption(   options.channel,    'r'         ) ;

        switch (this.compressionThresholdChannel){
            case 'r' :
                this.channel = 0 ;
                break ;
            case 'g' :
                this.channel = 1 ;
                break ;
            case 'b' :
                this.channel = 2 ;
                break ;
            case 'a' :
                this.channel = 3 ;
                break ;
            default :
                this.channel = 0 ;
                break ;
        }

        this.compThresholdData = new Float32Array(this.width*this.height) ;

/*------------------------------------------------------------------------
 * count number of pixels above the compression threshold
 *------------------------------------------------------------------------
 */
        this.noAboveThreshold = 0 ;
        for(var j=0 ; j<this.height ; j++){
            for (var i=0 ; i <this.width; i++){
                var indx    = i + j*this.width ;
                this.compThresholdData[indx]
                        = this.data[indx*4 + this.channel] ;
                if (this.compThresholdData[indx]>this.threshold){
                        this.noAboveThreshold++ ;
                }
            }
        }

/*------------------------------------------------------------------------
 * allocating memory to data
 *------------------------------------------------------------------------
 */
        this.compressedSize    =
            Math.ceil( Math.sqrt( this.noAboveThreshold )) ;

        this.compressedTable =
            new Float32Array(this.compressedSize*this.compressedSize*4  ) ;
        this.decompressionMapTable =
            new Float32Array(this.compressedSize*this.compressedSize*4  ) ;
        this.compressionMapTable =
            new Float32Array(this.width*this.height * 4 ) ;

/*------------------------------------------------------------------------
 * compress data
 *------------------------------------------------------------------------
 */
        var num = 0 ;
        for(var j=0 ; j<this.height ; j++){
            for (var i=0 ; i <this.width; i++){
                var indx    = i + j*this.width ;
                if (this.compThresholdData[indx]>this.threshold){
                    var jj  = Math.floor( num/this.compressedSize) ;
                    var ii  = num - jj*this.compressedSize ;

                    var x   = ii/this.compressedSize
                            + 0.5/this.compressedSize ;
                    var y   = jj/this.compressedSize
                            + 0.5/this.compressedSize ;

                    var nindx = ii + jj*this.compressedSize ;

                    this.compressionMapTable[indx*4     ]   = x ;
                    this.compressionMapTable[indx*4 + 1 ]   = y ;
                    this.decompressionMapTable[nindx*4  ]   =
                        i/this.width + 0.5/this.width ;
                    this.decompressionMapTable[nindx*4+1]   =
                        j/this.height+ 0.5/this.height ;

                    for (var k = 0 ; k<4 ; k++){
                        this.compressedTable[nindx*4+k]
                            = this.data[indx*4+k] ;
                    }
                    num++ ;
                }else{
                    this.compressionMapTable[indx*4     ]
                        = 1.-0.5/this.compressedSize ;
                    this.compressionMapTable[indx*4 + 1 ]
                        = 1.-0.5/this.compressedSize ;
                }

            }
        }
        var ii = this.compressedSize -1 ;
        var jj = this.compressedSize -1 ;
        var nindx = ii + jj*this.compressedSize ;
        for (var k = 0 ; k<4 ; k++){
            this.compressedTable[nindx*4+k] = 0. ;
        }

/*------------------------------------------------------------------------
 * setting compressedData, compressionMap, decompressionMap textures
 *------------------------------------------------------------------------
 */
        this.full   = new TableTexture(
            this.data,
            this.width,
            this.height,
            {
                minFilter : 'nearest' ,
                magFilter : 'nearest'
            }
        ) ;

        this.sparse = new TableTexture(
            this.compressedTable,
            this.compressedSize ,
            this.compressedSize ,
            {
                minFilter : 'nearest' ,
                magFilter : 'nearest'
            }
        ) ;

        this.compressionMap     = new TableTexture(
            this.compressionMapTable,
            this.width,
            this.height ,
            {
                minFilter : 'nearest' ,
                magFilter : 'nearest'
            }
        ) ;

        this.decompressionMap   = new TableTexture(
            this.decompressionMapTable ,
            this.compressedSize ,
            this.compressedSize ,
            {
                minFilter : 'nearest' ,
                magFilter : 'nearest'
            }
        ) ;
    }   
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
    
/*------------------------------------------------------------------------
 * getCompressionRatio
 *------------------------------------------------------------------------
 */
    getCompressionRatio(){
        return (    this.compressedSize*this.compressedSize/
                    (this.width*this.height)                ) ;
    }

/*------------------------------------------------------------------------
 * getCompressionEfficiency
 *------------------------------------------------------------------------
 */
    getCompressionEfficiency(){
        return (    this.noAboveThreshold /
                    (this.compressedSize*this.compressedSize)   ) ;
    }
}

/*========================================================================
 * RgbaCompressedDataFromImage
 *========================================================================
 */ 
class RgbaCompressedDataFromImage extends RgbaCompressedData{
    constructor(image, options){
        if (image == undefined){
            log( 'You need to provide image source for compression!') ;
            return null ;
        }

        if ( image.used ){
            log( 'Image is used once and cannot be re-used in '
                +'the library. '
                +'Consider using the data from previous import, or '
                +'re-importing the image as a different resource!'  ) ;
            return null ;
        }

        image.used = true ;
        
        var op      = options ;
        var width   = image.width ;
        var height  = image.height ;
        op.width    = width ;
        op.height   = height ;
        op.threshold = readOption(op.threshod, 0 ) ;
        op.threshold = readOption(op.compressionThreshold, op.threshold) ;
        

        var canvas      = document.createElement('canvas') ;
        canvas.width    = width ;
        canvas.height   = height ;
        var context     = canvas.getContext('2d') ;

        context.drawImage(  image,
                            0,0,
                            width, height         ) ;

        var odt     =
            context.getImageData(   0,0,
                                    width,height  ).data ;

        var dat     = new Float32Array(width*height*4) ;
        var data    = new Float32Array(width*height*4) ;


/*------------------------------------------------------------------------
 * converting data to float
 *------------------------------------------------------------------------
 */
        for(var i=0 ; i< (width*height*4) ; i++){
            dat[i] = odt[i]/255.0 ;
        }

/*------------------------------------------------------------------------
 * flip-y   :   imported images have their data along y-flliped
 *------------------------------------------------------------------------
 */
        for(var j=0 ; j<height ; j++){
            for (var i=0 ; i <width; i++){
                var indx    = i + j*width ;
                var nindx   = i + width*( height-1-j) ;
                for (var k=0 ; k<4 ; k++){
                    data[nindx*4+k] = dat[indx*4+k] ;
                }
            }
        }

        super(data, op ) ;
        this.image = image ;
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
}

/*========================================================================
 * RgbaCompressedDataFromTexture
 *========================================================================
 */ 
class RgbaCompressedDataFromTexture extends RgbaCompressedData{
    constructor( options={} ){
        if ( options.target == undefined && 
             options.texture == undefined ) return null ;

        var texture ;
        texture = readOption(options.target, null ) ;
        texture = readOption(options.texture, options.target ) ;

        var ttbond = new Float32TextureTableBond({ target : texture } ) ;
        ttbond.tex2tab() ;
        var table       = ttbond.table ;
        var width       = ttbond.width ;
        var height      = ttbond.height ;
        var op          = options ;
        op.width        = width ;
        op.height       = height ;

        super( table, op ) ;
        this.ttbond     = ttbond ;
        this.texture    = texture ;
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

    get texture(){
        return this._texture ;
    }
    set texture(val){
        this._texture = val ;
    }
}

/*========================================================================
 * copyTexture
 *========================================================================
 */
function copyTexture(srcTarget, destTarget){
    var copy = new Copy( srcTarget, destTarget ) ;
    copy.render() ;
    copy.deleteMe() ;
    return ;
}
/*========================================================================
 * Uniform: the class is used in defining solvers for defining uniforms
 * that need to be sent to the solver
 *========================================================================
 */ 
class Uniform{
    constructor(opts={}){
        /* Values extracted directly from opts */
        this._type      = readOption( opts.type,   'f'              ) ;
        this._value     = readOption( opts.value,  0.0              ) ;
        this._name      = readOption( opts.name,   'var'            ) ;
        this._solver    = readOption( opts.solver, null             ) ;

        this._wrapS     = readOption( opts.wrapS, 'clamp_to_edge'   ) ;
        this._wrapT     = readOption( opts.wrapT, 'clamp_to_edge'   ) ;
        this._minFilter = readOption( opts.minFilter, 'nearest'     ) ;
        this._magFilter = readOption( opts.magFilter, 'nearest'     ) ;

        /* Derived values and initialization */
        this._location = 
            gl.getUniformLocation(  this.program, this.name ) ;
        
        this.initValue() ;
        this.setValue() ;
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*------------------------------------------------------------------------
 * Getter and Setter functions
 *------------------------------------------------------------------------
 */

    /*--------------*/
    /* name         */
    /*--------------*/
    get name(){
        return this._name ;
    }
    set name(nn){
        this._name = nn ;
        this._location = gl.getUniformLocation(
                this._program, 
                this._name ) ;
        this.value = this._value ;
    }

    /*--------------*/
    /* type         */
    /*--------------*/
    get type(){
        return this._type ;
    }
    set type(nt){
        this._type = nt ;
        this.value = this._value ;
    }

    /*--------------*/
    /* location     */
    /*--------------*/
    get location(){
        return gl.getUniformLocation(  this.program, this.name ) ;
    }

    /*--------------*/
    /* program      */
    /*--------------*/
    get program(){
        return this.solver.program ;
    }

    /*--------------*/
    /* solver       */
    /*--------------*/
    get solver(){
        return this._solver ;
    }

    /*--------------*/
    /* activeNumber */
    /*--------------*/
    get activeNumber(){
        return this._activeNumber ;
    }
    set activeNumber(an){
        this._activeNumber = an ;
    }
 
    /*--------------*/
    /* minFilter    */
    /*--------------*/
    get minFilter(){
        return this._minFilter ;
    }
    set minFilter(nf){
        this._minFilter = readOption(nf, this._minFilter ) ;
        this.setValue() ;
    }
    get glMinFilter(){
        return readGlOption( this.minFilter ) ;
    }
    
    /*--------------*/
    /* magFilter    */
    /*--------------*/
    get magFilter(){
        return this._magFilter ;
    }
    set magFilter(nf){
        this._magFilter = readOption(nf, this._magFilter ) ;
        this.setValue() ;
    }
    get glMagFilter(){
        return readGlOption( this.magFilter ) ;
    }
    
    /*--------------*/
    /* wrapS        */
    /*--------------*/
    get wrapS(){
        return this._wrapS ;
    }
    set wrapS(nw){
        this._wrapS = readOption( nw, this._wrapS ) ;
        this.setValue() ;
    }
    get glWrapS(){
        return readGlOption( this.wrapS ) ;
    }

    /*--------------*/
    /* wrapT        */
    /*--------------*/
    get wrapT(){
        return this._wrapT ;
    }
    set wrapT(nw){
        this._wrapT = readOption( nw, this._wrapT ) ;
        this.setValue() ;
    }
    get glWrapT(){
        return readGlOption( this.wrapT ) ;
    }
  
/*------------------------------------------------------------------------
 * initValue : set active number and advance the number of textures in 
 * parent solver for textures and samplers
 *------------------------------------------------------------------------
 */
    initValue(){
        this.solver.useProgram() ;

        var location    = this.location ;
        var type        = this.type ;
        
        switch(this.type){
            case 't' :  /* texture */
                var activeNumber =  this.solver.noTextureUniforms ;
                this.activeNumber = activeNumber ;
                if (this.solver != null ){
                    this.solver.noTextureUniforms += 1 ;
                    this.solver.textureUniforms[this.name] = this ;
                }
                break ;
            case 's' :
                var activeNumber =  this.solver.noTextureUniforms ;
                this.activeNumber = activeNumber ;
                this.sampler = gl.createSampler() ;

                if ( this.solver != null){
                    this.solver.noTextureUniforms += 1 ;
                    this.solver.textureUniforms[this.name] = this ;
                }
                break ;

        }
    }   /* end of initValue */

/*------------------------------------------------------------------------
 * setting the value of the uniform
 *------------------------------------------------------------------------
 */
    get value(){
        return this._value ;
    }

    set value(nv){
        this.solver.useProgram() ;
        this._value     = readOption(nv, this._value) ;
        var value       = this._value ;
        var location    = this.location ;
        var type        = this.type ;
        switch (this.type){
            case 't' :  /* texture */
                var activeNumber =  this.activeNumber ;
                gl.uniform1i(
                        this.location ,
                        activeNumber
                        ) ;
                gl.activeTexture(
                        gl.TEXTURE0+activeNumber
                        ) ;
                gl.bindTexture(
                        gl.TEXTURE_2D,
                        this.value.texture
                        ) ;
                break ;
            case 's' :
                var activeNumber =  this.activeNumber ;

                var sampler = this.sampler ;

                gl.samplerParameteri(
                        sampler,
                        gl.TEXTURE_MIN_FILTER,
                        this.glMinFilter
                        ) ;

                gl.samplerParameteri(
                        sampler, gl.TEXTURE_MAG_FILTER,
                        this.glMagFilter
                        ) ;

                gl.samplerParameteri(
                        sampler,
                        gl.TEXTURE_WRAP_S,
                        this.glWrapS
                        ) ;

                gl.samplerParameteri(
                        sampler,
                        gl.TEXTURE_WRAP_T,
                        this.glWrapT
                        ) ;

                gl.uniform1i(
                        this.location ,
                        activeNumber
                        ) ;
                gl.activeTexture(
                        gl.TEXTURE0+activeNumber
                        ) ;
                gl.bindTexture(
                        gl.TEXTURE_2D,
                        this.value.texture
                        ) ;
                gl.bindSampler(
                        activeNumber,
                        sampler
                        ) ;

                break ;

            case 'b' :  /* boolean */
                gl.uniform1i(
                        location ,
                        value
                        ) ;
                break ;
            case 'u' :  /* unsigned integer */
                gl.uniform1ui(
                        location ,
                        value
                        ) ;
                break ;

            
            case 'u2' : /* 2-dimensional unsigned integer vector */
                gl.uniform2ui(
                        location ,
                        value[0],
                        value[1]
                        ) ;
                break ;

            case 'u3' : /* 3-dimensional unsigned integer vector */
                gl.uniform3ui(
                        location ,
                        value[0],
                        value[1],
                        value[2]
                        ) ;
                break ;

            case 'uv' : /* 1-dimensional unsigned integer array  */
                gl.uniform1uiv(
                        location ,
                        value
                        ) ;
                break ;

            case 'u2v': /* 2-dimensional unsigned integer array  */
                gl.uniform2uiv(
                        location ,
                        value
                        ) ;
                break ;

            case 'u3v': /* 3-dimensional unsigned integer array  */
                gl.uniform3uiv(
                        location ,
                        value
                        ) ;
                break ;

            case 'u4' :  /* 4-dimensional unsigned integer vector */
                gl.uniform4ui(
                        location ,
                        value[0],
                        value[1],
                        value[2],
                        value[3]
                        ) ;
                break ;

            case 'u4v' : /* 4-dimensional unsigned integer array  */
                gl.uniform4uiv(
                        location ,
                        value
                        ) ;
                break ;

            case 'i' :  /* integer */
                gl.uniform1i(
                        location ,
                        value
                        ) ;
                break ;

            case 'iv' : /* 1-dimensional integer array  */
                gl.uniform1iv(
                        location ,
                        value
                        ) ;
                break ;

            case 'i2' : /* 2-dimensional integer vector */
                gl.uniform2i(
                        location ,
                        value[0],
                        value[1]
                        ) ;
                break ;

            case 'i2v': /* 2-dimensional integer array  */
                gl.uniform2iv(
                        location ,
                        value
                        ) ;
                break ;

            case 'i3' : /* 3-dimensional integer vector */
                gl.uniform3i(
                        location ,
                        value[0],
                        value[1],
                        value[2]
                        ) ;
                break ;

            case 'i3v': /* 3-dimensional integer array  */
                gl.uniform3iv(
                        location ,
                        value
                        ) ;
                break ;

            case 'i4' :  /* 4-dimensional integer vector */
                gl.uniform4i(
                        location ,
                        value[0],
                        value[1],
                        value[2],
                        value[3]
                        ) ;
                break ;

            case 'i4v' : /* 4-dimensional integer array  */
                gl.uniform4iv(
                        location ,
                        value
                        ) ;
                break ;

            case 'f' :  /* float */
                gl.uniform1f(
                        location ,
                        value
                        ) ;
                break ;

            case 'fv' : /* 1-dimensional float array    */
                gl.uniform1fv(
                        location,
                        value
                        ) ;
                break ;

            case 'v2' : /* 2-dimensional float vector   */
                gl.uniform2f(
                        location,
                        value[0],
                        value[1]
                        ) ;
                break ;

            case 'f2' : /* 2-dimensional float vector   */
                gl.uniform2f(
                        location,
                        value[0],
                        value[1]
                        ) ;
                break ;

            case 'v2v' : /* 2-dimensional float array   */
                gl.uniform2fv(
                        location ,
                        value
                        ) ;
                break ;
            case 'f2v' : /* 2-dimensional float array   */
                gl.uniform2fv(
                        location ,
                        value
                        ) ;
                break ;

            case 'v3' : /* 3-dimensional float vector   */
                gl.uniform3f(
                        location,
                        value[0],
                        value[1],
                        value[2]
                        ) ;
                break ;

            case 'f3' : /* 3-dimensional float vector   */
                gl.uniform3f(
                        location,
                        value[0],
                        value[1],
                        value[2]
                        ) ;
                break ;

            case 'v3v': /* 3-dimensional float array    */
                gl.uniform3fv(  location,   value               ) ;
                break ;

            case 'f3v': /* 3-dimensional float array    */
                gl.uniform3fv(  location,   value               ) ;
                break ;

            case 'v4' : /* 4-dimensional float vector   */
                gl.uniform4f(
                        location,
                        value[0],
                        value[1],
                        value[2],
                        value[3]
                        ) ;
                break ;

            case 'f4' : /* 4-dimensional float vector   */
                gl.uniform4f(
                        location,
                        value[0],
                        value[1],
                        value[2],
                        value[3]
                        ) ;
                break ;

            case 'v4v': /* 4-dimensional float array    */
                gl.uniform4fv(
                        location,
                        value
                        ) ;
                break ;
            case 'f4v': /* 4-dimensional float array    */
                gl.uniform4fv(
                        location,
                        value
                        ) ;
                break ;

            case 'mat2': /* 2x2 floating point matrix   */
                gl.uniformMatrix2fv(
                        location,
                        gl.FALSE,
                        value
                        ) ;
                break ;
            case 'mat2x2': /* 2x2 floating point matrix   */
                gl.uniformMatrix2fv(
                        location,
                        gl.FALSE,
                        value
                        ) ;
                break ;

            case 'mat3': /* 3x3 floating point matrix   */
                gl.uniformMatrix3fv(
                        location,
                        gl.FALSE,
                        value
                        ) ;
                break ;
            case 'mat3x3': /* 3x3 floating point matrix   */
                gl.uniformMatrix3fv(
                        location,
                        gl.FALSE,
                        value
                        ) ;
                break ;
            case 'mat4': /* 4x4 floating point matrix   */
                gl.uniformMatrix4fv(
                        location,
                        gl.FALSE,
                        value
                        ) ;
                break ;
            case 'mat4x4': /* 4x4 floating point matrix   */
                gl.uniformMatrix4fv(
                        location,
                        gl.FALSE,
                        value
                        ) ;
                break ;
            case 'mat2x3': /* 2x3 matrix */
                gl.uniformMatrix2x3fv(
                        location,
                        gl.FALSE ,
                        value ) ;
                break ;
            case 'mat2x4': 
                gl.uniformMatrix2x4fv(
                        location,
                        gl.FALSE ,
                        value ) ;

                break ;

            case 'mat3x2':
                gl.uniformMatrix3x2fv(
                        location,
                        gl.FALSE ,
                        value ) ;

                break ;

            case 'mat3x4' :
                gl.uniformMatrix3x4fv(
                        location,
                        gl.FALSE ,
                        value ) ;
                break ;

            case 'mat4x2' :
                gl.uniformMatrix4x2fv(
                        location,
                        gl.FALSE ,
                        value ) ;

                break ;

            case 'mat4x3' :
                gl.uniformMatrix4x3fv(
                        location,
                        gl.FALSE ,
                        value ) ;

                break ;
         }
    } /* End of set value */

    setValue(nv){
        this.value = readOption(nv, this.value) ;
    }

    resend(){
        this.solver.useProgram() ;
        this.value = this.value ;
    }

}/* End of class Uniform */

/*========================================================================
 * Solver
 *========================================================================
 */
class Solver{ 
    constructor( options={} ){ 
        this.cgl = cgl ;
        this.gl = cgl.gl ;
        this.noRenderTargets = 0 ;
        this.noUniforms = 0 ;
        this.noTextureUniforms = 0 ;
        this.textureUniforms = {} ;
        this.uniforms = {} ;
        this.canvasTarget = false ;
        this.canvas = gl.canvas ;

        this.renderTargets = {} ;
        this.renderTargetNames = [] ;
        this.drawBuffers = [] ;
        this.framebuffer = null ;

        if (options == undefined ){
            delete this ;
            return ;
        }

/*------------------------------------------------------------------------
 * clear
 *------------------------------------------------------------------------
 */
        this.clear      = readOption(options.clear,         true        ) ;
        this.clearColor = readOption(options.clearColor,    [0,0,0,0]   ) ;

/*------------------------------------------------------------------------
 * vertexShader
 *------------------------------------------------------------------------
 */
        this._vertexShader = new Shader('vertexShader', 
                options.vertexShader);
/*------------------------------------------------------------------------
 * fragmentShader
 *------------------------------------------------------------------------
 */

        if ( options.fragmentShader != undefined ){
            this.fragmentShaderSrc = options.fragmentShader ;
            this._fragmentShader = new Shader('fragmentShader', 
                    this.fragmentShaderSrc ) ;
        }else{
            console.error('No fragment shader was provided! Aborting!') ;
            delete this ;
            return ;
        }
/*------------------------------------------------------------------------
 * depth and cullFacing
 *------------------------------------------------------------------------
 */
        this.cullFacing = readOption( options.cullFacing, false ) ;
        this.cullFace   = readGlOption( options.cullFace, gl.BACK ) ;
        this.depthTest  = readOption( options.depthTest, false ) ;

/*------------------------------------------------------------------------
 * Program
 *------------------------------------------------------------------------
 */
        this.program = new Program( 
                this.vertexShader, 
                this.fragmentShader) ;
        this.useProgram() ;

/*------------------------------------------------------------------------
 * geometry
 *------------------------------------------------------------------------
 */
        this.geometry = {} ;
        this.geometry.vertices =  [
            1.,1.,0.,
            0.,1.,0.,
            1.,0.,0.,
            0.,0.,0.,
        ] ;
        this.geometry.noVertices= 4 ;
        this.geometry.noCoords  = 3 ;
        this.geometry.type      = gl.FLOAT ;
        this.geometry.normalize = false ;
        this.geometry.stride    = 0 ;
        this.geometry.offset    = 0 ;
        this.geometry.premitive = gl.TRIANGLE_STRIP ;
        this.geometry.width = 1 ;

        if ( options.geometry != undefined ){
            this.geometry.vertices =
                readOption( options.geometry.vertices, null ) ;
            if (this.geometry.vertices == null ){
                warn(       'Error: The passed geometry has no vertices! '
                        +   'No solver can be defined!'                 ) ;
                delete this ;
                return null ;
            }
            this.geometry.noCoords = readOptions(
                options.geometry.noCoords ,  3
            ) ;

            this.geometry.noVertices = readOptions(
                options.geometry.noVertices ,
                this.geometry.vertices.length
                        /this.geometry.noCoords
            ) ;
            this.geometry.normalize = readOption(
                options.geometry.normalize ,
                false
            ) ;
            this.geometry.premitive = readGlOption(
                options.geometry.premitive ,
                gl.TRIANGLE_STRIP
            ) ;
            this.geometry.width = readOption(
                options.geometry.width,
                1
            ) ;
        }

/*------------------------------------------------------------------------
 * Creating the position vector
 *------------------------------------------------------------------------
 */
        this.positionLoc = gl.getAttribLocation(this.prog, "position") ;
        this.positionBuffer = gl.createBuffer() ;
        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            this.positionBuffer
        ) ;
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(this.geometry.vertices),
            gl.STATIC_DRAW
        );
        this.vao = gl.createVertexArray() ;
        gl.bindVertexArray(this.vao) ;
        gl.enableVertexAttribArray(this.positionLoc) ;

        gl.vertexAttribPointer(
            this.positionLoc ,
            this.geometry.noCoords ,
            this.geometry.type ,
            this.geometry.normalize ,
            this.geometry.stride ,
            this.geometry.offset
        ) ;

        gl.bindBuffer(gl.ARRAY_BUFFER, null) ;
        gl.bindVertexArray(null) ;

/*------------------------------------------------------------------------
 * framebuffer
 *------------------------------------------------------------------------
 */
        /* creating framebuffers for renderTargetOutput */
        if ( options.targets != undefined ){
            options.renderTargets = options.targets  ;
        }

        if ( options.renderTargets != undefined ){
            this.framebuffer = gl.createFramebuffer() ;
            gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,this.framebuffer) ;
            for (var tName in options.renderTargets){
                this.noRenderTargets++ ;
                var rTarget = options.renderTargets[tName] ;
                this.renderTargetNames.push(tName) ;
                this.renderTargets[tName] = rTarget ;
                var loc = rTarget.location ;
                var tgt = rTarget.target ;

                this.drawBuffers.push(gl.COLOR_ATTACHMENT0+loc) ;

                gl.framebufferTexture2D(
                    gl.DRAW_FRAMEBUFFER,
                    gl.COLOR_ATTACHMENT0+loc,
                    gl.TEXTURE_2D,
                    tgt.texture,
                    0
                ) ;

            }
            gl.drawBuffers(this.drawBuffers) ;

            var status = gl.checkFramebufferStatus(gl.DRAW_FRAMEBUFFER) ;
            if (status != gl.FRAMEBUFFER_COMPLETE) {
                console.log('fb status: ' + status);
            }
            gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,null) ;
        }

/*------------------------------------------------------------------------
 * Setting up uniforms
 *------------------------------------------------------------------------
 */
        if (options.uniforms != undefined ){
            for(var uname in options.uniforms ){
                var uopts = options.uniforms[uname] ; /* uniform options */
                uopts.solver = this ;
                uopts.name = uname ;
                this.noUniforms += 1 ;
                this.uniforms[uname] = new Uniform(uopts) ;
             }
        }
    
/*------------------------------------------------------------------------
 * canvas
 *------------------------------------------------------------------------
 */
        if (options.canvas != undefined ){
            this.canvas = options.canvas ;
            this.canvasTarget = true ;
            this.context = this.canvas.getContext('2d') ;
        }

        if ((this.canvasTarget == false)&&(this.framebuffer == null)){
            if (this.canvas != undefined ){
                this.context = this.canvas.getContext('2d') ;
            }
        }

    } 
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
    set program(np){
        this._program = np ;
    }

    get program(){
        return this._program.pointer ;
    }

    get prog(){
        return this.program ;
    }

    useProgram(){
        gl.useProgram(this.program) ;
        return ;
    }

    get fragmentShader(){
        return this._fragmentShader ;
    }

    set fragmentShader(nfsrc){
        this.fragmentShader.source = nfsrc ;
        this._program.link() ;
        this.resendUniforms() ;
    }

    get vertexShader(){
        return this._vertexShader ;
    }

    set vertexShader(nvsrc){
        this.vertexShader.source = nvsrc ;
        this._program.link() ;
        this.resendUniforms() ;
    }
/*------------------------------------------------------------------------
 * setUniform
 *------------------------------------------------------------------------
 */
    setUniform (uniformName, newValue ){
        this.uniforms[uniformName].value = newValue ;
    }

/*------------------------------------------------------------------------
 * resendUniforms
 *------------------------------------------------------------------------
 */
    resendUniforms(){
        for (var uname in this.uniforms){
            this.uniforms[uname].resend() ;
        }
    }

/*------------------------------------------------------------------------
 * setSamplerMinFilter
 *------------------------------------------------------------------------
 */
    setSamplerMinFilter( uname, minFilter ){
        var uniform = this.uniforms[uname] ;
        if (uniform == undefined) return ;
        uniform.minFilter = readGlOption( minFilter, gl.NEAREST ) ;

        this.setUniform(uname) ;
    }

/*------------------------------------------------------------------------
 * setSamplerMagFilter
 *------------------------------------------------------------------------
 */
    setSamplerMagFilter( uname, magFilter ){
        var uniform = this.uniforms[uname] ;
        if (uniform == undefined) return ;
        uniform.magFilter = readGlOption( magFilter, gl.NEAREST ) ;
        this.setUniform(uname) ;
    }

/*------------------------------------------------------------------------
 * setSamplerWrapS
 *------------------------------------------------------------------------
 */
    setSamplerWrapS( uname, wrapS ){
        var uniform = this.uniforms[uname] ;
        if (uniform == undefined ) return ;
        uniform.wrapS = readGlOption( wrapS, gl.CLAMP_TO_EDGE ) ;
        this.setUniform(uname) ;
    }

/*------------------------------------------------------------------------
 * setSamplerWrapT
 *------------------------------------------------------------------------
 */
    setSamplerWrapT( uname, wrapT ){
        var uniform = this.uniforms[uname] ;
        if (uniform == undefined ) return ;
        uniform.wrapT = readGlOption( wrapT, gl.CLAMP_TO_EDGE ) ;
        this.setUniform(uname) ;

        this.setUniform(uname) ;
    }

/*------------------------------------------------------------------------
 * setRenderTarget
 *------------------------------------------------------------------------
 */
    setRenderTarget(tName, target){
        this.renderTargets[tName].target = target ;
        var loc = this.renderTargets[tName].location ;
        gl.bindFramebuffer(
            gl.DRAW_FRAMEBUFFER,
            this.framebuffer
        ) ;
        gl.framebufferTexture2D(
            gl.DRAW_FRAMEBUFFER,
            gl.COLOR_ATTACHMENT0+loc,
            gl.TEXTURE_2D,
            this.renderTargets[tName].target.texture,
            0
        ) ;

        gl.bindFramebuffer(
            gl.DRAW_FRAMEBUFFER,
            null
        ) ;
    }

/*------------------------------------------------------------------------
 * render
 *------------------------------------------------------------------------
 */
    render(renderOptions){
        this.useProgram() ;
        if ( this.depthTest ){
            gl.enable(gl.DEPTH_TEST);
            gl.clear(gl.DEPTH_BUFFER_BIT);
        }else{
            gl.disable(gl.DEPTH_TEST) ;
        }

        if ( this.cullFacing ){
            gl.enable(gl.CULL_FACE);
            gl.cullFace(this.cullFace);
        }else{
            gl.disable(gl.CULL_FACE) ;
        }
        if ( this.noTextureUniform < 1){
            gl.activeTexture( gl.TEXTURE0 ) ;
            gl.bindTexture( gl.TEXTURE_2D, null ) ;
        }else{
           // gl.enable( gl.TEXTURE_2D ) ;
        }

        /* binding textures and color attachments */
        for ( var tName in this.textureUniforms ){
            var activeNumber = this.textureUniforms[tName].activeNumber ;
            gl.activeTexture(
                gl.TEXTURE0+activeNumber
            ) ;
            gl.bindTexture(
                gl.TEXTURE_2D,
                this.textureUniforms[tName].value.texture
            );
            if (this.textureUniforms[tName].sampler){
                gl.bindSampler(
                    this.textureUniforms[tName].activeNumber,
                    this.textureUniforms[tName].sampler
                ) ;
            }
        }

        if ( this.noRenderTargets < 1 ){
            if ((this.canvas.width != gl.canvas.width)||
                (this.canvas.height != gl.canvas.height)){
                gl.canvas.width  = this.canvas.width ;
                gl.canvas.height = this.canvas.height ;
            }
            gl.viewport(0,0,this.canvas.width, this.canvas.height) ;
        }else{
            var tName = this.renderTargetNames[0] ;
            var target = this.renderTargets[tName].target ;
           //  if ( gl.canvas.width != target.width ||
           //      gl.canvas.height!= target.height )
                gl.viewport(0,0,target.width,target.height) ;
        }
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
        if (this.clear){
            gl.clearColor(
                this.clearColor[0],
                this.clearColor[1],
                this.clearColor[2],
                this.clearColor[3]
            );
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        if (this.noRenderTargets < 1){
            gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);

            if (this.clear){
                gl.clearColor(
                    this.clearColor[0],
                    this.clearColor[1],
                    this.clearColor[2],
                    this.clearColor[3]
                );
                gl.clear(gl.COLOR_BUFFER_BIT);
            }
        }else{
            gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.framebuffer ) ;
            for ( var tName in this.renderTargets ){
                var rTarget = this.renderTargets[tName] ;
                var loc = rTarget.location ;
                var tgt = rTarget.target ;
                gl.framebufferTexture2D(
                        gl.DRAW_FRAMEBUFFER,
                        gl.COLOR_ATTACHMENT0+loc,
                        gl.TEXTURE_2D,
                        tgt.texture, 0              ) ;
            }
            gl.drawBuffers(this.drawBuffers) ;
        }
        gl.bindVertexArray(this.vao) ;
        gl.lineWidth(this.geometry.width) ;
        gl.drawArrays(  this.geometry.premitive ,
                        this.geometry.offset ,
                        this.geometry.noVertices    );

        if ( this.canvasTarget ){
            if (this.clear){
                this.context.clearRect(
                    0,
                    0,
                    this.canvas.width,
                    this.canvas.height
                ) ;
            }
            this.context.drawImage(
                gl.canvas,
                0,
                0,
                this.canvas.width,
                this.canvas.height
            ) ;
        }
    }

    run(runOptions){
        this.render(runOptions) ;
    }

/*------------------------------------------------------------------------
 * delete
 *------------------------------------------------------------------------
 */
    deleteMe(){
        this._program.deleteMe() ;
        this._vertexShader.deleteMe() ;
        this._fragmentShader.deleteMe() ;
        gl.deleteBuffer(this.positionBuffer) ;
        gl.deleteFramebuffer(this.framebuffer) ;
        delete this ;
        return ;
    }
}

/*========================================================================
 * LineGeometry
 *========================================================================
 */
class LineGeometry{
    constructor(noPltPoints){
        this.vertices = [] ;
        for (var i=0; i<noPltPoints ; i++ ){
            this.vertices.push( 0.5/noPltPoints+i/noPltPoints,0.5,0) ;
        }
        this.premitive = 'line_strip' ;
        this.noCoords = 3 ;
        this.width = 1 ;
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
}

/*========================================================================
 * UnitCubeFrameGeometry
 *========================================================================
 */
class UnitCubeFrameGeometry{
    constructor(){
        this.vertices = [
            0,0,0,
            0,0,1,

            0,0,0,
            1,0,0,

            1,0,0,
            1,0,1,

            1,0,0,
            1,1,0,

            1,1,0,
            1,1,1,

            1,1,0,
            0,1,0,

            0,1,0,
            0,0,0,

            0,1,0,
            0,1,1,

            0,0,1,
            1,0,1,

            1,0,1,
            1,1,1,

            1,1,1,
            0,1,1,

            0,1,1,
            0,0,1,

            ] ;
        this.noCoords = 3 ;
        this.premitive = 'lines' ;
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
}

/*========================================================================
 * UnitCubeGeometry     :   Constructor for a unit cube geometry
 *                          where x, y, and z line in [0,1]
 *========================================================================
 */
class UnitCubeGeometry{
    constructor(){
        this.vertices = [
            /* ~~~~~~~~~~~~~~~~ */
            /* Front PLANE      */
            /* ~~~~~~~~~~~~~~~~ */
            // 1F
            0,0,1,  // 1
            1,0,1,  // 2
            0,1,1,  // 4

            // 2F
            0,1,1,  // 4
            1,0,1,  // 2
            1,1,1,  // 3

            /* ~~~~~~~~~~~~~~~~ */
            /* RIGHT PLANE      */
            /* ~~~~~~~~~~~~~~~~ */
            // 3R
            1,1,1,  // 3
            1,0,1,  // 2
            1,1,0,  // 7

            // 4R
            1,1,0,  // 7
            1,0,1,  // 2
            1,0,0,  // 5

            /* ~~~~~~~~~~~~~~~~ */
            /* BOTTOM PLANE     */
            /* ~~~~~~~~~~~~~~~~ */
            // 5B
            1,0,0,  // 5
            1,0,1,  // 2
            0,0,0,  // 6

            // 6B
            0,0,0,  // 6
            1,0,1,  // 2
            0,0,1,  // 1

            /* ~~~~~~~~~~~~~~~~ */
            /* LEFT PLANE       */
            /* ~~~~~~~~~~~~~~~~ */
            // 7L
            0,0,1,  // 1
            0,1,1,  // 4
            0,0,0,  // 6

            // 8L
            0,0,0,  // 6
            0,1,1,  // 4
            0,1,0,  // 8

            /* ~~~~~~~~~~~~~~~~ */
            /* TOP PLANE        */
            /* ~~~~~~~~~~~~~~~~ */
            // 9T
            0,1,0,  // 8
            0,1,1,  // 4
            1,1,1,  // 3

            // 10T
            1,1,1,  // 3
            1,1,0,  // 7
            0,1,0,  // 8

            /* ~~~~~~~~~~~~~~~~ */
            /* BACK PLANE       */
            /* ~~~~~~~~~~~~~~~~ */
            // 11B
            0,1,0,  // 8
            1,1,0,  // 7
            0,0,0,  // 6

            // 12B
            0,0,0,  // 6
            1,1,0,  // 7
            1,0,0,  // 5
        ] ;

        this.noCoords = 3 ;
        this.premitive = 'triangles' ;
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
}


/*========================================================================
 * Get Channel Multiplier
 *========================================================================
 */
function getChannelMultiplier(cnl){
    var mltplier = [0,0,0,0] ;
    switch (cnl){
        case 'r':
            mltplier[0]=1 ;
            break ;
        case 'g':
            mltplier[1]=1 ;
            break ;
        case 'b':
            mltplier[2]=1 ;
            break ;
        case 'a':
            mltplier[3]=1 ;
            break ;
        default:
            mltplier[0]=1 ;
            break ;
    }
    return mltplier  ;
}

/*========================================================================
 * Signal       : signal structure
 * renderer     : renderer to be used to render the signal
 * camera       : computational camera to be used
 * SampleTarget : target to be sampled
 * noPltPoints  : number of the points on the signal curve
 *
 * options      :
 *      -   channel         : r,g,b,a
 *      -   probePosition   : position of the probe
 *      -   timeWindow      : timeWindow to be plotted
 *      -   minValue        : minimum value on the vertical axis
 *      -   maxValue        : maximum value on the vertical axis
 *      -   restValue       : rest value of the signal
 *      -   color           : color of the curve to be plotted
 *      -   visiblity       : "true" or "false"
 *      -   linewidth       : linewidth of the signal
 *      -   callback        : callback function
 *========================================================================
 */
class Signal{
    constructor(SampleTarget,noPltPoints=512,options={}){

/*------------------------------------------------------------------------
 * Initial values
 *------------------------------------------------------------------------
 */
        this.cgl        = cgl ;
        this.sample     = SampleTarget ;
        this.noPltPoints= noPltPoints ;
        this.pltTime    = 0. ;
        this.lineGeom   = new LineGeometry(this.noPltPoints) ;

        /* reading options */
        this.minValue   = readOption(options.minValue,  0               ) ;
        this.maxValue   = readOption(options.maxValue,  1               ) ;
        this.restValue  = readOption(options.restValue, 0               ) ;
        this.timeWindow = readOption(options.timeWindow,1000            ) ;
        this.linewidth  = readOption(options.linewidth, 1               ) ;
        this.probePosition = readOption( options.probePosition,[0.5,0.5]) ;
        this.color      = readOption(options.color,     [0,0,0]         ) ;
        this.channel    = readOption(options.channel,   'r'             ) ;
        this.visible    = readOption(options.visible,   true            ) ;
        this.callback   = readOption(options.callback, function(){}     ) ;
        this.name       = readOption(options.name   , 'val'             ) ;

        this.lineGeom.width = this.linewidth ;
        this.channelMultiplier = getChannelMultiplier(this.channel) ;

/*------------------------------------------------------------------------
 * renderTargets
 *------------------------------------------------------------------------
 */
        this.ccrr = new Float32Texture( this.noPltPoints, 1 ) ;
        this.cprv = new Float32Texture( this.noPltPoints, 1 ) ;

/*------------------------------------------------------------------------
 * hist
 *------------------------------------------------------------------------
 */
        this.hist = new Solver(     {
            uniforms: {
                probePosition : { type: "v2", value: this.probePosition } ,
                surf    : { type: 't',  value: this.sample              } ,
                curv    : { type: 't',  value: this.ccrr                } ,
                shift   : { type: "f",  value: 0.025                    } ,
                channel : { type: "v4", value: this.channelMultiplier   } ,
            } ,
            vertexShader:   DefaultVertexShader.value,
            fragmentShader: histShader.value,
            renderTargets:
                {
                    ourColor : { location : 0 , target : this.cprv   } ,
                }
        } ) ;

/*------------------------------------------------------------------------
 * scaleTimeWindow
 *------------------------------------------------------------------------
 */
        this.scaleTimeWindow = new Solver( {
                vertexShader    : DefaultVertexShader.value ,
                fragmentShader  : sctwShader.value ,
                uniforms        : {
                    map         : { type : 's', value : this.ccrr,
                     minFilter : 'linear', magFilter : 'linear' } ,
                    oldWindow   : { type: 'f', value : this.timeWindow  } ,
                    newWindow   : { type: 'f', value : this.timeWindow  } ,
                } ,
                renderTargets   : {
                    FragColor   : { location : 0 , target : this.cprv   } ,
                } ,
                clear   : true ,
        } ) ;

/*------------------------------------------------------------------------
 * wA2b
 *------------------------------------------------------------------------
 */
        this.wA2b = new Solver(   {
            uniforms:{
                map: { type: 't', value: this.cprv }
            },
            vertexShader  : DefaultVertexShader.value,
            fragmentShader: wA2bShader.value,
            renderTargets:{
                outColor : { location :0, target : this.ccrr }
            }
        } ) ;

/*------------------------------------------------------------------------
 * iplt
 *------------------------------------------------------------------------
 */
        this.iplt = new Solver(   {
            uniforms: {
                restValue: {type: 'f', value: this.restValue }
            },
            vertexShader    : DefaultVertexShader.value,
            fragmentShader  : ipltShader.value,
            renderTargets   : {
                FragColor1  : { location : 0, target : this.cprv     } ,
                FragColor2  : { location : 1, target : this.ccrr     } ,
            }
        } ) ;

/*------------------------------------------------------------------------
 * line : signal line
 *------------------------------------------------------------------------
 */
        this.line = new Solver({
                vertexShader    : lvtxShader.value,
                fragmentShader  : lfgmShader.value,
                uniforms    : {
                    minValue:   { type: 'f',  value: this.minValue      } ,
                    maxValue:   { type: 'f',  value: this.maxValue      } ,
                    map     :   { type: 't',  value: this.ccrr          } ,
                    color   :   { type: 'v3', value: this.color         } ,
                    visible :   { type: 'f',  value: this.visible       } ,
                } ,
                geometry : this.lineGeom,
                clear    : false,
                clearColor : [0.,0.,0.,0.] ,
        } ) ;

    } 
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*------------------------------------------------------------------------
 * initialize signal
 *------------------------------------------------------------------------
 */
    init(currTime){
        if (currTime != undefined ){
            this.pltTime = currTime ;
        }
        this.iplt.render() ;
        this.hist.setUniform('shift',0) ;
        this.hist.render() ;
        this.wA2b.render() ;
    }

/*------------------------------------------------------------------------
 * update signal
 *------------------------------------------------------------------------
 */
    update(currTime){
        var timeDiff = currTime-this.pltTime ;
        var shift = timeDiff/this.timeWindow ;
        if ( shift>= 1.0/this.noPltPoints) {
            this.callback() ;
            this.hist.setUniform('shift', shift) ;
            this.hist.render() ;
            this.wA2b.render() ;
            this.pltTime = currTime ;
        }
        return ;
    }

/*------------------------------------------------------------------------
 * update time window of the signal
 *------------------------------------------------------------------------
 */
    updateTimeWindow(timeWindow){
        var oldWindow = this.timeWindow ;
        this.scaleTimeWindow.setUniform('oldWindow',oldWindow       ) ;
        this.scaleTimeWindow.setUniform('newWindow',timeWindow      ) ;
        this.timeWindow = timeWindow ;
        this.scaleTimeWindow.render() ;
        this.wA2b.render() ;
        this.hist.setUniform('shift',0) ;
        this.hist.render() ;
        this.wA2b.render() ;
        this.render() ;
        return ;
    }

/*------------------------------------------------------------------------
 * set channel
 *------------------------------------------------------------------------
 */
    setChannel(c){
        this.channel = c ;
        this.channelMultiplier = getChannelMultiplier(c) ;

        this.hist.setUniform('channel', this.channelMultiplier) ;
    }

/*------------------------------------------------------------------------
 * set pobe position for the signal
 *------------------------------------------------------------------------
 */
    setProbePosition(probePosition){
        this.init(this.pltTime) ;
        this.probePosition = probePosition ;
        this.hist.setUniform('probePosition',this.probePosition) ;
        return ;
    }

/*------------------------------------------------------------------------
 * get prob position for the signal
 *------------------------------------------------------------------------
 */
    getProbePosition(){
        return this.probePosition ;
    }

/*------------------------------------------------------------------------
 * set the minimum value on the vertical-axis of the signal plot
 *------------------------------------------------------------------------
 */
    setMinValue(minValue){
        this.minValue = minValue ;
        this.line.setUniform('minValue', this.minValue) ;
        return ;
    }

/*------------------------------------------------------------------------
 * set the maximum value on the vertical-axis of the signal pot
 *------------------------------------------------------------------------
 */
    setMaxValue(maxValue){
        this.maxValue = maxValue ;
        this.line.setUniform('maxValue', this.maxValue);
        return ;
    }

/*------------------------------------------------------------------------
 * set the rest (default) value of the signal
 *------------------------------------------------------------------------
 */
    setRestValue(restValue){
        this.restValue = restValue ;
        this.iplt.setUniform('restValue', this.restValue );
        return ;
    }

/*------------------------------------------------------------------------
 * set the color of the signal curve
 *------------------------------------------------------------------------
 */
    setColor(color){
        this.color = color  ;
        this.line.setUniform('color',this.color);
        return ;
    }

/*------------------------------------------------------------------------
 * set line width of the signal plot
 *------------------------------------------------------------------------
 */
    setLinewidth(lw){
        this.linewidth = lw ;
        this.lineGeom.width = this.linewidth ;
        this.material.linewidth = this.linewidth ;
        return ;
    }

/*------------------------------------------------------------------------
 * set sample target
 *------------------------------------------------------------------------
 */
    setSampleTarget(ST){
        this.sample = ST ;
        this.hist.setUniform('surf',this.sample) ;
    }

/*------------------------------------------------------------------------
 * reset(Opts)
 *
 * Opt(ion)s :
 *      -   sample      : a render target sampler
 *      -   channel     : r,g,b,a
 *      -   probePosition     : position of the probe
 *      -   timeWindow  : timeWindow to be plotted
 *      -   minValue    : minimum value on the vertical axis
 *      -   maxValue    : maximum value on the vertical axis
 *      -   restValue   : rest value of the signal
 *      -   color       : color of the curve to be plotted
 *      -   linewidth   : linewidth of the signal
 *------------------------------------------------------------------------
 */
    reset(Opts){
        if (Opts != undefined ){
            if ( Opts.minValue != undefined ){
                setMinValue(Opts.minValue) ;
            }
            if ( Opts.maxValue != undefined ){
                setMaxValue(Opts.maxValue) ;
            }
            if ( Opts.restValue != undefined ){
                setRestValue( Opts.restValue) ;
            }
            if ( Opts.probePosition != undefined ){
                setProbePosition( Opts.probePosition ) ;
            }
            if ( Opts.timeWindow != undefined ){
                setTimeWindow( Opts.timeWindow ) ;
            }
            if ( Opts.color != undefined ){
                setColor( Opts.color ) ;
            }
            if ( Opts.linewidth != undefined ){
                setLinewidth( Opts.linewidth ) ;
            }
            if ( Opts.channel != undefined ){
                setChannel(Opts.channel ) ;
            }
            if ( Opts.sample != undefined ) {
                setSampleTarget( Opts.sample ) ;
            }
        }
        this.init() ;
    }

/*------------------------------------------------------------------------
 * hide the signal plot
 *------------------------------------------------------------------------
 */
    hide(){
        this.visible = 0.0 ;
        this.line.setUniform('visible',0.0) ;
    }

/*------------------------------------------------------------------------
 * show the signal plot
 *------------------------------------------------------------------------
 */
    show(){
        this.visible = true ;
        this.line.setUniform('visible',1.0) ;
    }

/*------------------------------------------------------------------------
 * set visiblity of the signal plot
 *------------------------------------------------------------------------
 */
    setVisiblity( flag ){
        this.visible = flag ;
        this.line.setUniform('visible',flag) ;
    }

/*------------------------------------------------------------------------
 * render
 *------------------------------------------------------------------------
 */
    render(){
        if (this.visible > 0.5 ){
            this.line.render() ;
        }
    }
}

/*========================================================================
 * Ticks 
 *========================================================================
 */
class Ticks{
    constructor(opts={}){
        this._ticks = readOption( opts.ticks,   []              ) ;
        this._labels= readOption( opts.labels,  []              ) ;
        this._mode  = readOption( opts.mode,    'off'           ) ;
        this._unit  = readOption( opts.unit,    ''              ) ;
        this._style = readOption( opts.style,   '#000000'       ) ;
        this._font  = readOption( opts.font,    '11pt Times'    ) ;
        this._min   = readOption( opts.min,     0               ) ;
        this._max   = readOption( opts.max,     1               ) ;
        this._precision = readOption( opts.precision, undefined ) ;
        this._number= readOption( opts.number,  10              ) ;
        this._offset= readOption( opts.offset,  .025            ) ;
        this._plot  = readOption( opts.plot,    null            ) ;
        this._callback = function(){
            if (this.plot != null ){
                this.plot.init() ;
            }
        }
        
        this.init() ;
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
    init(){
        if (this.mode == 'manual' ){
            this.number = this.labels.length ;
            if (this.ticks.length != this.labels.length ){
                warn('Number of ticks and tick labels are not equal') ;
            }
        }
        
        if (this.mode == 'auto'){
            var delta = this.delta ;
            var dl    = 1./(this.number+1) ;
            this._ticks = [] ;
            this._labels = [] ;
            for(var i=0 ; i<this.number ;i++){
                var num = delta*(i+1)+this.min ;
                if ( this.precision != undefined ){
                    num = num.toFixed(this.precision) ;
                }
                this.ticks.push( (1+i)*dl );
                this.labels.push(num+this.unit) ;
            }
        }
        this.callback() ;
    }
    
    set callback(nc){
        this._callback = nc ;
    }
    get callback(){
        return this._callback ;
    }

    /* min          */
    set min(nm){
        this._min = nm ;
        this.init() ;
    }
    get min(){
        return this._min ;
        this.init() ;
    }

    /* max          */
    set max(nm){
        this._max = nm ;
        this.init() ;
    }
    get max(){
        return this._max ;
    }

    /* delta        */
    get delta(){
        return (this.max - this.min)/(this.number+1) ;
    }

    /* unit         */
    get unit(){
        return this._unit ;
    }
    set unit(nu){
        this._unit = nu ;
        this.init() ;
    }

    /* mode         */
    set mode(nm){
        this._mode = nm ;
        this.init() ;
    }
    get mode(){
        return this._mode ;
    }

    /* font         */
    get font(){
        return this._font ;
    }
    set font(nf){
        this._font = ft ;
    }

    /* style        */
    get style(){
        return this._style ;
    }
    set style(ns){
        this._style = ns ;
    }
    
    /* precision    */
    set precision(np){
        this._precision = np ;
        this.init() ;
    }
    get precision(){
        return this._precision ;
    }

    /* number       */
    get number(){
        return this._number ;
    }
    set number(nn){
        this._number = nn ;
        this.init() ;
    }

    /* offset       */
    get offset(){
        return this._offset ;
    }
    set offset(no){
        this._offset =  no ;
    }

    /* ticks        */
    get ticks(){
        return this._ticks ;
    }
    set ticks(nt){
        this._ticks = nt ;
        this.number = this._ticks.length ;
        this._mode  = 'auto' ;
        this.init() ;
    }

    /* labels       */
    get labels(){
        return this._labels ;
    }
    set labels(nl){
        this._labels = nl ;
        this.init() ;
    }

    set plot(np){
        this._plot = np ;
    }

    get plot(){
        return this._plot ;
    }

}
/*========================================================================
 * Legened
 *========================================================================
 */ 
class Legend{
    constructor(opts){
        this._location  = readOption(   opts.location, [0.1,0.1]) ;
        this._separation= readOption(   opts.separation, 0.05   ) ;
        this._plot      = readOption(   opts.plot   , null      ) ;
        this._font      = readOption(   opts.font   , '12pt Times') ;
        this._style     = readOption(   opts.style  , "#000000" ) ;
        this._length    = readOption(   opts.length , 0.05      ) ;

        this.callback   = function(){
            if (this._plot != null){
                this._plot.init() ;
            }
        }
        this.visiblity  = readOption(    opts.visible, false     ) ;
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
    get font(){
        return this._font ;
    }

    get length(){
        return this._length ;
    }

    get style(){
        return this._style ;
    }

    set visiblity(v){
        if ( v == true || v == 'on' || v == 'ON' || v == 'On'){
            this._visible = true ;
        }else{
            this._visible = false ;
        }
    }

    set visible(v){
            this.visiblity = v ;
            this.callback() ;
    }

    get visible(){
        return this._visible ;
    }

    get location(){
        return this._location ;
    }

    set location(nl){
        this._location = nl ;
        this.callback() ;
    }

    get separation(){
        return this._separation ;
    }
}

/*========================================================================
 * Message
 *========================================================================
 */
class Message{
    constructor( message, x,y, options){
        this._text = message ;
        this._x  = x ;
        this._y  = y ;

        this._style   = readOption( options.style,    "#000000"       ) ;
        this._font    = readOption( options.font,     "12px Times"    ) ;
        this._visible = readOption( options.visible,  true            ) ;
        this._align   = readOption( options.align ,   'start'         ) ;
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*------------------------------------------------------------------------
 * x and y
 *------------------------------------------------------------------------
 */
    set x(xn){
        this._x = xn ;
    }
    get x(){
        return this._x ;
    }
    set y(yn){
        this._y = yn ;
    }
    get y(){
        return this._y ;
    }
  
/*------------------------------------------------------------------------
 * Font
 *------------------------------------------------------------------------
 */
    set font(ft){
        this._font = ft ;
    }
    get font(){
        return this._font ;
    }

    setFont(f){
        this.font   = readOption(font,      this._font   ) ;
    }

/*------------------------------------------------------------------------
 * setStyle
 *------------------------------------------------------------------------
 */
    set style(st){
        this._style = st ;
    }

    get style(){
        return this._style ;
    }

    setStyle(st){
        this.style  = readOption(st,    this._style  ) ;
    }

/*------------------------------------------------------------------------
 * setAlign
 *------------------------------------------------------------------------
 */
    set align(al){
        this._align = al ;
    }
    get align(){
        return this._align ;
    }
    setAlign(al){
        this.align  = readOption(al,     this._align  ) ;
    }

/*------------------------------------------------------------------------
 * setText
 *------------------------------------------------------------------------
 */
    set text(tx){
        this._text = tx ;
    }
    
    get text(){
        return this._text ;
    }

    setText(t){
        this.text = readOption(t, this._text) ;
    }
/*------------------------------------------------------------------------
 * 
 *------------------------------------------------------------------------
 */
    set visible(vs){
        this._visible = vs ;
    }
    get visible(){
        return this._visible  ;
    }

/*------------------------------------------------------------------------
 * hide
 *------------------------------------------------------------------------
 */
    hide(){
        this.visible = false ;
    }

/*------------------------------------------------------------------------
 * show
 *------------------------------------------------------------------------
 */
    show(){
        this.visible = true ;
    }

/*------------------------------------------------------------------------
 * setVisiblity
 *------------------------------------------------------------------------
 */
    setVisiblity( visible ){
        this.visible = readOption( visible, this._visible ) ;
    }

/*------------------------------------------------------------------------
 * toggleVisible
 *------------------------------------------------------------------------
 */
    toggleVisible(){
        this._visible = !this._visible ;
    }

    toggle(){
        this._visible = !this._visible ;
    }
}

/*=========================================================================
 * SignalPlot( renderer, camera, options )
 *
 * Usage    :   Constructor for plotting. The inputs are as follows
 *
 * renderer :   renderer to be used for all plotting purposes;
 * camera   :   camera to be used for plotting
 * options  :
 *      -   noPlotPoints    :   number of points on each signal curve
 *      -   backgroundColor :   color of plot's background
 *      -   dispWidth       :   number of horizontal pixels of plot
 *      -   dispHeight      :   number of vertical pixels of the plot
 *      -   grid            :   'on', 'off'
 *      -   nx              :   number of horizontal divisions of the grid
 *      -   ny              :   number of vertical divisions of the grid
 *      -   gridColor       :   color of the grid
 *      -   xticks          :   array of xticks
 *      -   yticks          :   array of yticks
 *      -   callback        :   callback function
 *=========================================================================
 */
class SignalPlot{
    constructor(pltOptions={}){
        this.cgl                = cgl ;
        this.gl                 = cgl.gl ;

        this.canvasTarget   = false ;
        this.backgroundColor = readOption(
            pltOptions.backgroundColor,
            [0,0,0,0]
        ) ;

        this.noSignals = 0 ;
        this.signals = [] ;

        this.noPlotPoints = readOption( pltOptions.noPltPoints, 512 ) ;
        this.grid       = readOption( pltOptions.grid, 'off'        ) ;
        this.nx         = readOption( pltOptions.nx ,   5           ) ;
        this.ny         = readOption( pltOptions.ny ,   5           ) ;
        this.gridColor  = readOption( pltOptions.gridColor,'#999999') ;
        this.gridDash   = readOption( pltOptions.gridDash, [10,10]  ) ;
        this.dispWidth  = readOption( pltOptions.dispWidth, 512     ) ;
        this.dispHeight = readOption( pltOptions.dispHeight,512     ) ;

        this.canvas     = readOption( pltOptions.canvas, undefined  ) ;
        if (this.canvas != undefined ){
            this.context = this.canvas.getContext('2d') ;
        }

        this.container  = readOption( pltOptions.container, undefined ) ;
        this.callback   = readOption( pltOptions.callback, function(){} ) ;

        this.xticks = new Ticks( pltOptions.xticks ) ;
        this.xticks.number = this.nx-1 ;

        this.yticks = new Ticks( pltOptions.yticks ) ;
        this.yticks.number = this.ny-1 ;


        this.legendOptions = readOption( pltOptions.legend, {visible: false, place: 'top-right'} ) ;

        if ( ( this.container != undefined ) &&
                (this.canvas != undefined ) ){
            this.canvasTarget = true ;
        }
        
/*-------------------------------------------------------------------------
 * Grid and Background
 *-------------------------------------------------------------------------
 */
        this.bcanvas = document.createElement('canvas') ;
        this.bcanvas.width = this.canvas.width ;
        this.bcanvas.height = this.canvas.height ;
        this.bcontext= this.bcanvas.getContext('2d') ;

/*------------------------------------------------------------------------
 * addMessage
 *------------------------------------------------------------------------
 */
        this.messages = [] ;
    
/*------------------------------------------------------------------------
 * initTitle
 *------------------------------------------------------------------------
 */
        var titleOptions = readOption( pltOptions.title, {} ) ;
        this.title = {} ;
        this.title.text = readOption(titleOptions.text, '' ) ;
        this.title.x = readOption( titleOptions.x , 0.5  ) ;
        this.title.y = readOption( titleOptions.y , 0.05 ) ;
        this.title.style = readOption( titleOptions.style,  "#000000"   ) ;
        this.title.font = readOption( titleOptions.font, '12pt Times'   ) ;
        this.title.visible = readOption( titleOptions.visible, true     ) ;
        this.title.align = readOption( titleOptions.align, 'center'     ) ;
        this.messages.push( this.title ) ;

/*------------------------------------------------------------------------
 * legend
 *------------------------------------------------------------------------
 */
        this.legendOptions.plot = this ;
        this.legend = new Legend( this.legendOptions ) ;
    } 

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*------------------------------------------------------------------------
 * addMessage
 *------------------------------------------------------------------------
 */
    addMessage ( message, x, y, options){
        var msg = new Message( message,x,y, options) ;
        this.messages.push(msg) ;
        this.initBackground() ;
        return msg ;
    }

/*------------------------------------------------------------------------
 * setTitle
 *------------------------------------------------------------------------
 */
    setTitle(text, options={}){
        this.title.text = text ;
        this.title.x    = readOption( options.x , this.title.x         ) ;
        this.title.y    = readOption( options.y , this.title.y         ) ;
        this.title.style= readOption( options.style, this.title.style  ) ;
        this.title.font = readOption( options.font,  this.title.font   ) ;
        this.title.visible = readOption( options.visible,
                this.title.visible ) ;
        this.title.align= readOption( options.align,this.title.align  ) ;

        this.messages.push( this.title ) ;
        this.initBackground() ;
        this.render() ;
    }


/*------------------------------------------------------------------------
 * writeMessages
 *------------------------------------------------------------------------
 */
    writeMessages(){
        for (var i=0 ; i < this.messages.length; i++){
            var message = this.messages[i] ;
            if (message.visible){
                this.bcontext.font = message.font ;
                this.bcontext.fillStyle = message.style ;
                this.bcontext.textAlign = message.align ;
                this.bcontext.fillText( message.text,
                                        this.canvas.width*message.x,
                                        this.canvas.height*message.y );
            }
        }
    }

/*------------------------------------------------------------------------
 * setXTicks
 *------------------------------------------------------------------------
 */
    setXTicks(xt){
        if ( xt.ticks != undefined ){
            this.xticks.ticks = xt.ticks ;
        }
        if ( xt.mode != undefined ){
            this.xticks.mode = xt.mode ;
        }
        if ( xt.unit != undefined ){
            this.xticks.unit = xt.unit ;
        }
        if ( xt.style != undefined ){
            this.xticks.style = xt.style ;
        }
        if ( xt.font != undefined ){
            this.xticks.font = xt.font ;
        }
        this.initBackground() ;
    }

/*------------------------------------------------------------------------
 * setYTicks
 *------------------------------------------------------------------------
 */

    setYTicks (yt){
        if ( yt.ticks != undefined ){
            this.yticks.ticks = yt.ticks ;
        }
        if ( yt.mode != undefined ){
            this.yticks.mode = yt.mode ;
        }
        if ( yt.unit != undefined ){
            this.yticks.unit = yt.unit ;
        }
        if ( yt.style != undefined ){
            this.yticks.style = yt.style ;
        }
        if ( yt.font != undefined ){
            this.yticks.font = yt.font ;
        }
        if ( yt.min != undefined ){
            this.yticks.min = yt.min ;
        }
        if ( yt.max != undefined ){
            this.yticks.max = yt.max ;
        }
        this.initBackground() ;
    }

/*------------------------------------------------------------------------
 * writeTicks
 *------------------------------------------------------------------------
 */
    writeTicks(){
        if (this.xticks.mode != 'off' ){
            this.bcontext.font = this.xticks.font ;
            this.bcontext.fillStyle = this.xticks.style ;
            this.bcontext.textAlign = "center" ;
            for (var i=1; i<=this.xticks.number ;i++){
                var dx = this.canvas.width / (this.xticks.number+1)
                var dy = this.canvas.height/ (this.ny) ;
                this.bcontext.fillText(
                    this.xticks.labels[i-1] ,
                    i*dx,
                    this.canvas.height*(1.-this.xticks.offset) 
                ) ;
            }
        }
        if ( this.yticks.mode != 'off' ){
            this.bcontext.font = this.yticks.font ;
            this.bcontext.fillStyle = this.yticks.style ;
            this.bcontext.textAlign = "start" ;
            for (var i=1; i<=this.yticks.number ;i++){
                var dy = this.canvas.height
                        /(this.yticks.number+1) ;

                this.bcontext.fillText(
                    this.yticks.labels[i-1],
                    this.yticks.offset*this.canvas.width,
                    this.canvas.height-i*dy
                ) ;
            }
        }
    }
/*------------------------------------------------------------------------
 * processLegends
 *------------------------------------------------------------------------
 */
    processLegends(){
        if ( !this.legend.visible ){
            return ;
        }
        var loc = this.legend.location ;
        var x0 = loc[0]*this.canvas.width ;
        var y0 = loc[1]*this.canvas.height ;
        var j = 0 ;    
        for(var i=0 ; i <this.noSignals ;i++){
            this.bcontext.beginPath() ;
            this.bcontext.setLineDash([]) ;
            if ( this.signals[i].visible ){
                var color = this.signals[i].color ;
                this.bcontext.strokeStyle = "#"+fullColorHex(color) ;
                this.bcontext.lineWidth=this.signals[i].linewidth ;
                var x = x0 ;
                var y = y0+j*this.legend.separation*this.canvas.height ;
                this.bcontext.moveTo(x,y) ;

                x = x + this.legend.length*this.canvas.width ;
                this.bcontext.lineTo(x,y) ;
                this.bcontext.stroke() ;

                this.bcontext.font = this.legend.font ;
                this.bcontext.fillStyle = this.legend.style ;
                this.bcontext.textAlign = 'left' ;
                this.bcontext.fillText(this.signals[i].name, x+10,y) ;
                j++ ;
            }
        }
    }

/*------------------------------------------------------------------------
 * initBackground
 *------------------------------------------------------------------------
 */
    initBackground (){
        this.bcontext.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        ) ;
        if ( this.grid == 'on' ){
            this.bcontext.beginPath() ;
            this.bcontext.setLineDash(this.gridDash) ;
            this.bcontext.strokeStyle= this.gridColor ;
            this.bcontext.lineWidth = 1 ;
            var dx = this.canvas.width / (this.nx) ;
            var dy = this.canvas.height/ (this.ny) ;
            for (var i=1; i<this.nx ; i++){
                this.bcontext.strokeStyle=this.gridColor ;
                this.bcontext.moveTo(i*dx,0) ;
                this.bcontext.lineTo(i*dx,this.canvas.height) ;
                this.bcontext.stroke() ;
            }
            for (var j=1; j<this.ny ; j++){
                this.bcontext.strokeStyle=this.gridColor ;
                this.bcontext.moveTo(0,j*dy) ;
                this.bcontext.lineTo(this.canvas.width,j*dy) ;
                this.bcontext.stroke() ;
            }
        }

        this.processLegends() ;
        this.writeTicks() ;
        this.writeMessages() ;
    }

/*-------------------------------------------------------------------------
 * Signals
 *-------------------------------------------------------------------------
 */
    
/*------------------------------------------------------------------------
 * addSignal(SampleTarget, options)
 *
 * Usage    :   Adds a signal to the plot. The inputs are as follows:
 *
 * SampleTarget : target to be sampled
 * options      :
 *      -   channel         : r,g,b,a
 *      -   probePosition   : position of the probe
 *      -   timeWindow      : timeWindow to be plotted
 *      -   minValue        : minimum value on the vertical axis
 *      -   maxValue        : maximum value on the vertical axis
 *      -   restValue       : rest value of the signal
 *      -   color           : color of the curve to be plotted
 *      -   visiblity       : "true" or "false"
 *      -   linewidth       : linewidth of the signal
 *------------------------------------------------------------------------
 */
    addSignal (SampleTarget, options){
        var newSignal = new Signal(
                    SampleTarget,
                    this.noPltPoints,
                    options ) ;
        this.signals.push( newSignal ) ;
        this.noSignals ++ ;
        this.yticks.min = newSignal.minValue ;
        this.yticks.max = newSignal.maxValue ;
        this.timeWindow = newSignal.timeWindow ;
        this.xticks.max = this.timeWindow ;
        this.initBackground() ;
        return newSignal ;
    }

/*------------------------------------------------------------------------
 * setMinValue
 *------------------------------------------------------------------------
 */
    setMinValue (val){
        this.yticks.min = val ;
        this.initBackground() ;
        this.render() ;
    }

/*------------------------------------------------------------------------
 * setMaxValue
 *------------------------------------------------------------------------
 */
    setMaxValue (val){
        this.yticks.max = val ;
        this.initBackground() ;
        this.render() ;
    }


/*------------------------------------------------------------------------
 * update(currTime)
 *
 * Usage    :   update all signals, and set the plot time to currTime
 *------------------------------------------------------------------------
 */
    /* update signals                    */
    update(currTime){
        this.callback() ;
        for(var i=0; i<this.noSignals; i++){
            this.signals[i].update(currTime) ;
        }
        return ;
    }
/*------------------------------------------------------------------------
 * init(currTime)
 *
 * Usage    :   initialize all signals
 *------------------------------------------------------------------------
 */

    /* initialize signals                */
    init(currTime){
        this.initBackground() ;
        if ( currTime != undefined ){
            for(var i=0; i<this.noSignals; i++){
                this.signals[i].init(currTime) ;
            }
        }
        return ;
    }

/*------------------------------------------------------------------------
 * updateTimeWindow(timeWindow)
 *
 * Usage    :   updates timeWindow for all signals
 *------------------------------------------------------------------------
 */
    /* update timeWindow for signals     */
    updateTimeWindow (timeWindow){
        this._timeWindow = timeWindow ;
        for(var i=0; i <this.noSignals; i++){
            this.signals[i].updateTimeWindow(timeWindow) ;
        }
        this.xticks.max = timeWindow ;
        this.initBackground() ;
        this.render() ;
        return ;
    }

    set timeWindow(ntw){
        this.updateTimeWindow(ntw) ;
    }

    get timeWindow(){
        return this._timeWindow ;
    }
/*------------------------------------------------------------------------
 * setProbePosition(probePosition)
 *
 * Usage    :   set the probe position for all signals to probePosition
 *------------------------------------------------------------------------
 */
    /* set probe position for signals    */
    setProbePosition (probePosition){
        for(var i=0; i <this.noSignals; i++){
            this.signals[i].setProbePosition(probePosition) ;
        }
        this.init() ;
        return ;
    }

/*------------------------------------------------------------------------
 * getProbePosition
 *
 * Usage    : returns the position of the signals
 *------------------------------------------------------------------------
 */
    getProbePosition(){
        return this.signals[0].getProbePosition() ;
    }

/*------------------------------------------------------------------------
 * setSize
 *------------------------------------------------------------------------
 */
    setSize ( dispWidth, dispHeight ){
        this.dispWidth = dispWidth ;
        this.dispHeight = dispHeight ;
        this.bgrnd.setSize( this.dispWidth, this.dispHeight ) ;
    }

/*------------------------------------------------------------------------
 * render([renderTarget,[forceClear])
 *
 * Usage        :   render the plot
 *
 * renderTarget :   target if the render if other than screen
 * forceClear   :   boolean asking the renderer to clear the output
                    before rendering. Default: false
 *------------------------------------------------------------------------
 */
    /* render plot                       */
    render(renderTarget, forceClear){
        this.context.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        ) ;
        this.context.drawImage(
            this.bcanvas,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        ) ;
        gl.bindFramebuffer(
            gl.DRAW_FRAMEBUFFER,
            null
        );
        gl.clear(
            gl.COLOR_BUFFER_BIT
        );

        for(var i=0; i<this.noSignals; i++){
            this.signals[i].render() ;
        }
        this.context.drawImage(
            gl.canvas,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        ) ;
    } ;

}  /* End of SignalPlot */

/*========================================================================
 * Curve        : Curve Structure
 *
 * options      :
 *      -   channel         : r,g,b,a
 *      -   probePosition   : position of the probe
 *      -   timeWindow      : timeWindow to be plotted
 *      -   minValue        : minimum value on the vertical axis
 *      -   maxValue        : maximum value on the vertical axis
 *      -   restValue       : rest value of the signal
 *      -   color           : color of the curve to be plotted
 *      -   visiblity       : "true" or "false"
 *      -   linewidth       : linewidth of the signal
 *========================================================================
 */
class Curve{
    constructor( SampleTarget,
                xAxisRange,
                options){

/*------------------------------------------------------------------------
 * Initial values
 *------------------------------------------------------------------------
 */
        this.cgl        = cgl ;
        this.sample     = SampleTarget ;
        this.noPltPoints= this.sample.width ;
        this.linewidth  = 2.0 ;
        this.lineGeom   = new LineGeometry(this.noPltPoints) ;
        this.color          = [1,0,0] ;
        this.visible        = 1.0 ;
        this.channel        = 'r' ;

        this.xAxisRange  = xAxisRange ;

        this.localXrange = xAxisRange ;

        this.calcXrange  = function(){
            var ax = this.xAxisRange[1]-this.xAxisRange[0] ;
            var x0 = (this.localXrange[0]-this.xAxisRange[0])/ax ;
            var x1 = (this.localXrange[1]-this.xAxisRange[0])/ax ;
            this.xrange = [x0,x1] ;
        }
        this.calcXrange() ;

        this.yrange     = [0,1] ;

        if ( options != undefined ){
            if (options.xrange != undefined ){
                this.localXrange = options.xrange ;
                this.calcXrange() ;
            }

            if (options.color != undefined ){
                this.color = options.color ;
            }
            if (options.linewidth != undefined ){
                this.linewidth = options.linewidth ;
            }
            if (options.visible != undefined ){
                this.visible = options.visible ;
            }
            if (options.channel != undefined ){
                this.channel = options.channel ;
            }

            if (options.yrange != undefined ){
                this.yrange = options.yrange ;
            }
        }

        this.lineGeom.width = this.linewidth ;
        this.channelMultiplier = getChannelMultiplier(this.channel) ;

/*------------------------------------------------------------------------
 * curve
 *------------------------------------------------------------------------
 */
        this.curve = new Solver({
                vertexShader    : lpvtShader.value,
                fragmentShader  : lfgmShader.value,
                uniforms    : {
                    xrange  :   {
                        type: 'v2',
                        value: this.xrange
                    } ,
                    yrange  :   {
                        type: 'v2',
                        value: this.yrange
                    } ,
                    map     :   {
                        type: 't',
                        value: this.sample
                    } ,
                    channelMultiplier : {
                        type: 'v4',
                        value: this.channelMultiplier
                    } ,
                    color   :   {
                        type: 'v3',
                        value: this.color
                    } ,
                    visible :   {
                        type: 'f',
                        value: this.visible
                    } ,
                } ,
                geometry : this.lineGeom,
                clear    : false,
                clearColor : [0.,0.,0.,0.] ,
        } ) ;

    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*------------------------------------------------------------------------
 * initialize signal
 *------------------------------------------------------------------------
 */
    init(currTime){
        this.curve.render() ;
    }

/*------------------------------------------------------------------------
 * set channel
 *------------------------------------------------------------------------
 */
    setChannel(c){
        this.channel = c ;
        this.channelMultiplier = getChannelMultiplier(c) ;

        this.curve.setUniform('channel', this.channelMultiplier) ;
    }

/*------------------------------------------------------------------------
 * setXAxisRange
 *------------------------------------------------------------------------
 */
    setXAxisRange( xa ){
        this.xAxisRange = xa ;
        this.calcXrange() ;
        this.curve.setUniform('xrange', this.xrange) ;
    }

/*------------------------------------------------------------------------
 * set the range of the vertical axis
 *------------------------------------------------------------------------
 */
    setYRange(yr){
        this.yrange = yr ;
        this.curve.setUniform('yrange', this.yrange) ;
        return ;
    }

/*------------------------------------------------------------------------
 * setXrange
 *------------------------------------------------------------------------
 */
    setXrange (xr){
        this.localXrange = xr ;
        this.calcXrange ;
    }

/*------------------------------------------------------------------------
 * set the color of the signal curve
 *------------------------------------------------------------------------
 */
    setColor(color){
        this.color = color  ;
        this.curve.setUniform('color',this.color);
        return ;
    }

/*------------------------------------------------------------------------
 * set line width of the signal plot
 *------------------------------------------------------------------------
 */
    setLinewidth (lw){
        this.linewidth = lw ;
        this.lineGeom.width = this.linewidth ;
        return ;
    }

/*------------------------------------------------------------------------
 * set sample target
 *------------------------------------------------------------------------
 */
    setSampleTarget (ST){
        this.sample = ST ;
        this.curve.setUniform('map',this.sample) ;
    }

/*------------------------------------------------------------------------
 * hide the signal plot
 *------------------------------------------------------------------------
 */
    hide (){
        this.visible = 0.0 ;
        this.line.setUniform('visible',0.0) ;
    }

/*------------------------------------------------------------------------
 * show the signal plot
 *------------------------------------------------------------------------
 */
    show (){
        this.visible = 1.0 ;
        this.curve.setUniform('visible',1.0) ;
    }

/*------------------------------------------------------------------------
 * set visiblity of the signal plot
 *------------------------------------------------------------------------
 */
    setVisiblity ( flag ){
        this.visible = flag ;
        this.curve.setUniform('visible',flag) ;
    }

/*------------------------------------------------------------------------
 * render
 *------------------------------------------------------------------------
 */
    render (){
        if (this.visible > 0.5 ){
            this.curve.render() ;
        }
    }
} /* End of Curve */

/*========================================================================
 * Plot1D( options )
 *
 * Usage    :   Constructor for plotting 1D lines out of texture of data
 *
 * options  :
 *      -   backgroundColor :   color of plot's background
 *      -   dispWidth       :   number of horizontal pixels of plot
 *      -   dispHeight      :   number of vertical pixels of the plot
 *      -   grid            :   'on', 'off'
 *      -   nx              :   number of horizontal divisions of the grid
 *      -   ny              :   number of vertical divisions of the grid
 *      -   gridColor       :   color of the grid
 *      -   xticks          :   array of xticks
 *      -   yticks          :   array of yticks
 *========================================================================
 */
class Plot1D{
    constructor(pltOptions={}){
        this.cgl                = cgl ;
        this.gl                 = cgl.gl ;
        this.backgroundCollor = readOption(
            pltOptions.backgroundColor,
            [0.,0.,0.,0]
        ) ;
        this.grid       = readOption(pltOptions.grid,    'off'   ) ;
        this.nx         = readOption(pltOptions.nx,      5       ) ;
        this.ny         = readOption(pltOptions.ny,      5       ) ;
        this.gridColor  = readOption(pltOptions.gridColor, '#999999') ;
        this.dispWidth  = readOption(pltOptions.dispWidth, 512   ) ;
        this.dispHeight = readOption(pltOptions.dispHeight,512   ) ;
        this.xrange = readOption(pltOptions.xrange, [0,1]       ) ;
        this.yrange = readOption(pltOptions.yrange, [0,1]       ) ;

        this.canvas = readOption(pltOptions.canvas, null        ) ;
        if ( this.canvas == null ){
            warn( 'No canvas was provided! No destination plot is assumed! '
                + 'No Plot1D can be defined '   ) ;
            delete this ;
            return null ;
        }
        this.context = this.canvas.getContext("2d") ;


        this.xticks = new Ticks( pltOptions.xticks ) ;
        this.yticks = new Ticks( pltOptions.yticks ) ;

        this.canvasTarget   = true ;
        
        this.noCurves = 0 ;
        this.curves = [] ;
        this.messages = [] ;

/*-------------------------------------------------------------------------
 * Grid and Background
 *-------------------------------------------------------------------------
 */
        this.bcanvas = document.createElement('canvas') ;
        this.bcanvas.width = this.canvas.width ;
        this.bcanvas.height = this.canvas.height ;
        this.bcontext= this.bcanvas.getContext('2d') ;

    } 
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*------------------------------------------------------------------------
 * addMessage
 *------------------------------------------------------------------------
 */
    addMessage ( message, x, y, options ){
        var msg = new Message( message, x,y, options) ;
        this.messages.push(msg) ;
        this.initBackground() ;
    }

/*------------------------------------------------------------------------
 * writeMessages
 *------------------------------------------------------------------------
 */
    writeMessages (){
        for (var i=0 ; i < this.messages.length; i++){
            var message = this.messages[i] ;
            if (message.visible){
                this.bcontext.font = message.font ;
                this.bcontext.fillStyle = message.style ;
                this.bcontext.textAlign = message.align ;
                this.bcontext.fillText( message.text,
                                        this.canvas.width*message.x,
                                        this.canvas.height*message.y );
            }
        }
    }

/*------------------------------------------------------------------------
 * setTicks
 *------------------------------------------------------------------------
 */
    setTicks (){
        if ( this.xticks.mode == 'auto' ){
            this.xticks.ticks = [] ;
            var dx = (this.xrange[1]-this.xrange[0])/this.nx ;
            for (var i=1 ; i<this.nx ; i++){
                var num = this.xrange[0]+(dx*i) ;
                if( this.xticks.precision != undefined ){
                    num = num.toFixed(this.xticks.precision) ;
                }
                this.xticks.ticks.push(num+ this.xticks.unit ) ;
            }
        }

        if ( this.yticks.mode == 'auto' ){
            var dy = (this.yrange[1]-this.yrange[0])/this.ny ;
            this.yticks.ticks = [] ;
            for (var i=1 ; i<this.ny ; i++){
                var num = (dy*i+this.yrange[0]) ;
                if( this.yticks.precision != undefined ){
                    num = num.toFixed(this.yticks.precision) ;
                }
                this.yticks.ticks.push( num
                + this.yticks.unit );
            }
        }
    }

/*------------------------------------------------------------------------
 * setXTicks
 *------------------------------------------------------------------------
 */
    setXTicks(xt){
        if ( xt.ticks != undefined ){
            this.xticks.ticks = xt.ticks ;
        }
        if ( xt.mode != undefined ){
            this.xticks.mode = xt.mode ;
        }
        if ( xt.unit != undefined ){
            this.xticks.unit = xt.unit ;
        }
        if ( xt.style != undefined ){
            this.xticks.style = xt.style ;
        }
        if ( xt.font != undefined ){
            this.xticks.font = xt.font ;
        }
        this.initBackground() ;
    }

/*------------------------------------------------------------------------
 * setYTicks
 *------------------------------------------------------------------------
 */

    setYTicks (yt){
        if ( yt.ticks != undefined  ){
            this.yticks.ticks = yt.ticks ;
        }
        if ( yt.mode != undefined  ){
            this.yticks.mode = yt.mode ;
        }
        if ( yt.unit != undefined  ){
            this.yticks.unit = yt.unit ;
        }
        if ( yt.style != undefined   ){
            this.yticks.style = yt.style ;
        }
        if ( yt.font != undefined  ){
            this.yticks.font = yt.font ;
        }
        this.initBackground() ;
    }

/*------------------------------------------------------------------------
 * writeTicks
 *------------------------------------------------------------------------
 */
    writeTicks (){
        this.setTicks() ;
        if (this.xticks.mode != 'off' ){
            this.bcontext.font = this.xticks.font ;
            this.bcontext.fillStyle = this.xticks.style ;
            this.bcontext.textAlign = "center" ;
            for (var i=1; i<=this.xticks.ticks.length ;i++){
                var dx = this.canvas.width / (this.xticks.ticks.length+1)
                var dy = this.canvas.height/ (this.ny) ;
                this.bcontext.fillText( 
                        this.xticks.ticks[i-1],
                        i*dx,
                        this.canvas.height*(1.-this.xticks.offset)
                        ) ;
            }
        }
        if ( this.yticks.mode != 'off' ){
            this.bcontext.font = this.yticks.font ;
            this.bcontext.fillStyle = this.yticks.style ;
            this.bcontext.textAlign = "start" ;
            for (var i=1; i<=this.yticks.ticks.length ;i++){
                var dy = this.canvas.height /
                    (this.yticks.ticks.length+1) ;
                this.bcontext.fillText(
                    this.yticks.ticks[i-1],
                    this.canvas.width*this.yticks.offset,
                    this.canvas.height-i*dy
                ) ;
            }
        }
    }

/*------------------------------------------------------------------------
 * initBackground
 *------------------------------------------------------------------------
 */
    initBackground (){
        this.bcontext.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        ) ;
        if ( this.grid != 'off' & this.grid != false ){
            this.bcontext.setLineDash([10,10]) ;
            this.bcontext.strokeStyle=this.gridColor ;
            var dx = this.canvas.width / (this.nx) ;
            var dy = this.canvas.height/ (this.ny) ;
            for (var i=1; i<this.nx ; i++){
                this.bcontext.moveTo(i*dx,0) ;
                this.bcontext.lineTo(i*dx,this.canvas.height) ;
                this.bcontext.stroke() ;
            }
            for (var j=1; j<this.ny ; j++){
                this.bcontext.moveTo(0,j*dy) ;
                this.bcontext.lineTo(this.canvas.width,j*dy) ;
                this.bcontext.stroke() ;
            }
        }

        this.writeTicks() ;
        this.writeMessages() ;
    }

/*------------------------------------------------------------------------
 * addCurve(SampleTarget, options)
 *
 * Usage    :   Adds a curve to the plot. The inputs are as follows:
 *
 * SampleTarget : target to be sampled
 * options      :
 *      -   channel         : r,g,b,a
 *      -   probePosition   : position of the probe
 *      -   timeWindow      : timeWindow to be plotted
 *      -   minValue        : minimum value on the vertical axis
 *      -   maxValue        : maximum value on the vertical axis
 *      -   restValue       : rest value of the curve
 *      -   color           : color of the curve to be plotted
 *      -   visiblity       : "true" or "false"
 *      -   linewidth       : linewidth of the curve
 *------------------------------------------------------------------------
 */
    addCurve (SampleTarget ,options){
        options.xrange = this.xrange ;
        options.yrange = this.yrange ;
        var newCurve = new Curve(    SampleTarget,
                                    this.xrange,
                                    options ) ;
        this.curves.push( newCurve ) ;
        this.noCurves ++ ;
        return newCurve ;
    }

/*------------------------------------------------------------------------
 * setSize
 *------------------------------------------------------------------------
 */
    setSize ( dispWidth, dispHeight ){
        this.dispWidth = dispWidth ;
        this.dispHeight = dispHeight ;
        this.canvas.width = this.dispWidth  ;
        this.canvas.height = this.dispHeight ;
        this.bcanvas.width = this.dispWidth ;
        this.bcanvas.height = this.dispHeight ;
        this.initBackground() ;
        this.render() ;
    }

/*------------------------------------------------------------------------
 * setXrange
 *------------------------------------------------------------------------
 */
    setXrange (xr){
        this.xrange = xr ;
        this.initBackground() ;

        for(var i=0; i < this.noCurves; i++){
            this.curves[i].setXAxisRange(xr) ;
        }
        this.render() ;
    }
/*------------------------------------------------------------------------
 *
 *------------------------------------------------------------------------
 */
    init (){
        this.initBackground() ;
        for(var i=0; i<this.noCurves; i++){
            this.curves[i].render() ;
        }

        this.render() ;
    }

/*------------------------------------------------------------------------
 * render([renderTarget,[forceClear])
 *
 * Usage        :   render the plot
 *
 * renderTarget :   target if the render if other than screen
 * forceClear   :   boolean asking the renderer to clear the output
                    before rendering. Default: false
 *------------------------------------------------------------------------
 */
    /* render plot                       */
    render (renderTarget, forceClear){
        this.context.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        ) ;
        this.context.drawImage(
            this.bcanvas,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        ) ;
        gl.bindFramebuffer(
            gl.DRAW_FRAMEBUFFER,
            null
        );
        gl.clear(
            gl.COLOR_BUFFER_BIT
        );
        for(var i=0; i<this.noCurves; i++){
            this.curves[i].render() ;
        }
        this.context.drawImage(
            gl.canvas,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        ) ;
    } ;

}  /* End of Plot1D */

/*========================================================================
 * imageFromArray 
 *========================================================================
 */ 
function imageFromArray(ar,w,h){
    var canvas=document.createElement("canvas");
    var ctx=canvas.getContext("2d");
    
    // size the canvas to your desired image
    canvas.width=w;
    canvas.height=h;
    var imgData=ctx.getImageData(0,0,w,h);
    var data = imgData.data ;
    var px  ;
    for(var i=0;i<data.length;i++){
        data[i]=ar[i];
    }
    
    ctx.putImageData(imgData,0,0) ;
    var image = new Image() ;
    image.src = canvas.toDataURL() ;
    image.width = w ;
    image.height = h ;
    return image ;
}

/*========================================================================
 * f32FromUint8
 *========================================================================
 */ 
function f32FromUint8(data){
    var dat = new Float32Array(data.length) ;
    for (var i=0 ; i<data.length;i++){
        dat[i] = data[i]/255.0 ;
    }
    return dat ;
}

/*========================================================================
 * Plot2D( renderer, camera, renderTargets, options )
 *
 * Usage    : plots a 2D field in addition to possible tip-trajectories
 *
 * renderer :   renderer to be used for all plotting purposes;
 * camera   :   camera to be used for plotting
 * renderTargets:   [1-2 steps of renderTargets]
 * options  :
 *      -   channel     :   channel to plot         (default='r'        )
 *      -   minValue    :   min. value of the field (default=0          )
 *      -   maxValue    :   max. value of the field (default=1          )
 *      -   colormap    :   name of colormap        (default='rainbowHotSpring'      )
 *      -   tipt        :   plot tip-trajectory?    (default='false'    )
 *      -   tiptColor   :   tip-trajectory color    (default=white      )
 *      -   tiptThreshold:  threshold for tipt      (default=0.5        )
 *      -   tiptThickness:  thickness of tipt       (default=2          )
 *      -   width       :   width of display        (default=512        )
 *      -   height      :   height of display       (default=512        )
 *      -   probePosition:   probe position         (default=(0.5,0.5)  )
 *========================================================================
 */
class Plot2D{
    constructor(options={}){

/*------------------------------------------------------------------------
 * return if no options are defined
 *------------------------------------------------------------------------
 */
        if (options == undefined ){
            delete this ;
            console.log('Options need to be defined') ;
            return undefined ;
        }

/*------------------------------------------------------------------------
 * setting up colormaps
 *------------------------------------------------------------------------
 */
        this.colormapList   = getColormapList() ;
        this.colormaps      = getColormaps(this.colormapList) ;

/*------------------------------------------------------------------------
 * default values
 *------------------------------------------------------------------------
 */
        this.cgl        = cgl ;
        this.gl         = cgl.gl ;

        this.canvasTarget   = false ;

        this._phase          = undefined ;
/*------------------------------------------------------------------------
 * options
 *------------------------------------------------------------------------
 */
        this._target = readOption( options.target, null ) ;
        if ( this._target == null){
            warn('Error : The target to plot needs to be defined!') ;
            return undefined ;
        }
        this._minValue   = readOption(options.minValue,      0           ) ;
        this._maxValue   = readOption(options.maxValue,      1           ) ;
        this._enableMaxColor = readOption(options.enableMaxColor, false  ) ;
        this._enableMinColor = readOption(options.enableMinColor, false  ) ;
        this._maxColor   = readOption(options.maxColor,  [1,1,1,1. ]     ) ;
        this._minColor   = readOption(options.minColor,  [0,0,0,1. ]     ) ;
        this._channel    = readOption(options.channel,       'r'         ) ;
        this._prevTarget = readOption(options.prevTarget,    undefined   ) ;
        this._callback   = readOption(options.callback,      function(){}) ;
        this._clrmName   = readOption(options.colormap,
                'rainbowHotSpring'       ) ;

        this._pltTipt    = readOption(options.tipt ,         false       ) ;
        this._tiptColor  = readOption(options.tiptColor,     [1,1,1]     ) ;
        this._tiptThreshold= readOption(options.tiptThreshold, 0.5       ) ;
        this._tiptThickness = readOptions( options.tiptThickness, 2      ) ;

        this._width      = readOption(options.width,         512         ) ;
        this._height     = readOption(options.height,        512         ) ;
        this._probeVisible = readOption(options.probeVisible, false      ) ;
        this._probePosition= readOption(options.probePosition, [0.5,0.5] ) ;
        this._probeColor = readOption( options.probeColor ,  "#000000"   ) ;
        this._canvas     = readOption( options.canvas,       null        ) ;
        this._unit       = readOption( options.unit ,        ''          ) ;
        this._colorbar   = readOption( options.colorbar,     false       ) ;
        this._phase      = readOption( options.phase,        null        ) ;
        this._phase      = readOption( options.phaseField,   this.phase  ) ;
        this._phaseColor = readOption( options.phaseColor, [1,1,1]       ) ;
        this._background = readOption( options.background,   null        ) ;

        this._cblborder   = readOption( options.cblborder,   40          ) ;
        this._cbrborder   = readOption( options.cbrborder,   40          ) ;

        this._grid       = readOption( options.grid, 'off' ) ;
        this._nx         = readOption( options.nx , 5 ) ;
        this._ny         = readOption( options.ny , 5 ) ;
        this._gridColor  = readOption( options.gridColor , "#999999" ) ;
        this._gridDash   = readOption( options.gridDash  , [10,10]   ) ;
 

        if ( this._canvas != null ){
            this._canvasTarget = true ;
            this.context = this.canvas.getContext("2d");
            this._width = this.canvas.width ;
            this._height = this.canvas.height ;
        }

        if ( this.prevTarget == undefined ){
            this._pltTipt = false ;
        }

        this._channelMultiplier = getChannelMultiplier(this._channel) ;

        this._ftipt  = 
            new Float32Texture( this.target.width, this.target.height ) ;
        this._stipt  = 
            new Float32Texture( this.target.width, this.target.height ) ;
        this._prob   = 
            new Float32Texture( this.target.width, this.target.height ) ;
        this._clrm   = this.colormaps[this.clrmName] ;

        this._messages = [] ;

/*------------------------------------------------------------------------
 * tiptInit solver
 *------------------------------------------------------------------------
 */
        this.tiptInit = new Solver(
                {
                    vertexShader:   DefaultVertexShader.value,
                    fragmentShader: tiptInitShader.value,
                    renderTargets : {
                        ftipt : { location : 0 , target : this.ftipt } ,
                        stipt : { location : 1 , target : this.stipt } ,
                    } ,
                }) ;

/*------------------------------------------------------------------------
 * tipts solver
 *------------------------------------------------------------------------
 */
        if ( this.prevTarget != undefined ){
            this.tipts  = new Solver(
               {
                   vertexShader:   DefaultVertexShader.value,
                   fragmentShader: tiptShader.value,
                   uniforms: {
                      vPrv    : { type: "t",
                                  value: this.prevTarget           } ,
                      vCur    : { type: "t",
                                  value: this.target               } ,
                      tips    : { type: "t",
                                  value: this.stipt                } ,
                      path    : { type: "i",  value: this.pltTipt  } ,

                      /* Potential Threshold */
                      Uth     : { type: "f",
                                  value: this.tiptThreshold        } ,
                      channel : { type : 'v4', 
                                  value: this.channelMultiplier     } ,

                   } ,
                   renderTargets :{
                       ftipt   : { location : 0 , target : this.ftipt} ,
                   } ,
                   clear   : true ,
               } ) ;
        }

/*------------------------------------------------------------------------
 * write stipt to ftipt
 *------------------------------------------------------------------------
 */
        this.stip2ftip = new Solver({
                    vertexShader    : DefaultVertexShader.value,
                    fragmentShader  : wA2bShader.value,
                    uniforms:{
                        map: { type: 't', value: this.ftipt     }
                    },
                    renderTargets : {
                        FragColor : { location : 0 , target : this.stipt} ,
                    }
                } ) ;
/*------------------------------------------------------------------------
 * bcanvas
 *------------------------------------------------------------------------
 */
        this.bcanvas = document.createElement('canvas') ;
        this.bcanvas.width = this.width ;
        this.bcanvas.height = this.height ;
        this.bcontext = this.bcanvas.getContext('2d') ;

/*------------------------------------------------------------------------
 * plot solver
 *------------------------------------------------------------------------
 */
        if ( this.phase != undefined ){
            if (this.background == null ){
            this.plot =
                new Solver(  {
                    vertexShader    : DefaultVertexShader.value,
                    fragmentShader  : dispPhasShader.value,
                    uniforms: {
                        phas    : { type: 's', value: this.phase ,
                            minFilter : 'nearest', magFilter : 'nearest'} ,
                        phaseColor: 
                        { type : 'v3', value : this.phaseColor} ,
                        minValue: { type: 'f', value: this.minValue     } ,
                        maxValue: { type: 'f', value: this.maxValue     } ,
                        enableMaxColor : { type : 'b', 
                            value : this.enableMaxColor } ,
                        enableMinColor : { type : 'b', 
                            value : this.enableMinColor } ,
                        minColor: { type: 'v4',value: this.minColor     } ,
                        maxColor: { type: 'v4',value: this.maxColor     } ,
                        tiptColor:{ type: 'v3',value: this.tiptColor    } ,
                        tipt    : {
                            type: 's',
                            value: this.ftipt,
                            wrapS : 'mirrored_repeat',
                            wrapT : 'mirrored_repeat'
                        } ,
                        tiptThickness : {
                            type : 'f',
                            value   : this.tiptThicknes                 } ,
                        map     : { type: 's', value: this.target ,
                            minFilter: 'nearest', magFilter: 'nearest'  } ,
                        clrm    : { type: 't', value: this.clrm         } ,
                        prob    : { type: 't', value: this.prob         } ,
                        channelMultiplier : { type: 'v4',
                        value: this.channelMultiplier                   } ,
                        } ,

                        canvas: this.bcanvas ,
                    } ,
                ) ;
            }
            else {
                this.plot = 
                    new Solver({
                    vertexShader    : DefaultVertexShader.value,
                    fragmentShader  : dispBackgroundPhasShader.value,
                    uniforms: {
                        phas    : { type: 's', value: this.phase ,
                            minFilter : 'nearest', magFilter : 'nearest'} ,
                        phaseColor: 
                        { type : 'v3', value : this.phaseColor} ,
                        background: { 
                            type : 't' , value : this.background } ,
                        minValue: { type: 'f', value: this.minValue     } ,
                        maxValue: { type: 'f', value: this.maxValue     } ,
                        enableMaxColor : { type : 'b', 
                            value : this.enableMaxColor } ,
                        enableMinColor : { type : 'b', 
                            value : this.enableMinColor } ,
                        minColor: { type: 'v4',value: this.minColor     } ,
                        maxColor: { type: 'v4',value: this.maxColor     } ,
                        tiptColor:{ type: 'v3',value: this.tiptColor    } ,
                        tipt    : {
                            type: 's',
                            value: this.ftipt,
                            wrapS : 'mirrored_repeat',
                            wrapT : 'mirrored_repeat'
                        } ,
                        tiptThickness : {
                            type : 'f',
                            value   : this.tiptThicknes                 } ,
                        map     : { type: 's', value: this.target ,
                            minFilter: 'nearest', magFilter: 'nearest'  } ,
                        clrm    : { type: 't', value: this.clrm         } ,
                        prob    : { type: 't', value: this.prob         } ,
                        channelMultiplier : { type: 'v4',
                        value: this.channelMultiplier                   } ,
                        } ,

                        canvas: this.bcanvas ,
                    } ,
                ) ;
            }
        }else{
            this.plot =
                new Solver( {
                    vertexShader    : DefaultVertexShader.value,
                    fragmentShader  : dispShader.value,
                    uniforms: {
                        minValue: { type: 'f', value: this.minValue     } ,
                        maxValue: { type: 'f', value: this.maxValue     } ,
                        enableMaxColor : { type : 'b', 
                            value : this.enableMaxColor } ,
                        enableMinColor : { type : 'b', 
                            value : this.enableMinColor } ,
                        minColor: { type: 'v4',value: this.minColor     } ,
                        maxColor: { type: 'v4',value: this.maxColor     } ,

                        tiptColor:{ type: 'v3',value: this.tiptColor    } ,
                        tipt    : {
                            type: 's',
                            value: this.ftipt ,
                            wrapS : 'mirrored_repeat',
                            wrapT : 'mirrored_repeat'
                        } ,
                        tiptThickness : {
                            type : 'f',
                            value   : this.tiptThickness                } ,
                        map     : { type: 't', value: this.target       } ,
                        clrm    : { type: 't', value: this.clrm         } ,
                        prob    : { type: 't', value: this.prob         } ,
                        channelMultiplier : { type: 'v4',
                        value: this.channelMultiplier                   } ,
                        } ,
                        canvas : this.bcanvas ,
                    } ) ;
        }

/*------------------------------------------------------------------------
 * foreground
 *------------------------------------------------------------------------
 */
        this.fcanvas = document.createElement('canvas') ;
        this.fcanvas.width = this.width ;
        this.fcanvas.height = this.height ;
        this.fcontext = this.fcanvas.getContext('2d') ;
        
/*------------------------------------------------------------------------
 * ticks 
 *------------------------------------------------------------------------
 */
         
        this._xticksOpts= readOption( options.xticks, {} ) ;
        this._yticksOpts= readOption( options.yticks, {} ) ;
        
        this._xticks    = new Ticks( this._xticksOpts ) ;
        this._xticks.number = this.nx-1 ;
        
        this._yticks    = new Ticks( this._yticksOpts ) ;
        this._yticks.number = this.ny-1 ;
      
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

    get xticks(){
        this._xticks.plot = this.me ;
        return this._xticks ;
    }

    get yticks(){
        this._yticks.plot = this.me ;
        return this._yticks ;
    }

    get me(){
        return this ;
    }

    get target(){
        return this._target ;
    }
    get minValue(){
        return this._minValue ;
    }

    get maxValue(){
        return this._maxValue ;
    }

    get enableMaxColor(){
        return this._enableMaxColor ;
    }

    get enableMinColor(){
        return this._enableMinColor ;
    }

    get maxColor(){
        return this._maxColor ;
    }

    get minColor(){
        return this._minColor ;
    }

    get channel(){
        return this._channel ;
    }

    get prevTarget(){
        return this._prevTarget ;
    }

    get callback(){
        return this._callback ;
    }

    get clrmName(){
        return this._clrmName ;
    }
    get clrmImage(){
        return this._clrm.image ;
    }

    get pltTipt(){
        return this._pltTipt ;
    }

    get tiptColor(){
        return this._tiptColor ;
    }

    get tiptThreshold(){
        return this._tiptThreshold ;
    }


    get tiptThickness(){
        return this._tiptThickness ;
    }
    get width(){
        return this._width  ;
    }

    get height(){
        return this._height ;
    }
    get probeVisible(){
        return this._probeVisible ;
    }
    get probePosition(){
        return this._probePosition ;
    }
    get probeColor(){
        return this._probeColor ;
    }

    get canvas(){
        return this._canvas ;
    }
    get unit(){
        return this._unit ;
    }
       
    get colorbar(){
        return this._colorbar ;
    }
   
    get phase(){
        return this._phase;
    }
      
    get phaseColor(){
        return this._phaseColor ;
    }
 
    get background(){
        return this._background ;
    }
 
    get cblborder(){
        return this._cblborder ; 
    }
  
    get cbrborder(){
        return this._cbrborder;
    }
  
    get grid(){
        return this._grid;
    }
       
    get nx(){
        return this._nx;
    }
         
    get ny(){
        return this._ny;
    }
         
    get gridColor(){
        return this._gridColor;
    }
  
    get gridDash(){
        return this._gridDash;
    }

    get ftipt(){
        return this._ftipt ;
    }

    get stipt(){
        return this._stipt ;
    }

    get prob(){
        return this._prob ;
    }

    get clrm(){
        return this._clrm.texture ;
    }

    get channelMultiplier(){
        return this._channelMultiplier ;
    }

    get messages(){
        return this._messages ;
    }
/*------------------------------------------------------------------------
 * setter functions
 *------------------------------------------------------------------------
 */
    set colorbar(value){
        this._colorbar = value ;
        this.initForeground() ;
    }

    set colormap( clrmname ){
        this._clrmName = clrmname ;
        this._clrm = this.colormaps[this.clrmName] ;
        this.plot.setUniform( 'clrm', this.clrm ) ; 
        this.initForeground() ;
    }

    set minValue( val ) {
        this._minValue = val ;
        this.plot.setUniform('minValue',this.minValue );
        this.initForeground() ;
    }
    set maxValue( val ) {
        this._maxValue = val ;
        this.plot.setUniform('maxValue',this.maxValue );
        this.initForeground() ;
    }

    set channel(c){
        this._channel = c ;
        this._channelMultiplier =  getChannelMultiplier( this.channel ) ;
        if (this.prevTarget != undefined ){
            this.tipts.uniforms.channel.value = this.channelMultiplier ;
        }
        this.plot.setUniform('channelMultiplier',
            this.channelMultiplier );
    }

    set probePosition(pos){
        this._probePosition = pos ;
        this.initForeground() ;
    }


    set target(nt){
        this._target = nt ;
        this.plot.uniforms.map.value = this.target ;
    }
    
/*------------------------------------------------------------------------
 * drawGrid
 *------------------------------------------------------------------------
 */
    drawGrid(){
        if ( this.grid == 'on' ){
            this.fcontext.setLineDash(this.gridDash) ;
            this.fcontext.strokeStyle=this.gridColor ;
            var dx = this.canvas.width / (this.nx) ;
            var dy = this.canvas.height/ (this.ny) ;
            for (var i=1; i<this.nx ; i++){
                this.fcontext.moveTo(i*dx,0) ;
                this.fcontext.lineTo(i*dx,this.canvas.height) ;
                this.fcontext.stroke() ;
            }
            for (var j=1; j<this.ny ; j++){
                this.fcontext.moveTo(0,j*dy) ;
                this.fcontext.lineTo(this.canvas.width,j*dy) ;
                this.fcontext.stroke() ;
            }
        }
    }

/*------------------------------------------------------------------------
 * messages to appear on foreground
 *------------------------------------------------------------------------
 */
    addMessage (message, x, y, options ){
        var msg = new Message(message,x,y,options) ;
        this.messages.push(msg) ;
        this.initForeground() ;
        return msg ;
    }

/*------------------------------------------------------------------------
 * write all messages
 *------------------------------------------------------------------------
 */
    writeMessages (){
        for (var i=0 ; i < this.messages.length; i++){
            var message = this.messages[i] ;
            if (message.visible){
                this.fcontext.font = message.font ;
                this.fcontext.fillStyle = message.style ;
                this.fcontext.textAlign = message.align ;
                this.fcontext.fillText( message.text,
                                        this.canvas.width*message.x,
                                        this.canvas.height*message.y );
            }
        }
    }

/*------------------------------------------------------------------------
 * writeTicks
 *------------------------------------------------------------------------
 */
    writeTicks(){
        if (this.xticks.mode != 'off' ){
            this.fcontext.font = this.xticks.font ;
            this.fcontext.fillStyle = this.xticks.style ;
            this.fcontext.textAlign = "center" ;
            for (var i=1; i<=this.xticks.number ;i++){
                var dx = this.canvas.width / (this.xticks.number+1)
                var dy = this.canvas.height/ (this.ny) ;
                this.fcontext.fillText(
                    this.xticks.labels[i-1] ,
                    i*dx,
                    this.canvas.height*(1.-this.xticks.offset)
                ) ;
            }
        }
        if ( this.yticks.mode != 'off' ){
            this.fcontext.font = this.yticks.font ;
            this.fcontext.fillStyle = this.yticks.style ;
            this.fcontext.textAlign = "start" ;
            for (var i=1; i<=this.yticks.number ;i++){
                var dy = this.canvas.height
                        /(this.yticks.number+1) ;

                this.fcontext.fillText(
                    this.yticks.labels[i-1],
                    this.canvas.width*this.yticks.offset,
                    this.canvas.height-i*dy
                ) ;
            }
        }
    }

/*------------------------------------------------------------------------
 * drawProbePosition
 *------------------------------------------------------------------------
 */
    drawProbePosition (){
        if (!this.probeVisible)
            return ;
        this.fcontext.strokeStyle = this.probeColor;
        this.fcontext.beginPath();
        this.fcontext.strokeRect(
                this.canvas.width*this.probePosition[0] 
                    - this.canvas.width*0.01 ,
                this.canvas.height*(1-this.probePosition[1]) 
                    - this.canvas.width*0.01 ,
                this.canvas.width*0.02 ,
                this.canvas.width*0.02 ) ;
     //   this.fcontext.arc(
     //       this.canvas.width*this.probePosition[0],
     //       this.canvas.height*(1-this.probePosition[1]) ,
     //       this.canvas.width*0.02 ,
     //       0.,
     //       Math.PI * 2.0 ) ;
        this.fcontext.stroke() ;

        this.fcontext.moveTo(
            this.canvas.width*this.probePosition[0]
                - this.canvas.width*0.02,
            this.canvas.height*(1-this.probePosition[1])
        ) ;

        this.fcontext.lineTo(
            this.canvas.width*this.probePosition[0]
                + this.canvas.width*0.02,
            this.canvas.height*(1-this.probePosition[1])
        ) ;
        this.fcontext.stroke() ;
        this.fcontext.moveTo(
            this.canvas.width*this.probePosition[0],
            this.canvas.height*(1-this.probePosition[1] )
                    - this.canvas.width*0.02
        ) ;

        this.fcontext.lineTo(
                this.canvas.width*this.probePosition[0],
                this.canvas.height*(1-this.probePosition[1] )
                    + this.canvas.width*0.02
        ) ;
        this.fcontext.stroke() ;

        return ;
    }

/*------------------------------------------------------------------------
 * drawColorbar
 *------------------------------------------------------------------------
 */
    drawColorbar () {
        if (this.colorbar){
            this.fcontext.font = '10pt Arial' ;
            this.fcontext.fillStyle = "#FFFFFF" ;
            this.fcontext.fillRect( this.canvas.width/4 - this.cblborder ,
                                    this.canvas.height - 38,
                                    this.canvas.width/2
                                        + this.cblborder
                                        + this.cbrborder
                                        ,
                                    30 ) ;

            this.fcontext.fillStyle = "#000000" ;
            this.fcontext.textAlign = 'end' ;
            this.fcontext.fillText(     this.minValue + this.unit,
                                    this.canvas.width/4,
                                    this.canvas.height - 30 + 13) ;
            this.fcontext.textAlign = 'start' ;
            this.fcontext.fillText(     this.maxValue + this.unit,
                                    this.canvas.width*3/4,
                                    this.canvas.height - 30 + 13) ;


        this.fcontext.drawImage(    this.clrmImage,this.canvas.width/4,
                                    this.canvas.height - 30 ,
                                    this.canvas.width/2,16) ;
        }
        this._clrm.image.plot = this ;
        this._clrm.image.init = function(e){
            e.composedPath()[0].plot.init() ;
            e.composedPath()[0].plot.render() ;
        }
        this._clrm.image.onload = (e) => this._clrm.image.init(e) ;
    }
/*------------------------------------------------------------------------
 * 
 *------------------------------------------------------------------------
 */

/*------------------------------------------------------------------------
 * setColorbarVisiblity
 *------------------------------------------------------------------------
 */
    setColorbarVisiblity  (v){
        this.colorbar = readOption(v, this.colorbar) ;
    }

/*------------------------------------------------------------------------
 * toggleColorbar
 *------------------------------------------------------------------------
 */
    toggleColorbar (){
        this.colorbar = !this.colorbar ;
    }

/*------------------------------------------------------------------------
 * showColorbar
 *------------------------------------------------------------------------
 */
    showColorbar (){
        this.colorbar = true ;
    }

/*------------------------------------------------------------------------
 * hideColorbar
 *------------------------------------------------------------------------
 */
    hideColorbar (){
        this.colorbar = false ;
    }

/*------------------------------------------------------------------------
 * initForeground
 *------------------------------------------------------------------------
 */
    initForeground () {
        this.fcontext.clearRect(0,0,this.canvas.width,this.canvas.height) ;
        this.drawGrid() ;
        this.writeTicks() ;
        this.writeMessages() ;
        this.drawProbePosition() ;
        this.drawColorbar() ;
    }

/*------------------------------------------------------------------------
 * setColormap
 *------------------------------------------------------------------------
 */
    setColormap (clrmName){
        if (clrmName != undefined ){
            this.colormap = clrmName ;
        }
    }

/*------------------------------------------------------------------------
 * setMinValue
 *------------------------------------------------------------------------
 */
    setMinValue (val){
        this._minValue = val ;
        this.plot.setUniform('minValue',this.minValue );
        this.initForeground() ;
    }

/*------------------------------------------------------------------------
 * setMaxValue
 *------------------------------------------------------------------------
 */
    setMaxValue (val){
        this.maxValue = readOption(val, this.maxValue) ;
    }

/*------------------------------------------------------------------------
 * setChannel
 *------------------------------------------------------------------------
 */
    setChannel (channel){
        this.channel = channel ;
    }

/*------------------------------------------------------------------------
 * setTiptVisiblity
 *------------------------------------------------------------------------
 */
    setTiptVisiblity ( tipt ){
        this._pltTipt = tipt ;
        this.tipts.setUniform('path' , this.pltTipt ) ;
        this.tiptInit.render() ;
    }

/*------------------------------------------------------------------------
 * setTiptColor
 *------------------------------------------------------------------------
 */
    setTiptColor(color){
        this._tiptColor = color ;
        this.plot.setUniform('tiptColor',
            this.tiptColor );
    }

/*------------------------------------------------------------------------
 * setTiptThreshold
 *------------------------------------------------------------------------
 */
    setTiptThreshold (threshold){
        this._tiptThreshold = threshold ;
        this.tipts.setUniform('Uth',
            this.tiptThreshold ) ;
    }

/*------------------------------------------------------------------------
 * setTiptThickness
 *------------------------------------------------------------------------
 */
    setTiptThickness (thickness){
        this._tiptThickness = readOption(thickness, this.tiptThickness ) ;
        this.plot.setUniform('tiptThickness', this.tiptThickness ) ;
    }

/*------------------------------------------------------------------------
 * setProbePosition
 *------------------------------------------------------------------------
 */
    setProbePosition (probePosition){
        if (probePosition != undefined ){
            this._probePosition = probePosition ;
        }
        this.initForeground() ;
    }

/*------------------------------------------------------------------------
 * setProbVisiblity
 *------------------------------------------------------------------------
 */
    setProbeVisiblity (flag){
        if ( flag != undefined ){
            this._probeVisible = flag ;
            this.initForeground() ;
        }
    }

/*------------------------------------------------------------------------
 * setProbColor
 *------------------------------------------------------------------------
 */
    setProbeColor (clr){
        if (clr != undefined ){
            this._probeColor = clr ;
            this.initForeground() ;
        }
    }

/*------------------------------------------------------------------------
 * init
 *------------------------------------------------------------------------
 */
    init (){
        this.initForeground() ;
        this.tiptInit.render() ;
        this.colormap = this.clrmName ;
    }

/*------------------------------------------------------------------------
 * initialize
 *------------------------------------------------------------------------
 */
    initialize(){
         this.init() ;
    }

/*------------------------------------------------------------------------
 * setSize
 *------------------------------------------------------------------------
 */
    setSize (width, height){
        this.ftipt.resize( width, height ) ;
        this.stipt.resize( width, height ) ;
        this.prob.resize( width, height ) ;
        this.init() ;
    }

/*------------------------------------------------------------------------
 * tiptUpdate
 *------------------------------------------------------------------------
 */
    updateTipt (){
        if ( this.pltTipt ){
            this.tipts.render() ;
            this.stip2ftip.render() ;
        }
        return ;
    }

/*------------------------------------------------------------------------
 * render
 *------------------------------------------------------------------------
 */
    render (){
        this.updateTipt() ;
        this.plot.render() ;

        this.context.clearRect(0,0,this.canvas.width, this.canvas.height ) ;
        this.context.drawImage(this.bcanvas,0,0) ;
        this.context.drawImage(this.fcanvas, 0,0) ;

        return ;
    }

} /* end of Plot2D */

/*========================================================================
 * Tvsx : time vs x solver
 *  options :
 *      ftarget     : first target 
 *      starget     : second target
 *      timeWindow  : time window (vertical length)
 *      dt          : delta t 
 *      active      : boolean to indicate if the solver is active
 *      defaultVal  : v4 for the default value of the solver
 *      yLevel      : y-level for x values (0.5)
 *      refresh     : boolean to refresh afte each time window
 *      width       : width of the internal texture
 *      height      : height of the internal texture
 *========================================================================
 */
class Tvsx{
    constructor(options={}){
        this._ftarget   = readOption( options.ftarget ,     null        ) ;
        this._starget   = readOption( options.starget , this._ftarget   ) ;
        this._timeWindow= readOption( options.timeWindow ,  1000.0      ) ;
        this._dt        = readOption( options.dt ,          0.01        ) ;
        this._active    = readOption( options.active ,      true        ) ;
        this._refresh   = readOption( options.refresh ,     true        ) ;
        this._defaultVal= readOption( options.defaultVal , [0.,0.,0.,0.]) ;
        this._defaultVal= readOption( options.defaultValue , 
                this._defaultVal    ) ;
        this._defaultVal= readOption( options.rgba ,this._defaultVal    ) ;
        this._yLevel    = readOption( options.yLevel ,      0.5         ) ;
        this._yLevel    = readOption( options.ylevel , this._yLevel     ) ;
        this._dispOpts  = readOption( options.displayOptions, null      ) ;
        this._width     = readOption( options.width     ,   512         ) ;
        this._height    = readOption( options.height    ,   512         ) ;


        this._ftvsx = new FloatRenderTarget(this._width, this._height) ;
        this._stvsx = new FloatRenderTarget(this._width, this._height) ;
        this._fttex = new FloatRenderTarget(1,1) ;
        this._sttex = new FloatRenderTarget(1,1) ;

        this.ftvsxs = new Solver({
            fragmentShader  : tvsxShader.value,
            vertexShader    : DefaultVertexShader.value,
            uniforms : {
                inText : {  
                    type    : 't', 
                    value   : this._ftarget 
                } ,
                inTvsx : {  
                    type    : 't', 
                    value   : this._ftvsx   
                } ,
                ttex : { 
                    type    : 't', 
                    value   : this._fttex   
                } ,
                timeWindow : { 
                    type    : 'f', 
                    value   : this._timeWindow 
                } ,

                devaultVal : { 
                    type    : 'v4', 
                    value   : this._defaultVal 
                } ,
                yLevel : { 
                    type    : 'f', 
                    value   : this._yLevel 
                } ,
                refresh : { 
                    type    : 'f', 
                    value   : this._refresh 
                } ,
            } ,
            renderTargets:{
                outTvsx : { location : 0, target : this._stvsx } ,
            }
        } ) ;

        this.stvsxs = new Solver({
            fragmentShader  : tvsxShader.value,
            vertexShader    : DefaultVertexShader.value,
            uniforms : {
                inText : {  
                    type    : 't', 
                    value   : this._starget 
                } ,
                inTvsx : {  
                    type    : 't', 
                    value   : this._stvsx   
                } ,
                ttex : { 
                    type    : 't', 
                    value   : this._sttex   
                } ,
                timeWindow : { 
                    type    : 'f', 
                    value   : this._timeWindow 
                } ,

                devaultVal : { 
                    type    : 'v4', 
                    value   : this._defaultVal 
                } ,
                yLevel : { 
                    type    : 'f', 
                    value   : this._yLevel 
                } ,
                refresh : { 
                    type    : 'f', 
                    value   : this._refresh 
                } ,
            } ,
            renderTargets:{
                outTvsx : { location : 0, target : this._ftvsx } ,
            }
        } ) ;

        this.ftstps = new Solver({
            vertexShader    : DefaultVertexShader.value ,
            fragmentShader  : tstpShader.value ,
            uniforms : {
                inTtex : { 
                    type    : 't' ,
                    value   : this._fttex 
                },
                timeWindow: {
                    type : 'f',
                    value: this._timeWindow 
                } ,
                dt : {
                    type: 'f',
                    value: this._dt
                } ,
            } ,
            renderTargets: {
                outTtex : { location : 0 , target   : this._sttex }
            } ,
            clear   : false ,
        } ) ;

        this.ststps = new Solver({
            vertexShader    : DefaultVertexShader.value ,
            fragmentShader  : tstpShader.value ,
            uniforms : {
                inTtex : { 
                    type    : 't' ,
                    value   : this._sttex 
                },
                timeWindow: {
                    type : 'f',
                    value: this._timeWindow 
                } ,
                dt : {
                    type: 'f',
                    value: this._dt
                } ,
            } ,
            renderTargets: {
                outTtex : { location : 0 , target   : this._fttex }
            } ,
            clear   : false ,
        } ) ;


    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
    
    get texture(){
        return this._ftvsx ;
    }
    
    get target(){
        return this._ftvsx ;
    }

    get active(){
        return this._active ;
    }
    
    set active(val){
        this._active = val ;
    }

    set dt(newDt){
        this._dt = newDt ;
        this.ftstps.setUniform('dt',this._dt) ;
        this.ststps.setUniform('dt',this._dt) ;
    } 

    set timeWindow(tw){
        this._timeWindow = tw ;
        this.ftstps.setUniform('timeWindow', this._timeWindow) ;
        this.ststps.setUniform('timeWindow', this._timeWindow) ;
        this.ftvsxs.setUniform('timeWindow', this._timeWindow) ;
        this.stvsxs.setUniform('timeWindow', this._timeWindow) ;
    }

    get refresh(){
        return this._refresh ;
    }

    set refresh(b){
        this._refresh = b ;
        this.ftvsxs.setUniform('refresh', this._refresh ) ;
        this.stvsxs.setUniform('refresh', this._refresh ) ;
    }

    get timeWindow(){
        return this._timeWindow ;
    }

    set timewindow(tw){
        this.timeWindow = tw ;
    }

    get timeWindow(){
        return this.timeWindow ;
    }

    set yLevel(yl){
        this._yLevel = yl ;
        this.ftvsxs.setUniform('yLevel', this._yLevel ) ;
        this.stvsxs.setUniform('yLevel', this._yLevel ) ;
    }

    get yLevel(){
        return this._yLevel ;
    }

    set ylevel(yl){
        this.yLevel =yl ;
    }
    
    get ylevel(){
        return this.yLevel ;
    }

    set defaultVal(dv){
        this._defaultVal = dv ;
        this.ftvsxs.setUniform('defaultVal', this._defaultVal ) ;
        this.stvsxs.setUniform('defaultVal', this._defaultVal ) ;
    } 
    
    get defaultVal(){
        return this._defaultVal ;
    }

    set defaultValue(dv){
        this.defaultVal = dv ;
    }
    
    get defaultValue(){
        return this.defaultVal ;
    }

    set rgba(dv){
        this.defaultVal = dv ;
    }
    
    get rgba(){
        return this.defaultVal ;
    }
        
    frender(){
        this.ftvsxs.render() ;
        this.ftstps.render() ;
    }

    srender(){
        this.stvsxs.render() ;
        this.ststps.render() ;
    }
    
    render(){
        if (this.active){
            this.srender() ;
            this.frender() ;
        }
    }

} /* End of TvsxPlot class definition */

/*========================================================================
 * VolumeRayCaster({options}):
 *      - target            :   a texture to plot from
 *      - prev              :   previous time-step texture
 *      - canvas            :   a canvas to draw on
 *      - mx                :   number of z-slices in x-direction
 *      - my                :   number of z-slices in y-direction
 *      - alphaCorrection   :   alpha-correction
 *      - noSteps           :   number of ray-casting steps
 *      - channel           :   the channel to draw colors from
 *      - threshold         :   the drawing threshold value
 *      - filamentThreshold :   threshold for calculating filament
 *      - filamentColor     :   color of the filament
 *      - drawFilament      :   request to draw filament
 *      - xLevel            :   x-level of cut plane
 *      - yLevel            :   y-level of cut plane
 *      - zLevel            :   z-level of cut plane
 *      - showXCut          :   show x-cutplane
 *      - showYCut          :   show y-cutplane
 *      - showZCut          :   show z-cutplane
 *      - minValue          :   minimum value in the colorbar range
 *      - maxValue          :   maximum value in the colorbar range
 *      - colorbar          :   name of the colorbar to calc. colors
 *      - lights            :   a v3v of directional flood lights
 *      - phaseField        :   phase-field texture when necessary
 *      - compressionMap    :   compression map of a compressed structure
 *      - decompressionMap  :   decompression map of a compressed structure
 *      - onCtrlClick       :   callback function for Ctrl+Click events
 *      - clickPenetration  :   clickPenetration factor
 *========================================================================
 */
class VolumeRayCaster{
    constructor(opts={}){

/*------------------------------------------------------------------------
 * setting up colormaps
 *------------------------------------------------------------------------
 */
        this.colormapList   = getColormapList() ;
        this.colormaps      = getColormaps(this.colormapList) ;

/*------------------------------------------------------------------------
 * reading options
 *------------------------------------------------------------------------
 */
        this.target = readOption(opts.target,null,
                'Error : A Float32Texture must be provided for '+
                'plotting.\n'+
                'No VolumeRayCaster can be defined!'                    ) ;
        this.prev   = readOption(opts.prev, null    ) ;
        this.prevDefined = false ;

        if (this.target == null ){
            return null ;
        }
        if ( this.prev == null ){
            this.prev = 
                new Float32Texture( this.target.width,this.target.height) ;
        }else{
            this.prevDefined = true ;
        }

        this.prevTarget = readOption(opts.prevTarget, null ) ;

        this.canvas = readOption(opts.canvas, null,
            'Error: No canvas for VolumeRayCaster was provided.\n'+
            'No VolumeRayCaster can be defined!'                        ) ;
        if (this.canvas == null){
            return null ;
        }

        this.dispWidth  = this.canvas.width ;
        this.dispHeight = this.canvas.height ;
        this.context    = this.canvas.getContext('2d') ;

        this.mx = readOption( opts.mx, 1,
            'Warning : Number of z-slices in x-direction '+
            'of structure/mx was not provided. Assuming mx = 1. '       ) ;

        this.my = readOption(opts.my, 1,
            'Warning : Number of z-slices in y-direction '+
            'of structure/my was not provided. Assuming my = 1. '       ) ;

        this.alphaCorrection = readOption(opts.alphaCorrection, 0.5     ) ;
        this._structural_alpha= readOption(opts.structural_alpha, 1.0   ) ;
        this.fov            = readOption(opts.fieldOfView, Math.PI*0.1  ) ;
        this.fov            = readOption(opts.fov   , this.fov          ) ;
        this.nearField      = readOption(opts.nearField,    0.01        ) ;
        this.farField       = readOption(opts.farField,     100         ) ;
        this.noSteps        = readOption(opts.noSteps   , 50            ) ;
        this.channel        = readOption(opts.channel   , 'r'           ) ;
        this.threshold      = readOption(opts.threshold , 0.            ) ;

        this.drawFilament   = readOption(opts.drawFilament, false ) ;
        this.filamentThreshold = readOption(opts.filamentThreshold, 0.  ) ;
        this.filamentColor = readOption(opts.filamentColor,[0.,0.,0.,0.]) ;
        this.filamentThickness = readOption(opts.filamentThickness, 1 ) ;
        this.filamentBorder = readOption(opts.filamentBorder, 0.1     ) ;
        this.xLevel         = readOption(opts.xLevel, 0.1) ;
        this.yLevel         = readOption(opts.yLevel, 0.2) ;
        this.zLevel         = readOption(opts.zLevel, 0.3) ;
        this.showXCut       = readOption(opts.showXCut, false ) ;
        this.showYCut       = readOption(opts.showYCut, false ) ;
        this.showZCut       = readOption(opts.showZCut, false ) ;
        this.rayCast        = readOption(opts.rayCast,  true  ) ;

        this.minValue       = readOption(opts.minValue  , 0.            ) ;
        this.maxValue       = readOption(opts.maxValue  , 1.            ) ;
        this.unit           = readOption(opts.unit      , ''            ) ;
        this.clrmName       = readOption(opts.colormap  , 'rainbowHotSpring'         ) ;
        this.scale          = readOption(opts.scale ,   1.0             ) ;
        this.clickPenetration = readOptions( opts.clickPenetration, 0   ) ;
        this.clickPenetration = readOptions( opts.cp,
                this.clickPenetration ) ;

        this.clrm   = this.colormaps[this.clrmName] ;

        this.colorbar       = readOption(opts.colorbar  , false         ) ;

        this.dfls           = readOption(opts.floodLights, []           ) ;
        this.noDfls = Math.floor(this.dfls.length/3) ;

        this.ptls           = readOption(opts.pointLights, []           ) ;
        this.noPtls         = Math.floor(this.ptls.length/3) ;
        this.lightShift     = readOption(opts.lightShift,   0           ) ;

        this.dfls.push(0,0,0) ; /* this is added to avoid problems
                                   when no light is provided        */
        this.ptls.push(0,0,0) ;

        this.phaseField     = readOption(opts.phaseField , null         ) ;
        this.compMap        = readOption(opts.compressionMap, null      ) ;

        if (this.compMap != null ){
            this.useCompMap = true ;
            this.width  = this.compMap.width ;
            this.height = this.compMap.height ;
        }else{
            this.useCompMap = false ;
            this.width  = this.target.width ;
            this.height = this.target.height ;
        }
        this.domainResolution = 
            [ this.width/this.mx, this.height/this.my,this.mx*this.my ] ;

        function ifNullThenUnit(trgt){
            if (trgt == null ){
                return new Float32Texture(1,1) ;
            }else{
                return trgt ;
            }
        }
        if( this.phaseField != null ){
            this.usePhaseField = true ;
        }else{
            this.usePhaseField = false ;
        }

        this.usePhaseField = 
            readOption( opts.usePhaseField, this.usePhaseField ) ;
        this.phaseField = ifNullThenUnit(this.phaseField) ;
        this.compMap    = ifNullThenUnit(this.compMap   ) ;
        this.prevTarget = ifNullThenUnit(this.prevTarget) ;

        this.flmt = new Float32Texture(this.width, this.height ) ;


        /* callback function for control click */
        this.onCtrlClick = readOption(opts.onCtrlClick, function(){}    ) ;

        this.channelMultiplier = getChannelMultiplier( this.channel ) ;

/*------------------------------------------------------------------------
 * copyTrgt2Prev
 *------------------------------------------------------------------------
 */
        this.copyTrgt2Prev = new Copy( this.target, this.prev ) ;

/*------------------------------------------------------------------------
 * coordinate and light
 *------------------------------------------------------------------------
 */
        this.crdtTxt = new Float32Texture(this.width, this.height) ;
        this.crdt   = new  Solver( {
            vertexShader    : DefaultVertexShader.value,
            fragmentShader  : vrcCrdShader.value,
            uniforms : {
                mx          : {
                    type    : 'f',
                    value   : this.mx
                } ,
                my          : {
                    type    : 'f',
                    value   : this.my
                } ,
            } ,
            renderTargets : {
                crd : { location : 0 , target : this.crdtTxt  } ,
            }
        } ) ;
        this.crdt.render() ;

/*------------------------------------------------------------------------
 * light
 *------------------------------------------------------------------------
 */
        this.lightTxt = new Float32Texture(this.width, this.height) ;
        this.light = new Solver({
            vertexShader    :   DefaultVertexShader.value ,
            fragmentShader  :   vrcLgtShader.value ,
            uniforms : {
                crdtTxt     : {
                    type    : 't',
                    value   : this.crdtTxt
                } ,
                phaseTxt    : {
                    type    : 's',
                    value   : this.phaseField,
                    //minFilter: 'nearest',
                    //magFilter: 'nearest',
                } ,
                target      : {
                    type    : 's',
                    value   : this.target ,
                    minFilter: 'nearest',
                    magFilter: 'nearest',
                } ,
                usePhaseField: {
                    type    : 'b',
                    value   : this.usePhaseField
                } ,
                mx          : {
                    type    : 'f',
                    value   : this.mx
                } ,
                my          : {
                    type    : 'f',
                    value   : this.my,
                },
                minValue    : {
                    type    : 'f',
                    value   : this.minValue
                } ,
                maxValue    : {
                    type    : 'f' ,
                    value   : this.maxValue
                } ,
                threshold   : {
                    type    : 'f',
                    value   : this.threshold
                } ,
                dfls        : {
                    type    : 'f3v',
                    value   : this.dfls
                } ,
                noDfls      : {
                    type    : 'i',
                    value       : this.noDfls
                } ,
                ptls        : {
                    type    : 'f3v',
                    value   : this.ptls,
                } ,
                noPtls      : {
                    type    : 'i',
                    value   : this.noPtls,
                } ,
                alphaCorrection : {
                    type    : 'f',
                    value   : this.alphaCorrection
                } ,
                channelMultiplier : {
                    type    : 'v4',
                    value   : this.channelMultiplier
                } ,
                lightShift  : {
                    type    : 'f',
                    value   : this.lightShift,
                } ,
                structural_alpha : {
                    type    : 'f',
                    value   : this.structural_alpha 
                } ,

            } ,
            renderTargets: {
                light   : { location : 0 , target : this.lightTxt   } ,
            }
        } ) ;
        this.light.render() ;

/*------------------------------------------------------------------------
 * geometry
 *------------------------------------------------------------------------
 */
        var cubeGeometry        = new UnitCubeGeometry() ;
        var frameGeometry   = new UnitCubeFrameGeometry() ;

/*------------------------------------------------------------------------
 * transformation matrices
 *------------------------------------------------------------------------
 */
        /* modelMatrix  */
        this.modelMatrix = mat4.create() ;
        mat4.identity(  this.modelMatrix                 ) ;

        mat4.rotate(    this.modelMatrix, this.modelMatrix,
                        -Math.PI/2.,[1.,0.,0.]      ) ;

        mat4.translate( this.modelMatrix, this.modelMatrix,
                        [-0.5,-0.5,-0.5]            ) ;

        /* viewMatrix   */
        this.viewMatrix = mat4.create() ;

        mat4.rotate(    this.viewMatrix,this.viewMatrix,
                        Math.PI/2.0,[1,1,1]         ) ;

        mat4.identity(  this.viewMatrix                  ) ;

        mat4.lookAt(    this.viewMatrix,
                        [2,2,2],[0,0,0],[0,1,0]     ) ;

        this.viewMatrix.onchange= function(){
            log('hehehe') ;
        } ;

        this.controler = new OrbitalCameraControl(
            this.viewMatrix,
            4.0 , this.canvas,
            {
                prevx: -.4,
                prevy: 0.4,
            }
        ) ;

        /* projectionMatrix */
        this.projectionMatrix = mat4.create() ;
        mat4.identity(      this.projectionMatrix        ) ;
        mat4.perspective (  this.projectionMatrix ,
                            this.fov, this.dispWidth/this.dispHeight,
                            this.nearField, this.farField               ) ;

/*------------------------------------------------------------------------
 * pass1
 *------------------------------------------------------------------------
 */
        this.backfaceCrdTxt = new Float32Texture(this.dispWidth,
                                                    this.dispHeight     ) ;
        this.pass1 = new Solver({
            vertexShader    : vrc1VShader.value,
            fragmentShader  : vrc1FShader.value,
            uniforms : {
                modelMatrix : {
                    type    : 'mat4',
                    value   : this.modelMatrix
                } ,
                viewMatrix  : {
                    type    : 'mat4',
                    value   : this.viewMatrix
                } ,
                projectionMatrix : {
                    type    : 'mat4',
                    value   : this.projectionMatrix
                } ,
            } ,
            geometry        : cubeGeometry ,
            cullFacing      : true ,
            cullFace        : 'front',
            depthTest       : 'true',
            renderTargets   : {
                back_face_Crds : {
                    location :0 ,
                    target  : this.backfaceCrdTxt
                } ,
            } ,
        } ) ;

/*------------------------------------------------------------------------
 * pass2
 *------------------------------------------------------------------------
 */
        this.pass2  = new Solver({
            vertexShader    : vrc2VShader.value,
            fragmentShader  : vrc2FShader.value,
            uniforms    : {
                modelMatrix : {
                    type    : 'mat4',
                    value   : this.modelMatrix
                } ,
                viewMatrix  : {
                    type    : 'mat4',
                    value   : this.viewMatrix
                } ,
                projectionMatrix : {
                    type    : 'mat4',
                    value   : this.projectionMatrix
                } ,
                backfaceCrdTxt : {
                    type    : 's',
                    value   : this.backfaceCrdTxt ,
                    minFilter : 'nearest' ,
                    magFilter : 'nearest' ,
                    wrapS   : 'clamp_to_edge' ,
                    wrapT   : 'clamp_to_edge' ,
                } ,
                phaseTxt    : {
                    type    : 's',
                    value   : this.phaseField,
                    minFilter: 'nearest',
                    magFilter: 'nearest',
                } ,
                target      : {
                    type    : 's',
                    value   : this.target ,
                    minFilter: 'nearest',
                    magFilter: 'nearest',
                } ,
                compMap     : {
                    type    : 't',
                    value   : this.compMap
                } ,
                lightTxt    : {
                    type    : 't' ,
                    value   : this.lightTxt ,
                } ,
                flmt        : {
                    type    : 't',
                    value   : this.flmt ,
                } ,
                drawFilament: { 
                    type    : 'b',
                    value   : this.drawFilament 
                } ,
                showXCut    : {
                    type    : 'b',
                    value   : this.showXCut ,
                } ,
                showYCut    : {
                    type    : 'b',
                    value   : this.showYCut,
                } ,
                showZCut    : {
                    type    : 'b',
                    value   : this.showZCut,
                } ,
                xLevel      : {
                    type    : 'f',
                    value   : this.xLevel,
                } ,
                yLevel      : {
                    type    : 'f',
                    value   : this.yLevel,
                } ,
                zLevel      : {
                    type    : 'f',
                    value   : this.zLevel ,
                } ,
                filamentColor:{
                    type    : 'v4',
                    value   : this.filamentColor 
                } ,
                rayCast     : {
                    type    : 'b',
                    value   : this.rayCast ,
                } ,
                clrm        : {
                    type    : 't',
                    value   : this.clrm.texture,
                } ,
                usePhaseField: {
                    type    : 'b',
                    value   : this.usePhaseField
                } ,
                useCompMap  : {
                    type    : 'b',
                    value   : this.useCompMap
                } ,
                minValue    : {
                    type    : 'f',
                    value   : this.minValue
                } ,
                maxValue    : {
                    type    : 'f',
                    value   : this.maxValue
                } ,
                threshold   : {
                    type    : 'f',
                    value   : this.threshold
                } ,
                channelMultiplier: {
                    type    : 'v4',
                    value   : this.channelMultiplier
                } ,
                alphaCorrection : {
                    type    : 'f',
                    value   : this.alphaCorrection
                } ,
                noSteps       : {
                    type    : 'i',
                    value   : this.noSteps
                } ,
                mx          : {
                    type    : 'f' ,
                    value   : this.mx ,
                } ,
                my          : {
                    type    : 'f',
                    value   : this.my ,
                } ,
                lightShift  : {
                    type    : 'f',
                    value   : this.lightShift ,
                } ,
                structural_alpha : { type : 'f', value : this.structural_alpha } ,
            } ,
            geometry        : cubeGeometry ,
            cullFacing      : true ,
            cullFace        : 'back' ,
            depthTest       : true ,
            clear           : true ,
        } ) ;

/*------------------------------------------------------------------------
 * frame solver
 *------------------------------------------------------------------------
 */
        this.frameSol = new Solver({
            vertexShader    : vrc2VShader.value ,
            fragmentShader  : vrcFrmShader.value ,
            uniforms :{
                modelMatrix : {
                    type    : 'mat4',
                    value   : this.modelMatrix
                } ,
                viewMatrix  : {
                    type    : 'mat4',
                    value   : this.viewMatrix
                } ,
                projectionMatrix : {
                    type    : 'mat4',
                    value   : this.projectionMatrix
                } ,
                frameColor : { type: 'v4', value: [0.,0.,0.,1.] } ,
            } ,
            geometry        : frameGeometry ,
            cullFacing      : false ,
            cullFace        : 'back' ,
            depthTest       : true ,

            clear           : true ,
        } ) ;

/*------------------------------------------------------------------------
 * filament
 *------------------------------------------------------------------------
 */
        this.filament = new Solver({
            vertexShader:   DefaultVertexShader.value ,
            fragmentShader  :   filamentShader.value ,
            uniforms    : {
                inFtrgt : { type : 't', value : this.prev           } ,
                inStrgt : { type : 't', value : this.target         } ,
                crdtMap : { type : 't', value : this.crdtTxt        } ,
                filamentThickness: 
                    { type : 'f', value : this.filamentThickness  } ,
                domainResolution 
                        : { type : 'v3',value : this.domainResolution   } ,
                mx      : { type : 'f', value : this.mx                 } ,
                my      : { type : 'f', value : this.my                 } ,
                filamentThreshold   : 
                    { type : 'f', value : this.filamentThreshold        } ,
                filamentBorder: 
                    { type : 'f', value : this.filamentBorder           } ,
            } ,
            renderTargets   : {
                outTrgt : { location : 0 , target : this.flmt } ,
            } ,
            clear :false ,
        } ) ;
/*------------------------------------------------------------------------
 * projectedCrds
 *------------------------------------------------------------------------
 */
        this.projectedCrds = new Float32Texture(
            this.dispWidth,
            this.dispHeight,
        ) ;

        this.projectCrds = new Solver({
            vertexShader    :   vrc2VShader.value,
            fragmentShader  :   vrcPCShader.value,
            uniforms :{
                modelMatrix : {
                    type    : 'mat4',
                    value   : this.modelMatrix
                } ,
                viewMatrix  : {
                    type    : 'mat4',
                    value   : this.viewMatrix
                } ,
                projectionMatrix : {
                    type    : 'mat4',
                    value   : this.projectionMatrix
                } ,
                backfaceCrdTxt : {
                    type    : 's',
                    value   : this.backfaceCrdTxt ,
                    minFilter : 'nearest' ,
                    magFilter : 'nearest' ,
                    wrapS   : 'clamp_to_edge' ,
                    wrapT   : 'clamp_to_edge' ,
                } ,
                phaseTxt    : {
                    type    : 's',
                    value   : this.phaseField,
                    minFilter: 'nearest',
                    magFilter: 'nearest',
                } ,
                target      : {
                    type    : 's',
                    value   : this.target ,
                    minFilter: 'nearest',
                    magFilter: 'nearest',
                } ,
                usePhaseField: {
                    type    : 'b',
                    value   : this.usePhaseField
                } ,
                minValue    : {
                    type    : 'f',
                    value   : this.minValue
                } ,
                maxValue    : {
                    type    : 'f',
                    value   : this.maxValue
                } ,
                threshold   : {
                    type    : 'f',
                    value   : this.threshold
                } ,
                channelMultiplier: {
                    type    : 'v4',
                    value   : this.channelMultiplier
                } ,
                noSteps       : {
                    type    : 'i',
                    value   : this.noSteps
                } ,
                mx          : {
                    type    : 'f' ,
                    value   : this.mx ,
                } ,
                my          : {
                    type    : 'f',
                    value   : this.my ,
                } ,
                clickPenetration : {
                    type    : 'f',
                    value   : this.clickPenetration ,
                } ,
            } ,
            renderTargets :{
                FragColor : {
                    location    : 0,
                    target      : this.projectedCrds ,
                } ,
            } ,
            geometry        : cubeGeometry ,
            cullFacing      : true ,
            cullFace        : 'back' ,
            depthTest       : true ,
            clear           : true ,
        } ) ;
    
    
/*------------------------------------------------------------------------
 * clickCoordinate
 *------------------------------------------------------------------------
 */
        this.clickCoordinates   = new Float32Texture(1,1) ;
        this.clickVoxelCrd      = new Float32Texture(1,1) ;
        this.clickPosition      = [0.,0.] ;
        this.clickVoxelProbe    = new Probe(this.clickVoxelCrd) ;
        this.clickVoxelPosition = [0.,0.] ;

        this.clickCoordinator = new Solver({
            vertexShader    : DefaultVertexShader.value ,
            fragmentShader  : vrcClickCrdShader.value ,
            uniforms        : {
                projectedCrds : {
                    type        : 't' ,
                    value       : this.projectedCrds ,
                } ,
                clickPosition : {
                    type        : 'v2' ,
                    value       : this.clickPosition ,
                } ,
            } ,
            renderTargets   : {
                clickCoordinates : {
                    location    : 0 ,
                    target      : this.clickCoordinates ,
                }
            } ,
            clear : true ,
        } ) ;

        this.clickVoxelCoordinator = new Solver({
            vertexShader    : DefaultVertexShader.value ,
            fragmentShader  : vrcClickVoxelCrdShader.value,
            uniforms   : {
                mx  : { type : 'f', value : this.mx } ,
                my  : { type : 'f', value : this.my } ,
                useCompMap : { type : 'b', value : this.useCompMap },
                compMap : { type : 't', value : this.compMap } ,
                clickCoordinates : { type : 't',
                    value :  this.clickCoordinates } ,
            } ,
            renderTargets : {
                voxelPos : { location : 0 , target : this.clickVoxelCrd } ,
            } ,
            clear : true ,
        } ) ;

/*------------------------------------------------------------------------
 * foreground
 *------------------------------------------------------------------------
 */
        this.fcanvas = document.createElement('canvas') ;
        this.fcanvas.width = this.canvas.width ;
        this.fcanvas.height= this.canvas.height ;
        this.fcontext = this.fcanvas.getContext('2d') ;




        this.messages = [] ;

    } 
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
    
/*------------------------------------------------------------------------
 * setClickPenetration
 *------------------------------------------------------------------------
 */
    setClickPenetration (cp){
        if ( cp != undefined ){
            this.clickPenetration = cp ;
        }
        this.projectCrds.setUniform('clickPenetration',
                this.clickPenetration) ;
        this.projectCrds.render() ;
    }
    setCP(cp){
         this.setClickPenetration(cp) ;
    }

/*------------------------------------------------------------------------
 * updateClickCoordinate
 *------------------------------------------------------------------------
 */
    updateClickCoordinates(clickPosition){
        this.clickPosition = clickPosition ;
        this.controler.update() ;
        mat4.scale(
            this.viewMatrix,
            this.viewMatrix, [
                this.scale,
                this.scale,
                this.scale,
                this.scale
            ] ) ;

        this.pass1.setUniform(
            'viewMatrix',
            this.viewMatrix
        ) ;
        this.projectCrds.setUniform(
            'viewMatrix',
            this.viewMatrix
        ) ;
        this.clickCoordinator.setUniform(
            'clickPosition',
            this.clickPosition ,
        ) ;

        this.pass1.render() ;
        this.projectCrds.render() ;
        this.clickCoordinator.render() ;
        this.clickVoxelCoordinator.render() ;
    }

    updateClickPosition(cc){
        this.updateClickCoordinates(cc) ;
    }
/*------------------------------------------------------------------------
 * structural_alpha
 *------------------------------------------------------------------------
 */
    get structural_alpha(){
        return this._structural_alpha ;
    }

    set structural_alpha(sa){
        this._structural_alpha = sa ;
        this.light.uniforms.structural_alpha.value 
            = this.structural_alpha ;
        this.pass2.uniforms.structural_alpha.value 
            = this.structural_alpha ;
    }

/*------------------------------------------------------------------------
 * getClickVoxelPosition
 *------------------------------------------------------------------------
 */
    getClickVoxelPosition (){
        var voxel = this.clickVoxelProbe.getPixel() ;
        this.clickVoxelPosition[0] = voxel[0] ;
        this.clickVoxelPosition[1] = voxel[1] ;
        return this.clickVoxelPosition ;
    }

    getClickVoxel(){
        return this.getClickVoxelPosition() ;
    }

/*------------------------------------------------------------------------
 * messages to appear on foreground
 *------------------------------------------------------------------------
 */
    addMessage (message, x, y, options ){
        var msg = new Message( message, x,y, options);
        this.messages.push(msg) ;
        this.initForeground() ;
        return msg ;
    }

/*------------------------------------------------------------------------
 * write all messages
 *------------------------------------------------------------------------
 */
    writeMessages (){
        for (var i=0 ; i < this.messages.length; i++){
            var message = this.messages[i] ;
            if (message.visible){
                this.fcontext.font = message.font ;
                this.fcontext.fillStyle = message.style ;
                this.fcontext.textAlign = message.align ;
                this.fcontext.fillText( message.text,
                                        this.canvas.width*message.x,
                                        this.canvas.height*message.y );
            }
        }
    }

/*------------------------------------------------------------------------
 * drawColorbar
 *------------------------------------------------------------------------
 */
    drawColorbar () {
        if (this.colorbar){
            this.fcontext.fillStyle = "#FFFFFF" ;
            this.fcontext.fillRect( this.canvas.width/4 - 40 ,
                                    this.canvas.height - 38,
                                    this.canvas.width/2 + 2*40  ,
                                    30 ) ;

            this.fcontext.fillStyle = "#000000" ;
            this.fcontext.textAlign = 'end' ;
            this.fcontext.fillText(     this.minValue + this.unit,
                                    this.canvas.width/4,
                                    this.canvas.height - 30 + 13) ;
            this.fcontext.textAlign = 'start' ;
            this.fcontext.fillText(     this.maxValue + this.unit,
                                    this.canvas.width*3/4,
                                    this.canvas.height - 30 + 13) ;


        this.fcontext.drawImage(    this.clrm.image,this.canvas.width/4,
                                    this.canvas.height - 30 ,
                                    this.canvas.width/2,16) ;
        }
        this.clrm.image.vrc = this ;
        this.clrm.image.init = function(e){
            e.composedPath()[0].vrc.initForeground() ;
            e.composedPath()[0].vrc.render() ;
        }
        this.clrm.image.onload = (e) => this.clrm.image.init(e) ;
    }

/*------------------------------------------------------------------------
 * showColorbar
 *------------------------------------------------------------------------
 */
    showColorbar (){
        this.colorbar = true ;
        this.initForeground() ;
    }

/*------------------------------------------------------------------------
 * hideColorbar
 *------------------------------------------------------------------------
 */
    hideColorbar (){
        this.colorbar = false ;
        this.initForeground() ;
    }

/*------------------------------------------------------------------------
 * initForeground
 *------------------------------------------------------------------------
 */
    initForeground () {
        this.fcontext.clearRect(    0,  0,
                                    this.canvas.width,
                                    this.canvas.height  ) ;
        this.writeMessages() ;
        this.drawColorbar() ;
    }

/*------------------------------------------------------------------------
 * setLightShift
 *------------------------------------------------------------------------
 */
    setLightShift (lf){
        this.lightShift = readOption(lf,    this.lightShift ) ;
        this.light.setUniform('lightShift', this.lightShift ) ;
        this.pass2.setUniform('lightShift', this.lightShift ) ;
        this.light.render() ;
    }

/*------------------------------------------------------------------------
 * setColormap
 *------------------------------------------------------------------------
 */
    setColormap (clrmName){
        if (clrmName != undefined ){
            this.clrmName = clrmName ;
        }
        this.clrm = this.colormaps[this.clrmName] ;
        this.pass2.setUniform( 'clrm', this.clrm.texture ) ;
        this.initForeground() ;
    }

/*------------------------------------------------------------------------
 * setMinValue
 *------------------------------------------------------------------------
 */
    setMinValue (val){
        this.minValue = val ;
        this.pass2.setUniform('minValue', this.minValue ) ;
        this.light.setUniform('minValue', this.minValue ) ;
        this.light.render() ;
        this.initForeground() ;
    }

/*------------------------------------------------------------------------
 * setMaxValue
 *------------------------------------------------------------------------
 */
    setMaxValue (val){
        this.maxValue = val ;
        this.pass2.setUniform('maxValue', this.maxValue ) ;
        this.light.setUniform('maxValue', this.maxValue ) ;
        this.light.render() ;
        this.initForeground() ;
    }

/*-------------------------------------------------------------------------
 * setThreshold
 *-------------------------------------------------------------------------
 */
    setThreshold (val){
        this.threshold = readOption(val, this.threshold ) ;
        this.light.setUniform('threshold', this.threshold ) ;
        this.pass2.setUniform('threshold', this.threshold ) ;
    }

/*------------------------------------------------------------------------
 * setAlphaCorrection
 *------------------------------------------------------------------------
 */
    setAlphaCorrection (ac){
        this.alphaCorrection = readOption(ac, this.alphaCorrection) ;
        this.light.setUniform('alphaCorrection', this.alphaCorrection) ;
        this.pass2.setUniform('alphaCorrection', this.alphaCorrection) ;
        this.light.render() ;
    }

/*------------------------------------------------------------------------
 * setNoSteps
 *------------------------------------------------------------------------
 */
    setNoSteps (_ns){
        this.noSteps = readOption(_ns, this.noSteps) ;
        this.pass2.setUniform('noSteps', this.noSteps ) ;
    }

/*------------------------------------------------------------------------
 * setRayCast
 *------------------------------------------------------------------------
 */
    setRayCast (_rc){
        this.rayCast = readOption(_rc, this.rayCast ) ;
        this.pass2.setUniform('rayCast', this.rayCast) ;
    }

/*------------------------------------------------------------------------
 * toggleRayCast
 *------------------------------------------------------------------------
 */
    toggleRayCast (){
        this.rayCast != this.rayCast ;
        this.setRayCast() ;
    }

/*------------------------------------------------------------------------
 * setShowXCut
 *------------------------------------------------------------------------
 */
    setShowXCut(_sc){
        this.showXCut = readOption(_sc, this.showXCut ) ;
        this.pass2.setUniform('showXCut', this.showXCut ) ;
    }

/*------------------------------------------------------------------------
 * setShowYCut
 *------------------------------------------------------------------------
 */
    setShowYCut(_sc){
        this.showYCut = readOption(_sc, this.showYCut ) ;
        this.pass2.setUniform('showYCut', this.showYCut ) ;
    }

/*------------------------------------------------------------------------
 * setShowZCut
 *------------------------------------------------------------------------
 */
    setShowZCut(_sc){
        this.showZCut = readOption(_sc, this.showZCut ) ;
        this.pass2.setUniform('showZCut', this.showZCut ) ;
    }

/*------------------------------------------------------------------------
 * setXLevel
 *------------------------------------------------------------------------
 */
    setXLevel (_l){
        this.xLevel = readOption(_l, this.xLevel ) ;
        this.pass2.setUniform('xLevel', this.xLevel ) ;
    }

/*------------------------------------------------------------------------
 * setYLevel
 *------------------------------------------------------------------------
 */
    setYLevel (_l){
        this.yLevel = readOption(_l, this.yLevel ) ;
        this.pass2.setUniform('yLevel', this.yLevel ) ;
    }

/*------------------------------------------------------------------------
 * setZLevel
 *------------------------------------------------------------------------
 */
    setZLevel (_l){
        this.zLevel = readOption(_l, this.zLevel ) ;
        this.pass2.setUniform('zLevel', this.zLevel ) ;
    }

/*------------------------------------------------------------------------
 * setDrawFilament
 *------------------------------------------------------------------------
 */
    setDrawFilament (_df){
        this.drawFilament = readOption(_df, this.drawFilament) ;
        this.pass2.setUniform('drawFilament',this.drawFilament) ;
    }

/*------------------------------------------------------------------------
 * showFilamend
 *------------------------------------------------------------------------
 */
    showFilamend (){
        this.setDrawFilament(true) ;
    }

/*------------------------------------------------------------------------
 * hideFilament
 *------------------------------------------------------------------------
 */
    hideFilament (){
        this.setDrawFilament(false) ;
    }

/*------------------------------------------------------------------------
 * toggleFilament
 *------------------------------------------------------------------------
 */
    toggleFilament (){
        this.drawFilament != this.drawFilament() ;
        this.pass2.setUniform('drawFilament',this.drawFilament) ;
    }

/*------------------------------------------------------------------------
 * setFilamentThreshold
 *------------------------------------------------------------------------
 */
    setFilamentThreshold (_ft){
        this.filamentThreshold = readOption(_ft, this.filamentThreshold) ;
        this.filament.setUniform('filamentThreshold',
                this.filamentThreshold) ;
    } ;

/*------------------------------------------------------------------------
 * setFilamentBorder
 *------------------------------------------------------------------------
 */
    setFilamentBorder (_fb){
        this.filamentBorder = readOption(_fb, this.filamentBorder ) ;
        this.filament.setUniform('filamentBorder', this.filamentBorder) ;
    }

/*------------------------------------------------------------------------
 * setFilamentColor
 *------------------------------------------------------------------------
 */
    setFilamentColor (_fc){
        this.filamentColor = readOption(_fc, this.filamentColor ) ;
        this.pass2.setUniform('filamentColor', this.filamentColor ) ;
    }

/*------------------------------------------------------------------------
 * render
 *------------------------------------------------------------------------
 */
    rrender (){

        if ( !this.rayCast && this.drawFilament){
            this.filament.render() ;
            if ( !this.prevDefined )
                this.copyTrgt2Prev.render() ;
        }
        var s = this.scale ;
        if (gl.canvas.width!=this.canvas.width) {
            gl.canvas.width = this.canvas.width ;
        }if (gl.canvas.height != this.canvas.height){
            gl.canvas.height= this.canvas.height ;
        }
        gl.viewport(0,0, this.canvas.width, this.canvas.height) ;
        this.context.clearRect(  0 ,   0,
                                this.canvas.width,
                                this.canvas.height  ) ;
        this.controler.update() ;
        mat4.scale( this.viewMatrix, this.viewMatrix, [s,s,s,s] ) ;
        this.pass1.setUniform('viewMatrix', this.viewMatrix) ;
        this.pass2.setUniform('viewMatrix', this.viewMatrix) ;
        this.frameSol.setUniform('viewMatrix',this.viewMatrix) ;
        this.pass1.render() ;
        this.pass2.render() ;
        this.context.drawImage(  gl.canvas,0,0       ) ;
        if ( !this.usePhaseField ){
            this.frameSol.render() ;
            this.context.drawImage(  gl.canvas,0,0       ) ;
        }
        this.context.drawImage(  this.fcanvas, 0,0   ) ;
    }

    render (){
        this.rrender() ;
        this.rrender() ;
    }
}

/*========================================================================
 * TextureTableBond
 *========================================================================
 */ 
class Float32TextureTableBond{
    
/*------------------------------------------------------------------------
 * constructor
 *------------------------------------------------------------------------
 */
    constructor( options={}){
        if ( options.target == undefined && options.texture == undefined ){
            return null ;
        } ;

        this.texture = readOptions( options.target , null ) ;
        this.texture = readOptions( options.texture, this.target ) ;
    
        this.framebuffer = gl.createFramebuffer() ;
        gl.bindFramebuffer( gl.READ_FRAMEBUFFER, this.framebuffer) ;
        gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
                                gl.TEXTURE_2D,
                                this.target.texture, 0 ) ;
        gl.readBuffer( gl.COLOR_ATTACHMENT0 ) ;
        this.canRead    = (
            gl.checkFramebufferStatus(gl.READ_FRAMEBUFFER)
            == gl.FRAMEBUFFER_COMPLETE
        ) ;
        gl.bindFramebuffer( gl.READ_FRAMEBUFFER, null) ;

        this.width  = this.target.width ;
        this.height = this.target.height ;
        this.table   = readOption(options.table, 
                new Float32Array(this.width*this.height*4 ) ) ;
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*------------------------------------------------------------------------
 * getter and setter functions
 *------------------------------------------------------------------------
 */
    get texture(){ return this._texture ; }
    set texture(v){ this._texture = v ; } 
    
    get target(){ return this.texture ; }
    set target(val){ 
        this._texture = val ; 
    }

/*------------------------------------------------------------------------
 * setTexture
 *------------------------------------------------------------------------
 */
    setTexture(trgt){
        this.target = readOption( trgt, this.target ) ;
    }
    
/*------------------------------------------------------------------------
 * tex2tab
 *------------------------------------------------------------------------
 */
    tex2tab(txt){
        this.target = readOption(txt, this.target) ;

        gl.bindFramebuffer( gl.READ_FRAMEBUFFER, this.framebuffer) ;
        gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
                            gl.TEXTURE_2D,
                            this.target.texture, 0 ) ;
        gl.readBuffer( gl.COLOR_ATTACHMENT0 ) ;
        gl.readPixels(  0, 0,this.width,this.height, 
                gl.RGBA, gl.FLOAT, this.table ) ;
        gl.bindFramebuffer( gl.READ_FRAMEBUFFER, null) ;   
    }

/*------------------------------------------------------------------------
 * tab2tex
 *------------------------------------------------------------------------
 */
    tab2tex(tab){
        this.table = readOption(tab, this.table ) ;
        gl.bindTexture(gl.TEXTURE_2D, this.target.texture ) ;
        gl.texImage2D( gl.TEXTURE_2D, 0 , gl.RGBA32F,
        this.width, this.height, 0, gl.RGBA, gl.FLOAT, this.table ) ;
        gl.bindTexture(gl.TEXTURE_2D, null) ;
    }

}

/*========================================================================
 * Probe  : probe a location for the value of a channel
 *
 * options:
 *      - renderer  : renderer to be used (compulsory)
 *      - target    : render target to be probed ( compulsory )
 *      - channel   : preferred probed channel (r,g,b,a -- default = a )
 *      - probePosition   : position of the probe
 *========================================================================
 */
class Probe{
    constructor( target, options={} ){
        this.channel = readOption( options.channel, 'r') ;
        this.probePosition = readOption( options.probePosition, [0.5,0.5]) ;


        if ( target != undefined ){
            this.target = target ;
        }else return null ;
        this.channelMultiplier =
            getChannelMultiplier( this.channel ) ;


        this.pixelValue = new Float32Array(4) ;

/*------------------------------------------------------------------------
 * framebuffer
 *------------------------------------------------------------------------
 */
        this.framebuffer = gl.createFramebuffer() ;
        gl.bindFramebuffer( gl.READ_FRAMEBUFFER, this.framebuffer) ;
        gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
                                gl.TEXTURE_2D,
                                this.target.texture, 0 ) ;
        gl.readBuffer( gl.COLOR_ATTACHMENT0 ) ;
        this.canRead    = (
            gl.checkFramebufferStatus(gl.READ_FRAMEBUFFER)
            == gl.FRAMEBUFFER_COMPLETE
        ) ;
        gl.bindFramebuffer( gl.READ_FRAMEBUFFER, null) ;

    } 
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*------------------------------------------------------------------------
 * setPosition
 *------------------------------------------------------------------------
 */
    setPosition (pos){
        this.probePosition = readOption( pos , this.probePosition ) ;
    }

    set position(pos){
        this.probePosition = pos ;
    }
    get position(){
        return this.probePosition ;
    }

/*------------------------------------------------------------------------
 * setChannel
 *------------------------------------------------------------------------
 */
    setChannel(c){
        this.channel = c ;
        this.channelMultiplier =
            getChannelMultiplier( this.channel ) ;
    }

    set channel(c){
        this._channel = c ;
        this.channelMultiplier = getChannelMultiplier(this.channel) ;
    }
    get channel(){
        return this._channel ;
    }

/*------------------------------------------------------------------------
 * setTarget
 *------------------------------------------------------------------------
 */
    setTarget(trgt){
        this.target = trgt ;
    }

    set target(t){
        this._target = t ;
    }
    get target(){
        return this._target ;
    }

/*------------------------------------------------------------------------
 * getPixel : get the value of whole pixel
 *------------------------------------------------------------------------
 */
    getPixel(){
        if (this.canRead){
        var x = Math.floor(this.target.width   * this.probePosition[0]) ;
        var y = Math.floor(this.target.height  * this.probePosition[1]) ;
        gl.bindFramebuffer( gl.READ_FRAMEBUFFER, this.framebuffer) ;
        gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
                            gl.TEXTURE_2D,
                            this.target.texture, 0 ) ;
        gl.readBuffer( gl.COLOR_ATTACHMENT0 ) ;
        gl.readPixels(  x, y,1,1, gl.RGBA, gl.FLOAT, this.pixelValue ) ;
        gl.bindFramebuffer( gl.READ_FRAMEBUFFER, null) ;
        return this.pixelValue ;
        }else{
            return null ;
        }
    }

    get pixel(){
        return this.getPixel() ;
    }

/*------------------------------------------------------------------------
 * get      : get the value of a channel
 *------------------------------------------------------------------------
 */
    getValue (){
        this.getPixel() ;

        var g = this.pixelValue[0]*this.channelMultiplier[0] +
            this.pixelValue[1]*this.channelMultiplier[1] +
            this.pixelValue[2]*this.channelMultiplier[2] +
            this.pixelValue[3]*this.channelMultiplier[3] ;
        return g ;
    }

    get value(){
        return this.getValue() ;
    }

} /* end of Probe */

/*========================================================================
 * TextureReader
 *      target  : the target to read
 *========================================================================
 */
class TextureReader{
    constructor(target,options={}){
        if (target != undefined ){
            this._target = target ;
        }else return null ;
        
        this.framebuffer = gl.createFramebuffer() ;
        gl.bindFramebuffer( gl.READ_FRAMEBUFFER, this.framebuffer) ;
        gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
                                gl.TEXTURE_2D,
                                this.target.texture, 0 ) ;
        gl.readBuffer( gl.COLOR_ATTACHMENT0 ) ;

        this._readable =  (
            gl.checkFramebufferStatus(gl.READ_FRAMEBUFFER)
            == gl.FRAMEBUFFER_COMPLETE
        ) ;
        gl.bindFramebuffer( gl.READ_FRAMEBUFFER, null) ;

        this._buffer = new
            this.TypedArray(this.width*this.height*this.numberOfColors) ;
    }
/*------------------------------------------------------------------------
 * End of constructor
 *------------------------------------------------------------------------
 */
    get numberOfColors(){
        switch (GL(this.target.format)){
            case (gl.RED) : 
                return 1 ;
                break ;
            case (gl.RED_INTEGER)  :
                return 1 ;
                break ;
            case (gl.RG) :
                return 2 ;
                break ;
            case (gl.RG_INTEGER):
                return 2 ;
                break ;
            case (gl.RGB):
                return 3 ;
                break ;
            case (gl.RGB_INTEGER):
                return 3 ;
                break ;
            case (gl.RGBA):
                return 4 ;
                break ;
            case (gl.RGBA_INTEGER):
                return 4 ;
                break ;
            default :
                return 4 ;
                break ;
        }
    }

    get TypedArray(){
        switch ( GL(this.target.type) ){
            case (gl.BYTE):
                return Int8Array ;
                break ;
            case (gl.UNSIGNED_BYTE):
                return Uint8Array
                break ;

            case (gl.SHORT ) :
                return Int16Array ;
                break ;
            case (gl.UNSIGNED_SHORT ) :
                return Uint16Array ;
                break ;

            case (gl.INT ) :
                return Int32Array ;
                break ;
            case (gl.UNSIGNED_INT ) :
                return Uint32Array ;
                break ;

            case (gl.HALF_FLOAT ) :
                return Float16Array ;
                break ;
            case (gl.FLOAT ) :
                return Float32Array ;
                break ;
            default : 
                return Float32Array ;
        }
    }

    get format(){
        return this.target.format ;
    }

    get type(){
        return this.target.type ;
    }
    get target(){
        return this._target ;
    }

    get width(){
        return this.target.width ;
    }

    get height(){
        return this.target.height ;
    }

    get readable(){
        return this._readable ;
    }

    get buffer(){
        if(this.readable){
            gl.bindFramebuffer( 
                    gl.READ_FRAMEBUFFER, 
                    this.framebuffer        ) ;

            gl.framebufferTexture2D(
                    gl.READ_FRAMEBUFFER, 
                    gl.COLOR_ATTACHMENT0,
                    gl.TEXTURE_2D,
                    this.target.texture, 0  ) ;

            gl.readBuffer( gl.COLOR_ATTACHMENT0 ) ;

            gl.readPixels(  0, 0,this.width,this.height, 
                    GL(this.format), GL(this.type) , this._buffer ) ;

            gl.bindFramebuffer( gl.READ_FRAMEBUFFER, null) ;

            return this._buffer ;
        }else return null ;
    }

    get value(){
        return this.buffer ;
    }

    read(){
        return this.value ;
    }
}

/*========================================================================
 * ProbeRecorder
 *========================================================================
 */
class ProbeRecorder{
    constructor(probe, options){
        this.probe = probe ;
        this.sampleRate = 1 ;
        this.lastRecordedTime = -1 ;
        this.timeSeries = [] ;
        this.samples    = [] ;
        this.recording = false ;
        this.fileName ='samples.csv' ;

        if (options != undefined ){
            if (options.sampleRate != undefined){
                this.sampleRate = options.sampleRate ;
            }

            if (options.recording != undefined ){
                this.recording = options.recording ;
            }

            if (options.fileName != undefined ){
                this.fileName = options.fileName ;
            }
        }
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*------------------------------------------------------------------------
 * record(time) :   records probe with the required sample rate if
 *                  recording is requested.
 *
 *       time   :   recording current time ;
 *------------------------------------------------------------------------
 */
    record(time){
        if (this.recording){
            if (time > (this.lastRecordedTime + this.sampleRate)){
                this.timeSeries.push(time) ;
                this.lastRecordedTime = time ;
                this.samples.push(this.probe.getValue()) ;
            }
        }
    }

/*------------------------------------------------------------------------
 * stop         : stop recording
 *------------------------------------------------------------------------
 */
    stop(){
        this.recording = false ;
    }

/*------------------------------------------------------------------------
 * start        : start recording
 *------------------------------------------------------------------------
 */
    start(){
        this.recording = true ;
    }

/*------------------------------------------------------------------------
 * setRecordingStatus(recording)    : set this.recording
 *------------------------------------------------------------------------
 */
    setRecordingStatus(recording){
        this.recording = recording  ;
    }

/*------------------------------------------------------------------------
 * toggleRecording  : toggle recording status
 *------------------------------------------------------------------------
 */
    toggleRecording (){
        this.recording = !(this.recording) ;
    }

/*------------------------------------------------------------------------
 * setSampleRate(sampeRate)
 *------------------------------------------------------------------------
 */
    setSampleRate(sampleRate){
        this.sampleRate = sampleRate ;
    }

/*------------------------------------------------------------------------
 * setProbe(probe)  : set a new probe
 *------------------------------------------------------------------------
 */
    setProbe(pb){
        this.probe = pb ;
    }

/*------------------------------------------------------------------------
 * setFileName(fileName)
 *------------------------------------------------------------------------
 */
    setFileName (fn){
        this.fileName = fn ;
    }

/*------------------------------------------------------------------------
 * resetRecording
 *------------------------------------------------------------------------
 */
    resetRecording (){
        this.timeSeries = [] ;
        this.samples    = [] ;
        this.lastRecordedTime = -1 ;
    }
/*------------------------------------------------------------------------
 * reset
 *------------------------------------------------------------------------
 */
    reset (){
        this.resetRecording() ;
    }

/*------------------------------------------------------------------------
 * save
 *------------------------------------------------------------------------
 */
    save (){
        var csvContent = "data:text;charset=utf-8,";
        for(var i=0;i<this.samples.length;i++){
            csvContent+= this.timeSeries[i]+'\t'+this.samples[i]+'\n' ;
        }
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", this.fileName);
        link.click() ;
    }

}   /* end of ProbeRecorder */

/*========================================================================
 * IntervalCaller
 *========================================================================
 */
class IntervalCaller{
    constructor( options={} ){
        this.interval = readOption(options.interval, 1      ) ;
        this.callback = readOption(options.callback, function(){} ) ;
        this.active   = readOption(options.active, false    ) ;
        this.lastCall = readOption(options.currTime, 1e10   ) ;

        this.timeDiff = 0 ;
        this.lastCall = -1e10 ;
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*------------------------------------------------------------------------
 * setInetrval
 *------------------------------------------------------------------------
 */
    reset(){
        this.lastCall = -1e10 ;
    }

/*------------------------------------------------------------------------
 * setInetrval
 *------------------------------------------------------------------------
 */
    setInterval (intr){
        this.interval = intr ;
    }

/*------------------------------------------------------------------------
 * toggleActive
 *------------------------------------------------------------------------
 */
    toggleActive(){
        this.active = !(this.active) ;
    }

/*------------------------------------------------------------------------
 *
 *------------------------------------------------------------------------
 */
    toggle (){
        this.active = !this.active ;
    }

/*------------------------------------------------------------------------
 * setActive
 *------------------------------------------------------------------------
 */
    setActive(){
        this.active = true ;
    }

/*------------------------------------------------------------------------
 * setInactive
 *------------------------------------------------------------------------
 */
    setInactive(){
        this.active = false ;
    }

/*------------------------------------------------------------------------
 * setActivity
 *------------------------------------------------------------------------
 */
    setActivity (state){
        this.active = readOption(state, this.active ) ;
    }

/*------------------------------------------------------------------------
 * setCallback
 *------------------------------------------------------------------------
 */
    setCallback (cb){
        this.callback = cb ;
    }

/*------------------------------------------------------------------------
 * call the callback function if necessary
 *------------------------------------------------------------------------
 */
    call (ctime){
        if (this.lastCall > ctime ){
            this.lastCall = ctime  ;
        }
        this.timeDiff = ctime - this.lastCall ;
        if ( this.timeDiff >= this.interval ){
            this.lastCall = ctime ;
            this.timeDiff = 0 ;
            if ( this.active == true ){
                this.callback() ;
            }
        }
    }
} /* end of IntervalCaller */

/*========================================================================
 * saveCanvas
 *========================================================================
 */
function saveCanvas(canvasId, options){
    var link = document.createElement('a') ;
    link.href = document.getElementById(canvasId).toDataURL() ;

    var prefix   = '' ;
    var postfix  = '' ;
    var number   = '' ;
    var format   = 'png' ;
    var download = 'download';

    if ( options != undefined ){
        if ( options.prefix != undefined ){
            prefix = options.prefix ;
            download = '' ;
        }

        if ( options.postfix != undefined ){
            postfix = options.postfix ;
            download = '' ;
        }

        if ( options.number != undefined ){
            download = '' ;
            var t = Math.floor(options.number) ;
            if ( t<1000 ){
                number = '000'+ t.toString() ;
            }else if (t<10000){
                number = '00'+t.toString() ;
            }else if (t<100000){
                number = '0'+t.toString() ;
            }else{
                number = t.toString() ;
            }
        }

        if (options.format != undefined ){
            format = options.format ;
        }
    }

    link.download = download + prefix + number + postfix + '.' + format ;
    var clickEvent = new MouseEvent("click", {
        "view": window,
        "bubbles": true,
        "cancelable": false
    });

    link.dispatchEvent(clickEvent) ;
} /* end of saveCanvas */

/*========================================================================
 * APD
 *========================================================================
 */
class APD{
    constructor( target,  opts={}){
        this.target         = target ;
        this.currVal        = undefined ;
        this.apCounts       = readOption( opts.apCounts,    10  ) ;
        this.threshold      = readOption( opts.threshold,   -75 ) ;
        this.channel        = readOption( opts.channel,     'r' ) ;
        this.avgApd         = 0;
        this.noApsMeasured  = 0 ;
        this.measuring      = readOption( opts.measuring , false ) ;
        this.apStarted      = false ;
        this.apIncomplete   = true ;
        this.apStartTime    = undefined ;
        this.apEndTime      = undefined ;
        this.apd            = undefined ;
        this.probePosition = readOption( opts.probePosition, [.5,.5] ) ;

        this.probe = new Probe(this.target, {
                channel : this.channel,
                probePosition : this.probePosition } ) ;
    }
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
 * CONSTRUCTOR ENDS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*------------------------------------------------------------------------
 * getAvgApd    : getAvgValue of APD
 *------------------------------------------------------------------------
 */
    getAvgApd(){
        return this.avgApd ;
    }

/*------------------------------------------------------------------------
 * setMeasuring
 *------------------------------------------------------------------------
 */
    setMeasuring ( measuring ){
        this.measuring = readOption( measuring, this.measuring ) ;
    }

/*------------------------------------------------------------------------
 * toggleMeasuring
 *------------------------------------------------------------------------
 */
    toggleMeasuring (){
        this.measuring = ! this.measuring ;
    }

/*------------------------------------------------------------------------
 * startMeasuring
 *------------------------------------------------------------------------
 */
    startMeasuring (){
        this.measuring = true ;
    }

/*------------------------------------------------------------------------
 * stopMeasuring
 *------------------------------------------------------------------------
 */
    stopMeasuring (){
        this.measuring = false ;
    }


/*------------------------------------------------------------------------
 * reset
 *------------------------------------------------------------------------
 */
    reset (ropts={}){
        this.noApsMeasured  = 0 ;
        this.apStarted      = false ;
        this.apIncomplete   = true ;
        this.apStartTime    = undefined ;
        this.apEndTime      = undefined ;
        this.apd            = 0 ;
        this.avgApd         = 0 ;
        this.apCounts =
            readOption( ropts.apCounts, this.apCounts ) ;
        this.threshold =
            readOption ( ropts.threshold, this.threshold);
        this.channel =
            readOption( ropts.channel, this.channel ) ;
        this.target =
            readOption( ropts.target, this.target ) ;
        this.probePosition =
            readOption( ropts.probePosition, this.probePosition ) ;
        this.measuring = readOption( ropts.measuring, this.measuring ) ;

        this.probe.setChannel(this.channel) ;
        this.probe.setPosition(this.probePosition) ;
        this.probe.setTarget(this.target) ;
    }

/*------------------------------------------------------------------------
 * measure      : measure APD
 *------------------------------------------------------------------------
 */
    measure ( currTime ){
        if ( ! this.measuring ){
            return ;
        }
        if ( this.noApsMeasured >= this.apCounts )
            return this.getAvgApd() ;

        this.currVal = this.probe.getValue() ;
        if (this.apIncomplete){
            /*  check if A.P.
                just completed       */
            if (this.currVal < this.threshold){
                this.apIncomplete = false ;
                this.apEndTime = currTime ;
                if (this.apStarted){
                    this.apd = this.apEndTime - this.apStartTime ;
                    this.avgApd =
                        (this.apd + this.avgApd*this.noApsMeasured)/
                        (this.noApsMeasured+1) ;
                    this.noApsMeasured += 1 ;
                    this.apStarted = false ;
                }
            }
        }else if (!this.apStarted){
            /*  Check if a new A.P.
                just started        */
            if( this.currVal > this.threshold ){
                this.apStarted      = true ;
                this.apIncomplete   = true;
                this.apStartTime    = currTime ;
            }
        }

        return this.getAvgApd() ;
    } /* end of measure */

} /* end of APD */

/*========================================================================
 * resizeRenderTargets
 *========================================================================
 */
function resizeRenderTargets( targets, width, height ){
    for (var i=0 ; i< targets.length;  i++  ){
        targets[i].resize(width,height) ;
    }
    return ;
}

/*========================================================================
 * setUniformInSolvers
 *========================================================================
 */
function setUniformInSolvers( name,value, solvers ){
    for( var i=0; i< solvers.length; i++ ){
        solvers[i].setUniform(name , value ) ;
    }
    return ;
}

/*========================================================================
 * setUniformsInSolvers
 *========================================================================
 */
function setUniformsInSolvers( names, values, solvers ){
    for (var i=0; i < names.length; i++){
        setUniformInSolvers( names[i], values[i], solvers ) ;
    }
}

/*========================================================================
 * CtrlClickListener
 *========================================================================
 */
function CtrlClickListener( __object, __callback, options={}){
    this.object     = __object ;
    this.callback   = __callback ;
    this.onClick    = function(e){
        if ( e.ctrlKey & !e.shiftKey ){
            if ( (e.type == 'click') || (e.buttons >=1)){
                e.position = [
                    e.offsetX/this.object.width ,
                    1.-e.offsetY/this.object.height
                ] ;
                this.callback(e) ;
            }
        }
    }

    this.mousemove  = readOption(options.mousemove, false   ) ;
    this.click      = readOption(options.click, true        ) ;

    if ( this.mousemove ){
        this.object.addEventListener(
            'mousemove',
            (e) => this.onClick(e),
            false
        ) ;
    }

    if (this.click){
        this.object.addEventListener(
            'click',
            (e) => this.onClick(e),
            false
        ) ;
    }
}

/*========================================================================
 * ShiftClickListener
 *========================================================================
 */
function ShiftClickListener( __object, __callback, options={}){
    this.object     = __object ;
    this.callback   = __callback ;
    this.onClick    = function(e){
        if ( e.shiftKey & !e.ctrlKey ){
            if ( (e.type == 'click') || (e.buttons >=1)){
                e.position = [
                    e.offsetX/this.object.width ,
                    1.-e.offsetY/this.object.height
                ] ;
                this.callback(e) ;
            }
        }
    }

    this.mousemove  = readOption(options.mousemove, false   ) ;
    this.click      = readOption(options.click, true        ) ;

    if ( this.mousemove ){
        this.object.addEventListener(
            'mousemove',
            (e) => this.onClick(e),
            false
        ) ;
    }

    if (this.click){
        this.object.addEventListener(
            'click',
            (e) => this.onClick(e),
            false
        ) ;
    }
}

/*========================================================================
 * CommandClickListener
 *========================================================================
 */ 
function CommandClickListener(__object, __callback, options={}){
    this.object     = __object ;
    this.callback   = __callback ;
    this.onClick    = function(e){
        if ( !e.shiftKey & e.metaKey ){
            if ( (e.type == 'click') || (e.buttons >=1)){
                e.position = [
                    e.offsetX/this.object.width ,
                    1.-e.offsetY/this.object.height
                ] ;
                this.callback(e) ;
            }
        }
    }

    this.mousemove  = readOption(options.mousemove, false   ) ;
    this.click      = readOption(options.click, true        ) ;

    if ( this.mousemove ){
        this.object.addEventListener(
            'mousemove',
            (e) => this.onClick(e),
            false
        ) ;
    }

    if (this.click){
        this.object.addEventListener(
            'click',
            (e) => this.onClick(e),
            false
        ) ;
    }
}

/*========================================================================
 * DoubleClickListener
 *========================================================================
 */
function DoubleClickListener(__object, __callback, options={}){
    this.object = __object ;
    this.callback = __callback ;
    this.onClick = function(e){
        e.position = [
                    e.offsetX/this.object.width ,
                    1.-e.offsetY/this.object.height
                ] ;

        var clickTime = new Date().getTime();
        var deltaT = clickTime - gl.lastClickTime ;
        gl.lastClickTime = clickTime ;
        if (deltaT>600) {
            return ;
        }
        this.callback(e) ;
    }
    this.object.addEventListener(
            'mousedown',
            (e) => this.onClick(e),
            false ) ;
}

/*========================================================================
 * LongClickListener
 *========================================================================
 */
function LongClickListener( __object, __callback, options={}){
    this.object = __object ;
    this.callback = __callback ;
    this.duration = readOptions( options.duration, 1000 ) ;
    this.movementTolerance =
        readOptions( options.movementTolerance, 0.05 ) ;

    this.onMousedown = function(e){
        e.position = [
                    e.offsetX/this.object.width ,
                    1.-e.offsetY/this.object.height
                ] ;
        gl.__clickPosition = e.position ;
        var clickTime = new Date().getTime();
        gl.lastClickTime = clickTime ;
    }

    this.onMouseup = function(e){
        e.position = [
                    e.offsetX/this.object.width ,
                    1.-e.offsetY/this.object.height
                ] ;
        var releaseTime = new Date().getTime() ;
        var deltaT = releaseTime - gl.lastClickTime ;
        var deltaX = e.position[0] - gl.__clickPosition[0] ;
        var deltaY = e.position[1] - gl.__clickPosition[1] ;
        var deltaL = Math.sqrt( deltaX*deltaX + deltaY*deltaY ) ;

        if (    (deltaT > this.duration) &&
                (deltaL < this.movementTolerance )
            ){
            this.callback(e) ;
        }

    }

    this.object.addEventListener(
            'mousedown',
            (e) => this.onMousedown(e),
            false ) ;
    this.object.addEventListener(
            'mouseup',
            (e) => this.onMouseup(e),
            false ) ;

}

/*========================================================================
 * CtrlShiftClickListener
 *========================================================================
 */
function CtrlShiftClickListener( __object, __callback, options={}){
    this.object     = __object ;
    this.callback   = __callback ;
    this.onClick    = function(e){
        if ( e.shiftKey & e.ctrlKey ){
            if ( (e.type == 'click') || (e.buttons >=1)){
                e.position = [
                    e.offsetX/this.object.width ,
                    1.-e.offsetY/this.object.height
                ] ;
                this.callback(e) ;
            }
        }
    }

    this.mousemove  = readOption(options.mousemove, false   ) ;
    this.click      = readOption(options.click, true        ) ;

    if ( this.mousemove ){
        this.object.addEventListener(
            'mousemove',
            (e) => this.onClick(e),
            false
        ) ;
    }

    if (this.click){
        this.object.addEventListener(
            'click',
            (e) => this.onClick(e),
            false
        ) ;
    }
}


/*========================================================================
 * ClickListener
 *========================================================================
 */
function ClickListener( __object, __callback, options={}){
    this.object     = __object ;
    this.callback   = __callback ;
    this.onClick    = function(e){
        var deltaT = clickTime - gl.lastClickTime ;
        gl.lastClickTime = new Date().getTime() ;
        if (deltaT<600) {
            return ;
        }

        if ( (e.type == 'click') || (e.buttons >=1)){
            e.position = [
                e.offsetX/this.object.width ,
                1.-e.offsetY/this.object.height
            ] ;
            this.callback(e) ;
        }
    }


    this.mousemove  = readOption(options.mousemove, false   ) ;
    this.click      = readOption(options.click, true        ) ;

    if ( this.mousemove ){
        this.object.addEventListener(
            'mousemove',
            (e) => this.onClick(e),
            false
        ) ;
    }

    if (this.click){
        this.object.addEventListener(
            'click',
            (e) => this.onClick(e),
            false
        ) ;
    }
}

/*========================================================================
 * Storage : Store Values using LocalStorage
 *========================================================================
 */
class Storage{
    constructor(options={}){
        this.storage = localStorage ;
        this.prefix = readOption( options.prefix, "") ;
    }

/*------------------------------------------------------------------------
 * store
 *------------------------------------------------------------------------
 */
    store(name, value){
        this.storage.setItem(this.prefix+name, value) ;
    }

/*------------------------------------------------------------------------
 * get
 *------------------------------------------------------------------------
 */
    get(name){
        return this.storage.getItem(this.prefix+name) ;
    }

/*------------------------------------------------------------------------
 * getFloat
 *------------------------------------------------------------------------
 */
    getFloat(name){
        return parseFloat(this.get(name)) ;
    }

/*------------------------------------------------------------------------
 * storeList
 *------------------------------------------------------------------------
 */
    storeList( names, values ){
        for(var i=0; i<names.length; i++){
            this.store(names[i], values[i]) ;
        }
    }

/*------------------------------------------------------------------------
 * restoreFloatList
 *------------------------------------------------------------------------
 */
    restoreFloatList( vars, names ){
        for(var i=0; i< vars.length ; i++){
            vars[i] = this.getFloat( names[i]) ;
        }
    }

/*------------------------------------------------------------------------
 * restoreValue
 *------------------------------------------------------------------------
 */
    restoreValue( variable, name ){
        variable = this.get(name) ;
    }

/*------------------------------------------------------------------------
 * storeAsXML
 *------------------------------------------------------------------------
 */
    storeAsXML(options={}){
        var xml = readOption(options.xml, undefined ) ;
        var obj = readOption(options.object,undefined) ;
        obj = readOption(options.obj, obj ) ;
        if( obj == undefined ){
            warn('You need to define "object"') ;
        }

        var names = readOption(options.names, [] ) ;


        function xmlAdd( name, value ){
            var type = typeof(value) ;
            return '\t<data id="'+
                                name+
                '" type="'
                                +type+'">'
                                            +value+
            '</data>\n' ;
        }

        var fileName = readOption(options.fileName, 'download.xml') ;
        var stream =  '<?xml version="1.0" encoding="utf-8"?>\n' ;
        stream += '<xml>\n' ;

        for( var i=0 ; i< names.length ; i++){
            var name = names[i] ;
            stream += xmlAdd( name , obj[name] ) ;
        }
        stream += '</xml>' ;

        this.store(xml, stream) ;
    }

/*------------------------------------------------------------------------
 * restoreFromXML
 *------------------------------------------------------------------------
 */
    restoreFromXML(options={}){
        var xml = readOption(options.xml, undefined ) ;
        var obj = readOption(options.object,undefined) ;
        obj = readOption(options.obj, obj ) ;
        if( obj == undefined ){
            warn('You need to define "object"') ;
        }
        var names = readOption(options.names, undefined , 'You need to define "names"' ) ;

        if ( obj == undefined || names == undefined ){
            warn( 'Insuficient information was provided' ) ;
            warn( 'Exit without loading from XML file') ;
            return ;
        }
        var callback = readOption(options.callback, function(){} ) ;

        var stream = this.get(xml) ;

        if (stream){
            var parser = new DOMParser() ;
            var doc = parser.parseFromString(stream, "text/xml") ;

            for (var i=0; i<names.length ; i++){
                var name = names[i] ;
                var v = doc.getElementById(name) ;
                var type ;
                if (v){
                    type = v.getAttribute('type') ;
                    switch (type){
                        case 'number':
                            obj[name] = eval( v.innerHTML ) ;
                            break ;
                        case 'boolean':
                            obj[name] = eval( v.innerHTML ) ;
                            break ;
                        case 'object':
                            var strArray = v.innerHTML.split(',') ;
                            for(var i=0 ; i<strArray.length; i++){
                                obj[name][i] = eval(strArray[i]) ;
                            }
                            break ;

                        default:
                            obj[name] = v.innerHTML ;
                            break ;
                    }
                }
            }
            callback() ;
        }
    }
} /* end of Storage Class */

/*=========================================================================
 * saveToXML    :   save variables from and object to xml file
 *
 *      options :
 *          - obj   :   parent object that contains variables
 *          - names :   array of names of children of the obj to be saved
 *          - fileName: default name for the xml file to be saved to disk
 *=========================================================================
 */
    function saveToXML( options={}){
        var obj = readOption(options.object,undefined) ;
        obj = readOption(options.obj, obj ) ;
        if( obj == undefined ){
            warn('You need to define "object"') ;
        }
        var names = readOption(options.names, [] ) ;


        function xmlAdd( name, value ){
            var type = typeof(value) ;
            return '\t<data id="'+
                                name+
                '" type="'
                                +type+'">'
                                            +value+
            '</data>\n' ;
        }

        var fileName = readOption(options.fileName, 'download.xml') ;
        var stream =  '<?xml version="1.0" encoding="utf-8"?>\n' ;
        stream += '<xml>\n' ;

        for( var i=0 ; i< names.length ; i++){
            var name = names[i] ;
            stream += xmlAdd( name , obj[name] ) ;
        }
        stream += '</xml>' ;

        var link = document.createElement('a') ;
        link.download = fileName ;
        var blob = new Blob([stream], {type:'text/plain'});

        if (window.URL != null)
        {
            // Chrome allows the link to be clicked
            // without actually adding it to the DOM.
            link.href =
                window.URL.createObjectURL(blob);
        }
        else
        {
            // Firefox requires the link to be added to the DOM
            // before it can be clicked.
            link.href =
                window.URL.createObjectURL(blob);
            link.onclick = destroyClickedElement;
            link.style.display = "none";
            document.body.appendChild(link);
        }
        var clickEvent = new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
        });

        link.dispatchEvent(clickEvent) ;
    }

/*========================================================================
 * xorwow   : creates a random integer between 0 and (2^32-1)
 *========================================================================
 */  
    var randomState = new Uint32Array(5) ;
    randomState[0] = 123456789 ;
    randomState[1] = 362436069 ;
    randomState[2] = 521288629 ;
    randomState[3] = 88675123 ;
    randomState[4] = 5783321 ;

    function xorwow(){
        var s = new Uint32Array(1) ;
        var t = new Uint32Array(1) ;
        t[0]= randomState[3];
	t[0] ^= t[0] >> 2;
	t[0] ^= t[0] << 1;
	randomState[3] = randomState[2]; randomState[2] = randomState[1]; 
        s[0] = randomState[0]
        randomState[1] = s[0]  ;
	t[0] ^= s[0];
	t[0] ^= s[0] << 4;	
	randomState[0] = t[0];
        randomState[4] += 362437 ;
        s[0] =  t[0] + randomState[4] ;
	return s[0];
    }

/*========================================================================
 * random   : creates a 
 *========================================================================
 */ 
    function random(){
        return xorwow()/4294967295.0 ;
    }


/*========================================================================
 * TinyMT (Tiny Mersenne Twister) : A random number generator that can be
 * initialized using 3 values to create unique streams. Additionally, a
 * seed value can be used to uniformly initialize the processors.
 *
 * Usage : var tmt = new TinyMT(options) ;
 *
 * Options 
 * -------
 *      mat1  (default = 0)     : first  id
 *      mat2  (default = 0)     : second id
 *      tmat  (default = 0)     : tempering number
 *      seed  (default = 0)     : seed number for the generator
 *  
 *========================================================================
 */ 
class TinyMT{
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  CONSTRUCTOR BEGINS
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
    constructor(opts={}){
        // constants .....................................................
        this._MEXP      = 127 ;
        this._SH0       = 1 ;
        this._SH1       = 10 ;
        this._SH8       = 8 ;
        this._MASK      = 0x7fffffff ;
        this._MIN_LOOP  = 8 ;
        this._PRE_LOOP  = 8 ;

        // creating the unsigned variables ...............................
        this._state = new Uint32Array(4) ;
        this._mat   = new Uint32Array(4) ;

        // reading options ...............................................
        this._mat[0] = readOption(opts.mat1 , 0 ) ;
        this._mat[1] = readOption(opts.mat2 , 0 ) ;
        this._mat[2] = readOption(opts.tmat , 0 ) ;
        this._mat[3] = readOption(opts.seed , 0 ) ;
        this._linearityCheck = readOption( opts.linearityCheck, false) ;

        this.init() ;
    } // end of constructor ----------------------------------------------

/*------------------------------------------------------------------------
 * Getters and setters
 *------------------------------------------------------------------------
 */
    // getter only for constants and read-only variables ~~~~~~~~~~~~~~~~~
    get MEXP    (){ return this._MEXP       ; } 
    get SH0     (){ return this._SH0        ; }
    get SH1     (){ return this._SH1        ; }
    get SH8     (){ return this._SH8        ; }
    get MASK    (){ return this._MASK       ; }
    get MIN_LOOP(){ return this._MIN_LOOP   ; }
    get PRE_LOOP(){ return this._PRE_LOOP   ; }
    get state   (){ return this._state      ; }
    get mat     (){ return this._mat        ; }

    get mat1(){
        return this.mat[0] ;
    }
    set mat1(val){
        this.mat[0] = readOption(val, this._mat[0] ) ;
        this.init() ;
    }

    get mat2(){
        return this.mat[1] ;
    }
    set mat2(val){
        this.mat[1] = readOption(val, this.mat2) ;
        this.init() ;
    }

    get tmat(){
        return this.mat[2] ;
    }
    set tmat(v){
        this.mat[2] = readOptions(v, this.tmat) ;
        this.init() ;
    }

    get seed(){
        return this.mat[3] ;
    }
    set seed(v){
        this.mat[3] = readOptions(v, this.seed) ;
        this.init() ;
    }


    get linearityCheck(){
        return this._linearityCheck ;
    }
    set linearityCheck(v){
        this._linearityCheck = v ;
        this.init() ;
    }

/*------------------------------------------------------------------------
 * iterate to the next state 
 *------------------------------------------------------------------------
 */
    nextState(){
        let y = this.state[3];
        let x = (this.state[0] & this.MASK)
            ^ this.state[1]
            ^ this.state[2];
        x ^= (x << this.SH0);
        y ^= (y >>> this.SH0) ^ x;
        this.state[0] = this.state[1];
        this.state[1] = this.state[2];
        this.state[2] = x ^ (y << this.SH1);
        this.state[3] = y;
        this.state[1] ^= (-(y & 1)>>>0) & this.mat1;
        this.state[2] ^= (-(y & 1)>>>0) & this.mat2;
    }
    
/*------------------------------------------------------------------------
 * initialize the generator
 *------------------------------------------------------------------------
 */
    init() {
        this.state[0] = this.seed ;
        this.state[1] = this.mat1 ;
        this.state[2] = this.mat2 ;
        this.state[3] = this.tmat ;
        for (let i = 1; i < this.MIN_LOOP; i++) {
            const  a = i & 3 ;
            const  b = (i-1) & 3 ;
            this.state[a] ^= i + Math.imul(1812433253,
                 (this.state[b]
                   ^ (this.state[b] >>> 30)));
        }

        for (let i = 0; i < this.PRE_LOOP; i++) {
            this.nextState();
        }
    }

/*------------------------------------------------------------------------
 * temper : temper the output by breaking F_2 linearity
 *------------------------------------------------------------------------
 */
    temper(){
        let t0 = new Uint32Array(1) ;
        let t1 = new Uint32Array(1) ;
        t0[0] = this.state[3];
        if (this.linearityCheck){
            t1[0] = this.state[0] ^ (this.state[2] >>> this.SH8);
        }else{
            t1[0] = this.state[0] + (this.state[2] >>> this.SH8);
        }

        t0[0] ^= t1[0] ;
        t0[0] ^= (-(t1[0] & 1)>>>0) & this.tmat;
        return t0[0] ;
    }

/*------------------------------------------------------------------------
 * randomUint32: generate an Uint32 random number
 *------------------------------------------------------------------------
 */
    randomUint32(){
        this.nextState() ;
        return this.temper() ;
    }

/*------------------------------------------------------------------------
 * randomFloat: generate a float random number between 0 and 1 
 *------------------------------------------------------------------------
 */
    randomFloat(){
        return (this.randomUint32())/4294967295. ;
    }
}


/*=========================================================================
 * loadFromXML :
 *      options:
 *          - input     :   input element on the page which loads the file
 *          - obj       :   parent object to be loaded
 *          - names     :   list of names of children of obj to be loaded
 *                          from xml file
 *          - callback  :   callback function to call when loading is
 *                          finished
 *=========================================================================
 */
    function loadFromXML(options={}){
        var input = readOption(options.input,undefined,
                'You need define "input" option') ;
        var obj = readOption(options.object,undefined) ;
        obj = readOption(options.obj, obj ) ;
        if( obj == undefined ){
            warn('You need to define "object"') ;
        }
        var names = readOption(options.names, undefined ,
                'You need to define "names"' ) ;

        if (    input == undefined ||
                obj == undefined ||
                names == undefined ){
            warn( 'Insuficient information was provided' ) ;
            warn( 'Exit without loading from XML file') ;
            return ;
        }
        var callback = readOption(options.callback, function(){} ) ;

        var file = input.files[0] ;
        var reader = new FileReader();
        var savedXml ;
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            savedXml = new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            savedXml=new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (file){
            reader.readAsDataURL(file) ;
        }


        reader.onload = function(){
            fileURL = reader.result ;

            savedXml.open("GET", fileURL, true);
            savedXml.send();

            savedXml.onreadystatechange = function() {
                if (savedXml.readyState == 4 && savedXml.status == 200) {
                    doc = savedXml.responseXML ;
                    for (var i=0; i<names.length ; i++){
                        var name = names[i] ;
                        var v = doc.getElementById(name) ;
                        var type ;
                        if (v){
                            type = v.getAttribute('type') ;
                            switch (type){
                                case 'number':
                                    obj[name] = eval( v.innerHTML ) ;
                                    break ;
                                case 'boolean':
                                    obj[name] = eval( v.innerHTML ) ;
                                    break ;
                                case 'object':
                                    var strArray = v.innerHTML.split(',') ;
                                    for(var i=0 ; i<strArray.length; i++){
                                        obj[name][i] = eval(strArray[i]) ;
                                    }
                                    break ;
                                default:
                                    obj[name] = v.innerHTML ;
                                    break ;
                            }
                        }
                    }
                    callback() ;
                } /* end of if Statement ) */
            } /* End of onreadystatechange */
        } /* End of reader.onload */
    }/* End of loadFromXML */

/*========================================================================
 * TextReader 
 *========================================================================
 */ 
class TextReader{
    constructor( options={} ){
        this._reader    = new FileReader() ;
        this.reader.owner = this ;
        this.reader.onload = function(){
            this.owner.content = this.result ;
            this.owner.callback() ;
        }

        this._input     = document.createElement('input') ;
        this.input.owner = this ;
        this.input.setAttribute('type', 'file') ;
        this.input.onchange = function(){
            var file = this.files[0] ;
            if (file){
                this.owner.reader.readAsText(file) ;
            }
        } ;

        this._content   = null ;

        this.callback = readOption(options.callback , function(){}  ) ;
        this.onload   = readOption(options.onload , this.callback   ) ;
    } /* End of Constructor */

    get click(){
        return this.input.click ;
    }
    get reader(){
        return this._reader ;
    }

    get target(){
        return this._target ;
    }

    set target(nt){
        this._target = nt ;
        this._target.content = this.content ;
    }

    get input(){
        return this._input ;
    }

    get callback(){
        return this._callback ;
    }
    set callback(nc){
        this._callback = nc ;
    }

    set onload(nf){
        this.callback = nf ;
    }
    get onload(){
        this.callback ;
    }

    get content(){
        return this._content ;
    }
    get result(){
        return this.content ;
    }
    get text(){
        return this._content ;
    }

    set content(nc){
        this._content = nc ;
        this.callback() ;
    }
    set result(nr){
        this.content = nr ;
    }
    set text(t){
        this.content = t ;
    }
    
    set onload(f){
        this.callback = f ;
    }
    get onload(){
        return this.callback ;
    }
}
/*========================================================================
 * 
 *========================================================================
 */
class TextWriter{
    constructor(options={}){
        this._link = document.createElement('a') ; 
        this._filename = readOptions(options.filename, 'output.txt') ;
        this._filename = readOptions(options.fileName, this.filename) ;
        this._text = null ;

        this.link.download = this.filename ;
        this.clickEvent = new MouseEvent('click',{
            'view': window ,
            'bubbles': true ,
            'cancelable' : false ,
        } ) ;
        this.callback = readOptions(options.callback , function(){}) ;
    }
    write( txt ){
        this.callback() ;
        this.text = readOptions(txt, this.text) ;
        var blob = new Blob([this.text], {type:'text/plain'}) ;

        this.link.href =
            window.URL.createObjectURL(blob);
        this.link.style.display = "none";

        // FireFox needs the link to be added to DOM before we can 
        // click the link
        document.body.appendChild(this.link);

        this.link.click() ; // Dispatching the click event
        
        document.body.removeChild(this.link);
    } 

    set callback(nc){
        this._callback = nc ;
    }

    get callback(){
        return this._callback ;
    }

    set onclick(nc){
        this.callback = nc ;
    }
    get onclick(){
        return this.callback ;
    }

    get onwrite(){
        return this.callback ;
    }
    set onwrite(nc){
        this.callback = nc ;
    }

    get onwriting(){
        return this.onwrite ;
    }
    set onwriting(nc){
        this.callback = nc ;
    }

    get save(){
        return this.write;
    }

    set text(nt){
        this._text = nt ;
        //this.write(nt) ;
    }
    get text(){
        return this._text ;
    }

    set filename(nf){
        this._filename = nf ;
        this.link.download = this.filename ;
    }

    set fileName(nf){
        this.filename = nf ;
    }

    get filename(){
        return this._filename ;
    }
    get fileName(){
        return this.filename ;
    }

    get link(){
        return this._link ;
    }

}

/*========================================================================
 * Gui  :   forks dat.GUI and adds updateDisplay functionality to the
 *          entirety of the gui
 *
 *          instead of new dat.GUI we can now use addPanel of the class
 *========================================================================
 */
class Gui{
    constructor(){
        this.panels = [] ;
    }

/*------------------------------------------------------------------------
 * create a new panel and add it to the gui
 *------------------------------------------------------------------------
 */
    addPanel(options={}){
        if ( dat != undefined ){
            var panel = new dat.GUI(options) ;
        this.panels.push(panel) ;
        }else{
            console.error('dat.gui.js is not loaded') ;
        }
        return panel ;
    }

/*------------------------------------------------------------------------
 * updateControllersDisplay     : update display for all conrolers
 *------------------------------------------------------------------------
 */
    updateControllersDisplay( controllers, verbose ){
        for(var c in controllers ){
            if(verbose) log('Controller : ', c) ;

            controllers[c].updateDisplay() ;
            if( typeof(controllers[c].__onChange) == 'function'){
                if (verbose) log('running onChange') ;
                controllers[c].__onChange() ;
            }
        }
    }

/*------------------------------------------------------------------------
 * updateFolderDisplay  : update display for all subfolder of a folder
 *------------------------------------------------------------------------
 */
    updateFolderDisplay( folder ,verbose ){
        for(var fldr in folder.__folders ){
            if (verbose) log( 'Entering folder :', fldr ) ;
            this.updateFolderDisplay(folder.__folders[fldr], verbose) ;
        }
        this.updateControllersDisplay( folder.__controllers , verbose ) ;
    }

/*------------------------------------------------------------------------
 * updateDisplay    :   updates all gui displays and runs onChange
 *                      callback functions
 *------------------------------------------------------------------------
 */
    updateDisplay(options={}){
        var verbose = readOption(options.verbose, false ) ;
        for(var panel in this.panels){
            this.updateFolderDisplay(this.panels[panel], verbose) ;
        }
    }

/*------------------------------------------------------------------------
 * update           : forks updateDisplay
 *------------------------------------------------------------------------
 */
    update(options={}){
        this.updateDisplay(options) ;
    }
    
/*------------------------------------------------------------------------
 * addCoeficients
 *------------------------------------------------------------------------
 */
    addCoeficients( fldr,
            env, 
            coefs,
            solvers ,
            options ){
        var coefGui = {} ;
        var min = undefined ;
        var max = undefined ;
        var step = undefined ;
        var callback = undefined ;
        if (options != undefined ){
            if (options.min != undefined ){
                min = options.min ;
            }
            if (options.max != undefined ){
                max = options.max ;
            }
            if (options.step !=undefined ){
                step = options.step ;
            } 
            if (options.callback != undefined){
                callback = options.callback ;
            }
        }
        for(var i=0; i<coefs.length; i++){
            var coef = addCoef(fldr,env,coefs[i],solvers, callback) ;
            if (min != undefined ){
                coef.min(min) ;
            }
            if (max != undefined ){
                coef.max(max) ;
            }
            if (step != undefined){
                coef.step(step) ;
            }
            coefGui[coefs[i]] = coef ;
        }
        return coefGui ;
        /* addCoef */
        function addCoef( fldr,
                env,
                coef,
                solvers, 
                callback ){
            var coefGui  ;
            if (callback != undefined ){
                coefGui =   fldr.add( env, coef )
                .onChange(
                        function(){
                        callback() ;
                        setUniformInSolvers(  coef,
                                env[coef],
                                solvers  ) ;
                        } ) ;

            }else{
            coefGui =   fldr.add( env, coef )
                .onChange(
                        function(){
                        setUniformInSolvers(  coef,
                                env[coef],
                                solvers  ) ;
                        } ) ;
            }
            return coefGui ;

        }
    }
}
/*========================================================================
 * MouseListener    : defines a mouse event listener
 *
 *  options:    
 *      canvas  :   the canvas that mouse events are associated to
 *      callback:   the callback function to run when the event happens
 *                  an event with the accurate coordinates of the 
 *                  click are sent to the callback function.
 *      event   :   the event to listen for (default: 'click')
 *                  any standard mouse event name acceptable by javascript
 *                  can be used. Additionally, 'drag' event is defined
 *                  to be used.
 *      shiftKey or shift   : true or false values to indicate Shift Key
 *                              combination with the event
 *      altKey or alt   : similar to shiftKey
 *      ctrlKey or ctrl : similar to shiftKey
 *      metaKey or meta : similar to shiftKey
 *
 *  Future features:
 *      adding minX, maxX, minY, maxY ;
 *      adding xrange, yrange ;
 *========================================================================
 */ 
class MouseListener{
    constructor(options){
        if (options == undefined){
            console.error('No options were provided and mouse listener'+
                    ' could not be defined!') ;
            return null ;
        }
        this._canvas    = readOptions(options.canvas ,  undefined       ) ;
        this._callback  = readOption(options.callback , function(){}    ) ;
        this._event     = readOption(options.event ,    'click'         ) ;

        this._shiftKey  = readOption(options.shiftKey , false           ) ;
        this._altKey    = readOption(options.altKey ,   false           ) ;
        this._ctrlKey   = readOption(options.ctrlKey ,  false           ) ;
        this._metaKey   = readOption(options.metaKey ,  false           ) ;
        
        this._shiftKey  = readOption(options.shift  ,   this.shiftKey   ) ;
        this._altKey    = readOption(options.alt ,      this.altKey     ) ;
        this._ctrlKey   = readOption(options.ctrl,      this.ctrlKey    ) ;
        this._metaKey   = readOption(options.meta,      this.metaKey    ) ;

        if (this.event != 'drag'){
            this.canvas.addEventListener(this.event,   
                    (e) =>this.call(this, e) ) ;
        }else{
            this.canvas.addEventListener('mousedown' ,  
                    (e) =>this.call(this, e)) ;
            this.canvas.addEventListener('mousemove',
                    (e)=>this.call(this,e));
        }
    }

    call(prnt, e){
        if ((prnt.event == 'drag') && (e.buttons < 1)) return ;
        if (prnt.shiftKey != e.shiftKey ) return ;
        if (prnt.ctrlKey != e.ctrlKey   ) return ;
        if (prnt.metaKey != e.metaKey   ) return ;
        if (prnt.altKey  != e.altKey    ) return ;

        var o = {} ;
        var u = 0 ;
        var v = 0 ;
        u = ( e.clientX 
                + document.documentElement.scrollLeft 
                - prnt.canvas.offsetLeft
                                            ) / prnt.width ;
        v = 1.    -   
                (   e.clientY 
                 + document.documentElement.scrollTop  
                 - prnt.canvas.offsetTop )/ prnt.height ;

        var offsetParent = prnt.canvas.offsetParent ;
        /* Fixing the location if the element is embeded
           in a <div> or table element.                 */
        while(offsetParent != null ){
            u -= offsetParent.offsetLeft/prnt.width ;
            v += offsetParent.offsetTop/prnt.height ;
            offsetParent = offsetParent.offsetParent ;
        }
       
        o.u = u ;
        o.v = v ;
        o.x = u ;
        o.y = v ;
        o.position = [ o.x , o.y ] ;
        o.uv = [o.u, o.v] ;
        o.xy = [o.x, o.y] ;
        o.event = e ;

        prnt.callback(o) ;
    }


    get event(){
        return this._event ;
    }

    get callback(){
        return this._callback  ;
    }

    set callback(cb){
        this._callback = cb ;
    }

    get canvas(){
        return this._canvas ;
    }

    get shiftKey(){
        return this._shiftKey ;
    }
    get altKey(){
        return this._altKey ;
    }
    get ctrlKey(){
        return this._ctrlKey ;
    }

    get metaKey(){
        return this._metaKey ;
    }

    get width(){
        return this.canvas.width ;
    }

    get height(){
        return this.canvas.height ;
    }

}
/*========================================================================
 * SourceCode
 *========================================================================
 */ 
class SourceCode{
    constructor(o={}){
        this._source    = readOptions(o.source   , null) ;
        this._filename  = readOptions(o.filename , 'shader.glsl');
        this._solvers   = readOptions(o.solvers ,  [] ) ;
        this._func      = readOptions(o.FUNCTION , null ) ;
        this._title     = readOptions(o.title , '');
        this._name      = readOptions(o.name , this.title ) ;
        this._parent    = readOptions(o.parent, undefined) ;
        this._callback  = readOptions(o.callback, function(){}) ;
        this.type = readOptions(o.type, 'fragmentShader') ;
    }
    get func(){
        return this._func ;
    }
    set func(nf){
        this._func = nf ;
    }

    set name(nn){
        this._name = nn ;
    }
    get name(){
        return this._name ;
    }
    get callback(){
        return this._callback ;
    }

    set callback(nc){
        this._callback = nc ;
    }

    set type(t){
        if (t == 'fragmentShader'){
            this._type = 0 ;
        }else if (t=='vertexShader'){
            this._type = 1 ;
        }else{
            this._type = 2 ;
        }
    }
    get type(){
        return this._type ;
    }

    get source(){
        return this._source ;
    }
    set source(ns){
        this._source = ns ;
        if (this.source.length < 15){
            return ;
        }
        for(var sol in this.solvers ){
            if (this.type == 0){
                this.solvers[sol].fragmentShader = this.source ;
            }else if (this.type == 1){
                this.solvers[sol].vertexShader = this.source ;
            }
        }
        if ( this.type == 2 ){
            try{
                this.func = new Function( "return " + this.source )() ;
            }catch(e){} 
        }
        try{
            this.callback() ;
        }catch(e){
            console.warn(e) ;
        }
    }
    
    get filename(){
        return this._filename ;
    }

    set filename(nf){
        this._filename = nf ;
    }

    set title(nt){
        this._title = nt ;
    }

    get title(){
        return this._title ;
    }
    
    get solvers(){
        return this._solvers ;
    }
}

/*========================================================================
 * Editor
 *========================================================================
 */ 
class Editor{
    constructor(o={}){
        var sources = readOptions(o.sources, {}) ;
        this._sources = [] ;
        this._editorId = readOptions(o.editor, '') ;
        this._editorId = readOptions(o.id, this.id ) ;
        this._editorId = readOptions(o.editorId, this.id ) ;
        this._callback = readOptions(o.callback, function(){}) ;
        this._theme    = readOptions(o.theme, 'ace/theme/tomorrow') ;
        this._mode     = readOptions(o.mode, 'ace/mode/glsl') ;
        this._options = readOptions(o.options, {} ) ;
        this._active = 0 ;
        this._names = [] ;
        this._titles = [] ;
        this._modes = [] ;
        this._on = readOptions(o.on , 'change') ;
        try{
            
            this.editor = ace.edit(this.id) ;
            this.editor.setTheme(this.theme);
            this.editor.getSession().setMode(this.mode) ;
            this.editor.setOptions(this.options);
            this.editor.on('change', (e) => this.update(e)) ;
        }catch(e){
            console.error(e) ;
            return null ;
        }
        for(var i in sources){
            var so = sources[i] ;
            this.names.push(i) ;
            this.modes.push( readOptions(so.mode, this.mode ) ) ;
            this.titles.push(sources[i].title) ;
            so.name = i ;
            so.parent = this ;
            this._sources.push(new SourceCode(sources[i])) ;
        }
        this.active = readOptions(o.active, null ) ;

        this.setValue() ;

        this._reader = new TextReader() ;
        this.reader.owner = this ;
        this.reader.onload = function(){
            var result = this.result ;
            this.owner.editor.setValue(result) ;
            this.owner.editor.clearSelection() ;
        } ;
        this._writer = new TextWriter({filename: this.active.filename}) ;
        this.writer.owner = this ;
        this.writer.onclick = function(){
            this.owner.filename = this.owner.filename ;
            this.owner.writer.text = this.owner.editor.getValue() ;
        } ;

    } // End of constructor
    
    set options(opts){
        this._options = opts ;
        this.setOptions(opts) ;
    }
    get options(){
        return this._options ;
    }
    get setOption(){
        return this.editor.setOption ;
    }

    get setOptions(){
        return this.editor.setOptions ;
    }

    get mode(){
        return this._mode ;
    }
    set mode(nm){
        this._mode = nm ;
        this.editor.getSession().setMode(this.mode) ;
    }

    get modes(){
        return this._modes ;
    }
    set modes(nm){
        this._modes = nm ;
    }
    get theme(){
        return this._theme ;
    }
    set theme(nt){
        this._theme = nt ;
        this.editor.setTheme(this.theme) ;
    }

    load(){
        this.reader.input.click() ;
    }
    get filename(){
        return this.active.filename ;
    }

    set filename(nf){
        this.active.filename = nf ;
        this.writer.filename = nf ;
    }

    get writer(){
        return this._writer ;
    }
    set writer(nw){
        this._writer = nw ;
    }

    get reader(){
        return this._reader ;
    }

    save(){
        this.writer.save() ;
    }

    get callback(){
        return this._callback ;
    }

    set callback(nc){
        this._callback = nc ;
    }

    get name(){
        return this.active.name ;
    }
    set name(nn){
        this.active = nn ;
    }

    get names(){
        return this._names ;
    }

    get titles(){
        return this._titles ;
    }

    get editing(){
        return this.active.name ;
    }

    set editing(nn){
        this.active = nn ;
    }

    get title(){
        return this.active.title ;
    }

    set title(nt){
        this.active = nt ;
    }
    update(e){
        if (this.editor.getValue().length > 15){
            this.active.source = this.editor.getValue() ;
            this.callback() ;
        }
    }
    setValue(nv){
        if (nv != undefined ){
            this.active.source = nv ;
        }

        this.editor.setValue(this.active.source) ;
        this.editor.clearSelection() ;
            
    }
    get sources(){
        return this._sources ;
    }

    get active(){
        return this.sources[this._active] ;
    }

    set active(s){
        for(var i in this.sources){
            if (s   == this.sources[i].title || 
                s   == this.sources[i].name     ){
                this._active = i ;
                this.mode = this.modes[i] ;
                this.editor.setValue(this.active.source) ;
                this.editor.clearSelection() ;
                return ;
            }
        }
    }

    get editorId(){
        return this._editorId ;
    }

    get id(){
        return this._editorId ;
    }
}

/*************************************************************************
 * The structure to be returned as CompGL
 *************************************************************************
 */
this.cgl                 = cgl ;
this.gl                  = gl ;
this.ComputeGL           = ComputeGL ;
this.LineGeometry        = LineGeometry ;
this.UnitCubeGeometry    = UnitCubeGeometry ;
this.Texture             = Texture ;

this.Int32Texture        = Int32Texture ;
this.Int32RenderTarget   = Int32Texture ;
this.IntegerTexture      = Int32Texture ;
this.IntegetRenderTarget = Int32Texture ;

this.Uint32Texture        = Uint32Texture ;
this.Uint32RenderTarget   = Uint32Texture ;
this.UintegerTexture      = Uint32Texture ;
this.UintegetRenderTarget = Uint32Texture ;

this.Float32RTexture     = Float32RTexture ;
this.R32FTexture         = Float32RTexture ;

this.Float32Texture      = Float32Texture;
this.RGBA32FTexture      = Float32Texture;
this.FloatTexture        = Float32Texture;
this.FloatRenderTarget   = Float32Texture ;

this.ImageTexture        = ImageTexture ;
this.TableTexture        = TableTexture ;
this.CanvasTexture       = CanvasTexture ;
this.LegacyCanvasTexture = LegacyCanvasTexture ;

this.Float32TextureTableBond         = Float32TextureTableBond ;

this.RgbaCompressedData              = RgbaCompressedData ;
this.RgbaCompressedDataFromImage     = RgbaCompressedDataFromImage ;
this.SparseDataFromImage             = RgbaCompressedDataFromImage ;
this.RgbaCompressedDataFromTexture   = RgbaCompressedDataFromTexture ;


this.Solver              = Solver ;
this.Copy                = Copy ;
this.setUniformInSolvers = setUniformInSolvers ;
this.setUniformsInSolvers= setUniformsInSolvers ;
this.resizeRenderTargets = resizeRenderTargets ;
this.copyTexture         = copyTexture ;
this.SignalPlot          = SignalPlot ;
this.Plot1D              = Plot1D ;
this.Plot2D              = Plot2D ;
this.Tvsx                = Tvsx ;
this.VolumeRayCaster     = VolumeRayCaster ;
this.getColormapList     = getColormapList ;
this.Probe               = Probe ;
this.TextureReader       = TextureReader ;
this.ProbeRecorder       = ProbeRecorder ;
this.IntervalCaller      = IntervalCaller ;
this.saveCanvas          = saveCanvas ;
this.APD                 = APD ;

/* glMatrix             */
//this.glMatrix            = glMatrix.glMatrix ;
//this.mat2                = mat2 ;
//this.mat2d               = mat2d ;
//this.mat3                = mat3 ;
//this.mat4                = mat4 ;
//this.quat                = quat ;
//this.vec2                = vec2 ;
//this.vec3                = vec3 ;
//this.vec4                = vec4 ;

/* OrbitalCamera Control    */
this.OrbitalCameraControl= OrbitalCameraControl ;

/* Event Listeners          */
this.ClickListener       =   ClickListener;
this.DoubleClickListener =   DoubleClickListener;
this.CtrlClickListener   =   CtrlClickListener;
this.ShiftClickListener  =   ShiftClickListener;
this.CommandClickListener=   CommandClickListener ;
this.CtrlShiftClickListener = CtrlShiftClickListener ;
this.ShiftCtrlClickListener = CtrlShiftClickListener ;
this.LongClickListener   = LongClickListener ;

this.readOption      = readOption;

/* Storage */
this.Storage         = Storage ;
this.saveToXML       = saveToXML;
this.loadFromXML     = loadFromXML;
this.TextReader      = TextReader ;
this.TextWriter      = TextWriter ;
this.xorwow          = xorwow ;
this.random          = random ;
this.TinyMT          = TinyMT ;

this.Gui             = Gui ;
this.MouseListener   = MouseListener ;
this.MouseEventListener = MouseListener ;

/* Editor */
this.Editor    = Editor ;

} ;

try{
    define( [] , function(){
        console.log('Loading the library using require.js...') ;
        var abubu = Abubu ;
        Abubu = undefined ;
        return abubu ;
    } ) ;
}catch(e){
    console.log('Loaded the library without using require.js...') ;
}

