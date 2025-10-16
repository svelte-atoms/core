<script>
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';
	import { toClassValue } from '$svelte-atoms/core/utils';

	const preset = getPreset('divider');

	let {
		class: klass = '',
		as = preset?.as ?? 'div',
		vertical = false,
		transparent = false,
		...restProps
	} = $props();
</script>

<HtmlAtom
	{as}
	class={[
		'atoms-ui divider border-border',
		transparent && 'bg-transparent',
		!vertical && 'my-6 w-full border-b',
		vertical && 'mx-6 h-full border-r',
		toClassValue.apply(null, [preset?.class]),
		toClassValue.apply(null, [klass]),
		!vertical && 'mx-0',
		vertical && 'my-0'
	]}
	{...restProps}
></HtmlAtom>
