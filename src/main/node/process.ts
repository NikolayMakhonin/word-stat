/* eslint-disable quotes,no-await-in-loop */
import fse from 'fs-extra'
import path from "path"
import {Readable} from "stream"
import {
	parsePhrases, phrasesStatToString,
} from '../common/phrases-helpers'
import {PhrasesStat} from '../common/PhrasesStat'
import {PhrasesStatCollector} from '../common/PhrasesStatCollector'
import {removeHtmlTags} from '../common/textPreprocess'
import {WordsCache} from '../common/WordsCache'
import {WordsStat} from '../common/WordsStat'
import {streamToBuffer, txtBookBufferToString, xmlBookBufferToString} from './helpers'
import {processArchiveTarXz, processFiles} from './processFiles'
import papaparse, {ParseResult} from 'papaparse'

export const wordsPerPage = 200

export async function calcStat({
	wordsCache,
	fileOrDirPath,
	filterPhrases,
	maxPhraseLength,
	lettersPatern,
	wordPattern,
	onFileHandled,
}: {
	wordsCache: WordsCache,
	fileOrDirPath: string,
	filterPhrases?: (phraseId: string) => boolean,
	maxPhraseLength?: number,
	lettersPatern?: string,
	wordPattern?: string,
	onFileHandled?: (
		filePath: string,
		filePathRelative: string,
		phrasesStat: PhrasesStat,
		totalWords: number,
	) => Promise<void>|void,
}) {
	const phrasesStat = new PhrasesStat()
	const phrasesStatCollector = new PhrasesStatCollector({
		wordsCache,
		phrasesStat,
		lettersPatern,
		wordPattern,
		filterPhrases,
		maxPhraseLength,
	})

	await processFiles({
		fileOrDirPath,
		readBuffer     : true,
		processArchives: true,
		filterPaths(isDir, archivePath, _fileOrDirPath) {
			if (!isDir && !/\.(txt|fb2)$/i.test(_fileOrDirPath)) {
				return false
			}
			return true
		},
		async processFile(rootDir, archivePath, filePath, stream, buffer) {
			const text = xmlBookBufferToString(buffer)
			const totalWords = phrasesStatCollector.addText(text)
			if (onFileHandled) {
				const filePathRelative = path.relative(rootDir, filePath)
				await onFileHandled(filePath, filePathRelative, phrasesStat, totalWords)
			}
		},
	})

	phrasesStat.reduce(true)

	return phrasesStat
}

export async function calcWordStat({
	wordRegExp,
	fileOrDirPath,
	filterPaths,
	bufferToString,
}: {
	wordRegExp: RegExp,
	fileOrDirPath: string,
	filterPaths?: (isDir: boolean, archivePath: string, fileOrDirPath: string) => boolean,
	bufferToString: (buffer: Buffer) => Promise<string>|string,
}) {
	const wordsStat = new WordsStat()
	await processFiles({
		fileOrDirPath,
		readBuffer     : true,
		processArchives: true,
		filterPaths,
		async processFile(rootDir, archivePath, filePath, stream, buffer) {
			const text = await bufferToString(buffer)

			// let totalWords = 0
			parsePhrases(text, wordRegExp, word => {
				// totalWords++
				word = word.toLowerCase()
				wordsStat.add(word)
			})

			// console.log('totalWords:', totalWords)
		},
	})

	return wordsStat
}

export interface IBookStat {
	unknownWordsIn3Pages: number,
	unknownWordsIn20Pages: number,
	unknownWordsIn100Pages: number,
	unknownWords: number,
	totalWords: number,
}

export interface ILibgenBookStat extends IBookStat {
	id: number,
	hash: string,
}

export interface IMyBookStat extends IBookStat {
	filePath: string
}

