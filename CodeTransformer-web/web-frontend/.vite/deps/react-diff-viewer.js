import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS,
  require_react
} from "./chunk-45FXRYJS.js";

// node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
        function isValidElementType(type) {
          return typeof type === "string" || typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
          type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_CONCURRENT_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
            }
          }
          return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isConcurrentMode(object) {
          return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/prop-types/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/prop-types/node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports, module) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  }
});

// node_modules/prop-types/lib/has.js
var require_has = __commonJS({
  "node_modules/prop-types/lib/has.js"(exports, module) {
    module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
  }
});

// node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS({
  "node_modules/prop-types/checkPropTypes.js"(exports, module) {
    "use strict";
    var printWarning = function() {
    };
    if (true) {
      ReactPropTypesSecret = require_ReactPropTypesSecret();
      loggedTypeFailures = {};
      has = require_has();
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    var ReactPropTypesSecret;
    var loggedTypeFailures;
    var has;
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
      if (true) {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                var err = Error(
                  (componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
                );
                err.name = "Invariant Violation";
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning(
                (componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
              );
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : "";
              printWarning(
                "Failed " + location + " type: " + error.message + (stack != null ? stack : "")
              );
            }
          }
        }
      }
    }
    checkPropTypes.resetWarningCache = function() {
      if (true) {
        loggedTypeFailures = {};
      }
    };
    module.exports = checkPropTypes;
  }
});

