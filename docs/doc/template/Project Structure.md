### Environment files:
* `/dist` - all compiled files
    * `/dist/dev/electron/pack` - destination of the installer file
* `/docs` - various useful info
* `/env` and `/` - development environment scripts and configs intended for compiling, running the application and tests, etc.
* `/tmp` - all temporary files
* `/test` - all test files

### Sapper framework files:
* `/src/template.html`
* `/src/client.js`
* `/src/server.js`
* `/src/service-worker.js`
* `/src/routes`
* `/src/node_modules`
* `/static`

You can read the sapper documentation [here](https://sapper.svelte.dev/docs)

### App specific files:
* `/configs` - the app specific configs
* `/src/brain` - all app specific inner logic here
* `/main` - not app specific code here. Mostly it is reusable code.
    * `/browser` - browser specific code
    * `/node` - node.js specific code
    * `/common` - the code that can be used in both: browser & node.js
* `/components` - [svelte](https://svelte.dev/) components
    * `/components/app` - app specific components
    * `/components/common` - not app specific (reusable) components
* `/styles` - almost all CSS styles and templates here
    * `/styles/app` - app specific styles
    * `/styles/global` - note app specific (reusable) styles
    * `/styles/helpers` - helpers for quick create CSS styles

### Electron files
* `src/main/node/electron` - electron specific code here
* `env/electron` - [electron-builder](https://www.electron.build/) config - for create app installer
