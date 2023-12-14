```js
const cache = {};
const apiCache = (url, method, time = 500) => {
  async function cacheHelper() {
    if (cache[url] && Date.now() < cache[url]["expiry"]) {
      console.log(`Returning from cache for - ${url}`);
      return cache[url]["response"];
    }
    try {
      let apiResponse = await fetch(url, { method: method });
      if (!apiResponse.ok) {
        throw new Error(`Http Error : status - ${apiResponse.status}`);
      }
      let response = await apiResponse.json();
      cache[url] = { expiry: Date.now() + time, response: response };
      console.log(`Returning from server for - ${url}`);
      return response;
    } catch (err) {
      console.error(`Error while fetching data for -  ${url} : `, err.message);
      throw err;
    }
  }
  return cacheHelper();
};

let url = "https://fakestoreapi.com/products/1";
let method = "GET";
let time = 1000;

let call1 = apiCache(url, method, time);
call1
  .then((res) => {
    console.log("1 call - ", res);
  })
  .catch((err) => console.error("in catch 1 err", err.message));

setTimeout(() => {
  let call2 = apiCache(url, method, time);
  call2
    .then((res) => {
      console.log("2 call - ", res);
    })
    .catch((err) => console.error("in catch 2 err", err.message));
}, 500);

setTimeout(() => {
  let call3 = apiCache(url, method, time);
  call3
    .then((res) => {
      console.log("3 call -> ", res);
    })
    .catch((err) => console.error("in catch 3 err", err.message));
}, 1500);
```
