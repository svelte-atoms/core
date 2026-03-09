<script lang="ts">
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { ToastItem } from './manager.svelte';

	let { item }: { item: ToastItem } = $props();

	const typeClasses: Record<string, string> = {
		default: 'border-border bg-card text-foreground',
		info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100',
		success: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100',
		error: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100',
		warning: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100'
	};
</script>

<HtmlAtom
	as="li"
	{...item.bond.root()}
	preset="toast.item"
	class={[
		'pointer-events-auto flex w-80 max-w-sm flex-col gap-1 rounded-md border p-4 shadow-md transition-all duration-200',
		typeClasses[item.type] ?? typeClasses.default,
		!item.open && 'opacity-0 translate-y-2',
		'$preset'
	]}
	role="status"
	aria-live="polite"
>
	{#if item.title}
		<HtmlAtom
			as="p"
			{...item.bond.title()}
			preset="toast.title"
			class={['font-medium text-sm leading-tight', '$preset']}
		>
			{item.title}
		</HtmlAtom>
	{/if}

	{#if item.description}
		<HtmlAtom
			as="p"
			{...item.bond.description()}
			preset="toast.description"
			class={['text-sm opacity-80', '$preset']}
		>
			{item.description}
		</HtmlAtom>
	{/if}

	{#if item.dismissible}
		<button
			class="absolute top-2 right-2 rounded p-1 opacity-50 hover:opacity-100 transition-opacity"
			type="button"
			aria-label="Dismiss notification"
			onclick={() => item.bond.state.close()}
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		</button>
	{/if}
</HtmlAtom>
