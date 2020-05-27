/* eslint-disable no-shadow */
const {run, singleCall} = require('../helpers/helpers')
const builds = require('./builds')

const testMochaSrc = singleCall(coverage => run(
	`${coverage ? 'nyc ' : ''}mocha --opts ./env/mocha/configs/babel/mocha.opts --bail ./src/test/tests/{node,common}/**/*.*`,
	{env: {APP_CONFIG: 'dev'}}
))
const testMochaMjs = singleCall(async (appConfigType, coverage, options = {}) => {
	if (options.build !== false) {
		await builds.buildMjs(appConfigType)
	}
	await run(
		`${coverage ? 'nyc ' : ''}mocha --opts ./env/mocha/configs/babel/mocha.opts --bail ./dist/${appConfigType}/mjs/test/tests/{node,common}/**/*.*`,
		{env: {APP_CONFIG: appConfigType}}
	)
})
const testMochaJs = singleCall(async (appConfigType, coverage, options = {}) => {
	if (options.build !== false) {
		await builds.buildJs(appConfigType)
	}
	await run(
		// `${coverage ? 'nyc ' : ''}mocha --opts ./env/mocha/configs/babel/mocha.opts --bail ./dist/${appConfigType}/js/test/tests/{node,common}/**/*.*`,
		`${coverage ? 'nyc ' : ''}mocha --opts ./env/mocha/configs/no-babel/mocha.opts --bail ./dist/${appConfigType}/js/test/tests/{node,common}/**/*.*`,
		{env: {APP_CONFIG: appConfigType}}
	)
})
const testMocha = singleCall((appConfigType, coverage, options = {}) => Promise.all([
	testMochaSrc(appConfigType, coverage),
	testMochaMjs(appConfigType, coverage, options),
	testMochaJs(appConfigType, coverage, options),
]))

const coverageMocha = singleCall((appConfigType, options = {}) => testMocha(appConfigType, true, options))
const coverageMerge = singleCall(appConfigType => run(`istanbul-combine -d tmp/common/coverage/all/lcov -p summary -r lcov tmp/${appConfigType}/coverage/*/json/**.json`))
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
