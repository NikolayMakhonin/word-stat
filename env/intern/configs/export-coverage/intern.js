import {staticPort, appConfigType} from '../constants'

export default {
	coverage: [`dist/${appConfigType}/components/**/*.js`],

	reporters: [
		{
			name   : 'jsoncoverage',
			options: {
				directory: `tmp/${appConfigType}/coverage/intern/json`,
			},
		},
		{
			name   : 'htmlcoverage',
			options: {
				directory: `tmp/${appConfigType}/coverage/intern/html`,
			},
		},
		'runner',
	],

	plugins: [
		'env/intern/register-intern.js',
		// {
		// 	script : 'env/intern/modules/intern-express/index.js',
		// 	options: {
		// 		servers: [
		// 			{
		// 				port : staticPort,
		// 				inits: [[baseUrl, path.join(`dist/${appConfigType}/sapper/export`, baseUrl)]],
		// 			},
		// 		],
		// 	},
		// },
	],
}
