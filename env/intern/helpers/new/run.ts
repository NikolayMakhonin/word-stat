import Command, {SetContextMethod} from '@theintern/leadfoot/Command'
import {assert, delay} from './base'
import {Func} from './contracts'

function isIterable(value: any): boolean {
	return value != null
		&& typeof value === 'object'
		&& (
			Array.isArray(value)
			|| !(value instanceof String)
			&& typeof value[Symbol.iterator] === 'function'
		)
}

function isIterator(value: any): boolean {
	return isIterable(value)
		&& typeof value.next === 'function'
}

export function isThenable(value: any): boolean {
	return value != null
		&& typeof value === 'object'
		&& typeof value.then === 'function'
}

class State {
	public commandTimeout: number
	public findTimeout: number

	constructor(
		command: Command<any>,
		commandTimeout: number = 10000,
		findTimeout: number = 5000,
	) {
		assertInstanceOf(command, Command)
		this._command = command.setFindTimeout(0)
		this.commandTimeout = commandTimeout
		this.findTimeout = findTimeout
	}

	private _command: Command<any> = null
	get command() {
		return this._command
	}
	set command(command: Command<any>) {
		if (command === this._command) {
			return
		}

		assertInstanceOf(command, Command)

		if (commandIsAwaited(command)) {
			throw new Error('New command is awaited')
		}

		if (!commandIsAwaited(this._command)) {
			throw new Error('Previous command is not awaited')
		}

		this._command = command
	}

	public wait() {
		return waitCommand(this.command, this.commandTimeout)
	}
}

export function getRoot(): Command<any> {
	let root
	let parent = run(o => o)
	do {
		root = parent
		parent = root.parent
	} while (parent)

	return root
}

export function isRoot(): boolean {
	const context = run(o => o).context
	return context.length === 0
}

export function runWithCommand(
	func: () => any, command: Command<any>,
	newCommandTimeout?: number,
	newFindTimeout?: number,
) {
	return resolveFunc(func, new State(
		command,
		newCommandTimeout || getCurrentState().commandTimeout,
		newFindTimeout || getCurrentState().findTimeout,
	))
}

export function runWithRootCommand(func: () => any) {
	return runWithCommand(func, getRoot())
}

// tslint:disable-next-line:ban-types
function assertInstanceOf(object, _class: Function) {
	if (!(object instanceof _class)) {
		throw new Error(`object is not ${_class.name}: ${
			typeof object === 'object'
				? object && (object as any).constructor.name
				: object
			}`)
	}
}

const TIMEOUT = new String('Timeout')

export const usingFindTimeout = iter(function* usingFindTimeout(
	func: () => any,
	timeout: number,
) {
	const state = getCurrentState()
	const prevTimeout = state.findTimeout
	try {
		state.findTimeout = timeout
		return yield func
	} finally {
		state.findTimeout = prevTimeout
		const checkState = getCurrentState()
		assert.strictEqual(checkState, state)
	}
})

function commandIsAwaited(command: Command<any>) {
	return !command.parent
		|| 'result' in command
		&& !isThenable((command as any).result)
	 	&& !isIterator((command as any).result)
}

async function waitCommand(command: Command<any>, timeout: number) {
	if (!('result' in command)) {
		(command as any).result = (async function() {
			if (command.context && command.parent) {
				throw new Error('command is already awaited')
			}

			try {
				let result = await Promise.race([
					command,
					delay(timeout).then(o => TIMEOUT),
				])

				if (!command.context || result === TIMEOUT) {
					throw new Error(`command is not awaited; timeout = ${timeout}`)
				}

				result = await resolveValue(result);

				(command as any).result = result

				return result
			} catch (error) {
				(command as any).result = void 0
				throw error
			}
		})()
	}

	return (command as any).result
}

let currentState: State

function setCurrentState(state: State, checkNotNull?: boolean) {
	if ((checkNotNull || state != null)) {
		assertInstanceOf(state, State)
	}
	currentState = state
}

export function getCurrentState() {
	return currentState
}

export function onPushFindFilter(description: string) {
	const command = run(o => o)
	if (!(command as any).filters) {
		(command as any).filters = [description]
	} else {
		(command as any).filters = [...(command as any).filters, description]
	}
}

