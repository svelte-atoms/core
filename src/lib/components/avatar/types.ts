import type { Component } from 'svelte';
import type { PresetKey } from '$ixirjs/ui/preset';

export interface AvatarProps {
	class?: string;
	preset?: PresetKey;
	src?: string | Component;
	alt?: string;
	readonly element?: HTMLElement;
	[key: string]: unknown;
}
