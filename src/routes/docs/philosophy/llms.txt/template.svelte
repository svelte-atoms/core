<script lang="ts">

	import { FrontMatter, List } from '$docs/md/components';
	import { codeBlock } from '$docs/md/template';

	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>


<FrontMatter {frontmatter} />

# {metadata.pageTitle}

{metadata.pageDescription}

## Core Principles

Svelte Atoms is built on three fundamental principles that guide every design decision:

{#each metadata.corePrinciples as principle (principle.title)}
### {principle.title}

{principle.description}

**Benefits:**
<List items={principle.benefits} />

{/each}

## Bond Architecture

{metadata.bondArchitecture.description}

### What is a Bond?

{metadata.bondArchitecture.whatIsBond}

**Example:**

{codeBlock(`
// Creating a Bond
const accordion = createAccordionBond({
  multiple: false,
  defaultValue: 'item-1'
});

// Using the Bond
<Accordion bond={accordion}>
  <AccordionItem value="item-1">...</AccordionItem>
  <AccordionItem value="item-2">...</AccordionItem>
</Accordion>
`, 'typescript')}

### Bond Features

{#each metadata.bondArchitecture.features as feature (feature.title)}
#### {feature.title}

{feature.description}

{/each}

## Why Svelte 5?

Svelte 5's Runes API enables patterns that weren't possible before:

{#each metadata.whySvelte5 as item (item.feature)}
### {item.feature}

{item.description}

**Impact:** {item.impact}

{/each}

## Customization Philosophy

{metadata.customizationPhilosophy.description}

{#each metadata.customizationPhilosophy.approaches as approach (approach.title)}
### {approach.title}

{approach.description}

{/each}

## Design Goals

What we optimize for when building Svelte Atoms:

{#each metadata.designGoals as goal (goal.goal)}
### {goal.goal} (Priority: {goal.priority})

{goal.description}

{/each}

## What We're Not

It's important to understand what Svelte Atoms is NOT trying to be:

{#each metadata.whatWeAreNot as item (item.title)}
### {item.title}

{item.description}

{/each}

## Philosophy in Practice

### Composition Example

Instead of a monolithic component with 50 props:

{codeBlock(`
<!-- Other libraries -->
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
/>
`, 'svelte')}

Svelte Atoms uses composition:

{codeBlock(`
<!-- Svelte Atoms -->
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
</DataGrid.Root>
`, 'svelte')}

### Styling Example

Full control over styling at every level:

{codeBlock(`
<!-- Global preset -->
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

<!-- Result: preset + variant + size + custom classes merged intelligently -->
`, 'svelte')}

### Bond Example

State management without prop drilling:

{codeBlock(`
<!-- Root component creates and shares bond -->
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
</Tabs.Root>
`, 'svelte')}

## Comparison with Other Approaches

### Traditional Component Libraries

**Pros:**
<List items={[
	'Fast to get started',
	'Pre-designed components',
	'Consistent look out of the box'
]} />

**Cons:**
<List items={[
	'Limited customization',
	'Fighting default styles',
	'Vendor lock-in',
	'Large bundle sizes'
]} />

### Headless UI Libraries

**Pros:**
<List items={[
	'Behavior without styling',
	'Good flexibility',
	'Accessible by default'
]} />

**Cons:**
<List items={[
	'Still opinionated structure',
	'Limited composition',
	'Complex API for customization'
]} />

### Svelte Atoms

**Pros:**
<List items={[
	'Maximum flexibility',
	'Composition-first',
	'Minimal abstractions',
	'Full control over everything',
	'Type-safe',
	'Optimized for Svelte 5'
]} />

**Considerations:**
<List items={[
	'More initial setup for basic components',
	'Need to handle styling yourself',
	'Requires understanding of composition patterns'
]} />

## Guiding Questions

When making design decisions, we ask:

<List ordered items={[
	'**Does it enable or constrain?** - Prefer enabling building blocks over constraining configurations',
	'**Is it composable?** - Can it combine with other primitives to create new patterns?',
	'**Is it accessible by default?** - Does it handle ARIA, keyboard nav, and focus management automatically?',
	'**Is it type-safe?** - Does TypeScript provide helpful autocomplete and catch errors?',
	"**Is it performant?** - Does it leverage Svelte 5's reactivity optimally?",
	'**Is it understandable?** - Can developers debug and reason about the implementation?'
]} />

## Future Direction

Svelte Atoms will continue to:

<List items={[
	'**Expand primitives**: Add more building blocks for common patterns',
	'**Improve DX**: Better error messages, debugging tools, and documentation',
	'**Enhance types**: More precise TypeScript types and better inference',
	'**Optimize performance**: Leverage new Svelte features for better performance',
	'**Maintain flexibility**: Never sacrifice flexibility for convenience'
]} />

What we won't do:

<List items={[
	'Become opinionated about styling',
	'Add framework-specific dependencies',
	'Compromise accessibility',
	'Lock you into patterns',
	'Bloat the bundle size'
]} />

## Learning Path

<List ordered items={[
	'**Start with Atoms**: Understand the basic building blocks',
	'**Learn Composition**: Practice combining primitives',
	'**Master Bonds**: Understand state management patterns',
	'**Explore Presets**: Set up global theming',
	'**Build Real Components**: Apply knowledge to real projects',
	'**Contribute Back**: Share patterns and improvements'
]} />

## Community Principles

<List items={[
	'**Transparency**: Open source, open development, open discussions',
	'**Inclusivity**: Welcome contributors of all skill levels',
	'**Quality**: Maintain high standards for code, docs, and accessibility',
	'**Pragmatism**: Balance idealism with practical needs',
	'**Education**: Help developers understand, not just use'
]} />

## Conclusion

Svelte Atoms is about giving you the building blocks to create exactly what you need, without compromise. It's built on the beliefs that:

<List items={[
	'Composition is more flexible than configuration',
	'Developers should control their code completely',
	"Accessibility shouldn't be optional",
	'Type safety improves developer experience',
	'Performance matters',
	'Simplicity and transparency build trust'
]} />

If these principles resonate with you, Svelte Atoms will feel natural and powerful. If you prefer batteries-included solutions with opinionated defaults, you might prefer a traditional component library.

We're building for developers who want control, understand trade-offs, and enjoy building from primitives.