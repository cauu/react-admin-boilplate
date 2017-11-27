const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const existsSync = require('fs').existsSync;

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const pkgPath = resolve('package.json');
const pkg = existsSync(pkgPath) ? require(pkgPath) : {};

let theme = {};
if (pkg.theme && typeof(pkg.theme) === 'string') {
  let cfgPath = pkg.theme;
  // relative path
  if (cfgPath.charAt(0) === '.') {
    // cfgPath = resolve(args.cwd, cfgPath);
    cfgPath = resolve(cfgPath);
  }
  const getThemeConfig = require(cfgPath);
  theme = getThemeConfig();
} else if (pkg.theme && typeof(pkg.theme) === 'object') {
  theme = pkg.theme;
}

module.exports = {
  entry: {
    app: [
      resolve('src/index.js')
    ],
    // ieCompatible: resolve('app/utils/ie-compatible.js'),
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      'node_modules',
      resolve('app'),
      resolve('node_modules')
    ],
    alias: {
      app: resolve('src'),
      assets: resolve('src/assets'),
      components: resolve('src/components'),
      pages: resolve('src/pages'),
      utils: resolve('src/utils'),
      models: resolve('src/models'),
      constants: resolve('src/constants'),
      layouts: resolve('src/layouts')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'es3ify-loader'
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.js?$/,
        exclude: /node_modules|lib/,
        loader: 'eslint-loader'
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: true } },
            { loader: 'sass-loader' },
            { loader: 'postcss-loader' }
          ]
        })
      },
      {
        test(filePath) {
          return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath);
        },
        loader: ExtractTextPlugin.extract(
          'css-loader?sourceMap!' +
          'postcss-loader?sourceMap!' +
          `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
        ),
      },
      {
        test: /\.module\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'less-loader', options: { sourceMap: true, modifyVars: JSON.stringify(theme) } },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader' },
          ]
        })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: true } },
            { loader: 'postcss-loader' }
          ]
        })
      },
      {
        test: /\.(woff(2)?|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader?name=i/[name].[ext]'
      }]
  }
};