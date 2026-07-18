import { tick } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Fixture from '$ixirjs/ui/test/components/drawer/drawer-portal-surface.test.svelte';
import type { DrawerBond } from './bond.svelte';

describe('Drawer.Root portal surface', () => {
	it('uses the explicit portal sink, preserves position/side props, and promotes reopened siblings', async () => {
		const { component, rerender, unmount } = render(Fixture);
		await tick();

		const sink = document.querySelector<HTMLElement>('[data-testid="drawer-local-sink"]')!;
		const first = document.querySelector<HTMLElement>('[data-testid="drawer-first"]')!;
		const second = document.querySelector<HTMLElement>('[data-testid="drawer-second"]')!;
		const fixture = component as unknown as { getFirstBond(): DrawerBond };

		expect(first.parentElement).toBe(sink);
		expect(second.parentElement).toBe(sink);
		expect(first.dataset.portal).toBe('local');
		expect(first.style.position).toBe('absolute');
		expect(Number(first.style.zIndex)).toBeLessThan(Number(second.style.zIndex));
		expect(fixture.getFirstBond().props.side).toBe('left');

		await rerender({ firstOpen: false });
		await tick();
		await rerender({ firstOpen: true });
		await tick();

		expect(Number(first.style.zIndex)).toBeGreaterThan(Number(second.style.zIndex));
		unmount();
	});
});
