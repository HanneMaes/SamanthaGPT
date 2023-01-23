// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut} = require('electron')
const path = require('path')

let mainWindow // create mainWindow here so I can call if from within every function

windowVisible = false
windowFocussed = false

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#c44524',
      symbolColor: '#f0d6b4',
      height: 30
    },
  })

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL('https://chat.openai.com/chat')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  // open, hide windows on shortcut
  globalShortcut.register('CommandOrControl+space', () => {

    // show or hide the window
    if (windowVisible) {
      mainWindow.hide()
    } else {
      createWindow()
    }
    windowVisible = !windowVisible

  })

  // app.on('activate', function () {
  //   // On macOS it's common to re-create a window in the app when the
  //   // dock icon is clicked and there are no other windows open.
  //   if (BrowserWindow.getAllWindows().length === 0) createWindow()
  // })
})

// // keep track is the window is focussed on not
// mainWindow.on('focus', () => {
//     console.log('The main window has gained focus')
//     windowFocussed = true
// })
// mainWindow.on('blur', () => {
//     console.log('The main window has lost focus')
//     windowFocussed = false
// })

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
