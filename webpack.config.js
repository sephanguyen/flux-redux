const webpack = require('webpack');
const path = require('path');
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/(node_modules)/],
        use: 'babel-loader'
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  entry: {
    cpanel: ['./src/control-panel.js'],
    tasks: ['./src/tasks.js'],
    'message-board': ['./src/message-board.js']
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/assets',
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // optimization: {
  //   noEmitOnErrors: true,
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         name: 'vendor',
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // },
  devServer: { inline: true },
  devtool: 'source-map'
};
