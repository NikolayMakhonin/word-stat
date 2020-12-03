/* tslint:disable:no-var-requires */
const base = require('./base')

module.exports = {
	// base
	appId      : `${base.appId}.preprod`,
	packageName: `${base.packageName}-preprod`,
	appName    : `${base.appName} PreProduction`,
	appVersion : `${base.appVersion}`,
	baseUrl    : base.baseUrl,
	logUrls    : base.logUrls,
	installer  : base.installer,

	type: 'preprod',
	pack: {
		mac: {
			type    : 'mas-dev',
			notarize: true,
		},
	},
	tests: {
		intern: {
			staticPort: 3014,
			serverPort: 3024,
			socketPort: 3034,
		},
	},
	sapper: {
		...base.sapper,
		// buildMode: 'development',
		port     : base.sapper.devServer ? 3000 : 3004,
		devServer: base.sapper.devServer,
	},
}
