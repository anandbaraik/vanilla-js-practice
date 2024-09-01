```js
const throttle = (fn, delay=2000) => {
        let lastCallTime = 0;
        return function(...args) {
            const now = Date.now();
            if(now-lastCallTime >= delay) {
                fn.apply(this, args);
                lastCallTime = now;
            }
        }
    }

    //Example usage:
    const throttledFn = throttle(() => {console.log('hi')});
    throttledFn();
    throttledFn();
    throttledFn();
    throttledFn();
```

A throttle function in js is a utility that limits the rate at which a function can be called. it is particullarly useful in scenario where you might want to ensure that a function is not called too frequently. such as handling event like scrolling or resizing.