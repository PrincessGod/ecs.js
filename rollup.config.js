import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {

	input: 'src/ecs.js',
	plugins: [ babel() ],
	output: [ {
		name: 'ECS',
		file: pkg.browser,
		sourcemap: true,
		format: 'umd'
	}, {
		file: pkg.main,
		sourcemap: true,
		format: 'cjs'
	}, {
		file: pkg.module,
		sourcemap: true,
		format: 'es'
	} ]

};
