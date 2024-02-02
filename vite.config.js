import { defineConfig } from 'vite'

export default defineConfig({
	root : 'app',
	publicDir : '../public',
	build : {
		outDir : '../dist',
		emptyOutDir : true,
		assetsDir : 'res',
		assetsInlineLimit : 0,
		ssrEmitAssets : false,
		ssrManifest : false,
		sourcemap : false,
		minify : 'esbuild',
	},
	base: '/',
})