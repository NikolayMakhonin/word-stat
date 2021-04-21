import fse from 'fs-extra'
import path from 'path'
import tar from 'tar-stream'
import lzmaNative from 'lzma-native'
import {streamToBuffer} from './helpers'

export async function processFiles({
	fileOrDirPath: _fileOrDirPath,
	filterPaths,
	processArchives,
	alwaysReadBuffer,
	processFile,
	onFileProcessed,
}: {
	fileOrDirPath: string,
	filterPaths?: (isDir: boolean, archivePath: string, fileOrDirPath: string) => boolean,
	processArchives?: boolean,
	alwaysReadBuffer?: boolean,
	processFile: (
		rootDir: string,
		archivePath: string,
		filePath: string,
		buffer?: Buffer,
	) => Promise<void>|void,
	onFileProcessed?: (rootDir: string, archivePath: string, filePath: string) => Promise<void>|void,
}) {
	const rootDir = (await fse.stat(_fileOrDirPath)).isDirectory()
		? _fileOrDirPath
		: null

	async function _processFiles(fileOrDirPath: string) {
		fileOrDirPath = path.resolve(fileOrDirPath)

		const stat = await fse.stat(fileOrDirPath)

		if (filterPaths && !filterPaths(stat.isDirectory(), null, fileOrDirPath)) {
			return
		}

		if (!stat.isDirectory()) {
			if (processArchives && /\.tar(\.\w+)?$/.test(fileOrDirPath)) {
				await processArchiveTarXz({
					archivePath: fileOrDirPath,
					filterPaths,
					async processFile(archivePath, innerFilePath, buffer) {
						if (filterPaths && !filterPaths(false, archivePath, innerFilePath)) {
							return
						}

						await processFile(
							rootDir,
							archivePath,
							innerFilePath,
							buffer,
						)

						if (onFileProcessed) {
							await onFileProcessed(
								rootDir,
								archivePath,
								innerFilePath,
							)
						}
					},
				})
			} else {
				const buffer = alwaysReadBuffer
					? await fse.readFile(fileOrDirPath)
					: null

				await processFile(
					rootDir,
					null,
					fileOrDirPath,
					buffer,
				)
			}

			if (onFileProcessed) {
				await onFileProcessed(
					rootDir,
					null,
					fileOrDirPath,
				)
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

export function processArchiveTarXz({
	archivePath,
	filterPaths,
	processFile,
}: {
	archivePath: string,
	filterPaths?: (isDir: boolean, archivePath: string, fileOrDirPath: string) => boolean,
	processFile: (archivePath: string, filePath: string, buffer: Buffer) => Promise<void>|void,
}): Promise<void> {
	return new Promise((resolve, reject) => {
		const extract = tar.extract()
		extract.on('entry', async (headers, content, next) => {
			const {name: innerPath, type} = headers

			if (type === 'directory' || type === 'file') {
				if (filterPaths && !filterPaths(type === 'directory', archivePath, innerPath)) {
					next()
					return
				}
			}

			if (type === 'file') {
				try {
					const buffer = await streamToBuffer(content)
					await processFile(archivePath, innerPath, buffer)
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

		const xzStream = lzmaNative.createDecompressor()

		xzStream.pipe(extract)
		source.pipe(xzStream)
	})
}
