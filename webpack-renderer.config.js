var excluded = /(node_modules|bower_components|dist|src)/;

module.exports = {
    entry: './app/renderer/scripts/main.js',
    output: {
        path: './dist/app/scripts/',
        publicPath: './scripts/'
    },
    target: 'atom',
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: excluded,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                exclude: excluded,
                loader: 'style!css'
            },
            {
                test: /\.scss$/,
                exclude: excluded,
                loader: 'style!css!sass'
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?/, loader: 'file-loader' }
        ]
    }
};
