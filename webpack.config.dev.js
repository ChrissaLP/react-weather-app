//entry -> output
const path = require('path');
const Dotenv = require('dotenv-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return { 
        entry: './src/app.js',
        mode: 'development',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        plugins: [
            new Dotenv(), 
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
        devtool: 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public')
        }
    };
};