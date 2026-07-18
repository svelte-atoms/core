import { describe, expect, expectTypeOf, it } from 'vitest';
import { BondState, Atom, type BondStateProps } from '../bond';
import { Collection } from '../bond/collection.svelte';
import { defineBond } from './define.svelte';
import { fuse } from './fuse.svelte';
import {
	createSelection,
	selectionCapability,
	SELECTION
} from '../capability/models/selection.svelte';
import { createRovingFocus, rovingCapability, ROVING } from '../capability/models/roving.svelte';
import { collectionSlot } from '../capability/models/collection.svelte';
import {
	trappedFocus,
	focusOnOpen,
	FOCUS
} from '$ixirjs/ui/components/portal/host/policies/focus.svelte';

class FState extends BondState<BondStateProps> {
	values = $state<string[]>([]);
	ids = $state<string[]>(['a', 'b']);
	selection = createSelection<string>({
		get: () => this.values,
		set: (v) => (this.values = v),
		mode: () => 'multiple'
	});
	roving = createRovingFocus({ ids: () => this.ids });
	constructor() {
		super({});
	}
}

class TriggerAtom extends Atom {
	constructor(bond: ConstructorParameters<typeof Atom>[0]) {
		super(bond, 'trigger');
	}
}
class ListAtom extends Atom {
	constructor(bond: ConstructorParameters<typeof Atom>[0]) {
		super(bond, 'list');
	}
}
class OptionAtom extends Atom {
	constructor(bond: ConstructorParameters<typeof Atom>[0]) {
		super(bond, 'option');
	}
}

// Two independently-defined bonds sharing a compatible state.
const Triggerable = defineBond({
	name: 'triggerable',
	atoms: { trigger: TriggerAtom },
	capabilities: (s: FState) => [rovingCapability(s.roving)] // slot 'roving'
});
const Listbox = defineBond({
	name: 'listbox',
	atoms: { list: ListAtom, option: OptionAtom },
	capabilities: (s: FState) => [selectionCapability(s.selection)] // slot 'selection'
});

