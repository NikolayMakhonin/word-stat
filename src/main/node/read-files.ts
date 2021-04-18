import fse from 'fs-extra'

export function forEachFiles({
	fileOrDirPath,
	excludePaths,
	processFile,
	parallelCount = 1,
}: {
	fileOrDirPath: string,
	excludePaths: (fileOrDirPath: string) => boolean,
	processFile: (fileName: string) => Promise<void>,
	parallelCount: number,
}) {
	const promises: Promise<void>[] = []

	async function _forEachFiles(fileOrDirPath: string) {
		if (excludePaths(fileOrDirPath)) {
			return
		}

		const stat = await fse.stat(fileOrDirPath)
		if (!stat.isDirectory()) {
			const promise = processFile(fileOrDirPath)
			if (promise) {
				promises.push(promise)
				promise.finally(() => {
					const index = promises.indexOf(promise)
					promises[index] = promises[promises.length - 1]
					promises.length--
				})
				while (promises.length >= parallelCount) {
					await Promise.race(promises)
				}
			}
			return
		}

		const subPaths = await fse.readdir(fileOrDirPath)
		for (let i = 0, len = subPaths.length; i < len; i++) {
			_forEachFiles(subPaths[i])
		}
	}

	return _forEachFiles(fileOrDirPath)
}
