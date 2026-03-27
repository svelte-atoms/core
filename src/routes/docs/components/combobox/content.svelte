<script lang="ts">
	import { Combobox } from '$lib/components/combobox';
	import { Input } from '$lib/components/input';
	import { Divider } from '$lib/components/divider';
	import { filterDropdownData } from '$lib/components/dropdown';
	import {
		DocPage,
		DocSection,
		DocExample,
		DocProps,
		DocOnly,
		DocInstallation,
		DocAccessibility,
		DocCode,
	} from '$docs/components';
	import { comboboxRootProps, comboboxSelectionsProps, comboboxSelectionProps, comboboxControlProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'combobox',
		title: 'Combobox',
		category: 'components',
		depth: 'intermediate',
		prerequisites: [],
		related: []
	};

	const options = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' }
	];

	const currencies = [
		{ value: 'usd', label: 'US Dollar' },
		{ value: 'eur', label: 'Euro' },
		{ value: 'gbp', label: 'British Pound' },
		{ value: 'jpy', label: 'Japanese Yen' }
	];

	let singleValue = $state<string | undefined>();
	let singleLabel = $state<string | undefined>();
	let multiValues = $state<string[]>([]);
	let multiLabels = $state<string[]>([]);
	let currencyValue = $state<string | undefined>();
	let currencyLabel = $state<string | undefined>();

	const filteredCurrencies = filterDropdownData(
		() => currencies,
		(query, item) => item.label.toLowerCase().includes(query.toLowerCase())
	);
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Collapsible', href: '/docs/components/collapsible' }}
	next={{ label: 'DataGrid', href: '/docs/components/datagrid' }}
	{frontmatter}
>
	<DocOnly for="markdown">
		**Type**: Compound Component

		## Use Cases

		{#each metadata.useCases as uc, i (i)}
		- **{uc.title}**: {uc.description}
		{/each}

		## Components

		{#each metadata.componentsSummary as comp, i (i)}
		- **{comp.name}**: {comp.description}
		{/each}
	</DocOnly>

	<DocSection title="Installation">
		<DocInstallation packageName={metadata.packageName} importCode={metadata.importCode} />
	</DocSection>

	<DocSection title="Preset Configuration" subtitle="Customize the combobox appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different combobox variations and use cases">
		<DocExample title="Single Selection" description="Combobox for selecting a single value" code={metadata.examples.basic}>
			<div class="w-64">
				<Combobox.Root bind:value={singleValue} bind:label={singleLabel}>
					<Combobox.Trigger base={Input.Root}>
						<Combobox.Control placeholder="Select an option..." />
					</Combobox.Trigger>
					<Combobox.Content>
						{#each options as option, i (i)}
							<Combobox.Item value={option.value}>{option.label}</Combobox.Item>
						{/each}
					</Combobox.Content>
				</Combobox.Root>
			</div>
		</DocExample>

		<DocExample title="Multiple Selection" description="Combobox supporting multiple selected values" code={metadata.examples.multiple}>
			<div class="w-64">
				<Combobox.Root bind:values={multiValues} bind:labels={multiLabels} multiple>
					<Combobox.Trigger base={Input.Root} class="flex h-auto min-h-10 flex-col items-start gap-2">
						<Combobox.Control placeholder="Select multiple options..." />
						<Combobox.Selections />
					</Combobox.Trigger>
					<Combobox.Content>
						{#each options as option, i (i)}
							<Combobox.Item value={option.value}>{option.label}</Combobox.Item>
						{/each}
					</Combobox.Content>
				</Combobox.Root>
			</div>
		</DocExample>

		<DocExample title="Searchable / Filtered" description="Combobox with real-time search filtering" code={metadata.examples.filter}>
			<div class="w-64">
				<Combobox.Root bind:value={currencyValue} bind:label={currencyLabel}>
					<Combobox.Trigger base={Input.Root}>
						<Input.Icon class="text-foreground/50">$</Input.Icon>
						<Divider vertical class="mx-1" />
						<Combobox.Control placeholder="Select a currency..." />
					</Combobox.Trigger>
					<Combobox.Content>
						<input
							bind:value={filteredCurrencies.query}
							class="border-border w-full border-b px-4 py-3 text-sm outline-none"
							placeholder="Type to filter..."
						/>
						{#each filteredCurrencies.current as item, i (i)}
							<Combobox.Item value={item.value}>{item.label}</Combobox.Item>
						{/each}
					</Combobox.Content>
				</Combobox.Root>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Combobox.Root

**Preset Key:** `combobox`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Combobox.Root

**Preset Key:** `combobox`</h3></DocOnly>
		<DocProps data={comboboxRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### Combobox.Control

**Preset Key:** `input.control`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Combobox.Control</h3></DocOnly>
		<DocProps data={comboboxControlProps} />

		<DocOnly for="markdown">
{newLine(2)}### Combobox.Selections

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Combobox.Selections</h3></DocOnly>
		<DocProps data={comboboxSelectionsProps} />

		<DocOnly for="markdown">
{newLine(2)}### Combobox.Selection (individual chip)

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Combobox.Selection</h3></DocOnly>
		<DocProps data={comboboxSelectionProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
