if (!Array.prototype.findRight) {
  Object.defineProperty(Array.prototype, 'findRight', {
    value: function (predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let idx be ? LengthOfArrayLike(O).
      var idx = (o.length >>> 0) - 1;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw TypeError('predicate must be a function');
      }

      // 4. Repeat, while idx >= 0
      while (idx >= 0) {
        // a. Let Pi be ! ToString(idx).
        // b. Let iValue be ? Get(O, Pi).
        // c. Let testResult be ! ToBoolean(? Call(predicate, thisArg, « iValue, idx, O »)).
        // d. If testResult is true, return iValue.
        var iValue = o[idx];
        if (predicate.call(arguments[1], iValue, idx, o)) {
          return iValue;
        }
        // e. Set idx to idx - 1
        idx--;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true
  });
}

if (!Array.prototype.findIndexRight) {
  Object.defineProperty(Array.prototype, 'findIndexRight', {
    value: function (predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let idx be ? LengthOfArrayLike(O).
      var idx = (o.length >>> 0) - 1;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw TypeError('predicate must be a function');
      }

      // 4. Repeat, while idx >= 0
      while (idx >= 0) {
        // a. Let Pi be ! ToString(idx).
        // b. Let iValue be ? Get(O, Pi).
        // c. Let testResult be ! ToBoolean(? Call(predicate, thisArg, « iValue, idx, O »)).
        // d. If testResult is true, return idx.
        if (predicate.call(arguments[1], o[idx], idx, o)) {
          return idx;
        }
        // e. Set idx to idx - 1
        idx--;
      }

      // 7. Return -1.
      return -1;
    },
    configurable: true,
    writable: true
  });
}
