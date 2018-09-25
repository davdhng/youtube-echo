const {app, BrowserWindow, ipcMain, Tray, Menu} = require('electron');
const path = require('path');

let tray;
let window;

// Don't show the app in the doc

app.on('ready', () => {
  createTray()
  createWindow()
})

const iconPath = path.join(__dirname, 'icon-48.png');

const createTray = () => {
  tray = new Tray(iconPath);
  tray.setToolTip('blabla');
  tray.setContextMenu(Menu.buildFromTemplate([{
    label: 'Exit',
    click: () => {
      window.destroy();
      app.quit()
    }
  }]))
  tray.on('click', function (event) {
    toggleWindow()
  });
}

const getWindowPosition = () => {
  const windowBounds = window.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y - trayBounds.height - 425);

  return {x: x, y: y};
}



const createWindow = () => {
  window = new BrowserWindow({
    width: 420,
    height: 455,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    type: 'toolbar',
    useContentSize: true,
    skipTaskbar: true,
    webPreferences: {
      backgroundThrottling: false
    }
  })
  window.loadURL(`file://${path.join(__dirname, 'index.html')}`)

  // Hide the window when it loses focus
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })
}

const toggleWindow = () => {
  window.isVisible() ? window.hide() : showWindow();
}

const showWindow = () => {
  const position = getWindowPosition();
  window.setPosition(position.x, position.y, false);
  window.show();
}

ipcMain.on('show-window', () => {
  showWindow()
})
