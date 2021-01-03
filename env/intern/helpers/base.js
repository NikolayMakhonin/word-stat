/* eslint-disable no-process-env */
const intern = require('intern').default
const path = require('path')
const Command = require('@theintern/leadfoot/Command').default
const urlJoin = require('url-join')

if (!process.env.APP_CONFIG) {
	console.error('Environment variable APP_CONFIG is not defined', __filename)
	throw new Error('Environment variable APP_CONFIG is not defined')
}

const appConfig = require(`../../../configs/${process.env.APP_CONFIG}`)

global.intern = intern

global.pathToUrl = function (...concatPaths) {
	const relativeUrl = `/${
		path.relative(
			process.cwd(),
			path.resolve(...concatPaths),
		)
			.replace(/\\/g, '/')
			.replace(/^\//, '')
	}`

	const url = urlJoin(intern.config.serverUrl, relativeUrl)

	return url
}

Command.prototype.getRoot = function () {
	let root
	let parent = this
	do {
		root = parent
		// eslint-disable-next-line prefer-destructuring
		parent = root.parent
	} while (parent)

	return root
}

Command.prototype.getWithPort = function (port, relativeUrl) {
	const serverUrl = `${intern.config.serverUrl.match(/(https?:\/\/[^:/]+)/)[1]}:${port}/`
	const url = serverUrl + relativeUrl.replace(/^\//, '')
	return this
		.get(url)
}

Command.prototype.getWithInternPort = function (relativeUrl) {
	return this.getWithPort(
		process.env.NODE_ENV === 'development'
			? appConfig.sapper.port
			: appConfig.tests.intern.staticPort,
		relativeUrl,
	)
}

global.delay = delay
function delay(timeMilliseconds) {
	return new Promise(resolve => setTimeout(resolve, timeMilliseconds))
}

Command.prototype.delay = function (timeMilliseconds) {
	return this
		.then(() => delay(timeMilliseconds))
}

Command.prototype.runInWindow = function (windowHandle, func) {
	if (windowHandle) {
		this
			.getCurrentWindowHandle()
			.then(currentWindowHandle => {
				if (currentWindowHandle === windowHandle) {
					return func()
				}

				return this
					.switchToWindow(windowHandle)
					.then(() => func())
					.switchToWindow(currentWindowHandle)
			})
	}

	return func()
}

Command.prototype.call = function (func) {
	return func.call(this, this)
}
