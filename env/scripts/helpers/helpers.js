/* eslint-disable no-unused-vars,callback-return,no-process-exit,no-process-env */
const {spawn} = require('child_process')
// const spawn = require('spawn-command-with-kill')
const psTree = require('ps-tree')
const colors = require('kleur')
const readline = require('readline')
// const kill = require('tree-kill')

// interface ProcessEnvOptions {
// 	uid?: number;
// 	gid?: number;
// 	cwd?: string;
// 	env?: NodeJS.ProcessEnv;
// 	/**
// 	 * @default true
// 	 */
// 	windowsHide?: boolean;
// 	/**
// 	 * @default 0
// 	 */
// 	timeout?: number;
// 	argv0?: string;
// 	stdio?: StdioOptions;
// 	detached?: boolean;
// 	shell?: boolean | string;
// 	windowsVerbatimArguments?: boolean;
// 	stdio?: 'pipe' | Array<null | undefined | 'pipe'>;
// }

let wasKillAll
const processList = []
const runStates = []

process.on('SIGTERM', () => {
	console.log('SIGTERM')
	killAll()
})
process.on('SIGHUP', () => {
	console.log('SIGHUP')
	killAll()
})
process.on('SIGINT', () => {
	console.log('SIGINT')
	killAll()
})
process.on('SIGBREAK', () => {
	console.log('SIGBREAK')
	killAll()
})

process.on('beforeExit', () => {
	console.log('beforeExit')
	killAll()
})
process.on('exit', () => {
	console.log('exit')
	killAll()
})

// process.on('disconnect', killAll)
process.on('uncaughtException', err => {
	printError('uncaughtException', err)
	killAll(true)
})

function printRunStates() {
	for (let i = 0; i < runStates.length; i++) {
		const state = runStates[i]

		let message = `${state.status} (${
			((state.timeEnd || Date.now()) - state.timeStart) / 1000
		} sec): ${state.command}`

		switch (state.status) {
			case 'RUNNED':
				message = console.log(colors.blue(message))
				break
			case 'SUCCESS':
				message = console.log(colors.cyan(message))
				break
			case 'ERROR':
				message = console.error(colors.red(message))
				break
			default:
				throw new Error(`Unknown status: ${state.status}`)
		}
	}
}

function printError(prefix, err) {
	console.error(colors.red().bold(`${prefix}: ${err && err.stack || err && err.toString() || err}`))
}

function getColorPrefix(colorFunc) {
	const colorText = colorFunc('COLOR')
	return colorText.match(/^(.*)COLOR/s)[1]
}

const colorPrefixes = {
	bold     : getColorPrefix(colors.red),
	red      : getColorPrefix(colors.red),
	magenta  : getColorPrefix(colors.magenta),
	yellow   : getColorPrefix(colors.yellow),
	bgRed    : getColorPrefix(colors.bgRed),
	bgMagenta: getColorPrefix(colors.bgMagenta),
	bgYellow : getColorPrefix(colors.bgYellow),
}

function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

// const errorTextRegExp = /\b(err(ors?)?|warn(ings?)?|fail(ed|ure|s)?)\b|[✗]/i
const errorTextRegExp = /[^\r\n]*(\b[1-9]\d* *(fail|err)|[✗×]|fatal error|error occur)[^\r\n]*/i
const errorColorRegExp = new RegExp(`[^\\r\\n]*(${[
	colorPrefixes.bold,
	colorPrefixes.red,
	colorPrefixes.magenta,
	// colorPrefixes.yellow,
	colorPrefixes.bgRed,
	colorPrefixes.bgMagenta,
	// colorPrefixes.bgYellow,
].map(escapeRegExp).join('|')})[^\\r\\n]*`)

function searchError(message) {
	const errorColor = message.match(errorColorRegExp)
	message = removeColor(message)

	if (errorColor
		// at least 10 letters
		&& (/(\w\W*){10,}/s).test(message)
		&& !(/√/s).test(message)
		// electron-builder
		&& !(/[┌│]/s).test(message)
		// sapper: "189 kB client.905ef984.js"
		&& !(/\b\d+\s+\w+\s+\S+\.js\b/.test(message) && message.length < 100)
	) {
		return `ERROR COLOR: ${errorColor[0]}`
	}

	const errorText = message.match(errorTextRegExp)
	if (errorText) {
		return `ERROR TEXT: ${errorText[0]}`
	}

	return false
}

function logFilter(message) {
	// sapper export
	if (/\s{4,}\S\s[^\w\r\n]*node_modules/.test(message)) {
		return false
	}

	// Empty space
	if (/^\s*$/s.test(message)) {
		return false
	}

	return true
}

function correctLog(message) {
	message = message.replace(/^\s{20,}/, '')
	return message
}

