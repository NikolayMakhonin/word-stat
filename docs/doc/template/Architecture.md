App template created based on [sapper template](https://github.com/sveltejs/sapper-template)

### Technologies used

* UI
    * [sapper](https://sapper.svelte.dev/) + [svelte](https://svelte.dev/)
* JavaScript
    * [TypeScript](https://www.typescriptlang.org/)
    * [babel](https://babeljs.io/) + [corejs](https://github.com/zloirock/core-js)    
* CSS
    * [postcss](https://postcss.org/)
    * [postcss-js-syntax](https://github.com/NikolayMakhonin/postcss-js-syntax)
* Testing
    * [karma](https://karma-runner.github.io/) + [mocha](https://mochajs.org/) - for test JS modules in browsers
    * [mocha](https://mochajs.org/) - for test JS modules in Node.js 
    * [intern](https://theintern.io/) + [leadfoot](https://github.com/theintern/leadfoot) + [mocha](https://mochajs.org/) - for end-to-end UI tests
* Create Installer
    * [electron-builder](https://www.electron.build/)

### Architecture

The basic principle of the architecture is to make the application as dependent as possible only on the browser and at a minimum on other technologies, operating systems and devices. This approach allows you to create cross-platform applications with maximum common code. Therefore, for example, the capabilities of the Electron technology in this template are limited: it is forbidden to run Node.js code from the browser directly. The browser interacts with Node.js via IPC messages (see `ipcRenderer` and` ipcMain`)