// node_modules/prop-types/factoryWithTypeCheckers.js
var require_factoryWithTypeCheckers = __commonJS({
  "node_modules/prop-types/factoryWithTypeCheckers.js"(exports, module) {
    "use strict";
    var ReactIs = require_react_is();
    var assign = require_object_assign();
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    var has = require_has();
    var checkPropTypes = require_checkPropTypes();
    var printWarning = function() {
    };
    if (true) {
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    function emptyFunctionThatReturnsNull() {
      return null;
    }
    module.exports = function(isValidElement, throwOnDirectAccess) {
      var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      var ANONYMOUS = "<<anonymous>>";
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker("array"),
        bigint: createPrimitiveTypeChecker("bigint"),
        bool: createPrimitiveTypeChecker("boolean"),
        func: createPrimitiveTypeChecker("function"),
        number: createPrimitiveTypeChecker("number"),
        object: createPrimitiveTypeChecker("object"),
        string: createPrimitiveTypeChecker("string"),
        symbol: createPrimitiveTypeChecker("symbol"),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
      };
      function is(x, y) {
        if (x === y) {
          return x !== 0 || 1 / x === 1 / y;
        } else {
          return x !== x && y !== y;
        }
      }
      function PropTypeError(message, data) {
        this.message = message;
        this.data = data && typeof data === "object" ? data : {};
        this.stack = "";
      }
      PropTypeError.prototype = Error.prototype;
      function createChainableTypeChecker(validate) {
        if (true) {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;
          if (secret !== ReactPropTypesSecret) {
            if (throwOnDirectAccess) {
              var err = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
              );
              err.name = "Invariant Violation";
              throw err;
            } else if (typeof console !== "undefined") {
              var cacheKey = componentName + ":" + propName;
              if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3) {
                printWarning(
                  "You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
                );
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
              }
              return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
            }
            return null;
          } else {
            return validate(props, propName, componentName, location, propFullName);
          }
        }
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
      }
      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            var preciseType = getPreciseType(propValue);
            return new PropTypeError(
              "Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."),
              { expectedType }
            );
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }
      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!isValidElement(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!ReactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          if (true) {
            if (arguments.length > 1) {
              printWarning(
                "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
              );
            } else {
              printWarning("Invalid argument supplied to oneOf, expected an array.");
            }
          }
          return emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }
          var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
            var type = getPreciseType(value);
            if (type === "symbol") {
              return String(value);
            }
            return value;
          });
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
          }
          for (var key in propValue) {
            if (has(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
          return emptyFunctionThatReturnsNull;
        }
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== "function") {
            printWarning(
              "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + "."
            );
            return emptyFunctionThatReturnsNull;
          }
        }
        function validate(props, propName, componentName, location, propFullName) {
          var expectedTypes = [];
          for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
            var checker2 = arrayOfTypeCheckers[i2];
            var checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
            if (checkerResult == null) {
              return null;
            }
            if (checkerResult.data && has(checkerResult.data, "expectedType")) {
              expectedTypes.push(checkerResult.data.expectedType);
            }
          }
          var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode(props[propName])) {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function invalidValidatorError(componentName, location, propFullName, key, type) {
        return new PropTypeError(
          (componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`."
        );
      }
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (has(shapeTypes, key) && typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            if (!checker) {
              return new PropTypeError(
                "Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  ")
              );
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function isNode(propValue) {
        switch (typeof propValue) {
          case "number":
          case "string":
          case "undefined":
            return true;
          case "boolean":
            return !propValue;
          case "object":
            if (Array.isArray(propValue)) {
              return propValue.every(isNode);
            }
            if (propValue === null || isValidElement(propValue)) {
              return true;
            }
            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode(step.value)) {
                    return false;
                  }
                }
              } else {
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }
            return true;
          default:
            return false;
        }
      }
      function isSymbol(propType, propValue) {
        if (propType === "symbol") {
          return true;
        }
        if (!propValue) {
          return false;
        }
        if (propValue["@@toStringTag"] === "Symbol") {
          return true;
        }
        if (typeof Symbol === "function" && propValue instanceof Symbol) {
          return true;
        }
        return false;
      }
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return "array";
        }
        if (propValue instanceof RegExp) {
          return "object";
        }
        if (isSymbol(propType, propValue)) {
          return "symbol";
        }
        return propType;
      }
      function getPreciseType(propValue) {
        if (typeof propValue === "undefined" || propValue === null) {
          return "" + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === "object") {
          if (propValue instanceof Date) {
            return "date";
          } else if (propValue instanceof RegExp) {
            return "regexp";
          }
        }
        return propType;
      }
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case "array":
          case "object":
            return "an " + type;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + type;
          default:
            return type;
        }
      }
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }
      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  }
});

// node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "node_modules/prop-types/index.js"(exports, module) {
    if (true) {
      ReactIs = require_react_is();
      throwOnDirectAccess = true;
      module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = null();
    }
    var ReactIs;
    var throwOnDirectAccess;
  }
});

// node_modules/classnames/index.js
var require_classnames = __commonJS({
  "node_modules/classnames/index.js"(exports, module) {
    (function() {
      "use strict";
      var hasOwn = {}.hasOwnProperty;
      function classNames() {
        var classes = "";
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (arg) {
            classes = appendClass(classes, parseValue(arg));
          }
        }
        return classes;
      }
      function parseValue(arg) {
        if (typeof arg === "string" || typeof arg === "number") {
          return arg;
        }
        if (typeof arg !== "object") {
          return "";
        }
        if (Array.isArray(arg)) {
          return classNames.apply(null, arg);
        }
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
          return arg.toString();
        }
        var classes = "";
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes = appendClass(classes, key);
          }
        }
        return classes;
      }
      function appendClass(value, newClass) {
        if (!newClass) {
          return value;
        }
        if (value) {
          return value + " " + newClass;
        }
        return value + newClass;
      }
      if (typeof module !== "undefined" && module.exports) {
        classNames.default = classNames;
        module.exports = classNames;
      } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
        define("classnames", [], function() {
          return classNames;
        });
      } else {
        window.classNames = classNames;
      }
    })();
  }
});

// node_modules/diff/dist/diff.js
var require_diff = __commonJS({
  "node_modules/diff/dist/diff.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.Diff = {}));
    })(exports, function(exports2) {
      "use strict";
      function Diff() {
      }
      Diff.prototype = {
        diff: function diff(oldString, newString) {
          var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          var callback = options.callback;
          if (typeof options === "function") {
            callback = options;
            options = {};
          }
          this.options = options;
          var self2 = this;
          function done(value) {
            if (callback) {
              setTimeout(function() {
                callback(void 0, value);
              }, 0);
              return true;
            } else {
              return value;
            }
          }
          oldString = this.castInput(oldString);
          newString = this.castInput(newString);
          oldString = this.removeEmpty(this.tokenize(oldString));
          newString = this.removeEmpty(this.tokenize(newString));
          var newLen = newString.length, oldLen = oldString.length;
          var editLength = 1;
          var maxEditLength = newLen + oldLen;
          var bestPath = [{
            newPos: -1,
            components: []
          }];
          var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
          if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
            return done([{
              value: this.join(newString),
              count: newString.length
            }]);
          }
          function execEditLength() {
            for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
              var basePath = void 0;
              var addPath = bestPath[diagonalPath - 1], removePath = bestPath[diagonalPath + 1], _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
              if (addPath) {
                bestPath[diagonalPath - 1] = void 0;
              }
              var canAdd = addPath && addPath.newPos + 1 < newLen, canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;
              if (!canAdd && !canRemove) {
                bestPath[diagonalPath] = void 0;
                continue;
              }
              if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
                basePath = clonePath(removePath);
                self2.pushComponent(basePath.components, void 0, true);
              } else {
                basePath = addPath;
                basePath.newPos++;
                self2.pushComponent(basePath.components, true, void 0);
              }
              _oldPos = self2.extractCommon(basePath, newString, oldString, diagonalPath);
              if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
                return done(buildValues(self2, basePath.components, newString, oldString, self2.useLongestToken));
              } else {
                bestPath[diagonalPath] = basePath;
              }
            }
            editLength++;
          }
          if (callback) {
            (function exec() {
              setTimeout(function() {
                if (editLength > maxEditLength) {
                  return callback();
                }
                if (!execEditLength()) {
                  exec();
                }
              }, 0);
            })();
          } else {
            while (editLength <= maxEditLength) {
              var ret = execEditLength();
              if (ret) {
                return ret;
              }
            }
          }
        },
        pushComponent: function pushComponent(components, added, removed) {
          var last = components[components.length - 1];
          if (last && last.added === added && last.removed === removed) {
            components[components.length - 1] = {
              count: last.count + 1,
              added,
              removed
            };
          } else {
            components.push({
              count: 1,
              added,
              removed
            });
          }
        },
        extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
          var newLen = newString.length, oldLen = oldString.length, newPos = basePath.newPos, oldPos = newPos - diagonalPath, commonCount = 0;
          while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
            newPos++;
            oldPos++;
            commonCount++;
          }
          if (commonCount) {
            basePath.components.push({
              count: commonCount
            });
          }
          basePath.newPos = newPos;
          return oldPos;
        },
        equals: function equals(left, right) {
          if (this.options.comparator) {
            return this.options.comparator(left, right);
          } else {
            return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
          }
        },
        removeEmpty: function removeEmpty(array) {
          var ret = [];
          for (var i = 0; i < array.length; i++) {
            if (array[i]) {
              ret.push(array[i]);
            }
          }
          return ret;
        },
        castInput: function castInput(value) {
          return value;
        },
        tokenize: function tokenize(value) {
          return value.split("");
        },
        join: function join(chars) {
          return chars.join("");
        }
      };
      function buildValues(diff, components, newString, oldString, useLongestToken) {
        var componentPos = 0, componentLen = components.length, newPos = 0, oldPos = 0;
        for (; componentPos < componentLen; componentPos++) {
          var component = components[componentPos];
          if (!component.removed) {
            if (!component.added && useLongestToken) {
              var value = newString.slice(newPos, newPos + component.count);
              value = value.map(function(value2, i) {
                var oldValue = oldString[oldPos + i];
                return oldValue.length > value2.length ? oldValue : value2;
              });
              component.value = diff.join(value);
            } else {
              component.value = diff.join(newString.slice(newPos, newPos + component.count));
            }
            newPos += component.count;
            if (!component.added) {
              oldPos += component.count;
            }
          } else {
            component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));
            oldPos += component.count;
            if (componentPos && components[componentPos - 1].added) {
              var tmp = components[componentPos - 1];
              components[componentPos - 1] = components[componentPos];
              components[componentPos] = tmp;
            }
          }
        }
        var lastComponent = components[componentLen - 1];
        if (componentLen > 1 && typeof lastComponent.value === "string" && (lastComponent.added || lastComponent.removed) && diff.equals("", lastComponent.value)) {
          components[componentLen - 2].value += lastComponent.value;
          components.pop();
        }
        return components;
      }
      function clonePath(path) {
        return {
          newPos: path.newPos,
          components: path.components.slice(0)
        };
      }
      var characterDiff = new Diff();
      function diffChars(oldStr, newStr, options) {
        return characterDiff.diff(oldStr, newStr, options);
      }
      function generateOptions(options, defaults) {
        if (typeof options === "function") {
          defaults.callback = options;
        } else if (options) {
          for (var name in options) {
            if (options.hasOwnProperty(name)) {
              defaults[name] = options[name];
            }
          }
        }
        return defaults;
      }
      var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;
      var reWhitespace = /\S/;
      var wordDiff = new Diff();
      wordDiff.equals = function(left, right) {
        if (this.options.ignoreCase) {
          left = left.toLowerCase();
          right = right.toLowerCase();
        }
        return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);
      };
      wordDiff.tokenize = function(value) {
        var tokens = value.split(/(\s+|[()[\]{}'"]|\b)/);
        for (var i = 0; i < tokens.length - 1; i++) {
          if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {
            tokens[i] += tokens[i + 2];
            tokens.splice(i + 1, 2);
            i--;
          }
        }
        return tokens;
      };
      function diffWords(oldStr, newStr, options) {
        options = generateOptions(options, {
          ignoreWhitespace: true
        });
        return wordDiff.diff(oldStr, newStr, options);
      }
      function diffWordsWithSpace(oldStr, newStr, options) {
        return wordDiff.diff(oldStr, newStr, options);
      }
      var lineDiff = new Diff();
      lineDiff.tokenize = function(value) {
        var retLines = [], linesAndNewlines = value.split(/(\n|\r\n)/);
        if (!linesAndNewlines[linesAndNewlines.length - 1]) {
          linesAndNewlines.pop();
        }
        for (var i = 0; i < linesAndNewlines.length; i++) {
          var line = linesAndNewlines[i];
          if (i % 2 && !this.options.newlineIsToken) {
            retLines[retLines.length - 1] += line;
          } else {
            if (this.options.ignoreWhitespace) {
              line = line.trim();
            }
            retLines.push(line);
          }
        }
        return retLines;
      };
      function diffLines(oldStr, newStr, callback) {
        return lineDiff.diff(oldStr, newStr, callback);
      }
      function diffTrimmedLines(oldStr, newStr, callback) {
        var options = generateOptions(callback, {
          ignoreWhitespace: true
        });
        return lineDiff.diff(oldStr, newStr, options);
      }
      var sentenceDiff = new Diff();
      sentenceDiff.tokenize = function(value) {
        return value.split(/(\S.+?[.!?])(?=\s+|$)/);
      };
      function diffSentences(oldStr, newStr, callback) {
        return sentenceDiff.diff(oldStr, newStr, callback);
      }
      var cssDiff = new Diff();
      cssDiff.tokenize = function(value) {
        return value.split(/([{}:;,]|\s+)/);
      };
      function diffCss(oldStr, newStr, callback) {
        return cssDiff.diff(oldStr, newStr, callback);
      }
      function _typeof(obj) {
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
      }
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
          return arr2;
        }
      }
      function _iterableToArray(iter) {
        if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      }
      var objectPrototypeToString = Object.prototype.toString;
      var jsonDiff = new Diff();
      jsonDiff.useLongestToken = true;
      jsonDiff.tokenize = lineDiff.tokenize;
      jsonDiff.castInput = function(value) {
        var _this$options = this.options, undefinedReplacement = _this$options.undefinedReplacement, _this$options$stringi = _this$options.stringifyReplacer, stringifyReplacer = _this$options$stringi === void 0 ? function(k, v) {
          return typeof v === "undefined" ? undefinedReplacement : v;
        } : _this$options$stringi;
        return typeof value === "string" ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, "  ");
      };
      jsonDiff.equals = function(left, right) {
        return Diff.prototype.equals.call(jsonDiff, left.replace(/,([\r\n])/g, "$1"), right.replace(/,([\r\n])/g, "$1"));
      };
      function diffJson(oldObj, newObj, options) {
        return jsonDiff.diff(oldObj, newObj, options);
      }
      function canonicalize(obj, stack, replacementStack, replacer, key) {
        stack = stack || [];
        replacementStack = replacementStack || [];
        if (replacer) {
          obj = replacer(key, obj);
        }
        var i;
        for (i = 0; i < stack.length; i += 1) {
          if (stack[i] === obj) {
            return replacementStack[i];
          }
        }
        var canonicalizedObj;
        if ("[object Array]" === objectPrototypeToString.call(obj)) {
          stack.push(obj);
          canonicalizedObj = new Array(obj.length);
          replacementStack.push(canonicalizedObj);
          for (i = 0; i < obj.length; i += 1) {
            canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, key);
          }
          stack.pop();
          replacementStack.pop();
          return canonicalizedObj;
        }
        if (obj && obj.toJSON) {
          obj = obj.toJSON();
        }
        if (_typeof(obj) === "object" && obj !== null) {
          stack.push(obj);
          canonicalizedObj = {};
          replacementStack.push(canonicalizedObj);
          var sortedKeys = [], _key;
          for (_key in obj) {
            if (obj.hasOwnProperty(_key)) {
              sortedKeys.push(_key);
            }
          }
          sortedKeys.sort();
          for (i = 0; i < sortedKeys.length; i += 1) {
            _key = sortedKeys[i];
            canonicalizedObj[_key] = canonicalize(obj[_key], stack, replacementStack, replacer, _key);
          }
          stack.pop();
          replacementStack.pop();
        } else {
          canonicalizedObj = obj;
        }
        return canonicalizedObj;
      }
      var arrayDiff = new Diff();
      arrayDiff.tokenize = function(value) {
        return value.slice();
      };
      arrayDiff.join = arrayDiff.removeEmpty = function(value) {
        return value;
      };
      function diffArrays(oldArr, newArr, callback) {
        return arrayDiff.diff(oldArr, newArr, callback);
      }
      function parsePatch(uniDiff) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var diffstr = uniDiff.split(/\r\n|[\n\v\f\r\x85]/), delimiters = uniDiff.match(/\r\n|[\n\v\f\r\x85]/g) || [], list = [], i = 0;
        function parseIndex() {
          var index = {};
          list.push(index);
          while (i < diffstr.length) {
            var line = diffstr[i];
            if (/^(\-\-\-|\+\+\+|@@)\s/.test(line)) {
              break;
            }
            var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line);
            if (header) {
              index.index = header[1];
            }
            i++;
          }
          parseFileHeader(index);
          parseFileHeader(index);
          index.hunks = [];
          while (i < diffstr.length) {
            var _line = diffstr[i];
            if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(_line)) {
              break;
            } else if (/^@@/.test(_line)) {
              index.hunks.push(parseHunk());
            } else if (_line && options.strict) {
              throw new Error("Unknown line " + (i + 1) + " " + JSON.stringify(_line));
            } else {
              i++;
            }
          }
        }
        function parseFileHeader(index) {
          var fileHeader = /^(---|\+\+\+)\s+(.*)$/.exec(diffstr[i]);
          if (fileHeader) {
            var keyPrefix = fileHeader[1] === "---" ? "old" : "new";
            var data = fileHeader[2].split("	", 2);
            var fileName = data[0].replace(/\\\\/g, "\\");
            if (/^".*"$/.test(fileName)) {
              fileName = fileName.substr(1, fileName.length - 2);
            }
            index[keyPrefix + "FileName"] = fileName;
            index[keyPrefix + "Header"] = (data[1] || "").trim();
            i++;
          }
        }
        function parseHunk() {
          var chunkHeaderIndex = i, chunkHeaderLine = diffstr[i++], chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
          var hunk = {
            oldStart: +chunkHeader[1],
            oldLines: +chunkHeader[2] || 1,
            newStart: +chunkHeader[3],
            newLines: +chunkHeader[4] || 1,
            lines: [],
            linedelimiters: []
          };
          var addCount = 0, removeCount = 0;
          for (; i < diffstr.length; i++) {
            if (diffstr[i].indexOf("--- ") === 0 && i + 2 < diffstr.length && diffstr[i + 1].indexOf("+++ ") === 0 && diffstr[i + 2].indexOf("@@") === 0) {
              break;
            }
            var operation = diffstr[i].length == 0 && i != diffstr.length - 1 ? " " : diffstr[i][0];
            if (operation === "+" || operation === "-" || operation === " " || operation === "\\") {
              hunk.lines.push(diffstr[i]);
              hunk.linedelimiters.push(delimiters[i] || "\n");
              if (operation === "+") {
                addCount++;
              } else if (operation === "-") {
                removeCount++;
              } else if (operation === " ") {
                addCount++;
                removeCount++;
              }
            } else {
              break;
            }
          }
          if (!addCount && hunk.newLines === 1) {
            hunk.newLines = 0;
          }
          if (!removeCount && hunk.oldLines === 1) {
            hunk.oldLines = 0;
          }
          if (options.strict) {
            if (addCount !== hunk.newLines) {
              throw new Error("Added line count did not match for hunk at line " + (chunkHeaderIndex + 1));
            }
            if (removeCount !== hunk.oldLines) {
              throw new Error("Removed line count did not match for hunk at line " + (chunkHeaderIndex + 1));
            }
          }
          return hunk;
        }
        while (i < diffstr.length) {
          parseIndex();
        }
        return list;
      }
      function distanceIterator(start, minLine, maxLine) {
        var wantForward = true, backwardExhausted = false, forwardExhausted = false, localOffset = 1;
        return function iterator() {
          if (wantForward && !forwardExhausted) {
            if (backwardExhausted) {
              localOffset++;
            } else {
              wantForward = false;
            }
            if (start + localOffset <= maxLine) {
              return localOffset;
            }
            forwardExhausted = true;
          }
          if (!backwardExhausted) {
            if (!forwardExhausted) {
              wantForward = true;
            }
            if (minLine <= start - localOffset) {
              return -localOffset++;
            }
            backwardExhausted = true;
            return iterator();
          }
        };
      }
      function applyPatch(source, uniDiff) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        if (typeof uniDiff === "string") {
          uniDiff = parsePatch(uniDiff);
        }
        if (Array.isArray(uniDiff)) {
          if (uniDiff.length > 1) {
            throw new Error("applyPatch only works with a single input.");
          }
          uniDiff = uniDiff[0];
        }
        var lines = source.split(/\r\n|[\n\v\f\r\x85]/), delimiters = source.match(/\r\n|[\n\v\f\r\x85]/g) || [], hunks = uniDiff.hunks, compareLine = options.compareLine || function(lineNumber, line2, operation2, patchContent) {
          return line2 === patchContent;
        }, errorCount = 0, fuzzFactor = options.fuzzFactor || 0, minLine = 0, offset = 0, removeEOFNL, addEOFNL;
        function hunkFits(hunk2, toPos2) {
          for (var j2 = 0; j2 < hunk2.lines.length; j2++) {
            var line2 = hunk2.lines[j2], operation2 = line2.length > 0 ? line2[0] : " ", content2 = line2.length > 0 ? line2.substr(1) : line2;
            if (operation2 === " " || operation2 === "-") {
              if (!compareLine(toPos2 + 1, lines[toPos2], operation2, content2)) {
                errorCount++;
                if (errorCount > fuzzFactor) {
                  return false;
                }
              }
              toPos2++;
            }
          }
          return true;
        }
        for (var i = 0; i < hunks.length; i++) {
          var hunk = hunks[i], maxLine = lines.length - hunk.oldLines, localOffset = 0, toPos = offset + hunk.oldStart - 1;
          var iterator = distanceIterator(toPos, minLine, maxLine);
          for (; localOffset !== void 0; localOffset = iterator()) {
            if (hunkFits(hunk, toPos + localOffset)) {
              hunk.offset = offset += localOffset;
              break;
            }
          }
          if (localOffset === void 0) {
            return false;
          }
          minLine = hunk.offset + hunk.oldStart + hunk.oldLines;
        }
        var diffOffset = 0;
        for (var _i = 0; _i < hunks.length; _i++) {
          var _hunk = hunks[_i], _toPos = _hunk.oldStart + _hunk.offset + diffOffset - 1;
          diffOffset += _hunk.newLines - _hunk.oldLines;
          if (_toPos < 0) {
            _toPos = 0;
          }
          for (var j = 0; j < _hunk.lines.length; j++) {
            var line = _hunk.lines[j], operation = line.length > 0 ? line[0] : " ", content = line.length > 0 ? line.substr(1) : line, delimiter2 = _hunk.linedelimiters[j];
            if (operation === " ") {
              _toPos++;
            } else if (operation === "-") {
              lines.splice(_toPos, 1);
              delimiters.splice(_toPos, 1);
            } else if (operation === "+") {
              lines.splice(_toPos, 0, content);
              delimiters.splice(_toPos, 0, delimiter2);
              _toPos++;
            } else if (operation === "\\") {
              var previousOperation = _hunk.lines[j - 1] ? _hunk.lines[j - 1][0] : null;
              if (previousOperation === "+") {
                removeEOFNL = true;
              } else if (previousOperation === "-") {
                addEOFNL = true;
              }
            }
          }
        }
        if (removeEOFNL) {
          while (!lines[lines.length - 1]) {
            lines.pop();
            delimiters.pop();
          }
        } else if (addEOFNL) {
          lines.push("");
          delimiters.push("\n");
        }
        for (var _k = 0; _k < lines.length - 1; _k++) {
          lines[_k] = lines[_k] + delimiters[_k];
        }
        return lines.join("");
      }
      function applyPatches(uniDiff, options) {
        if (typeof uniDiff === "string") {
          uniDiff = parsePatch(uniDiff);
        }
        var currentIndex = 0;
        function processIndex() {
          var index = uniDiff[currentIndex++];
          if (!index) {
            return options.complete();
          }
          options.loadFile(index, function(err, data) {
            if (err) {
              return options.complete(err);
            }
            var updatedContent = applyPatch(data, index, options);
            options.patched(index, updatedContent, function(err2) {
              if (err2) {
                return options.complete(err2);
              }
              processIndex();
            });
          });
        }
        processIndex();
      }
      function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
        if (!options) {
          options = {};
        }
        if (typeof options.context === "undefined") {
          options.context = 4;
        }
        var diff = diffLines(oldStr, newStr, options);
        diff.push({
          value: "",
          lines: []
        });
        function contextLines(lines) {
          return lines.map(function(entry) {
            return " " + entry;
          });
        }
        var hunks = [];
        var oldRangeStart = 0, newRangeStart = 0, curRange = [], oldLine = 1, newLine = 1;
        var _loop = function _loop2(i2) {
          var current = diff[i2], lines = current.lines || current.value.replace(/\n$/, "").split("\n");
          current.lines = lines;
          if (current.added || current.removed) {
            var _curRange;
            if (!oldRangeStart) {
              var prev = diff[i2 - 1];
              oldRangeStart = oldLine;
              newRangeStart = newLine;
              if (prev) {
                curRange = options.context > 0 ? contextLines(prev.lines.slice(-options.context)) : [];
                oldRangeStart -= curRange.length;
                newRangeStart -= curRange.length;
              }
            }
            (_curRange = curRange).push.apply(_curRange, _toConsumableArray(lines.map(function(entry) {
              return (current.added ? "+" : "-") + entry;
            })));
            if (current.added) {
              newLine += lines.length;
            } else {
              oldLine += lines.length;
            }
          } else {
            if (oldRangeStart) {
              if (lines.length <= options.context * 2 && i2 < diff.length - 2) {
                var _curRange2;
                (_curRange2 = curRange).push.apply(_curRange2, _toConsumableArray(contextLines(lines)));
              } else {
                var _curRange3;
                var contextSize = Math.min(lines.length, options.context);
                (_curRange3 = curRange).push.apply(_curRange3, _toConsumableArray(contextLines(lines.slice(0, contextSize))));
                var hunk = {
                  oldStart: oldRangeStart,
                  oldLines: oldLine - oldRangeStart + contextSize,
                  newStart: newRangeStart,
                  newLines: newLine - newRangeStart + contextSize,
                  lines: curRange
                };
                if (i2 >= diff.length - 2 && lines.length <= options.context) {
                  var oldEOFNewline = /\n$/.test(oldStr);
                  var newEOFNewline = /\n$/.test(newStr);
                  var noNlBeforeAdds = lines.length == 0 && curRange.length > hunk.oldLines;
                  if (!oldEOFNewline && noNlBeforeAdds) {
                    curRange.splice(hunk.oldLines, 0, "\\ No newline at end of file");
                  }
                  if (!oldEOFNewline && !noNlBeforeAdds || !newEOFNewline) {
                    curRange.push("\\ No newline at end of file");
                  }
                }
                hunks.push(hunk);
                oldRangeStart = 0;
                newRangeStart = 0;
                curRange = [];
              }
            }
            oldLine += lines.length;
            newLine += lines.length;
          }
        };
        for (var i = 0; i < diff.length; i++) {
          _loop(i);
        }
        return {
          oldFileName,
          newFileName,
          oldHeader,
          newHeader,
          hunks
        };
      }
      function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
        var diff = structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options);
        var ret = [];
        if (oldFileName == newFileName) {
          ret.push("Index: " + oldFileName);
        }
        ret.push("===================================================================");
        ret.push("--- " + diff.oldFileName + (typeof diff.oldHeader === "undefined" ? "" : "	" + diff.oldHeader));
        ret.push("+++ " + diff.newFileName + (typeof diff.newHeader === "undefined" ? "" : "	" + diff.newHeader));
        for (var i = 0; i < diff.hunks.length; i++) {
          var hunk = diff.hunks[i];
          ret.push("@@ -" + hunk.oldStart + "," + hunk.oldLines + " +" + hunk.newStart + "," + hunk.newLines + " @@");
          ret.push.apply(ret, hunk.lines);
        }
        return ret.join("\n") + "\n";
      }
      function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
        return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
      }
      function arrayEqual(a, b) {
        if (a.length !== b.length) {
          return false;
        }
        return arrayStartsWith(a, b);
      }
      function arrayStartsWith(array, start) {
        if (start.length > array.length) {
          return false;
        }
        for (var i = 0; i < start.length; i++) {
          if (start[i] !== array[i]) {
            return false;
          }
        }
        return true;
      }
      function calcLineCount(hunk) {
        var _calcOldNewLineCount = calcOldNewLineCount(hunk.lines), oldLines = _calcOldNewLineCount.oldLines, newLines = _calcOldNewLineCount.newLines;
        if (oldLines !== void 0) {
          hunk.oldLines = oldLines;
        } else {
          delete hunk.oldLines;
        }
        if (newLines !== void 0) {
          hunk.newLines = newLines;
        } else {
          delete hunk.newLines;
        }
      }
      function merge3(mine, theirs, base) {
        mine = loadPatch(mine, base);
        theirs = loadPatch(theirs, base);
        var ret = {};
        if (mine.index || theirs.index) {
          ret.index = mine.index || theirs.index;
        }
        if (mine.newFileName || theirs.newFileName) {
          if (!fileNameChanged(mine)) {
            ret.oldFileName = theirs.oldFileName || mine.oldFileName;
            ret.newFileName = theirs.newFileName || mine.newFileName;
            ret.oldHeader = theirs.oldHeader || mine.oldHeader;
            ret.newHeader = theirs.newHeader || mine.newHeader;
          } else if (!fileNameChanged(theirs)) {
            ret.oldFileName = mine.oldFileName;
            ret.newFileName = mine.newFileName;
            ret.oldHeader = mine.oldHeader;
            ret.newHeader = mine.newHeader;
          } else {
            ret.oldFileName = selectField(ret, mine.oldFileName, theirs.oldFileName);
            ret.newFileName = selectField(ret, mine.newFileName, theirs.newFileName);
            ret.oldHeader = selectField(ret, mine.oldHeader, theirs.oldHeader);
            ret.newHeader = selectField(ret, mine.newHeader, theirs.newHeader);
          }
        }
        ret.hunks = [];
        var mineIndex = 0, theirsIndex = 0, mineOffset = 0, theirsOffset = 0;
        while (mineIndex < mine.hunks.length || theirsIndex < theirs.hunks.length) {
          var mineCurrent = mine.hunks[mineIndex] || {
            oldStart: Infinity
          }, theirsCurrent = theirs.hunks[theirsIndex] || {
            oldStart: Infinity
          };
          if (hunkBefore(mineCurrent, theirsCurrent)) {
            ret.hunks.push(cloneHunk(mineCurrent, mineOffset));
            mineIndex++;
            theirsOffset += mineCurrent.newLines - mineCurrent.oldLines;
          } else if (hunkBefore(theirsCurrent, mineCurrent)) {
            ret.hunks.push(cloneHunk(theirsCurrent, theirsOffset));
            theirsIndex++;
            mineOffset += theirsCurrent.newLines - theirsCurrent.oldLines;
          } else {
            var mergedHunk = {
              oldStart: Math.min(mineCurrent.oldStart, theirsCurrent.oldStart),
              oldLines: 0,
              newStart: Math.min(mineCurrent.newStart + mineOffset, theirsCurrent.oldStart + theirsOffset),
              newLines: 0,
              lines: []
            };
            mergeLines(mergedHunk, mineCurrent.oldStart, mineCurrent.lines, theirsCurrent.oldStart, theirsCurrent.lines);
            theirsIndex++;
            mineIndex++;
            ret.hunks.push(mergedHunk);
          }
        }
        return ret;
      }
      function loadPatch(param, base) {
        if (typeof param === "string") {
          if (/^@@/m.test(param) || /^Index:/m.test(param)) {
            return parsePatch(param)[0];
          }
          if (!base) {
            throw new Error("Must provide a base reference or pass in a patch");
          }
          return structuredPatch(void 0, void 0, base, param);
        }
        return param;
      }
      function fileNameChanged(patch) {
        return patch.newFileName && patch.newFileName !== patch.oldFileName;
      }
      function selectField(index, mine, theirs) {
        if (mine === theirs) {
          return mine;
        } else {
          index.conflict = true;
          return {
            mine,
            theirs
          };
        }
      }
      function hunkBefore(test, check) {
        return test.oldStart < check.oldStart && test.oldStart + test.oldLines < check.oldStart;
      }
      function cloneHunk(hunk, offset) {
        return {
          oldStart: hunk.oldStart,
          oldLines: hunk.oldLines,
          newStart: hunk.newStart + offset,
          newLines: hunk.newLines,
          lines: hunk.lines
        };
      }
      function mergeLines(hunk, mineOffset, mineLines, theirOffset, theirLines) {
        var mine = {
          offset: mineOffset,
          lines: mineLines,
          index: 0
        }, their = {
          offset: theirOffset,
          lines: theirLines,
          index: 0
        };
        insertLeading(hunk, mine, their);
        insertLeading(hunk, their, mine);
        while (mine.index < mine.lines.length && their.index < their.lines.length) {
          var mineCurrent = mine.lines[mine.index], theirCurrent = their.lines[their.index];
          if ((mineCurrent[0] === "-" || mineCurrent[0] === "+") && (theirCurrent[0] === "-" || theirCurrent[0] === "+")) {
            mutualChange(hunk, mine, their);
          } else if (mineCurrent[0] === "+" && theirCurrent[0] === " ") {
            var _hunk$lines;
            (_hunk$lines = hunk.lines).push.apply(_hunk$lines, _toConsumableArray(collectChange(mine)));
          } else if (theirCurrent[0] === "+" && mineCurrent[0] === " ") {
            var _hunk$lines2;
            (_hunk$lines2 = hunk.lines).push.apply(_hunk$lines2, _toConsumableArray(collectChange(their)));
          } else if (mineCurrent[0] === "-" && theirCurrent[0] === " ") {
            removal(hunk, mine, their);
          } else if (theirCurrent[0] === "-" && mineCurrent[0] === " ") {
            removal(hunk, their, mine, true);
          } else if (mineCurrent === theirCurrent) {
            hunk.lines.push(mineCurrent);
            mine.index++;
            their.index++;
          } else {
            conflict(hunk, collectChange(mine), collectChange(their));
          }
        }
        insertTrailing(hunk, mine);
        insertTrailing(hunk, their);
        calcLineCount(hunk);
      }
      function mutualChange(hunk, mine, their) {
        var myChanges = collectChange(mine), theirChanges = collectChange(their);
        if (allRemoves(myChanges) && allRemoves(theirChanges)) {
          if (arrayStartsWith(myChanges, theirChanges) && skipRemoveSuperset(their, myChanges, myChanges.length - theirChanges.length)) {
            var _hunk$lines3;
            (_hunk$lines3 = hunk.lines).push.apply(_hunk$lines3, _toConsumableArray(myChanges));
            return;
          } else if (arrayStartsWith(theirChanges, myChanges) && skipRemoveSuperset(mine, theirChanges, theirChanges.length - myChanges.length)) {
            var _hunk$lines4;
            (_hunk$lines4 = hunk.lines).push.apply(_hunk$lines4, _toConsumableArray(theirChanges));
            return;
          }
        } else if (arrayEqual(myChanges, theirChanges)) {
          var _hunk$lines5;
          (_hunk$lines5 = hunk.lines).push.apply(_hunk$lines5, _toConsumableArray(myChanges));
          return;
        }
        conflict(hunk, myChanges, theirChanges);
      }
      function removal(hunk, mine, their, swap) {
        var myChanges = collectChange(mine), theirChanges = collectContext(their, myChanges);
        if (theirChanges.merged) {
          var _hunk$lines6;
          (_hunk$lines6 = hunk.lines).push.apply(_hunk$lines6, _toConsumableArray(theirChanges.merged));
        } else {
          conflict(hunk, swap ? theirChanges : myChanges, swap ? myChanges : theirChanges);
        }
      }
      function conflict(hunk, mine, their) {
        hunk.conflict = true;
        hunk.lines.push({
          conflict: true,
          mine,
          theirs: their
        });
      }
      function insertLeading(hunk, insert, their) {
        while (insert.offset < their.offset && insert.index < insert.lines.length) {
          var line = insert.lines[insert.index++];
          hunk.lines.push(line);
          insert.offset++;
        }
      }
      function insertTrailing(hunk, insert) {
        while (insert.index < insert.lines.length) {
          var line = insert.lines[insert.index++];
          hunk.lines.push(line);
        }
      }
      function collectChange(state) {
        var ret = [], operation = state.lines[state.index][0];
        while (state.index < state.lines.length) {
          var line = state.lines[state.index];
          if (operation === "-" && line[0] === "+") {
            operation = "+";
          }
          if (operation === line[0]) {
            ret.push(line);
            state.index++;
          } else {
            break;
          }
        }
        return ret;
      }
      function collectContext(state, matchChanges) {
        var changes = [], merged = [], matchIndex = 0, contextChanges = false, conflicted = false;
        while (matchIndex < matchChanges.length && state.index < state.lines.length) {
          var change = state.lines[state.index], match = matchChanges[matchIndex];
          if (match[0] === "+") {
            break;
          }
          contextChanges = contextChanges || change[0] !== " ";
          merged.push(match);
          matchIndex++;
          if (change[0] === "+") {
            conflicted = true;
            while (change[0] === "+") {
              changes.push(change);
              change = state.lines[++state.index];
            }
          }
          if (match.substr(1) === change.substr(1)) {
            changes.push(change);
            state.index++;
          } else {
            conflicted = true;
          }
        }
        if ((matchChanges[matchIndex] || "")[0] === "+" && contextChanges) {
          conflicted = true;
        }
        if (conflicted) {
          return changes;
        }
        while (matchIndex < matchChanges.length) {
          merged.push(matchChanges[matchIndex++]);
        }
        return {
          merged,
          changes
        };
      }
      function allRemoves(changes) {
        return changes.reduce(function(prev, change) {
          return prev && change[0] === "-";
        }, true);
      }
      function skipRemoveSuperset(state, removeChanges, delta) {
        for (var i = 0; i < delta; i++) {
          var changeContent = removeChanges[removeChanges.length - delta + i].substr(1);
          if (state.lines[state.index + i] !== " " + changeContent) {
            return false;
          }
        }
        state.index += delta;
        return true;
      }
      function calcOldNewLineCount(lines) {
        var oldLines = 0;
        var newLines = 0;
        lines.forEach(function(line) {
          if (typeof line !== "string") {
            var myCount = calcOldNewLineCount(line.mine);
            var theirCount = calcOldNewLineCount(line.theirs);
            if (oldLines !== void 0) {
              if (myCount.oldLines === theirCount.oldLines) {
                oldLines += myCount.oldLines;
              } else {
                oldLines = void 0;
              }
            }
            if (newLines !== void 0) {
              if (myCount.newLines === theirCount.newLines) {
                newLines += myCount.newLines;
              } else {
                newLines = void 0;
              }
            }
          } else {
            if (newLines !== void 0 && (line[0] === "+" || line[0] === " ")) {
              newLines++;
            }
            if (oldLines !== void 0 && (line[0] === "-" || line[0] === " ")) {
              oldLines++;
            }
          }
        });
        return {
          oldLines,
          newLines
        };
      }
      function convertChangesToDMP(changes) {
        var ret = [], change, operation;
        for (var i = 0; i < changes.length; i++) {
          change = changes[i];
          if (change.added) {
            operation = 1;
          } else if (change.removed) {
            operation = -1;
          } else {
            operation = 0;
          }
          ret.push([operation, change.value]);
        }
        return ret;
      }
      function convertChangesToXML(changes) {
        var ret = [];
        for (var i = 0; i < changes.length; i++) {
          var change = changes[i];
          if (change.added) {
            ret.push("<ins>");
          } else if (change.removed) {
            ret.push("<del>");
          }
          ret.push(escapeHTML(change.value));
          if (change.added) {
            ret.push("</ins>");
          } else if (change.removed) {
            ret.push("</del>");
          }
        }
        return ret.join("");
      }
      function escapeHTML(s) {
        var n = s;
        n = n.replace(/&/g, "&amp;");
        n = n.replace(/</g, "&lt;");
        n = n.replace(/>/g, "&gt;");
        n = n.replace(/"/g, "&quot;");
        return n;
      }
      exports2.Diff = Diff;
      exports2.diffChars = diffChars;
      exports2.diffWords = diffWords;
      exports2.diffWordsWithSpace = diffWordsWithSpace;
      exports2.diffLines = diffLines;
      exports2.diffTrimmedLines = diffTrimmedLines;
      exports2.diffSentences = diffSentences;
      exports2.diffCss = diffCss;
      exports2.diffJson = diffJson;
      exports2.diffArrays = diffArrays;
      exports2.structuredPatch = structuredPatch;
      exports2.createTwoFilesPatch = createTwoFilesPatch;
      exports2.createPatch = createPatch;
      exports2.applyPatch = applyPatch;
      exports2.applyPatches = applyPatches;
      exports2.parsePatch = parsePatch;
      exports2.merge = merge3;
      exports2.convertChangesToDMP = convertChangesToDMP;
      exports2.convertChangesToXML = convertChangesToXML;
      exports2.canonicalize = canonicalize;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/react-diff-viewer/lib/compute-lines.js
var require_compute_lines = __commonJS({
  "node_modules/react-diff-viewer/lib/compute-lines.js"(exports) {
    "use strict";
    var __read = exports && exports.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spread = exports && exports.__spread || function() {
      for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
      return ar;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var diff = require_diff();
    var jsDiff = diff;
    var DiffType;
    (function(DiffType2) {
      DiffType2[DiffType2["DEFAULT"] = 0] = "DEFAULT";
      DiffType2[DiffType2["ADDED"] = 1] = "ADDED";
      DiffType2[DiffType2["REMOVED"] = 2] = "REMOVED";
    })(DiffType = exports.DiffType || (exports.DiffType = {}));
    var DiffMethod;
    (function(DiffMethod2) {
      DiffMethod2["CHARS"] = "diffChars";
      DiffMethod2["WORDS"] = "diffWords";
      DiffMethod2["WORDS_WITH_SPACE"] = "diffWordsWithSpace";
      DiffMethod2["LINES"] = "diffLines";
      DiffMethod2["TRIMMED_LINES"] = "diffTrimmedLines";
      DiffMethod2["SENTENCES"] = "diffSentences";
      DiffMethod2["CSS"] = "diffCss";
    })(DiffMethod = exports.DiffMethod || (exports.DiffMethod = {}));
    var constructLines = function(value) {
      var lines = value.split("\n");
      var isAllEmpty = lines.every(function(val) {
        return !val;
      });
      if (isAllEmpty) {
        if (lines.length === 2) {
          return [];
        }
        lines.pop();
        return lines;
      }
      var lastLine = lines[lines.length - 1];
      var firstLine = lines[0];
      if (!lastLine) {
        lines.pop();
      }
      if (!firstLine) {
        lines.shift();
      }
      return lines;
    };
    var computeDiff = function(oldValue, newValue, compareMethod) {
      if (compareMethod === void 0) {
        compareMethod = DiffMethod.CHARS;
      }
      var diffArray = jsDiff[compareMethod](oldValue, newValue);
      var computedDiff = {
        left: [],
        right: []
      };
      diffArray.forEach(function(_a) {
        var added = _a.added, removed = _a.removed, value = _a.value;
        var diffInformation = {};
        if (added) {
          diffInformation.type = DiffType.ADDED;
          diffInformation.value = value;
          computedDiff.right.push(diffInformation);
        }
        if (removed) {
          diffInformation.type = DiffType.REMOVED;
          diffInformation.value = value;
          computedDiff.left.push(diffInformation);
        }
        if (!removed && !added) {
          diffInformation.type = DiffType.DEFAULT;
          diffInformation.value = value;
          computedDiff.right.push(diffInformation);
          computedDiff.left.push(diffInformation);
        }
        return diffInformation;
      });
      return computedDiff;
    };
    var computeLineInformation = function(oldString, newString, disableWordDiff, compareMethod, linesOffset) {
      if (disableWordDiff === void 0) {
        disableWordDiff = false;
      }
      if (compareMethod === void 0) {
        compareMethod = DiffMethod.CHARS;
      }
      if (linesOffset === void 0) {
        linesOffset = 0;
      }
      var diffArray = diff.diffLines(oldString.trimRight(), newString.trimRight(), {
        newlineIsToken: true,
        ignoreWhitespace: false,
        ignoreCase: false
      });
      var rightLineNumber = linesOffset;
      var leftLineNumber = linesOffset;
      var lineInformation = [];
      var counter = 0;
      var diffLines = [];
      var ignoreDiffIndexes = [];
      var getLineInformation = function(value, diffIndex, added, removed, evaluateOnlyFirstLine) {
        var lines = constructLines(value);
        return lines.map(function(line, lineIndex) {
          var left = {};
          var right = {};
          if (ignoreDiffIndexes.includes(diffIndex + "-" + lineIndex) || evaluateOnlyFirstLine && lineIndex !== 0) {
            return void 0;
          }
          if (added || removed) {
            if (!diffLines.includes(counter)) {
              diffLines.push(counter);
            }
            if (removed) {
              leftLineNumber += 1;
              left.lineNumber = leftLineNumber;
              left.type = DiffType.REMOVED;
              left.value = line || " ";
              var nextDiff = diffArray[diffIndex + 1];
              if (nextDiff && nextDiff.added) {
                var nextDiffLines = constructLines(nextDiff.value)[lineIndex];
                if (nextDiffLines) {
                  var _a = getLineInformation(nextDiff.value, diffIndex, true, false, true)[0].right, rightValue = _a.value, lineNumber = _a.lineNumber, type = _a.type;
                  ignoreDiffIndexes.push(diffIndex + 1 + "-" + lineIndex);
                  right.lineNumber = lineNumber;
                  right.type = type;
                  if (disableWordDiff) {
                    right.value = rightValue;
                  } else {
                    var computedDiff = computeDiff(line, rightValue, compareMethod);
                    right.value = computedDiff.right;
                    left.value = computedDiff.left;
                  }
                }
              }
            } else {
              rightLineNumber += 1;
              right.lineNumber = rightLineNumber;
              right.type = DiffType.ADDED;
              right.value = line;
            }
          } else {
            leftLineNumber += 1;
            rightLineNumber += 1;
            left.lineNumber = leftLineNumber;
            left.type = DiffType.DEFAULT;
            left.value = line;
            right.lineNumber = rightLineNumber;
            right.type = DiffType.DEFAULT;
            right.value = line;
          }
          counter += 1;
          return { right, left };
        }).filter(Boolean);
      };
      diffArray.forEach(function(_a, index) {
        var added = _a.added, removed = _a.removed, value = _a.value;
        lineInformation = __spread(lineInformation, getLineInformation(value, index, added, removed));
      });
      return {
        lineInformation,
        diffLines
      };
    };
    exports.computeLineInformation = computeLineInformation;
  }
});

// node_modules/@emotion/sheet/dist/sheet.browser.esm.js
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}
function createStyleElement(options) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  return tag;
}
var StyleSheet;
var init_sheet_browser_esm = __esm({
  "node_modules/@emotion/sheet/dist/sheet.browser.esm.js"() {
    StyleSheet = function() {
      function StyleSheet2(options) {
        this.isSpeedy = options.speedy === void 0 ? false : options.speedy;
        this.tags = [];
        this.ctr = 0;
        this.nonce = options.nonce;
        this.key = options.key;
        this.container = options.container;
        this.before = null;
      }
      var _proto = StyleSheet2.prototype;
      _proto.insert = function insert(rule) {
        if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
          var _tag = createStyleElement(this);
          var before;
          if (this.tags.length === 0) {
            before = this.before;
          } else {
            before = this.tags[this.tags.length - 1].nextSibling;
          }
          this.container.insertBefore(_tag, before);
          this.tags.push(_tag);
        }
        var tag = this.tags[this.tags.length - 1];
        if (this.isSpeedy) {
          var sheet2 = sheetForTag(tag);
          try {
            var isImportRule = rule.charCodeAt(1) === 105 && rule.charCodeAt(0) === 64;
            sheet2.insertRule(
              rule,
              // we need to insert @import rules before anything else
              // otherwise there will be an error
              // technically this means that the @import rules will
              // _usually_(not always since there could be multiple style tags)
              // be the first ones in prod and generally later in dev
              // this shouldn't really matter in the real world though
              // @import is generally only used for font faces from google fonts and etc.
              // so while this could be technically correct then it would be slower and larger
              // for a tiny bit of correctness that won't matter in the real world
              isImportRule ? 0 : sheet2.cssRules.length
            );
          } catch (e) {
            if (true) {
              console.warn('There was a problem inserting the following rule: "' + rule + '"', e);
            }
          }
        } else {
          tag.appendChild(document.createTextNode(rule));
        }
        this.ctr++;
      };
      _proto.flush = function flush2() {
        this.tags.forEach(function(tag) {
          return tag.parentNode.removeChild(tag);
        });
        this.tags = [];
        this.ctr = 0;
      };
      return StyleSheet2;
    }();
  }
});

// node_modules/@emotion/stylis/dist/stylis.browser.esm.js
function stylis_min(W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B2 = e.length, J = B2 - 1, y, f = "", p = "", F2 = "", G2 = "", C; l < B2; ) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B2++, J++);
      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, "")), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;
            default:
              f += e.charAt(l);
          }
          g = 59;
        }
        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;
            for (t = ++l; l < B2; ) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;
                case 125:
                  k--;
                  break;
                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }
                              break;
                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }
                          }
                        }
                        l = u;
                      }
                  }
                  break;
                case 91:
                  g++;
                case 40:
                  g++;
                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g; ) {
                  }
              }
              if (0 === k) break;
              l++;
            }
            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, "").trim()).charCodeAt(0));
            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ""));
                g = f.charCodeAt(1);
                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;
                  default:
                    r = O;
                }
                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(""), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ""));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);
                  case 100:
                  case 109:
                  case 45:
                    k = f + "{" + k + "}";
                    break;
                  case 107:
                    f = f.replace(fa, "$1 $2");
                    k = f + "{" + k + "}";
                    k = 1 === w || 2 === w && L("@" + k, 3) ? "@-webkit-" + k + "@" + k : "@" + k;
                    break;
                  default:
                    k = f + k, 112 === h && (k = (p += k, ""));
                }
                else k = "";
                break;
              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }
            F2 += k;
            k = I = r = u = q = 0;
            f = "";
            g = e.charCodeAt(++l);
            break;
          case 125:
          case 59:
            f = (0 < r ? f.replace(N, "") : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(" ", ":")).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = "\0\0"), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;
              case 64:
                if (105 === g || 99 === g) {
                  G2 += f + e.charAt(l);
                  break;
                }
              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = "";
            g = e.charCodeAt(++l);
        }
      }
      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += "\0");
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;
        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }
        default:
          z++;
          y = e.charAt(l);
          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = "";
                  break;
                default:
                  32 !== g && (y = " ");
              }
              break;
            case 0:
              y = "\\0";
              break;
            case 12:
              y = "\\f";
              break;
            case 11:
              y = "\\v";
              break;
            case 38:
              0 === n + b + m && (r = I = 1, y = "\f" + y);
              break;
            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);
                case 8:
                  111 === K && (E = K);
              }
              break;
            case 58:
              0 === n + b + m && (u = l);
              break;
            case 44:
              0 === b + v + n + m && (r = 1, y += "\r");
              break;
            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;
            case 91:
              0 === n + b + v && m++;
              break;
            case 93:
              0 === n + b + v && m--;
              break;
            case 41:
              0 === n + b + m && v--;
              break;
            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;
                  default:
                    q = 1;
                }
                v++;
              }
              break;
            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;
            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;
                    case 220:
                      t = l, b = 42;
                  }
                  break;
                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = "", b = 0);
              }
          }
          0 === b && (f += y);
      }
      K = x;
      x = g;
      l++;
    }
    t = p.length;
    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G2 + p + F2;
      p = r.join(",") + "{" + p + "}";
      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);
        switch (E) {
          case 111:
            p = p.replace(ha, ":-moz-$1") + p;
            break;
          case 112:
            p = p.replace(Q, "::-webkit-input-$1") + p.replace(Q, "::-moz-$1") + p.replace(Q, ":-ms-input-$1") + p;
        }
        E = 0;
      }
    }
    return G2 + p + F2;
  }
  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length, m = d.length;
    switch (m) {
      case 0:
      case 1:
        var b = 0;
        for (d = 0 === m ? "" : d[0] + " "; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }
        break;
      default:
        var v = b = 0;
        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + " ", h[b], e).trim();
          }
        }
    }
    return c;
  }
  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));
    switch (h) {
      case 38:
        return c.replace(F, "$1" + d.trim());
      case 58:
        return d.trim() + c.replace(F, "$1" + d.trim());
      default:
        if (0 < 1 * e && 0 < c.indexOf("\f")) return c.replace(F, (58 === d.charCodeAt(0) ? "" : "$1") + d.trim());
    }
    return d + c;
  }
  function P(d, c, e, h) {
    var a = d + ";", m = 2 * c + 3 * e + 4 * h;
    if (944 === m) {
      d = a.indexOf(":", 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ";";
      return 1 === w || 2 === w && L(b, 1) ? "-webkit-" + b + b : b;
    }
    if (0 === w || 2 === w && !L(a, 1)) return a;
    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? "-webkit-" + a + a : a;
      case 951:
        return 116 === a.charCodeAt(3) ? "-webkit-" + a + a : a;
      case 963:
        return 110 === a.charCodeAt(5) ? "-webkit-" + a + a : a;
      case 1009:
        if (100 !== a.charCodeAt(4)) break;
      case 969:
      case 942:
        return "-webkit-" + a + a;
      case 978:
        return "-webkit-" + a + "-moz-" + a + a;
      case 1019:
      case 983:
        return "-webkit-" + a + "-moz-" + a + "-ms-" + a + a;
      case 883:
        if (45 === a.charCodeAt(8)) return "-webkit-" + a + a;
        if (0 < a.indexOf("image-set(", 11)) return a.replace(ja, "$1-webkit-$2") + a;
        break;
      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return "-webkit-box-" + a.replace("-grow", "") + "-webkit-" + a + "-ms-" + a.replace("grow", "positive") + a;
          case 115:
            return "-webkit-" + a + "-ms-" + a.replace("shrink", "negative") + a;
          case 98:
            return "-webkit-" + a + "-ms-" + a.replace("basis", "preferred-size") + a;
        }
        return "-webkit-" + a + "-ms-" + a + a;
      case 964:
        return "-webkit-" + a + "-ms-flex-" + a + a;
      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(":", 15)).replace("flex-", "").replace("space-between", "justify");
        return "-webkit-box-pack" + b + "-webkit-" + a + "-ms-flex-pack" + b + a;
      case 1005:
        return ka.test(a) ? a.replace(aa, ":-webkit-") + a.replace(aa, ":-moz-") + a : a;
      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf("-") + 1;
        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, "tb");
            break;
          case 232:
            b = a.replace(G, "tb-rl");
            break;
          case 220:
            b = a.replace(G, "lr");
            break;
          default:
            return a;
        }
        return "-webkit-" + a + "-ms-" + b + a;
      case 1017:
        if (-1 === a.indexOf("sticky", 9)) break;
      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(":", 7) + 1).trim();
        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;
          case 115:
            a = a.replace(b, "-webkit-" + b) + ";" + a;
            break;
          case 207:
          case 102:
            a = a.replace(b, "-webkit-" + (102 < m ? "inline-" : "") + "box") + ";" + a.replace(b, "-webkit-" + b) + ";" + a.replace(b, "-ms-" + b + "box") + ";" + a;
        }
        return a + ";";
      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace("-items", ""), "-webkit-" + a + "-webkit-box-" + b + "-ms-flex-" + b + a;
          case 115:
            return "-webkit-" + a + "-ms-flex-item-" + a.replace(ba, "") + a;
          default:
            return "-webkit-" + a + "-ms-flex-line-pack" + a.replace("align-content", "").replace(ba, "") + a;
        }
        break;
      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;
      case 931:
      case 953:
        if (true === la.test(d)) return 115 === (b = d.substring(d.indexOf(":") + 1)).charCodeAt(0) ? P(d.replace("stretch", "fill-available"), c, e, h).replace(":fill-available", ":stretch") : a.replace(b, "-webkit-" + b) + a.replace(b, "-moz-" + b.replace("fill-", "")) + a;
        break;
      case 962:
        if (a = "-webkit-" + a + (102 === a.charCodeAt(5) ? "-ms-" + a : "") + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf("transform", 10)) return a.substring(0, a.indexOf(";", 27) + 1).replace(ma, "$1-webkit-$2") + a;
    }
    return a;
  }
  function L(d, c) {
    var e = d.indexOf(1 === c ? ":" : "{"), h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, "$1"), e, c);
  }
  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ";" ? e.replace(oa, " or ($1)").substring(4) : "(" + c + ")";
  }
  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w2; g < A; ++g) {
      switch (w2 = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case false:
        case true:
        case null:
          break;
        default:
          x = w2;
      }
    }
    if (x !== c) return x;
  }
  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;
      default:
        if ("function" === typeof d) S[A++] = d;
        else if ("object" === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
          T(d[c]);
        }
        else Y = !!d | 0;
    }
    return T;
  }
  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? "function" !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }
  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];
    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && "string" === typeof h && (c = h);
    }
    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = "";
    E = 0;
    z = D = 1;
    return a;
  }
  var ca = /^\0+/g, N = /[\0\r\f]/g, aa = /: */g, ka = /zoo|gra/, ma = /([,: ])(transform)/g, ia = /,\r+?/g, F = /([\t\r\n ])*\f?&/g, fa = /@(k\w+)\s*(\S*)\s*/, Q = /::(place)/g, ha = /:(read-only)/g, G = /[svh]\w+-[tblr]{2}/, da = /\(\s*(.*)\s*\)/g, oa = /([\s\S]*?);/g, ba = /-self|flex-/g, na = /[^]*?(:[rp][el]a[\w-]+)[^]*/, la = /stretch|:\s*\w+\-(?:conte|avail)/, ja = /([^-])(image-set\()/, z = 1, D = 1, E = 0, w = 1, O = [], S = [], A = 0, R = null, Y = 0, V = "";
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}
var stylis_browser_esm_default;
var init_stylis_browser_esm = __esm({
  "node_modules/@emotion/stylis/dist/stylis.browser.esm.js"() {
    stylis_browser_esm_default = stylis_min;
  }
});

// node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js
var init_weak_memoize_browser_esm = __esm({
  "node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js"() {
  }
});

// node_modules/@emotion/cache/dist/cache.browser.esm.js
function toSheet(block) {
  if (block) {
    Sheet.current.insert(block + "}");
  }
}
var delimiter, needle, Sheet, ruleSheet, createCache, cache_browser_esm_default;
var init_cache_browser_esm = __esm({
  "node_modules/@emotion/cache/dist/cache.browser.esm.js"() {
    init_sheet_browser_esm();
    init_stylis_browser_esm();
    init_weak_memoize_browser_esm();
    delimiter = "/*|*/";
    needle = delimiter + "}";
    Sheet = {
      current: null
    };
    ruleSheet = function ruleSheet2(context, content, selectors, parents, line, column, length, ns, depth, at) {
      switch (context) {
        // property
        case 1: {
          switch (content.charCodeAt(0)) {
            case 64: {
              Sheet.current.insert(content + ";");
              return "";
            }
            // charcode for l
            case 108: {
              if (content.charCodeAt(2) === 98) {
                return "";
              }
            }
          }
          break;
        }
        // selector
        case 2: {
          if (ns === 0) return content + delimiter;
          break;
        }
        // at-rule
        case 3: {
          switch (ns) {
            // @font-face, @page
            case 102:
            case 112: {
              Sheet.current.insert(selectors[0] + content);
              return "";
            }
            default: {
              return content + (at === 0 ? delimiter : "");
            }
          }
        }
        case -2: {
          content.split(needle).forEach(toSheet);
        }
      }
    };
    createCache = function createCache2(options) {
      if (options === void 0) options = {};
      var key = options.key || "css";
      var stylisOptions;
      if (options.prefix !== void 0) {
        stylisOptions = {
          prefix: options.prefix
        };
      }
      var stylis = new stylis_browser_esm_default(stylisOptions);
      if (true) {
        if (/[^a-z-]/.test(key)) {
          throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + key + '" was passed');
        }
      }
      var inserted = {};
      var container;
      {
        container = options.container || document.head;
        var nodes = document.querySelectorAll("style[data-emotion-" + key + "]");
        Array.prototype.forEach.call(nodes, function(node) {
          var attrib = node.getAttribute("data-emotion-" + key);
          attrib.split(" ").forEach(function(id) {
            inserted[id] = true;
          });
          if (node.parentNode !== container) {
            container.appendChild(node);
          }
        });
      }
      var _insert;
      {
        stylis.use(options.stylisPlugins)(ruleSheet);
        _insert = function insert(selector, serialized, sheet2, shouldCache) {
          var name = serialized.name;
          Sheet.current = sheet2;
          if (serialized.map !== void 0) {
            var map = serialized.map;
            Sheet.current = {
              insert: function insert2(rule) {
                sheet2.insert(rule + map);
              }
            };
          }
          stylis(selector, serialized.styles);
          if (shouldCache) {
            cache2.inserted[name] = true;
          }
        };
      }
      if (true) {
        var commentStart = /\/\*/g;
        var commentEnd = /\*\//g;
        stylis.use(function(context, content) {
          switch (context) {
            case -1: {
              while (commentStart.test(content)) {
                commentEnd.lastIndex = commentStart.lastIndex;
                if (commentEnd.test(content)) {
                  commentStart.lastIndex = commentEnd.lastIndex;
                  continue;
                }
                throw new Error('Your styles have an unterminated comment ("/*" without corresponding "*/").');
              }
              commentStart.lastIndex = 0;
              break;
            }
          }
        });
        stylis.use(function(context, content, selectors) {
          switch (context) {
            case -1: {
              var flag = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason";
              var unsafePseudoClasses = content.match(/(:first|:nth|:nth-last)-child/g);
              if (unsafePseudoClasses && cache2.compat !== true) {
                unsafePseudoClasses.forEach(function(unsafePseudoClass) {
                  var ignoreRegExp = new RegExp(unsafePseudoClass + ".*\\/\\* " + flag + " \\*\\/");
                  var ignore = ignoreRegExp.test(content);
                  if (unsafePseudoClass && !ignore) {
                    console.error('The pseudo class "' + unsafePseudoClass + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + unsafePseudoClass.split("-child")[0] + '-of-type".');
                  }
                });
              }
              break;
            }
          }
        });
      }
      var cache2 = {
        key,
        sheet: new StyleSheet({
          key,
          container,
          nonce: options.nonce,
          speedy: options.speedy
        }),
        nonce: options.nonce,
        inserted,
        registered: {},
        insert: _insert
      };
      return cache2;
    };
    cache_browser_esm_default = createCache;
  }
});

// node_modules/@emotion/hash/dist/hash.browser.esm.js
function murmur2(str) {
  var h = 0;
  var k, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= /* k >>> r: */
    k >>> 24;
    h = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 255;
      h = /* Math.imul(h, m): */
      (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  h ^= h >>> 13;
  h = /* Math.imul(h, m): */
  (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}
var hash_browser_esm_default;
var init_hash_browser_esm = __esm({
  "node_modules/@emotion/hash/dist/hash.browser.esm.js"() {
    hash_browser_esm_default = murmur2;
  }
});

// node_modules/@emotion/unitless/dist/unitless.browser.esm.js
var unitlessKeys, unitless_browser_esm_default;
var init_unitless_browser_esm = __esm({
  "node_modules/@emotion/unitless/dist/unitless.browser.esm.js"() {
    unitlessKeys = {
      animationIterationCount: 1,
      borderImageOutset: 1,
      borderImageSlice: 1,
      borderImageWidth: 1,
      boxFlex: 1,
      boxFlexGroup: 1,
      boxOrdinalGroup: 1,
      columnCount: 1,
      columns: 1,
      flex: 1,
      flexGrow: 1,
      flexPositive: 1,
      flexShrink: 1,
      flexNegative: 1,
      flexOrder: 1,
      gridRow: 1,
      gridRowEnd: 1,
      gridRowSpan: 1,
      gridRowStart: 1,
      gridColumn: 1,
      gridColumnEnd: 1,
      gridColumnSpan: 1,
      gridColumnStart: 1,
      msGridRow: 1,
      msGridRowSpan: 1,
      msGridColumn: 1,
      msGridColumnSpan: 1,
      fontWeight: 1,
      lineHeight: 1,
      opacity: 1,
      order: 1,
      orphans: 1,
      tabSize: 1,
      widows: 1,
      zIndex: 1,
      zoom: 1,
      WebkitLineClamp: 1,
      // SVG-related properties
      fillOpacity: 1,
      floodOpacity: 1,
      stopOpacity: 1,
      strokeDasharray: 1,
      strokeDashoffset: 1,
      strokeMiterlimit: 1,
      strokeOpacity: 1,
      strokeWidth: 1
    };
    unitless_browser_esm_default = unitlessKeys;
  }
});

// node_modules/@emotion/serialize/node_modules/@emotion/memoize/dist/memoize.browser.esm.js
function memoize(fn) {
  var cache2 = {};
  return function(arg) {
    if (cache2[arg] === void 0) cache2[arg] = fn(arg);
    return cache2[arg];
  };
}
var memoize_browser_esm_default;
var init_memoize_browser_esm = __esm({
  "node_modules/@emotion/serialize/node_modules/@emotion/memoize/dist/memoize.browser.esm.js"() {
    memoize_browser_esm_default = memoize;
  }
});

// node_modules/@emotion/serialize/dist/serialize.browser.esm.js
function handleInterpolation(mergedProps, registered, interpolation, couldBeSelectorInterpolation) {
  if (interpolation == null) {
    return "";
  }
  if (interpolation.__emotion_styles !== void 0) {
    if (interpolation.toString() === "NO_COMPONENT_SELECTOR") {
      throw new Error("Component selectors can only be used in conjunction with babel-plugin-emotion.");
    }
    return interpolation;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      if (interpolation.anim === 1) {
        cursor = {
          name: interpolation.name,
          styles: interpolation.styles,
          next: cursor
        };
        return interpolation.name;
      }
      if (interpolation.styles !== void 0) {
        var next = interpolation.next;
        if (next !== void 0) {
          while (next !== void 0) {
            cursor = {
              name: next.name,
              styles: next.styles,
              next: cursor
            };
            next = next.next;
          }
        }
        var styles = interpolation.styles + ";";
        if (interpolation.map !== void 0) {
          styles += interpolation.map;
        }
        return styles;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
    case "function": {
      if (mergedProps !== void 0) {
        var previousCursor = cursor;
        var result = interpolation(mergedProps);
        cursor = previousCursor;
        return handleInterpolation(mergedProps, registered, result, couldBeSelectorInterpolation);
      } else if (true) {
        console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      }
      break;
    }
    case "string":
      if (true) {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function(match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, "") + "`");
          return "${" + fakeVarName + "}";
        });
        if (matched.length) {
          console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(matched, ["`" + replaced + "`"]).join("\n") + "\n\nYou should wrap it with `css` like this:\n\n" + ("css`" + replaced + "`"));
        }
      }
      break;
  }
  if (registered == null) {
    return interpolation;
  }
  var cached = registered[interpolation];
  if (couldBeSelectorInterpolation && shouldWarnAboutInterpolatingClassNameFromCss && cached !== void 0) {
    console.error("Interpolating a className from css`` is not recommended and will cause problems with composition.\nInterpolating a className from css`` will be completely unsupported in a future major version of Emotion");
    shouldWarnAboutInterpolatingClassNameFromCss = false;
  }
  return cached !== void 0 && !couldBeSelectorInterpolation ? cached : interpolation;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = "";
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i], false);
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];
      if (typeof value !== "object") {
        if (registered != null && registered[value] !== void 0) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === "NO_COMPONENT_SELECTOR" && true) {
          throw new Error("Component selectors can only be used in conjunction with babel-plugin-emotion.");
        }
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value, false);
          switch (_key) {
            case "animation":
            case "animationName": {
              string += processStyleName(_key) + ":" + interpolated + ";";
              break;
            }
            default: {
              if (_key === "undefined") {
                console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
              }
              string += _key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string;
}
var ILLEGAL_ESCAPE_SEQUENCE_ERROR, UNDEFINED_AS_OBJECT_KEY_ERROR, hyphenateRegex, animationRegex, isCustomProperty, isProcessableValue, processStyleName, processStyleValue, contentValuePattern, contentValues, oldProcessStyleValue, msPattern, hyphenPattern, hyphenatedCache, shouldWarnAboutInterpolatingClassNameFromCss, labelPattern, sourceMapPattern, cursor, serializeStyles;
var init_serialize_browser_esm = __esm({
  "node_modules/@emotion/serialize/dist/serialize.browser.esm.js"() {
    init_hash_browser_esm();
    init_unitless_browser_esm();
    init_memoize_browser_esm();
    ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
    UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
    hyphenateRegex = /[A-Z]|^ms/g;
    animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
    isCustomProperty = function isCustomProperty2(property) {
      return property.charCodeAt(1) === 45;
    };
    isProcessableValue = function isProcessableValue2(value) {
      return value != null && typeof value !== "boolean";
    };
    processStyleName = memoize_browser_esm_default(function(styleName) {
      return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
    });
    processStyleValue = function processStyleValue2(key, value) {
      switch (key) {
        case "animation":
        case "animationName": {
          if (typeof value === "string") {
            return value.replace(animationRegex, function(match, p1, p2) {
              cursor = {
                name: p1,
                styles: p2,
                next: cursor
              };
              return p1;
            });
          }
        }
      }
      if (unitless_browser_esm_default[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
        return value + "px";
      }
      return value;
    };
    if (true) {
      contentValuePattern = /(attr|calc|counters?|url)\(/;
      contentValues = ["normal", "none", "counter", "open-quote", "close-quote", "no-open-quote", "no-close-quote", "initial", "inherit", "unset"];
      oldProcessStyleValue = processStyleValue;
      msPattern = /^-ms-/;
      hyphenPattern = /-(.)/g;
      hyphenatedCache = {};
      processStyleValue = function processStyleValue3(key, value) {
        if (key === "content") {
          if (typeof value !== "string" || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
            console.error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
          }
        }
        var processed = oldProcessStyleValue(key, value);
        if (processed !== "" && !isCustomProperty(key) && key.indexOf("-") !== -1 && hyphenatedCache[key] === void 0) {
          hyphenatedCache[key] = true;
          console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, "ms-").replace(hyphenPattern, function(str, _char) {
            return _char.toUpperCase();
          }) + "?");
        }
        return processed;
      };
    }
    shouldWarnAboutInterpolatingClassNameFromCss = true;
    labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
    if (true) {
      sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//;
    }
    serializeStyles = function serializeStyles2(args, registered, mergedProps) {
      if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
        return args[0];
      }
      var stringMode = true;
      var styles = "";
      cursor = void 0;
      var strings = args[0];
      if (strings == null || strings.raw === void 0) {
        stringMode = false;
        styles += handleInterpolation(mergedProps, registered, strings, false);
      } else {
        if (strings[0] === void 0) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }
        styles += strings[0];
      }
      for (var i = 1; i < args.length; i++) {
        styles += handleInterpolation(mergedProps, registered, args[i], styles.charCodeAt(styles.length - 1) === 46);
        if (stringMode) {
          if (strings[i] === void 0) {
            console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
          }
          styles += strings[i];
        }
      }
      var sourceMap;
      if (true) {
        styles = styles.replace(sourceMapPattern, function(match2) {
          sourceMap = match2;
          return "";
        });
      }
      labelPattern.lastIndex = 0;
      var identifierName = "";
      var match;
      while ((match = labelPattern.exec(styles)) !== null) {
        identifierName += "-" + // $FlowFixMe we know it's not null
        match[1];
      }
      var name = hash_browser_esm_default(styles) + identifierName;
      if (true) {
        return {
          name,
          styles,
          map: sourceMap,
          next: cursor,
          toString: function toString() {
            return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
          }
        };
      }
      return {
        name,
        styles,
        next: cursor
      };
    };
  }
});

