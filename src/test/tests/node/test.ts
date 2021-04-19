/* eslint-disable no-shadow */
import {phrasesStatToString} from '../../../main/node/parse-phrases'
import {PhrasesStat} from '../../../main/node/PhrasesStat'
import {PhrasesStatCollector} from '../../../main/node/PhrasesStatCollector'
import {test} from '../../../main/node/test'
import {WordsCache} from '../../../main/node/WordsCache'

describe('node > test', function () {
	it('test', function () {
		const wordsCache = new WordsCache()
		const phrasesStat = new PhrasesStat()
		const phrasesStatCollector = new PhrasesStatCollector({
			wordsCache,
			phrasesStat,
		})

		phrasesStatCollector.addText(`' - Word1 word'2 ' word-3 - word1 - '`)

		phrasesStat.reduce(true)
		const statStr = phrasesStatToString(wordsCache, phrasesStat.entries())

		console.log(statStr)

		assert.strictEqual(statStr, 'test')
	})
})
