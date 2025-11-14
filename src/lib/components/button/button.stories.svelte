<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Root from '$svelte-atoms/core/components/root/root.svelte';
	import ButtonCmp from './button.svelte';
	import { defineVariants } from '$svelte-atoms/core/utils/variant';

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
	const variants = defineVariants((bond) => ({
		variants: {
			variant: {
				primary: {
					class: 'bg-primary text-primary-foreground hover:bg-primary/80 active:bg-primary/90'
				},
				secondary: {
					class:
						'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/90'
				},
				destructive: {
					class:
						'bg-destructive text-destructive-foreground hover:bg-destructive/80 active:bg-destructive/90'
				},
				outline: {
					class:
						'bg-transparent hover:bg-foreground/5 active:bg-foreground/10 border border-border text-foreground'
				},
				ghost: {
					class:
						'bg-transparent text-foreground hover:bg-foreground/5 active:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
				}
			}
		},
		compounds: [],
		defaults: {
			variant: 'destructive'
		}
	}));
</script>

<Story name="Button">
	{#snippet template(args)}
		<Root class="p-4">
			<ButtonCmp {variants} {...args}>Clicke me</ButtonCmp>
		</Root>
	{/snippet}
</Story>
