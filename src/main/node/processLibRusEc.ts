/* eslint-disable no-await-in-loop */
import path from 'path'
import sqlite from 'better-sqlite3'
import yauzl from 'yauzl'
import {xmlBufferToString} from './helpers'

export function getCountBooksQuery({
	lang,
	authorIDs,
}: {
	lang?: string,
	authorIDs?: number[],
}) {
	return `
		SELECT Count() as Count FROM (
			SELECT b.[BookID] FROM Books b
			LEFT JOIN Author_List l ON l.[BookID] = b.[BookID]
			${lang ? `WHERE b.[SearchLang] == '${lang.toUpperCase()}'` : ''}
			${authorIDs ? `WHERE l.[AuthorID] IN (${authorIDs.join(',')})\n` : ''}
			GROUP BY b.[BookID]       
		);
	`
}

export function getBooksQuery({
	lang,
	authorIDs,
	limit,
}: {
	lang?: string,
	authorIDs?: number[],
	limit?: number,
}) {
	return `
		SELECT 
			b.BookID,
			b.LibID COLLATE NOCASE as LibID,
			b.Lang COLLATE NOCASE as Lang,
			a.FirstName COLLATE NOCASE as AuthorFirstName,
			a.MiddleName COLLATE NOCASE as AuthorMiddleName,
			a.LastName COLLATE NOCASE as AuthorLastName,
			GROUP_CONCAT(DISTINCT a.[AuthorID]) as AuthorIDs,
			b.Title COLLATE NOCASE as Title,
			s.SeriesTitle COLLATE NOCASE as SeriesTitle,
			b.SeqNumber,
			b.InsideNo,
			b.UpdateDate COLLATE NOCASE as UpdateDate,
			b.BookSize,
			b.Folder COLLATE NOCASE as Folder,
			b.FileName COLLATE NOCASE as FileName,
			b.Ext COLLATE NOCASE as Ext,
			b.IsLocal,
			b.IsDeleted,
			b.LibRate,
			b.Rate,
			GROUP_CONCAT(DISTINCT gp.[GenreCode]) as ParentGenres, 
			GROUP_CONCAT(DISTINCT g.[GenreCode]) as Genres
		FROM Books b
		LEFT JOIN Author_List l ON l.[BookID] = b.[BookID]
		LEFT JOIN Authors a ON a.[AuthorID] = l.[AuthorID]
		LEFT JOIN Series s ON s.[SeriesID] = b.[SeriesID]
		LEFT JOIN Genre_List gl ON gl.[BookID] = b.[BookID]
		LEFT JOIN Genres g ON g.[GenreCode] = gl.[GenreCode] COLLATE NOCASE
		LEFT JOIN Genres gp ON gp.[GenreCode] = g.[ParentCode] COLLATE NOCASE
		${lang ? `WHERE b.[SearchLang] == '${lang.toUpperCase()}'` : ''}
		${authorIDs ? `WHERE l.[AuthorID] IN (${authorIDs.join(',')})` : ''}
		GROUP BY b.[BookID]
		${limit > 0 ? `LIMIT ${limit}` : ''}
	`
}

function streamToString(stream: NodeJS.ReadableStream): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		const chunks = []
		stream.on('data', (chunk) => {
			chunks.push(chunk)
		})
		stream.on('error', err => {
			reject(err)
		})
		stream.on('end', () => {
			resolve(Buffer.concat(chunks))
		})
	})
}

export interface IBook {
	BookID: number
	LibID: string
	Lang: string
	AuthorFirstName: string,
	AuthorMiddleName: string,
	AuthorLastName: string,
	AuthorIDs: string
	Title: string
	SeriesTitle: string
	SeqNumber: number
	InsideNo: number
	UpdateDate: string
	BookSize: number
	Folder: string
	FileName: string
	Ext: string
	IsLocal: number
	IsDeleted: number
	LibRate: number
	Rate: number
	ParentGenres: string
	Genres: string
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

export async function processLibRusEc({
	dbPath,
	booksDir,
	lang,
	processBook,
}: {
	dbPath: string,
	booksDir: string,
	lang: string,
	processBook: (book: IBook, text: string) => Promise<void>|void,
}) {
	const db = sqlite(dbPath, {})

	const countRows = db
		.prepare(getCountBooksQuery({
			lang,
		}))
		.get()
		.Count

	console.log('Count books: ' + countRows)

	const rows = db
		.prepare(getBooksQuery({
			lang,
		}))
		.all()

	// console.log(rows.length, rows[0])

	shuffleArray(rows)

	const archives = rows.reduce((a, o) => {
		let files = a[o.Folder]
		if (!files) {
			a[o.Folder] = files = {}
		}

		files[o.FileName + o.Ext] = o

		return a
	}, {})

	let prevTime = Date.now()
	let countHandled = 0

	for (const archiveName in archives) {
		if (Object.prototype.hasOwnProperty.call(archives, archiveName)) {
			const files = archives[archiveName]
			const archivePath = path.resolve(booksDir, archiveName)

			await new Promise((resolve, reject) => {
				yauzl.open(archivePath, {lazyEntries: true}, (error, zipFile) => {
					if (error) {
						reject(error)
						return
					}

					zipFile.on('end', () => {
						resolve(null)
					})

					zipFile.on('error', err => {
						reject(err)
					})

					zipFile.readEntry()

					zipFile.on('entry', entry => {
						const now = Date.now()

						if (now - prevTime > 10 * 1000) {
							prevTime = now
							console.log(`${countHandled} / ${countRows} (${(countHandled / countRows).toFixed(2)}%)`)
						}

						const book = files[entry.fileName]
						if (!book) {
							zipFile.readEntry()
							return
						}

						// file entry
						zipFile.openReadStream(entry, async (err, readStream) => {
							if (err) {
								reject(err)
								return
							}

							try {
								const buffer = await streamToString(readStream)
								const text = xmlBufferToString(buffer)

								await processBook(book, text)

								countHandled++
								zipFile.readEntry()
							} catch (err2) {
								reject(err2)
							}
						})
					})
				})
			})
		}
	}
}
