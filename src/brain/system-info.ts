// @ts-ignore
import userAgentParse from 'ua-parser-js'

export function getUserAgent() {
	return typeof navigator !== 'undefined' && userAgentParse(navigator.userAgent)
}

export async function getSystemInfo() {
	const userAgent = getUserAgent()
	const os = userAgent.os && userAgent.os.name && (`${userAgent.os.name} ${userAgent.os.version || ''}`.trim())

	const device = typeof window !== 'undefined'
		&& (window as any).getDeviceName
		&& await (window as any).getDeviceName()
		|| userAgent.device
			&& userAgent.device.vendor
			&& (`${userAgent.device.vendor} ${userAgent.device.model || ''}`.trim())
		|| 'desktop'

	return {
		device,
		os,
	}
}
