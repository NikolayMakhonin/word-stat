const {run, singleCall} = require('../helpers/helpers')

const buildPolyfill = singleCall(() => run(
	'node env/libs/polyfill/build.js',
	{env: {APP_CONFIG: 'dev'}}
))
const buildLibs = singleCall(() => Promise.all([
	buildPolyfill(),
]))
const buildGyp = singleCall(async () => {
	await run(`node-gyp configure`)
	await run(`node-gyp build`)
})
const clean = singleCall(() => run('shx rm -rf {*.log,__sapper__,build}'))
const build = singleCall(async () => {
	// await clean()
	await Promise.all([
		buildLibs(),
		buildGyp(),
	])
})
const npmCheck = singleCall(() => run('depcheck --ignores="*,@babel/*,@types/*,@metahub/karma-rollup-preprocessor,karma-*,@sapper/*,rdtsc,tslint-eslint-rules,electron,APP_CONFIG_PATH,SAPPER_MODULE,caniuse-lite,browserslist" --ignore-dirs=__sapper__,_trash,dist,docs,static,tmp'))
const lint = singleCall(() => Promise.all([
	npmCheck(),
	// run('eslint --plugin markdown --ext js,md . '),
]))

module.exports = {
	npmCheck,
	lint,
	clean,
	build,
	buildLibs,
	buildPolyfill,
	buildGyp,
}
