<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { Divider } from '$svelte-atoms/core/components/divider';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import type { Base } from '$svelte-atoms/core/components/atom';

	let { class: klass = '', preset = undefined, vertical = false, children = undefined, ...restProps } = $props();

	const dividerProps = $derived({ preset: preset ?? 'list.divider', ...restProps });
</script>

<Divider
	class={[
		!vertical && 'my-1',
		vertical && 'mx-1',
		'$preset',
		toClassValue.apply(null, [klass, {}])
	]}
	{vertical}
	{...dividerProps}
/>
