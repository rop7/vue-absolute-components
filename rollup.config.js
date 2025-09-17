import vue from 'rollup-plugin-vue';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'core.js',
    output: [
        {
            file: 'dist/vue-absolute-components.cjs.js',
            format: 'cjs',
            exports: 'auto',
            sourcemap: true,
        },
        {
            file: 'dist/vue-absolute-components.esm.js',
            format: 'esm',
            sourcemap: true,
        },
        {
            file: 'dist/vue-absolute-components.umd.js',
            format: 'umd',
            name: 'VueAbsoluteComponents',
            sourcemap: true,
        },
    ],
    plugins: [
        resolve(),
        commonjs(),
        vue(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        }),
        terser(),
    ],
    external: ['vue'],
};