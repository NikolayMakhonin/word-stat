/* eslint-disable quotes */
import fse from 'fs-extra'
import path from "path"
import {
	createRegExp,
	createWordPattern,
	parsePhrases,
} from '../common/phrases-helpers'
import {PhrasesStat} from '../common/PhrasesStat'
import {PhrasesStatCollector} from '../common/PhrasesStatCollector'
import {textPreprocess} from '../common/textPreprocess'
import {WordsCache} from '../common/WordsCache'
import {WordsStat} from '../common/WordsStat'
import {xmlBufferToString} from './helpers'
import {processArchiveTarXz, processFiles} from './processFiles'
import readline from 'readline'

export const wordsPerPage = 200
export const firstPagesForEstimate = 3
export const lettersPatern = `[a-zA-Z]|(?<=[a-zA-Z])[-](?=[a-zA-Z])`

export async function calcStat({
	wordsCache,
	fileOrDirPath,
	filterPhrases,
	onFileHandled,
	maxPhraseLength,
}: {
	wordsCache: WordsCache,
	fileOrDirPath: string,
	filterPhrases?: (phraseId: string) => boolean,
	maxPhraseLength?: number,
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
		async processFile(filePath, filePathRelative) {
			if (!/\.(txt|fb2)$/i.test(filePath)) {
				return
			}
			const buffer = await fse.readFile(filePath)
			const text = xmlBufferToString(buffer)
			const totalWords = phrasesStatCollector.addText(text)
			if (onFileHandled) {
				await onFileHandled(filePath, filePathRelative, phrasesStat, totalWords)
			}
		},
	})

	phrasesStat.reduce(true)

	return phrasesStat
}

interface ILogEntry {
	id: number,
	hash: string,
	unknownWordsIn3Pages: number,
	unknownWordsIn20Pages: number,
	unknownWords: number,
	totalWords: number,
}

export async function processLibgen({
	dbPath,
	booksDir,
	resultsDir,
}: {
	dbPath: string,
	booksDir: string,
	resultsDir: string,
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

	const wordRegExp = createRegExp(createWordPattern(lettersPatern))

	// region calc wasReadStat

	const wasReadStat = new WordsStat()
	await processFiles({
		fileOrDirPath: 'e:\\RemoteData\\Mega2\\Text\\Books\\Учебники\\English\\WasRead',
		async processFile(filePath) {
			if (!/\.(txt|fb2)$/i.test(filePath)) {
				return
			}
			const buffer = await fse.readFile(filePath)
			let text = xmlBufferToString(buffer)

			text = textPreprocess(text)
			// let totalWords = 0
			parsePhrases(text, wordRegExp, word => {
				wasReadStat.add(word.toLowerCase())
				// totalWords++
			})

			// console.log('totalWords:', totalWords)
		},
	})

	// endregion

	const stateFile = path.resolve(resultsDir, 'state.json')
	const logFile = path.resolve(resultsDir, 'log.json')
	const reportFile = path.resolve(resultsDir, 'report.txt')
	const dir = path.dirname(reportFile)

	if (!fse.existsSync(dir)) {
		await fse.mkdirp(dir)
	}

	const state: {
		scannedArchives: { [key: string]: number }
	} = fse.existsSync(stateFile)
		? await fse.readJSON(stateFile, { encoding: 'utf-8' })
		: { scannedArchives: {} }

	const log: ILogEntry[] = []

	let scannedBooks = Object.keys(state.scannedArchives).reduce((a, o) => {
		return a + state.scannedArchives[o]
	}, 0)
	const totalBooks = Object.keys(books).length

	function showProgress() {
		console.log(`${scannedBooks} / (${(scannedBooks * 100 / totalBooks).toFixed(2)}%)`)
	}

	async function report() {
		if (!fse.existsSync(logFile)) {
			return
		}
		const logStr = (await fse.readFile(logFile, {encoding: 'utf-8'})) + ']'
		const _log: ILogEntry[] = JSON.parse(logStr)
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

		let reportStr = 'id\thash\tunknownWordsIn3Pages\tunknownWordsIn20Pages\tunknownWords\ttotalWords'
		reportStr += _log.map(o => `${
			o.id
		}\t${
			o.hash
		}\t${
			o.unknownWordsIn3Pages
		}\t${
			o.unknownWordsIn20Pages
		}\t${
			o.unknownWords
		}\t${
			o.totalWords
		}`)
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
		fileOrDirPath: booksDir,
		async processFile(archivePath) {
			if (archivePath in state.scannedArchives || !/\.tar(\.\w+)?$/.test(archivePath)) {
				return
			}

			await processArchiveTarXz({
				archivePath,
				processFile(_archivePath, filePath, buffer) {
					const hash = filePath.match(/\/(\w+)(?:\.\w+)?$/)[1]?.toLowerCase()
					const book = books[hash]
					if (!book) {
						return
					}
					const text = buffer.toString('utf-8')

					const wordStat = new WordsStat()
					let totalWords = 0
					parsePhrases(text, wordRegExp, word => {
						if (wasReadStat.has(word)) {
							return
						}
						wordStat.add(word)
						totalWords++
					})

					if (!totalWords) {
						return
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

					log.push({
						id  : book.id,
						hash: book.hash,
						unknownWordsIn3Pages,
						unknownWordsIn20Pages,
						unknownWords,
						totalWords,
					})
				},
			})

			state.scannedArchives[archivePath] = log.length
			scannedBooks += log.length

			await save()
		},
	})

	await save()
}
