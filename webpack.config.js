const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: 'build',
  },

  devtool: 'inline-source-map',

  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: 'public',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
    // In case css needed in the project.
    //   {
    //     test: /\.css$/,  
    //     include: /node_modules/,  
    //     loaders: ['style-loader', 'css-loader'],
    //   },
    ],
  },
};

module.exports = config;
