# Component Documentation Migration Guide

This guide explains the new component documentation structure and how to migrate existing component documentation to follow this pattern.

## Overview

The new structure consolidates all component documentation data into a single `metadata` object in a `shared.ts` file, providing a single source of truth for both the documentation page and LLM endpoints.

## Key Changes

### 1. File Structure

**Before:**
```
/docs/components/{component}/
  ├── data.ts          # Component metadata and examples
  ├── props.ts         # Component props definitions
  ├── +page.svelte     # Documentation page
  └── llms/
      └── +server.ts   # LLM documentation endpoint
```

**After:**
```
/docs/components/{component}/
  ├── shared.ts        # Renamed from data.ts - contains metadata object
  ├── props.ts         # Component props definitions (unchanged)
  ├── +page.svelte     # Documentation page
  └── llms/
      └── +server.ts   # LLM documentation endpoint
```

### 2. Metadata Object Structure

The `shared.ts` file should export a single `metadata` object containing all component documentation:

```typescript
// shared.ts

// Private: Code examples (not exported)
const basicCode = `...`.trim();
const advancedCode = `...`.trim();
const presetCode = `...`.trim();

// Private: Accessibility features
const accessibilityFeatures = [
  'Feature 1',
  'Feature 2'
];

// Private: Use cases
const useCases = [
  {
    title: 'Use Case Title',
    description: 'Detailed description of when to use this component.'
  }
  // ... more use cases
];

// Private: Components summary (for compound components)
const componentsSummary = [
  {
    name: 'Component.Root',
    description: 'Description of what this sub-component does.'
  }
  // ... more components
];

// Public: Single metadata export
export const metadata = {
  // Page metadata
  title: 'Component Name - Svelte Atoms',
  description: 'Brief description for SEO.',
  
  // Component info
  componentTitle: 'Component Name',
  componentDescription: 'Detailed component description.',
  componentType: 'compound' as const, // or 'simple'
  status: 'stable' as const, // or 'experimental', 'deprecated'
  
  // Installation info
  packageName: '@svelte-atoms/core',
  importCode: "import { ComponentName } from '@svelte-atoms/core';",
  
  // Navigation
  breadcrumbs: [
    { label: 'Components', href: '/docs/components' },
    { label: 'Component Name' }
  ],
  
  // Documentation content
  useCases,
  componentsSummary, // Only for compound components
  examples: {
    basic: basicCode,
    advanced: advancedCode,
    preset: presetCode
  },
  accessibility: accessibilityFeatures
};
```

### 3. Component Page (`+page.svelte`)

**Import changes:**

```typescript
// Before
import {
  basicCode,
  positionsCode,
  controlledCode,
  presetCode,
  accessibilityFeatures,
  metadata
} from './data';

// After
import { metadata } from './shared';
```

**Usage changes:**

```svelte
<!-- Before -->
<DemoExample code={basicCode}>

<CodeBlock code={presetCode} />

<AccessibilityInfo features={accessibilityFeatures} />

<!-- After -->
<DemoExample code={metadata.examples.basic}>

<CodeBlock code={metadata.examples.preset} />

<AccessibilityInfo features={metadata.accessibility} />
```

**Navigation (stays in +page.svelte, NOT in metadata):**

```svelte
<PageNavigation
  prev={{ label: 'PreviousComponent', href: '/docs/components/previous' }}
  next={{ label: 'NextComponent', href: '/docs/components/next' }}
/>
```

### 4. LLM Documentation (`llms/+server.ts`)

**Import changes:**

```typescript
// Before
import {
  basicCode,
  positionsCode,
  controlledCode,
  presetCode,
  accessibilityFeatures,
  metadata
} from '../data';

// After
import { metadata } from '../shared';
```

**Template structure:**

```typescript
function build(): string {
  return `
# ${metadata.componentTitle} Module

${metadata.componentDescription}

**Type**: ${metadata.componentType === 'compound' ? 'Compound Component' : 'Simple Component'}

## Use Cases

${metadata.useCases.map((uc) => `- **${uc.title}**: ${uc.description}`).join('\n')}

${metadata.componentType === 'compound' ? `
## Components

${metadata.componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}
` : ''}

### Component.Root

