const windowStateManager = require("electron-window-state");
const contextMenu = require("electron-context-menu");
const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");
const serve = require("electron-serve");
const Store = require("electron-store");
// Uncomment the following code to create a Single Instance app
// This will prevent the use to open the app twice
// and will focus the already open app
// const gotTheLock = app.requestSingleInstanceLock()

// Initialize electron-store
Store.initRenderer();

const serveURL = serve({ directory: "." });
const port = process.env.PORT || 3000;
const dev = !app.isPackaged;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
	// Set default width and height values
	let windowState = windowStateManager({
		defaultHeight: 700,
		defaultWidth: 1000
	});
	
	// Create the browser window.
	mainWindow = new BrowserWindow({
		backgroundColor: "#192127", // Sets background color
		frame: false, // Sets electron window to frameless
		minHeight: 600, // Minimum Height in pixels
		minWidth: 800, // Minimum Width in pixels
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: false,
			devTools: dev,
			preload: `${__dirname}/preload.cjs`
		},
		x: windowState.x, // Sets last x position
		y: windowState.y, // Sets last y position
		width: windowState.width, // Sets last width
		height: windowState.height, // Sets last height
		show: false // Don't show window until ready
	});

	windowState.manage(mainWindow);

	// This block of code is intended for development purpose only.
	// Delete this entire block of code when you are ready to package the application.
	if (dev) {
		// Open the DevTools
		// mainWindow.openDevTools()
		
		// Set the window icon while in development.
		// Not needed when packaged. Replace icon.ico in ./resources with your own.
		// Icon is set in electron-builder.yml
		mainWindow.setIcon('./static/icon.ico');
		
		mainWindow.loadURL(`http://localhost:${port}`);
	};
	
	// Uncomment the following line of code when app is ready to be packaged
	// serveURL(mainWindow);
	
	// Disable Electron Security Warning.
	process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true
	
	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
	
	// Emitted when the window is ready to be shown
	// This helps in showing the window gracefully.
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	});
};

// Set the Context Menu
contextMenu({
	showLookUpSelection: false,
	showSearchWithGoogle: false,
	showCopyImage: false,
	prepend: (defaultActions, params, browserWindow) => [
		{
			label: "Custom item",
		},
	],
});

// Single Instance
// Uncomment the following block of code to make the app Single Instance:
// if (!gotTheLock) {
// 	app.quit()
// }
// else {
// 	app.on('second-instance', () => {
// 		if (mainWindow) {
// 			if (mainWindow.isMinimized()) {
// 				mainWindow.focus();
// 			}
// 			else {
// 				mainWindow.show();
// 			};
// 		};
// 	});
	
// 	app.on('ready', () => {
// 		createWindow();
// 		// Include any other code here. Good place to check for updates when the app starts
// 	});
// };

// If using Single Instance, remove the following code
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	createWindow();
	// Include any other code here. Good place to check for updates when the app starts
});

app.on('activate', function () {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') app.quit();
});

// Theme Toggle
ipcMain.handle("theme-toggle", (e, theme) => {
    nativeTheme.themeSource = theme;
});

// Window States
ipcMain.handle("window/get-state", () => {
	return mainWindow.isMaximized();
});

ipcMain.handle("window/toggle-max", () => {
	if (mainWindow.isMaximized()) { return mainWindow.restore() }
	mainWindow.maximize();
});

ipcMain.handle("window/minimize", () => {
	mainWindow.minimize();
});

ipcMain.handle("window/close", () => {
	mainWindow.close();
});