export function onReleaseFindFilter() {
	const command = run(o => o)
	const len = (command as any).filters.length
	if (len <= 0) {
		throw new Error('Call end without find')
	}
	(command as any).filters = (command as any).filters.slice(0, len - 1)
}

export function getCurrentFilters() {
	const command = run(o => o)
	return (command as any).filters
}

// export function createCommand<T, P = any, StringResult extends string | string[] = string>(
// 	parentOrSession: Session | Command<P, any, StringResult> | null,
// 	initialiser?: (this: Command<T, P, StringResult>, setContext: SetContextMethod, value: T) => T | PromiseLike<T>,
// 	errback?: (this: Command<T, P, StringResult>, setContext: SetContextMethod, error: any) => T | PromiseLike<T>,
// ) {
// 	const command = new Command(parentOrSession, initialiser, errback)
// }

export function run(func: (command: Command<any>) => Command<any>, parentCommand?: Command<any>) {
	const state = getCurrentState()
	let newCommand = func(state.command)
	if (newCommand !== state.command || parentCommand) {
		if (parentCommand) {
			newCommand = new Command(state.command, function(setContext) {
				setContext(parentCommand.context)
			})
		}

		const oldCommand = parentCommand || state.command

		// newCommand = newCommand.then(function (value) {
		// 	;(this as any).filters = (oldCommand as any).filters
		// 	return value
		// })

		; (newCommand as any).filters = (oldCommand as any).filters
	}

	state.command = newCommand

	return state.command
}

export async function resolveAll(values: any[], state?: State) {
	if (state == null) {
		state = getCurrentState()
	}
	return Promise.all(values.map(value => resolveValue(value, state)))
}

export function iter<TThis, TArgs extends any[], TValue = void>(
	func: Func<TThis, TArgs, TValue>,
): Func<TThis, TArgs, TValue> {
	return function() {
		const result = func.apply(this, arguments)
		if (isIterator(result)) {
			result.name = func.name
			result.stack = func.name + '\n' + new Error().stack.match(/(([^\n]*)\n){3}/)[2]
		}
		return result
	} as any
}

export async function runTest(command: Command<any>, commandTimeout: number, findTimeout: number, func: () => any) {
	return runWithCommand(iter(func), command, commandTimeout, findTimeout)
}

export async function resolveValue(value: any, state?: State): Promise<any> {
	if (state) {
		await state.wait()
	}

	while (true) {
		// if (value && typeof value === 'object' && 'depth' in value) {
		// 	throw new Error('value is Context')
		// } else
		if (value instanceof Command) {
			value = await waitCommand(value, state.commandTimeout)
		} else if (typeof value === 'function') {
			value = await resolveFunc(value, state)
		} else if (isIterator(value)) {
			value = await resolveIterator(value, state)
		} else if (isThenable(value)) {
			value = await value
		} else {
			return value
		}
	}
}

export function resolveFunc(func: () => any, state?: State): Promise<any> {
	const prevState = getCurrentState()
	let nextState
	let value
	try {
		setCurrentState(state, true)
		value = iter(func)()
		nextState = getCurrentState()
	} finally {
		setCurrentState(prevState)
	}

	return resolveValue(value, nextState)
}

export async function resolveIterator(iterator: Iterator<any>, state?: State): Promise<any> {
	const time0 = Date.now()

	let isError
	let value = void 0
	while (true) {
		let iteration
		let nextState
		let prevCommand
		try {
			const prevState = getCurrentState()
			prevCommand = state && state.command
			try {
				setCurrentState(state, true)
				iteration = isError
					? iterator.throw(value)
					: iterator.next(value)
				nextState = getCurrentState()
			} finally {
				setCurrentState(prevState)
			}

			value = await resolveValue(iteration.value, nextState)
			isError = false
		} catch (error) {
			if (!isError) {
				console.error(
					(JSON.stringify(prevCommand && (prevCommand as any).filters, null, 4) || '')
						.replace(/\[debug_id=(\\"|')?([^"']+)(\\"|')?]/g, '@$2'),
					(iterator as any).stack,
				)
			}

			value = error
			isError = true
		}

		if (!iteration || iteration.done) {
			const time = Date.now() - time0
			console.debug(`${time}ms - ${(iterator as any).stack}`)

			if (isError) {
				throw value
			} else if (!iteration) {
				throw new Error('iteration == null')
			}

			return value
		}
	}
}