export function analyzeBook({
	text,
	wordRegExp,
	wordFilter,
}: {
	text: string,
	wordRegExp: RegExp,
	wordFilter: (word: string) => boolean,
}): IBookStat {
	const wordStat = new WordsStat()
	let totalWords = 0
	parsePhrases(text, wordRegExp, word => {
		totalWords++
		word = word.toLowerCase()
		if (wordFilter && !wordFilter(word)) {
			return
		}
		wordStat.add(word)
	})

	if (!totalWords) {
		return null
	}

	const values = Array.from(wordStat.values())

	const unknownWords = values.length

	const countPages = totalWords / wordsPerPage
	const unknownWordsPerPage = unknownWords / countPages
	let unknownWordsIn3Pages = 0
	let unknownWordsIn20Pages = 0
	let unknownWordsIn100Pages = 0

	values.forEach(o => {
		unknownWordsIn3Pages += Math.min(1, o * 3 / countPages)
		unknownWordsIn20Pages += Math.min(1, o * 20 / countPages)
		unknownWordsIn100Pages += Math.min(1, o * 100 / countPages)
	})

	unknownWordsIn3Pages = countPages > 3 ? unknownWordsIn3Pages / 3 : unknownWordsPerPage
	unknownWordsIn20Pages = countPages > 20 ? unknownWordsIn20Pages / 20 : unknownWordsPerPage
	unknownWordsIn100Pages = countPages > 100 ? unknownWordsIn100Pages / 100 : unknownWordsPerPage

	return {
		unknownWordsIn3Pages,
		unknownWordsIn20Pages,
		unknownWordsIn100Pages,
		unknownWords,
		totalWords,
	}
}

export async function readBookStats<TLogEntry extends IBookStat>(bookStatsFile: string) {
	const bookStatsStr = (await fse.readFile(bookStatsFile, {encoding: 'utf-8'})) + ']'
	let bookStats: TLogEntry[] = JSON.parse(bookStatsStr)
	bookStats = bookStats
		.filter(o => {
			return o.totalWords / wordsPerPage >= 3
				&& o.unknownWords >= 10
		})
		.sort((o1, o2) => {
			if (o1.unknownWordsIn20Pages !== o2.unknownWordsIn20Pages) {
				return o1.unknownWordsIn20Pages > o2.unknownWordsIn20Pages ? 1 : -1
			}
			if (o1.unknownWordsIn100Pages !== o2.unknownWordsIn100Pages) {
				return o1.unknownWordsIn100Pages > o2.unknownWordsIn100Pages ? 1 : -1
			}
			if (o1.unknownWordsIn3Pages !== o2.unknownWordsIn3Pages) {
				return o1.unknownWordsIn3Pages > o2.unknownWordsIn3Pages ? 1 : -1
			}
			if (o1.unknownWords !== o2.unknownWords) {
				return o1.unknownWords > o2.unknownWords ? 1 : -1
			}
			if (o1.totalWords !== o2.totalWords) {
				return o1.totalWords > o2.totalWords ? -1 : 1
			}
			return 0
		})
	return bookStats
}

async function createReport<TBookStat extends IBookStat>({
	dbDescriptionsPath,
	bookStatsFile,
	bookStats,
	reportFile,
	reportHeader,
	bookStatToReportLine,
}: {
	dbDescriptionsPath: string,
	bookStatsFile?: string,
	bookStats?: TBookStat[],
	reportFile: string,
	reportHeader: string,
	bookStatToReportLine: (bookStat: TBookStat, descriptions?: { [hash: string]: string }) => string,
}) {
	if (!bookStats && !fse.existsSync(bookStatsFile)) {
		return
	}
	const _bookStats = bookStats || await readBookStats<TBookStat>(bookStatsFile)
	const descriptions = dbDescriptionsPath
		? await parseLibgenDbDescriptions(dbDescriptionsPath)
		: null

	let reportStr = reportHeader + '\r\n'
	reportStr += _bookStats.map(o => bookStatToReportLine(o, descriptions))
		.join('\r\n')

	const dir = path.dirname(bookStatsFile)
	if (!fse.existsSync(dir)) {
		await fse.mkdirp(dir)
	}

	await fse.writeFile(reportFile, '\ufeff' + reportStr, { encoding: 'utf-8' })
}

