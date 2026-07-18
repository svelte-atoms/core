import { tick } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Fixture from '$ixirjs/ui/test/components/popover-dialog/popover-dialog-portal-surface.test.svelte';

describe('PopoverDialog.Dialog portal surface', () => {
	it('ports modal dialogs into their explicit parent and promotes the most recently opened sibling', async () => {
		const { rerender, unmount } = render(Fixture);
		await tick();

		const sink = document.querySelector<HTMLElement>('[data-testid="popover-dialog-local-sink"]')!;
		const first = document.querySelector<HTMLElement>('[data-testid="popover-dialog-first"]')!;
		const second = document.querySelector<HTMLElement>('[data-testid="popover-dialog-second"]')!;

		expect(first.tagName).toBe('DIALOG');
		expect(first.parentElement).toBe(sink);
		expect(second.parentElement).toBe(sink);
		expect(first.dataset.portal).toBe('local');
		expect(first.dataset.band).toBe('modal');
		expect(Number(first.style.zIndex)).toBeLessThan(Number(second.style.zIndex));

		await rerender({ firstOpen: false });
		await tick();
		await rerender({ firstOpen: true });
		await tick();

		expect(Number(first.style.zIndex)).toBeGreaterThan(Number(second.style.zIndex));
		unmount();
	});
});
