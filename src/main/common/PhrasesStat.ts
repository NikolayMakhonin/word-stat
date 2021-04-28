import {getPhraseId, phraseIdToWordsIds, processPhraseCombines} from './phrases-helpers'

export interface IPhraseStat {
	id: string
	count: number
	wordsCount: number
	excluded: boolean // needed for parent phrases
	parent: IPhraseStat
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
		const parentId = getPhraseId(wordsIds, 0, wordsIds.length)
		if (!filterPhrases || filterPhrases(parentId)) {
			return
		}

		const parent = this.add(
			null, parentId, wordsIds.length, count,
			maxPhraseLength && wordsIds.length > maxPhraseLength,
		)

		processPhraseCombines(
			wordsIds, maxPhraseLength,
			(_wordsIds, indexStart, indexEndExclusie) => {
				const phraseId = getPhraseId(_wordsIds, indexStart, indexEndExclusie)
				if (filterPhrases && !filterPhrases(phraseId)) {
					return
				}
				this.add(parent, phraseId, indexEndExclusie - indexStart, count)
			},
		)
	}

	add(parent: IPhraseStat, id: string, wordsCount: number, count: number, excluded?: boolean) {
		let phraseStat = this._phraseToStat.get(id)
		if (!phraseStat) {
			phraseStat = {
				id,
				count,
				wordsCount,
				excluded,
				parent,
			}
			this._phraseToStat.set(id, phraseStat)
		} else {
			phraseStat.count += count
		}

		this.reduce()

		return phraseStat
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
		for (let i = 0, len = entries.length; i < len; i++) {
			const [key, stat] = entries[i]
			const wordsIds = phraseIdToWordsIds(key)
			processPhraseCombines(
				wordsIds, null,
				(_wordsIds, indexStart, indexEndExclusie) => {
					const phraseId = getPhraseId(_wordsIds, indexStart, indexEndExclusie)
					const childStat = this._phraseToStat.get(phraseId)
					if (childStat) {
						childStat.countSelf -= stat.countSelf
					}
				},
			)
		}
		entries
			.filter(o => o[1].countSelf > 0)
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
