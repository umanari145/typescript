/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/call-bind/callBound.js":
/*!*********************************************!*\
  !*** ./node_modules/call-bind/callBound.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "./node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "./node_modules/call-bind/index.js":
/*!*****************************************!*\
  !*** ./node_modules/call-bind/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ "./node_modules/component-emitter/index.js":
/*!*************************************************!*\
  !*** ./node_modules/component-emitter/index.js ***!
  \*************************************************/
/***/ ((module) => {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),

/***/ "./node_modules/fast-safe-stringify/index.js":
/*!***************************************************!*\
  !*** ./node_modules/fast-safe-stringify/index.js ***!
  \***************************************************/
/***/ ((module) => {

module.exports = stringify
stringify.default = stringify
stringify.stable = deterministicStringify
stringify.stableStringify = deterministicStringify

var LIMIT_REPLACE_NODE = '[...]'
var CIRCULAR_REPLACE_NODE = '[Circular]'

var arr = []
var replacerStack = []

function defaultOptions () {
  return {
    depthLimit: Number.MAX_SAFE_INTEGER,
    edgesLimit: Number.MAX_SAFE_INTEGER
  }
}

// Regular stringify
function stringify (obj, replacer, spacer, options) {
  if (typeof options === 'undefined') {
    options = defaultOptions()
  }

  decirc(obj, '', 0, [], undefined, 0, options)
  var res
  try {
    if (replacerStack.length === 0) {
      res = JSON.stringify(obj, replacer, spacer)
    } else {
      res = JSON.stringify(obj, replaceGetterValues(replacer), spacer)
    }
  } catch (_) {
    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]')
  } finally {
    while (arr.length !== 0) {
      var part = arr.pop()
      if (part.length === 4) {
        Object.defineProperty(part[0], part[1], part[3])
      } else {
        part[0][part[1]] = part[2]
      }
    }
  }
  return res
}

function setReplace (replace, val, k, parent) {
  var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)
  if (propertyDescriptor.get !== undefined) {
    if (propertyDescriptor.configurable) {
      Object.defineProperty(parent, k, { value: replace })
      arr.push([parent, k, val, propertyDescriptor])
    } else {
      replacerStack.push([val, k, replace])
    }
  } else {
    parent[k] = replace
    arr.push([parent, k, val])
  }
}

function decirc (val, k, edgeIndex, stack, parent, depth, options) {
  depth += 1
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent)
        return
      }
    }

    if (
      typeof options.depthLimit !== 'undefined' &&
      depth > options.depthLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent)
      return
    }

    if (
      typeof options.edgesLimit !== 'undefined' &&
      edgeIndex + 1 > options.edgesLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent)
      return
    }

    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, i, stack, val, depth, options)
      }
    } else {
      var keys = Object.keys(val)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        decirc(val[key], key, i, stack, val, depth, options)
      }
    }
    stack.pop()
  }
}

// Stable-stringify
function compareFunction (a, b) {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}

function deterministicStringify (obj, replacer, spacer, options) {
  if (typeof options === 'undefined') {
    options = defaultOptions()
  }

  var tmp = deterministicDecirc(obj, '', 0, [], undefined, 0, options) || obj
  var res
  try {
    if (replacerStack.length === 0) {
      res = JSON.stringify(tmp, replacer, spacer)
    } else {
      res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer)
    }
  } catch (_) {
    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]')
  } finally {
    // Ensure that we restore the object as it was.
    while (arr.length !== 0) {
      var part = arr.pop()
      if (part.length === 4) {
        Object.defineProperty(part[0], part[1], part[3])
      } else {
        part[0][part[1]] = part[2]
      }
    }
  }
  return res
}

function deterministicDecirc (val, k, edgeIndex, stack, parent, depth, options) {
  depth += 1
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent)
        return
      }
    }
    try {
      if (typeof val.toJSON === 'function') {
        return
      }
    } catch (_) {
      return
    }

    if (
      typeof options.depthLimit !== 'undefined' &&
      depth > options.depthLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent)
      return
    }

    if (
      typeof options.edgesLimit !== 'undefined' &&
      edgeIndex + 1 > options.edgesLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent)
      return
    }

    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        deterministicDecirc(val[i], i, i, stack, val, depth, options)
      }
    } else {
      // Create a temporary object in the required way
      var tmp = {}
      var keys = Object.keys(val).sort(compareFunction)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        deterministicDecirc(val[key], key, i, stack, val, depth, options)
        tmp[key] = val[key]
      }
      if (typeof parent !== 'undefined') {
        arr.push([parent, k, val])
        parent[k] = tmp
      } else {
        return tmp
      }
    }
    stack.pop()
  }
}

// wraps replacer function to handle values we couldn't replace
// and mark them as replaced value
function replaceGetterValues (replacer) {
  replacer =
    typeof replacer !== 'undefined'
      ? replacer
      : function (k, v) {
        return v
      }
  return function (key, val) {
    if (replacerStack.length > 0) {
      for (var i = 0; i < replacerStack.length; i++) {
        var part = replacerStack[i]
        if (part[1] === key && part[0] === val) {
          val = part[2]
          replacerStack.splice(i, 1)
          break
        }
      }
    }
    return replacer.call(this, key, val)
  }
}


/***/ }),

/***/ "./node_modules/function-bind/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "./node_modules/function-bind/index.js":
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "./node_modules/get-intrinsic/index.js":
/*!*********************************************!*\
  !*** ./node_modules/get-intrinsic/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "./node_modules/has-symbols/index.js")();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! has */ "./node_modules/has/src/index.js");
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ "./node_modules/has-symbols/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ "./node_modules/has-symbols/shams.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "./node_modules/has/src/index.js":
/*!***************************************!*\
  !*** ./node_modules/has/src/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/object-inspect/index.js":
/*!**********************************************!*\
  !*** ./node_modules/object-inspect/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var $match = String.prototype.match;
var $slice = String.prototype.slice;
var $replace = String.prototype.replace;
var $toUpperCase = String.prototype.toUpperCase;
var $toLowerCase = String.prototype.toLowerCase;
var $test = RegExp.prototype.test;
var $concat = Array.prototype.concat;
var $join = Array.prototype.join;
var $arrSlice = Array.prototype.slice;
var $floor = Math.floor;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';
// ie, `has-tostringtag/shams
var toStringTag = typeof Symbol === 'function' && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? 'object' : 'symbol')
    ? Symbol.toStringTag
    : null;
var isEnumerable = Object.prototype.propertyIsEnumerable;

var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || (
    [].__proto__ === Array.prototype // eslint-disable-line no-proto
        ? function (O) {
            return O.__proto__; // eslint-disable-line no-proto
        }
        : null
);

function addNumericSeparator(num, str) {
    if (
        num === Infinity
        || num === -Infinity
        || num !== num
        || (num && num > -1000 && num < 1000)
        || $test.call(/e/, str)
    ) {
        return str;
    }
    var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof num === 'number') {
        var int = num < 0 ? -$floor(-num) : $floor(num); // trunc(num)
        if (int !== num) {
            var intStr = String(int);
            var dec = $slice.call(str, intStr.length + 1);
            return $replace.call(intStr, sepRegex, '$&_') + '.' + $replace.call($replace.call(dec, /([0-9]{3})/g, '$&_'), /_$/, '');
        }
    }
    return $replace.call(str, sepRegex, '$&_');
}

var utilInspect = __webpack_require__(/*! ./util.inspect */ "?2128");
var inspectCustom = utilInspect.custom;
var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;

module.exports = function inspect_(obj, options, depth, seen) {
    var opts = options || {};

    if (has(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (
        has(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
            : opts.maxStringLength !== null
        )
    ) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has(opts, 'customInspect') ? opts.customInspect : true;
    if (typeof customInspect !== 'boolean' && customInspect !== 'symbol') {
        throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
    }

    if (
        has(opts, 'indent')
        && opts.indent !== null
        && opts.indent !== '\t'
        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
    ) {
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    }
    if (has(opts, 'numericSeparator') && typeof opts.numericSeparator !== 'boolean') {
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    }
    var numericSeparator = opts.numericSeparator;

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
        if (obj === 0) {
            return Infinity / obj > 0 ? '0' : '-0';
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
    }
    if (typeof obj === 'bigint') {
        var bigIntStr = String(obj) + 'n';
        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') { depth = 0; }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return isArray(obj) ? '[Array]' : '[Object]';
    }

    var indent = getIndent(opts, depth);

    if (typeof seen === 'undefined') {
        seen = [];
    } else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect(value, from, noIndent) {
        if (from) {
            seen = $arrSlice.call(seen);
            seen.push(from);
        }
        if (noIndent) {
            var newOpts = {
                depth: opts.depth
            };
            if (has(opts, 'quoteStyle')) {
                newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function' && !isRegExp(obj)) { // in older engines, regexes are callable
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + $join.call(keys, ', ') + ' }' : '');
    }
    if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
        return typeof obj === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
        s += '</' + $toLowerCase.call(String(obj.nodeName)) + '>';
        return s;
    }
    if (isArray(obj)) {
        if (obj.length === 0) { return '[]'; }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
            return '[' + indentedJoin(xs, indent) + ']';
        }
        return '[ ' + $join.call(xs, ', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (!('cause' in Error.prototype) && 'cause' in obj && !isEnumerable.call(obj, 'cause')) {
            return '{ [' + String(obj) + '] ' + $join.call($concat.call('[cause]: ' + inspect(obj.cause), parts), ', ') + ' }';
        }
        if (parts.length === 0) { return '[' + String(obj) + ']'; }
        return '{ [' + String(obj) + '] ' + $join.call(parts, ', ') + ' }';
    }
    if (typeof obj === 'object' && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function' && utilInspect) {
            return utilInspect(obj, { depth: maxDepth - depth });
        } else if (customInspect !== 'symbol' && typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap(obj)) {
        var mapParts = [];
        mapForEach.call(obj, function (value, key) {
            mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
        });
        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
    }
    if (isSet(obj)) {
        var setParts = [];
        setForEach.call(obj, function (value) {
            setParts.push(inspect(value, obj));
        });
        return collectionOf('Set', setSize.call(obj), setParts, indent);
    }
    if (isWeakMap(obj)) {
        return weakCollectionOf('WeakMap');
    }
    if (isWeakSet(obj)) {
        return weakCollectionOf('WeakSet');
    }
    if (isWeakRef(obj)) {
        return weakCollectionOf('WeakRef');
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? '' : 'null prototype';
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? 'Object' : '';
        var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
        var tag = constructorTag + (stringTag || protoTag ? '[' + $join.call($concat.call([], stringTag || [], protoTag || []), ': ') + '] ' : '');
        if (ys.length === 0) { return tag + '{}'; }
        if (indent) {
            return tag + '{' + indentedJoin(ys, indent) + '}';
        }
        return tag + '{ ' + $join.call(ys, ', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote(s) {
    return $replace.call(String(s), /"/g, '&quot;');
}

function isArray(obj) { return toStr(obj) === '[object Array]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isDate(obj) { return toStr(obj) === '[object Date]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isRegExp(obj) { return toStr(obj) === '[object RegExp]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isError(obj) { return toStr(obj) === '[object Error]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isString(obj) { return toStr(obj) === '[object String]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isNumber(obj) { return toStr(obj) === '[object Number]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isBoolean(obj) { return toStr(obj) === '[object Boolean]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }

// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
function isSymbol(obj) {
    if (hasShammedSymbols) {
        return obj && typeof obj === 'object' && obj instanceof Symbol;
    }
    if (typeof obj === 'symbol') {
        return true;
    }
    if (!obj || typeof obj !== 'object' || !symToString) {
        return false;
    }
    try {
        symToString.call(obj);
        return true;
    } catch (e) {}
    return false;
}

function isBigInt(obj) {
    if (!obj || typeof obj !== 'object' || !bigIntValueOf) {
        return false;
    }
    try {
        bigIntValueOf.call(obj);
        return true;
    } catch (e) {}
    return false;
}

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has(obj, key) {
    return hasOwn.call(obj, key);
}

function toStr(obj) {
    return objectToString.call(obj);
}

function nameOf(f) {
    if (f.name) { return f.name; }
    var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
    if (m) { return m[1]; }
    return null;
}

function indexOf(xs, x) {
    if (xs.indexOf) { return xs.indexOf(x); }
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) { return i; }
    }
    return -1;
}

function isMap(x) {
    if (!mapSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakMapHas.call(x, weakMapHas);
        try {
            weakSetHas.call(x, weakSetHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakRef(x) {
    if (!weakRefDeref || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakRefDeref.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet(x) {
    if (!setSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakSetHas.call(x, weakSetHas);
        try {
            weakMapHas.call(x, weakMapHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement(x) {
    if (!x || typeof x !== 'object') { return false; }
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
}

function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
    }
    // eslint-disable-next-line no-control-regex
    var s = $replace.call($replace.call(str, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte(c) {
    var n = c.charCodeAt(0);
    var x = {
        8: 'b',
        9: 't',
        10: 'n',
        12: 'f',
        13: 'r'
    }[n];
    if (x) { return '\\' + x; }
    return '\\x' + (n < 0x10 ? '0' : '') + $toUpperCase.call(n.toString(16));
}

function markBoxed(str) {
    return 'Object(' + str + ')';
}

function weakCollectionOf(type) {
    return type + ' { ? }';
}

function collectionOf(type, size, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ', ');
    return type + ' (' + size + ') {' + joinedEntries + '}';
}

function singleLineValues(xs) {
    for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], '\n') >= 0) {
            return false;
        }
    }
    return true;
}

function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === '\t') {
        baseIndent = '\t';
    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), ' ');
    } else {
        return null;
    }
    return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent)
    };
}

function indentedJoin(xs, indent) {
    if (xs.length === 0) { return ''; }
    var lineJoiner = '\n' + indent.prev + indent.base;
    return lineJoiner + $join.call(xs, ',' + lineJoiner) + '\n' + indent.prev;
}

function arrObjKeys(obj, inspect) {
    var isArr = isArray(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
    var symMap;
    if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
            symMap['$' + syms[k]] = syms[k];
        }
    }

    for (var key in obj) { // eslint-disable-line no-restricted-syntax
        if (!has(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
            // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
            continue; // eslint-disable-line no-restricted-syntax, no-continue
        } else if ($test.call(/[^\w$]/, key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    if (typeof gOPS === 'function') {
        for (var j = 0; j < syms.length; j++) {
            if (isEnumerable.call(obj, syms[j])) {
                xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
            }
        }
    }
    return xs;
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/qs/lib/formats.js":
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/***/ ((module) => {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

module.exports = {
    'default': Format.RFC3986,
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return String(value);
        }
    },
    RFC1738: Format.RFC1738,
    RFC3986: Format.RFC3986
};


/***/ }),

/***/ "./node_modules/qs/lib/index.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "./node_modules/qs/lib/stringify.js");
var parse = __webpack_require__(/*! ./parse */ "./node_modules/qs/lib/parse.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "./node_modules/qs/lib/parse.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    allowSparse: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

var parseArrayValue = function (val, options) {
    if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
        return val.split(',');
    }

    return val;
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset, 'key');
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
            val = utils.maybeMap(
                parseArrayValue(part.slice(pos + 1), options),
                function (encodedVal) {
                    return options.decoder(encodedVal, defaults.decoder, charset, 'value');
                }
            );
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (part.indexOf('[]=') > -1) {
            val = isArray(val) ? [val] : val;
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options, valuesParsed) {
    var leaf = valuesParsed ? val : parseArrayValue(val, options);

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else if (cleanRoot !== '__proto__') {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = options.depth > 0 && brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options, valuesParsed);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
        obj = utils.merge(obj, newObj, options);
    }

    if (options.allowSparse === true) {
        return obj;
    }

    return utils.compact(obj);
};


/***/ }),

/***/ "./node_modules/qs/lib/stringify.js":
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getSideChannel = __webpack_require__(/*! side-channel */ "./node_modules/side-channel/index.js");
var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var isArray = Array.isArray;
var split = String.prototype.split;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaultFormat = formats['default'];
var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
    return typeof v === 'string'
        || typeof v === 'number'
        || typeof v === 'boolean'
        || typeof v === 'symbol'
        || typeof v === 'bigint';
};

var sentinel = {};

var stringify = function stringify(
    object,
    prefix,
    generateArrayPrefix,
    commaRoundTrip,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    format,
    formatter,
    encodeValuesOnly,
    charset,
    sideChannel
) {
    var obj = object;

    var tmpSc = sideChannel;
    var step = 0;
    var findFlag = false;
    while ((tmpSc = tmpSc.get(sentinel)) !== void undefined && !findFlag) {
        // Where object last appeared in the ref tree
        var pos = tmpSc.get(object);
        step += 1;
        if (typeof pos !== 'undefined') {
            if (pos === step) {
                throw new RangeError('Cyclic object value');
            } else {
                findFlag = true; // Break while
            }
        }
        if (typeof tmpSc.get(sentinel) === 'undefined') {
            step = 0;
        }
    }

    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = utils.maybeMap(obj, function (value) {
            if (value instanceof Date) {
                return serializeDate(value);
            }
            return value;
        });
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
        }

        obj = '';
    }

    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);
            if (generateArrayPrefix === 'comma' && encodeValuesOnly) {
                var valuesArray = split.call(String(obj), ',');
                var valuesJoined = '';
                for (var i = 0; i < valuesArray.length; ++i) {
                    valuesJoined += (i === 0 ? '' : ',') + formatter(encoder(valuesArray[i], defaults.encoder, charset, 'value', format));
                }
                return [formatter(keyValue) + (commaRoundTrip && isArray(obj) && valuesArray.length === 1 ? '[]' : '') + '=' + valuesJoined];
            }
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (generateArrayPrefix === 'comma' && isArray(obj)) {
        // we need to join elements in
        objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : void undefined }];
    } else if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? prefix + '[]' : prefix;

    for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value = typeof key === 'object' && typeof key.value !== 'undefined' ? key.value : obj[key];

        if (skipNulls && value === null) {
            continue;
        }

        var keyPrefix = isArray(obj)
            ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(adjustedPrefix, key) : adjustedPrefix
            : adjustedPrefix + (allowDots ? '.' + key : '[' + key + ']');

        sideChannel.set(object, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(values, stringify(
            value,
            keyPrefix,
            generateArrayPrefix,
            commaRoundTrip,
            strictNullHandling,
            skipNulls,
            encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            format,
            formatter,
            encodeValuesOnly,
            charset,
            valueSideChannel
        ));
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && typeof opts.encoder !== 'undefined' && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        format: format,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
    if (opts && 'commaRoundTrip' in opts && typeof opts.commaRoundTrip !== 'boolean') {
        throw new TypeError('`commaRoundTrip` must be a boolean, or absent');
    }
    var commaRoundTrip = generateArrayPrefix === 'comma' && opts && opts.commaRoundTrip;

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    var sideChannel = getSideChannel();
    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            commaRoundTrip,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.format,
            options.formatter,
            options.encodeValuesOnly,
            options.charset,
            sideChannel
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ "./node_modules/qs/lib/utils.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    /* eslint no-param-reassign: 0 */
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset, kind, format) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== 'string') {
        string = String(str);
    }

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
            || (format === formats.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        /* eslint operator-linebreak: [2, "before"] */
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

var maybeMap = function maybeMap(val, fn) {
    if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
        }
        return mapped;
    }
    return fn(val);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    maybeMap: maybeMap,
    merge: merge
};


/***/ }),

/***/ "./node_modules/side-channel/index.js":
/*!********************************************!*\
  !*** ./node_modules/side-channel/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");
var inspect = __webpack_require__(/*! object-inspect */ "./node_modules/object-inspect/index.js");

var $TypeError = GetIntrinsic('%TypeError%');
var $WeakMap = GetIntrinsic('%WeakMap%', true);
var $Map = GetIntrinsic('%Map%', true);

var $weakMapGet = callBound('WeakMap.prototype.get', true);
var $weakMapSet = callBound('WeakMap.prototype.set', true);
var $weakMapHas = callBound('WeakMap.prototype.has', true);
var $mapGet = callBound('Map.prototype.get', true);
var $mapSet = callBound('Map.prototype.set', true);
var $mapHas = callBound('Map.prototype.has', true);

/*
 * This function traverses the list returning the node corresponding to the
 * given key.
 *
 * That node is also moved to the head of the list, so that if it's accessed
 * again we don't need to traverse the whole list. By doing so, all the recently
 * used nodes can be accessed relatively quickly.
 */
var listGetNode = function (list, key) { // eslint-disable-line consistent-return
	for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
		if (curr.key === key) {
			prev.next = curr.next;
			curr.next = list.next;
			list.next = curr; // eslint-disable-line no-param-reassign
			return curr;
		}
	}
};

