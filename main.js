// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const express = require('express')
const path = require('path')

function createWindow () {
  // Create and start the server.
  const server = express();
  const port = process.env.PORT || 9000;

  server.use(express.static(path.join(__dirname, './')));

  server.listen(port, () => 
    console.log(`App started on http://localhost:${port}`)
  );

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1420,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`http://localhost:${port}`)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
