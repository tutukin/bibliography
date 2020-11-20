import { readFileSync } from 'fs';
import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-node-polyfills';

const pluginSettings = getPackageJson()['obsidian-bibliography'];

export default {
  input: pluginSettings.input,
  output: {
    dir: pluginSettings.outputDir,
    sourcemap: 'inline',
    format: 'cjs',
    exports: 'default'
  },
  external: ['obsidian'],
  plugins: [
    nodePolyfills(),
    typescript(),
    nodeResolve({browser: true}),
    commonjs({
      include: 'node_modules/**',
    }),
    json(),
  ]/*,
  copy({
    targets: [
      { src: 'dist/main.js', dest: TEST_VAULT },
      { src: ['manifest.json', 'styles.css'], dest: TEST_VAULT }
    ], flatten: true
  })*/
};

function getPackageJson() {
  const content = readFileSync('package.json', 'utf8');
  return JSON.parse(content);
}
