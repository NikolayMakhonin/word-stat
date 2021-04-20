import {Iconv} from 'iconv'

const encodings: BufferEncoding[] = ['utf-8', 'utf16le', 'ucs-2', 'latin1']
export function detectXmlEncoding(buffer: Buffer) {
	for (let i = 0, len = encodings.length; i < len; i++) {
		const header = buffer.toString(encodings[i], 0, 100)
		const headerMatch = header.match(/encoding\s*[=:]\s*['"]([^['"]+)['"]/)
		if (headerMatch) {
			return headerMatch[1].toUpperCase() || 'UTF-8'
		}
	}
	return null
}

export function xmlBufferToString(buffer: Buffer) {
	const encoding = detectXmlEncoding(buffer) || 'UTF8'
	if (encoding !== 'UTF-8' && encoding !== 'UTF8') {
		// @ts-ignore
		const iconv = new Iconv(encoding, 'UTF-8')
		buffer = iconv.convert(buffer)
	}
	const text = buffer.toString('utf-8')
	return text
}

export function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		const chunks = []
		stream.on('data', (chunk) => {
			chunks.push(chunk)
		})
		stream.on('error', err => {
			reject(err)
		})
		stream.on('end', () => {
			resolve(Buffer.concat(chunks))
		})
	})
}
