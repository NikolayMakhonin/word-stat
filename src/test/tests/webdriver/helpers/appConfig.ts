/* eslint-disable no-process-env,prefer-destructuring */
if (!process.env.APP_CONFIG) {
	console.error('Environment variable APP_CONFIG is not defined', __filename)
	throw new Error('Environment variable APP_CONFIG is not defined')
}

export default require(`../../../../../configs/${process.env.APP_CONFIG}`)
