const path = require("path");
const webpack = require("webpack");
const isLocal = (process.env.NODE_ENV !== 'production');

module.exports = {
    mode: isLocal ? 'development' : 'production',
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    entry: [
        '@babel/polyfill', './src/server/server.js'
    ],
    output: {
        path: path.join(__dirname, ".build"),
        publicPath: isLocal ? 'http://localhost:3002/assets/' : '/assets/',
        filename: "server.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
            },
            { test: /\.handlebars$/, loader: "handlebars-loader" },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            emitFile: false
                        }
                    }
                ]
            },
            {
                test: /\.scss/,
                use: [
                    {
                        loader: 'css-loader/locals',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    },
                    'sass-loader'
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
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: isLocal ? JSON.stringify("development") :
                    JSON.stringify("production")
            },
        }),
        new webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop')
    ]
};