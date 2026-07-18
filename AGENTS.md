# AGENTS.md

Canonical agent instructions for this repository. Tool-specific instruction filenames should
symlink to this file instead of duplicating guidance.

## General guidance

- Use `.github/svelte.txt` when generating Svelte 5 and SvelteKit code.
- Consult [`docs/component-authoring.md`](./docs/component-authoring.md) and [ADR 0008](./docs/adr/0008-public-contract-and-authoring-seams.md) before adding or restructuring a public component module. `CONTEXT.md` and `src/lib/shared/*/README.md` are the runtime vocabulary and binding references.
- Files, components, directories: kebab-case. Variables/functions: camelCase.
- Short, present-tense commit messages; no filenames.

## Running dev servers / watch tasks

NEVER run long-lived processes (`storybook dev`, `vite dev`, `--watch`) in the foreground —
they hang the turn. Launch detached:

- Bash tool `run_in_background: true`, or `nohup <cmd> >/tmp/<name>.log 2>&1 &`.
- Poll the log/port; kill the server once verified.

---

## Best practices for this library

Svelte 5 component library on an **atom / bond / preset** architecture. `CONTEXT.md` is the
vocabulary glossary; `src/lib/shared/*/README.md` records runtime binding decisions. For a new
module, follow [`docs/component-authoring.md`](./docs/component-authoring.md) and copy its named
canonical exemplar (Button for static modules, Collapsible for bonded modules). Older siblings may
intentionally retain compatibility APIs.

### Component anatomy

Every multi-part component is a folder `src/lib/components/<name>/` with a fixed layout:

- `bond.svelte.ts` — the `Bond` subclass (via `defineBond`) and each slot's `Atom` definitions. The brain.
- `<name>-root.svelte` — binds props, shares the Bond, and creates the root Atom.
- `<name>-<part>.svelte` — one presentational component per slot; ordinary descendants use `usePart(...)`.
- `types.ts`, `atoms.ts`, `index.ts`, `stories/<name>.stories.svelte`, optional `motion.svelte.ts` / `attachments.svelte.ts`.
- colocated `*.svelte.spec.ts` for Bond behavior; test-only Svelte fixtures remain under `src/lib/test/`.

Static modules use the smaller layout in `docs/component-authoring.md`. Mirror the appropriate layout; don't invent a new file split.

### Presets: resolve in `<script>`, never inline

Fold props into one `$derived` in the script, then spread. SSOT helpers live in
`src/lib/shared/bond/presentation-props.ts` and are re-exported for compatibility from
`src/lib/components/atom/utils/props.ts`:

- **Bonded descendant** → `usePart(Bond, slot, () => restProps, { preset: () => preset })`; it owns Atom creation, role projection, and `mergeAtomProps(...)`. See `collapsible-header.svelte`.
- **Static part** (no Atom) → `mergePresetProps(preset, 'fallbackKey', restProps)`. See `button.svelte`.

```svelte
const buttonProps = $derived(mergePresetProps(preset, 'button', restProps));
```

Compute in a `$derived` and spread it (`{...buttonProps}`). Keep the rest-props proxy intact; pass semantic props such as `type` separately after the spread when they must win over a preset. Never inline `preset ?? …` in markup or hand-roll the merge.

### The `$preset` class sentinel

On `<HtmlAtom>`, `'$preset'` in the `class={[...]}` array is replaced by the kernel with resolved preset classes. Order: `['base', '$preset', klass]` — base first, consumer's `class` (`klass`) last so it wins.

### Bond state surface

- **State lives on `Bond`.** Shared props, derived values, mutation methods, collections, and capability lookup all go directly on the Bond.
- **Mutations via methods** — `open()`, `close()`, `toggle()`, `select()`. Atoms/components call these; they never write props directly except inside the Bond's own wiring.
- **Read state via predicates**: `is*`/`has*`/`can*` for booleans (`isOpen`, `isDisabled`); plain nouns otherwise (`value`, `count`). A getter must never shadow a verb (`isOpen`, not `get open()`).
- **Props are shared reactive cells** wired to `$bindable` — not a value bag, not a mirror. Don't snapshot them.
- **Cross-cutting effects (focus, animation, escape) are Bond capabilities**, not imperative methods.

