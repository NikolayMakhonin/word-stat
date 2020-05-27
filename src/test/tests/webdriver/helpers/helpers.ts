export declare const intern: any
export const {registerSuite} = intern.getInterface('object')
export const {assert} = intern.getPlugin('chai')

export function delay(timeMilliseconds) {
	return new Promise(resolve => setTimeout(resolve, timeMilliseconds))
}

export function clickAll(command, selector, delayMs = 100) {
	return command
		.findAllByCssSelector(selector)
		.then(async items => {
			for (const item of items) {
				await item.click()
				await delay(delayMs)
			}
		})
		.end()
}

export function errorPredicate(log) {
	const message = typeof log === 'string' ? log : log.message
	if (typeof message !== 'string') {
		return true
	}

	if (message.indexOf('AbortError: Failed to register a ServiceWorker:') >= 0
		|| message.endsWith('Unhandled rejection: ')
	) {
		return false
	}

	if (/\/locations\/gatewaySoftware\//.test(message)) {
		return false
	}

	if (/\bstatus (of|code) (429|502|504)\b/.test(message)) {
		return false
	}

	if (/\bKeyboardEvent\.keyIdentifier\b/.test(message)) {
		return false
	}

	if (message.indexOf('__sapper__') >= 0) {
		return false
	}

	return true
}
