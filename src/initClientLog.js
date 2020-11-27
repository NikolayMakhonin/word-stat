import {logger, LogLevel} from '@flemist/web-logger/browser/mjs'
// noinspection NpmUsedModulesInstalled
import appConfig from 'APP_CONFIG_PATH'
import {getUserAgent} from './main/browser/helpers/system-info'

try {
	logger.init({
		appName    : appConfig.appName,
		appVersion : appConfig.appVersion,
		logUrls    : appConfig.logUrls,
		logFileName: 'client.log',
		appState   : {...appConfig},
		filter(logEvent) {
			if (logEvent.messagesOrErrors && logEvent.messagesOrErrors.length) {
				const first = logEvent.messagesOrErrors[0]
				if (first) {
					if (first.target
						&& typeof first.target.url === 'string'
						&& first.target.url.indexOf('__sapper__') >= 0
					) {
						return false
					}
				}
				if (typeof first === 'string') {
					if (/<\w+> received an unexpected slot ['"]?default['"]?/.test(first)) {
						return false
					}
					if (/<\w+> was created with unknown prop ['"]?segment['"]?/.test(first)) {
						return false
					}
					if (/ExperimentalWarning: Package name self resolution is an experimental feature/.test(first)) {
						return false
					}
				}
			}

			return true
		},
	})

	logger.subscribe(logEvent => {
		// eslint-disable-next-line no-undef
		if (logEvent.level >= LogLevel.Warning && typeof alert !== 'undefined' && getUserAgent().device.type) {
			// eslint-disable-next-line no-undef,no-alert
			alert(logEvent.consoleString)
		}
	})
} catch (ex) {
	console.error(ex)
	throw ex
}
