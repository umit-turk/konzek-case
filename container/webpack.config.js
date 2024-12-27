const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        auth: 'auth@http://localhost:3002/remoteEntry.js',
        products: 'products@http://localhost:3001/remoteEntry.js',
        cart: 'cart@http://localhost:3003/remoteEntry.js',
        orders: 'orders@http://localhost:3004/remoteEntry.js',
        productDetail: 'productDetail@http://localhost:3005/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: false },
        'react-dom': { singleton: true, eager: true, requiredVersion: false },
        'react-router-dom': { singleton: true, requiredVersion: false },
        '@reduxjs/toolkit': { singleton: true, requiredVersion: false },
        'react-redux': { singleton: true, requiredVersion: false }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}; 