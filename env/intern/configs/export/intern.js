import {staticPort, appConfigType, baseUrl} from '../constants'
import path from 'path'

export default {
	plugins: [
		'env/intern/register-intern.js',
		{
			script : 'env/intern/modules/intern-express/index.js',
			options: {
				servers: [
					{
						port : staticPort,
						inits: [[baseUrl, path.join(`dist/${appConfigType}/sapper/export`, baseUrl)]],
					},
				],
			},
		},
	],
}
