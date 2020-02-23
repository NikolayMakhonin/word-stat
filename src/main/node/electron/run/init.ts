/* tslint:disable:no-var-requires */
// @ts-ignore
import {App, BrowserWindow, Tray} from 'electron'

import {LogLevel} from '../../../common/log/contracts'
import {logger} from '../../log/LoggerNode'
import {getResourcesPath, getRootPath} from '../helpers/server'
import {appState} from './appState'
import {createWindow as _createWindow} from './mainWindow'
const path = require('path')
const {ipcMain} = require('electron')

export function init(app: App, appConfig: any, prepareStartUrl: () => string) {
	appState.app = app
	appState.appConfig = appConfig

	ipcMain.on('app-config', event => {
		event.returnValue = appState.appConfig
	})
	// app.setPath('userData', path.resolve(process.cwd(), 'tmp/electron/userData'))
	logger.init({
		appName    : appState.appConfig.appName,
		appVersion : appState.appConfig.appVersion,
		logUrl     : appState.appConfig.logUrl,
		appState   : {...appState.appConfig},
		logFilePath: path.resolve(appState.app.getPath('userData'), 'logs/log.txt'),
		writeToFileLevels: LogLevel.Any,
	})

	logger.debug('resourcesPath = ' + getResourcesPath(appState.app))
	logger.debug('rootPath = ' + getRootPath(appState.app))
	process.chdir(getRootPath(appState.app))

	appState.app.enableSandbox()

	const url = prepareStartUrl()
	// const protocolName = 'app'
	// appState.app.setAsDefaultProtocolClient(protocolName)
	// serveStatic(appState.app, protocolName, 'localhost', `dist/${appState.appConfig.type}/sapper/export`)
	// const url = protocolName + '://localhost/app/dev/gmap'

	const createWindow = () => _createWindow(url)

	// This method will be called when Electron has finished
	// initialization and is ready to create browser windows.
	// Some APIs can only be used after this event occurs.
	appState.app.on('ready', () => {
		createWindow()
	})

	appState.app.on('window-all-closed', () => {
		// On macOS it is common for applications and their menu bar
		// to stay active until the user quits explicitly with Cmd + Q
		if (process.platform !== 'darwin') {
			appState.app.quit()
		}
	})
}