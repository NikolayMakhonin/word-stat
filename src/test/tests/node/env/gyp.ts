/* eslint-disable no-new-func,@typescript-eslint/no-var-requires */
const {
	test: _test,
	isWin,
} = require('~/build/Release/binding')

describe('node > env > gyp', function () {
	it('base', function () {
		console.log(`isWin = ${isWin}`)
		assert.strictEqual(_test(), 'Test')
	})
})
