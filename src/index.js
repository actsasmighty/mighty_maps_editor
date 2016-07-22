const electron = require ("electron");
const {app, BrowserWindow, ipcMain, Menu} = require("electron");
const isDev = require("electron-is-dev");

if (isDev) {
  // auto-reload on changes
  require("electron-reload")(__dirname, {
    electron: require("electron-prebuilt")
  });

  // enable debug extension
  require("electron-debug");
}

function updatePreviewHandler (event) {};
function quitHandler (event) {};

// avoid close on object gc
let editorWindow;
let previewWindow;

// event handlers
function handleUpdatePreview() {
  editorWindow.webContents.send("editor-content");
}

ipcMain.on("editor-content", function(event, data) {
  previewWindow.webContents.send("editor-content", data);
});

app.on("ready", function() {
  //
  // menu
  //
  const mainMenu = Menu.buildFromTemplate([
    {
      submenu: [
        {
          label: "Quit",
          click: function() { app.quit() }
        }
      ]
    },
    {
      label: "Actions",
      submenu: [
        {
          label: "Update preview",
          click: handleUpdatePreview
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(mainMenu);

  //
  // editorWindow
  //
  editorWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Editor"
  });

  editorWindow.loadURL("file://" + __dirname + "/editor/index.html");

  //
  // previewWindow
  //
  previewWindow = new BrowserWindow({
    width: 400,
    height: 400,
    title: "Preview"
  });

  previewWindow.loadURL("file://" + __dirname + "/preview/index.html");

  if (isDev) {
    previewWindow.openDevTools()
  }
});

app.on("window-all-closed", function () {
  app.quit();
});
