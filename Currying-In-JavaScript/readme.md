# Currying

transforms a function with multiple arguments into a nested series of functions, each taking a single argument.

Currying in JavaScript can be for the following reasons:

- Currying is helpful in Event handling.
- By using the currying function, we can avoid passing the same variable many times.
- Currying in JavaScript can be used to make a higher-order function.

Benefits of Currying in JavaScript Code:

- Code re-usability
- Improved code readability
- Flexibility
- Eliminates redundant code
- Promotes functional programming

Techniques to Achieve Currying in JavaScript

- Using Closure
- Using Bind
- Using Lodash (3rd party library)

```js
const sum = (a, b) => {
  return a + b;
};
console.log(sum(2, 3));
```

```js
const sum = (a) => {
  return (b) => {
    return a + b;
  };
};
console.log(sum(2)(3));
```

```js
const sum = (...args) => {
  const storage = [...args];
  if (storage.length === 4) {
    return storage.reduce((a, c) => a + c);
  } else {
    const tempFun = (...args2) => {
      storage.push(...args2);
      if (storage.length === 4) {
        return storage.reduce((a, c) => a + c);
      } else {
        return tempFun;
      }
    };
    return tempFun;
  }
};
console.log(sum(1, 2, 3, 4));
console.log(sum(1)(2)(3)(4));
console.log(sum(1, 2)(3, 4));
console.log(sum(1, 2, 3)(4));
console.log(sum(1)(2, 3, 4));
```

```js
const sum = (...args) => {
  const storage = [...args];
  if (storage.length === 0) {
    return 0;
  } else {
    const tempFun = (...args2) => {
      storage.push(...args2);
      if (args2.length === 0) {
        return storage.reduce((a, c) => a + c, 0);
      } else {
        return tempFun;
      }
    };
    return tempFun;
  }
};
console.log(sum(1, 2, 3, 4)());
console.log(sum(1)(2)(3)(4)());
console.log(sum(1, 2)(3, 4)());
console.log(sum(1, 2, 3)(4)());
console.log(sum(1)(2, 3, 4)());
console.log(sum());
```

```js
const advCurry = (fn) => {
  return (curried = (...args) => {
    if (fn.length !== args.length) {
      return curried.bind(null, ...args);
    }
    return fn(...args);
  });
};
const totalNum = (a, b, c) => {
  return a + b + c;
};
const curriedTotal = advCurry(totalNum);
console.log(curriedTotal(5)(15)(20));
console.log(curriedTotal(5, 15, 20));
console.log(curriedTotal(5, 15)(20));
console.log(curriedTotal(5)(15, 20));
```
