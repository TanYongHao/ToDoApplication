const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 860,
    height: 690
  })

  win.loadFile('index.html')
  win.removeMenu();
}

app.whenReady().then(() => {
  createWindow()
})
