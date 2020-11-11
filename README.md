# [proposal-array-find-right](https://kingwl.github.io/proposal-array-find-right/index.html)

Proposal for `.findRight()` and `.findIndexRight` methods on array.

## Motivation

Find something from array is a very common pattern in development. 

Now we have `Array.prototype.indexOf`, `Array.prototype.lastIndexOf` to find index of some `value` in the array.

And we also has `Array.prototype.find`, `Array.prototype.findIndex` to find some element or index who in the array in out customized way. 

But There’s not a way to allow us find something `from the end to the start ` of array in customized way. 

`[].reverse().find()` is work. But there’s two issues:

1. **unnecessary reverse.**
2. **`Array.prototype.reverse` is not immutable.**

You have to write `[...[]].reverse().find()`. 

As the result, the third issue:

3. **unnecessary spread**

For `.findIndex()`,  you must have much additional operations (re-calculate index and handle the `-1` ) for the result of `[...arr].reverse().findIndex()`.

As the result, the fourth issue:

4. **complex index calculate**

So, perhaps we need `Array.prototype.findRight` and `Array.prototype.findIndexRight`.

## Core features

Add `Array.prototype.findRight` and `Array.prototype.findIndexRight`. 

And we could use that like the [Array.prototype.find](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-array.prototype.find) and [Array.prototype.findIndex](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-array.prototype.findindex) but from the end to be start.

eg:

```javascript
const array = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];

array.find(n => n.value % 2 === 1); // { value: 1 }
array.findIndex(n => n.value % 2 === 1); // 0

// ======== Before the proposal =========== 

// find
[...array].reverse().find(n => n.value % 2 === 1); // { value: 3 }

// findIndex
array.length - 1 - [...array].reverse().findIndex(n => n.value % 2 === 1); // 2
array.length - 1 - [...array].reverse().findIndex(n => n.value === 42); // should be -1, but 4

// ======== In the proposal =========== 
// find
array.findRight(n => n.value % 2 === 1); // { value: 3 }

// findIndex
array.findIndexRight(n => n.value % 2 === 1); // 2
array.findIndexRight(n => n.value === 42); // -1

```

You can see the [polyfill](index.js)

## Related

- [Array.prototype.reduceRight](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-array.prototype.reduceright)
- [lodash.findLast](https://lodash.com/docs/4.17.15#findLast)
- [lodash.findLastIndex](https://lodash.com/docs/4.17.15#findLastIndex)
- [ramda.findLast](https://ramdajs.com/docs/#findLast)
- [ramda.findLastIndex](https://ramdajs.com/docs/#findLastIndex)
- [@extra-array/find-right](https://www.npmjs.com/package/@extra-array/find-right)
