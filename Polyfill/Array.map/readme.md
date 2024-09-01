# Syntax

```js
map(callbackFn(element, index, arr), thisArg)
- thisArg : optional
```

```js
Array.prototype.mapPoly = function (cb) {
  const arr = this;
  if (!arr.length) return [];
  let result = [];
  let index = 0;
  while (index < arr.length) {
    result.push(cb(arr[index], index, arr));
    index++;
  }
  return result;
};
console.log(
  [1, 2, 3, 4].mapPoly(function (num) {
    return num * 2;
  })
);
```
