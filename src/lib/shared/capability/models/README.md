# `shared/capability/models`

Built-in capabilities used by component Bonds and runtime Atoms.

## Groups

| Files                                          | Purpose                                                                  |
| ---------------------------------------------- | ------------------------------------------------------------------------ |
| `atom.svelte.ts`                               | Atom-local primitives: refs, press/focus, data state, ARIA role, motion. |
| `disclosure.svelte.ts`, `selection.svelte.ts`  | Common state models for open/close and selection.                        |
| `collection.svelte.ts`, `roving.svelte.ts`     | Collection registration and roving focus.                                |
| `typeahead.svelte.ts`, `navigation.svelte.ts`  | Keyboard search and navigation policies.                                 |
| `input.svelte.ts`, `validation.svelte.ts`      | Input and validation models.                                             |
| `checked.svelte.ts`, `pressed.svelte.ts`       | Toggle state models.                                                     |
| `range.svelte.ts`, `progress.svelte.ts`        | Numeric range and progress models.                                       |
| `relationship.svelte.ts`, `role-projections.*` | Cross-slot ARIA and generic role projections.                            |
| `whole-bond-effects.svelte.ts`                 | Setup effects for document, observer, modality, and portal behavior.     |
| `focused.svelte.ts`, `archetypes.svelte.ts`    | Higher-level capability bundles.                                         |

The public surface is re-exported through [`index.ts`](./index.ts). `DisclosureState` is a
compatibility helper and is not barrelled.
