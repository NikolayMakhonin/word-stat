/* eslint-disable quotes,no-await-in-loop */
import fse from 'fs-extra'
import path from "path"
import {
	parsePhrases,
} from '../common/phrases-helpers'
import {PhrasesStat} from '../common/PhrasesStat'
import {PhrasesStatCollector} from '../common/PhrasesStatCollector'
import {WordsCache} from '../common/WordsCache'
import {WordsStat} from '../common/WordsStat'
import {txtBookBufferToString, xmlBookBufferToString} from './helpers'
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
		.filter(o => o.totalWords / wordsPerPage >= 2)
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

export async function analyzeBooks<TBookStat extends IBookStat>({
	booksDir,
	resultsDir,
	totalBooks,
	reportHeader,
	bookStatToReportLine,
	filterPaths,
	analyzeBook: _analyzeBook,
}: {
	booksDir: string,
	resultsDir: string,
	totalBooks?: number,
	reportHeader: string,
	bookStatToReportLine: (bookStat: TBookStat) => string,
	filterPaths?: (isDir: boolean, archivePath: string, fileOrDirPath: string) => boolean,
	analyzeBook: (
		rootDir: string,
		archivePath: string,
		filePath: string,
		buffer?: Buffer,
	) => Promise<TBookStat>|TBookStat,
}) {
	const stateFile = path.resolve(resultsDir, 'state.json')
	const bookStatsFile = path.resolve(resultsDir, 'stat.json')
	const reportFile = path.resolve(resultsDir, 'report.txt')
	const dir = path.dirname(reportFile)

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

	async function report() {
		if (!fse.existsSync(bookStatsFile)) {
			return
		}
		const _bookStats = await readBookStats<TBookStat>(bookStatsFile)
		let reportStr = reportHeader + '\r\n'
		reportStr += _bookStats.map(bookStatToReportLine)
			.join('\r\n')

		await fse.writeFile(reportFile, reportStr, { encoding: 'utf-8' })
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

		await report()

		showProgress()
	}

	showProgress()

	let prevTime = Date.now()

	await processFiles({
		fileOrDirPath   : booksDir,
		processArchives : true,
		readBuffer      : true,
		filterPaths(isDir, archivePath, fileOrDirPath) {
			if (!isDir && !archivePath && fileOrDirPath in state.processedFiles) {
				return false
			}
			return !filterPaths || filterPaths(isDir, archivePath, fileOrDirPath)
		},
		async processFile(rootDir, archivePath, filePath, stream, buffer) {
			const bookStat = await _analyzeBook(rootDir, archivePath, filePath, buffer)
			if (bookStat) {
				bookStats.push(bookStat)
			}
		},
		async onFileProcessed(rootDir, archivePath, filePath) {
			if (!archivePath) {
				const now = Date.now()
				if (now > prevTime + 60 * 1000) {
					prevTime = now
					state.processedFiles[filePath] = bookStats.length
					processedBooks += bookStats.length
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
		reportHeader: 'id\thash\tunknownWordsIn3Pages\tunknownWordsIn20Pages\tunknownWords\ttotalPages',
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
		filterPaths,
		analyzeBook(rootDir, archivePath, filePath, buffer) {
			const hash = filePath.match(/\/(\w+)(?:\.\w+)?$/)[1]?.toLowerCase()
			const book = books[hash]
			if (!book) {
				return null
			}

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
		reportHeader: 'unknownWordsIn3Pages\tunknownWordsIn20Pages\tunknownWords\ttotalPages',
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
		filterPaths,
		analyzeBook(rootDir, archivePath, filePath, buffer) {
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
	const archives: {
		[archiveName: string]: {
			[hash: string]: ILibgenBookStat
		}
	} = bookStats
		.reduce((a, o) => {
			const archiveName = (Math.floor(o.id / 1000) * 1000) + '.tar.xz'
			let stats = a[archiveName]
			if (!stats) {
				a[archiveName] = stats = {}
			}
			stats[o.hash] = o
			return a
		}, {})

	const books = await parseLibgenDb(dbPath)

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
					const bookStat = stats[hash]
					if (!bookStat) {
						return
					}

					const book = books[bookStat.hash]

					let fileName = book
						? (book.author || '')
							+ ' - ' + (book.title || '')
							+ ' ' + (book.series || '')
						: bookStat.hash

					fileName = fileName
						.replace(/[\\/:*?<>|"]/g, '')
						.replace(/\s+/g, ' ')
						.trim()

					fileName = Math.round(bookStat.unknownWordsIn3Pages * 100).toString().padStart(5, '0') + ' - ' + fileName

					const filePath = path.resolve(unpackDir, fileName + path.extname(innerFilePath))

					await stream.pipe(fse.createWriteStream(filePath))
				},
			})
		}
	}
}
