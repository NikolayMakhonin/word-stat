import templates from '../../helpers/templates'

module.exports = [
	{
		'.icon': {
			position: 'absolute',
			top     : '0',
			left    : '0',
			right   : '0',
			bottom  : '0',
			margin  : 'auto',
		},
		'.icon-block': {
			display: 'block',
			width  : '1em',
			height : '1em',
		},
		'.icon-inline': {
			display: 'inline-block',
			width  : '1em',
			height : '1em',

			'vertical-align': 'middle',
			'margin-top'    : '-0.223em',
			'white-space'   : 'nowrap',

			...templates.fonts.clear,

			'font-size': '100% !important',
		},
		'.icon-mask': {
			'-webkit-mask-position'  : `center center`,
			'-webkit-mask-position-x': `center`,
			'-webkit-mask-position-y': `center`,
			'mask-position'          : `center center`,
			'-webkit-mask-size'      : `contain`,
			'mask-size'              : `contain`,
			'-webkit-mask-repeat'    : `no-repeat`,
			'mask-repeat'            : `no-repeat`,
		},
	},
]
