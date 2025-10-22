<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { Divider } from '$svelte-atoms/core/components/divider';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import type { Base } from '$svelte-atoms/core/components/atom';

	let { class: klass = '', vertical = false, children = undefined, ...restProps } = $props();
</script>

<Divider
	preset="list.divider"
	class={[
		!vertical && 'my-1',
		vertical && 'mx-1',
		'$preset',
		toClassValue.apply(null, [klass, {}])
	]}
	{vertical}
	{...restProps}
/>
