```js
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}
console.log("Anand".startsWith("and", 2)); //true
console.log("Anand".startsWith("An", 0)); //true
console.log("Anand".startsWith("An", 3)); //false
```
