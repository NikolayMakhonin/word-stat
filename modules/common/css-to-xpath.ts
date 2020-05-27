// CSS: http://www.stijit.com/html-css/30-css-selektorov-selectors
// XPath: https://msdn.microsoft.com/ru-ru/library/ms256122(v=vs.120).aspx
// convert: https://en.wikibooks.org/wiki/XPath/CSS_Equivalents
// convert: https://hakre.wordpress.com/2012/03/18/css-selector-to-xpath-conversion/
// convert: http://plasmasturm.org/log/444/
// convert: https://stackoverflow.com/questions/1604471/how-can-i-find-an-element-by-css-class-with-xpath
// convert: https://stackoverflow.com/questions/22436789/xpath-ends-with-does-not-work

// region helpers

function arrayInsert<T>(arr: T[], index: number, item: T) {
	for (let i = arr.length - 1; i >= index; i--) {
		arr[i + 1] = arr[i]
	}
	arr[index] = item
}

function error(message: string, text: string, index: number, exclusiveEndIndex: number) {
	throw new Error(`${
		message
	}\r\n${
		text.substring(0, index)
	}\r\n${
		text.substring(index, exclusiveEndIndex - index)
	}`)
}

///  <summary>
///  Name of class, function or id
///  </summary>
function isNameChar(ch: string): boolean {
	return ch >= 'a' && ch <= 'z' ||
		ch >= '0' && ch <= '9' ||
		ch >= 'A' && ch <= 'Z' ||
		ch === '_' ||
		ch === '-'
}

function isTagFirstChar(ch: string): boolean {
	return ch >= 'a' && ch <= 'z' ||
		ch >= 'A' && ch <= 'Z' ||
		ch === '*'
}

function isTagChar(ch: string): boolean {
	return ch >= 'a' && ch <= 'z' ||
		ch >= '0' && ch <= '9' ||
		ch >= 'A' && ch <= 'Z' ||
		ch === '_' ||
		ch === '-'
}

function isNotQuote(ch: string): boolean {
	return ch !== '\'' && ch !== '"'
}

const SEPARATOR_FIRST_DEFAULT: string = './/'
const SEPARATOR_DEFAULT: string = '//'

// function string readBracesContent(char braceCharStart, char braceCharEnd)
// {
//     int countBraces = 0
//
//     var sb = []
//
//     for (var i = _index i < _textLength i++)
//     {
//         var ch = _text[i]
//         if (ch === braceCharStart)
//         {
//             countBraces++
//         }
//         else if (ch === braceCharEnd)
//         {
//             countBraces--
//             if (countBraces < 0)
//             {
//                 var content = _text.Substring(_index, i - _index)
//                 _index = i + 1
//                 return content
//             }
//         }
//     }
//
//     throw throwError("Error read braces content: close brace not found")
// }

const _cache: Map<string, string> = new Map<string, string>()

const UPPER_CASE_CHARS: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWER_CASE_CHARS: string = 'abcdefghijklmnopqrstuvwxyz'

function appendLowerCaseValue(sb: string[], value: string): string[] {
	sb.push('translate(')
	sb.push(value)
	sb.push(',"')
	sb.push(UPPER_CASE_CHARS)
	sb.push('","')
	sb.push(LOWER_CASE_CHARS)
	sb.push('")')

	return sb
}

export function valueToLowerCase(value: string): string {
	const sb = []
	appendLowerCaseValue(sb, value)
	return sb.join('')
}

// endregion

