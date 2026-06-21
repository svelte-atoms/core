# `shared/capability` — the capability system

A **capability** is the behavior-axis brick, the dual of an atom. Where an atom projects DOM for a
_slot_, a capability contributes cross-cutting behavior — disclosure, selection, focus, escape
handling, ARIA relationships — that no single slot owns. Capabilities are registered onto a
`BondState` (their single home, ADR 0001 §11.1) and project a `Behavior` per **role** that atoms
fold into their `spread` via `atom.role('trigger')`.

Slots are keyed by **symbol** (`CapabilityKey<Surface>`), so the key _is_ the type registry:
`bond.surface(SELECTION)` returns the typed model with no cast. See
[`docs/adr/0005`](../../../../docs/adr/0005-symbol-protocol-layer.md) and
[`0010`](../../../../docs/adr/0010-capability-seam-hardening.md).

## Files

| File                               | What it is                                                                                                                                                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`capability.ts`](./capability.ts) | The authoring/registration kit: `Capability`/`Behavior` interfaces, `capabilityKey` / `sharedCapabilityKey`, `defineCapability`, `decorateCapability`, the role-context types, and `RoleContexts`. No runes — pure types + builders. |
| [`use.svelte.ts`](./use.svelte.ts) | `useCapabilities(bond)` — activates the registered capabilities once when the bond goes live, running their `setup()` effects (focus restore, document listeners) and LIFO teardown.                                                 |
| [`models/`](./models)              | The concrete capabilities — see [`models/README.md`](./models/README.md).                                                                                                                                                            |

## Public surface

Through [`index.ts`](./index.ts): the kit from `capability.ts`, `useCapabilities`, and everything
re-exported from [`models`](./models).

## Authoring a capability

Prefer `defineCapability({ slot, surface?, requires?, setup?, roles })` over hand-writing a
`Capability` literal — the typed `roles` map removes the `if (role === …)` dispatch and the
`ctx as T` casts:

```ts
export const FOCUS = capabilityKey<FocusModel>('@svelte-atoms/cap:focus');

export const focusCapability = (opts) =>
	defineCapability<FocusModel>({
		slot: FOCUS,
		surface: createFocusModel(opts),
		setup: (bond) => installFocusRestore(bond),
		roles: { trigger: () => ({ handlers: () => ({ onfocus, onblur }) }) }
	});
```

Register it in the `BondState` constructor via `this.capability(focusCapability(...))`, then
activate the whole bond once with `useCapabilities(bond)` + `setup()`. Override a slot you don't
own with `decorateCapability(slot, { behavior, surface, setup })` registered **after** the base.
