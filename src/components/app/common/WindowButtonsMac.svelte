<script>
	import {createEventDispatcher} from 'svelte'
	import ToggleFullscreen from "../../common/ToggleFullscreen.svelte";

	const dispatch = createEventDispatcher()

	export let canMinimize = true
	export let canMaximize = true
	export let canRestore = true
	export let canFullscreen = true
	export let canClose = true
	export let canDev = false

	export let fullscreen = false

	function showDev() {
		dispatch('showDev')
	}

	function minimize() {
		dispatch('minimize')
	}

	function maximize() {
		dispatch('maximize')
	}

	function restore() {
		dispatch('restore')
	}

	function close() {
		dispatch('close')
	}
</script>

<div class="window-buttons flex__item--fit flex">
	<!-- href needed for sapper export -->
<!--	<a href="dev" class="window-buttons__button button-dev flex"-->
<!--		on:click|preventDefault="{showDev}"-->
<!--		class:collapsed="{!canDev}">-->
<!--		<span class="text">&lt;/&gt;</span>-->
<!--	</a>-->
	<button class="window-buttons__button button button-window-mac button-window-mac--close" on:click="{close}" class:collapsed="{!canClose}">
		<span class="icon icon-window-mac-close">&nbsp;</span>
	</button>
	<button class="window-buttons__button button button-window-mac button-window-mac--minimize" on:click="{minimize}" class:collapsed="{!canMinimize}">
		<span class="icon icon-window-mac-minimize">&nbsp;</span>
	</button>
	<button class="window-buttons__button button button-window-mac button-window-mac--plus" on:click="{maximize}" class:collapsed="{!canMaximize}">
		<span class="icon icon-window-mac-plus">&nbsp;</span>
	</button>
	<button class="window-buttons__button button button-window-mac button-window-mac--plus" on:click="{restore}" class:collapsed="{!canRestore}">
		<span class="icon icon-window-mac-plus">&nbsp;</span>
	</button>
	{#if canFullscreen}
		<ToggleFullscreen bind:checked={fullscreen} let:fullscreen={fullscreen} flex="{true}">
			<div
				class="window-buttons__button button button-window-mac button-window-mac--fullscreen-{fullscreen ? 'exit' : 'enter'}"
				title="{fullscreen ? 'Exit' : 'Enter'} full screen (F11)"
			>
				<span class="icon icon-window-mac-fullscreen-{fullscreen ? 'exit' : 'enter'}">&nbsp;</span>
			</div>
		</ToggleFullscreen>
	{/if}
</div>

<style-js>
	import templates from '../../../styles/helpers/templates';
	import buttons from '../../../styles/global/templates/buttons';
	import colors from '../../../styles/app/templates/colors';

	module.exports = [
		require('../../../styles/app'),
		{
			'.window-buttons': {
				'&__button': {
					'font-size': `50%`,
					'height': `1.5em`,
					'width' : `1.5em`,
					'margin-right': `1em`,
				},
			},
			'.button-dev': {
				'margin-right': `1em`,
			}
		}
	]
</style-js>