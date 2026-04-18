import type { Component } from 'svelte';
import type { PopoverBond } from './bond.svelte';

/**
 * Props passed to all popover strategy components
 */
export type PopoverStrategyProps = {
	/** The popover bond instance */
	bond: PopoverBond;
	/** Reference to trigger element (may be undefined during mount) */
	trigger?: HTMLElement;
	/** Reference to content element (may be undefined during mount) */
	content?: HTMLElement;
	/** Whether the popover is currently open */
	open: boolean;
};

/**
 * A strategy component that controls how popover content is rendered and positioned.
 * 
 * Strategy components receive the bond, trigger, content elements, and open state.
 * They are responsible for:
 * - Positioning the content element
 * - Handling layout/rendering logic
 * - Cleanup on unmount
 * 
 * @example
 * ```svelte
 * <!-- MyStrategy.svelte -->
 * <script lang="ts">
 *   import type { PopoverStrategyProps } from '@svelte-atoms/core/popover';
 *   
 *   let { bond, trigger, content, open }: PopoverStrategyProps = $props();
 *   
 *   $effect(() => {
 *     if (!trigger || !content || !open) return;
 *     // Position content relative to trigger
 *   });
 * </script>
 * ```
 */
export type PopoverStrategy = Component<PopoverStrategyProps>;
