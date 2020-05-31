const common = require('../mocha/configs/common/.mocharc.js')

module.exports = {
	...common,
	exclude: './*/**/@(src|assets)/**',
	require: './env/intern/register-mocha',
}
