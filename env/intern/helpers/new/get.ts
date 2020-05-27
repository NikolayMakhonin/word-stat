import {assert} from './base'
import {findSingle} from './find'
import {end} from './find-base'
import {isRoot, iter, run} from './run'

export const getTextSingle = iter(function *getTextSingle() {
	const texts = yield run(o => o.getVisibleText())
	assert.ok(texts)
	assert.strictEqual(texts.length, 1)
	return texts[0]
})

export const getValueSingle = iter(function *getValueSingle(propertyName?: string) {
	const values = yield run(o => o.getProperty(propertyName || 'value'))
	assert.ok(values)
	assert.strictEqual(values.length, 1)
	return values[0]
})

export const getVisibleText = iter(function *getVisibleText() {
	const _isRoot = isRoot()

	if (_isRoot) {
		yield findSingle('html')
	}

	const text = yield run(o => o.getVisibleText())

	if (_isRoot) {
		yield end()
	}

	return text.join('\n')
})
