export const server = (done) => {
  app.plugins.sync.init({
    server: {
      baseDir: `${app.path.build.html}`
    },
    notify: false, // massages from browser
    port: 3000,    // local port
  });
}
