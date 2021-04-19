export type TWordsCache = Map<string, number>

export interface IStatCollector {
	addText(text: string): void
}
