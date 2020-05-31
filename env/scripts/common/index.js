const {deletePaths, reCreateDir} = require('../../common/helpers')
const {run, singleCall} = require('../helpers/helpers')

const buildTypes = singleCall(async () => {
	await reCreateDir('dist/types')
	await run('tsc --outDir dist/types --declaration')
})
const buildIndex = singleCall(async (env, type) => {
	await run(`babel --out-dir ${env}/${type}/ --no-babelrc --config-file ./env/babel/configs/dist-${type}.js -x .ts ${env}/${type}/index.ts`)
})
const buildIndexes = singleCall(async () => {
	await Promise.all([
		buildIndex('browser', 'mjs'),
		buildIndex('browser', 'js'),
		buildIndex('node', 'mjs'),
		buildIndex('node', 'js'),
	])
})
const buildPolyfill = singleCall(() => run(
	'node env/libs/polyfill/build.js',
	{env: {APP_CONFIG: 'dev'}}
))
const buildLibs = singleCall(() => Promise.all([
	buildPolyfill(),
]))
const buildGyp = singleCall(async () => {
	await run('node-gyp configure')
	await run('node-gyp build')
})
const clean = singleCall(() => deletePaths('{*.log,__sapper__}'))
const build = singleCall(() => Promise.all([
	// clean(),
	buildIndexes(),
	buildTypes(),
	buildLibs(),
	buildGyp(),
]))

const lintEs = singleCall(async () => {
	await run('eslint --plugin markdown --ext js,md .')
})

const lintTs = singleCall(async () => {
	await run('tslint --project tsconfig.json --config tslint.json --exclude **/_trash/** src/main/**/*.ts')
})

// Warning - depcheck takes a lot of memory - 13 GB !!
// const npmCheck = singleCall(() => run('depcheck --ignores="*,@babel/*,@types/*,@metahub/karma-rollup-preprocessor,karma-*,@sapper/*,rdtsc,tslint-eslint-rules,electron,APP_CONFIG_PATH,SAPPER_MODULE,caniuse-lite,browserslist" --ignore-dirs=__sapper__,_trash,dist,docs,static,tmp'))
const lint = singleCall(() => Promise.all([
	// npmCheck(),
	lintEs(),
	lintTs(),
]))

module.exports = {
	// npmCheck,
	lint,
	clean,
	build,
	buildLibs,
	buildPolyfill,
	buildIndexes,
	buildGyp,
}
