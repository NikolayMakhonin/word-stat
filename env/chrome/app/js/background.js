import appConfig from './appConfig.js'

/* eslint-disable default-case */
function windowOpen(url, _name, options, callback) {
	// docs: https://developer.chrome.com/apps/app_window#method-create
	chrome.app.window.create('index.html', options, appWindow => {
		appWindow.contentWindow.addEventListener('DOMContentLoaded', function () {
			// docs: https://developer.chrome.com/apps/tags/webview#event-newwindow
			appWindow.contentWindow.webview.addEventListener('newwindow', function (e) {
				e.preventDefault()
				windowOpen(e.targetUrl, e.name, {
					outerBounds: {
						width : e.initialWidth,
						height: e.initialHeight,
					},
					icon: null,
				}, newAppWindow => {
					e.window.attach(newAppWindow.contentWindow.webview)
				})
			})

			// docs: https://developer.chrome.com/apps/tags/webview#event-permissionrequest
			appWindow.contentWindow.webview.addEventListener('permissionrequest', function (e) {
				switch (e.permission) {
					case 'fullscreen':
						e.request.allow()
						break
				}
			})

			appWindow.contentWindow.webview.src = url
			// appWindow.contentWindow.webview.loadDataWithBaseUrl(url, '/app')

			if (callback) {
				callback(appWindow)
			}
		})
	})
}

/* eslint-disable default-case */
let entryToLoad = null

function init(launchData) {
	if (launchData && launchData.items && launchData.items.length > 0) {
		entryToLoad = launchData.items[0].entry
	}

	// docs: https://developer.chrome.com/apps/app_window#type-CreateWindowOptions
	const options = {
		frame    : 'none',
		minWidth : 400,
		minHeight: 400,
		width    : 1200,
		height   : 700,
	}

	windowOpen(appConfig.sapper.baseUrl + '/main/tailwind/index.html', 'Main', options)
}

chrome.app.runtime.onLaunched.addListener(init)
