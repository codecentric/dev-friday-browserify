# Tasks

## Prerequisites

1. Make sure Node.js is installed and the executable npm is in your system's path.
1. Check out the example repository `git clone git@github.com:codecentric/dev-friday-browserify.git`
    1. `cd dev-friday-browserify`
    1. `npm install`

## 00. Use Browserify Via npm run

1. Remove the bundle (`js/bundle.js`) with `npm run clean`
1. Build the bundle again with `npm run build`
1. Use `npm run serve` to start a server, check that the app is up and working
1. Kill the server, use `npm run dev` to start the server, run watchify and an additional live-reload server in parallel. Put an `alert` or `console.log` somewhere in `app.js` and check that this happens in the browser.

## 01. Use CommonJS For Structure And Profit

1. Extract the util component from `js/app.js` into its own CommonJS module `js/util.js` and require it in `js/app.js`.
1. If you're in the mood, split the remaining `js/app.js` into `js/main.js` and `js/app.js`. `js/app.js` should contain the `App` component and `js/main.js` only some `require` calls and
```
$(function() {
  Handlebars.registerHelper('eq', function(a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
  });

  App.init();
});
```
Note that you have to change some things in package.json because `js/main.js` is now the entry point for Browserify.

### Bonus Questions

* How can you implement private variables and functions with CommonJS?
* How can you implement public variables and functions with CommonJS?
* How can you implement "something like a class" with CommonJS?

## 02. Use Third Party Modules From the npm Registry

1. Install `lodash` from the npm registry. Make sure it's mentioned in `package.json` as a dependency. Use it to replace the two the native JS `filter` calls in `App.getActiveTodos`, `App.getCompletedTodos` and `App.`. (This is a rather useless thing to do, but right now I didn't come up with a better idea.)
1. Browse https://www.npmjs.com/ for a module that you could put into the app that makes more sense than lodash :-)

## 03. Browserify Transforms

1. Extract the two Handlebars template from index.html into a separate files and use the Browserify transform [hbsfy](https://github.com/epeli/node-hbsfy) to precompile them at build time.
    1. Install `hbsfy` from npm
    1. Modify `package.json` so that the hbsfy transform is used. Make sure to update the `build` as well as the `watch` target.
    1. Extract templates from index.html
    1. Hint: Because the todo template uses a Handlebars helper, you need to do a bit more:
        1. Instead of `var Handlebars = require('handlebars')` you now need `var Handlebars = require('hbsfy/runtime');`.
        1. Pull the three lines beginning with `Handlebars.registerHelper` from to the top of the file. Put them directly after `var Handlebars = require('hbsfy/runtime');`.


