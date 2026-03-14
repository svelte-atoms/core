# Tabs Module

> **Source**: [`src/lib/components/tabs`](../../src/lib/components/tabs)

The Tabs module provides a flexible, accessible tabbed navigation system built on the Bond architecture. Tab headers are automatically portaled into the tab list, and tab body content is registered and rendered via `Tabs.Content` — keeping your markup co-located while the DOM stays semantic.

## Features

- **Co-located markup**: Define a tab's trigger and content together inside `Tab.Root`; the library handles placement via portals and content registration
- **Bond-based state**: `TabsBond` / `TabBond` manage active state, item registration, and ARIA attributes
- **Accessibility**: Full ARIA tabs pattern (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-controls`, `aria-labelledby`)
- **Extensible**: Override default elements via `as` prop, extend styles via `preset`, or inject custom factories

## Components

| Component | Default Tag | Description |
|---|---|---|
| `Tabs.Root` | `div` | Root container; owns `value` state and `TabsBond` context |
| `Tabs.Header` | `div` | `role="tablist"` — tab buttons are portaled here automatically |
| `Tabs.Body` | `div` | Wrapper around `Tabs.Content` |
| `Tabs.Content` | `div` via `Stack.Root` | Renders the active tab's content panel |
| `Tab.Root` | — (renderless) | Individual tab item; owns a `TabBond` and registers with `TabsBond` |
| `Tab.Header` | `button` | Clickable tab trigger; portals itself into `Tabs.Header` |
| `Tab.Body` | `Stack.Item` | Tab content panel; registers with `Tabs.Content` via teleportation |
| `Tab.Description` | `p` | Optional description rendered inside the tab's content area |

## Installation

```bash
npm install @svelte-atoms/core
```

## Usage

### Basic

```svelte
<script lang="ts">
  import { Tabs, Tab } from '@svelte-atoms/core';

  let activeTab = $state('tab1');
</script>

<Tabs.Root bind:value={activeTab}>
  <Tabs.Header>
    <Tab.Root value="tab1">
      <Tab.Header>Tab 1</Tab.Header>
      <Tab.Body>Content for Tab 1</Tab.Body>
    </Tab.Root>
    <Tab.Root value="tab2">
      <Tab.Header>Tab 2</Tab.Header>
      <Tab.Body>Content for Tab 2</Tab.Body>
    </Tab.Root>
    <Tab.Root value="tab3">
      <Tab.Header>Tab 3</Tab.Header>
      <Tab.Body>Content for Tab 3</Tab.Body>
    </Tab.Root>
  </Tabs.Header>

  <Tabs.Body>
    <Tabs.Content />
  </Tabs.Body>
</Tabs.Root>
```

> **Note:** `Tab.Root` can be placed anywhere inside `Tabs.Root` — not just inside `Tabs.Header`. `Tab.Header` portals itself to the nearest `Tabs.Header` element, and `Tab.Body` registers its content with `Tabs.Content`.

### With `onchange`

```svelte
<Tabs.Root bind:value={activeTab} onchange={(v) => console.log('switched to', v)}>
  ...
</Tabs.Root>
```

### Preset Configuration

```typescript
import { setPreset } from '@svelte-atoms/core';

setPreset({
  tabs: () => ({ class: 'w-full' }),
  'tabs.header': () => ({ class: 'border-b border-border' }),
  'tabs.body': () => ({ class: 'mt-4' }),
  'tabs.content': () => ({ class: '' }),
  'tab.header': () => ({
    class: 'px-4 py-2 text-sm font-medium data-[active=true]:border-b-2 data-[active=true]:border-primary'
  }),
  'tab.body': () => ({ class: 'p-4' }),
});
```

## API Reference

### TabsBond

The bond that orchestrates the tabs component. Created internally by `Tabs.Root` and shared via Svelte context.

#### Methods

| Method | Signature | Description |
|---|---|---|
| `share()` | `() => this` | Sets the bond in Svelte context so child components can access it |
| `root()` | `(props?) => object` | Returns props for the root element (id, aria-orientation, data-kind) |
| `header()` | `(props?) => object` | Returns props for the header element (id, role="tablist", data-kind) |
| `body()` | `(props?) => object` | Returns props for the body element (id, role="group", data-kind) |
| `TabsBond.get()` | `() => TabsBond \| undefined` | Retrieves the current `TabsBond` from Svelte context |
| `TabsBond.set()` | `(bond) => TabsBond` | Sets a `TabsBond` into Svelte context |

### TabsBondState

Manages the reactive state for the tabs component.

#### Properties

| Property | Type | Description |
|---|---|---|
| `selectedItem` | `TabBond \| undefined` | The currently active `TabBond` |
| `activeTabContent` | `TabContentSnippet \| undefined` | The snippet registered by the active tab's `Tab.Body` |

#### Methods

| Method | Signature | Description |
|---|---|---|
| `mountItem()` | `(id, item) => () => void` | Registers a `TabBond`; sets it as active if it's the first tab |
| `unmountItem()` | `(id) => void` | Unregisters a `TabBond` |
| `select()` | `(id) => void` | Sets the active tab value |
| `unselect()` | `() => void` | Clears the active tab |
| `getTab()` | `(id) => TabBond \| undefined` | Looks up a registered `TabBond` by id |
| `registerTabContent()` | `(id, props, children) => void` | Called by `Tab.Body` to register its content snippet |
| `unregisterTabContent()` | `(id) => void` | Called by `Tab.Body` on teardown |

## Props

### Tabs.Root

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string \| undefined` | `undefined` | Active tab value (bindable) |
| `onchange` | `(value: string) => void` | — | Called when the active tab changes |
| `factory` | `Factory<TabsBond>` | — | Custom factory for creating `TabsBond` |
| `children` | `Snippet<[{ tabs: TabsBond }]>` | — | Children |
| `...atomProps` | `HtmlAtomProps` | — | All HTML element props (see Atom Props) |

### Tabs.Header

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `Snippet<[{ tabs?: TabsBond }]>` | — | Children |
| `...atomProps` | `HtmlAtomProps` | — | All HTML element props |

### Tabs.Body

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `Snippet<[{ tabs?: TabsBond }]>` | — | Children |
| `...atomProps` | `HtmlAtomProps` | — | All HTML element props |

### Tabs.Content

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `Snippet<[{ tabs?: TabsBond }]>` | — | Optional custom content wrapper |
| `...atomProps` | `HtmlAtomProps` | — | All HTML element props |

## Types

### TabsBondProps

```typescript
type TabsBondProps<T extends Record<string, unknown> = Record<string, unknown>> = BondStateProps & {
  value?: string | undefined;
  multiple?: boolean;
  extend?: T;
  readonly rest?: Record<string, unknown>;
};
```

### TabElements

```typescript
type TabElements = {
  root: HTMLElement;
  header: HTMLElement;
  body: HTMLElement;
};
```

### TabContentSnippet

```typescript
type TabContentSnippet = {
  props: Record<string, unknown>;
  children: Snippet<[{ tab?: TabBond }]>;
};
```

## Attachments

The `tabs` attachment helper lets you access the `TabsBond` from an element attachment:

```typescript
import { tabs } from '@svelte-atoms/core';

// In a Svelte component, as a use: directive equivalent (attachment)
const myAttachment = tabs((node, bond) => {
  // node: the DOM element
  // bond: the parent TabsBond, if any
});
```

## Accessibility

- `role="tablist"` on `Tabs.Header`
- `role="tab"` on each `Tab.Header`
- `role="tabpanel"` on each `Tab.Body`
- `aria-controls` linking tab to its panel
- `aria-labelledby` / `aria-describedby` on panels
- `aria-disabled` on disabled tabs
- `data-active` attribute on both tab header and body for CSS targeting

## License

MIT