**Preset Key:** \`component\`

${propsTable(componentRootProps)}

## Examples

### Basic Example

\`\`\`svelte
${metadata.examples.basic}
\`\`\`

### Advanced Example

\`\`\`svelte
${metadata.examples.advanced}
\`\`\`

### Preset Configuration

\`\`\`typescript
${metadata.examples.preset}
\`\`\`

## Accessibility

${metadata.accessibility.map((feature) => `- ${feature}`).join('\n')}
`.trim();
}
```

## Migration Steps

### Step 1: Rename and Restructure

1. Rename `data.ts` to `shared.ts`
2. Make all individual exports (except `metadata`) private by removing `export` keyword
3. Add structured data for `useCases` and `componentsSummary` (if compound)

### Step 2: Update Metadata Object

Add the following fields to your metadata object:

```typescript
export const metadata = {
  // ... existing fields
  componentType: 'compound' as const, // or 'simple'
  useCases: [
    {
      title: 'Use Case 1',
      description: 'Description...'
    }
  ],
  componentsSummary: [ // Only for compound components
    {
      name: 'Component.SubComponent',
      description: 'What it does...'
    }
  ],
  examples: {
    basic: basicCode,
    // ... other examples
  },
  accessibility: accessibilityFeatures
};
```

### Step 3: Update Component Page

1. Update import from `'./data'` to `'./shared'`
2. Remove individual imports (keep only `metadata`)
3. Update all references:
   - `basicCode` → `metadata.examples.basic`
   - `accessibilityFeatures` → `metadata.accessibility`
   - etc.

### Step 4: Update LLM Endpoint

1. Update import from `'../data'` to `'../shared'`
2. Remove individual imports (keep only `metadata`)
3. Update template to use `metadata.useCases`, `metadata.componentsSummary`, etc.
4. Add component type indicator
5. Make use cases and components summary dynamic

### Step 5: Verify

1. Check that the documentation page renders correctly
2. Test the LLM endpoint: `http://localhost:5173/docs/components/{component}/llms`
3. Ensure all examples and content display properly

## Use Case Structure

Use cases should follow this pattern:

```typescript
const useCases = [
  {
    title: 'Specific Scenario',
    description: 'Detailed explanation of when and why to use the component in this scenario.'
  },
  {
    title: 'Another Use Case',
    description: 'Another practical application...'
  }
];
```

**Tips:**
- Be specific and practical
- Focus on real-world applications
- Explain the "why" not just the "what"
- 4-6 use cases is ideal

## Components Summary Structure

For compound components only:

```typescript
const componentsSummary = [
  {
    name: 'Component.Root',
    description: 'Manages state and coordinates all child components. Required parent container.'
  },
  {
    name: 'Component.Trigger',
    description: 'Interactive element that controls the component. Can be customized with any clickable element.'
  },
  {
    name: 'Component.Content',
    description: 'Main content container. Positioned dynamically relative to trigger.'
  }
];
```

**Tips:**
- Order components hierarchically (Root first)
- Mention if component is optional
- Explain the component's role in the compound structure
- Keep descriptions concise but informative

## Component Type

Use the `componentType` field to indicate the component structure:

```typescript
componentType: 'compound' as const  // For multi-part components (Dialog, Popover, etc.)
componentType: 'simple' as const    // For single-part components (Button, Badge, etc.)
```

This affects:
- LLM documentation header
- Whether components summary is shown
- Future documentation features

## Examples Best Practices

Organize examples by complexity and purpose:

```typescript
examples: {
  basic: basicCode,           // Simplest usage
  variations: variationsCode, // Different variants/states
  controlled: controlledCode, // State management example
  advanced: advancedCode,     // Complex real-world example
  preset: presetCode          // Always include preset configuration
}
```

## Checklist for Migration

- [ ] Rename `data.ts` to `shared.ts`
- [ ] Make individual exports private (remove `export` keywords)
- [ ] Add `componentType` field
- [ ] Add `useCases` array with title/description objects
- [ ] Add `componentsSummary` array (if compound component)
- [ ] Consolidate examples into `examples` object
- [ ] Move accessibility features into `accessibility` field
- [ ] Update `+page.svelte` imports
- [ ] Update all references in `+page.svelte` to use `metadata.*`
- [ ] Update `llms/+server.ts` imports
- [ ] Update LLM template to generate from `metadata.*`
- [ ] Add component type indicator in LLM docs
- [ ] Make use cases dynamic in LLM template
- [ ] Make components summary dynamic in LLM template
- [ ] Test documentation page
- [ ] Test LLM endpoint
- [ ] Verify navigation links work correctly

## Example: Complete Migration

See the Popover component as the reference implementation:
- `src/routes/docs/components/popover/shared.ts`
- `src/routes/docs/components/popover/+page.svelte`
- `src/routes/docs/components/popover/llms/+server.ts`

## Benefits of This Structure

1. **Single Source of Truth**: All documentation data in one place
2. **Type Safety**: Centralized metadata object makes it easier to enforce consistency
3. **Reduced Duplication**: Examples and content defined once, used everywhere
4. **Better Maintainability**: Updates to use cases or examples require changing one place
5. **Cleaner Imports**: Components import only `metadata` instead of many individual exports
6. **Scalability**: Easy to add new metadata fields without breaking existing code
7. **LLM-Friendly**: Structured data makes it easier for LLMs to understand component usage

## Common Pitfalls

1. **Don't include navigation in metadata**: Navigation is page-specific and stays in `+page.svelte`
2. **Trim all code examples**: Use `.trim()` to remove leading/trailing whitespace
3. **Use `as const`**: For `componentType` and `status` to enable proper type inference
4. **Escape quotes**: In nested template strings, escape quotes: `'popover.trigger'` not `"popover.trigger"`
5. **Keep props.ts separate**: Props definitions stay in `props.ts` for potential reuse
