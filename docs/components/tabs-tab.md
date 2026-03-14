# Tab Module

> **Source**: [`src/lib/components/tabs/tab`](../../src/lib/components/tabs/tab)

The `Tab` sub-module provides the individual tab item components that plug into a parent `Tabs` component. A `Tab.Root` wraps both the clickable trigger (`Tab.Header`) and the content panel (`Tab.Body`), keeping related markup co-located while the library handles portal/teleportation automatically.

## Components

| Component | Default Tag | Description |
|---|---|---|
| `Tab.Root` | — (renderless) | Creates a `TabBond`, registers it with the parent `TabsBond`, and provides context to children |
| `Tab.Header` | `button` | Clickable tab trigger; portals itself into the nearest `Tabs.Header` |
| `Tab.Body` | `Stack.Item` | Content panel; registers itself with `Tabs.Content` to be rendered when active |
| `Tab.Description` | `p` | Optional description text for the tab |

## Usage

Individual tabs are always used inside a `Tabs.Root`. See the [Tabs component](./tabs.md) for full layout examples.

```svelte
<script lang="ts">
  import { Tabs, Tab } from '@svelte-atoms/core';

  let activeTab = $state('overview');
</script>

<Tabs.Root bind:value={activeTab}>
  <Tabs.Header>
    <Tab.Root value="overview">
      <Tab.Header>Overview</Tab.Header>
      <Tab.Body>
        <p>Overview content goes here.</p>
      </Tab.Body>
    </Tab.Root>

    <Tab.Root value="details">
      <Tab.Header>Details</Tab.Header>
      <Tab.Body>
        <p>Details content goes here.</p>
      </Tab.Body>
    </Tab.Root>

    <Tab.Root value="settings" disabled>
      <Tab.Header>Settings</Tab.Header>
      <Tab.Body>
        <p>Settings (disabled tab).</p>
      </Tab.Body>
    </Tab.Root>
  </Tabs.Header>

  <Tabs.Body>
    <Tabs.Content />
  </Tabs.Body>
</Tabs.Root>
```

### With Tab.Description

`Tab.Description` renders inside the active tab's content panel (alongside `Tab.Body`):

```svelte
<Tab.Root value="profile">
  <Tab.Header>Profile</Tab.Header>
  <Tab.Body>
    <Tab.Description>Your personal information.</Tab.Description>
    <p>Profile form...</p>
  </Tab.Body>
</Tab.Root>
```

### Accessing Bond in Children

Both `Tab.Header` and `Tab.Body` snippets expose the `TabBond` instance:

```svelte
<Tab.Root value="stats">
  {#snippet children({ tab })}
    <Tab.Header>
      {#snippet children({ tab })}
        Stats {tab?.state.isActive ? '✓' : ''}
      {/snippet}
    </Tab.Header>
    <Tab.Body>Stats content</Tab.Body>
  {/snippet}
</Tab.Root>
```

## API Reference

### TabBond

The bond managing an individual tab. Created by `Tab.Root` and shared via Svelte context.

#### Properties

| Property | Type | Description |
|---|---|---|
| `value` | `string` | The tab's unique identifier (from `TabBondProps.value`) |
| `text` | `string` | Inner text of the tab header element |

#### Methods

| Method | Signature | Description |
|---|---|---|
| `mount()` | `() => () => void` | Registers this tab with the parent `TabsBond`; returns an unmount cleanup |
| `unmount()` | `() => void` | Unregisters from parent `TabsBond` |
| `share()` | `() => this` | Puts the bond in Svelte context for child components |
| `header()` | `() => object` | Returns ARIA + portal attachment props for the header element |
| `body()` | `() => object` | Returns ARIA props for the body element |
| `description()` | `() => object` | Returns props for the description element |
| `TabBond.get()` | `() => TabBond \| undefined` | Retrieves the current `TabBond` from context |
| `TabBond.set()` | `(bond) => TabBond` | Sets a `TabBond` into context |

### TabBondState

Manages individual tab reactive state.

#### Properties

| Property | Type | Description |
|---|---|---|
| `isActive` | `boolean` | Whether this tab is currently selected |
| `isDisabled` | `boolean` | Whether this tab is disabled |

#### Methods

| Method | Signature | Description |
|---|---|---|
| `select()` | `() => void` | Selects this tab (delegates to `TabsBondState.select`) |
| `unselect()` | `() => void` | Deselects (delegates to `TabsBondState.unselect`) |

## Props

### Tab.Root

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `nanoid()` | Unique tab identifier; auto-generated if not provided |
| `disabled` | `boolean` | `false` | Disables the tab trigger |
| `data` | `D` | — | Arbitrary data attached to this tab, accessible via `TabBond` |
| `factory` | `(props) => TabBond` | — | Custom factory for creating `TabBond` |
| `children` | `Snippet<[{ tab: TabBond }]>` | — | Children (renderless wrapper) |

### Tab.Header

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `Snippet<[{ tab?: TabBond }]>` | — | Trigger content |
| `onpointerdown` | `(ev: PointerEvent, ctx: { tab?: TabBond }) => void` | — | Custom pointer handler; call `ev.preventDefault()` to suppress selection |
| `...atomProps` | `HtmlAtomProps` | — | All HTML element props (defaults to `button`) |

### Tab.Body

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `Snippet<[{ tab?: TabBond, tabs?: TabsBond }]>` | — | Content panel markup |
| `...atomProps` | `HtmlAtomProps` | — | All HTML element props |

### Tab.Description

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `Snippet<[{ tab?: TabBond }]>` | — | Description content |
| `...atomProps` | `HtmlAtomProps` | — | All HTML element props (defaults to `p`) |

## Types

### TabBondProps

```typescript
type TabBondProps<T, S extends Record<string, unknown> = Record<string, unknown>> = BondStateProps & {
  value: string;
  disabled?: boolean;
  data: T;
  extend: S;
};
```

### TabBondElement

```typescript
type TabBondElement = {
  header: HTMLElement;
  body: HTMLElement;
  description: HTMLElement;
};
```

## How Tab.Header Portaling Works

When `Tab.Header` mounts, its attachment function checks for `tabs.elements.header` (the `Tabs.Header` DOM node). If found, it calls `portal(tabs.elements.header)(node)` to move the element into the tablist. If the tablist isn't mounted yet, the header is hidden until it is.

This means you can place `Tab.Root` anywhere inside `Tabs.Root` — not just directly inside `Tabs.Header` — and the header will still appear in the right place.

## How Tab.Body Teleportation Works

`Tab.Body` does not render itself into the DOM directly. Instead, it registers a snippet (plus its props) with the parent `TabsBond` via `registerTabContent()`. `Tabs.Content` reads `bond.state.activeTabContent` and renders the active tab's snippet. On unmount, `unregisterTabContent()` is called automatically.

## Accessibility

- `role="tab"` on `Tab.Header`
- `role="tabpanel"` on `Tab.Body` (inside `Tabs.Content`)
- `aria-controls` on the header pointing to the panel id
- `aria-labelledby` / `aria-describedby` on the panel pointing back to header/description
- `aria-disabled` reflects the `disabled` prop
- `data-active` attribute on both header and body for CSS state targeting

## License

MIT
