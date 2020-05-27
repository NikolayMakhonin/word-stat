import {cssToXPath} from '../../../../modules/common/css-to-xpath'
import {assert} from './base'
import {wait} from './find'
import {getCurrentState, iter, onPushFindFilter, onReleaseFindFilter, run} from './run'
// const cssToXPath = require('css-to-xpath')

function prepareSelector(selector: string) {
	if (selector.startsWith('//')) {
		return selector
	}

	selector = selector.replace(/@([\w\-]+)/g, '[debug_id="$1"]')

	if (/:(has|contains)\(/.test(selector)) {
		const prevSelector = selector
		selector = cssToXPath(selector)
		console.log(`CSS to XPath:\n${prevSelector}\n${selector}`)
	}

	return selector
}

export const findBase = iter(function *findBase(
	selector: string,
	firstOnly?: boolean,
) {
	const preparedSelector = prepareSelector(selector)

	const timeout = getCurrentState().findTimeout

	let items

	yield wait(function *_findBase() {
		items = yield run(o => preparedSelector.startsWith('//') || preparedSelector.startsWith('.//')
			? o.findAllByXpath(preparedSelector)
			: o.findAllByCssSelector(preparedSelector),
		)

		yield run(o => o.end())

		return items.length > 0
	}, timeout)

	// const displayed = []
	// for (let i = 0; i < items.length; i++) {
	// 	const item = items[i]
	// 	const isDisplayed = yield item.isDisplayed()
	// 	if (isDisplayed) {
	// 		displayed.push(item)
	// 		if (firstOnly) {
	// 			break
	// 		}
	// 	}
	// }

	if (firstOnly) {
		assert.ok(items.length > 0, `findBase(firstOnly) not found: ${selector}`)
	}

	yield run(o => o.then(function (_, setContext) {
		setContext(items)
		return items
	}))

	onPushFindFilter(selector)

	return items
})

export const end = iter(function *end() {
	const result = yield run(o => o.end())
	onReleaseFindFilter()
	return result
})
