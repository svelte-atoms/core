import { port } from '$ixirjs/ui/components/portal/port';

// Curried teleport attachment: re-parent `node` into `target` on attach, remove on
// cleanup. Thin wrapper over the canonical `port` primitive (see portal/port.ts).
export function portal(target: HTMLElement = document.body) {
	return (node: HTMLElement) => port(node, target);
}

export { port };
