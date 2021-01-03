import templates from '../../helpers/templates'

module.exports = [
	templates.buttonsReset,
	templates.textboxReset,
	{
		'*:focus': {
			outline: 'none',
		},

		a: {
			...templates.anchorAsDiv,
			...templates.noSelect,
			...templates.noDrag,
		},

		button: {
			'white-space': 'nowrap',
		},

		[[
			'radio',
			'checkbox',
		]
			.map(o => `[type='${o}']`)
			.join(', ')]: {
			...templates.inputHidden,
		},

		td: {
			padding: '0',
		},

		table: {
			'border-spacing': '0',
		},

		main: {
			// font rendering
			// 'text-shadow'   : `1px 1px 1px rgba(0,0,0,0.004)`,
			'text-rendering'        : 'optimizeSpeed',
			'-webkit-font-smoothing': 'none',
			'user-select'           : 'none',
		},
	},
]
