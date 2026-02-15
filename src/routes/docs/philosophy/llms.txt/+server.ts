import { codeBlock, content, list } from '$docs/md/utils';
import { metadata } from '../shared';

export function GET() {
	return new Response(build(), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
}

function build(): string {
	return content(`---
id: philosophy
title: Design Philosophy
category: getting-started
depth: beginner
related:
  - atoms
  - bonds
  - crafting
---


# ${metadata.pageTitle}

${metadata.pageDescription}

## Core Principles

Svelte Atoms is built on three fundamental principles that guide every design decision:

${metadata.corePrinciples.map((principle) => `### ${principle.title}\n\n${principle.description}\n\n**Benefits:**\n${list(principle.benefits)}`).join('\n\n')}

## Bond Architecture

${metadata.bondArchitecture.description}

### What is a Bond?

${metadata.bondArchitecture.whatIsBond}

**Example:**

${codeBlock(`// Creating a Bond
const accordion = createAccordionBond({
  multiple: false,
  defaultValue: 'item-1'
});

// Using the Bond
<Accordion bond={accordion}>
  <AccordionItem value="item-1">...</AccordionItem>
  <AccordionItem value="item-2">...</AccordionItem>
</Accordion>`, 'typescript')}

### Bond Features

${metadata.bondArchitecture.features.map((feature) => `#### ${feature.title}\n\n${feature.description}`).join('\n\n')}

## Why Svelte 5?

Svelte 5's Runes API enables patterns that weren't possible before:

${metadata.whySvelte5.map((item) => `### ${item.feature}\n\n${item.description}\n\n**Impact:** ${item.impact}`).join('\n\n')}

## Customization Philosophy

${metadata.customizationPhilosophy.description}

${metadata.customizationPhilosophy.approaches.map((approach) => `### ${approach.title}\n\n${approach.description}`).join('\n\n')}

## Design Goals

What we optimize for when building Svelte Atoms:

${metadata.designGoals.map((goal) => `### ${goal.goal} (Priority: ${goal.priority})\n\n${goal.description}`).join('\n\n')}

## What We're Not

It's important to understand what Svelte Atoms is NOT trying to be:

${metadata.whatWeAreNot.map((item) => `### ${item.title}\n\n${item.description}`).join('\n\n')}

## Philosophy in Practice

### Composition Example

Instead of a monolithic component with 50 props:

${codeBlock(`<!-- Other libraries -->
<DataTable
  data={data}
  columns={columns}
  sortable
  filterable
  pagination
  pageSize={10}
  onSort={handleSort}
  onFilter={handleFilter}
  renderHeader={CustomHeader}
  renderRow={CustomRow}
  /* 40 more props... */
/>`, 'svelte')}

Svelte Atoms uses composition:

${codeBlock(`<!-- Svelte Atoms -->
<DataGrid.Root>
  <DataGrid.Header>
    {#each columns as column}
      <DataGrid.HeaderCell sortable>
        {column.label}
      </DataGrid.HeaderCell>
    {/each}
  </DataGrid.Header>
  
  <DataGrid.Body>
    {#each data as row}
      <DataGrid.Row>
        {#each columns as column}
          <DataGrid.Cell>
            {row[column.key]}
          </DataGrid.Cell>
        {/each}
      </DataGrid.Row>
    {/each}
  </DataGrid.Body>
</DataGrid.Root>`, 'svelte')}

### Styling Example

Full control over styling at every level:

${codeBlock(`<!-- Global preset -->
<script>
  setPreset({
    button: () => ({
      class: 'rounded-md font-semibold transition-colors'
    })
  });
</script>

<!-- Component props -->
<Button 
  variant="primary" 
  size="lg"
  class="custom-override"
>
  Click me
</Button>

<!-- Result: preset + variant + size + custom classes merged intelligently -->`, 'svelte')}

### Bond Example

State management without prop drilling:

${codeBlock(`<!-- Root component creates and shares bond -->
<script>
  const tabsBond = createTabsBond({ value: 'tab1' });
</script>

<Tabs.Root bond={tabsBond}>
  <Tabs.Header>
    <!-- Tab accesses bond via context, no props needed -->
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
  </Tabs.Header>
  
  <Tabs.Panel value="tab1">
    <!-- Panel also accesses bond via context -->
    Content 1
  </Tabs.Panel>
</Tabs.Root>`, 'svelte')}

## Comparison with Other Approaches

### Traditional Component Libraries

**Pros:**
${list([
	'Fast to get started',
	'Pre-designed components',
	'Consistent look out of the box'
])}

**Cons:**
${list([
	'Limited customization',
	'Fighting default styles',
	'Vendor lock-in',
	'Large bundle sizes'
])}

### Headless UI Libraries

**Pros:**
${list([
	'Behavior without styling',
	'Good flexibility',
	'Accessible by default'
])}

**Cons:**
${list([
	'Still opinionated structure',
	'Limited composition',
	'Complex API for customization'
])}

### Svelte Atoms

**Pros:**
${list([
	'Maximum flexibility',
	'Composition-first',
	'Minimal abstractions',
	'Full control over everything',
	'Type-safe',
	'Optimized for Svelte 5'
])}

**Considerations:**
${list([
	'More initial setup for basic components',
	'Need to handle styling yourself',
	'Requires understanding of composition patterns'
])}

## Guiding Questions

When making design decisions, we ask:

${list([
	'**Does it enable or constrain?** - Prefer enabling building blocks over constraining configurations',
	'**Is it composable?** - Can it combine with other primitives to create new patterns?',
	'**Is it accessible by default?** - Does it handle ARIA, keyboard nav, and focus management automatically?',
	'**Is it type-safe?** - Does TypeScript provide helpful autocomplete and catch errors?',
	'**Is it performant?** - Does it leverage Svelte 5\'s reactivity optimally?',
	'**Is it understandable?** - Can developers debug and reason about the implementation?'
], true)}

## Future Direction

Svelte Atoms will continue to:

${list([
	'**Expand primitives**: Add more building blocks for common patterns',
	'**Improve DX**: Better error messages, debugging tools, and documentation',
	'**Enhance types**: More precise TypeScript types and better inference',
	'**Optimize performance**: Leverage new Svelte features for better performance',
	'**Maintain flexibility**: Never sacrifice flexibility for convenience'
])}

What we won't do:

${list([
	'Become opinionated about styling',
	'Add framework-specific dependencies',
	'Compromise accessibility',
	'Lock you into patterns',
	'Bloat the bundle size'
])}

## Learning Path

${list([
	'**Start with Atoms**: Understand the basic building blocks',
	'**Learn Composition**: Practice combining primitives',
	'**Master Bonds**: Understand state management patterns',
	'**Explore Presets**: Set up global theming',
	'**Build Real Components**: Apply knowledge to real projects',
	'**Contribute Back**: Share patterns and improvements'
], true)}

## Community Principles

${list([
	'**Transparency**: Open source, open development, open discussions',
	'**Inclusivity**: Welcome contributors of all skill levels',
	'**Quality**: Maintain high standards for code, docs, and accessibility',
	'**Pragmatism**: Balance idealism with practical needs',
	'**Education**: Help developers understand, not just use'
])}

## Conclusion

Svelte Atoms is about giving you the building blocks to create exactly what you need, without compromise. It's built on the beliefs that:

${list([
	'Composition is more flexible than configuration',
	'Developers should control their code completely',
	'Accessibility shouldn\'t be optional',
	'Type safety improves developer experience',
	'Performance matters',
	'Simplicity and transparency build trust'
])}

If these principles resonate with you, Svelte Atoms will feel natural and powerful. If you prefer batteries-included solutions with opinionated defaults, you might prefer a traditional component library.

We're building for developers who want control, understand trade-offs, and enjoy building from primitives.
`);
}
