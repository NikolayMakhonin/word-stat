# Testing

See: Karma, Selenium, Intern - for electron
https://www.npmjs.com/package/karma-electron

# Colors

    index => light %
    0: 0
    1: 5
    2: 6
    3: 7
    4: 9
    5: 11
    6: 14
    7: 17
    8: 20
    9: 25
    10: 30
    11: 37
    12: 45
    13: 55
    14: 67
    15: 82
    16: 100
    
#Electron

## Communication between browser and node without nodeIntegration

* https://github.com/electron/electron/issues/5113#issuecomment-208713736
* https://electronjs.org/docs/api/ipc-renderer
> When you spawn your browser window set the preload option to a script you wish to preload:
> 
> ```
> webPreferences: {
>     nodeIntegration: false,
>     preload: "preload.js"
> }
> ```
> 
> Then in the preload script put in `window.ipc = require('ipc')`. Do your IPC communication in the preload.js and have the code interact with your browser window as if it was loaded using script tags.

