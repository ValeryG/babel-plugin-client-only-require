# babel-plugin-client-only-require

## What does it do
Converts import statements for less/css/scss into conditional requires in compiled file:

src/index.js:

```js
import ('./myStyles.less')
```
is converted into lib/index.js:

```js
!!(typeof window !== 'undefined' && window.document && window.document.createElement) ? require("./styles/myStyles.less") : void 0;
```

## Why is it needed?

If we run without this plugin:
```
babel-node src/index.js
```
or
```
babel src --out-dir lib
node lib/index.js
```

we will get an error:
```
...myStyles.css:2
.main {
^
SyntaxError: Unexpected token .
```
As node is trying to process less-css-scss file.
So we do not want node on the server to process those files at all.

## Why can't i use babel-plugin-transform-require-ignore

babel-plugin-transform-require-ignore will remove require statements for styles from transpiled output
so your `lib/index.js` will have no mentioning of
```
require('myStyles.less')
```

But now, if you run your webpack to create client bundle from your `lib/*`, your webpack style loader and ExtractTextPlugin
will not find any less-css-scss files to grab and bundle.
With the appoach of wrapping require to client only condition - require is still there for webpack to act on.


## How to configure
Install as dev dependency:
```
npm install --save-dev babel-plugin-client-only-require
```

To configure add plugin to .babelrc plugins section:
```
{
	....
    "plugins": [
		....
		["client-only-require", {
                "extensions": ["less", "scss", "css"]
        }]
    ]
}
```
