const {run} = require('./helpers/helpers')
const [script] = process.argv.slice(2)

run(
	`node -e "${script.replace(/"/g, '""')}"`,
	{
		notAutoKill: true,
		stdio      : 'inherit',
	},
)
