import {iter, run} from './run'

/* tslint:disable */

function _openWindow(url, name, features) {
	window.open(url, name, features)
}

/* tslint:enable */

export const openWindow = iter(function *openWindow(width: number, height: number) {
	yield run(o => o.execute(_openWindow, ['about:blank', '', `width=${width},height=${height},menubar=yes,location=no,resizable=yes,scrollbars=yes,status=yes`]))
	// yield run(o => o.get('about:blank'))
	const windows = yield run(o => o.getAllWindowHandles())
	// yield delay(500)
	yield run(o => o.switchToWindow(windows[windows.length - 1]))
})
