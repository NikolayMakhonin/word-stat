/* eslint-disable no-shadow,quotes */
import {phrasesStatToString} from '../../../main/common/phrases-helpers'
import {PhrasesStat} from '../../../main/common/PhrasesStat'
import {PhrasesStatCollector} from '../../../main/common/PhrasesStatCollector'
import {WordsCache} from '../../../main/common/WordsCache'
import {processFiles} from '../../../main/node/processFiles'
import path from 'path'
import fse from 'fs-extra'

describe('node > test', function () {
	it('base', async function () {
		const wordsCache = new WordsCache()
		const phrasesStat = new PhrasesStat()
		const phrasesStatCollector = new PhrasesStatCollector({
			wordsCache,
			phrasesStat,
		})

		await processFiles({
			fileOrDirPath: 'e:\\RemoteData\\Mega2\\Text\\Books\\Учебники\\English\\Books\\B1 pre-intermediate\\The Law of Life - Jack London.txt',
			async processFile(filePath) {
				if (!/\.(txt|fb2)$/i.test(filePath)) {
					return
				}
				const text = await fse.readFile(filePath, { encoding: 'utf-8' })
				phrasesStatCollector.addText(text)
			},
		})

		phrasesStat.reduce(true)
		const statStr = phrasesStatToString(wordsCache, phrasesStat.entries())

		console.log(statStr)
	})
})
