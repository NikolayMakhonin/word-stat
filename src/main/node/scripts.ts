/* eslint-disable @typescript-eslint/no-shadow,quotes */
import {distinct} from '../common/helpers'
import {createRegExp, createWordPattern} from '../common/phrases-helpers'
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
	createReportLibgen, createReportBooks,
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
