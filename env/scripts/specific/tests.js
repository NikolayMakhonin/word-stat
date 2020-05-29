/* eslint-disable no-shadow */
const {run, singleCall} = require('../helpers/helpers')
const builds = require('./builds')
const {reCreateDir} = require('../../common/helpers')
const {createDir} = require('../../common/helpers')
const {deletePath} = require('../../common/helpers')
const {copyToSingleDir} = require('../../common/helpers')

const testMochaSrc = singleCall(async coverage => {
	const appConfigType = 'dev'

	await run(
		`${coverage ? 'nyc ' : ''}mocha --allow-natives-syntax --opts ./env/mocha/configs/babel/mocha.opts --bail ./src/test/tests/node/**/**/*.*`,
		{env: {APP_CONFIG: appConfigType}}
	)
})
const testMochaMjs = singleCall(async (appConfigType, coverage, options = {}) => {
	if (options.build !== false) {
		await builds.buildMjs(appConfigType)
	}
	await run(
		`${coverage ? 'nyc ' : ''}mocha --allow-natives-syntax --opts ./env/mocha/configs/babel/mocha.opts --bail ./dist/${appConfigType}/mjs/test/tests/node/**/**/*.*`,
		{env: {APP_CONFIG: appConfigType}}
	)
})
const testMochaJs = singleCall(async (appConfigType, coverage, options = {}) => {
	if (options.build !== false) {
		await builds.buildJs(appConfigType)
	}
	await run(
		// `${coverage ? 'nyc ' : ''}mocha --allow-natives-syntax --opts ./env/mocha/configs/babel/mocha.opts --bail ./dist/${appConfigType}/js/test/tests/node/**/**/*.*`,
		`${coverage ? 'nyc ' : ''}mocha --allow-natives-syntax --opts ./env/mocha/configs/no-babel/mocha.opts --bail ./dist/${appConfigType}/js/test/tests/node/**/**/*.*`,
		{env: {APP_CONFIG: appConfigType}}
	)
})
const testMocha = singleCall(async (appConfigType, coverage, options = {}) => {
	if (coverage) {
		await deletePath(`tmp/${appConfigType}/coverage/nyc`)
	}

	await Promise.all([
		testMochaSrc(appConfigType, coverage),
		testMochaMjs(appConfigType, coverage, options),
		testMochaJs(appConfigType, coverage, options),
	])
})

const coverageMocha = singleCall((appConfigType, options = {}) => testMocha(appConfigType, true, options))
const coverageMerge = singleCall(async appConfigType => {
	await deletePath(`tmp/${appConfigType}/coverage/merge`)
	await copyToSingleDir(`tmp/${appConfigType}/coverage/merge`, `tmp/${appConfigType}/coverage/karma/json/**/*.json`, `tmp/${appConfigType}/coverage/nyc/tmp/*.json`)

	await reCreateDir(`tmp/${appConfigType}/coverage/all/lcov`)
	await run(
		`nyc report -r lcov --report-dir tmp/${appConfigType}/coverage/all/lcov --temp-dir "tmp/${appConfigType}/coverage/merge/"`,
		{env: {APP_CONFIG: appConfigType}}
	)
})
const coverageCheck = singleCall(appConfigType => run(
	`nyc check-coverage --report-dir tmp/${appConfigType}/coverage/all/lcov --lines 1 --functions 1 --branches 1`,
	{env: {APP_CONFIG: appConfigType}}
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
