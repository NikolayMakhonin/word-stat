/* eslint-disable object-curly-newline,prefer-template,no-process-env */
const {terser} = require('rollup-plugin-terser')
const istanbul = require('rollup-plugin-istanbul')
// const globals = require('rollup-plugin-node-globals')
// const builtins = require('rollup-plugin-node-builtins')
const resolve  = require('rollup-plugin-node-resolve')
const commonjs  = require('rollup-plugin-commonjs')
const nycrc  = require('../../nyc.config')
const replace = require('rollup-plugin-replace')
const {fileExtensions} = require('../common/helpers')
const metric = require('./metric')
const babel = require('./babel')
const dedupe = importee => /^(svelte|@babel|core-js[^\\/]*|regenerator-runtime)([\\/]|$)/.test(importee)

if (!process.env.APP_CONFIG) {
	console.error('Environment variable APP_CONFIG is not defined', __filename)
	throw new Error('Environment variable APP_CONFIG is not defined')
}

const appConfig = require(`../../configs/${process.env.APP_CONFIG}`)
const mode = process.env.NODE_ENV

const plugins = {
	babel   : babel.rollup,
	istanbul: (options = {}) => istanbul({
		...nycrc,
		...options,
	}),
	// globals    : (options = {}) =>globals(options),
	// builtins   : (options = {}) =>builtins(options),
	// resolve: (options = {}) => resolve({
	// 	extensions: [...fileExtensions.js],
	// 	// preferBuiltins      : true,
	// 	// customResolveOptions: {
	// 	// 	moduleDirectory: 'node_modules',
	// 	// 	basedir        : process.cwd(),
	// 	// },
	// 	...options
	// }),
	replace: (options = {}) => replace({
		APP_CONFIG_PATH       : require.resolve('../../configs/' + process.env.APP_CONFIG).replace(/\\/g, '/'),
		'process.env.NODE_ENV': JSON.stringify(mode),
		...options,
	}),
	resolve: (options = {}) => resolve({
		extensions: [...fileExtensions.js, ...fileExtensions.ts],
		dedupe,
		// preferBuiltins      : true,
		// customResolveOptions: {
		// 	// moduleDirectory: 'node_modules',
		// 	// preserveSymlinks: false,
		// 	paths          : [path.resolve(process.cwd(), 'node_modules')],
		// 	pathFilter(pkg, path, relativePath) {
		//
		// 		return relativePath
		// 	}
		// },
		...options,
	}),
	resolveTs: (options = {}) => resolve({
		extensions: [...fileExtensions.ts],
		dedupe,
		...options,
	}),
	commonjs: (options = {}) => commonjs({
		extensions: [...fileExtensions.js, ...fileExtensions.ts],
		// namedExports: {
		// 	'node_modules/chai/index.js': ['assert', 'expect']
		// }
		// include   : 'node_modules/**',
		...options,
	}),
	terser: (options = {}) => terser({
		mangle: false,
		module: false,
		ecma  : 5,
		output: {
			max_line_len: 50,
		},
		sourcemap: {
			content: 'inline',
			url    : 'inline',
		},
		...options,
	}),
	metricStart: metric.metricStart,
	metricEnd  : metric.metricEnd,
}

plugins.resolveWebrain = (options = {}) => plugins.resolveTs({
	only: ['webrain', /\bwebrain\/src\/main\/.*$/],
	// preferBuiltins: false,
	...options,
})

// noinspection PointlessBooleanExpressionJS
module.exports = {
	plugins,
	libs({dev = false, legacy = true}) {
		return [
			plugins.babel.minimal({
				compact: true,
			}),
			// plugins.replace(),
			plugins.resolve({
				browser: true,
			}),
			plugins.commonjs(),
			legacy && plugins.babel.browser({
				compact: true,
			}),
			!dev && plugins.terser(),
		]
	},
}
