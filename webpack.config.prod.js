//entry -> output
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return { 
        entry: './src/app.js',
        mode: 'production',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'API_KEY': JSON.stringify(env.API_KEY) 
                }
            }), 
            CSSExtract
        ],
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
        
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    }
                ]
            }]
        },
        devtool: 'source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public')
        }
    };
};