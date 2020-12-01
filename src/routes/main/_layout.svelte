<script context="module">
	import {deepSubscriber, connectorFactory, autoCalcConnect, depend} from 'webrain'
	import {brain} from "../../brain/facade"
	import {logger} from "@flemist/web-logger/browser/mjs"

	// region App Init

	if (typeof window !== 'undefined') {
		// region Tray

		if (window.tray) {
			window.tray.subscribe('click', e => {
				if (e.id === 'icon') {
					brain.mainWindow.show()
					window.widget.updateState({
						isVisible: true,
					})
				}
			})
		}

		// endregion

		// region logFileName

		logger.handlers.writeToFile.logFileName = 'unknown.log'
		autoCalcConnect(
			brain,
			connectorFactory({
				build: c => c
					.connect('accountId', b => b.f(o => o.auth).f(o => o.user).f(o => o.accountId)),
			}),
			depend(function*() {
				const accountId = yield this.accountId
				logger.handlers.writeToFile.logFileName = accountId == null
					? 'unknown.log'
					: `${accountId}.log`
			})
		)()

		// endregion
	}

	// endregion

	// const createConnector = connectorFactory({
	// 	name: 'login view',
	// 	buildRule: c => c
	// 		.connect('isLoggedIn', b => b.p('auth').p('isLoggedIn'))
	// 		.connect('isLogging', b => b.p('auth').p('isLogging'))
	// })
	//
	// const subscribe = dependenciesSubscriber(
	// 	b => b.propertyAny(),
	// 	update => { update() }
	// )

</script>

<script>
	import {onMount, onDestroy} from 'svelte'
	// import {brain} from "../../brain/facade"; // TODO
	// noinspection NpmUsedModulesInstalled
	import Window from '../../components/app/Window.svelte'
	// noinspection NpmUsedModulesInstalled
	import appConfig from 'APP_CONFIG_PATH'
	import {openWebrainWindow} from "../../components/app/Webrain"

	export let segment

	// TODO
	// const connector = createConnector(brain)
	// $: connector.connectorState.source = brain
	// onDestroy(subscribe(connector, function updateView() {
	// 	connector.connectorState.source = brain
	// }))
</script>

<main class="fill font-base">
	<Window
		title="{appConfig.type === 'prod' ? '' : `${appConfig.appName} v${appConfig.appVersion}`}"
		{openWebrainWindow}
		hideOrMinimizeInsteadClose={true}
		>
        <div class="fill flex flex--vertical">
        	<div class="nav flex__item--fit scroll-horizontal scrollbar--collapsed">
				<nav class="nav__content scroll__content">
					<ul class="nav__list">
						<li>
							<a class="nav__item {segment === 'parser' ? 'nav__item--selected' : ''}" href="main/tailwind">
								<span class="text">Tailwind</span>
							</a>
						</li>
					</ul>
				</nav>
			</div>
        	<div class="flex__item--fill scroll-vertical">
				<slot></slot>
			</div>
		</div>
	</Window>
</main>

<style-js>
	import templates from '../../styles/helpers/templates';
	import colors from '../../styles/app/templates/colors';
	import fonts from '../../styles/app/templates/fonts';
	import buttons from '../../styles/global/templates/buttons';
	import constants from '../../styles/app/templates/constants';
	import borders from '../../styles/app/templates/borders';

	module.exports = [
		require('../../styles/app'),
		{
			main: {
				'background-color': colors.base[7],
				'color': colors.base[16],
			},
			'.nav': {
				'font-size': `160%`,
				height: `2.2em`,
				'background-color': colors.base[10],
				...borders.base({
					bottom: true,
					color: colors.base[12],
				}),
				'&__list': {
					'list-style': `none`,
					padding: constants.space.half,
				},
				'&__item': {
					padding: constants.space.half,
					'&--selected': {
						'font-weight': `600`,
						'&::after': {
							...templates.fill,
							content: `''`,
							...borders.base({
								bottom: true,
								width: `3px`,
								color: colors.base[14],
							}),
							'pointer-events': `none`,
						}
					},
				},
			},
		},
	]
</style-js>
