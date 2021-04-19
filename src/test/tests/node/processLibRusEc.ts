/* eslint-disable no-shadow,quotes */
import path from 'path'
import sqlite from 'better-sqlite3'
import {processLibRusEc} from '../../../main/node/processLibRusEc'

describe('node > processLibRusEc', function () {
	this.timeout(30 * 24 * 60 * 60 * 1000)

	const dbPath = 'e:/Torrents/Completed/_Lib.rus.ec/MyHomeLib_2_2/Data/librusec_local_fb2.hlc2'
	const booksDir = 'e:/Torrents/Completed/_Lib.rus.ec/lib.rus.ec'

	it('open', function () {
		const db = sqlite(dbPath, {})
		assert.ok(db)
	})

	it('select', function () {
		const db = sqlite(dbPath, {})
		const statement = db
			.prepare('SELECT * FROM Books LIMIT ?')

		let rows = statement.all(10)

		assert.ok(rows)
		assert.strictEqual(rows.length, 10)

		rows = Array.from(statement.iterate(10))

		assert.ok(rows)
		assert.strictEqual(rows.length, 10)

		let count = 0
		for (const row of statement.iterate(10)) {
			assert.strictEqual(row.length, undefined)
			count++
		}

		assert.strictEqual(count, 10)
	})

	it('base', async function () {
		processLibRusEc({
			dbPath,
			lang       : 'en',
			processFile: null,
		})
	})
})
