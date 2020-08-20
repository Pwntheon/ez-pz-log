[![npm (scoped)](https://img.shields.io/npm/v/@pwntheon/ez-pz-log)](https://github.com/Pwntheon/ez-pz-log)

# ez-pz-log
A small tool that allows you to filter out which console.log messages to see based on tags

**Note:** Currently only works in browser, not node.

## Usage
In your code, import ez-pz-log and use it like console.log, with the first argument being the tag. Logged messages will not be printed to console unless the tag is added to the list of tags to show.

In the app:
```javascript
import log from 'ez-pz-log';
const count = 4;
log("math", "count is equal to", count);
log("debug", "some debug info");
```

In the console when running your app:
```javascript
ezpzlog("math");
-> Added tag math
-> Currently tracked tags: math
```
If the above code is then hit, only the message with `math` as it's tag will be printed.

**Note:** the ezpzlog function will be added to the window object upon the first call of log(), so it's probably a good idea to add it to your app's initialization code.

Tags will be saved to local storage, so refreshing the page or changing your code will not clear the list of watched tags.

To remove a tag, just type `ezpzlog("tagname")` again.

## Functions other than console.log

If you wish to do console.warn, console.table or some other logging function, you can do this in two ways.

To switch function permanenely (until you switch to something else) just run ez-pz-log with the function you want as the only parameter:
```javascript
import log from 'ez-pz-log';
log(console.error);
try {
    foo.bar();
} catch(ex) {
    log("foo", "function bar threw exception:", ex.message);
}
```

You can also use a custom function just once by providing it as the first argument:
```javascript
import log from 'ez-pz-log';
try {
    foo.bar();
} catch(ex) {
    log(console.error, "foo", "function bar threw exception:", ex.message);
}
```