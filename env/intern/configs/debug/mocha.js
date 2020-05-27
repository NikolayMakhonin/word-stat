import config from './intern'
import {configure, runTests} from '../../mocha-helpers'

configure({
	...config,
	functionalSuites: [
		'src/test/*/webdriver/**/app/**/*.{js,ts}',
		'!*/**/{src,assets}/**'
	],
})
runTests()
