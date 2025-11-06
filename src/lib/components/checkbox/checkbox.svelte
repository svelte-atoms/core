<script lang="ts">
	import { circOut } from 'svelte/easing';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { scale } from 'svelte/transition';
	import { Icon } from '$svelte-atoms/core/components/icon';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import CheckmarkRegularIcon from '$svelte-atoms/core/icons/icon-checkmark.svelte';
	import { DURATION } from '$svelte-atoms/core/shared';
	import type { CheckboxProps } from './types';
	import './checkbox.css';

	let {
		class: klass = '',
		checked = $bindable(false),
		indeterminate = $bindable(false),
		value = $bindable(undefined),
		group = $bindable([]),
		id,
		name,
		checkedContent,
		indeterminateContent,
		enter,
		exit,
		initial,
		onchange,
		oninput,
		onblur,
		onfocus,
		onclick = undefined,
		...restProps
	}: CheckboxProps & Exclude<HTMLInputAttributes, 'type'> = $props();

	let checkboxElement: HTMLInputElement | undefined = $state();

	// Computed state for visual representation
	const isChecked = $derived(checked === true);
	const isIndeterminate = $derived(indeterminate === true);
	const showCheckmark = $derived(isChecked && !isIndeterminate);

	function handleChange(ev: Event) {
		onchange?.(ev, {
			checked: checked,
			value: checked,
			type: 'boolean'
		});
	}

	function handleInput(ev: Event) {
		oninput?.(ev, {
			checked: checked,
			value: checked,
			type: 'boolean'
		});
	}

	function handleClick(ev: MouseEvent) {
		onclick?.(ev);

		if (ev.defaultPrevented) {
			return;
		}

		// Handle indeterminate → checked → unchecked cycle
		if (indeterminate) {
			// Indeterminate → checked
			indeterminate = false;
			checked = true;
		} else {
			// Toggle checked state
			checked = !checked;
		}

		// Trigger input event manually if needed
		handleInput(ev);
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<HtmlAtom
	preset="checkbox"
	as="div"
	class={[
		'checkbox-root border-border outline-primary bg-input text-foreground aspect-square h-5 w-fit cursor-pointer rounded-sm border outline-0 outline-offset-2 transition-colors duration-100',
		isChecked && 'bg-foreground',
		'$preset',
		klass,
		'relative'
	]}
	role="checkbox"
	aria-checked={isIndeterminate ? 'mixed' : isChecked}
	{enter}
	{exit}
	{initial}
	onclick={handleClick}
	{...restProps}
>
	<input
		bind:this={checkboxElement}
		bind:checked
		bind:group
		bind:indeterminate
		type="checkbox"
		class="checkbox-input pointer-events-none"
		{value}
		{id}
		{name}
		onchange={handleChange}
		oninput={handleInput}
		{onblur}
		{onfocus}
		hidden
		tabindex="-1"
	/>

	{#if isIndeterminate}
		{#if indeterminateContent}
			<HtmlAtom
				preset="checkbox.indeterminate"
				class={[
					'checkbox-indeterminate pointer-events-none flex size-full items-center justify-center p-1'
				]}
				base={indeterminateContent}
			/>
		{:else}
			<HtmlAtom
				preset="checkbox.indeterminate"
				class={[
					'checkbox-indeterminate text-foreground pointer-events-none flex size-full items-center justify-center  p-1'
				]}
			>
				<div class={['size-full rounded-xs bg-current']}></div>
			</HtmlAtom>
		{/if}
	{:else if showCheckmark}
		{#if checkedContent}
			<HtmlAtom
				preset="checkbox.checkmark"
				class={[
					'checkbox-indicator text-accent pointer-events-none flex h-full content-center items-center justify-center overflow-hidden p-0.5'
				]}
				base={checkedContent}
			/>
		{:else}
			<HtmlAtom
				preset="checkbox.checkmark"
				class={[
					'checkbox-indicator text-accent pointer-events-none flex h-full content-center items-center justify-center overflow-hidden p-0.5'
				]}
				enter={(node) => scale(node, { duration: DURATION.fast, easing: circOut, start: 0.6 })}
				exit={(node) => scale(node, { duration: DURATION.fast, easing: circOut, start: 0.6 })}
			>
				<Icon class="h-full p-0" src={CheckmarkRegularIcon} />
			</HtmlAtom>
		{/if}
	{/if}
</HtmlAtom>
