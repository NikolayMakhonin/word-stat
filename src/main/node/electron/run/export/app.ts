/* tslint:disable:no-var-requires */
import {serveStatic} from '../../helpers/server'
import {init} from '../init'
const { app } = require('electron')
import path from 'path'

if (!process.env.APP_CONFIG) {
	console.error('Environment variable APP_CONFIG is not defined', __filename)
	throw new Error('Environment variable APP_CONFIG is not defined')
}

const appConfig = require(`../../../../../../configs/${process.env.APP_CONFIG}`)

appConfig.dev = {
	errorNotifications: true,
	devPage           : true,
	devTools          : {
		openAtStart: true,
	},
	devBuild: false,
}

init(app, appConfig, () => {
	const protocolName = 'app'
	app.setAsDefaultProtocolClient(protocolName)
	serveStatic(app, protocolName, 'localhost', `dist/${appConfig.type}/sapper/export`)
	return path.join(protocolName + '://localhost/', appConfig.sapper.baseUrl)
})
