function customSetTimeout() {
  let id = 0;
  let map = {};
  function setTimeoutPolyfill(cbFn, delay) {
    let timerId = id++;
    map[timerId] = true;
    let start = Date.now();
    function triggerCallbackFn() {
      if (!map[timerId]) {
        return;
      }
      if (Date.now() >= start + delay) {
        delete map[timerId];
        cbFn();
      } else {
        requestIdleCallback(triggerCallbackFn);
      }
    }
    requestIdleCallback(triggerCallbackFn);
    return timerId;
  }

  function clearTimeoutPolyfill(id) {
    if (map[id]) {
      delete map[id];
    }
  }
  return { setTimeoutPolyfill, clearTimeoutPolyfill };
}

/*
* uses
*/
let { setTimeoutPolyfill, clearTimeoutPolyfill } = customSetTimeout();

let timerId1 = setTimeoutPolyfill(() => {
  console.log("hello from setTimeoutPolyfill - 1");
}, 1000);

console.log(timerId1);
clearTimeoutPolyfill(timerId1);

let timerId2 = setTimeoutPolyfill(() => {
    console.log("hello from setTimeoutPolyfill - 2");
}, 1000);

console.log(timerId2);

/*
* requestIdleCallback ()
*/

// The window.requestIdleCallback() method queues a function to be called during a browser's idle periods. This enables developers to perform background and low priority work on the main event loop, without impacting latency-critical events such as animation and input response. Functions are generally called in first-in-first-out order; however, callbacks which have a timeout specified may be called out-of-order if necessary in order to run them before the timeout elapses.

// You can call requestIdleCallback() within an idle callback function to schedule another callback to take place no sooner than the next pass through the event loop.

/*
* syntax
*/
// requestIdleCallback(callback)
// requestIdleCallback(callback, options)
