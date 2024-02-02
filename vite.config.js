import { defineConfig } from 'vite'

export default defineConfig({
	root : 'app',
	publicDir : '../public',
	build : {
		outDir : '../docs',
		emptyOutDir : true,
		assetsDir : 'res',
		assetsInlineLimit : 0, // 1024 * 300,
		ssrEmitAssets : false,
		ssrManifest : false,
		sourcemap : false,
		minify : 'esbuild',
	}
})