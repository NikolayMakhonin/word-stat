/* eslint-disable no-shadow */
const {run, singleCall} = require('@flemist/run-script')
const builds = require('./builds')
const {reCreateDir} = require('../../common/helpers')
const {deletePaths} = require('../../common/helpers')
const {copyToSingleDir} = require('../../common/helpers')

const testMochaSrc = singleCall(async coverage => {
	const appConfigType = 'dev'

	await run(
		`${coverage ? 'nyc --all ' : ''}mocha --allow-natives-syntax --config ./env/mocha/configs/babel/.mocharc.js --bail "./src/test/tests/node/**/*.*"`,
		{env: {APP_CONFIG: appConfigType}},
	)
})
const testMochaMjs = singleCall(async (appConfigType, coverage, options = {}) => {
	if (options.build !== false) {
		await builds.buildMjs(appConfigType)
	}

	await run(
		`${coverage ? 'nyc --all ' : ''}mocha --allow-natives-syntax --config ./env/mocha/configs/babel/.mocharc.js --bail "./dist/${appConfigType}/mjs/test/tests/node/**/*.*"`,
		{env: {APP_CONFIG: appConfigType}},
	)
})
const testMochaJs = singleCall(async (appConfigType, coverage, options = {}) => {
	if (options.build !== false) {
		await builds.buildJs(appConfigType)
	}
	await run(
		// `${coverage ? 'nyc --all ' : ''}mocha --allow-natives-syntax --config ./env/mocha/configs/babel/.mocharc.js --bail "./dist/${appConfigType}/js/test/tests/node/**/*.*"`,
		`${coverage ? 'nyc --all ' : ''}mocha --allow-natives-syntax --config ./env/mocha/configs/no-babel/.mocharc.js --bail "./dist/${appConfigType}/js/test/tests/node/**/*.*"`,
		{env: {APP_CONFIG: appConfigType}},
	)
})
const testMocha = singleCall(async (appConfigType, coverage, options = {}) => {
	if (coverage) {
		await deletePaths(`tmp/${appConfigType}/coverage/nyc`)
	}

	await Promise.all([
		testMochaSrc(appConfigType, coverage),
		testMochaMjs(appConfigType, coverage, options),
		testMochaJs(appConfigType, coverage, options),
	])
})

const coverageMocha = singleCall((appConfigType, options = {}) => testMocha(appConfigType, true, options))
const coverageMerge = singleCall(async appConfigType => {
	await deletePaths(`tmp/${appConfigType}/coverage/merge`)
	await copyToSingleDir(`tmp/${appConfigType}/coverage/merge`, `tmp/${appConfigType}/coverage/karma/json/**/*.json`, `tmp/${appConfigType}/coverage/nyc/tmp/*.json`)

	await reCreateDir(`tmp/${appConfigType}/coverage/all/lcov`)
	await run(
		`nyc report -r lcov --report-dir tmp/${appConfigType}/coverage/all/lcov --temp-dir "tmp/${appConfigType}/coverage/merge/"`,
		{env: {APP_CONFIG: appConfigType}},
	)
})
const coverageCheck = singleCall(appConfigType => run(
	`nyc check-coverage --report-dir tmp/${appConfigType}/coverage/all/lcov --lines 0.1 --functions 0.1 --branches 0.1`,
	{env: {APP_CONFIG: appConfigType}},
))
const coverage = singleCall(async (appConfigType, options = {}) => {
	await Promise.all([
		coverageMocha(appConfigType, options),
	])
	await coverageMerge(appConfigType)
	await coverageCheck(appConfigType)
})

module.exports = {
	testMochaSrc,
	testMochaMjs,
	testMochaJs,
	testMocha,
	coverageMocha,
	coverageMerge,
	coverageCheck,
	coverage,
}
