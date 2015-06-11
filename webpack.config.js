/*!
 * purl
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * BSD-3-Clause Licensed
 */

/* eslint camelcase: 0 */

'use strict';

// module dependencies
var path = require('path'),
    webpack = require('webpack');

var copyrightBanner = 'purl\nCopyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>\nBSD-3-Clause Licensed',
    pluginsToUse = [
      new webpack.optimize.OccurenceOrderPlugin(true),
      new webpack.optimize.DedupePlugin()
    ];

module.exports = [
  {
    name: 'purl client - dev',
    entry: './index.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'purl.js',
      library: 'purl',
      libraryTarget: 'var'
    },
    target: 'web',
    cache: false,
    devtool: 'hidden-source-map',
    plugins: pluginsToUse.concat(new webpack.BannerPlugin(copyrightBanner, { entryOnly: true }))
  },
  {
    name: 'purl client - prod',
    entry: './index.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'purl.min.js',
      library: 'purl',
      libraryTarget: 'var'
    },
    target: 'web',
    cache: false,
    devtool: 'hidden-source-map',
    plugins: pluginsToUse.concat(new webpack.optimize.UglifyJsPlugin({
      compress: {
        dead_code: true,
        unused: true,
        warnings: true,
        join_vars: true
      },
      output: {
        comments: false
      },
      mangle: true
    }), new webpack.BannerPlugin(copyrightBanner, { entryOnly: true }))
  }
];
