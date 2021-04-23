export function distinct<TItem, TId>(arr: TItem[], getId: (item: TItem) => TId): TItem[] {
	const map = arr
		.reduce((a, o) => {
			a.set(getId(o), o)
			return a
		}, new Map<TId, TItem>())

	return Array.from(map.values())
}
