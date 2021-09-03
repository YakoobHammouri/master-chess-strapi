const path = require("path");
const url = require("url");
const { app, BrowserWindow, Menu } = require("electron");
const strapi = require("strapi");

// const server = require("./server");
// console.log(`server111`, server);
// server()
//   .then((r) => {
//     console.log(`r`, r);
//   })
//   .catch((err) => {
//     console.log(`object`, err);
//   });

function createWindow() {
  // console.log(`server222`, path.join(__dirname, "..", "build", "index.html"));
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    maximizable: true,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: `${__dirname}/uploads/logo.ico`,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.maximize();

  strapi()
    .start()
    .then(() => {
      console.log(`object1111111111`);
      win.loadURL("http://127.0.0.1:1401/admin");
    })
    .catch((e) => {
      console.log(e);
    });

  // win.loadURL(
  //   url.format({
  //     pathname: "../build/index.html",
  //     //path.join(__dirname, "..", "build", "index.html"),
  //     protocol: "file",
  //     slashes: true,
  //   })
  // );

  win.webContents.openDevTools();
  // win.loadURL("http://127.0.0.1:1401/admin");
  // frame: false;

  // const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Menu.setApplicationMenu(mainMenu);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
