// Modules to control application life and create native browser window
const { app, BrowserWindow, nativeTheme, Menu } = require('electron');
const path = require('path');
const url = require('url');

const windowConfig = {
	frame: false,
	titleBarStyle: ''
};

const browserWindowConfig = {
	// frame: false,
	thickFrame:true,
	autoHideMenuBar: true, 
	//backgroundColor 
	width: 720,
	minWidth: 360,
	height: 430,
	minHeight: 430,
	center: true,
	closable: true,
	skipTaskbar: false,
	resize: true,
	maximizable: true,
	transparent: true,
	webPreferences: {
		preload: path.join(__dirname, 'preload.js'),
		defaultEncoding: `UTF-8` 
	}
};

const template = []; 
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

function createWindow() {
	const params = {};
	params['theme'] = nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
	// Create the browser window.
	const mainWindow = new BrowserWindow(browserWindowConfig);

	// and load the index.html of the app.
	// mainWindow.loadURL('http://localhost:3001/')
	const startUrl = process.env.ELECTRON_START_URL
		? url.format({
				host: process.env.ELECTRON_START_URL,
				query: params
		  })
		: url.format({
				pathname: path.join(__dirname, '/../build/index.html'),
				protocol: 'file:',
				slashes: true,
				query: params
      });
      
	mainWindow.loadURL(startUrl);
	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();

	app.on('activate', function() {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('browser-window-created', function(e, window) {
	// window.removeMenu()
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
