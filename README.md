# Proposal [(link)](https://kingwl.github.io/proposal-array-find-right/index.html)

Proposal for a `.findRight()` method on array.

## Motivation

Find something from array is a very common pattern in development. 

Now we have `Array.prototype.indexOf`, `Array.prototype.lastIndexOf` to find index of some `value` in the array.

And we also has `Array.prototype.find` to find some element who in the array in out customized way. 

But There’s not a way to allow us find something `from the end to the start ` of array in customized way. 

`[].reverse().find()` is work. But there’s two issues:

1. unnecessary reverse (allocated here).
2. `Array.prototype.reverse` is not immutable.

You have to write the `findRight` in your code or `[...[]].reverse().find（）`. 

As the result the third issue:

3. unnecessary spread

So, perhaps we need `Array.prototype.findRight`.

## Core features

Add `Array.prototype.findRight`. 

And we could use that like the [(Array.prototype.find)](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-array.prototype.find) but from the end to be start.

eg:

```javascript
const array = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];

array.find(n => n.value % 2 === 1); // { value: 1 }

// Before the proposal
[...array].reverse().find(n => n.value % 2 === 1); // { value: 3 }

// In the proposal
array.findRight(n => n.value % 2 === 1); // { value: 3 }


```

## Related

- [Array.prototype.reduceRight](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-array.prototype.reduceright)
- [lodash.findLast](https://lodash.com/docs/4.17.15#findLast)
- [ramda.findLast](https://ramdajs.com/docs/#findLast)

- [@extra-array/find-right](https://www.npmjs.com/package/@extra-array/find-right)

