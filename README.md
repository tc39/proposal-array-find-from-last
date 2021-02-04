# [proposal-array-find-from-last](https://tc39.es/proposal-array-find-from-last/index.html)

Proposal for `.findLast()` and `.findLastIndex()` methods on array.

## Status
This proposal is a [stage 1 proposal](https://github.com/tc39/proposals/blob/master/stage-1-proposals.md) and waiting for feedback.

## Motivation

Finding an element in an array is a very common programming pattern. 

ECMAScript currently supports `Array.prototype.indexOf` and `Array.prototype.lastIndexOf` to find an index of some `value` in the array.

There is also `Array.prototype.find` and `Array.prototype.findIndex` to find the an element or its index in the array that satisfies a provided condition. 

However, the language does not provide a method to find an element from the **end to the start** of an array with a condition function.

`[].reverse().find()` is a workaround but there are two issues:

1. **unnecessary reverse.**
2. **`Array.prototype.reverse` is not immutable.**

You have to write `[...[]].reverse().find()`. 

As a result, there is a third issue:

3. **unnecessary spread**

For `.findIndex()`, you are required to perform additional steps after calling the method (re-calculate the index and handle the `-1`) to calculate the result of `[...arr].reverse().findIndex()`.

Therefore there is a fourth issue:

4. **complex index calculation**

So, perhaps we need `Array.prototype.findLast` and `Array.prototype.findLastIndex`.

## Core features

Add `Array.prototype.findLast` and `Array.prototype.findLastIndex`. 

This would behave the same as [Array.prototype.find](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-array.prototype.find) and [Array.prototype.findIndex](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-array.prototype.findindex) but would iterate from the end to start.

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
array.findLast(n => n.value % 2 === 1); // { value: 3 }

// findIndex
array.findLastIndex(n => n.value % 2 === 1); // 2
array.findLastIndex(n => n.value === 42); // -1

```

## Related

- [lodash.findLast](https://lodash.com/docs/4.17.15#findLast)
- [lodash.findLastIndex](https://lodash.com/docs/4.17.15#findLastIndex)
- [ramda.findLast](https://ramdajs.com/docs/#findLast)
- [ramda.findLastIndex](https://ramdajs.com/docs/#findLastIndex)
- [TypeScript internal findLast](https://github.com/microsoft/TypeScript/blob/master/src/compiler/core.ts#L226)
- [TypeScript internal findLastIndex](https://github.com/microsoft/TypeScript/blob/master/src/compiler/core.ts#L248)
- [@extra-array/find-right](https://www.npmjs.com/package/@extra-array/find-right)

## Proposer

Champion: @kingwl (Wenlu Wang, KWL)
