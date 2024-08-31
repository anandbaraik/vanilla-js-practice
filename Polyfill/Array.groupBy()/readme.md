```js
Array.prototype.groupBy = function (fn) {
  let result = {};
  function groupByValue(arr, fn) {
    for (let i = 0; i < arr.length; i++) {
      let key = fn(arr[i]);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(arr[i]);
    }
    return result;
  }
  return groupByValue(this, fn);
};

let fn = function (item) {
  return item.id;
};

let result = [{ id: "1" }, { id: "1" }, { id: "2" }].groupBy(fn);
console.log(result);
/** {
  "1": [{"id": "1"}, {"id": "1"}],
  "2": [{"id": "2"}]
}
**/
```
