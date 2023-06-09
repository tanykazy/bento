require('update-electron-app')();
// console.log(`Hello from Electron!`);

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    ipcMain.handle('ping', () => 'pong');
    win.loadFile('index.html');
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
