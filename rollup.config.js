const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');

const extensions = ['.ts'];

module.exports = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
			extensions
		}),
		resolve({
			extensions,
			customResolveOptions: {
				moduleDirectory: 'src',
			}
		})
	],
};
