/* tslint:disable:no-var-requires */
const base = require('./base')

module.exports = {
	// base
	packageName: `${base.packageName}-preprod`,

	type: 'preprod',
	tests: {
		intern: {
			staticPort: 3014,
			serverPort: 3024,
			socketPort: 3034,
		},
	},
}
