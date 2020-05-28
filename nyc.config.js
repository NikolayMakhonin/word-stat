/* eslint-disable no-process-env */
if (!process.env.APP_CONFIG) {
	console.error('Environment variable APP_CONFIG is not defined', __filename)
	throw new Error('Environment variable APP_CONFIG is not defined')
}

module.exports = {
	include     : [
		`{src,dist/${process.env.APP_CONFIG}/{js,mjs}}/main/**/*.{js,ts}`,
		`{src,dist/${process.env.APP_CONFIG}/{js,mjs}}/test/**/src/**/*.{js,ts}`,
	],
	exclude     : ['**/v8/**/*'],
	reporter    : ['json'],
	'temp-dir'  : `./tmp/${process.env.APP_CONFIG}/coverage/nyc/tmp`,
	'report-dir': `./tmp/${process.env.APP_CONFIG}/coverage/nyc/json`
}
