import {getPhraseId, phraseIdToWordsIds, processPhraseCombines} from './phrases-helpers'

export interface IPhraseStat {
	countSelf?: number
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

	addCombines(
		wordsIds: string[],
		count: number,
		maxPhraseLength?: number,
		filterPhrases?: (phraseId: string) => boolean,
	) {
		processPhraseCombines(
			wordsIds, maxPhraseLength,
			(_wordsIds, indexStart, indexEndExclusie) => {
				const phraseId = getPhraseId(_wordsIds, indexStart, indexEndExclusie)
				if (filterPhrases && !filterPhrases(phraseId)) {
					return
				}
				this.add(phraseId, indexEndExclusie - indexStart, count)
			},
		)
	}

	add(phraseId: string, wordsCount: number, count: number) {
		let phraseStat = this._phraseToStat.get(phraseId)
		if (!phraseStat) {
			phraseStat = {
				count,
				wordsCount,
			}
			this._phraseToStat.set(phraseId, phraseStat)
		} else {
			phraseStat.count += count
		}

		this.reduce()
	}

	has(phraseId: string): boolean {
		return this._phraseToStat.has(phraseId)
	}

	reduce(force?: boolean) {
		if (!force && this._phraseToStat.size <= this._maxCount + this._bufferCount) {
			return
		}

		const entries = Array.from(this._phraseToStat.entries())
		for (let i = 0, len = entries.length; i < len; i++) {
			const [, stat] = entries[i]
			stat.countSelf = stat.count
		}
		entries.sort((o1, o2) => o1[1].wordsCount >= o2[1].wordsCount ? -1 : 1)

		let stat: IPhraseStat
		const processPhrase = (_wordsIds, indexStart, indexEndExclusie) => {
			const phraseId = getPhraseId(_wordsIds, indexStart, indexEndExclusie)
			const childStat = this._phraseToStat.get(phraseId)
			if (childStat) {
				childStat.countSelf -= stat.countSelf
			}
		}
		for (let i = 0, len = entries.length; i < len; i++) {
			const entry = entries[i]
			stat = entry[1]
			const wordsIds = phraseIdToWordsIds(entry[0])
			processPhraseCombines(wordsIds, null, processPhrase)
		}
		entries
			.filter(o => {
				if (o[1].countSelf < 0) {
					return false
				}
				return o[1].countSelf > 0
			})
			.sort((o1, o2) => {
				if (o1[1].countSelf !== o2[1].countSelf) {
					return o1[1].countSelf > o2[1].countSelf ? -1 : 1
				}
				if (o1[1].wordsCount !== o2[1].wordsCount) {
					return o1[1].wordsCount > o2[1].wordsCount ? 1 : -1
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

	forEach(callbackfn: (value: IPhraseStat, key: string) => void): void {
		this._phraseToStat.forEach(callbackfn)
	}
}
