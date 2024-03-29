/* eslint-disable @typescript-eslint/no-shadow,quotes */
import path from "path"
import {distinct} from '../common/helpers'
import {createRegExp, createWordPattern, phrasesStatToString} from '../common/phrases-helpers'
import {removeHtmlTags} from '../common/textPreprocess'
import {WordsCache} from '../common/WordsCache'
import {WordsStat} from '../common/WordsStat'
import {xmlBookBufferToString} from './helpers'
import fse from 'fs-extra'
import {
	calcWordStat,
	processBooks,
	processLibgen as _processLibgen,
	ILibgenBookStat,
	libgenUnpack as _libgenUnpack,
	readBookStats,
	createReportLibgen,
	createReportBooks,
	calcStat,
	wordsPerPage,
	calcPhrasesStat,
	IMyBookStat,
	parseLibgenDbDescriptions,
} from './process'

// const lettersPatern = `[a-zA-Z]|(?<=[a-zA-Z])[-](?=[a-zA-Z])`
const wordPattern = `(?<=[a-zA-Z])'[a-zA-Z]+|[a-zA-Z]+-[a-zA-Z]+|[a-zA-Z]+`
// const wordRegExp = createRegExp(createWordPattern(lettersPatern))
const wordRegExp = createRegExp(wordPattern)

function filterXmlBooks(isDir, archivePath, _fileOrDirPath) {
	if (!isDir && !/\.(csv|txt|fb2|srt)$/i.test(_fileOrDirPath)) {
		return false
	}
	return true
}

let wasReadStat: WordsStat
async function calcWasReadStat() {
	if (wasReadStat == null) {
		wasReadStat = await calcWordStat({
			wordRegExp,
			fileOrDirPath : 'e:/RemoteData/Mega2/Text/Books/Учебники/English/WasRead',
			filterPaths   : filterXmlBooks,
			bufferToString: xmlBookBufferToString,
		})
	}

	return wasReadStat
}

export async function processMyBooks() {
	const wasReadStat = await calcWasReadStat()

	await processBooks({
		booksDir   : 'f:/Torrents/New/test/result/books',
		resultsDir : 'f:/Torrents/New/test/result/myBooks',
		filterPaths: filterXmlBooks,
		wordRegExp,
		wordFilter(word) {
			return !wasReadStat.has(word)
		},
	})
}

export async function myBooksReport() {
	await createReportBooks({resultsDir: 'f:/Torrents/New/test/result/myBooks'})
}


export async function myBooksPhrasesStat() {
	const maxPhraseLength = 1

	const wordsCache = new WordsCache()

	const wasReadStat = await calcStat({
		maxPhraseLength,
		wordsCache,
		wordPattern,
		fileOrDirPath: 'f:/Torrents/New/test/result/WasRead/',
	})

	console.log('Known words: ' + wordsCache.size())

	const dbDescriptionsPath = 'f:/Torrents/New/text/db/ff/fiction_description.csv'
	const descriptions = dbDescriptionsPath
		? await parseLibgenDbDescriptions(dbDescriptionsPath)
		: null

	const resultDir = 'f:/Torrents/New/test/result/books-stat/'
	await calcPhrasesStat<IMyBookStat>({
		maxPhraseLength,
		wordsCache,
		wordPattern,
		bookStatsFile  : 'f:/Torrents/New/test/result/myBooks/stat.json',
		rootDir        : 'f:/Torrents/New/test/result/books/',
		filterPhrases(phraseId: string) {
			return !wasReadStat.has(phraseId)
		},
		async onFileHandled(filePath, filePathRelative, _phrasesStat, bookStat) {
			_phrasesStat.reduce(true)
			let resultPath = path.resolve(resultDir, filePathRelative.replace(/[\\/:]+/g, ' - '))

			const entries = _phrasesStat.entries()
			entries.sort((o1, o2) => {
				if (o1[1].count !== o2[1].count) {
					return o1[1].count > o2[1].count ? -1 : 1
				}
				if (o1[1].wordsCount !== o2[1].wordsCount) {
					return o1[1].wordsCount > o2[1].wordsCount ? 1 : -1
				}
				return 0
			})

			resultPath = resultPath.replace(/([\\/])(?:\d+ *- *)?([^\\/]+?)(?:\.\w+)?$/, `$1${Math.round(bookStat.unknownWordsIn100Pages * 100).toString().padStart(5, '0')} - $2`)

			const [, hash] = bookStat.filePath.match(/[\\/](?:\d+ *- *)?(?:([\da-f]{32}) *- *)?([^\\/]+?)(?:\.\w+)?$/)
			const description = hash && removeHtmlTags(descriptions[hash.toUpperCase()] || '')

			const statStr =
`unknownWordsIn3Pages  : ${bookStat.unknownWordsIn3Pages}
unknownWordsIn20Pages : ${bookStat.unknownWordsIn20Pages}
unknownWordsIn100Pages: ${bookStat.unknownWordsIn100Pages}
unknownWords          : ${bookStat.unknownWords}
totalPages            : ${bookStat.totalWords / wordsPerPage}
filePath: ${bookStat.filePath}

${description ? description + '\r\n\r\n' : ''}${phrasesStatToString(wordsCache, entries)}
`
			const dir = path.dirname(resultPath)
			if (!fse.existsSync(dir)) {
				await fse.mkdirp(dir)
			}

			await Promise.all([
				fse.writeFile(resultPath + '._', statStr, { encoding: 'utf-8' }),
				fse.copyFile(filePath, resultPath + path.extname(filePath)),
			])

			_phrasesStat.clear()
		},
	})

	// const wordsCache = new WordsCache()
	//
	// const wasReadStat = await calcStat({
	// 	wordsCache,
	// 	fileOrDirPath: 'e:/RemoteData/Mega2/Text/Books/Учебники/English/WasRead',
	// })
	//
	// const resultDir = path.resolve('tmp/result')
	// if (fse.existsSync(resultDir)) {
	// 	await fse.rmdir(resultDir, {recursive: true})
	// }
	//
	// const wantReadStat = await calcStat({
	// 	wordsCache,
	// 	// fileOrDirPath: 'e:/RemoteData/Mega2/Text/Books/Учебники/English/Books/16 - This Body of Death.fb2',
	// 	fileOrDirPath: 'e:/RemoteData/Mega2/Text/Books/Учебники/English/Books',
	// 	filterPhrases(phraseId: string) {
	// 		return !wasReadStat.has(phraseId)
	// 	},
	// })
	//
	// // wantReadStat.reduce(true)
	// // const statStr = phrasesStatToString(wordsCache, wantReadStat.entries())
	// //
	// // console.log(statStr)
}

