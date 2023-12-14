```js
const apiCache = (url, method, time = 500) => {
  const cache = new Map();
  async function cacheHelper() {
    console.log("gete cached", cache.get(url));
    if (cache.has(url) && Date.now() < cache.get(url).expiry) {
      console.log(`Returning from cache for - ${url}`);
      return cache.get(url).respnse;
    }
    try {
      let apiResponse = await fetch(url, { method: method });
      let response = await apiResponse.json();
      cache.set(url, { expiry: Date.now() + time, response: response });
      console.log(`Returning from server for - ${url}`);
      return response;
    } catch (err) {
      console.error(`Error while fetching data for - ${url} : `, err.message);
    }
  }
  return cacheHelper();
};

let url = "https://api.github.com/users/anandbaraik";
let method = "GET";
let time = 500;

let call1 = apiCache(url, method, time);
call1.then((res) => {
  console.log("first call - ", res);
});

setTimeout(() => {
  let call2 = apiCache(url, method, time);
  call2.then((res) => {
    console.log("second call - ", res);
  });
}, 300);

setTimeout(() => {
  let call3 = apiCache(url, method, time);
  call3.then((res) => {
    console.log("thired call - ", res);
  });
}, 500);
```
