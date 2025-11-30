<script lang="ts">
	import { Combobox } from '$lib/components/combobox';
	import {
		PageHeader,
		Breadcrumb,
		Section,
		Installation,
		AccessibilityInfo,
		PageNavigation,
		DemoExample,
		Props
	} from '$docs/components';

	let selected = $state<string[]>([]);
	let query = $state('');

	const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

	const basicCode = `<script lang="ts">
  import { Combobox } from '@svelte-atoms/core';

  let selected = $state<string[]>([]);
  let query = $state('');
<\/script>

<Combobox.Root bind:value={selected} bind:query>
  <Combobox.Trigger>
    <Combobox.Input placeholder="Select an option..." />
  </Combobox.Trigger>

  <Combobox.List>
    <Combobox.Item value="option1">Option 1</Combobox.Item>
    <Combobox.Item value="option2">Option 2</Combobox.Item>
    <Combobox.Item value="option3">Option 3</Combobox.Item>
  </Combobox.List>
</Combobox.Root>`;

	const multipleCode = `<Combobox.Root bind:value={selected} bind:query multiple>
  <Combobox.Trigger>
    <Combobox.Input placeholder="Select multiple options..." />
  </Combobox.Trigger>

  <Combobox.List>
    <Combobox.Item value="option1">Option 1</Combobox.Item>
    <Combobox.Item value="option2">Option 2</Combobox.Item>
    <Combobox.Item value="option3">Option 3</Combobox.Item>
  </Combobox.List>
</Combobox.Root>`;
</script>

<svelte:head>
	<title>Combobox - Svelte Atoms</title>
	<meta
		name="description"
		content="Accessible combobox component with keyboard navigation and filtering."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Combobox' }]} />

	<PageHeader
		title="Combobox"
		description="Flexible and accessible combobox component with keyboard navigation support. Built on top of Dropdown and Popover modules."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Combobox &#125; from '@svelte-atoms/core/combobox';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the combobox appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Combobox components by defining presets in your configuration:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  combobox: () => ({
    class: 'relative w-full'
  }),
  'combobox.trigger': () => ({
    class: 'w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring'
  }),
  'combobox.input': () => ({
    class: 'w-full bg-transparent outline-none placeholder:text-muted-foreground'
  }),
  'combobox.list': () => ({
    class: 'absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover text-popover-foreground shadow-md'
  }),
  'combobox.item': () => ({
    class: 'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[selected=true]:bg-accent'
  })
});`}</code></pre>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different combobox variations and use cases">
		<div class="space-y-8">
			<DemoExample
				title="Basic Combobox"
				description="Simple combobox with single selection"
				code={basicCode}
			>
				<div class="max-w-sm">
					<Combobox.Root bind:value={selected} bind:query>
						<Combobox.Trigger>
							<Combobox.Input placeholder="Select an option..." />
						</Combobox.Trigger>

						<Combobox.List>
							{#each options as option}
								<Combobox.Item value={option}>{option}</Combobox.Item>
							{/each}
						</Combobox.List>
					</Combobox.Root>
				</div>
			</DemoExample>

			<DemoExample
				title="Multiple Selection"
				description="Combobox with multiple selection support"
				code={multipleCode}
			>
				<div class="max-w-sm">
					<Combobox.Root bind:value={selected} bind:query multiple>
						<Combobox.Trigger>
							<Combobox.Input placeholder="Select multiple options..." />
						</Combobox.Trigger>

						<Combobox.List>
							{#each options as option}
								<Combobox.Item value={option}>{option}</Combobox.Item>
							{/each}
						</Combobox.List>
					</Combobox.Root>
				</div>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Combobox.Root Props</h3>
				<Props
					data={[
						{
							name: 'value',
							type: 'string[]',
							default: '[]',
							description: 'Currently selected values'
						},
						{
							name: 'query',
							type: 'string',
							default: "''",
							description: 'Current search query'
						},
						{
							name: 'multiple',
							type: 'boolean',
							default: 'false',
							description: 'Enable multiple selection'
						},
						{
							name: 'disabled',
							type: 'boolean',
							default: 'false',
							description: 'Disable the combobox'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Combobox.Item Props</h3>
				<Props
					data={[
						{
							name: 'value',
							type: 'string',
							default: '-',
							description: 'Item value (required)'
						},
						{
							name: 'disabled',
							type: 'boolean',
							default: 'false',
							description: 'Disable this item'
						}
					]}
				/>
			</div>
		</div>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Full ARIA attributes support',
				'Keyboard navigation (Arrow keys, Escape, Enter)',
				'Screen reader announcements',
				'Focus management',
				'Proper role attributes (combobox, listbox, option)'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Collapsible', href: '/docs/components/collapsible' }}
		next={{ label: 'Context Menu', href: '/docs/components/contextmenu' }}
	/>
</div>
