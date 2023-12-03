# Syntax

```js
flat(depth)
- depth : optional, default to 1
```

# Array.flat() Js implementation without depth

```js
const output = [];
function flattenArray(arr) {
  for (let value of arr) {
    //ask if in-built method is allowed else check object (typeof i === 'object')
    if (Array.isArray(value)) {
      flattenArray(value);
    } else {
      output.push(value);
    }
  }
  return output;
}
const inputArr = [0, 1, 2, [3, 4, [5, 6]], 7];
console.log(flattenArray(inputArr));
```

# Array.flat() Js implementation with depth

```js
const output = [];
function flattenArray(arr, depth) {
  for (let value of arr) {
    //ask if in-built method is allowed else check object (typeof i === 'object')
    if (Array.isArray(value) && depth > 0) {
      flattenArray(value, depth - 1);
    } else {
      output.push(value);
    }
  }
  return output;
}
const inputArr = [
  [1, 2, 3],
  [1, [2, [4, [5]]]],
];
console.log(flattenArray(inputArr, 1));
```

# Polyfill for Array.flat() without depth

```js
Array.prototype.flatPoly = function () {
  const output = [];
  function flattenArray(arr) {
    for (let value of arr) {
      //ask if in-built method is allowed else check object
      if (Array.isArray(value)) {
        flattenArray(value);
      } else {
        output.push(value);
      }
    }
    return output;
  }
  return flattenArray(this);
};
const inputArr = [0, 1, 2, [3, 4, [5, 6]], 7];
console.log(inputArr.flatPoly());
```

# Polyfill for Array.flat() with depth

```js
Array.prototype.flatPoly = function (depth = Infinity) {
  const output = [];
  function flattenArray(arr, depth) {
    for (let value of arr) {
      //ask if in-built method is allowed else check object (typeof i === 'object')
      if (Array.isArray(value) && depth > 0) {
        flattenArray(value, depth - 1);
      } else {
        output.push(value);
      }
    }
    return output;
  }
  return flattenArray(this, depth);
};
const inputArr = [
  [1, 2, 3],
  [1, [2, [4, [5]]]],
];
console.log(inputArr.flatPoly(2));
```
