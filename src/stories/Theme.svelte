<script lang="ts">
	import { cn, colorScheme, defineProperty, defineState } from '$lib';
	import { setPreset, type Preset } from '$lib/context';

	let { children = undefined } = $props();

	const scheme = colorScheme();

	const preset: Partial<Preset> = {
		root: () => ({
			class: 'flex flex-col p-4'
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
			class: '',
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
		}),

		alert: () => ({
			class: 'relative gap-1 rounded-md border p-4 transition-all duration-200',
			variants: {
				variant: {
					info: {
						class:
							'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-100'
					},
					success: {
						class:
							'bg-green-50 border-green-200 text-green-900 dark:bg-green-950/50 dark:border-green-800 dark:text-green-100'
					},
					warning: {
						class:
							'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950/50 dark:border-yellow-800 dark:text-yellow-100'
					},
					error: {
						class:
							'bg-red-50 border-red-200 text-red-900 dark:bg-red-950/50 dark:border-red-800 dark:text-red-100'
					}
				}
			},
			defaults: {
				variant: 'info'
			}
		}),
		'alert.icon': () => ({
			class: 'inline-flex aspect-square size-4 shrink-0 items-center justify-center'
		}),
		'alert.content': () => ({
			class: 'flex-1 space-y-1'
		}),
		'alert.title': () => ({
			class: 'text-md font-semibold leading-tight'
		}),
		'alert.description': () => ({
			class: 'text-sm leading-relaxed opacity-90'
		}),
		'alert.actions': () => ({
			class: 'mt-3 flex items-center gap-2'
		}),
		'alert.close-button': () => ({
			class:
				'rounded-md p-0.5 size-6 opacity-70 transition-all hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-1'
		})
	};

	setPreset(preset);
</script>

<div class={cn('contents', scheme.current)}>
	{@render children?.()}
</div>
