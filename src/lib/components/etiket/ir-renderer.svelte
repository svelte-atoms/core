<script lang="ts">
	import type {
		RootNode,
		RenderNode,
		DefNode,
		FillValue,
		GradientRef,
		TransformValue,
		TransformOp,
		RectNode,
		PathNode,
		CircleNode,
		TextNode,
		GroupNode,
		ImageNode,
		EmbeddedSVGNode
	} from 'etiket/ir';

	let { tree }: { tree: RootNode } = $props();

	function isGradientRef(fill: FillValue): fill is GradientRef {
		return typeof fill === 'object' && fill !== null && 'ref' in fill;
	}

	function resolveFill(fill?: FillValue): string | undefined {
		if (!fill) return undefined;
		if (isGradientRef(fill)) return `url(#${fill.ref})`;
		return fill;
	}

	function toTransform(transform: TransformValue): string {
		const ops: TransformOp[] = Array.isArray(transform) ? transform : [transform];
		return ops
			.map((op) => {
				if (op.type === 'rotate') return `rotate(${op.angle},${op.cx},${op.cy})`;
				if (op.type === 'translate') return `translate(${op.x},${op.y})`;
				if (op.type === 'scale')
					return op.sy !== undefined ? `scale(${op.sx},${op.sy})` : `scale(${op.sx})`;
				return '';
			})
			.join(' ');
	}
</script>

{#snippet renderDef(def: DefNode)}
	{#if def.type === 'linear-gradient'}
		<linearGradient
			id={def.id}
			x1="{def.x1}%"
			y1="{def.y1}%"
			x2="{def.x2}%"
			y2="{def.y2}%"
		>
			{#each def.stops as stop, i (i)}
				<stop offset="{stop.offset * 100}%" stop-color={stop.color} />
			{/each}
		</linearGradient>
	{:else if def.type === 'radial-gradient'}
		<radialGradient id={def.id} cx="{def.cx}%" cy="{def.cy}%" r="{def.r}%">
			{#each def.stops as stop, i (i)}
				<stop offset="{stop.offset * 100}%" stop-color={stop.color} />
			{/each}
		</radialGradient>
	{:else if def.type === 'clip-path'}
		<clipPath id={def.id}>
			{#each def.children as child, i (i)}
				{@render renderNode(child)}
			{/each}
		</clipPath>
	{/if}
{/snippet}

{#snippet renderNode(node: RenderNode)}
	{#if node.type === 'rect'}
		{@render rectNode(node)}
	{:else if node.type === 'path'}
		{@render pathNode(node)}
	{:else if node.type === 'circle'}
		{@render circleNode(node)}
	{:else if node.type === 'text'}
		{@render textNode(node)}
	{:else if node.type === 'group'}
		{@render groupNode(node)}
	{:else if node.type === 'image'}
		{@render imageNode(node)}
	{:else if node.type === 'embedded-svg'}
		{@render embeddedSvgNode(node)}
	{/if}
{/snippet}

{#snippet rectNode(node: RectNode)}
	<rect
		x={node.x}
		y={node.y}
		width={node.width}
		height={node.height}
		rx={node.rx}
		fill={resolveFill(node.fill)}
	/>
{/snippet}

{#snippet pathNode(node: PathNode)}
	<path d={node.d} fill={resolveFill(node.fill)} fill-rule={node.fillRule} />
{/snippet}

{#snippet circleNode(node: CircleNode)}
	<circle
		cx={node.cx}
		cy={node.cy}
		r={node.r}
		fill={resolveFill(node.fill)}
		stroke={node.stroke}
		stroke-width={node.strokeWidth}
	/>
{/snippet}

{#snippet textNode(node: TextNode)}
	<text
		x={node.x}
		y={node.y}
		text-anchor={node.anchor}
		font-family={node.fontFamily}
		font-size={node.fontSize}
		fill={resolveFill(node.fill)}
	>{node.content}</text>
{/snippet}

{#snippet groupNode(node: GroupNode)}
	<g
		transform={node.transform ? toTransform(node.transform) : undefined}
		clip-path={node.clipPath ? `url(#${node.clipPath})` : undefined}
	>
		{#each node.children as child, i (i)}
			{@render renderNode(child)}
		{/each}
	</g>
{/snippet}

{#snippet imageNode(node: ImageNode)}
	<image href={node.href} x={node.x} y={node.y} width={node.width} height={node.height} />
{/snippet}

{#snippet embeddedSvgNode(node: EmbeddedSVGNode)}
	<svg x={node.x} y={node.y} width={node.width} height={node.height} viewBox={node.viewBox}>
		{@html node.content}
	</svg>
{/snippet}

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="{tree.viewBox.x} {tree.viewBox.y} {tree.viewBox.width} {tree.viewBox.height}"
	width={tree.unit ? `${tree.width}${tree.unit}` : tree.width}
	height={tree.unit ? `${tree.height}${tree.unit}` : tree.height}
	role={tree.accessibility?.role}
	aria-label={tree.accessibility?.ariaLabel}
>
	{#if tree.accessibility?.title}
		<title>{tree.accessibility.title}</title>
	{/if}
	{#if tree.accessibility?.desc}
		<desc>{tree.accessibility.desc}</desc>
	{/if}
	{#if tree.defs?.length}
		<defs>
			{#each tree.defs as def (def.id)}
				{@render renderDef(def)}
			{/each}
		</defs>
	{/if}
	{#each tree.children as child, i (i)}
		{@render renderNode(child)}
	{/each}
</svg>
