# `shared/bond` — the bond runtime core

The brain of every component. A **bond** owns a component family's logic and identity; its
**state** holds the data and mutation methods; its **atoms** project per-slot DOM attributes,
handlers, and lifecycle. These three classes are mutually recursive and live together in
[`bond.svelte.ts`](./bond.svelte.ts); everything else here is a focused helper they bind.

See [`CONTEXT.md`](../../../../CONTEXT.md) for the vocabulary and [`docs/adr/`](../../../../docs/adr)
(0001–0002) for the Bond ⇄ BondState responsibility split.

## Files

| File                                             | What it is                                                                                                                                                                             |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`bond.svelte.ts`](./bond.svelte.ts)             | `Bond`, `BondState`, `BondAtom`, `DefaultAtom`. The single lifecycle owner. Also re-exports the capability + type seams so it stays the one import surface for the ~40 deep consumers. |
| [`types.ts`](./types.ts)                         | Core type aliases: `BondStateProps`, `BondClass`, `AtomFactory`, `AtomRegistry`, `BondElements`, `BondVirtualElement`.                                                                 |
| [`context.ts`](./context.ts)                     | `bondContextKey(...segments)` — canonical Svelte-context key (`@svelte-atoms/context/<segments>`).                                                                                     |
| [`factory.ts`](./factory.ts)                     | `bondFactory(State, Bond)` — the default-factory SSOT used by most roots.                                                                                                              |
| [`bind.svelte.ts`](./bind.svelte.ts)             | `bindBond` / `BondBinding` — wires a bond's reactive prop cells to a component's `$bindable`s (ADR 0002).                                                                              |
| [`collection.svelte.ts`](./collection.svelte.ts) | `Collection<T>` — the reactive, ordered children data structure backing `BondState.collection()`.                                                                                      |
| [`staged-map.svelte.ts`](./staged-map.svelte.ts) | `StagedMap` — microtask-deferred reactive map (avoids `state_unsafe_mutation` in `$derived`). Internal; not exported.                                                                  |

## Public surface

Re-exported through [`index.ts`](./index.ts): `Bond`, `BondState`, `BondAtom`, `bondContextKey`,
`bindBond`, `BondBinding`, `bondFactory`, `Collection`, and the [`types.ts`](./types.ts) aliases.

## Rules of thumb

- State lives in `BondState`; mutate through methods (`open()`, `toggle()`, `select()`), never by
  writing props directly. Read it through `is*`/`has*`/`can*` predicates.
- Get a slot atom with `bond.atom('header')` — the queue **caches** the instance. Never
  `new FooAtom(...)` in a component.
- Never call `createAttachmentKey()` inside `BondAtom.spread` or any `$derived` — mint keys once
  per atom (see `spread-attachment-key-invariant`).
- Cross-cutting behavior (focus, escape, disclosure) is a **capability**, not a per-root `$effect`.
  See [`../capability`](../capability).
