import type { Component } from 'svelte';

/**
 * Extend this interface to add custom avatar properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AvatarExtendProps {}

export interface AvatarProps extends AvatarExtendProps {
	class?: string;
	src?: string | Component;
	alt?: string;
	readonly element?: HTMLElement;
}
