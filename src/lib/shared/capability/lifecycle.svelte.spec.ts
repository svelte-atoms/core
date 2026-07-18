import { describe, expect, it, vi } from 'vitest';
import { Bond, BondState, defineCapability, capabilityKey, type BondStateProps } from '../bond';

class S extends BondState<BondStateProps> {
	constructor() {
		super({});
	}
}

class TestBond extends Bond {
	constructor(state: BondState = new S()) {
		super(state, 'capability-use-test');
	}
}

describe('capability lifecycle', () => {
	it('runs setup in registration order and teardown in LIFO order', () => {
		const events: string[] = [];
		const bond = new TestBond();

		bond.capability(
			defineCapability({
				slot: capabilityKey('first'),
				setup: () => {
					events.push('setup:first');
					return () => events.push('teardown:first');
				}
			})
		);
		bond.capability(
			defineCapability({
				slot: capabilityKey('second'),
				setup: () => {
					events.push('setup:second');
					return () => events.push('teardown:second');
				}
			})
		);

		bond.activateCapabilities(bond);

		expect(events).toEqual(['setup:first', 'setup:second']);

		bond.destroy();

		expect(events).toEqual(['setup:first', 'setup:second', 'teardown:second', 'teardown:first']);
	});

	it('rejects a second root activation for the same bond', () => {
		const bond = new TestBond();
		bond.capability(defineCapability({ slot: capabilityKey('once'), setup: () => {} }));

		bond.activateCapabilities(bond);
		expect(() => bond.activateCapabilities(bond)).toThrow('exactly one lifecycle owner');
		bond.destroy();
	});

	it('runs required effects before dependants regardless of registration order', () => {
		const events: string[] = [];
		const dependency = capabilityKey('dependency');
		const dependant = capabilityKey('dependant');
		const bond = new TestBond();
		bond.capability(
			defineCapability({
				slot: dependant,
				requires: [dependency],
				setup: () => {
					events.push('dependant');
				}
			})
		);
		bond.capability(
			defineCapability({
				slot: dependency,
				setup: () => {
					events.push('dependency');
				}
			})
		);

		bond.activateCapabilities(bond);
		expect(events).toEqual(['dependency', 'dependant']);
		bond.destroy();
	});

	it('normalizes Disposable setup returns into teardown callbacks', () => {
		const events: string[] = [];
		const bond = new TestBond();

		bond.capability(
			defineCapability({
				slot: capabilityKey('disposable'),
				setup: () => ({
					[Symbol.dispose]: () => events.push('dispose')
				})
			})
		);

		bond.activateCapabilities(bond);

		expect(events).toEqual([]);

		bond.destroy();

		expect(events).toEqual(['dispose']);
	});

	it('continues LIFO teardown and reports every failure as AggregateError', () => {
		const events: string[] = [];
		const bond = new TestBond();

		for (const name of ['first', 'throws', 'last']) {
			bond.capability(
				defineCapability({
					slot: capabilityKey(`teardown:${name}`),
					setup: () => () => {
						events.push(`teardown:${name}`);
						if (name === 'throws') throw new Error('teardown failed');
					}
				})
			);
		}

		bond.activateCapabilities(bond);
		expect(() => bond.destroy()).toThrow(AggregateError);
		expect(events).toEqual(['teardown:last', 'teardown:throws', 'teardown:first']);
	});

	it('rejects missing requirements before any setup runs', () => {
		const setup = vi.fn();
		const bond = new TestBond();
		bond.capability(
			defineCapability({
				slot: capabilityKey('missing:owner'),
				requires: [capabilityKey('missing:dependency')],
				setup
			})
		);

		expect(() => bond.activateCapabilities(bond)).toThrow('which is not registered');
		expect(setup).not.toHaveBeenCalled();
	});

	it('rejects cycles before any setup runs', () => {
		const setup = vi.fn();
		const first = capabilityKey('cycle:first');
		const second = capabilityKey('cycle:second');
		const bond = new TestBond();
		bond.capability(defineCapability({ slot: first, requires: [second], setup }));
		bond.capability(defineCapability({ slot: second, requires: [first], setup }));

		expect(() => bond.activateCapabilities(bond)).toThrow('dependency cycle');
		expect(setup).not.toHaveBeenCalled();
	});

	it('keeps declaration order for dependency-unconstrained setups', () => {
		const events: string[] = [];
		const dependency = capabilityKey('stable:dependency');
		const dependant = capabilityKey('stable:dependant');
		const bond = new TestBond();
		bond.capability(
			defineCapability({
				slot: dependant,
				requires: [dependency],
				setup: () => {
					events.push('dependant');
				}
			})
		);
		bond.capability(
			defineCapability({
				slot: capabilityKey('stable:middle'),
				setup: () => {
					events.push('middle');
				}
			})
		);
		bond.capability(
			defineCapability({
				slot: dependency,
				setup: () => {
					events.push('dependency');
				}
			})
		);

		bond.activateCapabilities(bond);
		expect(events).toEqual(['middle', 'dependency', 'dependant']);
		bond.destroy();
	});

	it('rejects reentrant activation as a second lifecycle owner', () => {
		const bond = new TestBond();
		bond.capability(
			defineCapability({
				slot: capabilityKey('reentrant'),
				setup: () => bond.activateCapabilities(bond)
			})
		);

		expect(() => bond.activateCapabilities(bond)).toThrow('exactly one lifecycle owner');
	});

	it('becomes non-retryable when transactional rollback fails', () => {
		const bond = new TestBond();
		bond.capability(
			defineCapability({
				slot: capabilityKey('rollback:cleanup'),
				setup: () => () => {
					throw new Error('cleanup failed');
				}
			})
		);
		bond.capability(
			defineCapability({
				slot: capabilityKey('rollback:setup'),
				setup: () => {
					throw new Error('setup failed');
				}
			})
		);

		expect(() => bond.activateCapabilities(bond)).toThrow(AggregateError);
		expect(() => bond.activateCapabilities(bond)).toThrow('disposed');
	});

	it('unwinds earlier setups when a later setup throws', () => {
		const events: string[] = [];
		const bond = new TestBond();

		bond.capability(
			defineCapability({
				slot: capabilityKey('first-failing-chain'),
				setup: () => {
					events.push('setup:first');
					return () => events.push('teardown:first');
				}
			})
		);
		bond.capability(
			defineCapability({
				slot: capabilityKey('throws'),
				setup: () => {
					events.push('setup:throws');
					throw new Error('boom');
				}
			})
		);

		expect(() => bond.activateCapabilities(bond)).toThrow('boom');
		expect(events).toEqual(['setup:first', 'setup:throws', 'teardown:first']);
	});
});
