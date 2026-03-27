<script lang="ts">
	import { Swatch } from '$lib/components/swatch';
	import { Input } from '$lib/components/input';
	import {
		PageHeader,
		Breadcrumb,
		Section,
		Installation,
		PageNavigation,
		DemoExample,
		Props,
		CodeBlock,
		DocCallout
	} from '$docs/components';

	let colorValue = $state('oklch(0.65 0.18 253)');
</script>

<svelte:head>
	<title>Swatch - Svelte Atoms</title>
	<meta name="description" content="Color swatch with checkerboard background for transparent colors." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Swatch' }]} />

	<PageHeader
		title="Swatch"
		description="Displays a color value as a small preview square. Shows a checkerboard pattern for transparent or empty colors."
		status="stable"
	/>

	<Section.Root>
		<Section.Header>
			<Section.Title>Installation</Section.Title>
		</Section.Header>
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Swatch &#125; from '@svelte-atoms/core/swatch';"
		/>

		<DocCallout variant="info" title="Used inside Input.ColorControl">
			<a href="/docs/components/input" class="text-foreground underline underline-offset-4 hover:no-underline">Input.ColorSwatch</a> is a bond-connected wrapper around this standalone <code class="bg-muted rounded px-1.5 py-0.5 text-xs">Swatch</code>.
			When placed inside <code class="bg-muted rounded px-1.5 py-0.5 text-xs">Input.Root</code> next to
			<code class="bg-muted rounded px-1.5 py-0.5 text-xs">Input.ColorControl</code>, it reads the current color from the bond automatically — no <code class="bg-muted rounded px-1.5 py-0.5 text-xs">color</code> prop needed.
		</DocCallout>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
		</Section.Header>
		<div class="space-y-8">

			<DemoExample
				title="Basic"
				description="Pass any valid CSS color string."
				code={`<Swatch color="oklch(0.65 0.18 253)" class="h-6 w-6 rounded" />\n<Swatch color="#e11d48" class="h-6 w-6 rounded" />\n<Swatch color="hsl(142 71% 45%)" class="h-6 w-6 rounded" />`}
			>
				<div class="flex items-center gap-3">
					<Swatch color="oklch(0.65 0.18 253)" class="h-6 w-6 rounded" />
					<Swatch color="#e11d48" class="h-6 w-6 rounded" />
					<Swatch color="hsl(142 71% 45%)" class="h-6 w-6 rounded" />
					<Swatch color="oklch(0.8 0.15 55)" class="h-6 w-6 rounded" />
					<Swatch color="oklch(0.6 0.2 300)" class="h-6 w-6 rounded" />
				</div>
			</DemoExample>

			<DemoExample
				title="Transparent & Empty"
				description="Checkerboard pattern shows when color is transparent or empty."
				code={`<Swatch color="transparent" class="h-6 w-6 rounded" />\n<Swatch color="rgba(99, 102, 241, 0.3)" class="h-6 w-6 rounded" />\n<Swatch color="" class="h-6 w-6 rounded" />`}
			>
				<div class="flex items-center gap-3">
					<Swatch color="transparent" class="h-6 w-6 rounded" />
					<Swatch color="rgba(99, 102, 241, 0.3)" class="h-6 w-6 rounded" />
					<Swatch color="oklch(0.65 0.18 253 / 0.4)" class="h-6 w-6 rounded" />
					<Swatch color="" class="h-6 w-6 rounded" />
				</div>
			</DemoExample>

			<DemoExample
				title="Sizes"
				description="Control size via Tailwind classes."
				code={`<Swatch color="oklch(0.65 0.18 253)" class="h-4 w-4 rounded-sm" />\n<Swatch color="oklch(0.65 0.18 253)" class="h-6 w-6 rounded" />\n<Swatch color="oklch(0.65 0.18 253)" class="h-8 w-8 rounded-md" />\n<Swatch color="oklch(0.65 0.18 253)" class="h-10 w-10 rounded-lg" />`}
			>
				<div class="flex items-end gap-3">
					<Swatch color="oklch(0.65 0.18 253)" class="h-4 w-4 rounded-sm" />
					<Swatch color="oklch(0.65 0.18 253)" class="h-6 w-6 rounded" />
					<Swatch color="oklch(0.65 0.18 253)" class="h-8 w-8 rounded-md" />
					<Swatch color="oklch(0.65 0.18 253)" class="h-10 w-10 rounded-lg" />
				</div>
			</DemoExample>

			<DemoExample
				title="Radius"
				description="Any border-radius works — square, rounded, or circle."
				code={`<Swatch color="#6366f1" class="h-8 w-8 rounded-none" />\n<Swatch color="#6366f1" class="h-8 w-8 rounded-md" />\n<Swatch color="#6366f1" class="h-8 w-8 rounded-full" />`}
			>
				<div class="flex items-center gap-3">
					<Swatch color="#6366f1" class="h-8 w-8 rounded-none" />
					<Swatch color="#6366f1" class="h-8 w-8 rounded-md" />
					<Swatch color="#6366f1" class="h-8 w-8 rounded-full" />
				</div>
			</DemoExample>

		</div>
	</Section.Root>

	<Section.Root>
		<DemoExample
			title="With ColorControl"
			description="Input.ColorSwatch sits inside Input.Root and reads the color value from the bond — no prop needed."
			code={`<script>
  import { Input } from '@svelte-atoms/core/input';
  let color = $state('oklch(0.65 0.18 253)');
<\/script>

<Input.Root>
  <Input.ColorSwatch />
  <Input.ColorControl bind:value={color} />
</Input.Root>`}
		>
			<Input.Root class="w-fit gap-2 px-2">
				<Input.ColorSwatch />
				<Input.ColorControl bind:value={colorValue} />
			</Input.Root>
		</DemoExample>

		<p class="text-muted-foreground mt-4 text-sm">
			Use this standalone component when you need a color preview outside of an Input — for example in a palette, a settings panel, or a custom picker.
			For use inside a color input, see <a href="/docs/components/input" class="text-foreground underline underline-offset-4 hover:no-underline"><code class="bg-muted rounded px-1.5 py-0.5 text-xs">Input.ColorSwatch</code></a>.
		</p>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<Props
			data={[
				{
					name: 'color',
					type: 'string',
					default: "''",
					description: 'Any valid CSS color string. Empty string or missing value shows the checkerboard only.'
				},
				{
					name: 'class',
					type: 'string',
					default: "''",
					description: 'CSS classes for sizing, border-radius, and additional styles. Size and radius are not set by default.'
				}
			]}
		/>
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Input', href: '/docs/components/input' }}
		next={{ label: 'Label', href: '/docs/components/label' }}
	/>
</div>
