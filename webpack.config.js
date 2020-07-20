const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        background: [
            "./src/scripts/background/context.js"
        ],
        content_scripts: [
            "./src/scripts/content_scripts/overlay/overlay.js"
        ],
        options: "./src/options/options.js",
        popup: "./src/popup/popup.js"
    },
    output: {
        path: path.resolve(__dirname, "addon"),
        filename: "[name]/[name].js"
    },
    mode: "production",
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    "html-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/popup/popup.html",
            filename: "popup/popup.html",
            chunks: ["popup"]
        }),
        new HtmlWebpackPlugin({
            template: "src/options/options.html",
            filename: "options/options.html",
            chunks: ["options"]
        }),
        new MiniCssExtractPlugin({
            filename: "[name]/[name].css"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "src/manifest.json",
                    to: "./"
                },
                {
                    from: "src/assets",
                    to: "./assets/"
                }
            ],
        }),
    ]
};
