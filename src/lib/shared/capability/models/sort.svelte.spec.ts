import { describe, expect, it } from 'vitest';
import { Bond, Atom, BondState, bondContextKey, type BondStateProps } from '../../bond';
import { createSort, sortCapability, SORT, type SortState } from './sort.svelte';

class TestState extends BondState<BondStateProps> {
	sort = $state<SortState>({});

	constructor() {
		super({});
	}
}

class TestBond extends Bond<BondStateProps> {
	static CONTEXT_KEY = bondContextKey('test-sort');
	constructor(state = new TestState()) {
		super(state, 'test');
	}
	addAtom(key: string, role: string, ctx?: unknown) {
		const atom = new TestAtom(this, key).role(role, ctx);
		this.register(atom, { key });
		return atom;
	}
}

class TestAtom extends Atom<TestBond> {
	constructor(bond: TestBond, key: string) {
		super(bond, key);
	}
}

describe('sortCapability', () => {
	it('exposes sort state and projects sortable column attrs', () => {
		const state = new TestState();
		const sort = createSort({
			get: () => state.sort,
			set: (next) => {
				state.sort = next;
			}
		});
		const cap = sortCapability(sort);
		const bond = new TestBond(state);
		bond.capability(cap);
		const name = bond.addAtom('name', 'column', 'name');
		const age = bond.addAtom('age', 'column', { field: 'age' });

		expect(cap.slot).toBe(SORT);
		expect(cap.surface).toBe(sort);
		expect(cap.meta).toMatchObject({
			layer: 1,
			kind: 'model',
			projects: ['column']
		});
		expect(name.spread.role).toBe('columnheader');
		expect(name.spread['aria-sort']).toBeUndefined();
		expect(name.spread.tabindex).toBe(0);

		(name.spread.onclick as () => void)();
		expect(sort.field).toBe('name');
		expect(sort.direction).toBe('asc');
		expect(name.spread['aria-sort']).toBe('ascending');
		expect(name.spread['data-sort']).toBe('asc');
		expect(age.spread['aria-sort']).toBeUndefined();

		const enter = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true });
		(name.spread.onkeydown as (event: KeyboardEvent) => void)(enter);
		expect(enter.defaultPrevented).toBe(true);
		expect(sort.direction).toBe('desc');
		expect(name.spread['aria-sort']).toBe('descending');

		(name.spread.onkeydown as (event: KeyboardEvent) => void)(
			new KeyboardEvent('keydown', { key: ' ', cancelable: true })
		);
		expect(sort.direction).toBeUndefined();
		expect(name.spread['aria-sort']).toBeUndefined();
	});

	it('cycles back to unsorted and can clear state explicitly', () => {
		const state = new TestState();
		const sort = createSort({
			get: () => state.sort,
			set: (next) => {
				state.sort = next;
			}
		});

		sort.toggle('name');
		sort.toggle('name');
		sort.toggle('name');
		expect(state.sort).toEqual({});

		sort.toggle('age');
		expect(sort.isSorted('age')).toBe(true);
		sort.clear();
		expect(state.sort).toEqual({});
	});
});
