const { app, BrowserWindow, protocol } = require('electron');
const path = require('path');
const url = require('url');

// Override file path resolver to handle absolute path
app.on('ready', () => {
  protocol.interceptFileProtocol('file', (req, callback) => {
    const requestedUrl = req.url.substr(7);

    if (requestedUrl && !requestedUrl.includes(__dirname)) {
      callback(path.normalize(path.join(__dirname, requestedUrl)));
    } else {
      callback(requestedUrl);
    }
  });
});

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // Open the DevTools.
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
