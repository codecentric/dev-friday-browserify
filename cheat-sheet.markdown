# Get Started
```
# Node.js 0.10, 0.12 or io.js needs to be installed and npm needs to be in the PATH
git clone git@github.com:codecentric/dev-friday-browserify.git
cd dev-friday-browserify
npm install
```

# Browserify/npm scripts

## Rebuild
```
npm run build
OR
node_modules/.bin/browserify js/app.js --outfile dist/bundle.js
```

## Rebuild Automatically On File Changes
```
npm run watch
OR
node_modules/.bin/watchify js/app.js -v --outfile dist/bundle.js
```

## Other Useful npm scripts

* `npm run clean`: Delete bundle.
* `npm run serve`: Start HTTP server.
* `npm run live`: Start live reload server (needs to run in parallel to HTTP server).
* `npm run dev`: Builds, starts HTTP & live reload server and watches for file changes.

## Start HTTP Server

```
npm run serve
```

# CommonJS

```
# first-module.js
var privateVar = 42;
function privateFunction() { ... }
exports.foo = function() { ... };
exports.bar = function() { ... };

# second-module.js
var first = require('./first-module');
first.foo();
first.bar();
```
OR
```
# first-module.js
function onlyExportedFunction() { ... };
module.exports = onlyExportedFunction; # exports function directly

# second-module.js
var first = require('./first-module');
first();  # calls onlyExportedFunction
```

# npm

## Install a Package From npm
```
npm install --save <package-name>      # => production dependency
npm i -S <package-name>                # => same, just shorter
npm install --save-dev <package-name>  # => development dependency
npm i -D <package-name>                # => same, just shorter
```
