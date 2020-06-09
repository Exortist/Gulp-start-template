"use strict";

let config = {
  'notGetBlocks': [
    'blocks-demo.html',
  ],
  'ignoredBlocks': [],
  'alwaysAddBlocks': [
    // 'sprite-png',
    // 'object-fit-polyfill',
  ],
  'addStyleBefore': [
    './node_modules/bootstrap/scss/bootstrap.scss', // Пример
    'src/static/scss/fonts.scss',
    'src/static/scss/reset.scss',
    'src/static/scss/variables.scss',
    'src/static/scss/mixins.scss',
    'src/static/scss/core.scss',
    // 'src/static/scss/_smart-grid.scss',
    // './node_modules/slick-carousel/slick/slick.scss', // для 'node_modules/somePackage/dist/somePackage.js',
    // './node_modules/owl.carousel/src/scss/owl.carousel.scss',
    // './node_modules/owl.carousel/src/scss/owl.theme.default.scss',

  ],
  'addStyleAfter': [

    // 'src/scss/print.scss',
  ],
  'addJsBefore': [
    // 'somePackage/dist/somePackage.js', // для 'node_modules/somePackage/dist/somePackage.js',
    // 'node_modules/jquery/dist/jquery.js', // для 'node_modules/somePackage/dist/somePackage.js',
    // '../../../node_modules/owl.carousel/dist/owl.carousel.js', // для 'node_modules/somePackage/dist/somePackage.js',
    // '../../../node_modules/slick-carousel/slick/slick.js', // для 'node_modules/somePackage/dist/somePackage.js',
  ],
  'addJsAfter': [
    //'./script.js',
  ],
  'entryListJs': {
    bundle: './src/static/js/entry.js',
    // bundle2: './src/static/js/entry2.js',
  },
  'addAssets': {
    'src/static/img/*.{png,jpg,jpeg,svg}': 'static/img/',
    'src/static/fonts/*.{woff,woff2}': 'static/fonts/',
    // 'src/static/favicon/*.{png,ico,svg,xml,webmanifest}': 'img/favicon',
    // 'node_modules/somePackage/images/*.{png,svg,jpg,jpeg}': 'img/',
  },


  'src': {
    "src": 'src/',

    "template": 'src/template/',
    "blocks": 'src/template/blocks/',
    "components": 'src/template/components/',

    "pug": "src/pug/",
    "layout": "src/pug/layout/",
    "pages": "src/pug/pages/",

    "static": 'src/static/',
    "fonts": 'src/static/fonts/',
    "img": 'src/static/img/',
    "svg": 'src/static/img/svg/',
    "js": 'src/static/js/',
    "scss": 'src/static/scss/',
  },
  'build': {
    'dir': `build/`,
    'img': `build/static/img/`,
    'svg': `build/static/img/svg/`,
    'css': `build/static/css/`,
    'js': `build/static/js/`,
  },
  'config': {
    'proxy': 'localhost:3000',
    'ext': '.html'
  },
};


exports.config = config;

const del = require('del')
const srcDir = config.src;
const buildDir = config.build;
const settings = config.config;
const production = process.argv[3] ? 1 : 0;
const {watch, parallel, src, series, dest} = require('gulp');
const plugin = require('gulp-load-plugins')();



let doNotEditMsg = '\n ВНИМАНИЕ! Этот файл генерируется автоматически.\n Любые изменения этого файла будут потеряны при следующей компиляции.\n Любое изменение проекта без возможности компиляции ДОЛЬШЕ И ДОРОЖЕ в 2-5 раз.\n\n';


module.exports = {
  del,
  production,
  parallel,
  src,
  series,
  watch,
  dest,
  config,
  plugin,
  doNotEditMsg,
  srcDir,
  buildDir,
  settings
};
