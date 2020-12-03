/* eslint-disable no-process-env */
module.exports = {
	appId      : 'com.app-template',
	packageName: 'app-template',
	appName    : 'App Template',
	appVersion : '0.0.1',
	description: 'App Template',
	logUrls    : [
		// 'http://app-template.logger.com/log.php', // TODO
	],
	installer: {
		// electronVersion: '6.0.11',
		// nodeVersion    : '12.4.0',
	},
	sapper: {
		devServer: (process.env.NODE_ENV || '').trim() === 'development',
		baseUrl  : '/app',
	},
	tests: {
		intern: {

		},
	},
}
