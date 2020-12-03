/* eslint-disable no-process-env,func-name-matching */
// noinspection NpmUsedModulesInstalled
import * as sapper from 'SAPPER_MODULE/server'
// noinspection NpmUsedModulesInstalled
import appConfig from 'APP_CONFIG_PATH'

import compression from 'compression'
// import polka from 'polka'
import express from 'express'
import sirv from 'sirv'
import path from 'path'
import './initWebrain'
import {LogLevel, logger} from '@flemist/web-logger/node/mjs'

try {
	logger.init({
		appName          : appConfig.appName,
		appVersion       : appConfig.appVersion,
		logUrls          : appConfig.logUrls,
		logDir           : path.resolve('tmp/logs'),
		logFileName      : 'server.log',
		appState         : {...appConfig},
		writeToFileLevels: LogLevel.Any,
		filter(logEvent) {
			if (logEvent.messagesOrErrors && logEvent.messagesOrErrors.length) {
				const first = logEvent.messagesOrErrors[0]
				if (typeof first === 'string') {
					if (/ExperimentalWarning: Package name self resolution is an experimental feature/.test(first)) {
						return false
					}
				}
			}

			return true
		},
	})
} catch (ex) {
	console.error(ex)
	throw ex
}

const dev = appConfig.sapper.buildMode === 'development'
// const isExport = process.env.npm_lifecycle_event === 'build:sapper:export'
// if (isExport) {
// 	console.debug('Export mode')
// }

console.debug('PORT=', process.env.PORT)
console.debug('NODE_ENV=', process.env.NODE_ENV)

const server = express()
server.disable('x-powered-by')
server
	.use(
		appConfig.sapper.baseUrl,
		compression({threshold: 0}),
		sirv('static', {dev}),
		// Fix sapper template.html for Chrome App
		function useApp(req, res, next) {
			const {end} = res
			res.end = function resEnd(body, ...rest) {
				if (typeof body === 'string' && body.startsWith('<!doctype')) {
					body = body.replace(
						/navigator\.serviceWorker\.register\(['"][\w/]+\/service-worker\.js['"]\);?/g,
						' { try { $& } catch (ex) { console.log(ex.message) } } ',
					)
				}
				return end.call(this, body, ...rest)
			}
			next()
		},
		sapper.middleware(),
	)
	.listen(appConfig.sapper.port, err => {
		if (err) {
			console.error('error', err)
		}
	})
