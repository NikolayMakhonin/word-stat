/* eslint-disable no-undef */
const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const globby = require('globby')

function asPromise(func) {
	return new Promise((resolve, reject) => func((err, result) => {
		if (err) {
			reject(err)
			return
		}
		resolve(result)
	}))
}

let now

if (typeof performance !== 'undefined' && performance.now) {
	now = performance.now.bind(performance)
} else {
	const start = process.hrtime()
	// eslint-disable-next-line no-shadow
	now = function now() {
		const end = process.hrtime(start)
		return end[0] * 1000 + end[1] / 1000000
	}
}

async function writeTextFile(filePath, content) {
	filePath = path.resolve(process.cwd(), filePath)
	const dir = path.dirname(filePath)
	await new Promise((resolve, reject) => {
		fs.mkdir(dir, {recursive: true}, err => {
			if (err) {
				reject(err)
				return
			}

			resolve()
		})
	})
	await new Promise((resolve, reject) => {
		fs.writeFile(filePath, content, err => {
			if (err) {
				reject(err)
				return
			}

			resolve()
		})
	})
}

function writeTextFileSync(filePath, content) {
	const dir = path.dirname(filePath)

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, {recursive: true})
	}

	fs.writeFileSync(filePath, content)

	return filePath
}

function normalizePath(filepath) {
	return path.relative(process.cwd(), filepath).replace(/\\/g, '/')
}

async function copyToSingleDir(destDir, ...globbyPatterns) {
	if (!fs.existsSync(destDir)) {
		fs.mkdirSync(destDir, {recursive: true})
	}

	const files = await globby(globbyPatterns)
	const buffer = {}
	for (let i = 0; i < files.length; i++) {
		const file = files[i]
		const parsed = path.parse(file)
		const name = path.join(destDir, parsed.name)
		const ext = parsed.ext
		let destFile = name + ext
		let n = 0
		while (buffer[destFile]) {
			destFile = name + n + ext
			n++
		}
		buffer[destFile] = file
	}

	await Promise.all(Object.keys(buffer)
		.map(destFile => new Promise((resolve, reject) => {
			fs.copyFile(buffer[destFile], destFile, err => {
				if (err) {
					reject(err)
					return
				}
				resolve()
			})
		}))
	)
}

async function deletePaths(...globPatterns) {
	const paths = await globby(globPatterns, {
		expandDirectories: false,
	})
	await Promise.all(paths
		.map(_path => fse.remove(_path)))
}

async function createDir(dirPath) {
	await fse.mkdirp(dirPath)
}

async function reCreateDir(dirPath) {
	await deletePaths(dirPath)
	await createDir(dirPath)
}

module.exports = {
	writeTextFile,
	writeTextFileSync,
	copyToSingleDir,
	asPromise,
	now,
	normalizePath,
	deletePaths,
	createDir,
	reCreateDir,
}
