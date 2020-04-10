# sass-to-string

`sass-to-string` is a Webpack loader that takes a SCSS file with the `.styles.scss` extensions and make it available inside your Javascript module.

## Installation

First install the module with your favorite loader

```
npm install sass-to-string --save-dev
```

```
yarn install sass-to-string -D
```

### Peer dependencies

Note that this module needs `webpack` and the magic from `sass-loader` in order to do its job properly

## Usage in Webpack

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

### Already have a SASS config?

Chances are you already have a SASS config in your webpack config and the above code just broke it. To fix this, add `.stories.scss` in the `exclude` of the rule.

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

## The fun part : use it in your module!

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
