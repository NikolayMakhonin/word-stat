import {TWordsCache} from './contracts'
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
	return new RegExp(`((?:${wordPatern})((?:${betweenLettersPattern})?(?:${wordPatern}))*)+`, 'sg')
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
): number[] {
	const words = phrase.match(wordRegExp)
	const wordsIds = []
	for (let i = 0, len = words.length; i < len; i++) {
		wordsIds.push(wordsCache.put(words[i]))
	}
	return wordsIds
}

export function processPhraseCombines({
	wordsIds,
	wordsCache,
	processPhrase,
}: {
	wordsIds: number[],
	wordsCache: WordsCache,
	processPhrase: (wordsCache: WordsCache, wordsIds: number[], indexStart: number, indexEnd: number) => void,
}) {
	for (let i = 0, len = wordsIds.length; i < len; i++) {
		for (let j = i, len = wordsIds.length; j < len; j++) {
			processPhrase(wordsCache, wordsIds, i, j)
		}
	}
}

export function normalize(str: string) {
	str = str.trim().toLowerCase().replace('ё', 'е')
	return str
}
