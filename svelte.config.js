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
			'@ixirjs/ui/attachments/*': 'src/lib/attachments/*',
			'@ixirjs/ui/components/*': 'src/lib/components/*',
			'@ixirjs/ui/context': 'src/lib/context',
			'@ixirjs/ui/context/*': 'src/lib/context/*',
			'@ixirjs/ui/shared': 'src/lib/shared',
			'@ixirjs/ui/shared/*': 'src/lib/shared/*',
			'@ixirjs/ui/types': 'src/lib/types',
			'@ixirjs/ui/types/*': 'src/lib/types/*',
			'@ixirjs/ui/utils': 'src/lib/utils',
			'@ixirjs/ui/utils/*': 'src/lib/utils/*',
			'@ixirjs/ui/*': 'src/lib/components/*'
		}
	},
	extensions: ['.svelte', '.svx'],
	vitePlugin: {
		inspector: {}
	}
};

export default config;
