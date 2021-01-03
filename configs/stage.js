/* tslint:disable:no-var-requires */
const base = require('./base')

module.exports = {
	// base
	...base,

	type : 'stage',
	tests: {
		intern: {
			staticPort: 3013,
			serverPort: 3023,
			socketPort: 3033,
		},
	},
}
