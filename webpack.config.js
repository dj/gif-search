module.exports = {
    entry: ["whatwg-fetch", "./src/index.tsx"],
    output: {
        filename: "./public/js/bundle.js",
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".json"]
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" },
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { 
                test: /\.js$/, 
                loader: "source-map-loader",
            },
            { test: /\.json$/, loader: 'json-loader'},
        ]
    },
};
