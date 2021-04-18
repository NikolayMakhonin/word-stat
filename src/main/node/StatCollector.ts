import {decode} from 'html-entities'
import {IStatCollector} from './contracts'

type TTextPreprocess = (text: string) => string

export function removeHtmlTags(text: string) {
	text = text.replace(/<description>.*?<\/description>|<binary .*?<\/binary>|<[a-zA-Z][\w\-]*(\s[^\r\n>]*)?\/?>|<\/[a-zA-Z][\w\-]*>|<\?[a-zA-Z][\w\-]*(\s[^\r\n>]*)?\?>/is, '\r\n')
	text = decode(text)
	return text
}

export function fixApostrophes(text: string) {
	return text.replace(/[’Т�'`\u2019\u0422\x92]/, "'")
}

export function textPreprocessorDefault(text: string) {
	text = removeHtmlTags(text)
	text = fixApostrophes(text)
	return text
}

export class StatCollector implements IStatCollector {
	_preprocess: TTextPreprocess
	constructor({
		preprocess,
	}:{
		preprocess: TTextPreprocess,
	}) {
		this._preprocess = preprocess
	}

	addText(text: string) {
		text = (this._preprocess || textPreprocessorDefault)(text)
	}
}