export async function analyzeBooks<TBookStat extends IBookStat>({
	booksDir,
	resultsDir,
	totalBooks,
	filterPaths,
	analyzeBook: _analyzeBook,
}: {
	booksDir: string,
	resultsDir: string,
	totalBooks?: number,
	filterPaths?: (isDir: boolean, archivePath: string, fileOrDirPath: string) => boolean,
	analyzeBook: (
		rootDir: string,
		archivePath: string,
		filePath: string,
		stream?: Readable,
	) => Promise<TBookStat>|TBookStat,
}) {
	const stateFile = path.resolve(resultsDir, 'state.json')
	const bookStatsFile = path.resolve(resultsDir, 'stat.json')
	const dir = path.dirname(bookStatsFile)

	if (!fse.existsSync(dir)) {
		await fse.mkdirp(dir)
	}

	const state: {
		processedFiles: { [key: string]: number }
	} = fse.existsSync(stateFile)
		? await fse.readJSON(stateFile, { encoding: 'utf-8' })
		: { processedFiles: {} }

	const bookStats: TBookStat[] = []

	let processedBooks = Object.keys(state.processedFiles).reduce((a, o) => {
		return a + state.processedFiles[o]
	}, 0)

	function showProgress() {
		if (totalBooks) {
			console.log(`${processedBooks} / (${(processedBooks * 100 / totalBooks).toFixed(2)}%)`)
		} else {
			console.log(processedBooks)
		}
	}

	async function save() {
		if (bookStats.length > 0) {
			let bookStatsStr = JSON.stringify(bookStats)
			bookStatsStr = (fse.existsSync(bookStatsFile) ? ',' : '[')
				+ bookStatsStr.substring(1, bookStatsStr.length - 1)
			await fse.appendFile(bookStatsFile, bookStatsStr, {encoding: 'utf-8'})
			bookStats.length = 0
		}

		await fse.writeJSON(stateFile, state, { encoding: 'utf-8' })

		showProgress()
	}

	showProgress()

	let prevTime = Date.now()

	const fileBookStats = []

	await processFiles({
		fileOrDirPath  : booksDir,
		processArchives: true,
		filterPaths(isDir, archivePath, fileOrDirPath) {
			if (!isDir && !archivePath && fileOrDirPath in state.processedFiles) {
				return false
			}
			return !filterPaths || filterPaths(isDir, archivePath, fileOrDirPath)
		},
		async processFile(rootDir, archivePath, filePath, stream) {
			const bookStat = await _analyzeBook(rootDir, archivePath, filePath, stream)
			if (bookStat) {
				fileBookStats.push(bookStat)
			}
		},
		async onFileProcessed(rootDir, archivePath, filePath) {
			if (!archivePath) {
				bookStats.push(...fileBookStats)
				state.processedFiles[filePath] = fileBookStats.length
				processedBooks += fileBookStats.length
				fileBookStats.length = 0

				const now = Date.now()
				if (now > prevTime + 60 * 1000) {
					prevTime = now
					await save()
				}
			}
		},
	})

	await save()
}

export async function parseLibgenDb(dbPath: string) {
	let books: {
		[hash: string]: {
			id: number
			hash: string
			author: string
			title: string
			series: number
		}
	}

	const dbCachePath = dbPath + '.json'
	if (fse.existsSync(dbCachePath)) {
		books = await fse.readJSON(dbCachePath, { encoding: 'utf-8' }) as any
	} else {
		books = {}

		const stream = fse.createReadStream(dbPath)
		const result = await new Promise<ParseResult<string[]>>((resolve, reject) => {
			papaparse.parse(dbPath, {
				header  : false,
				complete: resolve,
				error   : reject,
			})
		})
		stream.close()

		for (let i = 1, len = result.data.length; i < len; i++) {
			let [idStr, hash, lang, , author, title, seriesStr] = result.data[i]
			idStr = idStr.trim()
			seriesStr = seriesStr.trim()
			lang = lang.toLowerCase().trim()
			hash = hash.toLowerCase().trim()
			const id = idStr ? parseInt(idStr, 10) : null
			const series = seriesStr ? parseInt(seriesStr, 10) : null
			if (!lang || lang === 'english') {
				books[hash] = {
					id, hash, author, title, series,
				}
			}
		}

		await fse.writeJSON(dbCachePath, books, { encoding: 'utf-8' })
	}

	return books
}

export async function parseLibgenDbDescriptions(dbPath: string) {
	let descriptions: {
		[hash: string]: string,
	}

	const dbCachePath = dbPath + '.json'
	if (fse.existsSync(dbCachePath)) {
		descriptions = await fse.readJSON(dbCachePath, { encoding: 'utf-8' }) as any
	} else {
		descriptions = {} as any

		const stream = fse.createReadStream(dbPath)
		const result = await new Promise<ParseResult<string[]>>((resolve, reject) => {
			papaparse.parse(stream, {
				header  : false,
				complete: resolve,
				error   : reject,
			})
		})
		stream.close()

		for (let i = 1, len = result.data.length; i < len; i++) {
			const [hash, description] = result.data[i]
			descriptions[hash] = description
		}

		await fse.writeJSON(dbCachePath, descriptions, { encoding: 'utf-8' })
	}

	return descriptions
}

