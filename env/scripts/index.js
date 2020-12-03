const {singleCall} = require('@flemist/run-script')
const common = require('./common')
const specific = require('./specific')

// region Specific

const test = singleCall(async (appConfigType, options = {}) => {
	await specific.tests.testIntern(appConfigType, options)
	await Promise.all([
		common.lint(),
		specific.tests.coverage(appConfigType, options),
	])
})

const testCi = singleCall(async (appConfigType, options = {}) => {
	await Promise.all([
		common.lint(),
		specific.tests.coverage(appConfigType, options),
	])
})

const pack = singleCall(async (packType, appConfigType) => {
	switch (packType) {
		case 'electron':
			await specific.packs.packElectron(appConfigType)
			await specific.packs.runElectron(appConfigType)
			break
		case 'chrome':
			await specific.packs.packChrome(appConfigType)
			await specific.packs.runChrome(appConfigType)
			break
		default:
			throw new Error(`Unknown pack type: ${packType}`)
	}
})

// const testAndPack = singleCall(async (appConfigType, options = {}) => {
// 	await specific.tests.testIntern(appConfigType, options)
// 	await Promise.all([
// 		common.lint(),
// 		specific.tests.coverage(appConfigType, options),
// 		specific.packs.packElectron(appConfigType)
// 			.then(() => specific.packs.runElectron(appConfigType)),
// 	])
// })

// endregion

// region All

const buildAll = singleCall(appConfigTypes => Promise.all(
	appConfigTypes.map(appConfigType => specific.builds.build(appConfigType, {intern: false})),
))

const testInternAll = singleCall((appConfigTypes, options = {}) => Promise.all(
	appConfigTypes.map(appConfigType => specific.tests.testIntern(appConfigType, options)),
))

const testAll = singleCall(async (appConfigTypes, options = {}) => {
	if (options.build !== false) {
		await Promise.all([
			common.lint(),
			buildAll(appConfigTypes),
		])
	}

	await testInternAll(appConfigTypes, options)

	await Promise.all(
		appConfigTypes.map(appConfigType => test(appConfigType, options)),
	)
})

const testCiAll = singleCall(async (appConfigTypes, options = {}) => {
	if (options.build !== false) {
		await Promise.all([
			common.lint(),
			buildAll(appConfigTypes),
		])
	}

	await Promise.all(
		appConfigTypes.map(appConfigType => testCi(appConfigType, options)),
	)
})

const packAll = singleCall(async (packTypes, appConfigTypes, options = {}) => {
	if (options.build !== false) {
		await Promise.all([
			common.lint(),
			buildAll(appConfigTypes),
		])
	}

	if (options.test !== false) {
		await testInternAll(appConfigTypes, options)
	}

	await Promise.all(
		appConfigTypes
			.map(
				appConfigType => packTypes
					.map(packType => pack(packType, appConfigType)),
			)
			.reduce((a, o) => {
				a.push(...o)
				return a
			}, []),
	)
})

const deployAll = singleCall(async (appConfigTypes, options = {}) => {
	if (options.build !== false) {
		await Promise.all([
			common.lint(),
			buildAll(appConfigTypes),
		])
	}

	if (options.test !== false) {
		await testInternAll(appConfigTypes, options)
	}

	await Promise.all(
		appConfigTypes
			.map(
				appConfigType => specific.deploy.deploy(appConfigType),
			),
	)
})

// endregion

module.exports = {
	buildAll,
	testAll,
	packAll,
	deployAll,
	testCiAll,
}
