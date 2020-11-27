const {run, singleCall} = require('@flemist/run-script')
const common = require('../common')
const {reCreateDir, deletePaths} = require('../../common/helpers')

const buildMjs = singleCall(async appConfigType => {
	await reCreateDir(`dist/${appConfigType}/mjs`)
	await run(`cpy "**/*.(css|html|svelte)" "../dist/${appConfigType}/mjs/" --parents --cwd=src`)
	await run(`babel src -x .js -x .ts --out-dir dist/${appConfigType}/mjs/ --no-babelrc --config-file ./env/babel/configs/dist-mjs.js`)
})
const buildJs = singleCall(async appConfigType => {
	await reCreateDir(`dist/${appConfigType}/js`)
	await run(`cpy "**/*.(css|html|svelte)" "../dist/${appConfigType}/js/" --parents --cwd=src`)
	await run(`babel src -x .js -x .ts --out-dir dist/${appConfigType}/js/ --no-babelrc --config-file ./env/babel/configs/dist-js.js`)
})
const buildComponents = singleCall(async appConfigType => {
	await deletePaths(`dist/${appConfigType}/components`)
	await run(
		'rollup --config ./env/rollup/components.js',
		{env: {APP_CONFIG: appConfigType}},
	)
})

const buildSapperExport = singleCall(async appConfigType => {
	await deletePaths(
		`src/node_modules/@sapper/${appConfigType}`,
		`tmp/${appConfigType}/sapper/export`,
		`dist/${appConfigType}/sapper/build`,
	)

	await run(
		`sapper export "dist/${appConfigType}/sapper/export/"`
		+ ` --build-dir tmp/${appConfigType}/sapper/build`
		+ ` --output src/node_modules/@sapper/${appConfigType}`
		+ ' --timeout 180000 --legacy --basepath app',
		{
			env: {
				APP_CONFIG: appConfigType,
				PORT      : require(`../../../configs/${appConfigType}`).sapper.port,
			},
		},
	)
})

const buildElectron = singleCall(async appConfigType => {
	await deletePaths(`dist/${appConfigType}/electron/build`)
	await run(
		'node env/electron/build.js',
		{env: {APP_CONFIG: appConfigType}},
	)
	await run(`cpy "src/main/node/electron/run/preload.js" "dist/${appConfigType}/electron/build/"`)
})

const buildChrome = singleCall(async appConfigType => {
	await deletePaths(`dist/${appConfigType}/chrome/build`)
	await run(
		'node env/chrome/build.js',
		{env: {APP_CONFIG: appConfigType}},
	)
})

const clean = singleCall(appConfigType => deletePaths(`{dist,tmp,src/node_modules/@sapper}/${appConfigType}`))
const build = singleCall(async appConfigType => {
	// await clean(appConfigType)
	// await run('echo      │ node_modules\\core-js-pure\\stable\\set-interval.js (0.2%)\n')
	await Promise.all([
		common.build(),
		buildMjs(appConfigType),
		buildJs(appConfigType),
		buildComponents(appConfigType),
		// buildElectron(appConfigType),
		// buildChrome(appConfigType),
		buildSapperExport(appConfigType),
	])
})

module.exports = {
	clean,
	build,
	buildMjs,
	buildJs,
	buildComponents,
	buildElectron,
	buildChrome,
	buildSapperExport,
}
