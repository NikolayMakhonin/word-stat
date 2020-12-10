/* tslint:disable:no-var-requires */
const base = require('./base')

module.exports = {
	// base
	...base,
	appId      : `${base.appId}.demo`,
	packageName: `${base.packageName}-demo`,
	appName    : `${base.appName} Demo`,
	appVersion : `${base.appVersion}`,

	type: 'demo',
	pack: {
		mac: {
			type    : 'dmg',
			notarize: true,
		},
	},
	dev: {
		devPage : false,
		devTools: {
			openAtStart: false,
		},
	},
	tests: {
		intern: {
			staticPort: 3011,
			serverPort: 3021,
			socketPort: 3031,
		},
	},
	sapper: {
		...base.sapper,
		buildMode: 'development',
		port     : base.sapper.devServer ? 3000 : 3001,
		devServer: base.sapper.devServer,
	},
}
