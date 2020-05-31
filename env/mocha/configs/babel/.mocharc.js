const common = require('../common/.mocharc.js')

module.exports = {
	...common,
	exclude: './*/**/@(src|assets|v8|js)/**',
	require: './env/mocha/configs/babel/register',
}
