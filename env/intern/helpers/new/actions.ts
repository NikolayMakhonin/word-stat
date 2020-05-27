import {assertValue} from './assert'
import {keys} from './base'
import {findAll} from './find'
import {end} from './find-base'
import {getValueSingle} from './get'
import {iter, run} from './run'

export const findAction = iter(function *findAction(
	action: () => any,
	selectorOrArray?: string | string[],
	indexOrArray?: number | number[],
	waitTime?: number,
) {
	if (!selectorOrArray) {
		return yield action()
	}

	yield findAll(selectorOrArray, indexOrArray, waitTime)
	const result = yield action()
	yield end()

	return yield result
})

export const click = iter(function *click(
	selectorOrArray?: string | string[],
	indexOrArray?: number | number[],
	waitTime?: number,
) {
	return yield findAction(() => run(o => o.click()), selectorOrArray, indexOrArray, waitTime)
})

export const pressKeys = iter(function *pressKeys(keys: string | string[]) {
	return yield run(o => o.pressKeys(keys))
})

/** @deprecated Not worked correctly - the value restored sometimes after clear and switch focus to other element */
export const clearValue = iter(function *clearValue(
	selectorOrArray?: string | string[],
	indexOrArray?: number | number[],
	waitTime?: number,
) {
	yield findAction(() => run(o => o.clearValue()), selectorOrArray, indexOrArray, waitTime)
	yield assertValue(o => !o)
})

export const clearTextInput = iter(function *clearTextInput(
	selectorOrArray?: string | string[],
	indexOrArray?: number | number[],
	waitTime?: number,
) {
	const value = yield getValueSingle()
	if (!value) {
		return
	}

	yield findAction(() => run(o => o.pressKeys(
		`${keys.CONTROL }a${ keys.CONTROL }${keys.BACKSPACE}`,
	)), selectorOrArray, indexOrArray, waitTime)

	yield assertValue(o => !o)
})
