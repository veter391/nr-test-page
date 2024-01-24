import fs        from "fs";
import fonter    from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";


export const otfToTtf = () => {
  // search fonts.otf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: "Fonts",
      message: "Error: <%= error.message %>"
    })))
  // convert to .ttf
  .pipe(fonter({
    formats:['ttf']
  }))
  // adding to folder
  .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
  // search fonts.otf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: "Fonts",
      message: "Error: <%= error.message %>"
    })))
  // convert to .woff
  .pipe(fonter({
    formats:['woff']
  }))
  // adding to build folder
  .pipe(app.gulp.dest(`${app.path.build.fonts}`))
  // search fonts .ttf
  .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
  // conver fonts to .woff2
  .pipe(ttf2woff2())
  // adding to build folder
  .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

export const goWoffs = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.woff`, {})
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: "Fonts",
      message: "Error: <%= error.message %>"
    })))
  // adding to build folder
  .pipe(app.gulp.dest(`${app.path.build.fonts}`))
  .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.woff2`))
  // adding to build folder
  .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

export const fontsStyle = () => {
  // connect fonts to file css
  let fontsFile = `${app.path.srcFolder}/scss/_fonts.scss`;
  // review if exist file fonts.scss
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      // review if exist file for connect fonts
      if (!fs.existsSync(fontsFile)) {
        // if file dont exist, create file
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          // suscribe fonts connections in style file
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'ultrabold') {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'black' || fontWeight.toLowerCase() === 'heavy') {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(fontsFile, `@font-face {\n\tfont-family: '${fontName}';\n\tfont-display: swap;\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n\tsrc: url("../fonts/${fontFileName}.woff2") format('woff2'), url("../fonts/${fontFileName}.woff") format('woff');\n}\r\n`, cb);
            newFileOnly = fontFileName;
          }
        }
      } else {
        // if font.scss file exist, alert message
        console.log("Файл scss/font.scss уже существует. Для обновления файла, его нужно удалить!");
      }
    }
  });
  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() { }
}

