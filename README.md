# Electron + SvelteKit + Tailwind
## Screenshots :camera:
<div align="center">
    <img src="https://github.com/DogFoxX/assets/blob/master/electron-sveltekit-template/electron-sveltekit-dark.png?raw=true" width=45%>
    <img src="https://github.com/DogFoxX/assets/blob/master/electron-sveltekit-template/electron-sveltekit-light.png?raw=true" width=45%>
</div>

## Features
- Create a Desktop app today with SvelteKit and make it repsonsive with Tailwind
- Electron is already setup in a way for you to create API's that you can use in any of your Svelte components.
  - See the API's in this template [here](#electron-api)

## Getting Started
### Clone the repo
```
npx degit "https://github.com/DogFoxX/electron-sveltekit-tailwind" "<folder-name>"
```
Change `<folder-name>` to the directory (without <>) you wish to clone this repo into.

### Install all dependencies
```
npm install
```

### Start in Development
```
npm run dev
```

### Build your app
```
npm run build
```

### Deploy your app
```
npm run deploy
```
If deploying to github releases, change the `token` inside `electron-builder.json` to your github access token.
Make sure that `electron-builder.json` is excluded in `.gitignore` before deploying.

Alternatively, remove the `token` property and set your github access token as an ENV variable.

Open a new bash terminal and run
```
export GH_TOKEN=YOURTOKEN
```
## Electron API
Inside the `electron` folder you will find the `preload.cjs` which contains some APIs that we use in this template.

### Theme Switching
- `theme.set(themeMode);`
  - Call the function in any of your components.
  - `themeMode`: String "dark", "light" or "system"
  - Define your theme colors in `src/lib/css/theme-colors.css`
- `theme.get();` Get the current theme mode from electron-store

### Window Actions
- This template sets the Electron window to `frame: false` which means a custom titlebar with minimize, maximize and close is created as a Svelte component.
- The buttons call the following APIs
  - `mainWindow.toggleMax();` toggles the window to maximized or restored
  - `mainWindow.minimze();` minimizes the window
  - `mainWindow.close();` closes the window and exits the app
- `mainWindow.getState();` returns a boolean. Used in the window resized event to check whether the window was maximized or not.
