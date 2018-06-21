const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const parts = require("./webpack.parts");
const path = require("path");
const glob = require("glob");

const PATHS = {
  app: path.join(__dirname, "src"),
  build: path.join(__dirname, "dist"),
};

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({ title: "Webpack base" }),
    ],
  },
  parts.loadJavaScript({ include: PATHS.app }),
]);

/**
 * CONFIGURACION PARA PRODUCCION
 */
const productionConfig = merge([
  {
    output: {
      chunkFilename: "[name].[chunkhash:4].js",
      filename: "[name].[chunkhash:4].js",
    },
  },
  parts.clean(PATHS.build),
  parts.minifyJavaScript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
      // Run cssnano en modo seguro para evitar
      // transformaciones potencialmente inseguras.
      safe: true,
    },
  }),
  parts.generateSourceMaps({ type: "source-map" }),
  parts.extractCSS({
    use: "css-loader",
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: "[name].[hash:4].[ext]",
    },
  }),
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "initial",
          },
        },
      },
      runtimeChunk: {
        name: "manifest",
      },
    },
  },
  parts.attachRevision(),
]);

/**
 * CONFIGURACION PARA DESARROLLO
 */
const developmentConfig = merge([
  parts.generateSourceMaps({ type: "eval-source-map" }),
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
  parts.loadImages(),
]);

module.exports = mode => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }
  return merge(commonConfig, developmentConfig, { mode });
};