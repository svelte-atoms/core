<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { Divider } from '$svelte-atoms/core/components/divider';
	import { getPreset } from '$svelte-atoms/core/context';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import type { Base } from '$svelte-atoms/core/components/atom';

	const preset = getPreset('list.divider');

	let {
		class: klass = '',
		as = preset?.as ?? 'div',
		vertical = false,
		children = undefined,
		...restProps
	} = $props();
</script>

<Divider
	class={[
		'list-divider',
		!vertical && 'my-1',
		vertical && 'mx-1',
		toClassValue.apply(null, [preset?.class, {}]),
		toClassValue.apply(null, [klass, {}])
	]}
	{as}
	{vertical}
	{...restProps}
/>