function removeColor(message) {
	// eslint-disable-next-line no-control-regex
	return message.replace(/\u001B\[\d+m/g, '')
}

function checkIsError(message) {
	message = removeColor(message)

	if (message.length < 20) {
		return false
	}

	if (/openssl config failed/.test(message)) {
		return false
	}

	// web storm
	if (/Debugger attached|Debugger listening on|Waiting for the debugger|nodejs.*inspector/.test(message)) {
		return false
	}

	// rollup
	if (/treating it as an external dependency|\bcreated\b.*\.js in \d|\bFinished in\b/.test(message)) {
		return false
	}
	if (message.indexOf('→') >= 0) {
		return false
	}

	// someone package is outdated
	if (/\bnpm update\b/.test(message)) {
		return false
	}

	// terminate process
	if (/^\^[A-Z]$/.test(message)) {
		return false
	}

	// experimental warnings
	if (/ExperimentalWarning: Conditional exports is an experimental feature. This feature could change at any time/.test(message)) {
		return false
	}

	return true
}

function addProcess(proc) {
	processList.push(proc)
}

function _killByPidsUnix(...pids) {
	if (!pids.length) {
		return
	}

	const params = pids.map(o => o.toString())
	params.unshift('-15')
	console.log(`kill ${params.join(' ')}`)

	spawn('kill', params, {
		detached: true,
		stdio   : 'ignore',
	})
		// .on('error', err => printError('kill error', err))
		.unref()
}

function killByPidsUnix(...pids) {
	if (!pids.length) {
		return
	}

	_killByPidsUnix(...pids)

	for (let i = 0; i < pids.length; i++) {
		psTree(pids[i], (err, children) => {
			if (err) {
				printError('psTree error', err)
				children = []
			}

			_killByPidsUnix(...children.map(o => o.PID))
		})
	}
}

function killByPidsWindows(...pids) {
	if (!pids.length) {
		return
	}

	const params = ['/F', '/T']
	for (let i = 0; i < pids.length; i++) {
		params.push('/PID')
		params.push(pids[i].toString())
	}
	console.log(`taskkill ${params.join(' ')}`)
	spawn('taskkill', params, {
		detached: true,
		stdio   : 'ignore',
	})
		// .on('error', err => printError('kill error', err))
		.unref()
}

function killByPids(...pids) {
	if (pids.length) {
		// console.log(`Kill All: ${pids.join(' ')}`)
		if (process.platform === 'win32') {
			killByPidsWindows(...pids)
		} else {
			killByPidsUnix(...pids)
		}
	}
}

function killAll(fail) {
	if (wasKillAll) {
		return
	}
	wasKillAll = true

	setTimeout(() => {
		const procs = processList.filter(o => o.pid && !o.killed)
		const pids = procs.map(o => o.pid)
		killByPids(...pids)
		printRunStates()
		if (fail) {
			process.exit(1)
		}
	}, 2000)
}

function run(command, {
	env,
	timeout,
	notAutoKill,
	stdio,
	shell = true,
} = {}) {
	return new Promise((resolve, reject) => {
		if (wasKillAll) {
			reject('Was kill all')
			return
		}

		console.log(colors.blue(`RUN: ${command}`))

		const startTime = Date.now()

		const runState = {
			status   : 'RUNNED',
			timeStart: Date.now(),
			command,
		}
		runStates.push(runState)

		const _resolve = () => {
			runState.status = 'SUCCESS'
			runState.timeEnd = Date.now()
			resolve()
		}

		const _reject = err => {
			runState.status = 'ERROR'
			runState.timeEnd = Date.now()
			reject(err)
		}

		const proc = spawn(
			command,
			{
				cwd: process.cwd(),
				env: {
					...process.env,
					...env,
				},
				timeout,
				stdio,
				shell: true,
			})

		if (!notAutoKill) {
			addProcess(proc)
		}

		proc
			.on('disconnect', () => {
				_reject('process.disconnect')
			})
			.on('close', (code, signal) => {
				if (code) {
					_reject(`process.close(code=${code}, signal=${signal})`)
				} else {
					_resolve()
				}
			})
			.on('exit', (code, signal) => {
				if (code) {
					_reject(`process.exit(code=${code}, signal=${signal})`)
				} else {
					_resolve()
				}
			})
			.on('message', (message, sendHandle) => {
				console.log(`process.message: ${message}`)
			})
			.on('error', err => {
				_reject(err)
			})

		if (proc.stdout) {
			readline.createInterface({
				input   : proc.stdout,
				terminal: false
			}).on('line', line => {
				const error = searchError(line)
				if (logFilter(line)) {
					line = correctLog(line)
					process.stdout.write(`${line}\r\n`)
				}
				if (error) {
					_reject(`ERROR DETECTED: ${error}`)
				}
			})
		}

		if (proc.stderr) {
			readline.createInterface({
				input   : proc.stderr,
				terminal: false
			}).on('line', line => {
				if (checkIsError(line)) {
					process.stdout.write(`STDERR: ${line}\r\n`)
					_reject(line)
					return
				}
				process.stdout.write(`${line}\r\n`)
			})
		}
	}).catch(err => {
		if (!wasKillAll) {
			console.error(colors.bold().red(`✗ ${command}\r\n${err && err.stack || err && err.toString() || err}`))
			return Promise.reject(err)
		}
		return null
	})
}

// eslint-disable-next-line no-extend-native
Promise.prototype.stopOnError = function stopOnError() {
	return this.catch(err => {
		printError('Kill on error', err)
		killAll(true)
	})
}

function singleProcess(func) {
	let locker
	return async (...args) => {
		await locker
		locker = func(...args)
		return locker
	}
}

function singleCall(func) {
	const cache = {}

	return (...args) => {
		const id = JSON.stringify(args)
		const cacheItem = cache[id]
		if (cacheItem) {
			if (cacheItem.error) {
				throw cacheItem.error
			}
			return cacheItem.result
		}

		if (cacheItem === false) {
			throw new Error(`Recursive call of single call func: ${func.toString()}`)
		}
		cache[id] = false

		try {
			const result = func(...args)
			cache[id] = {result}
			return result
		} catch (error) {
			cache[id] = {error}
			throw error
		}
	}
}

module.exports = {
	run,
	singleCall,
	singleProcess,
}
