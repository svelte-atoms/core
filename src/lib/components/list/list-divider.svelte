<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { Divider } from '$ixirjs/ui/components/divider';
	import { toClassValue } from '$ixirjs/ui/utils';
	import type { Base } from '$ixirjs/ui/components/atom';

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
