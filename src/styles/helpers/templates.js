const fontInherit = {
	'font-style'             : 'inherit',
	'font-variant-ligatures' : 'inherit',
	'font-variant-caps'      : 'inherit',
	'font-variant-numeric'   : 'inherit',
	'font-variant-east-asian': 'inherit',
	'font-weight'            : 'inherit',
	'font-stretch'           : 'inherit',
	'font-size'              : '100%',
	'line-height'            : 'inherit',
	'font-family'            : 'inherit',
}

const buttonAsDiv = {
	'align-items'     : 'normal',
	'background-color': 'transparent',
	'background-image': 'none',
	'box-sizing'      : 'inherit',
	color             : 'inherit',
	cursor            : 'auto',
	display           : 'block',
	'vertical-align'  : `middle`,

	...fontInherit,

	'letter-spacing'        : 'inherit',
	margin                  : '0',
	padding                 : '0',
	'text-align'            : 'start',
	'text-indent'           : '0',
	'text-rendering'        : 'inherit',
	'text-shadow'           : 'inherit',
	'text-transform'        : 'inherit',
	'-webkit-appearance'    : 'inherit',
	'-webkit-font-smoothing': 'inherit',
	'-webkit-writing-mode'  : 'inherit',
	'word-spacing'          : '0',

	// Firefox
	'border-style'           : `solid`,
	'border-color'           : `black`,
	'border-width'           : `0`,
	'-moz-appearance'        : 'inherit',
	'-moz-osx-font-smoothing': 'inherit',
	'-moz-user-select'       : 'inherit',
	'overflow-clip-box'      : 'inherit',
	'padding-block-end'      : '0',
	'padding-block-start'    : '0',
	'padding-inline-end'     : '0',
	'padding-inline-start'   : '0',
	'white-space'            : 'normal',
	'&::-moz-focus-inner'    : {
		border : '0',
		padding: '0',
	},

	// IE
	overflow: 'visible',
	zoom    : 'inherit',

	// Additional
	outline: 'inherit',
	width  : '100%',
}

const textboxAsDiv = {
	'background-color': 'transparent',
	'background-image': 'none',
	'border-style'    : `solid`,
	'border-color'    : `black`,
	'border-width'    : `0`,
	'box-sizing'      : 'inherit',
	display           : 'block',
	color             : 'inherit',
	'vertical-align'  : `middle`,

	...fontInherit,
	'font-family':	null,

	margin              : '0',
	padding             : '0',
	'-webkit-appearance': 'none',
	width               : '100%',
}

const anchorColor = ({
	all,
	base,
	link,
	visited,
	hover,
	active,
}) => {
	const result = {}
	if (all || base) {
		result.color = all || base
	}
	if (all || link) {
		result['&:link'] = {
			color: all || link,
		}
	}
	if (all || visited) {
		result['&:visited'] = {
			color: all || visited,
		}
	}
	if (all || hover) {
		result['&:hover'] = {
			color: all || hover,
		}
	}
	if (all || active) {
		result['&:active'] = {
			color: all || active,
		}
	}
	return result
}

const borders = ({
	all,
	left,
	right,
	top,
	bottom,
	color,
	width,
	style,
} = {}) => {
	const result = {}
	if (all || left) {
		if (color) result['border-left-color'] = color
		if (width) result['border-left-width'] = width
		if (style) result['border-left-style'] = style
	}
	if (all || right) {
		if (color) result['border-right-color'] = color
		if (width) result['border-right-width'] = width
		if (style) result['border-right-style'] = style
	}
	if (all || top) {
		if (color) result['border-top-color'] = color
		if (width) result['border-top-width'] = width
		if (style) result['border-top-style'] = style
	}
	if (all || bottom) {
		if (color) result['border-bottom-color'] = color
		if (width) result['border-bottom-width'] = width
		if (style) result['border-bottom-style'] = style
	}

	return result
}

const bordersInnerShadow = ({
	color,
	width,
} = {}) => color && width && {
	'box-shadow': `inset 0px 0px 0px ${width} ${color}`,
}

const anchorAsDiv = {
	...anchorColor({
		all: 'inherit',
	}),
	'text-decoration': 'inherit',
	width            : '100%',
	display          : 'block',
}

const contentCenterButton = {
	'align-items'    : 'center',
	'justify-content': 'center',
	'text-align'     : 'center',
}

const buttonsReset = {
	[[
		'[type=\'button\']',
		'[type=\'submit\']',
		'[type=\'reset\']',
		'[type=\'color\']',
		'button',
	].join(',\n\t')]: [
		buttonAsDiv,
	],
	'[type=\'file\']::-webkit-file-upload-button': [
		{
			...buttonAsDiv,
			'&::-moz-focus-inner': null,
		},
	],
}

