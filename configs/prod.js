/* tslint:disable:no-var-requires */
const base = require('./base')

module.exports = {
	// base
	...base,

	type : 'prod',
	tests: {
		intern: {
			staticPort: 3015,
			serverPort: 3025,
			socketPort: 3035,
		},
	},
}
