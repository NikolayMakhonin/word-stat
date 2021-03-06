/* eslint-disable no-shadow,quotes */
import {
	countRuSymbols,
	createRegExp,
	createWordPattern,
	phrasesStatToString,
} from '../../../main/common/phrases-helpers'
import {PhrasesStat} from '../../../main/common/PhrasesStat'
import {PhrasesStatCollector} from '../../../main/common/PhrasesStatCollector'
import {WordsCache} from '../../../main/common/WordsCache'
import {WordsStat} from '../../../main/common/WordsStat'
import {xmlBookBufferToString, xmlBufferToString} from '../../../main/node/helpers'
import {
	calcStat,
	calcWordStat,
	ILibgenBookStat,
	processBooks,
	readBookStats,
	wordsPerPage,
} from '../../../main/node/process'
import {processArchiveTarXz} from '../../../main/node/processFiles'
import path from 'path'
import fse from 'fs-extra'
import {IBook, processLibRusEc} from '../../../main/node/processLibRusEc'
import {
	libgenReport,
	libgenUnpack,
	myBooksPhrasesStat,
	myBooksReport,
	processLibgen,
	processMyBooks
} from '../../../main/node/scripts'

describe('node > test', function () {
	this.timeout(30 * 24 * 60 * 60 * 1000)

	// const dbPath = 'e:/Torrents/Completed/_Lib.rus.ec/MyHomeLib_2_2/Data/librusec_local_fb2.hlc2'
	// const booksDir = 'e:/Torrents/Completed/_Lib.rus.ec/lib.rus.ec'

	// it('libRusEc', async function () {
	// 	const wordsCache = new WordsCache()
	//
	// 	const wasReadStat = await calcStat({
	// 		wordsCache,
	// 		fileOrDirPath  : 'e:/RemoteData/Mega2/Text/Books/Учебники/English/WasRead',
	// 		maxPhraseLength: 1,
	// 	})
	//
	// 	const stateFile = path.resolve('tmp/libRusEc/state.txt')
	// 	const reportFile = path.resolve('tmp/libRusEc/report.txt')
	// 	const dir = path.dirname(reportFile)
	//
	// 	if (!fse.existsSync(dir)) {
	// 		await fse.mkdirp(dir)
	// 	}
	//
	// 	const state: {
	// 		[bookId: string]: {
	// 			bookId: number,
	// 			unknownWordsInFirstPage: number,
	// 			unknownWords: number,
	// 			totalWords: number,
	// 			bookName: string,
	// 		}
	// 	} = fse.existsSync(stateFile)
	// 		? JSON.parse(await fse.readFile(stateFile, { encoding: 'utf-8' }))
	// 		: {}
	//
	// 	let prevTime = Date.now()
	//
	// 	async function save() {
	// 		wordsCache.clear()
	//
	// 		await fse.writeFile(stateFile, JSON.stringify(state), { encoding: 'utf-8' })
	//
	// 		const report = Object.values(state)
	// 			.sort((o1, o2) => {
	// 				return o1.unknownWordsInFirstPage > o2.unknownWordsInFirstPage
	// 					? 1
	// 					: -1
	// 			})
	// 			.map(o => {
	// 				const totalPages = o.totalWords / wordsPerPage
	// 				return o.unknownWordsInFirstPage.toFixed(2) + '\t'
	// 					+ o.unknownWords + '\t'
	// 					+ totalPages + '\t'
	// 					+ o.bookId + '\t'
	// 					+ o.bookName.trim()
	// 			})
	// 			.join('\r\n')
	//
	// 		await fse.writeFile(reportFile, report, { encoding: 'utf-8' })
	// 	}
	//
	// 	await processLibRusEc({
	// 		dbPath,
	// 		booksDir,
	// 		lang: 'en',
	// 		async processBook(book: IBook, text: string) {
	// 			// console.log(text.substring(0, 1000))
	//
	// 			if (state[book.BookID]) {
	// 				return
	// 			}
	//
	// 			const phrasesStat = new PhrasesStat()
	// 			const phrasesStatCollector = new PhrasesStatCollector({
	// 				wordsCache,
	// 				phrasesStat,
	// 				lettersPatern,
	// 				filterPhrases(phraseId: string) {
	// 					return !wasReadStat.has(phraseId)
	// 				},
	// 				filterText(text: string) {
	// 					if (book.Lang.toUpperCase() !== 'RU') {
	// 						const ruSymbols = countRuSymbols(text)
	// 						if (ruSymbols > 0.1 * text.length) {
	// 							return false
	// 						}
	// 					}
	// 					return true
	// 				},
	// 				maxPhraseLength: 1,
	// 			})
	//
	// 			const totalWords = phrasesStatCollector.addText(text)
	//
	// 			if (!totalWords) {
	// 				return
	// 			}
	//
	// 			const entries = phrasesStat.entries()
	// 			const unknownWords = entries.reduce((a, o) => {
	// 				return o[1].wordsCount === 1
	// 					? a + 1
	// 					: a
	// 			}, 0)
	// 			const unknownWordsInFirstPage = entries.reduce((a, o) => {
	// 				if (o[1].wordsCount !== 1) {
	// 					return a
	// 				}
	// 				const countInFirstPages = Math.min(1, o[1].count * firstPagesForEstimate * wordsPerPage / totalWords)
	// 				return a + countInFirstPages
	// 			}, 0) / firstPagesForEstimate
	//
	// 			const bookName = (
	// 				book.AuthorFirstName + ' '
	// 				+ book.AuthorMiddleName + ' '
	// 				+ book.AuthorLastName + ' - '
	// 				+ book.Title).replace(/\s+/g, ' ',
	// 			).trim()
	//
	// 			state[book.BookID] = {
	// 				bookId: book.BookID,
	// 				unknownWordsInFirstPage,
	// 				unknownWords,
	// 				totalWords,
	// 				bookName,
	// 			}
	//
	// 			const now = Date.now()
	// 			if (now - prevTime > 60 * 1000) {
	// 				prevTime = now
	// 				await save()
	// 			}
	// 		},
	// 	})
	//
	// 	await save()
	// })

	it('my books', async function () {
		await processMyBooks()
	})

	it('my books report', async function () {
		await myBooksReport()
	})

	it('my books phrases stat', async function () {
		await myBooksPhrasesStat()
	})

	it('libgen', async function () {
		await processLibgen()
	})

	it('libgen unpack', async function () {
		await libgenUnpack()
	})

	it('libgen report', async function () {
		await libgenReport()
	})
})
