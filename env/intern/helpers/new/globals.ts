const intern = require('intern').default

;(global as any).intern = intern

const consoleError = console.error
console.error = function() {
	return consoleError.apply(this, arguments)
}

const consoleWarn = console.warn
console.warn = function() {
	return consoleWarn.apply(this, arguments)
}
