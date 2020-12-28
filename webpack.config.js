const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./src/demo/index.ts",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
        {
            test: /\.styles.scss$/,
            exclude: /node_modules/,
            use: [
            "./lib/loader.js",
            {
                loader: "sass-loader",
                options: {
                    sassOptions: {
                        outputStyle: "compressed",
                    },
                },
            },
            ],
        }
    ],
  },
  devServer: {
    port: 4000,
    historyApiFallback: {
      index: "index.html",
    },
  },
};