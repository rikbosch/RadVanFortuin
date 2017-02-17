'use strict';
const electron = require('electron');
const Config = require('electron-config');

const app = electron.app;
const config = new Config();

config.set('app.version','0.1.0');
console.log(config.path);

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 400,
		backgroundColor: "#254f96",
		title: "Rad van Fortuin",
		icon: `${__dirname}/assets/icon.ico`,
		titleBarStyle: "hidden-inset"
	});

	// win.setMenu(null);
	win.setKiosk(true);
	// win.setAutoHideMenuBar(true);
	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);


	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
