export class WordsCache {
	_idToStr = new Map<string, string>()
	_strToId = new Map<string, string>()
	_nextId = 1
	_normalize?: (str: string) => string
	_getSynonims?: (str: string) => string[]

	constructor({
		normalize,
		getSynonims,
	}: {
		normalize?: (str: string) => string,
		getSynonims?: (str: string) => string[],
	} = {}) {
		this._normalize = normalize
		this._getSynonims = getSynonims
	}

	get(id: string): string {
		return this._idToStr.get(id)
	}

	getId(str: string): string {
		const strNormalized = this._normalize
			? this._normalize(str)
			: str

		return this._strToId.get(strNormalized)
	}

	put(str: string): string {
		const strNormalized = this._normalize
			? this._normalize(str)
			: str

		let id = this._strToId.get(strNormalized)
		if (id == null) {
			id = (this._nextId++).toString()
			this._strToId.set(strNormalized, id)
			this._idToStr.set(id, str)
			if (this._getSynonims) {
				const synonims = this._getSynonims(strNormalized)
				for (let i = 0, len = synonims.length; i < len; i++) {
					const synonim = synonims[i]
					const synonimNormalized = this._normalize
						? this._normalize(synonim)
						: synonim
					this._strToId.set(synonimNormalized, id)
				}
			}
		}

		return id
	}

	clear() {
		this._idToStr.clear()
		this._strToId.clear()
	}
}
