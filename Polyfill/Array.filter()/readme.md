# Syntax

```js
filter(callbackFn(element, index, array), thisArg);
- thisArg : optional
```

```js
Array.prototype.filterPoly = function (cb) {
  const arr = this;
  if (!arr.length) return [];
  let result = [];
  let index = 0;
  while (index < arr.length) {
    if (cb(arr[index], index, arr)) {
      result.push(arr[index]);
    }
    index++;
  }
  return result;
};
console.log(
  [1, 2, 3, 4].filterPoly(function (num) {
    return num % 2 != 0;
  })
);
```
