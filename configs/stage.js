/* tslint:disable:no-var-requires */
const base = require('./base')

module.exports = {
	// base
	...base,
	packageName: `${base.packageName}-stage`,

	type : 'stage',
	tests: {

	},
}
