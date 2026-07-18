import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Probe, {
	capturedBond,
	resetCapturedBond
} from '$ixirjs/ui/test/components/popover/popover-atom-probe.test.svelte';
import { Atom } from '$ixirjs/ui/shared/bond';
import {
	PopoverTailAtom,
	PopoverBond,
	PopoverContentAtom,
	PopoverIndicatorAtom,
	PopoverOverlayAtom,
	PopoverTriggerAtom
} from './bond.svelte';

describe('Popover component-owned Atoms', () => {
	beforeEach(resetCapturedBond);

	it('registers rendered popover nodes', () => {
		const { unmount } = render(Probe);
		const popover = capturedBond;

		expect(popover).toBeDefined();
		expect(popover).toBeInstanceOf(PopoverBond);
		expect(popover?.isOpen).toBe(true);
		expect(popover?.shouldTrackPosition).toBe(true);

		const trigger = popover?.nodeByPart('trigger');
		const overlay = popover?.nodeByPart('overlay');
		const content = popover?.nodeByPart('content');
		const tail = popover?.nodeByPart('tail');
		const indicator = popover?.nodeByPart('indicator');

		expect(trigger).toBeInstanceOf(PopoverTriggerAtom);
		expect(overlay).toBeInstanceOf(PopoverOverlayAtom);
		expect(content).toBeInstanceOf(PopoverContentAtom);
		expect(tail).toBeInstanceOf(PopoverTailAtom);
		expect(indicator).toBeInstanceOf(PopoverIndicatorAtom);
		for (const node of [trigger, overlay, content, tail, indicator]) {
			expect(node).toBeInstanceOf(Atom);
		}
		expect(popover?.nodesByPart('trigger')).toEqual([trigger]);
		expect(popover?.nodesByPart('overlay')).toEqual([overlay]);
		expect(popover?.nodesByPart('content')).toEqual([content]);
		expect(popover?.nodesByPart('tail')).toEqual([tail]);
		expect(popover?.nodesByPart('indicator')).toEqual([indicator]);

		expect(overlay?.spread.role).toBe('dialog');
		expect(overlay?.spread['data-active']).toBe(true);
		expect(content?.spread['data-active']).toBe(true);
		expect(tail?.spread.role).toBe('presentation');
		expect(indicator?.spread['aria-hidden']).toBe(true);

		const legacyNodes = [
			popover?.nodeByPart('trigger'),
			popover?.nodeByPart('overlay'),
			popover?.nodeByPart('content'),
			popover?.nodeByPart('tail'),
			popover?.nodeByPart('indicator')
		];
		for (const node of legacyNodes) {
			expect(node).toBeInstanceOf(Atom);
		}
		expect(legacyNodes[0]).toBeInstanceOf(PopoverTriggerAtom);
		expect(legacyNodes[1]).toBeInstanceOf(PopoverOverlayAtom);
		expect(legacyNodes[2]).toBeInstanceOf(PopoverContentAtom);

		unmount();

		for (const part of ['trigger', 'overlay', 'content', 'tail', 'indicator']) {
			expect(popover?.nodesByPart(part)).toEqual([]);
		}
	});
});
