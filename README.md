# Electron + SvelteKit + Tailwind
## Clone this repo
```
npx degit "https://github.com/DogFoxX/electron-sveltekit-tailwind" "<folder-name>"
```
Change `<folder-name>` to the directory (without <>) you wish to clone this repo into

## Start in development
```
npm run dev
```

## Build your app
```
npm run build
```

## Deploy your app
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