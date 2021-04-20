import {IPhraseStat} from './PhrasesStat'
import {WordsCache} from './WordsCache'

export function createWordPattern(
	lettersPatern: string,
) {
	return `(?:${lettersPatern})+`
}

export function createPhrasePattern(
	wordPatern: string,
	betweenLettersPattern: string,
) {
	return `((?:${wordPatern})((?:${betweenLettersPattern})*?(?:${wordPatern})+)*)+`
}

export function createRegExp(
	pattern: string,
) {
	return new RegExp(pattern, 'sg')
}

export function parsePhrases(
	text: string,
	phraseRegExp: RegExp,
	processPhrase: (phrase: string) => void,
) {
	let result: string[]
	while ((result = phraseRegExp.exec(text)) !== null) {
		processPhrase(result[0])
	}
}

export function parseWordsIds(
	phrase: string,
	wordRegExp: RegExp,
	wordsCache: WordsCache,
): string[] {
	const words = phrase.match(wordRegExp)
	const wordsIds = []
	for (let i = 0, len = words.length; i < len; i++) {
		wordsIds.push(wordsCache.put(words[i]))
	}
	return wordsIds
}

export function processPhraseCombines(
	wordsIds: string[],
	wordsCache: WordsCache,
	maxPhraseLength: number|null,
	processPhrase: (wordsIds: string[], indexStart: number, indexEnd: number) => void,
) {
	for (let i = 0, len = wordsIds.length; i < len; i++) {
		const len2 = maxPhraseLength
			? Math.min(i + maxPhraseLength, len)
			: len
		for (let j = i + 1; j <= len2; j++) {
			processPhrase(wordsIds, i, j)
		}
	}
}

export function getPhraseId(wordsIds: string[], indexStart: number, indexEndExclusie: number) {
	let phraseId = ''
	for (let i = indexStart; i < indexEndExclusie; i++) {
		if (phraseId) {
			phraseId += '_'
		}
		phraseId += wordsIds[i]
	}
	return phraseId
}

export function phraseIdToWordsIds(phraseId: string) {
	return phraseId.split('_')
}

export function wordsIdsToPhrase(wordsCache: WordsCache, wordsIds: string[]) {
	let phrase = ''
	for (let i = 0, len = wordsIds.length; i < len; i++) {
		if (phrase) {
			phrase += ' '
		}
		phrase += wordsCache.get(wordsIds[i])
	}
	return phrase
}

export function phrasesStatToString(wordsCache: WordsCache, entries: [string, IPhraseStat][]) {
	let result = ''
	for (let i = 0, len = entries.length; i < len; i++) {
		const [phraseId, phraseStat] = entries[i]
		if (phraseStat.count === 1 && phraseStat.wordsCount > 1) {
			continue
		}
		if (result) {
			result += '\r\n'
		}
		const wordsIds = phraseIdToWordsIds(phraseId)
		const phrase = wordsIdsToPhrase(wordsCache, wordsIds)
		result += phraseStat.count
		result += '\t'
		result += phrase
	}
	return result
}

export function countRuSymbols(text: string) {
	let count = 0
	for (let i = 0, len = text.length; i < len; i++) {
		const ch = text.charCodeAt(i)
		if (
			ch >= 1040 && ch <= 1103 // а-я А-Я
			|| ch === 1105 // ё
			|| ch === 1025 // Ё
		) {
			count++
		}
	}
	return count
}
