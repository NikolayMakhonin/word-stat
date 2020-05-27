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
	<a href="dev" class="window-buttons__button button-dev flex"
		on:click|preventDefault="{showDev}"
		class:collapsed="{!canDev}">
		<span class="text">&lt;/&gt;</span>
	</a>
	{#if canFullscreen}
		<ToggleFullscreen bind:checked={fullscreen} let:fullscreen={fullscreen}>
			<div class="window-buttons__button flex" title="{fullscreen ? 'Exit' : 'Enter'} full screen (F11)">
				<span class="window-buttons__button__icon ghost icon-inline icon-window-fullscreen-{fullscreen ? 'exit' : 'enter'}">&nbsp;</span>
			</div>
		</ToggleFullscreen>
	{/if}
	<button class="window-buttons__button flex" on:click="{minimize}" class:collapsed="{!canMinimize}">
		<span class="window-buttons__button__icon ghost icon-inline icon-window-minimize">&nbsp;</span>
	</button>
	<button class="window-buttons__button flex" on:click="{maximize}" class:collapsed="{!canMaximize}">
		<span class="window-buttons__button__icon ghost icon-inline icon-window-maximize">&nbsp;</span>
	</button>
	<button class="window-buttons__button flex" on:click="{restore}" class:collapsed="{!canRestore}">
		<span class="window-buttons__button__icon ghost icon-inline icon-window-restore">&nbsp;</span>
	</button>
	<button class="window-buttons__button flex" on:click="{close}" class:collapsed="{!canClose}">
		<span class="window-buttons__button__icon ghost icon-inline icon-window-close">&nbsp;</span>
	</button>
</div>

<style-js>
	import templates from '../../../styles/helpers/templates';
	import buttons from '../../../styles/global/templates/buttons';
	import colors from '../../../styles/app/templates/colors';

	const titleBarHeight = `1.5em`

	module.exports = [
		require('../../../styles/app'),
		{
			'.window-buttons': {
				'&__button': [
					buttons.withText({
						colorText: colors.base[14]
					}),
					{
						'height': titleBarHeight,
						'width': `auto`,
					}
				],
			},
			'.button-dev': {
				'margin-right': `1em`,
			}
		}
	]
</style-js>