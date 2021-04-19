/* eslint-disable no-shadow,quotes */
import {processFiles} from '../../../main/node/processFiles'
import path from 'path'

describe('node > processFiles', function () {
	it('file', async function () {
		const file = path.resolve(__dirname, 'assets/testDir/1/1/text1.txt')
		const filePaths = []
		const paths = []

		await processFiles({
			fileOrDirPath: file,
			filterPaths(_path) {
				paths.push(_path)
				if (_path === path.resolve(file, '1')) {
					return false
				}
				return true
			},
			processFile(filePath) {
				filePaths.push(filePath)
			},
		})

		assert.deepStrictEqual(paths, [ file ])
	})

	it('dir', async function () {
		const dir = path.resolve(__dirname, 'assets/testDir')
		const filePaths = []
		const paths = []

		await processFiles({
			fileOrDirPath: dir,
			filterPaths(_path) {
				paths.push(_path)
				if (_path === path.resolve(dir, '1')) {
					return false
				}
				return true
			},
			processFile(filePath) {
				filePaths.push(filePath)
			},
		})

		assert.deepStrictEqual(paths, [
			dir,
			path.resolve(dir, '1'),
			path.resolve(dir, '2'),
			path.resolve(dir, '2/1'),
			path.resolve(dir, '2/1/text1.txt'),
			path.resolve(dir, '2/1/text2.txt'),
			path.resolve(dir, '2/2'),
			path.resolve(dir, '2/2/text1.txt'),
			path.resolve(dir, '2/2/text2.txt'),
		])
	})
})
