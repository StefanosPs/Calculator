# Calculator

> This project is a simple calculator just for fun.

**This is work in progress**

<!-- ## Getting started
```sh
$ cp .env.sample .env
``` -->

## Development

```sh
# Runs the app in the development mode with electron.
yarn start

# Launches the test runner in the interactive watch mode.
yarn test

#Builds the app for production to the `build` folder.
yarn build

```

## Electron Build

```bash
$ docker run --rm -ti \
 --env ELECTRON_CACHE="/root/.cache/electron" \
 --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
 -v ${PWD}:/project \
 -v ${PWD##*/}-node-modules:/project/node_modules \
 -v ~/.cache/electron:/root/.cache/electron \
 -v ~/.cache/electron-builder:/root/.cache/electron-builder \
 electronuserland/builder:wine

$ yarn package-linux
$ yarn package-win
```
