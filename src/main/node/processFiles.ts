import fse from 'fs-extra'
import path from 'path'

export function processFiles({
	fileOrDirPath: _fileOrDirPath,
	filterPaths,
	processFile,
}: {
	fileOrDirPath: string,
	filterPaths?: (fileOrDirPath: string) => boolean,
	processFile: (filePath: string) => Promise<void>|void,
}) {
	async function _processFiles(fileOrDirPath: string) {
		fileOrDirPath = path.resolve(fileOrDirPath)

		if (filterPaths && !filterPaths(fileOrDirPath)) {
			return
		}

		const stat = await fse.stat(fileOrDirPath)
		if (!stat.isDirectory()) {
			const promise = processFile(fileOrDirPath)
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

