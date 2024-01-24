// processing scss files
import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename   from "gulp-rename";
import cleanCss             from "gulp-clean-css";  // minify css files
import webpCss              from "gulp-webpcss";    // add webp images in css file
import autoprefix           from "gulp-autoprefixer";   // add prefixers (for diferents browsers)
import groupCssMediaQueries from "gulp-group-css-media-queries";  //group media queries in css file



const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: "SCSS",
      message: "Error: <%= error.message %>"
    })
  ))
  .pipe(app.plugins.replace(/@img\//g, '../img/'))
  .pipe(sass({
    outputStyle: 'expanded'  // minify
  }))

  // if is build version
  .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
  .pipe(app.plugins.if(app.isBuild, webpCss({
    webpClass: ".webp",
    noWebpClass: ".no-webp"
    // noWebpClass: ".no-webp"
  })))
  .pipe(app.plugins.if(app.isBuild, autoprefix({
    grid: true,
    overrideBrowserslist: ['last 8 versions'],
    browsers: [
        'Android >= 4',
        'Chrome >= 20',
        'Firefox >= 24',
        'Explorer >= 11',
        'iOS >= 6',
        'Opera >= 12',
        'Safari >= 6',
    ],
    cascade: true
  })))



  // adding not minify css file
  .pipe(app.gulp.dest(app.path.build.css))


  // adding minify css file if is build version
  .pipe(app.plugins.if(app.isBuild, cleanCss()))
  .pipe(rename({
    extname: ".min.css"
  }))
  .pipe(app.gulp.dest(app.path.build.css))
  .pipe(app.plugins.sync.stream());
}

