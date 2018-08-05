# bumpver-webpack-plugin
A webpack plugin to bump the major, minor, or patch number for a build. 

## Install

```
npm install bumpver-webpack-plugin --save-dev
```
or 
```
yarn add bumpver-webpack-plugin --dev
```

## Usage

Increments patch number by default, but you can specify either major, minor, or patch. 

Arguments:
* files (required): one or more file names containing "version" to increment
* level (optional): semver level - 'major', 'minor', or 'patch'

To use default settings and increment patch for every build...

``` javascript
const BumpVerPlugin = require('bumpver-webpack-plugin');

module.exports = {
    plugins: [
        new BumpVerPlugin({
            files: ['package.json']
        })
    ]
}
```

To specify semver level ("major", "minor", or "patch") for every build...
``` javascript
const BumpVerPlugin = require('bumpver-webpack-plugin');

module.exports = {
    plugins: [
        new BumpVerPlugin({
            files: ['package.json'],
            level: 'patch'
        })
    ]
}
```

To pass a semver level to your webpack config, set variable via *env* parameter like this...

``` javascript
const BumpVerPlugin = require('bumpver-webpack-plugin');

module.exports = (env) => {
    return {
        plugins: [
            new BumpVerPlugin({
                files: ['package.json', 'manifest.json'],
                level: env.VERSION_LEVEL
            })
        ]
    }
}
```

Then, in your call to webpack add a variable to *env* containing the semver level to increment...

``` javascript
"scripts": {
    "build-major": "webpack --env.VERSION_LEVEL=major",
    "build-minor": "webpack --env.VERSION_LEVEL=minor",
    "build": "webpack"
}
```

As per the [semver spec](https://semver.org/), when you increment minor the patch value will be reset to 0. When you increment major both the minor and patch will be reset to 0. 

Plugin based on original *bump-webpack-plugin* by johnagan. Expanded functionality to include semver level. 
