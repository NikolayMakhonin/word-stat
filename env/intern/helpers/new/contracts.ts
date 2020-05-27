import {LogEntry} from '@theintern/leadfoot/index'

export type Func<TThis, TArgs extends any[], TValue = void> = (this: TThis, ...args: TArgs) => TValue

export type TLogMessage = LogEntry & {
	type: string
	level: 'debug' | 'info' | 'log' | 'verbose',
}

export type TLog = {
	message: TLogMessage | string,
} | string

export type TLogPredicate = (log: TLog) => boolean
