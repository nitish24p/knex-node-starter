// webpack.config.js
const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry:  {
    main: __dirname + '/client/mainContainer.js',
    vendors: [
      'react',
      'react-dom',
      'redux',
      'react-router',
      'axios',
      'react-router-redux',
      'react-redux'
    ]
  },
  output: {
    path: './client/build',
    filename: 'bundle-[chunkhash].js'
  },
  stats: {},
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel',
        include: __dirname + '/client',
        resolve: {
          extensions: ['', '.js', '.jsx']
        }
      },
      {
        test: /\.scss/,
        include: __dirname + '/client',
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      },
      {
        test: /\.css/,
        include: __dirname + '/client',
        loader: ExtractTextPlugin.extract('style', 'css-loader')
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors-[chunkhash].js', Infinity),
    new ExtractTextPlugin('[name]-[chunkhash].css'),
    function() {
      this.plugin('done', function(stats) {
        require('fs').writeFileSync(
          path.join(__dirname, 'client', 'build', 'stats.json'),
          JSON.stringify(stats.toJson().assetsByChunkName));
      });
    },
    new CleanWebpackPlugin(['build'], {
      verbose: true,
      dry: false,
      root: __dirname + '/client'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('dev')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};

