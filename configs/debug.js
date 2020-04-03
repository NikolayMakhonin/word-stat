/* tslint:disable:no-var-requires */
const base = require('./base')

module.exports = {
	// base
	packageName: `${base.packageName}-debug`,

	type  : 'debug',
	tests: {
		intern: {
			staticPort: 3010,
			serverPort: 3020,
			socketPort: 3030,
		},
	},
}
