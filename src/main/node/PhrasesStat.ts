export interface IPhraseStat {
	count: number
	wordsCount: number
}

export class PhrasesStat {
	_phraseToStat = new Map<string, IPhraseStat>()
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

	add(phraseId: string, wordsCount: number) {
		let phraseStat = this._phraseToStat.get(phraseId)
		if (!phraseStat) {
			phraseStat = {
				count: 1,
				wordsCount,
			}
		} else {
			phraseStat.count++
		}

		this.reduce()
	}

	reduce(force?: boolean) {
		if (!force && this._phraseToStat.size <= this._maxCount + this._bufferCount) {
			return
		}

		const entries = Array.from(this._phraseToStat.entries())
		entries.sort((o1, o2) => {
			if (o1[1].count > o2[1].count) {
				return -1
			}
			if (o1[1].wordsCount < o2[1].wordsCount) {
				return -1
			}
			return 0
		})

		if (entries.length > this._maxCount) {
			entries.length = this._maxCount
		}

		this._phraseToStat = new Map(entries)
	}

	clear() {
		this._phraseToStat.clear()
	}

	entries() {
		return Array.from(this._phraseToStat.entries())
	}
}
