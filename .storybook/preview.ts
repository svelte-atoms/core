import type { Preview } from '@storybook/svelte';
import Theme from '../src/stories/Theme.svelte';
import './global.css';
import '../src/lib/components/root/root.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	},
	decorators: [
		(story) => ({
			Component: Theme,
			props: {
				story
			}
		})
	]
};

export default preview;
