const regular = 'Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'

module.exports = {
	// fontSizeBase: `10px`, // fontSize was set on template.html
	fonts: {
		base     : regular,
		regular,
		monospace: '"Source Code Pro Semibold","SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace',
	},
	selectors: {
		all: '*, *:before, *:after',
	},
}
