```js
function deepClone(obj) {
  if (obj === null || typeof obj != "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  /*
   * Todo: add logic to copy class & functions as well
   */

  let newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key]);
    }
  });
  return newObj;
}

const originalObject = {
  a: 1,
  b: {
    c: 2,
    d: [3, 4],
    e: { f: 5 },
  },
};

const copiedObject = deepClone(originalObject);
console.log(copiedObject);
console.log(originalObject);
```
