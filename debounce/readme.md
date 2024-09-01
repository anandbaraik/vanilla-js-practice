```js
const debounce = (fn, delay = 2000) => {
    let timer;
    return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}

// Example usage:
const debouncedFunction = debounce(() => { console.log('hi'); }, 2000);
debouncedFunction();
```

The Debouncing is a programming technique which we used to ensure that a function is not called to often. it is used mostly where function is called as a results of multiple events firing in quick succession such as user input, scrolling and user click etc.