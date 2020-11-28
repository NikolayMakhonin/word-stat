<svelte:head>
	<title>Validate page</title>
</svelte:head>

<button on:click="{validate}">Validate all site resources</button>

<h3>Report:</h3>
<div class="report">
{#if loading}
    <div>...loading</div>
{:else if loadError}
    <div>{loadError}</div>
{:else}
    <div>{total} resources is OK.</div>
    {#if withErrors.length}
        <div>{withErrors.length} resources with errors.</div>
    {/if}
    {#each withErrors as resource}
        <div class="resource">
            <div class="header">
                From {resource.initiator}: <a href={resource.url} target="_blank">{resource.url}</a>
            </div>
            <div class="errors">
                {resource.error || JSON.stringify(resource.w3c, null, 4)}
            </div>
            <pre class="content">
                {#each resource.content.split('\n') as line}
                    <code>{line}</code><br/>
                {/each}
            </pre>
        </div>
    {/each}
{/if}
</div>

<script>
	import browserDebug from '@flemist/browser-debug'

	let total = 0
	let withErrors = ''
	let loading = false
	let loadError = ''

	async function validate() {
		if (loading) {
			return
		}

		try {
			loading = true
			loadError = null

			const filters = [
				/Bad value “prefetch” for attribute “rel”/,
				/Consider adding a “lang” attribute/,
				/overflow-clip-box|padding-block-end|padding-block-start|padding-inline-end|padding-inline-start/
			]

			const report = (await browserDebug.validateAll('\\.(css|html?|svg)([\?#]|$)'))
			withErrors = report.withErrors
				.map(resource => {
					if (resource.error) {
						return resource
					}

					if (!resource.w3c) {
						resource.error = 'report resource w3c field is empty null'
						return resource
					}

					resource.w3c.error = (resource.w3c.error || [])
						.filter(o => {
							if (o.message && filters.some(filter => o.message.match(filter))) {
								return false
							}

							return true
						})

					resource.w3c.warning = (resource.w3c.error || [])
						.filter(o => {
							if (o.message && filters.some(filter => o.message.match(filter))) {
								return false
							}

							return true
						})

					return resource
				})
				.filter(o => o.error || !o.w3c || (o.w3c.error && o.w3c.error.length || o.w3c.warning && o.w3c.warning.length))

			total = report.total
		} catch (ex) {
			loadError = ex.stack || ex.toString()
		} finally {
			loading = false
		}
	}
</script>

<style-js>
	import constants from '../../styles/helpers/constants';

    module.exports = [
        {
            '.header': {
                background: `#dddddd`,
                padding: `0.1em`,
            },
            '.errors': {
                'white-space': `pre-wrap`,
            },
            '.errors, .content': {
                'font-family': constants.fonts.monospace,
                height: `300px`,
                overflow: `scroll`,
                border: `solid 1px gray`,
            },
        },
        {
            '.errors': {
                'margin-bottom': `0.1em`,
            },
            pre: {
                'counter-reset': `thecodenumbering`,
            },
            code: {
                'counter-increment': `thecodenumbering`,
            },
            'code:before': {
                'padding-right': `5px`,
                content: `counter(thecodenumbering)`,
            },
        },
    ]
</style-js>
