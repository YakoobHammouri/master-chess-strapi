const path = require("path");

const { app, BrowserWindow, Menu } = require("electron");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: `${__dirname}/uploads/logo3.png`,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL("http://127.0.0.1:1401/admin");
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
