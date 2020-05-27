import config from '../debug/intern'
import {configure, runTests} from '../../mocha-helpers'

config.environments = config.environments.map(o => ({
	...o,
	enableVNC       : false,
	enableVideo     : true,
	videoFrameRate  : 60,
	screenResolution: '900x675x24',
}))

configure({
	...config,
	functionalSuites: [
		'src/test/*/webdriver/**/app/**/*.{js,ts}',
		'!*/**/{src,assets}/**'
	],
})
runTests()
