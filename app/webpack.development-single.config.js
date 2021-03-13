const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.tsx',
        style: './src/assets/main.scss'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './build',
        hot: true,
        port: 4200,
        historyApiFallback: true,
        open: true,
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: [{
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                    }
                }]
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    'css-hot-loader',
                    "style-loader",
                    "css-loader",
                    'resolve-url-loader',
                    "sass-loader"
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: "./src/favicon.ico"
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"single"',
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            title: ''
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
}