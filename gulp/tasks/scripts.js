import webpack from "webpack-stream";

export const js = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: "JS Scripts",
      message: "Error: <%= error.message %>"
    })
  ))
  // add webpack module for import and export files from differents folders
  .pipe(webpack({
    mode: app.isBuild ? 'production' : 'development', // develop and production.. mode (root mode)
    output: {
      filename: 'script.min.js', // result(end)
    }
  }))
  .pipe(app.gulp.dest(app.path.build.js))
  .pipe(app.plugins.sync.stream());
}

