<svelte:head>
	<title>Status page</title>
</svelte:head>

<table>
	<tbody>
	<tr><td>UserAgent</td><td>{status ? status.userAgent : '-'}</td></tr>
	<tr><td>Time load HTML (ms)</td><td>{status && status.timing && status.timing.loadHtml ? Math.round(status.timing.loadHtml) : '-'}</td></tr>
	<tr><td>Time load DOM (ms)</td><td>{status && status.timing && status.timing.loadDom ? Math.round(status.timing.loadDom) : '-'}</td></tr>
	<tr><td>Time load Total (ms)</td><td>{status && status.timing && status.timing.loadTotal ? Math.round(status.timing.loadTotal) : '-'}</td></tr>
	<tr><td>Memory used</td><td>{status && status.memory ? status.memory.used : '-'}</td></tr>
	</tbody>
</table>

<h3>Resources:</h3>
<table>
	<thead>
		<tr><th>Time (ms)</th><th>Size</th><th>Initiator</th><th>Url</th></tr>
	</thead>
	<tbody>
	{#if status && status.resources}
		{#each status.resources as resource}
			<tr>
				<td>{resource.time ? Math.round(resource.time) : '-'}</td>
				<td>{resource.size || '-'}</td>
				<td>{resource.initiator || '-'}</td>
				<td>
					<a href="{resource.url || '-'}" target="_blank">
						{resource.url || '-'}
					</a>
				</td>
			</tr>
		{/each}
	{:else}
		-
	{/if}
	</tbody>
</table>

<script>
	import { onMount, onDestroy } from 'svelte'
	import browserDebug from '@flemist/browser-debug'

	let status = null
	let interval

	onMount(() => {
		status = browserDebug.getDebugInfo()
		interval = setInterval(() => {
			status = browserDebug.getDebugInfo()
		}, 1000)
	})

	onDestroy(() => {
		clearInterval(interval)
	})
</script>

<style type="text/css">
	table, td, th {
		border: 1px solid #ddd;
		text-align: left;
	}

	table {
		border-collapse: collapse;
		width: 100%;
	}

	th, td {
		padding: 5px;
	}

	tr > td:first-child {
		white-space: nowrap;
	}
</style>
