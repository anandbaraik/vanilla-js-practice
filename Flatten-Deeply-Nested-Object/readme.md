```js
const flattenObj = (obj, separator = ".", parent = "") => {
  let result = {};
  function generateFlattenObj(obj, parent) {
    for (let key in obj) {
      let propName = parent ? parent + separator + key : key;
      if (typeof obj[key] === "object") {
        generateFlattenObj(obj[key], propName);
      } else {
        result[propName] = obj[key];
      }
    }
  }
  generateFlattenObj(obj, parent);
  return result;
};

const obj1 = {
  a: 12,
  b: 24,
  c: {
    d: 23,
    e: { f: 56 },
    g: [1, 2],
  },
};

const obj2 = { a: { b: { c: 3 } } };

console.log(flattenObj(obj1, "_"));
console.log(flattenObj(obj2));
```
