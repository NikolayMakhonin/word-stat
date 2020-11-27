// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unused-vars
// TODO uncomment it after this pull merged: https://github.com/sveltejs/eslint-plugin-svelte3/pull/74
// const svelteCompiler = require('svelte/compiler')

module.exports = {
	'extends': [
		'pro',
		// 'plugin:@typescript-eslint/recommended',
		// 'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	rules: {
		// web app only
		'require-await'                    : 'off',
		'prefer-const'                     : 'off',
		'no-lonely-if'                     : 'off',
		'@typescript-eslint/no-unused-vars': 'off',
	},
	env: {
		node: true,
		es6 : true,
	},

	// parser       : 'babel-eslint',
	parser       : '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion                : '2020',
		sourceType                 : 'module',
		allowImportExportEverywhere: false,
		codeFrame                  : true,
		project                    : 'tsconfig.eslint.json',
		// babelOptions               : {
		// 	configFile: './env/babel/configs/minimal.js'
		// },
	},

	plugins: [
		'@typescript-eslint',
		'sonarjs',
		'html',
		'svelte3',
	],
	settings: {
		'html/indent'           : '+tab',
		'html/report-bad-indent': 'error',
		'html/html-extensions'  : ['.html', '.svelte'],
	},

	overrides: [
		{
			files: ['src/*.html'],
			rules: {
				semi                : ['error', 'always'],
				'semi-style'        : ['error', 'last'],
				'prefer-rest-params': 'off',
				'no-var'            : 'off',
				'vars-on-top'       : 'off',
				strict              : ['error', 'global'],
				'comma-dangle'      : 'off',
			},
			env: {
				browser: true,
				es6    : false,
				node   : false,
			},
			parser       : 'espree',
			parserOptions: {
				ecmaVersion: 5,
				sourceType : 'script',
			},
		},
		// TODO uncomment it after this pull merged: https://github.com/sveltejs/eslint-plugin-svelte3/pull/74
		// {
		// 	files: ['**/*.svelte'],
		// 	rules: {
		//
		// 	},
		// 	processor: 'svelte3/svelte3',
		// 	parser   : 'espree',
		// 	env      : {
		// 		browser: true,
		// 		node   : false,
		// 	},
		// 	settings: {
		// 		'svelte3/preprocess': content => {
		// 			content = content.replace(/<style-jss?(\s[^]*?)?>.*?<\/style-jss?>/sg, '')
		// 			return content
		// 		},
		// 		'svelte3/ignore-warnings': warn => {
		// 			return warn.code === 'unused-export-let'
		// 				|| warn.code === 'a11y-missing-attribute'
		// 				|| warn.code === 'a11y-img-redundant-alt'
		// 				|| warn.code === 'a11y-label-has-associated-control'
		// 				|| warn.code === 'a11y-media-has-caption'
		// 		},
		// 	},
		// },
	],
}
