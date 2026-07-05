# `shared/authoring`

Declarative helpers for defining Bond families.

## Files

| File                | Purpose                                                              |
| ------------------- | -------------------------------------------------------------------- |
| `define.svelte.ts`  | `defineBond(...)`, spec types, generated context keys, atom methods. |
| `define-runtime.ts` | Runtime helpers used by `defineBond`.                                |
| `fuse.svelte.ts`    | Combines two Bond families into one context surface.                 |
| `index.ts`          | Public barrel for this layer.                                        |

## Usage Notes

- Prefer `BondOf<typeof X>` for defined bond instances.
- Use `parts:` for flat composition and `extends:` only for legacy/spec inheritance.
- Rendered Svelte parts should still create Atoms with `createAtomInstance(...)`.