// node_modules/@emotion/utils/dist/utils.browser.esm.js
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = "";
  classNames.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className]);
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var isBrowser, insertStyles;
var init_utils_browser_esm = __esm({
  "node_modules/@emotion/utils/dist/utils.browser.esm.js"() {
    isBrowser = true;
    insertStyles = function insertStyles2(cache2, serialized, isStringTag) {
      var className = cache2.key + "-" + serialized.name;
      if (
        // we only need to add the styles to the registered cache if the
        // class name could be used further down
        // the tree but if it's a string tag, we know it won't
        // so we don't have to add it to registered cache.
        // this improves memory usage since we can avoid storing the whole style string
        (isStringTag === false || // we need to always store it if we're in compat mode and
        // in node since emotion-server relies on whether a style is in
        // the registered cache to know whether a style is global or not
        // also, note that this check will be dead code eliminated in the browser
        isBrowser === false && cache2.compat !== void 0) && cache2.registered[className] === void 0
      ) {
        cache2.registered[className] = serialized.styles;
      }
      if (cache2.inserted[serialized.name] === void 0) {
        var current = serialized;
        do {
          var maybeStyles = cache2.insert("." + className, current, cache2.sheet, true);
          current = current.next;
        } while (current !== void 0);
      }
    };
  }
});

