const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 3002,
    historyApiFallback: true,
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
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './Auth': './src/components/Auth',
      },
      shared: [
        {
          react: {
            singleton: true,
            requiredVersion: false,
            eager: true
          },
          'react-dom': {
            singleton: true,
            requiredVersion: false,
            eager: true
          },
          'react-router-dom': {
            singleton: true,
            requiredVersion: false
          },
          '@reduxjs/toolkit': {
            singleton: true,
            requiredVersion: false
          },
          'react-redux': {
            singleton: true,
            requiredVersion: false
          }
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}; 