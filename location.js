const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 480,
    height: 420,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  win.loadFile('index.html');
  // Optional: win.webContents.openDevTools(); // uncomment for debugging
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // On macOS apps usually stay open until explicitly quit, but for this app we quit.
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  // On macOS recreate window if none are open
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