var listGet = function (objects, key) {
	var node = listGetNode(objects, key);
	return node && node.value;
};
var listSet = function (objects, key, value) {
	var node = listGetNode(objects, key);
	if (node) {
		node.value = value;
	} else {
		// Prepend the new node to the beginning of the list
		objects.next = { // eslint-disable-line no-param-reassign
			key: key,
			next: objects.next,
			value: value
		};
	}
};
var listHas = function (objects, key) {
	return !!listGetNode(objects, key);
};

module.exports = function getSideChannel() {
	var $wm;
	var $m;
	var $o;
	var channel = {
		assert: function (key) {
			if (!channel.has(key)) {
				throw new $TypeError('Side channel does not contain ' + inspect(key));
			}
		},
		get: function (key) { // eslint-disable-line consistent-return
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapGet($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapGet($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listGet($o, key);
				}
			}
		},
		has: function (key) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapHas($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapHas($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listHas($o, key);
				}
			}
			return false;
		},
		set: function (key, value) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if (!$wm) {
					$wm = new $WeakMap();
				}
				$weakMapSet($wm, key, value);
			} else if ($Map) {
				if (!$m) {
					$m = new $Map();
				}
				$mapSet($m, key, value);
			} else {
				if (!$o) {
					/*
					 * Initialize the linked list as an empty node, so that we don't have
					 * to special-case handling of the first node: we can always refer to
					 * it as (previous node).next, instead of something like (list).head
					 */
					$o = { key: {}, next: null };
				}
				listSet($o, key, value);
			}
		}
	};
	return channel;
};


/***/ }),

/***/ "./node_modules/superagent/lib/agent-base.js":
/*!***************************************************!*\
  !*** ./node_modules/superagent/lib/agent-base.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function Agent() {
  this._defaults = [];
}
for (var _i = 0, _arr = ['use', 'on', 'once', 'set', 'query', 'type', 'accept', 'auth', 'withCredentials', 'sortQuery', 'retry', 'ok', 'redirects', 'timeout', 'buffer', 'serialize', 'parse', 'ca', 'key', 'pfx', 'cert', 'disableTLSCerts']; _i < _arr.length; _i++) {
  const fn = _arr[_i];
  // Default setting for all requests from this agent
  Agent.prototype[fn] = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    this._defaults.push({
      fn,
      args
    });
    return this;
  };
}
Agent.prototype._setDefaults = function (request) {
  var _iterator = _createForOfIteratorHelper(this._defaults),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      const def = _step.value;
      request[def.fn](...def.args);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};
module.exports = Agent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBZ2VudCIsIl9kZWZhdWx0cyIsImZuIiwicHJvdG90eXBlIiwiYXJncyIsInB1c2giLCJfc2V0RGVmYXVsdHMiLCJyZXF1ZXN0IiwiZGVmIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9hZ2VudC1iYXNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIEFnZW50KCkge1xuICB0aGlzLl9kZWZhdWx0cyA9IFtdO1xufVxuXG5mb3IgKGNvbnN0IGZuIG9mIFtcbiAgJ3VzZScsXG4gICdvbicsXG4gICdvbmNlJyxcbiAgJ3NldCcsXG4gICdxdWVyeScsXG4gICd0eXBlJyxcbiAgJ2FjY2VwdCcsXG4gICdhdXRoJyxcbiAgJ3dpdGhDcmVkZW50aWFscycsXG4gICdzb3J0UXVlcnknLFxuICAncmV0cnknLFxuICAnb2snLFxuICAncmVkaXJlY3RzJyxcbiAgJ3RpbWVvdXQnLFxuICAnYnVmZmVyJyxcbiAgJ3NlcmlhbGl6ZScsXG4gICdwYXJzZScsXG4gICdjYScsXG4gICdrZXknLFxuICAncGZ4JyxcbiAgJ2NlcnQnLFxuICAnZGlzYWJsZVRMU0NlcnRzJ1xuXSkge1xuICAvLyBEZWZhdWx0IHNldHRpbmcgZm9yIGFsbCByZXF1ZXN0cyBmcm9tIHRoaXMgYWdlbnRcbiAgQWdlbnQucHJvdG90eXBlW2ZuXSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgdGhpcy5fZGVmYXVsdHMucHVzaCh7IGZuLCBhcmdzIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xufVxuXG5BZ2VudC5wcm90b3R5cGUuX3NldERlZmF1bHRzID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgZm9yIChjb25zdCBkZWYgb2YgdGhpcy5fZGVmYXVsdHMpIHtcbiAgICByZXF1ZXN0W2RlZi5mbl0oLi4uZGVmLmFyZ3MpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFnZW50O1xuIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLFNBQVNBLEtBQUssR0FBRztFQUNmLElBQUksQ0FBQ0MsU0FBUyxHQUFHLEVBQUU7QUFDckI7QUFFQSx3QkFBaUIsQ0FDZixLQUFLLEVBQ0wsSUFBSSxFQUNKLE1BQU0sRUFDTixLQUFLLEVBQ0wsT0FBTyxFQUNQLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUNOLGlCQUFpQixFQUNqQixXQUFXLEVBQ1gsT0FBTyxFQUNQLElBQUksRUFDSixXQUFXLEVBQ1gsU0FBUyxFQUNULFFBQVEsRUFDUixXQUFXLEVBQ1gsT0FBTyxFQUNQLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxFQUNMLE1BQU0sRUFDTixpQkFBaUIsQ0FDbEIsMEJBQUU7RUF2QkUsTUFBTUMsRUFBRTtFQXdCWDtFQUNBRixLQUFLLENBQUNHLFNBQVMsQ0FBQ0QsRUFBRSxDQUFDLEdBQUcsWUFBbUI7SUFBQSxrQ0FBTkUsSUFBSTtNQUFKQSxJQUFJO0lBQUE7SUFDckMsSUFBSSxDQUFDSCxTQUFTLENBQUNJLElBQUksQ0FBQztNQUFFSCxFQUFFO01BQUVFO0lBQUssQ0FBQyxDQUFDO0lBQ2pDLE9BQU8sSUFBSTtFQUNiLENBQUM7QUFDSDtBQUVBSixLQUFLLENBQUNHLFNBQVMsQ0FBQ0csWUFBWSxHQUFHLFVBQVVDLE9BQU8sRUFBRTtFQUFBLDJDQUM5QixJQUFJLENBQUNOLFNBQVM7SUFBQTtFQUFBO0lBQWhDLG9EQUFrQztNQUFBLE1BQXZCTyxHQUFHO01BQ1pELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTixFQUFFLENBQUMsQ0FBQyxHQUFHTSxHQUFHLENBQUNKLElBQUksQ0FBQztJQUM5QjtFQUFDO0lBQUE7RUFBQTtJQUFBO0VBQUE7QUFDSCxDQUFDO0FBRURLLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHVixLQUFLIn0=

/***/ }),

/***/ "./node_modules/superagent/lib/client.js":
/*!***********************************************!*\
  !*** ./node_modules/superagent/lib/client.js ***!
  \***********************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Root reference for iframes.
 */

let root;
if (typeof window !== 'undefined') {
  // Browser window
  root = window;
} else if (typeof self === 'undefined') {
  // Other environments
  console.warn('Using browser-only version of superagent in non-browser environment');
  root = void 0;
} else {
  // Web Worker
  root = self;
}
const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
const safeStringify = __webpack_require__(/*! fast-safe-stringify */ "./node_modules/fast-safe-stringify/index.js");
const qs = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");
const RequestBase = __webpack_require__(/*! ./request-base */ "./node_modules/superagent/lib/request-base.js");
const _require = __webpack_require__(/*! ./utils */ "./node_modules/superagent/lib/utils.js"),
  isObject = _require.isObject,
  mixin = _require.mixin,
  hasOwn = _require.hasOwn;
const ResponseBase = __webpack_require__(/*! ./response-base */ "./node_modules/superagent/lib/response-base.js");
const Agent = __webpack_require__(/*! ./agent-base */ "./node_modules/superagent/lib/agent-base.js");

/**
 * Noop.
 */

function noop() {}

/**
 * Expose `request`.
 */

module.exports = function (method, url) {
  // callback
  if (typeof url === 'function') {
    return new exports.Request('GET', method).end(url);
  }

  // url first
  if (arguments.length === 1) {
    return new exports.Request('GET', method);
  }
  return new exports.Request(method, url);
};
exports = module.exports;
const request = exports;
exports.Request = Request;

/**
 * Determine XHR.
 */

request.getXHR = () => {
  if (root.XMLHttpRequest) {
    return new root.XMLHttpRequest();
  }
  throw new Error('Browser-only version of superagent could not find XHR');
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

const trim = ''.trim ? s => s.trim() : s => s.replace(/(^\s*|\s*$)/g, '');

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(object) {
  if (!isObject(object)) return object;
  const pairs = [];
  for (const key in object) {
    if (hasOwn(object, key)) pushEncodedKeyValuePair(pairs, key, object[key]);
  }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, value) {
  if (value === undefined) return;
  if (value === null) {
    pairs.push(encodeURI(key));
    return;
  }
  if (Array.isArray(value)) {
    var _iterator = _createForOfIteratorHelper(value),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        const v = _step.value;
        pushEncodedKeyValuePair(pairs, key, v);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else if (isObject(value)) {
    for (const subkey in value) {
      if (hasOwn(value, subkey)) pushEncodedKeyValuePair(pairs, `${key}[${subkey}]`, value[subkey]);
    }
  } else {
    pairs.push(encodeURI(key) + '=' + encodeURIComponent(value));
  }
}

/**
 * Expose serialization method.
 */

request.serializeObject = serialize;

/**
 * Parse the given x-www-form-urlencoded `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseString(string_) {
  const object = {};
  const pairs = string_.split('&');
  let pair;
  let pos;
  for (let i = 0, length_ = pairs.length; i < length_; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');
    if (pos === -1) {
      object[decodeURIComponent(pair)] = '';
    } else {
      object[decodeURIComponent(pair.slice(0, pos))] = decodeURIComponent(pair.slice(pos + 1));
    }
  }
  return object;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'text/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  form: 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

request.serialize = {
  'application/x-www-form-urlencoded': qs.stringify,
  'application/json': safeStringify
};

/**
 * Default parsers.
 *
 *     superagent.parse['application/xml'] = function(str){
 *       return { object parsed from str };
 *     };
 *
 */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(string_) {
  const lines = string_.split(/\r?\n/);
  const fields = {};
  let index;
  let line;
  let field;
  let value;
  for (let i = 0, length_ = lines.length; i < length_; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    if (index === -1) {
      // could be empty line, just skip it
      continue;
    }
    field = line.slice(0, index).toLowerCase();
    value = trim(line.slice(index + 1));
    fields[field] = value;
  }
  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  // should match /json or +json
  // but not /json-seq
  return /[/+]json($|[^-\w])/i.test(mime);
}

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(request_) {
  this.req = request_;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = this.req.method !== 'HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text') || typeof this.xhr.responseType === 'undefined' ? this.xhr.responseText : null;
  this.statusText = this.req.xhr.statusText;
  let status = this.xhr.status;
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }
  this._setStatusProperties(status);
  this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  this.header = this.headers;
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this._setHeaderProperties(this.header);
  if (this.text === null && request_._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method === 'HEAD' ? null : this._parseBody(this.text ? this.text : this.xhr.response);
  }
}
mixin(Response.prototype, ResponseBase.prototype);

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function (string_) {
  let parse = request.parse[this.type];
  if (this.req._parser) {
    return this.req._parser(this, string_);
  }
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && string_ && (string_.length > 0 || string_ instanceof Object) ? parse(string_) : null;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function () {
  const req = this.req;
  const method = req.method;
  const url = req.url;
  const message = `cannot ${method} ${url} (${this.status})`;
  const error = new Error(message);
  error.status = this.status;
  error.method = method;
  error.url = url;
  return error;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  const self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', () => {
    let error = null;
    let res = null;
    try {
      res = new Response(self);
    } catch (err) {
      error = new Error('Parser is unable to parse the response');
      error.parse = true;
      error.original = err;
      // issue #675: return the raw response if the response parsing fails
      if (self.xhr) {
        // ie9 doesn't have 'response' property
        error.rawResponse = typeof self.xhr.responseType === 'undefined' ? self.xhr.responseText : self.xhr.response;
        // issue #876: return the http status code if the response parsing fails
        error.status = self.xhr.status ? self.xhr.status : null;
        error.statusCode = error.status; // backwards-compat only
      } else {
        error.rawResponse = null;
        error.status = null;
      }
      return self.callback(error);
    }
    self.emit('response', res);
    let new_error;
    try {
      if (!self._isResponseOK(res)) {
        new_error = new Error(res.statusText || res.text || 'Unsuccessful HTTP response');
      }
    } catch (err) {
      new_error = err; // ok() callback can throw
    }

    // #1000 don't catch errors from the callback to avoid double calling it
    if (new_error) {
      new_error.original = error;
      new_error.response = res;
      new_error.status = new_error.status || res.status;
      self.callback(new_error, res);
    } else {
      self.callback(null, res);
    }
  });
}

/**
 * Mixin `Emitter` and `RequestBase`.
 */

