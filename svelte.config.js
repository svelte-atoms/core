import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), mdsvex()],
	kit: {
		adapter: adapter({
			split: false,
			edge: false
		}),
		alias: {
			$docs: 'src/docs',
			'$docs/*': 'src/docs/*',
			'$ixirjs/ui': 'src/lib',
			'$ixirjs/ui/*': 'src/lib/*',
			'@ixirjs/ui': 'src/lib',
			'@ixirjs/ui/preset': 'src/lib/preset',
			'@ixirjs/ui/shared': 'src/lib/public/shared.ts',
			'@ixirjs/ui/experimental': 'src/lib/public/experimental.ts',
			'@ixirjs/ui/utils': 'src/lib/public/utils.ts',
			'@ixirjs/ui/components/*': 'src/lib/public/components/*'
		}
	},
	extensions: ['.svelte', '.svx'],
	vitePlugin: {
		inspector: {}
	}
};

export default config;
