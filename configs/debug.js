const base = require('./base')

module.exports = {
	// base
	appId      : `${base.appId}.debug`,
	packageName: `${base.packageName}-debug`,
	appName    : `${base.appName} Debug`,
	appVersion : `${base.appVersion}`,
	logUrls    : base.logUrls,
	installer  : base.installer,

	type: 'debug',
	pack: {
		mac: {
			type    : 'dmg',
			notarize: false,
		},
	},
	dev: {
		devPage : true,
		devTools: {
			openAtStart: true,
		},
		devBuild: false,
	},
	tests: {
		intern: {
			staticPort: 3010,
			serverPort: 3020,
			socketPort: 3030,
		},
	},
	sapper: {
		...base.sapper,
		buildMode: 'development',
		port     : base.sapper.devServer ? 3000 : 3000,
		devServer: base.sapper.devServer,
	},
}
