```js
function memoize(fn) {
  let cache = {};
  return function (...args) {
    let key = JSON.stringify(args);
    if (key in cache) {
      console.log(`fetching value from cache for ${key}`);
      return cache[key];
    }
    {
      console.log(`computing value for ${key}`);
      let result = fn.apply(this, args);
      cache[key] = result;
      return result;
    }
  };
}

let factorial = memoize(function (n) {
  if (n == 0) return 1;
  else return n * factorial(n - 1);
});

console.log(factorial(5));
console.log(factorial(6));
```

# Learning -

# call() apply() & bind()

`call`, `bind`, and `apply` methods set the `this` argument to the function.

- The `call` and `apply` methods set `this` to a function and call the function.
  - Call is a function that helps you change the context of the invoking function. In layperson's terms, it helps you replace the value of this inside a function with whatever value you want.
  - Apply is very similar to the call function. The only difference is that in apply you can pass an array as an argument list.
- The `bind` method will only set `this` to a function. We will need to separately invoke the function.
  - Bind is a function that helps you create another function that you can execute later with the new context of this that is provided.

## call()

```js
// syntax - call()
func.call(thisObj, args1, args2, ...)
- func is a function that needs to be invoked with a different this object
- thisObj is an object or a value that needs to be replaced with the `this` keyword present inside the function func
- args1, args2 are arguments that are passed to the invoking function with the changed this object.
```

```js
// Example
function Car(type, fuelType) {
  this.type = type;
  this.fuelType = fuelType;
}

function setBrand(brand) {
  Car.call(this, "convertible", "petrol");
  this.brand = brand;
  console.log(`Car details = `, this);
}

function definePrice(price) {
  Car.call(this, "convertible", "diesel");
  this.price = price;
  console.log(`Car details = `, this);
}

const newBrand = new setBrand("Brand1"); //setBrand { type: 'convertible', fuelType: 'petrol', brand: 'Brand1' }
const newCarPrice = new definePrice(100000); //definePrice { type: 'convertible', fuelType: 'diesel', price: 100000 }
```

```js
const newEntity = (obj) => console.log(obj);

function mountEntity() {
  this.entity = newEntity;
  console.log(`Entity ${this.entity} is mounted on ${this}`);
}

mountEntity.call();
```

- **we invoked the function mountEntity with no thisObj argument. In such cases, JavaScript refers to the global object.**

## apply()

```js
// syntax apply()
func.apply(thisObj, argumentsArray);
or
func.apply(thisObj, [args1, args2, ...]);
or
func.apply(thisObj, new Array(args1, args2));
or
func.apply(thisObj, arguments);

- func is a function that needs to be invoked with a different this object
- thisObj is an object or a value that needs to be replaced with the this keyword present inside the function func
- argumentsArray can be an array of arguments, array object, or the arguments keyword itself.
```

`arguments` is a special object available inside a function. It contains values of the arguments that are passed to a function. You can use this keyword with the `apply` function to take any number of arbitrary arguments.

The best part about `apply` is we don’t need to take care of the number of arguments that are passed to the invoking function. Because of its dynamic and versatile nature, you can use it in complicated situations.

```js
function Car(type, fuelType) {
  this.type = type;
  this.fuelType = fuelType;
}

function setBrand(brand) {
  Car.apply(this, ["convertible", "petrol"]); //Syntax with array literal
  this.brand = brand;
  console.log(`Car details = `, this);
}

function definePrice(price) {
  Car.apply(this, new Array("convertible", "diesel")); //Syntax with array object construction
  this.price = price;
  console.log(`Car details = `, this);
}

const newBrand = new setBrand("Brand1");
const newCarPrice = new definePrice(100000);
```

uses with the `arguments` keyword:

```js
function addUp() {
  //Using arguments to capture the arbitrary number of inputs
  const args = Array.from(arguments);
  this.x = args.reduce((prev, curr) => prev + curr, 0);
  console.log("this.x = ", this.x);
}

function driverFunc() {
  const obj = {
    inps: [1, 2, 3, 4, 5, 6],
  };
  addUp.apply(obj, obj.inps);
}

driverFunc();
```

## bind()

```js
// syntax
func.bind(thisObj, arg1, arg2, ..., argN);
- func is a function that needs to be invoked with a different this object
- thisObj is an object or a value that needs to be replaced with the this keyword present inside the function func
- arg1, arg2…argN – you can pass 1 argument to the calling function or more than that, similar to the call function.
```

The `bind` function then returns a new function that consists of a new context to the `this` variable present inside the calling function:

```js
func(arg1, arg2);
```

### Summary

- `call`: binds the `this` value, invokes the function, and allows you to **pass a list of arguments.**

- `apply`: binds the `this` value, invokes the function, and allows you to **pass arguments as an array.**

- `bind`: binds the `this` value, returns a new function, and allows you to **pass in a list of arguments.**
