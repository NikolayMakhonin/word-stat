const {register} = require('../../../babel/helpers')
const babelrc = require('../../../babel/configs/mocha')

register(babelrc)

require('../../register-tests')

require('webrain/dist/js/main/common/test/register')

// // eslint-disable-next-line no-unused-vars
// const {unhandledErrors, exit} = require('webrain/dist/js/main/common/test/unhandledErrors')
//
// unhandledErrors(function (...args) {
// 	console.error(...args)
// 	// assert.throwAssertionError(null, null, 'unhandled error')
// 	// exit()
// })
