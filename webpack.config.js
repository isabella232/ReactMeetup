var webpack = require('webpack');

module.exports = {
    entry: [
        'script!jquery/dist/jquery.min.js',
        'script!foundation-sites/dist/foundation.min.js',
        './app/app.jsx'
    ],
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
       new webpack.ProvidePlugin({
           '$': 'jquery',
           'jQuery': 'jquery'
       }) 
    ],
    output: {
        path: __dirname,
        filename: './build/bundle.js'
    },
    resolve: {
        root: __dirname,
        alias: {
            Main: 'app/components/Main.jsx',
            Nav: 'app/components/Nav.jsx',
            SendToken: 'app/components/SendToken.jsx',
            SendForm: 'app/components/SendForm.jsx',
            TokenMessage: 'app/components/TokenMessage.jsx',
            Certificates: 'app/components/Certificates.jsx',
            About: 'app/components/About.jsx',
            LinumLabs: 'app/components/LinumLabs.jsx',
            applicationStyles: 'app/styles/app.css'
        },
        extensions: ['', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader', 
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                },
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            },
            { test: /\.json$/, loader: "json" }
        ]
    },
    devtool: 'cheap-module-eval-source-map'
};