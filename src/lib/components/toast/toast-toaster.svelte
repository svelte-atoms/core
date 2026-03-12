<script lang="ts">
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { toastManager, type ToastPosition } from './manager.svelte';
	import type { ToasterProps } from './types';
	import ToastRootManaged from './toast-root-managed.svelte';

	let {
		class: klass = '',
		position = 'bottom-right' as ToastPosition,
		gap = 8,
		...restProps
	}: ToasterProps = $props();

	const positionClasses: Record<ToastPosition, string> = {
		'top-left': 'top-0 left-0 items-start',
		'top-center': 'top-0 left-1/2 -translate-x-1/2 items-center',
		'top-right': 'top-0 right-0 items-end',
		'bottom-left': 'bottom-0 left-0 items-start',
		'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 items-center',
		'bottom-right': 'bottom-0 right-0 items-end'
	};
</script>

<HtmlAtom
	as="ol"
	class={[
		'pointer-events-none fixed z-50 flex flex-col p-4',
		positionClasses[position],
		'$preset',
		klass
	]}
	preset="toast.toaster"
	style={`gap: ${gap}px`}
	aria-label="Notifications"
	aria-live="polite"
	aria-atomic="false"
	{...restProps}
>
	{#each toastManager.toasts as item (item.id)}
		<ToastRootManaged {item} />
	{/each}
</HtmlAtom>
