const electron = require ("electron");
const {app, BrowserWindow, Menu} = require("electron");

// avoid close on object gc
let mainWindow;

require("electron-reload")(__dirname, {
  electron: require('electron-prebuilt')
});

app.on("ready", function() {
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Mighty maps editor"
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // mainWindow.openDevTools();
});

app.on('window-all-closed', function () {
  app.quit();
});
