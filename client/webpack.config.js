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
        name: "Text Editor",
        short_name: "TE",
        description: "This is a PWA text editor.",
        inject: true,
        background_color: "#d8a48f",
        theme_color: "#2e2c2c",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: ["180x180", "192x192", "144x144", "512x512"],
            //output directory
            destination: path.join("assets", "logos"),
            type: "image/png",
            purpose: "maskable",
            ios: true,
            ios: "startup",
          },
          {
            src: path.resolve("src/images/logo.png"),
            sizes: ["180x180", "192x192", "144x144", "512x512"],
            //output directory
            destination: path.join("assets", "logos"),
            type: "image/png",
            purpose: "any",
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
