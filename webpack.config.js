const webpack = require("webpack")
const merge = require('webpack-merge');
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isLocal = (process.env.NODE_ENV !== 'production');

let webpackConfig = merge.smart({
    mode: isLocal ? 'development' : 'production',
    entry: { index: ['@babel/polyfill', './src/app/index.js'] },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "all",
                    minChunks: 5,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {
                    test: /node_modules/,
                    chunks: "all",
                    name: "vendor",
                    priority: -10,
                    minSize: 100000,
                    maxSize: 244000
                }
            }
        }
    },
    output: {
        path: path.resolve(__dirname, ".build/assets"),
        publicPath: isLocal ? 'http://localhost:3002/assets/' : '/assets/',
        filename: isLocal ? '[name].[hash].js' : '[name].js'
    },
    devtool: isLocal ? '#source-map' : '',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader"
            },
            { test: /\.handlebars$/, loader: "handlebars-loader" },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    resolve:
    {
        alias: {
            'handlebars':'handlebars/dist/handlebars.js',
        },
        extensions: [".js", ".jsx"] // Для указание модулей без расширения
    },
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        new HtmlWebpackPlugin({
            title: 'Hot Module Replacement',
            template: require.resolve('./src/server/view/index.handlebars'),
            alwaysWriteToDisk: true,
            inject: true,
            isProduction: isLocal,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new HtmlWebpackHarddiskPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: isLocal ? JSON.stringify("development") :
                    JSON.stringify("production")
            }
        }),
    ]
});

// CSS modules
const cssModuleLoaders = [
    {
        loader: 'css-loader',
        options: {
            modules: true,
            localIdentName: '[name]__[local]--[hash:base64:5]'
        }
    },
    'postcss-loader',
    'sass-loader'
];

if (isLocal) {
    webpackConfig = merge.smart(
        webpackConfig,
        {
            module: {
                rules: [{
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        ...cssModuleLoaders
                    ]
                }]
            }
        }
    );
} else {
    webpackConfig = merge.smart(
        webpackConfig,
        {
            module: {
                rules: [{
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        ...cssModuleLoaders
                    ]
                }]
            },
            optimization: {
                splitChunks: {
                    cacheGroups: {
                        commons: {
                            test: /[\\/]node_modules[\\/]/,
                            name: "vendors",
                            chunks: "all"
                        }
                    }
                },
            },
            plugins: [
                new OptimizeCssAssetsPlugin({
                    assetNameRegExp: /\.optimize\.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorOptions: {discardComments: {removeAll: true}},
                    canPrint: true
                }),
                new MiniCssExtractPlugin({
                    filename: "[name].css",
                    chunkFilename: "[id].css"
                })
            ]
        }
    );
}

module.exports = webpackConfig;