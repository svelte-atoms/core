<script lang="ts">
	import { setRadioGroupContext, type RadioGroupContext } from './context';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { defineProperty, defineState, toClassValue } from '$svelte-atoms/core/utils';

	const preset = getPreset('radio.group');

	let {
		class: klass = '',
		disabled = false,
		readonly = false,
		required = false,
		name = undefined,
		base = preset?.base as B,
		value = $bindable(),
		children,
		oninput = undefined,
		...restProps
	} = $props();

	const context = defineState<RadioGroupContext>([
		defineProperty('disabled', () => disabled ?? false),
		defineProperty('name', () => name),
		defineProperty('readonly', () => readonly ?? false),
		defineProperty('required', () => required ?? false),
		defineProperty(
			'value',
			() => value,
			(v) => (value = v)
		)
	]);

	setRadioGroupContext(context);

	$effect(() => {
		oninput?.(new CustomEvent('change'), {
			value
		});
	});
</script>

<HtmlAtom
	class={[
		'flex flex-col gap-1',
		toClassValue.apply(null, [preset?.class, {}]),
		toClassValue.apply(null, [klass, {}])
	]}
	{base}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
