# Simple Js function

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

# Polyfill for Array.flat()

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
