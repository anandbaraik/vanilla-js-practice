# Syntax

```js
reduce(callbackFn(accumulator, currentValue, currentIndex, array), initialValue)
- initialValue : optional, default to array[0]
```

```js
Array.prototype.reducePoly = function (cb, initialValue) {
  let arr = this;
  if (!arr.length) {
    if (initialValue) {
      return initialValue;
    } else {
      throw new Error("Provide initial value if array is empty");
    }
  }
  let accumulator = initialValue || arr[0];
  let index = initialValue ? 0 : 1;
  while (index < arr.length) {
    accumulator = cb(accumulator, arr[index], index, arr);
    index++;
  }
  return accumulator;
};

console.log(
  [1, 2, 3, 4].reducePoly(function (a, b) {
    return a + b;
  })
);
```
