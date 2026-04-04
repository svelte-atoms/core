import type { Component } from 'svelte';

export interface AvatarProps {
	class?: string;
	src?: string | Component;
	alt?: string;
	readonly element?: HTMLElement;
}
