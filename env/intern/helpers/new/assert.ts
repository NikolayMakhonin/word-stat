import {findAll, findFirst, findSingle, wait} from './find'
import {end} from './find-base'
import {assert, getCurrentState, getTextSingle, getValueSingle, iter, run} from './index'

export const assertCount = iter(function *assertCount(
	countOrFunc: number | ((count: number) => boolean),
	selectorOrArray?: string | string[],
	indexOrArray?: number | number[],
	waitTime?: number,
) {
	if (!selectorOrArray) {
		const context = run(o => o).context
		if (typeof countOrFunc === 'function') {
			if (!countOrFunc(context.length)) {
				assert.fail(`count == ${context.length}`)
			}
		} else {
			assert.strictEqual(countOrFunc, context.length)
		}
		return
	}

	yield findAll(selectorOrArray, indexOrArray, waitTime)
	yield assertCount(countOrFunc)
	yield end()
})

export const assertSingle = iter(function *assertSingle(
	selectorOrArray?: string | string[],
	indexOrArray?: number | number[],
	waitTime?: number,
) {
	yield findSingle(selectorOrArray, indexOrArray, waitTime)
	yield end()
})

export const assertFirst = iter(function *assertFirst(
	selectorOrArray?: string | string[],
	indexOrArray?: number | number[],
	waitTime?: number,
) {
	yield findFirst(selectorOrArray, indexOrArray, waitTime)
	yield end()
})

export const assertWait = iter(function *assertWait(
	func: () => boolean|Iterator<any, boolean>,
	timeout?: number,
	description?: string,
	delayPerIteration?: number,
) {
	if (timeout == null) {
		timeout = getCurrentState().findTimeout
	}
	const result = yield wait(func, timeout, delayPerIteration || 50)
	if (!result) {
		throw new Error(`assertWait timeout (${timeout}): ${description || ''}`)
	}
})

export const assertNone = iter(function *assertNone(
	selectorOrArray: string | string[],
	indexOrArray?: number | number[],
	waitTime?: number,
) {
	return yield assertWait(function *_assertNone() {
		const elements = yield findAll(selectorOrArray, indexOrArray, 0)
		yield end()
		return elements.length === 0
	}, waitTime, `${selectorOrArray}`)
})

export const assertText = iter(function *assertText(checkText: string|((value: string) => boolean)) {
	const text = yield getTextSingle()
	if (typeof checkText === 'function') {
		assert.ok(checkText(text), text)
	} else {
		assert.strictEqual(text, checkText)
	}
})

export const assertValue = iter(function *assertValue(checkValue: any|((value: any) => boolean), propertyName?: string) {
	const value = yield getValueSingle(propertyName)
	if (typeof checkValue === 'function') {
		assert.ok(checkValue(value), value + '')
	} else {
		assert.strictEqual(value, checkValue)
	}
})
