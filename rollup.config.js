import babel from 'rollup-plugin-babel';

export default {

	input: 'src/ecs.js',
	plugins: [ babel() ],
	output: [ {
		name: 'ECS',
		file: 'build/ecs.js',
		sourcemap: true,
		format: 'umd'
	}, {
		file: 'build/ecs.cjs.js',
		sourcemap: true,
		format: 'cjs'
	}
	]

};
