const {singleCall} = require('./helpers/helpers')
const common = require('./common')
const specific = require('./specific')

// region Specific

const test = singleCall(async (appConfigType, options = {}) => {
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

// endregion

// region All

const buildAll = singleCall(appConfigTypes => Promise.all(
	appConfigTypes.map(appConfigType => specific.builds.build(appConfigType, {intern: false})),
))

const testAll = singleCall(async (appConfigTypes, options = {}) => {
	if (options.build !== false) {
		await Promise.all([
			common.lint(),
			buildAll(appConfigTypes),
		])
	}

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

// endregion

module.exports = {
	buildAll,
	testAll,
	testCiAll,
}
