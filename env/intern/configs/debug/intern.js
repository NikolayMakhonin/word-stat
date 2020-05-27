import {serverIp, sapperPort as staticPort} from '../constants'

export default {
	environments: [
		{
			browserName           : 'chrome',
			version               : '49',
			fixSessionCapabilities: 'no-detect',
			chromeOptions         : {
				args: [
					'--no-sandbox',
					'--headless',
					'--incognito',
					`--unsafely-treat-insecure-origin-as-secure=http://${serverIp}:${staticPort}`,
					`--unsafety-treat-insecure-origin-as-secure=http://${serverIp}:${staticPort}`,
					'--enable-precise-memory-info'
				]
			}
		},
		// {
		// 	browserName: 'firefox'
		// },
		// {
		// 	browserName : 'opera',
		// 	operaOptions: {binary: '/usr/bin/opera'}
		// },
	],
	tunnelOptions: {
		pathname: '/wd/hub',
		hostname: 'localhost',
		port    : 4444,
		logLevel: 'trace',
	},
	serverUrl: `http://localhost:${staticPort}`,
}
