/* eslint-disable require-await */
// @ts-ignore
import appConfig from 'APP_CONFIG_PATH'
import {
	ObjectSerializer,
} from 'webrain'
import {storeObject} from '../main/browser/helpers/localStorage'
import {Brain} from './brain'

export const brain = new Brain()
;(async function initBrain() {
	// await storeObject(
	// 	`Brain-${appConfig.type}-84495d93da914ecc8f9de2bffa9f3df5`,
	// 	brain,
	// 	b => b.p('auth').p('currentCredentials'),
	// )

	console.log('config type: ', appConfig.type)

	// if (typeof window !== 'undefined') {
	// 	await brain.auth.login()
	// }
})()
