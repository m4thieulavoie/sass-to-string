# sass-to-string

[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm version](https://badge.fury.io/js/sass-to-string.svg)](https://www.npmjs.com/package/sass-to-string)
[![Downloads](https://img.shields.io/npm/dm/sass-to-string.svg)](https://www.npmjs.com/package/sass-to-string)
[![CircleCI](https://circleci.com/gh/circleci/circleci-docs.svg?style=shield)](https://circleci.com/gh/m4thieulavoie/sass-to-string)

`sass-to-string` is a set of helper tools that allow your Web application to leverage SASS files as JavaScript strings so you can use them the way you want afterwards. This is especially useful for Web Components that need to inject their stylesheets directly in the template.

`sass-to-string` provides two different approaches

- A Webpack loader that transforms SASS files to native JavaScript strings
- A `sass-to-string` command that transforms your `scss` files to a native JavaScript string at build time

## Installation

First install the module with your favorite loader

```bash
# With NPM
npm install sass-to-string --save-dev
# With Yarn
yarn install sass-to-string -D
```

## Webpack loader

### Usage

In your `webpack.config.js`, add the following rule.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styles.scss$/,
        exclude: /node_modules/,
        use: [
          "sass-to-string",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                outputStyle: "compressed",
              },
            },
          },
        ],
      },
    ],
  },
};
```

#### Already have a SASS config?

Chances are you already have a SASS config in your webpack config and the above code just broke it. To fix this, add `.styles.scss` in the `exclude` of the rule.

See the **exclude** part in the following example

```js
module.exports = {
  module: {
    rules: [
      {
          // Your new shiny sass-to-string config
      },
      {
        test: /\.(scss|css)$/,
        // Excluding the `.styles.scss` extension
        exclude: [/\.styles.scss$/, /node_modules/],
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
          },
        ],
      },
    ];
  }
}
```

#### The fun part : use it in your module!

Now that Webpack is configured, you can access your compiled SCSS code in a JS module.

Say we have this SCSS

```scss
section {
  p {
    font-family: "Comic Sans MS";
  }
}
```

`sass-loader` will resolve it to this value:

```css
section p {
  font-family: "Comic Sans MS";
}
```

Awesome! Not let's pull this in a `tractor.js` javascript module

```js
import styles from "./tractor.styles.scss";

// Outputs : section p{font-family:"Comic Sans MS"}
console.log(styles);
```

#### Use it with your web components!

The motivation behind this package was to be able to use SASS inside Web Components. Here's an example of doing such

```ts
import styles from "./tractor.styles.scss";

class TractorViewer extends HTMLElement {
  constructor() {
    super();

    const style = document.createElement("style");
    // styles equals "section p{font-family:"Comic Sans MS"}"
    style.textContent = styles;

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(style);
  }
}
```

### Peer dependencies

Note that this module needs `webpack` and the magic from `sass-loader` in order to do its job properly

### Typescript typings

If you face typings errors in your IDE, add this line to your local typings file

```ts
import "sass-to-string/index";

// Any other type declarations you might have
```

It should solve the IDE error

## Build command

We also expose a `sass-to-string` command that will transform your SASS files in a JavaScript string. Here's a quick example.

Pretend you have this SCSS file called `demo.styles.scss`

```scss
body {
  p {
    color: red;
  }
}
```

And this JavaScript import statement alongside

```js
import styles from "./demo.styles.scss";
```

When running the command, it'll create a `demo.styles.scss.js` file in the right directory under `dist`.

```js
const styles = `body p {
  color: red;
}`;
export default styles;
```

As you guessed it, you can run it alongside `tsc` a fully working app using SASS and _only_ bundled with Typescript.

Here's an example on how you could run a `build` command in your `package.json`

```json
{
  "scripts": {
    ...
    "build": "tsc && sass-to-string"
  }
}
```

### Options

You can also provide some command options to `sass-to-string` like such

```json
{
  "scripts": {
    ...
    "build": "sass-to-string --dist=lib"
  }
}
```

If you prefer, you can also create a `.sass-to-string.js` file at the root of your project

```js
module.exports = {
  dist: "lib",
  // Replaces bootstrap imports by resolving node_modules
  prepare: (scss) =>
    scss.replace(/@import "bootstrap/g, `@import "node_modules/bootstrap`),
};
```

#### List of options

| Option    |  Default value   | Description                                                                              |
| --------- | :--------------: | ---------------------------------------------------------------------------------------- |
| `dist`    |      `dist`      | Name of the directory to copy the newly created files                                    |
| `src`     |      `src`       | Name of the directory to look for files                                                  |
| `verbose` |     `<null>`     | If you want `sass-to-string` to be verbose                                               |
| `prepare` | `(scss) => scss` | JavaScript function that receives the SASS content, and returns a modified version of it |

### Peer dependencies

Note that this module requires a `peerDependency` on `fs-extra` and `sass` in order to work properly

# Like this package?

Of course you do! Thinking and coding this package implied quite a lot of coffee. If you want, you can [buy me one](https://buymeacoff.ee/mathieulavoie)! ☕️
