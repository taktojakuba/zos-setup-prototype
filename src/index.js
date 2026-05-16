const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { exec } = require('child_process');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.webContents.openDevTools();
};

ipcMain.handle('run-script', async (event, scriptName) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, scriptName);
    exec(`bash "${scriptPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`[${scriptName}] error:`, error.message);
        console.error(`[${scriptName}] stderr:`, stderr);
        reject({ error: error.message });
      } else {
        resolve({ stdout });
      }
    });
  });
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});