### Atoms

- Rendered parts create their atom via `createAtomInstance(...)` — it owns lifecycle teardown and `bond.register(node)`.
- Override `get attrs()` / `get handlers()` on the `Atom` subclass, **always spreading `...super.attrs` first** (see `CardRootAtom`). Cross-slot ARIA (`aria-expanded`/`aria-controls`/`aria-labelledby`) comes from relationship capabilities, not per-atom handwriting.
- **NEVER** call `createAttachmentKey()` inside `Atom.spread` or any `$derived` — mint the key **once per atom**. Minting on every read remounts the element and re-fires `onmount`/`ondestroy` (`spread-attachment-key-invariant`).

### Capabilities, not per-root effects

Compose cross-cutting behavior (focus restore, escape-stack, disclosure) onto the Bond via
`this.capability(...)` in the constructor (see `CollapsibleBondBase`). Normal roots use
`bindBond(...)`, which owns capability activation and teardown; they only call
`binding.bond.share()` at the context boundary. Use `createDisclosure(...)` +
`disclosureCapability(...)` for open/close components. Never sprinkle per-root `$effect`s in
`*-root.svelte` for focus/escape/animation — that pattern was deliberately removed.

### Svelte 5 runes traps (these have bitten us)

- **Lazy collection in a `$derived` poisons tracking.** If a class lazily creates a `collection()`, eagerly touch it in the constructor (`void this.rows`) so the dependency is established outside the derived (`collection-getter-in-derived-trap`).
- **Keep a rest-props proxy intact inside its tracked merge boundary.** Never spread it into a new object inside `$derived`; for `usePart(...)`, pass `() => restProps` so the helper reads it within its own `$derived` (`lifecycle-fast-path`).
- **`HtmlAtom` is the single lifecycle handler.** `mount` via `$effect.pre` (reactive, re-runs on bond change), `destroy` via `$effect` teardown. Don't add competing lifecycle `$effect`s in part components.
- **Init = the `oninit` prop.** It survives server `rest_props` (symbols don't) and fires synchronously pre-mount on server and again on client hydration. Keep it idempotent; returned cleanup runs on client teardown only. For once-per-bond SSR logic the `Bond` constructor is the natural seam.

### defineBond & context keys

- New ordinary bonds use `defineBond({ name, base, atoms })`, declaring `role: 'trigger'` / `'content'` where a relationship applies (see `CollapsibleBond`). Definitions retain atom metadata only; rendered parts use `usePart(...)` or `createAtomInstance(...)`. Type alias: `BondOf<typeof X>`.
- `defineBond(...)` generates the context key for ordinary definitions; `extends:` inherits the parent's key. A raw Bond class declares `static CONTEXT_KEY = bondContextKey('<name>')`, but never re-implements `share()`/`get()`/`set()`. Keys are canonical (`@ixirjs/context/<name>`) — don't hand-write the string.

### Filtering / derived views

Use `filterSelectData` (`src/lib/components/select/runes.svelte.ts`, public via the `select` subpath) plus a keyed `{#each}` with Svelte transitions. **Derive the view; never mutate the source array.**

### Stories

House style (`story-interactivity-convention`): live readout `<code>` line, inline why-comment, design tokens, `{#key}` for round-trip demos. **Never `console.log`** in a story. "component annotation is missing from the default export" after adding a `<Story>` = stale dev server; restart with cache cleared.

### Test-only Svelte files

**Hard rule:** any `.svelte` used only by tests lives under `src/lib/test/`, named `*.test.svelte`. Put probes/fixtures/harness/regression components in `src/lib/test/<domain>/...` (mirror the production domain when useful); import via `$ixirjs/ui/test/...`. Never colocate test-only Svelte in `src/lib/components/**` or `src/lib/shared/**`; never move product/docs/demo/Storybook `.svelte` into `src/lib/test/`.

### Don't churn known-dead code

Some code is intentionally vestigial or pending removal (e.g. `virtual/`, element-less roots' vestigial `rest`). The full classified inventory — pending-removal items, compat shims, bench-pinned helpers, parked refactors — is in [`docs/known-dead-code.md`](./docs/known-dead-code.md); check it before touching anything that looks dead. Flag out-of-scope bugs rather than fixing them mid-pass.
