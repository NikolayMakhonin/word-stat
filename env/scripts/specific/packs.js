/* eslint-disable no-sync */
const {run, singleCall, singleProcess} = require('@flemist/run-script')
const globby = require('globby')
const path = require('path')
const fs = require('fs')
const builds = require('./builds')

const _packElectron = singleProcess(singleCall(async appConfigType => {
	// docs: https://www.electron.build/cli
	await run(
		'electron-builder --config ./env/electron/pack/config.js',
		{env: {APP_CONFIG: appConfigType}},
	)
}))

const packElectron = singleCall(async appConfigType => {
	await builds.buildElectron(appConfigType)

	// Delete not necessary edge-js binary files
	const edgeBins = 'node_modules/electron-edge-js/**/win32'
	const deletePathsPattern = [
		// also delete last build
		`dist/${appConfigType}/electron/pack/**`,
		`!dist/${appConfigType}/electron/pack/win-unpacked/**`,

		`${edgeBins}/**`,
		`!${edgeBins}/*/*`,
		`!${edgeBins}/*/${
			require(`../../../configs/${appConfigType}`).installer.nodeVersion
		}/**`,
	]
	const deletePaths = await globby(deletePathsPattern)

	// await run(`chmod +x dist/${appConfigType}/electron/build/pkg-scripts/*`)

	await Promise.all(deletePaths
		.map(filePath => new Promise((resolve, reject) => {
			fs.unlink(filePath, err => {
				if (err && err.message.indexOf('no such file or directory') < 0) {
					reject(err)
					return
				}
				resolve()
			})
		})),
	)

	await _packElectron(appConfigType)
})

const runElectron = singleProcess(singleCall(async appConfigType => {
	const paths = await globby(`dist/${appConfigType}/electron/pack/*.{msi,dmg}`)
	if (paths.length !== 1) {
		throw Error('Found installers count != 1')
	}

	const appName = path.basename(paths[0], path.extname(paths[0]))
	console.log(`run: ${paths[0]}`)

	const appConfig = require(`../../../configs/${appConfigType}`)

	if (process.platform === 'darwin') {
		await run(`hdiutil attach "${paths[0]}"`)
		// await run(`installer -package -pkg "/Volumes/${appName}/${appName}.pkg" -target /`)
		await run(`rm -rf "/Applications/${appConfig.appName}.app"`)
		await run(`cp -R "/Volumes/${appName}/${appConfig.appName}.app" /Applications`)
		await run(`hdiutil detach "/Volumes/${appName}"`)
		await run(`open "dist/${appConfigType}/electron/pack"`)
		await run(`open -b "${appConfig.appId}"`)
	} else {
		await run(`"${paths[0]}"`)
	}
}))

const packChrome = singleCall(async appConfigType => {
	await builds.buildChrome(appConfigType)
})

const runChrome = singleCall(async appConfigType => {
	// empty
})

module.exports = {
	packElectron,
	runElectron,
	packChrome,
	runChrome,
}
