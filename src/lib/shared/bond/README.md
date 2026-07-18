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
| `context.ts`, `identity.ts`  | Context keys and cross-copy identity.                    |
| `merge.ts`, `diagnostics.ts` | Spread merge rules and role/capability diagnostics.      |
| `index.ts`                   | Public barrel for this layer.                            |

## Usage Notes

- Rendered parts create Atoms with `createAtomInstance(...)`; ordinary `defineBond` slots can use the higher-level `usePart(...)` authoring helper.
- `defineAtom('key')` keeps a Bond-required constructor; `defineAtom({ key, namespace, preset, id, bond? })` creates an optionally bonded class with standalone identity fallbacks.
- Read rendered atoms with `bond.nodeByPart(...)`, `bond.nodesByPart(...)`, or `bond.nodeByRole(...)`. These lookups never create detached runtime objects.
- A single part rejects duplicate registration; mark repeated parts `{ cardinality: 'many' }`.
- Definitions do not expose Atom factory methods. Rendered parts use `createAtomInstance(...)` or `usePart(...)`; mounted consumers query `nodeByPart(...)` or `nodeByRole(...)`.

## Lifecycle

Normal roots use `bindBond`: construct/register Bond capabilities → share context → activate capabilities.
Rendered parts use `createAtomInstance`: resolve its explicitly named one-shot inputs → construct Atom →
register Atom → activate Atom capabilities → mount. Teardown reverses that order: Atom capabilities,
unregister, then Bond capabilities when the root is destroyed. Capability activation has one owner and is
transactional; a failed setup rolls back successfully initialized capabilities.

- New shared behavior should be a capability, not a root-level `$effect`.

See [`CONTEXT.md`](../../../../CONTEXT.md) for vocabulary.
