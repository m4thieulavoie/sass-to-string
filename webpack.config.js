const path = require('path');

module.exports = {
  entry: './demo/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
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
  }
};