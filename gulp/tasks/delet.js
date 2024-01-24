import del from "del";  // import delet

export const clear = () => {
  return del(app.path.clean);
}
