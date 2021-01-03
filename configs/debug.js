const base = require('./base')

module.exports = {
	// base
	...base,
	packageName: `${base.packageName}-debug`,

	type : 'debug',
	tests: {

	},
}
