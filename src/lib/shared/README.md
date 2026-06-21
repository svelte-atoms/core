# `shared` — the bond layer

The engine every component is built on, organized into three layers. Each is its own module with
its own barrel and README; [`index.ts`](./index.ts) composes them into one stable public surface.

```
shared/
  index.ts        public barrel — composes the three layers below
  motion.ts       DURATION token
  bond/           the runtime core: Bond / BondState / BondAtom (+ bind, factory, collection)
  capability/     cross-cutting behavior registered onto a BondState
    models/        the concrete capabilities (disclosure, selection, roving, …)
  authoring/      the declarative DSL that generates bond families (defineBond, fuse)
```

## Layering

The dependency direction is one-way — **authoring → capability → bond** — so the graph stays a DAG:

- [`bond/`](./bond) depends on nothing above it (it only reaches _down_ to the collection
  capability it backs).
- [`capability/`](./capability) builds on `bond`.
- [`authoring/`](./authoring) builds on both and is imported by neither.

## Importing

Consumers import from the package barrel (`$svelte-atoms/core/shared` → [`index.ts`](./index.ts)),
which re-exports the full surface. Each layer also has its own barrel
([`bond`](./bond/index.ts), [`capability`](./capability/index.ts),
[`authoring`](./authoring/index.ts)) if you want to import from a single concern.

**Internal** cross-module imports use deep file paths (e.g. `../capability/capability`), _not_ the
barrels — this keeps the module graph explicit and cycle-free. `bond/bond.svelte.ts` additionally
re-exports the capability and type seams so it remains the single import surface for its ~40 deep
consumers.

See [`CONTEXT.md`](../../../CONTEXT.md) for vocabulary and [`docs/adr/`](../../../docs/adr) for the
binding decisions.
