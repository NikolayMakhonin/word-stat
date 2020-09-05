/* eslint-disable no-shadow,global-require,object-property-newline */
const path = require('path')
const rollup = require('rollup')

async function doRollup(rollupConfig) {
	const bundle = await rollup.rollup(rollupConfig)

	const result = await bundle.write(rollupConfig.output)

	return result
}

async function build({fileInput, fileOutput, name}, rollupConfig) {
	fileInput = path.resolve(fileInput)
	fileOutput = path.resolve(fileOutput)

	const result = await doRollup({
		...rollupConfig,
		input : fileInput,
		output: {
			file: fileOutput,
			...rollupConfig.output,
			name,
		},
	})

	if (!result.output.length) {
		throw new Error('rollup build is not propagate any content')
	}
}

module.exports = {
	build
}
