import templates from '../../helpers/templates'

module.exports = [
	{
		'.fill': {
			...templates.fill,
		},
	},
	templates.important({
		'.stretch': {
			width         : '100%',
			height        : '100%',
			'&-horizontal': {
				width: '100%',
			},
			'&-vertical': {
				height: '100%',
			},
		},
		'.fit': {
			width         : 'fit-content',
			height        : 'fit-content',
			'&-horizontal': {
				width: 'fit-content',
			},
			'&-vertical': {
				height: 'fit-content',
			},
			'&-min': {
				width         : 'min-content',
				height        : 'min-content',
				'&-horizontal': {
					width: 'min-content',
				},
				'&-vertical': {
					height: 'min-content',
				},
			},
			'&-max': {
				width         : 'max-content',
				height        : 'max-content',
				'&-horizontal': {
					width: 'max-content',
				},
				'&-vertical': {
					height: 'max-content',
				},
			},
		},
		'.center': {
			'text-align'    : 'center',
			'vertical-align': 'middle',
			'&-horizontal'  : {
				'text-align': 'center',
			},
			'&-vertical': {
				'vertical-align': 'middle',
			},
		},
		'.no-drag': {
			...templates.noDrag,
		},
		'.no-select': {
			...templates.noSelect,
		},
		'.no-wrap': {
			...templates.noWrap(),
			'&-2': {
				...templates.noWrap({maxLines: 2}),
			},
			'&-3': {
				...templates.noWrap({maxLines: 3}),
			},
		},
		'.wrap': {
			'white-space': 'normal',
		},
		'.overflow': {
			'&-hidden': {
				overflow: 'hidden',
			},
			'&-visible': {
				overflow: 'visible',
			},
		},
		'.position': {
			'&-relative': {
				position: 'relative',
			},
		},
		'.float': {
			'&-left': {
				'float': 'left',
			},
			'&-right': {
				'float': 'right',
			},
			'&-clear': {
				'&-left': {
					clear: 'left',
				},
				'&-right': {
					clear: 'right',
				},
				'&-both': {
					clear: 'both',
				},
			},
		},
	})]
