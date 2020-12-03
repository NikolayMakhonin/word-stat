import {
	getWithInternPort,
	openWindow,
	runTest,
	testNavigate,
	testPage,
	registerSuite,
} from '../../../../../../env/intern/helpers/new/index'
import {errorPredicate} from '../../src/helpers/helpers'
import path from 'path'
import appConfig from '../../src/helpers/appConfig'

registerSuite('main > sapper > routes > base', {
	'base'() {
		// docs:
		// https://theintern.io/docs.html#Leadfoot/2/api/Command/command-1
		// https://theintern.io/leadfoot/module-leadfoot_Command.html

		// return this.remote

		// this.timeout = 180000
		return runTest(this.remote, 10000, 5000, function *_1_base() {
			yield openWindow(425, 882)
			yield openWindow(425, 882)
			yield getWithInternPort(path.join(appConfig.baseUrl, 'dev'))
			yield testPage(
				function *_testPage() {
					yield testNavigate(
						null, o => o.pathname,
						path.join(appConfig.baseUrl, 'dev/components'), 2000,
					)
				},
				errorPredicate,
			)
		})
	},
})
