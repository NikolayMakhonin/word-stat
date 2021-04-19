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

		phrasesStatCollector.addText(` Word’B - WordA  Word-C \t worda ; word-c wordA , wordD Wordd  - `)

		phrasesStat.reduce(true)
		const statStr = phrasesStatToString(wordsCache, phrasesStat.entries())

		console.log(statStr)

		assert.strictEqual(statStr, "3\tWordA\r\n2\tWord-C\r\n2\twordD\r\n2\tWord-C WordA\r\n1\tWord'B")
	})
})
