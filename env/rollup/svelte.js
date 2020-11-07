const path = require('path')
const svelte  = require('rollup-plugin-svelte')
const sveltePreprocess = require('svelte-preprocess')
const svelteThemesPreprocess = require('svelte-themes-preprocess').default
const babelConfigMinimal = require('../babel/configs/minimal')
const {toCachedFunc} = require('./helpers')
const {normalizePath} = require('../common/helpers')
const postcss = require('./postcss')

const transformJsToCss = toCachedFunc(
	({content}) => content,
	async function ({content, filename}) {
		// console.log(`sveltePreprocess: ${filename}\r\n${content}`)
		const parsed = await postcss.convert.jsToCss(content, filename)

		if (parsed == null) {
			console.error(`Error parse ${filename}:\r\n${content}`)
		}

		return {
			code: parsed || '',
		}
	},
)

function rollupCommon(options = {}) {
	const sveltePreprocessInstance = sveltePreprocess({
		transformers: {
			javascript: transformJsToCss,
			// postcss: {
			// 	// see: https://github.com/postcss/postcss
			// 	plugins  : postcss.plugins,
			// 	sourceMap: false // 'inline',
			// }
		},
	})

	const themesPreprocess = svelteThemesPreprocess(
		path.resolve('./src/styles/themes.js'),
		sveltePreprocessInstance,
		{
			lang : 'js',
			debug: {
				// showComponentsIds: true
			},
		},
	)

	const preprocessMarkup = toCachedFunc(
		content => content,
		content => {
			content = content.replace(/^<style-jss?>/mg, '<style type="text/js">')
			content = content.replace(/^<script-ts>/mg, '<script lang="ts">')
			content = content.replace(/^(<\/?(?:style|script))-(?:jss?|ts)\b/mg, '$1')
			return content
		},
	)

	const preprocess = {
		...themesPreprocess,
		markup({content, ...others}) {
			return themesPreprocess.markup({
				content: preprocessMarkup(content),
				...others,
			})
		},
	}

	// eslint-disable-next-line no-unused-vars
	const {babelrc} = options
	delete options.babelrc

	return svelte({
		// preserveComments: true,
		dev       : true,
		// see: https://github.com/Rich-Harris/svelte-preprocessor-demo
		preprocess: {
			...preprocess,
			async style({content, filename, ...others}) {
				if (filename.indexOf('@sapper') >= 0) {
					return {
						code: content,
					}
				}

				const result = await preprocess.style({
					content,
					filename,
					...others,
				})

				// see this bug: https://github.com/sveltejs/svelte/issues/4313
				// Do not let the Svelte create one CSS file and use the same suffixes
				// for the equals component styles. Because the Sapper loads them
				// several times and the order of css rules will be violated
				result.code = `/* ${normalizePath(filename)} */\r\n${result.code}`

				// content: `.disable-equals-css-optimisation: { content: "${
				// 	normalizePath(filename)
				// }"; }\r\n${content}`,
				// console.log(`\r\n${filename}\r\n${result.code}`)

				return result
			},
			// async script({content, filename, attributes}) {
			// 	let prefix = ''
			// 	const match = content.match(/((?:.*\n|^)\s*import\s+\S[^\n]+\n)(.*)/s)
			// 	if (match) {
			// 		prefix = match[1]
			// 		content = match[2]
			// 	}
			//
			// 	const result = await babel.transformAsync(content, {
			// 		filename  : `${filename}.${attributes.lang || 'js'}`,
			// 		babelrc   : !babelrc,
			// 		sourceMaps: true,
			// 		...babelrc,
			// 	})
			//
			// 	result.map.sources[0] = path.basename(filename)
			//
			// 	return {
			// 		code: prefix + result.code,
			// 		map : result.map,
			// 	}
			// }
		},
		onwarn(warning, onwarn) {
			if (warning.code === 'css-unused-selector') {
				return false
			}
			if (warning.code === 'unused-export-let') {
				return false
			}
			if (warning.code.startsWith('a11y-')) {
				return false
			}
			return onwarn(warning)
		},
		...options,
	})
}

module.exports = {
	rollup: {
		common: rollupCommon,
		client: (options = {}) => rollupCommon({
			hydratable: true,
			emitCss   : false,
			babelrc   : babelConfigMinimal,
			...options,
		}),
		server: (options = {}) => rollupCommon({
			emitCss : true,
			generate: 'ssr',
			babelrc : babelConfigMinimal,
			...options,
		}),
	},
}
