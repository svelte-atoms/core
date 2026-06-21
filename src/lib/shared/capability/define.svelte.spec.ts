import { describe, it, expect, vi } from 'vitest';
import {
	Bond,
	BondState,
	BondAtom,
	defineCapability,
	sharedCapabilityKey,
	capabilityKey,
	type BondStateProps,
	type Capability
} from '../bond/bond.svelte';
import { useCapabilities } from './use.svelte';

// defineCapability is the canonical authoring entry point: a typed role-map (or a raw behavior
// escape hatch) folded into a Capability, plus the surface-access (#3/#4) and setup-guard (#5)
// primitives it pairs with. These specs lock the seam the 9-issue pass introduced.

const MODEL = sharedCapabilityKey<{ value: number }>('@svelte-atoms/test:dc:model');
const DEP = sharedCapabilityKey<{ tag: string }>('@svelte-atoms/test:dc:dep');

class S extends BondState<BondStateProps> {
	constructor() {
		super({});
	}
}

class TestBond extends Bond {
	constructor(state: BondState = new S()) {
		super(state, 'test');
	}
}

const mkBond = () => new TestBond();

describe('defineCapability — typed role map', () => {
	it('folds a roles map into behavior(role) dispatch, returning undefined for unhandled roles', () => {
		const cap = defineCapability<{ value: number }>({
			slot: MODEL,
			surface: { value: 7 },
			roles: {
				item: (id) => ({ attrs: () => ({ 'data-id': id }) }),
				container: () => ({ attrs: () => ({ role: 'list' }) })
			}
		});

		const bond = mkBond();
		// ctx is typed per role (item → string); the projection resolves against the bond.
		expect(cap.behavior?.('item', 'a')?.attrs?.(bond)).toEqual({ 'data-id': 'a' });
		expect(cap.behavior?.('container')?.attrs?.(bond)).toEqual({ role: 'list' });
		// A role with no map entry projects nothing.
		expect(cap.behavior?.('surface')).toBeUndefined();
	});

	it('omits behavior entirely for a surface-only capability (no roles, no behavior)', () => {
		const cap = defineCapability<{ value: number }>({ slot: MODEL, surface: { value: 1 } });
		expect(cap.behavior).toBeUndefined();
		expect(cap.surface).toEqual({ value: 1 });
	});

	it('a role entry returning undefined opts that role out (conditional projection)', () => {
		const cap = defineCapability({
			slot: capabilityKey('opt'),
			roles: { label: () => undefined }
		});
		expect(cap.behavior?.('label')).toBeUndefined();
	});

	it('supports the raw behavior escape hatch for dynamic role sets', () => {
		const handled = ['container', 'trigger'];
		const cap = defineCapability({
			slot: capabilityKey('dyn'),
			behavior: (role) => (handled.includes(role) ? { attrs: () => ({ ok: role }) } : undefined)
		});
		const bond = mkBond();
		expect(cap.behavior?.('trigger')?.attrs?.(bond)).toEqual({ ok: 'trigger' });
		expect(cap.behavior?.('item')).toBeUndefined();
	});

	it('carries requires through to the built capability', () => {
		const cap = defineCapability({ slot: MODEL, requires: [DEP], roles: {} });
		expect(cap.requires).toEqual([DEP]);
	});

	it('projects through behaviorsForRole once registered on a state', () => {
		const state = new S();
		state.capability(
			defineCapability({ slot: MODEL, roles: { item: (id) => ({ attrs: () => ({ id }) }) } })
		);
		const behaviors = state.behaviorsForRole('item', 'x');
		expect(behaviors).toHaveLength(1);
		expect(behaviors[0]!.attrs?.(mkBond())).toEqual({ id: 'x' });
	});
});

describe('surface / requireCapability / requireSurface — typed access (#3/#4)', () => {
	it('surface() returns the held model, undefined when the slot is empty', () => {
		const bond = mkBond();
		expect(bond.surface(MODEL)).toBeUndefined();
		bond.capability(defineCapability<{ value: number }>({ slot: MODEL, surface: { value: 42 } }));
		expect(bond.surface(MODEL)).toEqual({ value: 42 });
	});

	it('requireCapability() throws (no warn) when the slot is empty', () => {
		const bond = mkBond();
		expect(() => bond.requireCapability(MODEL)).toThrowError(/required capability/);
	});

	it('requireSurface() returns the model, throws when slot or surface is absent', () => {
		const bond = mkBond();
		expect(() => bond.requireSurface(MODEL)).toThrowError(/required capability/);
		// Registered but surface-less.
		bond.capability(defineCapability({ slot: MODEL, roles: {} }));
		expect(() => bond.requireSurface(MODEL)).toThrowError(/no surface/);
	});
});

describe('explainRole — projection introspection (#7)', () => {
	it('reports each capability that contributes to a role, with resolved attrs', () => {
		const bond = mkBond();
		bond.capability(
			defineCapability({
				slot: capabilityKey('a'),
				roles: { item: (id) => ({ attrs: () => ({ a: id }) }) }
			})
		);
		bond.capability(
			defineCapability({
				slot: capabilityKey('b'),
				roles: { item: () => ({ attrs: () => ({ b: 1 }) }) }
			})
		);
		const info = bond.explainRole('item', 'q');
		expect(info).toHaveLength(2);
		expect(info[0]!.attrs).toEqual({ a: 'q' });
		expect(info[1]!.attrs).toEqual({ b: 1 });
		// A capability that doesn't handle the role is absent from the report.
		expect(bond.explainRole('surface')).toHaveLength(0);
	});
});

describe('setup guard (#5)', () => {
	it('warns when a setup-bearing capability is registered but useCapabilities was never called', () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		const bond = mkBond();
		// setup returns void so useCapabilities (not called here anyway) wouldn't need a component context.
		bond.capability(defineCapability({ slot: capabilityKey('fx'), setup: () => {} }));
		// Trigger the deferred DEV validation via a projection ('surface' is a void role — no ctx).
		new (class extends BondAtom {})(bond, 'probe').role('surface');
		expect(warn).toHaveBeenCalledWith(
			expect.stringContaining('useCapabilities(bond) was never called')
		);
		warn.mockRestore();
	});

	it('stays quiet once useCapabilities has marked the bond live', () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		const bond = mkBond();
		// Void teardown so useCapabilities does not register an onDestroy (no component here).
		const cap: Capability = defineCapability({ slot: capabilityKey('fx2'), setup: () => {} });
		bond.capability(cap);
		useCapabilities(bond); // marks setup consumed before any projection
		new (class extends BondAtom {})(bond, 'probe').role('surface');
		expect(warn).not.toHaveBeenCalledWith(
			expect.stringContaining('useCapabilities(bond) was never called')
		);
		warn.mockRestore();
	});
});
