import path from 'path';
import ora from 'ora';
import rm from 'rimraf';
import chalk from 'chalk';
import webpack from 'webpack';
import webpackProdConfig from './webpack.prod.conf';
import webpackDevConfig from './webpack.dev.conf';

const spinner = ora('building for production...');
spinner.start();

const env = process.env.NODE_ENV || 'production';

const webpackConfig = env === 'production' && webpackProdConfig || webpackDevConfig(env);

rm(path.join(__dirname, '../dist'), rmError => {
  if (rmError) throw rmError;
  webpack(webpackConfig, (webpackError, stats) => {
    spinner.stop();
    if (webpackError) throw webpackError;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ));
  });
});