const textboxReset = {
	[[
		'textarea',
		'[type=\'text\']',
		'[type=\'email\']',
		'[type=\'password\']',
		'select',
	].join(',\n\t')]: [
		textboxAsDiv,
	],
}

const contentCenter = {
	...contentCenterButton,
	display: 'flex',
}

const contentCenterVertical = {
	display            : 'flex',
	'align-items'      : 'center',
	'-webkit-box-align': 'inherit',
}

const fill = {
	position: 'absolute',
	top     : '0',
	left    : '0',
	right   : '0',
	bottom  : '0',
}

const inputHidden = {
	position        : 'absolute',
	clip            : 'rect(0,0,0,0)',
	'pointer-events': 'none',
}

const aspectRatio = heightCoef => ({
	// 'padding-top'   : `${heightCoef * 50}%`,
	'padding-bottom': `${heightCoef * 100}%`,
})

function icon({
	url,
	x = 'center',
	y = 'center',
	animation,
}) {
	return {
		'background-color'     : 'transparent !important',
		'background-image'     : url && `url(${url})`,
		'background-position-x': x,
		'background-position-y': y,
		animation,
	}
}

function iconMask({
	url,
	x = 'center',
	y = 'center',
	size = 'contain',
	color = 'white',
	animation,
	transform,
}) {
	return {
		'mask-image'      : url && `url(${url})`,
		'mask-position'   : `${x} ${y}`,
		'mask-size'       : `${size}`,
		'background-color': color,

		// autoprefixer is not supported yet
		// see: https://github.com/postcss/autoprefixer/issues/1245
		'-webkit-mask-position-x': x,
		'-webkit-mask-position-y': y,
		animation,
		transform,
	}
}

function noWrap({
	maxLines = 1,
	lineHeightEm = void 0,
	ellipsis = true,
} = {}) {
	const result = {}

	if (ellipsis) {
		result.overflow = 'hidden'
		result['text-overflow'] = 'ellipsis'
	}

	if (maxLines === 1) {
		Object.assign(result, {
			'white-space': 'nowrap',
			'line-height': lineHeightEm && `${lineHeightEm}em`,
		})
	} else if (maxLines > 1) {
		Object.assign(result, {
			display             : '-webkit-box',
			'-webkit-box-orient': 'vertical',
			'-webkit-line-clamp': `${maxLines}`,
			'line-height'       : lineHeightEm && `${lineHeightEm}em`,
			'max-height'        : `${maxLines * lineHeightEm}em`,
		})
	}

	return result
}

const paddingAll = value => ({
	'padding-left'  : value,
	'padding-right' : value,
	'padding-top'   : value,
	'padding-bottom': value,
})

const marginAll = value => ({
	'margin-left'  : value,
	'margin-right' : value,
	'margin-top'   : value,
	'margin-bottom': value,
})

const noSelect = {
	'user-select'        : 'none',
	'-moz-user-select'   : 'none',
	'-webkit-user-select': 'none',
	'-ms-user-select'    : 'none',
}

const noDrag = {
	'user-drag'        : 'none',
	'-webkit-user-drag': 'none',
}

function important(style) {
	if (style == null || style === false) {
		return style
	}

	if (Array.isArray(style)) {
		for (let i = 0, len = style.length; i < len; i++) {
			style[i] = important(style[i])
		}
		return style
	}

	if (typeof style === 'object') {
		for (const key in style) {
			if (Object.prototype.hasOwnProperty.call(style, key)) {
				style[key] = important(style[key])
			}
		}

		return style
	}

	style = style.toString()
	if (style.endsWith('!important')) {
		return style
	}

	return `${style} !important`
}

function transition(
	durationSec,
	includes = [
		'opacity',
		'background-color',
		'color',
		'border-color',
		'box-shadow',
		'fill',
		'fill-opacity',
		'flood-color',
		'flood-opacity',
		'lighting-color',
		'outline-color',
		'stop-color',
		'stop-opacity',
		'stroke-opacity',
		'text-decoration-color',
		'text-shadow',
	],
	excludes = [],
) {
	return {
		transition: includes.map(o => `${o} ${durationSec}s`)
			.concat(excludes.map(o => `${o} 0`))
			.join(', '),
	}
}

module.exports = ({
	buttonAsDiv,
	buttonsReset,
	textboxAsDiv,
	textboxReset,
	anchorAsDiv,
	contentCenter,
	contentCenterVertical,
	contentCenterButton,
	inputHidden,
	fill,
	aspectRatio,
	icon,
	iconMask,
	anchorColor,
	borders,
	bordersInnerShadow,
	noWrap,
	noSelect,
	noDrag,
	paddingAll,
	marginAll,
	important,
	transition,
	...require('./colors'),
	...require('./layouts'),
	...require('./fonts'),
})
