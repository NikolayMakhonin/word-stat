/* eslint-disable no-process-env */
module.exports = {
	packageName: 'app-template',
	description: 'App Template',
	baseUrl    : '/app',
	logUrls    : [
		// 'http://app-template.logger.com/log.php', // TODO
	],
	installer: {
		// electronVersion: '6.0.11',
		// nodeVersion    : '12.4.0',
	},
	sapper: {
		devServer: (process.env.NODE_ENV || '').trim() === 'development',
	},
	tests: {
		intern: {

		},
	},
}
