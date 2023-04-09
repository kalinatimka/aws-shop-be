const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    entry: slsw.lib.entries,
    target: "node",
    mode: slsw.lib.webpack.isLocal ? "development" : "production",
    optimization: {
        minimize: false
    },
    performance: {
        hints: false
    },
    devtool: 'source-map',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: __dirname,
                exclude: /node_modules/
            }
        ]
    }
};