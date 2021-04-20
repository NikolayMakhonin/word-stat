import fse from 'fs-extra'
import path from 'path'
import tar from 'tar-stream'
import {streamToBuffer} from './helpers'

export async function processFiles({
	fileOrDirPath: _fileOrDirPath,
	filterPaths,
	processFile,
}: {
	fileOrDirPath: string,
	filterPaths?: (fileOrDirPath: string) => boolean,
	processFile: (filePath: string, filePathRelative: string) => Promise<void>|void,
}) {
	const relativeDir = (await fse.stat(_fileOrDirPath)).isDirectory()
		? _fileOrDirPath
		: null

	async function _processFiles(fileOrDirPath: string) {
		fileOrDirPath = path.resolve(fileOrDirPath)

		if (filterPaths && !filterPaths(fileOrDirPath)) {
			return
		}

		const stat = await fse.stat(fileOrDirPath)
		if (!stat.isDirectory()) {
			const promise = processFile(
				fileOrDirPath,
				relativeDir ? path.relative(relativeDir, fileOrDirPath) : fileOrDirPath,
			)
			if (promise) {
				await promise
			}
			return
		}

		const subPaths = await fse.readdir(fileOrDirPath)
		for (let i = 0, len = subPaths.length; i < len; i++) {
			// eslint-disable-next-line no-await-in-loop
			await _processFiles(path.resolve(fileOrDirPath, subPaths[i]))
		}
	}

	return _processFiles(_fileOrDirPath)
}

export function processArchiveTar({
	archivePath,
	processFile,
}: {
	archivePath: string,
	processFile: (archivePath: string, filePath: string, buffer: Buffer) => Promise<void>|void,
}) {
	return new Promise((resolve, reject) => {
		const extract = tar.extract()
		extract.on('entry', async (headers, content, next) => {
			const {name: filePath, type} = headers

			if (type === 'file') {
				try {
					const buffer = await streamToBuffer(content)
					await processFile(archivePath, filePath, buffer)
				} catch (err) {
					reject(err)
					return
				}
			}

			next()
		})

		extract.on('error', reject)
		extract.on('finish', resolve)

		const source = fse.createReadStream(archivePath)
		source.on('error', reject)

		source.pipe(extract)
	})
}
