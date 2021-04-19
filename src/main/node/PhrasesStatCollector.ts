import {IPhrasesStatCollector} from './contracts'
import {
	createPhrasePattern,
	createRegExp,
	createWordPattern, getPhraseId,
	parsePhrases,
	parseWordsIds,
	processPhraseCombines
} from './parse-phrases'
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

	constructor({
		phrasesStat,
		wordsCache,
		textPreprocess,
		lettersPatern,
		betweenLettersPattern,
	}:{
		phrasesStat: PhrasesStat,
		wordsCache: WordsCache,
		textPreprocess?: TTextPreprocess,
		lettersPatern?: string,
		betweenLettersPattern?: string,
	}) {
		this._wordsCache = wordsCache
		this._phrasesStat = phrasesStat
		this._textPreprocess = textPreprocess

		const wordPattern = createWordPattern(lettersPatern || `[a-zA-Zа-яА-ЯёЁ_]|\\b['-]\\b`)
		this._wordRegExp = createRegExp(wordPattern)
		this._phraseRegExp = createRegExp(createPhrasePattern(wordPattern, betweenLettersPattern || `[ \t'-]`))

	}

	addText(text: string) {
		text = (this._textPreprocess || textPreprocess)(text)
		parsePhrases(text, this._phraseRegExp, phrase => {
			const wordsIds = parseWordsIds(phrase, this._wordRegExp, this._wordsCache)
			processPhraseCombines(wordsIds, this._wordsCache, (wordsIds, indexStart, indexEndExclusie) => {
				const phraseId = getPhraseId(wordsIds, indexStart, indexEndExclusie)
				this._phrasesStat.add(phraseId, indexEndExclusie - indexStart)
			})
		})
	}

	clear() {
		this._wordsCache.clear()
		this._phrasesStat.clear()
	}
}
