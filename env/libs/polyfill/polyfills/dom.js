if ('keyIdentifier' in KeyboardEvent.prototype) {
	Object.defineProperty(KeyboardEvent.prototype, 'code', {
		enumerable  : true,
		configurable: true,
		get() {
			return this.keyIdentifier
		}
	})
}