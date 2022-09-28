import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import preprocess from 'svelte-preprocess';
import sass from 'rollup-plugin-sass';
import css from 'rollup-plugin-css-only';
import html from '@rollup/plugin-html';

const production = !process.env.ROLLUP_WATCH

export default {
    input: 'src/main.ts',
    output: {
      sourcemap: true,
      name: 'app',
      file: 'dist/bundle.js',
      format: 'iife'
  },
  plugins: [
    resolve({ browser: true }),
    html({ html: { lang : 'en'}, meta: [ {charset: "UTF-8"}, {'http-equiv' : 'X-UA-Compatible', content: 'IE=edge'}, {name: 'viewport', content: 'width=device-width, initial-scale=1.0'}], link: './bundle.css', script: './bundle.js', title: `Test` }),
    commonjs(),
		typescript({ sourceMap: !production, inlineSources: !production }),
    sass(),
    css({ output: 'bundle.css' }),
    svelte({ preprocess: preprocess(), emitCss: true })],
};