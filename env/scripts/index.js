const {singleCall} = require('./helpers/helpers')
const common = require('./common')
const specific = require('./specific')

// region Specific

const test = singleCall(async appConfigType => {
	await specific.tests.testIntern(appConfigType)
	await Promise.all([
		common.lint(),
		specific.tests.coverage(appConfigType),
	])
})

const testCi = singleCall(async appConfigType => {
	await Promise.all([
		common.lint(),
		specific.tests.coverage(appConfigType),
	])
})

// endregion

// region All

const buildAll = singleCall((...appConfigTypes) => Promise.all(
	appConfigTypes.map(appConfigType => specific.builds.build(appConfigType))
))

const testInternAll = singleCall((...appConfigTypes) => Promise.all(
	appConfigTypes.map(appConfigType => specific.tests.testIntern(appConfigType))
))

const testAll = singleCall(async (...appConfigTypes) => {
	await Promise.all([
		common.lint(),
		buildAll(...appConfigTypes),
	])
	await testInternAll(...appConfigTypes)

	await Promise.all(
		appConfigTypes.map(appConfigType => test(appConfigType))
	)
})

const testCiAll = singleCall(async (...appConfigTypes) => {
	await Promise.all([
		common.lint(),
		buildAll(...appConfigTypes),
	])

	await Promise.all(
		appConfigTypes.map(appConfigType => testCi(appConfigType))
	)
})

// endregion

module.exports = {
	buildAll,
	testAll,
	testCiAll,
}