// node_modules/create-emotion/dist/create-emotion.browser.esm.js
function insertWithoutScoping(cache2, serialized) {
  if (cache2.inserted[serialized.name] === void 0) {
    return cache2.insert("", serialized, cache2.sheet, true);
  }
}
function merge(registered, css2, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);
  if (registeredStyles.length < 2) {
    return className;
  }
  return rawClassName + css2(registeredStyles);
}
var createEmotion, classnames, create_emotion_browser_esm_default;
var init_create_emotion_browser_esm = __esm({
  "node_modules/create-emotion/dist/create-emotion.browser.esm.js"() {
    init_cache_browser_esm();
    init_serialize_browser_esm();
    init_utils_browser_esm();
    createEmotion = function createEmotion2(options) {
      var cache2 = cache_browser_esm_default(options);
      cache2.sheet.speedy = function(value) {
        if (this.ctr !== 0) {
          throw new Error("speedy must be changed before any rules are inserted");
        }
        this.isSpeedy = value;
      };
      cache2.compat = true;
      var css2 = function css3() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var serialized = serializeStyles(args, cache2.registered, void 0);
        insertStyles(cache2, serialized, false);
        return cache2.key + "-" + serialized.name;
      };
      var keyframes2 = function keyframes3() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        var serialized = serializeStyles(args, cache2.registered);
        var animation = "animation-" + serialized.name;
        insertWithoutScoping(cache2, {
          name: serialized.name,
          styles: "@keyframes " + animation + "{" + serialized.styles + "}"
        });
        return animation;
      };
      var injectGlobal2 = function injectGlobal3() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        var serialized = serializeStyles(args, cache2.registered);
        insertWithoutScoping(cache2, serialized);
      };
      var cx2 = function cx3() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        return merge(cache2.registered, css2, classnames(args));
      };
      return {
        css: css2,
        cx: cx2,
        injectGlobal: injectGlobal2,
        keyframes: keyframes2,
        hydrate: function hydrate2(ids) {
          ids.forEach(function(key) {
            cache2.inserted[key] = true;
          });
        },
        flush: function flush2() {
          cache2.registered = {};
          cache2.inserted = {};
          cache2.sheet.flush();
        },
        // $FlowFixMe
        sheet: cache2.sheet,
        cache: cache2,
        getRegisteredStyles: getRegisteredStyles.bind(null, cache2.registered),
        merge: merge.bind(null, cache2.registered, css2)
      };
    };
    classnames = function classnames2(args) {
      var cls = "";
      for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        if (arg == null) continue;
        var toAdd = void 0;
        switch (typeof arg) {
          case "boolean":
            break;
          case "object": {
            if (Array.isArray(arg)) {
              toAdd = classnames2(arg);
            } else {
              toAdd = "";
              for (var k in arg) {
                if (arg[k] && k) {
                  toAdd && (toAdd += " ");
                  toAdd += k;
                }
              }
            }
            break;
          }
          default: {
            toAdd = arg;
          }
        }
        if (toAdd) {
          cls && (cls += " ");
          cls += toAdd;
        }
      }
      return cls;
    };
    create_emotion_browser_esm_default = createEmotion;
  }
});

