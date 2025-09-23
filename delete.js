const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,  // recommended for security
      nodeIntegration: false,  // recommended for security
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('delete-files', async () => {
  const targetDir = 'C:\\user data';

  try {
    const files = await fs.promises.readdir(targetDir);

    for (const file of files) {
      const filePath = path.join(targetDir, file);
      const stat = await fs.promises.stat(filePath);

      if (stat.isFile()) {
        await fs.promises.unlink(filePath);
      }
    }

    return { success: true, message: 'All files deleted successfully.' };
  } catch (error) {
    return { success: false, message: error.message };
  }
});
