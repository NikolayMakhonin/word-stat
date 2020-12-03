/* tslint:disable:no-var-requires */
const base = require('./base')

module.exports = {
	// base
	appId      : `${base.appId}.dev`,
	packageName: `${base.packageName}-dev`,
	appName    : `${base.appName} Dev`,
	appVersion : `${base.appVersion}`,
	baseUrl    : base.baseUrl,
	logUrls    : base.logUrls,
	installer  : base.installer,

	type: 'dev',
	pack: {
		mac: {
			type    : 'dmg',
			notarize: false,
		},
	},
	dev: {
		devPage : true,
		devTools: {
			openAtStart: false,
		},
		devBuild: false,
	},
	tests: {
		intern: {
			staticPort: 3012,
			serverPort: 3022,
			socketPort: 3032,
		},
	},
	sapper: {
		...base.sapper,
		buildMode: 'development',
		port     : base.sapper.devServer ? 3000 : 3002,
		devServer: base.sapper.devServer,
	},
}
