import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import glslify from 'rollup-plugin-glslify'
import { terser } from 'rollup-plugin-terser'

const extensions = ['.ts', '.tsx', '.json']

const getBabelOptions = ({ useESModules }) => ({
  babelrc: false,
  extensions,
  exclude: '**/node_modules/**',
  babelHelpers: 'runtime',
  presets: [
    [
      '@babel/preset-env',
      {
        include: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-proposal-nullish-coalescing-operator',
          '@babel/plugin-proposal-numeric-separator',
          '@babel/plugin-proposal-logical-assignment-operators',
        ],
        bugfixes: true,
        loose: true,
        modules: false,
        targets: '> 1%, not dead, not ie 11, not op_mini all',
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    ['@babel/transform-runtime', { regenerator: false, useESModules }],
  ],
})

export default [
  {
    input: './packages/index.ts',
    output: { file: 'build/index.cjs.js', format: 'cjs' },
    external: [
      'react',
      'react-dom',
      '@react-three/drei',
      '@react-three/fiber',
      '@react-three/rapier',
      'three',
      'three-stdlib',
    ],
    plugins: [json(), glslify(), babel(getBabelOptions({ useESModules: false })), resolve({ extensions }), terser()],
  },
]
