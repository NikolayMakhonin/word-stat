import fse from 'fs-extra'
import path from 'path'
import type {Readable} from 'stream'
import tar from 'tar-stream'
import lzmaNative from 'lzma-native'
import {streamToBuffer} from './helpers'

export async function processFiles({
	fileOrDirPath: _fileOrDirPath,
	filterPaths,
	processArchives,
	readBuffer,
	processFile,
	onFileProcessed,
}: {
	fileOrDirPath: string,
	filterPaths?: (isDir: boolean, archivePath: string, fileOrDirPath: string) => boolean,
	processArchives?: boolean,
	readBuffer?: boolean,
	processFile: (
		rootDir: string,
		archivePath: string,
		filePath: string,
		stream: Readable|null,
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
		const isDir = stat.isDirectory()

		if (filterPaths && !filterPaths(isDir, null, fileOrDirPath)) {
			return
		}

		if (!isDir) {
			if (processArchives && /\.tar(\.\w+)?$/.test(fileOrDirPath)) {
				await processArchiveTarXz({
					archivePath: fileOrDirPath,
					readBuffer,
					filterPaths,
					async processFile(archivePath, innerFilePath, stream, buffer) {
						if (filterPaths && !filterPaths(false, archivePath, innerFilePath)) {
							return
						}

						await processFile(
							rootDir,
							archivePath,
							innerFilePath,
							stream,
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
				const buffer = readBuffer
					? await fse.readFile(fileOrDirPath)
					: null

				await processFile(
					rootDir,
					null,
					fileOrDirPath,
					null,
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
	readBuffer,
	filterPaths,
	processFile,
}: {
	archivePath: string,
	readBuffer?: boolean,
	filterPaths?: (isDir: boolean, archivePath: string, fileOrDirPath: string) => boolean,
	processFile: (archivePath: string, filePath: string, stream: Readable, buffer?: Buffer) => Promise<void>|void,
}): Promise<void> {
	return new Promise((resolve, reject) => {
		const extract = tar.extract()
		extract.on('entry', async (headers, stream, next) => {
			const {name: innerPath, type} = headers

			stream.on('end', next)

			if (type === 'directory' || type === 'file') {
				if (filterPaths && !filterPaths(type === 'directory', archivePath, innerPath)) {
					stream.resume()
					return
				}
			}

			if (type === 'file') {
				try {
					const buffer = readBuffer
						? await streamToBuffer(stream)
						: null
					await processFile(archivePath, innerPath, stream, buffer)
				} catch (err) {
					stream.resume()
					reject(err)
					return
				}
			}

			stream.resume()
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
