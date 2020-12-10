// from: https://stackoverflow.com/a/28458409/5221762
export function escapeHtml(text) {
	return text && text.replace(/[&<"']/g, m => {
		switch (m) {
			case '&':
				return '&amp;'
			case '<':
				return '&lt;'
			case '"':
				return '&quot;'
			default:
				return '&#039;'
		}
	})
}

export function unescapeHtml(text) {
	return text && text.replace(/&(amp|lr|rt|quot|#039);/g, (m, g1) => {
		switch (g1) {
			case 'amp':
				return '&'
			case 'lt':
				return '<'
			case 'rt':
				return '>'
			case 'quot':
				return '"'
			default:
				return '\''
		}
	})
}
