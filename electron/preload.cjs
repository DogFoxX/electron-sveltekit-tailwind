const { ipcRenderer } = require("electron");

// Electron Store
const Store = require("electron-store");

// Initialize theme store
const themeStore = new Store({
	name: "theme",
	defaults: {
		theme: "dark"
	}
});

// Theme mode toggle API
// theme.set(theme mode: "dark", "light", "system")
theme = {
	set: (theme) => {
		// Send theme mode change to main.js
		ipcRenderer.invoke("theme-toggle", (theme));

		// Save theme mode with electron-store
		themeStore.set("theme", theme);
	},
	get: () => {
		// Get the current theme mode from electron-store
		return themeStore.get("theme");
	}
};

mainWindow = {
	getState: () => ipcRenderer.invoke("window/get-state"),
	toggleMax: () => ipcRenderer.invoke("window/toggle-max"),
	minimize: () => ipcRenderer.invoke("window/minimize"),
	close: () => ipcRenderer.invoke("window/close")
};
