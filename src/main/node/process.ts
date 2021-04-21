/* eslint-disable quotes */
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
import {processFiles} from './processFiles'
import readline from 'readline'

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
		alwaysReadBuffer: true,
		processArchives : true,
		filterPaths(isDir, archivePath, _fileOrDirPath) {
			if (!isDir && !/\.(txt|fb2)$/i.test(_fileOrDirPath)) {
				return false
			}
			return true
		},
		async processFile(rootDir, archivePath, filePath, buffer) {
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
	bufferToString,
}: {
	wordRegExp: RegExp,
	fileOrDirPath: string,
	bufferToString: (buffer: Buffer) => Promise<string>|string,
}) {
	const wordsStat = new WordsStat()
	await processFiles({
		fileOrDirPath,
		async processFile(filePath) {
			if (!/\.(txt|fb2)$/i.test(filePath)) {
				return
			}
			const buffer = await fse.readFile(filePath)
			const text = await bufferToString(buffer)

			// let totalWords = 0
			parsePhrases(text, wordRegExp, word => {
				wordsStat.add(word.toLowerCase())
				// totalWords++
			})

			// console.log('totalWords:', totalWords)
		},
	})

	return wordsStat
}

interface IAnalyzeBookResult {
	unknownWordsIn3Pages: number,
	unknownWordsIn20Pages: number,
	unknownWords: number,
	totalWords: number,
}

export function analyzeBook({
	text,
	wordRegExp,
	wordFilter,
}: {
	text: string,
	wordRegExp: RegExp,
	wordFilter: (word: string) => boolean,
}): IAnalyzeBookResult {
	const wordStat = new WordsStat()
	let totalWords = 0
	parsePhrases(text, wordRegExp, word => {
		if (wordFilter && !wordFilter(word)) {
			return
		}
		wordStat.add(word)
		totalWords++
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

export async function analyzeBooks<TLogEntry extends IAnalyzeBookResult>({
	booksDir,
	resultsDir,
	totalBooks,
	reportHeader,
	logEntryToReportLine,
	filterPaths,
	analyzeBook: _analyzeBook,
}: {
	booksDir: string,
	resultsDir: string,
	totalBooks?: number,
	reportHeader: string,
	logEntryToReportLine: (logEntry: TLogEntry) => string,
	filterPaths?: (isDir: boolean, archivePath: string, fileOrDirPath: string) => boolean,
	analyzeBook: (
		rootDir: string,
		archivePath: string,
		filePath: string,
		buffer?: Buffer,
	) => Promise<TLogEntry>|TLogEntry,
}) {
	const stateFile = path.resolve(resultsDir, 'state.json')
	const logFile = path.resolve(resultsDir, 'log.json')
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

	const log: TLogEntry[] = []

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
		if (!fse.existsSync(logFile)) {
			return
		}
		const logStr = (await fse.readFile(logFile, {encoding: 'utf-8'})) + ']'
		const _log: TLogEntry[] = JSON.parse(logStr)
		_log.sort((o1, o2) => {
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

		let reportStr = reportHeader + '\r\n'
		reportStr += _log.map(logEntryToReportLine)
			.join('\r\n')

		await fse.writeFile(reportFile, reportStr, { encoding: 'utf-8' })
	}

	async function save() {
		if (log.length > 0) {
			let logStr = JSON.stringify(log)
			logStr = (fse.existsSync(logFile) ? ',' : '[')
				+ logStr.substring(1, logStr.length - 1)
			await fse.appendFile(logFile, logStr, {encoding: 'utf-8'})
			log.length = 0
		}

		await fse.writeJSON(stateFile, state, { encoding: 'utf-8' })

		await report()

		showProgress()
	}

	showProgress()

	await processFiles({
		fileOrDirPath   : booksDir,
		processArchives : true,
		alwaysReadBuffer: true,
		filterPaths(isDir, archivePath, fileOrDirPath) {
			if (!isDir && !archivePath && fileOrDirPath in state.processedFiles) {
				return false
			}
			return filterPaths(isDir, archivePath, fileOrDirPath)
		},
		async processFile(rootDir, archivePath, filePath, buffer) {
			const logEntry = await _analyzeBook(rootDir, archivePath, filePath, buffer)
			if (logEntry) {
				log.push(logEntry)
			}
		},
		async onFileProcessed(rootDir, archivePath, filePath) {
			if (!archivePath) {
				state.processedFiles[filePath] = log.length
				processedBooks += log.length
				await save()
			}
		},
	})

	await save()
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
	// region parse db

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
				let [idStr, hash, lang, , author, title, seriesStr] = line.split(',')
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

	// endregion

	const totalBooks = Object.keys(books).length

	await analyzeBooks<{
		id: number,
		hash: string,
	} & IAnalyzeBookResult>({
		booksDir,
		resultsDir,
		totalBooks,
		reportHeader: 'id\thash\tunknownWordsIn3Pages\tunknownWordsIn20Pages\tunknownWords\ttotalPages',
		logEntryToReportLine(logEntry) {
			return `${
				logEntry.id
			}\t${
				logEntry.hash
			}\t${
				logEntry.unknownWordsIn3Pages
			}\t${
				logEntry.unknownWordsIn20Pages
			}\t${
				logEntry.unknownWords
			}\t${
				logEntry.totalWords / wordsPerPage
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

			const logEntry = analyzeBook({
				text,
				wordRegExp,
				wordFilter,
			})

			return {
				id: book.id,
				hash,
				...logEntry,
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
	await analyzeBooks({
		booksDir,
		resultsDir,
		reportHeader: 'unknownWordsIn3Pages\tunknownWordsIn20Pages\tunknownWords\ttotalPages',
		logEntryToReportLine(logEntry) {
			return `${
				logEntry.unknownWordsIn3Pages
			}\t${
				logEntry.unknownWordsIn20Pages
			}\t${
				logEntry.unknownWords
			}\t${
				logEntry.totalWords / wordsPerPage
			}`
		},
		filterPaths,
		analyzeBook(rootDir, archivePath, filePath, buffer) {
			const text = xmlBookBufferToString(buffer)

			const logEntry = analyzeBook({
				text,
				wordRegExp,
				wordFilter,
			})

			return logEntry
		},
	})
}
