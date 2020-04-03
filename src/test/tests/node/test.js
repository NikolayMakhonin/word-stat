import {test} from '../../../main/node/test'

describe('node > test', function () {
	it('test', function () {
		assert.strictEqual(test(), 'test')
	})
})
