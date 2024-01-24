import replace from "gulp-replace"; // search and replacement
import plumber from "gulp-plumber"  // review,view all errors
import notify  from "gulp-notify";  // help messages, hints
import sync    from "browser-sync"; // add local server
import newer   from "gulp-newer";   // review results, if is new result, add in build file else not add
import ifPlug  from "gulp-if"       // add (if else) in gulp file and tasks

// export objects
export const plugins = {
  replace: replace,
  plumber: plumber,
  notify:  notify,
  sync:    sync,
  newer:   newer,
  if: ifPlug
}