export function createReportLibgen({
	resultsDir,
	bookStats,
}: {
	resultsDir: string,
	bookStats?: ILibgenBookStat[],
}) {
	return createReport<ILibgenBookStat>({
		dbDescriptionsPath: 'f:/Torrents/New/text/db/ff/fiction_description.csv',
		bookStatsFile     : path.resolve(resultsDir, 'stat.json'),
		bookStats,
		reportFile        : path.resolve(resultsDir, 'report.csv'),
		reportHeader      : 'id,hash,unknownWordsIn3Pages,unknownWordsIn20Pages,unknownWordsIn100Pages,unknownWords,totalPages',
		bookStatToReportLine(bookStat) {
			return `${
				bookStat.id
			},${
				bookStat.hash
			},${
				bookStat.unknownWordsIn3Pages
			},${
				bookStat.unknownWordsIn20Pages
			},${
				bookStat.unknownWordsIn100Pages
			},${
				bookStat.unknownWords
			},${
				bookStat.totalWords / wordsPerPage
			}`
		},
	})
}

export async function processLibgen({
	dbPath,
	booksDir,
	resultsDir,
	wordRegExp,
	wordFilter,
	filterPaths,
}: {
	dbPath: string,
	booksDir: string,
	resultsDir: string,
	wordRegExp: RegExp,
	wordFilter: (word: string) => boolean,
	filterPaths?: (isDir: boolean, archivePath: string, fileOrDirPath: string) => boolean,
}) {
	const books = await parseLibgenDb(dbPath)

	const totalBooks = Object.keys(books).length

	await analyzeBooks<ILibgenBookStat>({
		booksDir,
		resultsDir,
		totalBooks,
		filterPaths,
		async analyzeBook(rootDir, archivePath, filePath, stream) {
			const hash = filePath.match(/\/(\w+)(?:\.\w+)?$/)?.[1]?.toLowerCase()
			const book = books[hash]
			if (!book) {
				return null
			}

			const buffer = await streamToBuffer(stream)
			const text = txtBookBufferToString(buffer)

			const bookStat = analyzeBook({
				text,
				wordRegExp,
				wordFilter,
			})

			return bookStat && {
				...bookStat,
				id: book.id,
				hash,
			}
		},
	})

	// await createReportLibgen({
	// 	resultsDir,
	// })
}

export function createReportBooks({
	resultsDir,
	bookStats,
}: {
	resultsDir: string,
	bookStats?: Array<IMyBookStat>,
}) {
	return createReport<IMyBookStat>({
		dbDescriptionsPath: 'f:/Torrents/New/text/db/ff/fiction_description.csv',
		bookStatsFile     : path.resolve(resultsDir, 'stat.json'),
		bookStats,
		reportFile        : path.resolve(resultsDir, 'report.csv'),
		reportHeader      : 'unknownWordsIn3Pages,unknownWordsIn20Pages,unknownWordsIn100Pages,unknownWords,totalPages,author,title,description,filePath',
		bookStatToReportLine(bookStat, descriptions) {
			const [, hash, name] = bookStat.filePath.match(/[\\/](?:\d+ *- *)?(?:([\da-f]{32}) *- *)?([^\\/]+?)(?:\.\w+)?$/)
			const [author, title] = name.split('-').map(o => o.trim())
			return papaparse.unparse([[
				bookStat.unknownWordsIn3Pages,
				bookStat.unknownWordsIn20Pages,
				bookStat.unknownWordsIn100Pages,
				bookStat.unknownWords,
				bookStat.totalWords / wordsPerPage,
				author,
				title,
				hash && removeHtmlTags(descriptions[hash.toUpperCase()] || ''),
				bookStat.filePath,
			]])
		},
	})
}

export async function processBooks({
	booksDir,
	resultsDir,
	wordRegExp,
	wordFilter,
	filterPaths,
}: {
	booksDir: string,
	resultsDir: string,
	wordRegExp: RegExp,
	wordFilter: (word: string) => boolean,
	filterPaths?: (isDir: boolean, archivePath: string, fileOrDirPath: string) => boolean,
}) {
	await analyzeBooks<IMyBookStat>({
		booksDir,
		resultsDir,
		filterPaths,
		async analyzeBook(rootDir, archivePath, filePath, stream) {
			const buffer = await streamToBuffer(stream)
			const text = xmlBookBufferToString(buffer)

			const bookStat = analyzeBook({
				text,
				wordRegExp,
				wordFilter,
			})

			return bookStat && {
				...bookStat,
				filePath,
			}
		},
	})

	await createReportBooks({resultsDir})
}

