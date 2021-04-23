/* eslint-disable quotes,no-await-in-loop */
import fse from 'fs-extra'
import path from "path"
import {Readable} from "stream"
import {
	parsePhrases,
} from '../common/phrases-helpers'
import {PhrasesStat} from '../common/PhrasesStat'
import {PhrasesStatCollector} from '../common/PhrasesStatCollector'
import {WordsCache} from '../common/WordsCache'
import {WordsStat} from '../common/WordsStat'
import {streamToBuffer, txtBookBufferToString, xmlBookBufferToString} from './helpers'
import {processArchiveTarXz, processFiles} from './processFiles'
import readline from 'readline'
import papaparse from 'papaparse'

export const wordsPerPage = 200

export async function calcStat({
	wordsCache,
	fileOrDirPath,
	filterPhrases,
	maxPhraseLength,
	lettersPatern,
	onFileHandled,
}: {
	wordsCache: WordsCache,
	fileOrDirPath: string,
	filterPhrases?: (phraseId: string) => boolean,
	maxPhraseLength?: number,
	lettersPatern: string,
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
		filterPhrases,
		maxPhraseLength,
	})

	await processFiles({
		fileOrDirPath,
		readBuffer: true,
		processArchives : true,
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
		readBuffer: true,
		processArchives : true,
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
	unknownWords: number,
	totalWords: number,
}

export interface ILibgenBookStat extends IBookStat {
	id: number,
	hash: string,
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

	const unknownWordsIn3Pages = values.reduce((a, o) => {
		const countInFirstPages = Math.min(1, o * 3 * wordsPerPage / totalWords)
		return a + countInFirstPages
	}, 0) / 3

	const unknownWordsIn20Pages = values.reduce((a, o) => {
		const countInFirstPages = Math.min(1, o * 20 * wordsPerPage / totalWords)
		return a + countInFirstPages
	}, 0) / 20

	return {
		unknownWordsIn3Pages,
		unknownWordsIn20Pages,
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
			if (o1.unknownWordsIn3Pages !== o2.unknownWordsIn3Pages) {
				return o1.unknownWordsIn3Pages > o2.unknownWordsIn3Pages ? 1 : -1
			}
			if (o1.unknownWordsIn20Pages !== o2.unknownWordsIn20Pages) {
				return o1.unknownWordsIn20Pages > o2.unknownWordsIn20Pages ? 1 : -1
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
	bookStatsFile,
	reportFile,
	reportHeader,
	bookStatToReportLine,
}: {
	bookStatsFile: string,
	reportFile: string,
	reportHeader: string,
	bookStatToReportLine: (bookStat: TBookStat) => string,
}) {
	if (!fse.existsSync(bookStatsFile)) {
		return
	}
	const _bookStats = await readBookStats<TBookStat>(bookStatsFile)
	let reportStr = reportHeader + '\r\n'
	reportStr += _bookStats.map(bookStatToReportLine)
		.join('\r\n')

	const dir = path.dirname(bookStatsFile)
	if (!fse.existsSync(dir)) {
		await fse.mkdirp(dir)
	}

	await fse.writeFile(reportFile, reportStr, { encoding: 'utf-8' })
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
				bookStats.push(bookStat)
			}
		},
		async onFileProcessed(rootDir, archivePath, filePath) {
			if (!archivePath) {
				state.processedFiles[filePath] = bookStats.length
				processedBooks += bookStats.length

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

		const dbStream = fse.createReadStream(dbPath)

		const dbReadLine = readline.createInterface({
			input    : dbStream,
			crlfDelay: Infinity,
		})

		let firstLine = true
		for await (const line of dbReadLine) {
			if (firstLine) {
				firstLine = false
				continue
			}
			if (line) {
				let [idStr, hash, lang, , author, title, seriesStr] = papaparse.parse(line, {
					header: false,
				}).data[0] as string[]
				// let [idStr, hash, lang, , author, title, seriesStr] = line.split(',')

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
		}

		await fse.writeJSON(dbCachePath, books, { encoding: 'utf-8' })

		dbStream.close()
	}

	return books
}

export function createReportLibgen(resultsDir: string) {
	return createReport<ILibgenBookStat>({
		bookStatsFile: path.resolve(resultsDir, 'stat.json'),
		reportFile   : path.resolve(resultsDir, 'report.txt'),
		reportHeader : 'id\thash\tunknownWordsIn3Pages\tunknownWordsIn20Pages\tunknownWords\ttotalPages',
		bookStatToReportLine(bookStat) {
			return `${
				bookStat.id
			}\t${
				bookStat.hash
			}\t${
				bookStat.unknownWordsIn3Pages
			}\t${
				bookStat.unknownWordsIn20Pages
			}\t${
				bookStat.unknownWords
			}\t${
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

	await createReportLibgen(resultsDir)
}

export function createReportBooks(resultsDir: string) {
	return createReport<{
		filePath,
	} & IBookStat>({
		bookStatsFile: path.resolve(resultsDir, 'stat.json'),
		reportFile   : path.resolve(resultsDir, 'report.txt'),
		reportHeader : 'unknownWordsIn3Pages\tunknownWordsIn20Pages\tunknownWords\ttotalPages',
		bookStatToReportLine(bookStat) {
			return `${
				bookStat.unknownWordsIn3Pages
			}\t${
				bookStat.unknownWordsIn20Pages
			}\t${
				bookStat.unknownWords
			}\t${
				bookStat.totalWords / wordsPerPage
			}\t${
				bookStat.filePath
			}`
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
	await analyzeBooks<{
		filePath,
	} & IBookStat>({
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

	await createReportBooks(resultsDir)
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

			fileName = Math.round(o.unknownWordsIn3Pages * 100).toString().padStart(5, '0') + ' - ' + fileName

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
