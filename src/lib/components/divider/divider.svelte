<script>
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';

	let {
		class: klass = '',
		as = 'div',
		vertical = false,
		transparent = false,
		...restProps
	} = $props();
</script>

<HtmlAtom
	{as}
	preset="divider"
	class={[
		'atoms-ui divider border-border',
		transparent && 'bg-transparent',
		!vertical && 'my-6 w-full border-b',
		vertical && 'mx-6 h-full border-r',
		klass,
		!vertical && 'mx-0',
		vertical && 'my-0',
		'$preset'
	]}
	{...restProps}
></HtmlAtom>
