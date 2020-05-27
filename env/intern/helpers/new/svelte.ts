import {assert} from './base'
import {end} from './find-base'
import {loadScript} from './load-script'
import {iter, run} from './run'

const {getComponentName, getComponentUrl} = require('../../../rollup/helpers')

/* tslint:disable */

function _appendSvelteComponent(componentClass, containerCssClass, props, callback) {
	try {
		var container = document.createElement('div');
		container.className = containerCssClass;
		document.body.appendChild(container);

		// @ts-ignore
		var component = new window[componentClass]({
			target: container,
			props
		});

		callback();
	} catch (ex) {
		callback(JSON.stringify({
			containerCssClass: containerCssClass,
			componentClass: componentClass,
			props: props,
			error: {
				message: ex.toString(),
				stack  : ex.stack
			}
		}));
	}
}

/* tslint:enable */

export const appendSvelteComponent = iter(function *appendSvelteComponent(
	componentConcatPaths: string[],
	containerCssClass: string,
	props: any,
	timeOut?: number,
) {
	const componentName = getComponentName(...componentConcatPaths)
	yield loadScript(getComponentUrl(...componentConcatPaths), timeOut)
	yield run(o => o.setExecuteAsyncTimeout(timeOut || 10000))
	const err = yield run(o => o.executeAsync(_appendSvelteComponent, [componentName, containerCssClass, props]))
	assert.isNotOk(err)
	yield end()
})
