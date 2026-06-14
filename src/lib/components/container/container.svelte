<script lang="ts">
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { ContainerProps } from './types';

	let {
		class: klass = '',
		preset = undefined,
		type = 'inline-size',
		name = undefined,
		clientWidth = $bindable(0),
		clientHeight = $bindable(0),
		children = undefined,
		...restProps
	}: ContainerProps = $props();

	const containerTypeStype = $derived(type ? `container-type: ${type};` : '');
	const containerNameStyle = $derived(name ? `container-name: ${name};` : '');

	const containerProps = $derived({
		preset: preset ?? 'container',
		...restProps
	});
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
	class={['border-border', '$preset', klass]}
	style={[containerTypeStype, containerNameStyle].filter(Boolean).join('; ')}
	{...containerProps}
>
	{@render children?.({ clientWidth, clientHeight })}
</HtmlAtom>
