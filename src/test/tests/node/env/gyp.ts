/* eslint-disable no-new-func,@typescript-eslint/no-var-requires */
const {
	test,
	isWin,
} = require('~/build/Release/binding')

declare const describe
declare const it
declare const assert

describe('node > env > gyp', function () {
	it('base', function () {
		console.log(`isWin = ${isWin}`)
		assert.strictEqual(test(), 'Test')
	})
})
