/* eslint-disable array-bracket-newline,no-process-env */
if (!process.env.APP_CONFIG) {
	console.error('Environment variable APP_CONFIG is not defined', __filename)
	throw new Error('Environment variable APP_CONFIG is not defined')
}

const appConfig = require(`../../../configs/${process.env.APP_CONFIG}`)

// https://developer.chrome.com/apps/manifest
module.exports = {
	// Required:
	manifest_version: 2,
	name            : appConfig.appName,
	version         : appConfig.appVersion,
	app             : {
		background: {
			page: 'background.html',
		},
	},

	// Recommended
	// default_locale: 'en',
	description: appConfig.description,
	icons      : {
		'512': 'img/icons/appicon512.png',
		'256': 'img/icons/appicon256.png',
		'128': 'img/icons/appicon128.png',
		'16' : 'img/icons/appicon16.png',
		'32' : 'img/icons/appicon32.png',
		'60' : 'img/icons/appicon60.png',
		'64' : 'img/icons/appicon64.png',
		'90' : 'img/icons/appicon90.png',
	},

	// Optional
	offline_enabled: true,
	permissions    : [
		'storage',
		'webview',
		'fullscreen',
		'notifications',
	],
	webview: {
		partitions: [
			// In this example, any <webview partition="static"> or
			// <webview partition="persist:static"> will have access to
			// header.html, footer.html, and static.png.
			{
				name                : 'app',
				accessible_resources: ['*.*'],
			},
		],
	},
}
