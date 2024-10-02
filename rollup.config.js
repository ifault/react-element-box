import typescript from '@rollup/plugin-typescript'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'
const packageJson = require('./package.json')

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
            },
            {
                file: packageJson.module,
                format: 'esm',
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            terser(),
            postcss(),
            copy({
                targets: [
                    { src: 'public/*', dest: 'dist/public' }, // Copy all files from src/assets to dist/assets
                ],
            }),
        ],
        external: ['react', 'react-dom'],
    },
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.types,
            },
        ],
        plugins: [dts.default()],
        external: [/\.css/],
    },
]
