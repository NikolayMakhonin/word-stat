import {IPhrasesStatCollector} from './contracts'
import {
	createPhrasePattern,
	createRegExp,
	createWordPattern,
	getPhraseId,
	parsePhrases,
	parseWordsIds,
	processPhraseCombines,
} from './phrases-helpers'
import {PhrasesStat} from './PhrasesStat'
import {textPreprocess} from './textPreprocess'
import {WordsCache} from './WordsCache'

type TTextPreprocess = (text: string) => string

export class PhrasesStatCollector implements IPhrasesStatCollector {
	_wordsCache: WordsCache
	_phrasesStat: PhrasesStat
	_textPreprocess: TTextPreprocess
	_wordRegExp: RegExp
	_phraseRegExp: RegExp
	_filterPhrases?: (phraseId: string) => boolean
	_filterText?: (text: string) => boolean
	_maxPhraseLength?: number

	constructor({
		phrasesStat,
		wordsCache,
		textPreprocess: _textPreprocess,
		lettersPatern,
		wordPattern,
		betweenLettersPattern,
		filterPhrases,
		filterText,
		maxPhraseLength,
	}:{
		phrasesStat: PhrasesStat,
		wordsCache: WordsCache,
		textPreprocess?: TTextPreprocess,
		lettersPatern?: string,
		wordPattern?: string,
		betweenLettersPattern?: string,
		filterPhrases?: (phraseId: string) => boolean,
		filterText?: (text: string) => boolean
		maxPhraseLength?: number,
	}) {
		this._wordsCache = wordsCache
		this._phrasesStat = phrasesStat
		this._textPreprocess = _textPreprocess || textPreprocess
		this._filterPhrases = filterPhrases
		this._filterText = filterText
		this._maxPhraseLength = maxPhraseLength

		// eslint-disable-next-line quotes
		wordPattern = wordPattern || createWordPattern(lettersPatern || `[a-zA-Zа-яА-ЯёЁ_]|(?<=[a-zA-Z])'(?=[a-zA-Z])|(?<=[a-zA-Zа-яА-ЯёЁ_])-(?=[a-zA-Zа-яА-ЯёЁ_])`)
		this._wordRegExp = createRegExp(wordPattern)
		// eslint-disable-next-line quotes
		this._phraseRegExp = createRegExp(createPhrasePattern(wordPattern, betweenLettersPattern || `[ \t]`))
	}

	addText(text: string): number {
		let totalWords: number = 0
		text = (this._textPreprocess || textPreprocess)(text)
		if (this._filterText && !this._filterText(text)) {
			return 0
		}
		parsePhrases(text, this._phraseRegExp, phrase => {
			const wordsIds = parseWordsIds(phrase, this._wordRegExp, this._wordsCache)
			totalWords += wordsIds.length
			this._phrasesStat.addCombines(wordsIds, 1, this._maxPhraseLength, this._filterPhrases)
		})
		return totalWords
	}

	clear() {
		this._wordsCache.clear()
		this._phrasesStat.clear()
	}
}
