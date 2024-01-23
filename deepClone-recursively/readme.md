```js
function deepClone(obj) {
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Function) {
    return new Function("return " + obj.toString())();
  }

  if (obj === null || typeof obj != "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

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
    namedFunction: function namedFunction() {
      console.log("Named Function");
    },
    anonymousFunction: function () {
      console.log("Anonymous Function");
    },
    arrowFunction: () => {
      console.log("Arrow Function");
    },
    dateObject: new Date(),
  },
};

const copiedObject = deepClone(originalObject);

/*Modify copied obj to test*/
copiedObject.b.namedFunction = function () {
  console.log("Modified Named Function");
};
copiedObject.b.anonymousFunction = function () {
  console.log("Modified Anonymous Function");
};
copiedObject.b.dateObject.setFullYear(2025);

console.log(originalObject);
console.log(copiedObject);
```
