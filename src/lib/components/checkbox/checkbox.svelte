<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { circOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import type { CheckboxProps } from './types';
	import { Icon } from '$svelte-atoms/core/components/icon';
	import { DURATION } from '$svelte-atoms/core/shared';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import CheckmarkRegularIcon from '$svelte-atoms/core/icons/icon-checkmark.svelte';
	import { getPreset } from '$svelte-atoms/core/context';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import './checkbox.css';

	const preset = getPreset('checkbox');
	const checkmarkPreset = getPreset('checkbox.checkmark');
	const indeterminatePreset = getPreset('checkbox.indeterminate');

	let {
		class: klass = '',
		checked = $bindable(false),
		indeterminate = $bindable(),
		value = $bindable(undefined),
		group = $bindable([]),
		base = preset?.base as B,
		id,
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

	function handleChange(ev: Event) {
		const checked = (ev.currentTarget as HTMLInputElement)?.checked ?? false;

		onchange?.(ev, {
			checked,
			value: checked,
			type: 'boolean'
		});
	}

	function handleInput(ev: Event) {
		const currentTarget = ev.currentTarget as HTMLInputElement;
		const _checked = currentTarget?.checked ?? false;

		oninput?.(ev, {
			checked: _checked,
			value: _checked,
			type: 'boolean'
		});

		if (ev.defaultPrevented) {
			return;
		}
	}

	function handleClick(ev: MouseEvent) {
		onclick?.(ev);

		if (ev.defaultPrevented) {
			return;
		}

		checkboxElement?.click();
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<HtmlAtom
	as="button"
	class={[
		'checkbox-root border-border outline-primary bg-foreground/5 aspect-square h-5 w-fit cursor-pointer rounded-sm border outline-0 outline-offset-2 transition-colors duration-100',
		checked && 'bg-foreground',
		!checked && '',
		toClassValue.apply(null, [preset?.class]),
		toClassValue.apply(null, [klass]),
		'relative'
	]}
	{enter}
	{exit}
	{initial}
	{base}
	onclick={handleClick}
	{...restProps}
>
	<input
		bind:checked
		bind:group
		bind:indeterminate
		type="checkbox"
		class="checkbox-input pointer-events-none"
		{value}
		{id}
		onchange={handleChange}
		oninput={handleInput}
		{onblur}
		{onfocus}
		hidden
		{@attach (node) => {
			checkboxElement = node;
		}}
	/>

	{#if indeterminate}
		{#if indeterminateContent}
			<HtmlAtom
				class={[
					'checkbox-indeterminate flex size-full items-center justify-center p-1',
					toClassValue.apply(null, [indeterminatePreset?.class])
				]}
				base={indeterminateContent}
			/>
		{:else}
			<div
				class={[
					'checkbox-indeterminate text-foreground flex size-full items-center justify-center p-1',
					toClassValue.apply(null, [indeterminatePreset?.class])
				]}
			>
				<div class={['size-full rounded-xs bg-current']}></div>
			</div>
		{/if}
	{:else if checked === true}
		{#if checkedContent}
			<HtmlAtom
				class={[
					'checkbox-indicator text-accent pointer-events-none flex h-full content-center items-center justify-center overflow-hidden p-0.5',
					toClassValue.apply(null, [checkmarkPreset?.class])
				]}
				base={checkedContent}
			/>
		{:else}
			<div
				class={[
					'checkbox-indicator text-accent pointer-events-none flex h-full content-center items-center justify-center overflow-hidden p-0.5',
					toClassValue.apply(null, [checkmarkPreset?.class])
				]}
				transition:scale={{ duration: DURATION.fast, easing: circOut, start: 0.6 }}
			>
				<Icon class="h-full p-0" src={CheckmarkRegularIcon} />
			</div>
		{/if}
	{/if}
</HtmlAtom>