// node_modules/emotion/dist/emotion.esm.js
var emotion_esm_exports = {};
__export(emotion_esm_exports, {
  cache: () => cache,
  css: () => css,
  cx: () => cx,
  flush: () => flush,
  getRegisteredStyles: () => getRegisteredStyles2,
  hydrate: () => hydrate,
  injectGlobal: () => injectGlobal,
  keyframes: () => keyframes,
  merge: () => merge2,
  sheet: () => sheet
});
var _createEmotion, flush, hydrate, cx, merge2, getRegisteredStyles2, injectGlobal, keyframes, css, sheet, cache;
var init_emotion_esm = __esm({
  "node_modules/emotion/dist/emotion.esm.js"() {
    init_create_emotion_browser_esm();
    _createEmotion = create_emotion_browser_esm_default();
    flush = _createEmotion.flush;
    hydrate = _createEmotion.hydrate;
    cx = _createEmotion.cx;
    merge2 = _createEmotion.merge;
    getRegisteredStyles2 = _createEmotion.getRegisteredStyles;
    injectGlobal = _createEmotion.injectGlobal;
    keyframes = _createEmotion.keyframes;
    css = _createEmotion.css;
    sheet = _createEmotion.sheet;
    cache = _createEmotion.cache;
  }
});

// node_modules/react-diff-viewer/lib/styles.js
var require_styles = __commonJS({
  "node_modules/react-diff-viewer/lib/styles.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __rest = exports && exports.__rest || function(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var emotion_1 = (init_emotion_esm(), __toCommonJS(emotion_esm_exports));
    exports.default = function(styleOverride, useDarkTheme) {
      var _a, _b, _c, _d, _e, _f, _g;
      if (useDarkTheme === void 0) {
        useDarkTheme = false;
      }
      var _h = styleOverride.variables, overrideVariables = _h === void 0 ? {} : _h, styles = __rest(styleOverride, ["variables"]);
      var themeVariables = {
        light: __assign({
          diffViewerBackground: "#fff",
          diffViewerColor: "212529",
          addedBackground: "#e6ffed",
          addedColor: "#24292e",
          removedBackground: "#ffeef0",
          removedColor: "#24292e",
          wordAddedBackground: "#acf2bd",
          wordRemovedBackground: "#fdb8c0",
          addedGutterBackground: "#cdffd8",
          removedGutterBackground: "#ffdce0",
          gutterBackground: "#f7f7f7",
          gutterBackgroundDark: "#f3f1f1",
          highlightBackground: "#fffbdd",
          highlightGutterBackground: "#fff5b1",
          codeFoldGutterBackground: "#dbedff",
          codeFoldBackground: "#f1f8ff",
          emptyLineBackground: "#fafbfc",
          gutterColor: "#212529",
          addedGutterColor: "#212529",
          removedGutterColor: "#212529",
          codeFoldContentColor: "#212529",
          diffViewerTitleBackground: "#fafbfc",
          diffViewerTitleColor: "#212529",
          diffViewerTitleBorderColor: "#eee"
        }, overrideVariables.light || {}),
        dark: __assign({
          diffViewerBackground: "#2e303c",
          diffViewerColor: "#FFF",
          addedBackground: "#044B53",
          addedColor: "white",
          removedBackground: "#632F34",
          removedColor: "white",
          wordAddedBackground: "#055d67",
          wordRemovedBackground: "#7d383f",
          addedGutterBackground: "#034148",
          removedGutterBackground: "#632b30",
          gutterBackground: "#2c2f3a",
          gutterBackgroundDark: "#262933",
          highlightBackground: "#2a3967",
          highlightGutterBackground: "#2d4077",
          codeFoldGutterBackground: "#21232b",
          codeFoldBackground: "#262831",
          emptyLineBackground: "#363946",
          gutterColor: "#464c67",
          addedGutterColor: "#8c8c8c",
          removedGutterColor: "#8c8c8c",
          codeFoldContentColor: "#555a7b",
          diffViewerTitleBackground: "#2f323e",
          diffViewerTitleColor: "#555a7b",
          diffViewerTitleBorderColor: "#353846"
        }, overrideVariables.dark || {})
      };
      var variables = useDarkTheme ? themeVariables.dark : themeVariables.light;
      var content = emotion_1.css({
        width: "100%",
        label: "content"
      });
      var splitView = emotion_1.css((_a = {}, _a["." + content] = {
        width: "50%"
      }, _a.label = "split-view", _a));
      var diffContainer = emotion_1.css({
        width: "100%",
        background: variables.diffViewerBackground,
        pre: {
          margin: 0,
          whiteSpace: "pre-wrap",
          lineHeight: "25px"
        },
        label: "diff-container",
        borderCollapse: "collapse"
      });
      var codeFoldContent = emotion_1.css({
        color: variables.codeFoldContentColor,
        label: "code-fold-content"
      });
      var contentText = emotion_1.css({
        color: variables.diffViewerColor,
        label: "content-text"
      });
      var titleBlock = emotion_1.css((_b = {
        background: variables.diffViewerTitleBackground,
        padding: 10,
        borderBottom: "1px solid " + variables.diffViewerTitleBorderColor,
        label: "title-block",
        ":last-child": {
          borderLeft: "1px solid " + variables.diffViewerTitleBorderColor
        }
      }, _b["." + contentText] = {
        color: variables.diffViewerTitleColor
      }, _b));
      var lineNumber = emotion_1.css({
        color: variables.gutterColor,
        label: "line-number"
      });
      var diffRemoved = emotion_1.css((_c = {
        background: variables.removedBackground,
        color: variables.removedColor,
        pre: {
          color: variables.removedColor
        }
      }, _c["." + lineNumber] = {
        color: variables.removedGutterColor
      }, _c.label = "diff-removed", _c));
      var diffAdded = emotion_1.css((_d = {
        background: variables.addedBackground,
        color: variables.addedColor,
        pre: {
          color: variables.addedColor
        }
      }, _d["." + lineNumber] = {
        color: variables.addedGutterColor
      }, _d.label = "diff-added", _d));
      var wordDiff = emotion_1.css({
        padding: 2,
        display: "inline-flex",
        borderRadius: 1,
        label: "word-diff"
      });
      var wordAdded = emotion_1.css({
        background: variables.wordAddedBackground,
        label: "word-added"
      });
      var wordRemoved = emotion_1.css({
        background: variables.wordRemovedBackground,
        label: "word-removed"
      });
      var codeFoldGutter = emotion_1.css({
        backgroundColor: variables.codeFoldGutterBackground,
        label: "code-fold-gutter"
      });
      var codeFold = emotion_1.css({
        backgroundColor: variables.codeFoldBackground,
        height: 40,
        fontSize: 14,
        fontWeight: 700,
        label: "code-fold",
        a: {
          textDecoration: "underline !important",
          cursor: "pointer",
          pre: {
            display: "inline"
          }
        }
      });
      var emptyLine = emotion_1.css({
        backgroundColor: variables.emptyLineBackground,
        label: "empty-line"
      });
      var marker = emotion_1.css((_e = {
        width: 25,
        paddingLeft: 10,
        paddingRight: 10,
        userSelect: "none",
        label: "marker"
      }, _e["&." + diffAdded] = {
        pre: {
          color: variables.addedColor
        }
      }, _e["&." + diffRemoved] = {
        pre: {
          color: variables.removedColor
        }
      }, _e));
      var highlightedLine = emotion_1.css((_f = {
        background: variables.highlightBackground,
        label: "highlighted-line"
      }, _f["." + wordAdded + ", ." + wordRemoved] = {
        backgroundColor: "initial"
      }, _f));
      var highlightedGutter = emotion_1.css({
        label: "highlighted-gutter"
      });
      var gutter = emotion_1.css((_g = {
        userSelect: "none",
        minWidth: 50,
        padding: "0 10px",
        label: "gutter",
        textAlign: "right",
        background: variables.gutterBackground,
        "&:hover": {
          cursor: "pointer",
          background: variables.gutterBackgroundDark,
          pre: {
            opacity: 1
          }
        },
        pre: {
          opacity: 0.5
        }
      }, _g["&." + diffAdded] = {
        background: variables.addedGutterBackground
      }, _g["&." + diffRemoved] = {
        background: variables.removedGutterBackground
      }, _g["&." + highlightedGutter] = {
        background: variables.highlightGutterBackground,
        "&:hover": {
          background: variables.highlightGutterBackground
        }
      }, _g));
      var emptyGutter = emotion_1.css({
        "&:hover": {
          background: variables.gutterBackground,
          cursor: "initial"
        },
        label: "empty-gutter"
      });
      var line = emotion_1.css({
        verticalAlign: "baseline",
        label: "line"
      });
      var defaultStyles = {
        diffContainer,
        diffRemoved,
        diffAdded,
        splitView,
        marker,
        highlightedGutter,
        highlightedLine,
        gutter,
        line,
        wordDiff,
        wordAdded,
        wordRemoved,
        codeFoldGutter,
        codeFold,
        emptyGutter,
        emptyLine,
        lineNumber,
        contentText,
        content,
        codeFoldContent,
        titleBlock
      };
      var computerOverrideStyles = Object.keys(styles).reduce(function(acc, key) {
        var _a2;
        return __assign({}, acc, (_a2 = {}, _a2[key] = emotion_1.css(styles[key]), _a2));
      }, {});
      return Object.keys(defaultStyles).reduce(function(acc, key) {
        var _a2;
        return __assign({}, acc, (_a2 = {}, _a2[key] = computerOverrideStyles[key] ? emotion_1.cx(defaultStyles[key], computerOverrideStyles[key]) : defaultStyles[key], _a2));
      }, {});
    };
  }
});