describe('fuse — bond + bond = bond (the closure property)', () => {
	const Fused = fuse({ name: 'fused', parts: [Triggerable, Listbox] });

	it('unions atoms from every part', () => {
		const bond = new Fused(new FState());
		expect(new TriggerAtom(bond)).toBeInstanceOf(TriggerAtom); // from Triggerable
		expect(new ListAtom(bond)).toBeInstanceOf(ListAtom); // from Listbox
		expect(new OptionAtom(bond)).toBeInstanceOf(OptionAtom);
	});

	it('concatenates capabilities from every part', () => {
		const bond = new Fused(new FState());
		expect(bond.capability(ROVING)).toBeDefined(); // from Triggerable
		expect(bond.capability(SELECTION)).toBeDefined(); // from Listbox
	});

	it('takes a fresh rebrand identity (namespace / CONTEXT_KEY)', () => {
		const bond = new Fused(new FState());
		expect(bond.namespace).toBe('fused');
		expect(Fused.CONTEXT_KEY).toContain('fused');
		// atoms carry the fused namespace, not the parts'
		expect(new TriggerAtom(bond).spread['data-bond']).toBe('fused');
	});

	it('the fused bond is itself fusable (closure)', () => {
		class ExtraAtom extends Atom {
			constructor(bond: ConstructorParameters<typeof Atom>[0]) {
				super(bond, 'extra');
			}
		}
		const Extra = defineBond({
			name: 'extra',
			atoms: { extra: ExtraAtom }
		});
		const Refused = fuse({ name: 'refused', parts: [Fused, Extra] });
		const bond = new Refused(new FState());
		expect(new TriggerAtom(bond)).toBeInstanceOf(TriggerAtom); // inherited through Fused
		expect(new ExtraAtom(bond)).toBeInstanceOf(ExtraAtom);
		expect(bond.capability(SELECTION)).toBeDefined(); // carried through
	});

	it('later parts win on capability-SLOT collision (the PopoverDialog focus resolution)', () => {
		// Mirrors `fuse(Popover, Dialog)`: both parts bring slot 'focus'; the later (modal)
		// TrappedFocus wins over FocusOnOpen because capability() is last-wins-per-slot (§13.1).
		const PositionedLike = defineBond({
			name: 'positioned-like',
			atoms: { trigger: TriggerAtom },
			capabilities: () => [focusOnOpen({ restoreFocus: 'trigger' })]
		});
		const ModalLike = defineBond({
			name: 'modal-like',
			atoms: { option: OptionAtom },
			capabilities: () => [trappedFocus({ restoreFocus: 'previous' })]
		});
		const Fused2 = fuse({ name: 'positioned-modal', parts: [PositionedLike, ModalLike] });
		const bond = new Fused2(new FState());
		const focus = bond.capability(FOCUS)?.surface;
		expect(focus?.restoreFocus).toBe('previous'); // modal (later) won the slot
	});

	it('a lazily-created collection is reachable through capability("collection:item") (ADR 0007)', () => {
		// The genuinely new property: a collection on the fused bond is addressable via the
		// unified capability seam — same instance the lazy `collection()` getter returns.
		const bond = new Fused(new FState());
		const items = bond.collection<{ id: string }>('item');
		expect(items).toBeInstanceOf(Collection);
		expect(bond.capability(collectionSlot('item'))?.surface).toBe(items);
	});

	it('parts share one collection instance on the fused Bond', () => {
		const state = new FState();
		const bond = new Fused(state);
		// Reached via the Bond facade and through the capability seam: the same Collection.
		const items = bond.collection<{ id: string }>('item');
		const item = { id: 'x' };
		items.set('x', item);
		const surface = bond.capability(collectionSlot('item'))?.surface as Collection<{
			id: string;
		}>;
		expect(surface.get('x')).toBe(item); // visible across parts, as it always was
	});

	it('re-fusing (closure) preserves collection addressability', () => {
		class ExtraAtom extends Atom {
			constructor(b: ConstructorParameters<typeof Atom>[0]) {
				super(b, 'extra');
			}
		}
		const Extra = defineBond({
			name: 'extra-coll',
			atoms: { extra: ExtraAtom }
		});
		const Refused = fuse({ name: 'refused-coll', parts: [Fused, Extra] });
		const bond = new Refused(new FState());
		const items = bond.collection('item');
		expect(bond.capability(collectionSlot('item'))?.surface).toBe(items);
	});

	it('a fused bond can declare its State and self-construct via create() (ADR 0012)', () => {
		const Stateful = fuse({ name: 'fused-state', parts: [Triggerable, Listbox], state: FState });
		expect(Stateful.state).toBe(FState); // static ref carried onto the fusion
		const bond = Stateful.create({});
		expect(bond).toBe(bond);
		expect(new TriggerAtom(bond)).toBeInstanceOf(TriggerAtom); // atom metadata remains available to renderers
		expect(bond.capability(SELECTION)).toBeDefined(); // capabilities from parts still register
	});

	it('later parts win on atom-key metadata (resolve)', () => {
		class A1 extends Atom {
			constructor(b: ConstructorParameters<typeof Atom>[0]) {
				super(b, 'root');
			}
			tag = 'A';
		}
		class A2 extends Atom {
			constructor(b: ConstructorParameters<typeof Atom>[0]) {
				super(b, 'root');
			}
			tag = 'B';
		}
		const P1 = defineBond({ name: 'p1', atoms: { root: A1 } });
		const P2 = defineBond({ name: 'p2', atoms: { root: A2 } });
		const Resolved = fuse({ name: 'resolved', parts: [P1, P2] });
		const resolved = new Resolved(new FState());
		const root = new A2(resolved);
		expectTypeOf(root).toEqualTypeOf<A2>();
		expect(root.tag).toBe('B');
	});
});
