const webpack = require('webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    // Solo muestra los errores para reducir la cantidad de info
    stats: 'errors-only',
    // host and port vienen en ENV.
    //
    // Con Docker, Vagrant o Cloud9, setear
    // host: options.host || "0.0.0.0";
    //
    // 0.0.0.0 esta disponible para todos los dispositivos de red
    // pero `localhost` no.
    host, // Default to `localhost`
    port, // Default to 8080
    open: true, // Cuando se inicia, abre el proyecto en el browser.
    historyApiFallback: true,
    overlay: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
      title: 'Webpack demo',
      appMountId: 'app',
      inject: false,
    }),
    new ErrorOverlayPlugin(),
    new DashboardPlugin(),
  ],
});

exports.loadGraphql = () => ({
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});

exports.extractCSS = ({ include, exclude, use = [] }) => {
  // Almacena el CSS extraido en un archivo.
  const plugin = new MiniCssExtractPlugin({
    filename: 'styles/[name].[contenthash:4].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: [
            MiniCssExtractPlugin.loader,
          ].concat(use),
        },
      ],
    },
    plugins: [plugin],
  };
};

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })],
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options,
        },
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
    ],
  },
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: 'babel-loader',
      },
    ],
  },
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.clean = path => ({
  plugins: [new CleanWebpackPlugin([path])],
});

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ],
});

exports.minifyJavaScript = () => ({
  optimization: {
    minimizer: [new UglifyWebpackPlugin({ sourceMap: true })],
  },
});

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
});
