import {end} from './find-base'
import {iter, run} from './run'

/* tslint:disable */

function remoteLoadScript(scriptUrl, callback) {
	try {
		var script = window.document.createElement('script');
		script.onload = function () {
			callback();
		};
		script.onerror = function (err) {
			// @ts-ignore
			var errStr = err && err.stack || err && err.toString() || err + ''
			console.error(errStr);
			callback(errStr);
		};
		script.src = scriptUrl;
		document.head.appendChild(script);
	} catch (ex) {
		callback(JSON.stringify({
			error: {
				url    : scriptUrl,
				message: ex.toString(),
				stack  : ex.stack
			}
		}));
	}
}

/* tslint:enable */

export const loadScript = iter(function *loadScript(scriptUrl: string, timeOut?: number) {
	yield run(o => o.setExecuteAsyncTimeout(timeOut || 10000))
	yield run(o => o.executeAsync(remoteLoadScript, [scriptUrl]))
	yield end()
})
