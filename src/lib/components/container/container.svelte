<script lang="ts">
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { ContainerProps } from './types';

	let {
		class: klass = '',
		type = 'inline-size',
		name = undefined,
		clientWidth = $bindable(0),
		clientHeight = $bindable(0),
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		children = undefined,
		...restProps
	}: ContainerProps = $props();

	const containerTypeStype = $derived(type ? `container-type: ${type};` : '');
	const containerNameStyle = $derived(name ? `container-name: ${name};` : '');
</script>

<HtmlAtom
	{@attach (node) => {
		const updateSize = () => {
			clientWidth = node.clientWidth;
			clientHeight = node.clientHeight;
		};
		updateSize();

		const resizeObserver = new ResizeObserver(() => {
			updateSize();
		});
		resizeObserver.observe(node);

		return {
			destroy() {
				resizeObserver.disconnect();
			}
		};
	}}
	preset="container"
	class={['$preset', klass]}
	style={[containerTypeStype, containerNameStyle].filter(Boolean).join('; ')}
	onmount={onmount?.bind(null)}
	ondestroy={ondestroy?.bind(null)}
	animate={animate?.bind(null)}
	enter={enter?.bind(null)}
	exit={exit?.bind(null)}
	initial={initial?.bind(null)}
	{...restProps}
>
	{@render children?.({ clientWidth, clientHeight })}
</HtmlAtom>
