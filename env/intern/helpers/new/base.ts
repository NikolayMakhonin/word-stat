import {iter, run} from './run'

const intern = require('intern').default
const path = require('path')
export const {assert} = intern.getPlugin('chai')
export const {registerSuite} = intern.getInterface('object')
import keys from '@theintern/leadfoot/keys'
export {keys}

if (!process.env.APP_CONFIG) {
	console.error('Environment variable APP_CONFIG is not defined', __filename)
	throw new Error('Environment variable APP_CONFIG is not defined')
}

const appConfig = require(`../../../../configs/${process.env.APP_CONFIG}`)

export function pathToUrl(...concatPaths: string[]): string {
	const relativeUrl = `/${
		path.relative(
			process.cwd(),
			path.resolve(...concatPaths)
		)
			.replace(/\\/g, '/')
			.replace(/^\//, '')
	}`

	const url = new URL(relativeUrl, intern.config.serverUrl)

	return url.href
}

export const getWithPort = iter(function *getWithPort(port: number, relativeUrl: string) {
	const serverUrl = `${intern.config.serverUrl.match(/(https?:\/\/[^:/]+)/)[1]}:${port}/`
	const url = serverUrl + relativeUrl.replace(/^\//, '')
	return yield run(o => o.get(url))
})

export const getWithInternPort = iter(function *getWithInternPort(relativeUrl: string) {
	return yield getWithPort(
		process.env.NODE_ENV === 'development'
			? appConfig.sapper.port
			: appConfig.tests.intern.staticPort,
		relativeUrl
	)
})

export function delay(timeMilliseconds: number) {
	return new Promise(resolve => setTimeout(resolve, timeMilliseconds))
}

export const runInWindow = iter(function *runInWindow(windowHandle: string, func: () => any) {
	if (windowHandle) {
		const currentWindowHandle = yield run(o => o.getCurrentWindowHandle())
		if (currentWindowHandle === windowHandle) {
			return yield func
		}

		yield run(o => o.switchToWindow(windowHandle))
		yield func
		yield run(o => o.switchToWindow(currentWindowHandle))
	}

	return yield func
})
