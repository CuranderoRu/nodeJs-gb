const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src', 'frontend', 'index.jsx')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            components: path.resolve(__dirname, 'src', 'frontend', 'components'),
            actions: path.resolve(__dirname, 'src', 'frontend', 'store', 'actions'),
            reducers: path.resolve(__dirname, 'src', 'frontend', 'store', 'reducers'),
        },
    },
    module: {
        rules: [{
                test: /\.js|x$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'frontend', 'index.html'),
            filename: 'index.html',
        })
    ]
}