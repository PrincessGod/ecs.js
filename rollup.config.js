import babel from 'rollup-plugin-babel';

export default {

    input: 'src/ecs.js',
    plugins: [ babel() ],
    output: {
        name: 'ECS',
        file: 'build/ecs.js',
        format: 'umd'
    },

}