// eslint-disable-next-line new-cap
Emitter(Request.prototype);
mixin(Request.prototype, RequestBase.prototype);

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function (type) {
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function (type) {
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function (user, pass, options) {
  if (arguments.length === 1) pass = '';
  if (typeof pass === 'object' && pass !== null) {
    // pass is optional and can be replaced with options
    options = pass;
    pass = '';
  }
  if (!options) {
    options = {
      type: typeof btoa === 'function' ? 'basic' : 'auto'
    };
  }
  const encoder = options.encoder ? options.encoder : string => {
    if (typeof btoa === 'function') {
      return btoa(string);
    }
    throw new Error('Cannot use basic auth, btoa is not a function');
  };
  return this._auth(user, pass, options, encoder);
};

/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.query = function (value) {
  if (typeof value !== 'string') value = serialize(value);
  if (value) this._query.push(value);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function (field, file, options) {
  if (file) {
    if (this._data) {
      throw new Error("superagent can't mix .send() and .attach()");
    }
    this._getFormData().append(field, file, options || file.name);
  }
  return this;
};
Request.prototype._getFormData = function () {
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function (error, res) {
  if (this._shouldRetry(error, res)) {
    return this._retry();
  }
  const fn = this._callback;
  this.clearTimeout();
  if (error) {
    if (this._maxRetries) error.retries = this._retries - 1;
    this.emit('error', error);
  }
  fn(error, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function () {
  const error = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  error.crossDomain = true;
  error.status = this.status;
  error.method = this.method;
  error.url = this.url;
  this.callback(error);
};

// This only warns, because the request is still likely to work
Request.prototype.agent = function () {
  console.warn('This is not supported in browser version of superagent');
  return this;
};
Request.prototype.ca = Request.prototype.agent;
Request.prototype.buffer = Request.prototype.ca;

// This throws, because it can't send/receive data as expected
Request.prototype.write = () => {
  throw new Error('Streaming is not supported in browser version of superagent');
};
Request.prototype.pipe = Request.prototype.write;

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj host object
 * @return {Boolean} is a host object
 * @api private
 */
Request.prototype._isHost = function (object) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return object && typeof object === 'object' && !Array.isArray(object) && Object.prototype.toString.call(object) !== '[object Object]';
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function (fn) {
  if (this._endCalled) {
    console.warn('Warning: .end() was called twice. This is not supported in superagent');
  }
  this._endCalled = true;

  // store callback
  this._callback = fn || noop;

  // querystring
  this._finalizeQueryString();
  this._end();
};
Request.prototype._setUploadTimeout = function () {
  const self = this;

  // upload timeout it's wokrs only if deadline timeout is off
  if (this._uploadTimeout && !this._uploadTimeoutTimer) {
    this._uploadTimeoutTimer = setTimeout(() => {
      self._timeoutError('Upload timeout of ', self._uploadTimeout, 'ETIMEDOUT');
    }, this._uploadTimeout);
  }
};

// eslint-disable-next-line complexity
Request.prototype._end = function () {
  if (this._aborted) return this.callback(new Error('The request has been aborted even before .end() was called'));
  const self = this;
  this.xhr = request.getXHR();
  const xhr = this.xhr;
  let data = this._formData || this._data;
  this._setTimeouts();

  // state change
  xhr.addEventListener('readystatechange', () => {
    const readyState = xhr.readyState;
    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }
    if (readyState !== 4) {
      return;
    }

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    let status;
    try {
      status = xhr.status;
    } catch (err) {
      status = 0;
    }
    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  });

  // progress
  const handleProgress = (direction, e) => {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
      if (e.percent === 100) {
        clearTimeout(self._uploadTimeoutTimer);
      }
    }
    e.direction = direction;
    self.emit('progress', e);
  };
  if (this.hasListeners('progress')) {
    try {
      xhr.addEventListener('progress', handleProgress.bind(null, 'download'));
      if (xhr.upload) {
        xhr.upload.addEventListener('progress', handleProgress.bind(null, 'upload'));
      }
    } catch (err) {
      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }
  if (xhr.upload) {
    this._setUploadTimeout();
  }

  // initiate request
  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if (!this._formData && this.method !== 'GET' && this.method !== 'HEAD' && typeof data !== 'string' && !this._isHost(data)) {
    // serialize stuff
    const contentType = this._header['content-type'];
    let serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) {
      serialize = request.serialize['application/json'];
    }
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (const field in this.header) {
    if (this.header[field] === null) continue;
    if (hasOwn(this.header, field)) xhr.setRequestHeader(field, this.header[field]);
  }
  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data === 'undefined' ? null : data);
};
request.agent = () => new Agent();
for (var _i = 0, _arr = ['GET', 'POST', 'OPTIONS', 'PATCH', 'PUT', 'DELETE']; _i < _arr.length; _i++) {
  const method = _arr[_i];
  Agent.prototype[method.toLowerCase()] = function (url, fn) {
    const request_ = new request.Request(method, url);
    this._setDefaults(request_);
    if (fn) {
      request_.end(fn);
    }
    return request_;
  };
}
Agent.prototype.del = Agent.prototype.delete;

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = (url, data, fn) => {
  const request_ = request('GET', url);
  if (typeof data === 'function') {
    fn = data;
    data = null;
  }
  if (data) request_.query(data);
  if (fn) request_.end(fn);
  return request_;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.head = (url, data, fn) => {
  const request_ = request('HEAD', url);
  if (typeof data === 'function') {
    fn = data;
    data = null;
  }
  if (data) request_.query(data);
  if (fn) request_.end(fn);
  return request_;
};

/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.options = (url, data, fn) => {
  const request_ = request('OPTIONS', url);
  if (typeof data === 'function') {
    fn = data;
    data = null;
  }
  if (data) request_.send(data);
  if (fn) request_.end(fn);
  return request_;
};

/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

function del(url, data, fn) {
  const request_ = request('DELETE', url);
  if (typeof data === 'function') {
    fn = data;
    data = null;
  }
  if (data) request_.send(data);
  if (fn) request_.end(fn);
  return request_;
}
request.del = del;
request.delete = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = (url, data, fn) => {
  const request_ = request('PATCH', url);
  if (typeof data === 'function') {
    fn = data;
    data = null;
  }
  if (data) request_.send(data);
  if (fn) request_.end(fn);
  return request_;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.post = (url, data, fn) => {
  const request_ = request('POST', url);
  if (typeof data === 'function') {
    fn = data;
    data = null;
  }
  if (data) request_.send(data);
  if (fn) request_.end(fn);
  return request_;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.put = (url, data, fn) => {
  const request_ = request('PUT', url);
  if (typeof data === 'function') {
    fn = data;
    data = null;
  }
  if (data) request_.send(data);
  if (fn) request_.end(fn);
  return request_;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyb290Iiwid2luZG93Iiwic2VsZiIsImNvbnNvbGUiLCJ3YXJuIiwiRW1pdHRlciIsInJlcXVpcmUiLCJzYWZlU3RyaW5naWZ5IiwicXMiLCJSZXF1ZXN0QmFzZSIsImlzT2JqZWN0IiwibWl4aW4iLCJoYXNPd24iLCJSZXNwb25zZUJhc2UiLCJBZ2VudCIsIm5vb3AiLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0aG9kIiwidXJsIiwiUmVxdWVzdCIsImVuZCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInJlcXVlc3QiLCJnZXRYSFIiLCJYTUxIdHRwUmVxdWVzdCIsIkVycm9yIiwidHJpbSIsInMiLCJyZXBsYWNlIiwic2VyaWFsaXplIiwib2JqZWN0IiwicGFpcnMiLCJrZXkiLCJwdXNoRW5jb2RlZEtleVZhbHVlUGFpciIsImpvaW4iLCJ2YWx1ZSIsInVuZGVmaW5lZCIsInB1c2giLCJlbmNvZGVVUkkiLCJBcnJheSIsImlzQXJyYXkiLCJ2Iiwic3Via2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwic2VyaWFsaXplT2JqZWN0IiwicGFyc2VTdHJpbmciLCJzdHJpbmdfIiwic3BsaXQiLCJwYWlyIiwicG9zIiwiaSIsImxlbmd0aF8iLCJpbmRleE9mIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwic2xpY2UiLCJ0eXBlcyIsImh0bWwiLCJqc29uIiwieG1sIiwidXJsZW5jb2RlZCIsImZvcm0iLCJzdHJpbmdpZnkiLCJwYXJzZSIsIkpTT04iLCJwYXJzZUhlYWRlciIsImxpbmVzIiwiZmllbGRzIiwiaW5kZXgiLCJsaW5lIiwiZmllbGQiLCJ0b0xvd2VyQ2FzZSIsImlzSlNPTiIsIm1pbWUiLCJ0ZXN0IiwiUmVzcG9uc2UiLCJyZXF1ZXN0XyIsInJlcSIsInhociIsInRleHQiLCJyZXNwb25zZVR5cGUiLCJyZXNwb25zZVRleHQiLCJzdGF0dXNUZXh0Iiwic3RhdHVzIiwiX3NldFN0YXR1c1Byb3BlcnRpZXMiLCJoZWFkZXJzIiwiZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIiwiaGVhZGVyIiwiZ2V0UmVzcG9uc2VIZWFkZXIiLCJfc2V0SGVhZGVyUHJvcGVydGllcyIsIl9yZXNwb25zZVR5cGUiLCJib2R5IiwicmVzcG9uc2UiLCJfcGFyc2VCb2R5IiwicHJvdG90eXBlIiwidHlwZSIsIl9wYXJzZXIiLCJPYmplY3QiLCJ0b0Vycm9yIiwibWVzc2FnZSIsImVycm9yIiwiX3F1ZXJ5IiwiX2hlYWRlciIsIm9uIiwicmVzIiwiZXJyIiwib3JpZ2luYWwiLCJyYXdSZXNwb25zZSIsInN0YXR1c0NvZGUiLCJjYWxsYmFjayIsImVtaXQiLCJuZXdfZXJyb3IiLCJfaXNSZXNwb25zZU9LIiwic2V0IiwiYWNjZXB0IiwiYXV0aCIsInVzZXIiLCJwYXNzIiwib3B0aW9ucyIsImJ0b2EiLCJlbmNvZGVyIiwic3RyaW5nIiwiX2F1dGgiLCJxdWVyeSIsImF0dGFjaCIsImZpbGUiLCJfZGF0YSIsIl9nZXRGb3JtRGF0YSIsImFwcGVuZCIsIm5hbWUiLCJfZm9ybURhdGEiLCJGb3JtRGF0YSIsIl9zaG91bGRSZXRyeSIsIl9yZXRyeSIsImZuIiwiX2NhbGxiYWNrIiwiY2xlYXJUaW1lb3V0IiwiX21heFJldHJpZXMiLCJyZXRyaWVzIiwiX3JldHJpZXMiLCJjcm9zc0RvbWFpbkVycm9yIiwiY3Jvc3NEb21haW4iLCJhZ2VudCIsImNhIiwiYnVmZmVyIiwid3JpdGUiLCJwaXBlIiwiX2lzSG9zdCIsInRvU3RyaW5nIiwiY2FsbCIsIl9lbmRDYWxsZWQiLCJfZmluYWxpemVRdWVyeVN0cmluZyIsIl9lbmQiLCJfc2V0VXBsb2FkVGltZW91dCIsIl91cGxvYWRUaW1lb3V0IiwiX3VwbG9hZFRpbWVvdXRUaW1lciIsInNldFRpbWVvdXQiLCJfdGltZW91dEVycm9yIiwiX2Fib3J0ZWQiLCJkYXRhIiwiX3NldFRpbWVvdXRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlYWR5U3RhdGUiLCJfcmVzcG9uc2VUaW1lb3V0VGltZXIiLCJ0aW1lZG91dCIsImhhbmRsZVByb2dyZXNzIiwiZGlyZWN0aW9uIiwiZSIsInRvdGFsIiwicGVyY2VudCIsImxvYWRlZCIsImhhc0xpc3RlbmVycyIsImJpbmQiLCJ1cGxvYWQiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwib3BlbiIsIl93aXRoQ3JlZGVudGlhbHMiLCJ3aXRoQ3JlZGVudGlhbHMiLCJjb250ZW50VHlwZSIsIl9zZXJpYWxpemVyIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJfc2V0RGVmYXVsdHMiLCJkZWwiLCJkZWxldGUiLCJnZXQiLCJoZWFkIiwicGF0Y2giLCJwb3N0IiwicHV0Il0sInNvdXJjZXMiOlsiLi4vc3JjL2NsaWVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJvb3QgcmVmZXJlbmNlIGZvciBpZnJhbWVzLlxuICovXG5cbmxldCByb290O1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIC8vIEJyb3dzZXIgd2luZG93XG4gIHJvb3QgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmID09PSAndW5kZWZpbmVkJykge1xuICAvLyBPdGhlciBlbnZpcm9ubWVudHNcbiAgY29uc29sZS53YXJuKFxuICAgICdVc2luZyBicm93c2VyLW9ubHkgdmVyc2lvbiBvZiBzdXBlcmFnZW50IGluIG5vbi1icm93c2VyIGVudmlyb25tZW50J1xuICApO1xuICByb290ID0gdGhpcztcbn0gZWxzZSB7XG4gIC8vIFdlYiBXb3JrZXJcbiAgcm9vdCA9IHNlbGY7XG59XG5cbmNvbnN0IEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xuY29uc3Qgc2FmZVN0cmluZ2lmeSA9IHJlcXVpcmUoJ2Zhc3Qtc2FmZS1zdHJpbmdpZnknKTtcbmNvbnN0IHFzID0gcmVxdWlyZSgncXMnKTtcbmNvbnN0IFJlcXVlc3RCYXNlID0gcmVxdWlyZSgnLi9yZXF1ZXN0LWJhc2UnKTtcbmNvbnN0IHsgaXNPYmplY3QsIG1peGluLCBoYXNPd24gfSA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbmNvbnN0IFJlc3BvbnNlQmFzZSA9IHJlcXVpcmUoJy4vcmVzcG9uc2UtYmFzZScpO1xuY29uc3QgQWdlbnQgPSByZXF1aXJlKCcuL2FnZW50LWJhc2UnKTtcblxuLyoqXG4gKiBOb29wLlxuICovXG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4vKipcbiAqIEV4cG9zZSBgcmVxdWVzdGAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWV0aG9kLCB1cmwpIHtcbiAgLy8gY2FsbGJhY2tcbiAgaWYgKHR5cGVvZiB1cmwgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gbmV3IGV4cG9ydHMuUmVxdWVzdCgnR0VUJywgbWV0aG9kKS5lbmQodXJsKTtcbiAgfVxuXG4gIC8vIHVybCBmaXJzdFxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KCdHRVQnLCBtZXRob2QpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBleHBvcnRzLlJlcXVlc3QobWV0aG9kLCB1cmwpO1xufTtcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuXG5jb25zdCByZXF1ZXN0ID0gZXhwb3J0cztcblxuZXhwb3J0cy5SZXF1ZXN0ID0gUmVxdWVzdDtcblxuLyoqXG4gKiBEZXRlcm1pbmUgWEhSLlxuICovXG5cbnJlcXVlc3QuZ2V0WEhSID0gKCkgPT4ge1xuICBpZiAocm9vdC5YTUxIdHRwUmVxdWVzdCkge1xuICAgIHJldHVybiBuZXcgcm9vdC5YTUxIdHRwUmVxdWVzdCgpO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCdCcm93c2VyLW9ubHkgdmVyc2lvbiBvZiBzdXBlcmFnZW50IGNvdWxkIG5vdCBmaW5kIFhIUicpO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UsIGFkZGVkIHRvIHN1cHBvcnQgSUUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmNvbnN0IHRyaW0gPSAnJy50cmltID8gKHMpID0+IHMudHJpbSgpIDogKHMpID0+IHMucmVwbGFjZSgvKF5cXHMqfFxccyokKS9nLCAnJyk7XG5cbi8qKlxuICogU2VyaWFsaXplIHRoZSBnaXZlbiBgb2JqYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzZXJpYWxpemUob2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkgcmV0dXJuIG9iamVjdDtcbiAgY29uc3QgcGFpcnMgPSBbXTtcbiAgZm9yIChjb25zdCBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKGhhc093bihvYmplY3QsIGtleSkpIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIG9iamVjdFtrZXldKTtcbiAgfVxuXG4gIHJldHVybiBwYWlycy5qb2luKCcmJyk7XG59XG5cbi8qKlxuICogSGVscHMgJ3NlcmlhbGl6ZScgd2l0aCBzZXJpYWxpemluZyBhcnJheXMuXG4gKiBNdXRhdGVzIHRoZSBwYWlycyBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwYWlyc1xuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKi9cblxuZnVuY3Rpb24gcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgdmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgcGFpcnMucHVzaChlbmNvZGVVUkkoa2V5KSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgZm9yIChjb25zdCB2IG9mIHZhbHVlKSB7XG4gICAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCB2KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgZm9yIChjb25zdCBzdWJrZXkgaW4gdmFsdWUpIHtcbiAgICAgIGlmIChoYXNPd24odmFsdWUsIHN1YmtleSkpXG4gICAgICAgIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBgJHtrZXl9WyR7c3Via2V5fV1gLCB2YWx1ZVtzdWJrZXldKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcGFpcnMucHVzaChlbmNvZGVVUkkoa2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuICB9XG59XG5cbi8qKlxuICogRXhwb3NlIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICovXG5cbnJlcXVlc3Quc2VyaWFsaXplT2JqZWN0ID0gc2VyaWFsaXplO1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiB4LXd3dy1mb3JtLXVybGVuY29kZWQgYHN0cmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2VTdHJpbmcoc3RyaW5nXykge1xuICBjb25zdCBvYmplY3QgPSB7fTtcbiAgY29uc3QgcGFpcnMgPSBzdHJpbmdfLnNwbGl0KCcmJyk7XG4gIGxldCBwYWlyO1xuICBsZXQgcG9zO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsZW5ndGhfID0gcGFpcnMubGVuZ3RoOyBpIDwgbGVuZ3RoXzsgKytpKSB7XG4gICAgcGFpciA9IHBhaXJzW2ldO1xuICAgIHBvcyA9IHBhaXIuaW5kZXhPZignPScpO1xuICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICBvYmplY3RbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXIpXSA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmplY3RbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXIuc2xpY2UoMCwgcG9zKSldID0gZGVjb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICBwYWlyLnNsaWNlKHBvcyArIDEpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8qKlxuICogRXhwb3NlIHBhcnNlci5cbiAqL1xuXG5yZXF1ZXN0LnBhcnNlU3RyaW5nID0gcGFyc2VTdHJpbmc7XG5cbi8qKlxuICogRGVmYXVsdCBNSU1FIHR5cGUgbWFwLlxuICpcbiAqICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqL1xuXG5yZXF1ZXN0LnR5cGVzID0ge1xuICBodG1sOiAndGV4dC9odG1sJyxcbiAganNvbjogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICB4bWw6ICd0ZXh0L3htbCcsXG4gIHVybGVuY29kZWQ6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICBmb3JtOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgJ2Zvcm0tZGF0YSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG4vKipcbiAqIERlZmF1bHQgc2VyaWFsaXphdGlvbiBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQuc2VyaWFsaXplWydhcHBsaWNhdGlvbi94bWwnXSA9IGZ1bmN0aW9uKG9iail7XG4gKiAgICAgICByZXR1cm4gJ2dlbmVyYXRlZCB4bWwgaGVyZSc7XG4gKiAgICAgfTtcbiAqXG4gKi9cblxucmVxdWVzdC5zZXJpYWxpemUgPSB7XG4gICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOiBxcy5zdHJpbmdpZnksXG4gICdhcHBsaWNhdGlvbi9qc29uJzogc2FmZVN0cmluZ2lmeVxufTtcblxuLyoqXG4gKiBEZWZhdWx0IHBhcnNlcnMuXG4gKlxuICogICAgIHN1cGVyYWdlbnQucGFyc2VbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24oc3RyKXtcbiAqICAgICAgIHJldHVybiB7IG9iamVjdCBwYXJzZWQgZnJvbSBzdHIgfTtcbiAqICAgICB9O1xuICpcbiAqL1xuXG5yZXF1ZXN0LnBhcnNlID0ge1xuICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogcGFyc2VTdHJpbmcsXG4gICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5wYXJzZVxufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gaGVhZGVyIGBzdHJgIGludG9cbiAqIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBtYXBwZWQgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlSGVhZGVyKHN0cmluZ18pIHtcbiAgY29uc3QgbGluZXMgPSBzdHJpbmdfLnNwbGl0KC9cXHI/XFxuLyk7XG4gIGNvbnN0IGZpZWxkcyA9IHt9O1xuICBsZXQgaW5kZXg7XG4gIGxldCBsaW5lO1xuICBsZXQgZmllbGQ7XG4gIGxldCB2YWx1ZTtcblxuICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoXyA9IGxpbmVzLmxlbmd0aDsgaSA8IGxlbmd0aF87ICsraSkge1xuICAgIGxpbmUgPSBsaW5lc1tpXTtcbiAgICBpbmRleCA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIC8vIGNvdWxkIGJlIGVtcHR5IGxpbmUsIGp1c3Qgc2tpcCBpdFxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgZmllbGQgPSBsaW5lLnNsaWNlKDAsIGluZGV4KS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbHVlID0gdHJpbShsaW5lLnNsaWNlKGluZGV4ICsgMSkpO1xuICAgIGZpZWxkc1tmaWVsZF0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBmaWVsZHM7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYG1pbWVgIGlzIGpzb24gb3IgaGFzICtqc29uIHN0cnVjdHVyZWQgc3ludGF4IHN1ZmZpeC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWltZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzSlNPTihtaW1lKSB7XG4gIC8vIHNob3VsZCBtYXRjaCAvanNvbiBvciAranNvblxuICAvLyBidXQgbm90IC9qc29uLXNlcVxuICByZXR1cm4gL1svK11qc29uKCR8W14tXFx3XSkvaS50ZXN0KG1pbWUpO1xufVxuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlYCB3aXRoIHRoZSBnaXZlbiBgeGhyYC5cbiAqXG4gKiAgLSBzZXQgZmxhZ3MgKC5vaywgLmVycm9yLCBldGMpXG4gKiAgLSBwYXJzZSBoZWFkZXJcbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgQWxpYXNpbmcgYHN1cGVyYWdlbnRgIGFzIGByZXF1ZXN0YCBpcyBuaWNlOlxuICpcbiAqICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnQ7XG4gKlxuICogIFdlIGNhbiB1c2UgdGhlIHByb21pc2UtbGlrZSBBUEksIG9yIHBhc3MgY2FsbGJhY2tzOlxuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy8nKS5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqICAgICAgcmVxdWVzdC5nZXQoJy8nLCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBTZW5kaW5nIGRhdGEgY2FuIGJlIGNoYWluZWQ6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIE9yIHBhc3NlZCB0byBgLnNlbmQoKWA6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAucG9zdCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInLCB7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogT3IgZnVydGhlciByZWR1Y2VkIHRvIGEgc2luZ2xlIGNhbGwgZm9yIHNpbXBsZSBjYXNlczpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInLCB7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBAcGFyYW0ge1hNTEhUVFBSZXF1ZXN0fSB4aHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBSZXNwb25zZShyZXF1ZXN0Xykge1xuICB0aGlzLnJlcSA9IHJlcXVlc3RfO1xuICB0aGlzLnhociA9IHRoaXMucmVxLnhocjtcbiAgLy8gcmVzcG9uc2VUZXh0IGlzIGFjY2Vzc2libGUgb25seSBpZiByZXNwb25zZVR5cGUgaXMgJycgb3IgJ3RleHQnIGFuZCBvbiBvbGRlciBicm93c2Vyc1xuICB0aGlzLnRleHQgPVxuICAgICh0aGlzLnJlcS5tZXRob2QgIT09ICdIRUFEJyAmJlxuICAgICAgKHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJycgfHwgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndGV4dCcpKSB8fFxuICAgIHR5cGVvZiB0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICd1bmRlZmluZWQnXG4gICAgICA/IHRoaXMueGhyLnJlc3BvbnNlVGV4dFxuICAgICAgOiBudWxsO1xuICB0aGlzLnN0YXR1c1RleHQgPSB0aGlzLnJlcS54aHIuc3RhdHVzVGV4dDtcbiAgbGV0IHsgc3RhdHVzIH0gPSB0aGlzLnhocjtcbiAgLy8gaGFuZGxlIElFOSBidWc6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTAwNDY5NzIvbXNpZS1yZXR1cm5zLXN0YXR1cy1jb2RlLW9mLTEyMjMtZm9yLWFqYXgtcmVxdWVzdFxuICBpZiAoc3RhdHVzID09PSAxMjIzKSB7XG4gICAgc3RhdHVzID0gMjA0O1xuICB9XG5cbiAgdGhpcy5fc2V0U3RhdHVzUHJvcGVydGllcyhzdGF0dXMpO1xuICB0aGlzLmhlYWRlcnMgPSBwYXJzZUhlYWRlcih0aGlzLnhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XG4gIHRoaXMuaGVhZGVyID0gdGhpcy5oZWFkZXJzO1xuICAvLyBnZXRBbGxSZXNwb25zZUhlYWRlcnMgc29tZXRpbWVzIGZhbHNlbHkgcmV0dXJucyBcIlwiIGZvciBDT1JTIHJlcXVlc3RzLCBidXRcbiAgLy8gZ2V0UmVzcG9uc2VIZWFkZXIgc3RpbGwgd29ya3MuIHNvIHdlIGdldCBjb250ZW50LXR5cGUgZXZlbiBpZiBnZXR0aW5nXG4gIC8vIG90aGVyIGhlYWRlcnMgZmFpbHMuXG4gIHRoaXMuaGVhZGVyWydjb250ZW50LXR5cGUnXSA9IHRoaXMueGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LXR5cGUnKTtcbiAgdGhpcy5fc2V0SGVhZGVyUHJvcGVydGllcyh0aGlzLmhlYWRlcik7XG5cbiAgaWYgKHRoaXMudGV4dCA9PT0gbnVsbCAmJiByZXF1ZXN0Xy5fcmVzcG9uc2VUeXBlKSB7XG4gICAgdGhpcy5ib2R5ID0gdGhpcy54aHIucmVzcG9uc2U7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5ib2R5ID1cbiAgICAgIHRoaXMucmVxLm1ldGhvZCA9PT0gJ0hFQUQnXG4gICAgICAgID8gbnVsbFxuICAgICAgICA6IHRoaXMuX3BhcnNlQm9keSh0aGlzLnRleHQgPyB0aGlzLnRleHQgOiB0aGlzLnhoci5yZXNwb25zZSk7XG4gIH1cbn1cblxubWl4aW4oUmVzcG9uc2UucHJvdG90eXBlLCBSZXNwb25zZUJhc2UucHJvdG90eXBlKTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYm9keSBgc3RyYC5cbiAqXG4gKiBVc2VkIGZvciBhdXRvLXBhcnNpbmcgb2YgYm9kaWVzLiBQYXJzZXJzXG4gKiBhcmUgZGVmaW5lZCBvbiB0aGUgYHN1cGVyYWdlbnQucGFyc2VgIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5fcGFyc2VCb2R5ID0gZnVuY3Rpb24gKHN0cmluZ18pIHtcbiAgbGV0IHBhcnNlID0gcmVxdWVzdC5wYXJzZVt0aGlzLnR5cGVdO1xuICBpZiAodGhpcy5yZXEuX3BhcnNlcikge1xuICAgIHJldHVybiB0aGlzLnJlcS5fcGFyc2VyKHRoaXMsIHN0cmluZ18pO1xuICB9XG5cbiAgaWYgKCFwYXJzZSAmJiBpc0pTT04odGhpcy50eXBlKSkge1xuICAgIHBhcnNlID0gcmVxdWVzdC5wYXJzZVsnYXBwbGljYXRpb24vanNvbiddO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlICYmIHN0cmluZ18gJiYgKHN0cmluZ18ubGVuZ3RoID4gMCB8fCBzdHJpbmdfIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgID8gcGFyc2Uoc3RyaW5nXylcbiAgICA6IG51bGw7XG59O1xuXG4vKipcbiAqIFJldHVybiBhbiBgRXJyb3JgIHJlcHJlc2VudGF0aXZlIG9mIHRoaXMgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybiB7RXJyb3J9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS50b0Vycm9yID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCB7IHJlcSB9ID0gdGhpcztcbiAgY29uc3QgeyBtZXRob2QgfSA9IHJlcTtcbiAgY29uc3QgeyB1cmwgfSA9IHJlcTtcblxuICBjb25zdCBtZXNzYWdlID0gYGNhbm5vdCAke21ldGhvZH0gJHt1cmx9ICgke3RoaXMuc3RhdHVzfSlgO1xuICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgZXJyb3Iuc3RhdHVzID0gdGhpcy5zdGF0dXM7XG4gIGVycm9yLm1ldGhvZCA9IG1ldGhvZDtcbiAgZXJyb3IudXJsID0gdXJsO1xuXG4gIHJldHVybiBlcnJvcjtcbn07XG5cbi8qKlxuICogRXhwb3NlIGBSZXNwb25zZWAuXG4gKi9cblxucmVxdWVzdC5SZXNwb25zZSA9IFJlc3BvbnNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlcXVlc3RgIHdpdGggdGhlIGdpdmVuIGBtZXRob2RgIGFuZCBgdXJsYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFJlcXVlc3QobWV0aG9kLCB1cmwpIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gIHRoaXMuX3F1ZXJ5ID0gdGhpcy5fcXVlcnkgfHwgW107XG4gIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICB0aGlzLnVybCA9IHVybDtcbiAgdGhpcy5oZWFkZXIgPSB7fTsgLy8gcHJlc2VydmVzIGhlYWRlciBuYW1lIGNhc2VcbiAgdGhpcy5faGVhZGVyID0ge307IC8vIGNvZXJjZXMgaGVhZGVyIG5hbWVzIHRvIGxvd2VyY2FzZVxuICB0aGlzLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgbGV0IGVycm9yID0gbnVsbDtcbiAgICBsZXQgcmVzID0gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICByZXMgPSBuZXcgUmVzcG9uc2Uoc2VsZik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignUGFyc2VyIGlzIHVuYWJsZSB0byBwYXJzZSB0aGUgcmVzcG9uc2UnKTtcbiAgICAgIGVycm9yLnBhcnNlID0gdHJ1ZTtcbiAgICAgIGVycm9yLm9yaWdpbmFsID0gZXJyO1xuICAgICAgLy8gaXNzdWUgIzY3NTogcmV0dXJuIHRoZSByYXcgcmVzcG9uc2UgaWYgdGhlIHJlc3BvbnNlIHBhcnNpbmcgZmFpbHNcbiAgICAgIGlmIChzZWxmLnhocikge1xuICAgICAgICAvLyBpZTkgZG9lc24ndCBoYXZlICdyZXNwb25zZScgcHJvcGVydHlcbiAgICAgICAgZXJyb3IucmF3UmVzcG9uc2UgPVxuICAgICAgICAgIHR5cGVvZiBzZWxmLnhoci5yZXNwb25zZVR5cGUgPT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICA/IHNlbGYueGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgOiBzZWxmLnhoci5yZXNwb25zZTtcbiAgICAgICAgLy8gaXNzdWUgIzg3NjogcmV0dXJuIHRoZSBodHRwIHN0YXR1cyBjb2RlIGlmIHRoZSByZXNwb25zZSBwYXJzaW5nIGZhaWxzXG4gICAgICAgIGVycm9yLnN0YXR1cyA9IHNlbGYueGhyLnN0YXR1cyA/IHNlbGYueGhyLnN0YXR1cyA6IG51bGw7XG4gICAgICAgIGVycm9yLnN0YXR1c0NvZGUgPSBlcnJvci5zdGF0dXM7IC8vIGJhY2t3YXJkcy1jb21wYXQgb25seVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3IucmF3UmVzcG9uc2UgPSBudWxsO1xuICAgICAgICBlcnJvci5zdGF0dXMgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZi5jYWxsYmFjayhlcnJvcik7XG4gICAgfVxuXG4gICAgc2VsZi5lbWl0KCdyZXNwb25zZScsIHJlcyk7XG5cbiAgICBsZXQgbmV3X2Vycm9yO1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXNlbGYuX2lzUmVzcG9uc2VPSyhyZXMpKSB7XG4gICAgICAgIG5ld19lcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgICByZXMuc3RhdHVzVGV4dCB8fCByZXMudGV4dCB8fCAnVW5zdWNjZXNzZnVsIEhUVFAgcmVzcG9uc2UnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXdfZXJyb3IgPSBlcnI7IC8vIG9rKCkgY2FsbGJhY2sgY2FuIHRocm93XG4gICAgfVxuXG4gICAgLy8gIzEwMDAgZG9uJ3QgY2F0Y2ggZXJyb3JzIGZyb20gdGhlIGNhbGxiYWNrIHRvIGF2b2lkIGRvdWJsZSBjYWxsaW5nIGl0XG4gICAgaWYgKG5ld19lcnJvcikge1xuICAgICAgbmV3X2Vycm9yLm9yaWdpbmFsID0gZXJyb3I7XG4gICAgICBuZXdfZXJyb3IucmVzcG9uc2UgPSByZXM7XG4gICAgICBuZXdfZXJyb3Iuc3RhdHVzID0gbmV3X2Vycm9yLnN0YXR1cyB8fCByZXMuc3RhdHVzO1xuICAgICAgc2VsZi5jYWxsYmFjayhuZXdfZXJyb3IsIHJlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYuY2FsbGJhY2sobnVsbCwgcmVzKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIE1peGluIGBFbWl0dGVyYCBhbmQgYFJlcXVlc3RCYXNlYC5cbiAqL1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbmV3LWNhcFxuRW1pdHRlcihSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbm1peGluKFJlcXVlc3QucHJvdG90eXBlLCBSZXF1ZXN0QmFzZS5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFNldCBDb250ZW50LVR5cGUgdG8gYHR5cGVgLCBtYXBwaW5nIHZhbHVlcyBmcm9tIGByZXF1ZXN0LnR5cGVzYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHN1cGVyYWdlbnQudHlwZXMueG1sID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCd4bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXG4gKiAgICAgICAgLnR5cGUoJ2FwcGxpY2F0aW9uL3htbCcpXG4gKiAgICAgICAgLnNlbmQoeG1sc3RyaW5nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gIHRoaXMuc2V0KCdDb250ZW50LVR5cGUnLCByZXF1ZXN0LnR5cGVzW3R5cGVdIHx8IHR5cGUpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IEFjY2VwdCB0byBgdHlwZWAsIG1hcHBpbmcgdmFsdWVzIGZyb20gYHJlcXVlc3QudHlwZXNgLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgc3VwZXJhZ2VudC50eXBlcy5qc29uID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy9hZ2VudCcpXG4gKiAgICAgICAgLmFjY2VwdCgnanNvbicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcbiAqICAgICAgICAuYWNjZXB0KCdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWNjZXB0XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgdGhpcy5zZXQoJ0FjY2VwdCcsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQXV0aG9yaXphdGlvbiBmaWVsZCB2YWx1ZSB3aXRoIGB1c2VyYCBhbmQgYHBhc3NgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gW3Bhc3NdIG9wdGlvbmFsIGluIGNhc2Ugb2YgdXNpbmcgJ2JlYXJlcicgYXMgdHlwZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgd2l0aCAndHlwZScgcHJvcGVydHkgJ2F1dG8nLCAnYmFzaWMnIG9yICdiZWFyZXInIChkZWZhdWx0ICdiYXNpYycpXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXV0aCA9IGZ1bmN0aW9uICh1c2VyLCBwYXNzLCBvcHRpb25zKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSBwYXNzID0gJyc7XG4gIGlmICh0eXBlb2YgcGFzcyA9PT0gJ29iamVjdCcgJiYgcGFzcyAhPT0gbnVsbCkge1xuICAgIC8vIHBhc3MgaXMgb3B0aW9uYWwgYW5kIGNhbiBiZSByZXBsYWNlZCB3aXRoIG9wdGlvbnNcbiAgICBvcHRpb25zID0gcGFzcztcbiAgICBwYXNzID0gJyc7XG4gIH1cblxuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgdHlwZTogdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicgPyAnYmFzaWMnIDogJ2F1dG8nXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGVuY29kZXIgPSBvcHRpb25zLmVuY29kZXJcbiAgICA/IG9wdGlvbnMuZW5jb2RlclxuICAgIDogKHN0cmluZykgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gYnRvYShzdHJpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgdXNlIGJhc2ljIGF1dGgsIGJ0b2EgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICAgIH07XG5cbiAgcmV0dXJuIHRoaXMuX2F1dGgodXNlciwgcGFzcywgb3B0aW9ucywgZW5jb2Rlcik7XG59O1xuXG4vKipcbiAqIEFkZCBxdWVyeS1zdHJpbmcgYHZhbGAuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICByZXF1ZXN0LmdldCgnL3Nob2VzJylcbiAqICAgICAucXVlcnkoJ3NpemU9MTAnKVxuICogICAgIC5xdWVyeSh7IGNvbG9yOiAnYmx1ZScgfSlcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB2YWx1ZSA9IHNlcmlhbGl6ZSh2YWx1ZSk7XG4gIGlmICh2YWx1ZSkgdGhpcy5fcXVlcnkucHVzaCh2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBRdWV1ZSB0aGUgZ2l2ZW4gYGZpbGVgIGFzIGFuIGF0dGFjaG1lbnQgdG8gdGhlIHNwZWNpZmllZCBgZmllbGRgLFxuICogd2l0aCBvcHRpb25hbCBgb3B0aW9uc2AgKG9yIGZpbGVuYW1lKS5cbiAqXG4gKiBgYGAganNcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5hdHRhY2goJ2NvbnRlbnQnLCBuZXcgQmxvYihbJzxhIGlkPVwiYVwiPjxiIGlkPVwiYlwiPmhleSE8L2I+PC9hPiddLCB7IHR5cGU6IFwidGV4dC9odG1sXCJ9KSlcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEBwYXJhbSB7QmxvYnxGaWxlfSBmaWxlXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbiAoZmllbGQsIGZpbGUsIG9wdGlvbnMpIHtcbiAgaWYgKGZpbGUpIHtcbiAgICBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwic3VwZXJhZ2VudCBjYW4ndCBtaXggLnNlbmQoKSBhbmQgLmF0dGFjaCgpXCIpO1xuICAgIH1cblxuICAgIHRoaXMuX2dldEZvcm1EYXRhKCkuYXBwZW5kKGZpZWxkLCBmaWxlLCBvcHRpb25zIHx8IGZpbGUubmFtZSk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3QucHJvdG90eXBlLl9nZXRGb3JtRGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLl9mb3JtRGF0YSkge1xuICAgIHRoaXMuX2Zvcm1EYXRhID0gbmV3IHJvb3QuRm9ybURhdGEoKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9mb3JtRGF0YTtcbn07XG5cbi8qKlxuICogSW52b2tlIHRoZSBjYWxsYmFjayB3aXRoIGBlcnJgIGFuZCBgcmVzYFxuICogYW5kIGhhbmRsZSBhcml0eSBjaGVjay5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY2FsbGJhY2sgPSBmdW5jdGlvbiAoZXJyb3IsIHJlcykge1xuICBpZiAodGhpcy5fc2hvdWxkUmV0cnkoZXJyb3IsIHJlcykpIHtcbiAgICByZXR1cm4gdGhpcy5fcmV0cnkoKTtcbiAgfVxuXG4gIGNvbnN0IGZuID0gdGhpcy5fY2FsbGJhY2s7XG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgaWYgKHRoaXMuX21heFJldHJpZXMpIGVycm9yLnJldHJpZXMgPSB0aGlzLl9yZXRyaWVzIC0gMTtcbiAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuICB9XG5cbiAgZm4oZXJyb3IsIHJlcyk7XG59O1xuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHgtZG9tYWluIGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNyb3NzRG9tYWluRXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKFxuICAgICdSZXF1ZXN0IGhhcyBiZWVuIHRlcm1pbmF0ZWRcXG5Qb3NzaWJsZSBjYXVzZXM6IHRoZSBuZXR3b3JrIGlzIG9mZmxpbmUsIE9yaWdpbiBpcyBub3QgYWxsb3dlZCBieSBBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4sIHRoZSBwYWdlIGlzIGJlaW5nIHVubG9hZGVkLCBldGMuJ1xuICApO1xuICBlcnJvci5jcm9zc0RvbWFpbiA9IHRydWU7XG5cbiAgZXJyb3Iuc3RhdHVzID0gdGhpcy5zdGF0dXM7XG4gIGVycm9yLm1ldGhvZCA9IHRoaXMubWV0aG9kO1xuICBlcnJvci51cmwgPSB0aGlzLnVybDtcblxuICB0aGlzLmNhbGxiYWNrKGVycm9yKTtcbn07XG5cbi8vIFRoaXMgb25seSB3YXJucywgYmVjYXVzZSB0aGUgcmVxdWVzdCBpcyBzdGlsbCBsaWtlbHkgdG8gd29ya1xuUmVxdWVzdC5wcm90b3R5cGUuYWdlbnQgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUud2FybignVGhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIGJyb3dzZXIgdmVyc2lvbiBvZiBzdXBlcmFnZW50Jyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUuY2EgPSBSZXF1ZXN0LnByb3RvdHlwZS5hZ2VudDtcblJlcXVlc3QucHJvdG90eXBlLmJ1ZmZlciA9IFJlcXVlc3QucHJvdG90eXBlLmNhO1xuXG4vLyBUaGlzIHRocm93cywgYmVjYXVzZSBpdCBjYW4ndCBzZW5kL3JlY2VpdmUgZGF0YSBhcyBleHBlY3RlZFxuUmVxdWVzdC5wcm90b3R5cGUud3JpdGUgPSAoKSA9PiB7XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAnU3RyZWFtaW5nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciB2ZXJzaW9uIG9mIHN1cGVyYWdlbnQnXG4gICk7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5waXBlID0gUmVxdWVzdC5wcm90b3R5cGUud3JpdGU7XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYSBob3N0IG9iamVjdCxcbiAqIHdlIGRvbid0IHdhbnQgdG8gc2VyaWFsaXplIHRoZXNlIDopXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBob3N0IG9iamVjdFxuICogQHJldHVybiB7Qm9vbGVhbn0gaXMgYSBob3N0IG9iamVjdFxuICogQGFwaSBwcml2YXRlXG4gKi9cblJlcXVlc3QucHJvdG90eXBlLl9pc0hvc3QgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gIC8vIE5hdGl2ZSBvYmplY3RzIHN0cmluZ2lmeSB0byBbb2JqZWN0IEZpbGVdLCBbb2JqZWN0IEJsb2JdLCBbb2JqZWN0IEZvcm1EYXRhXSwgZXRjLlxuICByZXR1cm4gKFxuICAgIG9iamVjdCAmJlxuICAgIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgIUFycmF5LmlzQXJyYXkob2JqZWN0KSAmJlxuICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpICE9PSAnW29iamVjdCBPYmplY3RdJ1xuICApO1xufTtcblxuLyoqXG4gKiBJbml0aWF0ZSByZXF1ZXN0LCBpbnZva2luZyBjYWxsYmFjayBgZm4ocmVzKWBcbiAqIHdpdGggYW4gaW5zdGFuY2VvZiBgUmVzcG9uc2VgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKGZuKSB7XG4gIGlmICh0aGlzLl9lbmRDYWxsZWQpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnV2FybmluZzogLmVuZCgpIHdhcyBjYWxsZWQgdHdpY2UuIFRoaXMgaXMgbm90IHN1cHBvcnRlZCBpbiBzdXBlcmFnZW50J1xuICAgICk7XG4gIH1cblxuICB0aGlzLl9lbmRDYWxsZWQgPSB0cnVlO1xuXG4gIC8vIHN0b3JlIGNhbGxiYWNrXG4gIHRoaXMuX2NhbGxiYWNrID0gZm4gfHwgbm9vcDtcblxuICAvLyBxdWVyeXN0cmluZ1xuICB0aGlzLl9maW5hbGl6ZVF1ZXJ5U3RyaW5nKCk7XG5cbiAgdGhpcy5fZW5kKCk7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5fc2V0VXBsb2FkVGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgLy8gdXBsb2FkIHRpbWVvdXQgaXQncyB3b2tycyBvbmx5IGlmIGRlYWRsaW5lIHRpbWVvdXQgaXMgb2ZmXG4gIGlmICh0aGlzLl91cGxvYWRUaW1lb3V0ICYmICF0aGlzLl91cGxvYWRUaW1lb3V0VGltZXIpIHtcbiAgICB0aGlzLl91cGxvYWRUaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNlbGYuX3RpbWVvdXRFcnJvcihcbiAgICAgICAgJ1VwbG9hZCB0aW1lb3V0IG9mICcsXG4gICAgICAgIHNlbGYuX3VwbG9hZFRpbWVvdXQsXG4gICAgICAgICdFVElNRURPVVQnXG4gICAgICApO1xuICAgIH0sIHRoaXMuX3VwbG9hZFRpbWVvdXQpO1xuICB9XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuUmVxdWVzdC5wcm90b3R5cGUuX2VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuX2Fib3J0ZWQpXG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2soXG4gICAgICBuZXcgRXJyb3IoJ1RoZSByZXF1ZXN0IGhhcyBiZWVuIGFib3J0ZWQgZXZlbiBiZWZvcmUgLmVuZCgpIHdhcyBjYWxsZWQnKVxuICAgICk7XG5cbiAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gIHRoaXMueGhyID0gcmVxdWVzdC5nZXRYSFIoKTtcbiAgY29uc3QgeyB4aHIgfSA9IHRoaXM7XG4gIGxldCBkYXRhID0gdGhpcy5fZm9ybURhdGEgfHwgdGhpcy5fZGF0YTtcblxuICB0aGlzLl9zZXRUaW1lb3V0cygpO1xuXG4gIC8vIHN0YXRlIGNoYW5nZVxuICB4aHIuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHlzdGF0ZWNoYW5nZScsICgpID0+IHtcbiAgICBjb25zdCB7IHJlYWR5U3RhdGUgfSA9IHhocjtcbiAgICBpZiAocmVhZHlTdGF0ZSA+PSAyICYmIHNlbGYuX3Jlc3BvbnNlVGltZW91dFRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQoc2VsZi5fcmVzcG9uc2VUaW1lb3V0VGltZXIpO1xuICAgIH1cblxuICAgIGlmIChyZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSW4gSUU5LCByZWFkcyB0byBhbnkgcHJvcGVydHkgKGUuZy4gc3RhdHVzKSBvZmYgb2YgYW4gYWJvcnRlZCBYSFIgd2lsbFxuICAgIC8vIHJlc3VsdCBpbiB0aGUgZXJyb3IgXCJDb3VsZCBub3QgY29tcGxldGUgdGhlIG9wZXJhdGlvbiBkdWUgdG8gZXJyb3IgYzAwYzAyM2ZcIlxuICAgIGxldCBzdGF0dXM7XG4gICAgdHJ5IHtcbiAgICAgIHN0YXR1cyA9IHhoci5zdGF0dXM7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzdGF0dXMgPSAwO1xuICAgIH1cblxuICAgIGlmICghc3RhdHVzKSB7XG4gICAgICBpZiAoc2VsZi50aW1lZG91dCB8fCBzZWxmLl9hYm9ydGVkKSByZXR1cm47XG4gICAgICByZXR1cm4gc2VsZi5jcm9zc0RvbWFpbkVycm9yKCk7XG4gICAgfVxuXG4gICAgc2VsZi5lbWl0KCdlbmQnKTtcbiAgfSk7XG5cbiAgLy8gcHJvZ3Jlc3NcbiAgY29uc3QgaGFuZGxlUHJvZ3Jlc3MgPSAoZGlyZWN0aW9uLCBlKSA9PiB7XG4gICAgaWYgKGUudG90YWwgPiAwKSB7XG4gICAgICBlLnBlcmNlbnQgPSAoZS5sb2FkZWQgLyBlLnRvdGFsKSAqIDEwMDtcblxuICAgICAgaWYgKGUucGVyY2VudCA9PT0gMTAwKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChzZWxmLl91cGxvYWRUaW1lb3V0VGltZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGUuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCBlKTtcbiAgfTtcblxuICBpZiAodGhpcy5oYXNMaXN0ZW5lcnMoJ3Byb2dyZXNzJykpIHtcbiAgICB0cnkge1xuICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgaGFuZGxlUHJvZ3Jlc3MuYmluZChudWxsLCAnZG93bmxvYWQnKSk7XG4gICAgICBpZiAoeGhyLnVwbG9hZCkge1xuICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgJ3Byb2dyZXNzJyxcbiAgICAgICAgICBoYW5kbGVQcm9ncmVzcy5iaW5kKG51bGwsICd1cGxvYWQnKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gQWNjZXNzaW5nIHhoci51cGxvYWQgZmFpbHMgaW4gSUUgZnJvbSBhIHdlYiB3b3JrZXIsIHNvIGp1c3QgcHJldGVuZCBpdCBkb2Vzbid0IGV4aXN0LlxuICAgICAgLy8gUmVwb3J0ZWQgaGVyZTpcbiAgICAgIC8vIGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvODM3MjQ1L3htbGh0dHByZXF1ZXN0LXVwbG9hZC10aHJvd3MtaW52YWxpZC1hcmd1bWVudC13aGVuLXVzZWQtZnJvbS13ZWItd29ya2VyLWNvbnRleHRcbiAgICB9XG4gIH1cblxuICBpZiAoeGhyLnVwbG9hZCkge1xuICAgIHRoaXMuX3NldFVwbG9hZFRpbWVvdXQoKTtcbiAgfVxuXG4gIC8vIGluaXRpYXRlIHJlcXVlc3RcbiAgdHJ5IHtcbiAgICBpZiAodGhpcy51c2VybmFtZSAmJiB0aGlzLnBhc3N3b3JkKSB7XG4gICAgICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cmwsIHRydWUsIHRoaXMudXNlcm5hbWUsIHRoaXMucGFzc3dvcmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cmwsIHRydWUpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gc2VlICMxMTQ5XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2soZXJyKTtcbiAgfVxuXG4gIC8vIENPUlNcbiAgaWYgKHRoaXMuX3dpdGhDcmVkZW50aWFscykgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cbiAgLy8gYm9keVxuICBpZiAoXG4gICAgIXRoaXMuX2Zvcm1EYXRhICYmXG4gICAgdGhpcy5tZXRob2QgIT09ICdHRVQnICYmXG4gICAgdGhpcy5tZXRob2QgIT09ICdIRUFEJyAmJlxuICAgIHR5cGVvZiBkYXRhICE9PSAnc3RyaW5nJyAmJlxuICAgICF0aGlzLl9pc0hvc3QoZGF0YSlcbiAgKSB7XG4gICAgLy8gc2VyaWFsaXplIHN0dWZmXG4gICAgY29uc3QgY29udGVudFR5cGUgPSB0aGlzLl9oZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuICAgIGxldCBzZXJpYWxpemUgPVxuICAgICAgdGhpcy5fc2VyaWFsaXplciB8fFxuICAgICAgcmVxdWVzdC5zZXJpYWxpemVbY29udGVudFR5cGUgPyBjb250ZW50VHlwZS5zcGxpdCgnOycpWzBdIDogJyddO1xuICAgIGlmICghc2VyaWFsaXplICYmIGlzSlNPTihjb250ZW50VHlwZSkpIHtcbiAgICAgIHNlcmlhbGl6ZSA9IHJlcXVlc3Quc2VyaWFsaXplWydhcHBsaWNhdGlvbi9qc29uJ107XG4gICAgfVxuXG4gICAgaWYgKHNlcmlhbGl6ZSkgZGF0YSA9IHNlcmlhbGl6ZShkYXRhKTtcbiAgfVxuXG4gIC8vIHNldCBoZWFkZXIgZmllbGRzXG4gIGZvciAoY29uc3QgZmllbGQgaW4gdGhpcy5oZWFkZXIpIHtcbiAgICBpZiAodGhpcy5oZWFkZXJbZmllbGRdID09PSBudWxsKSBjb250aW51ZTtcblxuICAgIGlmIChoYXNPd24odGhpcy5oZWFkZXIsIGZpZWxkKSlcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGZpZWxkLCB0aGlzLmhlYWRlcltmaWVsZF0pO1xuICB9XG5cbiAgaWYgKHRoaXMuX3Jlc3BvbnNlVHlwZSkge1xuICAgIHhoci5yZXNwb25zZVR5cGUgPSB0aGlzLl9yZXNwb25zZVR5cGU7XG4gIH1cblxuICAvLyBzZW5kIHN0dWZmXG4gIHRoaXMuZW1pdCgncmVxdWVzdCcsIHRoaXMpO1xuXG4gIC8vIElFMTEgeGhyLnNlbmQodW5kZWZpbmVkKSBzZW5kcyAndW5kZWZpbmVkJyBzdHJpbmcgYXMgUE9TVCBwYXlsb2FkIChpbnN0ZWFkIG9mIG5vdGhpbmcpXG4gIC8vIFdlIG5lZWQgbnVsbCBoZXJlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gIHhoci5zZW5kKHR5cGVvZiBkYXRhID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiBkYXRhKTtcbn07XG5cbnJlcXVlc3QuYWdlbnQgPSAoKSA9PiBuZXcgQWdlbnQoKTtcblxuZm9yIChjb25zdCBtZXRob2Qgb2YgWydHRVQnLCAnUE9TVCcsICdPUFRJT05TJywgJ1BBVENIJywgJ1BVVCcsICdERUxFVEUnXSkge1xuICBBZ2VudC5wcm90b3R5cGVbbWV0aG9kLnRvTG93ZXJDYXNlKCldID0gZnVuY3Rpb24gKHVybCwgZm4pIHtcbiAgICBjb25zdCByZXF1ZXN0XyA9IG5ldyByZXF1ZXN0LlJlcXVlc3QobWV0aG9kLCB1cmwpO1xuICAgIHRoaXMuX3NldERlZmF1bHRzKHJlcXVlc3RfKTtcbiAgICBpZiAoZm4pIHtcbiAgICAgIHJlcXVlc3RfLmVuZChmbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcXVlc3RfO1xuICB9O1xufVxuXG5BZ2VudC5wcm90b3R5cGUuZGVsID0gQWdlbnQucHJvdG90eXBlLmRlbGV0ZTtcblxuLyoqXG4gKiBHRVQgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LmdldCA9ICh1cmwsIGRhdGEsIGZuKSA9PiB7XG4gIGNvbnN0IHJlcXVlc3RfID0gcmVxdWVzdCgnR0VUJywgdXJsKTtcbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZm4gPSBkYXRhO1xuICAgIGRhdGEgPSBudWxsO1xuICB9XG5cbiAgaWYgKGRhdGEpIHJlcXVlc3RfLnF1ZXJ5KGRhdGEpO1xuICBpZiAoZm4pIHJlcXVlc3RfLmVuZChmbik7XG4gIHJldHVybiByZXF1ZXN0Xztcbn07XG5cbi8qKlxuICogSEVBRCBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuaGVhZCA9ICh1cmwsIGRhdGEsIGZuKSA9PiB7XG4gIGNvbnN0IHJlcXVlc3RfID0gcmVxdWVzdCgnSEVBRCcsIHVybCk7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGZuID0gZGF0YTtcbiAgICBkYXRhID0gbnVsbDtcbiAgfVxuXG4gIGlmIChkYXRhKSByZXF1ZXN0Xy5xdWVyeShkYXRhKTtcbiAgaWYgKGZuKSByZXF1ZXN0Xy5lbmQoZm4pO1xuICByZXR1cm4gcmVxdWVzdF87XG59O1xuXG4vKipcbiAqIE9QVElPTlMgcXVlcnkgdG8gYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0Lm9wdGlvbnMgPSAodXJsLCBkYXRhLCBmbikgPT4ge1xuICBjb25zdCByZXF1ZXN0XyA9IHJlcXVlc3QoJ09QVElPTlMnLCB1cmwpO1xuICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICBmbiA9IGRhdGE7XG4gICAgZGF0YSA9IG51bGw7XG4gIH1cblxuICBpZiAoZGF0YSkgcmVxdWVzdF8uc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXF1ZXN0Xy5lbmQoZm4pO1xuICByZXR1cm4gcmVxdWVzdF87XG59O1xuXG4vKipcbiAqIERFTEVURSBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IFtkYXRhXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGVsKHVybCwgZGF0YSwgZm4pIHtcbiAgY29uc3QgcmVxdWVzdF8gPSByZXF1ZXN0KCdERUxFVEUnLCB1cmwpO1xuICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICBmbiA9IGRhdGE7XG4gICAgZGF0YSA9IG51bGw7XG4gIH1cblxuICBpZiAoZGF0YSkgcmVxdWVzdF8uc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXF1ZXN0Xy5lbmQoZm4pO1xuICByZXR1cm4gcmVxdWVzdF87XG59XG5cbnJlcXVlc3QuZGVsID0gZGVsO1xucmVxdWVzdC5kZWxldGUgPSBkZWw7XG5cbi8qKlxuICogUEFUQ0ggYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucGF0Y2ggPSAodXJsLCBkYXRhLCBmbikgPT4ge1xuICBjb25zdCByZXF1ZXN0XyA9IHJlcXVlc3QoJ1BBVENIJywgdXJsKTtcbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZm4gPSBkYXRhO1xuICAgIGRhdGEgPSBudWxsO1xuICB9XG5cbiAgaWYgKGRhdGEpIHJlcXVlc3RfLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxdWVzdF8uZW5kKGZuKTtcbiAgcmV0dXJuIHJlcXVlc3RfO1xufTtcblxuLyoqXG4gKiBQT1NUIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gW2RhdGFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnBvc3QgPSAodXJsLCBkYXRhLCBmbikgPT4ge1xuICBjb25zdCByZXF1ZXN0XyA9IHJlcXVlc3QoJ1BPU1QnLCB1cmwpO1xuICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICBmbiA9IGRhdGE7XG4gICAgZGF0YSA9IG51bGw7XG4gIH1cblxuICBpZiAoZGF0YSkgcmVxdWVzdF8uc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXF1ZXN0Xy5lbmQoZm4pO1xuICByZXR1cm4gcmVxdWVzdF87XG59O1xuXG4vKipcbiAqIFBVVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wdXQgPSAodXJsLCBkYXRhLCBmbikgPT4ge1xuICBjb25zdCByZXF1ZXN0XyA9IHJlcXVlc3QoJ1BVVCcsIHVybCk7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGZuID0gZGF0YTtcbiAgICBkYXRhID0gbnVsbDtcbiAgfVxuXG4gIGlmIChkYXRhKSByZXF1ZXN0Xy5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcXVlc3RfLmVuZChmbik7XG4gIHJldHVybiByZXF1ZXN0Xztcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUVBLElBQUlBLElBQUk7QUFDUixJQUFJLE9BQU9DLE1BQU0sS0FBSyxXQUFXLEVBQUU7RUFDakM7RUFDQUQsSUFBSSxHQUFHQyxNQUFNO0FBQ2YsQ0FBQyxNQUFNLElBQUksT0FBT0MsSUFBSSxLQUFLLFdBQVcsRUFBRTtFQUN0QztFQUNBQyxPQUFPLENBQUNDLElBQUksQ0FDVixxRUFBcUUsQ0FDdEU7RUFDREosSUFBSSxTQUFPO0FBQ2IsQ0FBQyxNQUFNO0VBQ0w7RUFDQUEsSUFBSSxHQUFHRSxJQUFJO0FBQ2I7QUFFQSxNQUFNRyxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztBQUM1QyxNQUFNQyxhQUFhLEdBQUdELE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQztBQUNwRCxNQUFNRSxFQUFFLEdBQUdGLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDeEIsTUFBTUcsV0FBVyxHQUFHSCxPQUFPLENBQUMsZ0JBQWdCLENBQUM7QUFDN0MsaUJBQW9DQSxPQUFPLENBQUMsU0FBUyxDQUFDO0VBQTlDSSxRQUFRLFlBQVJBLFFBQVE7RUFBRUMsS0FBSyxZQUFMQSxLQUFLO0VBQUVDLE1BQU0sWUFBTkEsTUFBTTtBQUMvQixNQUFNQyxZQUFZLEdBQUdQLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztBQUMvQyxNQUFNUSxLQUFLLEdBQUdSLE9BQU8sQ0FBQyxjQUFjLENBQUM7O0FBRXJDO0FBQ0E7QUFDQTs7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

/***/ }),

/***/ "./node_modules/superagent/lib/request-base.js":
/*!*****************************************************!*\
  !*** ./node_modules/superagent/lib/request-base.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");


const semver = __webpack_require__(/*! semver */ "?a24a");

/**
 * Module of mixed-in functions shared between node and client code
 */
const _require = __webpack_require__(/*! ./utils */ "./node_modules/superagent/lib/utils.js"),
  isObject = _require.isObject,
  hasOwn = _require.hasOwn;

/**
 * Expose `RequestBase`.
 */

module.exports = RequestBase;

/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase() {}

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.clearTimeout = function () {
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  clearTimeout(this._uploadTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  delete this._uploadTimeoutTimer;
  return this;
};

/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.parse = function (fn) {
  this._parser = fn;
  return this;
};

/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.responseType = function (value) {
  this._responseType = value;
  return this;
};

/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.serialize = function (fn) {
  this._serializer = fn;
  return this;
};

/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 * - upload is the time  since last bit of data was sent or received. This timeout works only if deadline timeout is off
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, deadline}
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.timeout = function (options) {
  if (!options || typeof options !== 'object') {
    this._timeout = options;
    this._responseTimeout = 0;
    this._uploadTimeout = 0;
    return this;
  }
  for (const option in options) {
    if (hasOwn(options, option)) {
      switch (option) {
        case 'deadline':
          this._timeout = options.deadline;
          break;
        case 'response':
          this._responseTimeout = options.response;
          break;
        case 'upload':
          this._uploadTimeout = options.upload;
          break;
        default:
          console.warn('Unknown timeout option', option);
      }
    }
  }
  return this;
};

/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @param {Function} [fn]
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.retry = function (count, fn) {
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  this._retryCallback = fn;
  return this;
};

//
// NOTE: we do not include ESOCKETTIMEDOUT because that is from `request` package
//       <https://github.com/sindresorhus/got/pull/537>
//
// NOTE: we do not include EADDRINFO because it was removed from libuv in 2014
//       <https://github.com/libuv/libuv/commit/02e1ebd40b807be5af46343ea873331b2ee4e9c1>
//       <https://github.com/request/request/search?q=ESOCKETTIMEDOUT&unscoped_q=ESOCKETTIMEDOUT>
//
//
// TODO: expose these as configurable defaults
//
const ERROR_CODES = new Set(['ETIMEDOUT', 'ECONNRESET', 'EADDRINUSE', 'ECONNREFUSED', 'EPIPE', 'ENOTFOUND', 'ENETUNREACH', 'EAI_AGAIN']);
const STATUS_CODES = new Set([408, 413, 429, 500, 502, 503, 504, 521, 522, 524]);

// TODO: we would need to make this easily configurable before adding it in (e.g. some might want to add POST)
// const METHODS = new Set(['GET', 'PUT', 'HEAD', 'DELETE', 'OPTIONS', 'TRACE']);

/**
 * Determine if a request should be retried.
 * (Inspired by https://github.com/sindresorhus/got#retry)
 *
 * @param {Error} err an error
 * @param {Response} [res] response
 * @returns {Boolean} if segment should be retried
 */
RequestBase.prototype._shouldRetry = function (error, res) {
  if (!this._maxRetries || this._retries++ >= this._maxRetries) {
    return false;
  }
  if (this._retryCallback) {
    try {
      const override = this._retryCallback(error, res);
      if (override === true) return true;
      if (override === false) return false;
      // undefined falls back to defaults
    } catch (err) {
      console.error(err);
    }
  }

  // TODO: we would need to make this easily configurable before adding it in (e.g. some might want to add POST)
  /*
  if (
    this.req &&
    this.req.method &&
    !METHODS.has(this.req.method.toUpperCase())
  )
    return false;
  */
  if (res && res.status && STATUS_CODES.has(res.status)) return true;
  if (error) {
    if (error.code && ERROR_CODES.has(error.code)) return true;
    // Superagent timeout
    if (error.timeout && error.code === 'ECONNABORTED') return true;
    if (error.crossDomain) return true;
  }
  return false;
};

/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */

RequestBase.prototype._retry = function () {
  this.clearTimeout();

  // node
  if (this.req) {
    this.req = null;
    this.req = this.request();
  }
  this._aborted = false;
  this.timedout = false;
  this.timedoutError = null;
  return this._end();
};

/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */

RequestBase.prototype.then = function (resolve, reject) {
  if (!this._fullfilledPromise) {
    const self = this;
    if (this._endCalled) {
      console.warn('Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises');
    }
    this._fullfilledPromise = new Promise((resolve, reject) => {
      self.on('abort', () => {
        if (this._maxRetries && this._maxRetries > this._retries) {
          return;
        }
        if (this.timedout && this.timedoutError) {
          reject(this.timedoutError);
          return;
        }
        const error = new Error('Aborted');
        error.code = 'ABORTED';
        error.status = this.status;
        error.method = this.method;
        error.url = this.url;
        reject(error);
      });
      self.end((error, res) => {
        if (error) reject(error);else resolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
};
RequestBase.prototype.catch = function (callback) {
  return this.then(undefined, callback);
};

/**
 * Allow for extension
 */

RequestBase.prototype.use = function (fn) {
  fn(this);
  return this;
};
RequestBase.prototype.ok = function (callback) {
  if (typeof callback !== 'function') throw new Error('Callback required');
  this._okCallback = callback;
  return this;
};
RequestBase.prototype._isResponseOK = function (res) {
  if (!res) {
    return false;
  }
  if (this._okCallback) {
    return this._okCallback(res);
  }
  return res.status >= 200 && res.status < 300;
};

/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

RequestBase.prototype.get = function (field) {
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

RequestBase.prototype.getHeader = RequestBase.prototype.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function (field, value) {
  if (isObject(field)) {
    for (const key in field) {
      if (hasOwn(field, key)) this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = value;
  this.header[field] = value;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field field name
 */
RequestBase.prototype.unset = function (field) {
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name name of field
 * @param {String|Blob|File|Buffer|fs.ReadStream} val value of field
 * @param {String} options extra options, e.g. 'blob'
 * @return {Request} for chaining
 * @api public
 */
RequestBase.prototype.field = function (name, value, options) {
  // name should be either a string or an object.
  if (name === null || undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }
  if (this._data) {
    throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }
  if (isObject(name)) {
    for (const key in name) {
      if (hasOwn(name, key)) this.field(key, name[key]);
    }
    return this;
  }
  if (Array.isArray(value)) {
    for (const i in value) {
      if (hasOwn(value, i)) this.field(name, value[i]);
    }
    return this;
  }

  // val should be defined now
  if (value === null || undefined === value) {
    throw new Error('.field(name, val) val can not be empty');
  }
  if (typeof value === 'boolean') {
    value = String(value);
  }

  // fix https://github.com/ladjs/superagent/issues/1680
  if (options) this._getFormData().append(name, value, options);else this._getFormData().append(name, value);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request} request
 * @api public
 */
RequestBase.prototype.abort = function () {
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  if (this.xhr) this.xhr.abort(); // browser
  if (this.req) {
    // Node v13 has major differences in `abort()`
    // https://github.com/nodejs/node/blob/v12.x/lib/internal/streams/end-of-stream.js
    // https://github.com/nodejs/node/blob/v13.x/lib/internal/streams/end-of-stream.js
    // https://github.com/nodejs/node/blob/v14.x/lib/internal/streams/end-of-stream.js
    // (if you run a diff across these you will see the differences)
    //
    // References:
    // <https://github.com/nodejs/node/issues/31630>
    // <https://github.com/ladjs/superagent/pull/1084/commits/dc18679a7c5ccfc6046d882015e5126888973bc8>
    //
    // Thanks to @shadowgate15 and @niftylettuce
    if (semver.gte(process.version, 'v13.0.0') && semver.lt(process.version, 'v14.0.0')) {
      // Note that the reason this doesn't work is because in v13 as compared to v14
      // there is no `callback = nop` set in end-of-stream.js above
      throw new Error('Superagent does not work in v13 properly with abort() due to Node.js core changes');
    } else if (semver.gte(process.version, 'v14.0.0')) {
      // We have to manually set `destroyed` to `true` in order for this to work
      // (see core internals of end-of-stream.js above in v14 branch as compared to v12)
      this.req.destroyed = true;
    }
    this.req.abort(); // node
  }

  this.clearTimeout();
  this.emit('abort');
  return this;
};
RequestBase.prototype._auth = function (user, pass, options, base64Encoder) {
  switch (options.type) {
    case 'basic':
      this.set('Authorization', `Basic ${base64Encoder(`${user}:${pass}`)}`);
      break;
    case 'auto':
      this.username = user;
      this.password = pass;
      break;
    case 'bearer':
      // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', `Bearer ${user}`);
      break;
    default:
      break;
  }
  return this;
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 * @param {Boolean} [on=true] - Set 'withCredentials' state
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.withCredentials = function (on) {
  // This is browser-only functionality. Node side is no-op.
  if (on === undefined) on = true;
  this._withCredentials = on;
  return this;
};

/**
 * Set the max redirects to `n`. Does nothing in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.redirects = function (n) {
  this._maxRedirects = n;
  return this;
};

/**
 * Maximum size of buffered response body, in bytes. Counts uncompressed size.
 * Default 200MB.
 *
 * @param {Number} n number of bytes
 * @return {Request} for chaining
 */
RequestBase.prototype.maxResponseSize = function (n) {
  if (typeof n !== 'number') {
    throw new TypeError('Invalid argument');
  }
  this._maxResponseSize = n;
  return this;
};

/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */

RequestBase.prototype.toJSON = function () {
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};

/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

// eslint-disable-next-line complexity
RequestBase.prototype.send = function (data) {
  const isObject_ = isObject(data);
  let type = this._header['content-type'];
  if (this._formData) {
    throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }
  if (isObject_ && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw new Error("Can't merge these send calls");
  }

  // merge
  if (isObject_ && isObject(this._data)) {
    for (const key in data) {
      if (hasOwn(data, key)) this._data[key] = data[key];
    }
  } else if (typeof data === 'string') {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if (type) type = type.toLowerCase().trim();
    if (type === 'application/x-www-form-urlencoded') {
      this._data = this._data ? `${this._data}&${data}` : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }
  if (!isObject_ || this._isHost(data)) {
    return this;
  }

  // default to json
  if (!type) this.type('json');
  return this;
};

/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.sortQuery = function (sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};

/**
 * Compose querystring to append to req.url
 *
 * @api private
 */
RequestBase.prototype._finalizeQueryString = function () {
  const query = this._query.join('&');
  if (query) {
    this.url += (this.url.includes('?') ? '&' : '?') + query;
  }
  this._query.length = 0; // Makes the call idempotent

  if (this._sort) {
    const index = this.url.indexOf('?');
    if (index >= 0) {
      const queryArray = this.url.slice(index + 1).split('&');
      if (typeof this._sort === 'function') {
        queryArray.sort(this._sort);
      } else {
        queryArray.sort();
      }
      this.url = this.url.slice(0, index) + '?' + queryArray.join('&');
    }
  }
};

// For backwards compat only
RequestBase.prototype._appendQueryString = () => {
  console.warn('Unsupported');
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

RequestBase.prototype._timeoutError = function (reason, timeout, errno) {
  if (this._aborted) {
    return;
  }
  const error = new Error(`${reason + timeout}ms exceeded`);
  error.timeout = timeout;
  error.code = 'ECONNABORTED';
  error.errno = errno;
  this.timedout = true;
  this.timedoutError = error;
  this.abort();
  this.callback(error);
};
RequestBase.prototype._setTimeouts = function () {
  const self = this;

  // deadline
  if (this._timeout && !this._timer) {
    this._timer = setTimeout(() => {
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  }

  // response timeout
  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(() => {
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzZW12ZXIiLCJyZXF1aXJlIiwiaXNPYmplY3QiLCJoYXNPd24iLCJtb2R1bGUiLCJleHBvcnRzIiwiUmVxdWVzdEJhc2UiLCJwcm90b3R5cGUiLCJjbGVhclRpbWVvdXQiLCJfdGltZXIiLCJfcmVzcG9uc2VUaW1lb3V0VGltZXIiLCJfdXBsb2FkVGltZW91dFRpbWVyIiwicGFyc2UiLCJmbiIsIl9wYXJzZXIiLCJyZXNwb25zZVR5cGUiLCJ2YWx1ZSIsIl9yZXNwb25zZVR5cGUiLCJzZXJpYWxpemUiLCJfc2VyaWFsaXplciIsInRpbWVvdXQiLCJvcHRpb25zIiwiX3RpbWVvdXQiLCJfcmVzcG9uc2VUaW1lb3V0IiwiX3VwbG9hZFRpbWVvdXQiLCJvcHRpb24iLCJkZWFkbGluZSIsInJlc3BvbnNlIiwidXBsb2FkIiwiY29uc29sZSIsIndhcm4iLCJyZXRyeSIsImNvdW50IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiX21heFJldHJpZXMiLCJfcmV0cmllcyIsIl9yZXRyeUNhbGxiYWNrIiwiRVJST1JfQ09ERVMiLCJTZXQiLCJTVEFUVVNfQ09ERVMiLCJfc2hvdWxkUmV0cnkiLCJlcnJvciIsInJlcyIsIm92ZXJyaWRlIiwiZXJyIiwic3RhdHVzIiwiaGFzIiwiY29kZSIsImNyb3NzRG9tYWluIiwiX3JldHJ5IiwicmVxIiwicmVxdWVzdCIsIl9hYm9ydGVkIiwidGltZWRvdXQiLCJ0aW1lZG91dEVycm9yIiwiX2VuZCIsInRoZW4iLCJyZXNvbHZlIiwicmVqZWN0IiwiX2Z1bGxmaWxsZWRQcm9taXNlIiwic2VsZiIsIl9lbmRDYWxsZWQiLCJQcm9taXNlIiwib24iLCJFcnJvciIsIm1ldGhvZCIsInVybCIsImVuZCIsImNhdGNoIiwiY2FsbGJhY2siLCJ1bmRlZmluZWQiLCJ1c2UiLCJvayIsIl9va0NhbGxiYWNrIiwiX2lzUmVzcG9uc2VPSyIsImdldCIsImZpZWxkIiwiX2hlYWRlciIsInRvTG93ZXJDYXNlIiwiZ2V0SGVhZGVyIiwic2V0Iiwia2V5IiwiaGVhZGVyIiwidW5zZXQiLCJuYW1lIiwiX2RhdGEiLCJBcnJheSIsImlzQXJyYXkiLCJpIiwiU3RyaW5nIiwiX2dldEZvcm1EYXRhIiwiYXBwZW5kIiwiYWJvcnQiLCJ4aHIiLCJndGUiLCJwcm9jZXNzIiwidmVyc2lvbiIsImx0IiwiZGVzdHJveWVkIiwiZW1pdCIsIl9hdXRoIiwidXNlciIsInBhc3MiLCJiYXNlNjRFbmNvZGVyIiwidHlwZSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJ3aXRoQ3JlZGVudGlhbHMiLCJfd2l0aENyZWRlbnRpYWxzIiwicmVkaXJlY3RzIiwibiIsIl9tYXhSZWRpcmVjdHMiLCJtYXhSZXNwb25zZVNpemUiLCJUeXBlRXJyb3IiLCJfbWF4UmVzcG9uc2VTaXplIiwidG9KU09OIiwiZGF0YSIsImhlYWRlcnMiLCJzZW5kIiwiaXNPYmplY3RfIiwiX2Zvcm1EYXRhIiwiX2lzSG9zdCIsInRyaW0iLCJzb3J0UXVlcnkiLCJzb3J0IiwiX3NvcnQiLCJfZmluYWxpemVRdWVyeVN0cmluZyIsInF1ZXJ5IiwiX3F1ZXJ5Iiwiam9pbiIsImluY2x1ZGVzIiwiaW5kZXgiLCJpbmRleE9mIiwicXVlcnlBcnJheSIsInNsaWNlIiwic3BsaXQiLCJfYXBwZW5kUXVlcnlTdHJpbmciLCJfdGltZW91dEVycm9yIiwicmVhc29uIiwiZXJybm8iLCJfc2V0VGltZW91dHMiLCJzZXRUaW1lb3V0Il0sInNvdXJjZXMiOlsiLi4vc3JjL3JlcXVlc3QtYmFzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzZW12ZXIgPSByZXF1aXJlKCdzZW12ZXInKTtcblxuLyoqXG4gKiBNb2R1bGUgb2YgbWl4ZWQtaW4gZnVuY3Rpb25zIHNoYXJlZCBiZXR3ZWVuIG5vZGUgYW5kIGNsaWVudCBjb2RlXG4gKi9cbmNvbnN0IHsgaXNPYmplY3QsIGhhc093biB9ID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG4vKipcbiAqIEV4cG9zZSBgUmVxdWVzdEJhc2VgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUmVxdWVzdEJhc2U7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVxdWVzdEJhc2VgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdEJhc2UoKSB7fVxuXG4vKipcbiAqIENsZWFyIHByZXZpb3VzIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5jbGVhclRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gIGNsZWFyVGltZW91dCh0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcik7XG4gIGNsZWFyVGltZW91dCh0aGlzLl91cGxvYWRUaW1lb3V0VGltZXIpO1xuICBkZWxldGUgdGhpcy5fdGltZXI7XG4gIGRlbGV0ZSB0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcjtcbiAgZGVsZXRlIHRoaXMuX3VwbG9hZFRpbWVvdXRUaW1lcjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE92ZXJyaWRlIGRlZmF1bHQgcmVzcG9uc2UgYm9keSBwYXJzZXJcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHRvIGNvbnZlcnQgaW5jb21pbmcgZGF0YSBpbnRvIHJlcXVlc3QuYm9keVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIChmbikge1xuICB0aGlzLl9wYXJzZXIgPSBmbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBmb3JtYXQgb2YgYmluYXJ5IHJlc3BvbnNlIGJvZHkuXG4gKiBJbiBicm93c2VyIHZhbGlkIGZvcm1hdHMgYXJlICdibG9iJyBhbmQgJ2FycmF5YnVmZmVyJyxcbiAqIHdoaWNoIHJldHVybiBCbG9iIGFuZCBBcnJheUJ1ZmZlciwgcmVzcGVjdGl2ZWx5LlxuICpcbiAqIEluIE5vZGUgYWxsIHZhbHVlcyByZXN1bHQgaW4gQnVmZmVyLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnJlc3BvbnNlVHlwZSgnYmxvYicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5yZXNwb25zZVR5cGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdGhpcy5fcmVzcG9uc2VUeXBlID0gdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPdmVycmlkZSBkZWZhdWx0IHJlcXVlc3QgYm9keSBzZXJpYWxpemVyXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB0byBjb252ZXJ0IGRhdGEgc2V0IHZpYSAuc2VuZCBvciAuYXR0YWNoIGludG8gcGF5bG9hZCB0byBzZW5kXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChmbikge1xuICB0aGlzLl9zZXJpYWxpemVyID0gZm47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGltZW91dHMuXG4gKlxuICogLSByZXNwb25zZSB0aW1lb3V0IGlzIHRpbWUgYmV0d2VlbiBzZW5kaW5nIHJlcXVlc3QgYW5kIHJlY2VpdmluZyB0aGUgZmlyc3QgYnl0ZSBvZiB0aGUgcmVzcG9uc2UuIEluY2x1ZGVzIEROUyBhbmQgY29ubmVjdGlvbiB0aW1lLlxuICogLSBkZWFkbGluZSBpcyB0aGUgdGltZSBmcm9tIHN0YXJ0IG9mIHRoZSByZXF1ZXN0IHRvIHJlY2VpdmluZyByZXNwb25zZSBib2R5IGluIGZ1bGwuIElmIHRoZSBkZWFkbGluZSBpcyB0b28gc2hvcnQgbGFyZ2UgZmlsZXMgbWF5IG5vdCBsb2FkIGF0IGFsbCBvbiBzbG93IGNvbm5lY3Rpb25zLlxuICogLSB1cGxvYWQgaXMgdGhlIHRpbWUgIHNpbmNlIGxhc3QgYml0IG9mIGRhdGEgd2FzIHNlbnQgb3IgcmVjZWl2ZWQuIFRoaXMgdGltZW91dCB3b3JrcyBvbmx5IGlmIGRlYWRsaW5lIHRpbWVvdXQgaXMgb2ZmXG4gKlxuICogVmFsdWUgb2YgMCBvciBmYWxzZSBtZWFucyBubyB0aW1lb3V0LlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gbXMgb3Ige3Jlc3BvbnNlLCBkZWFkbGluZX1cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudGltZW91dCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aGlzLl90aW1lb3V0ID0gb3B0aW9ucztcbiAgICB0aGlzLl9yZXNwb25zZVRpbWVvdXQgPSAwO1xuICAgIHRoaXMuX3VwbG9hZFRpbWVvdXQgPSAwO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZm9yIChjb25zdCBvcHRpb24gaW4gb3B0aW9ucykge1xuICAgIGlmIChoYXNPd24ob3B0aW9ucywgb3B0aW9uKSkge1xuICAgICAgc3dpdGNoIChvcHRpb24pIHtcbiAgICAgICAgY2FzZSAnZGVhZGxpbmUnOlxuICAgICAgICAgIHRoaXMuX3RpbWVvdXQgPSBvcHRpb25zLmRlYWRsaW5lO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyZXNwb25zZSc6XG4gICAgICAgICAgdGhpcy5fcmVzcG9uc2VUaW1lb3V0ID0gb3B0aW9ucy5yZXNwb25zZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndXBsb2FkJzpcbiAgICAgICAgICB0aGlzLl91cGxvYWRUaW1lb3V0ID0gb3B0aW9ucy51cGxvYWQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS53YXJuKCdVbmtub3duIHRpbWVvdXQgb3B0aW9uJywgb3B0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IG51bWJlciBvZiByZXRyeSBhdHRlbXB0cyBvbiBlcnJvci5cbiAqXG4gKiBGYWlsZWQgcmVxdWVzdHMgd2lsbCBiZSByZXRyaWVkICdjb3VudCcgdGltZXMgaWYgdGltZW91dCBvciBlcnIuY29kZSA+PSA1MDAuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJldHJ5ID0gZnVuY3Rpb24gKGNvdW50LCBmbikge1xuICAvLyBEZWZhdWx0IHRvIDEgaWYgbm8gY291bnQgcGFzc2VkIG9yIHRydWVcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgY291bnQgPT09IHRydWUpIGNvdW50ID0gMTtcbiAgaWYgKGNvdW50IDw9IDApIGNvdW50ID0gMDtcbiAgdGhpcy5fbWF4UmV0cmllcyA9IGNvdW50O1xuICB0aGlzLl9yZXRyaWVzID0gMDtcbiAgdGhpcy5fcmV0cnlDYWxsYmFjayA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBOT1RFOiB3ZSBkbyBub3QgaW5jbHVkZSBFU09DS0VUVElNRURPVVQgYmVjYXVzZSB0aGF0IGlzIGZyb20gYHJlcXVlc3RgIHBhY2thZ2Vcbi8vICAgICAgIDxodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL2dvdC9wdWxsLzUzNz5cbi8vXG4vLyBOT1RFOiB3ZSBkbyBub3QgaW5jbHVkZSBFQUREUklORk8gYmVjYXVzZSBpdCB3YXMgcmVtb3ZlZCBmcm9tIGxpYnV2IGluIDIwMTRcbi8vICAgICAgIDxodHRwczovL2dpdGh1Yi5jb20vbGlidXYvbGlidXYvY29tbWl0LzAyZTFlYmQ0MGI4MDdiZTVhZjQ2MzQzZWE4NzMzMzFiMmVlNGU5YzE+XG4vLyAgICAgICA8aHR0cHM6Ly9naXRodWIuY29tL3JlcXVlc3QvcmVxdWVzdC9zZWFyY2g/cT1FU09DS0VUVElNRURPVVQmdW5zY29wZWRfcT1FU09DS0VUVElNRURPVVQ+XG4vL1xuLy9cbi8vIFRPRE86IGV4cG9zZSB0aGVzZSBhcyBjb25maWd1cmFibGUgZGVmYXVsdHNcbi8vXG5jb25zdCBFUlJPUl9DT0RFUyA9IG5ldyBTZXQoW1xuICAnRVRJTUVET1VUJyxcbiAgJ0VDT05OUkVTRVQnLFxuICAnRUFERFJJTlVTRScsXG4gICdFQ09OTlJFRlVTRUQnLFxuICAnRVBJUEUnLFxuICAnRU5PVEZPVU5EJyxcbiAgJ0VORVRVTlJFQUNIJyxcbiAgJ0VBSV9BR0FJTidcbl0pO1xuXG5jb25zdCBTVEFUVVNfQ09ERVMgPSBuZXcgU2V0KFtcbiAgNDA4LCA0MTMsIDQyOSwgNTAwLCA1MDIsIDUwMywgNTA0LCA1MjEsIDUyMiwgNTI0XG5dKTtcblxuLy8gVE9ETzogd2Ugd291bGQgbmVlZCB0byBtYWtlIHRoaXMgZWFzaWx5IGNvbmZpZ3VyYWJsZSBiZWZvcmUgYWRkaW5nIGl0IGluIChlLmcuIHNvbWUgbWlnaHQgd2FudCB0byBhZGQgUE9TVClcbi8vIGNvbnN0IE1FVEhPRFMgPSBuZXcgU2V0KFsnR0VUJywgJ1BVVCcsICdIRUFEJywgJ0RFTEVURScsICdPUFRJT05TJywgJ1RSQUNFJ10pO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHJlcXVlc3Qgc2hvdWxkIGJlIHJldHJpZWQuXG4gKiAoSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9nb3QjcmV0cnkpXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyIGFuIGVycm9yXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzXSByZXNwb25zZVxuICogQHJldHVybnMge0Jvb2xlYW59IGlmIHNlZ21lbnQgc2hvdWxkIGJlIHJldHJpZWRcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9zaG91bGRSZXRyeSA9IGZ1bmN0aW9uIChlcnJvciwgcmVzKSB7XG4gIGlmICghdGhpcy5fbWF4UmV0cmllcyB8fCB0aGlzLl9yZXRyaWVzKysgPj0gdGhpcy5fbWF4UmV0cmllcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0aGlzLl9yZXRyeUNhbGxiYWNrKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG92ZXJyaWRlID0gdGhpcy5fcmV0cnlDYWxsYmFjayhlcnJvciwgcmVzKTtcbiAgICAgIGlmIChvdmVycmlkZSA9PT0gdHJ1ZSkgcmV0dXJuIHRydWU7XG4gICAgICBpZiAob3ZlcnJpZGUgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gICAgICAvLyB1bmRlZmluZWQgZmFsbHMgYmFjayB0byBkZWZhdWx0c1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE86IHdlIHdvdWxkIG5lZWQgdG8gbWFrZSB0aGlzIGVhc2lseSBjb25maWd1cmFibGUgYmVmb3JlIGFkZGluZyBpdCBpbiAoZS5nLiBzb21lIG1pZ2h0IHdhbnQgdG8gYWRkIFBPU1QpXG4gIC8qXG4gIGlmIChcbiAgICB0aGlzLnJlcSAmJlxuICAgIHRoaXMucmVxLm1ldGhvZCAmJlxuICAgICFNRVRIT0RTLmhhcyh0aGlzLnJlcS5tZXRob2QudG9VcHBlckNhc2UoKSlcbiAgKVxuICAgIHJldHVybiBmYWxzZTtcbiAgKi9cbiAgaWYgKHJlcyAmJiByZXMuc3RhdHVzICYmIFNUQVRVU19DT0RFUy5oYXMocmVzLnN0YXR1cykpIHJldHVybiB0cnVlO1xuICBpZiAoZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IuY29kZSAmJiBFUlJPUl9DT0RFUy5oYXMoZXJyb3IuY29kZSkpIHJldHVybiB0cnVlO1xuICAgIC8vIFN1cGVyYWdlbnQgdGltZW91dFxuICAgIGlmIChlcnJvci50aW1lb3V0ICYmIGVycm9yLmNvZGUgPT09ICdFQ09OTkFCT1JURUQnKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoZXJyb3IuY3Jvc3NEb21haW4pIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBSZXRyeSByZXF1ZXN0XG4gKlxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3JldHJ5ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuXG4gIC8vIG5vZGVcbiAgaWYgKHRoaXMucmVxKSB7XG4gICAgdGhpcy5yZXEgPSBudWxsO1xuICAgIHRoaXMucmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gIH1cblxuICB0aGlzLl9hYm9ydGVkID0gZmFsc2U7XG4gIHRoaXMudGltZWRvdXQgPSBmYWxzZTtcbiAgdGhpcy50aW1lZG91dEVycm9yID0gbnVsbDtcblxuICByZXR1cm4gdGhpcy5fZW5kKCk7XG59O1xuXG4vKipcbiAqIFByb21pc2Ugc3VwcG9ydFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZWplY3RdXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICBpZiAoIXRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgaWYgKHRoaXMuX2VuZENhbGxlZCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnV2FybmluZzogc3VwZXJhZ2VudCByZXF1ZXN0IHdhcyBzZW50IHR3aWNlLCBiZWNhdXNlIGJvdGggLmVuZCgpIGFuZCAudGhlbigpIHdlcmUgY2FsbGVkLiBOZXZlciBjYWxsIC5lbmQoKSBpZiB5b3UgdXNlIHByb21pc2VzJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNlbGYub24oJ2Fib3J0JywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fbWF4UmV0cmllcyAmJiB0aGlzLl9tYXhSZXRyaWVzID4gdGhpcy5fcmV0cmllcykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRpbWVkb3V0ICYmIHRoaXMudGltZWRvdXRFcnJvcikge1xuICAgICAgICAgIHJlamVjdCh0aGlzLnRpbWVkb3V0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCdBYm9ydGVkJyk7XG4gICAgICAgIGVycm9yLmNvZGUgPSAnQUJPUlRFRCc7XG4gICAgICAgIGVycm9yLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICAgICAgICBlcnJvci5tZXRob2QgPSB0aGlzLm1ldGhvZDtcbiAgICAgICAgZXJyb3IudXJsID0gdGhpcy51cmw7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9KTtcbiAgICAgIHNlbGYuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgIGlmIChlcnJvcikgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgZWxzZSByZXNvbHZlKHJlcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuY2F0Y2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogQWxsb3cgZm9yIGV4dGVuc2lvblxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiAoZm4pIHtcbiAgZm4odGhpcyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLm9rID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBFcnJvcignQ2FsbGJhY2sgcmVxdWlyZWQnKTtcbiAgdGhpcy5fb2tDYWxsYmFjayA9IGNhbGxiYWNrO1xuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5faXNSZXNwb25zZU9LID0gZnVuY3Rpb24gKHJlcykge1xuICBpZiAoIXJlcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0aGlzLl9va0NhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuX29rQ2FsbGJhY2socmVzKTtcbiAgfVxuXG4gIHJldHVybiByZXMuc3RhdHVzID49IDIwMCAmJiByZXMuc3RhdHVzIDwgMzAwO1xufTtcblxuLyoqXG4gKiBHZXQgcmVxdWVzdCBoZWFkZXIgYGZpZWxkYC5cbiAqIENhc2UtaW5zZW5zaXRpdmUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoZmllbGQpIHtcbiAgcmV0dXJuIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogR2V0IGNhc2UtaW5zZW5zaXRpdmUgaGVhZGVyIGBmaWVsZGAgdmFsdWUuXG4gKiBUaGlzIGlzIGEgZGVwcmVjYXRlZCBpbnRlcm5hbCBBUEkuIFVzZSBgLmdldChmaWVsZClgIGluc3RlYWQuXG4gKlxuICogKGdldEhlYWRlciBpcyBubyBsb25nZXIgdXNlZCBpbnRlcm5hbGx5IGJ5IHRoZSBzdXBlcmFnZW50IGNvZGUgYmFzZSlcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICogQGRlcHJlY2F0ZWRcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuZ2V0SGVhZGVyID0gUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldDtcblxuLyoqXG4gKiBTZXQgaGVhZGVyIGBmaWVsZGAgdG8gYHZhbGAsIG9yIG11bHRpcGxlIGZpZWxkcyB3aXRoIG9uZSBvYmplY3QuXG4gKiBDYXNlLWluc2Vuc2l0aXZlLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5zZXQoJ1gtQVBJLUtleScsICdmb29iYXInKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCh7IEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLCAnWC1BUEktS2V5JzogJ2Zvb2JhcicgfSlcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGZpZWxkXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChmaWVsZCwgdmFsdWUpIHtcbiAgaWYgKGlzT2JqZWN0KGZpZWxkKSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGZpZWxkKSB7XG4gICAgICBpZiAoaGFzT3duKGZpZWxkLCBrZXkpKSB0aGlzLnNldChrZXksIGZpZWxkW2tleV0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldID0gdmFsdWU7XG4gIHRoaXMuaGVhZGVyW2ZpZWxkXSA9IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGhlYWRlciBgZmllbGRgLlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnVuc2V0KCdVc2VyLUFnZW50JylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGQgZmllbGQgbmFtZVxuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbiAoZmllbGQpIHtcbiAgZGVsZXRlIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbiAgZGVsZXRlIHRoaXMuaGVhZGVyW2ZpZWxkXTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFdyaXRlIHRoZSBmaWVsZCBgbmFtZWAgYW5kIGB2YWxgLCBvciBtdWx0aXBsZSBmaWVsZHMgd2l0aCBvbmUgb2JqZWN0XG4gKiBmb3IgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIgcmVxdWVzdCBib2RpZXMuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuZmllbGQoJ2ZvbycsICdiYXInKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuZmllbGQoeyBmb286ICdiYXInLCBiYXo6ICdxdXgnIH0pXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBuYW1lIG5hbWUgb2YgZmllbGRcbiAqIEBwYXJhbSB7U3RyaW5nfEJsb2J8RmlsZXxCdWZmZXJ8ZnMuUmVhZFN0cmVhbX0gdmFsIHZhbHVlIG9mIGZpZWxkXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucyBleHRyYSBvcHRpb25zLCBlLmcuICdibG9iJ1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuZmllbGQgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgLy8gbmFtZSBzaG91bGQgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIG9iamVjdC5cbiAgaWYgKG5hbWUgPT09IG51bGwgfHwgdW5kZWZpbmVkID09PSBuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCcuZmllbGQobmFtZSwgdmFsKSBuYW1lIGNhbiBub3QgYmUgZW1wdHknKTtcbiAgfVxuXG4gIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCIuZmllbGQoKSBjYW4ndCBiZSB1c2VkIGlmIC5zZW5kKCkgaXMgdXNlZC4gUGxlYXNlIHVzZSBvbmx5IC5zZW5kKCkgb3Igb25seSAuZmllbGQoKSAmIC5hdHRhY2goKVwiXG4gICAgKTtcbiAgfVxuXG4gIGlmIChpc09iamVjdChuYW1lKSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIG5hbWUpIHtcbiAgICAgIGlmIChoYXNPd24obmFtZSwga2V5KSkgdGhpcy5maWVsZChrZXksIG5hbWVba2V5XSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGNvbnN0IGkgaW4gdmFsdWUpIHtcbiAgICAgIGlmIChoYXNPd24odmFsdWUsIGkpKSB0aGlzLmZpZWxkKG5hbWUsIHZhbHVlW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHZhbCBzaG91bGQgYmUgZGVmaW5lZCBub3dcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHVuZGVmaW5lZCA9PT0gdmFsdWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJy5maWVsZChuYW1lLCB2YWwpIHZhbCBjYW4gbm90IGJlIGVtcHR5Jyk7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG4gIH1cblxuICAvLyBmaXggaHR0cHM6Ly9naXRodWIuY29tL2xhZGpzL3N1cGVyYWdlbnQvaXNzdWVzLzE2ODBcbiAgaWYgKG9wdGlvbnMpIHRoaXMuX2dldEZvcm1EYXRhKCkuYXBwZW5kKG5hbWUsIHZhbHVlLCBvcHRpb25zKTtcbiAgZWxzZSB0aGlzLl9nZXRGb3JtRGF0YSgpLmFwcGVuZChuYW1lLCB2YWx1ZSk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFib3J0IHRoZSByZXF1ZXN0LCBhbmQgY2xlYXIgcG90ZW50aWFsIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH0gcmVxdWVzdFxuICogQGFwaSBwdWJsaWNcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5fYWJvcnRlZCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdGhpcy5fYWJvcnRlZCA9IHRydWU7XG4gIGlmICh0aGlzLnhocikgdGhpcy54aHIuYWJvcnQoKTsgLy8gYnJvd3NlclxuICBpZiAodGhpcy5yZXEpIHtcbiAgICAvLyBOb2RlIHYxMyBoYXMgbWFqb3IgZGlmZmVyZW5jZXMgaW4gYGFib3J0KClgXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2Jsb2IvdjEyLngvbGliL2ludGVybmFsL3N0cmVhbXMvZW5kLW9mLXN0cmVhbS5qc1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9ibG9iL3YxMy54L2xpYi9pbnRlcm5hbC9zdHJlYW1zL2VuZC1vZi1zdHJlYW0uanNcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvYmxvYi92MTQueC9saWIvaW50ZXJuYWwvc3RyZWFtcy9lbmQtb2Ytc3RyZWFtLmpzXG4gICAgLy8gKGlmIHlvdSBydW4gYSBkaWZmIGFjcm9zcyB0aGVzZSB5b3Ugd2lsbCBzZWUgdGhlIGRpZmZlcmVuY2VzKVxuICAgIC8vXG4gICAgLy8gUmVmZXJlbmNlczpcbiAgICAvLyA8aHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2lzc3Vlcy8zMTYzMD5cbiAgICAvLyA8aHR0cHM6Ly9naXRodWIuY29tL2xhZGpzL3N1cGVyYWdlbnQvcHVsbC8xMDg0L2NvbW1pdHMvZGMxODY3OWE3YzVjY2ZjNjA0NmQ4ODIwMTVlNTEyNjg4ODk3M2JjOD5cbiAgICAvL1xuICAgIC8vIFRoYW5rcyB0byBAc2hhZG93Z2F0ZTE1IGFuZCBAbmlmdHlsZXR0dWNlXG4gICAgaWYgKFxuICAgICAgc2VtdmVyLmd0ZShwcm9jZXNzLnZlcnNpb24sICd2MTMuMC4wJykgJiZcbiAgICAgIHNlbXZlci5sdChwcm9jZXNzLnZlcnNpb24sICd2MTQuMC4wJylcbiAgICApIHtcbiAgICAgIC8vIE5vdGUgdGhhdCB0aGUgcmVhc29uIHRoaXMgZG9lc24ndCB3b3JrIGlzIGJlY2F1c2UgaW4gdjEzIGFzIGNvbXBhcmVkIHRvIHYxNFxuICAgICAgLy8gdGhlcmUgaXMgbm8gYGNhbGxiYWNrID0gbm9wYCBzZXQgaW4gZW5kLW9mLXN0cmVhbS5qcyBhYm92ZVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnU3VwZXJhZ2VudCBkb2VzIG5vdCB3b3JrIGluIHYxMyBwcm9wZXJseSB3aXRoIGFib3J0KCkgZHVlIHRvIE5vZGUuanMgY29yZSBjaGFuZ2VzJ1xuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHNlbXZlci5ndGUocHJvY2Vzcy52ZXJzaW9uLCAndjE0LjAuMCcpKSB7XG4gICAgICAvLyBXZSBoYXZlIHRvIG1hbnVhbGx5IHNldCBgZGVzdHJveWVkYCB0byBgdHJ1ZWAgaW4gb3JkZXIgZm9yIHRoaXMgdG8gd29ya1xuICAgICAgLy8gKHNlZSBjb3JlIGludGVybmFscyBvZiBlbmQtb2Ytc3RyZWFtLmpzIGFib3ZlIGluIHYxNCBicmFuY2ggYXMgY29tcGFyZWQgdG8gdjEyKVxuICAgICAgdGhpcy5yZXEuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLnJlcS5hYm9ydCgpOyAvLyBub2RlXG4gIH1cblxuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICB0aGlzLmVtaXQoJ2Fib3J0Jyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9hdXRoID0gZnVuY3Rpb24gKHVzZXIsIHBhc3MsIG9wdGlvbnMsIGJhc2U2NEVuY29kZXIpIHtcbiAgc3dpdGNoIChvcHRpb25zLnR5cGUpIHtcbiAgICBjYXNlICdiYXNpYyc6XG4gICAgICB0aGlzLnNldCgnQXV0aG9yaXphdGlvbicsIGBCYXNpYyAke2Jhc2U2NEVuY29kZXIoYCR7dXNlcn06JHtwYXNzfWApfWApO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdhdXRvJzpcbiAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VyO1xuICAgICAgdGhpcy5wYXNzd29yZCA9IHBhc3M7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2JlYXJlcic6IC8vIHVzYWdlIHdvdWxkIGJlIC5hdXRoKGFjY2Vzc1Rva2VuLCB7IHR5cGU6ICdiZWFyZXInIH0pXG4gICAgICB0aGlzLnNldCgnQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHt1c2VyfWApO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEVuYWJsZSB0cmFuc21pc3Npb24gb2YgY29va2llcyB3aXRoIHgtZG9tYWluIHJlcXVlc3RzLlxuICpcbiAqIE5vdGUgdGhhdCBmb3IgdGhpcyB0byB3b3JrIHRoZSBvcmlnaW4gbXVzdCBub3QgYmVcbiAqIHVzaW5nIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIgd2l0aCBhIHdpbGRjYXJkLFxuICogYW5kIGFsc28gbXVzdCBzZXQgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiXG4gKiB0byBcInRydWVcIi5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29uPXRydWVdIC0gU2V0ICd3aXRoQ3JlZGVudGlhbHMnIHN0YXRlXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLndpdGhDcmVkZW50aWFscyA9IGZ1bmN0aW9uIChvbikge1xuICAvLyBUaGlzIGlzIGJyb3dzZXItb25seSBmdW5jdGlvbmFsaXR5LiBOb2RlIHNpZGUgaXMgbm8tb3AuXG4gIGlmIChvbiA9PT0gdW5kZWZpbmVkKSBvbiA9IHRydWU7XG4gIHRoaXMuX3dpdGhDcmVkZW50aWFscyA9IG9uO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBtYXggcmVkaXJlY3RzIHRvIGBuYC4gRG9lcyBub3RoaW5nIGluIGJyb3dzZXIgWEhSIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJlZGlyZWN0cyA9IGZ1bmN0aW9uIChuKSB7XG4gIHRoaXMuX21heFJlZGlyZWN0cyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNYXhpbXVtIHNpemUgb2YgYnVmZmVyZWQgcmVzcG9uc2UgYm9keSwgaW4gYnl0ZXMuIENvdW50cyB1bmNvbXByZXNzZWQgc2l6ZS5cbiAqIERlZmF1bHQgMjAwTUIuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG4gbnVtYmVyIG9mIGJ5dGVzXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLm1heFJlc3BvbnNlU2l6ZSA9IGZ1bmN0aW9uIChuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGFyZ3VtZW50Jyk7XG4gIH1cblxuICB0aGlzLl9tYXhSZXNwb25zZVNpemUgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ29udmVydCB0byBhIHBsYWluIGphdmFzY3JpcHQgb2JqZWN0IChub3QgSlNPTiBzdHJpbmcpIG9mIHNjYWxhciBwcm9wZXJ0aWVzLlxuICogTm90ZSBhcyB0aGlzIG1ldGhvZCBpcyBkZXNpZ25lZCB0byByZXR1cm4gYSB1c2VmdWwgbm9uLXRoaXMgdmFsdWUsXG4gKiBpdCBjYW5ub3QgYmUgY2hhaW5lZC5cbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGRlc2NyaWJpbmcgbWV0aG9kLCB1cmwsIGFuZCBkYXRhIG9mIHRoaXMgcmVxdWVzdFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIG1ldGhvZDogdGhpcy5tZXRob2QsXG4gICAgdXJsOiB0aGlzLnVybCxcbiAgICBkYXRhOiB0aGlzLl9kYXRhLFxuICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlclxuICB9O1xufTtcblxuLyoqXG4gKiBTZW5kIGBkYXRhYCBhcyB0aGUgcmVxdWVzdCBib2R5LCBkZWZhdWx0aW5nIHRoZSBgLnR5cGUoKWAgdG8gXCJqc29uXCIgd2hlblxuICogYW4gb2JqZWN0IGlzIGdpdmVuLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgIC8vIG1hbnVhbCBqc29uXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2pzb24nKVxuICogICAgICAgICAuc2VuZCgne1wibmFtZVwiOlwidGpcIn0nKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGF1dG8ganNvblxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIG1hbnVhbCB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnZm9ybScpXG4gKiAgICAgICAgIC5zZW5kKCduYW1lPXRqJylcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBhdXRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdmb3JtJylcbiAqICAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gZGVmYXVsdHMgdG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKCduYW1lPXRvYmknKVxuICogICAgICAgIC5zZW5kKCdzcGVjaWVzPWZlcnJldCcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGRhdGFcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICBjb25zdCBpc09iamVjdF8gPSBpc09iamVjdChkYXRhKTtcbiAgbGV0IHR5cGUgPSB0aGlzLl9oZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuXG4gIGlmICh0aGlzLl9mb3JtRGF0YSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIFwiLnNlbmQoKSBjYW4ndCBiZSB1c2VkIGlmIC5hdHRhY2goKSBvciAuZmllbGQoKSBpcyB1c2VkLiBQbGVhc2UgdXNlIG9ubHkgLnNlbmQoKSBvciBvbmx5IC5maWVsZCgpICYgLmF0dGFjaCgpXCJcbiAgICApO1xuICB9XG5cbiAgaWYgKGlzT2JqZWN0XyAmJiAhdGhpcy5fZGF0YSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICB0aGlzLl9kYXRhID0gW107XG4gICAgfSBlbHNlIGlmICghdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgfVxuICB9IGVsc2UgaWYgKGRhdGEgJiYgdGhpcy5fZGF0YSAmJiB0aGlzLl9pc0hvc3QodGhpcy5fZGF0YSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBtZXJnZSB0aGVzZSBzZW5kIGNhbGxzXCIpO1xuICB9XG5cbiAgLy8gbWVyZ2VcbiAgaWYgKGlzT2JqZWN0XyAmJiBpc09iamVjdCh0aGlzLl9kYXRhKSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICAgIGlmIChoYXNPd24oZGF0YSwga2V5KSkgdGhpcy5fZGF0YVtrZXldID0gZGF0YVtrZXldO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBkZWZhdWx0IHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICAgIGlmICghdHlwZSkgdGhpcy50eXBlKCdmb3JtJyk7XG4gICAgdHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG4gICAgaWYgKHR5cGUpIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgIGlmICh0eXBlID09PSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykge1xuICAgICAgdGhpcy5fZGF0YSA9IHRoaXMuX2RhdGEgPyBgJHt0aGlzLl9kYXRhfSYke2RhdGF9YCA6IGRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RhdGEgPSAodGhpcy5fZGF0YSB8fCAnJykgKyBkYXRhO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgfVxuXG4gIGlmICghaXNPYmplY3RfIHx8IHRoaXMuX2lzSG9zdChkYXRhKSkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZGVmYXVsdCB0byBqc29uXG4gIGlmICghdHlwZSkgdGhpcy50eXBlKCdqc29uJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTb3J0IGBxdWVyeXN0cmluZ2AgYnkgdGhlIHNvcnQgZnVuY3Rpb25cbiAqXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICAgLy8gZGVmYXVsdCBvcmRlclxuICogICAgICAgcmVxdWVzdC5nZXQoJy91c2VyJylcbiAqICAgICAgICAgLnF1ZXJ5KCduYW1lPU5pY2snKVxuICogICAgICAgICAucXVlcnkoJ3NlYXJjaD1NYW5ueScpXG4gKiAgICAgICAgIC5zb3J0UXVlcnkoKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGN1c3RvbWl6ZWQgc29ydCBmdW5jdGlvblxuICogICAgICAgcmVxdWVzdC5nZXQoJy91c2VyJylcbiAqICAgICAgICAgLnF1ZXJ5KCduYW1lPU5pY2snKVxuICogICAgICAgICAucXVlcnkoJ3NlYXJjaD1NYW5ueScpXG4gKiAgICAgICAgIC5zb3J0UXVlcnkoZnVuY3Rpb24oYSwgYil7XG4gKiAgICAgICAgICAgcmV0dXJuIGEubGVuZ3RoIC0gYi5sZW5ndGg7XG4gKiAgICAgICAgIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNvcnRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc29ydFF1ZXJ5ID0gZnVuY3Rpb24gKHNvcnQpIHtcbiAgLy8gX3NvcnQgZGVmYXVsdCB0byB0cnVlIGJ1dCBvdGhlcndpc2UgY2FuIGJlIGEgZnVuY3Rpb24gb3IgYm9vbGVhblxuICB0aGlzLl9zb3J0ID0gdHlwZW9mIHNvcnQgPT09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IHNvcnQ7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDb21wb3NlIHF1ZXJ5c3RyaW5nIHRvIGFwcGVuZCB0byByZXEudXJsXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fZmluYWxpemVRdWVyeVN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcXVlcnkgPSB0aGlzLl9xdWVyeS5qb2luKCcmJyk7XG4gIGlmIChxdWVyeSkge1xuICAgIHRoaXMudXJsICs9ICh0aGlzLnVybC5pbmNsdWRlcygnPycpID8gJyYnIDogJz8nKSArIHF1ZXJ5O1xuICB9XG5cbiAgdGhpcy5fcXVlcnkubGVuZ3RoID0gMDsgLy8gTWFrZXMgdGhlIGNhbGwgaWRlbXBvdGVudFxuXG4gIGlmICh0aGlzLl9zb3J0KSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnVybC5pbmRleE9mKCc/Jyk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIGNvbnN0IHF1ZXJ5QXJyYXkgPSB0aGlzLnVybC5zbGljZShpbmRleCArIDEpLnNwbGl0KCcmJyk7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuX3NvcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcXVlcnlBcnJheS5zb3J0KHRoaXMuX3NvcnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcXVlcnlBcnJheS5zb3J0KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudXJsID0gdGhpcy51cmwuc2xpY2UoMCwgaW5kZXgpICsgJz8nICsgcXVlcnlBcnJheS5qb2luKCcmJyk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBGb3IgYmFja3dhcmRzIGNvbXBhdCBvbmx5XG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX2FwcGVuZFF1ZXJ5U3RyaW5nID0gKCkgPT4ge1xuICBjb25zb2xlLndhcm4oJ1Vuc3VwcG9ydGVkJyk7XG59O1xuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHRpbWVvdXQgZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl90aW1lb3V0RXJyb3IgPSBmdW5jdGlvbiAocmVhc29uLCB0aW1lb3V0LCBlcnJubykge1xuICBpZiAodGhpcy5fYWJvcnRlZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGAke3JlYXNvbiArIHRpbWVvdXR9bXMgZXhjZWVkZWRgKTtcbiAgZXJyb3IudGltZW91dCA9IHRpbWVvdXQ7XG4gIGVycm9yLmNvZGUgPSAnRUNPTk5BQk9SVEVEJztcbiAgZXJyb3IuZXJybm8gPSBlcnJubztcbiAgdGhpcy50aW1lZG91dCA9IHRydWU7XG4gIHRoaXMudGltZWRvdXRFcnJvciA9IGVycm9yO1xuICB0aGlzLmFib3J0KCk7XG4gIHRoaXMuY2FsbGJhY2soZXJyb3IpO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9zZXRUaW1lb3V0cyA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgLy8gZGVhZGxpbmVcbiAgaWYgKHRoaXMuX3RpbWVvdXQgJiYgIXRoaXMuX3RpbWVyKSB7XG4gICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNlbGYuX3RpbWVvdXRFcnJvcignVGltZW91dCBvZiAnLCBzZWxmLl90aW1lb3V0LCAnRVRJTUUnKTtcbiAgICB9LCB0aGlzLl90aW1lb3V0KTtcbiAgfVxuXG4gIC8vIHJlc3BvbnNlIHRpbWVvdXRcbiAgaWYgKHRoaXMuX3Jlc3BvbnNlVGltZW91dCAmJiAhdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXIpIHtcbiAgICB0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2VsZi5fdGltZW91dEVycm9yKFxuICAgICAgICAnUmVzcG9uc2UgdGltZW91dCBvZiAnLFxuICAgICAgICBzZWxmLl9yZXNwb25zZVRpbWVvdXQsXG4gICAgICAgICdFVElNRURPVVQnXG4gICAgICApO1xuICAgIH0sIHRoaXMuX3Jlc3BvbnNlVGltZW91dCk7XG4gIH1cbn07XG4iXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBUSxDQUFDOztBQUVoQztBQUNBO0FBQ0E7QUFDQSxpQkFBNkJBLE9BQU8sQ0FBQyxTQUFTLENBQUM7RUFBdkNDLFFBQVEsWUFBUkEsUUFBUTtFQUFFQyxNQUFNLFlBQU5BLE1BQU07O0FBRXhCO0FBQ0E7QUFDQTs7QUFFQUMsTUFBTSxDQUFDQyxPQUFPLEdBQUdDLFdBQVc7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsV0FBVyxHQUFHLENBQUM7O0FBRXhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQUEsV0FBVyxDQUFDQyxTQUFTLENBQUNDLFlBQVksR0FBRyxZQUFZO0VBQy9DQSxZQUFZLENBQUMsSUFBSSxDQUFDQyxNQUFNLENBQUM7RUFDekJELFlBQVksQ0FBQyxJQUFJLENBQUNFLHFCQUFxQixDQUFDO0VBQ3hDRixZQUFZLENBQUMsSUFBSSxDQUFDRyxtQkFBbUIsQ0FBQztFQUN0QyxPQUFPLElBQUksQ0FBQ0YsTUFBTTtFQUNsQixPQUFPLElBQUksQ0FBQ0MscUJBQXFCO0VBQ2pDLE9BQU8sSUFBSSxDQUFDQyxtQkFBbUI7RUFDL0IsT0FBTyxJQUFJO0FBQ2IsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBTCxXQUFX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

/***/ }),

/***/ "./node_modules/superagent/lib/response-base.js":
/*!******************************************************!*\
  !*** ./node_modules/superagent/lib/response-base.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/**
 * Module dependencies.
 */

const utils = __webpack_require__(/*! ./utils */ "./node_modules/superagent/lib/utils.js");

/**
 * Expose `ResponseBase`.
 */

module.exports = ResponseBase;

/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase() {}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

ResponseBase.prototype.get = function (field) {
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

ResponseBase.prototype._setHeaderProperties = function (header) {
  // TODO: moar!
  // TODO: make this a util

  // content-type
  const ct = header['content-type'] || '';
  this.type = utils.type(ct);

  // params
  const parameters = utils.params(ct);
  for (const key in parameters) {
    if (Object.prototype.hasOwnProperty.call(parameters, key)) this[key] = parameters[key];
  }
  this.links = {};

  // links
  try {
    if (header.link) {
      this.links = utils.parseLinks(header.link);
    }
  } catch (err) {
    // ignore
  }
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

ResponseBase.prototype._setStatusProperties = function (status) {
  const type = Math.trunc(status / 100);

  // status / class
  this.statusCode = status;
  this.status = this.statusCode;
  this.statusType = type;

  // basics
  this.info = type === 1;
  this.ok = type === 2;
  this.redirect = type === 3;
  this.clientError = type === 4;
  this.serverError = type === 5;
  this.error = type === 4 || type === 5 ? this.toError() : false;

  // sugar
  this.created = status === 201;
  this.accepted = status === 202;
  this.noContent = status === 204;
  this.badRequest = status === 400;
  this.unauthorized = status === 401;
  this.notAcceptable = status === 406;
  this.forbidden = status === 403;
  this.notFound = status === 404;
  this.unprocessableEntity = status === 422;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ1dGlscyIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiUmVzcG9uc2VCYXNlIiwicHJvdG90eXBlIiwiZ2V0IiwiZmllbGQiLCJoZWFkZXIiLCJ0b0xvd2VyQ2FzZSIsIl9zZXRIZWFkZXJQcm9wZXJ0aWVzIiwiY3QiLCJ0eXBlIiwicGFyYW1ldGVycyIsInBhcmFtcyIsImtleSIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImxpbmtzIiwibGluayIsInBhcnNlTGlua3MiLCJlcnIiLCJfc2V0U3RhdHVzUHJvcGVydGllcyIsInN0YXR1cyIsIk1hdGgiLCJ0cnVuYyIsInN0YXR1c0NvZGUiLCJzdGF0dXNUeXBlIiwiaW5mbyIsIm9rIiwicmVkaXJlY3QiLCJjbGllbnRFcnJvciIsInNlcnZlckVycm9yIiwiZXJyb3IiLCJ0b0Vycm9yIiwiY3JlYXRlZCIsImFjY2VwdGVkIiwibm9Db250ZW50IiwiYmFkUmVxdWVzdCIsInVuYXV0aG9yaXplZCIsIm5vdEFjY2VwdGFibGUiLCJmb3JiaWRkZW4iLCJub3RGb3VuZCIsInVucHJvY2Vzc2FibGVFbnRpdHkiXSwic291cmNlcyI6WyIuLi9zcmMvcmVzcG9uc2UtYmFzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbi8qKlxuICogRXhwb3NlIGBSZXNwb25zZUJhc2VgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUmVzcG9uc2VCYXNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlQmFzZWAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXNwb25zZUJhc2UoKSB7fVxuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGBmaWVsZGAgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlc3BvbnNlQmFzZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGZpZWxkKSB7XG4gIHJldHVybiB0aGlzLmhlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogU2V0IGhlYWRlciByZWxhdGVkIHByb3BlcnRpZXM6XG4gKlxuICogICAtIGAudHlwZWAgdGhlIGNvbnRlbnQgdHlwZSB3aXRob3V0IHBhcmFtc1xuICpcbiAqIEEgcmVzcG9uc2Ugb2YgXCJDb250ZW50LVR5cGU6IHRleHQvcGxhaW47IGNoYXJzZXQ9dXRmLThcIlxuICogd2lsbCBwcm92aWRlIHlvdSB3aXRoIGEgYC50eXBlYCBvZiBcInRleHQvcGxhaW5cIi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVyXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLl9zZXRIZWFkZXJQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKGhlYWRlcikge1xuICAvLyBUT0RPOiBtb2FyIVxuICAvLyBUT0RPOiBtYWtlIHRoaXMgYSB1dGlsXG5cbiAgLy8gY29udGVudC10eXBlXG4gIGNvbnN0IGN0ID0gaGVhZGVyWydjb250ZW50LXR5cGUnXSB8fCAnJztcbiAgdGhpcy50eXBlID0gdXRpbHMudHlwZShjdCk7XG5cbiAgLy8gcGFyYW1zXG4gIGNvbnN0IHBhcmFtZXRlcnMgPSB1dGlscy5wYXJhbXMoY3QpO1xuICBmb3IgKGNvbnN0IGtleSBpbiBwYXJhbWV0ZXJzKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChwYXJhbWV0ZXJzLCBrZXkpKVxuICAgICAgdGhpc1trZXldID0gcGFyYW1ldGVyc1trZXldO1xuICB9XG5cbiAgdGhpcy5saW5rcyA9IHt9O1xuXG4gIC8vIGxpbmtzXG4gIHRyeSB7XG4gICAgaWYgKGhlYWRlci5saW5rKSB7XG4gICAgICB0aGlzLmxpbmtzID0gdXRpbHMucGFyc2VMaW5rcyhoZWFkZXIubGluayk7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyBpZ25vcmVcbiAgfVxufTtcblxuLyoqXG4gKiBTZXQgZmxhZ3Mgc3VjaCBhcyBgLm9rYCBiYXNlZCBvbiBgc3RhdHVzYC5cbiAqXG4gKiBGb3IgZXhhbXBsZSBhIDJ4eCByZXNwb25zZSB3aWxsIGdpdmUgeW91IGEgYC5va2Agb2YgX190cnVlX19cbiAqIHdoZXJlYXMgNXh4IHdpbGwgYmUgX19mYWxzZV9fIGFuZCBgLmVycm9yYCB3aWxsIGJlIF9fdHJ1ZV9fLiBUaGVcbiAqIGAuY2xpZW50RXJyb3JgIGFuZCBgLnNlcnZlckVycm9yYCBhcmUgYWxzbyBhdmFpbGFibGUgdG8gYmUgbW9yZVxuICogc3BlY2lmaWMsIGFuZCBgLnN0YXR1c1R5cGVgIGlzIHRoZSBjbGFzcyBvZiBlcnJvciByYW5naW5nIGZyb20gMS4uNVxuICogc29tZXRpbWVzIHVzZWZ1bCBmb3IgbWFwcGluZyByZXNwb25kIGNvbG9ycyBldGMuXG4gKlxuICogXCJzdWdhclwiIHByb3BlcnRpZXMgYXJlIGFsc28gZGVmaW5lZCBmb3IgY29tbW9uIGNhc2VzLiBDdXJyZW50bHkgcHJvdmlkaW5nOlxuICpcbiAqICAgLSAubm9Db250ZW50XG4gKiAgIC0gLmJhZFJlcXVlc3RcbiAqICAgLSAudW5hdXRob3JpemVkXG4gKiAgIC0gLm5vdEFjY2VwdGFibGVcbiAqICAgLSAubm90Rm91bmRcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc3RhdHVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLl9zZXRTdGF0dXNQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKHN0YXR1cykge1xuICBjb25zdCB0eXBlID0gTWF0aC50cnVuYyhzdGF0dXMgLyAxMDApO1xuXG4gIC8vIHN0YXR1cyAvIGNsYXNzXG4gIHRoaXMuc3RhdHVzQ29kZSA9IHN0YXR1cztcbiAgdGhpcy5zdGF0dXMgPSB0aGlzLnN0YXR1c0NvZGU7XG4gIHRoaXMuc3RhdHVzVHlwZSA9IHR5cGU7XG5cbiAgLy8gYmFzaWNzXG4gIHRoaXMuaW5mbyA9IHR5cGUgPT09IDE7XG4gIHRoaXMub2sgPSB0eXBlID09PSAyO1xuICB0aGlzLnJlZGlyZWN0ID0gdHlwZSA9PT0gMztcbiAgdGhpcy5jbGllbnRFcnJvciA9IHR5cGUgPT09IDQ7XG4gIHRoaXMuc2VydmVyRXJyb3IgPSB0eXBlID09PSA1O1xuICB0aGlzLmVycm9yID0gdHlwZSA9PT0gNCB8fCB0eXBlID09PSA1ID8gdGhpcy50b0Vycm9yKCkgOiBmYWxzZTtcblxuICAvLyBzdWdhclxuICB0aGlzLmNyZWF0ZWQgPSBzdGF0dXMgPT09IDIwMTtcbiAgdGhpcy5hY2NlcHRlZCA9IHN0YXR1cyA9PT0gMjAyO1xuICB0aGlzLm5vQ29udGVudCA9IHN0YXR1cyA9PT0gMjA0O1xuICB0aGlzLmJhZFJlcXVlc3QgPSBzdGF0dXMgPT09IDQwMDtcbiAgdGhpcy51bmF1dGhvcml6ZWQgPSBzdGF0dXMgPT09IDQwMTtcbiAgdGhpcy5ub3RBY2NlcHRhYmxlID0gc3RhdHVzID09PSA0MDY7XG4gIHRoaXMuZm9yYmlkZGVuID0gc3RhdHVzID09PSA0MDM7XG4gIHRoaXMubm90Rm91bmQgPSBzdGF0dXMgPT09IDQwNDtcbiAgdGhpcy51bnByb2Nlc3NhYmxlRW50aXR5ID0gc3RhdHVzID09PSA0MjI7XG59O1xuIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxTQUFTLENBQUM7O0FBRWhDO0FBQ0E7QUFDQTs7QUFFQUMsTUFBTSxDQUFDQyxPQUFPLEdBQUdDLFlBQVk7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsWUFBWSxHQUFHLENBQUM7O0FBRXpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBQSxZQUFZLENBQUNDLFNBQVMsQ0FBQ0MsR0FBRyxHQUFHLFVBQVVDLEtBQUssRUFBRTtFQUM1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

/***/ }),

/***/ "./node_modules/superagent/lib/utils.js":
/*!**********************************************!*\
  !*** ./node_modules/superagent/lib/utils.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

exports.type = string_ => string_.split(/ *; */).shift();

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.params = value => {
  const object = {};
  var _iterator = _createForOfIteratorHelper(value.split(/ *; */)),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      const string_ = _step.value;
      const parts = string_.split(/ *= */);
      const key = parts.shift();
      const value = parts.shift();
      if (key && value) object[key] = value;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return object;
};

/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.parseLinks = value => {
  const object = {};
  var _iterator2 = _createForOfIteratorHelper(value.split(/ *, */)),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      const string_ = _step2.value;
      const parts = string_.split(/ *; */);
      const url = parts[0].slice(1, -1);
      const rel = parts[1].split(/ *= */)[1].slice(1, -1);
      object[rel] = url;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return object;
};

/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */

exports.cleanHeader = (header, changesOrigin) => {
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header.host;
  // secuirty
  if (changesOrigin) {
    delete header.authorization;
    delete header.cookie;
  }
  return header;
};

/**
 * Check if `obj` is an object.
 *
 * @param {Object} object
 * @return {Boolean}
 * @api private
 */
exports.isObject = object => {
  return object !== null && typeof object === 'object';
};

/**
 * Object.hasOwn fallback/polyfill.
 *
 * @type {(object: object, property: string) => boolean} object
 * @api private
 */
exports.hasOwn = Object.hasOwn || function (object, property) {
  if (object == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  return Object.prototype.hasOwnProperty.call(new Object(object), property);
};
exports.mixin = (target, source) => {
  for (const key in source) {
    if (exports.hasOwn(source, key)) {
      target[key] = source[key];
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJleHBvcnRzIiwidHlwZSIsInN0cmluZ18iLCJzcGxpdCIsInNoaWZ0IiwicGFyYW1zIiwidmFsdWUiLCJvYmplY3QiLCJwYXJ0cyIsImtleSIsInBhcnNlTGlua3MiLCJ1cmwiLCJzbGljZSIsInJlbCIsImNsZWFuSGVhZGVyIiwiaGVhZGVyIiwiY2hhbmdlc09yaWdpbiIsImhvc3QiLCJhdXRob3JpemF0aW9uIiwiY29va2llIiwiaXNPYmplY3QiLCJoYXNPd24iLCJPYmplY3QiLCJwcm9wZXJ0eSIsIlR5cGVFcnJvciIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIm1peGluIiwidGFyZ2V0Iiwic291cmNlIl0sInNvdXJjZXMiOlsiLi4vc3JjL3V0aWxzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmV0dXJuIHRoZSBtaW1lIHR5cGUgZm9yIHRoZSBnaXZlbiBgc3RyYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnR5cGUgPSAoc3RyaW5nXykgPT4gc3RyaW5nXy5zcGxpdCgvICo7ICovKS5zaGlmdCgpO1xuXG4vKipcbiAqIFJldHVybiBoZWFkZXIgZmllbGQgcGFyYW1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnBhcmFtcyA9ICh2YWx1ZSkgPT4ge1xuICBjb25zdCBvYmplY3QgPSB7fTtcbiAgZm9yIChjb25zdCBzdHJpbmdfIG9mIHZhbHVlLnNwbGl0KC8gKjsgKi8pKSB7XG4gICAgY29uc3QgcGFydHMgPSBzdHJpbmdfLnNwbGl0KC8gKj0gKi8pO1xuICAgIGNvbnN0IGtleSA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJ0cy5zaGlmdCgpO1xuXG4gICAgaWYgKGtleSAmJiB2YWx1ZSkgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG4vKipcbiAqIFBhcnNlIExpbmsgaGVhZGVyIGZpZWxkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnBhcnNlTGlua3MgPSAodmFsdWUpID0+IHtcbiAgY29uc3Qgb2JqZWN0ID0ge307XG4gIGZvciAoY29uc3Qgc3RyaW5nXyBvZiB2YWx1ZS5zcGxpdCgvICosICovKSkge1xuICAgIGNvbnN0IHBhcnRzID0gc3RyaW5nXy5zcGxpdCgvICo7ICovKTtcbiAgICBjb25zdCB1cmwgPSBwYXJ0c1swXS5zbGljZSgxLCAtMSk7XG4gICAgY29uc3QgcmVsID0gcGFydHNbMV0uc3BsaXQoLyAqPSAqLylbMV0uc2xpY2UoMSwgLTEpO1xuICAgIG9iamVjdFtyZWxdID0gdXJsO1xuICB9XG5cbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cbi8qKlxuICogU3RyaXAgY29udGVudCByZWxhdGVkIGZpZWxkcyBmcm9tIGBoZWFkZXJgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXJcbiAqIEByZXR1cm4ge09iamVjdH0gaGVhZGVyXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmNsZWFuSGVhZGVyID0gKGhlYWRlciwgY2hhbmdlc09yaWdpbikgPT4ge1xuICBkZWxldGUgaGVhZGVyWydjb250ZW50LXR5cGUnXTtcbiAgZGVsZXRlIGhlYWRlclsnY29udGVudC1sZW5ndGgnXTtcbiAgZGVsZXRlIGhlYWRlclsndHJhbnNmZXItZW5jb2RpbmcnXTtcbiAgZGVsZXRlIGhlYWRlci5ob3N0O1xuICAvLyBzZWN1aXJ0eVxuICBpZiAoY2hhbmdlc09yaWdpbikge1xuICAgIGRlbGV0ZSBoZWFkZXIuYXV0aG9yaXphdGlvbjtcbiAgICBkZWxldGUgaGVhZGVyLmNvb2tpZTtcbiAgfVxuXG4gIHJldHVybiBoZWFkZXI7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cbmV4cG9ydHMuaXNPYmplY3QgPSAob2JqZWN0KSA9PiB7XG4gIHJldHVybiBvYmplY3QgIT09IG51bGwgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCc7XG59O1xuXG4vKipcbiAqIE9iamVjdC5oYXNPd24gZmFsbGJhY2svcG9seWZpbGwuXG4gKlxuICogQHR5cGUgeyhvYmplY3Q6IG9iamVjdCwgcHJvcGVydHk6IHN0cmluZykgPT4gYm9vbGVhbn0gb2JqZWN0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZXhwb3J0cy5oYXNPd24gPVxuICBPYmplY3QuaGFzT3duIHx8XG4gIGZ1bmN0aW9uIChvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5ldyBPYmplY3Qob2JqZWN0KSwgcHJvcGVydHkpO1xuICB9O1xuXG5leHBvcnRzLm1peGluID0gKHRhcmdldCwgc291cmNlKSA9PiB7XG4gIGZvciAoY29uc3Qga2V5IGluIHNvdXJjZSkge1xuICAgIGlmIChleHBvcnRzLmhhc093bihzb3VyY2UsIGtleSkpIHtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBQSxPQUFPLENBQUNDLElBQUksR0FBSUMsT0FBTyxJQUFLQSxPQUFPLENBQUND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

/***/ }),

/***/ "?2128":
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?a24a":
/*!************************!*\
  !*** semver (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/Scraping.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! superagent */ "./node_modules/superagent/lib/client.js");
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(superagent__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var Scraping = /** @class */function () {
  function Scraping(url) {
    this.url = "";
    this.url = url;
  }
  Scraping.prototype.getRawHtml = function () {
    return __awaiter(this, void 0, void 0, function () {
      var result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            console.log(this.url);
            return [4 /*yield*/, superagent__WEBPACK_IMPORTED_MODULE_0___default().get(this.url)];
          case 1:
            result = _a.sent();
            return [2 /*return*/, result];
        }
      });
    });
  };
  return Scraping;
}();
var url = 'https://www.dmm.co.jp/digital/videoc/-/list/=/limit=120/sort=ranking/';
var scraping = new Scraping(url);
scraping.getRawHtml().then(function (res) {
  console.log(res);
});
})();

/******/ })()
;