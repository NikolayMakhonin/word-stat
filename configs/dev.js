/* tslint:disable:no-var-requires */
const base = require('./base')

module.exports = {
	// base
	packageName: `${base.packageName}-dev`,

	type  : 'dev',
	tests: {
		intern: {
			staticPort: 3012,
			serverPort: 3022,
			socketPort: 3032,
		},
	},
}
