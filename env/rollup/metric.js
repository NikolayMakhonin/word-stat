/* eslint-disable no-implicit-coercion */
const {now} = require('../common/helpers')
const states = {}

let nextId = 1

function metricStart(name) {
	const state = {
		name,
	}
	states[++nextId] = state

	return {
		buildStart() {
			console.log(`buildStart: ${name}`)
			state.modules = {}
		},
		transform(code, id) {
			state.modules[id] = {
				timeStart: now(),
				sizeStart: code.length,
			}
			return null
		},
	}
}

function metricEnd() {
	const state = states[nextId]
	const {name} = state

	return {
		buildEnd() {
			const modules = Object.entries(state.modules)
			console.log(`buildEnd: ${name} (${modules.length} modules)`)
			if (modules.length < 20) {
				const log = modules
					.sort((o1, o2) => o1[1].duration - o2[1].duration)
					.map(([id, _module]) => {
						const duration = _module.duration != null && +_module.duration.toPrecision(3)
						const size = _module.sizeStart != null && _module.sizeEnd != null
							&& +Math.max(_module.sizeStart, _module.sizeEnd) // .toPrecision(3)
						// console.log(`[${duration} ms][${size} B][${name}] ${id}`)
						return `[${duration} ms][${size} B][${name}] ${id}`
					})
					.join('\r\n')
				console.log(log)
			}
			state.modules = {}
		},
		transform(code, id) {
			const _module = state.modules[id]
			_module.timeEnd = now()
			_module.sizeEnd = code.length
			_module.duration = _module.timeEnd - _module.timeStart
			_module.deltaSize = _module.sizeEnd - _module.sizeStart
			return null
		},
	}
}

module.exports = {
	metricStart,
	metricEnd,
}