// node_modules/memoize-one/dist/memoize-one.esm.js
var memoize_one_esm_exports = {};
__export(memoize_one_esm_exports, {
  default: () => memoize_one_esm_default
});
function isEqual(first, second) {
  if (first === second) {
    return true;
  }
  if (safeIsNaN(first) && safeIsNaN(second)) {
    return true;
  }
  return false;
}
function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }
  for (var i = 0; i < newInputs.length; i++) {
    if (!isEqual(newInputs[i], lastInputs[i])) {
      return false;
    }
  }
  return true;
}
function memoizeOne(resultFn, isEqual2) {
  if (isEqual2 === void 0) {
    isEqual2 = areInputsEqual;
  }
  var lastThis;
  var lastArgs = [];
  var lastResult;
  var calledOnce = false;
  function memoized() {
    var newArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      newArgs[_i] = arguments[_i];
    }
    if (calledOnce && lastThis === this && isEqual2(newArgs, lastArgs)) {
      return lastResult;
    }
    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  }
  return memoized;
}
var safeIsNaN, memoize_one_esm_default;
var init_memoize_one_esm = __esm({
  "node_modules/memoize-one/dist/memoize-one.esm.js"() {
    safeIsNaN = Number.isNaN || function ponyfill(value) {
      return typeof value === "number" && value !== value;
    };
    memoize_one_esm_default = memoizeOne;
  }
});

