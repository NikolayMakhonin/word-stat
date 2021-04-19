import fse from 'fs-extra'
import path from 'path'

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

