/* eslint-disable global-require,object-property-newline,no-process-env,@typescript-eslint/no-var-requires */
import config from 'sapper/config/rollup.js'
import pkg from './package.json'
const appConfig = require(`./configs/${process.env.APP_CONFIG}`)
const rollupPlugins = require('./env/rollup/plugins')

const mode = process.env.NODE_ENV
console.log(`mode = ${mode}`)
const dev = !!(appConfig.dev && appConfig.dev.devBuild || mode === 'development')
const legacy = dev || !!process.env.SAPPER_LEGACY_BUILD
const onwarn = (warning, nextOnWarn) => {
	return warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)
		|| warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)
	|| nextOnWarn(warning)
}

export default {
	client: {
		input                  : config.client.input(),
		output                 : config.client.output(),
		plugins                : rollupPlugins.client({dev, legacy}),
		onwarn,
		preserveEntrySignatures: false,
	},

	server: {
		input   : config.server.input(),
		output  : config.server.output(),
		plugins : rollupPlugins.server({dev, legacy}),
		external: Object.keys(pkg.dependencies)
			.concat(require('module').builtinModules || Object.keys(process.binding('natives'))),
		onwarn,
	},

	serviceworker: {
		input  : config.serviceworker.input(),
		output : config.serviceworker.output(),
		plugins: rollupPlugins.serviceworker({dev, legacy}),
		onwarn,
	},
}