// node_modules/react-diff-viewer/lib/index.js
var require_lib = __commonJS({
  "node_modules/react-diff-viewer/lib/index.js"(exports) {
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require_react();
    var PropTypes = require_prop_types();
    var classnames_1 = require_classnames();
    var compute_lines_1 = require_compute_lines();
    exports.DiffMethod = compute_lines_1.DiffMethod;
    var styles_1 = require_styles();
    var m = (init_memoize_one_esm(), __toCommonJS(memoize_one_esm_exports));
    var memoize2 = m.default || m;
    var LineNumberPrefix;
    (function(LineNumberPrefix2) {
      LineNumberPrefix2["LEFT"] = "L";
      LineNumberPrefix2["RIGHT"] = "R";
    })(LineNumberPrefix = exports.LineNumberPrefix || (exports.LineNumberPrefix = {}));
    var DiffViewer = (
      /** @class */
      function(_super) {
        __extends(DiffViewer2, _super);
        function DiffViewer2(props) {
          var _this = _super.call(this, props) || this;
          _this.resetCodeBlocks = function() {
            if (_this.state.expandedBlocks.length > 0) {
              _this.setState({
                expandedBlocks: []
              });
              return true;
            }
            return false;
          };
          _this.onBlockExpand = function(id) {
            var prevState = _this.state.expandedBlocks.slice();
            prevState.push(id);
            _this.setState({
              expandedBlocks: prevState
            });
          };
          _this.computeStyles = memoize2(styles_1.default);
          _this.onLineNumberClickProxy = function(id) {
            if (_this.props.onLineNumberClick) {
              return function(e) {
                return _this.props.onLineNumberClick(id, e);
              };
            }
            return function() {
            };
          };
          _this.renderWordDiff = function(diffArray, renderer) {
            return diffArray.map(function(wordDiff, i) {
              var _a;
              return React.createElement("span", { key: i, className: classnames_1.default(_this.styles.wordDiff, (_a = {}, _a[_this.styles.wordAdded] = wordDiff.type === compute_lines_1.DiffType.ADDED, _a[_this.styles.wordRemoved] = wordDiff.type === compute_lines_1.DiffType.REMOVED, _a)) }, renderer ? renderer(wordDiff.value) : wordDiff.value);
            });
          };
          _this.renderLine = function(lineNumber, type, prefix, value, additionalLineNumber, additionalPrefix) {
            var _a, _b, _c, _d;
            var lineNumberTemplate = prefix + "-" + lineNumber;
            var additionalLineNumberTemplate = additionalPrefix + "-" + additionalLineNumber;
            var highlightLine = _this.props.highlightLines.includes(lineNumberTemplate) || _this.props.highlightLines.includes(additionalLineNumberTemplate);
            var added = type === compute_lines_1.DiffType.ADDED;
            var removed = type === compute_lines_1.DiffType.REMOVED;
            var content;
            if (Array.isArray(value)) {
              content = _this.renderWordDiff(value, _this.props.renderContent);
            } else if (_this.props.renderContent) {
              content = _this.props.renderContent(value);
            } else {
              content = value;
            }
            return React.createElement(
              React.Fragment,
              null,
              !_this.props.hideLineNumbers && React.createElement(
                "td",
                { onClick: lineNumber && _this.onLineNumberClickProxy(lineNumberTemplate), className: classnames_1.default(_this.styles.gutter, (_a = {}, _a[_this.styles.emptyGutter] = !lineNumber, _a[_this.styles.diffAdded] = added, _a[_this.styles.diffRemoved] = removed, _a[_this.styles.highlightedGutter] = highlightLine, _a)) },
                React.createElement("pre", { className: _this.styles.lineNumber }, lineNumber)
              ),
              !_this.props.splitView && !_this.props.hideLineNumbers && React.createElement(
                "td",
                { onClick: additionalLineNumber && _this.onLineNumberClickProxy(additionalLineNumberTemplate), className: classnames_1.default(_this.styles.gutter, (_b = {}, _b[_this.styles.emptyGutter] = !additionalLineNumber, _b[_this.styles.diffAdded] = added, _b[_this.styles.diffRemoved] = removed, _b[_this.styles.highlightedGutter] = highlightLine, _b)) },
                React.createElement("pre", { className: _this.styles.lineNumber }, additionalLineNumber)
              ),
              React.createElement(
                "td",
                { className: classnames_1.default(_this.styles.marker, (_c = {}, _c[_this.styles.emptyLine] = !content, _c[_this.styles.diffAdded] = added, _c[_this.styles.diffRemoved] = removed, _c[_this.styles.highlightedLine] = highlightLine, _c)) },
                React.createElement(
                  "pre",
                  null,
                  added && "+",
                  removed && "-"
                )
              ),
              React.createElement(
                "td",
                { className: classnames_1.default(_this.styles.content, (_d = {}, _d[_this.styles.emptyLine] = !content, _d[_this.styles.diffAdded] = added, _d[_this.styles.diffRemoved] = removed, _d[_this.styles.highlightedLine] = highlightLine, _d)) },
                React.createElement("pre", { className: _this.styles.contentText }, content)
              )
            );
          };
          _this.renderSplitView = function(_a, index) {
            var left = _a.left, right = _a.right;
            return React.createElement(
              "tr",
              { key: index, className: _this.styles.line },
              _this.renderLine(left.lineNumber, left.type, LineNumberPrefix.LEFT, left.value),
              _this.renderLine(right.lineNumber, right.type, LineNumberPrefix.RIGHT, right.value)
            );
          };
          _this.renderInlineView = function(_a, index) {
            var left = _a.left, right = _a.right;
            var content;
            if (left.type === compute_lines_1.DiffType.REMOVED && right.type === compute_lines_1.DiffType.ADDED) {
              return React.createElement(
                React.Fragment,
                { key: index },
                React.createElement("tr", { className: _this.styles.line }, _this.renderLine(left.lineNumber, left.type, LineNumberPrefix.LEFT, left.value, null)),
                React.createElement("tr", { className: _this.styles.line }, _this.renderLine(null, right.type, LineNumberPrefix.RIGHT, right.value, right.lineNumber))
              );
            }
            if (left.type === compute_lines_1.DiffType.REMOVED) {
              content = _this.renderLine(left.lineNumber, left.type, LineNumberPrefix.LEFT, left.value, null);
            }
            if (left.type === compute_lines_1.DiffType.DEFAULT) {
              content = _this.renderLine(left.lineNumber, left.type, LineNumberPrefix.LEFT, left.value, right.lineNumber, LineNumberPrefix.RIGHT);
            }
            if (right.type === compute_lines_1.DiffType.ADDED) {
              content = _this.renderLine(null, right.type, LineNumberPrefix.RIGHT, right.value, right.lineNumber);
            }
            return React.createElement("tr", { key: index, className: _this.styles.line }, content);
          };
          _this.onBlockClickProxy = function(id) {
            return function() {
              return _this.onBlockExpand(id);
            };
          };
          _this.renderSkippedLineIndicator = function(num, blockNumber, leftBlockLineNumber, rightBlockLineNumber) {
            var _a;
            var _b = _this.props, hideLineNumbers = _b.hideLineNumbers, splitView = _b.splitView;
            var message = _this.props.codeFoldMessageRenderer ? _this.props.codeFoldMessageRenderer(num, leftBlockLineNumber, rightBlockLineNumber) : React.createElement(
              "pre",
              { className: _this.styles.codeFoldContent },
              "Expand ",
              num,
              " lines ..."
            );
            var content = React.createElement(
              "td",
              null,
              React.createElement("a", { onClick: _this.onBlockClickProxy(blockNumber), tabIndex: 0 }, message)
            );
            var isUnifiedViewWithoutLineNumbers = !splitView && !hideLineNumbers;
            return React.createElement(
              "tr",
              { key: leftBlockLineNumber + "-" + rightBlockLineNumber, className: _this.styles.codeFold },
              !hideLineNumbers && React.createElement("td", { className: _this.styles.codeFoldGutter }),
              React.createElement("td", { className: classnames_1.default((_a = {}, _a[_this.styles.codeFoldGutter] = isUnifiedViewWithoutLineNumbers, _a)) }),
              isUnifiedViewWithoutLineNumbers ? React.createElement(
                React.Fragment,
                null,
                React.createElement("td", null),
                content
              ) : React.createElement(
                React.Fragment,
                null,
                content,
                React.createElement("td", null)
              ),
              React.createElement("td", null),
              React.createElement("td", null)
            );
          };
          _this.renderDiff = function() {
            var _a = _this.props, oldValue = _a.oldValue, newValue = _a.newValue, splitView = _a.splitView, disableWordDiff = _a.disableWordDiff, compareMethod = _a.compareMethod, linesOffset = _a.linesOffset;
            var _b = compute_lines_1.computeLineInformation(oldValue, newValue, disableWordDiff, compareMethod, linesOffset), lineInformation = _b.lineInformation, diffLines = _b.diffLines;
            var extraLines = _this.props.extraLinesSurroundingDiff < 0 ? 0 : _this.props.extraLinesSurroundingDiff;
            var skippedLines = [];
            return lineInformation.map(function(line, i) {
              var diffBlockStart = diffLines[0];
              var currentPosition = diffBlockStart - i;
              if (_this.props.showDiffOnly) {
                if (currentPosition === -extraLines) {
                  skippedLines = [];
                  diffLines.shift();
                }
                if (line.left.type === compute_lines_1.DiffType.DEFAULT && (currentPosition > extraLines || typeof diffBlockStart === "undefined") && !_this.state.expandedBlocks.includes(diffBlockStart)) {
                  skippedLines.push(i + 1);
                  if (i === lineInformation.length - 1 && skippedLines.length > 1) {
                    return _this.renderSkippedLineIndicator(skippedLines.length, diffBlockStart, line.left.lineNumber, line.right.lineNumber);
                  }
                  return null;
                }
              }
              var diffNodes = splitView ? _this.renderSplitView(line, i) : _this.renderInlineView(line, i);
              if (currentPosition === extraLines && skippedLines.length > 0) {
                var length_1 = skippedLines.length;
                skippedLines = [];
                return React.createElement(
                  React.Fragment,
                  { key: i },
                  _this.renderSkippedLineIndicator(length_1, diffBlockStart, line.left.lineNumber, line.right.lineNumber),
                  diffNodes
                );
              }
              return diffNodes;
            });
          };
          _this.render = function() {
            var _a;
            var _b = _this.props, oldValue = _b.oldValue, newValue = _b.newValue, useDarkTheme = _b.useDarkTheme, leftTitle = _b.leftTitle, rightTitle = _b.rightTitle, splitView = _b.splitView, hideLineNumbers = _b.hideLineNumbers;
            if (typeof oldValue !== "string" || typeof newValue !== "string") {
              throw Error('"oldValue" and "newValue" should be strings');
            }
            _this.styles = _this.computeStyles(_this.props.styles, useDarkTheme);
            var nodes = _this.renderDiff();
            var colSpanOnSplitView = hideLineNumbers ? 2 : 3;
            var colSpanOnInlineView = hideLineNumbers ? 2 : 4;
            var title = (leftTitle || rightTitle) && React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                { colSpan: splitView ? colSpanOnSplitView : colSpanOnInlineView, className: _this.styles.titleBlock },
                React.createElement("pre", { className: _this.styles.contentText }, leftTitle)
              ),
              splitView && React.createElement(
                "td",
                { colSpan: colSpanOnSplitView, className: _this.styles.titleBlock },
                React.createElement("pre", { className: _this.styles.contentText }, rightTitle)
              )
            );
            return React.createElement(
              "table",
              { className: classnames_1.default(_this.styles.diffContainer, (_a = {}, _a[_this.styles.splitView] = splitView, _a)) },
              React.createElement(
                "tbody",
                null,
                title,
                nodes
              )
            );
          };
          _this.state = {
            expandedBlocks: []
          };
          return _this;
        }
        DiffViewer2.defaultProps = {
          oldValue: "",
          newValue: "",
          splitView: true,
          highlightLines: [],
          disableWordDiff: false,
          compareMethod: compute_lines_1.DiffMethod.CHARS,
          styles: {},
          hideLineNumbers: false,
          extraLinesSurroundingDiff: 3,
          showDiffOnly: true,
          useDarkTheme: false,
          linesOffset: 0
        };
        DiffViewer2.propTypes = {
          oldValue: PropTypes.string.isRequired,
          newValue: PropTypes.string.isRequired,
          splitView: PropTypes.bool,
          disableWordDiff: PropTypes.bool,
          compareMethod: PropTypes.oneOf(Object.values(compute_lines_1.DiffMethod)),
          renderContent: PropTypes.func,
          onLineNumberClick: PropTypes.func,
          extraLinesSurroundingDiff: PropTypes.number,
          styles: PropTypes.object,
          hideLineNumbers: PropTypes.bool,
          showDiffOnly: PropTypes.bool,
          highlightLines: PropTypes.arrayOf(PropTypes.string),
          leftTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
          rightTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
          linesOffset: PropTypes.number
        };
        return DiffViewer2;
      }(React.Component)
    );
    exports.default = DiffViewer;
  }
});
export default require_lib();
/*! Bundled license information:

react-is/cjs/react-is.development.js:
  (** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)

diff/dist/diff.js:
  (*!
  
   diff v4.0.1
  
  Software License Agreement (BSD License)
  
  Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
  
  All rights reserved.
  
  Redistribution and use of this software in source and binary forms, with or without modification,
  are permitted provided that the following conditions are met:
  
  * Redistributions of source code must retain the above
    copyright notice, this list of conditions and the
    following disclaimer.
  
  * Redistributions in binary form must reproduce the above
    copyright notice, this list of conditions and the
    following disclaimer in the documentation and/or other
    materials provided with the distribution.
  
  * Neither the name of Kevin Decker nor the names of its
    contributors may be used to endorse or promote products
    derived from this software without specific prior
    written permission.
  
  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
  IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
  FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
  DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
  IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
  OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  @license
  *)
*/
//# sourceMappingURL=react-diff-viewer.js.map
