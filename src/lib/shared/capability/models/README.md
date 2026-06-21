# `shared/capability/models` — the concrete capabilities

The library's built-in capabilities. Each file mints its slot key, builds its model with
`defineCapability`, and exposes a `createX` / `xCapability` pair. Components register these onto
their `BondState`; atoms pull them in with `atom.role(...)`.

| File                                                         | Slot / exports                                                          | Behavior                                                                                                                  |
| ------------------------------------------------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [`disclosure.svelte.ts`](./disclosure.svelte.ts)             | `createDisclosure`, `Disclosure`                                        | Open/close/toggle state for popovers, dialogs, collapsibles.                                                              |
| [`disclosure-state.svelte.ts`](./disclosure-state.svelte.ts) | `DisclosureState` (base class, not barrelled)                           | `BondState` subclass that dedups `isOpen`/`open`/`close`/`toggle` for open-close components.                              |
| [`selection.svelte.ts`](./selection.svelte.ts)               | `SELECTION`, `createSelection`, `selectionCapability`, `SelectionModel` | Single/multi selection over a collection.                                                                                 |
| [`collection.svelte.ts`](./collection.svelte.ts)             | `collectionSlot`, `collectionCapability`, `CollectionCapability`        | Wraps the [`Collection<T>`](../../bond/collection.svelte.ts) structure as a `collection:<kind>` capability.               |
| [`roving.svelte.ts`](./roving.svelte.ts)                     | `ROVING`, `createRovingFocus`, `rovingCapability`, `RovingFocus`        | Roving-tabindex keyboard focus across items.                                                                              |
| [`navigation.svelte.ts`](./navigation.svelte.ts)             | `navigationCapability`, `NavigationProjectionOptions`                   | Arrow-key navigation policy projected onto container/item roles.                                                          |
| [`input.svelte.ts`](./input.svelte.ts)                       | `INPUT`, `createInput`, `inputCapability`, `InputModel`                 | Text-input model (query/value channel) for comboboxes and fields.                                                         |
| [`relationship.svelte.ts`](./relationship.svelte.ts)         | `TRIGGER_CONTENT`, `triggerContentLink`, `labelledControl`              | Cross-slot ARIA wiring (`aria-expanded`/`aria-controls`/`aria-labelledby`) — the relationship, not per-atom hand-writing. |

> **Naming note:** this `collection.svelte.ts` is the _capability_. The `Collection<T>` _data
> structure_ it wraps lives in [`../../bond/collection.svelte.ts`](../../bond/collection.svelte.ts).

## Public surface

All of the above (except the `DisclosureState` base class) are re-exported through
[`index.ts`](./index.ts), which [`../index.ts`](../index.ts) folds into the capability barrel.

See [`../README.md`](../README.md) for how to author a new capability and the override seam.
