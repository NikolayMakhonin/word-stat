/* eslint-disable no-sync */
const fs = require('fs')
const {requireFromString: _requireFromString} = require('require-from-memory')
const postcssRollup = require('rollup-plugin-postcss')
const postcssJsSyntax = require('postcss-js-syntax').default
const postcssNested = require('postcss-nested')
const postcssAutoPrefixer = require('autoprefixer')
const postcssGlobalWrapper = require('postcss-global-nested')
const postcss = require('postcss')
const postcssBeautify = require('perfectionist')
const postcssNano = require('cssnano')
const postcssUrl = require('postcss-url')
const postcssCalc = require('postcss-calc')
require('../../modules/node/require-css')
const {register: registerBabel} = require('../babel/helpers')
const babelrc = require('../babel/configs/postcss-js-syntax')
const {asPromise} = require('../common/helpers')
const requireFromString = (code, filename, options) => _requireFromString(code, filename, {
	logFilter(logEvent) {
		if (logEvent.vars && logEvent.vars.request && (
			logEvent.vars.request.startsWith('@sapper')
			|| logEvent.vars.request === 'encoding'
			// || logEvent.vars.request === '@babel/runtime-corejs3/package.json'
		)) {
			return false
		}
		return true
	},
	...options,
})

// for postcssJsSyntax
registerBabel(babelrc)
// const registerBabel = require('@babel/register')
// registerBabel({
// 	// This will override `node_modules` ignoring - you can alternatively pass
// 	// an array of strings to be explicitly matched or a regex / glob
// 	ignore : ['node_modules'],
// 	// only        : [/.*/],
// 	// babelrcRoots: true
// 	presets: [['@babel/preset-env']],
// 	plugins: [
// 		'@babel/plugin-transform-runtime',
// 		'@babel/plugin-syntax-dynamic-import',
// 		'@babel/plugin-proposal-optional-chaining',
// 		'@babel/plugin-proposal-throw-expressions',
//
// 		['@babel/plugin-proposal-class-properties', {loose: true}],
// 		'@babel/plugin-transform-parameters',
// 		'@babel/plugin-transform-async-to-generator'
// 	]
// })

const syntax = require('postcss-syntax')({
	rules: [
		{
			test: /\.jss$/,
			lang: 'jss'
		}
	],
	jss: {
		parse(content, options) {
			const parsed = postcssJsSyntax.parse(content, {
				requireFromString,
				...options,
				from: `${options.from}.js`
			})
			// console.log(parsed)
			return parsed
		},
		// stringify: postcssJsSyntax.stringify
	}
})

const plugins = [
	// This plugin is necessary and should be first in plugins list:
	postcssNested(),
	// postcssCalc(),
	// postcssGlobalWrapper(),
	postcssAutoPrefixer({
		// see: https://github.com/browserslist/browserslist
		// see: .browserslistrc
	}),
	postcssUrl({
		url(asset, dir, options, decl, warn, result) {
			if (!asset.url.startsWith('/')) {
				return `/app/${asset.url}`
			}
			return asset.url
		}
	}),
	// postcssNested(),
	// postcssGlobalWrapper(),
	// postcssAutoPrefixer({
	// 	// see: https://github.com/browserslist/browserslist
	// 	browsers: [
	// 		'chrome 33',
	// 		'chrome 37',
	// 		'chrome 39',
	// 		'chrome 44',
	// 		'> 1%'
	// 	]
	// }),
	postcssNano({
		preset: [
			'default', {
				discardComments: {
					removeAll: false,
				},
				calc: false,
				// normalizeUnicode: false,
			}
		],
	}),
	// postcssBeautify({
	// 	cascade         : false,
	// 	indentChar      : '\t',
	// 	indentSize      : 1,
	// 	trimLeadingZero : false,
	// 	zeroLengthNoUnit: true
	// }),
]

function rollupCommon(options = {}) {
	return {
		// use: [['sass', nodeSassOptions]],
		// see: https://github.com/postcss/postcss
		plugins,
		...options
	}
}

const instanceJsToCss = postcss(plugins)

// const jsToCssCache = {}
//
// function jsToCss(content, filename, cacheByContentOnly = false) {
// 	const cacheItemContent = jsToCssCache[content]
// 	if (cacheItemContent) {
// 		const cacheItemFile = cacheItemContent[cacheByContentOnly ? '' : filename]
// 		if (cacheItemFile != null) {
// 			// console.log(`jsToCss from cache: ${filename}`)
// 			return cacheItemFile
// 		}
// 	}
//
// 	// console.log(`jsToCss: ${filename}`)
// 	const result = _jsToCss(content, filename)
//
// 	if (cacheItemContent) {
// 		cacheItemContent[cacheByContentOnly ? '' : filename] = result
// 	} else {
// 		jsToCssCache[content] = {[cacheByContentOnly ? '' : filename]: result}
// 	}
//
// 	return result
// }

async function jsToCss(content, filename) {
	let parsedPostcss
	let	parsedCss
	try {
		const result = await instanceJsToCss.process(content, {
			requireFromString,
			parser(code, parseOptions) {
				// console.log('parser: ', code, parseOptions)
				try {
					// console.log(Module._extensions['.js'].toString())
					parsedPostcss = postcssJsSyntax.parse(code, parseOptions)
					return parsedPostcss
				} catch (ex) {
					console.error(ex)
					throw ex
				}
			},
			from: filename.endsWith('.js')
				? filename
				: `${filename}.js`
		})

		parsedCss = result.css
	} catch (ex) {
		console.error(ex)
		console.error(JSON.stringify(parsedPostcss, null, 4))
		throw ex
	}

	return parsedCss
}

const instanceCssToJs = postcss([])

function cssToJs(content, filename) {
	const result = instanceCssToJs.process(content, {
		stringifier(code, builder) {
			try {
				return postcssJsSyntax.stringify(code, builder)
			} catch (ex) {
				console.error(ex)
				throw ex
			}
		},
		from: filename
	})

	const stringified = result.css

	return JSON.parse(stringified)
}

function cssFileToJs(filename) {
	const content = fs.readFileSync(filename, {encoding: 'utf8'})
	return cssToJs(content, filename)
}

async function jsFileToCss(filename) {
	const content = await asPromise(callback => fs.readFile(filename, {encoding: 'utf8'}, callback))
	return jsToCss(content, filename)
}

module.exports = {
	convert: {
		jsToCss,
		cssToJs,
		jsFileToCss,
		cssFileToJs
	},
	instance: instanceJsToCss,
	syntax,
	plugins,
	rollup  : {
		common: rollupCommon,
	}
}
