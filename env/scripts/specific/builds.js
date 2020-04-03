const {run, singleCall} = require('../helpers/helpers')
const common = require('../common')

const buildMjs = singleCall(async appConfigType => {
	await run(`shx rm -rf dist/${appConfigType}/mjs/`)
	await run(`shx mkdir -p dist/${appConfigType}/mjs/`)
	await run(`babel src -x .js -x .ts --out-dir dist/${appConfigType}/mjs/ --no-babelrc --config-file ./env/babel/configs/dist-mjs.js`)
})
const buildJs = singleCall(async appConfigType => {
	await run(`shx rm -rf dist/${appConfigType}/js/`)
	await run(`shx mkdir -p dist/${appConfigType}/js/`)
	await run(`babel src -x .js -x .ts --out-dir dist/${appConfigType}/js/ --no-babelrc --config-file ./env/babel/configs/dist-js.js`)
})

const clean = singleCall(appConfigType => run(`shx rm -rf {dist,tmp}/${appConfigType}`))
const build = singleCall(async appConfigType => {
	// await clean(appConfigType)
	// await run('echo      │ node_modules\\core-js-pure\\stable\\set-interval.js (0.2%)\n')
	await Promise.all([
		common.build(),
		buildMjs(appConfigType),
		buildJs(appConfigType),
	])
})

module.exports = {
	clean,
	build,
	buildMjs,
	buildJs,
}
