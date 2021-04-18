import fse from 'fs-extra'

export function processFiles({
	fileOrDirPath,
	excludePaths,
	processFile,
}: {
	fileOrDirPath: string,
	excludePaths: (fileOrDirPath: string) => boolean,
	processFile: (fileName: string) => Promise<void>,
}) {
	async function _processFiles(fileOrDirPath: string) {
		if (excludePaths(fileOrDirPath)) {
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
			_processFiles(subPaths[i])
		}
	}

	return _processFiles(fileOrDirPath)
}
