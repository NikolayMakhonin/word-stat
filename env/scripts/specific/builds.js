const {run, singleCall} = require('@flemist/run-script')
const common = require('../common')
const {reCreateDir, deletePaths} = require('../../common/helpers')

const buildMjs = singleCall(async appConfigType => {
	await reCreateDir(`dist/${appConfigType}/mjs`)
	await run(`babel src -x .js -x .ts --out-dir dist/${appConfigType}/mjs/ --no-babelrc --config-file ./env/babel/configs/dist-mjs.js`)
})
const buildJs = singleCall(async appConfigType => {
	await reCreateDir(`dist/${appConfigType}/js`)
	await run(`babel src -x .js -x .ts --out-dir dist/${appConfigType}/js/ --no-babelrc --config-file ./env/babel/configs/dist-js.js`)
})

const clean = singleCall(appConfigType => deletePaths(`{dist,tmp,src/node_modules/@sapper}/${appConfigType}`))
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
