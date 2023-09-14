import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import ignore from 'rollup-plugin-ignore'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'build/index.js',
        format: 'cjs',
      },
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      ignore(['fs', 'net', 'react', 'react-dom', 'prop-types', 'PropTypes']),
      postcss(),
      terser(),
    ],
    external: ['react', 'react-dom', '@react-three/drei', '@react-three/fiber', '@react-three/rapier', 'three'],
  },
]
