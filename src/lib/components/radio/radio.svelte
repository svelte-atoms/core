<script lang="ts" generics="B extends Base = Base">
	import { getRadioGroupContext } from './context';
	import { Stack } from '../stack';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	const radioGroupContext = getRadioGroupContext();

	let {
		class: klass = '',
		value = $bindable(undefined),
		group = $bindable(),
		id = undefined,
		name = undefined,
		disabled = false,
		required = false,
		readonly = false,
		onchange = undefined,
		oninput = undefined,
		checkedContent = undefined,
		...restProps
	} = $props();

	const _disabled = $derived(radioGroupContext?.disabled);
	const _required = $derived(radioGroupContext?.required);
	const _readonly = $derived(radioGroupContext?.readonly);
	const _name = $derived(radioGroupContext?.name);

	const proxy = {
		get current() {
			return radioGroupContext?.value ?? group;
		},
		set current(v) {
			group = v;
			if (radioGroupContext) {
				radioGroupContext.value = v;
			}
		}
	};

	const isDisabled = $derived(_disabled || disabled);
	const isRequired = $derived(_required || required);
	const isReadonly = $derived(_readonly || readonly);
	const isChecked = $derived(proxy.current === value);

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
</script>

<Stack.Root
	preset="radio"
	class={[
		'text-foreground box-border inline-flex aspect-square size-4 max-w-fit cursor-pointer place-items-center rounded-full border p-0',
		isDisabled && 'pointer-events-none opacity-50',
		'$preset',
		toClassValue.apply(null, [klass, {}])
	]}
	as="label"
	{...restProps}
>
	<Stack.Item class="pointer-events-none flex size-full">
		<input
			bind:group={proxy.current}
			{id}
			{value}
			class="pointer-events-auto size-0 opacity-0"
			type="radio"
			name={_name ?? name}
			disabled={isDisabled}
			required={isRequired}
			readonly={isReadonly}
			onchange={handleChange}
			oninput={handleInput}
		/>
	</Stack.Item>

	{#if isChecked}
		{#if checkedContent}
			<HtmlAtom
				class="rounded-inherit pointer-events-none size-1/2 bg-current"
				base={checkedContent}
			/>
		{:else}
			<Stack.Item class="rounded-inherit pointer-events-none size-1/2 bg-current"></Stack.Item>
		{/if}
	{/if}
</Stack.Root>
