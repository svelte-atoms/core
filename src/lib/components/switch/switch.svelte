<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { SwitchProps } from './types';

	let {
		class: klass = '',
		checked = $bindable(false),
		disabled = false,
		id,
		name,
		value,
		preset = 'switch',
		onclick = undefined,
		onchange = undefined,
		children = undefined,
		...restProps
	}: SwitchProps & HTMLAttributes<HTMLButtonElement> = $props();

	function handleClick(ev: MouseEvent) {
		if (disabled) return;

		onclick?.(ev);

		if (ev.defaultPrevented) return;

		checked = !checked;
		onchange?.(ev, { checked });
	}
</script>

<HtmlAtom
	{preset}
	as="button"
	type="button"
	class={[
		'switch-root border-border bg-input outline-primary relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border transition-colors duration-200 outline-0 outline-offset-2',
		checked && 'bg-foreground',
		disabled && 'cursor-not-allowed opacity-50',
		'$preset',
		klass
	]}
	role="switch"
	aria-checked={checked}
	aria-disabled={disabled || undefined}
	onclick={handleClick}
	{...restProps}
>
	<input
		{id}
		{name}
		{value}
		{disabled}
		type="checkbox"
		bind:checked
		hidden
		tabindex="-1"
		class="pointer-events-none"
		aria-hidden="true"
	/>

	<!-- Thumb -->
	<HtmlAtom
		preset="switch.thumb"
		as="span"
		class={[
			'switch-thumb bg-background pointer-events-none block h-4 w-4 rounded-full shadow-sm transition-transform duration-200',
			checked ? 'translate-x-6' : 'translate-x-1',
			'$preset'
		]}
	/>
</HtmlAtom>

{#if children}
	{@render children()}
{/if}
