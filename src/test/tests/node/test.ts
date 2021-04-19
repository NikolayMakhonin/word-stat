/* eslint-disable no-shadow,quotes */
import {phrasesStatToString} from '../../../main/common/phrases-helpers'
import {PhrasesStat} from '../../../main/common/PhrasesStat'
import {PhrasesStatCollector} from '../../../main/common/PhrasesStatCollector'
import {WordsCache} from '../../../main/common/WordsCache'
import {processFiles} from '../../../main/node/processFiles'
import path from 'path'
import fse from 'fs-extra'

describe('node > test', function () {
	this.timeout(6000000)

	async function calcStat({
		wordsCache,
		fileOrDirPath,
		filterPhrases,
		onFileHandled,
	}: {
		wordsCache: WordsCache,
		fileOrDirPath: string,
		filterPhrases?: (phraseId: string) => boolean,
		onFileHandled?: (filePath: string, filePathRelative: string, phrasesStat: PhrasesStat, totalWords: number) => Promise<void>|void,
	}) {
		const phrasesStat = new PhrasesStat()
		const phrasesStatCollector = new PhrasesStatCollector({
			wordsCache,
			phrasesStat,
			filterPhrases,
		})

		await processFiles({
			fileOrDirPath,
			async processFile(filePath, filePathRelative) {
				if (!/\.(txt|fb2)$/i.test(filePath)) {
					return
				}
				const text = await fse.readFile(filePath, { encoding: 'utf-8' })
				const totalWords = phrasesStatCollector.addText(text)
				if (onFileHandled) {
					await onFileHandled(filePath, filePathRelative, phrasesStat, totalWords)
				}
			},
		})

		phrasesStat.reduce(true)

		return phrasesStat
	}

	it('base', async function () {
		const wordsCache = new WordsCache()

		const wasReadStat = await calcStat({
			wordsCache,
			fileOrDirPath: 'e:\\RemoteData\\Mega2\\Text\\Books\\Учебники\\English\\WasRead',
		})

		const resultDir = 'tmp/result'
		if (fse.existsSync(resultDir)) {
			await fse.rmdir(resultDir, {recursive: true})
		}

		const wantReadStat = await calcStat({
			wordsCache,
			fileOrDirPath: 'e:\\RemoteData\\Mega2\\Text\\Books\\Учебники\\English\\Books',
			filterPhrases(phraseId: string) {
				return !wasReadStat.has(phraseId)
			},
			async onFileHandled(filePath, filePathRelative, phrasesStat, totalWords) {
				phrasesStat.reduce(true)
				let resultPath = path.resolve(resultDir, filePathRelative.replace(/[\\/]/g, ' - '))

				const entries = phrasesStat.entries()
				const unknownWords = entries.reduce((a, o) => {
					return o[1].wordsCount === 1
						? a + 1
						: a
				}, 0)

				const wordsPerPage = 200
				const totalPages = totalWords / wordsPerPage
				const unknownWordsPer100Pages = Math.round(unknownWords / (totalPages / 100))

				resultPath = resultPath.replace(/([\\/])([^\\/]+)$/, `$1${unknownWordsPer100Pages.toString().padStart(5, '0')} - $2`)
				resultPath = resultPath.replace(/\.\w+$/, '.txt')

				const statStr = phrasesStatToString(wordsCache, entries)

				const dir = path.dirname(resultPath)
				if (!fse.existsSync(dir)) {
					await fse.mkdirp(dir)
				}

				await fse.writeFile(resultPath, statStr, { encoding: 'utf-8' })

				phrasesStat.clear()
			},
		})

		// wantReadStat.reduce(true)
		// const statStr = phrasesStatToString(wordsCache, wantReadStat.entries())
		//
		// console.log(statStr)
	})
})
