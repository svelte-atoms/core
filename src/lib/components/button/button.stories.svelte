<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Root from '$svelte-atoms/core/components/root/root.svelte';
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
		<Root class="p-4">
			<ButtonCmp {...args}>Click me</ButtonCmp>
		</Root>
	{/snippet}
</Story>
