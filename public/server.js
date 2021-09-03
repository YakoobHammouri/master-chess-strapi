module.exports = () =>
  new Promise((r, rej) => {
    try {
      const strapi = require("strapi");
      const app = strapi();
      app.start();
      process.on("SIGINT", () => {
        if (app.server) {
          app.server.close(() => {
            process.exit(0);
          });
        }
      });
      r("ff13333333334534545351");
    } catch (err) {
      console.log(`Error in run Strapi Server : `, err);
      rej(err);
    }
  });
