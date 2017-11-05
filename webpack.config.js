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
      {
        test: /\.css$/,  
        include: /node_modules/,  
        loaders: ['style-loader', 'css-loader'],
      },
      {
      test: require.resolve('jquery'),
      use: [
        { loader: 'expose-loader', options: 'jQuery' },
        { loader: 'expose-loader', options: '$' }
      ]
    },
    
    {
      test: require.resolve('tether'),
      use: [
        { loader: 'expose-loader', options: 'Tether' }
      ]
    }
    ],
  },
};

module.exports = config;

