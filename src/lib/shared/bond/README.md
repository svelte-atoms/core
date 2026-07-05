# `shared/bond`

Runtime core for component families.

A **Bond** owns shared props/state, context, registered runtime Atoms, collections, and capability
lookup. An **Atom** owns one rendered part's attrs, handlers, attachments, lifecycle, and local
capabilities.

## Files

| File                         | Purpose                                                  |
| ---------------------------- | -------------------------------------------------------- |
| `bond.svelte.ts`             | `Bond` runtime host.                                     |
| `atom.svelte.ts`             | `Atom` runtime object and spread composition.            |
| `use-atom.svelte.ts`         | `createAtomInstance(...)` lifecycle/registration helper. |
| `state.svelte.ts`            | Compatibility `BondState` helper.                        |
| `collection.svelte.ts`       | Ordered reactive child collection.                       |
| `bind.svelte.ts`             | Wires Bond prop cells to `$bindable` props.              |
| `context.ts`, `factory.ts`   | Context keys and default factory helpers.                |
| `merge.ts`, `diagnostics.ts` | Spread merge rules and role/capability diagnostics.      |
| `index.ts`                   | Public barrel for this layer.                            |

## Usage Notes

- Rendered parts create Atoms with `createAtomInstance(...)`.
- Read rendered atoms with `bond.node(...)` / `bond.nodes(...)`.
- Generated methods such as `bond.root()` are compatibility adapters.
- New shared behavior should be a capability, not a root-level `$effect`.

See [`CONTEXT.md`](../../../../CONTEXT.md) for vocabulary.
