<script lang="ts">
	import { setRadioGroupContext, type RadioGroupContext } from './context';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';

	let {
		class: klass = '',
		disabled = false,
		readonly = false,
		required = false,
		name = undefined,
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

<HtmlAtom preset="radio.group" class={['flex flex-col gap-1', '$preset', klass]} {...restProps}>
	{@render children?.()}
</HtmlAtom>
