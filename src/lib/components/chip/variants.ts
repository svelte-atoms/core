import { defineVariants } from '$svelte-atoms/core/utils';

export const chipVariants = defineVariants({
	variants: {
		variant: {
			default: 'bg-foreground/5 text-foreground hover:bg-foreground/10 active:bg-foreground/15 border-transparent',
			outline: 'bg-transparent text-foreground border border-border hover:bg-foreground/5',
			primary: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20',
			destructive: 'bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20'
		},
		size: {
			sm: 'px-2 py-0.5 text-xs rounded',
			md: 'px-3 py-1 text-sm rounded-md',
			lg: 'px-4 py-1.5 text-base rounded-md'
		}
	},
	defaults: {
		variant: 'default',
		size: 'md'
	}
});

export type ChipVariantProps = {
	variant?: 'default' | 'outline' | 'primary' | 'destructive';
	size?: 'sm' | 'md' | 'lg';
};
