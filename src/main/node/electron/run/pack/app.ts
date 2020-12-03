/* tslint:disable:no-var-requires */
import {serveStatic} from '../../helpers/server'
import {init} from '../init'
const { app } = require('electron')
// @ts-ignore
import appConfig from 'APP_CONFIG_PATH'
import path from 'path'

init(app, appConfig, () => {
	const protocolName = 'app'
	app.setAsDefaultProtocolClient(protocolName)
	serveStatic(app, protocolName, 'localhost', `dist/${appConfig.type}/sapper/export`)
	return path.join(protocolName + '://localhost/', appConfig.baseUrl)
})
