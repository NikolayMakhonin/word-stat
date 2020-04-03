/* eslint-disable no-process-env,prefer-rest-params */
const path = require('path')

function toCachedFunc(getKey, func) {
	const cache = {}

	return function () {
		const key = getKey.apply(this, arguments)
		const cacheItem = cache[key]
		if (typeof cacheItem !== 'undefined') {
			// console.log('toCachedFunc from cache')
			return cacheItem
		}

		// console.log('toCachedFunc')
		const result = func.apply(this, arguments)

		cache[key] = result

		return result
	}
}

module.exports = {
	toCachedFunc,
}
