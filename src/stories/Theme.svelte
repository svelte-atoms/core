<script lang="ts">
	import { cn, colorScheme } from '$lib';
	import { setPreset, type Preset } from '$lib/context';

	let { children = undefined } = $props();

	const scheme = colorScheme();

	const preset: Partial<Preset> = {
		root: {
			class: 'flex flex-col items-center justify-center p-4'
		},
		accordion: {
			as: 'ul',
			class: 'w-full max-w-md rounded-md p-4 accordion-preset'
		},
		'accordion.item': {
			as: 'li',
			class: 'mb-2 last:mb-0 rounded-md border border-border bg-popover px-2 py-2'
		},
		'accordion.item.header': {
			class: function () {
				return [this.state.isActive ? 'text-foreground/100' : 'text-foreground/50'];
			}
		},
		'accordion.item.body': {
			class: 'overflow-hidden'
		},
		datagrid: {
			class: 'bg-card rounded-md gap-x-2 border border-border overflow-hidden'
		},
		'datagrid.header': {
			class: 'bg-background/25 py-2'
		},
		'datagrid.tr': {
			class: 'pr-2 pl-4'
		},
		collapsible: {
			class: 'max-w-md rounded-md border border-border'
		},
		'collapsible.header': {
			class: 'px-4 py-2 hover:bg-foreground/5 active:bg-foreground/10 flex cursor-pointer'
		},
		'collapsible.body': {
			class: 'text-sm px-4'
		},
		'popover.content': {
			class: ''
		}
	};
	setPreset(preset);
</script>

<div class={cn('contents', scheme.current)}>
	{@render children?.()}
</div>
