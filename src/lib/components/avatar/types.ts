import type { Component } from 'svelte';

export type AvatarProps = {
	class?: string;
	src?: string | Component;
	alt?: string;
	readonly element?: HTMLElement;
};
