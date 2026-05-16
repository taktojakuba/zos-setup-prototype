const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  runScript: (scriptName) => ipcRenderer.invoke('run-script', scriptName),
});