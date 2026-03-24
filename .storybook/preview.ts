import type { Preview } from '@storybook/svelte';
import StoryRoot from '../src/stories/StoryRoot.svelte';
import './global.css';
import '../src/app.css';

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
			Component: StoryRoot,
			props: {
				story
			}
		})
	]
};

export default preview;
