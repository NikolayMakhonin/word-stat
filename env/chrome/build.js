/* eslint-disable no-shadow,global-require,object-property-newline,no-process-env,array-bracket-newline */
const path = require('path')
const fs = require('fs')
// const {build} = require('../common/build')
// const rollupPlugins = require('../rollup/plugins')
const manifest = require('./app/manifest')
const globby = require('globby')
const {writeTextFile} = require('../common/helpers')

if (!process.env.APP_CONFIG) {
	console.error('Environment variable APP_CONFIG is not defined', __filename)
	throw new Error('Environment variable APP_CONFIG is not defined')
}

const appConfig = require(`../../configs/${process.env.APP_CONFIG}`)

const buildDir = path.resolve(`dist/${process.env.APP_CONFIG}/chrome/build/`)
const appDir = path.relative(buildDir, path.join(`dist/${process.env.APP_CONFIG}/sapper/export/`, appConfig.sapper.baseUrl))

;(async function () {
	if (!fs.existsSync(buildDir)) {
		fs.mkdirSync(buildDir, {recursive: true})
	}

	await new Promise((resolve, reject) => {
		fs.writeFile(path.resolve(buildDir, 'manifest.json'), JSON.stringify(manifest, null, 4), err => {
			if (err) {
				reject(err)
				return
			}
			resolve()
		})
	})

	await new Promise((resolve, reject) => {
		fs.symlink(appDir, path.resolve(buildDir, 'app'), err => {
			if (err) {
				reject(err)
				return
			}
			resolve()
		})
	})

	const dir = path.resolve(__dirname, 'app')
	const appFiles = (await globby([
		'env/chrome/app/*.html',
		'env/chrome/app/{dir,js,img}/**',
	]))
		.map(file => [file, path.relative(dir, path.resolve(file))])

	await Promise.all(appFiles.map(([sourceFile, destFileRelative]) => new Promise((resolve, reject) => {
		const destFile = path.resolve(buildDir, destFileRelative)
		const destDir = path.dirname(destFile)
		if (!fs.existsSync(destDir)) {
			fs.mkdirSync(destDir, {recursive: true})
		}
		fs.copyFile(sourceFile, destFile, err => {
			if (err) {
				reject(err)
				return
			}
			resolve()
		})
	})))

	await writeTextFile(
		path.resolve(buildDir, 'js/appConfig.js'),
		'export default ' + JSON.stringify(appConfig, null, 4),
	)

	// await build(
	// 	{
	// 		fileInput : path.resolve('src/main/node/electron/run/pack/app.ts'),
	// 		fileOutput: `dist/${process.env.APP_CONFIG}/chrome/build/index.js`,
	// 	},
	// 	{
	// 		plugins: rollupPlugins.electron({dev: false, legacy: true}),
	// 		output : {
	// 			format   : 'cjs',
	// 			sourcemap: false,
	// 			exports  : 'named',
	// 		}
	// 	}
	// )

	console.log('chrome build completed')
})()

