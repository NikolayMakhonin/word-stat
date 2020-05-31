const common = require('../common/.mocharc.js')

module.exports = {
	...common,
	exclude: './*/**/@(src|assets|v8|mjs)/**',
	require: './env/mocha/configs/no-babel/register',
}
