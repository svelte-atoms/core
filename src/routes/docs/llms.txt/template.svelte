<script lang="ts">
	import { FrontMatter } from '$docs/md/components';
	import { codeBlock } from '$docs/md/template';

	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />

# {metadata.pageTitle}

{metadata.pageDescription}

## About Svelte Atoms

Svelte Atoms is built on the philosophy that great UI libraries should give you control without sacrificing accessibility, performance, or developer experience.

- **Atomic Design**: Components are built as atoms (basic units) that combine into more complex interfaces
- **Headless Architecture**: Complete separation of logic and presentation — style any component your way
- **Accessibility First**: WCAG 2.1 compliant, keyboard navigation, ARIA support out of the box
- **Type Safe**: Full TypeScript support with comprehensive type definitions
- **Svelte 5 Native**: Built with Svelte 5's runes and modern reactivity model
- **Zero Runtime**: Tree-shakeable, small bundle size, and excellent performance

## Documentation Structure

### Getting Started

Start here to understand the basics and get your first component running.

{#each metadata.documentation.gettingStarted as item (item.title)}
- [{item.title}]({item.href}) — {item.description}
{/each}

### Fundamentals

Learn core concepts: atoms, bonds, and how everything fits together.

{#each metadata.documentation.fundamentals as item (item.title)}
- [{item.title}]({item.href}) — {item.description}
{/each}

### Styling & Theming

Master the powerful variants and preset systems for flexible component styling.

{#each metadata.documentation.styling as item (item.title)}
- [{item.title}]({item.href}) — {item.description}
{/each}

### Advanced Topics

Dive deeper into composition patterns, animations, and building custom components.

{#each metadata.documentation.advanced as item (item.title)}
- [{item.title}]({item.href}) — {item.description}
{/each}

## Component Library

### Layout & Structure

{#each metadata.documentation.layout as item (item.title)}
- [{item.title}]({item.href}) — {item.description}
{/each}

### Navigation

{#each metadata.documentation.navigation as item (item.title)}
- [{item.title}]({item.href}) — {item.description}
{/each}

### Form Controls

{#each metadata.documentation.forms as item (item.title)}
- [{item.title}]({item.href}) — {item.description}
{/each}

### Data Display

{#each metadata.documentation.display as item (item.title)}
- [{item.title}]({item.href}) — {item.description}
{/each}

### Overlays & Modals

{#each metadata.documentation.overlays as item (item.title)}
- [{item.title}]({item.href}) — {item.description}
{/each}

### Interactive Components

{#each metadata.documentation.interactive as item (item.title)}
- [{item.title}]({item.href}) — {item.description}
{/each}

### Core Components

{#each metadata.documentation.core as item (item.title)}
- [{item.title}]({item.href}) — {item.description}
{/each}

## Key Features

- **Complete Component Set** — 40+ production-ready components covering all common UI patterns
- **Accessibility** — WCAG 2.1 AAA compliant with full keyboard navigation and screen reader support
- **Flexible Styling** — Variants system + preset system for powerful theming at any level
- **TypeScript** — Full type safety with exported component and event types
- **Svelte 5** — Built with modern Svelte 5 reactivity, stores, and runes
- **Copy-Paste Design** — Shadcn-style architecture — install components, own the code
- **Storybook Integration** — Live component explorer with interactive examples
- **Documentation** — Comprehensive guides, API docs, and best practices

## Getting Help

- **GitHub Issues**: Report bugs and request features on [GitHub](https://github.com/svelte-atoms/core)
- **Discussions**: Ask questions in [GitHub Discussions](https://github.com/svelte-atoms/core/discussions)
- **Documentation**: Full API docs, examples, and best practices in this guide

## Quick Start

The fastest way to get started:

{codeBlock(`npm install @svelte-atoms/core`, 'bash')}

Install a component:

{codeBlock(`npx svelte-atoms install button`, 'bash')}

Use it in your Svelte app:

{codeBlock(`<script>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import Button from '$lib/components/button/button.svelte';
</script>

<Button>Click me</Button>`, 'svelte')}

For detailed setup instructions, see the [Quick Start Guide](/docs/quick-start/llms.txt).

## Why Svelte Atoms?

**For Developers**
- Components you own and control
- No black boxes — see exactly how it works
- Easy to customize and extend
- Great DX with TypeScript and Svelte

**For Users**
- Accessible by default
- Works with keyboard and screen readers
- Respects motion preferences
- High-quality, polished interactions

**For Teams**
- Consistent component behavior across projects
- Sharable design systems
- Easy theme switching and customization
- Production-ready code

## License

MIT © [Svelte Atoms Contributors](https://github.com/svelte-atoms/core/graphs/contributors)

---

Ready to build? Start with the [Quick Start Guide](/docs/quick-start/llms.txt) or explore the [component library](#component-library).
