const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    //configure workbox plugins for a service worker and manifest file.
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Text Editor",
      }),
      new WebpackPwaManifest({
        name: "PWA Text Editor",
        short_name: "PWATE",
        description: "This is a PWA text editor.",
        inject: true,
        background_color: "#d8a48f",
        icons: [
          {
            src: path.resolve("src/images/logo.JPG"),
            sizes: [96, 128, 192, 256, 384, 512],
            //output directory
            destination: path.join("assets", "logos"),
            ios: true,
            ios: "startup",
          },
        ],
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
    ],
    module: {
      rules: [
        //CSS loaders
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        //babel loader
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
