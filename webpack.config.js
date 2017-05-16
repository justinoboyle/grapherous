var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: [
        'babel-polyfill',
        './src/main'
    ],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'main.js'
    },
    devtool: 'source-map',

    devServer: {
        contentBase: "./static"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: extractLess.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        },
        {
            test: /\.js$/,
            exclude: [/node_modules/],
            use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015', 'stage-0'] },
            }],
        }]
    },
    plugins: [
        extractLess,
        new CopyWebpackPlugin([
            { from: 'static/' }
        ])
    ],
    watch: false
};