const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const version = require("./package.json").version;
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const banner = `Author : Matteo Bruni - https://www.matteobruni.it
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.matteobruni.it/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`;

const minBanner = `tsParticles v${version} by Matteo Bruni`;

module.exports = {
    // Change to your "entry-point".
    entry: {
        /*"tsparticles.utils": "./dist/Utils/index.js",
        "tsparticles.utils.min": "./dist/Utils/index.js",
        "tsparticles.slim": "./dist/index.slim.js",
        "tsparticles.slim.min": "./dist/index.slim.js",
        "tsparticles.shape.circle": "./dist/ShapeDrawers/CircleDrawer.js",
        "tsparticles.shape.image": "./dist/ShapeDrawers/ImageDrawer.js",
        "tsparticles.shape.line": "./dist/ShapeDrawers/LineDrawer.js",
        "tsparticles.shape.polygon": "./dist/ShapeDrawers/PolygonDrawer.js",
        "tsparticles.shape.square": "./dist/ShapeDrawers/SquareDrawer.js",
        "tsparticles.shape.star": "./dist/ShapeDrawers/StarDrawer.js",
        "tsparticles.shape.text": "./dist/ShapeDrawers/TextDrawer.js",
        "tsparticles.shape.triangle": "./dist/ShapeDrawers/TriangleDrawer.js",
        "tsparticles.absorbers": "./dist/Plugins/Absorbers/AbsorbersPlugin.js",
        "tsparticles.absorbers.min": "./dist/Plugins/Absorbers/AbsorbersPlugin.js",
        "tsparticles.emitters": "./dist/Plugins/Emitters/EmittersPlugin.js",
        "tsparticles.emitters.min": "./dist/Plugins/Emitters/EmittersPlugin.js",
        "tsparticles.polygonMask": "./dist/Plugins/PolygonMask/PolygonMaskPlugin.js",
        "tsparticles.polygonMask.min": "./dist/Plugins/PolygonMask/PolygonMaskPlugin.js",*/
        "tsparticles": "./dist/index.js",
        "tsparticles.min": "./dist/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        libraryTarget: "window",
        library: ""
    },
    resolve: {
        extensions: [ ".js", ".json" ]
    },
    module: {
        rules: [ {
            // Include ts, tsx, js, and jsx files.
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        } ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner,
            exclude: /\.min\.js$/
        }),
        new webpack.BannerPlugin({
            banner: minBanner,
            include: /\.min\.js$/
        }),
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: "static",
            exclude: /\.min\.js$/,
            reportFilename: "../demo/public/report.html"
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/,
                sourceMap: false,
                terserOptions: {
                    output: {
                        comments: minBanner
                    }
                },
                extractComments: false
            })
        ]
    }
};