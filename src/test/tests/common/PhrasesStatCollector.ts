/* eslint-disable no-shadow,quotes */
import {phrasesStatToString} from '../../../main/common/phrases-helpers'
import {PhrasesStat} from '../../../main/common/PhrasesStat'
import {PhrasesStatCollector} from '../../../main/common/PhrasesStatCollector'
import {WordsCache} from '../../../main/common/WordsCache'

describe('node > PhrasesStatCollector', function () {
	it('base', function () {
		const wordsCache = new WordsCache()
		const phrasesStat = new PhrasesStat()
		const phrasesStatCollector = new PhrasesStatCollector({
			wordsCache,
			phrasesStat,
		})

		const totalWords = phrasesStatCollector.addText(` Word’B - WordA   Word-C \t worda <p> word-c  wordA </p> wordD Wordd  - `)

		assert.strictEqual(totalWords, 8)

		phrasesStat.reduce(true)
		const statStr = phrasesStatToString(wordsCache, phrasesStat.entries())

		console.log(statStr)

		assert.strictEqual(statStr, "3\tWordA\r\n2\tWord-C\r\n2\twordD\r\n2\tWord-C WordA\r\n1\tWord'B")
	})
})
