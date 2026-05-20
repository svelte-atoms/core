<script lang="ts">
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { ContainerProps } from './types';

	let {
		class: klass = '',
		type = 'inline-size',
		name = undefined,
		clientWidth = $bindable(0),
		clientHeight = $bindable(0),
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
	class={['border-border', '$preset', klass]}
	style={[containerTypeStype, containerNameStyle].filter(Boolean).join('; ')}
	{...restProps}
>
	{@render children?.({ clientWidth, clientHeight })}
</HtmlAtom>