///  <summary>
///  Convert CSS to XPath 1.0
///  </summary>
export function cssToXPath(css: string, ignoreCase: boolean = true, disableCache: boolean = false): string {
	let result: string

	if (!disableCache) {
		result = _cache.get((ignoreCase ? 'i' : 'I') + css)
	}

	let index = 0
	if (!result) {
		const xPath = []
		_cssToXPath(xPath, css, css.length)
		result = xPath.join('')
		if (!disableCache) {
			_cache.set((ignoreCase ? 'i' : 'I') + css, result)
		}
	}

	return result

	function appendValue(sb: string[], value: string): string[] {
		if (ignoreCase) {
			return appendLowerCaseValue(sb, value)
		}

		sb.push(value)

		return sb
	}

	function _cssToXPath(xPath: string[], text: string, exclusiveEndIndex: number, writeStartSeparator: boolean = true, braceStart: string = '\0', braceEnd: string = '\0') {
		let countBraces: number = 0

		let isStart: boolean = true
		let separator: string

		if (writeStartSeparator) {
			// First separator
			separator = readSeparator() || SEPARATOR_FIRST_DEFAULT
			xPath.push(separator)
		} else {
			isStart = false
		}

		let selectorStartIndex: number = -1

		while (index < exclusiveEndIndex) {
			let ch = text[index]

			// Tag
			if (isTagFirstChar(ch)) {
				if (selectorStartIndex < 0) {
					selectorStartIndex = xPath.length
				}
				const tag = readWord(isTagChar)
				xPath.push(tag)
				continue
			}

			// Id
			if (ch === '#') {
				if (selectorStartIndex < 0) {
					selectorStartIndex = xPath.length
					if (writeStartSeparator) {
						xPath.push('*')
					}
				}
				index++
				if (!isNameChar(text[index])) {
					error('Error parse class name', text, index, exclusiveEndIndex)
				}
				const name = readWord(isNameChar)
				xPath.push('[')
				appendValue(xPath, '@id')
				xPath.push('="')
				xPath.push(name.toLowerCase())
				xPath.push('"]')
				continue
			}

			// Class
			if (ch === '.') {
				if (selectorStartIndex < 0) {
					selectorStartIndex = xPath.length
					if (writeStartSeparator) {
						xPath.push('*')
					}
				}
				index++
				if (!isNameChar(text[index])) {
					error('Error parse class name', text, index, exclusiveEndIndex)
				}
				const name = readWord(isNameChar)
				// [contains(concat(' ', normalize-space(@class), ' '), ' navbar-collapse ')]
				xPath.push('[contains(concat(" ",normalize-space(')
				appendValue(xPath, '@class')
				xPath.push(')," ")," ')
				xPath.push(name.toLowerCase())
				xPath.push(' ")]')
				continue
			}

			// Function
			if (ch === ':') {
				if (selectorStartIndex < 0) {
					error('Function for empty selector', text, index, exclusiveEndIndex)
				}
				index++
				if (!isNameChar(text[index])) {
					error('Error parse func name', text, index, exclusiveEndIndex)
				}
				const name = readWord(isNameChar)
				switch (name) {
					case 'first-child':
						arrayInsert(xPath, selectorStartIndex, '*[1]/self::')
						break
					case 'last-child':
						arrayInsert(xPath, selectorStartIndex, '*[last()]/self::')
						break
					case 'first':
						arrayInsert(xPath, 0, '(')
						xPath.push(')[1]')
						break
					case 'last':
						arrayInsert(xPath, 0, '(')
						xPath.push(')[last()]')
						break
					case 'has':
						if (text[index] !== '(') {
							error('Brace not fount for function', text, index, exclusiveEndIndex)
						}
						index++
						xPath.push('[')
						_cssToXPath(xPath, text, exclusiveEndIndex, true, '(', ')')
						xPath.push(']')
						index++
						break
					case 'not':
						if (text[index] !== '(') {
							error('Brace not fount for function', text, index, exclusiveEndIndex)
						}
						index++
						xPath.push('[not(')
						if (text[index] === ':') {
							index++
							const subFunc = readWord(isNameChar)
							if (subFunc !== 'has') {
								if (text[index] !== ')') {
									error('Unsupported sub func: ' + subFunc, text, index, exclusiveEndIndex)
								}
								error('Pseudo classes is not supported in XPath selectors: ' + name, text, index, exclusiveEndIndex)
								xPath.push('@checked')
								index++
							} else {
								index++
								_cssToXPath(xPath, text, exclusiveEndIndex, true, '(', ')')
								index++
								if (text[index] !== ')') {
									error('Close brace not fount', text, index, exclusiveEndIndex)
								}
							}
							xPath.push(')]')
						} else {
							const contentIndex = xPath.length
							_cssToXPath(xPath, text, exclusiveEndIndex, false, '(', ')')
							if (xPath[contentIndex][0] !== '[') {
								error('Unsupported not() parameters', text, contentIndex, exclusiveEndIndex)
							}
							const last = xPath[xPath.length - 1]
							xPath[xPath.length - 1] = last.substring(0, last.length - 1)
							xPath[contentIndex] = xPath[contentIndex].substring(1)
							xPath.push(')]')
						}
						index++
						break
					case 'contains':
						if (text[index] !== '(') {
							error('Brace not fount for function', text, index, exclusiveEndIndex)
						}
						index++
						const value = readToChar(')', isNotQuote)
						xPath.push('[contains(')
						appendValue(xPath, 'text()')
						xPath.push(',"')
						xPath.push(value.toLowerCase())
						xPath.push('")]')
						index++
						break
					default:
						if (text[index] === '(') {
							error('Unknown func name: ' + name, text, index, exclusiveEndIndex)
						}
						error('Pseudo classes is not supported in XPath selectors: ' + name, text, index, exclusiveEndIndex)
						// if (name === 'checked') {
						//     xPath.push('[@selected or @checked]')
						// } else
						// {
						xPath.push('[@')
						xPath.push(name)
						xPath.push(']')
					// }
				}
				continue
			}

			// Attributes
			if (ch === '[') {
				index++
				if (selectorStartIndex < 0) {
					selectorStartIndex = xPath.length
					if (writeStartSeparator) {
						xPath.push('*')
					}
				}
				if (!isNameChar(text[index])) {
					error('Error parse attribute name', text, index, exclusiveEndIndex)
				}
				const attributeName = readWord(isNameChar)
				ch = text[index]
				if (ch === '=') {
					index++
					const value = readToChar(']', isNotQuote)
					xPath.push('[')
					appendValue(xPath, '@' + attributeName)
					xPath.push('="')
					xPath.push(value.toLowerCase())
					xPath.push('"]')
				} else if (ch === ']') {
					xPath.push('[@')
					xPath.push(attributeName)
					xPath.push(']')
				} else {
					index++
					if (text[index] !== '=') {
						error('Error parse attribute operator', text, index, exclusiveEndIndex)
					}

					index++
					const value = readToChar(']', isNotQuote)
					switch (ch) {
						case '*':
							// *[contains(@class, 'nav navbar-nav')]
							xPath.push('[contains(')
							appendValue(xPath, '@' + attributeName)
							xPath.push(',"')
							xPath.push(value.toLowerCase())
							xPath.push('")]')
							break
						case '~':
							// [contains(concat(' ', normalize-space(@class), ' '), ' navbar-collapse ')]
							xPath.push('[contains(concat(" ",normalize-space(')
							appendValue(xPath, '@' + attributeName)
							xPath.push(')," ")," ')
							xPath.push(value.toLowerCase())
							xPath.push(' ")]')
							break
						case '^':
							// *[starts-with(@class, 'nav navbar-nav')]
							xPath.push('[contains(concat(" ",normalize-space(')
							appendValue(xPath, '@' + attributeName)
							xPath.push(')," ")," ')
							xPath.push(value.toLowerCase())
							xPath.push(' ")]')
							break
						case '$':
							// *[substring(@class, string-length(@class) - string-length('right') + 1) = 'right']
							xPath.push('[substring(')
							appendValue(xPath, '@' + attributeName)
							xPath.push(',string-length(@')
							xPath.push(attributeName)
							xPath.push(')-string-length("')
							xPath.push(value)
							xPath.push('")+1)="')
							xPath.push(value.toLowerCase())
							xPath.push('"]')
							break
						default:
							error('Error parse attribute operator', text, index, exclusiveEndIndex)
					}
				}

				index++
				continue
			}

			// Braces (for inner statements)
			if (ch === braceStart) {
				countBraces++
			} else if (ch === braceEnd) {
				countBraces--
				if (countBraces < 0) {
					return
				}
			}

			// Separator
			separator = readSeparator()
			if (separator === null) {
				if (ch !== ' ') {
					error('Error parse separator', text, index, exclusiveEndIndex)
				}
				separator = SEPARATOR_DEFAULT
			}
			xPath.push(separator)
			if (isStart) {
				// First separator
				separator = readSeparator() || SEPARATOR_FIRST_DEFAULT
				xPath.push(separator)
			}

			selectorStartIndex = -1
		}

		// see: http://plasmasturm.org/log/444/
		function readSeparator(): string {
			let newIsStart: boolean = false
			let result: string = null
			while (index < exclusiveEndIndex) {
				const ch = text[index]
				if (ch === ' ') {

				} else if (result === null) {
					if (ch === '>') {
						result = isStart
							? './'
							: '/'
					} else if (ch === '+') {
						result = isStart
							? './following-sibling::*[1]/self::'
							: '/following-sibling::*[1]/self::'
					} else if (ch === '~') {
						result = isStart
							? './following-sibling::*/self::'
							: '/following-sibling::*/self::'
					} else if (ch === ',') {
						result = '|'
						newIsStart = true
					} else
					{
						break
					}
				} else
				{
					break
				}

				index++
			}

			isStart = newIsStart

			return result
		}

		function readWord(charFilter: (char: string) => boolean): string {
			const sb = []

			let ch = text[index]
			sb.push(ch)
			index++

			while (index < exclusiveEndIndex) {
				ch = text[index]
				if (!charFilter(ch)) {
					break
				}

				sb.push(ch)

				index++
			}

			// if (sb.length === 0)
			// {
			//     throw throwError("Error read name: length === 0", text, index, exclusiveEndIndex)
			// }

			return sb.join('')
		}

		function readToChar(endChar: string, filter: (char: string) => boolean = null): string {
			const sb = []

			while (index < exclusiveEndIndex) {
				const ch = text[index]
				if (ch === endChar) {
					break
				}

				if (filter === null || filter(ch)) {
					sb.push(ch)
				}

				index++
			}

			return sb.join('')
		}
	}
}
