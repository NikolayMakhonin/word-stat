import Command from '@theintern/leadfoot/Command'
import Element from '@theintern/leadfoot/Element'
import {delay} from 'webrain'
import {assertCount} from './assert'
import {assert, end, findBase, iter, run, usingFindTimeout} from './index'

// docs:
// https://theintern.io/docs.html#Leadfoot/2/api/Command/command-1
// https://theintern.io/leadfoot/module-leadfoot_Command.html

// ;(Command.prototype as any).pick = function(
// 	this: Command<any>,
// ) {
// 	return this
// 		.then(function() {
// 			;(this.session as any).picked = concatDistinct(
// 				asArray((this.session as any).picked),
// 				asArray(this.context),
// 			)
// 		})
// }
//
// ;(Command.prototype as any).pickApply = function(
// 	this: Command<any>,
// ) {
// 	return this
// 		.then(function(_, setContext) {
// 			setContext(asArray((this.session as any).picked))
// 		})
// }

function asArray<T>(itemOrItems: T | T[] | null | undefined): T[] {
	if (!itemOrItems) {
		return []
	}
	if (!Array.isArray(itemOrItems)) {
		return [itemOrItems]
	}
	return itemOrItems
}

function distinct<T>(arr: T[]): T[] {
	const newArr = []
	for (let i = 0, len = arr.length; i < len; i++) {
		const item = arr[i]
		if (newArr.indexOf(item) < 0) {
			newArr.push(item)
		}
	}
	return newArr
}

function concat<T>(...arrays: T[][]): T[] {
	return [].concat(...arrays)
}

function concatDistinct<T>(...arrays: T[][]): T[] {
	return distinct(concat(...arrays))
}

export const switchToCommand = iter(function *switchToCommand(
	command: Command<any>,
) {
	return yield run(o => o, command)
})

export const filter = iter(function *filter(predicate: (element, index) => boolean) {
	const prevCommand = run(o => o)
	yield end()

	const result = yield run(o => o.then(function(_, setContext) {
		const newContext = prevCommand.context.filter(predicate)
		setContext(newContext)
		return newContext
	}))

	const command = run(o => o)
	; (command as any).filters = (prevCommand as any).filters

	return result
})

export const findMerge = iter(function* findMerge(
	finds: Array<() => any>,
	mergeContexts: (...contexts: Element[][]) => Element | Element[] | null | undefined
		= concatDistinct,
) {
	const contexts = []
	const filters = []
	for (let i = 0, len = finds.length; i < len; i++) {
		const prev = run(o => o)

		const _find = finds[i]
		if (_find || i > 0) {
			yield _find()
		}

		const command = run(o => o)
		contexts.push(asArray(command.context))
		filters.push((command as any).filters)
		yield switchToCommand(prev)
	}

	const prev = run(o => o)

	const result = yield run(o => o.then(function(_, setContext) {
		const newContext = asArray(mergeContexts(...contexts))
		setContext(newContext)
		return newContext
	}))

	const command = run(o => o)
	; (command as any).filters = [...(prev as any).filters || [], filters.filter(o => o && o.length)]

	return result
})

// export const wait = iter(function *wait(func: () => boolean|Iterator<boolean>, timeout: number) {
// 	const startTime = Date.now()
//
// 	while(true) {
// 		const result = yield func
// 		if (result) {
// 			return true
// 		}
// 		if (Date.now() - startTime > timeout) {
// 			yield delay(delayPerIteration)
// 		}
// 	}
//
// 	return false
// })

export const wait = iter(function *wait(func: () => boolean|Iterator<any, boolean>, maxDelay: number, delayPerIteration?: number) {
	if (!delayPerIteration) {
		delayPerIteration = 50
	}

	const countIterations = Math.ceil(maxDelay / delayPerIteration) + 1

	for (let i = 0; i < countIterations; i++) {
		if (i > 0) {
			yield delay(delayPerIteration)
		}

		const result = yield func
		if (result) {
			return true
		}
	}

	return false
})

export const findAll = iter(function *findAll(
	selectorOrArray: string | string[],
	indexOrArray?: number | number[],
	timeout?: number,
) {
	if (timeout != null) {
		return yield usingFindTimeout(() => findAll(selectorOrArray, indexOrArray), timeout)
	}

	if (Array.isArray(selectorOrArray)) {
		return yield findMerge(selectorOrArray.map(selector => {
			return findAll(selector, indexOrArray)
		}))
	}

	if (!selectorOrArray) {
		throw new Error('selectorOrArray is empty')
	}

	if (indexOrArray == null) {
		return yield findBase(selectorOrArray)
	}

	return yield findMerge(
		[
			() => findBase(selectorOrArray),
		],
		o => Array.isArray(indexOrArray)
			? indexOrArray.map(i => getByIndex(o, i))
			: getByIndex(o, indexOrArray),
	)

	function getByIndex(array, index) {
		if (index == null) {
			return array
		}
		if (index >= array.length) {
			throw new Error(`Element not found: ${selectorOrArray}; index (${index}) >= length (${array.length})`)
		}
		return array[index]
	}

	// .find('xpath', `//*[@debug_id="${id}"][${(index || 0) + 1}]`)
})

export const findFirstOrEmpty = iter(function *findFirstOrEmpty(
	selectorOrArray: string | string[],
	indexOrArray?: number | number[],
	waitTime: number = 0,
) {
	return yield findMerge(
		[
			() => findAll(selectorOrArray, indexOrArray, waitTime),
		],
		o => o.length > 0 ? o[0] : null,
	)
})

export const findLastOrEmpty = iter(function *findLastOrEmpty(
	selectorOrArray: string | string[],
	indexOrArray?: number | number[],
	waitTime: number = 0,
) {
	return yield findMerge(
		[
			() => findAll(selectorOrArray, indexOrArray, waitTime),
		],
		o => o.length > 0 ? o[o.length - 1] : null,
	)
})

export const findSingle = iter(function* findSingle(
	selectorOrArray: string | string[],
	indexOrArray?: number | number[],
	waitTime?: number,
) {
	const result = yield findAll(selectorOrArray, indexOrArray, waitTime)
	yield assertCount(1)
	return result
})

export const findFirst = iter(function* findFirst(
	selectorOrArray: string | string[],
	indexOrArray?: number | number[],
	waitTime?: number,
) {
	const result = yield findFirstOrEmpty(selectorOrArray, indexOrArray, waitTime)
	yield assertCount(1)
	return result
})

export const findLast = iter(function* findLast(
	selectorOrArray: string | string[],
	indexOrArray?: number | number[],
	waitTime?: number,
) {
	const result = yield findLastOrEmpty(selectorOrArray, indexOrArray, waitTime)
	yield assertCount(1)
	return result
})
