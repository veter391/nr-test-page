import svgSprite from "gulp-svg-sprite";

export const spriteSvg = () => {
  return app.gulp.src(app.path.src.sprite, {})
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: "Svg Sprite",
      message: "Error: <%= error.message %>"
    })
  ))
  .pipe(svgSprite({
    mode:{
      stack: {
        sprite: `../sprite.svg`,
        // create page and icons
        example: true
      }
    },
  }))
  .pipe(app.gulp.dest(`${app.path.build.images}`));
}