export async function libgenUnpack({
	dbPath,
	booksDir,
	bookStats,
	unpackDir,
}: {
	dbPath: string,
	booksDir: string,
	bookStats: ILibgenBookStat[],
	unpackDir: string,
}) {
	const excludedStr = await fse.readFile('f:/Torrents/New/test/result/excluded.txt', { encoding: 'utf-8' })
	const excluded = excludedStr
		.split('\r\n')
		.map(o => o.match(/^\s*(\d+\s*-\s*)?\s*(.+)\s*$/)?.[2])
		.reduce((a, o) => {
			if (o) {
				a[o] = true
			}
			return a
		}, {})

	await Promise.all(
		(await fse.readdir(unpackDir))
			.map(o => {
				if (!excluded[o.match(/^\s*(\d+\s*-\s*)?\s*(.+)\s*$/)?.[2]]) {
					return null
				}

				return fse.unlink(path.resolve(unpackDir, o))
			})
			.filter(o => o),
	)

	const books = await parseLibgenDb(dbPath)

	const archives: {
		[archiveName: string]: {
			[hash: string]: string
		}
	} = bookStats
		.reduce((a, o) => {
			const book = books[o.hash]

			let fileName = book
				? (book.author || '')
					+ ' - ' + (book.title || '')
					+ ' ' + (book.series || '')
				: o.hash

			fileName = fileName
				.replace(/[\\/:*?<>|"]/g, '')
				.replace(/\s+/g, ' ')
				.trim()

			fileName += '.txt'

			if (excluded[fileName]) {
				return a
			}

			fileName = Math.round(o.unknownWordsIn3Pages * 100).toString().padStart(5, '0') + ' - ' + o.hash + ' - ' + fileName

			const filePath = path.resolve(unpackDir, fileName)

			if (fse.existsSync(filePath)) {
				return a
			}

			const archiveName = (Math.floor(o.id / 1000) * 1000) + '.tar.xz'
			let stats = a[archiveName]
			if (!stats) {
				a[archiveName] = stats = {}
			}
			stats[o.hash] = filePath
			return a
		}, {})

	if (!fse.existsSync(unpackDir)) {
		await fse.mkdirp(unpackDir)
	}

	for (const archiveName in archives) {
		if (Object.prototype.hasOwnProperty.call(archives, archiveName)) {
			const stats = archives[archiveName]
			await processArchiveTarXz({
				archivePath: path.resolve(booksDir, archiveName),
				async processFile(archivePath, innerFilePath, stream) {
					const hash = innerFilePath.match(/\/(\w+)(?:\.\w+)?$/)?.[1]?.toLowerCase()
					const filePath = stats[hash]
					if (!filePath) {
						return
					}

					await stream.pipe(fse.createWriteStream(filePath))
				},
			})
		}
	}
}

export async function calcPhrasesStat<TBookStat extends IMyBookStat>({
	wordsCache,
	bookStatsFile,
	bookStats,
	lettersPatern,
	wordPattern,
	maxPhraseLength,
	filterPhrases,
	rootDir,
	onFileHandled,
}: {
	wordsCache: WordsCache,
	bookStatsFile?: string,
	bookStats?: TBookStat[],
	lettersPatern?: string,
	wordPattern?: string,
	maxPhraseLength?: number,
	filterPhrases?: (phrase: string) => boolean,
	rootDir: string,
	onFileHandled?: (
		filePath: string,
		filePathRelative: string,
		phrasesStat: PhrasesStat,
		bookStat: TBookStat,
	) => Promise<void>|void,
}) {
	if (!bookStats && !fse.existsSync(bookStatsFile)) {
		return null
	}
	let _bookStats = bookStats || await readBookStats<TBookStat>(bookStatsFile)

	_bookStats = _bookStats.slice(0, 100)

	const phrasesStat = new PhrasesStat()
	const phrasesStatCollector = new PhrasesStatCollector({
		wordsCache,
		phrasesStat,
		lettersPatern,
		wordPattern,
		maxPhraseLength,
		filterPhrases,
	})

	for (let i = 0, len = _bookStats.length; i < len; i++) {
		const bookStat = _bookStats[i]
		const stream = fse.createReadStream(bookStat.filePath)
		const buffer = await streamToBuffer(stream)
		const text = xmlBookBufferToString(buffer)
		phrasesStatCollector.addText(text)
		if (onFileHandled) {
			const filePathRelative = path.relative(rootDir, bookStat.filePath)
			await onFileHandled(bookStat.filePath, filePathRelative, phrasesStat, bookStat)
		}
	}

	phrasesStat.reduce(true)

	return phrasesStat
}
