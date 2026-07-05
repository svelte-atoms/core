# `shared/capability`

Reusable behavior for Bonds and Atoms.

- **Bond capabilities** coordinate shared state, roles, relationships, and whole-bond setup.
- **Atom capabilities** add local attrs, handlers, lifecycle, or presentation to one runtime Atom.

## Files

| File                               | Purpose                                                        |
| ---------------------------------- | -------------------------------------------------------------- |
| [`capability.ts`](./capability.ts) | Capability types, keys, define/decorate helpers, role context. |
| [`use.svelte.ts`](./use.svelte.ts) | Activates Bond capability setup and teardown.                  |
| [`models/`](./models)              | Built-in capability models and recipes.                        |

## Usage Notes

- Register Bond capabilities with `bond.capability(...)`; activate setup once with
  `useCapabilities(bond)`.
- Pass Atom capabilities to `createAtomInstance(..., { capabilities })` or register them with
  `atom.capability(...)`.
- Prefer `defineCapability(...)` / `defineAtomCapability(...)` over hand-written literals.
- Use `decorateCapability(...)` / `decorateAtomCapability(...)` when replacing behavior you do not
  own.

The public barrel is [`index.ts`](./index.ts).
