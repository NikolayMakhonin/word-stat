import {assertWait} from './assert'
import {pathToUrl, runInWindow} from './base'
import {TLog, TLogPredicate} from './contracts'
import {end, findBase} from './find-base'
import {loadScript} from './load-script'
import {getAllLogs, printDebugInfo} from './log'
import {iter, run} from './run'
const intern = require('intern').default
const {assert: assertBase} = intern.getPlugin('chai')

const noErrorTypes = ['debug', 'info', 'log', 'verbose']
function errorPredicateDefault(log: TLog): boolean {
	if (!log || typeof log === 'object'
		&& typeof log.message === 'object'
		&& log.message.level
		&& noErrorTypes.indexOf(log.message.level) >= 0
	) {
		return false
	}

	const message = typeof log === 'string' ? log : log.message
	if (typeof message === 'string') {
		if (message.indexOf('/favicon.ico 0:0 Failed to load') >= 0) {
			return false
		}
	}

	return true
}

export const checkLogs = iter(function *checkLogs(errorPredicate: TLogPredicate) {
	const logs = yield getAllLogs()

	const predicate = log => errorPredicateDefault(log) && (!errorPredicate || errorPredicate(log))
	if (logs.some(predicate)) {
		throw new Error(`Browser errors: ${JSON.stringify(logs, null, 4)}`)
	}

	// logs = logs.filter(predicate)
	// if (logs.length) {
	// 	console.log(JSON.stringify(logs, null, 4))
	// }
})

export const checkAfterTestPage = iter(function *checkAfterTestPage(errorPredicate: TLogPredicate) {
	return yield checkLogs(errorPredicate)
})

// region isNewWindow

/* tslint:disable */

function _isNewWindow(id) {
	if (window[id]) {
		return false
	}
	// @ts-ignore
	window[id] = true
	return true
}

/* tslint:enable */

const isNewWindowId = 'cd546a3c65304683a2c76c4db720997f'

export const getIsNewWindow = iter(function *getIsNewWindow(windowHandle?: string) {
	return yield runInWindow(windowHandle, () => run(o => o.execute(_isNewWindow, [isNewWindowId])))
})

export const assertIsNewWindow = iter(function *assertIsNewWindow(windowHandle?: string) {
	const isNewWindow = yield getIsNewWindow(windowHandle)
	assertBase.strictEqual(isNewWindow, true)
})

export const assertIsOldWindow = iter(function *assertIsOldWindow(windowHandle?: string) {
	const isNewWindow = yield getIsNewWindow(windowHandle)
	assertBase.strictEqual(isNewWindow, false)
})

// endregion

export const testPage = iter(function *testPage(func: () => any, errorPredicate: TLogPredicate) {
	try {
		yield assertIsNewWindow()
		yield checkLogs(errorPredicate)
		yield func
		yield assertIsOldWindow()
		yield checkAfterTestPage(errorPredicate)
	} catch (err) {
		printDebugInfo()
		throw err
	}
})

export const testPageWithPolyfill = iter(function *testPageWithPolyfill(func: () => any, errorPredicate: TLogPredicate) {
	return yield testPage(
		function *_testPageWithPolyfill() {
			yield loadScript(pathToUrl('static/libs/polyfill.js'))
			yield checkLogs(errorPredicate)
			yield func
		},
		errorPredicate,
	)
})

export const testNavigate = iter(function *testNavigate(
	selector: string,
	getUrlString: (url: URL) => string,
	expectUrl: string,
	timeout: number = 1000,
) {
	if (selector) {
		yield findBase(selector, true)
		yield run(o => o.click())
		yield end()
	}

	yield assertWait(function *_testNavigate() {
		const url = yield run(o => o.getCurrentUrl())
		return getUrlString(new URL(url)) === expectUrl
	}, timeout, `testNavigate fail: ${expectUrl}`)
})

// export function *validateAll(urlRegex, errorResourcePredicate) {
// 	let resources = yield run(o => o.executeAsync(browserDebug.validateAll))
//
// 	resources = resources || []
// 	if (errorResourcePredicate) {
// 		resources = resources.filter(resources)
// 	}
//
// 	if (resources && resources.length) {
// 		throw new Error(`Error validate resources:\r\n${JSON.stringify(resources, null, 4)}`)
// 	}
// }
