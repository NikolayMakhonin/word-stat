const ip = require('ip')

/* eslint-disable no-process-env,prefer-destructuring */
if (!process.env.APP_CONFIG) {
	console.error('Environment variable APP_CONFIG is not defined', __filename)
	throw new Error('Environment variable APP_CONFIG is not defined')
}

const appConfig = require(`../../../configs/${process.env.APP_CONFIG}`)

export const serverIp = ip.address()
export const staticPort = appConfig.tests.intern.staticPort
export const serverPort = appConfig.tests.intern.serverPort
export const socketPort = appConfig.tests.intern.socketPort
export const appConfigType = appConfig.type
