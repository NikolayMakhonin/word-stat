/* tslint:disable:no-var-requires */
const base = require('./base')

module.exports = {
	// base
	...base,
	packageName: `${base.packageName}-demo`,

	type : 'demo',
	tests: {
		intern: {
			staticPort: 3011,
			serverPort: 3021,
			socketPort: 3031,
		},
	},
}
