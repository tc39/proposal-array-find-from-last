# [proposal-array-find-from-last](https://tc39.es/proposal-array-find-from-last/index.html)

Proposal for `.findLast()` and `.findLastIndex()` methods on array and typed array.

## Status

This is a [stage 4 proposal](https://github.com/tc39/proposals#stage-4).

## Motivation

Finding an element in an array is a very common programming pattern. 

The proposal has a major concerns: **Semantical**. Which means `clearly representing the operation i want`.

And with the changes. There's a sugar here: Performance. Avoid obvious overhead. And may improve the constant factors in the time complexity.
Even there's not an order of magnitude change. But it's may useful in some performance-sensitive scenarios. eg: React render function.

---

ECMAScript currently supports `{Array, %TypedArray%}.prototype.indexOf` and `{Array, %TypedArray%}.prototype.lastIndexOf` to find an index of some `value` in the array.

There is also `{Array, %TypedArray%}.prototype.find` and `{Array, %TypedArray%}.prototype.findIndex` to find an element or its index in the array that satisfies a provided condition. 

However, the language does not provide a method to find an element **from the last to the first** of an array with a condition function.

`[...[]].reverse().find()` is a workaround but there are two issues:

1. **unnecessary mutation (by reverse).**
2. **unnecessary copy (to avoid mutation)**

For `.findIndex()`, you are required to perform additional steps after calling the method (re-calculate the index and handle the `-1`) to calculate the result of `[...arr].reverse().findIndex()`.

Therefore there is a third issue:

3. **complex index calculation**

So, perhaps we need something directly and effectively. In this proposal, they are `{Array, %TypedArray%}.prototype.findLast` and `{Array, %TypedArray%}.prototype.findLastIndex`.

## Scenarios
- You know find from last may have better performance (The target element on the tail of the array, could append with `push` or `concat` in a queue or stack, eg: recently matched time point in a timeline).
- You care about the order of the elements (May have duplicate item in the array, eg: last odd in the list of numbers).
- Etc.

## Core features

Add `{Array, %TypedArray%}.prototype.findLast` and `{Array, %TypedArray%}.prototype.findLastIndex`. 

This would behave the same as [Array.prototype.find](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-array.prototype.find) and [Array.prototype.findIndex](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-array.prototype.findindex) but would iterate from the last to the first.

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

## Slides
 - For stage 1: https://drive.google.com/file/d/1nzO9cjy4YlRa8h6ntTJ4Is8mx--sTuL_/view
 - For stage 2: https://drive.google.com/file/d/1rhER8TZ5GsHDzl8nLvo8qSIQCUXPw3AQ/view
 - For stage 3: https://kingwl.github.io/proposal-array-find-from-last-looking-for-stage-3-sides
 - For stage 4: https://github.com/DanielRosenwasser/findLast-and-findLastIndex-for-Stage-4/blob/10cfbc10e155641e3260c68c4d5902ee28de116a/findLast%20%26%20findLastIndex%20for%20Stage%204%20(TC39%20June%202022).pdf

## Polyfill

 - [core-js](https://github.com/zloirock/core-js): you can find it in the [ECMAScript proposals section](https://github.com/zloirock/core-js#array-find-from-last)
 - es-shims: [array.prototype.findlast](https://www.npmjs.com/package/array.prototype.findlast) / [array.prototype.findlastindex](https://www.npmjs.com/package/array.prototype.findlastindex)

## Related

- [lodash.findLast](https://lodash.com/docs/4.17.15#findLast)
- [lodash.findLastIndex](https://lodash.com/docs/4.17.15#findLastIndex)
- [ramda.findLast](https://ramdajs.com/docs/#findLast)
- [ramda.findLastIndex](https://ramdajs.com/docs/#findLastIndex)
- [TypeScript internal findLast](https://github.com/microsoft/TypeScript/blob/master/src/compiler/core.ts#L226)
- [TypeScript internal findLastIndex](https://github.com/microsoft/TypeScript/blob/master/src/compiler/core.ts#L248)
- [@extra-array/find-right](https://www.npmjs.com/package/@extra-array/find-right)

## Proposer

Champions:
 - @Kingwl (Wenlu Wang, KWL)
 - @DanielRosenwasser (Daniel Rosenwasser, DRR)
