/* eslint-disable @typescript-eslint/no-shadow,quotes */
import {createRegExp, createWordPattern} from '../common/phrases-helpers'
import {WordsStat} from '../common/WordsStat'
import {xmlBookBufferToString} from './helpers'
import {
	calcWordStat,
	processBooks,
	processLibgen as _processLibgen,
	ILibgenBookStat,
	libgenUnpack as _libgenUnpack,
	readBookStats,
} from './process'

const lettersPatern = `[a-zA-Z]|(?<=[a-zA-Z])[-](?=[a-zA-Z])`
const wordRegExp = createRegExp(createWordPattern(lettersPatern))

function filterXmlBooks(isDir, archivePath, _fileOrDirPath) {
	if (!isDir && !/\.(txt|fb2)$/i.test(_fileOrDirPath)) {
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
		booksDir   : 'e:/RemoteData/Mega2/Text/Books/Учебники/English/Books',
		resultsDir : 'tmp/myBooks',
		filterPaths: filterXmlBooks,
		wordRegExp,
		wordFilter(word) {
			return !wasReadStat.has(word)
		},
	})
}

export async function processLibgen() {
	const wasReadStat = await calcWasReadStat()

	await _processLibgen({
		dbPath    : 'f:/Torrents/New/text/db/ff/simple.csv',
		booksDir  : 'f:/Torrents/New/test/text/',
		resultsDir: 'f:/Torrents/New/test/result/',
		wordRegExp,
		wordFilter(word) {
			return !wasReadStat.has(word)
		},
	})
}

export async function libgenUnpack() {
	let bookStats = await readBookStats<ILibgenBookStat>('f:/Torrents/New/test/result/stat.json')
	bookStats = bookStats.slice(0, 100)

	await _libgenUnpack({
		bookStats,
		dbPath   : 'f:/Torrents/New/text/db/ff/simple.csv',
		booksDir : 'f:/Torrents/New/test/text/ff',
		unpackDir: 'f:/Torrents/New/test/result/books',
	})
}
