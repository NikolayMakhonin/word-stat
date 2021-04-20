export class WordsStat {
	_wordToStat = new Map<string, number>()
	_maxCount: number
	_bufferCount: number

	constructor({
		maxCount,
		bufferCount,
	}: {
		maxCount?: number,
		bufferCount?: number,
	} = {}) {
		this._maxCount = maxCount || 100000
		this._bufferCount = bufferCount || 50000
	}

	add(word: string) {
		const count = this._wordToStat.get(word) || 0
		this._wordToStat.set(word, count + 1)
		this.reduce()
	}

	has(word: string): boolean {
		return this._wordToStat.has(word)
	}

	reduce(force?: boolean) {
		if (!force && this._wordToStat.size <= this._maxCount + this._bufferCount) {
			return
		}

		const entries = Array.from(this._wordToStat.entries())
		entries.sort((o1, o2) => {
			if (o1[1] !== o2[1]) {
				return o1[1] > o2[1] ? -1 : 1
			}
			return 0
		})

		if (entries.length > this._maxCount) {
			entries.length = this._maxCount
		}

		this._wordToStat = new Map(entries)
	}

	clear() {
		this._wordToStat.clear()
	}

	entries() {
		return Array.from(this._wordToStat.entries())
	}

	values() {
		return Array.from(this._wordToStat.values())
	}
}
