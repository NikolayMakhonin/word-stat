const {fileExtensions} = require('../../../common/constants')

module.exports = {
	extension: [...fileExtensions.js, ...fileExtensions.ts],
	ui: 'bdd',
	'watch-files': ['**/*'],
	'watch-ignore': [
		'@(.idea|_trash|__sapper__|build|dist|docs|tmp|tools|node_modules)/**/*',
		'**/*.@(log|bak|stackdump)',
		'code.asm',
		'hydrogen*.cfg',
	]
}
