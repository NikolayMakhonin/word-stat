import {
	webrainOptions,
} from 'webrain'
// noinspection NpmUsedModulesInstalled
import appConfig from 'APP_CONFIG_PATH'

webrainOptions.callState.logCaughtErrors = !!appConfig.dev
