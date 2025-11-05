<script lang="ts">
	import { cn, colorScheme, defineProperty, defineState } from '$lib';
	import { setPreset, type Preset } from '$lib/context';

	let { children = undefined } = $props();

	const scheme = colorScheme();

	const preset: Partial<Preset> = {
		root: () => ({
			class: 'flex flex-col items-center justify-center p-4'
		}),
		accordion: () => ({
			as: 'ul',
			class: 'w-full max-w-md rounded-md p-4 accordion-preset'
		}),
		'accordion.item': () => ({
			as: 'li',
			class: 'mb-2 last:mb-0 rounded-md border border-border bg-popover px-2 py-2'
		}),
		'accordion.item.header': (bond) => {
			return defineState([
				defineProperty('class', () => [
					bond?.state?.isActive ? 'text-foreground/100' : 'text-foreground/50'
				])
			]);
		},
		'accordion.item.body': () => ({
			class: 'overflow-hidden'
		}),
		button: () => ({
			variants: {
				variant: {
					primary: {
						class: 'bg-primary text-primary-foreground hover:bg-primary/80'
					},
					secondary: {
						class: 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
					},
					destructive: {
						class: 'bg-destructive text-destructive-foreground hover:bg-destructive/80'
					},
					outline: {
						class:
							'bg-transparent hover:bg-foreground/5 active:bg-foreground/10 border border-border text-foreground'
					},
					ghost: {
						class: 'hover:bg-accent hover:text-accent-foreground'
					}
				}
			},
			defaults: {
				variant: 'primary'
			}
		}),
		datagrid: () => ({
			class: 'bg-card rounded-md gap-x-2 border border-border overflow-hidden'
		}),
		'datagrid.header': () => ({
			class: 'bg-background/25 py-2'
		}),
		'datagrid.tr': () => ({
			class: 'pr-2 pl-4'
		}),
		collapsible: () => ({
			class: 'max-w-md rounded-md border border-border p-2'
		}),
		'collapsible.header': () => ({
			class: 'px-2 py-2 hover:bg-foreground/5 active:bg-foreground/10 flex cursor-pointer rounded'
		}),
		'collapsible.body': () => ({
			class: 'text-sm px-2'
		}),
		'popover.content': () => ({
			class: ''
		})
	};

	setPreset(preset);
</script>

<div class={cn('contents', scheme.current)}>
	{@render children?.()}
</div>