export async function myCustomTextsPhrasesStat() {
	const maxPhraseLength = 5

	const wordsCache = new WordsCache()

	const wasReadStat = await calcStat({
		maxPhraseLength,
		wordsCache,
		wordPattern,
		fileOrDirPath: 'j:/Torrents/New/test/result/WasRead/',
	})

	console.log('Known words: ' + wordsCache.size())

	const resultDir = 'e:/Temp/srt/stat'
	const wantReadStats = await calcPhrasesStat<IMyBookStat>({
		maxPhraseLength,
		wordsCache,
		wordPattern,
		bookStatsFile  : 'j:/Torrents/New/test/result/myBooks/stat.json',
		rootDir        : 'e:/Temp/srt/Wednesday',
		filterPhrases(phraseId: string) {
			return !wasReadStat.has(phraseId)
		},
	})

	let resultPath = path.join(resultDir, 'stat.txt')

	const entries = wantReadStats.entries()
	entries.sort((o1, o2) => {
		if (o1[1].count !== o2[1].count) {
			return o1[1].count > o2[1].count ? -1 : 1
		}
		if (o1[1].wordsCount !== o2[1].wordsCount) {
			return o1[1].wordsCount > o2[1].wordsCount ? 1 : -1
		}
		return 0
	})

	const statStr = phrasesStatToString(wordsCache, entries)

	const dir = path.dirname(resultPath)
	if (!fse.existsSync(dir)) {
		await fse.mkdirp(dir)
	}

	await fse.writeFile(resultPath + '._', statStr, { encoding: 'utf-8' })
}

export async function processLibgen() {
	const wasReadStat = await calcWasReadStat()

	const downloadedStr = await fse.readFile('f:/Torrents/New/test/result/downloaded.txt', { encoding: 'utf-8' })
	const downloaded = downloadedStr
		.match(/(?<=\btext[\\/]ff[\\/])\d+(?=\.tar\.xz\b)/g)
		.reduce((a, o) => {
			a[o] = true
			return a
		}, {})

	await _processLibgen({
		dbPath    : 'f:/Torrents/New/text/db/ff/simple.csv',
		booksDir  : 'f:/Torrents/New/text/text/',
		resultsDir: 'f:/Torrents/New/test/result/',
		wordRegExp,
		filterPaths(isDir, archivePath, fileOrDirPath) {
			if (!isDir && !archivePath) {
				const id = fileOrDirPath.match(/(?<=\btext[\\/]ff[\\/])\d+(?=\.tar\.xz$)/)?.[0]
				return id && downloaded[id]
			}
			return true
		},
		wordFilter(word) {
			return !wasReadStat.has(word)
		},
	})
}

export async function libgenReport() {
	let bookStats = await readBookStats<ILibgenBookStat>('f:/Torrents/New/test/result/stat.json')
	bookStats = distinct(bookStats, o => o.hash).slice(0, 10000)

	await createReportLibgen({
		resultsDir: 'f:/Torrents/New/test/result/',
		bookStats,
	})
}

export async function libgenUnpack() {
	let bookStats = await readBookStats<ILibgenBookStat>('f:/Torrents/New/test/result/stat.json')
	bookStats = distinct(bookStats, o => o.hash).slice(0, 10000)

	await createReportLibgen({
		resultsDir: 'f:/Torrents/New/test/result/',
		bookStats,
	})

	await _libgenUnpack({
		bookStats,
		dbPath   : 'f:/Torrents/New/text/db/ff/simple.csv',
		booksDir : 'f:/Torrents/New/text/text/ff',
		unpackDir: 'f:/Torrents/New/test/result/books',
	})
}
