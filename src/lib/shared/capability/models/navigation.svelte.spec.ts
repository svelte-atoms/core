import { describe, expect, it, vi } from 'vitest';
import { Bond, BondState, Atom, bondContextKey, type BondStateProps } from '../../bond';
import { createRovingFocus, rovingCapability, ROVING } from './roving.svelte';
import { navigationCapability, NAVIGATION } from './navigation.svelte';

// Roving over a fixed id list; navigation projects keydown handlers that drive it.
class NavState extends BondState<BondStateProps> {
	ids = $state<string[]>(['a', 'b', 'c']);
	roving = createRovingFocus<string>({ ids: () => this.ids });
	constructor() {
		super({});
	}
}
class NavBond extends Bond<BondStateProps> {
	static CONTEXT_KEY = bondContextKey('test-nav');
	readonly model: NavState;

	constructor(state: NavState) {
		super(state, 'test-nav');
		this.model = state;
	}
}
class NavAtom extends Atom<NavBond> {
	constructor(bond: NavBond, key = 'content') {
		super(bond, key);
	}
}

function key(handlers: Record<string, unknown>, k: string) {
	const ev = {
		key: k,
		defaultPrevented: false,
		preventDefault: vi.fn()
	} as unknown as KeyboardEvent;
	(handlers.onkeydown as (e: Event) => void)(ev);
	return ev;
}

describe('navigationCapability', () => {
	it('vertical (default): ArrowDown → next, ArrowUp → previous on the container', () => {
		const bond = new NavBond(new NavState());
		bond.capability(rovingCapability(bond.model.roving));
		bond.capability(navigationCapability(bond.model.roving));
		const content = new NavAtom(bond).role('container');

		key(content.spread, 'ArrowDown');
		expect(bond.model.roving.activeId).toBe('a');
		key(content.spread, 'ArrowDown');
		expect(bond.model.roving.activeId).toBe('b');
		key(content.spread, 'ArrowUp');
		expect(bond.model.roving.activeId).toBe('a');
	});

	it('does not act when the event was already handled (defaultPrevented)', () => {
		const bond = new NavBond(new NavState());
		bond.capability(rovingCapability(bond.model.roving));
		bond.capability(navigationCapability(bond.model.roving));
		const content = new NavAtom(bond).role('container');

		const ev = {
			key: 'ArrowDown',
			defaultPrevented: true,
			preventDefault: vi.fn()
		} as unknown as KeyboardEvent;
		(content.spread.onkeydown as (e: Event) => void)(ev);
		expect(bond.model.roving.activeId).toBeNull();
	});

	it('horizontal orientation maps Left/Right instead of Up/Down', () => {
		const bond = new NavBond(new NavState());
		bond.capability(rovingCapability(bond.model.roving));
		bond.capability(navigationCapability(bond.model.roving, { orientation: 'horizontal' }));
		const content = new NavAtom(bond).role('container');

		key(content.spread, 'ArrowDown'); // ignored on horizontal
		expect(bond.model.roving.activeId).toBeNull();
		key(content.spread, 'ArrowRight');
		expect(bond.model.roving.activeId).toBe('a');
		key(content.spread, 'ArrowLeft');
		expect(bond.model.roving.activeId).toBe('c'); // previous() at index 0 wraps to last by default
	});

	it('Home/End are opt-in and jump to first/last', () => {
		const bond = new NavBond(new NavState());
		bond.capability(rovingCapability(bond.model.roving));
		bond.capability(navigationCapability(bond.model.roving, { homeEnd: true }));
		const content = new NavAtom(bond).role('container');

		key(content.spread, 'End');
		expect(bond.model.roving.activeId).toBe('c');
		key(content.spread, 'Home');
		expect(bond.model.roving.activeId).toBe('a');
	});

	it('projects onto only the configured roles', () => {
		const bond = new NavBond(new NavState());
		bond.capability(rovingCapability(bond.model.roving));
		bond.capability(navigationCapability(bond.model.roving, { roles: ['trigger'] }));

		const content = new NavAtom(bond, 'content').role('container');
		expect(content.spread.onkeydown).toBeUndefined(); // not a configured role

		const trigger = new NavAtom(bond, 'trigger').role('trigger');
		key(trigger.spread, 'ArrowDown');
		expect(bond.model.roving.activeId).toBe('a');
	});

	it('preventScroll calls preventDefault on a handled key', () => {
		const bond = new NavBond(new NavState());
		bond.capability(rovingCapability(bond.model.roving));
		bond.capability(navigationCapability(bond.model.roving, { preventScroll: true }));
		const content = new NavAtom(bond).role('container');

		const ev = key(content.spread, 'ArrowDown');
		expect(ev.preventDefault).toHaveBeenCalled();
		const ignored = key(content.spread, 'Escape');
		expect(ignored.preventDefault).not.toHaveBeenCalled();
	});
});

describe('capability introspection + requires (#6, #3)', () => {
	it('describeCapabilities() reports slot / surface / requires / setup', () => {
		const bond = new NavBond(new NavState());
		bond.capability(rovingCapability(bond.model.roving));
		bond.capability(navigationCapability(bond.model.roving));

		const info = bond.describeCapabilities();
		const nav = info.find((c) => c.slot === NAVIGATION);
		expect(nav).toBeDefined();
		expect(nav!.hasSurface).toBe(true);
		expect(nav!.requires).toEqual([ROVING]);
		expect(nav!.hasSetup).toBe(false);
		expect(nav!.meta).toMatchObject({
			layer: 1,
			kind: 'policy',
			projects: ['container']
		});

		const roving = info.find((c) => c.slot === ROVING);
		expect(roving!.requires).toEqual([]);
	});

	it('rejects a missing required slot before projection', () => {
		const bond = new NavBond(new NavState());
		bond.capability(navigationCapability(bond.model.roving));
		expect(() => new NavAtom(bond).role('container')).toThrow('requires slot "@ixirjs/cap:roving"');
	});
});
