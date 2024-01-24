import fileinclude from "gulp-file-include";    // add @@includes
import webpNosvg   from "gulp-webp-html-nosvg"; // add source webp
import versionNum  from "gulp-version-number";  // remove cache in browser
import pug         from "gulp-pug";             // use pug (html pugin)

export const html = () => {
  return app.gulp.src(app.path.src.html)
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: "HTML",
      message: "Error: <%= error.message %>"
    })
  ))
  // .pipe(fileinclude())   // if use html , not pug!!
  .pipe(pug({
    // minify html file
    pretty: true,
    // add info in terminal, what file is use
    verbose: true
  }))
  .pipe(app.plugins.replace(/@img\//g, 'img/'))

  // if is build file else continue
  .pipe(app.plugins.if(app.isBuild, webpNosvg()))
  .pipe(app.plugins.if(app.isBuild, versionNum({
    'value' : '%DT%',
    'append' : {
      'key' : '_v',
      'cover' : 0,
      'to' : [
        'css',
        'js',
      ]
    },
    'output' : {
      'file' : 'gulp/version.json'
    }
  })))
  .pipe(app.gulp.dest(app.path.build.html))
  .pipe(app.plugins.sync.stream());
}
