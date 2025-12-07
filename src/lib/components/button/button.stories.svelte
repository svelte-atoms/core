<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ButtonCmp from './button.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Button',
		argTypes: {
			variant: {
				control: 'select',
				options: ['primary', 'secondary', 'destructive', 'outline', 'ghost'],
				description: 'Button variant style',
				table: {
					defaultValue: { summary: 'primary' }
				}
			}
		}
	});
</script>

<script lang="ts">
</script>

<Story name="Button">
	{#snippet template(args)}
		<ButtonCmp {...args}>Click me</ButtonCmp>
	{/snippet}
</Story>
