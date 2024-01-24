// primari plugins
import gulp from "gulp";
// secondari plugins
import { path } from "./gulp/config/path.js";
// import common plugins
import { plugins } from "./gulp/config/plugins.js";

// add parameters of gloval variable
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins
}

// import modules
import { copy }   from "./gulp/tasks/copy.js";
import { clear }  from "./gulp/tasks/delet.js";
import { html }   from "./gulp/tasks/html.js";
import { scss }   from "./gulp/tasks/scss.js";
import { js }     from "./gulp/tasks/scripts.js";
import { images } from "./gulp/tasks/images.js";
import { spriteSvg } from "./gulp/tasks/svgSprite.js";
import { otfToTtf , ttfToWoff , goWoffs , fontsStyle } from "./gulp/tasks/fonts.js";
import { server } from "./gulp/tasks/server.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

// waching files
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html); // gulp.series(html, ftp) if requiere add all files direct in ftp server
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

// serie conection fonts
const fonts = gulp.series(otfToTtf, ttfToWoff, goWoffs , fontsStyle);

// primary tasks
const tasks = gulp.series(fonts, gulp.parallel(copy, html, scss , js , images, spriteSvg));

// watch and running tasks
const dev = gulp.series(clear, tasks, gulp.parallel(watcher, server));
const build = gulp.series(clear, tasks);
const deployZIP = gulp.series(clear, tasks, zip);
const deployFTP = gulp.series(clear, tasks, ftp);

export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// runing default tasks
gulp.task('default' , dev);
