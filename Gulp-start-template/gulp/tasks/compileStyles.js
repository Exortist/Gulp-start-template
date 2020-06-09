import {src, plugin, dest, config, production} from "../../config";

const buildLibrary = process.env.BUILD_LIBRARY === 'yes' ? true : false;
const gcmq = require('gulp-group-css-media-queries');
const gulpStylelint = require('gulp-stylelint')
const plumber = require('gulp-plumber')
const smartgrid = require("smart-grid");

const settings = {
  outputStyle: "scss",
  filename: "_smart-grid",
  columns: 12, // number of grid columns
  offset: "1.875rem", // gutter width - 30px
  mobileFirst: false,
  mixinNames: {
    container: "container"
  },
  container: {
    fields: "0.9375rem" // side fields - 15px
  },
  breakPoints: {
    xs: {
      width: "20rem" // 320px
    },
    sm: {
      width: "36rem" // 576px
    },
    md: {
      width: "48rem" // 768px
    },
    lg: {
      width: "62rem" // 992px
    },
    xl: {
      width: "75rem" // 1200px
    }
  }
};


function compileStyles() {
  const fileList = [
    `${config.src.scss}style.scss`
  ];
  if (buildLibrary) fileList.push(`${config.src.blocks}blocks-library/blocks-library.scss`);
  stylelint()
  //smartgrid('src/static/scss/', settings);
  return src(fileList)
    .pipe(plumber())
    .pipe(plugin.if(!production, plugin.sourcemaps.init()))
    .pipe(plugin.sass())
    .pipe(plugin.if(production, plugin.autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      cascade: false
    })))
    .on("error", plugin.notify.onError({
      message: "Error: <%= error.message %>",
      title: "style"
    }))
    .pipe(gcmq())
    .pipe(plugin.if(production, plugin.csso()))
    .pipe(plugin.if(!production, plugin.sourcemaps.write()))
    .pipe(dest(config.build.css))
  //.on('end', browserSync.reload)
}

function stylelint() {
  return src(config.src.blocks + '**/*.scss')
    .pipe(plumber())
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
}


exports.compileStyles = compileStyles;
